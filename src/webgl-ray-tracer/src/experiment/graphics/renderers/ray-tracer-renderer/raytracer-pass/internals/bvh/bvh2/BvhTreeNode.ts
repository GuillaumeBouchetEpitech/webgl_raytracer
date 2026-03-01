
import * as glm from 'gl-matrix';

import { ObjectPool } from '../utils/ObjectPool';


export interface IBvhEntry {
  min: glm.ReadonlyVec3;
  max: glm.ReadonlyVec3;
}

export type BvhEntryPool<T extends IBvhEntry> = ObjectPool<BvhTreeNode<T>, [glm.ReadonlyVec3, glm.ReadonlyVec3]>;


export class BvhTreeNode<T extends IBvhEntry> implements IBvhEntry {

  _index: number = -1;

  min = glm.vec3.create();
  max = glm.vec3.create();

  _leftNode?: BvhTreeNode<T>;
  _rightNode?: BvhTreeNode<T>;

  _leftLeaf?: T;
  _rightLeaf?: T;

  private static s_index: number = 0;
  private static s_min = glm.vec3.create();
  private static s_max = glm.vec3.create();

  static buildBvhGraph<T extends IBvhEntry>(
    nodePool: BvhEntryPool<T>,
    allEntries: ReadonlyArray<T>
  ): BvhTreeNode<T> {
    this.s_index = 0;

    // create root node
    const min = glm.vec3.fromValues(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
    const max = glm.vec3.fromValues(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
    for (const currShape of allEntries) {

      min[0] = Math.min(min[0], currShape.min[0]);
      min[1] = Math.min(min[1], currShape.min[1]);
      min[2] = Math.min(min[2], currShape.min[2]);
      max[0] = Math.max(max[0], currShape.max[0]);
      max[1] = Math.max(max[1], currShape.max[1]);
      max[2] = Math.max(max[2], currShape.max[2]);
    }

    const rootNode = nodePool.acquire(min, max);

    rootNode._subDivide(nodePool, allEntries);
    return rootNode;
  }

  constructor(
    min: glm.ReadonlyVec3,
    max: glm.ReadonlyVec3,
  ) {
    // super(min, max);
    this.init(min, max);
  }

  init(
    min: glm.ReadonlyVec3,
    max: glm.ReadonlyVec3,
  ) {
    this._index = BvhTreeNode.s_index;
    BvhTreeNode.s_index += 1;
    glm.vec3.copy(this.min, min);
    glm.vec3.copy(this.max, max);
    this._leftNode = undefined;
    this._rightNode = undefined;
    this._leftLeaf = undefined;
    this._rightLeaf = undefined;
  }

  private _subDivide(nodePool: BvhEntryPool<T>, allEntries: ReadonlyArray<T>): void {

    if (allEntries.length <= 2) {
      this._leftLeaf = allEntries[0];
      this._rightLeaf = allEntries[1];
      return;
    }

    // split the AABB into two across the longest AABB axis
    const deltaX = Math.abs(this.max[0] - this.min[0]);
    const deltaY = Math.abs(this.max[1] - this.min[1]);
    const deltaZ = Math.abs(this.max[2] - this.min[2]);
    const largestDelta = Math.max(deltaX, deltaY, deltaZ);

    if (largestDelta === deltaX) {
      this._splitAcross(nodePool, 0, allEntries); // split across x axis
    } else if (largestDelta === deltaY) {
      this._splitAcross(nodePool, 1, allEntries); // split across y axis
    } else {
      this._splitAcross(nodePool, 2, allEntries); // split across z axis
    }
  }

  private _splitAcross(nodePool: BvhEntryPool<T>, axis: 0 | 1 | 2, allEntries: ReadonlyArray<T>) {

    const sortedEntries = allEntries.slice().sort((shapeA, shapeB) => {
      const minA = shapeA.min[axis];
      const maxA = shapeA.max[axis];

      const minB = shapeB.min[axis];
      const maxB = shapeB.max[axis];

      return (minA + maxA) / 2.0 - (minB + maxB) / 2.0;
    });

    const halfIndex = Math.floor(sortedEntries.length / 2);
    const leftSubEntries = sortedEntries.slice(0, halfIndex);
    const rightSubEntries = sortedEntries.slice(halfIndex);

    if (leftSubEntries.length > 0) {
      glm.vec3.set(BvhTreeNode.s_min, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
      glm.vec3.set(BvhTreeNode.s_max, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
      leftSubEntries.forEach((f) => {
        BvhTreeNode.s_min[0] = Math.min(BvhTreeNode.s_min[0], f.min[0]);
        BvhTreeNode.s_min[1] = Math.min(BvhTreeNode.s_min[1], f.min[1]);
        BvhTreeNode.s_min[2] = Math.min(BvhTreeNode.s_min[2], f.min[2]);
        BvhTreeNode.s_max[0] = Math.max(BvhTreeNode.s_max[0], f.max[0]);
        BvhTreeNode.s_max[1] = Math.max(BvhTreeNode.s_max[1], f.max[1]);
        BvhTreeNode.s_max[2] = Math.max(BvhTreeNode.s_max[2], f.max[2]);
      });

      // this._leftNode = BvhTreeNode._makeNewNode(BvhTreeNode.s_min, BvhTreeNode.s_max);
      this._leftNode = nodePool.acquire(BvhTreeNode.s_min, BvhTreeNode.s_max);
    }

    if (rightSubEntries.length > 0) {
      glm.vec3.set(BvhTreeNode.s_min, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
      glm.vec3.set(BvhTreeNode.s_max, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
      rightSubEntries.forEach((f) => {
        BvhTreeNode.s_min[0] = Math.min(BvhTreeNode.s_min[0], f.min[0]);
        BvhTreeNode.s_min[1] = Math.min(BvhTreeNode.s_min[1], f.min[1]);
        BvhTreeNode.s_min[2] = Math.min(BvhTreeNode.s_min[2], f.min[2]);
        BvhTreeNode.s_max[0] = Math.max(BvhTreeNode.s_max[0], f.max[0]);
        BvhTreeNode.s_max[1] = Math.max(BvhTreeNode.s_max[1], f.max[1]);
        BvhTreeNode.s_max[2] = Math.max(BvhTreeNode.s_max[2], f.max[2]);
      });

      // this._rightNode = BvhTreeNode._makeNewNode(BvhTreeNode.s_min, BvhTreeNode.s_max);
      this._rightNode = nodePool.acquire(BvhTreeNode.s_min, BvhTreeNode.s_max);
    }

    if (this._leftNode) {
      this._leftNode._subDivide(nodePool, leftSubEntries);
    }
    if (this._rightNode) {
      this._rightNode._subDivide(nodePool, rightSubEntries);
    }
  }

};
