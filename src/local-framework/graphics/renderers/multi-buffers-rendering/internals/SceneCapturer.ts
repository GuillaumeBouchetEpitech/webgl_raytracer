
import * as webgl2 from '../../../webgl2';

export class SceneCapturer {

  private _width: number = 0;
  private _height: number = 0;

  private _frameBuffer: webgl2.IUnboundFrameBuffer = new webgl2.FrameBuffer();
  private _depthTexture: webgl2.IUnboundTexture = new webgl2.Texture();
  private _colorTexture: webgl2.IUnboundTexture = new webgl2.Texture();

  constructor(width: number, height: number) {
    this._depthTexture.initialize();
    this._colorTexture.initialize();
    this.resize(width, height);
  }

  resize(width: number, height: number) {
    this._width = width;
    this._height = height;

    this._depthTexture.bind((boundTexture) => {
      boundTexture.allocateDepth(this._width, this._height);
    });

    this._colorTexture.bind((boundTexture) => {
      boundTexture.allocate(this._width, this._height);
    });

    this._frameBuffer.bind((boundFrameBuffer) => {
      this._depthTexture.bind((boundTexture) => {
        boundFrameBuffer.attachDepthTexture(boundTexture);
      });
      this._colorTexture.bind((boundTexture) => {
        boundFrameBuffer.attachTexture(boundTexture);
      });
    });
  }

  captureScene(
    renderCallback: () => void
  ): void {

    this._frameBuffer.bind((boundFrameBuffer) => {

      const gl = webgl2.WebGLContext.getContext();
      gl.viewport(0, 0, this._width, this._height);
      gl.clearColor(0, 0, 0, 0);

      renderCallback();
    });
  }

  get colorTexture(): webgl2.IUnboundTexture {
    return this._colorTexture;
  }

}

