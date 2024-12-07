
import bulletJsTypes from "../types/bulletJsTypes";

import { WasmModuleHolder } from "./WasmModuleHolder";

import * as glm from "gl-matrix";

export interface IConvexSweepDef {
  from: glm.ReadonlyVec3;
  to: glm.ReadonlyVec3;
  collisionFilterGroup: number;
  collisionFilterMask: number;
  radius: number;
};

export const convexSweep = (
  rawDynamicsWorld: bulletJsTypes.btjsDynamicsWorld,
  def: IConvexSweepDef
): {
  fraction: number;
  impact: glm.vec3;
  normal: glm.vec3;
} | undefined => {

  const bullet = WasmModuleHolder.get();

  const fromVec3 = new bullet.btVector3(def.from[0], def.from[1], def.from[2]);
  const toVec3 = new bullet.btVector3(def.to[0], def.to[1], def.to[2]);

  const fromTrsf = new bullet.btTransform();
  fromTrsf.setIdentity();
  fromTrsf.setOrigin(fromVec3);
  const toTrsf = new bullet.btTransform();
  toTrsf.setIdentity();
  toTrsf.setOrigin(toVec3);

  const result = new bullet.ClosestConvexResultCallback(fromVec3, toVec3);

  result.set_m_collisionFilterGroup(def.collisionFilterGroup);
  result.set_m_collisionFilterMask(def.collisionFilterMask);

  const shape = new bullet.btSphereShape(def.radius);

  rawDynamicsWorld.convexSweepTest(shape, fromTrsf, toTrsf, result, 0);

  if (!result.hasHit()) {
    bullet.destroy(fromVec3);
    bullet.destroy(toVec3);
    bullet.destroy(result);
    bullet.destroy(shape);
    bullet.destroy(fromTrsf);
    bullet.destroy(toTrsf);
    return;
  }
  // const object = bodyMap.get((result.get() as any).ptr);
  // if (!object) {
  //   bullet.destroy(fromVec3);
  //   bullet.destroy(toVec3);
  //   bullet.destroy(result);
  //   return;
  // }
  // get_m_closestHitFraction(): number;

  // get_m_collisionObject(): btCollisionObject;

  const rawPosition = result.get_m_hitPointWorld();
  const rawNormal = result.get_m_hitNormalWorld();
  const fraction = result.get_m_closestHitFraction();

  const impact = glm.vec3.fromValues(
    rawPosition.x(),
    rawPosition.y(),
    rawPosition.z(),
  );
  const normal = glm.vec3.fromValues(
    rawNormal.x(),
    rawNormal.y(),
    rawNormal.z(),
  );

  bullet.destroy(rawNormal);
  bullet.destroy(rawPosition);

  bullet.destroy(fromVec3);
  bullet.destroy(toVec3);
  bullet.destroy(result);
  bullet.destroy(shape);
  bullet.destroy(fromTrsf);
  bullet.destroy(toTrsf);

  return { fraction, impact, normal };
};

