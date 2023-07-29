import { isWebGL2Supported } from './browser';

import { Logger } from './experiment/utilities/Logger';

import { Experiment } from './experiment/Experiment';

const onPageLoad = async () => {
  let logger: Logger;
  let mainDemo: Experiment | null = null;
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

  logger = new Logger('loggerOutput');
  logger.log('page loaded');

  //
  // HTML elements check
  //

  const _queryHtmlElement = <T extends Element>(inName: string): T => {
    const newElement = document.querySelector<T>(inName);
    if (!newElement) {
      throw new Error(`html element "${inName}" not found`);
    }
    return newElement;
  };

  const canvasElement =
    _queryHtmlElement<HTMLCanvasElement>('#rendering-canvas');
  const perfAutoScaling = _queryHtmlElement<HTMLElement>(
    '#auto-scaling-enabled'
  );
  const resolution = _queryHtmlElement<HTMLElement>('#resolution');
  const anti_aliasing_enabled = _queryHtmlElement<HTMLElement>(
    '#anti-aliasing-enabled'
  );
  const debug_mode_enabled = _queryHtmlElement<HTMLElement>(
    '#debug-mode-enabled'
  );
  const angle_x = _queryHtmlElement<HTMLElement>('#angle-x') as any as {
    value: number;
  };
  const angle_y = _queryHtmlElement<HTMLElement>('#angle-y') as any as {
    value: number;
  };
  const angle_z = _queryHtmlElement<HTMLElement>('#angle-z') as any as {
    value: number;
  };

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
    debug_mode_enabled,
    angle_x,
    angle_y,
    angle_z
  });

  logger.log('initializing');

  await mainDemo.init();

  logger.log('initialized');

  mainDemo.start();

  logger.log('running');
};

window.addEventListener('load', onPageLoad, false);
