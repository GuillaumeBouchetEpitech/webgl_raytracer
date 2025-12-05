
import { BvhTreeNode } from './BvhTreeNode';
import { GpuDataTexture1d } from './GpuDataTexture1d';

export class BvhManager {

  private _dataTexture: GpuDataTexture1d;

  private _allNodes: BvhTreeNode[] = [];

  constructor(textureUniformName: string) {
    this._dataTexture = new GpuDataTexture1d(textureUniformName);
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

    this._dataTexture.clear();

    for (const currNode of this._allNodes) {

      this._dataTexture.push(
        currNode._min[0],
        currNode._min[1],
        currNode._min[2],
        currNode._max[0],
      );
      this._dataTexture.push(
        currNode._max[1],
        currNode._max[2],
        (currNode._leftNode?._index ?? -2) + 0.5,
        (currNode._rightNode?._index ?? -2) + 0.5,
      );
      this._dataTexture.push(
        (currNode._leftLeaf?.index ?? -2) + 0.5,
        (currNode._rightLeaf?.index ?? -2) + 0.5,
        0,
        0,
      );

    }

  }

  get dataTexture(): Readonly<GpuDataTexture1d> {
    return this._dataTexture;
  }

}
