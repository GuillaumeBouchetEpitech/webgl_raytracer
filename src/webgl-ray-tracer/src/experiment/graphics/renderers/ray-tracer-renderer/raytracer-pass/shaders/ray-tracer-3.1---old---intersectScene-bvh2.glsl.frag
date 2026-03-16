

// #include "./ray-tracer-3.1.1-quat-utils.glsl.frag"

// #include "./ray-tracer-3.1.2-intersect-shapes.glsl.frag"

// //
// //
// //
// //
// //

// //
// //
// //
// //
// //

// //
// //
// //
// //
// //

// // MARK: _intersectSphereShape
// void _intersectSphereShape(
//   int rawShapeIndex,
//   RayValues ray,
//   inout RayResult outBestResult,
//   bool shadowCastingMode
// ) {

//   //
//   // Sphere shape
//   //

//   // start at index 0
//   int shapeIndex = rawShapeIndex;

//   // sphere-shape-texel[0]:R: can cast shadow
//   // sphere-shape-texel[0]:G: material index
//   // sphere-shape-texel[0]:B: center.x
//   // sphere-shape-texel[0]:A: center.y
//   // sphere-shape-texel[1]:R: center.z
//   // sphere-shape-texel[1]:G: quat.x
//   // sphere-shape-texel[1]:B: quat.y
//   // sphere-shape-texel[1]:A: quat.z
//   // sphere-shape-texel[2]:R: quat.w
//   // sphere-shape-texel[2]:G: radius
//   // sphere-shape-texel[2]:B: <unused>
//   // sphere-shape-texel[2]:A: <unused>

//   vec4 shTexel0 = texelFetch(u_dataTexture, ivec2(shapeIndex * 3 + 0, SHAPES_SPHERE_ROW_INDEX), 0);

//   if (
//     shadowCastingMode == true &&
//     (int(shTexel0.r) == 0) // canCastShadows is false
//   ) {
//     // not casting shadow while in shadow casting mode? -> skip the shape
//     return;
//   }

//   vec4 shTexel1 = texelFetch(u_dataTexture, ivec2(shapeIndex * 3 + 1, SHAPES_SPHERE_ROW_INDEX), 0);
//   vec4 shTexel2 = texelFetch(u_dataTexture, ivec2(shapeIndex * 3 + 2, SHAPES_SPHERE_ROW_INDEX), 0);

//   vec3 center = vec3(shTexel0.b, shTexel0.a, shTexel1.r);
//   float radius = shTexel2.g;

//   vec4 orientation = vec4(
//     shTexel1.g,
//     shTexel1.b,
//     shTexel1.a,
//     shTexel2.r
//   );
//   mat3 normalMatrix = quat_to_mat3(orientation);
//   mat3 inverseNormalMatrix = inverse(normalMatrix);

//   // convert ray from world space to sphere space
//   RayValues sphereSpaceRay;
//   sphereSpaceRay.origin = (inverseNormalMatrix * (ray.origin - center));
//   sphereSpaceRay.direction = (inverseNormalMatrix * ray.direction);

//   vec3 normal;
//   float currDistance = 0.0;

//   if (
//     // false if not hit
//     !intersectSphere(sphereSpaceRay, radius, currDistance, normal) ||
//     // false if hit but not the closest shape
//     (outBestResult.distance > 0.0 && currDistance > outBestResult.distance)
//   ) {
//     return;
//   }

//   // convert normal from box space to world space
//   normal = normalMatrix * normal;

//   outBestResult.position = ray.origin + currDistance * ray.direction;

//   // the multiplication by 0.999 will remove graphic artifact
//   // vec3 txPos = (inverseNormalMatrix * 0.999) * (center - outBestResult.position);
//   vec3 txPos = inverseNormalMatrix * (center - outBestResult.position);
//   outBestResult.txPos = txPos;

//   outBestResult.hasHit = true;

//   // used here to tell if the intersected shape is any closer than any previous one
//   // -> also used to tell if a shadow ray from a light is "too far" behind the point light
//   outBestResult.distance = currDistance;

//   outBestResult.normal = normal;

//   // this is used by the point lights to handle the transparency/refraction

//   // outBestResult.shapeIndex = shapeIndex;
//   outBestResult.shapeIndex = rawShapeIndex;

//   // this is used by the point lights to handle the transparency/refraction
//   outBestResult.materialIndex = int(shTexel0.g);
// }

// //
// //
// //
// //
// //

// //
// //
// //
// //
// //

// //
// //
// //
// //
// //

// // MARK: _intersectBoxShape
// void _intersectBoxShape(
//   int rawShapeIndex,
//   RayValues ray,
//   inout RayResult outBestResult,
//   bool shadowCastingMode
// ) {

//   //
//   // Box shape
//   //

//   // start at index 1000
//   int shapeIndex = rawShapeIndex - 1000;

//   // box-shape-texel[0]:R: can cast shadow
//   // box-shape-texel[0]:G: material index
//   // box-shape-texel[0]:B: center.x
//   // box-shape-texel[0]:A: center.y
//   // box-shape-texel[1]:R: center.z
//   // box-shape-texel[1]:G: quat.x
//   // box-shape-texel[1]:B: quat.y
//   // box-shape-texel[1]:A: quat.z
//   // box-shape-texel[2]:R: quat.w
//   // box-shape-texel[2]:G: boxSize.x
//   // box-shape-texel[2]:B: boxSize.y
//   // box-shape-texel[2]:A: boxSize.z
//   vec4 shTexel0 = texelFetch(u_dataTexture, ivec2(shapeIndex * 3 + 0, SHAPES_BOX_ROW_INDEX), 0);

//   if (
//     shadowCastingMode == true &&
//     (int(shTexel0.r) == 0) // canCastShadows is false
//   ) {
//     // not casting shadow while in shadow casting mode? -> skip the shape
//     return;
//   }

//   vec4 shTexel1 = texelFetch(u_dataTexture, ivec2(shapeIndex * 3 + 1, SHAPES_BOX_ROW_INDEX), 0);
//   vec4 shTexel2 = texelFetch(u_dataTexture, ivec2(shapeIndex * 3 + 2, SHAPES_BOX_ROW_INDEX), 0);


//   vec3 center = vec3(shTexel0.b, shTexel0.a, shTexel1.r);
//   vec3 boxSize = shTexel2.gba;

//   vec4 orientation = vec4(
//     shTexel1.g,
//     shTexel1.b,
//     shTexel1.a,
//     shTexel2.r
//   );
//   mat3 normalMatrix = quat_to_mat3(orientation);
//   mat3 inverseNormalMatrix = inverse(normalMatrix);

//   // convert ray from world space to box space
//   RayValues boxSpaceRay;
//   boxSpaceRay.origin = (inverseNormalMatrix * (ray.origin - center));
//   boxSpaceRay.direction = (inverseNormalMatrix * ray.direction);

//   vec3 normal;
//   float currDistance = 0.0;

//   if (
//     // false if not hit
//     !intersectBox(boxSpaceRay, boxSize, currDistance, normal) ||
//     // false if hit but not the closest shape
//     (outBestResult.distance > 0.0 && currDistance > outBestResult.distance)
//   ) {
//     return;
//   }

//   // convert normal from box space to world space
//   normal = normalMatrix * normal;

//   outBestResult.position = ray.origin + currDistance * ray.direction;

//   vec3 txPos = inverseNormalMatrix * (center - outBestResult.position);
//   // the multiplication by 0.999 will remove unwanted graphic artifact
//   outBestResult.txPos = txPos * 0.999;

//   outBestResult.hasHit = true;

//   // used here to tell if the intersected shape is any closer than any previous one
//   // -> also used to tell if a shadow ray from a light is "too far" behind the point light
//   outBestResult.distance = currDistance;

//   outBestResult.normal = normal;

//   // this is used by the point lights to handle the transparency/refraction

//   // outBestResult.shapeIndex = shapeIndex;
//   outBestResult.shapeIndex = rawShapeIndex;

//   // this is used by the point lights to handle the transparency/refraction
//   outBestResult.materialIndex = int(shTexel0.g);
// }

// //
// //
// //
// //
// //

// //
// //
// //
// //
// //

// //
// //
// //
// //
// //

// // MARK: _intersectTriangleShape
// void _intersectTriangleShape(
//   int rawShapeIndex,
//   RayValues ray,
//   inout RayResult outBestResult,
//   bool shadowCastingMode
// ) {
//   //
//   // Triangle shape
//   //

//   // start at index 2000
//   int shapeIndex = rawShapeIndex - 2000;

//   // triangle-shape-texel[0]:R: can cast shadow
//   // triangle-shape-texel[0]:G: material index
//   // triangle-shape-texel[0]:B: triangle0.x
//   // triangle-shape-texel[0]:A: triangle0.y
//   // triangle-shape-texel[1]:R: triangle0.z
//   // triangle-shape-texel[1]:G: triangle1.x
//   // triangle-shape-texel[1]:B: triangle1.y
//   // triangle-shape-texel[1]:A: triangle1.z
//   // triangle-shape-texel[2]:R: triangle2.x
//   // triangle-shape-texel[2]:G: triangle2.y
//   // triangle-shape-texel[2]:B: triangle2.z
//   // triangle-shape-texel[2]:A: <unused>
//   vec4 shTexel0 = texelFetch(u_dataTexture, ivec2(shapeIndex * 3 + 0, SHAPES_TRIANGLE_ROW_INDEX), 0);

//   if (
//     shadowCastingMode == true &&
//     (int(shTexel0.r) == 0) // canCastShadows is false
//   ) {
//     // not casting shadow while in shadow casting mode? -> skip the shape
//     return;
//   }

//   vec4 shTexel1 = texelFetch(u_dataTexture, ivec2(shapeIndex * 3 + 1, SHAPES_TRIANGLE_ROW_INDEX), 0);
//   vec4 shTexel2 = texelFetch(u_dataTexture, ivec2(shapeIndex * 3 + 2, SHAPES_TRIANGLE_ROW_INDEX), 0);

//   vec3 v0 = vec3(shTexel0.b, shTexel0.a, shTexel1.r);
//   vec3 v1 = shTexel1.gba;
//   vec3 v2 = shTexel2.rgb;

//   vec3 normal;
//   float currDistance = 0.0;

//   if (
//     // false if not hit
//     !intersectTriangle(ray, v0, v1, v2, currDistance, normal) ||
//     // false if hit but not the closest shape
//     (outBestResult.distance > 0.0 && currDistance > outBestResult.distance)
//   ) {
//     return;
//   }

//   outBestResult.position = ray.origin + currDistance * ray.direction;

//   // outBestResult.txPos = vec3(0.0); // TODO?

//   outBestResult.hasHit = true;

//   // used here to tell if the intersected shape is any closer than any previous one
//   // -> also used to tell if a shadow ray from a light is "too far" behind the point light
//   outBestResult.distance = currDistance;

//   outBestResult.normal = normal;

//   // this is used by the point lights to handle the transparency/refraction

//   // outBestResult.shapeIndex = shapeIndex;
//   outBestResult.shapeIndex = rawShapeIndex;

//   // this is used by the point lights to handle the transparency/refraction
//   outBestResult.materialIndex = int(shTexel0.g);
// }

// //
// //
// //
// //
// //

// //
// //
// //
// //
// //

// //
// //
// //
// //
// //

// // MARK: intersectSceneOneShape
// void intersectSceneOneShape(
//   int rawShapeIndex,
//   RayValues ray,
//   inout RayResult outBestResult,
//   bool shadowCastingMode
// ) {

//   if (rawShapeIndex < 1000)
//   {
//     _intersectSphereShape(
//       rawShapeIndex,
//       ray,
//       outBestResult,
//       shadowCastingMode
//     );
//   }
//   else if (rawShapeIndex < 2000)
//   {
//     _intersectBoxShape(
//       rawShapeIndex,
//       ray,
//       outBestResult,
//       shadowCastingMode
//     );
//   }
//   else if (rawShapeIndex < 3000)
//   {
//     _intersectTriangleShape(
//       rawShapeIndex,
//       ray,
//       outBestResult,
//       shadowCastingMode
//     );
//   }
// }

// //
// //
// //
// //
// //

// //
// //
// //
// //
// //

// //
// //
// //
// //
// //

// // MARK: rayIntersectBvhAABB
// bool rayIntersectBvhAABB(RayValues ray, vec3 bvhMin, vec3 bvhMax)
// {
//   // vec3 valA = (bvhMin - ray.origin) / ray.direction;
//   // vec3 valB = (bvhMax - ray.origin) / ray.direction;
//   vec3 valA = (bvhMin - ray.origin) * ray.invDirection;
//   vec3 valB = (bvhMax - ray.origin) * ray.invDirection;
//   vec3 minVal = min(valA, valB);
//   vec3 maxVal = max(valA, valB);

//   float max_minVal = max(minVal.x, max(minVal.y, minVal.z));
//   float min_maxVal = min(maxVal.x, min(maxVal.y, maxVal.z));

//   return max_minVal < min_maxVal;
// }

// //
// //
// //
// //
// //

// //
// //
// //
// //
// //

// //
// //
// //
// //
// //

// // MARK: intersectScene
// bool intersectScene(
//   RayValues ray,
//   out RayResult outBestResult,
//   bool shadowCastingMode,
//   int toIgnoreShapeIndex
// ) {

//   // use BVH optimization -> traverse the nodes and their associated AABB
//   // -> this should reduce the total number intersections executed

//   g_bvhStack[0] = 0; // start with the root BVH node index
//   int bvhStackTopIndex = 0;

//   while (bvhStackTopIndex >= 0)
//   {

//     // pop bvh stack
//     int nodeIndex = g_bvhStack[bvhStackTopIndex];
//     bvhStackTopIndex -= 1;

//     //

//     // BVH-node-texel[0]:R: left node type
//     // BVH-node-texel[0]:G: left node index
//     // BVH-node-texel[0]:B: left min.x
//     // BVH-node-texel[0]:A: left min.y
//     // BVH-node-texel[1]:R: left min.z
//     // BVH-node-texel[1]:G: left max.x
//     // BVH-node-texel[1]:B: left max.y
//     // BVH-node-texel[1]:A: left max.z
//     // BVH-node-texel[2]:R: right node type
//     // BVH-node-texel[2]:G: right node index
//     // BVH-node-texel[2]:B: right min.x
//     // BVH-node-texel[2]:A: right min.y
//     // BVH-node-texel[3]:R: right min.z
//     // BVH-node-texel[3]:G: right max.x
//     // BVH-node-texel[3]:B: right max.y
//     // BVH-node-texel[3]:A: right max.z

//     vec4 rootNodeTexel0 = texelFetch(u_dataTexture, ivec2(nodeIndex * 4 + 0, BVH_NODES_ROW_INDEX), 0);
//     vec4 rootNodeTexel1 = texelFetch(u_dataTexture, ivec2(nodeIndex * 4 + 1, BVH_NODES_ROW_INDEX), 0);
//     vec4 rootNodeTexel2 = texelFetch(u_dataTexture, ivec2(nodeIndex * 4 + 2, BVH_NODES_ROW_INDEX), 0);
//     vec4 rootNodeTexel3 = texelFetch(u_dataTexture, ivec2(nodeIndex * 4 + 3, BVH_NODES_ROW_INDEX), 0);

//     int leftNodeType = int(rootNodeTexel0.r);
//     int leftNodeIndex = int(rootNodeTexel0.g);
//     vec3 leftAabbMin = vec3(rootNodeTexel0.b, rootNodeTexel0.a, rootNodeTexel1.r);
//     vec3 leftAabbMax = vec3(rootNodeTexel1.g, rootNodeTexel1.b, rootNodeTexel1.a);

//     int rightNodeType = int(rootNodeTexel2.r);
//     int rightNodeIndex = int(rootNodeTexel2.g);
//     vec3 rightAabbMin = vec3(rootNodeTexel2.b, rootNodeTexel2.a, rootNodeTexel3.r);
//     vec3 rightAabbMax = vec3(rootNodeTexel3.g, rootNodeTexel3.b, rootNodeTexel3.a);

//     if (
//       leftNodeType > 0 &&
//       rayIntersectBvhAABB(ray, leftAabbMin, leftAabbMax)
//     ) {
//       if (leftNodeType == 1) {
//         if (leftNodeIndex >= 0 && bvhStackTopIndex + 1 < MAX_BVH_STACK) {
//           // push left bvh node index on to the stack
//           bvhStackTopIndex += 1;
//           g_bvhStack[bvhStackTopIndex] = leftNodeIndex;
//         }
//       }
//       else if (leftNodeType == 2) {
//         if (
//           leftNodeIndex >= 0 && // has shape
//           leftNodeIndex != toIgnoreShapeIndex // is not ignored
//         ) {
//           intersectSceneOneShape(leftNodeIndex, ray, outBestResult, shadowCastingMode);
//         }
//       }
//     }

//     if (
//       rightNodeType > 0 &&
//       rayIntersectBvhAABB(ray, rightAabbMin, rightAabbMax)
//     ) {
//       if (rightNodeType == 1) {
//         if (rightNodeIndex >= 0 && bvhStackTopIndex + 1 < MAX_BVH_STACK) {
//           // push right bvh node index on to the stack
//           bvhStackTopIndex += 1;
//           g_bvhStack[bvhStackTopIndex] = rightNodeIndex;
//         }
//       }
//       else if (rightNodeType == 2) {
//         if (
//           rightNodeIndex >= 0 && // has shape
//           rightNodeIndex != toIgnoreShapeIndex // is not ignored
//         ) {
//           intersectSceneOneShape(rightNodeIndex, ray, outBestResult, shadowCastingMode);
//         }
//       }
//     }

//     //

//   }

//   return outBestResult.hasHit;
// }

