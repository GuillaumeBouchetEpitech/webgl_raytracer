
import { WebGLContext } from './WebGLContext';

export interface IUnboundDataTexture2dVec4f32 {
  initialize(width: number, height: number): void;
  rawBind(): void;
  preBind(inCallback: (bound: IBoundDataTexture2dVec4f32) => void): void;
  bind(inCallback: (bound: IBoundDataTexture2dVec4f32) => void): void;
}

export interface IBoundDataTexture2dVec4f32 extends IUnboundDataTexture2dVec4f32 {
  allocate(width: number, height: number): void;
  // update(texelX: number, texelY: number, data: [number, number, number, number][]): void;
  updateFromBuffer(
    texelX: number,
    texelY: number,
    width: number,
    height: number,
    inputBuffer: Float32Array
  ): void;
}

interface InternalData {
  texture: WebGLTexture;
  // buffer: Float32Array;
  width: number;
  height: number;
}

export class DataTexture2dVec4f32 implements IBoundDataTexture2dVec4f32 {

  private _internalData: InternalData | null = null;

  initialize(width: number, height: number) {

    if (this._internalData) {
      throw new Error('data texture already initialized');
    }

    const gl = WebGLContext.getContext();

    const newTexture = gl.createTexture();
    if (!newTexture) {
      throw new Error('data texture failed to be created');
    }

    gl.bindTexture(gl.TEXTURE_2D, newTexture);

    // we don't want any filtering
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    this._internalData = {
      texture: newTexture,
      // buffer: new Float32Array(1),
      width: 1,
      height: 1,
    }

    this.allocate(width, height);
  }

  dispose() {
    if (!this._internalData) {
      throw new Error('data texture not initialized');
    }

    const gl = WebGLContext.getContext();
    gl.deleteTexture(this._internalData.texture);
  }

  allocate(width: number, height: number) {

    if (!this._internalData) {
      throw new Error('data texture not initialized');
    }

    if (width <= 0) {
      throw new Error('texture: width must be positive');
    }
    if (width > 2048) {
      throw new Error(`data texture max width is 2048 (input was ${width})`);
    }

    if (height <= 0) {
      throw new Error('texture: height must be positive');
    }
    if (height > 2048) {
      throw new Error(`data texture max height is 2048 (input was ${height})`);
    }

    this._internalData.width = width;
    this._internalData.height = height;
    // this._internalData.buffer = new Float32Array(width * height);

    const gl = WebGLContext.getContext();

    gl.bindTexture(gl.TEXTURE_2D, this._internalData.texture);

    const level = 0;
    const internalFormat = gl.RGBA32F;
    const border = 0;
    const format = gl.RGBA;
    const type = gl.FLOAT;
    gl.texImage2D(
      gl.TEXTURE_2D,
      level,
      internalFormat,
      this._internalData.width,
      this._internalData.height,
      border,
      format,
      type,

      // this._internalData.buffer
      null
    );
  }

  // update(texelX: number, texelY: number, data: [number, number, number, number][]) {

  //   if (!this._internalData) {
  //     throw new Error('data texture not initialized');
  //   }

  //   if (texelX + texelY * this._internalData.width + data.length > this._internalData.buffer.length) {
  //     throw new Error(
  //       `data texture update but size is larger (texelX: ${texelX}, texelY: ${texelY}, length: ${data.length}, max: ${this._internalData.buffer.length})`
  //     );
  //   }

  //   const gl = WebGLContext.getContext();

  //   gl.bindTexture(gl.TEXTURE_2D, this._internalData.texture);

  //   for (let ii = 0; ii < data.length; ++ii) {
  //     this._internalData.buffer[ii * 4 + 0] = data[ii][0];
  //     this._internalData.buffer[ii * 4 + 1] = data[ii][1];
  //     this._internalData.buffer[ii * 4 + 2] = data[ii][2];
  //     this._internalData.buffer[ii * 4 + 3] = data[ii][3];
  //   }

  //   this.updateFromBuffer(texelX, texelY, this._internalData.buffer);
  // }

  updateFromBuffer(
    texelX: number,
    texelY: number,
    width: number,
    height: number,
    inputBuffer: Float32Array
  ): void {

    if (!this._internalData) {
      throw new Error('data texture not initialized');
    }

    if (texelX < 0) {
      throw new Error(`data texture update but texelX is negative (texelX: ${texelX})`);
    }
    if (texelY < 0) {
      throw new Error(`data texture update but texelY is negative (texelY: ${texelX})`);
    }
    if (width < 0) {
      throw new Error(`data texture update but width is negative (width: ${texelX})`);
    }
    if (height < 0) {
      throw new Error(`data texture update but height is negative (height: ${texelX})`);
    }

    if (texelX + width > this._internalData.width) {
      throw new Error(`data texture update but width is larger (texelX: ${texelX}, width: ${width}, internal.width: ${this._internalData.width}`);
    }
    if (texelY + height > this._internalData.height) {
      throw new Error(`data texture update but height is larger (texelX: ${texelX}, width: ${width}, internal.width: ${this._internalData.width}`);
    }

    if (width * height > inputBuffer.length) {
      throw new Error(`data texture update but size is too large (size: ${width * height}, input.buffer.length: ${inputBuffer.length}`);
    }

    const gl = WebGLContext.getContext();

    gl.bindTexture(gl.TEXTURE_2D, this._internalData.texture);

    const level = 0;
    const format = gl.RGBA;
    const type = gl.FLOAT;

    const xoffset = texelX;
    const yoffset = texelY;
    const srcOffset = 0;

    gl.texSubImage2D(
      gl.TEXTURE_2D,
      level,
      xoffset,
      yoffset,
      width,
      height,
      format,
      type,
      inputBuffer,
      srcOffset
    );
  }

  rawBind() {

    if (!this._internalData) {
      throw new Error('data texture not initialized');
    }

    const gl = WebGLContext.getContext();

    gl.bindTexture(gl.TEXTURE_2D, this._internalData.texture);
  }

  preBind(inCallback: (bound: IBoundDataTexture2dVec4f32) => void): void {
    this.rawBind();
    inCallback(this);
  }

  bind(inCallback: (bound: IBoundDataTexture2dVec4f32) => void): void {
    this.preBind(inCallback);
    DataTexture2dVec4f32.unbind();
  }

  static unbind(): void {
    const gl = WebGLContext.getContext();

    gl.bindTexture(gl.TEXTURE_2D, null);
  }
}
