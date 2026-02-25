
import { GpuDataTexture2d } from './GpuDataTexture2d';
import * as allInterfaces from '../all-interfaces';

import * as glm from "gl-matrix"

export interface IGpuPointLightsManager {
  pushPointLight({ position, intensity, radius }: allInterfaces.IPointLight): void;
}

export class GpuPointLightsManager implements IGpuPointLightsManager {

  private _pointLights: allInterfaces.IPointLight[] = [];
  private _gpuDataTexture2d: GpuDataTexture2d;

  constructor(gpuDataTexture2d: GpuDataTexture2d) {
    this._gpuDataTexture2d = gpuDataTexture2d;
  }


  pushPointLight({ position, intensity, radius }: allInterfaces.IPointLight): void {
    // add point light

    if (intensity <= 0) {
      throw new Error('intensity cannot be <= 0');
    }
    if (radius <= 0) {
      throw new Error('radius cannot be <= 0');
    }

    this._pointLights.push({
      position: glm.vec3.clone(position),
      intensity,
      radius
    });
  }


  clear() {
    this._pointLights.length = 0;
  }

  prepareBuffer() {

    this._gpuDataTexture2d.clear();

    for (const pointLight of this._pointLights) {
      // add point light

      this._gpuDataTexture2d.push(
        pointLight.position[0],
        pointLight.position[1],
        pointLight.position[2],
        pointLight.radius,
      );
      this._gpuDataTexture2d.push(
        pointLight.intensity,
        0,
        0,
        0,
      );
    }

  }

  get pointLights(): ReadonlyArray<allInterfaces.IPointLight> {
    return this._pointLights;
  }

}


