
#version 300 es

precision lowp float;

uniform sampler2D u_texture;

in vec2 v_textureCoord;

out vec4 o_color;

void main(void)
{
  o_color = texture(u_texture, v_textureCoord);
}
