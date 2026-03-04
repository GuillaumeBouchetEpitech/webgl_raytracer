
import * as glm from 'gl-matrix';

import { ObjectPool } from '../utils/ObjectPool';

// import { naiveSplit } from './splitters/naive-splitter';
import { surfaceAreaHeuristicSplit } from './splitters/surface-area-heuristic-splitter';

export interface IBvh2Entry {
  min: glm.ReadonlyVec3;
  max: glm.ReadonlyVec3;
};

export type Bvh2EntryPool<T extends IBvh2Entry> = ObjectPool<Bvh2TreeNode<T>, [glm.ReadonlyVec3, glm.ReadonlyVec3]>;

export class Bvh2TreeNode<T extends IBvh2Entry> implements IBvh2Entry {

  _index: number = -1;

  min = glm.vec3.create();
  max = glm.vec3.create();

  _leftNode?: Bvh2TreeNode<T>;
  _rightNode?: Bvh2TreeNode<T>;

  _leftLeaf?: T;
  _rightLeaf?: T;

  private static s_index: number = 0;
  private static s_min = glm.vec3.create();
  private static s_max = glm.vec3.create();

  static buildBvhGraph<T extends IBvh2Entry>(
    nodePool: Bvh2EntryPool<T>,
    allEntries: ReadonlyArray<T>
  ): Bvh2TreeNode<T> {
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
    this._index = Bvh2TreeNode.s_index;
    Bvh2TreeNode.s_index += 1;
    glm.vec3.copy(this.min, min);
    glm.vec3.copy(this.max, max);
    this._leftNode = undefined;
    this._rightNode = undefined;
    this._leftLeaf = undefined;
    this._rightLeaf = undefined;
  }

  /// MARK: _subDivide
  private _subDivide(nodePool: Bvh2EntryPool<T>, allEntries: ReadonlyArray<T>): void {

    if (allEntries.length <= 2) {
      this._leftLeaf = allEntries[0];
      this._rightLeaf = allEntries[1];
      return;
    }

    // const splitResult = naiveSplit(this, allEntries);
    const splitResult = surfaceAreaHeuristicSplit(this, allEntries);

    if (splitResult.left.length > 0) {
      glm.vec3.set(Bvh2TreeNode.s_min, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
      glm.vec3.set(Bvh2TreeNode.s_max, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
      splitResult.left.forEach((f) => {
        Bvh2TreeNode.s_min[0] = Math.min(Bvh2TreeNode.s_min[0], f.min[0]);
        Bvh2TreeNode.s_min[1] = Math.min(Bvh2TreeNode.s_min[1], f.min[1]);
        Bvh2TreeNode.s_min[2] = Math.min(Bvh2TreeNode.s_min[2], f.min[2]);
        Bvh2TreeNode.s_max[0] = Math.max(Bvh2TreeNode.s_max[0], f.max[0]);
        Bvh2TreeNode.s_max[1] = Math.max(Bvh2TreeNode.s_max[1], f.max[1]);
        Bvh2TreeNode.s_max[2] = Math.max(Bvh2TreeNode.s_max[2], f.max[2]);
      });

      this._leftNode = nodePool.acquire(Bvh2TreeNode.s_min, Bvh2TreeNode.s_max);
    }

    if (splitResult.right.length > 0) {
      glm.vec3.set(Bvh2TreeNode.s_min, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
      glm.vec3.set(Bvh2TreeNode.s_max, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
      splitResult.right.forEach((f) => {
        Bvh2TreeNode.s_min[0] = Math.min(Bvh2TreeNode.s_min[0], f.min[0]);
        Bvh2TreeNode.s_min[1] = Math.min(Bvh2TreeNode.s_min[1], f.min[1]);
        Bvh2TreeNode.s_min[2] = Math.min(Bvh2TreeNode.s_min[2], f.min[2]);
        Bvh2TreeNode.s_max[0] = Math.max(Bvh2TreeNode.s_max[0], f.max[0]);
        Bvh2TreeNode.s_max[1] = Math.max(Bvh2TreeNode.s_max[1], f.max[1]);
        Bvh2TreeNode.s_max[2] = Math.max(Bvh2TreeNode.s_max[2], f.max[2]);
      });

      this._rightNode = nodePool.acquire(Bvh2TreeNode.s_min, Bvh2TreeNode.s_max);
    }

    if (this._leftNode) {
      this._leftNode._subDivide(nodePool, splitResult.left);
    }
    if (this._rightNode) {
      this._rightNode._subDivide(nodePool, splitResult.right);
    }
  }

};
