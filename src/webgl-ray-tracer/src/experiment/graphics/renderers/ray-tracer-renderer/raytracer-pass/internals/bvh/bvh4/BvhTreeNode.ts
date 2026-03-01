
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

  _childrenNodes: BvhTreeNode<T>[] = [];
  // _childNode0?: BvhTreeNode<T>;
  // _childNode1?: BvhTreeNode<T>;
  // _childNode2?: BvhTreeNode<T>;
  // _childNode3?: BvhTreeNode<T>;

  _leaves: T[] = [];
  // _leaf0?: T;
  // _leaf1?: T;
  // _leaf2?: T;
  // _leaf3?: T;

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
    this._childrenNodes.length = 0;
    this._leaves.length = 0;
    // this._childNode0 = undefined;
    // this._childNode1 = undefined;
    // this._childNode2 = undefined;
    // this._childNode3 = undefined;
    // this._leaf0 = undefined;
    // this._leaf1 = undefined;
    // this._leaf2 = undefined;
    // this._leaf3 = undefined;
  }

  private _subDivide(nodePool: BvhEntryPool<T>, allEntries: ReadonlyArray<T>): void {

    if (allEntries.length <= 4) {
      this._leaves.push(...allEntries);
      // this._leaf0 = allEntries[0];
      // this._leaf1 = allEntries[1];
      // this._leaf2 = allEntries[2];
      // this._leaf3 = allEntries[3];
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
    const quartIndex = Math.floor(halfIndex / 2);
    const child0SubEntries = sortedEntries.slice(0, quartIndex);
    const child1SubEntries = sortedEntries.slice(quartIndex, halfIndex);
    const child2SubEntries = sortedEntries.slice(halfIndex, halfIndex + quartIndex);
    const child3SubEntries = sortedEntries.slice(halfIndex + quartIndex);

    if (child0SubEntries.length > 0) {
      glm.vec3.set(BvhTreeNode.s_min, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
      glm.vec3.set(BvhTreeNode.s_max, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
      child0SubEntries.forEach((f) => {
        BvhTreeNode.s_min[0] = Math.min(BvhTreeNode.s_min[0], f.min[0]);
        BvhTreeNode.s_min[1] = Math.min(BvhTreeNode.s_min[1], f.min[1]);
        BvhTreeNode.s_min[2] = Math.min(BvhTreeNode.s_min[2], f.min[2]);
        BvhTreeNode.s_max[0] = Math.max(BvhTreeNode.s_max[0], f.max[0]);
        BvhTreeNode.s_max[1] = Math.max(BvhTreeNode.s_max[1], f.max[1]);
        BvhTreeNode.s_max[2] = Math.max(BvhTreeNode.s_max[2], f.max[2]);
      });

      // this._leftNode = BvhTreeNode._makeNewNode(BvhTreeNode.s_min, BvhTreeNode.s_max);
      // this._childNode0 = nodePool.acquire(BvhTreeNode.s_min, BvhTreeNode.s_max);
      this._childrenNodes.push(nodePool.acquire(BvhTreeNode.s_min, BvhTreeNode.s_max));
    }

    if (child1SubEntries.length > 0) {
      glm.vec3.set(BvhTreeNode.s_min, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
      glm.vec3.set(BvhTreeNode.s_max, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
      child1SubEntries.forEach((f) => {
        BvhTreeNode.s_min[0] = Math.min(BvhTreeNode.s_min[0], f.min[0]);
        BvhTreeNode.s_min[1] = Math.min(BvhTreeNode.s_min[1], f.min[1]);
        BvhTreeNode.s_min[2] = Math.min(BvhTreeNode.s_min[2], f.min[2]);
        BvhTreeNode.s_max[0] = Math.max(BvhTreeNode.s_max[0], f.max[0]);
        BvhTreeNode.s_max[1] = Math.max(BvhTreeNode.s_max[1], f.max[1]);
        BvhTreeNode.s_max[2] = Math.max(BvhTreeNode.s_max[2], f.max[2]);
      });

      // this._rightNode = BvhTreeNode._makeNewNode(BvhTreeNode.s_min, BvhTreeNode.s_max);
      // this._childNode1 = nodePool.acquire(BvhTreeNode.s_min, BvhTreeNode.s_max);
      this._childrenNodes.push(nodePool.acquire(BvhTreeNode.s_min, BvhTreeNode.s_max));
    }

    if (child2SubEntries.length > 0) {
      glm.vec3.set(BvhTreeNode.s_min, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
      glm.vec3.set(BvhTreeNode.s_max, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
      child2SubEntries.forEach((f) => {
        BvhTreeNode.s_min[0] = Math.min(BvhTreeNode.s_min[0], f.min[0]);
        BvhTreeNode.s_min[1] = Math.min(BvhTreeNode.s_min[1], f.min[1]);
        BvhTreeNode.s_min[2] = Math.min(BvhTreeNode.s_min[2], f.min[2]);
        BvhTreeNode.s_max[0] = Math.max(BvhTreeNode.s_max[0], f.max[0]);
        BvhTreeNode.s_max[1] = Math.max(BvhTreeNode.s_max[1], f.max[1]);
        BvhTreeNode.s_max[2] = Math.max(BvhTreeNode.s_max[2], f.max[2]);
      });

      // this._rightNode = BvhTreeNode._makeNewNode(BvhTreeNode.s_min, BvhTreeNode.s_max);
      // this._childNode2 = nodePool.acquire(BvhTreeNode.s_min, BvhTreeNode.s_max);
      this._childrenNodes.push(nodePool.acquire(BvhTreeNode.s_min, BvhTreeNode.s_max));
    }

    if (child3SubEntries.length > 0) {
      glm.vec3.set(BvhTreeNode.s_min, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
      glm.vec3.set(BvhTreeNode.s_max, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
      child3SubEntries.forEach((f) => {
        BvhTreeNode.s_min[0] = Math.min(BvhTreeNode.s_min[0], f.min[0]);
        BvhTreeNode.s_min[1] = Math.min(BvhTreeNode.s_min[1], f.min[1]);
        BvhTreeNode.s_min[2] = Math.min(BvhTreeNode.s_min[2], f.min[2]);
        BvhTreeNode.s_max[0] = Math.max(BvhTreeNode.s_max[0], f.max[0]);
        BvhTreeNode.s_max[1] = Math.max(BvhTreeNode.s_max[1], f.max[1]);
        BvhTreeNode.s_max[2] = Math.max(BvhTreeNode.s_max[2], f.max[2]);
      });

      // this._rightNode = BvhTreeNode._makeNewNode(BvhTreeNode.s_min, BvhTreeNode.s_max);
      // this._childNode3 = nodePool.acquire(BvhTreeNode.s_min, BvhTreeNode.s_max);
      this._childrenNodes.push(nodePool.acquire(BvhTreeNode.s_min, BvhTreeNode.s_max));
    }

    // if (this._childNode0) {
    //   this._childNode0._subDivide(nodePool, child0SubEntries);
    // }
    // if (this._childNode1) {
    //   this._childNode1._subDivide(nodePool, child1SubEntries);
    // }
    // if (this._childNode2) {
    //   this._childNode2._subDivide(nodePool, child2SubEntries);
    // }
    // if (this._childNode3) {
    //   this._childNode3._subDivide(nodePool, child3SubEntries);
    // }
    if (this._childrenNodes[0]) {
      this._childrenNodes[0]._subDivide(nodePool, child0SubEntries);
    }
    if (this._childrenNodes[1]) {
      this._childrenNodes[1]._subDivide(nodePool, child1SubEntries);
    }
    if (this._childrenNodes[2]) {
      this._childrenNodes[2]._subDivide(nodePool, child2SubEntries);
    }
    if (this._childrenNodes[3]) {
      this._childrenNodes[3]._subDivide(nodePool, child3SubEntries);
    }
  }

};
