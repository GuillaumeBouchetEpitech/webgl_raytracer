// import * as configuration from '../configuration';

import {
  GlobalPointerLockManager,
  GlobalKeyboardManager,
  GlobalMouseManager,
  GlobalTouchManager,
  GlobalVisibilityManager
} from '../browser';

import { Logger } from './utilities/Logger';
import { FrameProfiler } from './utilities/FrameProfiler';
import { renderFpsMeter } from './graphics/renderers/hud/widgets/renderFpsMeter';
import { renderControls } from './graphics/renderers/hud/widgets/renderControls';
import { WebGLContext } from '../browser/webgl2';
import { FreeFlyController } from './controllers/FreeFlyController';

import { Renderer } from './graphics/Renderer';
import * as scenes from './scenes/intex';

interface ExperimentDef {
  canvasElement: HTMLCanvasElement;
  logger: Logger;
  perfAutoScaling: HTMLElement;
  resolution: HTMLElement;
  anti_aliasing_enabled: HTMLElement;
  debug_mode_enabled: HTMLElement;
}

const k_maxFramesUntilNextCheck = 60;

export class Experiment {
  private _canvasElement: HTMLCanvasElement;
  private _def: Omit<ExperimentDef, 'canvasElement'>;

  private _freeFlyController: FreeFlyController;

  private _renderer: Renderer;

  private _running: boolean;
  private _errorGraphicContext: boolean;

  private _currFrameTime: number = Date.now();
  private _frameProfiler = new FrameProfiler();

  private _continuousTime = 0;

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

      // GlobalVisibilityManager.activate();
      // GlobalVisibilityManager.addVisibilityChange((isVisible) => {
      //   if (isVisible === false) {
      //     this.stop();
      //   }
      // });

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
      // const newValue = (event as any).target.value;
      const newValue = (this._def.resolution as any).value;
      this._setResolution(11 - newValue);
    });

    this._def.anti_aliasing_enabled.addEventListener('click', () => {
      const newValue =
        (this._def.anti_aliasing_enabled as any).checked === true;

      this._renderer.rayTracerRenderer.setAntiAliasing(newValue);

      this._def.logger.log(
        `Anti aliasing change: ${newValue === true ? 'enabled' : 'disabled'}`
      );
    });

    {
      const currValue = (this._def.resolution as any).value;
      this._setResolution(11 - currValue);
    }

    this._def.logger.log('user interface initialized');

    // performance auto-scaling
    this._def.perfAutoScaling.addEventListener('input', () => {
      this._framesUntilNextCheck = k_maxFramesUntilNextCheck;

      this._perfAutoScalingEnabled =
        (this._def.perfAutoScaling as any).checked === true;

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
    this._running = false;
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
      window.requestAnimationFrame(tick);

      this._mainLoop();
    };

    tick();
  }

  private _mainLoop() {
    const currentTime = Date.now();
    // let deltaTime = Math.min(currentTime - this._currFrameTime, 30);
    let deltaTime = currentTime - this._currFrameTime;
    this._currFrameTime = currentTime;
    this._frameProfiler.pushDelta(deltaTime);

    this._handlePerformanceAutoScaling(deltaTime);

    const elapsedTime = deltaTime / 1000;

    this._continuousTime += elapsedTime;

    this._freeFlyController.update(elapsedTime);

    GlobalMouseManager.resetDelta();

    //
    //

    {
      const gl = WebGLContext.getContext();

      gl.disable(gl.DEPTH_TEST);
    }

    this._continuousTime += elapsedTime;

    this._scene.run(this._renderer, elapsedTime);

    this._renderer.rayTracerRenderer.lookAt(
      this._freeFlyController.getPosition(),
      this._freeFlyController.getTarget(),
      this._freeFlyController.getUpAxis()
    );

    this._renderer.rayTracerRenderer.render();

    const showDebug = (this._def.debug_mode_enabled as any).checked === true;
    if (showDebug) {
      this._renderer.safeSceneWireFrame(() => {
        this._renderer.setupDebugRenderer();
        this._renderer.stackRenderers.pushLine(
          [0, 0, 0],
          [100, 0, 0],
          [1, 0, 0]
        );
        this._renderer.stackRenderers.pushLine(
          [0, 0, 0],
          [0, 100, 0],
          [0, 1, 0]
        );
        this._renderer.stackRenderers.pushLine(
          [0, 0, 0],
          [0, 0, 100],
          [0, 0, 1]
        );
      });
    }

    const gl = WebGLContext.getContext();
    gl.clear(gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LESS);

    renderControls(
      this._canvasElement,
      this._renderer.stackRenderers,
      this._renderer.textRenderer
    );

    renderFpsMeter(
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

  private _setResolution(newValue: number) {
    this._renderer.rayTracerRenderer.setResolutionCoef(1 / newValue);

    const newSize = this._renderer.rayTracerRenderer.getCurrentSize();
    const totalPixels = newSize[0] * newSize[1];

    this._def.logger.log(
      `resolution changed (1/${newValue}) => ${newSize[0]}x${newSize[1]} (${totalPixels}px)`
    );
  }

  private _handlePerformanceAutoScaling(inDelta: number) {
    if (this._perfAutoScalingEnabled !== true) return;

    if (inDelta <= 20) {
      this._framesUntilNextCheck = k_maxFramesUntilNextCheck;
      return;
    }

    // // prevent large delta time
    // inDelta = 20;

    --this._framesUntilNextCheck;

    if (this._framesUntilNextCheck > 0) return;

    this._def.logger.log(
      `performance auto scaling: slow framerate, scaling down resolution`
    );

    const currValue = parseInt((this._def.resolution as any).value, 10);
    const newValue = currValue - 1;

    if (newValue >= 1 && newValue <= 10) {
      this._setResolution(11 - newValue);

      (this._def.resolution as any).value = `${newValue}`;
    }

    this._framesUntilNextCheck = k_maxFramesUntilNextCheck;
  }
}
