
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
