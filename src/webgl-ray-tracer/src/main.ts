import { system } from '@local-framework';

import { Logger } from './experiment/utilities/Logger';

import { Experiment } from './experiment/Experiment';

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

const onPageLoad = async () => {
  logger = new Logger('loggerOutput');
  logger.log('[SETUP] page loaded');

  //
  // HTML elements check
  //

  const canvasElement =
    _queryDomElement<HTMLCanvasElement>('#rendering-canvas');
  const perfAutoScaling = _queryDomElement<HTMLInputElement>(
    '#auto-scaling-enabled'
  );
  const resolution = _queryDomElement<HTMLInputElement>('#resolution');
  const anti_aliasing_enabled = _queryDomElement<HTMLInputElement>(
    '#anti-aliasing-enabled'
  );
  const debug_mode_enabled = _queryDomElement<HTMLInputElement>(
    '#debug-mode-enabled'
  );
  const errorText = _queryDomElement<HTMLParagraphElement>('#error-text')!;

  //
  // Error Handling
  //

  const _onPageError = (err: WindowEventMap['error']) => {
    if (!mainDemo) {
      return;
    }

    console.log('onPageError', err);

    try {
      // stop the app
      mainDemo.stop();
    } catch (err) {}
    mainDemo = null;

    // stop the browser helpers
    system.browser.GlobalKeyboardManager.deactivate();
    system.browser.GlobalMouseManager.deactivate(canvasElement);
    system.browser.GlobalTouchManager.deactivate(canvasElement);
    system.browser.GlobalFullScreenManager.removeAllCallbacks();
    system.browser.GlobalPointerLockManager.removeAllCallbacks();
    system.browser.GlobalVisibilityManager.removeAllCallbacks();
    system.browser.GlobalVisibilityManager.deactivate();

    // setup the error message
    errorText.style.width = '800px';
    errorText.style.height = '600px';
    errorText.innerHTML = err.message;

    // swap the canvas with the error message
    canvasElement.style.display = 'none';
    errorText.style.display = 'block';

    // disable the user interface
    perfAutoScaling.disabled = true;
    resolution.min = resolution.max = resolution.value = 0 as unknown as string;
    anti_aliasing_enabled.disabled = true;
    debug_mode_enabled.disabled = true;

    document.title += ' (ERR)';
  };
  window.addEventListener('error', _onPageError);

  //
  // browser features check
  //

  if (!system.browser.isWebGL2Supported()) {
    throw new Error('missing WebGL2 feature (unsupported)');
  }

  //
  // setup application
  //

  mainDemo = new Experiment({
    canvasElement,
    logger,
    perfAutoScaling,
    resolution,
    anti_aliasing_enabled,
    debug_mode_enabled
  });

  logger.log('[SETUP] Demo: initializing');

  await mainDemo.init();

  logger.log('[SETUP] Demo: initialized');

  mainDemo.start();

  logger.log('[SETUP] Demo: running');

  //
  //
  //

  const pageMaxTimeInvisible = 60 * 1000; // 60sec
  utilities.setupOutdatedPage(pageMaxTimeInvisible, () => {
    throw new Error(
      '<br/><br/><br/>The page was inactive for too long<br/><br/>please reload'
    );
  });
};

window.addEventListener('load', onPageLoad, false);
