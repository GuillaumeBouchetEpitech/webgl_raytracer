
"use strict"

import "fpsmeter";

import { Logger } from "./utilities/Logger";
import { FreeFlyController } from "./utilities/FreeFlyController";

import { PointerLockSetup } from "./inputs/PointerLockSetup";

import { Renderer } from "./graphics/Renderer";

let g_running = false;

type IVec3 = [number, number, number];

const onGlobalLoad = async () => {

    const g_logger = new Logger("loggerOutput");
    g_logger.log("page loaded");

    const onGlobalError = (err: ErrorEvent) => {

        if (g_logger) {
            g_logger.error(err.message);
        }
        else {
            console.error(err.message);
        }

        // stop the main loop, prevent the "infinite errors" scenario
        g_running = false;
    };

    window.addEventListener("error", onGlobalError, false);

    //
    //
    // create fpsmeter

    const mainFpsElement = document.getElementById("complete-loop-fpsmeter");
    const stepFpsElement = document.getElementById("update-fpsmeter");

    const fpsMeters = {
        main: new FPSMeter(mainFpsElement, { theme: "dark" }),
        step: new FPSMeter(stepFpsElement, { theme: "dark" })
    };
    fpsMeters.step.toggle(); // <= switch to ms mode

    //
    //
    // create renderer

    const canvas = document.getElementById("rendering-canvas") as HTMLCanvasElement;

    const renderer = new Renderer();
    await renderer.initialise(canvas);

    g_logger.log("renderer initialised");

    //
    //
    //
    // ui

    const sliders = {
        perfAutoScaling: document.getElementById("auto-scaling-enabled") as HTMLElement,
        resolution: document.getElementById("resolution") as HTMLElement,
        anti_aliasing_enabled: document.getElementById("anti-aliasing-enabled") as HTMLElement,
        angle_x: document.getElementById("angle-x") as any,
        angle_y: document.getElementById("angle-y") as any,
        angle_z: document.getElementById("angle-z") as any,
        angle_w: document.getElementById("angle-w") as any,
        debug_mode_enabled: document.getElementById("debug-mode-enabled") as HTMLElement,
    };

    const setResolution = (newValue: number) => {

        renderer.setResolutionCoef(1 / newValue);

        const newSize = renderer.getCurrentSize();
        const totalPixels = newSize[0] * newSize[1];

        g_logger.log(`resolution changed (1/${newValue}) => ${newSize[0]}x${newSize[1]} (${totalPixels}px)`);
    };

    sliders.resolution.addEventListener("input", (event) => {

        const newValue = (event as any).target.value;

        setResolution(newValue);
    })

    sliders.anti_aliasing_enabled.addEventListener("click", () => {

        const newValue = (sliders.anti_aliasing_enabled as any).checked === true;

        renderer.setAntiAliasing(newValue);

        g_logger.log(`Anti aliasing change: ${newValue === true ? "enabled" : "disabled"}`);
    })

    {
        const currValue = (sliders.resolution as any).value;
        setResolution(currValue);
    }

    g_logger.log("user interface initialised");

    // ui
    //
    //
    //

    //
    //
    //
    // controller

    const freeFlyController = new FreeFlyController({
        position: [-10, 9, 22],
        theta: -63,
        phi: -19,
        mouseSensivity: 1 / 10,
        movingSpeed: 10,
    });

    const mouseLockedCallback = () => {

        if (freeFlyController.isActivated())
            return;

        g_logger.log('The pointer lock status is now locked');

        freeFlyController.activate(canvas);
    };

    const mouseUnlockedCallback = () => {

        g_logger.log('The pointer lock status is now unlocked');

        freeFlyController.deactivate(canvas);
    };

    const mousePointerLockErrorCallback = (err: Error) => {

        g_logger.log(`The pointer lock sent an error, message=${err.message}`);
    };

    PointerLockSetup({
        targetElement: canvas,
        enabledCallback: mouseLockedCallback,
        disabledCallback: mouseUnlockedCallback,
        errorCallback: mousePointerLockErrorCallback
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

    sliders.perfAutoScaling.addEventListener("input", () => {

        framesUntilNextCheck = maxFramesUntilNextCheck;

        perfAutoScalingEnabled = (sliders.perfAutoScaling as any).checked === true;

        g_logger.log(`Performance auto scaler change: ${perfAutoScalingEnabled === true ? "enabled" : "disabled"}`);
    });

    interface IParticles {
        pos: IVec3;
        vel: IVec3;
        life: number;
        maxLife: number;
    };

    const flashParticles: IParticles[] = [];
    let explosionCooldown = 0;
    const smokeParticles: IParticles[] = [];
    let smokeCooldown = 0;

    //
    //
    //

    const mosaicSize = 6;
    const mosaicSqSize = 10;
    const mosaicVertices: [IVec3, IVec3][] = [];
    for (let yy = 0; yy < mosaicSize; ++yy)
    for (let xx = 0; xx < mosaicSize; ++xx) {
        mosaicVertices.push([
            [ xx * mosaicSqSize - mosaicSize * 0.5 * mosaicSqSize,
              -4 + Math.random() * 3,
              yy * mosaicSqSize - mosaicSize * 0.5 * mosaicSqSize ],
            [ Math.random(), Math.random(), Math.random() ],
        ]);
    }

    //
    //
    //

    g_running = true;

    const tick = () => {

        if (g_running)
            window.requestAnimationFrame(tick);

        fpsMeters.main.tick();
        fpsMeters.main.tickStart();
        fpsMeters.step.tickStart();

        const currentTime = Date.now();
        elapsedTime = (currentTime - lastTime) / 1000;
        lastTime = currentTime;

        // performance auto-scaling
        if (perfAutoScalingEnabled === true) {

            if (elapsedTime > 1/40) {

                // prevent large delta time
                elapsedTime = 1/40;

                if (--framesUntilNextCheck < 0) {

                    g_logger.log(`performance auto scaling: slow framerate, scaling down resolution`);

                    const currValue = parseInt((sliders.resolution as any).value, 10);
                    const newValue = currValue + 1;

                    if (newValue >= 1 && newValue <= 10) {

                        setResolution(newValue);

                        (sliders.resolution as any).value = `${newValue}`;
                    }

                    framesUntilNextCheck = maxFramesUntilNextCheck;
                }
            }
            else {
                framesUntilNextCheck = maxFramesUntilNextCheck;
            }
        }

        continuousTime += elapsedTime;

        freeFlyController.update(elapsedTime);

        { // push scene

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

                renderer.pushTriangle(v1[0], v0[0], v2[0], colorA, 0.1, true, true);
                renderer.pushTriangle(v3[0], v1[0], v2[0], colorB, 0.1, true, true);
            }

            renderer.pushTriangle([5,5,1], [10,10,1], [10,5,1], [1,1,1], 0.1, true, true);

            // triangles mosaic
            //
            //

            // space ship
            renderer.pushBox([5,       0,        10      ], 0, 0, 0, [2.00, 0.50, 1.00], [1.0,0.0,0.0], 0, false); // body
            renderer.pushBox([5 + 1.0, 0 + 0.50, 10 + 0.0], 0, 0, 0, [0.75, 0.25, 0.50], [0.5,0.5,0.5], 0, false); // cockpit
            renderer.pushBox([5 - 1.0, 0 - 0.25, 10 + 1.5], 0, 0, 0, [1.00, 0.25, 0.50], [1.0,1.0,0.0], 0, false); // wing (left)
            renderer.pushBox([5 - 1.0, 0 - 0.25, 10 - 1.5], 0, 0, 0, [1.00, 0.25, 0.50], [1.0,1.0,0.0], 0, false); // wing (right)
            renderer.pushBox([5 - 1.0, 0 + 1.00, 10 + 0.0], 0, 0, 0, [1.00, 0.50, 0.25], [1.0,1.0,0.0], 0, false); // wing (top)

            //
            //

            renderer.pushSphere([15, 0, 15], 1, [1,1,1], 0.5, false);
            renderer.pushSphere([5, 0, 5], 1, [1,1,1], 0.5, false);

            //
            //

            const angleX = ((sliders.angle_x.value / 100) * 2 - 1) * Math.PI * 2;
            const angleY = ((sliders.angle_y.value / 100) * 2 - 1) * Math.PI * 2;
            const angleZ = ((sliders.angle_z.value / 100) * 2 - 1) * Math.PI * 2;

            renderer.pushBox([0, 0, 0], angleX, angleY, angleZ, [2, 1, 0.5], [1,0.5,0.5], 0.8, true);
            renderer.pushBox([0, 2.5, 0], angleX, angleY, angleZ, [2, 1, 0.5], [1,0.5,0.5], 0.8, true);

            //
            //

            for (let ii = 0; ii < 8; ++ii) {

                const coef = ii / 8;

                renderer.pushSphere([
                    Math.sin(continuousTime * +0.5 + Math.PI * 2 * coef) * 8,
                    Math.sin(continuousTime * +0.5 + Math.PI * 2 * coef) * 1 + 1,
                    Math.cos(continuousTime * +0.5 + Math.PI * 2 * coef) * 8],
                    0.5, [coef,1-coef,0], 0, false);
            }

            //
            //

            renderer.pushSunLight([1.0, 1.0, 1.0], 1.0);

            { // moving spot lights

                const angle = continuousTime * -0.5;

                const posA: IVec3 = [
                    Math.sin(angle) * 7,
                    4,
                    Math.cos(angle) * 7,
                ];

                const posB: IVec3 = [
                    Math.sin(angle + Math.PI * 0.5) * 7,
                    4,
                    Math.cos(angle + Math.PI * 0.5) * 7,
                ];

                // graphical presesentation of the spot lights
                renderer.pushSphere(posA, 0.5, [1,1,1], 0, false, false, false);
                renderer.pushSphere(posB, 0.5, [1,1,1], 0, false, false, false);

                // actual spot lights
                renderer.pushSpotLight(posA, 5, 10);
                renderer.pushSpotLight(posB, 5, 10);

            } // moving spot lights

            { // particle handling

                { // explosion

                    if (explosionCooldown > 0)
                        explosionCooldown -= elapsedTime;

                    if (explosionCooldown <= 0) {
                        explosionCooldown = 3;

                        // push one flash particle (timed spot light)
                        flashParticles.push({
                            pos: [-8, 0, -5],
                            vel: [0, 0, 0],
                            life: 0.35,
                            maxLife: 0.35,
                        });

                        smokeCooldown = 0;
                    }
                    else {

                        if (explosionCooldown > 1.0 && explosionCooldown < 3.0) {

                            // push X smoke particle(s) (timed orange/black spheres)

                            if (smokeCooldown > 0)
                                smokeCooldown -= elapsedTime;

                            if (smokeCooldown <= 0) {
                                smokeCooldown = 1/16; // 16 spheres per seconds (for ~2 seconds)

                                const myRandom = (minValue: number, maxValue: number) => Math.random() * (maxValue - minValue) + minValue;

                                // 5 "smoke spheres" for the first 1sec
                                // then 1 "smoke sphere" for the last 1sec
                                const totalParticles = (explosionCooldown > 2.0 && explosionCooldown < 3.0 ? 5 : 1);

                                for (let ii = 0; ii < totalParticles; ++ii) {

                                    const velocity: IVec3 = [
                                        2 * myRandom(-1,+1),
                                        4 + 2 * myRandom(-1,+1),
                                        2 * myRandom(-1,+1)
                                    ];

                                    smokeParticles.push({
                                        pos: [-8, 1, -5],
                                        vel: velocity,
                                        life: 1,
                                        maxLife: 1,
                                    });
                                }
                            }
                        }

                    }

                } // explosion

                { // flash particle (timed spot light)

                    for (let ii = 0; ii < flashParticles.length;) {

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
                            renderer.pushSphere(flashParticles[ii].pos, size, [1,1,1], 0, false, false, false);

                            // actual spot light
                            renderer.pushSpotLight(flashParticles[ii].pos, intensity * 5, radius * 5);
                        }

                        // increment here (not done in the loop)
                        ++ii;
                    }

                } // flash particle (timed spot light)

                { // smoke particles (timed spot spheres)

                    const initalColor: IVec3 = [1,0.5,0]; // orange
                    const finalColor: IVec3 = [0.2,0.2,0.2]; // dark gray

                    for (let ii = 0; ii < smokeParticles.length;) {

                        smokeParticles[ii].life -= elapsedTime;

                        // dead particle? remove
                        if (smokeParticles[ii].life <= 0) {
                            smokeParticles.splice(ii, 1);
                            continue;
                        }

                        smokeParticles[ii].pos[0] += smokeParticles[ii].vel[0] * elapsedTime;
                        smokeParticles[ii].pos[1] += smokeParticles[ii].vel[1] * elapsedTime;
                        smokeParticles[ii].pos[2] += smokeParticles[ii].vel[2] * elapsedTime;

                        const coef = smokeParticles[ii].life / smokeParticles[ii].maxLife;

                        const size = Math.sin(coef * Math.PI);
                        if (size > 0) {

                            const lerp = (valA: number, valB: number, coef: number) => valB + (valA - valB) * coef;

                            const color: IVec3 = [
                                lerp(initalColor[0], finalColor[0], coef),
                                lerp(initalColor[1], finalColor[1], coef),
                                lerp(initalColor[2], finalColor[2], coef),
                            ];

                            renderer.pushSphere(smokeParticles[ii].pos, size, color, 0, false, true);
                        }

                        // increment here (not done in the loop)
                        ++ii;
                    }

                } // smoke particles (timed spot spheres)

            } // particle handling

        } // push scene

        renderer.lookAt(
            freeFlyController.getPosition(),
            freeFlyController.getTarget(),
            freeFlyController.getUpAxis(),
        );

        renderer.computeGrid();

        renderer.render();

        const showDebug = (sliders.debug_mode_enabled as any).checked === true;
        if (showDebug) {
            renderer.render2();
            renderer.pushLine([0,0,0], [100,0,0], [1,0,0]);
            renderer.pushLine([0,0,0], [0,100,0], [0,1,0]);
            renderer.pushLine([0,0,0], [0,0,100], [0,0,1]);
            renderer.flushWireframe();
        }

        renderer.reset();

        fpsMeters.step.tick();
    };

    g_logger.log("running");

    tick();
};

window.addEventListener("load", onGlobalLoad, false);
