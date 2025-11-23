
import * as glm from 'gl-matrix';

export interface IPublicBaseMaterial {
  materialAlias: number;
  castShadowEnabled: boolean;
}
export interface IInternalBaseMaterial {
  materialType: 0 | 1;
}

export interface IPublicBasicMaterial extends IPublicBaseMaterial {
  reflectionFactor: number;
  refractionFactor: number;
  color: glm.ReadonlyVec3;
  receiveLightEnabled: boolean;
}

export type IInternalBasicMaterial = IPublicBasicMaterial & IInternalBaseMaterial;

export interface IPublicChessboardMaterial extends IPublicBaseMaterial {
  materialAliasA: number;
  materialAliasB: number;
  chessboardArgs?: glm.ReadonlyVec3;
}

export type IInternalChessboardMaterial = IPublicChessboardMaterial & IInternalBaseMaterial;

//
//
//

export interface IPublicSphere {
  position: glm.ReadonlyVec3;
  orientation: glm.ReadonlyQuat;
  radius: number;
  materialAlias: number;
}

export type IInternalSphere = IPublicSphere;

export interface IPublicBox {
  position: glm.ReadonlyVec3;
  orientation: glm.ReadonlyQuat;
  boxSize: glm.ReadonlyVec3;
  materialAlias: number;
}

export type IInternalBox = IPublicBox;

export interface IPublicTriangle {
  v0: glm.ReadonlyVec3;
  v1: glm.ReadonlyVec3;
  v2: glm.ReadonlyVec3;
  materialAlias: number;
}

export type IInternalTriangle = IPublicTriangle;

//
//
//

export interface ISpotLight {
  position: glm.ReadonlyVec3;
  intensity: number;
  radius: number;
}

//
//
//

export interface IStackRenderer {
  pushLine(
    inPointA: glm.ReadonlyVec3,
    inPointB: glm.ReadonlyVec3,
    inColor: glm.ReadonlyVec3,
  ): void;

  push3dLine(
    inPointA: glm.ReadonlyVec3,
    inPointB: glm.ReadonlyVec3,
    thicknessA: number,
    thicknessB: number,
    inColorA: glm.ReadonlyVec3 | glm.ReadonlyVec4,
    inColorB: glm.ReadonlyVec3 | glm.ReadonlyVec4
  ): void;

  // pushThickLine(
  //   inPointA: glm.ReadonlyVec3,
  //   inPointB: glm.ReadonlyVec3,
  //   thicknessA: number,
  //   thicknessB: number,
  //   inColorA: glm.ReadonlyVec3 | glm.ReadonlyVec4,
  //   inColorB: glm.ReadonlyVec3 | glm.ReadonlyVec4
  // ): void;

  // push3dLine(
  //   inPointA: glm.ReadonlyVec3,
  //   inPointB: glm.ReadonlyVec3,
  //   thicknessA: number,
  //   thicknessB: number,
  //   inColorA: glm.ReadonlyVec3 | glm.ReadonlyVec4,
  //   inColorB: glm.ReadonlyVec3 | glm.ReadonlyVec4,
  // ): void;

};

