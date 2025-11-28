
#version 300 es

precision highp int;
precision highp float;

//
//
//

// Indices of refractionFactor
const float Air = 1.0;
const float Glass = 1.51714;

// Air to glass ratio of the indices of refractionFactor (Eta)
const float Eta = Air / Glass;

// // see http://en.wikipedia.org/wiki/Refractive_index Reflectivity
// const float R0 = ((Air - Glass) * (Air - Glass)) / ((Air + Glass) * (Air + Glass));

//
//
//

uniform vec3        u_cameraEye;
uniform int         u_useBvh;

//

uniform highp sampler2D   u_sceneTextureData;
uniform int               u_sceneTextureSize;

uniform highp sampler2D   u_materialsTextureData;

//

uniform highp sampler2D   u_lightsTextureData;
uniform int               u_lightsTextureSize;

//

uniform highp sampler2D   u_bvhDataTexture;

//
//
//

in vec3  v_position;

out vec4 o_color;

//

const float     g_ambientLightIntensity = 0.15;

const vec3      g_backgroundColor = vec3(0.1);

//

struct RayValues
{
  vec3 origin;
  vec3 direction;
};

struct RayResult
{
  bool hasHit;
  float distance;
  vec3 position;
  vec3 normal;
  vec4 color;
  float reflectionFactor;
  float refractionFactor;
  bool lightEnabled;
  vec3 txPos;
  int shapeIndex;
  int materialIndex;
};

struct LightResult {
  float intensity;
  vec3 color;
};


struct StackData
{
  bool used;
  RayValues ray;
  RayResult result;
  int reflectionIndex;
  int refractionIndex;
};

struct LightStackData
{
  bool used;
  RayValues ray;
  RayResult result;
  LightResult lightResult;
};

//
//
//
//
//

// vec3 apply_quat_to_vec3(vec3 position, vec4 q)
// {
//   vec3 v = position.xyz;
//   return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);
// }
mat3 quat_to_mat3(vec4 q)
{

  // multiply by sqrt(2) to get rid of all the 2.0 factors in the matrix
  q *= 1.414214;

  float xx = q.x * q.x;
  float xy = q.x * q.y;
  float xz = q.x * q.z;
  float xw = q.x * q.w;

  float yy = q.y * q.y;
  float yz = q.y * q.z;
  float yw = q.y * q.w;

  float zz = q.z * q.z;
  float zw = q.z * q.w;

  return mat3(
    1.0 - yy - zz,
    xy + zw,
    xz - yw,

    xy - zw,
    1.0 - xx - zz,
    yz + xw,

    xz + yw,
    yz - xw,
    1.0 - xx - yy
  );
}
//
//
//
//
//

bool intersectSphere(RayValues ray, float radius, out float outDistance, out vec3 normal)
{
  float nearValue = 0.001; // TODO: hardcoded
  float farValue = 100.0; // TODO: hardcoded

  float b = dot(ray.origin, ray.direction);
  float c = dot(ray.origin, ray.origin) - radius * radius;
  float h = b * b - c;
  if (h < 0.0) {
    return false;
  }

  h = sqrt(h);

  float d1 = -b - h;
  if (d1 >= nearValue && d1 <= farValue)
  {
    normal = normalize(ray.origin + ray.direction * d1);
    outDistance = d1;
    return true;
  }

  float d2 = -b + h;
  if (d2 >= nearValue && d2 <= farValue)
  {
    normal = normalize(ray.origin + ray.direction * d2);
    outDistance = d2;
    return true;
  }

  return false;
}

bool intersectBox(RayValues ray, vec3 boxSize, out float outDistance, out vec3 normal)
{
  float nearValue = 0.001; // TODO: hardcoded
  float farValue = 100.0; // TODO: hardcoded

  //
  //
  // sad hack: fix a shadow related bug

  // if (ray.origin.x == 0.0) ray.origin.x = -1e-8;
  // if (ray.origin.y == 0.0) ray.origin.y = -1e-8;
  // if (ray.origin.z == 0.0) ray.origin.z = -1e-8;

  if (ray.direction.x == 0.0) ray.direction.x = -1e-8;
  if (ray.direction.y == 0.0) ray.direction.y = -1e-8;
  if (ray.direction.z == 0.0) ray.direction.z = -1e-8;

  // sad hack: fix a shadow related bug
  //
  //

  vec3 m = sign(ray.direction) / max(abs(ray.direction), 1e-8);
  vec3 n = m * ray.origin;
  vec3 k = abs(m) * boxSize;

  vec3 t1 = -n - k;
  vec3 t2 = -n + k;

  float tN = max(max(t1.x, t1.y), t1.z);
  float tF = min(min(t2.x, t2.y), t2.z);

  if (tN > tF || tF <= 0.0) {
    return false;
  }

  if (tN >= nearValue && tN <= farValue)
  {
    normal = normalize(-sign(ray.direction) * step(t1.yzx, t1.xyz) * step(t1.zxy, t1.xyz));
    outDistance = tN;
    return true;
  }

  if (tF >= nearValue && tF <= farValue)
  {
    normal = normalize(-sign(ray.direction) * step(t1.yzx, t1.xyz) * step(t1.zxy, t1.xyz));
    outDistance = tF;
    return true;
  }

  return false;
}

bool intersectTriangle(RayValues ray, vec3 v0, vec3 v1, vec3 v2, out float outDistance, out vec3 normal)
{
  float nearValue = 0.001; // TODO: hardcoded
  float farValue = 100.0; // TODO: hardcoded

  vec3 v1v0 = v1 - v0;
  vec3 v2v0 = v2 - v0;
  vec3 rov0 = ray.origin - v0;

  vec3 n = cross(v1v0, v2v0);
  vec3 q = cross(rov0, ray.direction);
  float d = 1.0 / dot(ray.direction, n);
  float u = d * dot(-q, v2v0);
  float v = d * dot(q, v1v0);
  float t = d * dot(-n, rov0);

  if (u < 0.0 || v < 0.0 || (u + v) > 1.0 || t < nearValue || t > farValue) {
    return false;
  }

  normal = normalize(-n);
  outDistance = t;
  return true;
}

// float intersectPlane(RayValues ray, vec3 normal, float offset)
// {
//     return -(dot(ray.origin, normal) + offset) / dot(ray.direction, normal);
// }

// float intersectPlane2(RayValues ray, vec3 normal, float offset)
// {
//     float nearValue = 0.001; // TODO: hardcoded
//     float farValue = 1000.0; // TODO: hardcoded

//     float a = dot(ray.direction, normal);
//     float d = -(dot(ray.origin, normal) + offset) / a;

//     if (a > 0.0 || d < nearValue || d > farValue)
//         return -1.0;

//     return d;
// }

// float diskIntersect(RayValues ray, vec3 center, vec3 normal, float radius)
// {
//     vec3  o = ray.origin - center;
//     float t = -dot(normal, o) / dot(ray.direction, normal);
//     vec3  q = o + ray.direction * t;
//     return (dot(q, q) < radius * radius) ? t : -1.0;
// }

//
//
//
//
//

//
//
//
//
//

//
//
//
//
//

void intersectSceneOneShape(
  int shapeIndex,
  RayValues ray,
  inout RayResult outBestResult,
  bool shadowMode
) {
  RayValues tmpRay;
  vec3 normal;
  float currDistance = 0.0;

  vec4 shTexel0 = texelFetch(u_sceneTextureData, ivec2(shapeIndex + 0, 0), 0);

  int materialIndex = int(shTexel0.g);

  if (shadowMode == true)
  {
    vec4 matTexel0 = texelFetch(u_materialsTextureData, ivec2(materialIndex * 2 + 0, 0), 0);

    bool castShadowEnabled = (int(matTexel0.g) == 1);
    if (castShadowEnabled == false) {
      return; // this shape does not cast a shadow -> skip
    }
  }

  vec4 shTexel1 = texelFetch(u_sceneTextureData, ivec2(shapeIndex + 1, 0), 0);
  vec4 shTexel2 = texelFetch(u_sceneTextureData, ivec2(shapeIndex + 2, 0), 0);

  int shapeType = int(shTexel0.r);

  switch (shapeType) {
    case 1: {

      //
      // Sphere shape
      //

      vec3 center = vec3(shTexel0.b, shTexel0.a, shTexel1.r);
      float radius = shTexel2.g;

      vec4 orientation = vec4(
        shTexel1.g,
        shTexel1.b,
        shTexel1.a,
        shTexel2.r
      );
      mat3 normalMatrix = quat_to_mat3(orientation);
      mat3 inverseNormalMatrix = inverse(normalMatrix);

      // convert ray from world space to sphere space
      tmpRay.origin = (inverseNormalMatrix * (ray.origin - center));
      tmpRay.direction = (inverseNormalMatrix * ray.direction);

      if (
        !intersectSphere(tmpRay, radius, currDistance, normal) ||
        (outBestResult.distance > 0.0 && currDistance > outBestResult.distance)
      ) {
        return;
      }

      // convert normal from box space to world space
      normal = normalMatrix * normal;

      outBestResult.position = ray.origin + currDistance * ray.direction;

      // the multiplication by 0.999 will remove graphic artifact
      // vec3 txPos = (inverseNormalMatrix * 0.999) * (center - outBestResult.position);
      vec3 txPos = inverseNormalMatrix * (center - outBestResult.position);
      outBestResult.txPos = txPos;

      break;
    }

    case 2: {

      //
      // Box shape
      //

      vec3 center = vec3(shTexel0.b, shTexel0.a, shTexel1.r);
      vec3 boxSize = shTexel2.gba;

      vec4 orientation = vec4(
        shTexel1.g,
        shTexel1.b,
        shTexel1.a,
        shTexel2.r
      );
      mat3 normalMatrix = quat_to_mat3(orientation);
      mat3 inverseNormalMatrix = inverse(normalMatrix);

      // convert ray from world space to sphere space
      tmpRay.origin = (inverseNormalMatrix * (ray.origin - center));
      tmpRay.direction = (inverseNormalMatrix * ray.direction);

      if (
        !intersectBox(tmpRay, boxSize, currDistance, normal) ||
        (outBestResult.distance > 0.0 && currDistance > outBestResult.distance)
      ) {
        return;
      }

      // convert normal from box space to world space
      normal = normalMatrix * normal;

      outBestResult.position = ray.origin + currDistance * ray.direction;

      // the multiplication by 0.999 will remove graphic artifact
      vec3 txPos = (inverseNormalMatrix * 0.999) * (center - outBestResult.position);
      outBestResult.txPos = txPos;

      break;
    }
    case 3: {

      //
      // Triangle shape
      //

      tmpRay.origin = ray.origin;
      tmpRay.direction = ray.direction;

      vec3 v0 = vec3(shTexel0.b, shTexel0.a, shTexel1.r);
      vec3 v1 = shTexel1.gba;
      vec3 v2 = shTexel2.rgb;

      if (
        !intersectTriangle(tmpRay, v0, v1, v2, currDistance, normal) ||
        (outBestResult.distance > 0.0 && currDistance > outBestResult.distance)
      ) {
        return;
      }

      outBestResult.position = ray.origin + currDistance * ray.direction;

      outBestResult.txPos = vec3(0.0); // TODO?
      // outBestResult.txPos = vec3(1.0); // TODO?
      // outBestResult.txPos = normal;

      break;
    }
  }

  outBestResult.hasHit = true;
  outBestResult.distance = currDistance;
  outBestResult.normal = normal;
  outBestResult.shapeIndex = shapeIndex;
  outBestResult.materialIndex = materialIndex;
}


bool rayIntersectBvhAABB(RayValues ray, vec3 bvhMin, vec3 bvhMax)
{
  vec3 valA = (bvhMin - ray.origin) / ray.direction;
  vec3 valB = (bvhMax - ray.origin) / ray.direction;
  vec3 minVal = min(valA, valB);
  vec3 maxVal = max(valA, valB);

  float max_minVal = max(minVal.x, max(minVal.y, minVal.z));
  float min_maxVal = min(maxVal.x, min(maxVal.y, maxVal.z));

  return max_minVal < min_maxVal;
}

bool intersectScene(
  RayValues ray,
  out RayResult outBestResult,
  bool shadowMode,
  int toIgnoreShapeIndex
) {
  outBestResult.hasHit = false;
  outBestResult.distance = -1.0;

  if (u_sceneTextureSize == 0)
  {
    return false;
  }

  if (u_useBvh == 0)
  {

    // no BVH optimization -> brute force all the shapes
    for (int shapeIndex = 0; shapeIndex < u_sceneTextureSize; shapeIndex += 3) {
      if (shapeIndex != toIgnoreShapeIndex) {
        intersectSceneOneShape(shapeIndex, ray, outBestResult, shadowMode);
      }
    }

  }
  else
  {

    // use BVH optimization -> traverse the nodes and their associated AABB
    // -> this should reduce the total number intersections execute

    const int maxBvhStack = 16;
    int bvhStack[maxBvhStack];

    bvhStack[0] = 0; // BVH root node index
    int top = 0;

    while (top >= 0)
    {

      // pop stack
      int bv_idx = bvhStack[top];
      top -= 1;

      vec4 rootNodeTexel0 = texelFetch(u_bvhDataTexture, ivec2(bv_idx * 3 + 0, 0), 0);
      vec4 rootNodeTexel1 = texelFetch(u_bvhDataTexture, ivec2(bv_idx * 3 + 1, 0), 0);

      vec3 aabbMin = rootNodeTexel0.rgb;
      vec3 aabbMax = vec3(rootNodeTexel0.a, rootNodeTexel1.r, rootNodeTexel1.g);

      if (!rayIntersectBvhAABB(ray, aabbMin, aabbMax)) {
        continue;
      }

      //

      int leftNodeIndex = int(rootNodeTexel1.b);
      if (leftNodeIndex >= 0) {
        // push left bvh node index on to the stack
        top += 1;
        bvhStack[top] = leftNodeIndex;
      }

      int rightNodeIndex = int(rootNodeTexel1.a);
      if (rightNodeIndex >= 0) {
        // push right bvh node index on to the stack
        top += 1;
        bvhStack[top] = rightNodeIndex;
      }

      //

      vec4 rootNodeTexel2 = texelFetch(u_bvhDataTexture, ivec2(bv_idx * 3 + 2, 0), 0);

      int leftLEafShapeIndex = int(rootNodeTexel2.r);
      if (
        leftLEafShapeIndex >= 0 &&
        leftLEafShapeIndex != toIgnoreShapeIndex
      ) {
        intersectSceneOneShape(leftLEafShapeIndex * 3, ray, outBestResult, shadowMode);
      }

      int rightLeafShapeIndex = int(rootNodeTexel2.g);
      if (
        rightLeafShapeIndex >= 0 &&
        rightLeafShapeIndex != toIgnoreShapeIndex
      ) {
        intersectSceneOneShape(rightLeafShapeIndex * 3, ray, outBestResult, shadowMode);
      }

      //

    }

  }

  return outBestResult.hasHit;
}

//
//
//
//
//

//
//
//
//
//

//
//
//
//
//

void lightAt(
  vec3 impactPosition,
  vec3 impactNormal,
  vec3 viewer,
  out LightResult lightResult
) {

  lightResult.intensity = g_ambientLightIntensity;
  lightResult.color = vec3(1.0);

  //
  // handle spot lights
  //

  const int maxLightStackSize = 5;
  LightStackData _lightStack[maxLightStackSize];

  vec3 lightDir = vec3(1.0);
  float currLightIntensity = 1.0;
  vec3 currLightColor = vec3(1.0);

  for (int lightIndex = 0; lightIndex < u_lightsTextureSize; lightIndex += 2)
  {

    vec4 lightTexel0 = texelFetch(u_lightsTextureData, ivec2(lightIndex + 0, 0), 0);
    vec3 lightPos = lightTexel0.rgb;
    float lightRadius = lightTexel0.a;

    vec3 lightToImpactVec3 = lightPos - impactPosition;

    // is it out of the spot light effect radius?
    float lightToImpactDistance = length(lightToImpactVec3);
    if (lightToImpactDistance > lightRadius)
    {
      // out of range, do not apply this light
      continue;
    }

    // normalize lightDir
    lightDir = lightToImpactVec3 / lightToImpactDistance;

    vec4 lightTexel1 = texelFetch(u_lightsTextureData, ivec2(lightIndex + 1, 0), 0);
    float localIntensity = lightTexel1.r;

    currLightIntensity = localIntensity * (1.0 - lightToImpactDistance / lightRadius);

    // initialize stack
    for (int ii = 0; ii < maxLightStackSize; ++ii)
    {
      _lightStack[ii].used = false;
      _lightStack[ii].ray.direction = lightDir;
      _lightStack[ii].result.color = vec4(1.0);
      _lightStack[ii].result.reflectionFactor = 1.0;
      _lightStack[ii].result.refractionFactor = 1.0;
      _lightStack[ii].result.materialIndex = -1;
      _lightStack[ii].result.lightEnabled = false;
      _lightStack[ii].lightResult.intensity = 1.0;
      _lightStack[ii].lightResult.color = vec3(1.0);
    }

    // initialize first stack element
    _lightStack[0].used = true;
    _lightStack[0].ray.origin = impactPosition;

    int previousShapeIndex = -1;

    bool lightIsBlocked = false;

    int lightStackWriteIndex = 0;

    //
    // Accumulating this shape's light stack
    //

    int lightStackReadIndex = 0;
    for (; lightStackReadIndex < maxLightStackSize; ++lightStackReadIndex)
    {
      // intersect object
      // if reflection/refraction push to stack
      // repeat

      if (!_lightStack[lightStackReadIndex].used)
      {
        // nothing to process anymore
        break;
      }

      _lightStack[lightStackReadIndex].result.hasHit = intersectScene(
        _lightStack[lightStackReadIndex].ray,
        _lightStack[lightStackReadIndex].result,
        true,
        previousShapeIndex
      );

      if (
        // we got no collision -> light not blocked
        !_lightStack[lightStackReadIndex].result.hasHit ||
        // we got collision -> checking if the impact is behind the light
        _lightStack[lightStackReadIndex].result.distance > distance(_lightStack[lightStackReadIndex].ray.origin, lightPos)
      ) {
        // ignore the light
        lightIsBlocked = false;
        break;
      }

      previousShapeIndex = _lightStack[lightStackReadIndex].result.shapeIndex;

      int materialIndex = _lightStack[lightStackReadIndex].result.materialIndex;

      // light ray is blocked, skip this light... unless? (<- chessboard/refraction material check)
      vec4 matTexel0 = texelFetch(u_materialsTextureData, ivec2(materialIndex * 2 + 0, 0), 0);
      vec4 matTexel1 = texelFetch(u_materialsTextureData, ivec2(materialIndex * 2 + 1, 0), 0);

      int materialType = int(matTexel0.r);

      // chessboard alternative material
      if (materialType == 1)
      {
        int subMaterialIndex = 0;

        vec3 txPos = _lightStack[lightStackReadIndex].result.txPos;
        if (
          (fract(txPos.x * matTexel1.t) > 0.5)
          != (fract(txPos.y * matTexel1.g) > 0.5)
          != (fract(txPos.z * matTexel1.b) > 0.5)
        ) {
          subMaterialIndex = int(matTexel0.a);
        } else {
          subMaterialIndex = int(matTexel0.b);
        }

        matTexel0 = texelFetch(u_materialsTextureData, ivec2(subMaterialIndex * 2 + 0, 0), 0);
        matTexel1 = texelFetch(u_materialsTextureData, ivec2(subMaterialIndex * 2 + 1, 0), 0);
      }

      float refractionFactor = matTexel0.a;

      if (refractionFactor <= 0.01)
      {
        // no refraction/transparency -> light ray is blocked -> ignore the light
        lightIsBlocked = true;
        break;
      }

      vec3 shapeColor = matTexel1.gba;

      _lightStack[lightStackReadIndex].lightResult.intensity = refractionFactor;
      _lightStack[lightStackReadIndex].lightResult.color = shapeColor.xyz;

      //
      // handle refraction/transparency
      //

      if (lightStackWriteIndex + 1 >= maxLightStackSize)
      {
        // no more stack space left -> stop now
        break;
      }

      lightStackWriteIndex += 1;

      _lightStack[lightStackWriteIndex].used = true;
      _lightStack[lightStackWriteIndex].ray.origin = _lightStack[lightStackReadIndex].result.position;

    } // for (int ii = 0; ii < maxLightStackSize; ++ii)

    if (lightIsBlocked)
    {
      // light ray is blocked by a (solid enough) shape -> ignore the light
      continue;
    }

    //
    // Unrolling this shape's accumulated light stack
    //

    // combine all light(s) color
    // -> from last element to first element
    // -> here we start from where we stopped during the accumulation phase
    // for (lightStackReadIndex = lightStackWriteIndex; lightStackReadIndex >= 0; --lightStackReadIndex)
    for (lightStackReadIndex = maxLightStackSize - 1; lightStackReadIndex >= 0; --lightStackReadIndex)
    {
      if (_lightStack[lightStackReadIndex].used == false)
      {
        continue;
      }

      // used stack element
      currLightColor *= _lightStack[lightStackReadIndex].lightResult.color.xyz;
      currLightIntensity *= _lightStack[lightStackReadIndex].lightResult.intensity;
    }

    //
    //
    //

    //
    // the (custom?) light logic
    // -> TODO: find the name of this method...
    //

    float finalIntensity = 0.0;

    // diffuse light
    finalIntensity += 1.0 * dot(lightDir, impactNormal);

    // specular light
    vec3 reflectionFactor = reflect(-lightDir, impactNormal);
    finalIntensity += 0.6 * pow(max(dot(reflectionFactor, viewer), 0.0), 30.0);

    finalIntensity *= currLightIntensity;

    //
    // blend with the current result
    //

    float maxIntensity = max(lightResult.intensity, finalIntensity);
    float normalizedRatio = 1.0 / maxIntensity;

    float oldBlendRatio = normalizedRatio * max(lightResult.intensity, g_ambientLightIntensity);
    float newBlendRatio = normalizedRatio * max(finalIntensity, g_ambientLightIntensity);

    lightResult.color = lightResult.color * oldBlendRatio + currLightColor * newBlendRatio;
    lightResult.intensity = maxIntensity;

  } // for (int index = 0; index < u_lightsTextureSize; index += 2)
}

//
//
//
//
//

//
//
//
//
//

//
//
//
//
//

void main()
{
  //
  //
  // initial ray

  vec3 rayDir = normalize(v_position - u_cameraEye); // camera direction
  vec3 finalPixelColor = g_backgroundColor;

  // need a scene stack size of minimum 7 for a reflective AND refractive sphere
  const int maxSceneStackSize = 7;
  StackData _sceneStack[maxSceneStackSize];

  // initialize stack
  for (int ii = 0; ii < maxSceneStackSize; ++ii)
  {
    _sceneStack[ii].used = false;
    _sceneStack[ii].result.reflectionFactor = 0.0;
    _sceneStack[ii].result.refractionFactor = 0.0;
    _sceneStack[ii].result.materialIndex = -1;
    _sceneStack[ii].result.lightEnabled = false;
    _sceneStack[ii].reflectionIndex = -1;
    _sceneStack[ii].refractionIndex = -1;
  }

  // initialize first stack element
  _sceneStack[0].used = true;
  _sceneStack[0].ray = RayValues(u_cameraEye, rayDir);
  _sceneStack[0].result.position = u_cameraEye;
  _sceneStack[0].result.reflectionFactor = 1.0;
  _sceneStack[0].result.refractionFactor = 1.0;
  _sceneStack[0].result.lightEnabled = true;
  _sceneStack[0].reflectionIndex = -1;
  _sceneStack[0].refractionIndex = -1;

  int sceneStackWriteIndex = 0;

  //
  // Accumulating this fragment's scene stack
  //

  int sceneStackReadIndex = 0;
  for (; sceneStackReadIndex < maxSceneStackSize; ++sceneStackReadIndex)
  {
    // intersect object
    // if reflection/refraction push to stack & set index
    // repeat

    // if (!_sceneStack[sceneStackReadIndex].used)
    // {
    //   // nothing to process anymore
    //   break;
    // }

    _sceneStack[sceneStackReadIndex].result.hasHit = intersectScene(
      _sceneStack[sceneStackReadIndex].ray,
      _sceneStack[sceneStackReadIndex].result,
      false,
      -1
    );

    if (!_sceneStack[sceneStackReadIndex].result.hasHit)
    {
      continue;
    }

    //
    // material handling
    //

    int materialIndex = _sceneStack[sceneStackReadIndex].result.materialIndex;

    vec4 matTexel0 = texelFetch(u_materialsTextureData, ivec2(materialIndex * 2 + 0, 0), 0);
    vec4 matTexel1 = texelFetch(u_materialsTextureData, ivec2(materialIndex * 2 + 1, 0), 0);

    int materialType = int(matTexel0.r);

    _sceneStack[sceneStackReadIndex].result.hasHit = true;

    if (materialType == 1)
    {
      int subMaterialIndex = 0;

      vec3 txPos = _sceneStack[sceneStackReadIndex].result.txPos;
      if (
        (fract(txPos.x * matTexel1.r) > 0.5)
        == (fract(txPos.y * matTexel1.g) > 0.5)
        == (fract(txPos.z * matTexel1.b) > 0.5)
      ) {
        subMaterialIndex = int(matTexel0.a);
      } else {
        subMaterialIndex = int(matTexel0.b);
      }

      matTexel0 = texelFetch(u_materialsTextureData, ivec2(subMaterialIndex * 2 + 0, 0), 0);
      matTexel1 = texelFetch(u_materialsTextureData, ivec2(subMaterialIndex * 2 + 1, 0), 0);
    }

    vec3 color = matTexel1.gba;
    float reflectionFactor = matTexel0.b;
    float refractionFactor = matTexel0.a;

    _sceneStack[sceneStackReadIndex].result.color = vec4(color, 0.5);
    _sceneStack[sceneStackReadIndex].result.reflectionFactor = reflectionFactor;
    _sceneStack[sceneStackReadIndex].result.refractionFactor = refractionFactor;

    bool lightEnabled = (matTexel1.r != 0.0);
    _sceneStack[sceneStackReadIndex].result.lightEnabled = lightEnabled;

    //
    // Light handling
    //

    LightResult lightResult;
    lightResult.intensity = 1.0;
    lightResult.color = vec3(1.0);

    if (_sceneStack[sceneStackReadIndex].result.lightEnabled)
    {
      lightAt(
        _sceneStack[sceneStackReadIndex].result.position,
        _sceneStack[sceneStackReadIndex].result.normal,
        -_sceneStack[sceneStackReadIndex].ray.direction,
        lightResult
      );
    }

    // update the result color
    // -> this is to handle the refracted/transparent shape's shadows
    // -> this will iterate over multiple potential refracted/transparent shapes
    // ---> ex1: a yellow then red refracted/transparent shape -> red shadow
    _sceneStack[sceneStackReadIndex].result.color.xyz *= lightResult.color * lightResult.intensity;

    if (
      _sceneStack[sceneStackReadIndex].result.lightEnabled &&
      lightResult.intensity <= 0.0
    ) {
      // not lit -> skip refraction/reflection
      continue;
    }

    //
    // reflection/refraction here
    //

    //
    // refraction here
    //

    if (
      // first check if more stack space is left
      sceneStackWriteIndex + 1 < maxSceneStackSize &&
      _sceneStack[sceneStackReadIndex].result.refractionFactor > 0.0
    ) {
      // push new refraction iteration to the stack
      sceneStackWriteIndex += 1;

      _sceneStack[sceneStackWriteIndex].used = true;
      _sceneStack[sceneStackWriteIndex].ray.origin = _sceneStack[sceneStackReadIndex].result.position;
      _sceneStack[sceneStackWriteIndex].ray.direction = refract(_sceneStack[sceneStackReadIndex].ray.direction, _sceneStack[sceneStackReadIndex].result.normal, Eta);

      // here add 0.01 of the normal to the new origin
      // -> this get properly "inside" the intersected shape
      // ---> this avoid intersecting twice the "same shape" at the "same spot"
      _sceneStack[sceneStackWriteIndex].ray.origin += _sceneStack[sceneStackReadIndex].ray.direction * 0.01;

      // set the new "child stack element" to its "parent stack element"
      _sceneStack[sceneStackReadIndex].refractionIndex = sceneStackWriteIndex;
    }

    //
    // reflection here
    //

    if (
      // first check if more stack space is left
      sceneStackWriteIndex + 1 < maxSceneStackSize &&
      _sceneStack[sceneStackReadIndex].result.reflectionFactor > 0.0
    ) {
      // push new reflection iteration to the stack
      sceneStackWriteIndex += 1;

      _sceneStack[sceneStackWriteIndex].used = true;
      _sceneStack[sceneStackWriteIndex].ray.origin = _sceneStack[sceneStackReadIndex].result.position;
      _sceneStack[sceneStackWriteIndex].ray.direction = reflect(_sceneStack[sceneStackReadIndex].ray.direction, _sceneStack[sceneStackReadIndex].result.normal);

      // set the new "child stack element" to its "parent stack element"
      _sceneStack[sceneStackReadIndex].reflectionIndex = sceneStackWriteIndex;
    }

  }

  //
  // Unrolling this fragment's accumulated scene stack
  //

  // combine all colors
  // -> from last element to first element
  // -> here we start from where we stopped during the accumulation phase
  for (sceneStackReadIndex = sceneStackWriteIndex; sceneStackReadIndex >= 0; --sceneStackReadIndex)
  // for (sceneStackReadIndex = maxSceneStackSize - 1; sceneStackReadIndex >= 0; --sceneStackReadIndex)
  {
    // if (!_sceneStack[sceneStackReadIndex].used) {
    //   continue;
    // }

    // handle any connected reflection
    int reflectionIndex = _sceneStack[sceneStackReadIndex].reflectionIndex;
    if (reflectionIndex != -1)
    {
      _sceneStack[sceneStackReadIndex].result.color.xyz =
        _sceneStack[sceneStackReadIndex].result.color.xyz * (1.0 - _sceneStack[sceneStackReadIndex].result.reflectionFactor) +
        _sceneStack[reflectionIndex].result.color.xyz * _sceneStack[sceneStackReadIndex].result.reflectionFactor;
    }

    // handle any connected refraction
    int refractionIndex = _sceneStack[sceneStackReadIndex].refractionIndex;
    if (refractionIndex != -1)
    {
      _sceneStack[sceneStackReadIndex].result.color.xyz =
        _sceneStack[sceneStackReadIndex].result.color.xyz * (1.0 - _sceneStack[sceneStackReadIndex].result.refractionFactor) +
        _sceneStack[refractionIndex].result.color.xyz * _sceneStack[sceneStackReadIndex].result.refractionFactor;
    }
  }

  if (_sceneStack[0].result.hasHit) {
    finalPixelColor = _sceneStack[0].result.color.xyz;
  }

  //
  // Final Output
  //

  o_color = vec4(finalPixelColor, 1.0);

  // gl_FragDepth = 0.1;

}
