
import * as glm from 'gl-matrix';

interface IBvh2Entry {
  min: glm.ReadonlyVec3;
  max: glm.ReadonlyVec3;
};

export const surfaceAreaHeuristicSplit = <T extends IBvh2Entry>(
  parentNode: Readonly<IBvh2Entry>,
  allEntries: ReadonlyArray<T>,
): { left: T[], right: T[] } => {

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

  const parentSurfaceArea = _computeSurfaceArea(parentNode);

  let bestSplitAxis = 0;
  let bestSplitPos = 0;
  let bestSplitCost = Number.MAX_SAFE_INTEGER;

  ([0,1,2] as ReadonlyArray<0|1|2>).forEach((currAxis) => {
    const parentMin = parentNode.min[currAxis];
    const parentMax = parentNode.max[currAxis];
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
