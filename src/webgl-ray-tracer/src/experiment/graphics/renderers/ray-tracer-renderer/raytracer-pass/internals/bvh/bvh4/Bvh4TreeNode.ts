
import * as glm from 'gl-matrix';

import { type MutableAABB } from "../bvh2/aabb-utils";
import { Bvh2TreeNode } from '../bvh2/Bvh2TreeNode';

import { ObjectPool } from '../utils/ObjectPool';

export type Bvh4EntryPool<T extends MutableAABB> = ObjectPool<Bvh4TreeNode<T>, [glm.ReadonlyVec3, glm.ReadonlyVec3]>;

export class Bvh4TreeNode<T extends MutableAABB> implements MutableAABB {

  _index: number = -1;

  min = glm.vec3.create();
  max = glm.vec3.create();

  _childrenNodes: Bvh4TreeNode<T>[] = []; // 0..4
  _leaves: T[] = []; // 0..4

  private static s_index: number = 0;

  static buildBvhGraph<T extends MutableAABB>(
    nodePool: Bvh4EntryPool<T>,
    bvh2RootNode: Bvh2TreeNode<T>,
  ): Bvh4TreeNode<T> {
    this.s_index = 0;

    const _collapseBvh2Node = (bvh2Node: Bvh2TreeNode<T>): Bvh4TreeNode<T> => {

      const newNode = nodePool.acquire(bvh2Node.min, bvh2Node.max);

      // has no children nodes -> only leaf nodes
      if (!bvh2Node._leftNode || !bvh2Node._rightNode) {
        if (bvh2Node._leftLeaf) { newNode._leaves.push(bvh2Node._leftLeaf); }
        if (bvh2Node._rightLeaf) { newNode._leaves.push(bvh2Node._rightLeaf); }
        return newNode;
      }

      //

      // has children nodes -> those said children nodes only have leaves nodes
      if (
        bvh2Node._leftNode &&
        bvh2Node._rightNode &&
        (bvh2Node._leftNode._leftLeaf || bvh2Node._leftNode._rightLeaf) &&
        (bvh2Node._rightNode._leftLeaf || bvh2Node._rightNode._rightLeaf)
      ) {

        if (bvh2Node._leftNode._leftLeaf) {
          newNode._leaves.push(bvh2Node._leftNode._leftLeaf);
        }
        if (bvh2Node._leftNode._rightLeaf) {
          newNode._leaves.push(bvh2Node._leftNode._rightLeaf);
        }

        if (bvh2Node._rightNode._leftLeaf) {
          newNode._leaves.push(bvh2Node._rightNode._leftLeaf);
        }
        if (bvh2Node._rightNode._rightLeaf) {
          newNode._leaves.push(bvh2Node._rightNode._rightLeaf);
        }

        return newNode;
      }

      //

      // has children nodes -> those said children nodes only have children nodes
      if (
        bvh2Node._leftNode &&
        bvh2Node._rightNode &&
        (bvh2Node._leftNode._leftNode || bvh2Node._leftNode._rightNode) &&
        (bvh2Node._rightNode._leftNode || bvh2Node._rightNode._rightNode)
      ) {

        if (bvh2Node._leftNode._leftNode) {
          newNode._childrenNodes.push(_collapseBvh2Node(bvh2Node._leftNode._leftNode));
        }
        if (bvh2Node._leftNode._rightNode) {
          newNode._childrenNodes.push(_collapseBvh2Node(bvh2Node._leftNode._rightNode));
        }

        if (bvh2Node._rightNode._leftNode) {
          newNode._childrenNodes.push(_collapseBvh2Node(bvh2Node._rightNode._leftNode));
        }
        if (bvh2Node._rightNode._rightNode) {
          newNode._childrenNodes.push(_collapseBvh2Node(bvh2Node._rightNode._rightNode));
        }

        return newNode;
      }

      //

      // recursive collapse
      newNode._childrenNodes.push(_collapseBvh2Node(bvh2Node._leftNode));
      newNode._childrenNodes.push(_collapseBvh2Node(bvh2Node._rightNode));
      return newNode;
    };

    const bvh4RootNode = _collapseBvh2Node(bvh2RootNode);

    // const _sanitizeBvh4Node = (inBvh4Node: Bvh4TreeNode<T>): void => {

    //   for (let ii = 0; ii < inBvh4Node._childrenNodes.length; ) {
    //     if (inBvh4Node._childrenNodes[ii]._leaves.length === 1) {
    //       inBvh4Node._leaves.push(inBvh4Node._childrenNodes[ii]._leaves[0]);
    //       inBvh4Node._childrenNodes.splice(ii, 1);
    //     } else {
    //       ++ii;
    //     }
    //   }

    //   inBvh4Node._childrenNodes.forEach(_sanitizeBvh4Node);
    // };

    // _sanitizeBvh4Node(bvh4RootNode);

    return bvh4RootNode;
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
