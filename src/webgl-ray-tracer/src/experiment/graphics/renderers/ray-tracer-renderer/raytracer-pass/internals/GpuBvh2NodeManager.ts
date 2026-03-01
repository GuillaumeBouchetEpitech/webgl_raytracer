
import { GpuDataTexture2d } from './GpuDataTexture2d';
import { ShapesBvhTreeNode } from './bvh/bvh2/ShapesBvhTree';

export class GpuBvh2NodeManager {

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

      if (currNode._leftNode) {
        _recFunc(currNode._leftNode);
      }
      if (currNode._rightNode) {
        _recFunc(currNode._rightNode);
      }

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
        (currNode._leftNode?._index ?? -2) + 0.5,
        (currNode._rightNode?._index ?? -2) + 0.5,
      );
      this._gpuDataTexture2d.push(
        (currNode._leftLeaf?.shapeIndex ?? -2) + 0.5,
        (currNode._rightLeaf?.shapeIndex ?? -2) + 0.5,
        // (currNode._leftLeaf?.canCastShadow) ? 1 : 0,
        // (currNode._rightLeaf?.canCastShadow) ? 1 : 0,
        0,
        0,
      );

    }

  }

}
