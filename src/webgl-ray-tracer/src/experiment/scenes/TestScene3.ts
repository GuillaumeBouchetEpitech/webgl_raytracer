
import { system, graphics } from '@local-framework';

import { Renderer } from '../graphics/Renderer';

import { physics } from 'FrankenPhys';

import * as glm from 'gl-matrix';


let continuousTime: number = 0;

interface BasicMaterial {
  color: glm.ReadonlyVec3;
  reflectionFactor?: number;
  refractionFactor?: number;
  receiveLightEnabled?: boolean;
  castShadowEnabled?: boolean;
}
interface ChessMaterial {
  materialA: BasicMaterial,
  materialB: BasicMaterial,
  chessboardArgs?: glm.ReadonlyVec3,
}

const _isBasicMaterial = (data: any): data is BasicMaterial => {
  return data.color !== undefined;
}
const _isChessMaterial = (data: any): data is ChessMaterial => {
  return data.materialA !== undefined && data.materialB !== undefined;
}

interface BoxObject {
  physicBody: physics.IPhysicBody;
  boxSize: glm.ReadonlyVec3;
  material: BasicMaterial | ChessMaterial;
};

interface SphereObject {
  physicBody: physics.IPhysicBody;
  radius: number;
  material: BasicMaterial | ChessMaterial;
};

const allBoxes: BoxObject[] = [];


const g_lightPos: glm.vec3 = [0,0,20]


const _createBox2 = (
  physicWorld: physics.PhysicWorld,
  opts: {
    position: glm.ReadonlyVec3,
    orientation?: glm.ReadonlyQuat,
    boxSize: glm.ReadonlyVec3,
    material: BasicMaterial | ChessMaterial;
    mass?: number,
    restitution?: number,
    friction?: number,
  }
) => {

  const physicBody = physicWorld.createRigidBody({
    mass: opts.mass ?? 0,
    shape: {
      type: 'box',
      size: [
        opts.boxSize[0] * 2.0,
        opts.boxSize[1] * 2.0,
        opts.boxSize[2] * 2.0
      ]
    },
    position: opts.position,
    orientation: opts.orientation ?? glm.quat.identity(glm.quat.create()),
  });
  physicBody.setRestitution(opts.restitution ?? 0.0); // bouncing
  physicBody.setFriction(opts.friction ?? 0); // so the box doesn't slide but roll on it
  physicBody.disableDeactivation(); // do not fall asleep when too slow

  allBoxes.push({
    physicBody,
    boxSize: opts.boxSize,
    material: opts.material,
  });
};


// TODO
// TODO
// TODO
// const _createMaterial = () => {
// }
// const _createPhysicBody = () => {
// }
// TODO
// TODO
// TODO


const _createSphere = (
  physicWorld: physics.PhysicWorld,
  opts: {
    position: glm.ReadonlyVec3,
    radius: number,
    material: BasicMaterial | ChessMaterial;
    mass?: number,
    restitution?: number,
    friction?: number,
  }
): SphereObject => {
  // const radius = 1;

  let physicalRadius = opts.radius;

  // slightly larger physical sphere
  // -> this fixes potential refraction graphic artifact
  physicalRadius += 0.05;

  // dynamic falling sphere
  const physicBody = physicWorld.createRigidBody({
    mass: 1, // dynamic
    shape: {
      type: 'sphere',
      radius: physicalRadius
    },
    position: opts.position,
    orientation: glm.quat.identity(glm.quat.create()),
  });
  physicBody.setFriction(1); // so the sphere doesn't slide but roll on it
  physicBody.setRestitution(opts.restitution ?? 0); // bouncing
  physicBody.disableDeactivation(); // so the sphere doesn't ever freeze if "too slow"

  return {
    physicBody,
    radius: opts.radius,
    material: opts.material,
  };
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


let sphere1_chessLight: SphereObject | undefined;
let sphere2_fresnelMarble: SphereObject | undefined;


export class TestScene3 {
  ensureSceneData(physicWorld: physics.PhysicWorld) {

    // downhill on X
    _createBox2(
      physicWorld,
      {
        position: [-1,-4,0],
        orientation: glm.quat.setAxisAngle(glm.quat.create(), [0,0,1], Math.PI * 1/32),
        boxSize: [4,1,2],
        material: {
          materialA: { color: [1,1,1] },
          materialB: { color: [0.2,0.2,0.5] },
        },
        friction: 1,
        restitution: 0.7,
      }
    );

    // downhill on Z
    _createBox2(
      physicWorld,
      {
        position: [-7,-5,0],
        orientation: glm.quat.setAxisAngle(glm.quat.create(), [1,0,0], Math.PI * 1/32),
        boxSize: [2,1,2],
        material: {
          materialA: { color: [1,1,1] },
          materialB: { color: [0.2,0.2,0.5] },
        },
        friction: 1,
        restitution: 0.7,
      }
    );
    // first ramp on Y
    _createBox2(
      physicWorld,
      {
        position: [-10,-3.0,2],
        orientation: glm.quat.setAxisAngle(glm.quat.create(), [1,0,0], Math.PI * 1/32),
        boxSize: [0.25,0.25,4],
        material: {
          color: [0.5, 1, 0.5],
        },
        friction: 1,
        restitution: 0.7,
      }
    );

    // first wall on Y
    _createBox2(
      physicWorld,
      {
        position: [-12,-1,2],
        orientation: glm.quat.setAxisAngle(glm.quat.create(), [0,1,0], Math.PI * -1/16),
        boxSize: [0.5,5,4],
        material: {
          color: [1, 1, 1],
        },
        friction: 1,
        restitution: 0.7,
      }
    );


    // downhill on X (2)
    _createBox2(
      physicWorld,
      {
        position: [-3,-6,+4],
        orientation: glm.quat.setAxisAngle(glm.quat.create(), [0,0,1], Math.PI * -1/32),
        boxSize: [6,1,2],
        material: {
          materialA: { color: [1,1,1] },
          materialB: { color: [0.2,0.2,0.5] },
        },
        friction: 1,
        restitution: 0.7,
      },
    );

    // some ramp (angled)
    _createBox2(
      physicWorld,
      {
        position: [-7.8,-3.0,5.5],
        orientation: glm.quat.setAxisAngle(glm.quat.create(), [0,1,0], Math.PI * -0.125),
        boxSize: [1.5,0.25,0.25],
        material: {
          color: [0.5, 1, 0.5],
        },
        friction: 1,
        restitution: 0.7,
      }
    );

    // some ramp (downhill)
    _createBox2(
      physicWorld,
      {
        position: [-3.8,-3.5,6.5],
        orientation: glm.quat.setAxisAngle(glm.quat.create(), [0,0,1], Math.PI * -1/32),
        boxSize: [2.5,0.25,0.25],
        material: {
          color: [0.5, 1, 0.5],
        },
        friction: 1,
        restitution: 0.7,
      }
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
      {
        position: [-6,-3.5,7],
        orientation: glm.quat.setAxisAngle(glm.quat.create(), [1,0,0], Math.PI * 0),
        boxSize: [0.25,4,0.25],
        material: {
          color: [0.5, 1, 0.5],
        },
        mass: 0
      }
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
      {
        position: [-4.5,-3.5,7],
        orientation: glm.quat.setAxisAngle(glm.quat.create(), [1,0,0], Math.PI * 0),
        boxSize: [0.25,4,0.25],
        material: {
          color: [0.5, 1, 0.5],
        },
        mass: 0
      }
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
      {
        position: [-3,-3.5,7],
        orientation: glm.quat.setAxisAngle(glm.quat.create(), [1,0,0], Math.PI * 0),
        boxSize: [0.25,4,0.25],
        material: {
          color: [0.5, 1, 0.5],
        },
        mass: 0
      }
    );

    // some flat floor for the 3 pillars shadows
    _createBox2(
      physicWorld,
      {
        position: [-4,-6.5,9.5],
        orientation: glm.quat.setAxisAngle(glm.quat.create(), [1,0,0], Math.PI * 0),
        boxSize: [5.0,0.25,4],
        material: {
          color: [0.5, 1, 0.5],
        },
      }
    );

    sphere1_chessLight = _createSphere(
      physicWorld,
      {
        position: [0,10,0],
        radius: 1.0,
        restitution: 0.7,
        material: {
          materialA: { color: [1, 1, 1] },
          materialB: { color: [1, 1, 0], refractionFactor: 0.9 },
          chessboardArgs: [0.95, 0.95, 0.95],
        },
      }
    );

    sphere2_fresnelMarble = _createSphere(
      physicWorld,
      {
        position: [-2,10,0],
        radius: 1.5,
        material: {
          color: [1,1,1],
          reflectionFactor: 0.8,
          refractionFactor: 0.8,
        },
        restitution: 0.4
      }
    );

    // RED BOX HERE
    _createBox2(
      physicWorld,
      {
        position: [-4,10,0],
        orientation: glm.quat.setAxisAngle(glm.quat.create(), [1,1,1], Math.PI * 0.25),
        boxSize: [1,1,1], // box size
        material: {
          color: [1,0,0],
          reflectionFactor: 0.2,
          refractionFactor: 0.8,
        },
        mass: 1,
        friction: 0.0,
        restitution: 0.7,
      }
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

    // this.ensureSceneData(physicWorld);

    if (deltaTime > 0) {
      physicWorld.stepSimulation(deltaTime, 4, 1/60);

      continuousTime += deltaTime;
    }

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

      } // center the light

      allBoxes.forEach((box) => {

        const pos = box.physicBody.getPosition();

        // out of range? -> reset the box
        if (pos[1] < -12) {
          // reset velocities
          box.physicBody.setLinearVelocity(0,0,0);
          box.physicBody.setAngularVelocity(0,0,0);

          // set position (<- will "teleport" the body)
          box.physicBody.setPosition(0, 10, 0);
        }
      });

      if (sphere1_chessLight) {
        const pos = sphere1_chessLight.physicBody.getPosition();

        // out of range? -> reset the sphere
        if (pos[1] < -12) {
          // reset velocities
          sphere1_chessLight.physicBody.setLinearVelocity(0,0,0);
          sphere1_chessLight.physicBody.setAngularVelocity(0,0,0);

          // set position (<- will "teleport" the body)
          sphere1_chessLight.physicBody.setPosition(0, 10, 0);
        }
      }

      if (sphere2_fresnelMarble) {
        const pos = sphere2_fresnelMarble.physicBody.getPosition();

        // out of range? -> reset the sphere
        if (pos[1] < -12) {
          // reset velocities
          sphere2_fresnelMarble.physicBody.setLinearVelocity(0,0,0);
          sphere2_fresnelMarble.physicBody.setAngularVelocity(0,0,0);

          // set position (<- will "teleport" the body)
          sphere2_fresnelMarble.physicBody.setPosition(0, 10, 0);
        }
      }

      {

        // graphical presentation of the point light
        renderer.rayTracerRenderer.rayTracerPass.gpuMaterialsManager.pushBasicMaterial({
          materialAlias: 666,
          color: [1, 1, 0],
          reflectionFactor: 0,
          refractionFactor: 0,
          receiveLightEnabled: false,
          castShadowEnabled: false
        });
        renderer.rayTracerRenderer.rayTracerPass.gpuShapesManager.pushSphere({
          position: g_lightPos,
          orientation: glm.quat.identity(glm.quat.create()),
          radius: 0.06125,
          materialAlias: 666,
        });

        // actual point light
        renderer.rayTracerRenderer.rayTracerPass.gpuPointLightsManager.pushPointLight({
          position: g_lightPos,
          intensity: 1,
          radius: 15
        });

        { // light mask (made of multicolor triangles)

          const rotationCoef = system.math.easing.easeClamp(continuousTime * 0.125)
          const elevationCoef = system.math.easing.easePinPong(rotationCoef);

          const elevation = 0 + 1 * elevationCoef;

          const coverVertices: glm.vec3[] = [];
          coverVertices.push([+0.0, elevation + 0.4, +0.0]);
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

          const materialAlias_lightCoverTriangle: number[] = [6000, 6001, 6002, 6003];
          renderer.rayTracerRenderer.rayTracerPass.gpuMaterialsManager.pushBasicMaterial({
            materialAlias: materialAlias_lightCoverTriangle[0],
              color: [1.0, 0.0, 1.0], // purple
              reflectionFactor: 0.0,
              refractionFactor: 0.4,
              receiveLightEnabled: false,
              castShadowEnabled: true,
          });
          renderer.rayTracerRenderer.rayTracerPass.gpuMaterialsManager.pushBasicMaterial({
            materialAlias: materialAlias_lightCoverTriangle[1],
              color: [1.0, 0.0, 0.0],
              reflectionFactor: 0.0,
              refractionFactor: 0.4,
              receiveLightEnabled: false,
              castShadowEnabled: true,
          });
          renderer.rayTracerRenderer.rayTracerPass.gpuMaterialsManager.pushBasicMaterial({
            materialAlias: materialAlias_lightCoverTriangle[2],
              color: [0.0, 1.0, 0.0],
              reflectionFactor: 0.0,
              refractionFactor: 0.4,
              receiveLightEnabled: false,
              castShadowEnabled: true,
          });
          renderer.rayTracerRenderer.rayTracerPass.gpuMaterialsManager.pushBasicMaterial({
            materialAlias: materialAlias_lightCoverTriangle[3],
              color: [0.0, 0.0, 1.0],
              reflectionFactor: 0.0,
              refractionFactor: 0.4,
              receiveLightEnabled: false,
              castShadowEnabled: true,
          });

          indices.forEach(([idx0, idx1, idx2], index) => {

            renderer.rayTracerRenderer.rayTracerPass.gpuShapesManager.pushTriangle({
              v0: coverVertices[idx0],
              v1: coverVertices[idx1],
              v2: coverVertices[idx2],
              materialAlias: materialAlias_lightCoverTriangle[index],
            });
          });

        } // light mask (made of triangles)

        { // debug refractive planes (the ones almost against the "left wall")

          const materialAlias_refractive1 = 1001;
          renderer.rayTracerRenderer.rayTracerPass.gpuMaterialsManager.pushBasicMaterial({
            materialAlias: materialAlias_refractive1,
            color: [1.0,1.0,0.5],
            reflectionFactor: 0.0,
            refractionFactor: 0.8,
            castShadowEnabled: true,
            receiveLightEnabled: true,
          });
          renderer.rayTracerRenderer.rayTracerPass.gpuShapesManager.pushBox({
            position: [-9,2,2],
            orientation: glm.quat.identity(glm.quat.create()),
            boxSize: [0.05, 0.5, 1.5],
            materialAlias: materialAlias_refractive1,
          });

          const materialAlias_refractive2 = 1002;
          renderer.rayTracerRenderer.rayTracerPass.gpuMaterialsManager.pushBasicMaterial({
            materialAlias: materialAlias_refractive2,
            color: [0.5,1.0,0.5],
            reflectionFactor: 0.0,
            refractionFactor: 0.8,
            castShadowEnabled: true,
            receiveLightEnabled: true,
          });
          renderer.rayTracerRenderer.rayTracerPass.gpuShapesManager.pushBox({
            position: [-9.2,2,2],
            orientation: glm.quat.identity(glm.quat.create()),
            boxSize: [0.05, 1.5, 0.5],
            materialAlias: materialAlias_refractive2,
          });

        } // debug refractive planes (the ones almost against the "left wall")

      }

    }

    {
      // push scene

      let _tmpMaterialAlias = 3000;
      const _buildMaterial = (material: BasicMaterial | ChessMaterial): number => {

        if (_isBasicMaterial(material)) {
          return renderer.rayTracerRenderer.rayTracerPass.gpuMaterialsManager.pushBasicMaterial({
            materialAlias: ++_tmpMaterialAlias,
            color: material.color,
            refractionFactor: material.refractionFactor ?? 0,
            reflectionFactor: material.reflectionFactor ?? 0,
            receiveLightEnabled: material.receiveLightEnabled ?? true,
            castShadowEnabled: material.castShadowEnabled ?? true,
          });
        }

        if (_isChessMaterial(material)) {
          const materialA = renderer.rayTracerRenderer.rayTracerPass.gpuMaterialsManager.pushBasicMaterial({
            materialAlias: ++_tmpMaterialAlias,
            color: material.materialA.color,
            refractionFactor: material.materialA.refractionFactor ?? 0,
            reflectionFactor: material.materialA.reflectionFactor ?? 0,
            receiveLightEnabled: material.materialA.receiveLightEnabled ?? true,
            castShadowEnabled: material.materialA.castShadowEnabled ?? true,
          });
          const materialB = renderer.rayTracerRenderer.rayTracerPass.gpuMaterialsManager.pushBasicMaterial({
            materialAlias: ++_tmpMaterialAlias,
            color: material.materialB.color,
            refractionFactor: material.materialB.refractionFactor ?? 0,
            reflectionFactor: material.materialB.reflectionFactor ?? 0,
            receiveLightEnabled: material.materialB.receiveLightEnabled ?? true,
            castShadowEnabled: material.materialB.castShadowEnabled ?? true,
          });
          return renderer.rayTracerRenderer.rayTracerPass.gpuMaterialsManager.pushChessboardMaterial({
            materialAlias: ++_tmpMaterialAlias,
            chessboardArgs: material.chessboardArgs,
            castShadowEnabled: true,
            materialAliasA: materialA,
            materialAliasB: materialB,
          });
        }

        throw new Error("unknown material...?");
      };

      allBoxes.forEach((currBox, index) => {

        const position = currBox.physicBody.getPosition();
        const rotation = currBox.physicBody.getRotation();

        renderer.rayTracerRenderer.rayTracerPass.gpuShapesManager.pushBox({
          position: position,
          orientation: rotation,
          boxSize: currBox.boxSize,
          materialAlias: _buildMaterial(currBox.material),
        });

      });

      // if (false)
      if (sphere1_chessLight)
      {

        if (!_isChessMaterial(sphere1_chessLight.material)) {
          throw new Error("should be chess material")
        }

        // const lightCoef = system.math.easing.easePinPong(system.math.easing.easeClamp(continuousTime * 0.5));
        const lightCoef = 1;

        const blinkColor = 0.1 + lightCoef * 0.9;
        // const blinkColor = 1;


        const shapeCoef1 = system.math.easing.easePinPong(system.math.easing.easeClamp(continuousTime * 0.125));
        const shapeCoef2 = system.math.easing.easeInOutSine(shapeCoef1);

        const currColorMask: glm.vec3 = [1,1,1];
        currColorMask[0] = system.math.lerp(shapeCoef2, 1, 1);
        currColorMask[1] = system.math.lerp(shapeCoef2, 1, 1);
        currColorMask[2] = system.math.lerp(shapeCoef2, 1, 0);

        sphere1_chessLight.material.materialB.color = currColorMask;
        sphere1_chessLight.material.chessboardArgs = [
          1 - (0.05 + shapeCoef2 * 0.95),
          1 - (0.05 + shapeCoef2 * 0.95),
          1 - (0.05 + shapeCoef2 * 0.95),
        ];

        const position = sphere1_chessLight.physicBody.getPosition();
        const rotation = sphere1_chessLight.physicBody.getRotation();

        renderer.rayTracerRenderer.rayTracerPass.gpuShapesManager.pushSphere({
          position: position,
          orientation: rotation,
          radius: sphere1_chessLight.radius,
          materialAlias: _buildMaterial(sphere1_chessLight.material),
        });



        // graphical presentation of the point lights
        renderer.rayTracerRenderer.rayTracerPass.gpuMaterialsManager.pushBasicMaterial({
          materialAlias: 668,
          // color: [blinkColor, blinkColor, 0],
          color: [blinkColor*currColorMask[0], blinkColor*currColorMask[1], blinkColor*currColorMask[2]],
          reflectionFactor: 0,
          refractionFactor: 0,
          receiveLightEnabled: false,
          castShadowEnabled: false
        });
        renderer.rayTracerRenderer.rayTracerPass.gpuShapesManager.pushSphere({
          position: position,
          orientation: rotation,
          // radius: blinkColor * 0.9,
          radius: 0.9,
          materialAlias: 668,
        });

        // actual point light inside the sphere
        renderer.rayTracerRenderer.rayTracerPass.gpuPointLightsManager.pushPointLight({
          position: position,
          intensity: 0.1 + 3.9 * lightCoef,
          radius: 10,
        });

      }

      // if (false)
      if (sphere2_fresnelMarble) {
        const position = sphere2_fresnelMarble.physicBody.getPosition();
        const rotation = sphere2_fresnelMarble.physicBody.getRotation();

        // refractive and reflective sphere
        // renderer.rayTracerRenderer.rayTracerPass.gpuMaterialsManager.pushBasicMaterial({
        //   materialAlias: 669,
        //   color: [1, 1, 1],
        //   reflectionFactor: 0.8,
        //   refractionFactor: 0.8,
        //   receiveLightEnabled: true,
        //   castShadowEnabled: true
        // });
        renderer.rayTracerRenderer.rayTracerPass.gpuShapesManager.pushSphere({
          position: position,
          orientation: rotation,
          radius: 1.5,
          // materialAlias: 669,
          materialAlias: _buildMaterial(sphere2_fresnelMarble.material),
        });
      }

      // if (false)
      // {
      //   const position = sphere2_fresnelMarble.physicBody.getPosition();
      //   const rotation = sphere2_fresnelMarble.physicBody.getRotation();

      //   const materialAlias_sphere_made_of_triangles = 7000;
      //   renderer.rayTracerRenderer.rayTracerPass.gpuMaterialsManager.pushBasicMaterial({
      //     materialAlias: materialAlias_sphere_made_of_triangles,
      //       color: [1.0,0.0,1.0],
      //       castShadowEnabled: true,
      //       receiveLightEnabled: true,
      //       reflectionFactor: 0.0,
      //       refractionFactor: 0.0,
      //   });
      //   renderer.rayTracerRenderer.rayTracerPass.gpuMaterialsManager.pushBasicMaterial({
      //     materialAlias: materialAlias_sphere_made_of_triangles + 1,
      //       color: [0.0,0.5,0.0],
      //       castShadowEnabled: true,
      //       receiveLightEnabled: true,
      //       reflectionFactor: 0.0,
      //       refractionFactor: 0.4,
      //   });
      //   renderer.rayTracerRenderer.rayTracerPass.gpuMaterialsManager.pushBasicMaterial({
      //     materialAlias: materialAlias_sphere_made_of_triangles + 2,
      //       color: [0.0,1.0,0.0],
      //       castShadowEnabled: false,
      //       receiveLightEnabled: false,
      //       reflectionFactor: 0.0,
      //       refractionFactor: 0.0,
      //   });

      //   const vertices = graphics.geometries.makeSphere(1, 1.5);

      //   const positions2: glm.vec3[] = [];

      //   const mat4 = glm.mat4.identity(glm.mat4.create());
      //   // glm.mat4.scale(mat4, mat4, [0.5,0.5,0.5]);
      //   glm.mat4.translate(mat4, mat4, position);
      //   glm.mat4.multiply(mat4, mat4, glm.mat4.fromQuat(glm.mat4.create(), rotation));

      //   vertices.forEach((vertex) => {
      //     const pos = glm.vec3.fromValues(0, 0, 0);
      //     glm.vec3.transformMat4(pos, vertex.pos, mat4);
      //     positions2.push(pos);
      //   });

      //   for (let index = 0; index < positions2.length; index += 3) {

      //     let materialAlias = materialAlias_sphere_made_of_triangles;
      //     if ((index % (3*2)) !== 0) {
      //       materialAlias = materialAlias_sphere_made_of_triangles + 1;
      //     }

      //     const v0 = positions2[index + 0];
      //     const v2 = positions2[index + 1];
      //     const v1 = positions2[index + 2];

      //     renderer.rayTracerRenderer.rayTracerPass.gpuShapesManager.pushTriangle({
      //       v0: v0,
      //       v1: v1,
      //       v2: v2,
      //       materialAlias,
      //     });
      //   }

      //   //
      //   //
      //   //
      //   //
      //   //

      //   renderer.rayTracerRenderer.rayTracerPass.gpuShapesManager.pushSphere({
      //     position: position,
      //     orientation: glm.quat.identity(glm.quat.create()),
      //     radius: 1.0,
      //     materialAlias: materialAlias_sphere_made_of_triangles + 2,
      //   });

      //   // actual point light inside the sphere
      //   renderer.rayTracerRenderer.rayTracerPass.gpuPointLightsManager.pushPointLight({
      //     position: position,
      //     intensity: 4,
      //     radius: 15
      //   });

      // }

      /**/
      // background reflective blue sphere

      renderer.rayTracerRenderer.rayTracerPass.gpuMaterialsManager.pushBasicMaterial({
        materialAlias: 888,
        color: [0, 0, 1],
        reflectionFactor: 0.8,
        refractionFactor: 0.0,
        // chessboardEnabled: 0,
        receiveLightEnabled: true,
        castShadowEnabled: true
      });

      renderer.rayTracerRenderer.rayTracerPass.gpuShapesManager.pushSphere({
        position: [-5, 0, -7],
        orientation: glm.quat.identity(glm.quat.create()),
        radius: 5,
        materialAlias: 888,
      });
      //*/

      // {
      //   allMeshes.forEach((meshTriangles) => {

      //     meshTriangles.forEach((vertices) => {

      //       renderer.rayTracerRenderer.rayTracerPass.gpuShapesManager.pushTriangle({
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
          [ -10, -1+ -1.0, +2+ 1.0], // 5 (top of the "hat")
        ];

        // simple reflective triangle
        const materialAlias_heartTriangle = 4000;
        renderer.rayTracerRenderer.rayTracerPass.gpuMaterialsManager.pushBasicMaterial({
          materialAlias: materialAlias_heartTriangle,
          color: [1.0, 0.5, 0.5],
          reflectionFactor: 0.0,
          refractionFactor: 0.0,
          receiveLightEnabled: true,
          castShadowEnabled: true,
        });
        renderer.rayTracerRenderer.rayTracerPass.gpuShapesManager.pushTriangle({
          v0: vertices[0],
          v1: vertices[1],
          v2: vertices[2],
          materialAlias: materialAlias_heartTriangle,
        });
        renderer.rayTracerRenderer.rayTracerPass.gpuShapesManager.pushTriangle({
          v0: vertices[0],
          v1: vertices[4],
          v2: vertices[3],
          materialAlias: materialAlias_heartTriangle,
        });
        renderer.rayTracerRenderer.rayTracerPass.gpuShapesManager.pushTriangle({
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
        renderer.rayTracerRenderer.rayTracerPass.gpuMaterialsManager.pushBasicMaterial({
          materialAlias: materialAlias_wallBoxes,
            color: [1.0,0.5,0.5],
            reflectionFactor: 0.0,
            castShadowEnabled: true,
            receiveLightEnabled: true,
            refractionFactor: 0,
            // chessboardEnabled: 0,
        });

        for (const currPos of allPos) {
          renderer.rayTracerRenderer.rayTracerPass.gpuShapesManager.pushBox({
            position: currPos,
            orientation: glm.quat.setAxisAngle(glm.quat.create(), [1,0,0], Math.PI * 0.25),
            boxSize: [0.05, 0.25, 0.25],
            materialAlias: materialAlias_wallBoxes,
          });
        }

      }


      /**/
      {

        // // const radius = 2;
        // const center: glm.ReadonlyVec3 = [-2,-0.5,3];

        // const X = 0.525731112119133606;
        // const Z = 0.850650808352039932;
        // const N = 0.0;

        // const positions: ReadonlyArray<glm.ReadonlyVec3> = [
        //   [-X, N, Z],
        //   [X, N, Z],
        //   [-X, N, -Z],
        //   [X, N, -Z],
        //   [N, Z, X],
        //   [N, Z, -X],
        //   [N, -Z, X],
        //   [N, -Z, -X],
        //   [Z, X, N],
        //   [-Z, X, N],
        //   [Z, -X, N],
        //   [-Z, -X, N]
        // ];

        // const indices: ReadonlyArray<glm.ReadonlyVec3> = [
        //   [0, 4, 1],
        //   [0, 9, 4],
        //   [9, 5, 4],
        //   [4, 5, 8],
        //   [4, 8, 1],
        //   [8, 10, 1],
        //   [8, 3, 10],
        //   [5, 3, 8],
        //   [5, 2, 3],
        //   [2, 7, 3],
        //   [7, 10, 3],
        //   [7, 6, 10],
        //   [7, 11, 6],
        //   [11, 0, 6],
        //   [0, 1, 6],
        //   [6, 1, 10],
        //   [9, 0, 11],
        //   [9, 11, 2],
        //   [9, 2, 5],
        //   [7, 2, 11]
        // ];

        // const v1ex = glm.vec3.create();
        // const v2ex = glm.vec3.create();
        // const v3ex = glm.vec3.create();

        // const materialAlias_sphere = 7000;
        // renderer.rayTracerRenderer.rayTracerPass.gpuMaterialsManager.pushBasicMaterial({
        //   materialAlias: materialAlias_sphere,
        //     color: [1.0,0.5,0.5],
        //     reflectionFactor: 0.0,
        //     castShadowEnabled: true,
        //     receiveLightEnabled: true,
        //     refractionFactor: 0,
        //     // chessboardEnabled: 0,
        // });

        // for (const index of indices) {
        //   const v1: glm.ReadonlyVec3 = positions[index[0]];
        //   const v2: glm.ReadonlyVec3 = positions[index[1]];
        //   const v3: glm.ReadonlyVec3 = positions[index[2]];

        //   const v12: glm.vec3 = [
        //     system.math.lerp(0.5, v1[0], v2[0]),
        //     system.math.lerp(0.5, v1[1], v2[1]),
        //     system.math.lerp(0.5, v1[2], v2[2]),
        //   ];
        //   const v23: glm.vec3 = [
        //     system.math.lerp(0.5, v2[0], v3[0]),
        //     system.math.lerp(0.5, v2[1], v3[1]),
        //     system.math.lerp(0.5, v2[2], v3[2]),
        //   ];
        //   const v31: glm.vec3 = [
        //     system.math.lerp(0.5, v3[0], v1[0]),
        //     system.math.lerp(0.5, v3[1], v1[1]),
        //     system.math.lerp(0.5, v3[2], v1[2]),
        //   ];

        //   glm.vec3.normalize(v12, v12);
        //   glm.vec3.normalize(v23, v23);
        //   glm.vec3.normalize(v31, v31);



        //   {
        //     glm.vec3.add(v1ex, v1, center);
        //     glm.vec3.add(v2ex, v2, center);
        //     glm.vec3.add(v3ex, v3, center);
        //     glm.vec3.add(v12, v12, center);
        //     glm.vec3.add(v23, v23, center);
        //     glm.vec3.add(v31, v31, center);
        //   }


        //   renderer.rayTracerRenderer.rayTracerPass.gpuShapesManager.pushTriangle({
        //     v0: v1ex,
        //     v1: v12,
        //     v2: v31,
        //     materialAlias: materialAlias_sphere,
        //   });
        //   renderer.rayTracerRenderer.rayTracerPass.gpuShapesManager.pushTriangle({
        //     v0: v2ex,
        //     v1: v12,
        //     v2: v23,
        //     materialAlias: materialAlias_sphere,
        //   });
        //   renderer.rayTracerRenderer.rayTracerPass.gpuShapesManager.pushTriangle({
        //     v0: v3ex,
        //     v1: v31,
        //     v2: v23,
        //     materialAlias: materialAlias_sphere,
        //   });

        // }

        // // actual point light inside the sphere
        // renderer.rayTracerRenderer.rayTracerPass.pushPointLight({
        //   position: center,
        //   intensity: 1,
        //   radius: 15
        // });


        // {

        //   const materialAlias_sphere_made_of_triangles = 7000;
        //   renderer.rayTracerRenderer.rayTracerPass.gpuMaterialsManager.pushBasicMaterial({
        //     materialAlias: materialAlias_sphere_made_of_triangles,
        //       color: [1.0,0.5,0.5],
        //       castShadowEnabled: true,
        //       receiveLightEnabled: true,
        //       reflectionFactor: 0.0,
        //       refractionFactor: 0.0,
        //   });

        //   const vertices = graphics.geometries.makeSphere(1, 1.5);

        //   const positions2: glm.vec3[] = [];

        //   const mat4 = glm.mat4.identity(glm.mat4.create());
        //   glm.mat4.scale(mat4, mat4, [0.5,0.5,0.5]);

        //   vertices.forEach((vertex) => {
        //     const pos = glm.vec3.fromValues(0, 0, 0);
        //     glm.vec3.transformMat4(pos, vertex.pos, mat4);
        //     positions2.push(pos);
        //   });

        //   for (let index = 0; index < positions2.length; index += 3) {
        //     const v0 = positions2[index + 0];
        //     const v2 = positions2[index + 1];
        //     const v1 = positions2[index + 2];

        //     renderer.rayTracerRenderer.rayTracerPass.gpuShapesManager.pushTriangle({
        //       v0: v0,
        //       v1: v1,
        //       v2: v2,
        //       materialAlias: materialAlias_sphere_made_of_triangles,
        //     });
        //   }

        // }

      }
      //*/

      // // refractive blue box
      // renderer.rayTracerRenderer.rayTracerPass.gpuShapesManager.pushBox({
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
