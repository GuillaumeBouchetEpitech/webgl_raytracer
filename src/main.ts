import { isWebGL2Supported } from './browser';

import { Logger } from './experiment/utilities/Logger';

import { Experiment } from './experiment/Experiment';

let logger: Logger | undefined = undefined;
let mainDemo: Experiment | undefined = undefined;

//
//
//
//
//

const _queryHtmlElement = <T extends Element>(inName: string): T => {
  const newElement = document.querySelector<T>(inName);
  if (!newElement) {
    throw new Error(`html element "${inName}" not found`);
  }
  return newElement;
};

const _queryCanvas = (inName: string) =>
  _queryHtmlElement<HTMLCanvasElement>(inName);
const _queryProgress = (inName: string) =>
  _queryHtmlElement<HTMLProgressElement>(inName);
const _queryInput = (inName: string) =>
  _queryHtmlElement<HTMLInputElement>(inName);

//
//
//
//
//

const onPageError = async (err: ErrorEvent) => {
  if (logger) {
    logger.error(err.message);
  } else {
    console.error(err.message);
  }

  if (mainDemo) {
    mainDemo.stop();
  }
};
window.addEventListener('error', onPageError);

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

  const canvasElement = _queryCanvas('#rendering-canvas');
  const perfAutoScaling = _queryInput('#auto-scaling-enabled');
  const resolution = _queryProgress('#resolution');
  const anti_aliasing_enabled = _queryInput('#anti-aliasing-enabled');
  const debug_mode_enabled = _queryInput('#debug-mode-enabled');

  //
  // browser features check
  //

  if (!isWebGL2Supported()) {
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
};

window.addEventListener('load', onPageLoad, false);
