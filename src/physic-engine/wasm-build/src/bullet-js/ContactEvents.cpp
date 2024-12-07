
#include "ContactEvents.hpp"

#include "DataPool.hpp"

#include "BulletHeaders.hpp"

#include <emscripten.h> // <= EMSCRIPTEN_KEEPALIVE

// #define D_THROW(msg) EM_ASM(throw new Error(msg));

namespace /*anonymous*/
{

//
//
// local variable(s)

btjsContactEvents::t_btjsContactCallback    _contactEventCallback = nullptr;

DataPool<btjsContactData>*              _contactDataPool = nullptr;

//
//
// local function(s)

bool _almostEqualRelativeAndAbs(
    float A, float B, float maxDiff,
    float maxRelDiff = FLT_EPSILON)
{
    // Check if the numbers are really close -- needed
    // when comparing numbers near zero.
    const float diff = fabs(A - B);
    if (diff <= maxDiff)
        return true;

    A = fabs(A);
    B = fabs(B);
    const float largest = (B > A ? B : A);

    if (diff <= largest * maxRelDiff)
        return true;
    return false;
}

bool onContactProcessed(btManifoldPoint& contactPoint, void* pBody0, void* pBody1)
{
    if (!_contactEventCallback) {
        return true;
    }

    btRigidBody* pRigidBody0 = reinterpret_cast<btRigidBody*>(pBody0);
    btRigidBody* pRigidBody1 = reinterpret_cast<btRigidBody*>(pBody1);

    // here the value of the "m_userPersistentData" pointer is used as a int
    int*	pContactId = reinterpret_cast<int*>(&contactPoint.m_userPersistentData);
    int     contactId = *pContactId;

    bool	isBeginContact = (contactId == 0); // pContactId == nullptr

    // if (!_contactEventCallback)
    //     return true;
    //     // D_THROW("no callback found");

    btjsContactData* pContactData;

    // Create (on begin) or Get (on update) the contact data
    if (isBeginContact)
    {
        pContactData = _contactDataPool->pop(); // <= auto-growing internal pool
        const int contactIndex = _contactDataPool->getIndex(pContactData); // <= FAST

        contactId = contactIndex + 1; // index => id
        *pContactId = contactId;

        pContactData->id = static_cast<unsigned short>(contactId);
        pContactData->pBodyA = pRigidBody0;
        pContactData->pBodyB = pRigidBody1;
    }
    else
    {
        const int	contactIndex = contactId - 1; // id => index
        pContactData = _contactDataPool->get(contactIndex);
    }

    auto currPos = contactPoint.m_positionWorldOnB;
    auto currNormal = contactPoint.m_normalWorldOnB;

    auto&& prevPos = pContactData->posB;
    auto&& prevNormal = pContactData->normalB;

    /**
     * On a contact update:
     * => this callback is called even when nothing moved
     * => this block check if there is enough difference
     * => if not, the JS-side callback is not called
     */
    if (!isBeginContact)
    {
#define	D_FLOAT_EQUAL(valA, valB) \
        _almostEqualRelativeAndAbs(valA, valB, 0.001f, 0.01f)

        const bool needUpdate = (
            !D_FLOAT_EQUAL(currPos[0], prevPos[0]) ||
            !D_FLOAT_EQUAL(currPos[1], prevPos[1]) ||
            !D_FLOAT_EQUAL(currPos[2], prevPos[2]) ||
            !D_FLOAT_EQUAL(currNormal[0], prevNormal[0]) ||
            !D_FLOAT_EQUAL(currNormal[1], prevNormal[1]) ||
            !D_FLOAT_EQUAL(currNormal[2], prevNormal[2])
        );

#undef	D_FLOAT_EQUAL

        if (!needUpdate) {
            return true;
        }
    }

    pContactData->posB = currPos;
    pContactData->normalB = currNormal;

    _contactEventCallback(isBeginContact ? 0 : 1, pContactData);

    return true;
};

bool onContactDestroyed(void* userPersistentData)
{
    if (!_contactEventCallback) {
        return true;
        // D_THROW("no callback found");
    }

    const int* pContactId = reinterpret_cast<int*>(&userPersistentData);
    const int contactId = *pContactId;

    const int contactIndex = contactId - 1; // id => index

    btjsContactData* pContactData = _contactDataPool->get(contactIndex);
    _contactDataPool->release(contactIndex);

    _contactEventCallback(2, pContactData);

    return true;
}

} // namespace /*anonymous*/


btjsContactEvents::t_btjsContactCallback	btjsContactEvents::getContactCallback()
{
    return _contactEventCallback;
}


extern "C"
{
    EMSCRIPTEN_KEEPALIVE
    void setContactCallback(long callback)
    {
        _contactDataPool = new DataPool<btjsContactData>();

        _contactEventCallback = (btjsContactEvents::t_btjsContactCallback)callback;

        // set the bullet's globals
        gContactProcessedCallback = onContactProcessed;
        gContactDestroyedCallback = onContactDestroyed;
    }
};
