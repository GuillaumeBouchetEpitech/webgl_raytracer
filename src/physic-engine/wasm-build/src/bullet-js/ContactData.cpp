
#include "ContactData.hpp"

unsigned short      btjsContactData::getId() const
{
    return id;
}

btRigidBody*        btjsContactData::getBodyA() const
{
    return pBodyA;
}
btRigidBody*        btjsContactData::getBodyB() const
{
    return pBodyB;
}

const btVector3&	btjsContactData::getPosition() const
{
    return posB;
}
const btVector3&	btjsContactData::getNormalB() const
{
    return normalB;
}
