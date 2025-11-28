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

import { physics } from 'FrankenPhys';

import { Logger } from './utilities/Logger';

import { Renderer } from './graphics/Renderer';
import * as scenes from './scenes/intex';

import * as glm from 'gl-matrix';

const framerate = -1; // if negative -> use vsync (gpu expensive)
// const framerate = 60; // if negative -> use vsync (gpu expensive)
interface ExperimentDef {
  domElement: HTMLElement;
  width: number;
  height: number;
  logger: Logger;
}

const k_maxFramesUntilNextCheck = 3;

export class Experiment {
  private _animationFrameHandle: number = 0;
  private _def: Omit<ExperimentDef, 'canvasElement'>;

  private _resolution: number = 9;
  private _onResolutionChange?: (() => void);

  private _timeRatio: number = 1;
  private _hudVisible: boolean = true;

  private _physicDebugModeEnabled: boolean = false;
  private _showBvhDebugModeEnabled: boolean = false;

  private _freeFlyController: system.controllers.FreeFlyController;

  private _renderer: Renderer;

  private _physicWorld?: physics.PhysicWorld;

  private _running: number = 0;
  private _errorGraphicContext: boolean;

  private _lastFrameTime: number = Date.now();
  private _currFrameMsecTime: number = Date.now();
  private _frameProfiler = new system.metrics.FrameProfiler();

  // private _continuousSecTime = 0;

  private _perfAutoScalingEnabled = true;
  private _framesUntilNextCheck = k_maxFramesUntilNextCheck;

  // private _scene = new scenes.TestScene1();
  // private _scene = new scenes.TestScene2();
  private _scene = new scenes.TestScene3();

  constructor(inDef: ExperimentDef) {
    // this._canvasElement = inDef.canvasElement;
    this._def = inDef;

    this._freeFlyController = new FreeFlyController({
      coordinates: ['Z', 'X', 'Y'],
      position: [-5, 5, 10],
      theta: Math.PI * 1.05,
      phi: -Math.PI * 0.25,
      mouseSensibility: 6,
      keyboardSensibility: Math.PI * 0.55,
      touchSensibility: 8,
      movingSpeed: 16
    });

    //
    //

    {
      GlobalKeyboardManager.activate();
      GlobalTouchManager.activate(this._def.domElement);

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
        this._def.domElement
      );
      GlobalPointerLockManager.addOnLockChange(() => {
        const isLocked = GlobalPointerLockManager.isPointerLocked(
          this._def.domElement
        );

        if (isLocked) {
          this._def.logger.log('The pointer lock status is now locked');

          GlobalMouseManager.activate(this._def.domElement);
        } else {
          this._def.logger.log('The pointer lock status is now unlocked');

          GlobalMouseManager.deactivate(this._def.domElement);

          GlobalPointerLockManager.allowPointerLockedOnClickEvent(
            this._def.domElement
          );
        }
      });

      GlobalPointerLockManager.addOnLockError((event) => {
        this._def.logger.log(
          `The pointer lock sent an error, event: "${JSON.stringify(event)}"`
        );
      });

      // WebGLContext.initialize(this._def.domElement);

      this._renderer = new Renderer({
        width: this._def.width,
        height: this._def.height,
      });
      this._renderer.initialize();
    }

    //
    //
    //

    this._running = 0;
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

  }

  async init() {
    await this._renderer.initialize();

    this._physicWorld = new physics.PhysicWorld();
    this._physicWorld.setGravity(0,-10,0);

    // all (?) the debug rendering feature flag
    let debugDrawerFlag: number = 0;
    debugDrawerFlag |= physics.DebugDrawFlags.DBG_DrawWireframe;
    debugDrawerFlag |= physics.DebugDrawFlags.DBG_DrawAabb;
    // debugDrawerFlag |= physics.DebugDrawFlags.DBG_DrawContactPoints;
    // debugDrawerFlag |= physics.DebugDrawFlags.DBG_DrawConstraints;
    // debugDrawerFlag |= physics.DebugDrawFlags.DBG_DrawConstraintLimits;
    // debugDrawerFlag |= physics.DebugDrawFlags.DBG_DrawNormals;
    // debugDrawerFlag |= physics.DebugDrawFlags.DBG_DrawFrames;

    this._physicWorld.setDebugWireframeFeaturesFlag(debugDrawerFlag);

    this._physicWorld.setDebugWireframeCallback((
      x1,y1,z1,
      x2,y2,z2,
      r,g,b,
    ) => {

      this._renderer.stackRenderers.pushLine(
        [x1,y1,z1],
        [x2,y2,z2],
        [r,g,b],
      );

    });

    // // dynamic falling sphere
    // const fallingSphereBody = this._physicWorld.createRigidBody({
    //   mass: 1, // dynamic
    //   shape: { type: 'sphere', radius: 1 },
    // });
    // fallingSphereBody.setPosition(0, 0, 10);
    // fallingSphereBody.setFriction(1); // just to show it's available
    // fallingSphereBody.disableDeactivation(); // just to show it's available

    // // ground box body that the falling sphere will collide with
    // const groundBoxBody = this._physicWorld.createRigidBody({
    //   mass: 0, // static
    //   shape: { type: 'box', size: [2,2,2] },
    // });
    // groundBoxBody.setPosition(0, 0, -1);
    // groundBoxBody.setFriction(1); // just to show it's available

    // // run for 100 iterations
    // for (let ii = 0; ii < 100; ++ii) {

    //   const frameRate = 1/60;
    //   const subSteps = 0;
    //   this._physicWorld.stepSimulation(frameRate, subSteps, frameRate);

    //   // print current position of the falling sphere
    //   const prettyPos = [...fallingSphereBody.getPosition()].map(val => val.toFixed(2));
    //   // console.log(prettyPos, 'total collision:', allContactIds.size);
    //   console.log(prettyPos);
    // }

    // physic engine initialize
    //
    //

  }

  // resize(inWidth: number, inHeight: number, inIsFullScreen: boolean) {
  //   let currentWidth = inWidth;
  //   let currentHeight = inHeight;

  //   if (inIsFullScreen) {
  //     this._canvasElement.style.position = 'absolute';
  //     currentWidth = window.innerWidth;
  //     currentHeight = window.innerHeight;
  //   } else {
  //     this._canvasElement.style.position = 'relative';
  //   }

  //   this._canvasElement.style.left = '0px';
  //   this._canvasElement.style.top = '0px';
  //   this._canvasElement.style.width = `${currentWidth}px`;
  //   this._canvasElement.style.height = `${currentHeight}px`;
  //   this._canvasElement.width = currentWidth;
  //   this._canvasElement.height = currentHeight;

  //   this._renderer.resize(currentWidth, currentHeight);
  // }

  start() {
    if (this.isRunning()) {
      return;
    }

    this._running = -1;

    this._tick();
  }

  stop() {
    if (!this.isRunning()) {
      return;
    }
    this._running = 0;

    if (framerate < 0) {
      window.cancelAnimationFrame(this._animationFrameHandle);
    } else {
      window.clearTimeout(this._animationFrameHandle);
    }
  }

  updateCanvasOnce() {
    if (!this._physicWorld) {
      return;
    }
    this._running = 2;
    // this._mainLoop();
    this._tick();

    // this._scene.run(0.001, this._renderer, this._physicWorld);
    // this._renderScene();
    // this._renderHud();
  }

  isRunning() {
    return this._running !== 0 && !this.isCrashed();
  }
  isPaused() {
    return this._running === 0 && !this.isCrashed();
  }
  isCrashed() {
    return this._errorGraphicContext;
  }

  setTimeRatio(timeRatio: number): void {
    this._timeRatio = system.math.clamp(timeRatio, 0, 4);
  }

  setHudVisibility(hudVisible: boolean) {
    this._hudVisible = hudVisible;

    if (this.isPaused()) {
      this.updateCanvasOnce();
    }
  }
  getHudVisibility() {
    return this._hudVisible;
  }

  //
  //
  //

  private _tick() {
    const tick = () => {
      if (!this.isRunning()) {
        return;
      }

      // plan the next frame

      if (this._running > 0) {
        this._running -= 1;
      }

      if (this._running !== 0) {

        if (framerate < 0) {
          this._animationFrameHandle = window.requestAnimationFrame(tick);
        } else {
          this._animationFrameHandle = window.setTimeout(tick, 1000 / framerate);
        }
      }

      this._mainLoop();

    };

    tick();
  }

  // #region main loop
  private _mainLoop() {
    const currentMsecTime = Date.now();

    const deltaFrameMsecTime = currentMsecTime - this._lastFrameTime;
    this._lastFrameTime = currentMsecTime;

    this._handlePerformanceAutoScaling(deltaFrameMsecTime);
    this._frameProfiler.pushDelta(deltaFrameMsecTime);

    const deltaMsecTime = currentMsecTime - this._currFrameMsecTime;
    this._currFrameMsecTime = currentMsecTime;

    // this make sure the time sensitive logic isn't "jumping" in case of slow down
    const safeDelta = Math.min(deltaMsecTime, 100);

    const deltaSecTime = (safeDelta / 1000);

    // this._continuousSecTime += deltaSecTime;

    this._freeFlyController.update(deltaSecTime);

    GlobalMouseManager.resetDeltas();
    GlobalTouchManager.resetDeltas();

    //
    //

    // this._continuousSecTime += deltaSecTime;

    if (this._physicWorld) {

      let actualTimeRatio = this._timeRatio;
      if (this._running >= 0) {
        actualTimeRatio = 0;
      }

      this._scene.run(deltaSecTime * actualTimeRatio, this._renderer, this._physicWorld);
    }

    //
    //

    this._renderScene();
    this._renderHud();
  }
  // #endregion main loop

  // #region hud
  private _renderHud() {
    const gl = WebGLContext.getContext();
    gl.viewport(0, 0, this._def.width, this._def.height);
    gl.clear(gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LESS);

    // // the modern web browsers are already applying double buffering
    // // -> so we're in fact triple buffering here
    // // -> which is great -> more time for the WebGL queue to finish on time
    // this._renderer.multipleBuffering.renderHud(
    //   this._renderer.mainHudCamera.getComposedMatrix()
    // );

    if (this._hudVisible) {

      {
        const keyEventsPos: glm.ReadonlyVec2 = [7 + 20, 165];
        const touchEventsPos: glm.ReadonlyVec2 = [7 + 20, 260];
        const boardPos: glm.ReadonlyVec2 = [7, 35];

        graphics.renderers.widgets.addKeyStrokesWidgets(
          keyEventsPos,
          this._renderer.stackRenderers,
          this._renderer.textRenderer
        );
        graphics.renderers.widgets.addArrowStrokesWidgets(
          touchEventsPos,
          this._renderer.stackRenderers,
          this._renderer.textRenderer
        );
        graphics.renderers.widgets.addKeysTouchesWidgets(
          this._def.domElement,
          boardPos,
          this._renderer.stackRenderers,
          this._renderer.textRenderer
        );
      }

      graphics.renderers.widgets.renderFpsMeter(
        [10, this._def.height - 60, 0],
        [100, 50],
        this._frameProfiler,
        this._renderer.stackRenderers,
        this._renderer.textRenderer,
        true
      );

      this._renderer.flushHudWireFrame();
      this._renderer.flushHudText();
    }

    this._renderer.rayTracerRenderer.rayTracerPass.reset();
  }
  // #endregion hud

  // #region scene
  private _renderScene() {
    // this._renderer.multipleBuffering.captureScene(() => {

      {
        const gl = WebGLContext.getContext();

        // gl.clear(gl.COLOR | gl.DEPTH);
        // gl.clear(gl.DEPTH_BUFFER_BIT);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.disable(gl.DEPTH_TEST);
      }

      this._renderer.rayTracerRenderer.rayTracerPass.lookAt(
        this._freeFlyController.getPosition(),
        this._freeFlyController.getTarget(),
        this._freeFlyController.getUpAxis()
      );

      this._renderer.rayTracerRenderer.render();
      // this._renderer.rayTracerRenderer.renderAsciiArt();


      if (this._physicDebugModeEnabled) {
        this._renderer.stackRenderers.clear();
        this._renderer.safeSceneWireFrame(() => {

          const axisOrigin: glm.ReadonlyVec3 = [0, 0, 0];
          const axisX: glm.ReadonlyVec3 = [100, 0, 0];
          const axisY: glm.ReadonlyVec3 = [0, 100, 0];
          const axisZ: glm.ReadonlyVec3 = [0, 0, 100];

          this._renderer.stackRenderers.pushLine(axisOrigin, axisX, [1, 0, 0]);
          this._renderer.stackRenderers.pushLine(axisOrigin, axisY, [0, 1, 0]);
          this._renderer.stackRenderers.pushLine(axisOrigin, axisZ, [0, 0, 1]);

          this._physicWorld!.debugDrawWorld();
        });
      }

      if (this._showBvhDebugModeEnabled) {
        this._renderer.stackRenderers.clear();
        this._renderer.safeSceneWireFrame(() => {

          // render wireframe axis
          const axisOrigin: glm.ReadonlyVec3 = [0, 0, 0];
          const axisX: glm.ReadonlyVec3 = [100, 0, 0];
          const axisY: glm.ReadonlyVec3 = [0, 100, 0];
          const axisZ: glm.ReadonlyVec3 = [0, 0, 100];
          this._renderer.stackRenderers.pushLine(axisOrigin, axisX, [1, 0, 0]);
          this._renderer.stackRenderers.pushLine(axisOrigin, axisY, [0, 1, 0]);
          this._renderer.stackRenderers.pushLine(axisOrigin, axisZ, [0, 0, 1]);

          this._renderer.bvhRenderDebugWireframe();
        });
      }



    // });
  }
  // #endregion scene

  setResolution(inValue: number) {
    const safeValue = system.math.clamp(inValue, 0, 9); // [0..9]
    this._resolution = safeValue;
    const newValue = 10 - safeValue; // [1..10]
    const newCoef = 1 / newValue; // [0..1]
    this._renderer.rayTracerRenderer.setResolutionCoef(newCoef);

    if (this.isPaused()) {
      this.updateCanvasOnce();
    }
  }
  getResolution(): number {
    return this._resolution;
  }
  setOnResolutionChange(inCallback: () => void) {
    this._onResolutionChange = inCallback;
  }

  setPhysicDebugModeEnabled(isEnabled: boolean) {
    this._physicDebugModeEnabled = isEnabled;

    if (this.isPaused()) {
      this.updateCanvasOnce();
    }
  }
  setShowBvhDebugModeEnabled(isEnabled: boolean) {
    this._showBvhDebugModeEnabled = isEnabled;

    if (this.isPaused()) {
      this.updateCanvasOnce();
    }
  }

  setAntiAliasing(isEnabled: boolean) {
    this._renderer.rayTracerRenderer.setAntiAliasing(isEnabled);

    this._def.logger.log(
      `Anti aliasing change: ${isEnabled === true ? 'enabled' : 'disabled'}`
    );

    if (this.isPaused()) {
      this.updateCanvasOnce();
    }
  }

  logResolution() {
    const rayTracerRenderer = this._renderer.rayTracerRenderer;

    const newCoef = rayTracerRenderer.getResolutionCoef();
    const newSize = rayTracerRenderer.rayTracerPass.getCurrentSize();
    const totalPixels = newSize[0] * newSize[1];

    this._def.logger.log(
      `resolution changed (1/${Math.ceil(1 / newCoef)}) => ${newSize[0]}x${
        newSize[1]
      } (${totalPixels}px)`
    );
  }

  setPerformanceAutoScaling(isEnabled: boolean) {
    this._framesUntilNextCheck = k_maxFramesUntilNextCheck;

    this._perfAutoScalingEnabled = isEnabled;

    this._def.logger.log(
      `Performance auto scaler change: ${isEnabled ? 'enabled' : 'disabled'}`
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

    const currValue = this._resolution;
    const newValue = currValue - 1;

    if (newValue >= 0 && newValue <= 9) {
      this.setResolution(newValue);
      this.logResolution();

      this._resolution = newValue;
      if (this._onResolutionChange) {
        this._onResolutionChange();
      }
    }

    this._framesUntilNextCheck = k_maxFramesUntilNextCheck;
  }
}
