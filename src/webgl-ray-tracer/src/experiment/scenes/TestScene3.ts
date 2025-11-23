
import { system } from '@local-framework';

import { Renderer } from '../graphics/Renderer';

import { physics } from 'FrankenPhys';

import * as glm from 'gl-matrix';


let continuousTime: number = 0;

interface BoxObject {
  boxSize: glm.ReadonlyVec3;
  color: glm.ReadonlyVec3;
  reflectionFactor: number;
  refractionFactor: number;
  physicBody: physics.IPhysicBody;
  chessboardMaterial: 0 | 1 | 2;
  receiveLightEnabled: boolean;
  castShadowEnabled: boolean;
  chessboardArgs?: glm.ReadonlyVec3,
};

interface SphereObject {
  radius: number;
  physicBody: physics.IPhysicBody;
};

const k_reflection = true;

const allBoxes: BoxObject[] = [];
const allSpheres: SphereObject[] = [];
// const allMeshes: [glm.ReadonlyVec3, glm.ReadonlyVec3, glm.ReadonlyVec3][][] = [];


const g_lightPos: glm.vec3 = [0,0,20]
// const g_refractivePos: glm.vec3 = [0,0,20]


const _createBox = (
  physicWorld: physics.PhysicWorld,
  position: glm.ReadonlyVec3,
  orientation: glm.ReadonlyQuat,
  boxSize: glm.ReadonlyVec3,
  color: glm.ReadonlyVec3,
  reflectionFactor: number,
  refractionFactor: number = 0,
  chessboardMaterial: 0 | 1 | 2 = 0,
  receiveLightEnabled: boolean = true,
  castShadowEnabled: boolean = true,
  chessboardArgs?: glm.ReadonlyVec3,
) => {

  const physicBody = physicWorld.createRigidBody({
    mass: 0, // static
    shape: { type: 'box', size: [boxSize[0] * 1.95, boxSize[1] * 1.95, boxSize[2] * 1.95] },
    position,
    orientation,
  });
  physicBody.setRestitution(0.7); // bouncing
  physicBody.setFriction(1); // so the sphere doesn't slide but roll on it
  physicBody.disableDeactivation(); // do not fall asleep when too slow

  allBoxes.push({
    boxSize, color,
    reflectionFactor: k_reflection ? reflectionFactor : 0,
    physicBody, refractionFactor,
    chessboardMaterial: k_reflection ? chessboardMaterial : 0,
    receiveLightEnabled, castShadowEnabled,
    chessboardArgs,
  });
};

const _createBox2 = (
  physicWorld: physics.PhysicWorld,
  position: glm.ReadonlyVec3,
  orientation: glm.ReadonlyQuat,
  boxSize: glm.ReadonlyVec3,
  color: glm.ReadonlyVec3,
  reflectionFactor: number,
  refractionFactor: number,
  chessboardMaterial: 0 | 1 | 2 = 0,
  receiveLightEnabled: boolean = true,
  castShadowEnabled: boolean = true,
  mass: number = 1
) => {

  const physicBody = physicWorld.createRigidBody({
    mass,
    shape: { type: 'box', size: [boxSize[0] * 2.0, boxSize[1] * 2.0, boxSize[2] * 2.0] },
    position,
    orientation,
  });
  physicBody.setRestitution(0.5); // bouncing
  physicBody.setFriction(0); // so the sphere doesn't slide but roll on it
  physicBody.disableDeactivation(); // do not fall asleep when too slow

  allBoxes.push({
    boxSize, color,
    reflectionFactor: k_reflection ? reflectionFactor : 0,
    physicBody, refractionFactor,
    chessboardMaterial: k_reflection ? chessboardMaterial : 0,
    receiveLightEnabled, castShadowEnabled
  });
};


const _createSphere = (
  physicWorld: physics.PhysicWorld,
  position: glm.ReadonlyVec3,
  // orientation: glm.ReadonlyQuat,
  radius: number,
  bouncing: number,
) => {
  // const radius = 1;

  // dynamic falling sphere
  const physicBody = physicWorld.createRigidBody({
    mass: 1, // dynamic
    shape: { type: 'sphere', radius },
    position,
    orientation: glm.quat.identity(glm.quat.create()),
  });
  physicBody.setFriction(1); // so the sphere doesn't slide but roll on it
  physicBody.setRestitution(bouncing); // bouncing
  physicBody.disableDeactivation(); // so the sphere doesn't ever freeze if too slow

  allSpheres.push({ radius, physicBody });
}

// const _createStaticMesh = (
//   physicWorld: physics.PhysicWorld,
//   triangles: [glm.ReadonlyVec3, glm.ReadonlyVec3, glm.ReadonlyVec3][],
// ) => {

//   const physicBody = physicWorld.createRigidBody({
//     mass: 0, // static
//     shape: {
//       type: 'mesh',
//       triangles
//     },
//     position: [0,0,0],
//     orientation: glm.quat.identity(glm.quat.create()),
//   });
//   physicBody.setRestitution(0.7); // bouncing
//   physicBody.setFriction(1); // so the sphere doesn't slide but roll on it

//   allMeshes.push(triangles);
// };

export class TestScene3 {
  ensureSceneData(physicWorld: physics.PhysicWorld) {

    if (allBoxes.length > 0) {
      return;
    }


    // downhill on X
    _createBox(
      physicWorld,
      [-1,-4,0],
      glm.quat.setAxisAngle(glm.quat.create(), [0,0,1], Math.PI * 1/32),
      [4,1,2],
      [1, 1, 1],
      0.5,
      0.0,
      1,
      // true,
      // true,
      // [0.9, 0.1, 0.1],
    );

    // downhill on Z
    _createBox(
      physicWorld,
      [-7,-5,0],
      glm.quat.setAxisAngle(glm.quat.create(), [1,0,0], Math.PI * 1/32),
      [2,1,2],
      [1, 1, 1],
      0.5,
      0.0,
      1
    );
    // first ramp on Y
    _createBox(
      physicWorld,
      [-10,-3.0,2],
      glm.quat.setAxisAngle(glm.quat.create(), [1,0,0], Math.PI * 1/32),
      [0.25,0.25,4],
      [0.5, 1, 0.5],
      0
    );

    // first wall on Y
    _createBox(
      physicWorld,
      [-12,-1,2],
      glm.quat.setAxisAngle(glm.quat.create(), [0,1,0], Math.PI * -1/16),
      [0.5,5,4],
      // [0.5, 1, 0.5],
      [1, 1, 1],
      0
    );


    // downhill on X (2)
    _createBox(
      physicWorld,
      [-3,-6,+4],
      glm.quat.setAxisAngle(glm.quat.create(), [0,0,1], Math.PI * -1/32),
      [6,1,2],
      [1, 1, 1],
      0.5,
      0.0,
      1
    );

    // some ramp (angled)
    _createBox(
      physicWorld,
      [-7.8,-3.0,5.5],
      glm.quat.setAxisAngle(glm.quat.create(), [0,1,0], Math.PI * -0.125),
      [1.5,0.25,0.25],
      [0.5, 1, 0.5],
      0
    );
    // some ramp (downhill)
    _createBox(
      physicWorld,
      [-3.8,-3.5,6.5],
      glm.quat.setAxisAngle(glm.quat.create(), [0,0,1], Math.PI * -1/32),
      [2.5,0.25,0.25],
      [0.5, 1, 0.5],
      0
    );


    // some green pillar on X (1)
    // _createBox(
    //   physicWorld,
    //   [-6,-3.5,7],
    //   glm.quat.setAxisAngle(glm.quat.create(), [1,0,0], Math.PI * 0),
    //   [0.25,4,0.25],
    //   [0.5, 1, 0.5],
    //   0,
    // );
    _createBox2(
      physicWorld,
      [-6,-3.5,7],
      glm.quat.setAxisAngle(glm.quat.create(), [1,0,0], Math.PI * 0),
      [0.25,4,0.25],
      [0.5, 1, 0.5],
      0.0,
      0.0,
      0,
      true,
      true,
      0
    );

    // some green pillar on X (2)
    // _createBox(
    //   physicWorld,
    //   [-4.5,-3.5,7],
    //   glm.quat.setAxisAngle(glm.quat.create(), [1,0,0], Math.PI * 0),
    //   [0.25,4,0.25],
    //   [0.5, 1, 0.5],
    //   0
    // );
    _createBox2(
      physicWorld,
      [-4.5,-3.5,7],
      glm.quat.setAxisAngle(glm.quat.create(), [1,0,0], Math.PI * 0),
      [0.25,4,0.25],
      [0.5, 1, 0.5],
      0.0,
      0.0,
      0,
      true,
      true,
      0
    );

    // some green pillar on X (2)
    // _createBox(
    //   physicWorld,
    //   [-3,-3.5,7],
    //   glm.quat.setAxisAngle(glm.quat.create(), [1,0,0], Math.PI * 0),
    //   [0.25,4,0.25],
    //   [0.5, 1, 0.5],
    //   0
    // );
    _createBox2(
      physicWorld,
      [-3,-3.5,7],
      glm.quat.setAxisAngle(glm.quat.create(), [1,0,0], Math.PI * 0),
      [0.25,4,0.25],
      [0.5, 1, 0.5],
      0.0,
      0.0,
      0,
      true,
      true,
      0
    );

    // some flat floor for the 3 pillars shadows
    _createBox(
      physicWorld,
      [-4,-6.5,9.5],
      glm.quat.setAxisAngle(glm.quat.create(), [1,0,0], Math.PI * 0),
      [5.0,0.25,4],
      [0.5, 1, 0.5],
      0
    );


    _createSphere(
      physicWorld,
      [0,10,0],
      1.0,
      0.7
    );

    _createSphere(
      physicWorld,
      [-2,10,0],
      1.5,
      0.0
    );

    // _createBox2(
    //   physicWorld,
    //   [-4,10,0],
    //   glm.quat.setAxisAngle(glm.quat.create(), [1,1,1], Math.PI * 0.25),
    //   [1,1,1],
    //   [1, 0, 0],
    //   0.0,
    //   0.5,
    //   false,
    //   true,
    //   false
    // );

    // RED BOX HERE
    _createBox2(
      physicWorld,
      [-4,10,0],
      glm.quat.setAxisAngle(glm.quat.create(), [1,1,1], Math.PI * 0.25),
      [1,1,1], // box size
      [1, 0.0, 0.0],
      0.2,
      0.8,
      0,
      true,
      true
    );

    // {
    //   const vertices: glm.ReadonlyVec3[] = [];
    //   const indices: [number,number,number][] = [];

    //   vertices.push([-5, -2, 2]);
    //   vertices.push([+0, -2, 2]);
    //   vertices.push([-5, -2, 7]);
    //   indices.push([0,1,2]);

    //   const finalVertices: [glm.ReadonlyVec3, glm.ReadonlyVec3, glm.ReadonlyVec3][] = [];
    //   indices.forEach(([idx0, idx1, idx2]) => {
    //     finalVertices.push([vertices[idx0], vertices[idx1], vertices[idx2]]);
    //   });

    //   _createStaticMesh(physicWorld, finalVertices);
    // }


  }

  run(deltaTime: number, renderer: Renderer, physicWorld: physics.PhysicWorld) {

    this.ensureSceneData(physicWorld);

    physicWorld.stepSimulation(deltaTime, 4, 1/60);

    continuousTime += deltaTime;

    {

      { // center the light

        // const allPos: glm.vec3[] = [];
        // allSpheres.forEach((sphere) => {
        //   allPos.push(sphere.physicBody.getPosition());
        // });
        // allBoxes.forEach((box) => {
        //   allPos.push(box.physicBody.getPosition());
        // });

        // if (allPos.length > 0) {

        //   const targetPos = glm.vec3.create();
        //   targetPos[0] = 0;
        //   targetPos[1] = 0;
        //   targetPos[2] = 0;

        //   allPos.forEach((pos) => {
        //     glm.vec3.add(targetPos, targetPos, pos);
        //   });
        //   targetPos[0] /= allPos.length;
        //   targetPos[1] /= allPos.length;
        //   targetPos[2] /= allPos.length;

        //   // offset the light
        //   targetPos[0] += 2;
        //   targetPos[1] += 5;

        //   glm.vec3.lerp(g_lightPos, g_lightPos, targetPos, 0.03);
        // }


        // const angle = system.math.easing.easePinPong(system.math.easing.easeClamp(continuousTime * 0.5)) * Math.PI * 2;
        const angle = system.math.easing.easeClamp(continuousTime * 0.25) * Math.PI * 2;

        g_lightPos[0] = -4 + Math.cos(angle) * 2;
        g_lightPos[1] = 2 - Math.sin(angle) * 1;
        g_lightPos[2] = +2 + Math.sin(angle) * 2;

        // g_refractivePos[0] = -4 + Math.cos(angle + Math.PI) * 2;
        // g_refractivePos[1] = 2 - Math.sin(angle + Math.PI) * 1;
        // g_refractivePos[2] = +2 + Math.sin(angle + Math.PI) * 2;



      } // center the light

      allBoxes.forEach((box, index) => {

        const pos = box.physicBody.getPosition();

        // reset the boxes
        if (pos[1] < -12) {
          box.physicBody.setLinearVelocity(0,0,0);
          box.physicBody.setAngularVelocity(0,0,0);

          box.physicBody.setPosition(0, 10, 0);
        }
      });

      allSpheres.forEach((sphere, index) => {

        const pos = sphere.physicBody.getPosition();

        // reset the spheres
        if (pos[1] < -12) {
          sphere.physicBody.setLinearVelocity(0,0,0);
          sphere.physicBody.setAngularVelocity(0,0,0);

          sphere.physicBody.setPosition(0, 10, 0);
        }

      });

      {

        renderer.rayTracerRenderer.rayTracerPass.materialsManager.pushBasicMaterial({
          materialAlias: 666,
          color: [1, 1, 0],
          reflectionFactor: 0,
          refractionFactor: 0,
          // chessboardEnabled: 0,
          receiveLightEnabled: false,
          castShadowEnabled: false
        });

        // graphical presentation of the spot lights
        renderer.rayTracerRenderer.rayTracerPass.shapesManager.pushSphere({
          position: g_lightPos,
          orientation: glm.quat.identity(glm.quat.create()),
          radius: 0.06125,
          materialAlias: 666,
        });

        // actual spot lights
        renderer.rayTracerRenderer.rayTracerPass.spotLightsManager.pushSpotLight({
          position: g_lightPos,
          intensity: 1,
          radius: 15
        });

        { // light mask (made of triangles)

          const rotationCoef = system.math.easing.easeClamp(continuousTime * 0.125)
          const elevationCoef = system.math.easing.easePinPong(rotationCoef);

          const elevation = 0.3 + 1 * elevationCoef;

          const coverVertices: glm.vec3[] = [];
          coverVertices.push([+0.0, elevation + 0.0, +0.0]);
          coverVertices.push([+0.3, elevation - 0.6, +0.0]);
          coverVertices.push([+0.0, elevation - 0.6, +0.3]);
          coverVertices.push([-0.3, elevation - 0.6, -0.0]);
          coverVertices.push([-0.0, elevation - 0.6, -0.3]);

          // translate
          // rotate

          const tmpMat4 = glm.mat4.identity(glm.mat4.create());
          glm.mat4.translate(tmpMat4, tmpMat4, g_lightPos);
          glm.mat4.rotateY(tmpMat4, tmpMat4, Math.PI * rotationCoef * 8);

          coverVertices.forEach(currVertex => {
            glm.vec3.transformMat4(currVertex, currVertex, tmpMat4);
          })


          const indices: glm.ReadonlyVec3[] = [];
          indices.push([0,1,2]);
          indices.push([0,2,3]);
          indices.push([0,3,4]);
          indices.push([0,4,1]);

          const materialAlias_lightCoverTriangle = 6000;
          renderer.rayTracerRenderer.rayTracerPass.materialsManager.pushBasicMaterial({
            materialAlias: materialAlias_lightCoverTriangle,
              color: [0.5, 0.0, 0.5],
              reflectionFactor: 0.0,
              refractionFactor: 0.0,
              receiveLightEnabled: false,
              castShadowEnabled: true,
              // chessboardEnabled: 0,
          });

          indices.forEach(([idx0, idx1, idx2]) => {

            renderer.rayTracerRenderer.rayTracerPass.shapesManager.pushTriangle({
              v0: coverVertices[idx0],
              v1: coverVertices[idx1],
              v2: coverVertices[idx2],
              materialAlias: materialAlias_lightCoverTriangle,
            });
          });

        } // light mask (made of triangles)

        { // debug refractive planes

          const materialAlias_refractive1 = 1001;
          renderer.rayTracerRenderer.rayTracerPass.materialsManager.pushBasicMaterial({
            materialAlias: materialAlias_refractive1,
            color: [1.0,1.0,0.0],
            reflectionFactor: 0.0,
            refractionFactor: 0.8,
            castShadowEnabled: true,
            receiveLightEnabled: true,
            // chessboardEnabled: 0,
          });

          renderer.rayTracerRenderer.rayTracerPass.shapesManager.pushBox({
            position: [-9,2,2],
            orientation: glm.quat.identity(glm.quat.create()),
            boxSize: [0.05, 0.5, 1.5],
            materialAlias: materialAlias_refractive1,
          });

          const materialAlias_refractive2 = 1002;
          renderer.rayTracerRenderer.rayTracerPass.materialsManager.pushBasicMaterial({
            materialAlias: materialAlias_refractive2,
            color: [0.0,1.0,0.0],
            reflectionFactor: 0.0,
            refractionFactor: 0.8,
            castShadowEnabled: true,
            receiveLightEnabled: true,
            // chessboardEnabled: 0,
          });
          renderer.rayTracerRenderer.rayTracerPass.shapesManager.pushBox({
            position: [-9.2,2,2],
            orientation: glm.quat.identity(glm.quat.create()),
            boxSize: [0.05, 1.5, 0.5],
            materialAlias: materialAlias_refractive2,
          });

        } // debug refractive planes

      }

      {

        // // graphical presentation of the spot lights
        // renderer.rayTracerRenderer.rayTracerPass.shapesManager.pushSphere({
        //   position: g_refractivePos,
        //   orientation: glm.quat.identity(glm.quat.create()),
        //   radius: 1.0,
        //   color: [1, 1, 1],
        //   reflectionFactor: 0.0,
        //   refractionFactor: 1.0,
        //   chessboardEnabled: false,
        //   receiveLightEnabled: false,
        //   castShadowEnabled: false
        // });

      }

    }

    {
      // push scene


      // renderer.rayTracerRenderer.rayTracerPass.pushSunLight({
      //   direction: [1.0, 1.0, 1.0],
      //   intensity: 0.5
      // });

      allBoxes.forEach((currBox, index) => {

        const position = currBox.physicBody.getPosition();
        const rotation = currBox.physicBody.getRotation();

        // console.log('position', position);

        let materialAlias_generic = 2001 + index;

        if (currBox.chessboardMaterial === 0) {
          renderer.rayTracerRenderer.rayTracerPass.materialsManager.pushBasicMaterial({
            materialAlias: materialAlias_generic,
            color: currBox.color,
            refractionFactor: currBox.refractionFactor,
            reflectionFactor: currBox.reflectionFactor,
            // chessboardEnabled: currBox.chessboardMaterial,
            receiveLightEnabled: currBox.receiveLightEnabled,
            castShadowEnabled: currBox.castShadowEnabled,
            // chessboardArgs: currBox.chessboardArgs,
          });
        }
        else
        {
          renderer.rayTracerRenderer.rayTracerPass.materialsManager.pushBasicMaterial({
            materialAlias: 3001 + index * 2 + 0,
            color: currBox.color,
            // refractionFactor: currBox.refractionFactor,
            // reflectionFactor: currBox.reflectionFactor,
            refractionFactor: 0,
            reflectionFactor: 0,
            receiveLightEnabled: currBox.receiveLightEnabled,
            castShadowEnabled: currBox.castShadowEnabled,
          });
          renderer.rayTracerRenderer.rayTracerPass.materialsManager.pushBasicMaterial({
            materialAlias: 3001 + index * 2 + 1,
            color: [0,0,0],
            refractionFactor: 0,
            reflectionFactor: 0,
            receiveLightEnabled: true,
            castShadowEnabled: true,
          });
          renderer.rayTracerRenderer.rayTracerPass.materialsManager.pushChessboardMaterial({
            materialAlias: materialAlias_generic,
            castShadowEnabled: true,
            materialAliasA: 3001 + index * 2 + 0,
            materialAliasB: 3001 + index * 2 + 1,
          });
        }

        // floor
        renderer.rayTracerRenderer.rayTracerPass.shapesManager.pushBox({
          position: position,
          orientation: rotation,
          boxSize: currBox.boxSize,
          materialAlias: materialAlias_generic,
        });

      });

      allSpheres.forEach((currSphere, index) => {

        const position = currSphere.physicBody.getPosition();
        const rotation = currSphere.physicBody.getRotation();

        if ((index % 2) === 0) {

          const lightCoef = system.math.easing.easePinPong(system.math.easing.easeClamp(continuousTime * 0.5));
          // const lightCoef = 1;

          const blinkColor = 0.1 + lightCoef * 0.9;
          // const blinkColor = 1;


          const shapeCoef1 = system.math.easing.easePinPong(system.math.easing.easeClamp(continuousTime * 0.125));
          const shapeCoef2 = system.math.easing.easeInOutSine(shapeCoef1);

          const currColorMask: glm.vec3 = [1,1,1];
          currColorMask[0] = system.math.lerp(shapeCoef2, 1, 0);
          currColorMask[1] = system.math.lerp(shapeCoef2, 0, 0);
          currColorMask[2] = system.math.lerp(shapeCoef2, 1, 1);

          // renderer.rayTracerRenderer.rayTracerPass.materialsManager.pushBasicMaterial({
          //   materialAlias: 667,
          //   color: [1, 0, 1],
          //   reflectionFactor: 0.0,
          //   // refractionFactor: 0.9,
          //   refractionFactor: lightCoef * 1.0,
          //   // chessboardEnabled: 2,
          //   receiveLightEnabled: true,
          //   castShadowEnabled: true,
          //   // chessboardArgs: [
          //   //   // 1 - blinkColor,
          //   //   // 1 - blinkColor,
          //   //   // 1 - blinkColor
          //   //   0.9,
          //   //   0.9,
          //   //   0.9,
          //   // ]
          // });

          renderer.rayTracerRenderer.rayTracerPass.materialsManager.pushBasicMaterial({
            materialAlias: 1111,
            color: [currColorMask[0], currColorMask[1], currColorMask[2]],
            reflectionFactor: 0.0,
            // refractionFactor: 0.1 + lightCoef * 0.9,
            refractionFactor: 0.9,
            // refractionFactor: 0.0,
            receiveLightEnabled: true,
            castShadowEnabled: true,
          });
          renderer.rayTracerRenderer.rayTracerPass.materialsManager.pushBasicMaterial({
            materialAlias: 1112,
            color: [1, 1, 1],
            reflectionFactor: 0.0,
            refractionFactor: 0.0,
            receiveLightEnabled: true,
            castShadowEnabled: true,
          });
          renderer.rayTracerRenderer.rayTracerPass.materialsManager.pushChessboardMaterial({
            materialAlias: 1113,
            castShadowEnabled: true,
            materialAliasA: 1111,
            materialAliasB: 1112,
            chessboardArgs: [
              1 - (0.1 + shapeCoef2 * 0.9),
              1 - (0.1 + shapeCoef2 * 0.9),
              1 - (0.1 + shapeCoef2 * 0.9),
            ],
          });

          // PURPLE SPHERE HERE
          // -> sphere with transparent chessboard material
          renderer.rayTracerRenderer.rayTracerPass.shapesManager.pushSphere({
            position: position,
            orientation: rotation,
            radius: 1.0,
            // materialAlias: 667,
            materialAlias: 1113,
          });


          // graphical presentation of the spot lights
          renderer.rayTracerRenderer.rayTracerPass.materialsManager.pushBasicMaterial({
            materialAlias: 668,
            // color: [blinkColor, blinkColor, 0],
            color: [blinkColor*currColorMask[0], blinkColor*currColorMask[1], blinkColor*currColorMask[2]],
            reflectionFactor: 0,
            refractionFactor: 0,
            receiveLightEnabled: false,
            castShadowEnabled: false
          });
          renderer.rayTracerRenderer.rayTracerPass.shapesManager.pushSphere({
            position: position,
            orientation: rotation,
            // radius: 0.899,
            // radius: 0.6,
            radius: blinkColor * 0.9,
            materialAlias: 668,
          });

          // actual spot light inside the sphere
          renderer.rayTracerRenderer.rayTracerPass.spotLightsManager.pushSpotLight({
            position: position,
            intensity: 0.1 + 3.9 * lightCoef,
            radius: 10,
          });

        } else {

          // refractive and reflective sphere
          renderer.rayTracerRenderer.rayTracerPass.materialsManager.pushBasicMaterial({
            materialAlias: 669,
            color: [1, 1, 1],
            reflectionFactor: 0.8,
            refractionFactor: 0.8,
            receiveLightEnabled: true,
            castShadowEnabled: true
          });
          renderer.rayTracerRenderer.rayTracerPass.shapesManager.pushSphere({
            position: position,
            orientation: rotation,
            radius: 1.5,
            materialAlias: 669,
          });

        }

      });


      /**/
      // background reflective blue sphere

      renderer.rayTracerRenderer.rayTracerPass.materialsManager.pushBasicMaterial({
        materialAlias: 888,
        color: [0, 0, 1],
        reflectionFactor: 0.8,
        refractionFactor: 0.0,
        // chessboardEnabled: 0,
        receiveLightEnabled: true,
        castShadowEnabled: true
      });

      renderer.rayTracerRenderer.rayTracerPass.shapesManager.pushSphere({
        position: [-5, 0, -7],
        orientation: glm.quat.identity(glm.quat.create()),
        radius: 5,
        materialAlias: 888,
      });
      //*/

      // {
      //   allMeshes.forEach((meshTriangles) => {

      //     meshTriangles.forEach((vertices) => {

      //       renderer.rayTracerRenderer.rayTracerPass.shapesManager.pushTriangle({
      //         v0: vertices[0],
      //         v1: vertices[1],
      //         v2: vertices[2],
      //         color: [1.0, 0.5, 0.5],
      //         reflectionFactor: 0.0,
      //         refractionFactor: 0.0,
      //         receiveLightEnabled: true,
      //         castShadowEnabled: true
      //       });
      //     })

      //   });
      // }

      {
        const vertices: glm.ReadonlyVec3[] = [
          [ -10, -1+  0.0, +2+ 1.0], // 0
          [ -10, -1+  0.5, +2+ 0.5], // 1
          [ -10, -1+  0.0, +2+ 0.0], // 2
          [ -10, -1+  0.5, +2+ 1.5], // 3
          [ -10, -1+  0.0, +2+ 2.0], // 4
          [ -10, -1+ -1.0, +2+ 1.0], // 5
        ];

        // simple reflective triangle
        const materialAlias_heartTriangle = 4000;
        renderer.rayTracerRenderer.rayTracerPass.materialsManager.pushBasicMaterial({
          materialAlias: materialAlias_heartTriangle,
          color: [1.0, 0.5, 0.5],
          reflectionFactor: 0.0,
          refractionFactor: 0.0,
          receiveLightEnabled: true,
          castShadowEnabled: true,
          // chessboardEnabled: 0,
        });
        renderer.rayTracerRenderer.rayTracerPass.shapesManager.pushTriangle({
          v0: vertices[0],
          v1: vertices[1],
          v2: vertices[2],
          materialAlias: materialAlias_heartTriangle,
        });
        renderer.rayTracerRenderer.rayTracerPass.shapesManager.pushTriangle({
          v0: vertices[0],
          v1: vertices[4],
          v2: vertices[3],
          materialAlias: materialAlias_heartTriangle,
        });
        renderer.rayTracerRenderer.rayTracerPass.shapesManager.pushTriangle({
          v0: vertices[2],
          v1: vertices[5],
          v2: vertices[4],
          materialAlias: materialAlias_heartTriangle,
        });

        // heart border
        const allPos: glm.ReadonlyVec3[] = [];
        allPos.push([-10, -1+0.5, +2+ 0]);
        allPos.push([-10, -1+1.0, +2+ 0.5]);
        allPos.push([-10, -1+0.5, +2+ 1]);
        allPos.push([-10, -1+1.0, +2+ 1.5]);
        allPos.push([-10, -1+0.5, +2+ 2]);

        const materialAlias_wallBoxes = 5000;
        renderer.rayTracerRenderer.rayTracerPass.materialsManager.pushBasicMaterial({
          materialAlias: materialAlias_wallBoxes,
            color: [1.0,0.5,0.5],
            reflectionFactor: 0.0,
            castShadowEnabled: true,
            receiveLightEnabled: true,
            refractionFactor: 0,
            // chessboardEnabled: 0,
        });

        for (const currPos of allPos) {
          renderer.rayTracerRenderer.rayTracerPass.shapesManager.pushBox({
            position: currPos,
            orientation: glm.quat.setAxisAngle(glm.quat.create(), [1,0,0], Math.PI * 0.25),
            boxSize: [0.05, 0.25, 0.25],
            materialAlias: materialAlias_wallBoxes,
          });
        }

      }


      /**
      {

        // const radius = 2;
        const center: glm.ReadonlyVec3 = [-2,-0.5,3];

        const X = 0.525731112119133606;
        const Z = 0.850650808352039932;
        const N = 0.0;

        const positions: ReadonlyArray<glm.ReadonlyVec3> = [
          [-X, N, Z],
          [X, N, Z],
          [-X, N, -Z],
          [X, N, -Z],
          [N, Z, X],
          [N, Z, -X],
          [N, -Z, X],
          [N, -Z, -X],
          [Z, X, N],
          [-Z, X, N],
          [Z, -X, N],
          [-Z, -X, N]
        ];

        const indices: ReadonlyArray<glm.ReadonlyVec3> = [
          [0, 4, 1],
          [0, 9, 4],
          [9, 5, 4],
          [4, 5, 8],
          [4, 8, 1],
          [8, 10, 1],
          [8, 3, 10],
          [5, 3, 8],
          [5, 2, 3],
          [2, 7, 3],
          [7, 10, 3],
          [7, 6, 10],
          [7, 11, 6],
          [11, 0, 6],
          [0, 1, 6],
          [6, 1, 10],
          [9, 0, 11],
          [9, 11, 2],
          [9, 2, 5],
          [7, 2, 11]
        ];

        const v1ex = glm.vec3.create();
        const v2ex = glm.vec3.create();
        const v3ex = glm.vec3.create();

        for (const index of indices) {
          const v1: glm.ReadonlyVec3 = positions[index[0]];
          const v2: glm.ReadonlyVec3 = positions[index[1]];
          const v3: glm.ReadonlyVec3 = positions[index[2]];

          const v12: glm.vec3 = [
            system.math.lerp(0.5, v1[0], v2[0]),
            system.math.lerp(0.5, v1[1], v2[1]),
            system.math.lerp(0.5, v1[2], v2[2]),
          ];
          const v23: glm.vec3 = [
            system.math.lerp(0.5, v2[0], v3[0]),
            system.math.lerp(0.5, v2[1], v3[1]),
            system.math.lerp(0.5, v2[2], v3[2]),
          ];
          const v31: glm.vec3 = [
            system.math.lerp(0.5, v3[0], v1[0]),
            system.math.lerp(0.5, v3[1], v1[1]),
            system.math.lerp(0.5, v3[2], v1[2]),
          ];

          glm.vec3.normalize(v12, v12);
          glm.vec3.normalize(v23, v23);
          glm.vec3.normalize(v31, v31);



          {
            glm.vec3.add(v1ex, v1, center);
            glm.vec3.add(v2ex, v2, center);
            glm.vec3.add(v3ex, v3, center);
            glm.vec3.add(v12, v12, center);
            glm.vec3.add(v23, v23, center);
            glm.vec3.add(v31, v31, center);
          }


          renderer.rayTracerRenderer.rayTracerPass.shapesManager.pushTriangle({
            v0: v1ex,
            v1: v12,
            v2: v31,
            color: [1.0, 1.0, 0.5],
            reflectionFactor: 0.0,
            receiveLightEnabled: true,
            castShadowEnabled: true
          });
          renderer.rayTracerRenderer.rayTracerPass.shapesManager.pushTriangle({
            v0: v2ex,
            v1: v12,
            v2: v23,
            color: [1.0, 1.0, 0.5],
            reflectionFactor: 0.0,
            receiveLightEnabled: true,
            castShadowEnabled: true
          });
          renderer.rayTracerRenderer.rayTracerPass.shapesManager.pushTriangle({
            v0: v3ex,
            v1: v31,
            v2: v23,
            color: [1.0, 1.0, 0.5],
            reflectionFactor: 0.0,
            receiveLightEnabled: true,
            castShadowEnabled: true
          });

        }

        // // actual spot light inside the sphere
        // renderer.rayTracerRenderer.rayTracerPass.pushSpotLight({
        //   position: center,
        //   intensity: 1,
        //   radius: 15
        // });


      }
      //*/

      // // refractive blue box
      // renderer.rayTracerRenderer.rayTracerPass.shapesManager.pushBox({
      //   position: [-5, 2, +7],
      //   // orientation: glm.quat.identity(glm.quat.create()),
      //   orientation: glm.quat.setAxisAngle(glm.quat.create(), [1,0,0], Math.PI * 0.25),
      //   boxSize: [1,1,1],
      //   color: [1,1,1],
      //   reflectionFactor: 0.3,
      //   refractionFactor: 0.6,
      //   chessboardEnabled: false,
      //   receiveLightEnabled: true,
      //   castShadowEnabled: true
      // });

    } // push scene
  }
}
