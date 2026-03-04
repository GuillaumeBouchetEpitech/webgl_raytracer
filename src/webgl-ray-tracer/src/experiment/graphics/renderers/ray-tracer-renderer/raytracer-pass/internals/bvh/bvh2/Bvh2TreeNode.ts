
import * as glm from 'gl-matrix';

import { ObjectPool } from '../utils/ObjectPool';

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

    // const splitResult = this._naiveSplit(allEntries);
    const splitResult = this._surfaceAreaHeuristicSplit(allEntries);

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

  /// MARK: _naiveSplit
  private _naiveSplit(allEntries: ReadonlyArray<T>): { left: T[], right: T[] } {

    if (allEntries.length <= 2) {
      return {
        left: allEntries.slice(0, 1),
        right: allEntries.slice(1),
      };
    }

    // split the AABB into two across the longest AABB axis
    const deltaX = Math.abs(this.max[0] - this.min[0]);
    const deltaY = Math.abs(this.max[1] - this.min[1]);
    const deltaZ = Math.abs(this.max[2] - this.min[2]);
    const largestDelta = Math.max(deltaX, deltaY, deltaZ);

    let splitAxis: (0 | 1 | 2) = 2;
    if (largestDelta === deltaX) {
      splitAxis = 0; // split across x axis
    } else if (largestDelta === deltaY) {
      splitAxis = 1; // split across y axis
    } else {
      splitAxis = 2; // split across z axis
    }

    const sortedEntries = allEntries.slice().sort((shapeA, shapeB) => {
      const minA = shapeA.min[splitAxis];
      const maxA = shapeA.max[splitAxis];

      const minB = shapeB.min[splitAxis];
      const maxB = shapeB.max[splitAxis];

      return (minA + maxA) * 0.5 - (minB + maxB) * 0.5;
    });

    const halfIndex = Math.floor(sortedEntries.length / 2);

    return {
      left: sortedEntries.slice(0, halfIndex),
      right: sortedEntries.slice(halfIndex),
    };
  }

  /// MARK: _surfaceAreaHeuristicSplit
  private _surfaceAreaHeuristicSplit(allEntries: ReadonlyArray<T>): { left: T[], right: T[] } {

    if (allEntries.length <= 2) {
      return {
        left: allEntries.slice(0, 1),
        right: allEntries.slice(1),
      };
    }

    interface AABB {
      min: glm.ReadonlyVec3;
      max: glm.ReadonlyVec3;
    };

    const TOTAL_BIN = 8;
    const COST_TRAVERSE = 1;
    const COST_INTERSECT = 2;

    const _computeSurfaceArea = (inAabb: AABB): number => {
      const dx = Math.abs(inAabb.max[0] - inAabb.min[0]);
      const dy = Math.abs(inAabb.max[1] - inAabb.min[1]);
      const dz = Math.abs(inAabb.max[2] - inAabb.min[2]);
      return 2 * (dx * dy + dy * dz + dz * dx);
    };
    const _computeCenter = (inAabb: AABB): glm.vec3 => {
      return glm.vec3.fromValues(
        (inAabb.min[0] + inAabb.max[0]) * 0.5,
        (inAabb.min[1] + inAabb.max[1]) * 0.5,
        (inAabb.min[2] + inAabb.max[2]) * 0.5,
      );
    };
    const _mergeAABB = (inA: AABB, inB: AABB) => {
      return {
        min: glm.vec3.min(glm.vec3.create(), inA.min, inB.min),
        max: glm.vec3.min(glm.vec3.create(), inA.max, inB.max),
      };
    };

    const parentSurfaceArea = _computeSurfaceArea(this);

    let bestSplitAxis = 0;
    let bestSplitPos = 0;
    let bestSplitCost = Number.MAX_SAFE_INTEGER;

    ([0,1,2] as ReadonlyArray<0|1|2>).forEach((currAxis) => {
      const parentMin = this.min[currAxis];
      const parentMax = this.max[currAxis];
      const parentRange = (parentMax - parentMin);

      // degenerate axis -> all primitives share the same centroid position.
      if (parentRange < 0.01) {
        return;
      }

      interface ShapesBin {
        aabb: AABB;
        total: number;
      };

      const allBins: ShapesBin[] = Array.from({ length: TOTAL_BIN }, () => ({
        aabb: {
          min: glm.vec3.fromValues(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER),
          max: glm.vec3.fromValues(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER),
        },
        total: 0,
      }));

      allEntries.forEach((currEntry) => {

        const center = _computeCenter(currEntry);

        const fract = (center[currAxis] - parentMin) / parentRange; // [0..1]
        const binIndex = Math.min(Math.floor(fract * TOTAL_BIN), TOTAL_BIN - 1); // [0..7]

        // set/grow aabb
        allBins[binIndex].aabb = _mergeAABB(allBins[binIndex].aabb, currEntry);

        // grow total
        allBins[binIndex].total++;
      });

      // left to right -> accumulate prefix AABB and total.
      const allLeftBins: ShapesBin[] = [];
      {
        let tmpAABB: AABB = {
          min: glm.vec3.fromValues(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER),
          max: glm.vec3.fromValues(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER),
        };
        let tmpTotal = 0;
        for (let ii = 0; ii < TOTAL_BIN; ++ii) {

          if (allBins[ii].total > 0) {
            // set/grow aabb
            tmpAABB = _mergeAABB(tmpAABB, allBins[ii].aabb);
            // grow total
            tmpTotal += allBins[ii].total;
          }

          // save
          allLeftBins.push({ aabb: tmpAABB, total: tmpTotal });
        }
      }

      // right to left -> evaluate split cost at each boundary.
      const rightBin: ShapesBin = {
        aabb: {
          min: glm.vec3.fromValues(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER),
          max: glm.vec3.fromValues(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER),
        },
        total: 0,
      };
      for (let ii = TOTAL_BIN - 1; ii >= 1; --ii) {

        // set/grow aabb
        rightBin.aabb = _mergeAABB(rightBin.aabb, allBins[ii].aabb);
        // grow total
        rightBin.total += allBins[ii].total;

        const leftTotalIndex = (ii - 1);

        const leftBin = allLeftBins[leftTotalIndex];
        if (leftBin.total === 0 || rightBin.total === 0) {
          continue;
        }

        const splitCost =
          COST_TRAVERSE +
          COST_INTERSECT * (
            (_computeSurfaceArea(leftBin.aabb) / parentSurfaceArea) * leftBin.total +
            (_computeSurfaceArea(rightBin.aabb) / parentSurfaceArea) * rightBin.total
          );

        if (splitCost < bestSplitCost) {
          bestSplitAxis =  currAxis;
          bestSplitCost = splitCost;
          bestSplitPos = parentMin + (ii / TOTAL_BIN) * parentRange
        }
      }
    });

    const left: T[] = [];
    const right: T[] = [];

    for (const currEntry of allEntries) {
      if (_computeCenter(currEntry)[bestSplitAxis] < bestSplitPos) {
        left.push(currEntry);
      } else {
        right.push(currEntry);
      }
    }

    // is it balanced?
    if (left.length == 0 || right.length == 0) {
      // no -> fallback to naive split
      const mid = Math.floor(allEntries.length / 2);
      return {
        left: allEntries.slice(0, mid),
        right: allEntries.slice(mid),
      };
    }

    return { left, right };
  }

};
