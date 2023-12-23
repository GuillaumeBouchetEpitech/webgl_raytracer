
import { system, graphics } from '@local-framework';
const {
  GlobalMouseManager,
  GlobalKeyboardManager,
  GlobalTouchManager,
  GlobalVisibilityManager,
  GlobalPointerLockManager
} = system.browser;
const { WebGLContext } = graphics.webgl2;
const { FreeFlyController } = system.controllers;

import { Logger } from './utilities/Logger';

import { Renderer } from './graphics/Renderer';
import * as scenes from './scenes/intex';

import * as glm from 'gl-matrix';

const _clamp = (inValue: number, inMin: number, inMax: number) =>
  Math.min(Math.max(inValue, inMin), inMax);

interface ExperimentDef {
  canvasElement: HTMLCanvasElement;
  logger: Logger;
  perfAutoScaling: HTMLInputElement;
  resolution: HTMLProgressElement;
  anti_aliasing_enabled: HTMLInputElement;
  debug_mode_enabled: HTMLInputElement;
}

const k_maxFramesUntilNextCheck = 60;

export class Experiment {
  private _canvasElement: HTMLCanvasElement;
  private _animationFrameHandle: number = 0;
  private _def: Omit<ExperimentDef, 'canvasElement'>;

  private _freeFlyController: system.controllers.FreeFlyController;

  private _renderer: Renderer;

  private _running: boolean;
  private _errorGraphicContext: boolean;

  private _currFrameMsecTime: number = Date.now();
  private _frameProfiler = new system.metrics.FrameProfiler();

  private _continuousSecTime = 0;

  private _perfAutoScalingEnabled = true;
  private _framesUntilNextCheck = k_maxFramesUntilNextCheck;

  // private _scene = new scenes.TestScene1();
  private _scene = new scenes.TestScene2();

  constructor(inDef: ExperimentDef) {
    this._canvasElement = inDef.canvasElement;
    this._def = inDef;

    this._freeFlyController = new FreeFlyController({
      coordinates: ['Z', 'X', 'Y'],
      // position: [-10, 9, 22],
      // theta: Math.PI * 0.85,
      // phi: -Math.PI * 0.15,
      position: [-10, 13, 15],
      theta: Math.PI * 0.85,
      phi: -Math.PI * 0.15,
      mouseSensibility: 0.1,
      keyboardSensibility: Math.PI * 0.45,
      touchSensibility: 0.3,
      movingSpeed: 10
    });

    //
    //

    {
      GlobalKeyboardManager.activate();
      GlobalTouchManager.activate(this._canvasElement);

      GlobalVisibilityManager.activate();
      GlobalVisibilityManager.addVisibilityChange((isVisible) => {
        if (isVisible === false) {
          this._def.logger.log('document visibility changed: hidden');
          this.stop();
        } else {
          this._def.logger.log('document visibility changed: visible');
          this.start();
        }
      });

      GlobalPointerLockManager.allowPointerLockedOnClickEvent(
        this._canvasElement
      );
      GlobalPointerLockManager.addOnLockChange(() => {
        const isLocked = GlobalPointerLockManager.isPointerLocked(
          this._canvasElement
        );

        if (isLocked) {
          this._def.logger.log('The pointer lock status is now locked');

          GlobalMouseManager.activate();
        } else {
          this._def.logger.log('The pointer lock status is now unlocked');

          GlobalMouseManager.deactivate();

          GlobalPointerLockManager.allowPointerLockedOnClickEvent(
            this._canvasElement
          );
        }
      });

      GlobalPointerLockManager.addOnLockError((event) => {
        this._def.logger.log(
          `The pointer lock sent an error, event: "${JSON.stringify(event)}"`
        );
      });

      this._renderer = new Renderer({ canvasDomElement: this._canvasElement });
      this._renderer.initialize();
    }

    //
    //
    //

    this._running = false;
    this._errorGraphicContext = false;

    // this._renderer.setOnContextLost(() => {
    //   this._def.logger.log('on_context_lost');

    //   this._errorGraphicContext = true;
    //   this.stop();
    // });

    // this._renderer.setOnContextRestored(() => {
    //   this._def.logger.log('on_context_restored');

    //   this._errorGraphicContext = false;
    //   this.start();
    // });

    //
    //
    //

    this._def.resolution.addEventListener('input', (event) => {
      const newValue = this._def.resolution.value;
      this._setResolution(newValue);
      this._logResolution();
    });

    this._def.anti_aliasing_enabled.addEventListener('click', () => {
      const newValue = this._def.anti_aliasing_enabled.checked === true;

      this._renderer.rayTracerRenderer.setAntiAliasing(newValue);

      this._def.logger.log(
        `Anti aliasing change: ${newValue === true ? 'enabled' : 'disabled'}`
      );
    });

    this._setResolution(this._def.resolution.value);

    // performance auto-scaling
    this._def.perfAutoScaling.addEventListener('input', () => {
      this._framesUntilNextCheck = k_maxFramesUntilNextCheck;

      this._perfAutoScalingEnabled = this._def.perfAutoScaling.checked === true;

      this._def.logger.log(
        `Performance auto scaler change: ${
          this._perfAutoScalingEnabled === true ? 'enabled' : 'disabled'
        }`
      );
    });
  }

  async init() {
    await this._renderer.initialize();
  }

  resize(inWidth: number, inHeight: number, inIsFullScreen: boolean) {
    let currentWidth = inWidth;
    let currentHeight = inHeight;

    if (inIsFullScreen) {
      this._canvasElement.style.position = 'absolute';
      currentWidth = window.innerWidth;
      currentHeight = window.innerHeight;
    } else {
      this._canvasElement.style.position = 'relative';
    }

    this._canvasElement.style.left = '0px';
    this._canvasElement.style.top = '0px';
    this._canvasElement.style.width = `${currentWidth}px`;
    this._canvasElement.style.height = `${currentHeight}px`;
    this._canvasElement.width = currentWidth;
    this._canvasElement.height = currentHeight;

    this._renderer.resize(currentWidth, currentHeight);
  }

  start() {
    if (this.isRunning()) return;

    this._running = true;

    this._tick();
  }

  stop() {
    if (!this.isRunning()) return;
    this._running = false;
    window.cancelAnimationFrame(this._animationFrameHandle);
  }

  isRunning() {
    return this._running && !this._errorGraphicContext;
  }

  //
  //
  //

  private _tick() {
    const tick = () => {
      if (!this._running || this._errorGraphicContext) return;

      // plan the next frame

      this._animationFrameHandle = window.requestAnimationFrame(tick);

      this._mainLoop();
    };

    tick();
  }

  private _mainLoop() {
    const currentMsecTime = Date.now();
    const deltaMsecTime = currentMsecTime - this._currFrameMsecTime;
    this._currFrameMsecTime = currentMsecTime;
    this._frameProfiler.pushDelta(deltaMsecTime);

    this._handlePerformanceAutoScaling(deltaMsecTime);

    const elapsedSecTime = deltaMsecTime / 1000;

    this._continuousSecTime += elapsedSecTime;

    this._freeFlyController.update(elapsedSecTime);

    GlobalMouseManager.resetDeltas();

    //
    //

    {
      const gl = WebGLContext.getContext();

      gl.disable(gl.DEPTH_TEST);
    }

    this._continuousSecTime += elapsedSecTime;

    this._scene.run(this._renderer, elapsedSecTime);

    this._renderer.rayTracerRenderer.lookAt(
      this._freeFlyController.getPosition(),
      this._freeFlyController.getTarget(),
      this._freeFlyController.getUpAxis()
    );

    this._renderer.rayTracerRenderer.render();

    const showDebug = this._def.debug_mode_enabled.checked === true;
    if (showDebug) {
      this._renderer.safeSceneWireFrame(() => {
        this._renderer.setupDebugRenderer();

        const axisOrigin: glm.ReadonlyVec3 = [0, 0, 0];
        const axisX: glm.ReadonlyVec3 = [100, 0, 0];
        const axisY: glm.ReadonlyVec3 = [0, 100, 0];
        const axisZ: glm.ReadonlyVec3 = [0, 0, 100];

        this._renderer.stackRenderers.pushLine(axisOrigin, axisX, [1, 0, 0]);
        this._renderer.stackRenderers.pushLine(axisOrigin, axisY, [0, 1, 0]);
        this._renderer.stackRenderers.pushLine(axisOrigin, axisZ, [0, 0, 1]);
      });
    }

    const gl = WebGLContext.getContext();
    gl.clear(gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LESS);

    {
      const keyEventsPos: glm.ReadonlyVec2 = [7 + 20, 165];
      const touchEventsPos: glm.ReadonlyVec2 = [7 + 20, 260];
      const boardPos: glm.ReadonlyVec2 = [7, 35];

      graphics.renderers.addKeyStrokesWidgets(keyEventsPos, this._renderer.stackRenderers, this._renderer.textRenderer);
      graphics.renderers.addArrowStrokesWidgets(touchEventsPos, this._renderer.stackRenderers, this._renderer.textRenderer);
      graphics.renderers.addKeysTouchesWidgets(this._canvasElement, boardPos, this._renderer.stackRenderers, this._renderer.textRenderer);
    }

    graphics.renderers.renderFpsMeter(
      [10, this._canvasElement.height - 60, 0],
      [100, 50],
      this._frameProfiler,
      this._renderer.stackRenderers,
      this._renderer.textRenderer,
      true
    );

    this._renderer.flushHudWireFrame();
    this._renderer.flushHudText();

    this._renderer.rayTracerRenderer.reset();
  }

  private _setResolution(inValue: number) {
    const safeValue = _clamp(inValue, 0, 9); // [0..9]
    const newValue = 10 - safeValue; // [1..10]
    const newCoef = 1 / newValue; // [0..1]
    this._renderer.rayTracerRenderer.setResolutionCoef(newCoef);
  }

  private _logResolution() {
    const rayTracerRenderer = this._renderer.rayTracerRenderer;

    const newCoef = rayTracerRenderer.getResolutionCoef();
    const newSize = rayTracerRenderer.getCurrentSize();
    const totalPixels = newSize[0] * newSize[1];

    this._def.logger.log(
      `resolution changed (1/${Math.ceil(1 / newCoef)}) => ${newSize[0]}x${
        newSize[1]
      } (${totalPixels}px)`
    );
  }

  private _handlePerformanceAutoScaling(inDeltaMsecTime: number) {
    if (this._perfAutoScalingEnabled !== true) {
      return;
    }

    if (inDeltaMsecTime <= 20) {
      this._framesUntilNextCheck = k_maxFramesUntilNextCheck;
      return;
    }

    --this._framesUntilNextCheck;

    if (this._framesUntilNextCheck > 0) {
      return;
    }

    this._def.logger.log(
      `performance auto scaling: slow framerate, scaling down resolution`
    );

    const currValue = this._def.resolution.value;
    const newValue = currValue - 1;

    if (newValue >= 0 && newValue <= 9) {
      this._setResolution(newValue);
      this._logResolution();

      this._def.resolution.value = newValue;
    }

    this._framesUntilNextCheck = k_maxFramesUntilNextCheck;
  }
}
