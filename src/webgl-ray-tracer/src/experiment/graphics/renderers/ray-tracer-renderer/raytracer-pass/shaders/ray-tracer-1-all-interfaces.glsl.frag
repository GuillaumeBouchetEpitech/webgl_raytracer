
struct RayValues
{
  vec3 origin;
  vec3 direction;
};

struct RayResult
{
  bool hasHit;
  float distance;
  vec3 position;
  vec3 normal;
  float reflectionFactor;
  float refractionFactor;
  vec3 txPos;
  int shapeIndex;
  int materialIndex;
};

struct LightResult {
  float intensity;
  vec3 color;
};


struct StackData
{
  bool used;
  RayValues ray;
  RayResult result;
  vec4 color;
  int reflectionIndex;
  int refractionIndex;
};

struct LightStackData
{
  bool used;
  RayValues ray;
  RayResult result;
  LightResult lightResult;
};
