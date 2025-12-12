
import * as glm from 'gl-matrix';
import { IInternalBox, IInternalSphere, IInternalTriangle } from '../../all-interfaces';

import { BvhTreeNode, IBvhEntry } from './BvhTreeNode';
import { BvhTree } from './BvhTree';

const k_minDelta = 0.01;

export interface ISphereShape extends IBvhEntry {
  shapeIndex: number;
  type: 'sphere';
  shape: IInternalSphere;
};
export interface IBoxShape extends IBvhEntry {
  shapeIndex: number;
  type: 'box';
  shape: IInternalBox;
};
export interface ITriangleShape extends IBvhEntry {
  shapeIndex: number;
  type: 'triangle';
  shape: IInternalTriangle;
};
export type IShape = ISphereShape | IBoxShape | ITriangleShape;

export type ShapesBvhTreeNode = BvhTreeNode<IShape>;

export class ShapesBvhTree {

  private _bvhTree = new BvhTree<IShape>();

  // some heavily reused memory
  private _boxMat4_a = glm.mat4.create();
  private _boxMat4_b = glm.mat4.create();
  private _boxPos = glm.vec3.create();
  private _boxCorners: ReadonlyArray<glm.vec3> = [
    glm.vec3.create(),
    glm.vec3.create(),
    glm.vec3.create(),
    glm.vec3.create(),
    glm.vec3.create(),
    glm.vec3.create(),
    glm.vec3.create(),
    glm.vec3.create(),
  ];
  // some heavily reused memory

  constructor() {}

  reset() {
    this._bvhTree.reset();
  }

  synchronize(
    allSpheres: ReadonlyArray<IInternalSphere>,
    allBoxes: ReadonlyArray<IInternalBox>,
    allTriangles: ReadonlyArray<IInternalTriangle>,
  ) {

    this.reset();

    const allEntries: IShape[] = [];

    // setup the generic shape list
    let shapeIndex = 0;
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

      allEntries.push({ shapeIndex: shapeIndex++, type: 'sphere', shape: currShape, min, max });
    }

    shapeIndex = 1000;
    for (const currShape of allBoxes) {

      glm.mat4.identity(this._boxMat4_a);
      glm.mat4.translate(this._boxMat4_a, this._boxMat4_a, currShape.position);
      glm.mat4.fromQuat(this._boxMat4_b, currShape.orientation);
      glm.mat4.multiply(this._boxMat4_a, this._boxMat4_a, this._boxMat4_b);

      const min = glm.vec3.fromValues(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
      const max = glm.vec3.fromValues(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);

      const allBoxCorners: ReadonlyArray<glm.ReadonlyVec3> = [
        glm.vec3.set(this._boxCorners[0], -currShape.boxSize[0], -currShape.boxSize[1], -currShape.boxSize[2]),
        glm.vec3.set(this._boxCorners[1], +currShape.boxSize[0], -currShape.boxSize[1], -currShape.boxSize[2]),
        glm.vec3.set(this._boxCorners[2], -currShape.boxSize[0], +currShape.boxSize[1], -currShape.boxSize[2]),
        glm.vec3.set(this._boxCorners[3], +currShape.boxSize[0], +currShape.boxSize[1], -currShape.boxSize[2]),
        glm.vec3.set(this._boxCorners[4], -currShape.boxSize[0], -currShape.boxSize[1], +currShape.boxSize[2]),
        glm.vec3.set(this._boxCorners[5], +currShape.boxSize[0], -currShape.boxSize[1], +currShape.boxSize[2]),
        glm.vec3.set(this._boxCorners[6], -currShape.boxSize[0], +currShape.boxSize[1], +currShape.boxSize[2]),
        glm.vec3.set(this._boxCorners[7], +currShape.boxSize[0], +currShape.boxSize[1], +currShape.boxSize[2]),
      ];

      // need to apply the box transformation to the corners (translation, then rotation)
      allBoxCorners.forEach((vertex) => {

        glm.vec3.transformMat4(this._boxPos, vertex, this._boxMat4_a);

        min[0] = Math.min(min[0], this._boxPos[0]);
        min[1] = Math.min(min[1], this._boxPos[1]);
        min[2] = Math.min(min[2], this._boxPos[2]);
        max[0] = Math.max(max[0], this._boxPos[0]);
        max[1] = Math.max(max[1], this._boxPos[1]);
        max[2] = Math.max(max[2], this._boxPos[2]);
      });

      // here we ensure the shape is not "paper flat" on any of its axises
      if (max[0] - min[0] < k_minDelta) { max[0] += k_minDelta; }
      if (max[1] - min[1] < k_minDelta) { max[1] += k_minDelta; }
      if (max[2] - min[2] < k_minDelta) { max[2] += k_minDelta; }

      allEntries.push({ shapeIndex: shapeIndex++, type: 'box', shape: currShape, min, max });
    }

    shapeIndex = 2000;
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

      allEntries.push({ shapeIndex: shapeIndex++, type: 'triangle', shape: currShape, min, max });
    }

    this._bvhTree.synchronize(allEntries);

    // this._rootNode = BvhTreeNode.buildBvhGraph(allEntries);
  }

  getRootNode(): ShapesBvhTreeNode | undefined {
    // return this._rootNode;
    return this._bvhTree.getRootNode();
  }

};
