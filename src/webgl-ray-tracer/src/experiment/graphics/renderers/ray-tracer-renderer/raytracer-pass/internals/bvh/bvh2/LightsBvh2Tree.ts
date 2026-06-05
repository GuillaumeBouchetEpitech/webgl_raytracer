
import * as glm from 'gl-matrix';

import { IInternalPointLight } from '../../../all-interfaces';

import { type MutableAABB } from './aabb-utils';
import { Bvh2TreeNode } from './Bvh2TreeNode';
import { Bvh2Tree } from './Bvh2Tree';

const k_minDelta = 0.01;

export interface IPointLight extends MutableAABB {
  lightIndex: number;
  type: 'point-light';
  shape: IInternalPointLight;
};
export type ILight = IPointLight;

export type LightsBvh2TreeNode = Bvh2TreeNode<ILight>;

export class LightsBvh2Tree {

  private _bvhTree = new Bvh2Tree<ILight>();

  constructor() {}

  reset() {
    this._bvhTree.reset();
  }

  synchronize(
    allPointLights: ReadonlyArray<IInternalPointLight>,
  ) {

    this.reset();

    const allEntries: ILight[] = [];

    // setup the generic shape list
    let shapeIndex = 0;
    for (const currLight of allPointLights) {

      const min = glm.vec3.fromValues(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
      const max = glm.vec3.fromValues(Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER);

      min[0] = Math.min(min[0], currLight.position[0] - currLight.radius);
      min[1] = Math.min(min[1], currLight.position[1] - currLight.radius);
      min[2] = Math.min(min[2], currLight.position[2] - currLight.radius);
      max[0] = Math.max(max[0], currLight.position[0] + currLight.radius);
      max[1] = Math.max(max[1], currLight.position[1] + currLight.radius);
      max[2] = Math.max(max[2], currLight.position[2] + currLight.radius);

      // here we ensure the shape is not "paper flat" on any of its axises
      if (max[0] - min[0] < k_minDelta) { max[0] += k_minDelta; }
      if (max[1] - min[1] < k_minDelta) { max[1] += k_minDelta; }
      if (max[2] - min[2] < k_minDelta) { max[2] += k_minDelta; }

      allEntries.push({
        lightIndex: shapeIndex++,
        type: 'point-light',
        shape: currLight,
        min,
        max
      });
    }

    this._bvhTree.synchronize(allEntries);
  }

  getRootNode(): LightsBvh2TreeNode | undefined {
    return this._bvhTree.getRootNode();
  }

};
