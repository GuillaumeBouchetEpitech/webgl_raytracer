
import * as glm from 'gl-matrix';
import { IInternalBox, IInternalSphere, IInternalTriangle, IStackRenderer } from './RayTracerRenderer';

const k_minDelta = 0.01;

interface ISphereShape {
  index: number;
  min: glm.ReadonlyVec3;
  max: glm.ReadonlyVec3;
  type: 'sphere';
  shape: IInternalSphere;
};
interface IBoxShape {
  index: number;
  min: glm.ReadonlyVec3;
  max: glm.ReadonlyVec3;
  type: 'box';
  shape: IInternalBox;
};
interface ITriangleShape {
  index: number;
  min: glm.ReadonlyVec3;
  max: glm.ReadonlyVec3;
  type: 'triangle';
  shape: IInternalTriangle;
};
type IShape = ISphereShape | IBoxShape | ITriangleShape;

const _renderAABB = (
  renderer: IStackRenderer,
  min: glm.ReadonlyVec3,
  max: glm.ReadonlyVec3,
  color: glm.ReadonlyVec3,
) => {

  const vertices: glm.ReadonlyVec3[] = [
    [min[0], min[1], min[2]],
    [max[0], min[1], min[2]],
    [min[0], max[1], min[2]],
    [max[0], max[1], min[2]],
    [min[0], min[1], max[2]],
    [max[0], min[1], max[2]],
    [min[0], max[1], max[2]],
    [max[0], max[1], max[2]],
  ];

  const indices: [number,number][] = [
    [0,1],[1,3],[3,2],[2,0],
    [4,5],[5,7],[7,6],[6,4],
    [0,4],[1,5],[2,6],[3,7],
  ];

  for (const pair of indices) {
    renderer.pushLine(vertices[pair[0]], vertices[pair[1]], color);
  }
};

class BVHNode {

  _index: number = -1;

  _min = glm.vec3.create();
  _max = glm.vec3.create();

  _leftNode?: BVHNode;
  _rightNode?: BVHNode;

  _leftLeaf?: IShape;
  _rightLeaf?: IShape;

  public static s_index: number = 0;

  constructor(
    min: glm.vec3,
    max: glm.vec3,
  ) {
    this._index = BVHNode.s_index;
    BVHNode.s_index += 1;
    glm.vec3.copy(this._min, min);
    glm.vec3.copy(this._max, max);
  }

  subDivide(
    allShapes: ReadonlyArray<IShape>,
  ): void {

    if (allShapes.length <= 2) {
      this._leftLeaf = allShapes[0];
      this._rightLeaf = allShapes[1];
      return;
    }

    // split the AABB into two across the longest AABB axis
    const dx = Math.abs(this._max[0] - this._min[0]);
    const dy = Math.abs(this._max[1] - this._min[1]);
    const dz = Math.abs(this._max[2] - this._min[2]);
    const largestDelta = Math.max(dx, dy, dz);

    if (largestDelta === dx) {
      this._splitAcross(0, allShapes); // split BV AABB across x axis
    } else if (largestDelta === dy) {
      this._splitAcross(1, allShapes); // split BV AABB across y axis
    } else {
      this._splitAcross(2, allShapes); // split BV AABB across z axis
    }
  }

  private _splitAcross(axis: 0 | 1 | 2, allShapes: ReadonlyArray<IShape>) {
    const sorted = [...allShapes].sort((shapeA, shapeB) => {
      const a0 = shapeA.min[axis];
      const a1 = shapeA.max[axis];

      const b0 = shapeB.min[axis];
      const b1 = shapeB.max[axis];

      return (a0 + a1) / 2.0 - (b0 + b1) / 2.0;
    });

    const h = sorted.length / 2;
    const l = sorted.length;
    const ltFaces = sorted.slice(0, h); // left faces
    const rtFaces = sorted.slice(h, l); // right faces

    if (ltFaces.length > 0) {
      const min = glm.vec3.fromValues(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
      const max = glm.vec3.fromValues(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
      ltFaces.forEach((f) => {
        min[0] = Math.min(min[0], f.min[0]);
        min[1] = Math.min(min[1], f.min[1]);
        min[2] = Math.min(min[2], f.min[2]);
        max[0] = Math.max(max[0], f.max[0]);
        max[1] = Math.max(max[1], f.max[1]);
        max[2] = Math.max(max[2], f.max[2]);
      });

      this._leftNode = new BVHNode(min, max);
    }

    if (rtFaces.length > 0) {
      const min = glm.vec3.fromValues(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
      const max = glm.vec3.fromValues(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
      rtFaces.forEach((f) => {
        min[0] = Math.min(min[0], f.min[0]);
        min[1] = Math.min(min[1], f.min[1]);
        min[2] = Math.min(min[2], f.min[2]);
        max[0] = Math.max(max[0], f.max[0]);
        max[1] = Math.max(max[1], f.max[1]);
        max[2] = Math.max(max[2], f.max[2]);
      });

      this._rightNode = new BVHNode(min, max);
    }

    if (this._leftNode) {
      this._leftNode.subDivide(ltFaces);
    }
    if (this._rightNode) {
      this._rightNode.subDivide(rtFaces);
    }
  }

  render(renderer: IStackRenderer, color: glm.ReadonlyVec3): void {
    _renderAABB(renderer, this._min, this._max, color);

    if (this._leftNode) {
      this._leftNode.render(renderer, [0, 0.5, 0]);
      renderer.pushLine(
        [ this._max[0] + 0.1, this._max[1] + 0.1, this._max[2] + 0.1 ],
        [ this._leftNode._max[0] + 0.1, this._leftNode._max[1] + 0.1, this._leftNode._max[2] + 0.1 ],
        [1,0,1]
      );
    }

    if (this._rightNode) {
      this._rightNode.render(renderer, [0, 0, 0.5]);
      renderer.pushLine(
        [ this._max[0] + 0.1, this._max[1] + 0.1, this._max[2] + 0.1 ],
        [ this._rightNode._max[0] + 0.1, this._rightNode._max[1] + 0.1, this._rightNode._max[2] + 0.1 ],
        [1,0,1]
      );
    }

    if (this._leftLeaf) {
      _renderAABB(renderer, this._leftLeaf.min, this._leftLeaf.max, [0.5,0.5,0]);
      renderer.pushLine(
        [ this._max[0] + 0.1, this._max[1] + 0.1, this._max[2] + 0.1 ],
        [ this._leftLeaf.max[0] + 0.1, this._leftLeaf.max[1] + 0.1, this._leftLeaf.max[2] + 0.1 ],
        [1,0,0]
      );
    }

    if (this._rightLeaf) {
      _renderAABB(renderer, this._rightLeaf.min, this._rightLeaf.max, [0.5,0.5,0]);
      renderer.pushLine(
        [ this._max[0] + 0.1, this._max[1] + 0.1, this._max[2] + 0.1 ],
        [ this._rightLeaf.max[0] + 0.1, this._rightLeaf.max[1] + 0.1, this._rightLeaf.max[2] + 0.1 ],
        [1,0,0]
      );
    }

  }

};

export class BVH {

  private _allShapes: IShape[] = [];

  private _rootNode?: BVHNode;

  constructor() {
  }

  reset() {
    this._allShapes.length = 0;
    this._rootNode = undefined;
  }

  synchronize(
    allSpheres: IInternalSphere[],
    allBoxes: IInternalBox[],
    allTriangles: IInternalTriangle[],
  ) {

    this.reset();

    // setup the generic shape list
    let index = 0;
    for (const currShape of allSpheres) {

      const min = glm.vec3.fromValues(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
      const max = glm.vec3.fromValues(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);

      min[0] = Math.min(min[0], currShape.position[0] - currShape.radius);
      min[1] = Math.min(min[1], currShape.position[1] - currShape.radius);
      min[2] = Math.min(min[2], currShape.position[2] - currShape.radius);
      max[0] = Math.max(max[0], currShape.position[0] + currShape.radius);
      max[1] = Math.max(max[1], currShape.position[1] + currShape.radius);
      max[2] = Math.max(max[2], currShape.position[2] + currShape.radius);

      if (max[0] - min[0] < k_minDelta) {
        max[0] += k_minDelta;
      }
      if (max[1] - min[1] < k_minDelta) {
        max[1] += k_minDelta;
      }
      if (max[2] - min[2] < k_minDelta) {
        max[2] += k_minDelta;
      }

      this._allShapes.push({ index: index++, type: 'sphere', shape: currShape, min, max });
    }
    for (const currShape of allBoxes) {

      const min = glm.vec3.fromValues(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
      const max = glm.vec3.fromValues(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);

      const vertices: ReadonlyArray<glm.ReadonlyVec3> = [
        glm.vec3.fromValues(-currShape.boxSize[0], -currShape.boxSize[1], -currShape.boxSize[2]),
        glm.vec3.fromValues(+currShape.boxSize[0], -currShape.boxSize[1], -currShape.boxSize[2]),
        glm.vec3.fromValues(-currShape.boxSize[0], +currShape.boxSize[1], -currShape.boxSize[2]),
        glm.vec3.fromValues(+currShape.boxSize[0], +currShape.boxSize[1], -currShape.boxSize[2]),
        glm.vec3.fromValues(-currShape.boxSize[0], -currShape.boxSize[1], +currShape.boxSize[2]),
        glm.vec3.fromValues(+currShape.boxSize[0], -currShape.boxSize[1], +currShape.boxSize[2]),
        glm.vec3.fromValues(-currShape.boxSize[0], +currShape.boxSize[1], +currShape.boxSize[2]),
        glm.vec3.fromValues(+currShape.boxSize[0], +currShape.boxSize[1], +currShape.boxSize[2])
      ];

      // const vertices2: glm.ReadonlyVec3[] = [];

      vertices.forEach((vertex) => {
        const pos = glm.vec3.fromValues(0, 0, 0);

        const mat4 = glm.mat4.identity(glm.mat4.create());
        glm.mat4.translate(mat4, mat4, currShape.position);
        const mat4b = glm.mat4.fromQuat(glm.mat4.create(), currShape.orientation);
        glm.mat4.multiply(mat4, mat4, mat4b);

        glm.vec3.transformMat4(pos, vertex, mat4);
        // vertices2.push(pos);

        min[0] = Math.min(min[0], pos[0]);
        min[1] = Math.min(min[1], pos[1]);
        min[2] = Math.min(min[2], pos[2]);
        max[0] = Math.max(max[0], pos[0]);
        max[1] = Math.max(max[1], pos[1]);
        max[2] = Math.max(max[2], pos[2]);
      });

      if (max[0] - min[0] < k_minDelta) {
        max[0] += k_minDelta;
      }
      if (max[1] - min[1] < k_minDelta) {
        max[1] += k_minDelta;
      }
      if (max[2] - min[2] < k_minDelta) {
        max[2] += k_minDelta;
      }

      this._allShapes.push({ index: index++, type: 'box', shape: currShape, min, max });
    }
    for (const currShape of allTriangles) {

      const min = glm.vec3.fromValues(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
      const max = glm.vec3.fromValues(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);

      min[0] = Math.min(min[0], currShape.v0[0]);
      min[1] = Math.min(min[1], currShape.v0[1]);
      min[2] = Math.min(min[2], currShape.v0[2]);
      max[0] = Math.max(max[0], currShape.v0[0]);
      max[1] = Math.max(max[1], currShape.v0[1]);
      max[2] = Math.max(max[2], currShape.v0[2]);

      min[0] = Math.min(min[0], currShape.v1[0]);
      min[1] = Math.min(min[1], currShape.v1[1]);
      min[2] = Math.min(min[2], currShape.v1[2]);
      max[0] = Math.max(max[0], currShape.v1[0]);
      max[1] = Math.max(max[1], currShape.v1[1]);
      max[2] = Math.max(max[2], currShape.v1[2]);

      min[0] = Math.min(min[0], currShape.v2[0]);
      min[1] = Math.min(min[1], currShape.v2[1]);
      min[2] = Math.min(min[2], currShape.v2[2]);
      max[0] = Math.max(max[0], currShape.v2[0]);
      max[1] = Math.max(max[1], currShape.v2[1]);
      max[2] = Math.max(max[2], currShape.v2[2]);

      if (max[0] - min[0] < k_minDelta) {
        max[0] += k_minDelta;
      }
      if (max[1] - min[1] < k_minDelta) {
        max[1] += k_minDelta;
      }
      if (max[2] - min[2] < k_minDelta) {
        max[2] += k_minDelta;
      }

      this._allShapes.push({ index: index++, type: 'triangle', shape: currShape, min, max });
    }

    // create root node
    const min = glm.vec3.fromValues(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
    const max = glm.vec3.fromValues(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
    for (const currShape of this._allShapes) {

      min[0] = Math.min(min[0], currShape.min[0]);
      min[1] = Math.min(min[1], currShape.min[1]);
      min[2] = Math.min(min[2], currShape.min[2]);
      max[0] = Math.max(max[0], currShape.max[0]);
      max[1] = Math.max(max[1], currShape.max[1]);
      max[2] = Math.max(max[2], currShape.max[2]);
    }

    BVHNode.s_index = 0;

    this._rootNode = new BVHNode(min, max);
    this._rootNode.subDivide(this._allShapes);
  }


  fillDataTexture(): [number, number, number, number][] {

    const pixels: [number, number, number, number][] = [];

    if (!this._rootNode) {
      return pixels;
    }

    const allNodes: BVHNode[] = [];

    const _recFunc = (currNode: BVHNode) => {

      allNodes.push(currNode);

      if (currNode._leftNode) {
        _recFunc(currNode._leftNode);
      }
      if (currNode._rightNode) {
        _recFunc(currNode._rightNode);
      }

    };
    _recFunc(this._rootNode);

    allNodes.sort((a, b) => a._index - b._index);

    for (const currNode of allNodes) {

      pixels.push([
        currNode._min[0],
        currNode._min[1],
        currNode._min[2],
        currNode._max[0],
      ]);
      pixels.push([
        currNode._max[1],
        currNode._max[2],
        (currNode._leftNode?._index ?? -2) + 0.5,
        (currNode._rightNode?._index ?? -2) + 0.5,
      ]);
      pixels.push([
        (currNode._leftLeaf?.index ?? -2) + 0.5,
        (currNode._rightLeaf?.index ?? -2) + 0.5,
        0,
        0,
      ]);

    }

    //

    return pixels;
  }

  render(
    renderer: IStackRenderer,
  ) {

    if (!this._rootNode) {
      return;
    }

    this._rootNode.render(renderer, [0.5,0.0,0.0]);

    for (const currShape of this._allShapes) {
      _renderAABB(renderer, currShape.min, currShape.max, [1.0,1.0,0.0]);
    }

  }

};
