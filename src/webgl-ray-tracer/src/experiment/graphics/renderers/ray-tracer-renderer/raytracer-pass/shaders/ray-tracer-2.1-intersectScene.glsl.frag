

#include "./ray-tracer-2.1.1-quat-utils.glsl.frag"

#include "./ray-tracer-2.1.2-intersect-shapes.glsl.frag"


void intersectSceneOneShape(
  int shapeIndex,
  RayValues ray,
  inout RayResult outBestResult,
  bool shadowCastingMode
) {
  vec3 normal;
  float currDistance = 0.0;

  // shape texel 0:
  // R: shape type
  // G: material index
  // B: ??? (per shape type)
  // A: ??? (per shape type)
  vec4 shTexel0 = texelFetch(u_dataTexture, ivec2(shapeIndex + 0, SHAPES_ROW_INDEX), 0);

  int materialIndex = int(shTexel0.g);

  if (shadowCastingMode == true)
  {
    // material texel 0:
    // R: material type (0=basic or 1=chessboard)
    // G: can cast shadows (0 or 1)
    // B: ??? (per material type)
    // A: ??? (per material type)
    vec4 matTexel0 = texelFetch(u_dataTexture, ivec2(materialIndex * 2 + 0, MATERIALS_ROW_INDEX), 0);

    bool canCastShadows = (int(matTexel0.g) == 1);
    if (canCastShadows == false) {
      return; // not casting shadow while in shadow casting mode? -> skip the shape
    }
  }

  vec4 shTexel1 = texelFetch(u_dataTexture, ivec2(shapeIndex + 1, SHAPES_ROW_INDEX), 0);
  vec4 shTexel2 = texelFetch(u_dataTexture, ivec2(shapeIndex + 2, SHAPES_ROW_INDEX), 0);

  int shapeType = int(shTexel0.r);

  switch (shapeType) {
    case 1: {

      //
      // Sphere shape
      //

      // sphere-shape-texel[0]:R: shape type
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

      break;
    }

    case 2: {

      //
      // Box shape
      //

      // box-shape-texel[0]:R: shape type
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

      // the multiplication by 0.999 will remove unwanted graphic artifact
      vec3 txPos = (inverseNormalMatrix * 0.999) * (center - outBestResult.position);
      outBestResult.txPos = txPos;

      break;
    }
    case 3: {

      //
      // Triangle shape
      //

      // triangle-shape-texel[0]:R: shape type
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

      vec3 v0 = vec3(shTexel0.b, shTexel0.a, shTexel1.r);
      vec3 v1 = shTexel1.gba;
      vec3 v2 = shTexel2.rgb;

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

      break;
    }
  }

  outBestResult.hasHit = true;

  // used here to tell if the intersected shape is any closer than any previous one
  // -> also used to tell if a shadow ray from a light is "too far" behind the spot light
  outBestResult.distance = currDistance;

  outBestResult.normal = normal;

  // this is used by the spot lights to handle the transparency/refraction
  outBestResult.shapeIndex = shapeIndex;

  // this is used by the spot lights to handle the transparency/refraction
  outBestResult.materialIndex = materialIndex;
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

bool rayIntersectBvhAABB(RayValues ray, vec3 bvhMin, vec3 bvhMax)
{
  vec3 valA = (bvhMin - ray.origin) / ray.direction;
  vec3 valB = (bvhMax - ray.origin) / ray.direction;
  vec3 minVal = min(valA, valB);
  vec3 maxVal = max(valA, valB);

  float max_minVal = max(minVal.x, max(minVal.y, minVal.z));
  float min_maxVal = min(maxVal.x, min(maxVal.y, maxVal.z));

  return max_minVal < min_maxVal;
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

bool intersectScene(
  RayValues ray,
  out RayResult outBestResult,
  bool shadowCastingMode,
  int toIgnoreShapeIndex
) {

#ifndef false

  // no BVH optimization -> brute force all the shapes
  // -> no BVH makes it ~15-20% slower on the tested small-ish scenes
  for (int shapeIndex = 0; shapeIndex < u_sceneTextureSize; shapeIndex += 3) {
    if (shapeIndex != toIgnoreShapeIndex) {
      intersectSceneOneShape(shapeIndex, ray, outBestResult, shadowCastingMode);
    }
  }

#else

  // use BVH optimization -> traverse the nodes and their associated AABB
  // -> this should reduce the total number intersections executed

  g_bvhStack[0] = 0; // start with the root BVH node index
  int bvhStackTopIndex = 0;

  while (bvhStackTopIndex >= 0)
  {

    // pop bvh stack
    int nodeIndex = g_bvhStack[bvhStackTopIndex];
    bvhStackTopIndex -= 1;

    // BVH-node-texel[0]:R: min.x
    // BVH-node-texel[0]:G: min.y
    // BVH-node-texel[0]:B: min.z
    // BVH-node-texel[0]:A: max.x
    // BVH-node-texel[1]:R: max.y
    // BVH-node-texel[1]:G: max.z
    // BVH-node-texel[1]:B: left bvh node index
    // BVH-node-texel[1]:A: right bvh node index
    // BVH-node-texel[2]:R: left leaf shape index
    // BVH-node-texel[2]:G: right leaf shape index
    // BVH-node-texel[2]:B: <unused>
    // BVH-node-texel[2]:A: <unused>

    vec4 rootNodeTexel0 = texelFetch(u_dataTexture, ivec2(nodeIndex * 3 + 0, BVH_ROW_INDEX), 0);
    vec4 rootNodeTexel1 = texelFetch(u_dataTexture, ivec2(nodeIndex * 3 + 1, BVH_ROW_INDEX), 0);

    vec3 aabbMin = rootNodeTexel0.rgb;
    vec3 aabbMax = vec3(rootNodeTexel0.a, rootNodeTexel1.r, rootNodeTexel1.g);

    if (!rayIntersectBvhAABB(ray, aabbMin, aabbMax)) {
      continue;
    }

    //

    int leftNodeIndex = int(rootNodeTexel1.b);
    if (leftNodeIndex >= 0 && bvhStackTopIndex + 1 < g_maxBvhStack) {
      // push left bvh node index on to the stack
      bvhStackTopIndex += 1;
      g_bvhStack[bvhStackTopIndex] = leftNodeIndex;
    }

    int rightNodeIndex = int(rootNodeTexel1.a);
    if (rightNodeIndex >= 0 && bvhStackTopIndex + 1 < g_maxBvhStack) {
      // push right bvh node index on to the stack
      bvhStackTopIndex += 1;
      g_bvhStack[bvhStackTopIndex] = rightNodeIndex;
    }

    //

    vec4 rootNodeTexel2 = texelFetch(u_dataTexture, ivec2(nodeIndex * 3 + 2, BVH_ROW_INDEX), 0);

    int leftLeafShapeIndex = int(rootNodeTexel2.r);
    if (
      // has shape
      leftLeafShapeIndex >= 0 &&
      leftLeafShapeIndex != toIgnoreShapeIndex
    ) {
      intersectSceneOneShape(leftLeafShapeIndex * 3, ray, outBestResult, shadowCastingMode);
    }

    int rightLeafShapeIndex = int(rootNodeTexel2.g);
    if (
      // has shape
      rightLeafShapeIndex >= 0 &&
      rightLeafShapeIndex != toIgnoreShapeIndex
    ) {
      intersectSceneOneShape(rightLeafShapeIndex * 3, ray, outBestResult, shadowCastingMode);
    }

    //

  }

#endif

  return outBestResult.hasHit;
}

