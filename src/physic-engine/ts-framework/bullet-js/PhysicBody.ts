
import bulletJsTypes from "../types/bulletJsTypes";

import { WasmModuleHolder } from "./WasmModuleHolder";

import { ContactDataBody, ContactEventHandler, IContactEventHandler } from "./ContactEventHandler";

import * as glm from "gl-matrix";


const DISABLE_DEACTIVATION = 4;
const CF_STATIC_OBJECT = 1;
const CF_KINEMATIC_OBJECT = 2;
const CF_NO_CONTACT_RESPONSE = 4;
const CF_CUSTOM_MATERIAL_CALLBACK = 8; // <= allows per-triangle material (friction/restitution)

type PrimitivesPhysicShapeDef = {
  type: 'box';
  size: glm.ReadonlyVec3;
} | {
  type: 'sphere';
  radius: number;
} | {
  type: 'cylinder';
  length: number;
  radius: number;
} | {
  type: 'capsule';
  length: number;
  radius: number;
} | {
  type: 'mesh';
  triangles: [glm.ReadonlyVec3, glm.ReadonlyVec3, glm.ReadonlyVec3][];
};

export type PhysicShapeDef = PrimitivesPhysicShapeDef | {
  type: 'compound';
  shapes: {
    position: glm.vec3;
    orientation: glm.quat;
    shape: PrimitivesPhysicShapeDef;
  }[];
};

export interface PhysicBodyDef {
  shape: PhysicShapeDef;
  mass: number;
}

export interface IPhysicBody extends IContactEventHandler<ContactDataBody> {

  isAlive(): boolean;

  setPosition(x: number, y: number, z: number): void;
  setRotation(x: number, y: number, z: number, w: number): void;
  getPositionAndRotation(position: glm.vec3, rotation: glm.vec4): void;
  getPosition(): glm.vec3;
  getRotation(): glm.vec4;

  getLinearVelocity(): glm.vec3;
  getAngularVelocity(): glm.vec3;

  setLinearVelocity(x: number, y: number, z: number): void
  setAngularVelocity(x: number, y: number, z: number): void

  setLinearFactor(x: number, y: number, z: number): void
  setAngularFactor(x: number, y: number, z: number): void

  applyCentralForce(x: number, y: number, z: number): void
  applyCentralImpulse(x: number, y: number, z: number): void

  setDamping(linear: number, angular?: number): void

  setCcdMotionThreshold(ccdMotionThreshold: number): void;
  setCcdSweptSphereRadius(radius: number): void;

  setRestitution(restitution: number): void;
  setFriction(friction: number): void;
  setRollingFriction(friction: number): void;

  setGravity(x: number, y: number, z: number): void;

  isStaticObject(): boolean;
  isKinematicObject(): boolean
  isStaticOrKinematicObject(): boolean;

  isActive(): boolean;
  enableDeactivation(): void;
  disableDeactivation(): void;

  cannotDeactivate(): boolean;
  canDeactivate(): boolean;
}

export class ConcretePhysicBody extends ContactEventHandler<ContactDataBody> implements IPhysicBody {

  public _customShape: { shape: bulletJsTypes.btCollisionShape; cleanup: () => void };
  public _rawRigidBody: bulletJsTypes.btRigidBody;

  private _isAlive: boolean = true;

  constructor(def: PhysicBodyDef, rawShape: { shape: bulletJsTypes.btCollisionShape; cleanup: () => void }) {
    super();

    const bullet = WasmModuleHolder.get();

    this._customShape = rawShape;

    const tmpVec3 = new bullet.btVector3();
    this._customShape.shape.calculateLocalInertia(def.mass, tmpVec3);

    const motionState = null as unknown as bulletJsTypes.btMotionState; // hack :(
    const rbInfo = new bullet.btRigidBodyConstructionInfo(def.mass, motionState, this._customShape.shape, tmpVec3);
    this._rawRigidBody = new bullet.btRigidBody(rbInfo);

    // this._customShape = this._getShape(def.shape);

    bullet.destroy(tmpVec3);
    bullet.destroy(rbInfo);
  }

  dispose() {
    const bullet = WasmModuleHolder.get();

    bullet.destroy(this._rawRigidBody);
    // bullet.destroy(this._customShape);
    this._customShape.cleanup();

    // hack to force it to crash if the body is reused
    this._rawRigidBody = null as unknown as bulletJsTypes.btRigidBody;

    this._isAlive = false;
  }

  isAlive(): boolean {
    return this._isAlive;
  }

  setPosition(x: number, y: number, z: number) {
    const bullet = WasmModuleHolder.get();

    const rotation = this.getRotation();

    const newPosition = new bullet.btVector3(x, y, z);
    const newRotation = new bullet.btQuaternion(rotation[0], rotation[1], rotation[2], rotation[3]);
    const newTransform = new bullet.btTransform(newRotation, newPosition);
    this._rawRigidBody.setWorldTransform(newTransform);

    bullet.destroy(newTransform);
    bullet.destroy(newPosition);
    bullet.destroy(newRotation);
  }

  setRotation(x: number, y: number, z: number, w: number) {
    const bullet = WasmModuleHolder.get();

    const origin = this.getPosition();

    const newPosition = new bullet.btVector3(origin[0], origin[1], origin[2]);
    const newRotation = new bullet.btQuaternion(x, y, z, w);
    const newTransform = new bullet.btTransform(newRotation, newPosition);
    this._rawRigidBody.setWorldTransform(newTransform);

    bullet.destroy(newTransform);
    bullet.destroy(newPosition);
    bullet.destroy(newRotation);
  }

  getPositionAndRotation(position: glm.vec3, rotation: glm.vec4) {
    const bullet = WasmModuleHolder.get();

    const rawTransform = this._rawRigidBody.getWorldTransform();
    const rawOrigin = rawTransform.getOrigin();
    const rawRotation = rawTransform.getRotation();

    position[0] = rawOrigin.x();
    position[1] = rawOrigin.y();
    position[2] = rawOrigin.z();
    rotation[0] = rawRotation.x();
    rotation[1] = rawRotation.y();
    rotation[2] = rawRotation.z();
    rotation[3] = rawRotation.w();

    bullet.destroy(rawRotation);
    bullet.destroy(rawOrigin);
    bullet.destroy(rawTransform);
  }

  getPosition(): glm.vec3 {
    const bullet = WasmModuleHolder.get();

    const rawTransform = this._rawRigidBody.getWorldTransform();
    const rawOrigin = rawTransform.getOrigin();

    const origin = glm.vec3.fromValues(rawOrigin.x(),rawOrigin.y(),rawOrigin.z());

    bullet.destroy(rawOrigin);
    bullet.destroy(rawTransform);

    return origin;
  }

  getRotation(): glm.vec4 {
    const bullet = WasmModuleHolder.get();

    const rawTransform = this._rawRigidBody.getWorldTransform();
    const rawRotation = rawTransform.getRotation();

    const rotation = glm.vec4.fromValues(rawRotation.x(),rawRotation.y(),rawRotation.z(),rawRotation.w());

    bullet.destroy(rawRotation);
    bullet.destroy(rawTransform);

    return rotation;
  }


  getLinearVelocity(): glm.vec3 {
    const bullet = WasmModuleHolder.get();
    const vel = this._rawRigidBody.getLinearVelocity();
    const value = glm.vec3.fromValues(vel.x(), vel.y(), vel.z());
    bullet.destroy(vel);
    return value;
  }

  getAngularVelocity(): glm.vec3 {
    const bullet = WasmModuleHolder.get();
    const vel = this._rawRigidBody.getAngularVelocity();
    const value = glm.vec3.fromValues(vel.x(), vel.y(), vel.z());
    bullet.destroy(vel);
    return value;
  }

  setLinearVelocity(x: number, y: number, z: number) {
    const bullet = WasmModuleHolder.get();
    const newVel = new bullet.btVector3(x, y, z);
    this._rawRigidBody.setLinearVelocity(newVel);
    bullet.destroy(newVel);
  }

  setAngularVelocity(x: number, y: number, z: number) {
    const bullet = WasmModuleHolder.get();
    const newVel = new bullet.btVector3(x, y, z);
    this._rawRigidBody.setAngularVelocity(newVel);
    bullet.destroy(newVel);
  }

  setLinearFactor(x: number, y: number, z: number) {
    const bullet = WasmModuleHolder.get();
    const newVel = new bullet.btVector3(x, y, z);
    this._rawRigidBody.setLinearFactor(newVel);
    bullet.destroy(newVel);
  }

  setAngularFactor(x: number, y: number, z: number) {
    const bullet = WasmModuleHolder.get();
    const newVel = new bullet.btVector3(x, y, z);
    this._rawRigidBody.setAngularFactor(newVel);
    bullet.destroy(newVel);
  }

  applyCentralForce(x: number, y: number, z: number) {
    const bullet = WasmModuleHolder.get();
    const newVel = new bullet.btVector3(x, y, z);
    this._rawRigidBody.applyCentralForce(newVel);
    bullet.destroy(newVel);
  }

  applyCentralImpulse(x: number, y: number, z: number) {
    const bullet = WasmModuleHolder.get();
    const newVel = new bullet.btVector3(x, y, z);
    this._rawRigidBody.applyCentralImpulse(newVel);
    bullet.destroy(newVel);
  }

  setDamping(linear: number, angular: number = 0) {
    this._rawRigidBody.setDamping(linear, angular);
  }

  setCcdMotionThreshold(ccdMotionThreshold: number) {
    this._rawRigidBody.setCcdMotionThreshold(ccdMotionThreshold);
  }
  setCcdSweptSphereRadius(radius: number) {
    this._rawRigidBody.setCcdSweptSphereRadius(radius);
  }

  setRestitution(restitution: number) {
    this._rawRigidBody.setRestitution(restitution);
  }
  setFriction(friction: number) {
    this._rawRigidBody.setFriction(friction);
  }
  setRollingFriction(friction: number) {
    this._rawRigidBody.setRollingFriction(friction);
  }

  setGravity(x: number, y: number, z: number) {
    const bullet = WasmModuleHolder.get();
    const newVel = new bullet.btVector3(x, y, z);
    this._rawRigidBody.setGravity(newVel);
    bullet.destroy(newVel);
  }

  isStaticObject() {
    return this._rawRigidBody.isStaticObject();
  }
  isKinematicObject() {
    return this._rawRigidBody.isKinematicObject();
  }
  isStaticOrKinematicObject() {
    return this._rawRigidBody.isStaticOrKinematicObject();
  }

  isActive() {
    return (this.isStaticOrKinematicObject() || this._rawRigidBody.isActive());
  }
  enableDeactivation() {
    this._rawRigidBody.activate(true);
  }
  disableDeactivation() {
    this._rawRigidBody.setActivationState(DISABLE_DEACTIVATION);
  }

  cannotDeactivate() {
    return (
      this.isStaticOrKinematicObject() ||
      this._rawRigidBody.getActivationState() == DISABLE_DEACTIVATION
    );
  }
  canDeactivate() {
    return !this.cannotDeactivate();
  }



};
