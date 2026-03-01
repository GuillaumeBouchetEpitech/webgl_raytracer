
import* as glm from "gl-matrix"

import { BvhTreeNode, IBvhEntry, BvhEntryPool } from './BvhTreeNode';
import { ObjectPool } from '../utils/ObjectPool';

export class BvhTree<T extends IBvhEntry> {

  private _objectPool: BvhEntryPool<T>;
  private _rootNode?: BvhTreeNode<T>;

  constructor() {
    this._objectPool = new ObjectPool<BvhTreeNode<T>, [glm.ReadonlyVec3, glm.ReadonlyVec3]>(
      (min: glm.ReadonlyVec3, max: glm.ReadonlyVec3): BvhTreeNode<T> => {
        return new BvhTreeNode<T>(min, max);
      },
      (reused: BvhTreeNode<T>, min: glm.ReadonlyVec3, max: glm.ReadonlyVec3): BvhTreeNode<T> => {
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
    this._rootNode = BvhTreeNode.buildBvhGraph(this._objectPool, allEntries);
  }

  getRootNode(): BvhTreeNode<T> | undefined {
    return this._rootNode;
  }

};

