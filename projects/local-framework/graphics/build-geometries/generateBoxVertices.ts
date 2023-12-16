
import * as glm from 'gl-matrix';

export const generateBoxVertices = (inSize: glm.ReadonlyVec3): number[] => {

  const hSizeX = inSize[0] * 0.5;
  const hSizeY = inSize[1] * 0.5;
  const hSizeZ = inSize[2] * 0.5;

  const k_normals: glm.ReadonlyVec3[] = [
    [-1, 0, 0], // 0
    [+1, 0, 0], // 1
    [0, -1, 0], // 2
    [0, +1, 0], // 3
    [0, 0, -1], // 4
    [0, 0, +1], // 5
  ];

  const k_vertices: glm.ReadonlyVec3[] = [
    [-hSizeX, -hSizeY, -hSizeZ], // 0
    [+hSizeX, -hSizeY, -hSizeZ], // 1
    [-hSizeX, +hSizeY, -hSizeZ], // 2
    [+hSizeX, +hSizeY, -hSizeZ], // 3
    [-hSizeX, -hSizeY, +hSizeZ], // 4
    [+hSizeX, -hSizeY, +hSizeZ], // 5
    [-hSizeX, +hSizeY, +hSizeZ], // 6
    [+hSizeX, +hSizeY, +hSizeZ], // 7
  ];

  const k_indices: glm.ReadonlyVec4[] = [
    // -z 0123
    [0, 2, 1, /*normal => */ 4],
    [2, 3, 1, /*normal => */ 4],
    // +z 4567
    [4, 5, 6, /*normal => */ 5],
    [6, 5, 7, /*normal => */ 5],

    // +x 1357
    [1, 3, 5, /*normal => */ 1],
    [5, 3, 7, /*normal => */ 1],
    // -x 0246
    [0, 4, 2, /*normal => */ 0],
    [4, 6, 2, /*normal => */ 0],

    // +y 2367
    [2, 6, 3, /*normal => */ 3],
    [6, 7, 3, /*normal => */ 3],
    // -y 0145
    [0, 1, 4, /*normal => */ 2],
    [4, 1, 5, /*normal => */ 2],
  ];

  const vertices: number[] = [];

  for (const index of k_indices) {
    const vertex1 = k_vertices[index[0]];
    const vertex2 = k_vertices[index[1]];
    const vertex3 = k_vertices[index[2]];
    const normal = k_normals[index[3]];
    vertices.push(
      vertex1[0],
      vertex1[1],
      vertex1[2],
      normal[0],
      normal[1],
      normal[2],
      vertex2[0],
      vertex2[1],
      vertex2[2],
      normal[0],
      normal[1],
      normal[2],
      vertex3[0],
      vertex3[1],
      vertex3[2],
      normal[0],
      normal[1],
      normal[2],
    );
  }

  return vertices;
};
