
import { IInternalPointLight } from '../../../all-interfaces';

import { type ILight, LightsBvh2Tree } from '../bvh2/LightsBvh2Tree';
import { Bvh4TreeNode } from './Bvh4TreeNode';
import { Bvh4Tree } from './Bvh4Tree';

export type LightsBvh4TreeNode = Bvh4TreeNode<ILight>;

export class LightsBvh4Tree {

  private _lightsBvh2Tree = new LightsBvh2Tree();
  private _bvh4Tree = new Bvh4Tree<ILight>();

  constructor() {}

  reset() {
    this._lightsBvh2Tree.reset();
    this._bvh4Tree.reset();
  }

  synchronize(allPointLights: ReadonlyArray<IInternalPointLight>) {
    this.reset();
    this._lightsBvh2Tree.synchronize(allPointLights);
    const bvh2RootNode = this._lightsBvh2Tree.getRootNode();
    if (bvh2RootNode) {
      this._bvh4Tree.synchronize(bvh2RootNode);
    }
  }

  getRootNode(): LightsBvh4TreeNode | undefined {
    return this._bvh4Tree.getRootNode();
  }

};
