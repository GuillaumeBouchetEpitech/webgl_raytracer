
#version 300 es

precision lowp float;

uniform sampler2D u_texture;
uniform vec2 u_srcSize;
// uniform vec2 u_dstSize;

in vec2 v_textureCoord;

out vec4 o_color;


float bicubicWeight(float distanceX)
{
  float ax = abs(distanceX);
  if (ax < 1.0) return (1.5 * ax - 2.5) * ax * ax + 1.0;
  if (ax < 2.0) return ((-0.5 * ax + 2.5) * ax - 4.0) * ax + 2.0;
  return 0.0;
}

void main(void)
{
  vec2 srcCoord = v_textureCoord * u_srcSize; // position in source texels
  vec2 f = fract(srcCoord);               // fractional offset
  vec2 srcTexel = floor(srcCoord); // nearest source texel

  int gridSize = 4;

  int minX = min(max(int(srcTexel.x) - gridSize, 0), int(u_srcSize.x) - 1);
  int minY = min(max(int(srcTexel.y) - gridSize, 0), int(u_srcSize.y) - 1);
  int maxX = min(max(int(srcTexel.x) + gridSize, 0), int(u_srcSize.x) - 1);
  int maxY = min(max(int(srcTexel.y) + gridSize, 0), int(u_srcSize.y) - 1);

  float total = 0.0;
  vec4 accumulated = vec4(0.0);

  for (int yy = minY; yy <= maxY; ++yy)
  {
    for (int xx = minX; xx <= maxX; ++xx)
    {
      vec2 currCoord = vec2(xx, yy);

      float distanceX = distance(currCoord, srcCoord);
      float weight = bicubicWeight(distanceX);
      if (weight <= 0.0) {
        continue;
      }

      accumulated += texelFetch(u_texture, ivec2(currCoord), 0); // * weight;
      total += 1.0;
    }
  }

  if (total > 0.0) {
    o_color = accumulated / total;
  } else {
    o_color = vec4(1.0, 0.0, 0.0, 1.0); // warning
  }

  // o_color = texture(u_texture, v_textureCoord);
}
