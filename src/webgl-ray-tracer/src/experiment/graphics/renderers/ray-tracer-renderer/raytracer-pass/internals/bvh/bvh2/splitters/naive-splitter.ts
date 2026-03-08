
import * as aabb from '../aabb-utils';

export const naiveSplit = <T extends aabb.AABB>(
  parentNode: Readonly<aabb.AABB>,
  allEntries: ReadonlyArray<T>
): { left: T[], right: T[] } => {

  if (allEntries.length <= 2) {
    return {
      left: allEntries.slice(0, 1),
      right: allEntries.slice(1),
    };
  }

  // split the AABB into two across the longest AABB axis
  const deltaX = Math.abs(parentNode.max[0] - parentNode.min[0]);
  const deltaY = Math.abs(parentNode.max[1] - parentNode.min[1]);
  const deltaZ = Math.abs(parentNode.max[2] - parentNode.min[2]);
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

  const halfIndex = Math.floor(sortedEntries.length * 0.5);

  return {
    left: sortedEntries.slice(0, halfIndex),
    right: sortedEntries.slice(halfIndex),
  };
}
