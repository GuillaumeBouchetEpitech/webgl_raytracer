

struct ShadowTransparencyRayResult
{
  bool lightIsBlocked;
  vec3 lightColor;
  float lightIntensity;
};

// MARK: _checkForShadowOrTransparency
void _checkForShadowOrTransparency(
  vec3 impactPosition,
  vec3 lightPos,
  vec3 lightDir,
  inout ShadowTransparencyRayResult result
) {

  // initialize stack
  for (int ii = 0; ii < g_maxLightStackSize; ++ii)
  {
    g_lightStack[ii].used = false;
    g_lightStack[ii].ray.direction = lightDir;
    g_lightStack[ii].result.reflectionFactor = 1.0;
    g_lightStack[ii].result.refractionFactor = 1.0;
    g_lightStack[ii].result.materialIndex = -1;
    g_lightStack[ii].lightResult.intensity = 1.0;
    g_lightStack[ii].lightResult.color = vec3(1.0);
  }

  // initialize first stack element
  g_lightStack[0].used = true;
  g_lightStack[0].ray.origin = impactPosition;

  // this variable allow us the skip the collision with the previously hit shape
  // -> this will avoid a "double hit" of the same shape while we loop
  int previousShapeIndex = -1;

  // start with assumption the light is not blocked
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

    bool hasHit = intersectScene(
      g_lightStack[lightStackReadIndex].ray,
      g_lightStack[lightStackReadIndex].result,
      shadowCastingMode,
      previousShapeIndex
    );

    if (
      // if we got no collision -> light not blocked -> continue
      hasHit == false ||
      // if we're here: we got a collision
      // -> now we must check if the impact is "behind" the light
      // ---> basically, was the impact "too far" in the direction of the light?
      // -----> if no -> light not blocked -> continue
      g_lightStack[lightStackReadIndex].result.distance > distance(g_lightStack[lightStackReadIndex].ray.origin, lightPos)
    ) {
      // ignore the light
      lightIsBlocked = false;
      break;
    }

    // if we're here, the "shadow ray" has hit a shape, and normally this point light should be skipped
    // -> but we actually need to check for any refractive/transparent material associated to the shape hit

    // save it now, in case we must loop again
    previousShapeIndex = g_lightStack[lightStackReadIndex].result.shapeIndex;

    // now we're going to need the shape's material
    int materialIndex = g_lightStack[lightStackReadIndex].result.materialIndex;

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

    // chessboard alternative material
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

      vec3 txPos = g_lightStack[lightStackReadIndex].result.txPos;
      if (
        (fract(txPos.x * matTexel1.r) > 0.5)
        != (fract(txPos.y * matTexel1.g) > 0.5)
        != (fract(txPos.z * matTexel1.b) > 0.5)
      ) {
        subMaterialIndex = int(matTexel0.a);
      } else {
        subMaterialIndex = int(matTexel0.b);
      }

      // as a basic material
      // replace the original matTexel0/matTexel1 with the new sub-material

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

    float refractionFactor = matTexel0.a;

    // is the shape "solid enough"?
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
      // no more stack writing space left -> stop now
      break;
    }

    lightStackWriteIndex += 1;

    g_lightStack[lightStackWriteIndex].used = true;
    g_lightStack[lightStackWriteIndex].ray.origin = g_lightStack[lightStackReadIndex].result.position;

  } // for (int ii = 0; ii < g_maxLightStackSize; ++ii)

  result.lightIsBlocked = lightIsBlocked;

  if (!lightIsBlocked)
  {

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
      result.lightColor *= g_lightStack[lightStackReadIndex].lightResult.color.xyz;
      result.lightIntensity *= g_lightStack[lightStackReadIndex].lightResult.intensity;
    }

  }

  // return false;
}

// MARK: lightAt
void lightAt(
  vec3 impactPosition,
  vec3 impactNormal,
  vec3 viewer,
  out LightResult finalResult
) {

  finalResult.intensity = g_ambientLightIntensity;
  finalResult.color = vec3(1.0);

  //
  // handle point lights
  //

  vec3 lightDir = vec3(1.0);

  ShadowTransparencyRayResult localResult;

  for (int lightIndex = 0; lightIndex < u_lightsTextureSize; lightIndex += 2)
  {

    // point-light-texel[0]:R: point light position.x
    // point-light-texel[0]:G: point light position.y
    // point-light-texel[0]:B: point light position.z
    // point-light-texel[0]:A: point light radius
    // point-light-texel[1]:R: point light intensity
    // point-light-texel[1]:G: <unused>
    // point-light-texel[1]:B: <unused>
    // point-light-texel[1]:A: <unused>

    vec4 lightTexel0 = texelFetch(u_dataTexture, ivec2(lightIndex + 0, LIGHTS_ROW_INDEX), 0);
    vec3 lightPos = lightTexel0.rgb;
    float lightRadius = max(0.001, lightTexel0.a);

    vec3 lightToImpactVec3 = lightPos - impactPosition;

    // is it out of the point light effect radius?
    float lightToImpactDistance = length(lightToImpactVec3);
    // if (lightToImpactDistance > lightRadius)
    // {
    //   // out of range, do not apply this light
    //   continue;
    // }

    // normalize lightDir
    lightDir = lightToImpactVec3 / lightToImpactDistance;

    vec4 lightTexel1 = texelFetch(u_dataTexture, ivec2(lightIndex + 1, LIGHTS_ROW_INDEX), 0);
    float lightIntensitySetting = lightTexel1.r;

    // attenuation
    float tmpLightIntensity = max(0.0, lightIntensitySetting * (1.0 - (lightToImpactDistance / lightRadius)));

    if (tmpLightIntensity == 0.0)
    {
      // light is too far from the shape impact -> ignore the light
      continue;
    }

    localResult.lightIsBlocked = false;
    localResult.lightColor = vec3(1.0); // white
    localResult.lightIntensity = tmpLightIntensity;

    _checkForShadowOrTransparency(impactPosition, lightPos, lightDir, localResult);

    if (localResult.lightIsBlocked)
    {
      // light ray is blocked by a (solid enough) shape -> ignore the light
      continue;
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

    float currentIntensity = 0.0;

    // diffuse light
    currentIntensity += dot(lightDir, impactNormal);

    // specular light
    vec3 reflectionFactor = reflect(-lightDir, impactNormal);
    currentIntensity += pow(max(dot(reflectionFactor, viewer), 0.0), 20.0);

    currentIntensity *= localResult.lightIntensity;

    //
    // blend with the current result
    //

    float maxIntensity = max(finalResult.intensity, currentIntensity);
    float normalizedRatio = 1.0 / maxIntensity;

    float oldBlendRatio = normalizedRatio * max(finalResult.intensity, g_ambientLightIntensity);
    float newBlendRatio = normalizedRatio * max(currentIntensity, g_ambientLightIntensity);

    finalResult.color = finalResult.color * oldBlendRatio + localResult.lightColor * newBlendRatio;
    finalResult.intensity = maxIntensity;

  } // for (int index = 0; index < u_lightsTextureSize; index += 2)
}
