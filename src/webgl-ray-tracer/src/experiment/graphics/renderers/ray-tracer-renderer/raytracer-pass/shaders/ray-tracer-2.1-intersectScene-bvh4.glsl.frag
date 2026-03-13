

#include "./ray-tracer-2.1.1-quat-utils.glsl.frag"

#include "./ray-tracer-2.1.2-intersect-shapes.glsl.frag"

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

// MARK: _intersectSphereShape
void _intersectSphereShape(
  int rawShapeIndex,
  RayValues ray,
  inout RayResult outBestResult,
  bool shadowCastingMode
) {

  //
  // Sphere shape
  //

  // start at index 0
  int shapeIndex = rawShapeIndex;

  // sphere-shape-texel[0]:R: can cast shadow
  // sphere-shape-texel[0]:G: material index
  // sphere-shape-texel[0]:B: center.x
  // sphere-shape-texel[0]:A: center.y
  // sphere-shape-texel[1]:R: center.z
  // sphere-shape-texel[1]:G: quat.x
  // sphere-shape-texel[1]:B: quat.y
  // sphere-shape-texel[1]:A: quat.z
  // sphere-shape-texel[2]:R: quat.w
  // sphere-shape-texel[2]:G: radius
  // sphere-shape-texel[2]:B: <unused>
  // sphere-shape-texel[2]:A: <unused>

  vec4 shTexel0 = texelFetch(u_dataTexture, ivec2(shapeIndex * 3 + 0, SPHERE_SHAPES_ROW_INDEX), 0);

  if (
    shadowCastingMode == true &&
    (int(shTexel0.r) == 0) // canCastShadows is false
  ) {
    // not casting shadow while in shadow casting mode? -> skip the shape
    return;
  }

  vec4 shTexel1 = texelFetch(u_dataTexture, ivec2(shapeIndex * 3 + 1, SPHERE_SHAPES_ROW_INDEX), 0);
  vec4 shTexel2 = texelFetch(u_dataTexture, ivec2(shapeIndex * 3 + 2, SPHERE_SHAPES_ROW_INDEX), 0);

  vec3 center = vec3(shTexel0.b, shTexel0.a, shTexel1.r);
  float radius = shTexel2.g;

  vec4 orientation = vec4(
    shTexel1.g,
    shTexel1.b,
    shTexel1.a,
    shTexel2.r
  );
  mat3 normalMatrix = quat_to_mat3(orientation);
  mat3 inverseNormalMatrix = inverse(normalMatrix);

  // convert ray from world space to sphere space
  RayValues sphereSpaceRay;
  sphereSpaceRay.origin = (inverseNormalMatrix * (ray.origin - center));
  sphereSpaceRay.direction = (inverseNormalMatrix * ray.direction);

  vec3 normal;
  float currDistance = 0.0;

  if (
    // false if not hit
    !intersectSphere(sphereSpaceRay, radius, currDistance, normal) ||
    // false if hit but not the closest shape
    (outBestResult.distance > 0.0 && currDistance > outBestResult.distance)
  ) {
    return;
  }

  // convert normal from box space to world space
  normal = normalMatrix * normal;

  outBestResult.position = ray.origin + currDistance * ray.direction;

  // the multiplication by 0.999 will remove graphic artifact
  // vec3 txPos = (inverseNormalMatrix * 0.999) * (center - outBestResult.position);
  vec3 txPos = inverseNormalMatrix * (center - outBestResult.position);
  outBestResult.txPos = txPos;

  outBestResult.hasHit = true;

  // used here to tell if the intersected shape is any closer than any previous one
  // -> also used to tell if a shadow ray from a light is "too far" behind the point light
  outBestResult.distance = currDistance;

  outBestResult.normal = normal;

  // this is used by the point lights to handle the transparency/refraction

  // outBestResult.shapeIndex = shapeIndex;
  outBestResult.shapeIndex = rawShapeIndex;

  // this is used by the point lights to handle the transparency/refraction
  outBestResult.materialIndex = int(shTexel0.g);
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

// MARK: _intersectBoxShape
void _intersectBoxShape(
  int rawShapeIndex,
  RayValues ray,
  inout RayResult outBestResult,
  bool shadowCastingMode
) {

  //
  // Box shape
  //

  // start at index 1000
  int shapeIndex = rawShapeIndex - 1000;

  // box-shape-texel[0]:R: can cast shadow
  // box-shape-texel[0]:G: material index
  // box-shape-texel[0]:B: center.x
  // box-shape-texel[0]:A: center.y
  // box-shape-texel[1]:R: center.z
  // box-shape-texel[1]:G: quat.x
  // box-shape-texel[1]:B: quat.y
  // box-shape-texel[1]:A: quat.z
  // box-shape-texel[2]:R: quat.w
  // box-shape-texel[2]:G: boxSize.x
  // box-shape-texel[2]:B: boxSize.y
  // box-shape-texel[2]:A: boxSize.z
  vec4 shTexel0 = texelFetch(u_dataTexture, ivec2(shapeIndex * 3 + 0, BOX_SHAPES_ROW_INDEX), 0);

  if (
    shadowCastingMode == true &&
    (int(shTexel0.r) == 0) // canCastShadows is false
  ) {
    // not casting shadow while in shadow casting mode? -> skip the shape
    return;
  }

  vec4 shTexel1 = texelFetch(u_dataTexture, ivec2(shapeIndex * 3 + 1, BOX_SHAPES_ROW_INDEX), 0);
  vec4 shTexel2 = texelFetch(u_dataTexture, ivec2(shapeIndex * 3 + 2, BOX_SHAPES_ROW_INDEX), 0);


  vec3 center = vec3(shTexel0.b, shTexel0.a, shTexel1.r);
  vec3 boxSize = shTexel2.gba;

  vec4 orientation = vec4(
    shTexel1.g,
    shTexel1.b,
    shTexel1.a,
    shTexel2.r
  );
  mat3 normalMatrix = quat_to_mat3(orientation);
  mat3 inverseNormalMatrix = inverse(normalMatrix);

  // convert ray from world space to box space
  RayValues boxSpaceRay;
  boxSpaceRay.origin = (inverseNormalMatrix * (ray.origin - center));
  boxSpaceRay.direction = (inverseNormalMatrix * ray.direction);

  vec3 normal;
  float currDistance = 0.0;

  if (
    // false if not hit
    !intersectBox(boxSpaceRay, boxSize, currDistance, normal) ||
    // false if hit but not the closest shape
    (outBestResult.distance > 0.0 && currDistance > outBestResult.distance)
  ) {
    return;
  }

  // convert normal from box space to world space
  normal = normalMatrix * normal;

  outBestResult.position = ray.origin + currDistance * ray.direction;

  vec3 txPos = inverseNormalMatrix * (center - outBestResult.position);
  // the multiplication by 0.999 will remove unwanted graphic artifact
  outBestResult.txPos = txPos * 0.999;

  outBestResult.hasHit = true;

  // used here to tell if the intersected shape is any closer than any previous one
  // -> also used to tell if a shadow ray from a light is "too far" behind the point light
  outBestResult.distance = currDistance;

  outBestResult.normal = normal;

  // this is used by the point lights to handle the transparency/refraction

  // outBestResult.shapeIndex = shapeIndex;
  outBestResult.shapeIndex = rawShapeIndex;

  // this is used by the point lights to handle the transparency/refraction
  outBestResult.materialIndex = int(shTexel0.g);
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

// MARK: _intersectTriangleShape
void _intersectTriangleShape(
  int rawShapeIndex,
  RayValues ray,
  inout RayResult outBestResult,
  bool shadowCastingMode
) {
  //
  // Triangle shape
  //

  // start at index 2000
  int shapeIndex = rawShapeIndex - 2000;

  // triangle-shape-texel[0]:R: can cast shadow
  // triangle-shape-texel[0]:G: material index
  // triangle-shape-texel[0]:B: triangle0.x
  // triangle-shape-texel[0]:A: triangle0.y
  // triangle-shape-texel[1]:R: triangle0.z
  // triangle-shape-texel[1]:G: triangle1.x
  // triangle-shape-texel[1]:B: triangle1.y
  // triangle-shape-texel[1]:A: triangle1.z
  // triangle-shape-texel[2]:R: triangle2.x
  // triangle-shape-texel[2]:G: triangle2.y
  // triangle-shape-texel[2]:B: triangle2.z
  // triangle-shape-texel[2]:A: <unused>
  vec4 shTexel0 = texelFetch(u_dataTexture, ivec2(shapeIndex * 3 + 0, TRIANGLE_SHAPES_ROW_INDEX), 0);

  if (
    shadowCastingMode == true &&
    (int(shTexel0.r) == 0) // canCastShadows is false
  ) {
    // not casting shadow while in shadow casting mode? -> skip the shape
    return;
  }

  vec4 shTexel1 = texelFetch(u_dataTexture, ivec2(shapeIndex * 3 + 1, TRIANGLE_SHAPES_ROW_INDEX), 0);
  vec4 shTexel2 = texelFetch(u_dataTexture, ivec2(shapeIndex * 3 + 2, TRIANGLE_SHAPES_ROW_INDEX), 0);

  vec3 v0 = vec3(shTexel0.b, shTexel0.a, shTexel1.r);
  vec3 v1 = shTexel1.gba;
  vec3 v2 = shTexel2.rgb;

  vec3 normal;
  float currDistance = 0.0;

  if (
    // false if not hit
    !intersectTriangle(ray, v0, v1, v2, currDistance, normal) ||
    // false if hit but not the closest shape
    (outBestResult.distance > 0.0 && currDistance > outBestResult.distance)
  ) {
    return;
  }

  outBestResult.position = ray.origin + currDistance * ray.direction;

  // outBestResult.txPos = vec3(0.0); // TODO?

  outBestResult.hasHit = true;

  // used here to tell if the intersected shape is any closer than any previous one
  // -> also used to tell if a shadow ray from a light is "too far" behind the point light
  outBestResult.distance = currDistance;

  outBestResult.normal = normal;

  // this is used by the point lights to handle the transparency/refraction

  // outBestResult.shapeIndex = shapeIndex;
  outBestResult.shapeIndex = rawShapeIndex;

  // this is used by the point lights to handle the transparency/refraction
  outBestResult.materialIndex = int(shTexel0.g);
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

// MARK: intersectSceneOneShape
void intersectSceneOneShape(
  int rawShapeIndex,
  RayValues ray,
  inout RayResult outBestResult,
  bool shadowCastingMode
) {

  if (rawShapeIndex < 1000)
  {
    _intersectSphereShape(
      rawShapeIndex,
      ray,
      outBestResult,
      shadowCastingMode
    );
  }
  else if (rawShapeIndex < 2000)
  {
    _intersectBoxShape(
      rawShapeIndex,
      ray,
      outBestResult,
      shadowCastingMode
    );
  }
  else if (rawShapeIndex < 3000)
  {
    _intersectTriangleShape(
      rawShapeIndex,
      ray,
      outBestResult,
      shadowCastingMode
    );
  }
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

// MARK: rayIntersectBvhAABB
bool rayIntersectBvhAABB(RayValues ray, vec3 bvhMin, vec3 bvhMax, out float outDistance)
{
  vec3 valA = (bvhMin - ray.origin) * ray.invDirection;
  vec3 valB = (bvhMax - ray.origin) * ray.invDirection;
  vec3 nearVal = min(valA, valB);
  vec3 farVal  = max(valA, valB);

  float max_nearVal = max(nearVal.x, max(nearVal.y, nearVal.z));
  float min_farVal = min(farVal.x,  min(farVal.y,  farVal.z));

  outDistance = max(max_nearVal, 0.0); // clamp to 0 if origin is inside the box

  return min_farVal >= outDistance;
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

// MARK: intersectScene
bool intersectScene(
  RayValues ray,
  inout RayResult outBestResult,
  bool shadowCastingMode,
  int toIgnoreShapeIndex
) {

  // use BVH optimization -> traverse the nodes and their associated AABB
  // -> this should reduce the total number intersections executed

  g_bvhStack[0] = 0; // start with the root BVH node index
  int bvhStackTopIndex = 0;

  while (bvhStackTopIndex >= 0)
  {

    // pop bvh stack
    int nodeIndex = g_bvhStack[bvhStackTopIndex];
    bvhStackTopIndex -= 1;

    // BVH-node-texel[0]:R: node0 node type
    // BVH-node-texel[0]:G: node0 node index
    // BVH-node-texel[0]:B: node0 min.x
    // BVH-node-texel[0]:A: node0 min.y
    // BVH-node-texel[1]:R: node0 min.z
    // BVH-node-texel[1]:G: node0 max.x
    // BVH-node-texel[1]:B: node0 max.y
    // BVH-node-texel[1]:A: node0 max.z
    // BVH-node-texel[2]:R: node1 node type
    // BVH-node-texel[2]:G: node1 node index
    // BVH-node-texel[2]:B: node1 min.x
    // BVH-node-texel[2]:A: node1 min.y
    // BVH-node-texel[3]:R: node1 min.z
    // BVH-node-texel[3]:G: node1 max.x
    // BVH-node-texel[3]:B: node1 max.y
    // BVH-node-texel[3]:A: node1 max.z
    // BVH-node-texel[4]:R: node2 node type
    // BVH-node-texel[4]:G: node2 node index
    // BVH-node-texel[4]:B: node2 min.x
    // BVH-node-texel[4]:A: node2 min.y
    // BVH-node-texel[5]:R: node2 min.z
    // BVH-node-texel[5]:G: node2 max.x
    // BVH-node-texel[5]:B: node2 max.y
    // BVH-node-texel[5]:A: node2 max.z
    // BVH-node-texel[6]:R: node3 node type
    // BVH-node-texel[6]:G: node3 node index
    // BVH-node-texel[6]:B: node3 min.x
    // BVH-node-texel[6]:A: node3 min.y
    // BVH-node-texel[7]:R: node3 min.z
    // BVH-node-texel[7]:G: node3 max.x
    // BVH-node-texel[7]:B: node3 max.y
    // BVH-node-texel[7]:A: node3 max.z

    //
    //
    //

#if 1

    //
    //
    //

    vec4 rootNodeTexel0 = texelFetch(u_dataTexture, ivec2(nodeIndex * 8 + 0, BVH_ROW_INDEX), 0);
    vec4 rootNodeTexel1 = texelFetch(u_dataTexture, ivec2(nodeIndex * 8 + 1, BVH_ROW_INDEX), 0);
    vec4 rootNodeTexel2 = texelFetch(u_dataTexture, ivec2(nodeIndex * 8 + 2, BVH_ROW_INDEX), 0);
    vec4 rootNodeTexel3 = texelFetch(u_dataTexture, ivec2(nodeIndex * 8 + 3, BVH_ROW_INDEX), 0);
    vec4 rootNodeTexel4 = texelFetch(u_dataTexture, ivec2(nodeIndex * 8 + 4, BVH_ROW_INDEX), 0);
    vec4 rootNodeTexel5 = texelFetch(u_dataTexture, ivec2(nodeIndex * 8 + 5, BVH_ROW_INDEX), 0);
    vec4 rootNodeTexel6 = texelFetch(u_dataTexture, ivec2(nodeIndex * 8 + 6, BVH_ROW_INDEX), 0);
    vec4 rootNodeTexel7 = texelFetch(u_dataTexture, ivec2(nodeIndex * 8 + 7, BVH_ROW_INDEX), 0);

    int val0_NodeType = int(rootNodeTexel0.r);
    int val0_NodeIndex = int(rootNodeTexel0.g);
    vec3 val0_AabbMin = vec3(rootNodeTexel0.b, rootNodeTexel0.a, rootNodeTexel1.r);
    vec3 val0_AabbMax = vec3(rootNodeTexel1.g, rootNodeTexel1.b, rootNodeTexel1.a);

    int val1_NodeType = int(rootNodeTexel2.r);
    int val1_NodeIndex = int(rootNodeTexel2.g);
    vec3 val1_AabbMin = vec3(rootNodeTexel2.b, rootNodeTexel2.a, rootNodeTexel3.r);
    vec3 val1_AabbMax = vec3(rootNodeTexel3.g, rootNodeTexel3.b, rootNodeTexel3.a);

    int val2_NodeType = int(rootNodeTexel4.r);
    int val2_NodeIndex = int(rootNodeTexel4.g);
    vec3 val2_AabbMin = vec3(rootNodeTexel4.b, rootNodeTexel4.a, rootNodeTexel5.r);
    vec3 val2_AabbMax = vec3(rootNodeTexel5.g, rootNodeTexel5.b, rootNodeTexel5.a);

    int val3_NodeType = int(rootNodeTexel6.r);
    int val3_NodeIndex = int(rootNodeTexel6.g);
    vec3 val3_AabbMin = vec3(rootNodeTexel6.b, rootNodeTexel6.a, rootNodeTexel7.r);
    vec3 val3_AabbMax = vec3(rootNodeTexel7.g, rootNodeTexel7.b, rootNodeTexel7.a);

    float allNodeDistance[4];
    int   allNodeTypes[4];
    int   allNodeIndices[4];
    int   hitCount = 0;

    allNodeDistance[0] = 100.0;
    allNodeDistance[1] = 100.0;
    allNodeDistance[2] = 100.0;
    allNodeDistance[3] = 100.0;

    // accumulate  aabb intersection data
    float tmpAabbDistance;
    if (
      val0_NodeType > 0 &&
      rayIntersectBvhAABB(ray, val0_AabbMin, val0_AabbMax, tmpAabbDistance) &&
      tmpAabbDistance < outBestResult.distance
    ) {
      allNodeDistance[hitCount]    = tmpAabbDistance;
      allNodeTypes[hitCount] = val0_NodeType;
      allNodeIndices[hitCount]  = val0_NodeIndex;
      hitCount++;
    }

    if (
      val1_NodeType > 0 &&
      rayIntersectBvhAABB(ray, val1_AabbMin, val1_AabbMax, tmpAabbDistance) &&
      tmpAabbDistance < outBestResult.distance
    ) {
      allNodeDistance[hitCount]    = tmpAabbDistance;
      allNodeTypes[hitCount] = val1_NodeType;
      allNodeIndices[hitCount]  = val1_NodeIndex;
      hitCount++;
    }

    if (
      val2_NodeType > 0 &&
      rayIntersectBvhAABB(ray, val2_AabbMin, val2_AabbMax, tmpAabbDistance) &&
      tmpAabbDistance < outBestResult.distance
    ) {
      allNodeDistance[hitCount] = tmpAabbDistance;
      allNodeTypes[hitCount] = val2_NodeType;
      allNodeIndices[hitCount] = val2_NodeIndex;
      hitCount++;
    }

    if (
      val3_NodeType > 0 &&
      rayIntersectBvhAABB(ray, val3_AabbMin, val3_AabbMax, tmpAabbDistance) &&
      tmpAabbDistance < outBestResult.distance
    ) {
      allNodeDistance[hitCount] = tmpAabbDistance;
      allNodeTypes[hitCount] = val3_NodeType;
      allNodeIndices[hitCount] = val3_NodeIndex;
      hitCount++;
    }

    // crude unrolled sort - start
    #define DO_SWAP(valType, valA, valB) \
    { \
      valType tmpVal = valA; \
      valA = valB; \
      valB = tmpVal; \
    }
    #define MAYBE_SWAP(a, b) \
      if (allNodeDistance[a] > allNodeDistance[b]) \
      { \
        DO_SWAP(float, allNodeDistance[a], allNodeDistance[b]) \
        DO_SWAP(int, allNodeTypes[a], allNodeTypes[b]) \
        DO_SWAP(int, allNodeIndices[a], allNodeIndices[b]) \
      }

    MAYBE_SWAP(0, 1)
    MAYBE_SWAP(2, 3)
    MAYBE_SWAP(0, 2)
    MAYBE_SWAP(1, 3)
    MAYBE_SWAP(1, 2)
    #undef MAYBE_SWAP
    #undef DO_SWAP
    // crude unrolled sort - end

    for (int ii = hitCount - 1; ii >= 0; --ii) {

      if (allNodeDistance[ii] > outBestResult.distance) {
        break;
      }

      // is bvh4 node?
      if (allNodeTypes[ii] == 1) {
        if (
          // allNodeIndices[ii] >= 0 && // has child
          bvhStackTopIndex + 1 < g_maxBvhStack
        ) {
          // push bvh node index on to the stack
          bvhStackTopIndex += 1;
          g_bvhStack[bvhStackTopIndex] = allNodeIndices[ii];
        }
      }
      // is bvh4 leaf?
      else if (allNodeTypes[ii] == 2) {
        if (
          // allNodeIndices[ii] >= 0 && // has shape
          allNodeIndices[ii] != toIgnoreShapeIndex // is not ignored
        ) {
          intersectSceneOneShape(allNodeIndices[ii], ray, outBestResult, shadowCastingMode);
        }
      }
    }

    //
    //
    //

#else

    //
    //
    //

    vec4 rootNodeTexel0 = texelFetch(u_dataTexture, ivec2(nodeIndex * 8 + 0, BVH_ROW_INDEX), 0);
    vec4 rootNodeTexel1 = texelFetch(u_dataTexture, ivec2(nodeIndex * 8 + 1, BVH_ROW_INDEX), 0);
    vec4 rootNodeTexel2 = texelFetch(u_dataTexture, ivec2(nodeIndex * 8 + 2, BVH_ROW_INDEX), 0);
    vec4 rootNodeTexel3 = texelFetch(u_dataTexture, ivec2(nodeIndex * 8 + 3, BVH_ROW_INDEX), 0);
    vec4 rootNodeTexel4 = texelFetch(u_dataTexture, ivec2(nodeIndex * 8 + 4, BVH_ROW_INDEX), 0);
    vec4 rootNodeTexel5 = texelFetch(u_dataTexture, ivec2(nodeIndex * 8 + 5, BVH_ROW_INDEX), 0);
    vec4 rootNodeTexel6 = texelFetch(u_dataTexture, ivec2(nodeIndex * 8 + 6, BVH_ROW_INDEX), 0);
    vec4 rootNodeTexel7 = texelFetch(u_dataTexture, ivec2(nodeIndex * 8 + 7, BVH_ROW_INDEX), 0);

    int val0_NodeType = int(rootNodeTexel0.r);
    int val0_NodeIndex = int(rootNodeTexel0.g);
    vec3 val0_AabbMin = vec3(rootNodeTexel0.b, rootNodeTexel0.a, rootNodeTexel1.r);
    vec3 val0_AabbMax = vec3(rootNodeTexel1.g, rootNodeTexel1.b, rootNodeTexel1.a);

    int val1_NodeType = int(rootNodeTexel2.r);
    int val1_NodeIndex = int(rootNodeTexel2.g);
    vec3 val1_AabbMin = vec3(rootNodeTexel2.b, rootNodeTexel2.a, rootNodeTexel3.r);
    vec3 val1_AabbMax = vec3(rootNodeTexel3.g, rootNodeTexel3.b, rootNodeTexel3.a);

    int val2_NodeType = int(rootNodeTexel4.r);
    int val2_NodeIndex = int(rootNodeTexel4.g);
    vec3 val2_AabbMin = vec3(rootNodeTexel4.b, rootNodeTexel4.a, rootNodeTexel5.r);
    vec3 val2_AabbMax = vec3(rootNodeTexel5.g, rootNodeTexel5.b, rootNodeTexel5.a);

    int val3_NodeType = int(rootNodeTexel6.r);
    int val3_NodeIndex = int(rootNodeTexel6.g);
    vec3 val3_AabbMin = vec3(rootNodeTexel6.b, rootNodeTexel6.a, rootNodeTexel7.r);
    vec3 val3_AabbMax = vec3(rootNodeTexel7.g, rootNodeTexel7.b, rootNodeTexel7.a);

    float tmpAabbDistance = 100.0;

    if (
      val0_NodeType > 0 &&
      rayIntersectBvhAABB(ray, val0_AabbMin, val0_AabbMax, tmpAabbDistance)
      && tmpAabbDistance <= outBestResult.distance
    ) {
      if (val0_NodeType == 1) {
        if (val0_NodeIndex >= 0 && bvhStackTopIndex + 1 < g_maxBvhStack) {
          // push val0_bvh node index on to the stack
          bvhStackTopIndex += 1;
          g_bvhStack[bvhStackTopIndex] = val0_NodeIndex;
        }
      }
      else if (val0_NodeType == 2) {
        if (
          val0_NodeIndex >= 0 && // has shape
          val0_NodeIndex != toIgnoreShapeIndex // is not ignored
        ) {
          intersectSceneOneShape(val0_NodeIndex, ray, outBestResult, shadowCastingMode);
        }
      }
    }

    if (
      val1_NodeType > 0 &&
      rayIntersectBvhAABB(ray, val1_AabbMin, val1_AabbMax, tmpAabbDistance)
      && tmpAabbDistance <= outBestResult.distance
    ) {
      if (val1_NodeType == 1) {
        if (val1_NodeIndex >= 0 && bvhStackTopIndex + 1 < g_maxBvhStack) {
          // push val1_bvh node index on to the stack
          bvhStackTopIndex += 1;
          g_bvhStack[bvhStackTopIndex] = val1_NodeIndex;
        }
      }
      else if (val1_NodeType == 2) {
        if (
          val1_NodeIndex >= 0 && // has shape
          val1_NodeIndex != toIgnoreShapeIndex // is not ignored
        ) {
          intersectSceneOneShape(val1_NodeIndex, ray, outBestResult, shadowCastingMode);
        }
      }
    }

    if (
      val2_NodeType > 0 &&
      rayIntersectBvhAABB(ray, val2_AabbMin, val2_AabbMax, tmpAabbDistance)
      && tmpAabbDistance <= outBestResult.distance
    ) {
      if (val2_NodeType == 1) {
        if (val2_NodeIndex >= 0 && bvhStackTopIndex + 1 < g_maxBvhStack) {
          // push val2_bvh node index on to the stack
          bvhStackTopIndex += 1;
          g_bvhStack[bvhStackTopIndex] = val2_NodeIndex;
        }
      }
      else if (val2_NodeType == 2) {
        if (
          val2_NodeIndex >= 0 && // has shape
          val2_NodeIndex != toIgnoreShapeIndex // is not ignored
        ) {
          intersectSceneOneShape(val2_NodeIndex, ray, outBestResult, shadowCastingMode);
        }
      }
    }

    if (
      val3_NodeType > 0 &&
      rayIntersectBvhAABB(ray, val3_AabbMin, val3_AabbMax, tmpAabbDistance)
      && tmpAabbDistance <= outBestResult.distance
    ) {
      if (val3_NodeType == 1) {
        if (val3_NodeIndex >= 0 && bvhStackTopIndex + 1 < g_maxBvhStack) {
          // push val3_bvh node index on to the stack
          bvhStackTopIndex += 1;
          g_bvhStack[bvhStackTopIndex] = val3_NodeIndex;
        }
      }
      else if (val3_NodeType == 2) {
        if (
          val3_NodeIndex >= 0 && // has shape
          val3_NodeIndex != toIgnoreShapeIndex // is not ignored
        ) {
          intersectSceneOneShape(val3_NodeIndex, ray, outBestResult, shadowCastingMode);
        }
      }
    }

    //
    //
    //

#endif

    //

  }

  return outBestResult.hasHit;
}

