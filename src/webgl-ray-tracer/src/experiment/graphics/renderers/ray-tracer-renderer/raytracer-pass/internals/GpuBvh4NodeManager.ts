
import { GpuDataTexture2d } from './GpuDataTexture2d';

import { type AABB } from './bvh/bvh2/aabb-utils';
import { ShapesBvh4TreeNode } from './bvh/bvh4/ShapesBvh4Tree';

export class GpuBvh4NodeManager {

  private _gpuDataTexture2d: GpuDataTexture2d;

  private _allNodes: ShapesBvh4TreeNode[] = [];

  constructor(gpuDataTexture2d: GpuDataTexture2d) {
    this._gpuDataTexture2d = gpuDataTexture2d;
  }

  clear() {
    this._allNodes.length = 0;
  }

  syncRootNode(inputRootNode?: ShapesBvh4TreeNode) {

    this._allNodes.length = 0;

    if (!inputRootNode) {
      return;
    }

    const _recFunc = (currNode: ShapesBvh4TreeNode) => {
      this._allNodes.push(currNode);
      currNode._childrenNodes.forEach((currChild) => _recFunc(currChild));
    };
    _recFunc(inputRootNode);

    this._allNodes.sort((a, b) => a._index - b._index);
  }

  prepareBuffer(texelY: number) {

    const currRow = this._gpuDataTexture2d.getDataRow(texelY);
    currRow.clear();

    for (const currNode of this._allNodes) {

      let childrenNodeIndex = 0;
      let leavesNodeIndex = 0;

      for (let ii = 0; ii < 4; ++ii) {

        let tmp_type = 0; // empty, do not test
        let tmp_index = 0; // empty, no index
        let tmp_node: AABB | undefined = undefined;
        if (currNode._childrenNodes[childrenNodeIndex]) {
          tmp_type = 1; // child node, test and maybe push to the stack
          tmp_index = currNode._childrenNodes[childrenNodeIndex]._index;
          tmp_node = currNode._childrenNodes[childrenNodeIndex];
          childrenNodeIndex += 1;
        } else if (currNode._leaves[leavesNodeIndex]) {
          tmp_type = 2; // leaf node, test and maybe push to the stack
          tmp_index = currNode._leaves[leavesNodeIndex].shapeIndex;
          tmp_node = currNode._leaves[leavesNodeIndex];
          leavesNodeIndex += 1;
        }

        currRow.push(
          tmp_type + 0.5,
          tmp_index + 0.5,
          tmp_node?.min[0] ?? -1,
          tmp_node?.min[1] ?? -1,
        );
        currRow.push(
          tmp_node?.min[2] ?? -1,
          tmp_node?.max[0] ?? -1,
          tmp_node?.max[1] ?? -1,
          tmp_node?.max[2] ?? -1,
        );
      }

      // currRow.push(
      //   currNode.min[0],
      //   currNode.min[1],
      //   currNode.min[2],
      //   currNode.max[0],
      // );
      // currRow.push(
      //   currNode.max[1],
      //   currNode.max[2],
      //   (currNode._childrenNodes[0]?._index ?? -2) + 0.5,
      //   (currNode._childrenNodes[1]?._index ?? -2) + 0.5,
      // );
      // currRow.push(
      //   (currNode._childrenNodes[2]?._index ?? -2) + 0.5,
      //   (currNode._childrenNodes[3]?._index ?? -2) + 0.5,
      //   (currNode._leaves[0]?.shapeIndex ?? -2) + 0.5,
      //   (currNode._leaves[1]?.shapeIndex ?? -2) + 0.5,
      // );
      // currRow.push(
      //   (currNode._leaves[2]?.shapeIndex ?? -2) + 0.5,
      //   (currNode._leaves[3]?.shapeIndex ?? -2) + 0.5,
      //   0,
      //   0,
      // );

    }

  }

}
