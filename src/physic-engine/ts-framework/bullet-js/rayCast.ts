
import bulletJsTypes from "../types/bulletJsTypes";

import { WasmModuleHolder } from "./WasmModuleHolder";

import { IPhysicBody, ConcretePhysicBody } from "./PhysicBody";

import * as glm from "gl-matrix";

export interface IRayCastDef {
  from: glm.ReadonlyVec3;
  to: glm.ReadonlyVec3;
  collisionFilterGroup: number;
  collisionFilterMask: number;
};

export const rayCast = (
  rawDynamicsWorld: bulletJsTypes.btjsDynamicsWorld,
  bodyMap: Map<number, ConcretePhysicBody>,
  def: IRayCastDef
): {
  object: IPhysicBody;
  fraction: number;
  impact: glm.vec3;
  normal: glm.vec3;
} | undefined => {

  const bullet = WasmModuleHolder.get();

  const fromVec3 = new bullet.btVector3(def.from[0], def.from[1], def.from[2]);
  const toVec3 = new bullet.btVector3(def.to[0], def.to[1], def.to[2]);
  const result = new bullet.ClosestRayResultCallback(fromVec3, toVec3);

  result.set_m_collisionFilterGroup(def.collisionFilterGroup);
  result.set_m_collisionFilterMask(def.collisionFilterMask);

  rawDynamicsWorld.rayTest(fromVec3, toVec3, result);

  if (!result.hasHit()) {
    bullet.destroy(fromVec3);
    bullet.destroy(toVec3);
    bullet.destroy(result);
    return;
  }
  const object = bodyMap.get((result.get_m_collisionObject() as any).ptr);
  if (!object) {
    bullet.destroy(fromVec3);
    bullet.destroy(toVec3);
    bullet.destroy(result);
    return;
  }
  // get_m_closestHitFraction(): number;

  // get_m_collisionObject(): btCollisionObject;

  const rawNormal = result.get_m_hitNormalWorld();
  const rawPosition = result.get_m_hitPointWorld();

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

  return {
    object,
    fraction: result.get_m_closestHitFraction(),
    impact,
    normal,
  };

};

