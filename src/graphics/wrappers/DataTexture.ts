import { WebGLContext } from './WebGLContext';

export class DataTexture {
  private _textureObject: WebGLTexture = null;

  // initialize(data: number[] = [], numComponents: number = 1) {
  initialize(data: number[] = []) {
    if (this._textureObject)
      throw new Error('data texture already initialized');

    const gl = WebGLContext.getContext();

    this._textureObject = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, this._textureObject);

    // make it possible to use a non-power-of-2 texture + we don't need any filtering
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    // this.update(data, numComponents);
    this.update(data);
  }

  // update(data: number[], numComponents: number = 1) {
  update(data: number[]) {
    if (!this._textureObject) throw new Error('data texture not initialized');

    const gl = WebGLContext.getContext();

    gl.bindTexture(gl.TEXTURE_2D, this._textureObject);

    const expandedData = new Float32Array(data);

    // // expand the data to 4 values per pixel.
    // const numElements = data.length / numComponents;
    // const expandedData = new Float32Array(numElements * 4);
    // for (let ii = 0; ii < numElements; ++ii) {
    //   const srcOffset = ii * numComponents;
    //   const dstOffset = ii * 4;
    //   for (let jj = 0; jj < numComponents; ++jj)
    //     expandedData[dstOffset + jj] = data[srcOffset + jj];
    // }

    const level = 0;
    // const internalFormat = gl.RGBA;
    // const internalFormat = gl.RGBA32F;
    const internalFormat = gl.R32F;
    // const width = numElements;
    const width = data.length;
    const height = 1;
    const border = 0;
    // const format = gl.RGBA;
    const format = gl.RED;
    // const type = gl.UNSIGNED_BYTE;
    const type = gl.FLOAT;
    gl.texImage2D(
      gl.TEXTURE_2D,
      level,
      internalFormat,
      width,
      height,
      border,
      format,
      type,
      expandedData
    );
  }

  bind() {
    if (!this._textureObject) throw new Error('data texture not initialized');

    const gl = WebGLContext.getContext();

    gl.bindTexture(gl.TEXTURE_2D, this._textureObject);
  }
}
