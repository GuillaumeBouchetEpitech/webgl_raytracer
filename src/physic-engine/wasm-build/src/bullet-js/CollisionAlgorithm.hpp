
#pragma once

#include "BulletHeaders.hpp"

#include <BulletCollision/Gimpact/btGImpactCollisionAlgorithm.h>

/**
 * btjsCollisionAlgorithm
 * 
 * this class enable the btGImpactMeshShape to use those callbacks:
 * => gContactProcessedCallback
 * => gContactDestroyedCallback
 * => gContactBreakingThreshold
 * => gContactStartedCallback
 * => gContactEndedCallback
 */
class btjsCollisionAlgorithm
	: public btGImpactCollisionAlgorithm
{
public:
	struct CreateFunc
		: public btCollisionAlgorithmCreateFunc
	{
		virtual	btCollisionAlgorithm* CreateCollisionAlgorithm(btCollisionAlgorithmConstructionInfo& ci, const btCollisionObjectWrapper* body0Wrap, const btCollisionObjectWrapper* body1Wrap) override;
	};

public:
	static void registerAlgorithm(btCollisionDispatcher* pDispatcher);

public:
	btjsCollisionAlgorithm(const btCollisionAlgorithmConstructionInfo& ci, const btCollisionObjectWrapper* body0Wrap, const btCollisionObjectWrapper* body1Wrap);
	virtual void processCollision(const btCollisionObjectWrapper* body0Wrap, const btCollisionObjectWrapper* body1Wrap, const btDispatcherInfo& dispatchInfo, btManifoldResult* resultOut) override;
};
