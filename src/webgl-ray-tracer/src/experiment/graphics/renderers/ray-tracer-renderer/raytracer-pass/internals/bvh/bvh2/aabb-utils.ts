
import * as glm from 'gl-matrix';

export interface AABB {
  min: glm.ReadonlyVec3;
  max: glm.ReadonlyVec3;
};

export interface MutableAABB {
  min: glm.vec3;
  max: glm.vec3;
};

export const setAabbFromAabbList = (inAABB: MutableAABB, allAABBs: ReadonlyArray<AABB>): MutableAABB => {
  glm.vec3.set(inAABB.min, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
  glm.vec3.set(inAABB.max, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
  for (const currAABB of allAABBs) {
    glm.vec3.min(inAABB.min, inAABB.min, currAABB.min);
    glm.vec3.max(inAABB.max, inAABB.max, currAABB.max);
  }
  return inAABB;
};

export const computeSurfaceArea = (inAabb: AABB): number => {
  const dx = Math.abs(inAabb.max[0] - inAabb.min[0]);
  const dy = Math.abs(inAabb.max[1] - inAabb.min[1]);
  const dz = Math.abs(inAabb.max[2] - inAabb.min[2]);
  return 2 * (dx * dy + dy * dz + dz * dx);
};

export const computeCenter = (inAabb: AABB): glm.vec3 => {
  return glm.vec3.fromValues(
    (inAabb.min[0] + inAabb.max[0]) * 0.5,
    (inAabb.min[1] + inAabb.max[1]) * 0.5,
    (inAabb.min[2] + inAabb.max[2]) * 0.5,
  );
};

export const growAabbFromAabb = (out: MutableAABB, input: AABB): MutableAABB => {
  glm.vec3.min(out.min, out.min, input.min);
  glm.vec3.max(out.max, out.max, input.max);
  return out;
};



