import { Renderer } from '../graphics/Renderer';

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

let continuousTime: number = 0;

export class TestScene1 {
  reset() {
    flashParticles.length = 0;
    explosionCooldown = 0;
    smokeParticles.length = 0;
    smokeCooldown = 0;

    continuousTime = 0;
  }

  run(renderer: Renderer, elapsedTime: number) {
    continuousTime += elapsedTime;

    {
      // push scene

      // floor
      renderer.rayTracerRenderer.pushBox({
        position: [0, -4.5, 0],
        angleX: 0,
        angleY: 0,
        angleZ: 0,
        boxSize: [30, 1, 30],
        color: [0.5, 1, 0.5],
        reflectionFactor: 0.2,
        chessboardEnabled: false,
        receiveLightEnabled: true,
        castShadowEnabled: true
      });

      // triangle
      renderer.rayTracerRenderer.pushTriangle({
        v0: [5, 5, 1],
        v1: [10, 10, 1],
        v2: [10, 5, 1],
        color: [1, 1, 1],
        reflectionFactor: 0.1,
        castShadowEnabled: true,
        receiveLightEnabled: true
      });

      // 4 pillars
      for (let xx = -1; xx <= 1; xx += 2)
      for (let zz = -1; zz <= 1; zz += 2) {

        renderer.rayTracerRenderer.pushBox({
          position: [xx*10, 0, zz*10],
          angleX: 0,
          angleY: 0,
          angleZ: 0,
          boxSize: [1, 5, 1],
          color: [1, 1, 1],
          reflectionFactor: 0,
          chessboardEnabled: false,
          receiveLightEnabled: true,
          castShadowEnabled: true
        });
      }

      // space ship
      renderer.rayTracerRenderer.pushBox({
        position: [5, 0, 10],
        angleX: 0,
        angleY: 0,
        angleZ: 0,
        boxSize: [2.0, 0.5, 1.0],
        color: [1.0, 0.0, 0.0],
        reflectionFactor: 0,
        chessboardEnabled: false,
        receiveLightEnabled: true,
        castShadowEnabled: true
      }); // body
      renderer.rayTracerRenderer.pushBox({
        position: [5 + 1.0, 0 + 0.5, 10 + 0.0],
        angleX: 0,
        angleY: 0,
        angleZ: 0,
        boxSize: [0.75, 0.25, 0.5],
        color: [0.5, 0.5, 0.5],
        reflectionFactor: 0,
        chessboardEnabled: false,
        receiveLightEnabled: true,
        castShadowEnabled: true
      }); // cockpit
      renderer.rayTracerRenderer.pushBox({
        position: [5 - 1.0, 0 - 0.25, 10 + 1.5],
        angleX: 0,
        angleY: 0,
        angleZ: 0,
        boxSize: [1.0, 0.25, 0.5],
        color: [1.0, 1.0, 0.0],
        reflectionFactor: 0,
        chessboardEnabled: false,
        receiveLightEnabled: true,
        castShadowEnabled: true
      }); // wing (left)
      renderer.rayTracerRenderer.pushBox({
        position: [5 - 1.0, 0 - 0.25, 10 - 1.5],
        angleX: 0,
        angleY: 0,
        angleZ: 0,
        boxSize: [1.0, 0.25, 0.5],
        color: [1.0, 1.0, 0.0],
        reflectionFactor: 0,
        chessboardEnabled: false,
        receiveLightEnabled: true,
        castShadowEnabled: true
      }); // wing (right)
      renderer.rayTracerRenderer.pushBox({
        position: [5 - 1.0, 0 + 1.0, 10 + 0.0],
        angleX: 0,
        angleY: 0,
        angleZ: 0,
        boxSize: [1.0, 0.5, 0.25],
        color: [1.0, 1.0, 0.0],
        reflectionFactor: 0,
        chessboardEnabled: false,
        receiveLightEnabled: true,
        castShadowEnabled: true
      }); // wing (top)

      //
      //

      renderer.rayTracerRenderer.pushSphere({
        position: [15, 0, 15],
        radius: 1,
        color: [1, 1, 1],
        reflectionFactor: 0.5,
        refractionFactor: 0.0,
        chessboardEnabled: false,
        receiveLightEnabled: true,
        castShadowEnabled: true
      });
      renderer.rayTracerRenderer.pushSphere({
        position: [5, 0, 5],
        radius: 1,
        color: [1, 1, 1],
        reflectionFactor: 0.5,
        refractionFactor: 0.0,
        chessboardEnabled: false,
        receiveLightEnabled: true,
        castShadowEnabled: true
      });

      //
      //

      renderer.rayTracerRenderer.pushBox({
        position: [0, 0, 0],
        angleX: 0,
        angleY: 0,
        angleZ: 0,
        boxSize: [2, 1, 0.5],
        color: [1, 0.5, 0.5],
        reflectionFactor: 0.8,
        chessboardEnabled: true,
        receiveLightEnabled: true,
        castShadowEnabled: true
      });
      renderer.rayTracerRenderer.pushBox({
        position: [0, 2.5, 0],
        angleX: 0,
        angleY: 0,
        angleZ: 0,
        boxSize: [2, 1, 0.5],
        color: [1, 0.5, 0.5],
        reflectionFactor: 0.8,
        chessboardEnabled: true,
        receiveLightEnabled: true,
        castShadowEnabled: true
      });

      //
      //

      for (let ii = 0; ii < 8; ++ii) {
        const coef = ii / 8;

        renderer.rayTracerRenderer.pushSphere({
          position: [
            Math.sin(continuousTime * +0.5 + Math.PI * 2 * coef) * 8,
            Math.sin(continuousTime * +0.5 + Math.PI * 2 * coef) * 1 + 1,
            Math.cos(continuousTime * +0.5 + Math.PI * 2 * coef) * 8
          ],
          radius: 0.5,
          color: [coef, 1 - coef, 0],
          reflectionFactor: 0,
          refractionFactor: 0.0,
          chessboardEnabled: false,
          receiveLightEnabled: true,
          castShadowEnabled: true
        });
      }

      //
      //

      renderer.rayTracerRenderer.pushSunLight({
        direction: [1.0, 1.0, 1.0],
        intensity: 1.0
      });

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
        renderer.rayTracerRenderer.pushSphere({
          position: posA,
          radius: 0.5,
          color: [1, 1, 1],
          reflectionFactor: 0,
          refractionFactor: 0.0,
          chessboardEnabled: false,
          receiveLightEnabled: false,
          castShadowEnabled: false
        });
        renderer.rayTracerRenderer.pushSphere({
          position: posB,
          radius: 0.5,
          color: [1, 1, 1],
          reflectionFactor: 0,
          refractionFactor: 0.0,
          chessboardEnabled: false,
          receiveLightEnabled: false,
          castShadowEnabled: false
        });

        // actual spot lights
        renderer.rayTracerRenderer.pushSpotLight({
          position: posA,
          intensity: 5,
          radius: 10
        });
        renderer.rayTracerRenderer.pushSpotLight({
          position: posB,
          intensity: 5,
          radius: 10
        });
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
              renderer.rayTracerRenderer.pushSphere({
                position: flashParticles[ii].pos,
                radius: size,
                color: [1, 1, 1],
                reflectionFactor: 0,
                refractionFactor: 0.0,
                chessboardEnabled: false,
                receiveLightEnabled: false,
                castShadowEnabled: false
              });

              // actual spot light
              renderer.rayTracerRenderer.pushSpotLight({
                position: flashParticles[ii].pos,
                intensity: intensity * 5,
                radius: radius * 5
              });
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

              renderer.rayTracerRenderer.pushSphere({
                position: smokeParticles[ii].pos,
                radius: size,
                color: color,
                reflectionFactor: 0,
                refractionFactor: 0.0,
                chessboardEnabled: false,
                receiveLightEnabled: true,
                castShadowEnabled: true
              });
            }

            // increment here (not done in the loop)
            ++ii;
          }
        } // smoke particles (timed spot spheres)
      } // particle handling
    } // push scene
  }
}
