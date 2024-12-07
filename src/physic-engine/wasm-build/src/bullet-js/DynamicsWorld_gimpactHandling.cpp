
#include "DynamicsWorld.hpp"

// it compile when included here
#include <BulletCollision/Gimpact/btCompoundFromGimpact.h>
// /it compile when included here

btCompoundShape* btjsDynamicsWorld::createCompoundFromGimpactShape(const btGImpactMeshShape* gimpactMesh, btScalar depth)
{
	// solve a known issue making a btGImpactMeshShape shake when colliding
	return btCreateCompoundFromGimpactShape(gimpactMesh, depth);
}
