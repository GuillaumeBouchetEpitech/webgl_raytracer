
import* as glm from "gl-matrix"

import { type MutableAABB } from './aabb-utils';
import { Bvh2TreeNode, Bvh2EntryPool } from './Bvh2TreeNode';
import { ObjectPool } from '../utils/ObjectPool';

export class Bvh2Tree<T extends MutableAABB> {

  private _objectPool: Bvh2EntryPool<T>;
  private _rootNode?: Bvh2TreeNode<T>;

  constructor() {
    this._objectPool = new ObjectPool<Bvh2TreeNode<T>, [glm.ReadonlyVec3, glm.ReadonlyVec3]>(
      (min: glm.ReadonlyVec3, max: glm.ReadonlyVec3): Bvh2TreeNode<T> => {
        return new Bvh2TreeNode<T>(min, max);
      },
      (reused: Bvh2TreeNode<T>, min: glm.ReadonlyVec3, max: glm.ReadonlyVec3): Bvh2TreeNode<T> => {
        reused.init(min, max);
        return reused
      }
    );

  }

  reset() {
    this._objectPool.releaseAll();
    this._rootNode = undefined;
  }

  synchronize(allEntries: ReadonlyArray<T>) {
    this.reset();
    this._rootNode = Bvh2TreeNode.buildBvhGraph(this._objectPool, allEntries);
  }

  getRootNode(): Bvh2TreeNode<T> | undefined {
    return this._rootNode;
  }

};

