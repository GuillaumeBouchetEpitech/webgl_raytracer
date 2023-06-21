import { ShaderProgram, GeometryWrapper } from '../../../../../../browser/webgl2';

import * as glm from 'gl-matrix';

const k_bufferSize = 14 * 1024;

export class WireFramesStackRenderer {
  private _shader: ShaderProgram;
  private _geometry: GeometryWrapper.Geometry;

  private _buffer = new Float32Array(k_bufferSize);
  private _currentSize: number = 0;

  constructor(
    inShader: ShaderProgram,
    inGeometryDef: GeometryWrapper.GeometryDefinition
  ) {
    this._shader = inShader;
    const geometryDef: GeometryWrapper.GeometryDefinition = {
      ...inGeometryDef,
      primitiveType: GeometryWrapper.PrimitiveType.lines
    };

    this._geometry = new GeometryWrapper.Geometry(inShader, geometryDef);
    this._geometry.setFloatBufferSize(0, k_bufferSize);
  }

  pushLine(
    inPointA: glm.ReadonlyVec3,
    inPointB: glm.ReadonlyVec3,
    inColor: glm.ReadonlyVec3 | glm.ReadonlyVec4
  ) {
    if (this._currentSize + 7 * 2 >= this._buffer.length) {
      if (this._shader.isBound()) {
        this.flush();
      } else {
        return;
      }
    }

    const alphaValue = inColor[3] ?? 1;

    this._buffer[this._currentSize + 0] = inPointA[0];
    this._buffer[this._currentSize + 1] = inPointA[1];
    this._buffer[this._currentSize + 2] = inPointA[2];
    this._buffer[this._currentSize + 3] = inColor[0];
    this._buffer[this._currentSize + 4] = inColor[1];
    this._buffer[this._currentSize + 5] = inColor[2];
    this._buffer[this._currentSize + 6] = alphaValue;
    this._currentSize += 7;

    this._buffer[this._currentSize + 0] = inPointB[0];
    this._buffer[this._currentSize + 1] = inPointB[1];
    this._buffer[this._currentSize + 2] = inPointB[2];
    this._buffer[this._currentSize + 3] = inColor[0];
    this._buffer[this._currentSize + 4] = inColor[1];
    this._buffer[this._currentSize + 5] = inColor[2];
    this._buffer[this._currentSize + 6] = alphaValue;
    this._currentSize += 7;
  }

  canRender() {
    return this._currentSize > 0;
  }

  flush() {
    if (!this.canRender()) return;

    this._geometry.updateBuffer(0, this._buffer, this._currentSize);
    this._geometry.setPrimitiveCount(this._currentSize / 7);

    this._geometry.render();

    this.clear();
  }

  clear(): void {
    // reset vertices
    this._currentSize = 0;
  }
}
