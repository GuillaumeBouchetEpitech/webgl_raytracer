
//
//
//
//
//

// MARK: Sphere
bool intersectSphere(RayValues ray, float radius, out float outDistance, out vec3 normal)
{
  float b = dot(ray.origin, ray.direction);
  float c = dot(ray.origin, ray.origin) - radius * radius;
  float h = b * b - c;
  if (h < 0.0) {
    return false;
  }

  h = sqrt(h);

  float d1 = -b - h;
  if (d1 >= NEAR_VALUE && d1 <= FAR_VALUE)
  {
    normal = normalize(ray.origin + ray.direction * d1);
    outDistance = d1;
    return true;
  }

  float d2 = -b + h;
  if (d2 >= NEAR_VALUE && d2 <= FAR_VALUE)
  {
    normal = normalize(ray.origin + ray.direction * d2);
    outDistance = d2;
    return true;
  }

  return false;
}

// MARK: Box
bool intersectBox(RayValues ray, vec3 boxSize, out float outDistance, out vec3 normal)
{
  // safe -> mitigated risk of division by zero
  ray.direction = mix(ray.direction, vec3(-1e-8), equal(ray.direction, vec3(0.0)));

  vec3 m = sign(ray.direction) / abs(ray.direction);
  vec3 n = m * ray.origin;
  vec3 k = abs(m) * boxSize;

  vec3 t1 = -n - k;
  vec3 t2 = -n + k;

  float tN = max(max(t1.x, t1.y), t1.z);
  float tF = min(min(t2.x, t2.y), t2.z);

  if (tN > tF || tF <= 0.0) {
    return false;
  }

  if (tN >= NEAR_VALUE && tN <= FAR_VALUE)
  {
    normal = normalize(-sign(ray.direction) * step(t1.yzx, t1.xyz) * step(t1.zxy, t1.xyz));
    outDistance = tN;
    return true;
  }

  if (tF >= NEAR_VALUE && tF <= FAR_VALUE)
  {
    normal = normalize(-sign(ray.direction) * step(t1.yzx, t1.xyz) * step(t1.zxy, t1.xyz));
    outDistance = tF;
    return true;
  }

  return false;
}

// MARK: Triangle
bool intersectTriangle(RayValues ray, vec3 v0, vec3 v1, vec3 v2, out float outDistance, out vec3 normal)
{
  vec3 v1v0 = v1 - v0;
  vec3 v2v0 = v2 - v0;
  vec3 rov0 = ray.origin - v0;

  vec3 n = cross(v1v0, v2v0);
  vec3 q = cross(rov0, ray.direction);

  float tmpDotVal = dot(ray.direction, n);

  // safe -> mitigated risk of division by zero
  tmpDotVal = (tmpDotVal == 0.0 ? -1e-8 : tmpDotVal);

  float d = 1.0 / tmpDotVal;

  float u = d * dot(-q, v2v0);
  float v = d * dot(q, v1v0);
  float t = d * dot(-n, rov0);

  if (u < 0.0 || v < 0.0 || (u + v) > 1.0 || t < NEAR_VALUE || t > FAR_VALUE) {
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
//     const float NEAR_VALUE = 0.001; // TODO: hardcoded
//     const float FAR_VALUE = 1000.0; // TODO: hardcoded

//     float a = dot(ray.direction, normal);
//     float d = -(dot(ray.origin, normal) + offset) / a;

//     if (a > 0.0 || d < nearValue || d > FAR_VALUE)
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
