import * as glm from 'gl-matrix';

import { convertToPerFacesNormals } from './convertToPerFacesNormals';

const _exploreSpherePatch = (
  quality: number,
  v01: glm.ReadonlyVec3,
  v02: glm.ReadonlyVec3,
  v03: glm.ReadonlyVec3,
  onTriangle: (
    normal1: glm.ReadonlyVec3,
    normal2: glm.ReadonlyVec3,
    normal3: glm.ReadonlyVec3
  ) => void
) => {
  if (quality <= 0) {
    onTriangle(v02, v01, v03);
  } else {
    const v12 = glm.vec3.normalize(
      glm.vec3.create(),
      glm.vec3.lerp(glm.vec3.create(), v01, v02, 0.5)
    );
    const v23 = glm.vec3.normalize(
      glm.vec3.create(),
      glm.vec3.lerp(glm.vec3.create(), v02, v03, 0.5)
    );
    const v31 = glm.vec3.normalize(
      glm.vec3.create(),
      glm.vec3.lerp(glm.vec3.create(), v03, v01, 0.5)
    );

    quality -= 1;

    _exploreSpherePatch(quality, v01, v12, v31, onTriangle);
    _exploreSpherePatch(quality, v12, v02, v23, onTriangle);
    _exploreSpherePatch(quality, v31, v23, v03, onTriangle);
    _exploreSpherePatch(quality, v12, v23, v31, onTriangle);
  }
};

export const generateSphereTriangles = (
  quality: number,
  onTriangle: (
    normal1: glm.ReadonlyVec3,
    normal2: glm.ReadonlyVec3,
    normal3: glm.ReadonlyVec3
  ) => void
): void => {
  const k_icx = 0.525731112119133606;
  const k_icz = 0.850650808352039932;

  const tmpVertices: glm.ReadonlyVec3[] = [
    [-k_icx, 0.0, +k_icz],
    [+k_icx, 0.0, +k_icz],
    [-k_icx, 0.0, -k_icz],
    [+k_icx, 0.0, -k_icz],
    [0.0, +k_icz, +k_icx],
    [0.0, +k_icz, -k_icx],
    [0.0, -k_icz, +k_icx],
    [0.0, -k_icz, -k_icx],
    [+k_icz, +k_icx, 0.0],
    [-k_icz, +k_icx, 0.0],
    [+k_icz, -k_icx, 0.0],
    [-k_icz, -k_icx, 0.0]
  ];

  const tmpIndices: glm.ReadonlyVec3[] = [
    [0, 4, 1],
    [0, 9, 4],
    [9, 5, 4],
    [4, 5, 8],
    [4, 8, 1],
    [8, 10, 1],
    [8, 3, 10],
    [5, 3, 8],
    [5, 2, 3],
    [2, 7, 3],
    [7, 10, 3],
    [7, 6, 10],
    [7, 11, 6],
    [11, 0, 6],
    [0, 1, 6],
    [6, 1, 10],
    [9, 0, 11],
    [9, 11, 2],
    [9, 2, 5],
    [7, 2, 11]
  ];

  for (const index of tmpIndices) {
    _exploreSpherePatch(
      quality,
      tmpVertices[index[0]],
      tmpVertices[index[1]],
      tmpVertices[index[2]],
      onTriangle
    );
  }
};

export const generateSphereVertices = (
  quality: number,
  radius: number,
  modelMat4: glm.ReadonlyMat4,
  perFaceNormals: boolean = false
): number[] => {
  const vertices: number[] = [];

  const tmpVec3A = glm.vec3.create();
  const tmpVec3B = glm.vec3.create();

  generateSphereTriangles(
    quality,
    (
      normal1: glm.ReadonlyVec3,
      normal2: glm.ReadonlyVec3,
      normal3: glm.ReadonlyVec3
    ) => {
      tmpVec3A[0] = tmpVec3A[1] = tmpVec3A[2] = 0;
      glm.vec3.transformMat4(tmpVec3A, normal1, modelMat4);
      glm.vec3.scale(tmpVec3B, tmpVec3A, radius),
        vertices.push(
          tmpVec3B[0],
          tmpVec3B[1],
          tmpVec3B[2],
          tmpVec3A[0],
          tmpVec3A[1],
          tmpVec3A[2]
        );

      tmpVec3A[0] = tmpVec3A[1] = tmpVec3A[2] = 0;
      glm.vec3.transformMat4(tmpVec3A, normal2, modelMat4);
      glm.vec3.scale(tmpVec3B, tmpVec3A, radius),
        vertices.push(
          tmpVec3B[0],
          tmpVec3B[1],
          tmpVec3B[2],
          tmpVec3A[0],
          tmpVec3A[1],
          tmpVec3A[2]
        );

      tmpVec3A[0] = tmpVec3A[1] = tmpVec3A[2] = 0;
      glm.vec3.transformMat4(tmpVec3A, normal3, modelMat4);
      glm.vec3.scale(tmpVec3B, tmpVec3A, radius),
        vertices.push(
          tmpVec3B[0],
          tmpVec3B[1],
          tmpVec3B[2],
          tmpVec3A[0],
          tmpVec3A[1],
          tmpVec3A[2]
        );
    }
  );

  if (perFaceNormals) {
    convertToPerFacesNormals(vertices);
  }

  return vertices;
};
