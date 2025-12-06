
import { GpuDataTexture2d } from './GpuDataTexture2d';
import * as allInterfaces from '../all-interfaces';

import * as glm from "gl-matrix"

export interface ISpotLightsManager {
  pushSpotLight({ position, intensity, radius }: allInterfaces.ISpotLight): void;
}

export class SpotLightsManager implements ISpotLightsManager {

  private _spotLights: allInterfaces.ISpotLight[] = [];
  private _gpuDataTexture2d: GpuDataTexture2d;

  constructor(gpuDataTexture2d: GpuDataTexture2d) {
    this._gpuDataTexture2d = gpuDataTexture2d;
  }


  pushSpotLight({ position, intensity, radius }: allInterfaces.ISpotLight): void {
    // add spot light

    if (intensity <= 0) {
      throw new Error('intensity cannot be <= 0');
    }
    if (radius <= 0) {
      throw new Error('radius cannot be <= 0');
    }

    this._spotLights.push({
      position: glm.vec3.clone(position),
      intensity,
      radius
    });
  }


  clear() {
    this._spotLights.length = 0;
  }

  prepareBuffer() {

    this._gpuDataTexture2d.clear();

    for (const spotLight of this._spotLights) {
      // add spot light

      this._gpuDataTexture2d.push(
        spotLight.position[0],
        spotLight.position[1],
        spotLight.position[2],
        spotLight.radius,
      );
      this._gpuDataTexture2d.push(
        spotLight.intensity,
        0,
        0,
        0,
      );
    }

  }

  get spotLights(): ReadonlyArray<allInterfaces.ISpotLight> {
    return this._spotLights;
  }

}


