
#pragma once

#include <BulletCollision/CollisionDispatch/btConvex2dConvex2dAlgorithm.h>
#include <BulletCollision/CollisionDispatch/btSphereTriangleCollisionAlgorithm.h>
#include <BulletCollision/CollisionDispatch/btConvexConvexAlgorithm.h>
#include <BulletCollision/CollisionDispatch/btSimulationIslandManager.h>
#include <BulletCollision/CollisionDispatch/btBoxBoxCollisionAlgorithm.h>
#include <BulletCollision/CollisionDispatch/btBox2dBox2dCollisionAlgorithm.h>
#include <BulletCollision/CollisionDispatch/btCollisionCreateFunc.h>
#include <BulletCollision/CollisionDispatch/btCollisionWorld.h>
#include <BulletCollision/CollisionDispatch/btManifoldResult.h>
#include <BulletCollision/CollisionDispatch/btCompoundCompoundCollisionAlgorithm.h>
#include <BulletCollision/CollisionDispatch/btCollisionObject.h>
#include <BulletCollision/CollisionDispatch/btSphereSphereCollisionAlgorithm.h>
#include <BulletCollision/CollisionDispatch/btSphereBoxCollisionAlgorithm.h>
#include <BulletCollision/CollisionDispatch/btCollisionWorldImporter.h>
#include <BulletCollision/CollisionDispatch/btCollisionDispatcherMt.h>
#include <BulletCollision/CollisionDispatch/btDefaultCollisionConfiguration.h>
#include <BulletCollision/CollisionDispatch/btInternalEdgeUtility.h>
#include <BulletCollision/CollisionDispatch/btActivatingCollisionAlgorithm.h>
#include <BulletCollision/CollisionDispatch/btCollisionConfiguration.h>
#include <BulletCollision/CollisionDispatch/SphereTriangleDetector.h>
#include <BulletCollision/CollisionDispatch/btConvexPlaneCollisionAlgorithm.h>
#include <BulletCollision/CollisionDispatch/btHashedSimplePairCache.h>
#include <BulletCollision/CollisionDispatch/btUnionFind.h>
#include <BulletCollision/CollisionDispatch/btGhostObject.h>
#include <BulletCollision/CollisionDispatch/btConvexConcaveCollisionAlgorithm.h>
#include <BulletCollision/CollisionDispatch/btCollisionDispatcher.h>
#include <BulletCollision/CollisionDispatch/btEmptyCollisionAlgorithm.h>
#include <BulletCollision/CollisionDispatch/btBoxBoxDetector.h>
#include <BulletCollision/CollisionDispatch/btCollisionObjectWrapper.h>
#include <BulletCollision/CollisionDispatch/btCompoundCollisionAlgorithm.h>

#include <BulletCollision/CollisionShapes/btMaterial.h>
#include <BulletCollision/CollisionShapes/btTriangleCallback.h>
#include <BulletCollision/CollisionShapes/btConvexHullShape.h>
#include <BulletCollision/CollisionShapes/btConcaveShape.h>
#include <BulletCollision/CollisionShapes/btOptimizedBvh.h>
#include <BulletCollision/CollisionShapes/btStridingMeshInterface.h>
#include <BulletCollision/CollisionShapes/btUniformScalingShape.h>
#include <BulletCollision/CollisionShapes/btConvexPointCloudShape.h>
#include <BulletCollision/CollisionShapes/btCompoundShape.h>
#include <BulletCollision/CollisionShapes/btTriangleIndexVertexMaterialArray.h>
#include <BulletCollision/CollisionShapes/btBox2dShape.h>
#include <BulletCollision/CollisionShapes/btTriangleInfoMap.h>
#include <BulletCollision/CollisionShapes/btTetrahedronShape.h>
#include <BulletCollision/CollisionShapes/btTriangleIndexVertexArray.h>
#include <BulletCollision/CollisionShapes/btCapsuleShape.h>
#include <BulletCollision/CollisionShapes/btStaticPlaneShape.h>
#include <BulletCollision/CollisionShapes/btHeightfieldTerrainShape.h>
#include <BulletCollision/CollisionShapes/btCollisionShape.h>
#include <BulletCollision/CollisionShapes/btConvexShape.h>
#include <BulletCollision/CollisionShapes/btConeShape.h>
#include <BulletCollision/CollisionShapes/btTriangleShape.h>
#include <BulletCollision/CollisionShapes/btScaledBvhTriangleMeshShape.h>
#include <BulletCollision/CollisionShapes/btBvhTriangleMeshShape.h>
#include <BulletCollision/CollisionShapes/btBoxShape.h>
#include <BulletCollision/CollisionShapes/btCollisionMargin.h>
#include <BulletCollision/CollisionShapes/btMultimaterialTriangleMeshShape.h>
#include <BulletCollision/CollisionShapes/btConvexInternalShape.h>
#include <BulletCollision/CollisionShapes/btTriangleBuffer.h>
#include <BulletCollision/CollisionShapes/btConvex2dShape.h>
#include <BulletCollision/CollisionShapes/btConvexPolyhedron.h>
#include <BulletCollision/CollisionShapes/btCylinderShape.h>
#include <BulletCollision/CollisionShapes/btShapeHull.h>
#include <BulletCollision/CollisionShapes/btSphereShape.h>
#include <BulletCollision/CollisionShapes/btPolyhedralConvexShape.h>
#include <BulletCollision/CollisionShapes/btMultiSphereShape.h>
#include <BulletCollision/CollisionShapes/btMinkowskiSumShape.h>
#include <BulletCollision/CollisionShapes/btTriangleMesh.h>
#include <BulletCollision/CollisionShapes/btConvexTriangleMeshShape.h>
#include <BulletCollision/CollisionShapes/btEmptyShape.h>
#include <BulletCollision/CollisionShapes/btTriangleMeshShape.h>

#include <BulletCollision/BroadphaseCollision/btDbvt.h>
#include <BulletCollision/BroadphaseCollision/btDbvtBroadphase.h>
#include <BulletCollision/BroadphaseCollision/btQuantizedBvh.h>
#include <BulletCollision/BroadphaseCollision/btAxisSweep3Internal.h>
#include <BulletCollision/BroadphaseCollision/btOverlappingPairCache.h>
#include <BulletCollision/BroadphaseCollision/btAxisSweep3.h>
#include <BulletCollision/BroadphaseCollision/btBroadphaseProxy.h>
#include <BulletCollision/BroadphaseCollision/btOverlappingPairCallback.h>
#include <BulletCollision/BroadphaseCollision/btCollisionAlgorithm.h>
#include <BulletCollision/BroadphaseCollision/btSimpleBroadphase.h>
#include <BulletCollision/BroadphaseCollision/btDispatcher.h>
#include <BulletCollision/BroadphaseCollision/btBroadphaseInterface.h>

#include <BulletCollision/NarrowPhaseCollision/btMprPenetration.h>
#include <BulletCollision/NarrowPhaseCollision/btPointCollector.h>
#include <BulletCollision/NarrowPhaseCollision/btConvexCast.h>
#include <BulletCollision/NarrowPhaseCollision/btGjkEpa3.h>
#include <BulletCollision/NarrowPhaseCollision/btVoronoiSimplexSolver.h>
#include <BulletCollision/NarrowPhaseCollision/btConvexPenetrationDepthSolver.h>
#include <BulletCollision/NarrowPhaseCollision/btGjkPairDetector.h>
#include <BulletCollision/NarrowPhaseCollision/btPersistentManifold.h>
#include <BulletCollision/NarrowPhaseCollision/btComputeGjkEpaPenetration.h>
#include <BulletCollision/NarrowPhaseCollision/btRaycastCallback.h>
#include <BulletCollision/NarrowPhaseCollision/btSubSimplexConvexCast.h>
#include <BulletCollision/NarrowPhaseCollision/btGjkCollisionDescription.h>
#include <BulletCollision/NarrowPhaseCollision/btSimplexSolverInterface.h>
#include <BulletCollision/NarrowPhaseCollision/btMinkowskiPenetrationDepthSolver.h>
#include <BulletCollision/NarrowPhaseCollision/btDiscreteCollisionDetectorInterface.h>
#include <BulletCollision/NarrowPhaseCollision/btPolyhedralContactClipping.h>
#include <BulletCollision/NarrowPhaseCollision/btGjkEpa2.h>
#include <BulletCollision/NarrowPhaseCollision/btGjkConvexCast.h>
#include <BulletCollision/NarrowPhaseCollision/btManifoldPoint.h>
#include <BulletCollision/NarrowPhaseCollision/btGjkEpaPenetrationDepthSolver.h>
#include <BulletCollision/NarrowPhaseCollision/btContinuousConvexCollision.h>

#include <BulletCollision/Gimpact/btGImpactShape.h>

// #include <BulletCollision/Gimpact/btGeometryOperations.h>
// #include <BulletCollision/Gimpact/gim_clip_polygon.h>
// #include <BulletCollision/Gimpact/btGImpactCollisionAlgorithm.h>
// #include <BulletCollision/Gimpact/btContactProcessing.h>
// #include <BulletCollision/Gimpact/gim_tri_collision.h>
// #include <BulletCollision/Gimpact/gim_hash_table.h>
// #include <BulletCollision/Gimpact/gim_bitset.h>
// #include <BulletCollision/Gimpact/gim_basic_geometry_operations.h>
// #include <BulletCollision/Gimpact/btGImpactBvhStructs.h>
// #include <BulletCollision/Gimpact/gim_radixsort.h>
// #include <BulletCollision/Gimpact/gim_geometry.h>
// #include <BulletCollision/Gimpact/gim_memory.h>
// #include <BulletCollision/Gimpact/gim_array.h>
// #include <BulletCollision/Gimpact/btGImpactQuantizedBvh.h>
// #include <BulletCollision/Gimpact/gim_math.h>
// #include <BulletCollision/Gimpact/btTriangleShapeEx.h>
// #include <BulletCollision/Gimpact/gim_box_set.h>
// #include <BulletCollision/Gimpact/gim_box_collision.h>
// #include <BulletCollision/Gimpact/btCompoundFromGimpact.h>
// #include <BulletCollision/Gimpact/btClipPolygon.h>
// #include <BulletCollision/Gimpact/btBoxCollision.h>
// #include <BulletCollision/Gimpact/btContactProcessingStructs.h>
// #include <BulletCollision/Gimpact/gim_geom_types.h>
// #include <BulletCollision/Gimpact/btGenericPoolAllocator.h>
// #include <BulletCollision/Gimpact/gim_linear_math.h>
// #include <BulletCollision/Gimpact/btGImpactMassUtil.h>
// #include <BulletCollision/Gimpact/btGImpactShape.h>
// #include <BulletCollision/Gimpact/btGImpactBvh.h>
// #include <BulletCollision/Gimpact/gim_contact.h>
// #include <BulletCollision/Gimpact/btQuantization.h>
// #include <BulletCollision/Gimpact/btGImpactQuantizedBvhStructs.h>
