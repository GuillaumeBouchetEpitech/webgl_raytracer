
import * as glm from 'gl-matrix';
import { IInternalBox, IInternalSphere, IInternalTriangle } from '../all-interfaces';

export interface IGenericShape {
  index: number;
  min: glm.ReadonlyVec3;
  max: glm.ReadonlyVec3;
};
export interface ISphereShape extends IGenericShape {
  type: 'sphere';
  shape: IInternalSphere;
};
export interface IBoxShape extends IGenericShape {
  type: 'box';
  shape: IInternalBox;
};
export interface ITriangleShape extends IGenericShape {
  type: 'triangle';
  shape: IInternalTriangle;
};
export type IShape = ISphereShape | IBoxShape | ITriangleShape;

export class BvhTreeNode {

  _index: number = -1;

  _min = glm.vec3.create();
  _max = glm.vec3.create();

  _leftNode?: BvhTreeNode;
  _rightNode?: BvhTreeNode;

  _leftLeaf?: IShape;
  _rightLeaf?: IShape;

  private static s_index: number = 0;

  static buildBvhGraph(
    min: glm.vec3,
    max: glm.vec3,
    allShapes: ReadonlyArray<IShape>,
  ): BvhTreeNode {
    BvhTreeNode.s_index = 0;
    const rootNode = new BvhTreeNode(min, max);
    rootNode.subDivide(allShapes);
    return rootNode;
  }

  private constructor(
    min: glm.vec3,
    max: glm.vec3,
  ) {
    this._index = BvhTreeNode.s_index;
    BvhTreeNode.s_index += 1;
    glm.vec3.copy(this._min, min);
    glm.vec3.copy(this._max, max);
  }

  subDivide(
    allShapes: ReadonlyArray<IShape>,
  ): void {

    if (allShapes.length <= 2) {
      this._leftLeaf = allShapes[0];
      this._rightLeaf = allShapes[1];
      return;
    }

    // split the AABB into two across the longest AABB axis
    const deltaX = Math.abs(this._max[0] - this._min[0]);
    const deltaY = Math.abs(this._max[1] - this._min[1]);
    const deltaZ = Math.abs(this._max[2] - this._min[2]);
    const largestDelta = Math.max(deltaX, deltaY, deltaZ);

    if (largestDelta === deltaX) {
      this._splitAcross(0, allShapes); // split across x axis
    } else if (largestDelta === deltaY) {
      this._splitAcross(1, allShapes); // split across y axis
    } else {
      this._splitAcross(2, allShapes); // split across z axis
    }
  }

  private _splitAcross(axis: 0 | 1 | 2, allShapes: ReadonlyArray<IShape>) {
    const sorted = [...allShapes].sort((shapeA, shapeB) => {
      const minA = shapeA.min[axis];
      const maxA = shapeA.max[axis];

      const minB = shapeB.min[axis];
      const maxB = shapeB.max[axis];

      return (minA + maxA) / 2.0 - (minB + maxB) / 2.0;
    });

    const halfIndex = Math.floor(sorted.length / 2);
    const leftSubFaces = sorted.slice(0, halfIndex);
    const rightSubFaces = sorted.slice(halfIndex);

    if (leftSubFaces.length > 0) {
      const min = glm.vec3.fromValues(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
      const max = glm.vec3.fromValues(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
      leftSubFaces.forEach((f) => {
        min[0] = Math.min(min[0], f.min[0]);
        min[1] = Math.min(min[1], f.min[1]);
        min[2] = Math.min(min[2], f.min[2]);
        max[0] = Math.max(max[0], f.max[0]);
        max[1] = Math.max(max[1], f.max[1]);
        max[2] = Math.max(max[2], f.max[2]);
      });

      this._leftNode = new BvhTreeNode(min, max);
    }

    if (rightSubFaces.length > 0) {
      const min = glm.vec3.fromValues(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
      const max = glm.vec3.fromValues(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
      rightSubFaces.forEach((f) => {
        min[0] = Math.min(min[0], f.min[0]);
        min[1] = Math.min(min[1], f.min[1]);
        min[2] = Math.min(min[2], f.min[2]);
        max[0] = Math.max(max[0], f.max[0]);
        max[1] = Math.max(max[1], f.max[1]);
        max[2] = Math.max(max[2], f.max[2]);
      });

      this._rightNode = new BvhTreeNode(min, max);
    }

    if (this._leftNode) {
      this._leftNode.subDivide(leftSubFaces);
    }
    if (this._rightNode) {
      this._rightNode.subDivide(rightSubFaces);
    }
  }

};
