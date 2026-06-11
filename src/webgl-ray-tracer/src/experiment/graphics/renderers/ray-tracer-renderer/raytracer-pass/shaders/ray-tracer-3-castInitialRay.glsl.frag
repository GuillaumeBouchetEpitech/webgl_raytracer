



// #--ignored--include "./ray-tracer-3.1-intersectScene-bvh2.glsl.frag"

#include "./ray-tracer-3.1-intersectScene-bvh4.glsl.frag"

#include "./ray-tracer-3.2-fetch-material.glsl.frag"

#include "./ray-tracer-3.3-lightAt.glsl.frag"



// MARK: castInitialRay
vec3 castInitialRay(in vec3 rayDir)
{
  // ensure normalized
  rayDir /= max(length(rayDir), 0.001);

  // ensure the rayDir components are "not exactly of value 0"
  rayDir = mix(rayDir, vec3(-1e-8), equal(rayDir, vec3(0.0)));

  int maxSceneStackSize = min(u_maxSceneStackSize, MAX_SCENE_STACK_SIZE);

  // initialize stack
  for (int ii = 0; ii < maxSceneStackSize && ii < MAX_SCENE_STACK_SIZE; ++ii)
  {
    g_sceneStack[ii].used = false;
    g_sceneStack[ii].result.reflectionFactor = 0.0;
    g_sceneStack[ii].result.refractionFactor = 0.0;
    g_sceneStack[ii].result.materialIndex = -1;
    g_sceneStack[ii].result.distance = FAR_VALUE;
    g_sceneStack[ii].result.sceneIndex = 0;
    g_sceneStack[ii].reflectionIndex = -1;
    g_sceneStack[ii].refractionIndex = -1;
  }

  // initialize first stack element
  g_sceneStack[0].used = true;
  g_sceneStack[0].ray = RayValues(u_cameraEye, rayDir, 1.0 / rayDir);
  g_sceneStack[0].result.position = u_cameraEye;
  g_sceneStack[0].reflectionIndex = -1;
  g_sceneStack[0].refractionIndex = -1;

  int sceneStackWriteIndex = 0;

  //
  // Accumulating this fragment's scene stack
  //

  int sceneStackReadIndex = 0;

  for (; sceneStackReadIndex < maxSceneStackSize && sceneStackReadIndex < MAX_SCENE_STACK_SIZE; ++sceneStackReadIndex)
  {
    // intersect object
    // if reflection/refraction push to stack & set index
    // repeat

    if (!g_sceneStack[sceneStackReadIndex].used)
    {
      // nothing to process anymore
      break;
    }

    const bool shadowCastingMode = false;

    // MARK: intersectScene
    bool hasHit = intersectScene(
      g_sceneStack[sceneStackReadIndex].ray,
      g_sceneStack[sceneStackReadIndex].result,
      shadowCastingMode,
      -1
    );

    g_sceneStack[sceneStackReadIndex].result.hasHit = hasHit;

    if (!hasHit)
    {
      continue;
    }

    //
    // MARK: material handling
    //

    vec4 materialTexels[2];
    fetchMaterialTexels(g_sceneStack[sceneStackReadIndex].result, materialTexels);

    vec3 materialColor = materialTexels[1].gba;
    float reflectionFactor = materialTexels[0].b;
    float refractionFactor = materialTexels[0].a;

    g_sceneStack[sceneStackReadIndex].color = vec4(materialColor, 0.5);
    g_sceneStack[sceneStackReadIndex].result.reflectionFactor = reflectionFactor;
    g_sceneStack[sceneStackReadIndex].result.refractionFactor = refractionFactor;

    bool canReceiveLight = (materialTexels[1].r != 0.0);

    //
    // MARK: Light handling
    //

    LightResult lightResult;
    lightResult.intensity = 1.0;
    lightResult.color = vec3(1.0);

    if (canReceiveLight)
    {
      lightAt(
        g_sceneStack[sceneStackReadIndex].result.position,
        g_sceneStack[sceneStackReadIndex].result.normal,
        -g_sceneStack[sceneStackReadIndex].ray.direction,
        lightResult
      );
    }

    // update the result color
    // -> this is to handle the refracted/transparent shape's shadows
    // -> this will iterate over multiple potential refracted/transparent shapes
    // ---> ex1: a yellow then red refracted/transparent shape -> red shadow
    g_sceneStack[sceneStackReadIndex].color.xyz *= lightResult.color * lightResult.intensity;

    if (canReceiveLight && lightResult.intensity <= 0.0)
    {
      // not lit -> skip refraction/reflection
      continue;
    }

    //
    // MARK: refraction
    //

    if (
      // first check if more stack space is left
      sceneStackWriteIndex + 1 < maxSceneStackSize &&
      // then we check if the refraction factor is positive
      g_sceneStack[sceneStackReadIndex].result.refractionFactor > 0.0
    ) {
      // push new refraction iteration to the stack
      sceneStackWriteIndex += 1;

      g_sceneStack[sceneStackWriteIndex].used = true;
      g_sceneStack[sceneStackWriteIndex].ray.origin = g_sceneStack[sceneStackReadIndex].result.position;
      vec3 nextRayDir = refract(g_sceneStack[sceneStackReadIndex].ray.direction, g_sceneStack[sceneStackReadIndex].result.normal, REFRACTION_ETA);

      // ensure normalized
      nextRayDir /= max(length(nextRayDir), 0.001);

      // ensure the lightDir components are "not exactly of value 0"
      nextRayDir = mix(nextRayDir, vec3(-1e-8), equal(nextRayDir, vec3(0.0)));

      g_sceneStack[sceneStackWriteIndex].ray.direction = nextRayDir;
      g_sceneStack[sceneStackWriteIndex].ray.invDirection = 1.0 / nextRayDir;

      // here add 0.01 of the normal to the new origin
      // -> this get properly "inside" the intersected shape
      // ---> this is to avoid intersecting twice the "same shape" at the "same spot"
      g_sceneStack[sceneStackWriteIndex].ray.origin += g_sceneStack[sceneStackReadIndex].ray.direction * 0.01;

      // set the new "child stack element" to its "parent stack element"
      g_sceneStack[sceneStackReadIndex].refractionIndex = sceneStackWriteIndex;
    }

    //
    // MARK: reflection here
    //

    if (
      // first we check if more stack space is left
      sceneStackWriteIndex + 1 < maxSceneStackSize &&
      // then we check if the reflection factor is positive
      g_sceneStack[sceneStackReadIndex].result.reflectionFactor > 0.0
    ) {
      // push new reflection iteration to the stack
      sceneStackWriteIndex += 1;

      g_sceneStack[sceneStackWriteIndex].used = true;
      g_sceneStack[sceneStackWriteIndex].ray.origin = g_sceneStack[sceneStackReadIndex].result.position;
      vec3 nextRayDir = reflect(g_sceneStack[sceneStackReadIndex].ray.direction, g_sceneStack[sceneStackReadIndex].result.normal);

      // ensure normalized
      nextRayDir /= max(length(nextRayDir), 0.001);

      // ensure the lightDir components are "not exactly of value 0"
      nextRayDir = mix(nextRayDir, vec3(-1e-8), equal(nextRayDir, vec3(0.0)));

      g_sceneStack[sceneStackWriteIndex].ray.direction = nextRayDir;
      g_sceneStack[sceneStackWriteIndex].ray.invDirection = 1.0 / nextRayDir;

      // set the new "child stack element" to its "parent stack element"
      g_sceneStack[sceneStackReadIndex].reflectionIndex = sceneStackWriteIndex;
    }

  }

  //
  // MARK: Unrolling stack
  // Unrolling this fragment's accumulated scene stack
  //

  // combine all colors
  // -> from last element to first element
  // -> here we start from where we stopped during the accumulation phase
  for (sceneStackReadIndex = sceneStackWriteIndex; sceneStackReadIndex >= 0; --sceneStackReadIndex)
  {
    // if (!g_sceneStack[sceneStackReadIndex].used) {
    //   continue;
    // }

    // handle any connected reflection
    int reflectionIndex = g_sceneStack[sceneStackReadIndex].reflectionIndex;
    // if (reflectionIndex != -1)
    if (reflectionIndex >= 0)
    {
      float reflectionFactor = g_sceneStack[sceneStackReadIndex].result.reflectionFactor;
      g_sceneStack[sceneStackReadIndex].color.xyz =
        g_sceneStack[sceneStackReadIndex].color.xyz * (1.0 - reflectionFactor) +
        g_sceneStack[reflectionIndex].color.xyz * reflectionFactor;
    }

    // handle any connected refraction
    int refractionIndex = g_sceneStack[sceneStackReadIndex].refractionIndex;
    if (refractionIndex != -1)
    {
      float refractionFactor = g_sceneStack[sceneStackReadIndex].result.refractionFactor;
      g_sceneStack[sceneStackReadIndex].color.xyz =
        g_sceneStack[sceneStackReadIndex].color.xyz * (1.0 - refractionFactor) +
        g_sceneStack[refractionIndex].color.xyz * refractionFactor;
    }
  }

  return g_sceneStack[0].result.hasHit
    ? g_sceneStack[0].color.xyz
    : BACKGROUND_COLOR;
}
