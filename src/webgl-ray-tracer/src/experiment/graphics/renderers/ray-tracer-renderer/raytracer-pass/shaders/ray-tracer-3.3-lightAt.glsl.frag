

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

  int maxLightStackSize = min(u_maxLightStackSize, MAX_LIGHT_STACK_SIZE);

  // this variable allow us the skip the collision with the previously hit shape
  // -> this will avoid a "double hit" of the same shape while we loop
  int previousShapeIndex = -1;

  // start with assumption the light is not blocked
  result.lightIsBlocked = false;

  //
  // Accumulating this shape's light stack
  //

  RayValues currRay;
  currRay.origin = impactPosition;
  currRay.direction = lightDir;
  currRay.invDirection = 1.0 / currRay.direction;

  RayResult currResult;

  for (int index = 0; index < maxLightStackSize && index < MAX_LIGHT_STACK_SIZE; ++index)
  {
    const bool shadowCastingMode = true;

    currResult.reflectionFactor = 0.0;
    currResult.refractionFactor = 0.0;
    currResult.materialIndex = -1;
    currResult.distance = FAR_VALUE;
    currResult.sceneIndex = 0;

    bool hasHit = intersectScene(
      currRay,
      currResult,
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
      currResult.distance > distance(currRay.origin, lightPos)
    ) {
      // ignore the light
      result.lightIsBlocked = false;
      return;
    }

    // if we're here, the "shadow ray" has hit a shape, and normally this point light should be skipped
    // -> but we actually need to check for any refractive/transparent material associated to the shape hit

    // save it now, in case we must loop again
    previousShapeIndex = currResult.shapeIndex;

    // now we're going to need the shape's material
    int materialIndex = currResult.materialIndex;
    int sceneIndex = currResult.sceneIndex;

    vec4 matTexel[2];
    fetchMaterialTexels(materialIndex, sceneIndex, currResult.txPos, matTexel);

    float refractionFactor = matTexel[0].a;

    // is the shape "solid enough"?
    if (refractionFactor <= 0.01)
    {
      // no refraction/transparency -> light ray is blocked -> ignore the light
      result.lightIsBlocked = true;
      return;
    }

    //
    // handle refraction/transparency
    //

    vec3 shapeColor = matTexel[1].gba;
    result.lightColor *= shapeColor;
    result.lightIntensity *= refractionFactor;
    currRay.origin = currResult.position;

  }
}

// MARK: radiusIntersectBvhAABB
bool radiusIntersectBvhAABB(vec3 inPos, vec3 bvhMin, vec3 bvhMax)
{
  return (
    inPos.x >= bvhMin.x && inPos.x <= bvhMax.x &&
    inPos.y >= bvhMin.y && inPos.y <= bvhMax.y &&
    inPos.z >= bvhMin.z && inPos.z <= bvhMax.z
  );
  // vec3 valA = (bvhMin - ray.origin) * ray.invDirection;
  // vec3 valB = (bvhMax - ray.origin) * ray.invDirection;
  // vec3 nearVal = min(valA, valB);
  // vec3 farVal  = max(valA, valB);

  // float max_nearVal = max(nearVal.x, max(nearVal.y, nearVal.z));
  // float min_farVal = min(farVal.x,  min(farVal.y,  farVal.z));

  // return min_farVal >= outDistance;
}

// MARK: lightAt
void lightAt(
  vec3 impactPosition,
  vec3 impactNormal,
  vec3 viewer,
  out LightResult finalResult
) {

  finalResult.intensity = AMBIENT_LIGHT_INTENSITY;
  finalResult.color = vec3(1.0);

  //
  // handle point lights
  //

  vec3 lightDir = vec3(1.0);

  ShadowTransparencyRayResult localResult;

// #if 0

//   //
//   //
//   //

//   g_bvhLightStack[0] = 0; // start with the root BVH node index
//   int bvhLightStackTopIndex = 0;

//   // int baseIndex = 0;

//   while (bvhLightStackTopIndex >= 0)
//   {
//     // pop bvh stack
//     int nodeIndex = g_bvhLightStack[bvhLightStackTopIndex];
//     bvhLightStackTopIndex -= 1;

//     // BVH-node-texel[0]:R: node0 node type
//     // BVH-node-texel[0]:G: node0 node index
//     // BVH-node-texel[0]:B: node0 min.x
//     // BVH-node-texel[0]:A: node0 min.y
//     // BVH-node-texel[1]:R: node0 min.z
//     // BVH-node-texel[1]:G: node0 max.x
//     // BVH-node-texel[1]:B: node0 max.y
//     // BVH-node-texel[1]:A: node0 max.z
//     // BVH-node-texel[2]:R: node1 node type
//     // BVH-node-texel[2]:G: node1 node index
//     // BVH-node-texel[2]:B: node1 min.x
//     // BVH-node-texel[2]:A: node1 min.y
//     // BVH-node-texel[3]:R: node1 min.z
//     // BVH-node-texel[3]:G: node1 max.x
//     // BVH-node-texel[3]:B: node1 max.y
//     // BVH-node-texel[3]:A: node1 max.z
//     // BVH-node-texel[4]:R: node2 node type
//     // BVH-node-texel[4]:G: node2 node index
//     // BVH-node-texel[4]:B: node2 min.x
//     // BVH-node-texel[4]:A: node2 min.y
//     // BVH-node-texel[5]:R: node2 min.z
//     // BVH-node-texel[5]:G: node2 max.x
//     // BVH-node-texel[5]:B: node2 max.y
//     // BVH-node-texel[5]:A: node2 max.z
//     // BVH-node-texel[6]:R: node3 node type
//     // BVH-node-texel[6]:G: node3 node index
//     // BVH-node-texel[6]:B: node3 min.x
//     // BVH-node-texel[6]:A: node3 min.y
//     // BVH-node-texel[7]:R: node3 min.z
//     // BVH-node-texel[7]:G: node3 max.x
//     // BVH-node-texel[7]:B: node3 max.y
//     // BVH-node-texel[7]:A: node3 max.z

//     vec4 rootNodeTexel0 = texelFetch(u_dataTexture, ivec2(nodeIndex * 8 + 0, 1), 0);
//     vec4 rootNodeTexel1 = texelFetch(u_dataTexture, ivec2(nodeIndex * 8 + 1, 1), 0);
//     vec4 rootNodeTexel2 = texelFetch(u_dataTexture, ivec2(nodeIndex * 8 + 2, 1), 0);
//     vec4 rootNodeTexel3 = texelFetch(u_dataTexture, ivec2(nodeIndex * 8 + 3, 1), 0);
//     vec4 rootNodeTexel4 = texelFetch(u_dataTexture, ivec2(nodeIndex * 8 + 4, 1), 0);
//     vec4 rootNodeTexel5 = texelFetch(u_dataTexture, ivec2(nodeIndex * 8 + 5, 1), 0);
//     vec4 rootNodeTexel6 = texelFetch(u_dataTexture, ivec2(nodeIndex * 8 + 6, 1), 0);
//     vec4 rootNodeTexel7 = texelFetch(u_dataTexture, ivec2(nodeIndex * 8 + 7, 1), 0);

//     int val0_NodeType = int(rootNodeTexel0.r);
//     int val0_NodeIndex = int(rootNodeTexel0.g);
//     vec3 val0_AabbMin = vec3(rootNodeTexel0.b, rootNodeTexel0.a, rootNodeTexel1.r);
//     vec3 val0_AabbMax = vec3(rootNodeTexel1.g, rootNodeTexel1.b, rootNodeTexel1.a);

//     int val1_NodeType = int(rootNodeTexel2.r);
//     int val1_NodeIndex = int(rootNodeTexel2.g);
//     vec3 val1_AabbMin = vec3(rootNodeTexel2.b, rootNodeTexel2.a, rootNodeTexel3.r);
//     vec3 val1_AabbMax = vec3(rootNodeTexel3.g, rootNodeTexel3.b, rootNodeTexel3.a);

//     int val2_NodeType = int(rootNodeTexel4.r);
//     int val2_NodeIndex = int(rootNodeTexel4.g);
//     vec3 val2_AabbMin = vec3(rootNodeTexel4.b, rootNodeTexel4.a, rootNodeTexel5.r);
//     vec3 val2_AabbMax = vec3(rootNodeTexel5.g, rootNodeTexel5.b, rootNodeTexel5.a);

//     int val3_NodeType = int(rootNodeTexel6.r);
//     int val3_NodeIndex = int(rootNodeTexel6.g);
//     vec3 val3_AabbMin = vec3(rootNodeTexel6.b, rootNodeTexel6.a, rootNodeTexel7.r);
//     vec3 val3_AabbMax = vec3(rootNodeTexel7.g, rootNodeTexel7.b, rootNodeTexel7.a);

//     int   allNodeTypes[4];
//     int   allNodeIndices[4];
//     int   nodeWriteIndex = 0;

//     // accumulate aabb intersection data
//     float tmpAabbDistance;
//     if (
//       val0_NodeType > 0 &&
//       radiusIntersectBvhAABB(impactPosition, val0_AabbMin, val0_AabbMax)
//     ) {
//       allNodeTypes[nodeWriteIndex]    = val0_NodeType;
//       allNodeIndices[nodeWriteIndex]  = val0_NodeIndex;
//       ++nodeWriteIndex;
//     }

//     if (
//       val1_NodeType > 0 &&
//       radiusIntersectBvhAABB(impactPosition, val1_AabbMin, val1_AabbMax)
//     ) {
//       allNodeTypes[nodeWriteIndex]    = val1_NodeType;
//       allNodeIndices[nodeWriteIndex]  = val1_NodeIndex;
//       ++nodeWriteIndex;
//     }

//     if (
//       val2_NodeType > 0 &&
//       radiusIntersectBvhAABB(impactPosition, val2_AabbMin, val2_AabbMax)
//     ) {
//       allNodeTypes[nodeWriteIndex]    = val2_NodeType;
//       allNodeIndices[nodeWriteIndex]  = val2_NodeIndex;
//       ++nodeWriteIndex;
//     }

//     if (
//       val3_NodeType > 0 &&
//       radiusIntersectBvhAABB(impactPosition, val3_AabbMin, val3_AabbMax)
//     ) {
//       allNodeTypes[nodeWriteIndex]    = val3_NodeType;
//       allNodeIndices[nodeWriteIndex]  = val3_NodeIndex;
//       ++nodeWriteIndex;
//     }

//     // // crude unrolled sort - start
//     // #define DO_SWAP(valType, valA, valB) \
//     // { \
//     //   valType tmpVal = valA; \
//     //   valA = valB; \
//     //   valB = tmpVal; \
//     // }
//     // #define MAYBE_SWAP(a, b) \
//     //   if (allNodeDistance[a] > allNodeDistance[b]) \
//     //   { \
//     //     DO_SWAP(float, allNodeDistance[a], allNodeDistance[b]) \
//     //     DO_SWAP(int, allNodeTypes[a], allNodeTypes[b]) \
//     //     DO_SWAP(int, allNodeIndices[a], allNodeIndices[b]) \
//     //   }

//     // MAYBE_SWAP(0, 1)
//     // MAYBE_SWAP(2, 3)
//     // MAYBE_SWAP(0, 2)
//     // MAYBE_SWAP(1, 3)
//     // MAYBE_SWAP(1, 2)
//     // #undef MAYBE_SWAP
//     // #undef DO_SWAP
//     // // crude unrolled sort - end

//     for (int ii = nodeWriteIndex - 1; ii >= 0; --ii) {

//       // if (allNodeDistance[ii] > outBestResult.distance) {
//       //   break;
//       // }

//       // is bvh4 node?
//       if (allNodeTypes[ii] == 1) {
//         if (
//           // has enough space left on the stack
//           bvhLightStackTopIndex + 1 < MAX_BVH_STACK
//         ) {
//           // push bvh node index on to the stack
//           bvhLightStackTopIndex += 1;
//           g_bvhLightStack[bvhLightStackTopIndex] = allNodeIndices[ii];
//         }
//       }
//       // is bvh4 leaf?
//       else if (allNodeTypes[ii] == 2) {
//         // intersectSceneOneShape(0, allNodeIndices[ii], inRay, outBestResult, shadowCastingMode);

//         int lightIndex = allNodeIndices[ii];

//         // point-light-texel[0]:R: point light position.x
//         // point-light-texel[0]:G: point light position.y
//         // point-light-texel[0]:B: point light position.z
//         // point-light-texel[0]:A: point light radius
//         // point-light-texel[1]:R: point light intensity
//         // point-light-texel[1]:G: <unused>
//         // point-light-texel[1]:B: <unused>
//         // point-light-texel[1]:A: <unused>

//         vec4 lightTexel0 = texelFetch(u_dataTexture, ivec2(lightIndex + 0, POINT_POINT_LIGHTS_ROW_INDEX), 0);
//         vec3 lightPos = lightTexel0.rgb;
//         float lightRadius = max(lightTexel0.a, 0.001);

//         vec3 lightToImpactVec3 = lightPos - impactPosition;

//         // is it out of the point light effect radius?
//         float lightToImpactDistance = length(lightToImpactVec3);
//         if (lightToImpactDistance > lightRadius)
//         {
//           // light is too far from the shape impact -> ignore the light
//           continue;
//         }

//         // normalize lightDir
//         lightDir = lightToImpactVec3 / max(lightToImpactDistance, 0.001);

//         // ensure the lightDir components are "not exactly of value 0"
//         lightDir = mix(lightDir, vec3(-1e-8), equal(lightDir, vec3(0.0)));

//         vec4 lightTexel1 = texelFetch(u_dataTexture, ivec2(lightIndex + 1, POINT_POINT_LIGHTS_ROW_INDEX), 0);
//         float lightIntensitySetting = lightTexel1.r;

//         // attenuation
//         float tmpLightIntensity = max(0.0, lightIntensitySetting * (1.0 - (lightToImpactDistance / lightRadius)));

//         if (tmpLightIntensity == 0.0)
//         {
//           // light is too far from the shape impact -> ignore the light
//           continue;
//         }

//         localResult.lightIsBlocked = false;
//         localResult.lightColor = vec3(1.0); // white
//         localResult.lightIntensity = tmpLightIntensity;

//         _checkForShadowOrTransparency(impactPosition, lightPos, lightDir, localResult);

//         if (localResult.lightIsBlocked)
//         {
//           // light ray is blocked by a (solid enough) shape -> ignore the light
//           continue;
//         }

//         //
//         //
//         //

//         //
//         // the light logic
//         // -> TODO: find the name of this (custom?) method...
//         // ---> Blinn?
//         // ---> Phong?
//         // ---> Blinn-Phong?
//         //

//         float currentIntensity = 0.0;

//         // diffuse light
//         currentIntensity += dot(lightDir, impactNormal);

//         // specular light
//         vec3 reflectionFactor = reflect(-lightDir, impactNormal);
//         currentIntensity += pow(max(dot(reflectionFactor, viewer), 0.0), 20.0);

//         currentIntensity *= localResult.lightIntensity;

//         //
//         // blend with the current result
//         //

//         float maxIntensity = max(finalResult.intensity, currentIntensity);
//         float normalizedRatio = 1.0 / max(maxIntensity, 0.001);

//         float oldBlendRatio = normalizedRatio * max(finalResult.intensity, AMBIENT_LIGHT_INTENSITY);
//         float newBlendRatio = normalizedRatio * max(currentIntensity, AMBIENT_LIGHT_INTENSITY);

//         finalResult.color = finalResult.color * oldBlendRatio + localResult.lightColor * newBlendRatio;
//         finalResult.intensity = maxIntensity;

//       }
//     }

//     //
//     //
//     //

//   }

// #else

  //
  //
  //

  for (int lightIndex = 0; lightIndex < MAX_LIGHTS_PER_IMPACT && lightIndex < u_lightsTextureSize; lightIndex += 2)
  {

    // point-light-texel[0]:R: point light position.x
    // point-light-texel[0]:G: point light position.y
    // point-light-texel[0]:B: point light position.z
    // point-light-texel[0]:A: point light radius
    // point-light-texel[1]:R: point light intensity
    // point-light-texel[1]:G: <unused>
    // point-light-texel[1]:B: <unused>
    // point-light-texel[1]:A: <unused>

    vec4 lightTexel0 = texelFetch(u_dataTexture, ivec2(lightIndex + 0, POINT_POINT_LIGHTS_ROW_INDEX), 0);
    vec3 lightPos = lightTexel0.rgb;
    float lightRadius = max(lightTexel0.a, 0.001);

    vec3 lightToImpactVec3 = lightPos - impactPosition;

    // is it out of the point light effect radius?
    float lightToImpactDistance = length(lightToImpactVec3);
    if (lightToImpactDistance > lightRadius)
    {
      // light is too far from the shape impact -> ignore the light
      continue;
    }

    // normalize lightDir
    lightDir = lightToImpactVec3 / max(lightToImpactDistance, 0.001);

    // ensure the lightDir components are "not exactly of value 0"
    lightDir = mix(lightDir, vec3(-1e-8), equal(lightDir, vec3(0.0)));

    vec4 lightTexel1 = texelFetch(u_dataTexture, ivec2(lightIndex + 1, POINT_POINT_LIGHTS_ROW_INDEX), 0);
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

    float currentIntensity = 0.01;

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
    float normalizedRatio = 1.0 / max(maxIntensity, 0.001);

    float oldBlendRatio = normalizedRatio * max(finalResult.intensity, AMBIENT_LIGHT_INTENSITY);
    float newBlendRatio = normalizedRatio * max(currentIntensity, AMBIENT_LIGHT_INTENSITY);

    finalResult.color = finalResult.color * oldBlendRatio + localResult.lightColor * newBlendRatio;
    finalResult.intensity = maxIntensity;
  }

// #endif
}
