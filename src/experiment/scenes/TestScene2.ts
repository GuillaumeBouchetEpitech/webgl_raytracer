
import { Renderer } from '../graphics/Renderer';

import * as glm from 'gl-matrix';

let continuousTime: number = 0;
let continuousAngle: number = 0;

let currStep = 0;
let nextStep = 1;
const allSteps: glm.ReadonlyVec3[] = [
  [-5, 4, 0],
  [+5, 4, 0],
  [+5, 10, 0],
  [-5, 10, 0],
];

export class TestScene2 {

  reset() {

    continuousTime = 0;
    continuousAngle = 0;
    currStep = 0;
    nextStep = 1;
  }

  run(
    renderer: Renderer,
    elapsedTime: number
  ) {

    continuousAngle += elapsedTime * 2.0;
    if (continuousAngle >= Math.PI * 2) {
      continuousAngle -= Math.PI * 2;
    }


    continuousTime += elapsedTime * 0.75;
    if (continuousTime > 1) {
      continuousTime = 0;

      currStep = (currStep + 1) % allSteps.length;
      nextStep = (currStep + 1) % allSteps.length;
    }

    const lightPos: glm.vec3 = [
      allSteps[currStep][0] + (allSteps[nextStep][0] - allSteps[currStep][0]) * continuousTime,
      allSteps[currStep][1] + (allSteps[nextStep][1] - allSteps[currStep][1]) * continuousTime,
      allSteps[currStep][2] + (allSteps[nextStep][2] - allSteps[currStep][2]) * continuousTime,
    ];


    //
    //

    // renderer.rayTracerRenderer.pushSunLight({
    //   direction: [1.0, 1.0, 1.0],
    //   intensity: 0.5
    // });

    {
      // moving spot lights

      // actual spot lights
      renderer.rayTracerRenderer.pushSpotLight({ position: [0,10,10], intensity: 2, radius: 20});
      // graphical presentation of the spot lights
      renderer.rayTracerRenderer.pushSphere({
        position: [0,10,10],
        radius: 0.25,
        color: [1, 1, 1],
        reflection: 0,
        chessboard: false,
        lightEnabled: false,
        shadowEnabled: false
      });

      // actual spot lights
      renderer.rayTracerRenderer.pushSpotLight({ position: lightPos, intensity: 2, radius: 10});

      // graphical presentation of the spot lights
      renderer.rayTracerRenderer.pushSphere({
        position: lightPos,
        radius: 0.25,
        color: [1, 1, 1],
        reflection: 0,
        chessboard: false,
        lightEnabled: false,
        shadowEnabled: false
      });


      const allBoxes: { pos: glm.ReadonlyVec3,  size: glm.ReadonlyVec3, reflection?: number }[] = [
        { pos: [-2,4,-1], size: [1,1,0.125] },
        { pos: [-2,4,+1], size: [1,1,0.125] },
        { pos: [-2,4-1,0], size: [1,0.125,1] },
        { pos: [-2,4+1,0], size: [1,0.125,1] },
        { pos: [+2,4,-1], size: [1,1,0.125] },
        { pos: [+2,4,+1], size: [1,1,0.125] },
        { pos: [+2,4-1,0], size: [1,0.125,1] },
        { pos: [+2,4+1,0], size: [1,0.125,1] },

        { pos: [0,8,-8], size: [8,8,0.125], reflection: 0.2 },
        { pos: [-8,8,0], size: [0.125,8,8], reflection: 0.2 },
        { pos: [+8,8,0], size: [0.125,8,8], reflection: 0.2 },
        { pos: [0,-0,0], size: [8,0.125,8], reflection: 0.2 },
      ];
      allBoxes.forEach(({pos, size, reflection}) => {

        renderer.rayTracerRenderer.pushBox({
          position: pos,
          angleX: 0,
          angleY: 0,
          angleZ: 0,
          boxSize: size,
          color: [1, 1, 1],
          reflection: reflection ?? 0,
          chessboard: false,
          lightEnabled: true,
          shadowEnabled: true,
        });
      });

      {

        // lightPos


        const allRotatedBoxes: { pos: glm.ReadonlyVec3, angleY: number, size: glm.ReadonlyVec3 }[] = [
          {
            pos: [
              5 + 1 * Math.cos(continuousAngle),
              6,
              0 + 1 * Math.sin(continuousAngle)
            ],
            angleY: -continuousAngle,
            size: [0.125,1.0,1.0],
          },
          {
            pos: [
              5 - 1 * Math.cos(continuousAngle),
              6 + 2,
              0 - 1 * Math.sin(continuousAngle)
            ],
            angleY: -continuousAngle,
            size: [0.125,1.0,1.0],
          },
          {
            pos: [
              5 + 1 * Math.cos(continuousAngle + Math.PI * 0.5),
              6 + 1,
              0 + 1 * Math.sin(continuousAngle + Math.PI * 0.5)
            ],
            angleY: -continuousAngle + Math.PI * 0.5,
            size: [0.125,2.0,1.0],
          },
          {
            pos: [
              5 + 1 * Math.cos(continuousAngle - Math.PI * 0.5),
              6 + 1,
              0 + 1 * Math.sin(continuousAngle - Math.PI * 0.5)
            ],
            angleY: -continuousAngle - Math.PI * 0.5,
            size: [0.125,2.0,1.0],
          },
          // { pos: [-2,4,+1], size: [1,1,0.125] },
          // { pos: [-2,4-1,0], size: [1,0.125,1] },
        ];
        allRotatedBoxes.forEach(({pos, angleY, size}) => {

          // const posA: glm.ReadonlyVec3 = [
          //   Math.sin(angle) * 7,
          //   4,
          //   Math.cos(angle) * 7
          // ];

          renderer.rayTracerRenderer.pushBox({
            position: pos,
            angleX: 0,
            angleY: angleY,
            angleZ: 0,
            boxSize: size,
            color: [0, 1, 0],
            reflection: 0,
            chessboard: false,
            lightEnabled: true,
            shadowEnabled: true,
          });
        });

      }

    } // moving spot lights

  }

};
