
#version 300 es

precision highp float;

uniform sampler2D u_texture;
uniform vec2 u_renderedSize;
uniform float u_gridSize;

in vec2 v_textureCoord;

out vec4 o_color;

void main(void)
{
  float total = 0.0;
  vec4 accumulated = vec4(0.0);

  //

  int gridSize = int(u_gridSize);

  int srcX = int(u_renderedSize.x * v_textureCoord.x);
  int srcY = int(u_renderedSize.y * v_textureCoord.y);

  int minX = min(max(srcX - gridSize, 0), int(u_renderedSize.x) - 1);
  int minY = min(max(srcY - gridSize, 0), int(u_renderedSize.y) - 1);
  int maxX = min(max(srcX + gridSize, 0), int(u_renderedSize.x) - 1);
  int maxY = min(max(srcY + gridSize, 0), int(u_renderedSize.y) - 1);

  for (int yy = minY; yy <= maxY; ++yy)
  {
    for (int xx = minX; xx <= maxX; ++xx)
    {
      accumulated += texelFetch(u_texture, ivec2(xx, yy), 0);
      total += 1.0;
    }
  }

  //

  if (total > 0.0) {
    o_color = accumulated / total;
  } else {
    o_color = vec4(1.0, 0.0, 0.0, 1.0); // warning
  }
}
