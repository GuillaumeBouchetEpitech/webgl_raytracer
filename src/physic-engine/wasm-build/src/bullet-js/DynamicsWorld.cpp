

#include "DynamicsWorld.hpp"

#include "CollisionAlgorithm.hpp"


btjsDynamicsWorld::btjsDynamicsWorld(
  btDispatcher* dispatcher,
  btBroadphaseInterface* pairCache,
  btConstraintSolver* constraintSolver,
  btCollisionConfiguration* collisionConfiguration)
: btDiscreteDynamicsWorld(
  dispatcher,
  pairCache,
  constraintSolver,
  collisionConfiguration)
{
	// initialise GImpact (dynamic concave mesh shape)
	auto* pDispatcher = static_cast<btCollisionDispatcher*>(getDispatcher());
	btjsCollisionAlgorithm::registerAlgorithm(pDispatcher);
}

btjsDynamicsWorld::~btjsDynamicsWorld()
{}
