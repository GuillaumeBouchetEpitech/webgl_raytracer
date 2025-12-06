



#include "./ray-tracer-2.1-intersectScene.glsl.frag"

#include "./ray-tracer-2.2-lightAt.glsl.frag"




vec3 castInitialRay(in vec3 rayDir)
{

  // initialize stack
  for (int ii = 0; ii < g_maxSceneStackSize; ++ii)
  {
    g_sceneStack[ii].used = false;
    g_sceneStack[ii].result.reflectionFactor = 0.0;
    g_sceneStack[ii].result.refractionFactor = 0.0;
    g_sceneStack[ii].result.materialIndex = -1;
    g_sceneStack[ii].result.distance = -1.0;
    g_sceneStack[ii].reflectionIndex = -1;
    g_sceneStack[ii].refractionIndex = -1;
  }

  // initialize first stack element
  g_sceneStack[0].used = true;
  g_sceneStack[0].ray = RayValues(u_cameraEye, rayDir);
  g_sceneStack[0].result.position = u_cameraEye;
  g_sceneStack[0].reflectionIndex = -1;
  g_sceneStack[0].refractionIndex = -1;

  int sceneStackWriteIndex = 0;

  //
  // Accumulating this fragment's scene stack
  //

  int sceneStackReadIndex = 0;
  for (; sceneStackReadIndex < g_maxSceneStackSize; ++sceneStackReadIndex)
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
    // material handling
    //

    int materialIndex = g_sceneStack[sceneStackReadIndex].result.materialIndex;

    // material-texel[0]:R: material type (0=basic or 1=chessboard)
    // material-texel[0]:G: can cast shadows (0 or 1)
    // material-texel[0]:B: ??? (per material type)
    // material-texel[0]:A: ??? (per material type)
    // material-texel[1]:R: ??? (per material type)
    // material-texel[1]:G: ??? (per material type)
    // material-texel[1]:B: ??? (per material type)
    // material-texel[1]:A: ??? (per material type)
    vec4 matTexel0 = texelFetch(u_dataTexture, ivec2(materialIndex * 2 + 0, MATERIALS_ROW_INDEX), 0);
    vec4 matTexel1 = texelFetch(u_dataTexture, ivec2(materialIndex * 2 + 1, MATERIALS_ROW_INDEX), 0);

    int materialType = int(matTexel0.r);

    if (materialType == 1)
    {
      // as a chessboard material

      // chessboard-material-texel[0]:R: material type (0=basic or 1=chessboard)
      // chessboard-material-texel[0]:G: can cast shadows (0 or 1)
      // chessboard-material-texel[0]:B: sub material index A
      // chessboard-material-texel[0]:A: sub material index B
      // chessboard-material-texel[1]:R: chessboard-fraction.x
      // chessboard-material-texel[1]:G: chessboard-fraction.y
      // chessboard-material-texel[1]:B: chessboard-fraction.z
      // chessboard-material-texel[1]:A: <unused>

      int subMaterialIndex = 0;

      vec3 txPos = g_sceneStack[sceneStackReadIndex].result.txPos;
      if (
        (fract(txPos.x * matTexel1.r) > 0.5)
        == (fract(txPos.y * matTexel1.g) > 0.5)
        == (fract(txPos.z * matTexel1.b) > 0.5)
      ) {
        subMaterialIndex = int(matTexel0.a);
      } else {
        subMaterialIndex = int(matTexel0.b);
      }

      // as a basic material

      // basic-material-texel[0]:R: material type (0=basic or 1=chessboard)
      // basic-material-texel[0]:G: can cast shadows (0 or 1)
      // basic-material-texel[0]:B: reflection index [0..1]
      // basic-material-texel[0]:A: refraction index [0..1]
      // basic-material-texel[1]:R: can receive light
      // basic-material-texel[1]:G: color.r
      // basic-material-texel[1]:B: color.g
      // basic-material-texel[1]:A: color.b
      matTexel0 = texelFetch(u_dataTexture, ivec2(subMaterialIndex * 2 + 0, MATERIALS_ROW_INDEX), 0);
      matTexel1 = texelFetch(u_dataTexture, ivec2(subMaterialIndex * 2 + 1, MATERIALS_ROW_INDEX), 0);
    }

    vec3 materialColor = matTexel1.gba;
    float reflectionFactor = matTexel0.b;
    float refractionFactor = matTexel0.a;

    g_sceneStack[sceneStackReadIndex].color = vec4(materialColor, 0.5);
    g_sceneStack[sceneStackReadIndex].result.reflectionFactor = reflectionFactor;
    g_sceneStack[sceneStackReadIndex].result.refractionFactor = refractionFactor;

    bool lightEnabled = (matTexel1.r != 0.0);

    //
    // Light handling
    //

    LightResult lightResult;
    lightResult.intensity = 1.0;
    lightResult.color = vec3(1.0);

    if (lightEnabled)
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

    if (lightEnabled && lightResult.intensity <= 0.0)
    {
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
      sceneStackWriteIndex + 1 < g_maxSceneStackSize &&
      // then we check if the refraction factor is positive
      g_sceneStack[sceneStackReadIndex].result.refractionFactor > 0.0
    ) {
      // push new refraction iteration to the stack
      sceneStackWriteIndex += 1;

      g_sceneStack[sceneStackWriteIndex].used = true;
      g_sceneStack[sceneStackWriteIndex].ray.origin = g_sceneStack[sceneStackReadIndex].result.position;
      g_sceneStack[sceneStackWriteIndex].ray.direction = refract(g_sceneStack[sceneStackReadIndex].ray.direction, g_sceneStack[sceneStackReadIndex].result.normal, Eta);

      // here add 0.01 of the normal to the new origin
      // -> this get properly "inside" the intersected shape
      // ---> this is to avoid intersecting twice the "same shape" at the "same spot"
      g_sceneStack[sceneStackWriteIndex].ray.origin += g_sceneStack[sceneStackReadIndex].ray.direction * 0.01;

      // set the new "child stack element" to its "parent stack element"
      g_sceneStack[sceneStackReadIndex].refractionIndex = sceneStackWriteIndex;
    }

    //
    // reflection here
    //

    if (
      // first we check if more stack space is left
      sceneStackWriteIndex + 1 < g_maxSceneStackSize &&
      // then we check if the reflection factor is positive
      g_sceneStack[sceneStackReadIndex].result.reflectionFactor > 0.0
    ) {
      // push new reflection iteration to the stack
      sceneStackWriteIndex += 1;

      g_sceneStack[sceneStackWriteIndex].used = true;
      g_sceneStack[sceneStackWriteIndex].ray.origin = g_sceneStack[sceneStackReadIndex].result.position;
      g_sceneStack[sceneStackWriteIndex].ray.direction = reflect(g_sceneStack[sceneStackReadIndex].ray.direction, g_sceneStack[sceneStackReadIndex].result.normal);

      // set the new "child stack element" to its "parent stack element"
      g_sceneStack[sceneStackReadIndex].reflectionIndex = sceneStackWriteIndex;
    }

  }

  //
  // Unrolling this fragment's accumulated scene stack
  //

  // combine all colors
  // -> from last element to first element
  // -> here we start from where we stopped during the accumulation phase
  for (sceneStackReadIndex = sceneStackWriteIndex; sceneStackReadIndex >= 0; --sceneStackReadIndex)
  // for (sceneStackReadIndex = g_maxSceneStackSize - 1; sceneStackReadIndex >= 0; --sceneStackReadIndex)
  {
    // if (!g_sceneStack[sceneStackReadIndex].used) {
    //   continue;
    // }

    // handle any connected reflection
    int reflectionIndex = g_sceneStack[sceneStackReadIndex].reflectionIndex;
    if (reflectionIndex != -1)
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
    : g_backgroundColor;
}
