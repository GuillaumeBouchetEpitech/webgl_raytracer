
import { system } from '@local-framework';

import { Renderer } from '../graphics/Renderer';

import { physics } from '@physic-engine-browser';

import * as glm from 'gl-matrix';


let continuousTime: number = 0;

interface BoxObject {
  boxSize: glm.ReadonlyVec3;
  color: glm.ReadonlyVec3;
  reflectionFactor: number;
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
) => {

  const physicBody = physicWorld.createRigidBody({
    mass: 0, // static
    shape: { type: 'box', size: [boxSize[0] * 2, boxSize[1] * 2, boxSize[2] * 2] },
  });
  physicBody.setPosition(position[0], position[1], position[2]);
  physicBody.setRotation(orientation[0], orientation[1], orientation[2], orientation[3]);
  physicBody.setRestitution(0.7); // bouncing
  physicBody.setFriction(1); // so the sphere doesn't slide but roll on it

  allBoxes.push({ boxSize, color, reflectionFactor, physicBody });
};


const _createSphere = (
  physicWorld: physics.PhysicWorld,
  position: glm.ReadonlyVec3,
  // orientation: glm.ReadonlyQuat,
  radius: number,
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
  physicBody.setRestitution(0.7); // bouncing
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
    );

    // downhill on Z
    _createBox(
      physicWorld,
      [-7,-5,2],
      glm.quat.setAxisAngle(glm.quat.create(), [1,0,0], Math.PI * 1/32),
      [2,1,4],
      [1, 1, 1],
      0.5
    );
    // first ramp on Y
    _createBox(
      physicWorld,
      [-10,-3.5,2],
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


    _createSphere(
      physicWorld,
      [0,10,0],
      1.5
    );



  }

  run(deltaTime: number, renderer: Renderer, physicWorld: physics.PhysicWorld) {

    this.ensureSceneData(physicWorld);

    physicWorld.stepSimulation(deltaTime, 0, deltaTime);

    continuousTime += deltaTime;

    {
      allSpheres.forEach((sphere) => {

        const pos = sphere.physicBody.getPosition();

        if (pos[1] < -10) {
          sphere.physicBody.setLinearVelocity(0,0,0);
          sphere.physicBody.setAngularVelocity(0,0,0);

          sphere.physicBody.setPosition(0, 10, 0);
        }

        const targetPos: glm.ReadonlyVec3 = [pos[0] + 10, pos[1] + 10, pos[2]];

        glm.vec3.lerp(g_lightPos, g_lightPos, targetPos, 0.03);

        // g_lightPos


        // graphical presentation of the spot lights
        renderer.rayTracerRenderer.pushSphere({
          position: g_lightPos,
          orientation: glm.quat.identity(glm.quat.create()),
          radius: 0.5,
          color: [1, 1, 0],
          reflectionFactor: 0,
          chessboardEnabled: false,
          receiveLightEnabled: false,
          castShadowEnabled: false
        });

        // actual spot lights
        renderer.rayTracerRenderer.pushSpotLight({
          position: g_lightPos,
          intensity: 1,
          radius: 25
        });

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
          reflectionFactor: currBox.reflectionFactor,
          chessboardEnabled: false,
          receiveLightEnabled: true,
          castShadowEnabled: true
        });

      });

      allSpheres.forEach((currSphere) => {

        const position = currSphere.physicBody.getPosition();
        const rotation = currSphere.physicBody.getRotation();

        // actual spot lights
        renderer.rayTracerRenderer.pushSpotLight({
          position: position,
          intensity: 0.1 + 4.9 * system.math.easing.easePinPong(system.math.easing.easeClamp(continuousTime * 0.5)),
          radius: 10
        });
        renderer.rayTracerRenderer.pushSphere({
          position: position,
          orientation: rotation,
          radius: 1.5,
          color: [1, 1, 1],
          reflectionFactor: 0.5,
          chessboardEnabled: true,
          receiveLightEnabled: false,
          castShadowEnabled: true
        });

      });



      renderer.rayTracerRenderer.pushSphere({
        position: [-5, 0, -7],
        orientation: glm.quat.identity(glm.quat.create()),
        radius: 5,
        color: [0, 0, 1],
        reflectionFactor: 0.8,
        chessboardEnabled: false,
        receiveLightEnabled: true,
        castShadowEnabled: true
      });




    } // push scene
  }
}
