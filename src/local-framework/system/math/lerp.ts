
import * as glm from 'gl-matrix';

export const lerp = (ratio: number, minVal: number, maxVal: number): number =>
  minVal + (maxVal - minVal) * ratio;


export const lerpVec3 = (input: glm.vec3, ratio: number, minVal: glm.ReadonlyVec3, maxVal: glm.ReadonlyVec3): glm.vec3 => {
  input[0] = lerp(ratio, minVal[0], maxVal[0]);
  input[1] = lerp(ratio, minVal[1], maxVal[1]);
  input[2] = lerp(ratio, minVal[2], maxVal[2]);
  return input;
}
