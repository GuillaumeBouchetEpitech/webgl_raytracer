
#include "CollisionAlgorithm.hpp"


btCollisionAlgorithm* btjsCollisionAlgorithm::CreateFunc::CreateCollisionAlgorithm(btCollisionAlgorithmConstructionInfo& ci, const btCollisionObjectWrapper* body0Wrap, const btCollisionObjectWrapper* body1Wrap)
{
    void* mem = ci.m_dispatcher1->allocateCollisionAlgorithm(sizeof(btjsCollisionAlgorithm));
    return new(mem) btjsCollisionAlgorithm(ci, body0Wrap, body1Wrap);
}

void btjsCollisionAlgorithm::registerAlgorithm(btCollisionDispatcher* pDispatcher)
{
    static btjsCollisionAlgorithm::CreateFunc s_experimental_cf;

    for (int ii = 0; ii < MAX_BROADPHASE_COLLISION_TYPES; ++ii)
        pDispatcher->registerCollisionCreateFunc(GIMPACT_SHAPE_PROXYTYPE, ii, &s_experimental_cf);

    for (int ii = 0; ii < MAX_BROADPHASE_COLLISION_TYPES; ++ii)
        pDispatcher->registerCollisionCreateFunc(ii, GIMPACT_SHAPE_PROXYTYPE, &s_experimental_cf);
}

btjsCollisionAlgorithm::btjsCollisionAlgorithm(const btCollisionAlgorithmConstructionInfo& ci, const btCollisionObjectWrapper* pBody0Wrap, const btCollisionObjectWrapper* pBody1Wrap)
    : btGImpactCollisionAlgorithm(ci, pBody0Wrap, pBody1Wrap)
{}

void btjsCollisionAlgorithm::processCollision(
    const btCollisionObjectWrapper* pBody0Wrap,
    const btCollisionObjectWrapper* pBody1Wrap,
    const btDispatcherInfo& dispatchInfo,
    btManifoldResult* resultOut)
{
    clearCache();

    m_resultOut = resultOut;
    m_dispatchInfo = &dispatchInfo;
    const btGImpactShapeInterface* pGimpactshape0;
    const btGImpactShapeInterface* pGimpactshape1;

    //
    // MODIFIED
    bool ownManifold = false;
    if (!m_manifoldPtr)
    {
        // swapped?
        m_manifoldPtr = m_dispatcher->getNewManifold(pBody0Wrap->getCollisionObject(), pBody1Wrap->getCollisionObject());
        ownManifold = true;
    }
    m_resultOut->setPersistentManifold(m_manifoldPtr);
    // MODIFIED
    //

    if (pBody0Wrap->getCollisionShape()->getShapeType() == GIMPACT_SHAPE_PROXYTYPE)
    {
        pGimpactshape0 = static_cast<const btGImpactShapeInterface*>(pBody0Wrap->getCollisionShape());

        if (pBody1Wrap->getCollisionShape()->getShapeType() == GIMPACT_SHAPE_PROXYTYPE)
        {
            pGimpactshape1 = static_cast<const btGImpactShapeInterface*>(pBody1Wrap->getCollisionShape());

            gimpact_vs_gimpact(pBody0Wrap, pBody1Wrap, pGimpactshape0, pGimpactshape1);
        }
        else
        {
            gimpact_vs_shape(pBody0Wrap, pBody1Wrap, pGimpactshape0, pBody1Wrap->getCollisionShape(), false);
        }
    }
    else if (pBody1Wrap->getCollisionShape()->getShapeType() == GIMPACT_SHAPE_PROXYTYPE)
    {
        pGimpactshape1 = static_cast<const btGImpactShapeInterface*>(pBody1Wrap->getCollisionShape());

        gimpact_vs_shape(pBody1Wrap, pBody0Wrap, pGimpactshape1, pBody0Wrap->getCollisionShape(), true);
    }

    //
    // MODIFIED
    if (ownManifold && m_manifoldPtr->getNumContacts()) {
        m_resultOut->refreshContactPoints();
    }
    // MODIFIED
    //
}
