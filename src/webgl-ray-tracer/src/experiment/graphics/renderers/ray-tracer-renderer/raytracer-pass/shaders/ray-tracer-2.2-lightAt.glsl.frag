



void lightAt(
  vec3 impactPosition,
  vec3 impactNormal,
  vec3 viewer,
  out LightResult lightResult
) {

  lightResult.intensity = g_ambientLightIntensity;
  lightResult.color = vec3(1.0);

  //
  // handle spot lights
  //

  vec3 lightDir = vec3(1.0);
  float currLightIntensity = 1.0;
  vec3 currLightColor = vec3(1.0);

  for (int lightIndex = 0; lightIndex < u_lightsTextureSize; lightIndex += 2)
  {

    vec4 lightTexel0 = texelFetch(u_dataTexture, ivec2(lightIndex + 0, LIGHTS_ROW_INDEX), 0);
    vec3 lightPos = lightTexel0.rgb;
    float lightRadius = lightTexel0.a;

    vec3 lightToImpactVec3 = lightPos - impactPosition;

    // is it out of the spot light effect radius?
    float lightToImpactDistance = length(lightToImpactVec3);
    if (lightToImpactDistance > lightRadius)
    {
      // out of range, do not apply this light
      continue;
    }

    // normalize lightDir
    lightDir = lightToImpactVec3 / lightToImpactDistance;

    vec4 lightTexel1 = texelFetch(u_dataTexture, ivec2(lightIndex + 1, LIGHTS_ROW_INDEX), 0);
    float localIntensity = lightTexel1.r;
    // float localIntensity = 1.0;

    currLightIntensity = localIntensity * (1.0 - lightToImpactDistance / lightRadius);

    // initialize stack
    for (int ii = 0; ii < g_maxLightStackSize; ++ii)
    {
      g_lightStack[ii].used = false;
      g_lightStack[ii].ray.direction = lightDir;
      g_lightStack[ii].result.color = vec4(1.0);
      g_lightStack[ii].result.reflectionFactor = 1.0;
      g_lightStack[ii].result.refractionFactor = 1.0;
      g_lightStack[ii].result.materialIndex = -1;
      g_lightStack[ii].result.lightEnabled = false;
      g_lightStack[ii].lightResult.intensity = 1.0;
      g_lightStack[ii].lightResult.color = vec3(1.0);
    }

    // initialize first stack element
    g_lightStack[0].used = true;
    g_lightStack[0].ray.origin = impactPosition;

    int previousShapeIndex = -1;

    bool lightIsBlocked = false;

    int lightStackWriteIndex = 0;

    //
    // Accumulating this shape's light stack
    //

    int lightStackReadIndex = 0;
    for (; lightStackReadIndex < g_maxLightStackSize; ++lightStackReadIndex)
    {
      // intersect object
      // if reflection/refraction push to stack
      // repeat

      if (!g_lightStack[lightStackReadIndex].used)
      {
        // nothing to process anymore
        break;
      }

      const bool shadowCastingMode = true;

      g_lightStack[lightStackReadIndex].result.hasHit = intersectScene(
        g_lightStack[lightStackReadIndex].ray,
        g_lightStack[lightStackReadIndex].result,
        shadowCastingMode,
        previousShapeIndex
      );

      if (
        // we got no collision -> light not blocked
        !g_lightStack[lightStackReadIndex].result.hasHit ||
        // we got collision -> checking if the impact is behind the light
        g_lightStack[lightStackReadIndex].result.distance > distance(g_lightStack[lightStackReadIndex].ray.origin, lightPos)
      ) {
        // ignore the light
        lightIsBlocked = false;
        break;
      }

      previousShapeIndex = g_lightStack[lightStackReadIndex].result.shapeIndex;

      int materialIndex = g_lightStack[lightStackReadIndex].result.materialIndex;

      // light ray is blocked, skip this light... unless? (<- chessboard/refraction material check)
      vec4 matTexel0 = texelFetch(u_dataTexture, ivec2(materialIndex * 2 + 0, MATERIALS_ROW_INDEX), 0);
      vec4 matTexel1 = texelFetch(u_dataTexture, ivec2(materialIndex * 2 + 1, MATERIALS_ROW_INDEX), 0);

      int materialType = int(matTexel0.r);

      // chessboard alternative material
      if (materialType == 1)
      {
        int subMaterialIndex = 0;

        vec3 txPos = g_lightStack[lightStackReadIndex].result.txPos;
        if (
          (fract(txPos.x * matTexel1.t) > 0.5)
          != (fract(txPos.y * matTexel1.g) > 0.5)
          != (fract(txPos.z * matTexel1.b) > 0.5)
        ) {
          subMaterialIndex = int(matTexel0.a);
        } else {
          subMaterialIndex = int(matTexel0.b);
        }

        matTexel0 = texelFetch(u_dataTexture, ivec2(subMaterialIndex * 2 + 0, MATERIALS_ROW_INDEX), 0);
        matTexel1 = texelFetch(u_dataTexture, ivec2(subMaterialIndex * 2 + 1, MATERIALS_ROW_INDEX), 0);
      }

      float refractionFactor = matTexel0.a;

      if (refractionFactor <= 0.01)
      {
        // no refraction/transparency -> light ray is blocked -> ignore the light
        lightIsBlocked = true;
        break;
      }

      vec3 shapeColor = matTexel1.gba;

      g_lightStack[lightStackReadIndex].lightResult.intensity = refractionFactor;
      g_lightStack[lightStackReadIndex].lightResult.color = shapeColor.xyz;

      //
      // handle refraction/transparency
      //

      if (lightStackWriteIndex + 1 >= g_maxLightStackSize)
      {
        // no more stack space left -> stop now
        break;
      }

      lightStackWriteIndex += 1;

      g_lightStack[lightStackWriteIndex].used = true;
      g_lightStack[lightStackWriteIndex].ray.origin = g_lightStack[lightStackReadIndex].result.position;

    } // for (int ii = 0; ii < g_maxLightStackSize; ++ii)

    if (lightIsBlocked)
    {
      // light ray is blocked by a (solid enough) shape -> ignore the light
      continue;
    }

    //
    // Unrolling this shape's accumulated light stack
    //

    // combine all light(s) color
    // -> from last element to first element
    // -> here we start from where we stopped during the accumulation phase
    for (lightStackReadIndex = lightStackWriteIndex; lightStackReadIndex >= 0; --lightStackReadIndex)
    // for (lightStackReadIndex = g_maxLightStackSize - 1; lightStackReadIndex >= 0; --lightStackReadIndex)
    {
      // if (g_lightStack[lightStackReadIndex].used == false)
      // {
      //   continue;
      // }

      // used stack element
      currLightColor *= g_lightStack[lightStackReadIndex].lightResult.color.xyz;
      currLightIntensity *= g_lightStack[lightStackReadIndex].lightResult.intensity;
    }

    //
    //
    //

    //
    // the light logic
    // -> TODO: find the name of this (custom?) method...
    // ---> Blinn?
    // ---> Phong?
    // ---> Blinn-Phong?
    //

    float finalIntensity = 0.0;

    // diffuse light
    finalIntensity += dot(lightDir, impactNormal);

    // specular light
    vec3 reflectionFactor = reflect(-lightDir, impactNormal);
    finalIntensity += pow(max(dot(reflectionFactor, viewer), 0.0), 20.0);

    finalIntensity *= currLightIntensity;

    //
    // blend with the current result
    //

    float maxIntensity = max(lightResult.intensity, finalIntensity);
    float normalizedRatio = 1.0 / maxIntensity;

    float oldBlendRatio = normalizedRatio * max(lightResult.intensity, g_ambientLightIntensity);
    float newBlendRatio = normalizedRatio * max(finalIntensity, g_ambientLightIntensity);

    lightResult.color = lightResult.color * oldBlendRatio + currLightColor * newBlendRatio;
    lightResult.intensity = maxIntensity;

  } // for (int index = 0; index < u_lightsTextureSize; index += 2)
}
