import { WebGLContext } from './WebGLContext';
import { Texture } from './Texture';

export class FrameBuffer {
  private _frameBuffer: WebGLFramebuffer;

  constructor() {
    const gl = WebGLContext.getContext();

    this._frameBuffer = gl.createFramebuffer();
  }

  attachTexture(texture: Texture) {
    const gl = WebGLContext.getContext();

    gl.bindFramebuffer(gl.FRAMEBUFFER, this._frameBuffer);

    const mimapLevel = 0;
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      texture.getRawObject(),
      mimapLevel
    );
  }

  bind() {
    const gl = WebGLContext.getContext();

    gl.bindFramebuffer(gl.FRAMEBUFFER, this._frameBuffer);
  }

  static unbind() {
    const gl = WebGLContext.getContext();

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }
}
