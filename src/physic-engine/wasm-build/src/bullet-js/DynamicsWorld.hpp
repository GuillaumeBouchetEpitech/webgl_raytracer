
#pragma once

#include "BulletHeaders.hpp"

/**
 * btjsDynamicsWorld
 *
 * this class enable [...]
 */
class btjsDynamicsWorld
    : public btDiscreteDynamicsWorld
{
public:
	btjsDynamicsWorld(
        btDispatcher* dispatcher,
        btBroadphaseInterface* pairCache,
        btConstraintSolver* constraintSolver,
        btCollisionConfiguration* collisionConfiguration);

	virtual ~btjsDynamicsWorld();

protected:
    void createPredictiveContactsInternal_ex( btRigidBody** bodies, int numBodies, btScalar timeStep);
	virtual void createPredictiveContacts(btScalar timeStep) override;

public:
    btCompoundShape* createCompoundFromGimpactShape(const btGImpactMeshShape* gimpactMesh, btScalar depth);

};
