import * as glm from 'gl-matrix';

// Let EPS (epsilon) be a small value
const EPS = 0.0000001;

// Due to double rounding precision the value passed into the Math.acos
// function may be outside its domain of [-1, +1] which would return
// the value NaN which we do not want.
const _safeAcos = (x: number): number => {
  if (x >= +1.0) return 0.0;
  if (x <= -1.0) return Math.PI;
  return Math.acos(x);
};

// Rotates a point about a fixed point at some angle 'a'
const _rotatePoint = (
  fp: glm.ReadonlyVec2,
  pt: glm.ReadonlyVec2,
  a: number
): glm.vec2 => {
  const x = pt[0] - fp[0];
  const y = pt[1] - fp[1];
  const xRot = x * Math.cos(a) + y * Math.sin(a);
  const yRot = y * Math.cos(a) - x * Math.sin(a);
  return glm.vec2.fromValues(fp[0] + xRot, fp[1] + yRot);
};

export interface ICircle {
  center: glm.ReadonlyVec2;
  radius: number;
}

// Given two circles this method finds the intersection
// point(s) of the two circles (if any exists)
/**
 *          _____
 *         /     \
 *        /       \
 *       /         \
 *      |      C1   |
 *      |     *     |
 *      |   _____   |
 *       \ /     \ /
 * pt1 -> x       x <- pt2
 *       / \_____/ \
 *      |           |
 *      |     *     |
 *      |      C2   |
 *       \         /
 *        \       /
 *         \_____/
 *
 */
export const circleCircleIntersectionPoints = (
  c1: Readonly<ICircle>,
  c2: Readonly<ICircle>
): [glm.vec2, glm.vec2] | [glm.vec2] | undefined => {
  let r1: number,
    R2: number,
    d: number,
    dx: number,
    dy: number,
    c1x: number,
    c1y: number,
    C2x: number,
    C2y: number;

  if (c1.radius < c2.radius) {
    r1 = c1.radius;
    R2 = c2.radius;
    c1x = c1.center[0];
    c1y = c1.center[1];
    C2x = c2.center[0];
    C2y = c2.center[1];
  } else {
    r1 = c2.radius;
    R2 = c1.radius;
    C2x = c1.center[0];
    C2y = c1.center[1];
    c1x = c2.center[0];
    c1y = c2.center[1];
  }

  // Compute the vector <dx, dy>
  dx = c1x - C2x;
  dy = c1y - C2y;

  // Find the distance between two points.
  d = Math.sqrt(dx * dx + dy * dy);

  // There are an infinite number of solutions
  // Seems appropriate to also return null
  if (d < EPS && Math.abs(R2 - r1) < EPS) return;

  // No intersection (circles centered at the
  // same place with different size)
  if (d < EPS) return;

  const x = (dx / d) * R2 + C2x;
  const y = (dy / d) * R2 + C2y;
  const P = glm.vec2.fromValues(x, y);

  // Single intersection (kissing circles)
  if (Math.abs(R2 + r1 - d) < EPS || Math.abs(R2 - (r1 + d)) < EPS) {
    return [P];
  }

  // No intersection. Either the small circle contained within
  // big circle or circles are simply disjoint.
  if (d + r1 < R2 || R2 + r1 < d) return;

  const C = glm.vec2.fromValues(C2x, C2y);
  const angle = _safeAcos((r1 * r1 - d * d - R2 * R2) / (-2.0 * d * R2));
  const pt1 = _rotatePoint(C, P, +angle);
  const pt2 = _rotatePoint(C, P, -angle);

  return [pt1, pt2];
};
