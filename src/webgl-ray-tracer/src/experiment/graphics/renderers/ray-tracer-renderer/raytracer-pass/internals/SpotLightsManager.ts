
import * as allInterfaces from '../all-interfaces';

import { GpuDataTexture } from './GpuDataTexture';

import * as glm from "gl-matrix"

export interface ISpotLightsManager {
  pushSpotLight({ position, intensity, radius }: allInterfaces.ISpotLight): void;
}

export class SpotLightsManager implements ISpotLightsManager {

  private _spotLights: allInterfaces.ISpotLight[] = [];
  private _dataTexture: GpuDataTexture;

  constructor(textureUniformName: string, lengthUniformName: string) {
    this._dataTexture = new GpuDataTexture(textureUniformName, lengthUniformName);
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

    this._dataTexture.clear();

    for (const spotLight of this._spotLights) {
      // add spot light

      this._dataTexture.push(
        spotLight.position[0],
        spotLight.position[1],
        spotLight.position[2],
        spotLight.radius,
      );
      this._dataTexture.push(
        spotLight.intensity,
        0,
        0,
        0,
      );
    }

  }

  get dataTexture(): Readonly<GpuDataTexture> {
    return this._dataTexture;
  }

  get spotLights(): ReadonlyArray<allInterfaces.ISpotLight> {
    return this._spotLights;
  }

}


