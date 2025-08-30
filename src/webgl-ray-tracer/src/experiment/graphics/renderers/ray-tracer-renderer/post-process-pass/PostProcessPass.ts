
import { graphics } from '@local-framework';
const {
  WebGLContext,
  Texture,
  FrameBuffer,
  ShaderProgram,
  GeometryWrapper
} = graphics.webgl2;

// @ts-ignore
import textureVertex from './shaders/texture.glsl.vert';
// @ts-ignore
import textureFragment from './shaders/texture.glsl.frag';

// @ts-ignore
import asciiArtVertex from './shaders/ascii-art.glsl.vert';
// @ts-ignore
import asciiArtFragment from './shaders/ascii-art.glsl.frag';

export interface IDefinition {
  width: number;
  height: number;
}

export interface IPostProcessPass {

  render(): void;
  renderAsciiArt(): void;

  setAntiAliasing(enabled: boolean): void;
  getAntiAliasing(): boolean;
}

export class PostProcessPass implements IPostProcessPass {

  private _width: number;
  private _height: number;
  private _resolutionCoef: number = 1;
  private _antiAliasing: boolean = false;

  private _textureShaderProgram: graphics.webgl2.IUnboundShader;
  private _asciiArtShaderProgram: graphics.webgl2.IUnboundShader;

  private _screenGeometry: graphics.webgl2.GeometryWrapper.Geometry;
  private _asciiArtScreenGeometry: graphics.webgl2.GeometryWrapper.Geometry;

  private _finalTexture: graphics.webgl2.IUnboundTexture;
  private _frameBuffer: graphics.webgl2.IUnboundFrameBuffer;

  constructor(inDef: IDefinition) {

    this._width = inDef.width;
    this._height = inDef.height;

    this._textureShaderProgram = new ShaderProgram('RayTracerRenderer-1', {
      vertexSrc: textureVertex,
      fragmentSrc: textureFragment,
      attributes: ['a_vertexPosition', 'a_vertexTextureCoord'],
      uniforms: ['u_texture', 'u_step']
    });

    this._asciiArtShaderProgram = new ShaderProgram('RayTracerRenderer-ascii-art', {
      vertexSrc: asciiArtVertex,
      fragmentSrc: asciiArtFragment,
      attributes: ['a_vertexPosition', 'a_vertexTextureCoord'],
      uniforms: ['u_texture']
    });

    this._finalTexture = new Texture();
    this._frameBuffer = new FrameBuffer();

    this._finalTexture.initialize();
    this._finalTexture.preBind((boundTexture) => {
      boundTexture.allocate(this._width, this._height);

      this._frameBuffer.bind((boundFrameBuffer) => {
        boundFrameBuffer.attachTexture(boundTexture);
      });
    });

    //
    //

    const geoBuilder = new GeometryWrapper.GeometryBuilder();

    //
    //

    const screenVertices: number[] = [];
    screenVertices.push(+1.0, +1.0, 1, 1); // top right
    screenVertices.push(-1.0, +1.0, 0, 1); // top left
    screenVertices.push(+1.0, -1.0, 1, 0); // bottom right
    screenVertices.push(-1.0, -1.0, 0, 0); // bottom left

    //

    geoBuilder
      .reset()
      .setPrimitiveType('triangleStrip')
      .addVbo()
      .addVboAttribute('a_vertexPosition', 'vec2f')
      .addVboAttribute('a_vertexTextureCoord', 'vec2f');

    //

    this._screenGeometry = new GeometryWrapper.Geometry(
      this._asciiArtShaderProgram,
      geoBuilder.getDef()
    );

    this._screenGeometry.allocateBuffer(
      0,
      screenVertices,
      screenVertices.length
    );
    this._screenGeometry.setPrimitiveStart(0);
    this._screenGeometry.setPrimitiveCount(4);

    //

    this._asciiArtScreenGeometry = new GeometryWrapper.Geometry(
      this._asciiArtShaderProgram,
      geoBuilder.getDef()
    );

    this._asciiArtScreenGeometry.allocateBuffer(
      0,
      screenVertices,
      screenVertices.length
    );
    this._asciiArtScreenGeometry.setPrimitiveStart(0);
    this._asciiArtScreenGeometry.setPrimitiveCount(4);
  }

  render() {
    const gl = WebGLContext.getContext();

    gl.viewport(0, 0, this._width, this._height);
    gl.clear(gl.COLOR_BUFFER_BIT /*| gl.DEPTH_BUFFER_BIT*/);

    const shader = this._textureShaderProgram;

    shader.bind((boundShader) => {
      boundShader.setTextureUniform('u_texture', this._finalTexture, 0);

      // anti aliasing setup

      if (this._antiAliasing) {
        // const stepX = (1 - this._rayTracerPass.renderWidth / this._width) * 0.005;
        // const stepY = (1 - this._rayTracerPass.renderHeight / this._height) * 0.005;

        // boundShader.setFloat2Uniform('u_step', stepX, stepY);
      } else {
        boundShader.setFloat2Uniform('u_step', 0, 0);
      }

      this._screenGeometry.render();
    });
  }

  renderAsciiArt() {
    const gl = WebGLContext.getContext();

    gl.viewport(0, 0, this._width, this._height);
    gl.clear(gl.COLOR_BUFFER_BIT /*| gl.DEPTH_BUFFER_BIT*/);

    const shader = this._asciiArtShaderProgram;

    shader.bind((boundShader) => {
      boundShader.setTextureUniform('u_texture', this._finalTexture, 0);

      this._asciiArtScreenGeometry.render();
    });
  }

  setRenderSize(width: number, height: number): void {

    const renderWidth = Math.floor(width);
    const renderHeight = Math.floor(height);

    this._finalTexture.preBind((boundTexture) => {
      boundTexture.resize(renderWidth, renderHeight);
    });
  }

  capture(callback: () => void) {

    const gl = WebGLContext.getContext();

    this._frameBuffer.bind(() => {
      callback();
    });

    gl.viewport(0, 0, this._width, this._height);
  }

  getResolutionCoef(): number {
    return this._resolutionCoef;
  }

  setAntiAliasing(enabled: boolean) {
    this._antiAliasing = enabled;
  }

  getAntiAliasing(): boolean {
    return this._antiAliasing;
  }

  get canvasWidth() {
    return this._width;
  }
  get canvasHeight() {
    return this._height;
  }

}
