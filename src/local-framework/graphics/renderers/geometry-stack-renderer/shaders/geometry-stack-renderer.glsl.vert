#version 300 es

precision highp float;

uniform mat4 u_composedMatrix;
uniform vec3 u_lightPos;

in vec3 a_vertexPosition;
in vec3 a_vertexNormal;

in vec3 a_offsetPosition;
in vec4 a_offsetOrientation; // quaternion
in vec3 a_offsetScale;
in vec3 a_offsetColor;

out vec3 v_color;

// #include "./assets/graphics/shaders/_common/_common-quat-rotations.glsl.vert"

vec4 quat_from_axis_angle(vec3 axis, float angle)
{
  vec4 qr;
  // float half_angle = (angle * 0.5) * 3.14159 / 180.0;
  float half_angle = (angle * 0.5);
  qr.x = axis.x * sin(half_angle);
  qr.y = axis.y * sin(half_angle);
  qr.z = axis.z * sin(half_angle);
  qr.w = cos(half_angle);
  return qr;
}

vec3 apply_quat_to_vec3(vec3 position, vec4 q)
{
  vec3 v = position.xyz;
  return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v);
}

// #include "./assets/graphics/shaders/_common/_common-apply-lighting.glsl.frag"

float getDiffuseLightingRatio(vec3 lightDir, vec3 normal)
{
  normal = normalize(normal);
  lightDir = normalize(lightDir);

  return max(dot(lightDir, normal), 0.0);
}

void main(void)
{
	vec3 worldSpacePosition = a_offsetPosition + apply_quat_to_vec3(a_vertexPosition * a_offsetScale, a_offsetOrientation);
	vec3 worldSpaceNormal = apply_quat_to_vec3(a_vertexNormal, a_offsetOrientation);

	gl_Position = u_composedMatrix * vec4(worldSpacePosition, 1.0);

	float diffuseRatio = getDiffuseLightingRatio(u_lightPos - worldSpacePosition, worldSpaceNormal);

	v_color = a_offsetColor * (0.3 + diffuseRatio);
}
