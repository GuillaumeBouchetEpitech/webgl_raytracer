import 'fpsmeter';

import { Logger } from './utilities/Logger';
import { FreeFlyController } from './controllers/FreeFlyController';

import {
  GlobalPointerLockManager,
  GlobalKeyboardManager,
  GlobalMouseManager
} from './inputManagers';

import { Renderer } from './graphics/Renderer';

import * as glm from 'gl-matrix';

let g_running = false;

const _renderHelpText = (inRenderer: Renderer, inCanvas: HTMLCanvasElement) => {
  type Indicator = {
    center: glm.ReadonlyVec2;
    size: glm.ReadonlyVec2;
    text?: string;
    lines?: {
      a: glm.ReadonlyVec2;
      b: glm.ReadonlyVec2;
      thickness: number;
      color: glm.ReadonlyVec3;
    }[];
    color: glm.ReadonlyVec3;
  };

  const allIndicator: Indicator[] = [];

  const defaultColor: glm.ReadonlyVec3 = [0.2, 0.2, 0.2];
  const activatedColor: glm.ReadonlyVec3 = [0.2, 0.6, 0.2];

  allIndicator.push({
    center: [680, 125],
    size: [40, 40],
    text: 'A\nQ',
    color: GlobalKeyboardManager.isPressed('A', 'Q')
      ? activatedColor
      : defaultColor
  });

  allIndicator.push({
    center: [680 + 45 * 1, 125],
    size: [40, 40],
    text: 'S',
    color: GlobalKeyboardManager.isPressed('S') ? activatedColor : defaultColor
  });

  allIndicator.push({
    center: [680 + 45 * 1, 125 + 45],
    size: [40, 40],
    text: 'W\nZ',
    color: GlobalKeyboardManager.isPressed('W', 'Z')
      ? activatedColor
      : defaultColor
  });

  allIndicator.push({
    center: [680 + 45 * 2, 125],
    size: [40, 40],
    text: 'D',
    color: GlobalKeyboardManager.isPressed('D') ? activatedColor : defaultColor
  });

  // left
  allIndicator.push({
    center: [680, 25],
    size: [40, 40],
    lines: [
      { a: [15, 0], b: [-8, 0], thickness: 6, color: [1, 1, 1] },
      { a: [0, 10], b: [-12, -2], thickness: 6, color: [1, 1, 1] },
      { a: [0, -10], b: [-12, 2], thickness: 6, color: [1, 1, 1] }
    ],
    color: GlobalKeyboardManager.isPressed('ArrowLeft')
      ? activatedColor
      : defaultColor
  });

  // down
  allIndicator.push({
    center: [680 + 45, 25],
    size: [40, 40],
    lines: [
      { a: [0, 15], b: [0, -8], thickness: 6, color: [1, 1, 1] },
      { a: [10, 0], b: [-2, -12], thickness: 6, color: [1, 1, 1] },
      { a: [-10, 0], b: [2, -12], thickness: 6, color: [1, 1, 1] }
    ],
    color: GlobalKeyboardManager.isPressed('ArrowDown')
      ? activatedColor
      : defaultColor
  });

  // up
  allIndicator.push({
    center: [680 + 45, 25 + 45],
    size: [40, 40],
    lines: [
      { a: [0, -15], b: [0, 8], thickness: 6, color: [1, 1, 1] },
      { a: [10, 0], b: [-2, 12], thickness: 6, color: [1, 1, 1] },
      { a: [-10, 0], b: [2, 12], thickness: 6, color: [1, 1, 1] }
    ],
    color: GlobalKeyboardManager.isPressed('ArrowUp')
      ? activatedColor
      : defaultColor
  });

  // right
  allIndicator.push({
    center: [680 + 45 * 2, 25],
    size: [40, 40],
    lines: [
      { a: [-15, 0], b: [8, 0], thickness: 6, color: [1, 1, 1] },
      { a: [0, 10], b: [12, -2], thickness: 6, color: [1, 1, 1] },
      { a: [0, -10], b: [12, 2], thickness: 6, color: [1, 1, 1] }
    ],
    color: GlobalKeyboardManager.isPressed('ArrowRight')
      ? activatedColor
      : defaultColor
  });

  if (GlobalPointerLockManager.canBePointerLocked(inCanvas)) {
    allIndicator.push({
      center: [550, 35],
      size: [210, 60],
      text: 'Mouse\nSupported',
      color: [0, 0.5, 0]
    });
  } else {
    allIndicator.push({
      center: [550, 35],
      size: [210, 60],
      text: 'Mouse Events\nNot Supported',
      color: [0.5, 0, 0]
    });
  }

  allIndicator.forEach((currIndicator) => {
    const { center } = currIndicator;

    inRenderer.stackRenderers.pushCenteredRectangle(
      glm.vec3.fromValues(center[0], center[1], -0.3),
      currIndicator.size,
      [0, 0, 0]
    );

    inRenderer.stackRenderers.pushCenteredRectangle(
      glm.vec3.fromValues(center[0], center[1], -0.2),
      [currIndicator.size[0] - 2, currIndicator.size[1] - 2],
      currIndicator.color
    );

    if (currIndicator.text) {
      inRenderer.textRenderer.pushCenteredText(currIndicator.text, center, 16);
    }

    if (currIndicator.lines) {
      currIndicator.lines.forEach((currLine) => {
        inRenderer.stackRenderers.pushThickLine(
          [center[0] + currLine.a[0], center[1] + currLine.a[1], 0],
          [center[0] + currLine.b[0], center[1] + currLine.b[1], 0],
          currLine.thickness,
          currLine.color
        );
      });
    }
  });
};

const onPageLoad = async () => {
  const g_logger = new Logger('loggerOutput');
  g_logger.log('page loaded');

  const onUncaughtError = (err: ErrorEvent) => {
    if (g_logger) {
      g_logger.error(err.message);
    } else {
      console.error(err.message);
    }

    // stop the main loop, prevent the "infinite errors" scenario
    g_running = false;
  };

  window.addEventListener('error', onUncaughtError, false);

  //
  //
  // create fpsmeter

  const mainFpsElement = document.getElementById('complete-loop-fpsmeter');
  const stepFpsElement = document.getElementById('update-fpsmeter');

  const fpsMeters = {
    main: new FPSMeter(mainFpsElement, { theme: 'dark' }),
    step: new FPSMeter(stepFpsElement, { theme: 'dark' })
  };
  fpsMeters.step.toggle(); // <= switch to ms mode

  //
  //
  // create renderer

  const canvas = document.getElementById(
    'rendering-canvas'
  ) as HTMLCanvasElement;

  const renderer = new Renderer(canvas);
  await renderer.initialize();

  g_logger.log('renderer initialized');

  //
  //
  //
  // ui

  const sliders = {
    perfAutoScaling: document.getElementById(
      'auto-scaling-enabled'
    ) as HTMLElement,
    resolution: document.getElementById('resolution') as HTMLElement,
    anti_aliasing_enabled: document.getElementById(
      'anti-aliasing-enabled'
    ) as HTMLElement,
    angle_x: document.getElementById('angle-x') as any,
    angle_y: document.getElementById('angle-y') as any,
    angle_z: document.getElementById('angle-z') as any,
    angle_w: document.getElementById('angle-w') as any,
    debug_mode_enabled: document.getElementById(
      'debug-mode-enabled'
    ) as HTMLElement
  };

  const setResolution = (newValue: number) => {
    renderer.rayTracerRenderer.setResolutionCoef(1 / newValue);

    const newSize = renderer.rayTracerRenderer.getCurrentSize();
    const totalPixels = newSize[0] * newSize[1];

    g_logger.log(
      `resolution changed (1/${newValue}) => ${newSize[0]}x${newSize[1]} (${totalPixels}px)`
    );
  };

  sliders.resolution.addEventListener('input', (event) => {
    const newValue = (event as any).target.value;

    setResolution(newValue);
  });

  sliders.anti_aliasing_enabled.addEventListener('click', () => {
    const newValue = (sliders.anti_aliasing_enabled as any).checked === true;

    renderer.rayTracerRenderer.setAntiAliasing(newValue);

    g_logger.log(
      `Anti aliasing change: ${newValue === true ? 'enabled' : 'disabled'}`
    );
  });

  {
    const currValue = (sliders.resolution as any).value;
    setResolution(currValue);
  }

  g_logger.log('user interface initialized');

  // ui
  //
  //
  //

  //
  //
  //
  // controller

  const freeFlyController = new FreeFlyController({
    coordinates: ['Z', 'X', 'Y'],
    position: [-10, 9, 22],
    theta: Math.PI * 0.85,
    phi: -Math.PI * 0.15,
    mouseSensibility: 0.1,
    keyboardSensibility: Math.PI * 0.45,
    touchSensibility: 0.3,
    movingSpeed: 10
  });

  GlobalKeyboardManager.activate();

  GlobalPointerLockManager.allowPointerLockedOnClickEvent(canvas);
  GlobalPointerLockManager.addOnLockChange(() => {
    const isLocked = GlobalPointerLockManager.isPointerLocked(canvas);

    if (isLocked) {
      g_logger.log('The pointer lock status is now locked');

      GlobalMouseManager.activate();
    } else {
      g_logger.log('The pointer lock status is now unlocked');

      GlobalMouseManager.deactivate();

      GlobalPointerLockManager.allowPointerLockedOnClickEvent(canvas);
    }
  });

  GlobalPointerLockManager.addOnLockError((event) => {
    g_logger.log(
      `The pointer lock sent an error, event: "${JSON.stringify(event)}"`
    );
  });

  // controller
  //
  //
  //

  //
  //
  // update loop

  let elapsedTime = 0;
  let lastTime = Date.now();
  let continuousTime = 0;

  // performance auto-scaling
  let perfAutoScalingEnabled = true;
  const maxFramesUntilNextCheck = 60;
  let framesUntilNextCheck = maxFramesUntilNextCheck;

  sliders.perfAutoScaling.addEventListener('input', () => {
    framesUntilNextCheck = maxFramesUntilNextCheck;

    perfAutoScalingEnabled = (sliders.perfAutoScaling as any).checked === true;

    g_logger.log(
      `Performance auto scaler change: ${
        perfAutoScalingEnabled === true ? 'enabled' : 'disabled'
      }`
    );
  });

  interface IParticles {
    pos: glm.vec3;
    vel: glm.ReadonlyVec3;
    life: number;
    maxLife: number;
  }

  const flashParticles: IParticles[] = [];
  let explosionCooldown = 0;
  const smokeParticles: IParticles[] = [];
  let smokeCooldown = 0;

  //
  //
  //

  const mosaicSize = 6;
  const mosaicSqSize = 10;
  const mosaicVertices: [glm.ReadonlyVec3, glm.ReadonlyVec3][] = [];
  for (let yy = 0; yy < mosaicSize; ++yy)
    for (let xx = 0; xx < mosaicSize; ++xx) {
      mosaicVertices.push([
        [
          xx * mosaicSqSize - mosaicSize * 0.5 * mosaicSqSize,
          -4 + Math.random() * 3,
          yy * mosaicSqSize - mosaicSize * 0.5 * mosaicSqSize
        ],
        [Math.random(), Math.random(), Math.random()]
      ]);
    }

  //
  //
  //

  g_running = true;

  const tick = () => {
    if (g_running) window.requestAnimationFrame(tick);

    fpsMeters.main.tick();
    fpsMeters.main.tickStart();
    fpsMeters.step.tickStart();

    const currentTime = Date.now();
    elapsedTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    // performance auto-scaling
    if (perfAutoScalingEnabled === true) {
      if (elapsedTime > 1 / 40) {
        // prevent large delta time
        elapsedTime = 1 / 40;

        if (--framesUntilNextCheck < 0) {
          g_logger.log(
            `performance auto scaling: slow framerate, scaling down resolution`
          );

          const currValue = parseInt((sliders.resolution as any).value, 10);
          const newValue = currValue + 1;

          if (newValue >= 1 && newValue <= 10) {
            setResolution(newValue);

            (sliders.resolution as any).value = `${newValue}`;
          }

          framesUntilNextCheck = maxFramesUntilNextCheck;
        }
      } else {
        framesUntilNextCheck = maxFramesUntilNextCheck;
      }
    }

    continuousTime += elapsedTime;

    freeFlyController.update(elapsedTime);

    GlobalMouseManager.resetDelta();

    {
      // push scene

      //
      //
      // triangles mosaic

      for (let yy = 1; yy < mosaicSize; ++yy)
        for (let xx = 1; xx < mosaicSize; ++xx) {
          const v0 = mosaicVertices[(yy - 1) * mosaicSize + (xx - 1)];
          const v1 = mosaicVertices[(yy - 0) * mosaicSize + (xx - 1)];
          const v2 = mosaicVertices[(yy - 1) * mosaicSize + (xx - 0)];
          const v3 = mosaicVertices[(yy - 0) * mosaicSize + (xx - 0)];

          const colorA = v0[1];
          const colorB = v3[1];

          renderer.rayTracerRenderer.pushTriangle({
            v0: v1[0],
            v1: v0[0],
            v2: v2[0],
            color: colorA,
            reflection: 0.1,
            shadowEnabled: true,
            lightEnabled: true
          });
          renderer.rayTracerRenderer.pushTriangle({
            v0: v3[0],
            v1: v1[0],
            v2: v2[0],
            color: colorB,
            reflection: 0.1,
            shadowEnabled: true,
            lightEnabled: true
          });
        }

      renderer.rayTracerRenderer.pushTriangle({
        v0: [5, 5, 1],
        v1: [10, 10, 1],
        v2: [10, 5, 1],
        color: [1, 1, 1],
        reflection: 0.1,
        shadowEnabled: true,
        lightEnabled: true
      });

      // triangles mosaic
      //
      //

      // pillars
      renderer.rayTracerRenderer.pushBox(
        [-10, 0, -10],
        0,
        0,
        0,
        [1, 5, 1],
        [1, 1, 1],
        0,
        false
      ); // cockpit
      renderer.rayTracerRenderer.pushBox(
        [+10, 0, -10],
        0,
        0,
        0,
        [1, 5, 1],
        [1, 1, 1],
        0,
        false
      ); // cockpit
      renderer.rayTracerRenderer.pushBox(
        [-10, 0, +10],
        0,
        0,
        0,
        [1, 5, 1],
        [1, 1, 1],
        0,
        false
      ); // cockpit
      renderer.rayTracerRenderer.pushBox(
        [+10, 0, +10],
        0,
        0,
        0,
        [1, 5, 1],
        [1, 1, 1],
        0,
        false
      ); // cockpit

      // space ship
      renderer.rayTracerRenderer.pushBox(
        [5, 0, 10],
        0,
        0,
        0,
        [2.0, 0.5, 1.0],
        [1.0, 0.0, 0.0],
        0,
        false
      ); // body
      renderer.rayTracerRenderer.pushBox(
        [5 + 1.0, 0 + 0.5, 10 + 0.0],
        0,
        0,
        0,
        [0.75, 0.25, 0.5],
        [0.5, 0.5, 0.5],
        0,
        false
      ); // cockpit
      renderer.rayTracerRenderer.pushBox(
        [5 - 1.0, 0 - 0.25, 10 + 1.5],
        0,
        0,
        0,
        [1.0, 0.25, 0.5],
        [1.0, 1.0, 0.0],
        0,
        false
      ); // wing (left)
      renderer.rayTracerRenderer.pushBox(
        [5 - 1.0, 0 - 0.25, 10 - 1.5],
        0,
        0,
        0,
        [1.0, 0.25, 0.5],
        [1.0, 1.0, 0.0],
        0,
        false
      ); // wing (right)
      renderer.rayTracerRenderer.pushBox(
        [5 - 1.0, 0 + 1.0, 10 + 0.0],
        0,
        0,
        0,
        [1.0, 0.5, 0.25],
        [1.0, 1.0, 0.0],
        0,
        false
      ); // wing (top)

      //
      //

      renderer.rayTracerRenderer.pushSphere(
        [15, 0, 15],
        1,
        [1, 1, 1],
        0.5,
        false
      );
      renderer.rayTracerRenderer.pushSphere(
        [5, 0, 5],
        1,
        [1, 1, 1],
        0.5,
        false
      );

      //
      //

      const angleX = ((sliders.angle_x.value / 100) * 2 - 1) * Math.PI * 2;
      const angleY = ((sliders.angle_y.value / 100) * 2 - 1) * Math.PI * 2;
      const angleZ = ((sliders.angle_z.value / 100) * 2 - 1) * Math.PI * 2;

      renderer.rayTracerRenderer.pushBox(
        [0, 0, 0],
        angleX,
        angleY,
        angleZ,
        [2, 1, 0.5],
        [1, 0.5, 0.5],
        0.8,
        true
      );
      renderer.rayTracerRenderer.pushBox(
        [0, 2.5, 0],
        angleX,
        angleY,
        angleZ,
        [2, 1, 0.5],
        [1, 0.5, 0.5],
        0.8,
        true
      );

      //
      //

      for (let ii = 0; ii < 8; ++ii) {
        const coef = ii / 8;

        renderer.rayTracerRenderer.pushSphere(
          [
            Math.sin(continuousTime * +0.5 + Math.PI * 2 * coef) * 8,
            Math.sin(continuousTime * +0.5 + Math.PI * 2 * coef) * 1 + 1,
            Math.cos(continuousTime * +0.5 + Math.PI * 2 * coef) * 8
          ],
          0.5,
          [coef, 1 - coef, 0],
          0,
          false
        );
      }

      //
      //

      renderer.rayTracerRenderer.pushSunLight([1.0, 1.0, 1.0], 1.0);

      {
        // moving spot lights

        const angle = continuousTime * -0.5;

        const posA: glm.ReadonlyVec3 = [
          Math.sin(angle) * 7,
          4,
          Math.cos(angle) * 7
        ];

        const posB: glm.ReadonlyVec3 = [
          Math.sin(angle + Math.PI * 0.5) * 7,
          4,
          Math.cos(angle + Math.PI * 0.5) * 7
        ];

        // graphical presentation of the spot lights
        renderer.rayTracerRenderer.pushSphere(
          posA,
          0.5,
          [1, 1, 1],
          0,
          false,
          false,
          false
        );
        renderer.rayTracerRenderer.pushSphere(
          posB,
          0.5,
          [1, 1, 1],
          0,
          false,
          false,
          false
        );

        // actual spot lights
        renderer.rayTracerRenderer.pushSpotLight(posA, 5, 10);
        renderer.rayTracerRenderer.pushSpotLight(posB, 5, 10);
      } // moving spot lights

      {
        // particle handling

        {
          // explosion

          if (explosionCooldown > 0) explosionCooldown -= elapsedTime;

          if (explosionCooldown <= 0) {
            explosionCooldown = 3;

            // push one flash particle (timed spot light)
            flashParticles.push({
              pos: [-8, 0, -5],
              vel: [0, 0, 0],
              life: 0.35,
              maxLife: 0.35
            });

            smokeCooldown = 0;
          } else {
            if (explosionCooldown > 1.0 && explosionCooldown < 3.0) {
              // push X smoke particle(s) (timed orange/black spheres)

              if (smokeCooldown > 0) smokeCooldown -= elapsedTime;

              if (smokeCooldown <= 0) {
                smokeCooldown = 1 / 16; // 16 spheres per seconds (for ~2 seconds)

                const myRandom = (minValue: number, maxValue: number) =>
                  Math.random() * (maxValue - minValue) + minValue;

                // 5 "smoke spheres" for the first 1sec
                // then 1 "smoke sphere" for the last 1sec
                const totalParticles =
                  explosionCooldown > 2.0 && explosionCooldown < 3.0 ? 5 : 1;

                for (let ii = 0; ii < totalParticles; ++ii) {
                  const velocity: glm.ReadonlyVec3 = [
                    2 * myRandom(-1, +1),
                    4 + 2 * myRandom(-1, +1),
                    2 * myRandom(-1, +1)
                  ];

                  smokeParticles.push({
                    pos: [-8, 1, -5],
                    vel: velocity,
                    life: 1,
                    maxLife: 1
                  });
                }
              }
            }
          }
        } // explosion

        {
          // flash particle (timed spot light)

          for (let ii = 0; ii < flashParticles.length; ) {
            flashParticles[ii].life -= elapsedTime;

            // dead particle? remove
            if (flashParticles[ii].life <= 0) {
              flashParticles.splice(ii, 1);
              continue;
            }

            const coef = flashParticles[ii].life / flashParticles[ii].maxLife;
            const value = Math.sin(coef * Math.PI);

            const size = value * 2;

            if (size > 0) {
              const intensity = value * 2;
              const radius = value * 2;

              // white sphere for grahic representation of the spot light
              renderer.rayTracerRenderer.pushSphere(
                flashParticles[ii].pos,
                size,
                [1, 1, 1],
                0,
                false,
                false,
                false
              );

              // actual spot light
              renderer.rayTracerRenderer.pushSpotLight(
                flashParticles[ii].pos,
                intensity * 5,
                radius * 5
              );
            }

            // increment here (not done in the loop)
            ++ii;
          }
        } // flash particle (timed spot light)

        {
          // smoke particles (timed spot spheres)

          const initialColor = glm.vec3.fromValues(1.0, 0.5, 0.0); // orange
          const finalColor = glm.vec3.fromValues(0.2, 0.2, 0.2); // dark gray
          let color = glm.vec3.fromValues(0.0, 0.0, 0.0);

          for (let ii = 0; ii < smokeParticles.length; ) {
            smokeParticles[ii].life -= elapsedTime;

            // dead particle? remove
            if (smokeParticles[ii].life <= 0) {
              smokeParticles.splice(ii, 1);
              continue;
            }

            const { pos, vel } = smokeParticles[ii];
            glm.vec3.scaleAndAdd(pos, pos, vel, elapsedTime);

            const coef = smokeParticles[ii].life / smokeParticles[ii].maxLife;

            const size = Math.sin(coef * Math.PI);
            if (size > 0) {
              color = glm.vec3.lerp(color, finalColor, initialColor, coef);

              renderer.rayTracerRenderer.pushSphere(
                smokeParticles[ii].pos,
                size,
                color,
                0,
                false,
                true
              );
            }

            // increment here (not done in the loop)
            ++ii;
          }
        } // smoke particles (timed spot spheres)
      } // particle handling
    } // push scene

    renderer.rayTracerRenderer.lookAt(
      freeFlyController.getPosition(),
      freeFlyController.getTarget(),
      freeFlyController.getUpAxis()
    );

    renderer.rayTracerRenderer.render();

    const showDebug = (sliders.debug_mode_enabled as any).checked === true;
    if (showDebug) {
      renderer.setupDebugRenderer();
      renderer.stackRenderers.pushLine([0, 0, 0], [100, 0, 0], [1, 0, 0]);
      renderer.stackRenderers.pushLine([0, 0, 0], [0, 100, 0], [0, 1, 0]);
      renderer.stackRenderers.pushLine([0, 0, 0], [0, 0, 100], [0, 0, 1]);
      renderer.flushSceneWireFrame();
    }

    {
      renderer.setupHudRenderer();

      _renderHelpText(renderer, canvas);

      renderer.flushHudWireFrame();
      renderer.flushHudText();
    }

    renderer.rayTracerRenderer.reset();

    fpsMeters.step.tick();
  };

  g_logger.log('running');

  tick();
};

window.addEventListener('load', onPageLoad, false);
