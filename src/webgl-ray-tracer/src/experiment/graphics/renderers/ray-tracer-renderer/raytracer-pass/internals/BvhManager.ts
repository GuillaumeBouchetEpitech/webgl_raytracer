
import { GpuDataTexture2d } from './GpuDataTexture2d';
import { BvhTreeNode } from './BvhTreeNode';

export class BvhManager {

  private _gpuDataTexture2d: GpuDataTexture2d;

  private _allNodes: BvhTreeNode[] = [];

  constructor(
    gpuDataTexture2d: GpuDataTexture2d
  ) {
    this._gpuDataTexture2d = gpuDataTexture2d;
  }

  syncRootNode(inputRootNode?: BvhTreeNode) {

    this._allNodes.length = 0;

    if (!inputRootNode) {
      return;
    }

    const _recFunc = (currNode: BvhTreeNode) => {

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
        currNode._min[0],
        currNode._min[1],
        currNode._min[2],
        currNode._max[0],
      );
      this._gpuDataTexture2d.push(
        currNode._max[1],
        currNode._max[2],
        (currNode._leftNode?._index ?? -2) + 0.5,
        (currNode._rightNode?._index ?? -2) + 0.5,
      );
      this._gpuDataTexture2d.push(
        (currNode._leftLeaf?.index ?? -2) + 0.5,
        (currNode._rightLeaf?.index ?? -2) + 0.5,
        0,
        0,
      );

    }

  }

}
