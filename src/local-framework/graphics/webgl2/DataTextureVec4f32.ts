import { WebGLContext } from './WebGLContext';

export interface IUnboundDataTextureVec4f32 {
  initialize(data?: [number, number, number, number][] | number): void;
  rawBind(): void;
  preBind(inCallback: (bound: IBoundDataTextureVec4f32) => void): void;
  bind(inCallback: (bound: IBoundDataTextureVec4f32) => void): void;
}

export interface IBoundDataTextureVec4f32 extends IUnboundDataTextureVec4f32 {
  allocate(data: [number, number, number, number][] | number): void;
  update(start: number, data: [number, number, number, number][]): void;
}

export class DataTextureVec4f32 implements IBoundDataTextureVec4f32 {
  private _texture: WebGLTexture | null = null;

  private _buffer: Float32Array | undefined;

  initialize(data: [number, number, number, number][] | number = 0) {
    if (this._texture) {
      throw new Error('data texture already initialized');
    }

    const gl = WebGLContext.getContext();

    this._texture = gl.createTexture();
    if (!this._texture) {
      throw new Error('data texture failed to be created');
    }

    gl.bindTexture(gl.TEXTURE_2D, this._texture);

    // we don't want any filtering
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    this.allocate(data);
  }

  dispose() {
    const gl = WebGLContext.getContext();
    gl.deleteTexture(this._texture);
  }

  allocate(data: [number, number, number, number][] | number) {
    if (!this._texture) {
      throw new Error('data texture not initialized');
    }
    const dataSize = Array.isArray(data) ? data.length : Math.ceil(data / 4);
    if (dataSize <= 0) {
      throw new Error('texture: width must be positive');
    }
    if (dataSize > 2048) {
      throw new Error(`data texture max size is 2048 (input was ${dataSize})`);
    }

    const gl = WebGLContext.getContext();

    gl.bindTexture(gl.TEXTURE_2D, this._texture);

    // done for type safety compliance reasons
    if (Array.isArray(data)) {
      // -> new Float32Array(number[])
      this._buffer = new Float32Array(data.flat());
    } else {
      // -> new Float32Array(number)
      this._buffer = new Float32Array(data);
    }

    const level = 0;
    const internalFormat = gl.RGBA32F;
    const width = dataSize;
    const height = 1;
    const border = 0;
    const format = gl.RGBA;
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
      this._buffer
    );
  }

  update(start: number, data: [number, number, number, number][]) {
    if (!this._texture) {
      throw new Error('data texture not initialized');
    }
    if (!this._buffer) {
      throw new Error('data texture update but not previously allocated');
    }
    if (start + data.length > this._buffer.length) {
      throw new Error(
        `data texture update but size is larger (start: ${start}, length: ${data.length}, max: ${this._buffer.length})`
      );
    }

    const gl = WebGLContext.getContext();

    gl.bindTexture(gl.TEXTURE_2D, this._texture);

    // this._buffer = new Uint8Array(data.flat());

    for (let ii = 0; ii < data.length; ++ii) {
      this._buffer[ii * 4 + 0] = data[ii][0];
      this._buffer[ii * 4 + 1] = data[ii][1];
      this._buffer[ii * 4 + 2] = data[ii][2];
      this._buffer[ii * 4 + 3] = data[ii][3];
    }

    const level = 0;
    const width = data.length;
    const height = 1;
    const format = gl.RGBA;
    const type = gl.FLOAT;

    const xoffset = start;
    const yoffset = 0; // must stay 0
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
      this._buffer,
      srcOffset
    );
  }

  rawBind() {
    if (!this._texture) {
      throw new Error('data texture not initialized');
    }

    const gl = WebGLContext.getContext();

    gl.bindTexture(gl.TEXTURE_2D, this._texture);
  }

  preBind(inCallback: (bound: IBoundDataTextureVec4f32) => void): void {
    this.rawBind();
    inCallback(this);
  }

  bind(inCallback: (bound: IBoundDataTextureVec4f32) => void): void {
    this.preBind(inCallback);
    DataTextureVec4f32.unbind();
  }

  static unbind(): void {
    const gl = WebGLContext.getContext();

    gl.bindTexture(gl.TEXTURE_2D, null);
  }
}
