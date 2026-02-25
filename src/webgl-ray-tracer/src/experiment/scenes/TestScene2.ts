// import { Renderer } from '../graphics/Renderer';

// import { physics } from 'FrankenPhys';

// import * as glm from 'gl-matrix';

// let continuousTime: number = 0;
// let continuousAngle: number = 0;

// let currStep = 0;
// let nextStep = 1;
// const allSteps: glm.ReadonlyVec3[] = [
//   [-5, 4, 0],
//   [+5, 4, 0],
//   [+5, 10, 0],
//   [-5, 10, 0]
// ];

// export class TestScene2 {
//   reset() {
//     continuousTime = 0;
//     continuousAngle = 0;
//     currStep = 0;
//     nextStep = 1;
//   }

//   run(elapsedTime: number, renderer: Renderer, physicWorld: physics.PhysicWorld) {
//     continuousAngle += elapsedTime * 2.0;
//     if (continuousAngle >= Math.PI * 2) {
//       continuousAngle -= Math.PI * 2;
//     }

//     continuousTime += elapsedTime * 0.75;
//     if (continuousTime > 1) {
//       continuousTime = 0;

//       currStep = (currStep + 1) % allSteps.length;
//       nextStep = (currStep + 1) % allSteps.length;
//     }

//     const lightPos: glm.vec3 = [
//       allSteps[currStep][0] +
//         (allSteps[nextStep][0] - allSteps[currStep][0]) * continuousTime,
//       allSteps[currStep][1] +
//         (allSteps[nextStep][1] - allSteps[currStep][1]) * continuousTime,
//       allSteps[currStep][2] +
//         (allSteps[nextStep][2] - allSteps[currStep][2]) * continuousTime
//     ];

//     //
//     //

//     // renderer.rayTracerRenderer.pushSunLight({
//     //   direction: [1.0, 1.0, 1.0],
//     //   intensity: 0.5
//     // });

//     {
//       // moving point lights

//       // actual point lights
//       renderer.rayTracerRenderer.pushPointLight({
//         position: [0, 10, 10],
//         intensity: 2,
//         radius: 20
//       });
//       // graphical presentation of the point lights
//       renderer.rayTracerRenderer.pushSphere({
//         position: [0, 10, 10],
//         orientation: [0,0,1,0],
//         radius: 0.25,
//         color: [1, 1, 1],
//         reflectionFactor: 0,
//         refractionFactor: 0.0,
//         chessboardEnabled: 0,
//         receiveLightEnabled: false,
//         castShadowEnabled: false
//       });

//       // actual point lights
//       renderer.rayTracerRenderer.pushPointLight({
//         position: lightPos,
//         intensity: 2,
//         radius: 10
//       });

//       // graphical presentation of the point lights
//       renderer.rayTracerRenderer.pushSphere({
//         position: lightPos,
//         orientation: [0,0,1,0],
//         radius: 0.25,
//         color: [1, 1, 1],
//         reflectionFactor: 0,
//         refractionFactor: 0.0,
//         chessboardEnabled: 0,
//         receiveLightEnabled: false,
//         castShadowEnabled: false
//       });

//       // // simple reflective sphere
//       // renderer.rayTracerRenderer.pushSphere({
//       //   position: [0, 7, 1],
//       //   radius: 1.0,
//       //   color: [1, 1, 1],
//       //   reflectionFactor: 0.0,
//       //   refractionFactor: 0.5,
//       //   chessboardEnabled: 0,
//       //   receiveLightEnabled: false,
//       //   castShadowEnabled: true
//       // });

//       // // simple reflective box
//       // renderer.rayTracerRenderer.pushBox({
//       //   position: [0, 7, 1],
//       //   angleX: continuousAngle * 0.0,
//       //   angleY: continuousAngle * 1.0,
//       //   angleZ: 0,
//       //   boxSize: [0.8,0.8,0.8],

//       //   color: [1, 1, 1],
//       //   reflectionFactor: 1.0,
//       //   chessboardEnabled: 0,
//       //   receiveLightEnabled: false,
//       //   castShadowEnabled: true
//       // });

//       // // simple reflective triangle
//       // renderer.rayTracerRenderer.pushTriangle({
//       //   v0: [0, 7, 1],
//       //   v1: [0, 8, 1],
//       //   v2: [0, 8, 2],

//       //   color: [1, 1, 1],
//       //   reflectionFactor: 1.0,
//       //   receiveLightEnabled: false,
//       //   castShadowEnabled: true
//       // });

//       const allBoxes: {
//         pos: glm.ReadonlyVec3;
//         size: glm.ReadonlyVec3;
//         color?: glm.ReadonlyVec3;
//         reflectionFactor?: number;
//       }[] = [
//         // hollow box 1
//         { pos: [-2, 4, -1], size: [1, 1.125, 0.125] },
//         { pos: [-2, 4, +1], size: [1, 1.125, 0.125] },
//         { pos: [-2, 4 - 1, 0], size: [1, 0.125, 1.125] },
//         { pos: [-2, 4 + 1, 0], size: [1, 0.125, 1.125] },

//         // hollow box 2
//         { pos: [+2, 4, -1], size: [1, 1.125, 0.125] },
//         { pos: [+2, 4, +1], size: [1, 1.125, 0.125] },
//         { pos: [+2, 4 - 1, 0], size: [1, 0.125, 1.125] },
//         { pos: [+2, 4 + 1, 0], size: [1, 0.125, 1.125] },

//         // background
//         { pos: [0, 8, -8], size: [8, 8, 0.125], color: [1.0, 0.5, 0.5] },
//         { pos: [-8, 8, 0], size: [0.125, 8, 8], color: [0.5, 1.0, 0.5] },
//         { pos: [+8, 8, 0], size: [0.125, 8, 8], color: [0.5, 0.5, 1.0] },
//         { pos: [0, 0, -1], size: [8, 0.125, 8], reflectionFactor: 0.3 }
//       ];
//       allBoxes.forEach(({ pos, size, color, reflectionFactor }) => {
//         renderer.rayTracerRenderer.pushBox({
//           position: pos,
//           orientation: [0,0,1,0],
//           // angleX: 0,
//           // angleY: 0,
//           // angleZ: 0,
//           boxSize: size,
//           color: color ?? [1, 1, 1],
//           reflectionFactor: reflectionFactor ?? 0,
//           refractionFactor: 0,
//           chessboardEnabled: false,
//           receiveLightEnabled: true,
//           castShadowEnabled: true
//         });
//       });

//       {
//         const allRotatedBoxes: {
//           pos: glm.ReadonlyVec3;
//           angleY: number;
//           size: glm.ReadonlyVec3;
//         }[] = [
//           {
//             pos: [
//               5 + 1 * Math.cos(continuousAngle),
//               6,
//               0 + 1 * Math.sin(continuousAngle)
//             ],
//             angleY: -continuousAngle,
//             size: [0.125, 1.0, 1.125]
//           },
//           {
//             pos: [
//               5 - 1 * Math.cos(continuousAngle),
//               6 + 2,
//               0 - 1 * Math.sin(continuousAngle)
//             ],
//             angleY: -continuousAngle,
//             size: [0.125, 1.0, 1.125]
//           },
//           {
//             pos: [
//               5 + 1 * Math.cos(continuousAngle + Math.PI * 0.5),
//               6 + 1,
//               0 + 1 * Math.sin(continuousAngle + Math.PI * 0.5)
//             ],
//             angleY: -continuousAngle + Math.PI * 0.5,
//             size: [0.125, 2.0, 1.0]
//           },
//           {
//             pos: [
//               5 + 1 * Math.cos(continuousAngle - Math.PI * 0.5),
//               6 + 1,
//               0 + 1 * Math.sin(continuousAngle - Math.PI * 0.5)
//             ],
//             angleY: -continuousAngle - Math.PI * 0.5,
//             size: [0.125, 2.0, 1.0]
//           }
//           // { pos: [-2,4,+1], size: [1,1,0.125] },
//           // { pos: [-2,4-1,0], size: [1,0.125,1] },
//         ];
//         allRotatedBoxes.forEach(({ pos, angleY, size }) => {
//           // const posA: glm.ReadonlyVec3 = [
//           //   Math.sin(angle) * 7,
//           //   4,
//           //   Math.cos(angle) * 7
//           // ];

//           renderer.rayTracerRenderer.pushBox({
//             position: pos,
//             // orientation: [0,0,1,0],
//             orientation: glm.quat.setAxisAngle(glm.quat.create(), [0,1,0], angleY),
//             // angleX: 0,
//             // angleY: angleY,
//             // angleZ: 0,
//             boxSize: size,
//             color: [0, 1, 0],
//             reflectionFactor: 0,
//             refractionFactor: 0,
//             chessboardEnabled: false,
//             receiveLightEnabled: true,
//             castShadowEnabled: true
//           });
//         });
//       }
//     } // moving point lights
//   }
// }
