
import * as glm from 'gl-matrix';
import { IInternalBox, IInternalSphere, IInternalTriangle, IStackRenderer } from '../all-interfaces';

import { BvhTreeNode, IShape } from './BvhTreeNode';

const k_minDelta = 0.01;

export class BvhTree {

  private _allShapes: IShape[] = [];

  private _rootNode?: BvhTreeNode;

  constructor() {
  }

  reset() {
    this._allShapes.length = 0;
    this._rootNode = undefined;
  }

  synchronize(
    allSpheres: ReadonlyArray<IInternalSphere>,
    allBoxes: ReadonlyArray<IInternalBox>,
    allTriangles: ReadonlyArray<IInternalTriangle>,
  ) {

    this.reset();

    // setup the generic shape list
    let index = 0;
    for (const currShape of allSpheres) {

      const min = glm.vec3.fromValues(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
      const max = glm.vec3.fromValues(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);

      min[0] = Math.min(min[0], currShape.position[0] - currShape.radius);
      min[1] = Math.min(min[1], currShape.position[1] - currShape.radius);
      min[2] = Math.min(min[2], currShape.position[2] - currShape.radius);
      max[0] = Math.max(max[0], currShape.position[0] + currShape.radius);
      max[1] = Math.max(max[1], currShape.position[1] + currShape.radius);
      max[2] = Math.max(max[2], currShape.position[2] + currShape.radius);

      // here we ensure the shape is not "paper flat" on any of its axises
      if (max[0] - min[0] < k_minDelta) { max[0] += k_minDelta; }
      if (max[1] - min[1] < k_minDelta) { max[1] += k_minDelta; }
      if (max[2] - min[2] < k_minDelta) { max[2] += k_minDelta; }

      this._allShapes.push({ index: index++, type: 'sphere', shape: currShape, min, max });
    }

    for (const currShape of allBoxes) {

      const min = glm.vec3.fromValues(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
      const max = glm.vec3.fromValues(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);

      const allBoxCorners: ReadonlyArray<glm.ReadonlyVec3> = [
        glm.vec3.fromValues(-currShape.boxSize[0], -currShape.boxSize[1], -currShape.boxSize[2]),
        glm.vec3.fromValues(+currShape.boxSize[0], -currShape.boxSize[1], -currShape.boxSize[2]),
        glm.vec3.fromValues(-currShape.boxSize[0], +currShape.boxSize[1], -currShape.boxSize[2]),
        glm.vec3.fromValues(+currShape.boxSize[0], +currShape.boxSize[1], -currShape.boxSize[2]),
        glm.vec3.fromValues(-currShape.boxSize[0], -currShape.boxSize[1], +currShape.boxSize[2]),
        glm.vec3.fromValues(+currShape.boxSize[0], -currShape.boxSize[1], +currShape.boxSize[2]),
        glm.vec3.fromValues(-currShape.boxSize[0], +currShape.boxSize[1], +currShape.boxSize[2]),
        glm.vec3.fromValues(+currShape.boxSize[0], +currShape.boxSize[1], +currShape.boxSize[2]),
      ];

      // need to apply the box transformation to the corners (translation, then rotation)
      allBoxCorners.forEach((vertex) => {
        const pos = glm.vec3.fromValues(0, 0, 0);

        const mat4 = glm.mat4.identity(glm.mat4.create());
        glm.mat4.translate(mat4, mat4, currShape.position);
        const mat4b = glm.mat4.fromQuat(glm.mat4.create(), currShape.orientation);
        glm.mat4.multiply(mat4, mat4, mat4b);

        glm.vec3.transformMat4(pos, vertex, mat4);

        min[0] = Math.min(min[0], pos[0]);
        min[1] = Math.min(min[1], pos[1]);
        min[2] = Math.min(min[2], pos[2]);
        max[0] = Math.max(max[0], pos[0]);
        max[1] = Math.max(max[1], pos[1]);
        max[2] = Math.max(max[2], pos[2]);
      });

      // here we ensure the shape is not "paper flat" on any of its axises
      if (max[0] - min[0] < k_minDelta) { max[0] += k_minDelta; }
      if (max[1] - min[1] < k_minDelta) { max[1] += k_minDelta; }
      if (max[2] - min[2] < k_minDelta) { max[2] += k_minDelta; }

      this._allShapes.push({ index: index++, type: 'box', shape: currShape, min, max });
    }

    for (const currShape of allTriangles) {

      const min = glm.vec3.fromValues(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
      const max = glm.vec3.fromValues(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);

      min[0] = Math.min(min[0], currShape.v0[0]);
      min[1] = Math.min(min[1], currShape.v0[1]);
      min[2] = Math.min(min[2], currShape.v0[2]);
      max[0] = Math.max(max[0], currShape.v0[0]);
      max[1] = Math.max(max[1], currShape.v0[1]);
      max[2] = Math.max(max[2], currShape.v0[2]);

      min[0] = Math.min(min[0], currShape.v1[0]);
      min[1] = Math.min(min[1], currShape.v1[1]);
      min[2] = Math.min(min[2], currShape.v1[2]);
      max[0] = Math.max(max[0], currShape.v1[0]);
      max[1] = Math.max(max[1], currShape.v1[1]);
      max[2] = Math.max(max[2], currShape.v1[2]);

      min[0] = Math.min(min[0], currShape.v2[0]);
      min[1] = Math.min(min[1], currShape.v2[1]);
      min[2] = Math.min(min[2], currShape.v2[2]);
      max[0] = Math.max(max[0], currShape.v2[0]);
      max[1] = Math.max(max[1], currShape.v2[1]);
      max[2] = Math.max(max[2], currShape.v2[2]);

      // here we ensure the shape is not "paper flat" on any of its axises
      if (max[0] - min[0] < k_minDelta) { max[0] += k_minDelta; }
      if (max[1] - min[1] < k_minDelta) { max[1] += k_minDelta; }
      if (max[2] - min[2] < k_minDelta) { max[2] += k_minDelta; }

      this._allShapes.push({ index: index++, type: 'triangle', shape: currShape, min, max });
    }

    // create root node
    const min = glm.vec3.fromValues(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
    const max = glm.vec3.fromValues(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
    for (const currShape of this._allShapes) {

      min[0] = Math.min(min[0], currShape.min[0]);
      min[1] = Math.min(min[1], currShape.min[1]);
      min[2] = Math.min(min[2], currShape.min[2]);
      max[0] = Math.max(max[0], currShape.max[0]);
      max[1] = Math.max(max[1], currShape.max[1]);
      max[2] = Math.max(max[2], currShape.max[2]);
    }

    this._rootNode = BvhTreeNode.buildBvhGraph(min, max, this._allShapes);
  }

  getRootNode(): BvhTreeNode | undefined {
    return this._rootNode;
  }

};
