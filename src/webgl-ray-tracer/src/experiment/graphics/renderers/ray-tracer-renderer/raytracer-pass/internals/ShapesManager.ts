
import * as allInterfaces from '../all-interfaces';

import { GpuDataTexture } from './GpuDataTexture1d';
import { MaterialsManager } from './MaterialsManager';


import * as glm from "gl-matrix"

export interface IShapesManager {
  pushSphere({ position, orientation, radius, materialAlias }: allInterfaces.IPublicSphere): void;
  pushBox({ position, orientation, boxSize, materialAlias }: allInterfaces.IPublicBox): void;
  pushTriangle({ v0, v1, v2, materialAlias }: allInterfaces.IPublicTriangle): void;

  spheres: ReadonlyArray<allInterfaces.IInternalSphere>;
  boxes: ReadonlyArray<allInterfaces.IInternalBox>;
  triangles: ReadonlyArray<allInterfaces.IInternalTriangle>;
}

export class ShapesManager implements IShapesManager {

  private _materialsManager: MaterialsManager;

  private _spheres: allInterfaces.IInternalSphere[] = [];
  private _boxes: allInterfaces.IInternalBox[] = [];
  private _triangles: allInterfaces.IInternalTriangle[] = [];

  private _dataTexture: GpuDataTexture;

  constructor(
    materialsManager: MaterialsManager,
    textureUniformName: string,
    lengthUniformName: string,

  ) {
    this._materialsManager = materialsManager;
    this._dataTexture = new GpuDataTexture(textureUniformName, lengthUniformName);
  }

  pushSphere({
    position,
    orientation,
    radius,
    materialAlias,
  }: allInterfaces.IPublicSphere): void {
    if (radius <= 0) {
      throw new Error('invalid sphere radius');
    }

    if (!this._materialsManager.has(materialAlias)) {
      throw new Error(`not found material alias -> "${materialAlias}"`);
    }

    this._spheres.push({
      position: [position[0], position[1], position[2]],
      orientation: [orientation[0], orientation[1], orientation[2], orientation[3]],
      radius,
      materialAlias,
    });
  }

  pushBox({
    position,
    orientation,
    boxSize,
    materialAlias,
  }: allInterfaces.IPublicBox): void {
    if (boxSize[0] <= 0 || boxSize[1] <= 0 || boxSize[2] <= 0) {
      throw new Error('invalid box size');
    }

    if (!this._materialsManager.has(materialAlias)) {
      throw new Error(`not found material alias -> "${materialAlias}"`);
    }

    this._boxes.push({
      position: [position[0], position[1], position[2]],
      orientation: [orientation[0], orientation[1], orientation[2], orientation[3]],
      boxSize: glm.vec3.clone(boxSize),
      materialAlias,
    });
  }

  pushTriangle({
    v0,
    v1,
    v2,
    materialAlias,
  }: allInterfaces.IPublicTriangle) {

    if (!this._materialsManager.has(materialAlias)) {
      throw new Error(`not found material alias -> "${materialAlias}"`);
    }

    this._triangles.push({
      v0: glm.vec3.clone(v0),
      v1: glm.vec3.clone(v1),
      v2: glm.vec3.clone(v2),
      materialAlias,
    });
  }

  clear() {
    this._spheres.length = 0;
    this._boxes.length = 0;
    this._triangles.length = 0;
  }

  prepareBuffer() {

    this._dataTexture.clear();

    {
      // spheres

      for (const sphere of this._spheres) {
        // add sphere

        const currMatIndex = this._materialsManager.getIndexFromAlias(sphere.materialAlias);
        if (currMatIndex === undefined) {
          throw new Error(`sphere materialAlias not found ${sphere.materialAlias}`);
        }

        const shapeType = 1;

        this._dataTexture.push(
          shapeType + 0.5, // [0] R
          currMatIndex + 0.5, // [1] G
          sphere.position[0], // [2] B
          sphere.position[1], // [3] A
        );
        this._dataTexture.push(
          sphere.position[2], // [4] R
          sphere.orientation[0], // [5] G
          sphere.orientation[1], // [6] B
          sphere.orientation[2], // [7] A
        );
        this._dataTexture.push(
          sphere.orientation[3], // [8] R
          sphere.radius, // [9] G
          0,
          0,
        );

      }

    } // spheres

    {
      // boxes

      for (const box of this._boxes) {
        // add box

        const currMatIndex = this._materialsManager.getIndexFromAlias(box.materialAlias);
        if (currMatIndex === undefined) {
          throw new Error(`box materialAlias not found ${box.materialAlias}`);
        }

        const shapeType = 2;

        this._dataTexture.push(
          shapeType + 0.5,
          currMatIndex + 0.5, // [10]
          box.position[0], // [0]
          box.position[1], // [1]
        );
        this._dataTexture.push(
          box.position[2], // [2]
          box.orientation[0], // [3]
          box.orientation[1], // [4]
          box.orientation[2], // [5]
        );
        this._dataTexture.push(
          box.orientation[3], // [6]
          box.boxSize[0], // [7]
          box.boxSize[1], // [8]
          box.boxSize[2], // [9]
        );

      }

    } // boxes

    {
      // triangles

      for (const triangle of this._triangles) {
        // add triangle

        const currMatIndex = this._materialsManager.getIndexFromAlias(triangle.materialAlias);
        if (currMatIndex === undefined) {
          throw new Error(`triangle materialAlias not found ${triangle.materialAlias}`);
        }

        const shapeType = 3;

        this._dataTexture.push(
          shapeType + 0.5,
          currMatIndex + 0.5, // [0]
          triangle.v0[0], // [1]
          triangle.v0[1], // [2]
        );
        this._dataTexture.push(
          triangle.v0[2], // [3]
          triangle.v1[0], // [4]
          triangle.v1[1], // [5]
          triangle.v1[2], // [6]
        );
        this._dataTexture.push(
          triangle.v2[0], // [7]
          triangle.v2[1], // [8]
          triangle.v2[2], // [9]
          0,
        );

      }

    } // triangles

  }


  get dataTexture(): Readonly<GpuDataTexture> {
    return this._dataTexture;
  }

  get spheres(): ReadonlyArray<allInterfaces.IInternalSphere> {
    return this._spheres;
  }
  get boxes(): ReadonlyArray<allInterfaces.IInternalBox> {
    return this._boxes;
  }
  get triangles(): ReadonlyArray<allInterfaces.IInternalTriangle> {
    return this._triangles;
  }
}
