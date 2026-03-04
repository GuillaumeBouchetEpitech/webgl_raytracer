
import * as glm from 'gl-matrix';

import { IBvh2Entry, Bvh2TreeNode } from '../bvh2/Bvh2TreeNode';

import { ObjectPool } from '../utils/ObjectPool';

export type Bvh4EntryPool<T extends IBvh2Entry> = ObjectPool<Bvh4TreeNode<T>, [glm.ReadonlyVec3, glm.ReadonlyVec3]>;

export class Bvh4TreeNode<T extends IBvh2Entry> implements IBvh2Entry {

  _index: number = -1;

  min = glm.vec3.create();
  max = glm.vec3.create();

  _childrenNodes: Bvh4TreeNode<T>[] = []; // 0..4
  _leaves: T[] = []; // 0..4

  private static s_index: number = 0;

  static buildBvhGraph<T extends IBvh2Entry>(
    nodePool: Bvh4EntryPool<T>,
    bvh2RootNode: Bvh2TreeNode<T>,
  ): Bvh4TreeNode<T> {
    this.s_index = 0;

    const _collapseBvh2Node = (bvh2Node: Bvh2TreeNode<T>): Bvh4TreeNode<T> => {

      const newNode = nodePool.acquire(bvh2Node.min, bvh2Node.max);

      // no children -> leaf node
      if (!bvh2Node._leftNode || !bvh2Node._rightNode) {
        if (bvh2Node._leftLeaf) { newNode._leaves.push(bvh2Node._leftLeaf); }
        if (bvh2Node._rightLeaf) { newNode._leaves.push(bvh2Node._rightLeaf); }
        return newNode;
      }

      // Recursive collapse first.
      let tmpChildren: Bvh4TreeNode<T>[] = [
        _collapseBvh2Node(bvh2Node._leftNode),
        _collapseBvh2Node(bvh2Node._rightNode),
      ];

      // // Greedily absorb one eligible child at a time and restart until stable.
      // // A child is eligible when replacing it with its own children keeps total <= 4.
      // let hasChanged = true;
      // while (hasChanged) {
      //   hasChanged = false;
      //   for (let ii = 0; ii < tmpChildren.length; ++ii) {
      //     const child = tmpChildren[ii];
      //     if (child._childrenNodes.length === 0) {
      //       continue;
      //     }
      //     const sizeAfterAbsorb = tmpChildren.length - 1 + child._childrenNodes.length;
      //     if (sizeAfterAbsorb <= 4) {
      //       tmpChildren = [
      //         ...tmpChildren.slice(0, ii),
      //         ...child._childrenNodes,
      //         ...tmpChildren.slice(ii + 1),
      //       ];
      //       hasChanged = true;
      //       break; // restart with updated children array
      //     }
      //   }
      // }

      newNode._childrenNodes.push(...tmpChildren);
      return newNode;
    };

    return _collapseBvh2Node(bvh2RootNode);
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
    this._index = Bvh4TreeNode.s_index;
    Bvh4TreeNode.s_index += 1;
    glm.vec3.copy(this.min, min);
    glm.vec3.copy(this.max, max);
    this._childrenNodes.length = 0;
    this._leaves.length = 0;
  }

};
