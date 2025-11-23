import * as webgl2 from '../../../../graphics/webgl2';

import * as math from '../../../../system/math';

import * as glm from 'gl-matrix';

// const k_bufferSize = 7 * 1024;
const k_bufferSize = 1024 * 1024; // 1Mo

export class TrianglesStackRenderer {
  private _shader: webgl2.IUnboundShader;
  private _geometry: webgl2.GeometryWrapper.Geometry;

  private _buffer = new Float32Array(k_bufferSize);
  private _currentSize: number = 0;

  constructor(
    inShader: webgl2.IUnboundShader,
    inGeometryDef: webgl2.GeometryWrapper.GeometryDefinition
  ) {
    this._shader = inShader;
    const geometryDef: webgl2.GeometryWrapper.GeometryDefinition = {
      ...inGeometryDef,
      primitiveType: webgl2.GeometryWrapper.PrimitiveType.triangles
    };

    this._geometry = new webgl2.GeometryWrapper.Geometry(inShader, geometryDef);
  }

  pushRawTriangle(
    inPointA: glm.ReadonlyVec3,
    inPointB: glm.ReadonlyVec3,
    inPointC: glm.ReadonlyVec3,
    inColorA: glm.ReadonlyVec3 | glm.ReadonlyVec4,
    inColorB: glm.ReadonlyVec3 | glm.ReadonlyVec4,
    inColorC: glm.ReadonlyVec3 | glm.ReadonlyVec4,
  ) {
    if (this._currentSize + 7 * 6 >= this._buffer.length) {
      if (this._shader.isBound()) {
        this.flush();
      } else {
        return;
      }
    }

    const alphaValueA = inColorA.length == 4 ? inColorA[3] : 1;
    const alphaValueB = inColorA.length == 4 ? inColorA[3] : 1;
    const alphaValueC = inColorA.length == 4 ? inColorA[3] : 1;

    // 0
    this._buffer[this._currentSize + 0] = inPointA[0];
    this._buffer[this._currentSize + 1] = inPointA[1];
    this._buffer[this._currentSize + 2] = inPointA[2];
    this._buffer[this._currentSize + 3] = inColorA[0];
    this._buffer[this._currentSize + 4] = inColorA[1];
    this._buffer[this._currentSize + 5] = inColorA[2];
    this._buffer[this._currentSize + 6] = alphaValueA;
    this._currentSize += 7;

    // 2
    this._buffer[this._currentSize + 0] = inPointB[0];
    this._buffer[this._currentSize + 1] = inPointB[1];
    this._buffer[this._currentSize + 2] = inPointB[2];
    this._buffer[this._currentSize + 3] = inColorB[0];
    this._buffer[this._currentSize + 4] = inColorB[1];
    this._buffer[this._currentSize + 5] = inColorB[2];
    this._buffer[this._currentSize + 6] = alphaValueB;
    this._currentSize += 7;

    // 3
    this._buffer[this._currentSize + 0] = inPointC[0];
    this._buffer[this._currentSize + 1] = inPointC[1];
    this._buffer[this._currentSize + 2] = inPointC[2];
    this._buffer[this._currentSize + 3] = inColorC[0];
    this._buffer[this._currentSize + 4] = inColorC[1];
    this._buffer[this._currentSize + 5] = inColorC[2];
    this._buffer[this._currentSize + 6] = alphaValueC;
    this._currentSize += 7;
  }

  pushTriangle(
    inPointA: glm.ReadonlyVec3,
    inPointB: glm.ReadonlyVec3,
    inPointC: glm.ReadonlyVec3,
    inColor: glm.ReadonlyVec3 | glm.ReadonlyVec4
  ) {
    if (this._currentSize + 7 * 6 >= this._buffer.length) {
      if (this._shader.isBound()) {
        this.flush();
      } else {
        return;
      }
    }

    this.pushRawTriangle(inPointA, inPointB, inPointC, inColor, inColor, inColor);
  }

  pushLine(
    inPointA: glm.ReadonlyVec3,
    inPointB: glm.ReadonlyVec3,
    thickness: number,
    inColor: glm.ReadonlyVec3 | glm.ReadonlyVec4
  ) {
    if (this._currentSize + 7 * 6 >= this._buffer.length) {
      return;
    }

    const diffX = inPointB[0] - inPointA[0];
    const diffY = inPointB[1] - inPointA[1];
    const angle = Math.atan2(diffY, diffX) + Math.PI * 0.5;

    const stepX = Math.cos(angle) * thickness * 0.5;
    const stepY = Math.sin(angle) * thickness * 0.5;

    this.pushTriangle(
      [inPointA[0] - stepX, inPointA[1] - stepY, inPointA[2]],
      [inPointB[0] - stepX, inPointB[1] - stepY, inPointB[2]],
      [inPointB[0] + stepX, inPointB[1] + stepY, inPointB[2]],
      inColor
    );
    this.pushTriangle(
      [inPointA[0] - stepX, inPointA[1] - stepY, inPointA[2]],
      [inPointB[0] + stepX, inPointB[1] + stepY, inPointB[2]],
      [inPointA[0] + stepX, inPointA[1] + stepY, inPointA[2]],
      inColor
    );
  }

  push3dLine(
    inPointA: glm.ReadonlyVec3,
    inPointB: glm.ReadonlyVec3,
    thicknessA: number,
    thicknessB: number,
    inColorA: glm.ReadonlyVec3 | glm.ReadonlyVec4,
    inColorB: glm.ReadonlyVec3 | glm.ReadonlyVec4,
  ): void {
    if (this._currentSize + 7 * 6 >= this._buffer.length) {
      return;
    }

    const diffX = inPointB[0] - inPointA[0];
    const diffY = inPointB[1] - inPointA[1];
    const diffZ = inPointB[2] - inPointA[2];
    const horizontalAngle = Math.atan2(diffY, diffX);
    const verticalAngle = Math.atan2(diffZ, math.magnitude(diffX, diffY));

    const mat4 = glm.mat4.identity(glm.mat4.create());
    glm.mat4.rotateZ(mat4, mat4, horizontalAngle);
    glm.mat4.rotateY(mat4, mat4, -verticalAngle);

    const totalLength = glm.vec3.distance(inPointA, inPointB);

    const sideA: glm.vec3[] = [
      [totalLength * 0.0, +thicknessA * 0.5, +thicknessA * 0.5],
      [totalLength * 0.0, -thicknessA * 0.5, +thicknessA * 0.5],
      [totalLength * 0.0, -thicknessA * 0.5, -thicknessA * 0.5],
      [totalLength * 0.0, +thicknessA * 0.5, -thicknessA * 0.5],
    ];
    const sideB: glm.vec3[] = [
      [totalLength * 1.0, +thicknessB * 0.5, +thicknessB * 0.5],
      [totalLength * 1.0, -thicknessB * 0.5, +thicknessB * 0.5],
      [totalLength * 1.0, -thicknessB * 0.5, -thicknessB * 0.5],
      [totalLength * 1.0, +thicknessB * 0.5, -thicknessB * 0.5],
    ];

    for (const pos of sideA) {
      glm.vec3.transformMat4(pos, pos, mat4);
      glm.vec3.add(pos, pos, inPointA);
    }
    for (const pos of sideB) {
      glm.vec3.transformMat4(pos, pos, mat4);
      glm.vec3.add(pos, pos, inPointA);
    }

    interface TmpVertex {
      pos: glm.vec3;
      color: glm.ReadonlyVec3 | glm.ReadonlyVec4;
    }

    const allQuads: [TmpVertex,TmpVertex,TmpVertex,TmpVertex][] = [
      [ {pos: sideA[0], color: inColorA}, { pos: sideA[1], color: inColorA }, { pos: sideB[0], color: inColorB }, {pos: sideB[1], color: inColorB} ],
      [ {pos: sideA[1], color: inColorA}, { pos: sideA[2], color: inColorA }, { pos: sideB[1], color: inColorB }, {pos: sideB[2], color: inColorB} ],
      [ {pos: sideA[2], color: inColorA}, { pos: sideA[3], color: inColorA }, { pos: sideB[2], color: inColorB }, {pos: sideB[3], color: inColorB} ],
      [ {pos: sideA[3], color: inColorA}, { pos: sideA[0], color: inColorA }, { pos: sideB[3], color: inColorB }, {pos: sideB[0], color: inColorB} ],
    ];

    const indices: glm.ReadonlyVec3[] = [ [0, 3, 2], [0, 1, 3] ];

    for (const quad of allQuads) {
      for (const index of indices) {
        this.pushRawTriangle(
          quad[index[0]].pos,
          quad[index[1]].pos,
          quad[index[2]].pos,
          quad[index[0]].color,
          quad[index[1]].color,
          quad[index[2]].color
        );
      }
    }

    // const stepX = Math.cos(angle) * thickness * 0.5;
    // const stepY = Math.sin(angle) * thickness * 0.5;

    // this.pushTriangle(
    //   [inPointA[0] - stepX, inPointA[1] - stepY, inPointA[2]],
    //   [inPointB[0] - stepX, inPointB[1] - stepY, inPointB[2]],
    //   [inPointB[0] + stepX, inPointB[1] + stepY, inPointB[2]],
    //   inColor
    // );
    // this.pushTriangle(
    //   [inPointA[0] - stepX, inPointA[1] - stepY, inPointA[2]],
    //   [inPointB[0] + stepX, inPointB[1] + stepY, inPointB[2]],
    //   [inPointA[0] + stepX, inPointA[1] + stepY, inPointA[2]],
    //   inColor
    // );
  }

  pushRotatedLine(
    center: glm.ReadonlyVec3,
    angle: number,
    length: number,
    thickness: number,
    color: glm.ReadonlyVec3
  ) {
    this.pushLine(
      [
        center[0] - length * Math.cos(angle),
        center[1] - length * Math.sin(angle),
        center[2]
      ],
      [
        center[0] + length * Math.cos(angle),
        center[1] + length * Math.sin(angle),
        center[2]
      ],
      thickness,
      color
    );
  }

  pushOriginBoundRectangle(
    inOrigin: glm.ReadonlyVec3,
    inSize: glm.ReadonlyVec2,
    inColor: glm.ReadonlyVec3 | glm.ReadonlyVec4
  ) {
    if (this._currentSize + 7 * 6 >= this._buffer.length) {
      return;
    }

    const maxCoord: glm.ReadonlyVec2 = [
      inOrigin[0] + inSize[0],
      inOrigin[1] + inSize[1]
    ];

    this.pushTriangle(
      [inOrigin[0], inOrigin[1], inOrigin[2]],
      [maxCoord[0], maxCoord[1], inOrigin[2]],
      [inOrigin[0], maxCoord[1], inOrigin[2]],
      inColor
    );

    this.pushTriangle(
      [inOrigin[0], inOrigin[1], inOrigin[2]],
      [maxCoord[0], inOrigin[1], inOrigin[2]],
      [maxCoord[0], maxCoord[1], inOrigin[2]],
      inColor
    );
  }

  pushCenteredRectangle(
    inCenter: glm.ReadonlyVec3,
    inSize: glm.ReadonlyVec2,
    inColor: glm.ReadonlyVec3 | glm.ReadonlyVec4
  ) {
    const origin: glm.ReadonlyVec3 = [
      inCenter[0] - inSize[0] * 0.5,
      inCenter[1] - inSize[1] * 0.5,
      inCenter[2]
    ];

    this.pushOriginBoundRectangle(origin, inSize, inColor);
  }

  canRender() {
    return this._currentSize > 0;
  }

  flush() {
    if (!this.canRender()) {
      return;
    }

    this._geometry.allocateBuffer(0, this._buffer, this._currentSize);
    this._geometry.setPrimitiveCount(this._currentSize / 7);

    this._geometry.render();

    this.clear();
  }

  clear(): void {
    // reset vertices
    this._currentSize = 0;
  }
}
