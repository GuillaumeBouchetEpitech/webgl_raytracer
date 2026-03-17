
import { graphics } from '@local-framework';

const k_dataRowLength = 2048;
const k_maxTotalRows = 2048;

export interface IGpuDataTexture2dRow {
  clear(): void;
  push(r: number, g: number, b: number, a: number): void;

  texelY: number;
  dataValues: Readonly<Float32Array>;
  currentIndex: number;
  isDirty: boolean;
};

class GpuDataTexture2dRow implements IGpuDataTexture2dRow {
  private _isDirty: boolean = false;
  private _texelY: number;
  private _dataValues = new Float32Array(k_dataRowLength * 4);
  private _currentIndex: number = 0;

  constructor(texelY: number) {
    this._texelY = texelY;
  }

  clear() {
    this._currentIndex = 0;
    this._isDirty = false;
  }

  push(r: number, g: number, b: number, a: number) {
    if (this._currentIndex >= k_dataRowLength) {
      throw new Error(`not more space left in the GpuDataTexture2dRow heap cache, max length is ${k_dataRowLength}.`);
    }

    this._isDirty = true;

    this._dataValues[this._currentIndex * 4 + 0] = r;
    this._dataValues[this._currentIndex * 4 + 1] = g;
    this._dataValues[this._currentIndex * 4 + 2] = b;
    this._dataValues[this._currentIndex * 4 + 3] = a;
    this._currentIndex += 1;
  }

  uploadToGpu(texelY: number, boundDataTexture: graphics.webgl2.IBoundDataTexture2dVec4f32) {
    if (!this._isDirty) {
      return;
    }
    this._isDirty = false;
    boundDataTexture.updateFromBuffer(0, texelY, this.currentIndex, 1, this.dataValues);
  }

  get texelY(): number { return this._texelY; }
  get dataValues(): Readonly<Float32Array> { return this._dataValues; }
  get currentIndex(): number { return this._currentIndex; }
  get isDirty(): boolean { return this._isDirty; }
};

export class GpuDataTexture2d {

  private _textureUniformName: string;

  private _dataTexture: graphics.webgl2.IUnboundDataTexture2dVec4f32;

  private _dataRows: GpuDataTexture2dRow[] = [];

  constructor(textureUniformName: string) {
    this._textureUniformName = textureUniformName;
    this._dataTexture = new graphics.webgl2.DataTexture2dVec4f32();

    const k_initialTotalRows = 1;
    this._dataTexture.initialize(k_dataRowLength, k_initialTotalRows);

    for (let ii = 0; ii < k_initialTotalRows; ++ii) {
      this._dataRows.push(new GpuDataTexture2dRow(ii));
    }
  }

  getDataRow(texelY: number): Readonly<IGpuDataTexture2dRow> {

    if (texelY >= k_maxTotalRows) {
      throw new Error(`not more space left in the GpuDataTexture2d heap cache, max total rows is ${k_maxTotalRows}.`);
    }

    // ensure the row exist
    if (texelY >= this._dataRows.length) {
      const totalToCreate = texelY - (this._dataRows.length - 1);
      for (let ii = 0; ii < totalToCreate; ++ii) {
        const newRow = new GpuDataTexture2dRow(this._dataRows.length);
        this._dataRows.push(newRow);
      }
    }

    return this._dataRows[texelY];
  }

  uploadToGpu() {
    let totalDataToUpload = 0;
    for (const currRow of this._dataRows) {
      if (currRow.isDirty) {
        totalDataToUpload += currRow.currentIndex;
      }
    }

    if (totalDataToUpload === 0) {
      // nothing to upload
      return;
    }

    this._dataTexture.preBind((boundDataTexture) => {

      if (this._dataTexture.height < this._dataRows.length) {
        // grow the texture -> just re-allocating it larger
        boundDataTexture.allocate(k_dataRowLength, this._dataRows.length);
      }

      for (let texelY = 0; texelY < this._dataRows.length; ++texelY) {

        // const currRow = this._dataRows[texelY];
        // if (!currRow.isDirty) {
        //   continue;
        // }

        // TODO: only update if necessary
        // -> when the texture reallocated
        // -> or when the data row is modified

        // currRow.uploadToGpu(texelY, boundDataTexture);
        // boundDataTexture.updateFromBuffer(0, texelY, currRow.currentIndex, 1, currRow.dataValues);

        this._dataRows[texelY].uploadToGpu(texelY, boundDataTexture);
      }

    });
  }

  setForShader(
    boundShader: graphics.webgl2.IBoundShader,
    textureUnit: number,
  ) {
    boundShader.setInteger1Uniform(this._textureUniformName, textureUnit);
  }

}
