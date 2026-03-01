
import * as glm from 'gl-matrix';
import { IStackRenderer } from '../../../all-interfaces';

import { ShapesBvhTreeNode } from './ShapesBvhTree';

export class BvhDebug {

  private static _bvhRenderAABB(
    renderer: IStackRenderer,
    min: glm.ReadonlyVec3,
    max: glm.ReadonlyVec3,
    color: glm.ReadonlyVec3,
    padding: number,
  ): void {

    // const padding = 0.05;

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
    color: glm.ReadonlyVec3,
    padding: number,
  ): void {
    this._bvhRenderAABB(renderer, currNode.min, currNode.max, color, padding);

    //
    //
    //

    currNode._childrenNodes.forEach((currChild) => {
      this.renderNode(currChild, renderer, [0, 0.5, 0], 0);

      // render the "link" to the child node (purple)
      const pointA: glm.ReadonlyVec3 = [ currNode.max[0] + 0.1, currNode.max[1] + 0.1, currNode.max[2] + 0.1 ];
      const pointB: glm.ReadonlyVec3 = [ currChild.max[0] + 0.1, currChild.max[1] + 0.1, currChild.max[2] + 0.1 ];
      // renderer.pushLine(pointA, pointB, [1,0,1]);
      renderer.push3dLine(pointA, pointB, 0.2, 0.0, [1,0,1], [1,0,1]);
    });

    // if (currNode._childNode0) {
    //   this.renderNode(currNode._childNode0, renderer, [0, 0.5, 0]);

    //   // render the "link" to the child node (purple)
    //   const pointA: glm.ReadonlyVec3 = [ currNode.max[0] + 0.1, currNode.max[1] + 0.1, currNode.max[2] + 0.1 ];
    //   const pointB: glm.ReadonlyVec3 = [ currNode._childNode0.max[0] + 0.1, currNode._childNode0.max[1] + 0.1, currNode._childNode0.max[2] + 0.1 ];
    //   // renderer.pushLine(pointA, pointB, [1,0,1]);
    //   renderer.push3dLine(pointA, pointB, 0.2, 0.0, [1,0,1], [1,0,1]);
    // }

    // if (currNode._childNode1) {
    //   this.renderNode(currNode._childNode1, renderer, [0, 0, 0.5]);

    //   // render the "link" to the child node (purple)
    //   const pointA: glm.ReadonlyVec3 = [ currNode.max[0] + 0.1, currNode.max[1] + 0.1, currNode.max[2] + 0.1 ];
    //   const pointB: glm.ReadonlyVec3 = [ currNode._childNode1.max[0] + 0.1, currNode._childNode1.max[1] + 0.1, currNode._childNode1.max[2] + 0.1 ];
    //   // renderer.pushLine(pointA, pointB, [1,0,1]);
    //   renderer.push3dLine(pointA, pointB, 0.2, 0.0, [1,0,1], [1,0,1]);
    // }

    // if (currNode._childNode2) {
    //   this.renderNode(currNode._childNode2, renderer, [0, 0, 0.5]);

    //   // render the "link" to the child node (purple)
    //   const pointA: glm.ReadonlyVec3 = [ currNode.max[0] + 0.1, currNode.max[1] + 0.1, currNode.max[2] + 0.1 ];
    //   const pointB: glm.ReadonlyVec3 = [ currNode._childNode2.max[0] + 0.1, currNode._childNode2.max[1] + 0.1, currNode._childNode2.max[2] + 0.1 ];
    //   // renderer.pushLine(pointA, pointB, [1,0,1]);
    //   renderer.push3dLine(pointA, pointB, 0.2, 0.0, [1,0,1], [1,0,1]);
    // }

    // if (currNode._childNode3) {
    //   this.renderNode(currNode._childNode3, renderer, [0, 0, 0.5]);

    //   // render the "link" to the child node (purple)
    //   const pointA: glm.ReadonlyVec3 = [ currNode.max[0] + 0.1, currNode.max[1] + 0.1, currNode.max[2] + 0.1 ];
    //   const pointB: glm.ReadonlyVec3 = [ currNode._childNode3.max[0] + 0.1, currNode._childNode3.max[1] + 0.1, currNode._childNode3.max[2] + 0.1 ];
    //   // renderer.pushLine(pointA, pointB, [1,0,1]);
    //   renderer.push3dLine(pointA, pointB, 0.2, 0.0, [1,0,1], [1,0,1]);
    // }

    //
    //
    //

    currNode._leaves.forEach((currLeaf) => {
      this._bvhRenderAABB(renderer, currLeaf.min, currLeaf.max, [0.5,0.5,0], 0.05);

      // render the "link" to the leaf (red)
      const pointA: glm.ReadonlyVec3 = [ currNode.max[0] + 0.1, currNode.max[1] + 0.1, currNode.max[2] + 0.1 ];
      const pointB: glm.ReadonlyVec3 = [ currLeaf.max[0] + 0.1, currLeaf.max[1] + 0.1, currLeaf.max[2] + 0.1 ];
      // renderer.pushLine(pointA, pointB, [1,0,0]);
      renderer.push3dLine(pointA, pointB, 0.2, 0.0, [1,0,0], [1,0,0]);
    });

    // if (currNode._leaf0) {
    //   this._bvhRenderAABB(renderer, currNode._leaf0.min, currNode._leaf0.max, [0.5,0.5,0]);

    //   // render the "link" to the leaf (red)
    //   const pointA: glm.ReadonlyVec3 = [ currNode.max[0] + 0.1, currNode.max[1] + 0.1, currNode.max[2] + 0.1 ];
    //   const pointB: glm.ReadonlyVec3 = [ currNode._leaf0.max[0] + 0.1, currNode._leaf0.max[1] + 0.1, currNode._leaf0.max[2] + 0.1 ];
    //   // renderer.pushLine(pointA, pointB, [1,0,0]);
    //   renderer.push3dLine(pointA, pointB, 0.2, 0.0, [1,0,0], [1,0,0]);
    // }

    // if (currNode._leaf1) {
    //   this._bvhRenderAABB(renderer, currNode._leaf1.min, currNode._leaf1.max, [0.5,0.5,0]);

    //   // render the "link" to the leaf (red)
    //   const pointA: glm.ReadonlyVec3 = [ currNode.max[0] + 0.1, currNode.max[1] + 0.1, currNode.max[2] + 0.1 ]
    //   const pointB: glm.ReadonlyVec3 = [ currNode._leaf1.max[0] + 0.1, currNode._leaf1.max[1] + 0.1, currNode._leaf1.max[2] + 0.1 ]
    //   // renderer.pushLine(pointA, pointB, [1,0,0]);
    //   renderer.push3dLine(pointA, pointB, 0.2, 0.0, [1,0,0], [1,0,0]);
    // }

    // if (currNode._leaf2) {
    //   this._bvhRenderAABB(renderer, currNode._leaf2.min, currNode._leaf2.max, [0.5,0.5,0]);

    //   // render the "link" to the leaf (red)
    //   const pointA: glm.ReadonlyVec3 = [ currNode.max[0] + 0.1, currNode.max[1] + 0.1, currNode.max[2] + 0.1 ]
    //   const pointB: glm.ReadonlyVec3 = [ currNode._leaf2.max[0] + 0.1, currNode._leaf2.max[1] + 0.1, currNode._leaf2.max[2] + 0.1 ]
    //   // renderer.pushLine(pointA, pointB, [1,0,0]);
    //   renderer.push3dLine(pointA, pointB, 0.2, 0.0, [1,0,0], [1,0,0]);
    // }

    // if (currNode._leaf3) {
    //   this._bvhRenderAABB(renderer, currNode._leaf3.min, currNode._leaf3.max, [0.5,0.5,0]);

    //   // render the "link" to the leaf (red)
    //   const pointA: glm.ReadonlyVec3 = [ currNode.max[0] + 0.1, currNode.max[1] + 0.1, currNode.max[2] + 0.1 ]
    //   const pointB: glm.ReadonlyVec3 = [ currNode._leaf3.max[0] + 0.1, currNode._leaf3.max[1] + 0.1, currNode._leaf3.max[2] + 0.1 ]
    //   // renderer.pushLine(pointA, pointB, [1,0,0]);
    //   renderer.push3dLine(pointA, pointB, 0.2, 0.0, [1,0,0], [1,0,0]);
    // }

    //
    //
    //

  }

  static renderDebugWireframe(
    rootNode: ShapesBvhTreeNode | undefined,
    renderer: IStackRenderer
  ) {

    if (!rootNode) {
      return;
    }

    this.renderNode(rootNode, renderer, [0.5,0.0,0.0], 0.5);
  }

}

