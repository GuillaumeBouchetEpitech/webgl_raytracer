
#version 300 es

precision highp int;
precision highp float;

//
//
//

uniform vec3              u_cameraEye;

//

uniform highp sampler2D   u_dataTexture;
uniform int               u_lightsTextureSize;

//

uniform int               u_maxSceneStackSize;
uniform int               u_maxLightStackSize;

//
//
//

in vec3  v_position;

out vec4 o_color;

//
//
//
//
//

#include "./ray-tracer-2.1-all-constants.glsl.frag"

#include "./ray-tracer-2.2-all-interfaces.glsl.frag"

//
//
//
//
//

SceneStackData  g_sceneStack[MAX_SCENE_STACK_SIZE];

LightStackData  g_lightStack[MAX_LIGHT_STACK_SIZE];

// BvhNodeValues   g_bvhStack[MAX_BVH_STACK];
int             g_bvhStack[MAX_BVH_STACK];
int             g_subBvhStack[MAX_BVH_STACK];


//
//
//
//
//

#include "./ray-tracer-3-castInitialRay.glsl.frag"

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

  // will be normalized in the function castInitialRay()
  vec3 rayDir = v_position - u_cameraEye;

  vec3 finalPixelColor = castInitialRay(rayDir);

  //
  // Final Output
  //

  o_color = vec4(finalPixelColor, 1.0);

  // gl_FragDepth = 0.1;

}
