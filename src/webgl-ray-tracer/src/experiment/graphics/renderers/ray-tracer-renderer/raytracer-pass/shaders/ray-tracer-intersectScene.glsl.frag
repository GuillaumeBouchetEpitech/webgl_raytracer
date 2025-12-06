

#include "./ray-tracer-intersectScene-quat-utils.glsl.frag"

#include "./ray-tracer-intersectScene-shapes.glsl.frag"


void intersectSceneOneShape(
  int shapeIndex,
  RayValues ray,
  inout RayResult outBestResult,
  bool shadowMode
) {
  RayValues tmpRay;
  vec3 normal;
  float currDistance = 0.0;

  vec4 shTexel0 = texelFetch(u_dataTexture, ivec2(shapeIndex + 0, SHAPES_ROW_INDEX), 0);

  int materialIndex = int(shTexel0.g);

  if (shadowMode == true)
  {
    vec4 matTexel0 = texelFetch(u_dataTexture, ivec2(materialIndex * 2 + 0, MATERIALS_ROW_INDEX), 0);

    bool castShadowEnabled = (int(matTexel0.g) == 1);
    if (castShadowEnabled == false) {
      return; // this shape does not cast a shadow -> skip
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
      tmpRay.origin = (inverseNormalMatrix * (ray.origin - center));
      tmpRay.direction = (inverseNormalMatrix * ray.direction);

      if (
        !intersectSphere(tmpRay, radius, currDistance, normal) ||
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

      // convert ray from world space to sphere space
      tmpRay.origin = (inverseNormalMatrix * (ray.origin - center));
      tmpRay.direction = (inverseNormalMatrix * ray.direction);

      if (
        !intersectBox(tmpRay, boxSize, currDistance, normal) ||
        (outBestResult.distance > 0.0 && currDistance > outBestResult.distance)
      ) {
        return;
      }

      // convert normal from box space to world space
      normal = normalMatrix * normal;

      outBestResult.position = ray.origin + currDistance * ray.direction;

      // the multiplication by 0.999 will remove graphic artifact
      vec3 txPos = (inverseNormalMatrix * 0.999) * (center - outBestResult.position);
      outBestResult.txPos = txPos;

      break;
    }
    case 3: {

      //
      // Triangle shape
      //

      tmpRay.origin = ray.origin;
      tmpRay.direction = ray.direction;

      vec3 v0 = vec3(shTexel0.b, shTexel0.a, shTexel1.r);
      vec3 v1 = shTexel1.gba;
      vec3 v2 = shTexel2.rgb;

      if (
        !intersectTriangle(tmpRay, v0, v1, v2, currDistance, normal) ||
        (outBestResult.distance > 0.0 && currDistance > outBestResult.distance)
      ) {
        return;
      }

      outBestResult.position = ray.origin + currDistance * ray.direction;

      outBestResult.txPos = vec3(0.0); // TODO?
      // outBestResult.txPos = vec3(1.0); // TODO?
      // outBestResult.txPos = normal;

      break;
    }
  }

  outBestResult.hasHit = true;
  outBestResult.distance = currDistance;
  outBestResult.normal = normal;
  outBestResult.shapeIndex = shapeIndex;
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

bool intersectScene(
  RayValues ray,
  out RayResult outBestResult,
  bool shadowMode,
  int toIgnoreShapeIndex
) {
  outBestResult.hasHit = false;
  outBestResult.distance = -1.0;

  if (u_sceneTextureSize == 0)
  {
    return false;
  }

  if (u_useBvh == 0)
  {

    // no BVH optimization -> brute force all the shapes
    // -> no BVH makes it ~15-20% slower on the tested small-ish scenes
    for (int shapeIndex = 0; shapeIndex < u_sceneTextureSize; shapeIndex += 3) {
      if (shapeIndex != toIgnoreShapeIndex) {
        intersectSceneOneShape(shapeIndex, ray, outBestResult, shadowMode);
      }
    }

  }
  else
  {

    // use BVH optimization -> traverse the nodes and their associated AABB
    // -> this should reduce the total number intersections execute

    const int maxBvhStack = 16;
    int bvhStack[maxBvhStack];

    bvhStack[0] = 0; // BVH root node index
    int top = 0;

    while (top >= 0)
    {

      // pop stack
      int bv_idx = bvhStack[top];
      top -= 1;

      vec4 rootNodeTexel0 = texelFetch(u_dataTexture, ivec2(bv_idx * 3 + 0, BVH_ROW_INDEX), 0);
      vec4 rootNodeTexel1 = texelFetch(u_dataTexture, ivec2(bv_idx * 3 + 1, BVH_ROW_INDEX), 0);

      vec3 aabbMin = rootNodeTexel0.rgb;
      vec3 aabbMax = vec3(rootNodeTexel0.a, rootNodeTexel1.r, rootNodeTexel1.g);

      if (!rayIntersectBvhAABB(ray, aabbMin, aabbMax)) {
        continue;
      }

      //

      int leftNodeIndex = int(rootNodeTexel1.b);
      if (leftNodeIndex >= 0) {
        // push left bvh node index on to the stack
        top += 1;
        bvhStack[top] = leftNodeIndex;
      }

      int rightNodeIndex = int(rootNodeTexel1.a);
      if (rightNodeIndex >= 0) {
        // push right bvh node index on to the stack
        top += 1;
        bvhStack[top] = rightNodeIndex;
      }

      //

      vec4 rootNodeTexel2 = texelFetch(u_dataTexture, ivec2(bv_idx * 3 + 2, BVH_ROW_INDEX), 0);

      int leftLEafShapeIndex = int(rootNodeTexel2.r);
      if (
        leftLEafShapeIndex >= 0 &&
        leftLEafShapeIndex != toIgnoreShapeIndex
      ) {
        intersectSceneOneShape(leftLEafShapeIndex * 3, ray, outBestResult, shadowMode);
      }

      int rightLeafShapeIndex = int(rootNodeTexel2.g);
      if (
        rightLeafShapeIndex >= 0 &&
        rightLeafShapeIndex != toIgnoreShapeIndex
      ) {
        intersectSceneOneShape(rightLeafShapeIndex * 3, ray, outBestResult, shadowMode);
      }

      //

    }

  }

  return outBestResult.hasHit;
}

