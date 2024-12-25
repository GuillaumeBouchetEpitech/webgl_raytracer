
import { system } from '@local-framework';

import { Renderer } from '../graphics/Renderer';

import { physics } from '@physic-engine-browser';

import * as glm from 'gl-matrix';


let continuousTime: number = 0;

interface BoxObject {
  boxSize: glm.ReadonlyVec3;
  color: glm.ReadonlyVec3;
  reflectionFactor: number;
  refractionFactor: number;
  physicBody: physics.IPhysicBody;
};

interface SphereObject {
  radius: number;
  physicBody: physics.IPhysicBody;
};

const allBoxes: BoxObject[] = [];
const allSpheres: SphereObject[] = [];


const g_lightPos: glm.vec3 = [0,0,20]


const _createBox = (
  physicWorld: physics.PhysicWorld,
  position: glm.ReadonlyVec3,
  orientation: glm.ReadonlyQuat,
  boxSize: glm.ReadonlyVec3,
  color: glm.ReadonlyVec3,
  reflectionFactor: number,
  refractionFactor: number = 0,
) => {

  const physicBody = physicWorld.createRigidBody({
    mass: 0, // static
    shape: { type: 'box', size: [boxSize[0] * 2, boxSize[1] * 2, boxSize[2] * 2] },
  });
  physicBody.setPosition(position[0], position[1], position[2]);
  physicBody.setRotation(orientation[0], orientation[1], orientation[2], orientation[3]);
  physicBody.setRestitution(0.7); // bouncing
  physicBody.setFriction(1); // so the sphere doesn't slide but roll on it

  allBoxes.push({ boxSize, color, reflectionFactor, physicBody, refractionFactor });
};

const _createBox2 = (
  physicWorld: physics.PhysicWorld,
  position: glm.ReadonlyVec3,
  orientation: glm.ReadonlyQuat,
  boxSize: glm.ReadonlyVec3,
  color: glm.ReadonlyVec3,
  reflectionFactor: number,
  refractionFactor: number,
) => {

  const physicBody = physicWorld.createRigidBody({
    mass: 1, // static
    shape: { type: 'box', size: [boxSize[0] * 2, boxSize[1] * 2, boxSize[2] * 2] },
  });
  physicBody.setPosition(position[0], position[1], position[2]);
  physicBody.setRotation(orientation[0], orientation[1], orientation[2], orientation[3]);
  physicBody.setRestitution(0.5); // bouncing
  physicBody.setFriction(0); // so the sphere doesn't slide but roll on it

  allBoxes.push({ boxSize, color, reflectionFactor, physicBody, refractionFactor });
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
  });
  physicBody.setPosition(position[0], position[1], position[2]);
  // physicBody.setRotation(orientation[0], orientation[1], orientation[2], orientation[3]);
  physicBody.setFriction(1); // so the sphere doesn't slide but roll on it
  physicBody.setRestitution(bouncing); // bouncing
  physicBody.disableDeactivation(); // so the sphere doesn't ever freeze if too slow

  allSpheres.push({ radius, physicBody });
}


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
      0.5
      // 0.0
    );

    // downhill on Z
    _createBox(
      physicWorld,
      [-7,-5,0],
      glm.quat.setAxisAngle(glm.quat.create(), [1,0,0], Math.PI * 1/32),
      [2,1,2],
      [1, 1, 1],
      0.5
      // 0.0
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
      [-12,-2,2],
      glm.quat.setAxisAngle(glm.quat.create(), [0,1,0], Math.PI * -1/16),
      [0.5,4,4],
      [0.5, 1, 0.5],
      0
    );


    // downhill on X (2)
    _createBox(
      physicWorld,
      [-3,-6,+4],
      glm.quat.setAxisAngle(glm.quat.create(), [0,0,1], Math.PI * -1/32),
      [6,1,2],
      [1, 1, 1],
      0.5
      // 0.0
    );

    // some pillar on X (0?)
    _createBox(
      physicWorld,
      [-7.8,-3.0,5.5],
      glm.quat.setAxisAngle(glm.quat.create(), [0,1,0], Math.PI * -0.125),
      [1.5,0.25,0.25],
      [0.5, 1, 0.5],
      0
    );
    // some pillar on X (02?)
    _createBox(
      physicWorld,
      [-3.8,-3.5,6.5],
      glm.quat.setAxisAngle(glm.quat.create(), [0,0,1], Math.PI * -1/32),
      [2.5,0.25,0.25],
      [0.5, 1, 0.5],
      0
    );

    // some pillar on X (1)
    _createBox(
      physicWorld,
      [-6,-3.5,7],
      glm.quat.setAxisAngle(glm.quat.create(), [1,0,0], Math.PI * 0),
      [0.25,4,0.25],
      [0.5, 1, 0.5],
      0
    );
    // some pillar on X (2)
    _createBox(
      physicWorld,
      [-4.5,-3.5,7],
      glm.quat.setAxisAngle(glm.quat.create(), [1,0,0], Math.PI * 0),
      [0.25,4,0.25],
      [0.5, 1, 0.5],
      0
    );
    // some pillar on X (2)
    _createBox(
      physicWorld,
      [-3,-3.5,7],
      glm.quat.setAxisAngle(glm.quat.create(), [1,0,0], Math.PI * 0),
      [0.25,4,0.25],
      [0.5, 1, 0.5],
      0
    );

    // white flat floor
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

    _createBox2(
      physicWorld,
      [-4,10,0],
      glm.quat.setAxisAngle(glm.quat.create(), [1,0,0], Math.PI * 0),
      [1,1,1],
      [1, 0, 0],
      0.3,
      0.6
    );



  }

  run(deltaTime: number, renderer: Renderer, physicWorld: physics.PhysicWorld) {

    this.ensureSceneData(physicWorld);

    physicWorld.stepSimulation(deltaTime, 0, deltaTime);

    continuousTime += deltaTime;

    {
      allBoxes.forEach((box, index) => {

        const pos = box.physicBody.getPosition();

        if (pos[1] < -12) {
          box.physicBody.setLinearVelocity(0,0,0);
          box.physicBody.setAngularVelocity(0,0,0);

          box.physicBody.setPosition(0, 10, 0);
        }
      });

      {

        const allPos: glm.vec3[] = [];
        allSpheres.forEach((sphere) => {
          const pos = sphere.physicBody.getPosition();
          allPos.push(pos);
        });
        allBoxes.forEach((box) => {
          const pos = box.physicBody.getPosition();
          allPos.push(pos);
        });

        if (allPos.length > 0) {

          const targetPos = glm.vec3.create();
          targetPos[0] = 0;
          targetPos[1] = 0;
          targetPos[2] = 0;

          allPos.forEach((pos) => {
            glm.vec3.add(targetPos, targetPos, pos);
          });
          targetPos[0] /= allPos.length;
          targetPos[1] /= allPos.length;
          targetPos[2] /= allPos.length;

          targetPos[0] += 2;
          targetPos[1] += 5;

          glm.vec3.lerp(g_lightPos, g_lightPos, targetPos, 0.03);
        }


      }

      allSpheres.forEach((sphere, index) => {

        const pos = sphere.physicBody.getPosition();

        if (pos[1] < -12) {
          sphere.physicBody.setLinearVelocity(0,0,0);
          sphere.physicBody.setAngularVelocity(0,0,0);

          sphere.physicBody.setPosition(0, 10, 0);
        }

        // const targetPos: glm.ReadonlyVec3 = [pos[0] + 2, pos[1] + 5, pos[2]];

        // glm.vec3.lerp(g_lightPos, g_lightPos, targetPos, 0.03);

        // g_lightPos


        if ((index % 2) == 0) {

          // graphical presentation of the spot lights
          renderer.rayTracerRenderer.pushSphere({
            position: g_lightPos,
            orientation: glm.quat.identity(glm.quat.create()),
            radius: 0.5,
            color: [1, 1, 0],
            reflectionFactor: 0,
            refractionFactor: 0,
            chessboardEnabled: false,
            receiveLightEnabled: false,
            castShadowEnabled: false
          });

          // actual spot lights
          renderer.rayTracerRenderer.pushSpotLight({
            position: g_lightPos,
            intensity: 1,
            radius: 15
          });
        }

      });
    }

    {
      // push scene


      // renderer.rayTracerRenderer.pushSunLight({
      //   direction: [1.0, 1.0, 1.0],
      //   intensity: 0.5
      // });

      allBoxes.forEach((currBox) => {

        const position = currBox.physicBody.getPosition();
        const rotation = currBox.physicBody.getRotation();

        // console.log('position', position);

        // floor
        renderer.rayTracerRenderer.pushBox({
          position: position,
          orientation: rotation,
          boxSize: currBox.boxSize,
          color: currBox.color,
          refractionFactor: currBox.refractionFactor,
          reflectionFactor: currBox.reflectionFactor,
          chessboardEnabled: false,
          receiveLightEnabled: true,
          castShadowEnabled: true
        });

      });

      allSpheres.forEach((currSphere, index) => {

        const position = currSphere.physicBody.getPosition();
        const rotation = currSphere.physicBody.getRotation();

        if ((index % 2) === 0) {

          // sphere with transparent chessboard material
          renderer.rayTracerRenderer.pushSphere({
            position: position,
            orientation: rotation,
            radius: 1.0,
            color: [1, 1, 1],
            reflectionFactor: 0.0,
            refractionFactor: 0.0,
            chessboardEnabled: true,
            receiveLightEnabled: false,
            castShadowEnabled: true
          });

          // actual spot light inside the sphere
          renderer.rayTracerRenderer.pushSpotLight({
            position: position,
            intensity: 0.1 + 4.9 * system.math.easing.easePinPong(system.math.easing.easeClamp(continuousTime * 0.5)),
            radius: 10
          });

        } else {

          // refractive (and reflective) sphere
          renderer.rayTracerRenderer.pushSphere({
            position: position,
            orientation: rotation,
            radius: 1.5,
            color: [1, 1, 1],
            reflectionFactor: 0.3,
            refractionFactor: 0.6,
            chessboardEnabled: true,
            receiveLightEnabled: false,
            castShadowEnabled: true
          });

        }

      });



      // reflective blue sphere
      renderer.rayTracerRenderer.pushSphere({
        position: [-5, 0, -7],
        orientation: glm.quat.identity(glm.quat.create()),
        radius: 5,
        color: [0, 0, 1],
        reflectionFactor: 0.8,
        refractionFactor: 0.0,
        chessboardEnabled: false,
        receiveLightEnabled: true,
        castShadowEnabled: true
      });

      // // refractive blue box
      // renderer.rayTracerRenderer.pushBox({
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
