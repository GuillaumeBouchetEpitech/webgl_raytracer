
import * as allInterfaces from '../all-interfaces';

import { GpuDataTexture1d } from './GpuDataTexture1d';

export interface IMaterialsManager {
  pushBasicMaterial(params: allInterfaces.IPublicBasicMaterial): void;
  pushChessboardMaterial(params: allInterfaces.IPublicChessboardMaterial): void;
};

export class MaterialsManager {

  private _basicMaterialsPerAliases = new Map<number, allInterfaces.IInternalBasicMaterial>();
  private _allBasicMaterials: allInterfaces.IInternalBasicMaterial[] = []

  private _chessboardMaterialsPerAliases = new Map<number, allInterfaces.IInternalChessboardMaterial>();
  private _allChessboardMaterials: allInterfaces.IInternalChessboardMaterial[] = []

  private _matAliasToIndex = new Map<number, number>();

  private _dataTexture: GpuDataTexture1d;

  constructor(textureUniformName: string) {
    this._dataTexture = new GpuDataTexture1d(textureUniformName)
  }

  pushBasicMaterial(params: allInterfaces.IPublicBasicMaterial): void {

    if (this._basicMaterialsPerAliases.has(params.materialAlias)) {
      throw new Error(`duplicated basic material alias -> "${params.materialAlias}"`);
    }
    if (params.reflectionFactor < 0 || params.reflectionFactor > 1) {
      throw new Error('invalid sphere reflection');
    }
    if (params.refractionFactor < 0 || params.refractionFactor > 1) {
      throw new Error('invalid sphere refractionFactor');
    }

    const newMat: allInterfaces.IInternalBasicMaterial = { ...params, materialType: 0 };
    this._allBasicMaterials.push(newMat);
    this._basicMaterialsPerAliases.set(newMat.materialAlias, newMat);
  }

  pushChessboardMaterial(params: allInterfaces.IPublicChessboardMaterial): void {

    if (this._chessboardMaterialsPerAliases.has(params.materialAlias)) {
      throw new Error(`duplicated chessboard material alias -> "${params.materialAlias}"`);
    }
    if (!this._basicMaterialsPerAliases.has(params.materialAliasA)) {
      throw new Error(`missing material alias A -> "${params.materialAliasA}"`);
    }
    if (!this._basicMaterialsPerAliases.has(params.materialAliasB)) {
      throw new Error(`missing material alias B -> "${params.materialAliasB}"`);
    }

    const newMat: allInterfaces.IInternalChessboardMaterial = { ...params, materialType: 0 };
    this._allChessboardMaterials.push(newMat);
    this._chessboardMaterialsPerAliases.set(newMat.materialAlias, newMat);
  }

  has(materialAlias: number): boolean {
    return (
      this._basicMaterialsPerAliases.has(materialAlias) ||
      this._chessboardMaterialsPerAliases.has(materialAlias)
    );
  }

  clear() {
    this._chessboardMaterialsPerAliases.clear();
    this._allBasicMaterials.length = 0;

    this._basicMaterialsPerAliases.clear();
    this._allChessboardMaterials.length = 0;

    this._matAliasToIndex.clear();
  }

  prepareBuffer() {

    this._dataTexture.clear();

    let currIndex = 0;

    this._matAliasToIndex.clear();
    // const matAliasToIndex = new Map<number, number>();
    this._allBasicMaterials.forEach((currMat) => {

      this._matAliasToIndex.set(currMat.materialAlias, currIndex);
      currIndex += 1;

      const matType = 0;

      this._dataTexture.push(
        matType + 0.5, // [0] R
        (currMat.castShadowEnabled ? 1 : 0) + 0.5, // [1] G
        currMat.reflectionFactor, // [2] B
        currMat.refractionFactor, // [3] A
      );
      this._dataTexture.push(
        currMat.receiveLightEnabled ? 1 : 0, // [4] R
        currMat.color[0], // [5] G
        currMat.color[1], // [6] B
        currMat.color[2], // [7] A
      );

    });

    this._allChessboardMaterials.forEach((currMat) => {

      this._matAliasToIndex.set(currMat.materialAlias, currIndex);
      currIndex += 1;

      const subMatIndexA = this._matAliasToIndex.get(currMat.materialAliasA);
      const subMatIndexB = this._matAliasToIndex.get(currMat.materialAliasB);

      if (subMatIndexA === undefined || subMatIndexB === undefined) {
        throw new Error("chessboard material, associated basic material not found");
      }

      const matType = 1;

      this._dataTexture.push(
        matType + 0.5, // [0] R
        (currMat.castShadowEnabled ? 1 : 0) + 0.5, // [1] G
        subMatIndexA + 0.5, // [2] B
        subMatIndexB + 0.5, // [3] A
      );
      this._dataTexture.push(
        currMat.chessboardArgs ? currMat.chessboardArgs[0] : 1.0, // [4] R
        currMat.chessboardArgs ? currMat.chessboardArgs[1] : 1.0, // [5] G
        currMat.chessboardArgs ? currMat.chessboardArgs[2] : 1.0, // [6] B
        0, // [7] A
      );

    });

  }

  getIndexFromAlias(materialAlias: number): number | undefined {
    return this._matAliasToIndex.get(materialAlias);
  }

  get dataTexture(): Readonly<GpuDataTexture1d> {
    return this._dataTexture;
  }

};
