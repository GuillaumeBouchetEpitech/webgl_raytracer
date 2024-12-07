
import bulletJsTypes from "../types/bulletJsTypes";

import { WasmModuleHolder } from "./WasmModuleHolder";

import { IPhysicBody, ConcretePhysicBody } from "./PhysicBody";

import * as glm from "gl-matrix";

// btHingeConstraint

export interface IHingeConstraint {
  // setLinearLowerLimit(val: glm.ReadonlyVec3): void;
  // setLinearUpperLimit(val: glm.ReadonlyVec3): void;
  // setAngularLowerLimit(val: glm.ReadonlyVec3): void;
  // setAngularUpperLimit(val: glm.ReadonlyVec3): void;

  setLimit(low: number, high: number, softness: number, biasFactor: number, relaxationFactor?: number): void;
  enableAngularMotor(enableMotor: boolean, targetVelocity: number, maxMotorImpulse: number): void;
  // setAngularOnly(angularOnly: boolean): void;
  enableMotor(enableMotor: boolean): void;
  setMaxMotorImpulse(maxMotorImpulse: number): void;
  setMotorTarget(targetAngle: number, dt: number): void;

};

export type HingeConstraintDef = {
  bodyA: IPhysicBody;
  bodyB: IPhysicBody;
  pivotInA: glm.ReadonlyVec3;
  pivotInB: glm.ReadonlyVec3;
  axisInA: glm.ReadonlyVec3;
  axisInB: glm.ReadonlyVec3;
  useReferenceFrameA: boolean;
};

export class ConcreteHingeConstraint implements IHingeConstraint {

  public _rawConstraint: bulletJsTypes.btHingeConstraint;
  public _bodyA: IPhysicBody;
  public _bodyB: IPhysicBody;

  constructor(def: HingeConstraintDef) {

    this._bodyA = def.bodyA;
    this._bodyB = def.bodyB;

    const bullet = WasmModuleHolder.get();

    const rawRigidBodyA = (def.bodyA as ConcretePhysicBody)._rawRigidBody;
    const rawRigidBodyB = (def.bodyB as ConcretePhysicBody)._rawRigidBody;

    // const newRotation = new bullet.btQuaternion(0, 0, 1, 0);

    const pivotInA = new bullet.btVector3(def.pivotInA[0], def.pivotInA[1], def.pivotInA[2]);
    const pivotInB = new bullet.btVector3(def.pivotInB[0], def.pivotInB[1], def.pivotInB[2]);
    const axisInA = new bullet.btVector3(def.axisInA[0], def.axisInA[1], def.axisInA[2]);
    const axisInB = new bullet.btVector3(def.axisInB[0], def.axisInB[1], def.axisInB[2]);

    this._rawConstraint = new bullet.btHingeConstraint(
      rawRigidBodyA,
      rawRigidBodyB,

      pivotInA,
      pivotInB,
      axisInA,
      axisInB,

      def.useReferenceFrameA
    );

    // this._rawConstraint.enableSpring(0, false);
    // this._rawConstraint.enableSpring(1, false);
    // this._rawConstraint.enableSpring(2, false);
    // this._rawConstraint.setStiffness(0, 1);
    // this._rawConstraint.setStiffness(1, 1);
    // this._rawConstraint.setStiffness(2, 1);
    // this._rawConstraint.setDamping(0, 1);
    // this._rawConstraint.setDamping(1, 1);
    // this._rawConstraint.setDamping(2, 1);

    bullet.destroy(pivotInA);
    bullet.destroy(pivotInB);
    bullet.destroy(axisInA);
    bullet.destroy(axisInB);
    // bullet.destroy(newRotation);
  }

  dispose() {
    const bullet = WasmModuleHolder.get();

    bullet.destroy(this._rawConstraint);
  }

  setLimit(low: number, high: number, softness: number, biasFactor: number, relaxationFactor?: number): void {
    this._rawConstraint.setLimit(low, high, softness, biasFactor, relaxationFactor);
  }
  enableAngularMotor(enableMotor: boolean, targetVelocity: number, maxMotorImpulse: number): void {
    this._rawConstraint.enableAngularMotor(enableMotor, targetVelocity, maxMotorImpulse);
  }
  // setAngularOnly(angularOnly: boolean): void {
  //   this._rawConstraint.setAngularOnly(angularOnly);
  // }
  enableMotor(enableMotor: boolean): void {
    this._rawConstraint.enableMotor(enableMotor);
  }
  setMaxMotorImpulse(maxMotorImpulse: number): void {
    this._rawConstraint.setMaxMotorImpulse(maxMotorImpulse);
  }
  setMotorTarget(targetAngle: number, dt: number): void {
    this._rawConstraint.setMotorTarget(targetAngle, dt);
  }

  // setLinearLowerLimit(val: glm.ReadonlyVec3): void {
  //   const bullet = WasmModuleHolder.get();

  //   const newVal = new bullet.btVector3(val[0], val[1], val[2]);
  //   this._rawConstraint.setLinearLowerLimit(newVal);
  //   bullet.destroy(newVal);
  // }
  // setLinearUpperLimit(val: glm.ReadonlyVec3): void {
  //   const bullet = WasmModuleHolder.get();

  //   const newVal = new bullet.btVector3(val[0], val[1], val[2]);
  //   this._rawConstraint.setLinearUpperLimit(newVal);
  //   bullet.destroy(newVal);
  // }
  // setAngularLowerLimit(val: glm.ReadonlyVec3): void {
  //   const bullet = WasmModuleHolder.get();

  //   const newVal = new bullet.btVector3(val[0], val[1], val[2]);
  //   this._rawConstraint.setAngularLowerLimit(newVal);
  //   bullet.destroy(newVal);
  // }
  // setAngularUpperLimit(val: glm.ReadonlyVec3): void {
  //   const bullet = WasmModuleHolder.get();

  //   const newVal = new bullet.btVector3(val[0], val[1], val[2]);
  //   this._rawConstraint.setAngularUpperLimit(newVal);
  //   bullet.destroy(newVal);
  // }

};


