import {
  ICircle,
  circleCircleIntersectionPoints
} from './circleCircleIntersectionPoints';

import * as glm from 'gl-matrix';

interface QuatAxis {
  axis: glm.ReadonlyVec3;
  angle: number;
}

export interface LimbDataResultJoint {
  localPos: glm.vec3;
  primaryPitch: number;
  secondaryPitch: number;
  primaryQuatAxis: QuatAxis;
  secondaryQuatAxis: QuatAxis;
}

export interface ILimbDataResult {
  success: boolean;
  baseMat4: glm.mat4;
  primaryQuatAxises: [QuatAxis, QuatAxis];
  jointA: LimbDataResultJoint;
  jointB: LimbDataResultJoint;
  localTarget: glm.vec3;
}

// const _lerpFloat = (valA: number, valB: number, ratio: number) => valA + (valB - valA) * ratio;
// const _lerpMat4 = (out: glm.mat4, valA: glm.ReadonlyMat4, valB: glm.ReadonlyMat4, ratio: number) => {
//   return glm.mat4.add(out, valA, glm.mat4.multiplyScalar(out, glm.mat4.sub(out, valB, valA), ratio));
// }

// export const interpolateLimbDataResult = (outRes: ILimbDataResult, resA: Readonly<ILimbDataResult>, resB: Readonly<ILimbDataResult>, ratio: number): void => {

//   outRes.baseMat4 =  _lerpMat4(outRes.baseMat4, resA.baseMat4, resB.baseMat4, ratio);
//   outRes.localTarget = glm.vec3.lerp(outRes.localTarget, resA.localTarget, resB.localTarget, ratio);

//   outRes.jointA.localPos = glm.vec3.lerp(outRes.localTarget, resA.jointA.localPos, resB.jointA.localPos, ratio);
//   outRes.jointA.primaryPitch = _lerpFloat(resA.jointA.primaryPitch, resB.jointA.primaryPitch, ratio);
//   outRes.jointA.secondaryPitch = _lerpFloat(resA.jointA.secondaryPitch, resB.jointA.secondaryPitch, ratio);

//   outRes.jointB.localPos = glm.vec3.lerp(outRes.localTarget, resA.jointB.localPos, resB.jointB.localPos, ratio);
//   outRes.jointB.primaryPitch = _lerpFloat(resA.jointB.primaryPitch, resB.jointB.primaryPitch, ratio);
//   outRes.jointB.secondaryPitch = _lerpFloat(resA.jointB.secondaryPitch, resB.jointB.secondaryPitch, ratio);

// };

export class LimbData {
  public rootMat4: glm.mat4;
  public primaryLength: number;
  public secondaryLength: number;

  constructor(
    rootMat4: glm.mat4,
    primaryLength: number,
    secondaryLength: number
  ) {
    this.rootMat4 = rootMat4;
    this.primaryLength = primaryLength;
    this.secondaryLength = secondaryLength;
  }

  computeIk_fixedYaw(
    inWorldTarget: glm.ReadonlyVec3,
    inWorldForward: glm.ReadonlyVec3
  ): ILimbDataResult | undefined {
    const invRootMat4: glm.ReadonlyMat4 = glm.mat4.invert(
      glm.mat4.create(),
      this.rootMat4
    );
    const rawLocalTarget: glm.ReadonlyVec3 = glm.vec3.transformMat4(
      glm.vec3.create(),
      inWorldTarget,
      invRootMat4
    );

    //
    //
    //
    //
    //

    const rawLocalForward: glm.ReadonlyVec3 = glm.vec3.transformMat4(
      glm.vec3.create(),
      inWorldForward,
      invRootMat4
    );
    // const rawLocalForward: glm.ReadonlyVec3 = inWorldForward;

    const primaryYaw = Math.atan2(rawLocalForward[1], rawLocalForward[0]);

    const tmpYawAlignedMat4 = glm.mat4.identity(glm.mat4.create());
    glm.mat4.rotate(
      tmpYawAlignedMat4,
      tmpYawAlignedMat4,
      primaryYaw,
      [0, 0, 1]
    );
    const tmpRollTarget: glm.ReadonlyVec3 = glm.vec3.transformMat4(
      glm.vec3.create(),
      rawLocalTarget,
      glm.mat4.invert(tmpYawAlignedMat4, tmpYawAlignedMat4)
    );

    const primaryRoll = Math.atan2(tmpRollTarget[1], -tmpRollTarget[2]);

    const result: ILimbDataResult = {
      success: false,
      baseMat4: glm.mat4.identity(glm.mat4.create()),
      primaryQuatAxises: [
        { axis: [0, 0, 1], angle: primaryYaw },
        { axis: [1, 0, 0], angle: primaryRoll }
      ],
      jointA: {
        localPos: glm.vec3.create(),
        primaryPitch: 0,
        secondaryPitch: 0,
        primaryQuatAxis: { axis: [0, 1, 0], angle: 0 },
        secondaryQuatAxis: { axis: [0, 1, 0], angle: 0 }
      },
      jointB: {
        localPos: glm.vec3.create(),
        primaryPitch: 0,
        secondaryPitch: 0,
        primaryQuatAxis: { axis: [0, 1, 0], angle: 0 },
        secondaryQuatAxis: { axis: [0, 1, 0], angle: 0 }
      },
      localTarget: glm.vec3.create()
    };

    glm.mat4.rotate(result.baseMat4, result.baseMat4, primaryYaw, [0, 0, 1]);
    glm.mat4.rotate(result.baseMat4, result.baseMat4, primaryRoll, [1, 0, 0]);

    //
    //
    //
    //
    //

    glm.vec3.transformMat4(
      result.localTarget,
      rawLocalTarget,
      glm.mat4.invert(glm.mat4.create(), result.baseMat4)
    );

    if (this._computeIk_joints(result)) {
      return result;
    }
  }

  computeIk_fixedRoll(
    inWorldTarget: glm.ReadonlyVec3,
    inWorldRoll: glm.ReadonlyVec3
  ): ILimbDataResult | undefined {
    const invRootMat4: glm.ReadonlyMat4 = glm.mat4.invert(
      glm.mat4.create(),
      this.rootMat4
    );
    const rawLocalTarget: glm.ReadonlyVec3 = glm.vec3.transformMat4(
      glm.vec3.create(),
      inWorldTarget,
      invRootMat4
    );

    //
    //
    //
    //
    //

    const rawLocalRoll: glm.ReadonlyVec3 = glm.vec3.transformMat3(
      glm.vec3.create(),
      inWorldRoll,
      glm.mat3.fromMat4(glm.mat3.create(), invRootMat4)
    );
    // const rawLocalRoll: glm.ReadonlyVec3 = inWorldRoll;

    const primaryRoll = Math.atan2(rawLocalRoll[1], rawLocalRoll[0]);
    const tmpRollAlignedMat4 = glm.mat4.identity(glm.mat4.create());
    glm.mat4.rotate(
      tmpRollAlignedMat4,
      tmpRollAlignedMat4,
      primaryRoll,
      [1, 0, 0]
    );
    const tmpThetaTarget: glm.ReadonlyVec3 = glm.vec3.transformMat4(
      glm.vec3.create(),
      rawLocalTarget,
      glm.mat4.invert(tmpRollAlignedMat4, tmpRollAlignedMat4)
    );
    const primaryYaw = Math.atan2(tmpThetaTarget[1], tmpThetaTarget[0]);

    const result: ILimbDataResult = {
      success: false,
      baseMat4: glm.mat4.identity(glm.mat4.create()),
      primaryQuatAxises: [
        { axis: [1, 0, 0], angle: primaryRoll },
        { axis: [0, 0, 1], angle: primaryYaw }
      ],
      jointA: {
        localPos: glm.vec3.create(),
        primaryPitch: 0,
        secondaryPitch: 0,
        primaryQuatAxis: { axis: [0, 1, 0], angle: 0 },
        secondaryQuatAxis: { axis: [0, 1, 0], angle: 0 }
      },
      jointB: {
        localPos: glm.vec3.create(),
        primaryPitch: 0,
        secondaryPitch: 0,
        primaryQuatAxis: { axis: [0, 1, 0], angle: 0 },
        secondaryQuatAxis: { axis: [0, 1, 0], angle: 0 }
      },
      localTarget: glm.vec3.create()
    };

    glm.mat4.rotate(result.baseMat4, result.baseMat4, primaryRoll, [1, 0, 0]);
    glm.mat4.rotate(result.baseMat4, result.baseMat4, primaryYaw, [0, 0, 1]);

    //
    //
    //
    //
    //

    glm.vec3.transformMat4(
      result.localTarget,
      rawLocalTarget,
      glm.mat4.invert(glm.mat4.create(), result.baseMat4)
    );

    if (this._computeIk_joints(result)) {
      return result;
    }
  }

  private _computeIk_joints(result: ILimbDataResult): boolean {
    const circleA: ICircle = { center: [0, 0], radius: this.primaryLength };
    const circleB: ICircle = {
      center: [result.localTarget[0], result.localTarget[2]],
      radius: this.secondaryLength
    };
    const subResult = circleCircleIntersectionPoints(circleA, circleB);
    if (!subResult) {
      result.success = false;
      return false;
    }

    //

    result.jointA.localPos[0] = subResult[0][0];
    result.jointA.localPos[1] = 0;
    result.jointA.localPos[2] = subResult[0][1];
    result.jointA.primaryPitch = Math.atan2(
      -result.jointA.localPos[2],
      result.jointA.localPos[0]
    );
    result.jointA.primaryQuatAxis.angle = result.jointA.primaryPitch;

    const diffSecondaryA: glm.ReadonlyVec3 = glm.vec3.sub(
      glm.vec3.create(),
      result.localTarget,
      result.jointA.localPos
    );
    result.jointA.secondaryPitch = Math.atan2(
      diffSecondaryA[2],
      diffSecondaryA[0]
    );
    result.jointA.secondaryQuatAxis.angle =
      -result.jointA.secondaryPitch - result.jointA.primaryPitch;

    //

    const tmpResult: glm.ReadonlyVec2 = subResult[1] || subResult[0];

    result.jointB.localPos[0] = tmpResult[0];
    result.jointB.localPos[1] = 0;
    result.jointB.localPos[2] = tmpResult[1];
    result.jointB.primaryPitch = Math.atan2(
      -result.jointB.localPos[2],
      result.jointB.localPos[0]
    );
    result.jointB.primaryQuatAxis.angle = result.jointB.primaryPitch;

    const diffSecondaryB: glm.ReadonlyVec3 = glm.vec3.sub(
      glm.vec3.create(),
      result.localTarget,
      result.jointB.localPos
    );
    result.jointB.secondaryPitch = Math.atan2(
      diffSecondaryB[2],
      diffSecondaryB[0]
    );
    result.jointB.secondaryQuatAxis.angle =
      -result.jointB.secondaryPitch - result.jointB.primaryPitch;

    //

    result.success = true;
    return true;
  }

  extractBaseTransform(
    result: Readonly<ILimbDataResult>,
    outMat4: glm.mat4
  ): void {
    glm.mat4.multiply(outMat4, this.rootMat4, result.baseMat4);
  }
  extractPrimaryTransform(
    result: Readonly<ILimbDataResult>,
    joint: Readonly<LimbDataResultJoint>,
    outMat4: glm.mat4
  ): void {
    this.extractBaseTransform(result, outMat4);
    glm.mat4.rotate(outMat4, outMat4, joint.primaryPitch, [0, 1, 0]);
  }
  extractSecondaryTransform(
    result: Readonly<ILimbDataResult>,
    joint: Readonly<LimbDataResultJoint>,
    outMat4: glm.mat4
  ): void {
    this.extractPrimaryTransform(result, joint, outMat4);
    glm.mat4.translate(outMat4, outMat4, [this.primaryLength, 0, 0]);
    glm.mat4.rotate(
      outMat4,
      outMat4,
      -joint.secondaryPitch - joint.primaryPitch,
      [0, 1, 0]
    );
  }
  extractTransforms(
    result: Readonly<ILimbDataResult>,
    joint: Readonly<LimbDataResultJoint>,
    baseMat4: glm.mat4,
    primaryMat4: glm.mat4,
    secondaryMat4: glm.mat4
  ): void {
    this.extractBaseTransform(result, baseMat4);
    primaryMat4 = glm.mat4.rotate(
      primaryMat4,
      baseMat4,
      joint.primaryPitch,
      [0, 1, 0]
    );
    glm.mat4.translate(secondaryMat4, primaryMat4, [this.primaryLength, 0, 0]);
    glm.mat4.rotate(
      secondaryMat4,
      secondaryMat4,
      -joint.secondaryPitch - joint.primaryPitch,
      [0, 1, 0]
    );
  }
}
