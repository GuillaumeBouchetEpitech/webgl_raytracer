
import * as glm from 'gl-matrix';

export const safeNormalize = (output: glm.vec3, input: glm.ReadonlyVec3): glm.vec3 => {

  const length = glm.vec3.length(input);
  if (length > 0) {
    // output[0] = input[0] * (1/length)
    // output[1] = input[1] * (1/length)
    // output[2] = input[2] * (1/length)
    glm.vec3.scale(output, input, 1.0 / length);
  } else {
    glm.vec3.set(output, 0, 0, 0);
  }
  return output;
}
