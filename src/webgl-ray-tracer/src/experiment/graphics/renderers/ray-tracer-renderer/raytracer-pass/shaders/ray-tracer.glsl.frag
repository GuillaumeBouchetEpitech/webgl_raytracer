
#version 300 es

precision highp int;
precision highp float;

//
//
//

// Indices of refractionFactor
const float Air = 1.0;
const float Glass = 1.51714;

// Air to glass ratio of the indices of refractionFactor (Eta)
const float Eta = Air / Glass;

// see https://en.wikipedia.org/wiki/Refractive_index
// const float R0 = ((Air - Glass) * (Air - Glass)) / ((Air + Glass) * (Air + Glass));

//
//
//

uniform vec3        u_cameraEye;
uniform int         u_useBvh;

//

uniform highp sampler2D   u_dataTexture;
uniform int               u_sceneTextureSize;
uniform int               u_lightsTextureSize;

//
//
//

in vec3  v_position;

out vec4 o_color;

//

const float     g_ambientLightIntensity = 0.15;

const vec3      g_backgroundColor = vec3(0.1);

const int       SHAPES_ROW_INDEX = 0;
const int       MATERIALS_ROW_INDEX = 1;
const int       LIGHTS_ROW_INDEX = 2;
const int       BVH_ROW_INDEX = 3;


//
//
//
//
//

#include "./ray-tracer-all-interfaces.glsl.frag"

#include "./ray-tracer-intersectScene.glsl.frag"

#include "./ray-tracer-lightAt.glsl.frag"

//
//
//
//
//

//
//
//
//
//

//
//
//
//
//

vec3 castRay(in vec3 rayDir)
{

  // need a scene stack size of minimum 7 for a reflective AND refractive sphere/shapes
  const int maxSceneStackSize = 7;
  StackData _sceneStack[maxSceneStackSize];

  // initialize stack
  for (int ii = 0; ii < maxSceneStackSize; ++ii)
  {
    _sceneStack[ii].used = false;
    _sceneStack[ii].result.reflectionFactor = 0.0;
    _sceneStack[ii].result.refractionFactor = 0.0;
    _sceneStack[ii].result.materialIndex = -1;
    _sceneStack[ii].result.lightEnabled = false;
    _sceneStack[ii].reflectionIndex = -1;
    _sceneStack[ii].refractionIndex = -1;
  }

  // initialize first stack element
  _sceneStack[0].used = true;
  _sceneStack[0].ray = RayValues(u_cameraEye, rayDir);
  _sceneStack[0].result.position = u_cameraEye;
  _sceneStack[0].result.reflectionFactor = 1.0;
  _sceneStack[0].result.refractionFactor = 1.0;
  _sceneStack[0].result.lightEnabled = true;
  _sceneStack[0].reflectionIndex = -1;
  _sceneStack[0].refractionIndex = -1;

  int sceneStackWriteIndex = 0;

  //
  // Accumulating this fragment's scene stack
  //

  int sceneStackReadIndex = 0;
  for (; sceneStackReadIndex < maxSceneStackSize; ++sceneStackReadIndex)
  {
    // intersect object
    // if reflection/refraction push to stack & set index
    // repeat

    if (!_sceneStack[sceneStackReadIndex].used)
    {
      // nothing to process anymore
      break;
    }

    _sceneStack[sceneStackReadIndex].result.hasHit = intersectScene(
      _sceneStack[sceneStackReadIndex].ray,
      _sceneStack[sceneStackReadIndex].result,
      false,
      -1
    );

    if (!_sceneStack[sceneStackReadIndex].result.hasHit)
    {
      continue;
    }

    //
    // material handling
    //

    int materialIndex = _sceneStack[sceneStackReadIndex].result.materialIndex;

    vec4 matTexel0 = texelFetch(u_dataTexture, ivec2(materialIndex * 2 + 0, MATERIALS_ROW_INDEX), 0);
    vec4 matTexel1 = texelFetch(u_dataTexture, ivec2(materialIndex * 2 + 1, MATERIALS_ROW_INDEX), 0);

    int materialType = int(matTexel0.r);

    _sceneStack[sceneStackReadIndex].result.hasHit = true;

    if (materialType == 1)
    {
      int subMaterialIndex = 0;

      vec3 txPos = _sceneStack[sceneStackReadIndex].result.txPos;
      if (
        (fract(txPos.x * matTexel1.r) > 0.5)
        == (fract(txPos.y * matTexel1.g) > 0.5)
        == (fract(txPos.z * matTexel1.b) > 0.5)
      ) {
        subMaterialIndex = int(matTexel0.a);
      } else {
        subMaterialIndex = int(matTexel0.b);
      }

      matTexel0 = texelFetch(u_dataTexture, ivec2(subMaterialIndex * 2 + 0, MATERIALS_ROW_INDEX), 0);
      matTexel1 = texelFetch(u_dataTexture, ivec2(subMaterialIndex * 2 + 1, MATERIALS_ROW_INDEX), 0);
    }

    vec3 color = matTexel1.gba;
    float reflectionFactor = matTexel0.b;
    float refractionFactor = matTexel0.a;

    _sceneStack[sceneStackReadIndex].result.color = vec4(color, 0.5);
    _sceneStack[sceneStackReadIndex].result.reflectionFactor = reflectionFactor;
    _sceneStack[sceneStackReadIndex].result.refractionFactor = refractionFactor;

    bool lightEnabled = (matTexel1.r != 0.0);
    _sceneStack[sceneStackReadIndex].result.lightEnabled = lightEnabled;

    //
    // Light handling
    //

    LightResult lightResult;
    lightResult.intensity = 1.0;
    lightResult.color = vec3(1.0);

    if (_sceneStack[sceneStackReadIndex].result.lightEnabled)
    {
      lightAt(
        _sceneStack[sceneStackReadIndex].result.position,
        _sceneStack[sceneStackReadIndex].result.normal,
        -_sceneStack[sceneStackReadIndex].ray.direction,
        lightResult
      );
    }

    // update the result color
    // -> this is to handle the refracted/transparent shape's shadows
    // -> this will iterate over multiple potential refracted/transparent shapes
    // ---> ex1: a yellow then red refracted/transparent shape -> red shadow
    _sceneStack[sceneStackReadIndex].result.color.xyz *= lightResult.color * lightResult.intensity;

    if (
      _sceneStack[sceneStackReadIndex].result.lightEnabled &&
      lightResult.intensity <= 0.0
    ) {
      // not lit -> skip refraction/reflection
      continue;
    }

    //
    // reflection/refraction here
    //

    //
    // refraction here
    //

    if (
      // first check if more stack space is left
      sceneStackWriteIndex + 1 < maxSceneStackSize &&
      _sceneStack[sceneStackReadIndex].result.refractionFactor > 0.0
    ) {
      // push new refraction iteration to the stack
      sceneStackWriteIndex += 1;

      _sceneStack[sceneStackWriteIndex].used = true;
      _sceneStack[sceneStackWriteIndex].ray.origin = _sceneStack[sceneStackReadIndex].result.position;
      _sceneStack[sceneStackWriteIndex].ray.direction = refract(_sceneStack[sceneStackReadIndex].ray.direction, _sceneStack[sceneStackReadIndex].result.normal, Eta);

      // here add 0.01 of the normal to the new origin
      // -> this get properly "inside" the intersected shape
      // ---> this avoid intersecting twice the "same shape" at the "same spot"
      _sceneStack[sceneStackWriteIndex].ray.origin += _sceneStack[sceneStackReadIndex].ray.direction * 0.01;

      // set the new "child stack element" to its "parent stack element"
      _sceneStack[sceneStackReadIndex].refractionIndex = sceneStackWriteIndex;
    }

    //
    // reflection here
    //

    if (
      // first check if more stack space is left
      sceneStackWriteIndex + 1 < maxSceneStackSize &&
      _sceneStack[sceneStackReadIndex].result.reflectionFactor > 0.0
    ) {
      // push new reflection iteration to the stack
      sceneStackWriteIndex += 1;

      _sceneStack[sceneStackWriteIndex].used = true;
      _sceneStack[sceneStackWriteIndex].ray.origin = _sceneStack[sceneStackReadIndex].result.position;
      _sceneStack[sceneStackWriteIndex].ray.direction = reflect(_sceneStack[sceneStackReadIndex].ray.direction, _sceneStack[sceneStackReadIndex].result.normal);

      // set the new "child stack element" to its "parent stack element"
      _sceneStack[sceneStackReadIndex].reflectionIndex = sceneStackWriteIndex;
    }

  }

  //
  // Unrolling this fragment's accumulated scene stack
  //

  // combine all colors
  // -> from last element to first element
  // -> here we start from where we stopped during the accumulation phase
  for (sceneStackReadIndex = sceneStackWriteIndex; sceneStackReadIndex >= 0; --sceneStackReadIndex)
  // for (sceneStackReadIndex = maxSceneStackSize - 1; sceneStackReadIndex >= 0; --sceneStackReadIndex)
  {
    // if (!_sceneStack[sceneStackReadIndex].used) {
    //   continue;
    // }

    // handle any connected reflection
    int reflectionIndex = _sceneStack[sceneStackReadIndex].reflectionIndex;
    if (reflectionIndex != -1)
    {
      _sceneStack[sceneStackReadIndex].result.color.xyz =
        _sceneStack[sceneStackReadIndex].result.color.xyz * (1.0 - _sceneStack[sceneStackReadIndex].result.reflectionFactor) +
        _sceneStack[reflectionIndex].result.color.xyz * _sceneStack[sceneStackReadIndex].result.reflectionFactor;
    }

    // handle any connected refraction
    int refractionIndex = _sceneStack[sceneStackReadIndex].refractionIndex;
    if (refractionIndex != -1)
    {
      _sceneStack[sceneStackReadIndex].result.color.xyz =
        _sceneStack[sceneStackReadIndex].result.color.xyz * (1.0 - _sceneStack[sceneStackReadIndex].result.refractionFactor) +
        _sceneStack[refractionIndex].result.color.xyz * _sceneStack[sceneStackReadIndex].result.refractionFactor;
    }
  }

  return _sceneStack[0].result.hasHit
    ? _sceneStack[0].result.color.xyz
    : g_backgroundColor;
}

//
//
//
//
//

//
//
//
//
//

//
//
//
//
//

void main()
{
  //
  //
  // initial ray

  vec3 rayDir = normalize(v_position - u_cameraEye); // camera direction

  vec3 finalPixelColor = castRay(rayDir);

  //
  // Final Output
  //

  o_color = vec4(finalPixelColor, 1.0);

  // gl_FragDepth = 0.1;

}
