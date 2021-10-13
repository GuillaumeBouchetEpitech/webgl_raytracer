#version 300 es

precision highp float;

in vec2 a_vertexPosition;
in vec3 a_plotPosition;

out vec3 v_position;

void main(void)
{
    gl_Position = vec4(a_vertexPosition, 1.0, 1.0);

    v_position = a_plotPosition;
}
