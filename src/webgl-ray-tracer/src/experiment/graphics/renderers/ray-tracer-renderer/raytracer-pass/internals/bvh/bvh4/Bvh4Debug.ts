
import * as glm from 'gl-matrix';
import { IStackRenderer } from '../../../all-interfaces';

import { ShapesBvh4TreeNode } from './ShapesBvh4Tree';

export class Bvh4Debug {

  private static _bvhRenderAABB(
    renderer: IStackRenderer,
    min: glm.ReadonlyVec3,
    max: glm.ReadonlyVec3,
    color: glm.ReadonlyVec3,
    padding: number,
    modelView?: glm.ReadonlyMat4,
  ): void {

    // const padding = 0.05;

    const vertices: ReadonlyArray<glm.vec3> = [
      [min[0]-padding, min[1]-padding, min[2]-padding],
      [max[0]+padding, min[1]-padding, min[2]-padding],
      [min[0]-padding, max[1]+padding, min[2]-padding],
      [max[0]+padding, max[1]+padding, min[2]-padding],
      [min[0]-padding, min[1]-padding, max[2]+padding],
      [max[0]+padding, min[1]-padding, max[2]+padding],
      [min[0]-padding, max[1]+padding, max[2]+padding],
      [max[0]+padding, max[1]+padding, max[2]+padding],
    ];

    if (modelView) {
      for (const currVertex of vertices) {
        glm.vec3.transformMat4(currVertex, currVertex, modelView);
      }
    }

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
    currNode: ShapesBvh4TreeNode,
    renderer: IStackRenderer,
    color: glm.ReadonlyVec3,
    padding: number,
    modelView?: glm.ReadonlyMat4,
  ): void {
    this._bvhRenderAABB(renderer, currNode.min, currNode.max, color, padding, modelView);

    //
    //
    //

    currNode._childrenNodes.forEach((currChild) => {
      this.renderNode(currChild, renderer, [0, 0.5, 0], 0, modelView);

      // render the "link" to the child node (purple)
      const pointA: glm.vec3 = [ currNode.max[0] + 0.1, currNode.max[1] + 0.1, currNode.max[2] + 0.1 ];
      const pointB: glm.vec3 = [ currChild.max[0] + 0.1, currChild.max[1] + 0.1, currChild.max[2] + 0.1 ];

      if (modelView) {
        glm.vec3.transformMat4(pointA, pointA, modelView);
        glm.vec3.transformMat4(pointB, pointB, modelView);
      }

      // renderer.pushLine(pointA, pointB, [1,0,1]);
      renderer.push3dLine(pointA, pointB, 0.3, 0.0, [1,0,1], [1,0,1]);
    });

    //
    //
    //

    currNode._leaves.forEach((currLeaf) => {
      this._bvhRenderAABB(renderer, currLeaf.min, currLeaf.max, [0.5,0.5,0], 0.02, modelView);

      // render the "link" to the leaf (red)
      const pointA: glm.vec3 = [ currNode.max[0] + 0.0, currNode.max[1] + 0.0, currNode.max[2] + 0.0 ];
      const pointB: glm.vec3 = [ currLeaf.max[0] + 0.2, currLeaf.max[1] + 0.2, currLeaf.max[2] + 0.2 ];
      // const pointB: glm.ReadonlyVec3 = [
      //   currLeaf.min[0] + (currLeaf.max[0] - currLeaf.min[0]) * 0.0,
      //   currLeaf.min[1] + (currLeaf.max[1] - currLeaf.min[1]) * 0.0,
      //   currLeaf.min[2] + (currLeaf.max[2] - currLeaf.min[2]) * 0.0
      // ];
      // renderer.pushLine(pointA, pointB, [1,0,0]);

      if (modelView) {
        glm.vec3.transformMat4(pointA, pointA, modelView);
        glm.vec3.transformMat4(pointB, pointB, modelView);
      }

      renderer.push3dLine(pointA, pointB, 0.2, 0.1, [1,0,0], [1,0,0]);
    });

    //
    //
    //

  }

  static renderDebugWireframe(
    rootNode: ShapesBvh4TreeNode | undefined,
    renderer: IStackRenderer,
    modelView?: glm.ReadonlyMat4,
  ) {

    if (!rootNode) {
      return;
    }

    this.renderNode(rootNode, renderer, [0.75,0.0,0.0], 0.5, modelView);
  }

}

