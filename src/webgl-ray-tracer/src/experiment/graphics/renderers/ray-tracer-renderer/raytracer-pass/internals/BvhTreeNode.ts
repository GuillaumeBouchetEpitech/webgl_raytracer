
import * as glm from 'gl-matrix';
import { IInternalBox, IInternalSphere, IInternalTriangle } from '../all-interfaces';

export interface IGenericShape {
  shapeIndex: number;
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
  private static s_min = glm.vec3.create();
  private static s_max = glm.vec3.create();

  private static s_nodesPoolFree: BvhTreeNode[] = [];
  private static s_nodesPoolUsed: BvhTreeNode[] = [];

  static buildBvhGraph(
    min: glm.ReadonlyVec3,
    max: glm.ReadonlyVec3,
    allShapes: ReadonlyArray<IShape>,
  ): BvhTreeNode {
    this.s_index = 0;

    // add the used node to the pool of free
    for (const currNode of this.s_nodesPoolUsed) {
      this.s_nodesPoolFree.push(currNode);
    }
    // clear the pool of used ones
    this.s_nodesPoolUsed.length = 0;

    const rootNode = this._makeNewNode(min, max);
    rootNode._subDivide(allShapes);
    return rootNode;
  }

  private static _makeNewNode(
    min: glm.ReadonlyVec3,
    max: glm.ReadonlyVec3,
  ): BvhTreeNode {

    const _getNode = (): BvhTreeNode => {
      // try to acquire
      if (BvhTreeNode.s_nodesPoolFree.length > 0) {
        const newNode = BvhTreeNode.s_nodesPoolFree.pop()!;
        newNode._init(min, max);
        return newNode;
      }
      // create
      return new BvhTreeNode(min, max);
    }

    const newNode = _getNode();
    BvhTreeNode.s_nodesPoolUsed.push(newNode);
    return newNode;
  }

  private constructor(
    min: glm.ReadonlyVec3,
    max: glm.ReadonlyVec3,
  ) {
    this._init(min, max);
  }

  private _init(
    min: glm.ReadonlyVec3,
    max: glm.ReadonlyVec3,
  ) {
    this._index = BvhTreeNode.s_index;
    BvhTreeNode.s_index += 1;
    glm.vec3.copy(this._min, min);
    glm.vec3.copy(this._max, max);
    this._leftNode = undefined;
    this._rightNode = undefined;
    this._leftLeaf = undefined;
    this._rightLeaf = undefined;
  }

  private _subDivide(allShapes: ReadonlyArray<IShape>): void {

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

    const sortedShapes = [...allShapes].sort((shapeA, shapeB) => {
      const minA = shapeA.min[axis];
      const maxA = shapeA.max[axis];

      const minB = shapeB.min[axis];
      const maxB = shapeB.max[axis];

      return (minA + maxA) / 2.0 - (minB + maxB) / 2.0;
    });

    const halfIndex = Math.floor(sortedShapes.length / 2);
    const leftSubShapes = sortedShapes.slice(0, halfIndex);
    const rightSubShapes = sortedShapes.slice(halfIndex);

    if (leftSubShapes.length > 0) {
      glm.vec3.set(BvhTreeNode.s_min, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
      glm.vec3.set(BvhTreeNode.s_max, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
      leftSubShapes.forEach((f) => {
        BvhTreeNode.s_min[0] = Math.min(BvhTreeNode.s_min[0], f.min[0]);
        BvhTreeNode.s_min[1] = Math.min(BvhTreeNode.s_min[1], f.min[1]);
        BvhTreeNode.s_min[2] = Math.min(BvhTreeNode.s_min[2], f.min[2]);
        BvhTreeNode.s_max[0] = Math.max(BvhTreeNode.s_max[0], f.max[0]);
        BvhTreeNode.s_max[1] = Math.max(BvhTreeNode.s_max[1], f.max[1]);
        BvhTreeNode.s_max[2] = Math.max(BvhTreeNode.s_max[2], f.max[2]);
      });

      this._leftNode = BvhTreeNode._makeNewNode(BvhTreeNode.s_min, BvhTreeNode.s_max);
    }

    if (rightSubShapes.length > 0) {
      glm.vec3.set(BvhTreeNode.s_min, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
      glm.vec3.set(BvhTreeNode.s_max, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
      rightSubShapes.forEach((f) => {
        BvhTreeNode.s_min[0] = Math.min(BvhTreeNode.s_min[0], f.min[0]);
        BvhTreeNode.s_min[1] = Math.min(BvhTreeNode.s_min[1], f.min[1]);
        BvhTreeNode.s_min[2] = Math.min(BvhTreeNode.s_min[2], f.min[2]);
        BvhTreeNode.s_max[0] = Math.max(BvhTreeNode.s_max[0], f.max[0]);
        BvhTreeNode.s_max[1] = Math.max(BvhTreeNode.s_max[1], f.max[1]);
        BvhTreeNode.s_max[2] = Math.max(BvhTreeNode.s_max[2], f.max[2]);
      });

      this._rightNode = BvhTreeNode._makeNewNode(BvhTreeNode.s_min, BvhTreeNode.s_max);
    }

    if (this._leftNode) {
      this._leftNode._subDivide(leftSubShapes);
    }
    if (this._rightNode) {
      this._rightNode._subDivide(rightSubShapes);
    }
  }

};
