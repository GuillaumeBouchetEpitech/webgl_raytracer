
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
uniform int         u_sceneTextureSize;

uniform highp sampler2D   u_materialsTextureData;

uniform int       u_totalShapes;

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

const float     g_ambiantLight = 0.15;

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
};


struct StackData
{
  // int parentIndex;
  bool used;
  RayValues ray;
  RayResult result;
  int reflectionIndex;
  int refractionIndex;
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


void intersectSceneOneShape(int index, RayValues ray, inout RayResult outBestResult, bool shadowMode)
{
  RayValues tmpRay;
  vec3 normal;

  vec4 shTexel0 = texelFetch(u_sceneTextureData, ivec2(index + 0, 0), 0);
  vec4 shTexel1 = texelFetch(u_sceneTextureData, ivec2(index + 1, 0), 0);
  vec4 shTexel2 = texelFetch(u_sceneTextureData, ivec2(index + 2, 0), 0);

  int materialIndex = int(shTexel0.g);
  vec4 matTexel0 = texelFetch(u_materialsTextureData, ivec2(materialIndex * 2 + 0, 0), 0);
  vec4 matTexel1 = texelFetch(u_materialsTextureData, ivec2(materialIndex * 2 + 1, 0), 0);

  bool castShadow = (matTexel1.g != 0.0);

  if (shadowMode && !castShadow) {
    return; // this sphere does not cast a shadow
  }

  int shapeType = int(shTexel0.r);

  switch (shapeType) {
    case 1: {

      vec3 center = vec3(shTexel0.b, shTexel0.a, shTexel1.r);

      float radius = shTexel2.g;

      float refractionFactor = matTexel1.r;
      if (refractionFactor > 0.0)
      {
        // [refraction logic] -> primary ray

        tmpRay.origin = ray.origin - center;
        tmpRay.direction = ray.direction;

        float currDistance1 = 0.0;
        if (
          !intersectSphere(tmpRay, radius, currDistance1, normal) ||
          (outBestResult.distance > 0.0 && currDistance1 > outBestResult.distance)
        ) {
          return;
        }

        // [refraction logic] -> secondary ray -> inside the sphere

        // here we use 1.01 as coef for the new origin -> get properly inside the sphere
        vec3 newOrigin = ray.origin + (currDistance1 * 1.01) * ray.direction;

        tmpRay.origin = (newOrigin - center);
        tmpRay.direction = ray.direction;

        tmpRay.direction = refract(tmpRay.direction, -normal, Eta);

        float currDistance2 = 0.0;
        if (
          !intersectSphere(tmpRay, radius, currDistance2, normal) ||
          (outBestResult.distance > 0.0 && currDistance2 > outBestResult.distance)
        ) {
          return;
        }

        float reflectionFactor = matTexel0.a;

        outBestResult.hasHit = true;
        outBestResult.distance = currDistance1 + currDistance2;
        outBestResult.position = newOrigin + (currDistance2 * 1.01) * ray.direction;
        outBestResult.normal = normal;
        outBestResult.reflectionFactor = reflectionFactor;
        outBestResult.refractionFactor = refractionFactor;

        bool lightEnabled = (matTexel1.b != 0.0);
        outBestResult.lightEnabled = lightEnabled;

        vec3 color = matTexel0.rgb;

        outBestResult.color = vec4(color, 0.5);

        return; // bypass non refractive logic
      }


      vec4 orientation = vec4(
        shTexel1.g,
        shTexel1.b,
        shTexel1.a,
        shTexel2.r
      );
      mat3 normalMatrix = quat_to_mat3(orientation);
      mat3 inverseNormalMatrix = inverse(normalMatrix);

      // convert ray from world space to box space
      tmpRay.origin = (inverseNormalMatrix * (ray.origin - center));
      tmpRay.direction = (inverseNormalMatrix * ray.direction);

      float currDistance = 0.0;
      if (
        !intersectSphere(tmpRay, radius, currDistance, normal) ||
        (outBestResult.distance > 0.0 && currDistance > outBestResult.distance)
      ) {
        return;
      }

      // convert normal from box space to world space
      normal = normalMatrix * normal;

      outBestResult.hasHit = true;
      outBestResult.distance = currDistance;
      outBestResult.position = ray.origin + currDistance * ray.direction;
      outBestResult.normal = normal;
      outBestResult.refractionFactor = 0.0;

      bool chessboardMaterialEnabled = (matTexel1.a != 0.0);

      if (chessboardMaterialEnabled)
      {
        vec3 localPos = ray.origin + currDistance * ray.direction;
        vec3 txPos = inverseNormalMatrix * (localPos - center);

        // chessboard color effect
        if ((fract(txPos.x * 0.9) > 0.5) == (fract(txPos.y * 0.9) > 0.5) == (fract(txPos.z * 0.9) > 0.5))
        {

          if (shadowMode)
          {
            outBestResult.hasHit = false; // no shadow -> allow light to go through
            // outBestResult.color = vec4(1.0, 1.0, 0.0, 1.0);
            outBestResult.reflectionFactor = 0.0; // override reflection -> plain color
            outBestResult.refractionFactor = 0.0;
          }
          else
          {
            vec3 color = matTexel0.rgb;

            outBestResult.hasHit = true;
            outBestResult.color = vec4(color, 1.0);
            outBestResult.reflectionFactor = 0.0; // override reflection -> plain color
            outBestResult.refractionFactor = 1.0;
          }

          return;
        }
        else
        {
          outBestResult.hasHit = true;
          outBestResult.distance = currDistance;
          outBestResult.position = ray.origin + currDistance * ray.direction;
          outBestResult.normal = normal;
          // outBestResult.refractionFactor = 0.0;


          // blue/green, mat
          outBestResult.color = vec4(1.0, 1.0, 1.0, 1.0);
          outBestResult.reflectionFactor = 0.0;
          outBestResult.refractionFactor = 0.0;
        }
      }
      else
      {

        outBestResult.hasHit = true;
        outBestResult.distance = currDistance;
        outBestResult.position = ray.origin + currDistance * ray.direction;
        outBestResult.normal = normal;
        // outBestResult.refractionFactor = 0.0;

        vec3 color = matTexel0.rgb;

        float reflectionFactor = matTexel0.a;

        outBestResult.color = vec4(color, 0.5);
        outBestResult.reflectionFactor = reflectionFactor;
        outBestResult.refractionFactor = refractionFactor;
      }

      bool lightEnabled = (matTexel1.b != 0.0);
      outBestResult.lightEnabled = lightEnabled;


      break;
    }

    case 2: {


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

      float refractionFactor = matTexel1.r;
      if (refractionFactor > 0.0)
      {

        // refraction logic

        // convert ray from world space to sphere space
        mat3 normalMatrix = quat_to_mat3(orientation);
        mat3 inverseNormalMatrix = inverse(normalMatrix);

        tmpRay.origin = (inverseNormalMatrix * (ray.origin - center));
        tmpRay.direction = (inverseNormalMatrix * ray.direction);

        float currDistance1 = 0.0;
        if (
          !intersectBox(tmpRay, boxSize, currDistance1, normal) ||
          (outBestResult.distance > 0.0 && currDistance1 > outBestResult.distance)
        ) {
          return;
        }

        // now collide with the inside of the box

        vec3 newOrigin = ray.origin + (currDistance1 * 1.000) * ray.direction;

        tmpRay.origin = inverseNormalMatrix * (newOrigin - center);
        tmpRay.direction = refract(tmpRay.direction, normal, Eta);

        float currDistance2 = 0.0;
        if (
          !intersectBox(tmpRay, boxSize, currDistance2, normal) ||
          (outBestResult.distance > 0.0 && currDistance2 > outBestResult.distance)
        ) {
          return;
        }

        // convert normal from box space to world space
        normal = normalMatrix * normal;

        float reflectionFactor = matTexel0.a;

        outBestResult.hasHit = true;
        outBestResult.distance = currDistance1 + currDistance2;
        outBestResult.position = newOrigin + (currDistance2 * 1.000) * ray.direction;
        outBestResult.normal = normal;
        outBestResult.reflectionFactor = reflectionFactor;
        outBestResult.refractionFactor = refractionFactor;

        bool lightEnabled = (matTexel1.b != 0.0);
        outBestResult.lightEnabled = lightEnabled;

        vec3 color = matTexel0.rgb;
        outBestResult.color = vec4(color, 0.5);

        return; // bypass non refractive logic
      }

      // convert ray from world space to sphere space
      mat3 normalMatrix = quat_to_mat3(orientation);
      mat3 inverseNormalMatrix = inverse(normalMatrix);
      tmpRay.origin = (inverseNormalMatrix * (ray.origin - center));
      tmpRay.direction = (inverseNormalMatrix * tmpRay.direction);

      float currDistance = 0.0;
      if (
        !intersectBox(tmpRay, boxSize, currDistance, normal) ||
        (outBestResult.distance > 0.0 && currDistance > outBestResult.distance)
      ) {
        return;
      }

      // convert normal from box space to world space
      normal = normalMatrix * normal;

      outBestResult.hasHit = true;
      outBestResult.distance = currDistance;
      outBestResult.position = ray.origin + currDistance * ray.direction;
      outBestResult.normal = normal;
      outBestResult.refractionFactor = 0.0;

      bool chessboardMaterialEnabled = (matTexel1.a != 0.0);

      if (chessboardMaterialEnabled)
      {
        outBestResult.reflectionFactor = 0.5;
        outBestResult.refractionFactor = 0.0; // TODO

        // the multiplication by 0.999 will remove graphic artifact
        vec3 txPos = (inverseNormalMatrix * 0.999) * (center - outBestResult.position);

        // chessboard color effect
        // if (fract(txPos.x * 0.2) > 0.5 == fract(txPos.z * 0.2) > 0.5 == fract(txPos.y * 0.2) > 0.5)
        if (fract(txPos.x * 0.9) > 0.5 == fract(txPos.y * 0.9) > 0.5 == fract(txPos.z * 0.9) > 0.5)
        {
          outBestResult.color = vec4(1.0);
        }
        else
        {
          outBestResult.color = vec4(0.0, 0.4, 0.45, 1.0);
        }
      }
      else
      {
        vec3 color = matTexel0.rgb;

        float reflectionFactor = matTexel0.a;

        outBestResult.color = vec4(color, 1.0);
        outBestResult.reflectionFactor = reflectionFactor;
        outBestResult.refractionFactor = refractionFactor;
      }

      bool lightEnabled = (matTexel1.b != 0.0);
      outBestResult.lightEnabled = lightEnabled;


      break;
    }
    case 3: {



      tmpRay.origin = ray.origin;
      tmpRay.direction = ray.direction;

      vec3 v0 = vec3(shTexel0.b, shTexel0.a, shTexel1.r);
      vec3 v1 = shTexel1.gba;
      vec3 v2 = shTexel2.rgb;

      float currDistance = 0.0;
      if (
        !intersectTriangle(tmpRay, v0, v1, v2, currDistance, normal) ||
        (outBestResult.distance > 0.0 && currDistance > outBestResult.distance)
      ) {
        return;
      }

      outBestResult.hasHit = true;
      outBestResult.distance = currDistance;
      outBestResult.position = ray.origin + currDistance * ray.direction;
      outBestResult.normal = normal;

      outBestResult.refractionFactor = 0.0; // TODO

      vec3 color = matTexel0.rgb;

      float reflectionFactor = matTexel0.a;

      outBestResult.color = vec4(color, 1.0);
      outBestResult.reflectionFactor = reflectionFactor;

      bool lightEnabled = (matTexel1.b != 0.0);
      outBestResult.lightEnabled = lightEnabled;



      break;
    }
  }


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

bool intersectScene(RayValues ray, out RayResult outBestResult, bool shadowMode)
{
  float bestDistance = -1.0;

  outBestResult.hasHit = false;
  outBestResult.distance = -1.0;

  if (u_sceneTextureSize <= 0) {
    return false;
  }

  // for (int index = 0; index < u_totalShapes; index += 3) {
  //   intersectSceneOneShape(index, ray, outBestResult, shadowMode);
  // }

  if (u_totalShapes == 0) {
    return outBestResult.hasHit;
  }

  /**/
  {
    const int maxBvhStack = 32;
    int bvhStack[maxBvhStack];

    bvhStack[0] = 0; // BVH root node index
    int top = 0;

    while (top >= 0) {

      // pop stack
      int bv_idx = bvhStack[top];
      top -= 1;

      vec4 rootNodeTexel0 = texelFetch(u_bvhDataTexture, ivec2(bv_idx * 3 + 0, 0), 0);
      vec4 rootNodeTexel1 = texelFetch(u_bvhDataTexture, ivec2(bv_idx * 3 + 1, 0), 0);
      vec4 rootNodeTexel2 = texelFetch(u_bvhDataTexture, ivec2(bv_idx * 3 + 2, 0), 0);

      vec3 aabbMin = rootNodeTexel0.rgb;
      vec3 aabbMax = vec3(rootNodeTexel0.a, rootNodeTexel1.r, rootNodeTexel1.g);

      if (rayIntersectBvhAABB(ray, aabbMin, aabbMax)) {

        //

        int leftNodeIndex = int(rootNodeTexel1.b);
        if (leftNodeIndex >= 0 && leftNodeIndex * 3 < 2048) {
          // push left bvh node index on to stack
          top += 1;
          bvhStack[top] = leftNodeIndex;
        }

        int rightNodeIndex = int(rootNodeTexel1.a);
        if (rightNodeIndex >= 0 && rightNodeIndex * 3 < 2048) {
          // push right bvh node index on to stack
          top += 1;
          bvhStack[top] = rightNodeIndex;
        }

        //

        int leftLEafIndex = int(rootNodeTexel2.r);
        if (leftLEafIndex * 3 >= 0 && leftLEafIndex * 3 < u_totalShapes) {
          intersectSceneOneShape(leftLEafIndex * 3, ray, outBestResult, shadowMode);
        }

        int rightLeafIndex = int(rootNodeTexel2.g);
        if (rightLeafIndex * 3 >= 0 && rightLeafIndex * 3 < u_totalShapes) {
          intersectSceneOneShape(rightLeafIndex * 3, ray, outBestResult, shadowMode);
        }

        //
      }

    }

  }
  //*/



  { // plane test

    // vec3 planeNormal = normalize(vec3(0.0, 0.0, 1.0));
    // float val = intersectPlane(tmpRay, planeNormal, 35.0/4.0*3.0);

    // vec3 planeNormal = normalize(vec3(0.0, 0.0, 1.0));
    // float val = intersectPlane(tmpRay, planeNormal, 0.0);

    // vec3 planeNormal = normalize(vec3(0.0, 0.0, 1.0));
    // float val = intersectPlane(tmpRay, planeNormal, 10.0);

    // if (val > 0.0 && (bestDistance <= 0.0 || val < bestDistance))
    // {
    //     outBestResult.hasHit = true;
    //     outBestResult.distance = val;
    //     outBestResult.position = ray.origin + val * ray.direction;
    //     outBestResult.normal = vec3(planeNormal);
    //     outBestResult.color = vec4(1.0, 1.0, 1.0, 1.0);
    //     outBestResult.reflectionFactor = 0.0;
    //     outBestResult.lightEnabled = true;
    // }

  } // plane test

  return outBestResult.hasHit;
}

float lightAt(vec3 impactPosition, vec3 impactNormal, vec3 viewer)
{
  float bestIntensity = 0.0;

  for (int index = 0; index < u_sunLightsStop; index += 1)
  {
    vec4 texel0 = texelFetch(u_lightsTextureData, ivec2(index + 0, 0), 0);
    vec3 lightDir = texel0.rgb;
    float localIntensity = texel0.a;

    float coef = localIntensity;
    lightDir = normalize(lightDir);

    // is the sun light blocked by an object?
    RayResult result;
    if (intersectScene(RayValues(impactPosition, lightDir), result, true)) {
      // light ray is blocked, skip this light
      continue;
    }

    //
    //
    //

    float intensity = 0.0;
    vec3 reflectionFactor = reflect(-lightDir, impactNormal);
    intensity += 0.6 * pow(max(dot(reflectionFactor, viewer), 0.0), 30.0);
    intensity += 1.0 * dot(lightDir, impactNormal);

    intensity *= coef;

    if (bestIntensity < intensity) {
      bestIntensity = intensity;
    }
  }

  for (int index = u_sunLightsStop; index < u_spotLightsStop; index += 2)
  {
    vec3 lightDir = vec3(1.0);
    float coef = 1.0;

    // spot light

    vec4 texel0 = texelFetch(u_lightsTextureData, ivec2(index + 0, 0), 0);
    vec4 texel1 = texelFetch(u_lightsTextureData, ivec2(index + 1, 0), 0);
    vec3 lightPos = texel0.rgb;
    float lightRadius = texel0.a;
    float localIntensity = texel1.r;

    vec3 lightToImpactVec3 = lightPos - impactPosition;

    // is it out of the spot light effect radius?
    float lightToImpactDistance = length(lightToImpactVec3);
    if (lightToImpactDistance > lightRadius) {
      // out of range, do not apply this light
      continue;
    }

    lightDir.x = lightToImpactVec3.x / lightToImpactDistance; // normalize
    lightDir.y = lightToImpactVec3.y / lightToImpactDistance; // normalize
    lightDir.z = lightToImpactVec3.z / lightToImpactDistance; // normalize

    coef = localIntensity * (1.0 - lightToImpactDistance / lightRadius);

    RayResult result;
    if (
      // is the spot light blocked by an object?
      intersectScene(RayValues(impactPosition, lightDir), result, true) &&
      // is the blocking object in range of the spot light effect radius?
      result.distance < lightToImpactDistance
    ) {
      // light ray is blocked, skip this light
      continue;
    }

    //
    //
    //

    float intensity = 0.0;
    vec3 reflectionFactor = reflect(-lightDir, impactNormal);
    intensity += 0.6 * pow(max(dot(reflectionFactor, viewer), 0.0), 30.0);
    intensity += 1.0 * dot(lightDir, impactNormal);

    intensity *= coef;

    if (bestIntensity < intensity) {
      bestIntensity = intensity;
    }
  }

  return max(g_ambiantLight, bestIntensity);
}

void main()
{
  //
  //
  // initial ray

  vec3 rayDir = normalize(v_position - u_cameraEye); // camera direction
  vec3 finalPixelColor = g_backgroundColor;

  const int maxStack = 4;
  StackData _stack[maxStack];

  // initialize stack
  for (int ii = 0; ii < maxStack; ++ii)
  {
    _stack[ii].used = false;
    _stack[ii].result.reflectionFactor = 0.0;
    _stack[ii].result.refractionFactor = 0.0;
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
      false
    );

    if (!_stack[ii].result.hasHit)
    {
      continue;
    }

    float lightIntensity = 1.0;

    if (_stack[ii].result.lightEnabled)
    {
      lightIntensity = lightAt(
        _stack[ii].result.position,
        _stack[ii].result.normal,
        -_stack[ii].ray.direction
      );
    }

    _stack[ii].result.color.xyz *= lightIntensity;

    if (_stack[ii].result.lightEnabled && lightIntensity <= 0.0)
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
