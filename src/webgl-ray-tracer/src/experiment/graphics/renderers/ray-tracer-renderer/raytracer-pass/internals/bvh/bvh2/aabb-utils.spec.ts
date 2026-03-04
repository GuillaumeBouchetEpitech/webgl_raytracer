
import * as glm from "gl-matrix"

import * as aabb from "./aabb-utils";

const _makeAABB = (min: glm.vec3, max: glm.vec3): aabb.MutableAABB => ({
  min: glm.vec3.copy(glm.vec3.create(), min),
  max: glm.vec3.copy(glm.vec3.create(), max),
});

describe("AABB", () => {

  describe("setAabbFromAabbList", () => {
    test("set overlapping", () => {
      const n = _makeAABB([0, 0, 0], [1, 1, 1]);
      const a = _makeAABB([0, 0, 0], [2, 2, 2]);
      const b = _makeAABB([1, 1, 1], [3, 3, 3]);
      aabb.setAabbFromAabbList(n, [a, b]);
      expect(n).toEqual(_makeAABB([0, 0, 0], [3, 3, 3]));
    });

    test("set non-overlapping", () => {
      const n = _makeAABB([0, 0, 0], [1, 1, 1]);
      const a = _makeAABB([0, 0, 0], [1, 1, 1]);
      const b = _makeAABB([5, 5, 5], [6, 6, 6]);
      aabb.setAabbFromAabbList(n, [a, b]);
      expect(n).toEqual(_makeAABB([0, 0, 0], [6, 6, 6]));
    });
  });

  describe("growAabbFromAabb", () => {
    test("grow overlapping", () => {
      const a = _makeAABB([0, 0, 0], [2, 2, 2]);
      const b = _makeAABB([1, 1, 1], [3, 3, 3]);
      const m = aabb.growAabbFromAabb(a, b);
      expect(m).toEqual(_makeAABB([0, 0, 0], [3, 3, 3]));
    });

    test("grow non-overlapping", () => {
      const a = _makeAABB([0, 0, 0], [1, 1, 1]);
      const b = _makeAABB([5, 5, 5], [6, 6, 6]);
      const m = aabb.growAabbFromAabb(a, b);
      expect(m).toEqual(_makeAABB([0, 0, 0], [6, 6, 6]));
    });

    test("grow a box with itself returns the same box", () => {
      const a = _makeAABB([1, 2, 3], [4, 5, 6]);
      const m = aabb.growAabbFromAabb(a, a);
      expect(m).toEqual(a);
    });
  });

  describe("computeSurfaceArea", () => {
    test("simple aabb -> SA of ~6", () => {
      const a = _makeAABB([0, 0, 0], [1, 1, 1]);
      expect(aabb.computeSurfaceArea(a)).toBeCloseTo(6.0);
    });

    test("2x3x4 aabb -> SA of ~52", () => {
      const a = _makeAABB([0, 0, 0], [2, 3, 4]);
      expect(aabb.computeSurfaceArea(a)).toBeCloseTo(52.0);
    });

    test("simple flat aabb -> SA of ~2", () => {
      const a = _makeAABB([0, 0, 0], [1, 1, 0]);
      expect(aabb.computeSurfaceArea(a)).toBeCloseTo(2.0);
    });
  });

  describe("computeCenter", () => {
    test("simple aabb", () => {
      const a = _makeAABB([0, 0, 0], [2, 2, 2]);
      expect(aabb.computeCenter(a)).toEqual(glm.vec3.fromValues(1, 1, 1));
    });

    test("asymmetric aabb", () => {
      const a = _makeAABB([2, 4, 6], [4, 8, 10]);
      expect(aabb.computeCenter(a)).toEqual(glm.vec3.fromValues(3, 6, 8));
    });
  });

  describe("growAabbFromAabb", () => {
    test("complex-ish scenario", () => {
      const a = _makeAABB([0, 0, 0], [1, 1, 1]);
      expect(a).toEqual(_makeAABB([0, 0, 0], [1, 1, 1]));
      aabb.growAabbFromAabb(a, _makeAABB([0, 0, 0], [3, 1, 1]));
      expect(a).toEqual(_makeAABB([0, 0, 0], [3, 1, 1]));
      aabb.growAabbFromAabb(a, _makeAABB([0, 0, 0], [1, 3, 1]));
      expect(a).toEqual(_makeAABB([0, 0, 0], [3, 3, 1]));
      aabb.growAabbFromAabb(a, _makeAABB([0, 0, 0], [1, 1, 3]));
      expect(a).toEqual(_makeAABB([0, 0, 0], [3, 3, 3]));
    });
  });



});
