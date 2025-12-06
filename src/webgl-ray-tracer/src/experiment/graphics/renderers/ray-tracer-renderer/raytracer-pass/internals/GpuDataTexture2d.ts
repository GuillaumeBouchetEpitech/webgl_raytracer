
import { graphics } from '@local-framework';

// 3 texture rows worth of cached heap
const k_maxLength = 2048 * 3;

export class GpuDataTexture2d {

  private _textureUniformName: string;

  private _dataTexture: graphics.webgl2.IUnboundDataTexture2dVec4f32;
  private _dataValues = new Float32Array(k_maxLength);
  private _currentIndex = 0;

  constructor(textureUniformName: string) {
    this._textureUniformName = textureUniformName;
    this._dataTexture = new graphics.webgl2.DataTexture2dVec4f32();
    this._dataTexture.initialize(2048, 4);
  }

  push(r: number, g: number, b: number, a: number) {

    if (this._currentIndex >= k_maxLength) {
      throw new Error(`not more space left in the GpuDataTexture2d heap cache, max length is ${k_maxLength}.`);
    }

    this._dataValues[this._currentIndex * 4 + 0] = r;
    this._dataValues[this._currentIndex * 4 + 1] = g;
    this._dataValues[this._currentIndex * 4 + 2] = b;
    this._dataValues[this._currentIndex * 4 + 3] = a;
    this._currentIndex += 1;
  }

  clear() {
    this._currentIndex = 0;
  }

  uploadGpuDataAsRow(texelY: number) {
    this._dataTexture.preBind((boundDataTexture) => {
      boundDataTexture.updateFromBuffer(0, texelY, this._currentIndex, 1, this._dataValues);
    });
  }

  uploadGpuData(
    texelX: number,
    texelY: number,
    width: number,
    height: number,
  ) {
    this._dataTexture.preBind((boundDataTexture) => {
      boundDataTexture.updateFromBuffer(texelX, texelY, width, height, this._dataValues);
    });
  }

  getCurrentIndex(): number {
    return this._currentIndex;
  }

  setForShader(
    boundShader: graphics.webgl2.IBoundShader,
    textureUnit: number,
  ) {
    boundShader.setInteger1Uniform(this._textureUniformName, textureUnit);
  }

}
