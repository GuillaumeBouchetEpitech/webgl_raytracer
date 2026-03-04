
import { GpuDataTexture2d } from './GpuDataTexture2d';

import { type IShape } from './bvh/bvh2/ShapesBvh2Tree';
import { ShapesBvh4TreeNode } from './bvh/bvh4/ShapesBvh4Tree';

export class GpuBvh4NodeManager {

  private _gpuDataTexture2d: GpuDataTexture2d;

  private _allNodes: ShapesBvh4TreeNode[] = [];

  constructor(gpuDataTexture2d: GpuDataTexture2d) {
    this._gpuDataTexture2d = gpuDataTexture2d;
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

  prepareBuffer() {

    this._gpuDataTexture2d.clear();

    for (const currNode of this._allNodes) {

      for (let ii = 0; ii < 4; ++ii) {

        let tmp_type = 0; // empty, do not test
        let tmp_index = 0; // empty, no index
        let tmp_node: ShapesBvh4TreeNode | IShape | undefined = undefined;
        if (currNode._childrenNodes[ii]) {
          tmp_type = 1; // child node, test and maybe push to the stack
          tmp_index = currNode._childrenNodes[ii]._index;
          tmp_node = currNode._childrenNodes[ii];
        } else if (currNode._leaves[ii]) {
          tmp_type = 2; // leaf node, test and maybe push to the stack
          tmp_index = currNode._leaves[ii].shapeIndex;
          tmp_node = currNode._leaves[ii];
        }

        this._gpuDataTexture2d.push(
          tmp_type + 0.5,
          tmp_index + 0.5,
          tmp_node?.min[0] ?? -1,
          tmp_node?.min[1] ?? -1,
        );
        this._gpuDataTexture2d.push(
          tmp_node?.min[2] ?? -1,
          tmp_node?.max[0] ?? -1,
          tmp_node?.max[1] ?? -1,
          tmp_node?.max[2] ?? -1,
        );
      }

      // this._gpuDataTexture2d.push(
      //   currNode.min[0],
      //   currNode.min[1],
      //   currNode.min[2],
      //   currNode.max[0],
      // );
      // this._gpuDataTexture2d.push(
      //   currNode.max[1],
      //   currNode.max[2],
      //   (currNode._childrenNodes[0]?._index ?? -2) + 0.5,
      //   (currNode._childrenNodes[1]?._index ?? -2) + 0.5,
      // );
      // this._gpuDataTexture2d.push(
      //   (currNode._childrenNodes[2]?._index ?? -2) + 0.5,
      //   (currNode._childrenNodes[3]?._index ?? -2) + 0.5,
      //   (currNode._leaves[0]?.shapeIndex ?? -2) + 0.5,
      //   (currNode._leaves[1]?.shapeIndex ?? -2) + 0.5,
      // );
      // this._gpuDataTexture2d.push(
      //   (currNode._leaves[2]?.shapeIndex ?? -2) + 0.5,
      //   (currNode._leaves[3]?.shapeIndex ?? -2) + 0.5,
      //   0,
      //   0,
      // );

    }

  }

}
