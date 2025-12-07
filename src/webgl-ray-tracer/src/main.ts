import { system, graphics } from '@local-framework';

import { Logger } from './experiment/utilities/Logger';

import { Experiment } from './experiment/Experiment';

import { BrowserFrankenPhysWasmModule, physics } from 'FrankenPhys';

import * as utilities from './utilities';

let logger: Logger | null = null;
let mainDemo: Experiment | null = null;

//
//
//
//
//

const _queryDomElement = <T extends Element>(inName: string): T => {
  const newElement = document.querySelector<T>(inName);
  if (!newElement) {
    throw new Error(`html element "${inName}" not found`);
  }
  return newElement;
};

//
//
//
//
//

const _allErrorCallbacks: ((err: any) => void)[] = [];

const _onPageError = async (err: any) => {
  for (const currCallback of [..._allErrorCallbacks].reverse()) {
    try {
      await currCallback(err);
    } catch (ignored_err) {}
  }
};


// default error handler
_allErrorCallbacks.push((err: any) => {
  console.log('onError', err);
  if (mainDemo) {
    try {
      // stop the app
      mainDemo.stop();
    } catch (err) {}
    mainDemo = null;
  }
});

//
//
//
//
//

const onPageLoad = async () => {
  try {

    logger = new Logger('loggerOutput');
    logger.log('[SETUP] page loaded');

    //
    // HTML elements check
    //

    const canvasElement =
      _queryDomElement<HTMLCanvasElement>('#rendering-canvas');

    // add to error handlers
    _allErrorCallbacks.push((err: any) => {
      // stop the browser helpers
      system.browser.GlobalKeyboardManager.deactivate();
      system.browser.GlobalMouseManager.deactivate(canvasElement);
      system.browser.GlobalTouchManager.deactivate(canvasElement);
      system.browser.GlobalFullScreenManager.removeAllCallbacks();
      system.browser.GlobalPointerLockManager.removeAllCallbacks();
      system.browser.GlobalVisibilityManager.removeAllCallbacks();
      system.browser.GlobalVisibilityManager.deactivate();
    });

    const playButton = _queryDomElement<HTMLButtonElement>('#play-button');
    const pauseButton = _queryDomElement<HTMLButtonElement>('#pause-button');
    const stopButton = _queryDomElement<HTMLButtonElement>('#stop-button');
    const toggleHudButton = _queryDomElement<HTMLButtonElement>('#toggle-button');
    const perfAutoScaling = _queryDomElement<HTMLInputElement>(
      '#auto-scaling-enabled'
    );
    const resolution = _queryDomElement<HTMLInputElement>('#resolution');
    const anti_aliasing_enabled = _queryDomElement<HTMLInputElement>(
      '#anti-aliasing-enabled'
    );
    const physic_debug_mode_enabled = _queryDomElement<HTMLInputElement>(
      '#debug-mode-enabled'
    );
    const bvh_debug_mode_enabled = _queryDomElement<HTMLInputElement>(
      '#bvh-debug-mode-enabled'
    );
    const errorText = _queryDomElement<HTMLParagraphElement>('#error-text')!;

    // add to error handlers
    _allErrorCallbacks.push((err: any) => {
      // setup the error message
      errorText.style.width = '800px';
      errorText.style.height = '600px';
      errorText.innerHTML = err.message;

      // swap the canvas with the error message
      canvasElement.style.display = 'none';
      errorText.style.display = 'block';

      // disable the user interface
      playButton.disabled = true;
      pauseButton.disabled = true;
      stopButton.disabled = true;
      perfAutoScaling.disabled = true;
      resolution.min = resolution.max = resolution.value = 0 as unknown as string;
      anti_aliasing_enabled.disabled = true;
      physic_debug_mode_enabled.disabled = true;
      bvh_debug_mode_enabled.disabled = true;

      document.title += ' (ERR)';
    });

    //
    // browser features check
    //

    if (!system.browser.isWebGL2Supported()) {
      throw new Error('missing WebGL2 feature (unsupported)');
    }

    //
    //
    // physic engine initialize

    // load the wasm side
    await BrowserFrankenPhysWasmModule.load({
      jsUrl: "./dist/wasm/FrankenPhys.0.0.1.js",
      wasmUrl: "./dist/wasm",
    });

    // set the wasm side
    physics.WasmModuleHolder.set(BrowserFrankenPhysWasmModule.get());

    //
    // setup application
    //

    graphics.webgl2.WebGLContext.initialize(canvasElement);

    mainDemo = new Experiment({
      domElement: canvasElement,
      width: canvasElement.width,
      height: canvasElement.height,
      logger,
    });

    mainDemo.setResolution(7);

    mainDemo.setOnResolutionChange(() => {
      if (!mainDemo) {
        return;
      }
      resolution.value = mainDemo.getResolution() as unknown as string;
    })

    playButton.addEventListener('click', () => {
      if (!mainDemo) {
        return;
      }
      mainDemo.setTimeRatio(1);
      mainDemo.start();
    });
    pauseButton.addEventListener('click', () => {
      if (!mainDemo) {
        return;
      }
      mainDemo.setTimeRatio(0);
      mainDemo.start();
    });
    stopButton.addEventListener('click', () => {
      if (!mainDemo) {
        return;
      }
      mainDemo.stop();
    });
    toggleHudButton.addEventListener('click', () => {
      if (!mainDemo) {
        return;
      }
      mainDemo.setHudVisibility(!mainDemo.getHudVisibility());
    });

    //refresh button?

    // performance auto-scaling
    perfAutoScaling.addEventListener('input', () => {
      if (!mainDemo) {
        return;
      }
      mainDemo.setPerformanceAutoScaling(perfAutoScaling.checked);
    });

    resolution.addEventListener('input', (event) => {
      if (!mainDemo) {
        return;
      }
      const newValue = resolution.value as unknown as number;
      mainDemo.setResolution(newValue);
      mainDemo.logResolution();
    });

    anti_aliasing_enabled.addEventListener('click', () => {
      if (!mainDemo || !logger) {
        return;
      }
      const newValue = anti_aliasing_enabled.checked === true;

      mainDemo.setAntiAliasing(newValue);
    });

    physic_debug_mode_enabled.addEventListener('click', () => {
      if (!mainDemo) {
        return;
      }
      mainDemo.setPhysicDebugModeEnabled(physic_debug_mode_enabled.checked);
    })
    bvh_debug_mode_enabled.addEventListener('click', () => {
      if (!mainDemo) {
        return;
      }
      mainDemo.setShowBvhDebugModeEnabled(bvh_debug_mode_enabled.checked);
    })

    logger.log('[SETUP] Demo: started');

    mainDemo.start();
    // mainDemo.start();

    logger.log('[SETUP] Demo: running');

    //
    //
    //

    const pageMaxTimeInvisible = 60 * 1000; // 60sec
    utilities.setupOutdatedPage(pageMaxTimeInvisible, () => {
      _onPageError(new Error(`
        <br/>
        <br/>
        <br/>
        The page was inactive for too long<br/>
        <br/>
        please reload
      `));
    });

  } catch (err: any) {
    console.log('err.message', err.message);
    _onPageError(err);
  }

};

window.addEventListener('load', onPageLoad, false);
