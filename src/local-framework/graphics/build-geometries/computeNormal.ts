import * as glm from 'gl-matrix';

export const computeNormal = (
  inPosA: glm.ReadonlyVec3,
  inPosB: glm.ReadonlyVec3,
  inPosC: glm.ReadonlyVec3
): glm.vec3 => {
  const normal = glm.vec3.cross(
    glm.vec3.create(),
    glm.vec3.sub(glm.vec3.create(), inPosA, inPosB),
    glm.vec3.sub(glm.vec3.create(), inPosA, inPosC)
  );
  const magnitude = glm.vec3.length(normal);
  if (magnitude > 0) {
    normal[0] /= magnitude;
    normal[1] /= magnitude;
    normal[2] /= magnitude;
  }
  return normal;
};
