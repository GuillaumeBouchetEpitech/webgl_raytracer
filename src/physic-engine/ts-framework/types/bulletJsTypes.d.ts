export default bulletjs;
declare function bulletjs<T>(target?: T): Promise<T & typeof bulletjs>;
declare module bulletjs {
    function destroy(obj: any): void;
    function _malloc(size: number): number;
    function _free(ptr: number): void;
    function wrapPointer<C extends new (...args: any) => any>(ptr: number, Class: C): InstanceType<C>;
    function getPointer(obj: unknown): number;
    function castObject<C extends new (...args: any) => any>(object: unknown, Class: C): InstanceType<C>;
    function compare(object1: unknown, object2: unknown): boolean;
    const HEAP8: Int8Array;
    const HEAP16: Int16Array;
    const HEAP32: Int32Array;
    const HEAPU8: Uint8Array;
    const HEAPU16: Uint16Array;
    const HEAPU32: Uint32Array;
    const HEAPF32: Float32Array;
    const HEAPF64: Float64Array;
    class btVector3 {
        constructor();
        constructor(x: number, y: number, z: number);
        length(): number;
        x(): number;
        y(): number;
        z(): number;
        setX(x: number): void;
        setY(y: number): void;
        setZ(z: number): void;
        setValue(x: number, y: number, z: number): void;
        normalize(): void;
        rotate(wAxis: btVector3, angle: number): btVector3;
        dot(v: btVector3): number;
        op_mul(x: number): btVector3;
        op_add(v: btVector3): btVector3;
        op_sub(v: btVector3): btVector3;
    }
    class btVector4 extends btVector3 {
        constructor();
        constructor(x: number, y: number, z: number, w: number);
        w(): number;
        setValue(x: number, y: number, z: number, w: number): void;
    }
    class btQuadWord {
        x(): number;
        y(): number;
        z(): number;
        w(): number;
        setX(x: number): void;
        setY(y: number): void;
        setZ(z: number): void;
        setW(w: number): void;
    }
    class btQuaternion extends btQuadWord {
        constructor(x: number, y: number, z: number, w: number);
        setValue(x: number, y: number, z: number, w: number): void;
        setEulerZYX(z: number, y: number, x: number): void;
        setRotation(axis: btVector3, angle: number): void;
        normalize(): void;
        length2(): number;
        length(): number;
        dot(q: btQuaternion): number;
        normalized(): btQuaternion;
        getAxis(): btVector3;
        inverse(): btQuaternion;
        getAngle(): number;
        getAngleShortestPath(): number;
        angle(q: btQuaternion): number;
        angleShortestPath(q: btQuaternion): number;
        op_add(q: btQuaternion): btQuaternion;
        op_sub(q: btQuaternion): btQuaternion;
        op_mul(s: number): btQuaternion;
        op_mulq(q: btQuaternion): btQuaternion;
        op_div(s: number): btQuaternion;
    }
    class btMatrix3x3 {
        setEulerZYX(ex: number, ey: number, ez: number): void;
        getRotation(q: btQuaternion): void;
        getRow(y: number): btVector3;
    }
    class btTransform {
        constructor();
        constructor(q: btQuaternion, v: btVector3);
        setIdentity(): void;
        setOrigin(origin: btVector3): void;
        setRotation(rotation: btQuaternion): void;
        getOrigin(): btVector3;
        getRotation(): btQuaternion;
        getBasis(): btMatrix3x3;
        setFromOpenGLMatrix(m: ReadonlyArray<number>): void;
    }
    class btMotionState {
        getWorldTransform(worldTrans: btTransform): void;
        setWorldTransform(worldTrans: btTransform): void;
    }
    class btDefaultMotionState extends btMotionState {
        constructor(startTrans?: btTransform, centerOfMassOffset?: btTransform);
        get_m_graphicsWorldTrans(): btTransform;
        set_m_graphicsWorldTrans(m_graphicsWorldTrans: btTransform): void;
        m_graphicsWorldTrans: btTransform;
    }
    class btCollisionObject {
        setAnisotropicFriction(anisotropicFriction: btVector3, frictionMode: number): void;
        getCollisionShape(): btCollisionShape;
        setContactProcessingThreshold(contactProcessingThreshold: number): void;
        setActivationState(newState: number): void;
        forceActivationState(newState: number): void;
        activate(forceActivation?: boolean): void;
        isActive(): boolean;
        isKinematicObject(): boolean;
        isStaticObject(): boolean;
        isStaticOrKinematicObject(): boolean;
        setRestitution(rest: number): void;
        setFriction(frict: number): void;
        setRollingFriction(frict: number): void;
        getWorldTransform(): btTransform;
        getCollisionFlags(): number;
        setCollisionFlags(flags: number): void;
        setWorldTransform(worldTrans: btTransform): void;
        setCollisionShape(collisionShape: btCollisionShape): void;
        setCcdMotionThreshold(ccdMotionThreshold: number): void;
        setCcdSweptSphereRadius(radius: number): void;
        getUserIndex(): number;
        setUserIndex(index: number): void;
        getUserPointer(): unknown;
        setUserPointer(userPointer: unknown): void;
        getActivationState(): number;
    }
    class btCollisionObjectWrapper {
    }
    class RayResultCallback {
        hasHit(): boolean;
        get_m_collisionFilterGroup(): number;
        set_m_collisionFilterGroup(m_collisionFilterGroup: number): void;
        m_collisionFilterGroup: number;
        get_m_collisionFilterMask(): number;
        set_m_collisionFilterMask(m_collisionFilterMask: number): void;
        m_collisionFilterMask: number;
        get_m_closestHitFraction(): number;
        set_m_closestHitFraction(m_closestHitFraction: number): void;
        m_closestHitFraction: number;
        get_m_collisionObject(): btCollisionObject;
        set_m_collisionObject(m_collisionObject: btCollisionObject): void;
        m_collisionObject: btCollisionObject;
    }
    class ClosestRayResultCallback extends RayResultCallback {
        constructor(from: btVector3, to: btVector3);
        get_m_rayFromWorld(): btVector3;
        set_m_rayFromWorld(m_rayFromWorld: btVector3): void;
        m_rayFromWorld: btVector3;
        get_m_rayToWorld(): btVector3;
        set_m_rayToWorld(m_rayToWorld: btVector3): void;
        m_rayToWorld: btVector3;
        get_m_hitNormalWorld(): btVector3;
        set_m_hitNormalWorld(m_hitNormalWorld: btVector3): void;
        m_hitNormalWorld: btVector3;
        get_m_hitPointWorld(): btVector3;
        set_m_hitPointWorld(m_hitPointWorld: btVector3): void;
        m_hitPointWorld: btVector3;
    }
    class btManifoldPoint {
        getPositionWorldOnA(): btVector3;
        getPositionWorldOnB(): btVector3;
        getAppliedImpulse(): number;
        getDistance(): number;
        get_m_localPointA(): btVector3;
        set_m_localPointA(m_localPointA: btVector3): void;
        m_localPointA: btVector3;
        get_m_localPointB(): btVector3;
        set_m_localPointB(m_localPointB: btVector3): void;
        m_localPointB: btVector3;
        get_m_positionWorldOnB(): btVector3;
        set_m_positionWorldOnB(m_positionWorldOnB: btVector3): void;
        m_positionWorldOnB: btVector3;
        get_m_positionWorldOnA(): btVector3;
        set_m_positionWorldOnA(m_positionWorldOnA: btVector3): void;
        m_positionWorldOnA: btVector3;
        get_m_normalWorldOnB(): btVector3;
        set_m_normalWorldOnB(m_normalWorldOnB: btVector3): void;
        m_normalWorldOnB: btVector3;
    }
    class ContactResultCallback {
        addSingleResult(cp: btManifoldPoint, colObj0Wrap: btCollisionObjectWrapper, partId0: number, index0: number, colObj1Wrap: btCollisionObjectWrapper, partId1: number, index1: number): number;
    }
    class ConcreteContactResultCallback extends ContactResultCallback {
        constructor();
        addSingleResult(cp: number, colObj0Wrap: number, partId0: number, index0: number, colObj1Wrap: number, partId1: number, index1: number): number;
    }
    class LocalShapeInfo {
        get_m_shapePart(): number;
        set_m_shapePart(m_shapePart: number): void;
        m_shapePart: number;
        get_m_triangleIndex(): number;
        set_m_triangleIndex(m_triangleIndex: number): void;
        m_triangleIndex: number;
    }
    class LocalConvexResult {
        constructor(hitCollisionObject: btCollisionObject, localShapeInfo: LocalShapeInfo, hitNormalLocal: btVector3, hitPointLocal: btVector3, hitFraction: number);
        get_m_hitCollisionObject(): btCollisionObject;
        set_m_hitCollisionObject(m_hitCollisionObject: btCollisionObject): void;
        m_hitCollisionObject: btCollisionObject;
        get_m_localShapeInfo(): LocalShapeInfo;
        set_m_localShapeInfo(m_localShapeInfo: LocalShapeInfo): void;
        m_localShapeInfo: LocalShapeInfo;
        get_m_hitNormalLocal(): btVector3;
        set_m_hitNormalLocal(m_hitNormalLocal: btVector3): void;
        m_hitNormalLocal: btVector3;
        get_m_hitPointLocal(): btVector3;
        set_m_hitPointLocal(m_hitPointLocal: btVector3): void;
        m_hitPointLocal: btVector3;
        get_m_hitFraction(): number;
        set_m_hitFraction(m_hitFraction: number): void;
        m_hitFraction: number;
    }
    class ConvexResultCallback {
        hasHit(): boolean;
        get_m_collisionFilterGroup(): number;
        set_m_collisionFilterGroup(m_collisionFilterGroup: number): void;
        m_collisionFilterGroup: number;
        get_m_collisionFilterMask(): number;
        set_m_collisionFilterMask(m_collisionFilterMask: number): void;
        m_collisionFilterMask: number;
        get_m_closestHitFraction(): number;
        set_m_closestHitFraction(m_closestHitFraction: number): void;
        m_closestHitFraction: number;
    }
    class ClosestConvexResultCallback extends ConvexResultCallback {
        constructor(convexFromWorld: btVector3, convexToWorld: btVector3);
        get_m_convexFromWorld(): btVector3;
        set_m_convexFromWorld(m_convexFromWorld: btVector3): void;
        m_convexFromWorld: btVector3;
        get_m_convexToWorld(): btVector3;
        set_m_convexToWorld(m_convexToWorld: btVector3): void;
        m_convexToWorld: btVector3;
        get_m_hitNormalWorld(): btVector3;
        set_m_hitNormalWorld(m_hitNormalWorld: btVector3): void;
        m_hitNormalWorld: btVector3;
        get_m_hitPointWorld(): btVector3;
        set_m_hitPointWorld(m_hitPointWorld: btVector3): void;
        m_hitPointWorld: btVector3;
    }
    class btCollisionShape {
        setLocalScaling(scaling: btVector3): void;
        getLocalScaling(): btVector3;
        calculateLocalInertia(mass: number, inertia: btVector3): void;
        setMargin(margin: number): void;
        getMargin(): number;
    }
    class btConvexShape extends btCollisionShape {
    }
    class btConvexTriangleMeshShape extends btConvexShape {
        constructor(meshInterface: btStridingMeshInterface, calcAabb?: boolean);
    }
    class btBoxShape extends btCollisionShape {
        constructor(boxHalfExtents: btVector3);
        setMargin(margin: number): void;
        getMargin(): number;
    }
    class btCapsuleShape extends btCollisionShape {
        constructor(radius: number, height: number);
        setMargin(margin: number): void;
        getMargin(): number;
        getUpAxis(): number;
        getRadius(): number;
        getHalfHeight(): number;
    }
    class btCapsuleShapeX extends btCapsuleShape {
        constructor(radius: number, height: number);
        setMargin(margin: number): void;
        getMargin(): number;
    }
    class btCapsuleShapeZ extends btCapsuleShape {
        constructor(radius: number, height: number);
        setMargin(margin: number): void;
        getMargin(): number;
    }
    class btCylinderShape extends btCollisionShape {
        constructor(halfExtents: btVector3);
        setMargin(margin: number): void;
        getMargin(): number;
    }
    class btCylinderShapeX extends btCylinderShape {
        constructor(halfExtents: btVector3);
        setMargin(margin: number): void;
        getMargin(): number;
    }
    class btCylinderShapeZ extends btCylinderShape {
        constructor(halfExtents: btVector3);
        setMargin(margin: number): void;
        getMargin(): number;
    }
    class btSphereShape extends btCollisionShape {
        constructor(radius: number);
        setMargin(margin: number): void;
        getMargin(): number;
    }
    class btConeShape extends btCollisionShape {
        constructor(radius: number, height: number);
    }
    class btConvexHullShape extends btCollisionShape {
        constructor(points?: ReadonlyArray<number>, numPoints?: number);
        addPoint(point: btVector3, recalculateLocalAABB?: boolean): void;
        setMargin(margin: number): void;
        getMargin(): number;
        getNumVertices(): number;
        initializePolyhedralFeatures(shiftVerticesByMargin: number): boolean;
    }
    class btShapeHull {
        constructor(shape: btConvexShape);
        buildHull(margin: number): boolean;
        numVertices(): number;
        getVertexPointer(): btVector3;
    }
    class btConeShapeX extends btConeShape {
        constructor(radius: number, height: number);
    }
    class btConeShapeZ extends btConeShape {
        constructor(radius: number, height: number);
    }
    class btCompoundShape extends btCollisionShape {
        constructor(enableDynamicAabbTree?: boolean);
        addChildShape(localTransform: btTransform, shape: btCollisionShape): void;
        removeChildShapeByIndex(childShapeindex: number): void;
        getNumChildShapes(): number;
        getChildShape(index: number): btCollisionShape;
        setMargin(margin: number): void;
        getMargin(): number;
    }
    class btStridingMeshInterface {
    }
    class btTriangleMesh extends btStridingMeshInterface {
        constructor(use32bitIndices?: boolean, use4componentVertices?: boolean);
        addTriangle(vertex0: btVector3, vertex1: btVector3, vertex2: btVector3, removeDuplicateVertices?: boolean): void;
    }
    const PHY_FLOAT: number;
    const PHY_DOUBLE: number;
    const PHY_INTEGER: number;
    const PHY_SHORT: number;
    const PHY_FIXEDPOINT88: number;
    const PHY_UCHAR: number;
    type PHY_ScalarType = typeof PHY_FLOAT | typeof PHY_DOUBLE | typeof PHY_INTEGER | typeof PHY_SHORT | typeof PHY_FIXEDPOINT88 | typeof PHY_UCHAR;
    function _emscripten_enum_PHY_ScalarType_PHY_FLOAT(): PHY_ScalarType;
    function _emscripten_enum_PHY_ScalarType_PHY_DOUBLE(): PHY_ScalarType;
    function _emscripten_enum_PHY_ScalarType_PHY_INTEGER(): PHY_ScalarType;
    function _emscripten_enum_PHY_ScalarType_PHY_SHORT(): PHY_ScalarType;
    function _emscripten_enum_PHY_ScalarType_PHY_FIXEDPOINT88(): PHY_ScalarType;
    function _emscripten_enum_PHY_ScalarType_PHY_UCHAR(): PHY_ScalarType;
    class btConcaveShape extends btCollisionShape {
    }
    class btStaticPlaneShape extends btConcaveShape {
        constructor(planeNormal: btVector3, planeConstant: number);
    }
    class btTriangleMeshShape extends btConcaveShape {
    }
    class btBvhTriangleMeshShape extends btTriangleMeshShape {
        constructor(meshInterface: btStridingMeshInterface, useQuantizedAabbCompression: boolean, buildBvh?: boolean);
    }
    class btHeightfieldTerrainShape extends btConcaveShape {
        constructor(heightStickWidth: number, heightStickLength: number, heightfieldData: unknown, heightScale: number, minHeight: number, maxHeight: number, upAxis: number, hdt: PHY_ScalarType, flipQuadEdges: boolean);
        setMargin(margin: number): void;
        getMargin(): number;
    }
    class btDefaultCollisionConstructionInfo {
        constructor();
    }
    class btDefaultCollisionConfiguration {
        constructor(info?: btDefaultCollisionConstructionInfo);
    }
    class btPersistentManifold {
        constructor();
        getBody0(): btCollisionObject;
        getBody1(): btCollisionObject;
        getNumContacts(): number;
        getContactPoint(index: number): btManifoldPoint;
    }
    class btDispatcher {
        getNumManifolds(): number;
        getManifoldByIndexInternal(index: number): btPersistentManifold;
    }
    class btCollisionDispatcher extends btDispatcher {
        constructor(conf: btDefaultCollisionConfiguration);
    }
    class btOverlappingPairCallback {
    }
    class btOverlappingPairCache {
        setInternalGhostPairCallback(ghostPairCallback: btOverlappingPairCallback): void;
    }
    class btAxisSweep3 {
        constructor(worldAabbMin: btVector3, worldAabbMax: btVector3, maxHandles?: number, pairCache?: btOverlappingPairCache, disableRaycastAccelerator?: boolean);
    }
    class btBroadphaseInterface {
    }
    class btCollisionConfiguration {
    }
    class btDbvtBroadphase {
        constructor();
    }
    class btRigidBodyConstructionInfo {
        constructor(mass: number, motionState: btMotionState, collisionShape: btCollisionShape, localInertia?: btVector3);
        get_m_linearDamping(): number;
        set_m_linearDamping(m_linearDamping: number): void;
        m_linearDamping: number;
        get_m_angularDamping(): number;
        set_m_angularDamping(m_angularDamping: number): void;
        m_angularDamping: number;
        get_m_friction(): number;
        set_m_friction(m_friction: number): void;
        m_friction: number;
        get_m_rollingFriction(): number;
        set_m_rollingFriction(m_rollingFriction: number): void;
        m_rollingFriction: number;
        get_m_restitution(): number;
        set_m_restitution(m_restitution: number): void;
        m_restitution: number;
        get_m_linearSleepingThreshold(): number;
        set_m_linearSleepingThreshold(m_linearSleepingThreshold: number): void;
        m_linearSleepingThreshold: number;
        get_m_angularSleepingThreshold(): number;
        set_m_angularSleepingThreshold(m_angularSleepingThreshold: number): void;
        m_angularSleepingThreshold: number;
        get_m_additionalDamping(): boolean;
        set_m_additionalDamping(m_additionalDamping: boolean): void;
        m_additionalDamping: boolean;
        get_m_additionalDampingFactor(): number;
        set_m_additionalDampingFactor(m_additionalDampingFactor: number): void;
        m_additionalDampingFactor: number;
        get_m_additionalLinearDampingThresholdSqr(): number;
        set_m_additionalLinearDampingThresholdSqr(m_additionalLinearDampingThresholdSqr: number): void;
        m_additionalLinearDampingThresholdSqr: number;
        get_m_additionalAngularDampingThresholdSqr(): number;
        set_m_additionalAngularDampingThresholdSqr(m_additionalAngularDampingThresholdSqr: number): void;
        m_additionalAngularDampingThresholdSqr: number;
        get_m_additionalAngularDampingFactor(): number;
        set_m_additionalAngularDampingFactor(m_additionalAngularDampingFactor: number): void;
        m_additionalAngularDampingFactor: number;
    }
    class btRigidBody extends btCollisionObject {
        constructor(constructionInfo: btRigidBodyConstructionInfo);
        getCenterOfMassTransform(): btTransform;
        setCenterOfMassTransform(xform: btTransform): void;
        setSleepingThresholds(linear: number, angular: number): void;
        setDamping(lin_damping: number, ang_damping: number): void;
        setMassProps(mass: number, inertia: btVector3): void;
        setLinearFactor(linearFactor: btVector3): void;
        applyTorque(torque: btVector3): void;
        applyForce(force: btVector3, rel_pos: btVector3): void;
        applyCentralForce(force: btVector3): void;
        applyTorqueImpulse(torque: btVector3): void;
        applyImpulse(impulse: btVector3, rel_pos: btVector3): void;
        applyCentralImpulse(impulse: btVector3): void;
        updateInertiaTensor(): void;
        getLinearVelocity(): btVector3;
        getAngularVelocity(): btVector3;
        setLinearVelocity(lin_vel: btVector3): void;
        setAngularVelocity(ang_vel: btVector3): void;
        getMotionState(): btMotionState;
        setMotionState(motionState: btMotionState): void;
        setAngularFactor(angularFactor: btVector3): void;
        upcast(colObj: btCollisionObject): btRigidBody;
        getAabb(aabbMin: btVector3, aabbMax: btVector3): void;
        applyGravity(): void;
        getGravity(): btVector3;
        setGravity(acceleration: btVector3): void;
    }
    class btConstraintSetting {
        constructor();
        get_m_tau(): number;
        set_m_tau(m_tau: number): void;
        m_tau: number;
        get_m_damping(): number;
        set_m_damping(m_damping: number): void;
        m_damping: number;
        get_m_impulseClamp(): number;
        set_m_impulseClamp(m_impulseClamp: number): void;
        m_impulseClamp: number;
    }
    class btTypedConstraint {
        enableFeedback(needsFeedback: boolean): void;
        getBreakingImpulseThreshold(): number;
        setBreakingImpulseThreshold(threshold: number): void;
        getParam(num: number, axis: number): number;
        setParam(num: number, value: number, axis: number): void;
    }
    const BT_CONSTRAINT_ERP: number;
    const BT_CONSTRAINT_STOP_ERP: number;
    const BT_CONSTRAINT_CFM: number;
    const BT_CONSTRAINT_STOP_CFM: number;
    type btConstraintParams = typeof BT_CONSTRAINT_ERP | typeof BT_CONSTRAINT_STOP_ERP | typeof BT_CONSTRAINT_CFM | typeof BT_CONSTRAINT_STOP_CFM;
    function _emscripten_enum_btConstraintParams_BT_CONSTRAINT_ERP(): btConstraintParams;
    function _emscripten_enum_btConstraintParams_BT_CONSTRAINT_STOP_ERP(): btConstraintParams;
    function _emscripten_enum_btConstraintParams_BT_CONSTRAINT_CFM(): btConstraintParams;
    function _emscripten_enum_btConstraintParams_BT_CONSTRAINT_STOP_CFM(): btConstraintParams;
    class btPoint2PointConstraint extends btTypedConstraint {
        constructor(rbA: btRigidBody, rbB: btRigidBody, pivotInA: btVector3, pivotInB: btVector3);
        constructor(rbA: btRigidBody, pivotInA: btVector3);
        setPivotA(pivotA: btVector3): void;
        setPivotB(pivotB: btVector3): void;
        getPivotInA(): btVector3;
        getPivotInB(): btVector3;
        get_m_setting(): btConstraintSetting;
        set_m_setting(m_setting: btConstraintSetting): void;
        m_setting: btConstraintSetting;
    }
    class btGeneric6DofConstraint extends btTypedConstraint {
        constructor(rbA: btRigidBody, rbB: btRigidBody, frameInA: btTransform, frameInB: btTransform, useLinearFrameReferenceFrameA: boolean);
        constructor(rbB: btRigidBody, frameInB: btTransform, useLinearFrameReferenceFrameB: boolean);
        setLinearLowerLimit(linearLower: btVector3): void;
        setLinearUpperLimit(linearUpper: btVector3): void;
        setAngularLowerLimit(angularLower: btVector3): void;
        setAngularUpperLimit(angularUpper: btVector3): void;
        getFrameOffsetA(): btTransform;
    }
    class btGeneric6DofSpringConstraint extends btGeneric6DofConstraint {
        constructor(rbA: btRigidBody, rbB: btRigidBody, frameInA: btTransform, frameInB: btTransform, useLinearFrameReferenceFrameA: boolean);
        constructor(rbB: btRigidBody, frameInB: btTransform, useLinearFrameReferenceFrameB: boolean);
        enableSpring(index: number, onOff: boolean): void;
        setStiffness(index: number, stiffness: number): void;
        setDamping(index: number, damping: number): void;
    }
    class btSequentialImpulseConstraintSolver {
        constructor();
    }
    class btConeTwistConstraint extends btTypedConstraint {
        constructor(rbA: btRigidBody, rbB: btRigidBody, rbAFrame: btTransform, rbBFrame: btTransform);
        constructor(rbA: btRigidBody, rbAFrame: btTransform);
        setLimit(limitIndex: number, limitValue: number): void;
        setAngularOnly(angularOnly: boolean): void;
        setDamping(damping: number): void;
        enableMotor(b: boolean): void;
        setMaxMotorImpulse(maxMotorImpulse: number): void;
        setMaxMotorImpulseNormalized(maxMotorImpulse: number): void;
        setMotorTarget(q: btQuaternion): void;
        setMotorTargetInConstraintSpace(q: btQuaternion): void;
    }
    class btHingeConstraint extends btTypedConstraint {
        constructor(rbA: btRigidBody, rbB: btRigidBody, pivotInA: btVector3, pivotInB: btVector3, axisInA: btVector3, axisInB: btVector3, useReferenceFrameA?: boolean);
        constructor(rbA: btRigidBody, rbB: btRigidBody, rbAFrame: btTransform, rbBFrame: btTransform, useReferenceFrameA?: boolean);
        constructor(rbA: btRigidBody, rbAFrame: btTransform, useReferenceFrameA?: boolean);
        setLimit(low: number, high: number, softness: number, biasFactor: number, relaxationFactor?: number): void;
        enableAngularMotor(enableMotor: boolean, targetVelocity: number, maxMotorImpulse: number): void;
        setAngularOnly(angularOnly: boolean): void;
        enableMotor(enableMotor: boolean): void;
        setMaxMotorImpulse(maxMotorImpulse: number): void;
        setMotorTarget(targetAngle: number, dt: number): void;
    }
    class btSliderConstraint extends btTypedConstraint {
        constructor(rbA: btRigidBody, rbB: btRigidBody, frameInA: btTransform, frameInB: btTransform, useLinearReferenceFrameA: boolean);
        constructor(rbB: btRigidBody, frameInB: btTransform, useLinearReferenceFrameA: boolean);
        setLowerLinLimit(lowerLimit: number): void;
        setUpperLinLimit(upperLimit: number): void;
        setLowerAngLimit(lowerAngLimit: number): void;
        setUpperAngLimit(upperAngLimit: number): void;
    }
    class btFixedConstraint extends btTypedConstraint {
        constructor(rbA: btRigidBody, rbB: btRigidBody, frameInA: btTransform, frameInB: btTransform);
    }
    class btConstraintSolver {
    }
    class btDispatcherInfo {
        get_m_timeStep(): number;
        set_m_timeStep(m_timeStep: number): void;
        m_timeStep: number;
        get_m_stepCount(): number;
        set_m_stepCount(m_stepCount: number): void;
        m_stepCount: number;
        get_m_dispatchFunc(): number;
        set_m_dispatchFunc(m_dispatchFunc: number): void;
        m_dispatchFunc: number;
        get_m_timeOfImpact(): number;
        set_m_timeOfImpact(m_timeOfImpact: number): void;
        m_timeOfImpact: number;
        get_m_useContinuous(): boolean;
        set_m_useContinuous(m_useContinuous: boolean): void;
        m_useContinuous: boolean;
        get_m_enableSatConvex(): boolean;
        set_m_enableSatConvex(m_enableSatConvex: boolean): void;
        m_enableSatConvex: boolean;
        get_m_enableSPU(): boolean;
        set_m_enableSPU(m_enableSPU: boolean): void;
        m_enableSPU: boolean;
        get_m_useEpa(): boolean;
        set_m_useEpa(m_useEpa: boolean): void;
        m_useEpa: boolean;
        get_m_allowedCcdPenetration(): number;
        set_m_allowedCcdPenetration(m_allowedCcdPenetration: number): void;
        m_allowedCcdPenetration: number;
        get_m_useConvexConservativeDistanceUtil(): boolean;
        set_m_useConvexConservativeDistanceUtil(m_useConvexConservativeDistanceUtil: boolean): void;
        m_useConvexConservativeDistanceUtil: boolean;
        get_m_convexConservativeDistanceThreshold(): number;
        set_m_convexConservativeDistanceThreshold(m_convexConservativeDistanceThreshold: number): void;
        m_convexConservativeDistanceThreshold: number;
    }
    class btCollisionWorld {
        getDispatcher(): btDispatcher;
        rayTest(rayFromWorld: btVector3, rayToWorld: btVector3, resultCallback: RayResultCallback): void;
        getPairCache(): btOverlappingPairCache;
        getDispatchInfo(): btDispatcherInfo;
        addCollisionObject(collisionObject: btCollisionObject, collisionFilterGroup?: number, collisionFilterMask?: number): void;
        removeCollisionObject(collisionObject: btCollisionObject): void;
        getBroadphase(): btBroadphaseInterface;
        convexSweepTest(castShape: btConvexShape, from: btTransform, to: btTransform, resultCallback: ConvexResultCallback, allowedCcdPenetration: number): void;
        contactPairTest(colObjA: btCollisionObject, colObjB: btCollisionObject, resultCallback: ContactResultCallback): void;
        contactTest(colObj: btCollisionObject, resultCallback: ContactResultCallback): void;
        updateSingleAabb(colObj: btCollisionObject): void;
    }
    class btContactSolverInfo {
        get_m_splitImpulse(): boolean;
        set_m_splitImpulse(m_splitImpulse: boolean): void;
        m_splitImpulse: boolean;
        get_m_splitImpulsePenetrationThreshold(): number;
        set_m_splitImpulsePenetrationThreshold(m_splitImpulsePenetrationThreshold: number): void;
        m_splitImpulsePenetrationThreshold: number;
        get_m_numIterations(): number;
        set_m_numIterations(m_numIterations: number): void;
        m_numIterations: number;
    }
    class btDynamicsWorld extends btCollisionWorld {
        addAction(action: btActionInterface): void;
        removeAction(action: btActionInterface): void;
        getSolverInfo(): btContactSolverInfo;
    }
    class btDiscreteDynamicsWorld extends btDynamicsWorld {
        constructor(dispatcher: btDispatcher, pairCache: btBroadphaseInterface, constraintSolver: btConstraintSolver, collisionConfiguration: btCollisionConfiguration);
        setGravity(gravity: btVector3): void;
        getGravity(): btVector3;
        addRigidBody(body: btRigidBody): void;
        addRigidBody(body: btRigidBody, group: number, mask: number): void;
        removeRigidBody(body: btRigidBody): void;
        addConstraint(constraint: btTypedConstraint, disableCollisionsBetweenLinkedBodies?: boolean): void;
        removeConstraint(constraint: btTypedConstraint): void;
        stepSimulation(timeStep: number, maxSubSteps?: number, fixedTimeStep?: number): number;
    }
    class btVehicleTuning {
        constructor();
        get_m_suspensionStiffness(): number;
        set_m_suspensionStiffness(m_suspensionStiffness: number): void;
        m_suspensionStiffness: number;
        get_m_suspensionCompression(): number;
        set_m_suspensionCompression(m_suspensionCompression: number): void;
        m_suspensionCompression: number;
        get_m_suspensionDamping(): number;
        set_m_suspensionDamping(m_suspensionDamping: number): void;
        m_suspensionDamping: number;
        get_m_maxSuspensionTravelCm(): number;
        set_m_maxSuspensionTravelCm(m_maxSuspensionTravelCm: number): void;
        m_maxSuspensionTravelCm: number;
        get_m_frictionSlip(): number;
        set_m_frictionSlip(m_frictionSlip: number): void;
        m_frictionSlip: number;
        get_m_maxSuspensionForce(): number;
        set_m_maxSuspensionForce(m_maxSuspensionForce: number): void;
        m_maxSuspensionForce: number;
    }
    class btVehicleRaycasterResult {
        get_m_hitPointInWorld(): btVector3;
        set_m_hitPointInWorld(m_hitPointInWorld: btVector3): void;
        m_hitPointInWorld: btVector3;
        get_m_hitNormalInWorld(): btVector3;
        set_m_hitNormalInWorld(m_hitNormalInWorld: btVector3): void;
        m_hitNormalInWorld: btVector3;
        get_m_distFraction(): number;
        set_m_distFraction(m_distFraction: number): void;
        m_distFraction: number;
    }
    class btVehicleRaycaster {
        castRay(from: btVector3, to: btVector3, result: btVehicleRaycasterResult): void;
    }
    class btDefaultVehicleRaycaster extends btVehicleRaycaster {
        constructor(world: btDynamicsWorld);
    }
    class RaycastInfo {
        get_m_contactNormalWS(): btVector3;
        set_m_contactNormalWS(m_contactNormalWS: btVector3): void;
        m_contactNormalWS: btVector3;
        get_m_contactPointWS(): btVector3;
        set_m_contactPointWS(m_contactPointWS: btVector3): void;
        m_contactPointWS: btVector3;
        get_m_suspensionLength(): number;
        set_m_suspensionLength(m_suspensionLength: number): void;
        m_suspensionLength: number;
        get_m_hardPointWS(): btVector3;
        set_m_hardPointWS(m_hardPointWS: btVector3): void;
        m_hardPointWS: btVector3;
        get_m_wheelDirectionWS(): btVector3;
        set_m_wheelDirectionWS(m_wheelDirectionWS: btVector3): void;
        m_wheelDirectionWS: btVector3;
        get_m_wheelAxleWS(): btVector3;
        set_m_wheelAxleWS(m_wheelAxleWS: btVector3): void;
        m_wheelAxleWS: btVector3;
        get_m_isInContact(): boolean;
        set_m_isInContact(m_isInContact: boolean): void;
        m_isInContact: boolean;
        get_m_groundObject(): any;
        set_m_groundObject(m_groundObject: any): void;
        m_groundObject: any;
    }
    class btWheelInfoConstructionInfo {
        get_m_chassisConnectionCS(): btVector3;
        set_m_chassisConnectionCS(m_chassisConnectionCS: btVector3): void;
        m_chassisConnectionCS: btVector3;
        get_m_wheelDirectionCS(): btVector3;
        set_m_wheelDirectionCS(m_wheelDirectionCS: btVector3): void;
        m_wheelDirectionCS: btVector3;
        get_m_wheelAxleCS(): btVector3;
        set_m_wheelAxleCS(m_wheelAxleCS: btVector3): void;
        m_wheelAxleCS: btVector3;
        get_m_suspensionRestLength(): number;
        set_m_suspensionRestLength(m_suspensionRestLength: number): void;
        m_suspensionRestLength: number;
        get_m_maxSuspensionTravelCm(): number;
        set_m_maxSuspensionTravelCm(m_maxSuspensionTravelCm: number): void;
        m_maxSuspensionTravelCm: number;
        get_m_wheelRadius(): number;
        set_m_wheelRadius(m_wheelRadius: number): void;
        m_wheelRadius: number;
        get_m_suspensionStiffness(): number;
        set_m_suspensionStiffness(m_suspensionStiffness: number): void;
        m_suspensionStiffness: number;
        get_m_wheelsDampingCompression(): number;
        set_m_wheelsDampingCompression(m_wheelsDampingCompression: number): void;
        m_wheelsDampingCompression: number;
        get_m_wheelsDampingRelaxation(): number;
        set_m_wheelsDampingRelaxation(m_wheelsDampingRelaxation: number): void;
        m_wheelsDampingRelaxation: number;
        get_m_frictionSlip(): number;
        set_m_frictionSlip(m_frictionSlip: number): void;
        m_frictionSlip: number;
        get_m_maxSuspensionForce(): number;
        set_m_maxSuspensionForce(m_maxSuspensionForce: number): void;
        m_maxSuspensionForce: number;
        get_m_bIsFrontWheel(): boolean;
        set_m_bIsFrontWheel(m_bIsFrontWheel: boolean): void;
        m_bIsFrontWheel: boolean;
    }
    class btWheelInfo {
        get_m_suspensionStiffness(): number;
        set_m_suspensionStiffness(m_suspensionStiffness: number): void;
        m_suspensionStiffness: number;
        get_m_frictionSlip(): number;
        set_m_frictionSlip(m_frictionSlip: number): void;
        m_frictionSlip: number;
        get_m_engineForce(): number;
        set_m_engineForce(m_engineForce: number): void;
        m_engineForce: number;
        get_m_rollInfluence(): number;
        set_m_rollInfluence(m_rollInfluence: number): void;
        m_rollInfluence: number;
        get_m_suspensionRestLength1(): number;
        set_m_suspensionRestLength1(m_suspensionRestLength1: number): void;
        m_suspensionRestLength1: number;
        get_m_wheelsRadius(): number;
        set_m_wheelsRadius(m_wheelsRadius: number): void;
        m_wheelsRadius: number;
        get_m_wheelsDampingCompression(): number;
        set_m_wheelsDampingCompression(m_wheelsDampingCompression: number): void;
        m_wheelsDampingCompression: number;
        get_m_wheelsDampingRelaxation(): number;
        set_m_wheelsDampingRelaxation(m_wheelsDampingRelaxation: number): void;
        m_wheelsDampingRelaxation: number;
        get_m_steering(): number;
        set_m_steering(m_steering: number): void;
        m_steering: number;
        get_m_maxSuspensionForce(): number;
        set_m_maxSuspensionForce(m_maxSuspensionForce: number): void;
        m_maxSuspensionForce: number;
        get_m_maxSuspensionTravelCm(): number;
        set_m_maxSuspensionTravelCm(m_maxSuspensionTravelCm: number): void;
        m_maxSuspensionTravelCm: number;
        get_m_wheelsSuspensionForce(): number;
        set_m_wheelsSuspensionForce(m_wheelsSuspensionForce: number): void;
        m_wheelsSuspensionForce: number;
        get_m_bIsFrontWheel(): boolean;
        set_m_bIsFrontWheel(m_bIsFrontWheel: boolean): void;
        m_bIsFrontWheel: boolean;
        get_m_raycastInfo(): RaycastInfo;
        set_m_raycastInfo(m_raycastInfo: RaycastInfo): void;
        m_raycastInfo: RaycastInfo;
        get_m_chassisConnectionPointCS(): btVector3;
        set_m_chassisConnectionPointCS(m_chassisConnectionPointCS: btVector3): void;
        m_chassisConnectionPointCS: btVector3;
        constructor(ci: btWheelInfoConstructionInfo);
        getSuspensionRestLength(): number;
        updateWheel(chassis: btRigidBody, raycastInfo: RaycastInfo): void;
        get_m_worldTransform(): btTransform;
        set_m_worldTransform(m_worldTransform: btTransform): void;
        m_worldTransform: btTransform;
        get_m_wheelDirectionCS(): btVector3;
        set_m_wheelDirectionCS(m_wheelDirectionCS: btVector3): void;
        m_wheelDirectionCS: btVector3;
        get_m_wheelAxleCS(): btVector3;
        set_m_wheelAxleCS(m_wheelAxleCS: btVector3): void;
        m_wheelAxleCS: btVector3;
        get_m_rotation(): number;
        set_m_rotation(m_rotation: number): void;
        m_rotation: number;
        get_m_deltaRotation(): number;
        set_m_deltaRotation(m_deltaRotation: number): void;
        m_deltaRotation: number;
        get_m_brake(): number;
        set_m_brake(m_brake: number): void;
        m_brake: number;
        get_m_clippedInvContactDotSuspension(): number;
        set_m_clippedInvContactDotSuspension(m_clippedInvContactDotSuspension: number): void;
        m_clippedInvContactDotSuspension: number;
        get_m_suspensionRelativeVelocity(): number;
        set_m_suspensionRelativeVelocity(m_suspensionRelativeVelocity: number): void;
        m_suspensionRelativeVelocity: number;
        get_m_skidInfo(): number;
        set_m_skidInfo(m_skidInfo: number): void;
        m_skidInfo: number;
    }
    class btActionInterface {
        updateAction(collisionWorld: btCollisionWorld, deltaTimeStep: number): void;
    }
    class btKinematicCharacterController extends btActionInterface {
        constructor(ghostObject: btPairCachingGhostObject, convexShape: btConvexShape, stepHeight: number, upAxis?: btVector3);
        setWalkDirection(walkDirection: btVector3): void;
        setVelocityForTimeInterval(velocity: btVector3, timeInterval: number): void;
        warp(origin: btVector3): void;
        preStep(collisionWorld: btCollisionWorld): void;
        playerStep(collisionWorld: btCollisionWorld, dt: number): void;
        setFallSpeed(fallSpeed: number): void;
        setJumpSpeed(jumpSpeed: number): void;
        setMaxJumpHeight(maxJumpHeight: number): void;
        canJump(): boolean;
        jump(): void;
        setGravity(acceleration: btVector3): void;
        getGravity(): btVector3;
        setMaxSlope(slopeRadians: number): void;
        getMaxSlope(): number;
        getGhostObject(): btPairCachingGhostObject;
        setUseGhostSweepTest(useGhostObjectSweepTest: boolean): void;
        onGround(): boolean;
        setUpInterpolate(value: boolean): void;
    }
    class btRaycastVehicle extends btActionInterface {
        constructor(tuning: btVehicleTuning, chassis: btRigidBody, raycaster: btVehicleRaycaster);
        applyEngineForce(force: number, wheel: number): void;
        setSteeringValue(steering: number, wheel: number): void;
        getWheelTransformWS(wheelIndex: number): btTransform;
        updateWheelTransform(wheelIndex: number, interpolatedTransform: boolean): void;
        addWheel(connectionPointCS0: btVector3, wheelDirectionCS0: btVector3, wheelAxleCS: btVector3, suspensionRestLength: number, wheelRadius: number, tuning: btVehicleTuning, isFrontWheel: boolean): btWheelInfo;
        getNumWheels(): number;
        getRigidBody(): btRigidBody;
        getWheelInfo(index: number): btWheelInfo;
        setBrake(brake: number, wheelIndex: number): void;
        setCoordinateSystem(rightIndex: number, upIndex: number, forwardIndex: number): void;
        getCurrentSpeedKmHour(): number;
        getChassisWorldTransform(): btTransform;
        rayCast(wheel: btWheelInfo): number;
        updateVehicle(step: number): void;
        resetSuspension(): void;
        getSteeringValue(wheel: number): number;
        updateWheelTransformsWS(wheel: btWheelInfo, interpolatedTransform?: boolean): void;
        setPitchControl(pitch: number): void;
        updateSuspension(deltaTime: number): void;
        updateFriction(timeStep: number): void;
        getRightAxis(): number;
        getUpAxis(): number;
        getForwardAxis(): number;
        getForwardVector(): btVector3;
        getUserConstraintType(): number;
        setUserConstraintType(userConstraintType: number): void;
        setUserConstraintId(uid: number): void;
        getUserConstraintId(): number;
    }
    class btGhostObject extends btCollisionObject {
        constructor();
        getNumOverlappingObjects(): number;
        getOverlappingObject(index: number): btCollisionObject;
    }
    class btPairCachingGhostObject extends btGhostObject {
        constructor();
    }
    class btGhostPairCallback {
        constructor();
    }
    class btjsContactData {
        getId(): number;
        getBodyA(): btRigidBody;
        getBodyB(): btRigidBody;
        getPosition(): btVector3;
        getNormalB(): btVector3;
    }
    class btjsDynamicsWorld extends btDiscreteDynamicsWorld {
        constructor(dispatcher: btDispatcher, pairCache: btBroadphaseInterface, constraintSolver: btConstraintSolver, collisionConfiguration: btCollisionConfiguration);
        createCompoundFromGimpactShape(gimpactMesh: btGImpactMeshShape, depth: number): btCompoundShape;
    }
    class btGImpactShapeInterface extends btConcaveShape {
    }
    class btGImpactMeshShape extends btGImpactShapeInterface {
        constructor(meshInterface: btStridingMeshInterface);
        updateBound(): void;
    }
}