
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

uniform vec3              u_cameraEye;

//

uniform highp sampler2D   u_dataTexture;
// uniform int               u_sceneTextureSize;
uniform int               u_lightsTextureSize;

//
//
//

in vec3  v_position;

out vec4 o_color;

//

const float     g_ambientLightIntensity = 0.05;

const vec3      g_backgroundColor = vec3(0.1);



const int       g_maxBvhStack = 16;
int             g_bvhStack[g_maxBvhStack];

const int       MATERIALS_ROW_INDEX = 0;
const int       SPHERE_SHAPES_ROW_INDEX = 1;
const int       BOX_SHAPES_ROW_INDEX = 2;
const int       TRIANGLE_SHAPES_ROW_INDEX = 3;
const int       LIGHTS_ROW_INDEX = 4;
const int       BVH_ROW_INDEX = 5;

//
//
//
//
//

#include "./ray-tracer-1-all-interfaces.glsl.frag"

//
//
//
//
//

// ideal scene stack size is >=7 for reflective AND refractive shapes
const int       g_maxSceneStackSize = 7;
StackData       g_sceneStack[g_maxSceneStackSize];

// ideal light stack size is >=5 to handle multiple transparent shapes
const int       g_maxLightStackSize = 5;
LightStackData  g_lightStack[g_maxLightStackSize];

//
//
//
//
//

#include "./ray-tracer-2-castInitialRay.glsl.frag"

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

  vec3 finalPixelColor = castInitialRay(rayDir);

  //
  // Final Output
  //

  o_color = vec4(finalPixelColor, 1.0);

  // gl_FragDepth = 0.1;

}
