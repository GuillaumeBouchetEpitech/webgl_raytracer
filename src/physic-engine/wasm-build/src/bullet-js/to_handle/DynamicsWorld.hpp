
// #pragma once

// #include "BulletHeaders.hpp"

// /**
//  * ExperimentalDynamicsWorld
//  * 
//  * this class enable dynamic concave trimesh (GImpact) shape collision algorithm
//  */
// class ExperimentalDynamicsWorld
//     : public btDiscreteDynamicsWorld
// {
// public:
// 	ExperimentalDynamicsWorld(
//         btDispatcher* dispatcher,
//         btBroadphaseInterface* pairCache,
//         btConstraintSolver* constraintSolver,
//         btCollisionConfiguration* collisionConfiguration);

// 	virtual ~ExperimentalDynamicsWorld();

// public:
//     btCompoundShape* createCompoundFromGimpactShape(const btGImpactMeshShape* gimpactMesh, btScalar depth);

// };
