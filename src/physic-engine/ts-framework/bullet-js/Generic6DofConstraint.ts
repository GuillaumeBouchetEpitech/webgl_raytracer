
import bulletJsTypes from "../types/bulletJsTypes";

import { WasmModuleHolder } from "./WasmModuleHolder";

import { IPhysicBody, ConcretePhysicBody } from "./PhysicBody";

import * as glm from "gl-matrix";

// btGeneric6DofConstraint

export interface IGeneric6DofConstraint {
  setLinearLowerLimit(val: glm.ReadonlyVec3): void;
  setLinearUpperLimit(val: glm.ReadonlyVec3): void;
  setAngularLowerLimit(val: glm.ReadonlyVec3): void;
  setAngularUpperLimit(val: glm.ReadonlyVec3): void;
};

export type Generic6DofConstraintDef = {
  bodyA: IPhysicBody;
  bodyB: IPhysicBody;
  frameA: glm.ReadonlyVec3;
  frameB: glm.ReadonlyVec3;
  useReferenceFrameA: boolean;
};

export class ConcreteGeneric6DofConstraint implements IGeneric6DofConstraint {

  public _rawConstraint: bulletJsTypes.btGeneric6DofSpringConstraint;
  public _bodyA: IPhysicBody;
  public _bodyB: IPhysicBody;

  constructor(def: Generic6DofConstraintDef) {

    this._bodyA = def.bodyA;
    this._bodyB = def.bodyB;

    const bullet = WasmModuleHolder.get();

    const rawRigidBodyA = (def.bodyA as ConcretePhysicBody)._rawRigidBody;
    const rawRigidBodyB = (def.bodyB as ConcretePhysicBody)._rawRigidBody;

    const newRotation = new bullet.btQuaternion(0, 0, 1, 0);

    const newPositionA = new bullet.btVector3(def.frameA[0], def.frameA[1], def.frameA[2]);
    const newTransformA = new bullet.btTransform(newRotation, newPositionA);

    const newPositionB = new bullet.btVector3(def.frameB[0], def.frameB[1], def.frameB[2]);
    const newTransformB = new bullet.btTransform(newRotation, newPositionB);

    this._rawConstraint = new bullet.btGeneric6DofSpringConstraint(
      rawRigidBodyA,
      rawRigidBodyB,
      newTransformA,
      newTransformB,
      def.useReferenceFrameA
    );

    this._rawConstraint.enableSpring(0, false);
    this._rawConstraint.enableSpring(1, false);
    this._rawConstraint.enableSpring(2, false);
    this._rawConstraint.setStiffness(0, 1);
    this._rawConstraint.setStiffness(1, 1);
    this._rawConstraint.setStiffness(2, 1);
    this._rawConstraint.setDamping(0, 1);
    this._rawConstraint.setDamping(1, 1);
    this._rawConstraint.setDamping(2, 1);

    bullet.destroy(newTransformA);
    bullet.destroy(newTransformB);
    bullet.destroy(newPositionA);
    bullet.destroy(newPositionB);
    bullet.destroy(newRotation);
  }

  dispose() {
    const bullet = WasmModuleHolder.get();

    bullet.destroy(this._rawConstraint);
  }

  setLinearLowerLimit(val: glm.ReadonlyVec3): void {
    const bullet = WasmModuleHolder.get();

    const newVal = new bullet.btVector3(val[0], val[1], val[2]);
    this._rawConstraint.setLinearLowerLimit(newVal);
    bullet.destroy(newVal);
  }
  setLinearUpperLimit(val: glm.ReadonlyVec3): void {
    const bullet = WasmModuleHolder.get();

    const newVal = new bullet.btVector3(val[0], val[1], val[2]);
    this._rawConstraint.setLinearUpperLimit(newVal);
    bullet.destroy(newVal);
  }
  setAngularLowerLimit(val: glm.ReadonlyVec3): void {
    const bullet = WasmModuleHolder.get();

    const newVal = new bullet.btVector3(val[0], val[1], val[2]);
    this._rawConstraint.setAngularLowerLimit(newVal);
    bullet.destroy(newVal);
  }
  setAngularUpperLimit(val: glm.ReadonlyVec3): void {
    const bullet = WasmModuleHolder.get();

    const newVal = new bullet.btVector3(val[0], val[1], val[2]);
    this._rawConstraint.setAngularUpperLimit(newVal);
    bullet.destroy(newVal);
  }

};


