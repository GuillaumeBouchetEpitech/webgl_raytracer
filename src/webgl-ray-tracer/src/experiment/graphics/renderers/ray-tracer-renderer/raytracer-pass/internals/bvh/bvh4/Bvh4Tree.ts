
import* as glm from "gl-matrix"

import { type MutableAABB } from "../bvh2/aabb-utils";
import { Bvh2TreeNode } from "../bvh2/Bvh2TreeNode";
import { Bvh4TreeNode, Bvh4EntryPool } from './Bvh4TreeNode';
import { ObjectPool } from '../utils/ObjectPool';

export class Bvh4Tree<T extends MutableAABB> {

  private _objectPool: Bvh4EntryPool<T>;
  private _rootNode?: Bvh4TreeNode<T>;

  constructor() {
    this._objectPool = new ObjectPool<Bvh4TreeNode<T>, [glm.ReadonlyVec3, glm.ReadonlyVec3]>(
      (min: glm.ReadonlyVec3, max: glm.ReadonlyVec3): Bvh4TreeNode<T> => {
        return new Bvh4TreeNode<T>(min, max);
      },
      (reused: Bvh4TreeNode<T>, min: glm.ReadonlyVec3, max: glm.ReadonlyVec3): Bvh4TreeNode<T> => {
        reused.init(min, max);
        return reused
      }
    );
  }

  reset() {
    this._objectPool.releaseAll();
    this._rootNode = undefined;
  }

  synchronize(
    bvh2RootNode: Bvh2TreeNode<T>,
  ) {
    this.reset();
    this._rootNode = Bvh4TreeNode.buildBvhGraph(this._objectPool, bvh2RootNode);
  }

  getRootNode(): Bvh4TreeNode<T> | undefined {
    return this._rootNode;
  }

};

