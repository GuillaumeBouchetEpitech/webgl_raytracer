
import * as glm from 'gl-matrix';

import {computeNormal} from "./computeNormal"

export const convertToPerFacesNormals = (vertices: number[]) => {
  for (let index = 0; index < vertices.length; index += 6 * 3) {

    const indexA = index + 6 * 0;
    const indexB = index + 6 * 1;
    const indexC = index + 6 * 2;

    const posA: glm.ReadonlyVec3 = [vertices[indexA + 0], vertices[indexA + 1], vertices[indexA + 2]];
    const posB: glm.ReadonlyVec3 = [vertices[indexB + 0], vertices[indexB + 1], vertices[indexB + 2]];
    const posC: glm.ReadonlyVec3 = [vertices[indexC + 0], vertices[indexC + 1], vertices[indexC + 2]];

    const normal = computeNormal(posA, posB, posC);

    vertices[indexA + 3] = normal[0];
    vertices[indexA + 4] = normal[1];
    vertices[indexA + 5] = normal[2];
    vertices[indexB + 3] = normal[0];
    vertices[indexB + 4] = normal[1];
    vertices[indexB + 5] = normal[2];
    vertices[indexC + 3] = normal[0];
    vertices[indexC + 4] = normal[1];
    vertices[indexC + 5] = normal[2];
  }
};

