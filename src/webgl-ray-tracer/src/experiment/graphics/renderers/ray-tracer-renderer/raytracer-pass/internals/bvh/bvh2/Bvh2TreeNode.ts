
import * as glm from 'gl-matrix';

import { ObjectPool } from '../utils/ObjectPool';

import { type MutableAABB, setAabbFromAabbList } from './aabb-utils';

// import { naiveSplit } from './splitters/naive-splitter';
import { surfaceAreaHeuristicSplit } from './splitters/surface-area-heuristic-splitter';

// export interface IBvh2Entry {
//   min: glm.ReadonlyVec3;
//   max: glm.ReadonlyVec3;
// };

export type Bvh2EntryPool<T extends MutableAABB> = ObjectPool<Bvh2TreeNode<T>, [glm.ReadonlyVec3, glm.ReadonlyVec3]>;

export class Bvh2TreeNode<T extends MutableAABB> implements MutableAABB {

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

  static buildBvhGraph<T extends MutableAABB>(
    nodePool: Bvh2EntryPool<T>,
    allEntries: ReadonlyArray<T>
  ): Bvh2TreeNode<T> {
    this.s_index = 0;

    const rootAABB: MutableAABB = { min: glm.vec3.create(), max: glm.vec3.create() };
    setAabbFromAabbList(rootAABB, allEntries);
    const rootNode = nodePool.acquire(rootAABB.min, rootAABB.max);

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
      const tmpAABB: MutableAABB = { min: Bvh2TreeNode.s_min, max: Bvh2TreeNode.s_max };
      setAabbFromAabbList(tmpAABB, splitResult.left);
      this._leftNode = nodePool.acquire(tmpAABB.min, tmpAABB.max);
    }

    if (splitResult.right.length > 0) {
      const tmpAABB: MutableAABB = { min: Bvh2TreeNode.s_min, max: Bvh2TreeNode.s_max };
      setAabbFromAabbList(tmpAABB, splitResult.right);
      this._rightNode = nodePool.acquire(tmpAABB.min, tmpAABB.max);
    }

    if (this._leftNode) {
      this._leftNode._subDivide(nodePool, splitResult.left);
    }
    if (this._rightNode) {
      this._rightNode._subDivide(nodePool, splitResult.right);
    }
  }

};
