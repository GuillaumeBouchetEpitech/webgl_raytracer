#version 300 es

precision highp float;

uniform mat4 u_modelViewMatrix;
uniform mat4 u_projectionMatrix;

in vec3 a_vertexPosition;
in vec3 a_vertexColor;

out vec4 v_color;

void main(void)
{
    v_color = vec4(a_vertexColor, 1.0);

    gl_Position = u_projectionMatrix * u_modelViewMatrix * vec4(a_vertexPosition, 1.0);
}
