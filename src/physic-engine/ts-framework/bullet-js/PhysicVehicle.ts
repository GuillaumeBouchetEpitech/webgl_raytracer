
import bulletJsTypes from "../types/bulletJsTypes";

import { WasmModuleHolder } from "./WasmModuleHolder";

import { IPhysicBody, PhysicBodyDef, ConcretePhysicBody } from "./PhysicBody";

// import { ContactDataBody, ContactEventHandler, IContactEventHandler } from "./ContactEventHandler";

import * as glm from "gl-matrix";

export interface PhysicVehicleDef {
  chassisDef: PhysicBodyDef;

  coordinateSystem: glm.vec3;

  groundDirection: glm.vec3;
  rotationAxis: glm.vec3;
  wheelRadius: number;
  wheelWidth: number;
  suspensionRestLength: number;

  wheelFriction: number;
  suspensionStiffness: number;
  wheelsDampingCompression: number;
  wheelsDampingRelaxation: number;
  rollInfluence: number;

  wheels: {
    connectionPoint: glm.vec3;
    isFrontWheel: boolean;
  }[];
}

export interface IPhysicVehicle {

  getChassisBody(): IPhysicBody;
  getWheeTransforms(): { position: glm.vec3, rotation: glm.vec4 }[];

  setSteeringValue(index: number, angle: number): void;
  applyEngineForce(index: number, force: number): void;
  setBrake(index: number, force: number): void;
}

export class ConcretePhysicVehicle implements IPhysicVehicle {

  public _chassisBody: ConcretePhysicBody;

  private _vehicleTuning: bulletJsTypes.btVehicleTuning;
  private _defaultVehicleRaycaster: bulletJsTypes.btDefaultVehicleRaycaster;
  public _rawVehicle: bulletJsTypes.btRaycastVehicle;

  constructor(
    rawDynamicsWorld: bulletJsTypes.btDynamicsWorld,
    chassisBody: ConcretePhysicBody,
    def: PhysicVehicleDef
  ) {

    const bullet = WasmModuleHolder.get();

    this._chassisBody = chassisBody;

    this._vehicleTuning = new bullet.btVehicleTuning();
    this._defaultVehicleRaycaster = new bullet.btDefaultVehicleRaycaster(rawDynamicsWorld);

    this._rawVehicle = new bullet.btRaycastVehicle(this._vehicleTuning, chassisBody._rawRigidBody, this._defaultVehicleRaycaster);

    this._rawVehicle.setCoordinateSystem(def.coordinateSystem[0], def.coordinateSystem[1], def.coordinateSystem[2]);

    const groundDirection = new bullet.btVector3(def.groundDirection[0], def.groundDirection[1], def.groundDirection[2]);
    const rotationAxis = new bullet.btVector3(def.rotationAxis[0], def.rotationAxis[1], def.rotationAxis[2]);
    const connectionPoint = new bullet.btVector3();

    for (let ii = 0; ii < def.wheels.length; ++ii) {

      const current = def.wheels[ii];

      connectionPoint.setValue(current.connectionPoint[0],current.connectionPoint[1],current.connectionPoint[2]);

      const wheelInfo = this._rawVehicle.addWheel(
        connectionPoint, // connectionPointCS0,
        groundDirection, // wheelDirectionCS0,
        rotationAxis, // wheelAxleCS,
        def.suspensionRestLength,
        def.wheelRadius,
        this._vehicleTuning,
        current.isFrontWheel,
      );

      wheelInfo.set_m_suspensionStiffness(def.suspensionStiffness);
      wheelInfo.set_m_wheelsDampingRelaxation(def.wheelsDampingRelaxation);
      wheelInfo.set_m_wheelsDampingCompression(def.wheelsDampingCompression);
      wheelInfo.set_m_frictionSlip(def.wheelFriction);
      wheelInfo.set_m_rollInfluence(def.rollInfluence);
    }

    bullet.destroy(connectionPoint);
    bullet.destroy(groundDirection);
    bullet.destroy(rotationAxis);
  }

  dispose() {

    const bullet = WasmModuleHolder.get();

    bullet.destroy(this._rawVehicle);
    bullet.destroy(this._defaultVehicleRaycaster);
    bullet.destroy(this._vehicleTuning);

  }

  getChassisBody(): IPhysicBody {
    return this._chassisBody;
  }

  setSteeringValue(index: number, angle: number): void {
    this._rawVehicle.setSteeringValue(angle, index);
  }

  applyEngineForce(index: number, force: number): void {
    this._rawVehicle.applyEngineForce(force, index);
  }

  setBrake(index: number, force: number): void {
    this._rawVehicle.setBrake(force, index);
  }

  getWheeTransforms(): { position: glm.vec3, rotation: glm.vec4 }[] {

    const bullet = WasmModuleHolder.get();

    const allTransforms: { position: glm.vec3, rotation: glm.vec4 }[] = [];

    const interpolatedTransform = true;

    const numWheels = this._rawVehicle.getNumWheels()

    for (let ii = 0; ii < numWheels; ++ii) {

      this._rawVehicle.updateWheelTransform(ii, interpolatedTransform);
      const rawTransform = this._rawVehicle.getWheelTransformWS(ii);
      const rawOrigin = rawTransform.getOrigin();
      const rawRotation = rawTransform.getRotation();

      allTransforms.push({
        position: glm.vec3.fromValues(
          rawOrigin.x(),
          rawOrigin.y(),
          rawOrigin.z(),
        ),
        rotation: glm.vec4.fromValues(
          rawRotation.x(),
          rawRotation.y(),
          rawRotation.z(),
          rawRotation.w(),
        ),
      });

      bullet.destroy(rawRotation);
      bullet.destroy(rawOrigin);
      bullet.destroy(rawTransform);
    }

    return allTransforms;
  }


}

