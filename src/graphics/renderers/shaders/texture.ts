const vertex = `

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

`.trim();

const fragment = `

#version 300 es

precision highp float;

uniform sampler2D u_texture;
uniform vec2 u_step;

in vec2 v_textureCoord;

out vec4 o_color;

void main(void)
{
  // gl_FragColor = texture(u_texture, v_textureCoord);

  float total = 0.0;
  vec4 accumulated = vec4(0.0);

  //

  if (v_textureCoord.x - u_step.x > 0.0)
  {
    accumulated += texture(u_texture, vec2(v_textureCoord.x - u_step.x, v_textureCoord.y));
    total += 1.0;
  }

  if (v_textureCoord.x + u_step.x > 0.0)
  {
    accumulated += texture(u_texture, vec2(v_textureCoord.x + u_step.x, v_textureCoord.y));
    total += 1.0;
  }

  if (v_textureCoord.y - u_step.y > 0.0)
  {
    accumulated += texture(u_texture, vec2(v_textureCoord.x, v_textureCoord.y - u_step.y));
    total += 1.0;
  }

  if (v_textureCoord.y + u_step.y > 0.0)
  {
    accumulated += texture(u_texture, vec2(v_textureCoord.x, v_textureCoord.y + u_step.y));
    total += 1.0;
  }

  //

  if (v_textureCoord.x - u_step.x > 0.0 && v_textureCoord.y - u_step.y > 0.0)
  {
    accumulated += texture(u_texture, vec2(v_textureCoord.x - u_step.x, v_textureCoord.y - u_step.y));
    total += 1.0;
  }

  if (v_textureCoord.x + u_step.x > 0.0 && v_textureCoord.y - u_step.y > 0.0)
  {
    accumulated += texture(u_texture, vec2(v_textureCoord.x + u_step.x, v_textureCoord.y - u_step.y));
    total += 1.0;
  }

  if (v_textureCoord.x - u_step.x > 0.0 && v_textureCoord.y + u_step.y > 0.0)
  {
    accumulated += texture(u_texture, vec2(v_textureCoord.x - u_step.x, v_textureCoord.y + u_step.y));
    total += 1.0;
  }

  if (v_textureCoord.x + u_step.x > 0.0 && v_textureCoord.y + u_step.y > 0.0)
  {
    accumulated += texture(u_texture, vec2(v_textureCoord.x + u_step.x, v_textureCoord.y + u_step.y));
    total += 1.0;
  }

  //

  if (total > 0.0)
    o_color = accumulated / total;
  else
    o_color = vec4(1.0, 0.0, 0.0, 1.0); // warning
}

`.trim();

export { vertex, fragment };
