
#pragma once

#include "BulletHeaders.hpp"

class btjsContactData
{
public:
    unsigned short  id = 0;

    btRigidBody*	pBodyA = nullptr;
    btRigidBody*	pBodyB = nullptr;

    btVector3	posB;
    btVector3	normalB;

public:
    btjsContactData() = default;

public:
    unsigned short  getId() const;

    btRigidBody*	getBodyA() const;
    btRigidBody*	getBodyB() const;

    const btVector3&	getPosition() const;
    const btVector3&	getNormalB() const;
};
