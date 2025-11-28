import { graphics } from '@local-framework';

import * as glm from 'gl-matrix';

import { RayTracerPass, IRayTracerPass } from './raytracer-pass/RaytracingPass';
import { PostProcessPass, IPostProcessPass } from './post-process-pass/PostProcessPass';

export * as allInterfaces from './raytracer-pass/all-interfaces';

const { WebGLContext } = graphics.webgl2;

export interface IDefinition {
  canvasWidth: number;
  canvasHeight: number;
  fovy: number;
}

export interface IRayTracerRenderer {

  render(): void;
  renderAsciiArt(): void;

  setResolutionCoef(inResolutionCoef: number): void;
  getResolutionCoef(): number;

  setAntiAliasing(enabled: boolean): void;
  getAntiAliasing(): boolean;

  rayTracerPass: Readonly<IRayTracerPass>;
}

export class RayTracerRenderer implements IRayTracerRenderer {

  private _canvasWidth: number;
  private _canvasHeight: number;
  private _resolutionCoef: number = 1;
  private _antiAliasing: boolean = false;

  private _rayTracerPass: RayTracerPass;
  private _postProcessPass: PostProcessPass;

  constructor(inDef: IDefinition) {

    this._canvasWidth = inDef.canvasWidth;
    this._canvasHeight = inDef.canvasHeight;

    this._rayTracerPass = new RayTracerPass({
      width: inDef.canvasWidth,
      height: inDef.canvasHeight,
      fovy: inDef.fovy,
    });

    this._postProcessPass = new PostProcessPass({
      width: inDef.canvasWidth,
      height: inDef.canvasHeight,
    });
  }

  render() {
    // texture pass first
    // -> we render the previous frame to avoid potential webgl queue blocking
    this._renderTexturePass();
    this._renderRayTracingPass();
  }

  renderAsciiArt() {
    // texture pass first
    // -> we render the previous frame to avoid potential webgl queue blocking
    this._renderAsciiArtTexturePass();
    this._renderRayTracingPass();
  }

  private _renderTexturePass() {
    const gl = WebGLContext.getContext();

    gl.viewport(0, 0, this._canvasWidth, this._canvasHeight);
    gl.clear(gl.COLOR_BUFFER_BIT /*| gl.DEPTH_BUFFER_BIT*/);

    this._postProcessPass.setAntiAliasing(this._antiAliasing);
    this._postProcessPass.render(
      this._rayTracerPass.renderWidth,
      this._rayTracerPass.renderHeight
    );
  }

  private _renderAsciiArtTexturePass() {
    const gl = WebGLContext.getContext();

    gl.viewport(0, 0, this._canvasWidth, this._canvasHeight);
    gl.clear(gl.COLOR_BUFFER_BIT /*| gl.DEPTH_BUFFER_BIT*/);

    this._postProcessPass.renderAsciiArt();
  }

  private _renderRayTracingPass() {
    this._postProcessPass.capture(() => {
      this._rayTracerPass.render();
    });
  }

  reset(): void {
    this._rayTracerPass.reset();
  }

  setResolutionCoef(inResolutionCoef: number): void {
    if (
      inResolutionCoef === this._resolutionCoef ||
      inResolutionCoef <= 0 ||
      inResolutionCoef > 1
    ) {
      return;
    }

    this._resolutionCoef = inResolutionCoef;

    const renderWidth = Math.floor(this._canvasWidth * this._resolutionCoef);
    const renderHeight = Math.floor(this._canvasHeight * this._resolutionCoef);

    this._rayTracerPass.setRenderSize(renderWidth, renderHeight);
    this._postProcessPass.setRenderSize(renderWidth, renderHeight);
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

  getCurrentSize(): glm.ReadonlyVec2 {
    return this._rayTracerPass.getCurrentSize();
  }

  get canvasWidth() {
    return this._canvasWidth;
  }
  get canvasHeight() {
    return this._canvasHeight;
  }

  get rayTracerPass(): Readonly<IRayTracerPass> {
    return this._rayTracerPass;
  }

}

