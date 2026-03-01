
import * as glm from 'gl-matrix';

import { ObjectPool } from '../utils/ObjectPool';

const _getAABBCenter = (axis: 0 | 1 | 2, min: glm.ReadonlyVec3, max: glm.ReadonlyVec3): number => (min[axis] + (max[axis] - min[axis]) * 0.5);

const _getAABBSurfaceArea = (min: glm.ReadonlyVec3, max: glm.ReadonlyVec3): number => {
  const width = Math.abs(max[0] - min[0]);
  const height = Math.abs(max[1] - min[1]);
  const depth = Math.abs(max[2] - min[2]);
  return 2 * (width + height + depth);
};

const _getAABBSurfaceAreaFromNode = (inNode: {min: glm.ReadonlyVec3, max: glm.ReadonlyVec3}): number => {
  return _getAABBSurfaceArea(inNode.min, inNode.max);
};

const _getAABBFromNodes = (someNodes: {min: glm.ReadonlyVec3, max: glm.ReadonlyVec3}[], ignoreIndex: number = -1): {min: glm.ReadonlyVec3, max: glm.ReadonlyVec3} => {
  const min = glm.vec3.fromValues(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
  const max = glm.vec3.fromValues(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
  for (let ii = 0; ii < someNodes.length; ++ii) {
    if (ii === ignoreIndex) {
      continue;
    }
    min[0] = Math.min(min[0], someNodes[ii].min[0]);
    min[1] = Math.min(min[1], someNodes[ii].min[1]);
    min[2] = Math.min(min[2], someNodes[ii].min[2]);
    max[0] = Math.max(max[0], someNodes[ii].max[0]);
    max[1] = Math.max(max[1], someNodes[ii].max[1]);
    max[2] = Math.max(max[2], someNodes[ii].max[2]);
  }
  return { min, max };
};

const _getAABBSurfaceAreaFromNodes = (someNodes: {min: glm.ReadonlyVec3, max: glm.ReadonlyVec3}[], ignoreIndex: number = -1): number => {
  if (someNodes.length === 0) {
    return -1;
  }
  return _getAABBSurfaceAreaFromNode(_getAABBFromNodes(someNodes, ignoreIndex));
};

export interface IBvhEntry {
  min: glm.ReadonlyVec3;
  max: glm.ReadonlyVec3;
};

export type BvhEntryPool<T extends IBvhEntry> = ObjectPool<BvhTreeNode<T>, [glm.ReadonlyVec3, glm.ReadonlyVec3]>;

export class BvhTreeNode<T extends IBvhEntry> implements IBvhEntry {

  _index: number = -1;

  min = glm.vec3.create();
  max = glm.vec3.create();
  surfaceArea: number = -1;

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
  // private static s_min = glm.vec3.create();
  // private static s_max = glm.vec3.create();

  // MARK: buildBvhGraph
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
    rootNode._collapse();

    return rootNode;
  }

  // MARK: ctro/init
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

    this.surfaceArea = _getAABBSurfaceArea(this.min, this.max);

    this._childrenNodes = [];
    this._leaves = [];
  }

  // MARK: _subDivide
  private _subDivide(nodePool: BvhEntryPool<T>, allEntries: ReadonlyArray<T>): void {

    // if (allEntries.length <= 4) {
    //   this._leaf0 = allEntries[0];
    //   this._leaf1 = allEntries[1];
    //   this._leaf2 = allEntries[2];
    //   this._leaf3 = allEntries[3];
    //   return;
    // }

    // TODO: sorted "cost of a new node (axis+divided-entries)"

    // per axis -> sorted centroid

    interface Bucket {
      min: glm.vec3;
      max: glm.vec3;
      entries: Readonly<T>[];
    };
    interface BucketPair {
      axis: 0 | 1 | 2,
      left: Bucket;
      right: Bucket;
      cost: number;
    };

    const _getBestBucketPair = (axis: 0 | 1 | 2): BucketPair => {

      // make a copy + sort by centroid
      const currCentroids: T[] = allEntries
        .slice(0)
        .sort((left, right) => _getAABBCenter(axis, left.min, left.max) - _getAABBCenter(axis, right.min, right.max));

      const currBucketPairs: BucketPair[] = [];

      for (let ii = 1; ii + 1 < currCentroids.length; ++ii) {

        const leftEntries = currCentroids.slice(0, ii);
        const leftMin = leftEntries.reduce((acc, curr) => acc = glm.vec3.min(acc, acc, curr.min), glm.vec3.copy(glm.vec3.create(), leftEntries[0].min));
        const leftMax = leftEntries.reduce((acc, curr) => acc = glm.vec3.max(acc, acc, curr.max), glm.vec3.copy(glm.vec3.create(), leftEntries[0].max));

        const rightEntries = currCentroids.slice(ii);
        const rightMin = rightEntries.reduce((acc, curr) => acc = glm.vec3.min(acc, acc, curr.min), glm.vec3.copy(glm.vec3.create(), rightEntries[0].min));
        const rightMax = rightEntries.reduce((acc, curr) => acc = glm.vec3.max(acc, acc, curr.max), glm.vec3.copy(glm.vec3.create(), rightEntries[0].max));

        currBucketPairs.push({
          axis,
          left: {
            entries: leftEntries,
            min: leftMin,
            max: leftMax,
          },
          right: {
            entries: rightEntries,
            min: rightMin,
            max: rightMax,
          },
          cost: 1
            + (_getAABBSurfaceArea(leftMin, leftMax) / this.surfaceArea) * leftEntries.length * 2
            + (_getAABBSurfaceArea(rightMin, rightMax) / this.surfaceArea) * rightEntries.length * 2,
        });
      }

      currBucketPairs.sort((leftBucket, rightBucket) => (leftBucket.cost - rightBucket.cost));
      return currBucketPairs[0];
    }

    const bestBucketPair = [
      _getBestBucketPair(0), // X
      _getBestBucketPair(1), // Y
      _getBestBucketPair(2), // Z
    ].sort((left, right) => left.cost - right.cost)[0];

    if (allEntries.length <= 2) {

      // compute the "cost of a leaf"
      const leafMin = allEntries.reduce((acc, curr) => acc = glm.vec3.min(acc, acc, curr.min), glm.vec3.copy(glm.vec3.create(), allEntries[0].min));
      const leafMax = allEntries.reduce((acc, curr) => acc = glm.vec3.max(acc, acc, curr.max), glm.vec3.copy(glm.vec3.create(), allEntries[0].max));
      const leafCost = 1 + (_getAABBSurfaceArea(leafMin, leafMax) / this.surfaceArea) * allEntries.length * 2;

      if (leafCost < (bestBucketPair?.cost ?? 999999999)) {
        // making a leaf since it's cheaper than the "cost of a adding more nodes"
        this._leaves.push(...allEntries);
        return;
      }
    }

    if (bestBucketPair.left.entries.length > 0) {
      this._childrenNodes.push(nodePool.acquire(bestBucketPair.left.min, bestBucketPair.left.max));
    }
    if (bestBucketPair.right.entries.length > 0) {
      this._childrenNodes.push(nodePool.acquire(bestBucketPair.right.min, bestBucketPair.right.max));
    }

    if (this._childrenNodes[0]) {
      this._childrenNodes[0]._subDivide(nodePool, bestBucketPair.left.entries);
    }
    if (this._childrenNodes[1]) {
      this._childrenNodes[1]._subDivide(nodePool, bestBucketPair.right.entries);
    }
  }

  // MARK: _collapse
  private _collapse(): void {

    // now must collapse it to a bvh4
    let mustLoopAgain = false;
    do {
      mustLoopAgain = false;


      // -> get the nodes as array
      // -> sort by surface area (from larger to smaller)
      // -> try to collapse (from larger to smaller)
      // ---> loop again on successful collapse

      // -> get the nodes as array
      const allNodes: BvhTreeNode<T>[] = [];
      const _recGetNode = (currNode: BvhTreeNode<T>) => {
        allNodes.push(currNode);
        currNode._childrenNodes.forEach((currChild) => _recGetNode(currChild));
      };
      _recGetNode(this);

      // -> sort by surface area (from larger to smaller)
      allNodes.sort((left, right) => (right.surfaceArea - left.surfaceArea));

      const _canCollapseChildNode = (parentNode: BvhTreeNode<T>): boolean => {
        if (parentNode._childrenNodes.length === 0) {
          return false; // no children to collapse -> skip
        }
        if (parentNode._leaves.length === 4) {
          return false; // no leaves space left -> skip
        }

        for (const currChild of parentNode._childrenNodes) {
          if (currChild._childrenNodes.length > 0) {
            continue; // has children -> skip
          }
          if (currChild._leaves.length === 0) {
            continue; // no leaves to collapse -> skip
          }
          return true;
        }

        return false;
      };

      let bestParentIndex = -1;
      let bestChildIndex = -1;
      let bestChildLeafIndex = -1;
      let bestChildLeafCost = 999999999;
      for (let ii =0; ii < allNodes.length; ++ii) {
        const parentNode = allNodes[ii];

        // try to reduce the cost of a node by collapsing it to its parent node
        // the most expensive nodes should be tried first

        if (!_canCollapseChildNode(parentNode)) {
          continue;
        }

        for (let jj = 0; jj < parentNode._childrenNodes.length; ++jj) {
          const currChild = parentNode._childrenNodes[jj];

          if (currChild._childrenNodes.length > 0) {
            continue; // has children -> skip
          }
          if (currChild._leaves.length === 0) {
            continue; // no leaves to collapse -> skip
          }

          let bestLocalLeafIndex = -1;
          let bestLocalCombinedCost = 999999999;
          for (let kk = 0; kk < currChild._leaves.length; ++kk) {
            currChild._leaves[kk];

            const currCost = _getAABBSurfaceAreaFromNode(currChild._leaves[kk]);
            const otherCost = _getAABBSurfaceAreaFromNodes(currChild._leaves, kk);

            const combinedCost = currCost + otherCost;

            if (
              otherCost < currCost &&
              bestLocalCombinedCost > combinedCost
            ) {
              bestLocalLeafIndex = kk;
              bestLocalCombinedCost = combinedCost;
            }
          }

          if (
            bestLocalLeafIndex >= 0 &&
            bestChildLeafCost > bestLocalCombinedCost
          ) {
            bestParentIndex = ii;
            bestChildIndex = jj;
            bestChildLeafIndex = bestLocalLeafIndex;
            bestChildLeafCost = bestLocalCombinedCost;
          }
        }


        // if (currNode._childrenNodes.length === 0) {
        //   continue; // no children nodes -> skip
        // }
        // if (currNode._leaves.length === 4) {
        //   continue; // no more space left -> skip
        // }

        // for (let ii = 0; ii < currNode._childrenNodes.length; ++ii) {
        //   const currChild = currNode._childrenNodes[ii];

        //   if (currChild._childrenNodes.length > 0) {
        //     continue; // has children nodes -> skip
        //   }
        //   if (currChild._leaves.length === 0) {
        //     continue; // has no leaves -> skip
        //   }
        // }

        // check children -> try to reduce the cost of children node by testing what happen when one is collapsed to the parent

        // if (currNode._childrenNodes.length === 1) {
        // }
        // else
        // {
        //   let bestIndex: number = -1;
        //   let bestCost: number = 999999999;

        //   for (let ii = 0; ii < currNode._childrenNodes.length; ++ii) {

        //     const otherChildren: BvhTreeNode<T>[] = [];
        //     for (let kk = 0; kk < currNode._childrenNodes.length; ++kk) {
        //       if (ii === kk) {
        //         continue;
        //       }
        //       otherChildren.push(currNode._childrenNodes[ii]);
        //     }

        //     const tmpCost = _getAABBSurfaceAreaFromNodes(...otherChildren);
        //     if (bestCost > tmpCost) {
        //       bestCost = tmpCost;
        //       bestIndex = ii;
        //     }
        //   }

        //   if (bestCost < currNode.surfaceArea) {
        //     const removed = currNode._childrenNodes.splice(bestIndex, 1);
        //     // removed.length
        //     currNode._leaves.push(...removed);
        //   }
        // }

        // _getAABBSurfaceAreaFromNodes();

        // currNode.surfaceArea
      }

      if (bestParentIndex >= 0) {

        const parentNode = allNodes[bestParentIndex];
        const childNode = parentNode._childrenNodes[bestChildIndex];

        parentNode._leaves.push(childNode._leaves[bestChildLeafIndex]);
        childNode._leaves.splice(bestChildLeafIndex, 1);

        mustLoopAgain = true;
      }


      if (!mustLoopAgain) {
        break;
      }

    } while (true);

  }

};
