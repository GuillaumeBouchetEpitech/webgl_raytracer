
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

// see http://en.wikipedia.org/wiki/Refractive_index Reflectivity
const float R0 = ((Air - Glass) * (Air - Glass)) / ((Air + Glass) * (Air + Glass));

//
//
//

uniform vec3        u_cameraEye;

//

uniform highp sampler2D   u_sceneTextureData;
uniform int               u_sceneTextureSize;

uniform highp sampler2D   u_materialsTextureData;

uniform int               u_totalShapes;

//

uniform highp sampler2D   u_lightsTextureData;

uniform int       u_sunLightsStop;
uniform int       u_spotLightsStop;

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

vec3 apply_quat_to_vec3(vec3 position, vec4 q)
{
  vec3 v = position.xyz;
  return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);
}
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

  if (shadowMode) {

    vec4 matTexel1 = texelFetch(u_materialsTextureData, ivec2(materialIndex * 2 + 1, 0), 0);

    bool castShadow = (matTexel1.g != 0.0);
    if (!castShadow) {
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

      vec3 txPos = inverseNormalMatrix * (outBestResult.position - center);
      outBestResult.txPos = txPos;

      break;
    }

    case 2: {

      //
      // Box shape
      //

      tmpRay.origin = ray.origin;
      tmpRay.direction = ray.direction;

      vec3 center = vec3(shTexel0.b, shTexel0.a, shTexel1.r);
      vec4 orientation = vec4(
        shTexel1.g,
        shTexel1.b,
        shTexel1.a,
        shTexel2.r
      );

      vec3 boxSize = shTexel2.gba;

      mat3 normalMatrix = quat_to_mat3(orientation);
      mat3 inverseNormalMatrix = inverse(normalMatrix);

      // convert ray from world space to sphere space
      tmpRay.origin = (inverseNormalMatrix * (ray.origin - center));
      tmpRay.direction = (inverseNormalMatrix * tmpRay.direction);

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
//
//
//

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

  if (u_sceneTextureSize <= 0) {
    return false;
  }

  // for (int shapeIndex = 0; shapeIndex < u_totalShapes; shapeIndex += 3) {
  //   if (shapeIndex != toIgnoreShapeIndex) {
  //     intersectSceneOneShape(shapeIndex, ray, outBestResult, shadowMode);
  //   }
  // }


  /**/
  if (u_totalShapes > 0) {

    const int maxBvhStack = 16;
    int bvhStack[maxBvhStack];

    bvhStack[0] = 0; // BVH root node index
    int top = 0;

    while (top >= 0) {

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
  //*/

  return outBestResult.hasHit;
}

void lightAt(
  vec3 impactPosition,
  vec3 impactNormal,
  // int impactShapeIndex,
  vec3 viewer,
  out LightResult lightResult
) {
  // lightResult.intensity = 0.0;
  // lightResult.color = vec3(0.0);

  lightResult.intensity = g_ambientLightIntensity;
  lightResult.color = vec3(1.0);

  // for (int index = 0; index < u_sunLightsStop; index += 1)
  // {
  //   vec4 texel0 = texelFetch(u_lightsTextureData, ivec2(index + 0, 0), 0);
  //   vec3 lightDir = texel0.rgb;
  //   float localIntensity = texel0.a;

  //   float coef = localIntensity;
  //   lightDir = normalize(lightDir);

  //   // is the sun light blocked by an object?
  //   RayResult result;
  //   if (intersectScene(RayValues(impactPosition, lightDir), result, true))
  //   {

  //     // // light ray is blocked, skip this light... unless? (<- chessboard material check)
  //     // continue;

  //     vec4 matTexel1 = texelFetch(u_materialsTextureData, ivec2(result.materialIndex * 2 + 1, 0), 0);
  //     int chessboardMaterialEnabled = int(matTexel1.a);
  //     if (chessboardMaterialEnabled == 2)
  //     {
  //       // chessboard color effect
  //       if ((fract(result.txPos.x * 0.9) > 0.5) == (fract(result.txPos.y * 0.9) > 0.5) == (fract(result.txPos.z * 0.9) > 0.5))
  //       {
  //         result.hasHit = false; // no shadow -> allow light to go through
  //       }
  //     }

  //     // TODO: check refraction -> colored light
  //     // float refractionFactor = matTexel1.r;
  //     // if (refractionFactor > 0.0 && bestIntensity)
  //     // {
  //     //   bestIntensity = ;
  //     //   bestColor =
  //     // }

  //     if (result.hasHit) {
  //       // light ray is blocked, skip this light... unless? (<- chessboard material check)
  //       continue;
  //     }
  //   }

  //   //
  //   //
  //   //

  //   float intensity = 0.0;
  //   vec3 reflectionFactor = reflect(-lightDir, impactNormal);
  //   intensity += 0.6 * pow(max(dot(reflectionFactor, viewer), 0.0), 30.0);
  //   intensity += 1.0 * dot(lightDir, impactNormal);

  //   intensity *= coef;

  //   if (lightResult.intensity < intensity) {
  //     lightResult.intensity = intensity;
  //   }
  // }

  for (int lightIndex = u_sunLightsStop; lightIndex < u_spotLightsStop; lightIndex += 2)
  {
    vec3 lightDir = vec3(1.0);
    float currLightIntensity = 1.0;
    vec3 currLightColor = vec3(1.0);

    // spot light

    vec4 texel0 = texelFetch(u_lightsTextureData, ivec2(lightIndex + 0, 0), 0);
    vec4 texel1 = texelFetch(u_lightsTextureData, ivec2(lightIndex + 1, 0), 0);
    vec3 lightPos = texel0.rgb;
    float lightRadius = texel0.a;
    float localIntensity = texel1.r;

    vec3 lightToImpactVec3 = lightPos - impactPosition;

    // is it out of the spot light effect radius?
    float lightToImpactDistance = length(lightToImpactVec3);
    if (lightToImpactDistance > lightRadius)
    {
      // out of range, do not apply this light
      continue;
    }

    lightDir.x = lightToImpactVec3.x / lightToImpactDistance; // normalize
    lightDir.y = lightToImpactVec3.y / lightToImpactDistance; // normalize
    lightDir.z = lightToImpactVec3.z / lightToImpactDistance; // normalize

    currLightIntensity = localIntensity * (1.0 - lightToImpactDistance / lightRadius);

    {
      const int maxStack = 5;
      LightStackData _stack[maxStack];

      // initialize stack
      for (int ii = 0; ii < maxStack; ++ii)
      {
        _stack[ii].used = false;
        _stack[ii].ray.direction = lightDir;
        _stack[ii].result.color = vec4(1.0);
        _stack[ii].result.reflectionFactor = 1.0;
        _stack[ii].result.refractionFactor = 1.0;
        _stack[ii].result.materialIndex = -1;
        _stack[ii].result.lightEnabled = false;
        _stack[ii].lightResult.intensity = 1.0;
        _stack[ii].lightResult.color = vec3(1.0);
      }

      // initialize first stack element
      _stack[0].used = true;
      _stack[0].ray.origin = impactPosition;

      int stackIndex = 0;

      int previousShapeIndex = -1;

      bool lightIsBlocked = false;

      for (int ii = 0; ii < maxStack; ++ii)
      {
        // intersect object
        // if reflection/refraction push to stack
        // repeat

        if (!_stack[ii].used) {
          break;
        }

        _stack[ii].result.hasHit = intersectScene(
          _stack[ii].ray,
          _stack[ii].result,
          true,
          previousShapeIndex
        );

        if (!_stack[ii].result.hasHit)
        {
          // we got no collision -> light not blocked -> keep the light
          lightIsBlocked = false;
          break;
        }

        // we got a collision -> light is blocked -> validate the collision

        if (_stack[ii].result.distance > distance(_stack[ii].ray.origin, lightPos))
        {
          // we got collision -> but the impact is behind the light -> keep the light
          lightIsBlocked = false;
          break;
        }

        previousShapeIndex = _stack[ii].result.shapeIndex;

        // light ray is blocked, skip this light... unless? (<- chessboard/refraction material check)
        vec4 matTexel0 = texelFetch(u_materialsTextureData, ivec2(_stack[ii].result.materialIndex * 2 + 0, 0), 0);
        vec4 matTexel1 = texelFetch(u_materialsTextureData, ivec2(_stack[ii].result.materialIndex * 2 + 1, 0), 0);

        vec3 shapeColor = matTexel0.rgb;
        float refractionFactor = matTexel1.r;

        // chessboard alternative material color effect
        int altChessboardMaterialEnabled = int(matTexel1.a);
        if (
          altChessboardMaterialEnabled == 2 &&
          (
            (fract(_stack[ii].result.txPos.x * 0.9) > 0.5)
            != (fract(_stack[ii].result.txPos.y * 0.9) > 0.5)
            != (fract(_stack[ii].result.txPos.z * 0.9) > 0.5)
          )
        ) {
          // light ray is blocked by one of the chessboard square -> stop now
          lightIsBlocked = true;
          break;
        }

        if (refractionFactor <= 0.01) {
          // no refraction/transparency -> light ray is blocked -> stop now
          lightIsBlocked = true;
          break;
        }

        _stack[ii].lightResult.color = shapeColor.xyz;
        _stack[ii].lightResult.intensity = refractionFactor;

        //
        // handle refraction/transparency
        //

        if (stackIndex + 1 >= maxStack)
        {
          // no more stack space left
          break;
        }

        stackIndex += 1;

        _stack[stackIndex].used = true;
        _stack[stackIndex].ray.origin = _stack[ii].result.position;

      } // for (int ii = 0; ii < maxStack; ++ii)

      if (lightIsBlocked)
      {
        // light ray is blocked by a shape -> skip this light
        continue;
      }

      // combine all colors (from last element to first element)
      for (int ii = maxStack - 1; ii >= 0; --ii)
      {
        // unused or not hit stack elements
        if (!_stack[ii].used || !_stack[ii].result.hasHit)
        {
          continue;
        }

        // used stack element
        currLightColor *= _stack[ii].lightResult.color.xyz;
        currLightIntensity *= _stack[0].lightResult.intensity;
      }

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

  } // for (int index = u_sunLightsStop; index < u_spotLightsStop; index += 2)
}

void main()
{
  //
  //
  // initial ray

  vec3 rayDir = normalize(v_position - u_cameraEye); // camera direction
  vec3 finalPixelColor = g_backgroundColor;

  const int maxStack = 6;
  StackData _stack[maxStack];

  // initialize stack
  for (int ii = 0; ii < maxStack; ++ii)
  {
    _stack[ii].used = false;
    _stack[ii].result.reflectionFactor = 0.0;
    _stack[ii].result.refractionFactor = 0.0;
    _stack[ii].result.materialIndex = -1;
    _stack[ii].result.lightEnabled = false;
    _stack[ii].reflectionIndex = -1;
    _stack[ii].refractionIndex = -1;
  }

  // initialize first stack element
  _stack[0].used = true;
  _stack[0].ray = RayValues(u_cameraEye, rayDir);
  _stack[0].result.position = u_cameraEye;
  _stack[0].result.reflectionFactor = 1.0;
  _stack[0].result.refractionFactor = 1.0;
  _stack[0].result.lightEnabled = true;
  _stack[0].reflectionIndex = -1;
  _stack[0].refractionIndex = -1;

  int stackIndex = 0;

  for (int ii = 0; ii < maxStack; ++ii)
  {
    // intersect object
    // if reflection/refraction push to stack & set index
    // repeat

    if (!_stack[ii].used) {
      break;
    }

    _stack[ii].result.hasHit = intersectScene(
      _stack[ii].ray,
      _stack[ii].result,
      false,
      -1
    );

    if (!_stack[ii].result.hasHit)
    {
      continue;
    }



    { // material handling

      int materialIndex = _stack[ii].result.materialIndex;

      vec4 matTexel0 = texelFetch(u_materialsTextureData, ivec2(materialIndex * 2 + 0, 0), 0);
      vec4 matTexel1 = texelFetch(u_materialsTextureData, ivec2(materialIndex * 2 + 1, 0), 0);
      float refractionFactor = matTexel1.r;

      _stack[ii].result.refractionFactor = refractionFactor;

      int chessboardMaterialEnabled = int(matTexel1.a);
      if (chessboardMaterialEnabled > 0)
      {

        // chessboard color effect
        if ((fract(_stack[ii].result.txPos.x * 0.9) > 0.5) == (fract(_stack[ii].result.txPos.y * 0.9) > 0.5) == (fract(_stack[ii].result.txPos.z * 0.9) > 0.5))
        {

          vec3 color = matTexel0.rgb;

          _stack[ii].result.hasHit = true;
          _stack[ii].result.color = vec4(color, 1.0);
          _stack[ii].result.reflectionFactor = 0.0; // override reflection -> plain color
          _stack[ii].result.refractionFactor = 0.0;

          if (chessboardMaterialEnabled == 2) {
            // transparent color
            _stack[ii].result.refractionFactor = 0.8;
          } else {
            // solid color
            _stack[ii].result.refractionFactor = 0.0;
          }

        }
        else
        {
          _stack[ii].result.hasHit = true;

          if (chessboardMaterialEnabled == 2) {
            // solid color
            _stack[ii].result.color = vec4(1.0, 1.0, 0.0, 1.0);
          } else {
            // solid color
            _stack[ii].result.color = vec4(0.5, 0.5, 0.5, 1.0);
          }
          _stack[ii].result.reflectionFactor = 0.0;
          _stack[ii].result.refractionFactor = 0.0;
        }
      }
      else
      {

        _stack[ii].result.hasHit = true;

        vec3 color = matTexel0.rgb;

        float reflectionFactor = matTexel0.a;

        _stack[ii].result.color = vec4(color, 0.5);
        _stack[ii].result.reflectionFactor = reflectionFactor;
        _stack[ii].result.refractionFactor = refractionFactor;
      }

      bool lightEnabled = (matTexel1.b != 0.0);
      _stack[ii].result.lightEnabled = lightEnabled;

    } // material handling

    LightResult lightResult;
    lightResult.intensity = 1.0;
    lightResult.color = vec3(1.0);

    if (_stack[ii].result.lightEnabled)
    {
      lightAt(
        _stack[ii].result.position,
        _stack[ii].result.normal,
        // _stack[ii].result.shapeIndex,
        -_stack[ii].ray.direction,
        lightResult
      );
    }

    _stack[ii].result.color.xyz *= lightResult.color * lightResult.intensity;

    if (_stack[ii].result.lightEnabled && lightResult.intensity <= 0.0)
    {
      // not lit
      continue;
    }

    // reflection/refraction here

    if (stackIndex + 1 >= maxStack)
    {
      // no more stack space left
      continue;
    }

    if (_stack[ii].result.refractionFactor > 0.0)
    {
      // push refraction to the stack
      stackIndex += 1;

      _stack[stackIndex].used = true;
      _stack[stackIndex].ray.origin = _stack[ii].result.position;

      // here we use 1.01 as coef for the new origin -> get properly inside the sphere
      _stack[stackIndex].ray.origin += _stack[ii].ray.direction * 0.01;
      _stack[stackIndex].ray.direction = refract(_stack[ii].ray.direction, _stack[ii].result.normal, Eta);
      _stack[ii].refractionIndex = stackIndex;
    }

    if (_stack[ii].result.reflectionFactor > 0.0)
    {
      // push reflection to the stack
      stackIndex += 1;

      _stack[stackIndex].used = true;
      _stack[stackIndex].ray.origin = _stack[ii].result.position;
      _stack[stackIndex].ray.direction = reflect(_stack[ii].ray.direction, _stack[ii].result.normal);

      _stack[ii].reflectionIndex = stackIndex;
    }

  }

  // combine all colors (from last element to first element)
  for (int ii = maxStack - 1; ii >= 0; --ii)
  {


    if (!_stack[ii].used || !_stack[ii].result.hasHit) {
      _stack[ii].result.color.xyz = g_backgroundColor;
      continue;
    }

    if (_stack[ii].reflectionIndex != -1)
    {
      _stack[ii].result.color.xyz =
        _stack[ii].result.color.xyz * (1.0 - _stack[ii].result.reflectionFactor) +
        _stack[_stack[ii].reflectionIndex].result.color.xyz * _stack[ii].result.reflectionFactor;
    }

    if (_stack[ii].refractionIndex != -1)
    {
      _stack[ii].result.color.xyz =
        _stack[ii].result.color.xyz * (1.0 - _stack[ii].result.refractionFactor) +
        _stack[_stack[ii].refractionIndex].result.color.xyz * _stack[ii].result.refractionFactor;
    }
  }

  if (_stack[0].result.hasHit) {
    finalPixelColor = _stack[0].result.color.xyz;
  }

  o_color = vec4(finalPixelColor, 1.0);

}
