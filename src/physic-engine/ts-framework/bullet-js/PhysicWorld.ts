
import bulletJsTypes from "../types/bulletJsTypes";
import bulletJsExtra from "../types/bulletJs-extra";

import { WasmModuleHolder } from "./WasmModuleHolder";

import { PhysicShapeDef, PhysicBodyDef, IPhysicBody, ConcretePhysicBody } from "./PhysicBody";
import { IPhysicVehicle, ConcretePhysicVehicle, PhysicVehicleDef } from "./PhysicVehicle";
import { Generic6DofConstraintDef, ConcreteGeneric6DofConstraint, IGeneric6DofConstraint } from "./Generic6DofConstraint";
import { HingeConstraintDef, ConcreteHingeConstraint, IHingeConstraint } from "./HingeConstraint";

import { ContactEventHandler, ContactDataWorld, allContactEvents } from "./ContactEventHandler";

import { rayCast } from "./rayCast"
import { convexSweep } from "./convexSweep"

import * as glm from "gl-matrix";

export class PhysicWorld extends ContactEventHandler<ContactDataWorld> {

  private _collisionConf: bulletJsTypes.btDefaultCollisionConfiguration;
  private _dispatcher: bulletJsTypes.btCollisionDispatcher;
  private _broadPhase: bulletJsTypes.btDbvtBroadphase;
  private _solver: bulletJsTypes.btSequentialImpulseConstraintSolver;
  private _rawDynamicsWorld: bulletJsTypes.btjsDynamicsWorld;

  private _bodyMap = new Map<number, ConcretePhysicBody>();
  private _vehicleMap = new Map<number, ConcretePhysicVehicle>();
  private _constraintMap = new Map<number, ConcreteGeneric6DofConstraint[]>();
  private _allConstraints: ConcreteGeneric6DofConstraint[] = [];

  private _constraintMap2 = new Map<number, ConcreteHingeConstraint[]>();
  private _allConstraints2: ConcreteHingeConstraint[] = [];

  // private _queryShape = new QueryShape();

  constructor() {
    super();

    const bullet = WasmModuleHolder.get();

    // bullet.listenToContactCallbacks();

    this._collisionConf = new bullet.btDefaultCollisionConfiguration();
    this._dispatcher = new bullet.btCollisionDispatcher(this._collisionConf);
    this._broadPhase = new bullet.btDbvtBroadphase();
    this._solver = new bullet.btSequentialImpulseConstraintSolver();
    // this._rawDynamicsWorld = new bullet.btDiscreteDynamicsWorld(this._dispatcher, this._broadPhase, this._solver, this._collisionConf);
    this._rawDynamicsWorld = new bullet.btjsDynamicsWorld(this._dispatcher, this._broadPhase, this._solver, this._collisionConf);
    this._rawDynamicsWorld.setGravity(new bullet.btVector3(0, 0, -10));

    this._initCollisionEvents();
  }

  dispose() {
    const bullet = WasmModuleHolder.get();

    this._allConstraints.forEach((currConstraint) => currConstraint.dispose());
    this._allConstraints.length = 0;
    this._constraintMap.clear();

    this._allConstraints2.forEach((currConstraint) => currConstraint.dispose());
    this._allConstraints2.length = 0;
    this._constraintMap2.clear();

    [...this._vehicleMap.values()].forEach((currVehicle) => currVehicle.dispose());
    this._vehicleMap.clear();

    [...this._bodyMap.values()].forEach((currBody) => currBody.dispose());
    this._bodyMap.clear();

    bullet.destroy(this._rawDynamicsWorld);
    bullet.destroy(this._solver);
    bullet.destroy(this._broadPhase);
    bullet.destroy(this._dispatcher);
    bullet.destroy(this._collisionConf);
  }

  createRigidBody(def: PhysicBodyDef): IPhysicBody {

    const newShape = this._getShape(def.shape, def.mass > 0);

    const newBody = new ConcretePhysicBody(def, newShape);

    // if (def.shape.type === 'mesh') {
    //   const meshShape = newBody._rawShape as bulletJs.btGImpactMeshShape;
    //   newBody._rawShape = this._rawDynamicsWorld.createCompoundFromGimpactShape(meshShape, 0);
    // } else {
    // }
    this._rawDynamicsWorld.addRigidBody(newBody._rawRigidBody, -1, -1);

    // hack, we use the wasm heap memory address as an identifier, it's faster
    this._bodyMap.set((newBody._rawRigidBody as any).ptr, newBody);

    return newBody;
  }

  private _getShape(def: PhysicShapeDef, isDynamic: boolean): { shape: bulletJsTypes.btCollisionShape; cleanup: () => void } {

    const bullet = WasmModuleHolder.get();

    switch(def.type) {
      case 'box': {
        const boxHalfExtent = new bullet.btVector3();
        boxHalfExtent.setValue(def.size[0] * 0.5, def.size[1] * 0.5, def.size[2] * 0.5);
        const rawShape = new bullet.btBoxShape(boxHalfExtent);
        bullet.destroy(boxHalfExtent);
        return {
          shape: rawShape,
          cleanup: () => bullet.destroy(rawShape),
        };
      }
      case 'sphere': {
        const rawShape = new bullet.btSphereShape(def.radius);
        return {
          shape: rawShape,
          cleanup: () => bullet.destroy(rawShape),
        };
      }
      case 'cylinder': {
        const bVec = new bullet.btVector3(def.radius, def.radius, def.length);
        const rawShape = new bullet.btCylinderShape(bVec);
        return {
          shape: rawShape,
          cleanup: () => {
            bullet.destroy(rawShape);
            bullet.destroy(bVec);
          },
        };
      }
      case 'capsule': {
        const rawShape = new bullet.btCapsuleShape(def.radius, def.length);
        return {
          shape: rawShape,
          cleanup: () => bullet.destroy(rawShape),
        };
      }
      case 'mesh': {

        // TODO: memory leak
        const triangleMesh = new bullet.btTriangleMesh();

        const bVec1 = new bullet.btVector3();
        const bVec2 = new bullet.btVector3();
        const bVec3 = new bullet.btVector3();

        def.triangles.forEach(([vec1, vec2, vec3]) => {

          bVec1.setValue(vec1[0], vec1[1], vec1[2]);
          bVec2.setValue(vec2[0], vec2[1], vec2[2]);
          bVec3.setValue(vec3[0], vec3[1], vec3[2]);

          triangleMesh.addTriangle(bVec1, bVec2, bVec3);
        });

        bullet.destroy(bVec1);
        bullet.destroy(bVec2);
        bullet.destroy(bVec3);

        if (isDynamic) {
          const meshShape = new bullet.btGImpactMeshShape(triangleMesh);

          const rawShape = this._rawDynamicsWorld.createCompoundFromGimpactShape(meshShape, 0);
          return {
            shape: rawShape,
            cleanup: () => {
              bullet.destroy(rawShape);
              bullet.destroy(meshShape);
              bullet.destroy(triangleMesh);
            },
          };
        }

        const rawShape = new bullet.btBvhTriangleMeshShape(triangleMesh, true);
        return {
          shape: rawShape,
          cleanup: () => {
            bullet.destroy(rawShape);
            bullet.destroy(triangleMesh);
          },
        };


      }
      case 'compound': {

        const rawCompound = new bullet.btCompoundShape();

        const allRawShapes: { shape: bulletJsTypes.btCollisionShape; cleanup: () => void }[] = [];

        const localVec3 = new bullet.btVector3();
        const localQuat = new bullet.btQuaternion(0,0,1,0);
        const localTransform = new bullet.btTransform();

        for (const {shape, position, orientation} of def.shapes) {

          const rawValues = this._getShape(shape, isDynamic);

          allRawShapes.push(rawValues);

          localVec3.setValue(position[0],position[1],position[2]);
          localQuat.setValue(orientation[0],orientation[1],orientation[2],orientation[3]);
          localTransform.setOrigin(localVec3);
          localTransform.setRotation(localQuat);

          rawCompound.addChildShape(localTransform, rawValues.shape);

          // currShape.position
          // currShape.orientation
          // currShape.shape
        }

        bullet.destroy(localVec3);
        bullet.destroy(localQuat);
        bullet.destroy(localTransform);

        return {
          shape: rawCompound,
          cleanup: () => {
            bullet.destroy(rawCompound);
            for (const currRawShape of allRawShapes) {
              bullet.destroy(currRawShape);
            }
          },
        };
      }
    }
  }

  destroyRigidBody(rigidBody: IPhysicBody) {
    const rawRigidBody = (rigidBody as ConcretePhysicBody)._rawRigidBody;

    const bodyPtr = (rawRigidBody as any).ptr;

    this._rawDynamicsWorld.removeRigidBody(rawRigidBody);

    // hack, we use the wasm heap memory address as an identifier, it's faster
    this._bodyMap.delete(bodyPtr);

    (rigidBody as ConcretePhysicBody).dispose();

    // destroy any constraints that might affect this body
    const bodyListOfConstraints = this._constraintMap.get(bodyPtr);
    if (bodyListOfConstraints) {
      for (const currConstraint of bodyListOfConstraints) {
        this.destroyGeneric6DofConstraint(currConstraint);
      }
    }

    // destroy any constraints that might affect this body
    const bodyListOfConstraints2 = this._constraintMap2.get(bodyPtr);
    if (bodyListOfConstraints2) {
      for (const currConstraint of bodyListOfConstraints2) {
        this.destroyHingeConstraint(currConstraint);
      }
    }

    // TODO: zombie bodies could still be ref/used, can it be prevented?
    // -> raw rigid body is set to null inside
    // -> should find a friendlier way
  }

  createVehicle(def: PhysicVehicleDef): IPhysicVehicle {

    const newBody = this.createRigidBody(def.chassisDef);

    const rawRigidBody = newBody as ConcretePhysicBody;

    const vehicle = new ConcretePhysicVehicle(this._rawDynamicsWorld, rawRigidBody, def);

    this._rawDynamicsWorld.addAction(vehicle._rawVehicle);

    // hack, we use the wasm heap memory address as an identifier, it's faster
    this._vehicleMap.set((vehicle as any).ptr, vehicle);

    return vehicle;
  }

  destroyVehicle(vehicle: IPhysicVehicle) {

    this.destroyRigidBody((vehicle as ConcretePhysicVehicle)._chassisBody);

    this._rawDynamicsWorld.removeAction((vehicle as ConcretePhysicVehicle)._rawVehicle);

    // hack, we use the wasm heap memory address as an identifier, it's faster
    this._vehicleMap.delete((vehicle as any).ptr);

    (vehicle as ConcretePhysicVehicle).dispose();

    // TODO: zombie vehicles could still be ref/used, can it be prevented?
  }

  createGeneric6DofConstraint(def: Generic6DofConstraintDef): IGeneric6DofConstraint {

    const constraint = new ConcreteGeneric6DofConstraint(def);

    // get or create
    const ptrA = ((def.bodyA as ConcretePhysicBody)._rawRigidBody as any).ptr;
    let bodyListA = this._constraintMap.get(ptrA);
    if (!bodyListA) {
      bodyListA = [];
      this._constraintMap.set(ptrA, bodyListA);
    }
    // save constraint against bodyA pointer value
    bodyListA.push(constraint);

    // get or create
    const ptrB = ((def.bodyB as ConcretePhysicBody)._rawRigidBody as any).ptr;
    let bodyListB = this._constraintMap.get(ptrB);
    if (!bodyListB) {
      bodyListB = [];
      this._constraintMap.set(ptrA, bodyListB);
    }
    // save constraint against bodyB pointer value
    bodyListB.push(constraint);

    this._allConstraints.push(constraint);

    this._rawDynamicsWorld.addConstraint(constraint._rawConstraint, true);

    // TODO: save in map
    // TODO: discard if one of the body is removed

    return constraint;
  }

  destroyGeneric6DofConstraint(constraint: IGeneric6DofConstraint): void {

    const concrete = (constraint as ConcreteGeneric6DofConstraint);

    this._rawDynamicsWorld.removeConstraint(concrete._rawConstraint);

    // remove constraints from the map value (bodyA)
    const bodyListA = this._constraintMap.get(((concrete._bodyA as ConcretePhysicBody)._rawRigidBody as any).ptr);
    if (bodyListA) {
      // find the constraint and remove it
      const index = bodyListA.indexOf(concrete);
      if (index >= 0) {
        bodyListA.splice(index, 0);
      }
    }

    // remove constraints from the map (bodyB)
    const bodyListB = this._constraintMap.get(((concrete._bodyB as ConcretePhysicBody)._rawRigidBody as any).ptr);
    if (bodyListB) {
      // find the constraint and remove it
      const index = bodyListB.indexOf(concrete);
      if (index >= 0) {
        bodyListB.splice(index, 0);
      }
    }

    // remove from list of all constraints
    const index = this._allConstraints.indexOf(concrete);
    if (index >= 0) {
      this._allConstraints.splice(index, 0);
    }

    concrete.dispose();
  }

  createHingeConstraint(def: HingeConstraintDef): IHingeConstraint {

    const constraint = new ConcreteHingeConstraint(def);

    // get or create
    const ptrA = ((def.bodyA as ConcretePhysicBody)._rawRigidBody as any).ptr;
    let bodyListA = this._constraintMap2.get(ptrA);
    if (!bodyListA) {
      bodyListA = [];
      this._constraintMap2.set(ptrA, bodyListA);
    }
    // save constraint against bodyA pointer value
    bodyListA.push(constraint);

    // get or create
    const ptrB = ((def.bodyB as ConcretePhysicBody)._rawRigidBody as any).ptr;
    let bodyListB = this._constraintMap2.get(ptrB);
    if (!bodyListB) {
      bodyListB = [];
      this._constraintMap2.set(ptrA, bodyListB);
    }
    // save constraint against bodyB pointer value
    bodyListB.push(constraint);

    this._allConstraints2.push(constraint);

    this._rawDynamicsWorld.addConstraint(constraint._rawConstraint, true);

    // TODO: save in map
    // TODO: discard if one of the body is removed

    return constraint;
  }

  destroyHingeConstraint(constraint: IHingeConstraint): void {

    const concrete = (constraint as ConcreteHingeConstraint);

    this._rawDynamicsWorld.removeConstraint(concrete._rawConstraint);

    // remove constraints from the map value (bodyA)
    const bodyListA = this._constraintMap2.get(((concrete._bodyA as ConcretePhysicBody)._rawRigidBody as any).ptr);
    if (bodyListA) {
      // find the constraint and remove it
      const index = bodyListA.indexOf(concrete);
      if (index >= 0) {
        bodyListA.splice(index, 0);
      }
    }

    // remove constraints from the map (bodyB)
    const bodyListB = this._constraintMap2.get(((concrete._bodyB as ConcretePhysicBody)._rawRigidBody as any).ptr);
    if (bodyListB) {
      // find the constraint and remove it
      const index = bodyListB.indexOf(concrete);
      if (index >= 0) {
        bodyListB.splice(index, 0);
      }
    }

    // remove from list of all constraints
    const index = this._allConstraints2.indexOf(concrete);
    if (index >= 0) {
      this._allConstraints2.splice(index, 0);
    }

    concrete.dispose();
  }

  rayCast(
    from: glm.ReadonlyVec3,
    to: glm.ReadonlyVec3
  ): {
    object: IPhysicBody,
    fraction: number,
    impact: glm.vec3,
    normal: glm.vec3
  } | undefined {
    return rayCast(this._rawDynamicsWorld, this._bodyMap, {
      from,
      to,
      collisionFilterGroup: -1,
      collisionFilterMask: -1
    });
  }

  convexSweep(
    from: glm.ReadonlyVec3,
    to: glm.ReadonlyVec3,
    radius: number
  ): {
    fraction: number,
    impact: glm.vec3,
    normal: glm.vec3
  } | undefined {
    return convexSweep(this._rawDynamicsWorld, {
      from,
      to,
      collisionFilterGroup: -1,
      collisionFilterMask: -1,
      radius: radius
    });
  }

  private _initCollisionEvents(): void {

    const eventFlags = {
        world: 1<<0,
        bodyA: 1<<1,
        bodyB: 1<<2
    };

    const _onContactChange = (event: { type: allContactEvents, data: bulletJsExtra.btjsContactData }) => {

        const bodyA = event.data.getBodyA();
        const bodyB = event.data.getBodyB();

        const rigidBodyA = this._bodyMap.get(bodyA.ptr);
        const rigidBodyB = this._bodyMap.get(bodyB.ptr);

        // console.log('_onContactChange');

        if (!rigidBodyA || !rigidBodyB) {
          return;
        }

        const type = event.type;

        const collisionFlag = (
            (this.isEventListenedTo(type) ? eventFlags.world : 0) |
            (rigidBodyA.isEventListenedTo(type) ? eventFlags.bodyA : 0) |
            (rigidBodyB.isEventListenedTo(type) ? eventFlags.bodyB : 0)
        );

        if (collisionFlag == 0) {
          return;
        }

        const contactId = event.data.getId();
        const bulletPos = event.data.getPosition();
        const bulletNormalB = event.data.getNormalB();

        const position = {
            x: bulletPos.x(),
            y: bulletPos.y(),
            z: bulletPos.z(),
        };

        const normalB = {
            x: bulletNormalB.x(),
            y: bulletNormalB.y(),
            z: bulletNormalB.z(),
        };

        if (collisionFlag & eventFlags.world) {
          this.dispatchEvent({
            type,
            data: {
              contactId,
              rigidBodyA,
              rigidBodyB,
              position: glm.vec3.fromValues(position.x, position.y, position.z),
              normalB: glm.vec3.fromValues(normalB.x, normalB.y, normalB.z),
            }
          });
        }

        if (collisionFlag & eventFlags.bodyA) {
          rigidBodyA.dispatchEvent({
            type,
            data: {
              contactId,
              other: rigidBodyB,
              // position: { x: position.x, y: position.y, z: position.z },
              // normalB: { x: -normalB.x, y: -normalB.y, z: -normalB.z }
              position: glm.vec3.fromValues(position.x, position.y, position.z),
              normalB: glm.vec3.fromValues(-normalB.x, -normalB.y, -normalB.z),
            }
          });
        }

        if (collisionFlag & eventFlags.bodyB) {
          rigidBodyB.dispatchEvent({
            type,
            data: {
              contactId,
              other: rigidBodyA,
              // position: { x: position.x, y: position.y, z: position.z },
              // normalB: { x: normalB.x, y: normalB.y, z: normalB.z }
              position: glm.vec3.fromValues(position.x, position.y, position.z),
              normalB: glm.vec3.fromValues(normalB.x, normalB.y, normalB.z),
            }
          });
        }
    }

    // TODO: hacky
    const bullet = WasmModuleHolder.get() as unknown as typeof bulletJsExtra;

    bullet.on("beginContact", _onContactChange);
    bullet.on("updateContact", _onContactChange);
    bullet.on("endContact", _onContactChange);
    bullet.on("ccdContact", _onContactChange);

    bullet.listenToContactCallbacks();
  }

  stepSimulation(deltaTimeSec: number, maxSubSteps = 3, fixedStep = 1/60) {
    this._rawDynamicsWorld.stepSimulation(deltaTimeSec, maxSubSteps, fixedStep);
  }

  setGravity(x: number, y: number, z: number) {
    const bullet = WasmModuleHolder.get();
    const newVel = new bullet.btVector3(x, y, z);
    this._rawDynamicsWorld.setGravity(newVel);
    bullet.destroy(newVel);
  }

};
