import { WebGLContext } from './WebGLContext';

export class Texture {
  private _width: number = 0;
  private _height: number = 0;
  private _texture: WebGLTexture | null = null;

  constructor() {}

  loadFromMemory(
    inWidth: number,
    inHeight: number,
    inPixels: Uint8Array
  ): void {
    this._allocate(inWidth, inHeight, inPixels);
  }

  allocate(inWidth: number, inHeight: number): void {
    this._allocate(inWidth, inHeight);
  }

  resize(inWidth: number, inHeight: number): void {
    this._allocate(inWidth, inHeight);
  }

  private _allocate(
    inWidth: number,
    inHeight: number,
    inPixels: Uint8Array | null = null
  ): void {
    const gl = WebGLContext.getContext();

    if (!this._texture) {
      this._texture = gl.createTexture();
    }

    gl.bindTexture(gl.TEXTURE_2D, this._texture);

    // wrapping to clamp to edge
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    const level = 0;
    const internalFormat = gl.RGBA;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    gl.texImage2D(
      gl.TEXTURE_2D,
      level,
      internalFormat,
      inWidth,
      inHeight,
      border,
      srcFormat,
      srcType,
      inPixels
    );

    gl.bindTexture(gl.TEXTURE_2D, null);
  }

  getWidth(): number {
    if (!this._texture) throw new Error('texture not initialized');

    return this._width;
  }

  getHeight(): number {
    if (!this._texture) throw new Error('texture not initialized');

    return this._height;
  }

  bind(): void {
    if (!this._texture) throw new Error('texture not initialized');

    const gl = WebGLContext.getContext();

    gl.bindTexture(gl.TEXTURE_2D, this._texture);
  }

  static unbind(): void {
    const gl = WebGLContext.getContext();

    gl.bindTexture(gl.TEXTURE_2D, null);
  }

  getRawObject() {
    if (!this._texture) throw new Error('texture not initialized');

    // TODO: this is ugly
    return this._texture;
  }
}
