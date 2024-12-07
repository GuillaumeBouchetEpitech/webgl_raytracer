
// #include "DynamicsWorld.hpp"

// #include "CollisionAlgorithm.hpp"

// ExperimentalDynamicsWorld::ExperimentalDynamicsWorld(
//         btDispatcher* dispatcher,
//         btBroadphaseInterface* pairCache,
//         btConstraintSolver* constraintSolver,
//         btCollisionConfiguration* collisionConfiguration)
//     : btDiscreteDynamicsWorld(
//         dispatcher,
//         pairCache,
//         constraintSolver,
//         collisionConfiguration)
// {
// 	// initialise GImpact (dynamic concave mesh shape)
// 	auto* pDispatcher = static_cast<btCollisionDispatcher*>(getDispatcher());
// 	ExperimentalCollisionAlgorithm::registerAlgorithm(pDispatcher);
// }

// ExperimentalDynamicsWorld::~ExperimentalDynamicsWorld()
// {
// }

// // it compile when included here
// #include <BulletCollision/Gimpact/btCompoundFromGimpact.h>
// // /it compile when included here

// btCompoundShape* ExperimentalDynamicsWorld::createCompoundFromGimpactShape(const btGImpactMeshShape* gimpactMesh, btScalar depth)
// {
// 	// solve a known issue making a btGImpactMeshShape shake when colliding
// 	return btCreateCompoundFromGimpactShape(gimpactMesh, depth);
// }
