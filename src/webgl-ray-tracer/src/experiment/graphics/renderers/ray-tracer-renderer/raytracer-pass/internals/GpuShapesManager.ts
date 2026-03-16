
import { GpuDataTexture2d } from './GpuDataTexture2d';
import * as allInterfaces from '../all-interfaces';

import * as glm from "gl-matrix"

export interface IGpuShapesManager {
  pushSphere(opts: allInterfaces.IPublicSphere): void;
  pushBox(opts: allInterfaces.IPublicBox): void;
  pushTriangle(opts: allInterfaces.IPublicTriangle): void;
  pushSubScene(opts: allInterfaces.IPublicSubScene): void;

  spheres: ReadonlyArray<allInterfaces.IInternalSphere>;
  boxes: ReadonlyArray<allInterfaces.IInternalBox>;
  triangles: ReadonlyArray<allInterfaces.IInternalTriangle>;
  subScenes: ReadonlyArray<allInterfaces.IInternalSubScene>;
};

interface IMaterialsManager {
  has(materialAlias: number): boolean;
  canCastShadow(materialAlias: number): boolean;
  getIndexFromAlias(materialAlias: number): number | undefined;
};

export class GpuShapesManager implements IGpuShapesManager {

  private _materialsManager: IMaterialsManager;

  private _spheres: allInterfaces.IInternalSphere[] = [];
  private _boxes: allInterfaces.IInternalBox[] = [];
  private _triangles: allInterfaces.IInternalTriangle[] = [];
  private _subScenes: allInterfaces.IInternalSubScene[] = [];

  private _gpuDataTexture2d: GpuDataTexture2d;

  constructor(
    gpuDataTexture2d: GpuDataTexture2d,
    materialsManager: IMaterialsManager,
  ) {
    this._gpuDataTexture2d = gpuDataTexture2d;
    this._materialsManager = materialsManager;
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

  pushSubScene({
    sceneIndex,
    position,
    orientation,
  }: allInterfaces.IPublicSubScene) {

    if (sceneIndex <= 0) {
      throw new Error(`cannot push the primary scene as a sub-scene`);
    }

    this._subScenes.push({
      sceneIndex,
      position: glm.vec3.clone(position),
      orientation: glm.quat.clone(orientation),
    });
  }

  clear() {
    this._spheres.length = 0;
    this._boxes.length = 0;
    this._triangles.length = 0;
    this._subScenes.length = 0;
  }

  prepareBufferSpheres(texelY: number) {

    const currRow = this._gpuDataTexture2d.getDataRow(texelY);
    currRow.clear();

    {
      // spheres

      for (const sphere of this._spheres) {
        // add sphere

        const currMatIndex = this._materialsManager.getIndexFromAlias(sphere.materialAlias);
        if (currMatIndex === undefined) {
          throw new Error(`sphere materialAlias not found ${sphere.materialAlias}`);
        }

        const canCastShadow = this._materialsManager.canCastShadow(sphere.materialAlias)!;

        currRow.push(
          canCastShadow ? 1 : 0 + 0.5, // [0] R
          currMatIndex + 0.5, // [1] G
          sphere.position[0], // [2] B
          sphere.position[1], // [3] A
        );
        currRow.push(
          sphere.position[2], // [4] R
          sphere.orientation[0], // [5] G
          sphere.orientation[1], // [6] B
          sphere.orientation[2], // [7] A
        );
        currRow.push(
          sphere.orientation[3], // [8] R
          sphere.radius, // [9] G
          0,
          0,
        );

      }

    } // spheres

  }

  prepareBufferBoxes(texelY: number) {

    const currRow = this._gpuDataTexture2d.getDataRow(texelY);
    currRow.clear();

    {
      // boxes

      for (const box of this._boxes) {
        // add box

        const currMatIndex = this._materialsManager.getIndexFromAlias(box.materialAlias);
        if (currMatIndex === undefined) {
          throw new Error(`box materialAlias not found ${box.materialAlias}`);
        }

        const canCastShadow = this._materialsManager.canCastShadow(box.materialAlias)!;

        currRow.push(
          canCastShadow ? 1 : 0 + 0.5, // [0] R
          currMatIndex + 0.5, // [10]
          box.position[0], // [0]
          box.position[1], // [1]
        );
        currRow.push(
          box.position[2], // [2]
          box.orientation[0], // [3]
          box.orientation[1], // [4]
          box.orientation[2], // [5]
        );
        currRow.push(
          box.orientation[3], // [6]
          box.boxSize[0], // [7]
          box.boxSize[1], // [8]
          box.boxSize[2], // [9]
        );

      }

    } // boxes

  }

  prepareBufferTriangles(texelY: number) {

    const currRow = this._gpuDataTexture2d.getDataRow(texelY);
    currRow.clear();

    {
      // triangles

      for (const triangle of this._triangles) {
        // add triangle

        const currMatIndex = this._materialsManager.getIndexFromAlias(triangle.materialAlias);
        if (currMatIndex === undefined) {
          throw new Error(`triangle materialAlias not found ${triangle.materialAlias}`);
        }

        const canCastShadow = this._materialsManager.canCastShadow(triangle.materialAlias)!;

        currRow.push(
          canCastShadow ? 1 : 0 + 0.5, // [0] R
          currMatIndex + 0.5, // [0]
          triangle.v0[0], // [1]
          triangle.v0[1], // [2]
        );
        currRow.push(
          triangle.v0[2], // [3]
          triangle.v1[0], // [4]
          triangle.v1[1], // [5]
          triangle.v1[2], // [6]
        );
        currRow.push(
          triangle.v2[0], // [7]
          triangle.v2[1], // [8]
          triangle.v2[2], // [9]
          0,
        );

      }

    } // triangles

  }

  prepareBufferSubScene(texelY: number) {

    const currRow = this._gpuDataTexture2d.getDataRow(texelY);
    currRow.clear();

    {
      // sub-scenes

      for (const currSubScene of this._subScenes) {
        // add triangle

        // const currMatIndex = this._materialsManager.getIndexFromAlias(triangle.materialAlias);
        // if (currMatIndex === undefined) {
        //   throw new Error(`triangle materialAlias not found ${triangle.materialAlias}`);
        // }

        // const canCastShadow = this._materialsManager.canCastShadow(triangle.materialAlias)!;

        if (currSubScene.sceneIndex <= 0) {
          throw new Error("LOL????");
        }

        currRow.push(
          currSubScene.position[0], // [0]
          currSubScene.position[1], // [1]
          currSubScene.position[2], // [2]
          currSubScene.sceneIndex + 0.5, // [3]
        );
        currRow.push(
          currSubScene.orientation[0], // [4]
          currSubScene.orientation[1], // [5]
          currSubScene.orientation[2], // [6]
          currSubScene.orientation[3], // [7]
        );

      }

    } // sub-scenes

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
  get subScenes(): ReadonlyArray<allInterfaces.IInternalSubScene> {
    return this._subScenes;
  }
};
