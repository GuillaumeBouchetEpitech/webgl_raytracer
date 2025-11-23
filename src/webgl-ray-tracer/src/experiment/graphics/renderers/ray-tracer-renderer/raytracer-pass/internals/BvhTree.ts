
import * as glm from 'gl-matrix';
import { IInternalBox, IInternalSphere, IInternalTriangle, IStackRenderer } from '../all-interfaces';

const k_minDelta = 0.01;

interface IGenericShape {
  index: number;
  min: glm.ReadonlyVec3;
  max: glm.ReadonlyVec3;
};
interface ISphereShape extends IGenericShape {
  type: 'sphere';
  shape: IInternalSphere;
};
interface IBoxShape extends IGenericShape {
  type: 'box';
  shape: IInternalBox;
};
interface ITriangleShape extends IGenericShape {
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

  const vertices: ReadonlyArray<glm.ReadonlyVec3> = [
    [min[0]-0.1, min[1]-0.1, min[2]-0.1],
    [max[0]+0.1, min[1]-0.1, min[2]-0.1],
    [min[0]-0.1, max[1]+0.1, min[2]-0.1],
    [max[0]+0.1, max[1]+0.1, min[2]-0.1],
    [min[0]-0.1, min[1]-0.1, max[2]+0.1],
    [max[0]+0.1, min[1]-0.1, max[2]+0.1],
    [min[0]-0.1, max[1]+0.1, max[2]+0.1],
    [max[0]+0.1, max[1]+0.1, max[2]+0.1],
  ];

  const indices: ReadonlyArray<glm.ReadonlyVec2> = [
    [0,1],[1,3],[3,2],[2,0],
    [4,5],[5,7],[7,6],[6,4],
    [0,4],[1,5],[2,6],[3,7],
  ];

  for (const pair of indices) {
    // renderer.pushLine(vertices[pair[0]], vertices[pair[1]], color);
    renderer.push3dLine(vertices[pair[0]], vertices[pair[1]], 0.025, 0.025, color, color);
  }
};

class BvhTreeNode {

  _index: number = -1;

  _min = glm.vec3.create();
  _max = glm.vec3.create();

  _leftNode?: BvhTreeNode;
  _rightNode?: BvhTreeNode;

  _leftLeaf?: IShape;
  _rightLeaf?: IShape;

  static s_index: number = 0;

  static buildBvhGraph(
    min: glm.vec3,
    max: glm.vec3,
    allShapes: ReadonlyArray<IShape>,
  ): BvhTreeNode {
    BvhTreeNode.s_index = 0;
    const rootNode = new BvhTreeNode(min, max);
    rootNode.subDivide(allShapes);
    return rootNode;
  }

  private constructor(
    min: glm.vec3,
    max: glm.vec3,
  ) {
    this._index = BvhTreeNode.s_index;
    BvhTreeNode.s_index += 1;
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
    const deltaX = Math.abs(this._max[0] - this._min[0]);
    const deltaY = Math.abs(this._max[1] - this._min[1]);
    const deltaZ = Math.abs(this._max[2] - this._min[2]);
    const largestDelta = Math.max(deltaX, deltaY, deltaZ);

    if (largestDelta === deltaX) {
      this._splitAcross(0, allShapes); // split across x axis
    } else if (largestDelta === deltaY) {
      this._splitAcross(1, allShapes); // split across y axis
    } else {
      this._splitAcross(2, allShapes); // split across z axis
    }
  }

  private _splitAcross(axis: 0 | 1 | 2, allShapes: ReadonlyArray<IShape>) {
    const sorted = [...allShapes].sort((shapeA, shapeB) => {
      const minA = shapeA.min[axis];
      const maxA = shapeA.max[axis];

      const minB = shapeB.min[axis];
      const maxB = shapeB.max[axis];

      return (minA + maxA) / 2.0 - (minB + maxB) / 2.0;
    });

    const halfIndex = Math.floor(sorted.length / 2);
    const leftSubFaces = sorted.slice(0, halfIndex);
    const rightSubFaces = sorted.slice(halfIndex);

    if (leftSubFaces.length > 0) {
      const min = glm.vec3.fromValues(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
      const max = glm.vec3.fromValues(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
      leftSubFaces.forEach((f) => {
        min[0] = Math.min(min[0], f.min[0]);
        min[1] = Math.min(min[1], f.min[1]);
        min[2] = Math.min(min[2], f.min[2]);
        max[0] = Math.max(max[0], f.max[0]);
        max[1] = Math.max(max[1], f.max[1]);
        max[2] = Math.max(max[2], f.max[2]);
      });

      this._leftNode = new BvhTreeNode(min, max);
    }

    if (rightSubFaces.length > 0) {
      const min = glm.vec3.fromValues(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
      const max = glm.vec3.fromValues(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);
      rightSubFaces.forEach((f) => {
        min[0] = Math.min(min[0], f.min[0]);
        min[1] = Math.min(min[1], f.min[1]);
        min[2] = Math.min(min[2], f.min[2]);
        max[0] = Math.max(max[0], f.max[0]);
        max[1] = Math.max(max[1], f.max[1]);
        max[2] = Math.max(max[2], f.max[2]);
      });

      this._rightNode = new BvhTreeNode(min, max);
    }

    if (this._leftNode) {
      this._leftNode.subDivide(leftSubFaces);
    }
    if (this._rightNode) {
      this._rightNode.subDivide(rightSubFaces);
    }
  }

  render(renderer: IStackRenderer, color: glm.ReadonlyVec3): void {
    _renderAABB(renderer, this._min, this._max, color);

    if (this._leftNode) {
      this._leftNode.render(renderer, [0, 0.5, 0]);

      // render the "link" to the child node (purple)
      const pointA: glm.ReadonlyVec3 = [ this._max[0] + 0.1, this._max[1] + 0.1, this._max[2] + 0.1 ];
      const pointB: glm.ReadonlyVec3 = [ this._leftNode._max[0] + 0.1, this._leftNode._max[1] + 0.1, this._leftNode._max[2] + 0.1 ];
      // renderer.pushLine(pointA, pointB, [1,0,1]);
      renderer.push3dLine(pointA, pointB, 0.2, 0.0, [1,0,1], [1,0,1]);
    }

    if (this._rightNode) {
      this._rightNode.render(renderer, [0, 0, 0.5]);

      // render the "link" to the child node (purple)
      const pointA: glm.ReadonlyVec3 = [ this._max[0] + 0.1, this._max[1] + 0.1, this._max[2] + 0.1 ];
      const pointB: glm.ReadonlyVec3 = [ this._rightNode._max[0] + 0.1, this._rightNode._max[1] + 0.1, this._rightNode._max[2] + 0.1 ];
      // renderer.pushLine(pointA, pointB, [1,0,1]);
      renderer.push3dLine(pointA, pointB, 0.2, 0.0, [1,0,1], [1,0,1]);
    }

    if (this._leftLeaf) {
      _renderAABB(renderer, this._leftLeaf.min, this._leftLeaf.max, [0.5,0.5,0]);

      // render the "link" to the leaf (red)
      const pointA: glm.ReadonlyVec3 = [ this._max[0] + 0.1, this._max[1] + 0.1, this._max[2] + 0.1 ];
      const pointB: glm.ReadonlyVec3 = [ this._leftLeaf.max[0] + 0.1, this._leftLeaf.max[1] + 0.1, this._leftLeaf.max[2] + 0.1 ];
      // renderer.pushLine(pointA, pointB, [1,0,0]);
      renderer.push3dLine(pointA, pointB, 0.2, 0.0, [1,0,0], [1,0,0]);
    }

    if (this._rightLeaf) {
      _renderAABB(renderer, this._rightLeaf.min, this._rightLeaf.max, [0.5,0.5,0]);

      // render the "link" to the leaf (red)
      const pointA: glm.ReadonlyVec3 = [ this._max[0] + 0.1, this._max[1] + 0.1, this._max[2] + 0.1 ]
      const pointB: glm.ReadonlyVec3 = [ this._rightLeaf.max[0] + 0.1, this._rightLeaf.max[1] + 0.1, this._rightLeaf.max[2] + 0.1 ]
      // renderer.pushLine(pointA, pointB, [1,0,0]);
      renderer.push3dLine(pointA, pointB, 0.2, 0.0, [1,0,0], [1,0,0]);
    }

  }

};

export class BvhTree {

  private _allShapes: IShape[] = [];

  private _rootNode?: BvhTreeNode;

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

      // here we ensure the shape is not "paper flat" on any of its axises
      if (max[0] - min[0] < k_minDelta) { max[0] += k_minDelta; }
      if (max[1] - min[1] < k_minDelta) { max[1] += k_minDelta; }
      if (max[2] - min[2] < k_minDelta) { max[2] += k_minDelta; }

      this._allShapes.push({ index: index++, type: 'sphere', shape: currShape, min, max });
    }
    for (const currShape of allBoxes) {

      const min = glm.vec3.fromValues(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
      const max = glm.vec3.fromValues(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);

      const allBoxCorners: ReadonlyArray<glm.ReadonlyVec3> = [
        glm.vec3.fromValues(-currShape.boxSize[0], -currShape.boxSize[1], -currShape.boxSize[2]),
        glm.vec3.fromValues(+currShape.boxSize[0], -currShape.boxSize[1], -currShape.boxSize[2]),
        glm.vec3.fromValues(-currShape.boxSize[0], +currShape.boxSize[1], -currShape.boxSize[2]),
        glm.vec3.fromValues(+currShape.boxSize[0], +currShape.boxSize[1], -currShape.boxSize[2]),
        glm.vec3.fromValues(-currShape.boxSize[0], -currShape.boxSize[1], +currShape.boxSize[2]),
        glm.vec3.fromValues(+currShape.boxSize[0], -currShape.boxSize[1], +currShape.boxSize[2]),
        glm.vec3.fromValues(-currShape.boxSize[0], +currShape.boxSize[1], +currShape.boxSize[2]),
        glm.vec3.fromValues(+currShape.boxSize[0], +currShape.boxSize[1], +currShape.boxSize[2]),
      ];

      // need to apply the box transformation to the corners (translation, then rotation)
      allBoxCorners.forEach((vertex) => {
        const pos = glm.vec3.fromValues(0, 0, 0);

        const mat4 = glm.mat4.identity(glm.mat4.create());
        glm.mat4.translate(mat4, mat4, currShape.position);
        const mat4b = glm.mat4.fromQuat(glm.mat4.create(), currShape.orientation);
        glm.mat4.multiply(mat4, mat4, mat4b);

        glm.vec3.transformMat4(pos, vertex, mat4);

        min[0] = Math.min(min[0], pos[0]);
        min[1] = Math.min(min[1], pos[1]);
        min[2] = Math.min(min[2], pos[2]);
        max[0] = Math.max(max[0], pos[0]);
        max[1] = Math.max(max[1], pos[1]);
        max[2] = Math.max(max[2], pos[2]);
      });

      // here we ensure the shape is not "paper flat" on any of its axises
      if (max[0] - min[0] < k_minDelta) { max[0] += k_minDelta; }
      if (max[1] - min[1] < k_minDelta) { max[1] += k_minDelta; }
      if (max[2] - min[2] < k_minDelta) { max[2] += k_minDelta; }

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

      // here we ensure the shape is not "paper flat" on any of its axises
      if (max[0] - min[0] < k_minDelta) { max[0] += k_minDelta; }
      if (max[1] - min[1] < k_minDelta) { max[1] += k_minDelta; }
      if (max[2] - min[2] < k_minDelta) { max[2] += k_minDelta; }

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

    this._rootNode = BvhTreeNode.buildBvhGraph(min, max, this._allShapes);
  }

  fillDataTexture(
    dataTexture: {
      push(r: number, g: number, b: number, a: number,): void;
    }
  ): void {

    if (!this._rootNode) {
      return;
    }

    const allNodes: BvhTreeNode[] = [];

    const _recFunc = (currNode: BvhTreeNode) => {

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

      dataTexture.push(
        currNode._min[0],
        currNode._min[1],
        currNode._min[2],
        currNode._max[0],
      );
      dataTexture.push(
        currNode._max[1],
        currNode._max[2],
        (currNode._leftNode?._index ?? -2) + 0.5,
        (currNode._rightNode?._index ?? -2) + 0.5,
      );
      dataTexture.push(
        (currNode._leftLeaf?.index ?? -2) + 0.5,
        (currNode._rightLeaf?.index ?? -2) + 0.5,
        0,
        0,
      );

    }
  }

  renderDebugWireframe(renderer: IStackRenderer) {

    if (!this._rootNode) {
      return;
    }

    this._rootNode.render(renderer, [0.5,0.0,0.0]);

    for (const currShape of this._allShapes) {
      _renderAABB(renderer, currShape.min, currShape.max, [1.0,1.0,0.0]);
    }

  }

};
