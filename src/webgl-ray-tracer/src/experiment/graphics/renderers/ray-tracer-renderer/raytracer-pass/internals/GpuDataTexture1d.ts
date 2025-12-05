
import { graphics } from '@local-framework';

const k_maxLength = 2048;

export class GpuDataTexture1d {

  private _textureUniformName: string;
  private _lengthUniformName?: string;

  private _dataTexture: graphics.webgl2.IUnboundDataTextureVec4f32;
  private _dataValues = new Float32Array(k_maxLength);
  private _currentIndex = 0;

  constructor(
    textureUniformName: string,
    lengthUniformName?: string,
  ) {
    this._textureUniformName = textureUniformName;
    this._lengthUniformName = lengthUniformName;
    this._dataTexture = new graphics.webgl2.DataTextureVec4f32();
    this._dataTexture.initialize(k_maxLength);
  }

  push(r: number, g: number, b: number, a: number) {

    if (this._currentIndex >= k_maxLength) {
      throw new Error(`not more space left in the GpuDataTexture1d, max length is ${k_maxLength}.`);
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

  syncGpuDataLength(
    boundShader: graphics.webgl2.IBoundShader,
  ) {
    if (this._lengthUniformName === undefined) {
      throw new Error(`not length uniform name specified for that GpuDataTexture1d.`);
    }

    boundShader.setInteger1Uniform(
      this._lengthUniformName,
      this._currentIndex
    );
  }

  syncGpuData() {
    this._dataTexture.preBind((boundDataTexture) => {
      boundDataTexture.updateFromBuffer(0, this._dataValues);
    });
  }

  setForShader(
    boundShader: graphics.webgl2.IBoundShader,
    textureUnit: number,
  ) {
    boundShader.setInteger1Uniform(this._textureUniformName, textureUnit);
  }

}
