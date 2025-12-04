
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

  const int maxLightStackSize = 5;
  LightStackData _lightStack[maxLightStackSize];

  vec3 lightDir = vec3(1.0);
  float currLightIntensity = 1.0;
  vec3 currLightColor = vec3(1.0);

  for (int lightIndex = 0; lightIndex < u_lightsTextureSize; lightIndex += 2)
  {

    vec4 lightTexel0 = texelFetch(u_lightsTextureData, ivec2(lightIndex + 0, 0), 0);
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

    vec4 lightTexel1 = texelFetch(u_lightsTextureData, ivec2(lightIndex + 1, 0), 0);
    float localIntensity = lightTexel1.r;

    currLightIntensity = localIntensity * (1.0 - lightToImpactDistance / lightRadius);

    // initialize stack
    for (int ii = 0; ii < maxLightStackSize; ++ii)
    {
      _lightStack[ii].used = false;
      _lightStack[ii].ray.direction = lightDir;
      _lightStack[ii].result.color = vec4(1.0);
      _lightStack[ii].result.reflectionFactor = 1.0;
      _lightStack[ii].result.refractionFactor = 1.0;
      _lightStack[ii].result.materialIndex = -1;
      _lightStack[ii].result.lightEnabled = false;
      _lightStack[ii].lightResult.intensity = 1.0;
      _lightStack[ii].lightResult.color = vec3(1.0);
    }

    // initialize first stack element
    _lightStack[0].used = true;
    _lightStack[0].ray.origin = impactPosition;

    int previousShapeIndex = -1;

    bool lightIsBlocked = false;

    int lightStackWriteIndex = 0;

    //
    // Accumulating this shape's light stack
    //

    int lightStackReadIndex = 0;
    for (; lightStackReadIndex < maxLightStackSize; ++lightStackReadIndex)
    {
      // intersect object
      // if reflection/refraction push to stack
      // repeat

      if (!_lightStack[lightStackReadIndex].used)
      {
        // nothing to process anymore
        break;
      }

      _lightStack[lightStackReadIndex].result.hasHit = intersectScene(
        _lightStack[lightStackReadIndex].ray,
        _lightStack[lightStackReadIndex].result,
        true,
        previousShapeIndex
      );

      if (
        // we got no collision -> light not blocked
        !_lightStack[lightStackReadIndex].result.hasHit ||
        // we got collision -> checking if the impact is behind the light
        _lightStack[lightStackReadIndex].result.distance > distance(_lightStack[lightStackReadIndex].ray.origin, lightPos)
      ) {
        // ignore the light
        lightIsBlocked = false;
        break;
      }

      previousShapeIndex = _lightStack[lightStackReadIndex].result.shapeIndex;

      int materialIndex = _lightStack[lightStackReadIndex].result.materialIndex;

      // light ray is blocked, skip this light... unless? (<- chessboard/refraction material check)
      vec4 matTexel0 = texelFetch(u_materialsTextureData, ivec2(materialIndex * 2 + 0, 0), 0);
      vec4 matTexel1 = texelFetch(u_materialsTextureData, ivec2(materialIndex * 2 + 1, 0), 0);

      int materialType = int(matTexel0.r);

      // chessboard alternative material
      if (materialType == 1)
      {
        int subMaterialIndex = 0;

        vec3 txPos = _lightStack[lightStackReadIndex].result.txPos;
        if (
          (fract(txPos.x * matTexel1.t) > 0.5)
          != (fract(txPos.y * matTexel1.g) > 0.5)
          != (fract(txPos.z * matTexel1.b) > 0.5)
        ) {
          subMaterialIndex = int(matTexel0.a);
        } else {
          subMaterialIndex = int(matTexel0.b);
        }

        matTexel0 = texelFetch(u_materialsTextureData, ivec2(subMaterialIndex * 2 + 0, 0), 0);
        matTexel1 = texelFetch(u_materialsTextureData, ivec2(subMaterialIndex * 2 + 1, 0), 0);
      }

      float refractionFactor = matTexel0.a;

      if (refractionFactor <= 0.01)
      {
        // no refraction/transparency -> light ray is blocked -> ignore the light
        lightIsBlocked = true;
        break;
      }

      vec3 shapeColor = matTexel1.gba;

      _lightStack[lightStackReadIndex].lightResult.intensity = refractionFactor;
      _lightStack[lightStackReadIndex].lightResult.color = shapeColor.xyz;

      //
      // handle refraction/transparency
      //

      if (lightStackWriteIndex + 1 >= maxLightStackSize)
      {
        // no more stack space left -> stop now
        break;
      }

      lightStackWriteIndex += 1;

      _lightStack[lightStackWriteIndex].used = true;
      _lightStack[lightStackWriteIndex].ray.origin = _lightStack[lightStackReadIndex].result.position;

    } // for (int ii = 0; ii < maxLightStackSize; ++ii)

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
    // for (lightStackReadIndex = lightStackWriteIndex; lightStackReadIndex >= 0; --lightStackReadIndex)
    for (lightStackReadIndex = maxLightStackSize - 1; lightStackReadIndex >= 0; --lightStackReadIndex)
    {
      if (_lightStack[lightStackReadIndex].used == false)
      {
        continue;
      }

      // used stack element
      currLightColor *= _lightStack[lightStackReadIndex].lightResult.color.xyz;
      currLightIntensity *= _lightStack[lightStackReadIndex].lightResult.intensity;
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
