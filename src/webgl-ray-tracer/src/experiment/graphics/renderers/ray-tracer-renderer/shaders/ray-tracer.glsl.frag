
#version 300 es

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

uniform sampler2D   u_sceneTextureData;
uniform int         u_sceneTextureSize;

uniform int       u_spheresStart;
uniform int       u_spheresStop;

uniform int       u_boxesStart;
uniform int       u_boxesStop;

uniform int       u_trianglesStart;
uniform int       u_trianglesStop;

//

uniform sampler2D   u_lightsTextureData;

uniform int       u_sunLightsStart;
uniform int       u_sunLightsStop;

uniform int       u_spotLightsStart;
uniform int       u_spotLightsStop;

//
//
//

in vec3  v_position;

out vec4 o_color;

//

const float     g_ambiantLight = 0.05;

const int       g_maxTotalReflection = 2;
const bool      g_shadowsEnabled = true;

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

//
//
//
//
//

float getSceneDataByIndex(int index)
{
  return texelFetch(u_sceneTextureData, ivec2(index, 0), 0).x;
}

vec3 getSceneVec3ByIndex(int index)
{
  return vec3(
    texelFetch(u_sceneTextureData, ivec2(index + 0, 0), 0).x,
    texelFetch(u_sceneTextureData, ivec2(index + 1, 0), 0).x,
    texelFetch(u_sceneTextureData, ivec2(index + 2, 0), 0).x
  );
}

float getLightsDataByIndex(int index)
{
  return texelFetch(u_lightsTextureData, ivec2(index, 0), 0).x;
}

vec3 getLightsVec3ByIndex(int index)
{
  return vec3(
    texelFetch(u_lightsTextureData, ivec2(index + 0, 0), 0).x,
    texelFetch(u_lightsTextureData, ivec2(index + 1, 0), 0).x,
    texelFetch(u_lightsTextureData, ivec2(index + 2, 0), 0).x
  );
}

//
//
//
//
//

bool intersectSphere(
  RayValues ray,
  float radius,
  out float outDistance,
  out vec3 normal
) {
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

bool intersectScene(RayValues ray, out RayResult outBestResult, bool shadowMode)
{
  float bestDistance = -1.0;

  outBestResult.hasHit = false;
  outBestResult.distance = -1.0;

  if (u_sceneTextureSize <= 0) {
    return false;
  }

  RayValues tmpRay;
  vec3 normal;

  for (int index = u_spheresStart; index < u_spheresStop; index += 12)
  {
    bool castShadow = (getSceneDataByIndex(index + 9) != 0.0);

    if (shadowMode && !castShadow) {
      continue;
    }

    tmpRay.origin = ray.origin;
    tmpRay.direction = ray.direction;

    vec3 center = getSceneVec3ByIndex(index + 0);

    tmpRay.origin -= center;

    float radius = getSceneDataByIndex(index + 3);

    float currDistance = 0.0;
    if (
      !intersectSphere(tmpRay, radius, currDistance, normal) ||
      (outBestResult.distance > 0.0 && currDistance > outBestResult.distance)
    ) {
      continue;
    }

    outBestResult.hasHit = true;
    outBestResult.distance = currDistance;
    outBestResult.position = ray.origin + currDistance * ray.direction;
    outBestResult.normal = normal;
    outBestResult.refractionFactor = 0.0;

    bool chessboardMaterialEnabled = (getSceneDataByIndex(index + 11) != 0.0);

    if (chessboardMaterialEnabled)
    {
      // vec3 txPos = (txx * vec4(outBestResult.position - center, 1.0)).xyz;
      vec3 txPos = (vec4(outBestResult.position - center, 1.0)).xyz;
      // chessboard color effect
      if (fract(txPos.x * 0.2) > 0.5 == fract(txPos.z * 0.2) > 0.5 == fract(txPos.y * 0.2) > 0.5)
      {
        outBestResult.color = vec4(1.0);
        outBestResult.reflectionFactor = 0.3;
      }
      else
      {
        outBestResult.color = vec4(0.0, 0.4, 0.45, 1.0);
        outBestResult.reflectionFactor = 0.0;
      }
    }
    else
    {
      vec3 color = getSceneVec3ByIndex(index + 4);

      float reflectionFactor = getSceneDataByIndex(index + 7);
      float refractionFactor = getSceneDataByIndex(index + 8);

      outBestResult.color = vec4(color, 0.5);
      outBestResult.reflectionFactor = reflectionFactor;
      outBestResult.refractionFactor = refractionFactor;
    }

    bool lightEnabled = (getSceneDataByIndex(index + 10) != 0.0);
    outBestResult.lightEnabled = lightEnabled;

    // if (shadowMode)
    //     return true;
  }

  for (int index = u_boxesStart; index < u_boxesStop; index += 26)
  {
    bool castShadow = (getSceneDataByIndex(index + 23) != 0.0);

    if (shadowMode && !castShadow) {
      continue;
    }

    tmpRay.origin = ray.origin;
    tmpRay.direction = ray.direction;

    mat4 normalTransformationMatrix = mat4(
      getSceneDataByIndex(index + 0),
      getSceneDataByIndex(index + 1),
      getSceneDataByIndex(index + 2),
      getSceneDataByIndex(index + 3),

      getSceneDataByIndex(index + 4),
      getSceneDataByIndex(index + 5),
      getSceneDataByIndex(index + 6),
      getSceneDataByIndex(index + 7),

      getSceneDataByIndex(index + 8),
      getSceneDataByIndex(index + 9),
      getSceneDataByIndex(index + 10),
      getSceneDataByIndex(index + 11),

      getSceneDataByIndex(index + 12),
      getSceneDataByIndex(index + 13),
      getSceneDataByIndex(index + 14),
      getSceneDataByIndex(index + 15)
    );

    vec3 boxSize = getSceneVec3ByIndex(index + 16);

    mat4 inversedTransformationMatrix = inverse(normalTransformationMatrix);

    // convert ray from world space to box space
    tmpRay.origin = (inversedTransformationMatrix * vec4(tmpRay.origin, 1.0)).xyz;
    tmpRay.direction = (inversedTransformationMatrix * vec4(tmpRay.direction, 0.0)).xyz;

    float currDistance = 0.0;
    if (
      !intersectBox(tmpRay, boxSize, currDistance, normal) ||
      (outBestResult.distance > 0.0 && currDistance > outBestResult.distance)
    ) {
      continue;
    }

    // convert normal from box space to world space
    normal = (normalTransformationMatrix * vec4(normal, 0.0)).xyz;

    outBestResult.hasHit = true;
    outBestResult.distance = currDistance;
    outBestResult.position = ray.origin + currDistance * ray.direction;
    outBestResult.normal = normal;
    outBestResult.refractionFactor = 0.0; // TODO

    bool chessboardMaterialEnabled = (getSceneDataByIndex(index + 25) != 0.0);

    if (chessboardMaterialEnabled)
    {
      vec3 txPos = (inversedTransformationMatrix * vec4(outBestResult.position, 1.0)).xyz;

      // chessboard color effect
      if (fract(txPos.x * 0.2) > 0.5 == fract(txPos.z * 0.2) > 0.5 == fract(txPos.y * 0.2) > 0.5)
      {
        outBestResult.color = vec4(1.0);
        outBestResult.reflectionFactor = 0.3;
      }
      else
      {
        outBestResult.color = vec4(0.0, 0.4, 0.45, 1.0);
        outBestResult.reflectionFactor = 0.0;
      }
    }
    else
    {
      vec3 color = getSceneVec3ByIndex(index + 19);

      float reflectionFactor = getSceneDataByIndex(index + 22);

      outBestResult.color = vec4(color, 1.0);
      outBestResult.reflectionFactor = reflectionFactor;
    }

    bool lightEnabled = (getSceneDataByIndex(index + 24) != 0.0);
    outBestResult.lightEnabled = lightEnabled;

    // if (shadowMode)
    //     return true;
  }

  for (int index = u_trianglesStart; index < u_trianglesStop; index += 15)
  {
    bool castShadow = (getSceneDataByIndex(index + 13) != 0.0);

    if (shadowMode && !castShadow) {
      continue;
    }

    tmpRay.origin = ray.origin;
    tmpRay.direction = ray.direction;

    vec3 v0 = getSceneVec3ByIndex(index + 0);
    vec3 v1 = getSceneVec3ByIndex(index + 3);
    vec3 v2 = getSceneVec3ByIndex(index + 6);

    float currDistance = 0.0;
    if (
      !intersectTriangle(tmpRay, v0, v1, v2, currDistance, normal) ||
      (outBestResult.distance > 0.0 && currDistance > outBestResult.distance)
    ) {
      continue;
    }

    outBestResult.hasHit = true;
    outBestResult.distance = currDistance;
    outBestResult.position = ray.origin + currDistance * ray.direction;
    outBestResult.normal = normal;
    outBestResult.refractionFactor = 0.0; // TODO

    vec3 color = getSceneVec3ByIndex(index + 9);

    float reflectionFactor = getSceneDataByIndex(index + 12);

    outBestResult.color = vec4(color, 1.0);
    outBestResult.reflectionFactor = reflectionFactor;

    bool lightEnabled = (getSceneDataByIndex(index + 14) != 0.0);
    outBestResult.lightEnabled = lightEnabled;

    // if (shadowMode)
    //     return true;
  }

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

  for (int index = u_sunLightsStart; index < u_sunLightsStop; index += 4)
  {
    if (!g_shadowsEnabled) {
      continue;
    }

    vec3 lightDir = getLightsVec3ByIndex(index + 0);
    float localIntensity = getLightsDataByIndex(index + 3);

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

  for (int index = u_spotLightsStart; index < u_spotLightsStop; index += 5)
  {
    vec3 lightDir = vec3(1.0);
    float coef = 1.0;

    // spot light

    vec3 lightPos = getLightsVec3ByIndex(index + 0);
    float lightRadius = getLightsDataByIndex(index + 3);

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

    float localIntensity = getLightsDataByIndex(index + 4);

    coef = localIntensity * (1.0 - lightToImpactDistance / lightRadius);

    if (!g_shadowsEnabled) {
      continue;
    }

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

  RayValues currRay = RayValues(u_cameraEye, rayDir);
  RayResult result;

  result.position = u_cameraEye;
  result.reflectionFactor = 1.0;
  result.lightEnabled = true;

  float lastReflectionFactor = 1.0;
  float lastRefractionFactor = 1.0;

  const int maxIteration = g_maxTotalReflection;
  for (int iterationLeft = maxIteration; iterationLeft >= 0; --iterationLeft)
  {
    if (
      result.reflectionFactor <= 0.05 &&
      result.refractionFactor <= 0.05
    ) {
      break;
    }

    bool mustStop = false;

    currRay = RayValues(result.position, rayDir);

    result.hasHit = intersectScene(currRay, result, false);

    vec3 tmpColor = g_backgroundColor;

    if (result.hasHit)
    {
      float lightIntensity = 1.0;

      if (result.lightEnabled)
      {
        lightIntensity = lightAt(result.position, result.normal, -currRay.direction);

        if (lightIntensity <= 0.0)
        {
          // not lit
          mustStop = true;
        }
      }

      tmpColor = result.color.xyz * lightIntensity;
    }

    // vec3 incident = normalize( vec3( vertex - camera ) );

    // if (result.refractionFactor > 0.05) {

    //   finalPixelColor = finalPixelColor * (1.0 - lastReflectionFactor) + tmpColor * lastReflectionFactor;

    //   if (mustStop || !result.hasHit)
    //   {
    //     break;
    //   }

    //   // lastReflectionFactor *= result.reflectionFactor;
    //   lastRefractionFactor *= result.refractionFactor;

    //   // rayDir = refract(rayDir, result.normal);
    //   rayDir = refract(rayDir, result.normal, Eta);

    //   continue;
    // }

    finalPixelColor = finalPixelColor * (1.0 - lastReflectionFactor) + tmpColor * lastReflectionFactor;

    if (mustStop || !result.hasHit)
    {
      break;
    }

    lastReflectionFactor *= result.reflectionFactor;

    rayDir = reflect(rayDir, result.normal);

    // result.refractionFactor
    // rayDir = refract(rayDir, result.normal, Eta);

  }

  o_color = vec4(finalPixelColor, 1.0);
}
