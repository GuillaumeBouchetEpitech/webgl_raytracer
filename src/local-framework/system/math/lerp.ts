

import * as glm from 'gl-matrix';

export const lerpFloat = (valA: number, valB: number, ratio: number) => valA + (valB - valA) * ratio;
export const lerpVec3 = (out: glm.vec3, valA: glm.ReadonlyVec3, valB: glm.ReadonlyVec3, ratio: number) => {
  return glm.vec3.lerp(out, valA, valB, ratio);
};
export const lerpQuat = (out: glm.quat, valA: glm.ReadonlyQuat, valB: glm.ReadonlyQuat, ratio: number) => {
  return glm.quat.slerp(out, valA, valB, ratio);
};
