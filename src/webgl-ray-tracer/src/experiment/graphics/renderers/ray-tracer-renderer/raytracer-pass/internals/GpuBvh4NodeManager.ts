
import { GpuDataTexture2d } from './GpuDataTexture2d';

import { ShapesBvhTreeNode } from './bvh/bvh4/ShapesBvhTree';
// import { ShapesBvhTreeNode } from './bvh/bvh4-with-sah/ShapesBvhTree';

export class GpuBvh4NodeManager {

  private _gpuDataTexture2d: GpuDataTexture2d;

  private _allNodes: ShapesBvhTreeNode[] = [];

  constructor(gpuDataTexture2d: GpuDataTexture2d) {
    this._gpuDataTexture2d = gpuDataTexture2d;
  }

  syncRootNode(inputRootNode?: ShapesBvhTreeNode) {

    this._allNodes.length = 0;

    if (!inputRootNode) {
      return;
    }

    const _recFunc = (currNode: ShapesBvhTreeNode) => {
      this._allNodes.push(currNode);
      currNode._childrenNodes.forEach((currChild) => _recFunc(currChild));
    };
    _recFunc(inputRootNode);

    this._allNodes.sort((a, b) => a._index - b._index);
  }

  prepareBuffer() {

    this._gpuDataTexture2d.clear();

    for (const currNode of this._allNodes) {

      this._gpuDataTexture2d.push(
        currNode.min[0],
        currNode.min[1],
        currNode.min[2],
        currNode.max[0],
      );
      this._gpuDataTexture2d.push(
        currNode.max[1],
        currNode.max[2],
        (currNode._childrenNodes[0]?._index ?? -2) + 0.5,
        (currNode._childrenNodes[1]?._index ?? -2) + 0.5,
      );
      this._gpuDataTexture2d.push(
        (currNode._childrenNodes[2]?._index ?? -2) + 0.5,
        (currNode._childrenNodes[3]?._index ?? -2) + 0.5,
        (currNode._leaves[0]?.shapeIndex ?? -2) + 0.5,
        (currNode._leaves[1]?.shapeIndex ?? -2) + 0.5,
      );
      this._gpuDataTexture2d.push(
        (currNode._leaves[2]?.shapeIndex ?? -2) + 0.5,
        (currNode._leaves[3]?.shapeIndex ?? -2) + 0.5,
        0,
        0,
      );

    }

  }

}
