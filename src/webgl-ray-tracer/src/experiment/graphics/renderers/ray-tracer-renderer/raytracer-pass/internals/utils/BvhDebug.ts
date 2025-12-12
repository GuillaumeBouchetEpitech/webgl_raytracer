
import * as glm from 'gl-matrix';
import { IStackRenderer } from '../../all-interfaces';

import { ShapesBvhTreeNode } from './ShapesBvhTree';

export class BvhDebug {

  private static _bvhRenderAABB(
    renderer: IStackRenderer,
    min: glm.ReadonlyVec3,
    max: glm.ReadonlyVec3,
    color: glm.ReadonlyVec3,
  ): void {

    const padding = 0.05;

    const vertices: ReadonlyArray<glm.ReadonlyVec3> = [
      [min[0]-padding, min[1]-padding, min[2]-padding],
      [max[0]+padding, min[1]-padding, min[2]-padding],
      [min[0]-padding, max[1]+padding, min[2]-padding],
      [max[0]+padding, max[1]+padding, min[2]-padding],
      [min[0]-padding, min[1]-padding, max[2]+padding],
      [max[0]+padding, min[1]-padding, max[2]+padding],
      [min[0]-padding, max[1]+padding, max[2]+padding],
      [max[0]+padding, max[1]+padding, max[2]+padding],
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
  }

  private static renderNode(
    currNode: ShapesBvhTreeNode,
    renderer: IStackRenderer,
    color: glm.ReadonlyVec3
  ): void {
    this._bvhRenderAABB(renderer, currNode.min, currNode.max, color);

    if (currNode._leftNode) {
      this.renderNode(currNode._leftNode, renderer, [0, 0.5, 0]);

      // render the "link" to the child node (purple)
      const pointA: glm.ReadonlyVec3 = [ currNode.max[0] + 0.1, currNode.max[1] + 0.1, currNode.max[2] + 0.1 ];
      const pointB: glm.ReadonlyVec3 = [ currNode._leftNode.max[0] + 0.1, currNode._leftNode.max[1] + 0.1, currNode._leftNode.max[2] + 0.1 ];
      // renderer.pushLine(pointA, pointB, [1,0,1]);
      renderer.push3dLine(pointA, pointB, 0.2, 0.0, [1,0,1], [1,0,1]);
    }

    if (currNode._rightNode) {
      this.renderNode(currNode._rightNode, renderer, [0, 0, 0.5]);

      // render the "link" to the child node (purple)
      const pointA: glm.ReadonlyVec3 = [ currNode.max[0] + 0.1, currNode.max[1] + 0.1, currNode.max[2] + 0.1 ];
      const pointB: glm.ReadonlyVec3 = [ currNode._rightNode.max[0] + 0.1, currNode._rightNode.max[1] + 0.1, currNode._rightNode.max[2] + 0.1 ];
      // renderer.pushLine(pointA, pointB, [1,0,1]);
      renderer.push3dLine(pointA, pointB, 0.2, 0.0, [1,0,1], [1,0,1]);
    }

    if (currNode._leftLeaf) {
      this._bvhRenderAABB(renderer, currNode._leftLeaf.min, currNode._leftLeaf.max, [0.5,0.5,0]);

      // render the "link" to the leaf (red)
      const pointA: glm.ReadonlyVec3 = [ currNode.max[0] + 0.1, currNode.max[1] + 0.1, currNode.max[2] + 0.1 ];
      const pointB: glm.ReadonlyVec3 = [ currNode._leftLeaf.max[0] + 0.1, currNode._leftLeaf.max[1] + 0.1, currNode._leftLeaf.max[2] + 0.1 ];
      // renderer.pushLine(pointA, pointB, [1,0,0]);
      renderer.push3dLine(pointA, pointB, 0.2, 0.0, [1,0,0], [1,0,0]);
    }

    if (currNode._rightLeaf) {
      this._bvhRenderAABB(renderer, currNode._rightLeaf.min, currNode._rightLeaf.max, [0.5,0.5,0]);

      // render the "link" to the leaf (red)
      const pointA: glm.ReadonlyVec3 = [ currNode.max[0] + 0.1, currNode.max[1] + 0.1, currNode.max[2] + 0.1 ]
      const pointB: glm.ReadonlyVec3 = [ currNode._rightLeaf.max[0] + 0.1, currNode._rightLeaf.max[1] + 0.1, currNode._rightLeaf.max[2] + 0.1 ]
      // renderer.pushLine(pointA, pointB, [1,0,0]);
      renderer.push3dLine(pointA, pointB, 0.2, 0.0, [1,0,0], [1,0,0]);
    }

  }

  static renderDebugWireframe(
    rootNode: ShapesBvhTreeNode | undefined,
    renderer: IStackRenderer
  ) {

    if (!rootNode) {
      return;
    }

    this.renderNode(rootNode, renderer, [0.5,0.0,0.0]);
  }

}

