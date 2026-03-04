
import { IInternalBox, IInternalSphere, IInternalTriangle } from '../../../all-interfaces';

import { type IShape, ShapesBvh2Tree } from '../bvh2/ShapesBvh2Tree';
import { Bvh4TreeNode } from './Bvh4TreeNode';
import { Bvh4Tree } from './Bvh4Tree';

export type ShapesBvh4TreeNode = Bvh4TreeNode<IShape>;

export class ShapesBvh4Tree {

  private _shapesBvh2Tree = new ShapesBvh2Tree();
  private _bvh4Tree = new Bvh4Tree<IShape>();

  constructor() {}

  reset() {
    this._shapesBvh2Tree.reset();
    this._bvh4Tree.reset();
  }

  synchronize(
    allSpheres: ReadonlyArray<IInternalSphere>,
    allBoxes: ReadonlyArray<IInternalBox>,
    allTriangles: ReadonlyArray<IInternalTriangle>,
  ) {
    this.reset();
    this._shapesBvh2Tree.synchronize(allSpheres, allBoxes, allTriangles);
    const bvh2RootNode = this._shapesBvh2Tree.getRootNode();
    if (bvh2RootNode) {
      this._bvh4Tree.synchronize(bvh2RootNode);
    }
  }

  getRootNode(): ShapesBvh4TreeNode | undefined {
    return this._bvh4Tree.getRootNode();
  }

};
