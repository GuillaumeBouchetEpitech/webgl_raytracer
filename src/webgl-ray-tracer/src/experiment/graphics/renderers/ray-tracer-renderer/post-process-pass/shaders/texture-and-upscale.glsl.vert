
#version 300 es

precision highp float;

in vec2 a_vertexPosition;
in vec2 a_vertexTextureCoord;

out vec2 v_textureCoord;

void main(void)
{
  v_textureCoord = a_vertexTextureCoord;

  gl_Position = vec4(a_vertexPosition, 1.0, 1.0);
}
