import { Renderer } from './Renderer';

import * as glm from 'gl-matrix';

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

export const renderScene = (
  renderer: Renderer,
  // sliders: ISliders,
  elapsedTime: number,
  continuousTime: number,
  angle_x: number,
  angle_y: number,
  angle_z: number
) => {
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
    renderer.rayTracerRenderer.pushSphere([5, 0, 5], 1, [1, 1, 1], 0.5, false);

    //
    //

    const angleX = ((angle_x / 100) * 2 - 1) * Math.PI * 2;
    const angleY = ((angle_y / 100) * 2 - 1) * Math.PI * 2;
    const angleZ = ((angle_z / 100) * 2 - 1) * Math.PI * 2;

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
};
