import { graphics } from '@local-framework';
const {
  WebGLContext,
  DataTexture,
  DataTextureVec4f32,
  Texture,
  FrameBuffer,
  ShaderProgram,
  GeometryWrapper
} = graphics.webgl2;

// @ts-ignore
import rayTracerVertex from './shaders/ray-tracer.glsl.vert';
// @ts-ignore
import rayTracerFragment from './shaders/ray-tracer.glsl.frag';

// @ts-ignore
import textureVertex from './shaders/texture.glsl.vert';
// @ts-ignore
import textureFragment from './shaders/texture.glsl.frag';

import * as glm from 'gl-matrix';

import { BVH } from './BVH';

const _degreeToRad = (angle: number) => (angle * Math.PI) / 180;

export interface IDefinition {
  canvasWidth: number;
  canvasHeight: number;
  fovy: number;
}

export interface IPublicSphere {
  position: glm.ReadonlyVec3;
  orientation: glm.ReadonlyQuat;
  radius: number;
  color: glm.ReadonlyVec3;
  reflectionFactor: number;
  refractionFactor: number;
  castShadowEnabled: boolean;
  receiveLightEnabled: boolean;
  chessboardEnabled: boolean;
}

export type IInternalSphere = IPublicSphere;

export interface IPublicBox {
  position: glm.ReadonlyVec3;
  orientation: glm.ReadonlyQuat;
  boxSize: glm.ReadonlyVec3;
  color: glm.ReadonlyVec3;
  reflectionFactor: number;
  refractionFactor: number;
  castShadowEnabled: boolean;
  receiveLightEnabled: boolean;
  chessboardEnabled: boolean;
}

export type IInternalBox = IPublicBox;

export interface IPublicTriangle {
  v0: glm.ReadonlyVec3;
  v1: glm.ReadonlyVec3;
  v2: glm.ReadonlyVec3;
  color: glm.ReadonlyVec3;
  reflectionFactor: number;
  castShadowEnabled: boolean;
  receiveLightEnabled: boolean;
}

export type IInternalTriangle = IPublicTriangle;

export interface ISunLight {
  direction: glm.ReadonlyVec3;
  intensity: number;
}

export interface ISpotLight {
  position: glm.ReadonlyVec3;
  intensity: number;
  radius: number;
}

export interface ICamera {
  position: glm.vec3;
  target: glm.vec3;
  up: glm.vec3;
}

export interface IStackRenderer {
  pushLine(
    inPointA: glm.ReadonlyVec3,
    inPointB: glm.ReadonlyVec3,
    inColor: glm.ReadonlyVec3,
  ): void;
};







//
//
//

//
//
//






// #region RAYTRACER

export interface IRayTracerRenderer {
  pushSphere({
    position,
    orientation,
    radius,
    color,
    reflectionFactor,
    chessboardEnabled,
    castShadowEnabled,
    receiveLightEnabled
  }: IPublicSphere): void;

  pushBox({
    position,
    orientation,
    boxSize,
    color,
    reflectionFactor,
    chessboardEnabled,
    castShadowEnabled,
    receiveLightEnabled
  }: IPublicBox): void;

  pushTriangle({
    v0,
    v1,
    v2,
    color,
    reflectionFactor,
    castShadowEnabled,
    receiveLightEnabled
  }: IPublicTriangle): void;

  pushSunLight({ direction, intensity }: ISunLight): void;

  pushSpotLight({ position, intensity, radius }: ISpotLight): void;

  lookAt(
    eye: glm.ReadonlyVec3,
    target: glm.ReadonlyVec3,
    up: glm.ReadonlyVec3
  ): void;

  render(): void;

  reset(): void;

  setResolutionCoef(inResolutionCoef: number): void;
  getResolutionCoef(): number;

  setAntiAliasing(enabled: boolean): void;
  getAntiAliasing(): boolean;

  getCurrentSize(): glm.ReadonlyVec2;
}

export class RayTracerRenderer implements IRayTracerRenderer {
  private _cameraFovy: number;

  private _canvasWidth: number;
  private _canvasHeight: number;
  private _renderWidth: number;
  private _renderHeight: number;
  private _resolutionCoef: number = 1;
  private _antiAliasing: boolean = false;

  private _rayTracerShaderProgram: graphics.webgl2.IUnboundShader;
  private _textureShaderProgram: graphics.webgl2.IUnboundShader;

  private _rayTracerGeometry: graphics.webgl2.GeometryWrapper.Geometry;
  private _screenGeometry: graphics.webgl2.GeometryWrapper.Geometry;

  private _finalTexture: graphics.webgl2.IUnboundTexture;
  private _frameBuffer: graphics.webgl2.IUnboundFrameBuffer;

  private _sceneDataTexture: graphics.webgl2.IUnboundDataTextureVec4f32;
  private _spheres: IInternalSphere[] = [];
  private _boxes: IInternalBox[] = [];
  private _triangles: IInternalTriangle[] = [];

  private _materialsDataTexture: graphics.webgl2.IUnboundDataTextureVec4f32;

  private _lightsDataTexture: graphics.webgl2.IUnboundDataTextureVec4f32;
  private _sunLights: ISunLight[] = [];
  private _spotLights: ISpotLight[] = [];

  private _bvhDataTexture: graphics.webgl2.IUnboundDataTextureVec4f32;

  private _camera: ICamera;

  private _bvh = new BVH();

  constructor(inDef: IDefinition) {
    this._cameraFovy = inDef.fovy;

    this._renderWidth = this._canvasWidth = inDef.canvasWidth;
    this._renderHeight = this._canvasHeight = inDef.canvasHeight;

    this._rayTracerShaderProgram = new ShaderProgram('RayTracerRenderer-1', {
      vertexSrc: rayTracerVertex,
      fragmentSrc: rayTracerFragment,
      attributes: ['a_vertexPosition', 'a_plotPosition'],
      uniforms: [
        'u_cameraEye',

        'u_sceneTextureData',
        'u_sceneTextureSize',
        'u_materialsTextureData',

        'u_totalShapes',

        'u_lightsTextureData',

        'u_sunLightsStop',
        'u_spotLightsStop',

        'u_bvhDataTexture',
      ]
    });

    this._textureShaderProgram = new ShaderProgram('RayTracerRenderer-1', {
      vertexSrc: textureVertex,
      fragmentSrc: textureFragment,
      attributes: ['a_vertexPosition', 'a_vertexTextureCoord'],
      uniforms: ['u_texture', 'u_step']
    });

    this._finalTexture = new Texture();
    this._frameBuffer = new FrameBuffer();

    this._finalTexture.initialize();
    this._finalTexture.preBind((boundTexture) => {
      boundTexture.allocate(this._renderWidth, this._renderHeight);

      this._frameBuffer.bind((boundFrameBuffer) => {
        boundFrameBuffer.attachTexture(boundTexture);
      });
    });

    //
    //

    const geoBuilder = new GeometryWrapper.GeometryBuilder();
    geoBuilder
      .reset()
      .setPrimitiveType('triangleStrip')
      .addVbo()
      .addVboAttribute('a_vertexPosition', 'vec2f')
      .addVbo()
      .setVboAsDynamic()
      .addVboAttribute('a_plotPosition', 'vec3f');

    this._rayTracerGeometry = new GeometryWrapper.Geometry(
      this._rayTracerShaderProgram,
      geoBuilder.getDef()
    );

    const rayTracerVertices = [];
    rayTracerVertices.push(+1.0, +1.0); // top right
    rayTracerVertices.push(-1.0, +1.0); // top left
    rayTracerVertices.push(+1.0, -1.0); // bottom right
    rayTracerVertices.push(-1.0, -1.0); // bottom left

    this._rayTracerGeometry.allocateBuffer(
      0,
      rayTracerVertices,
      rayTracerVertices.length
    );
    this._rayTracerGeometry.setPrimitiveStart(0);
    this._rayTracerGeometry.setPrimitiveCount(4);

    //
    //

    geoBuilder
      .reset()
      .setPrimitiveType('triangleStrip')
      .addVbo()
      .addVboAttribute('a_vertexPosition', 'vec2f')
      .addVboAttribute('a_vertexTextureCoord', 'vec2f');

    this._screenGeometry = new GeometryWrapper.Geometry(
      this._textureShaderProgram,
      geoBuilder.getDef()
    );

    const screenVertices: number[] = [];
    screenVertices.push(+1.0, +1.0, 1, 1); // top right
    screenVertices.push(-1.0, +1.0, 0, 1); // top left
    screenVertices.push(+1.0, -1.0, 1, 0); // bottom right
    screenVertices.push(-1.0, -1.0, 0, 0); // bottom left

    this._screenGeometry.allocateBuffer(
      0,
      screenVertices,
      screenVertices.length
    );
    this._screenGeometry.setPrimitiveStart(0);
    this._screenGeometry.setPrimitiveCount(4);

    //
    //

    this._sceneDataTexture = new DataTextureVec4f32();
    this._sceneDataTexture.initialize(2048);

    this._materialsDataTexture = new DataTextureVec4f32();
    this._materialsDataTexture.initialize(2048);

    this._lightsDataTexture = new DataTextureVec4f32();
    this._lightsDataTexture.initialize(2048);

    this._bvhDataTexture = new DataTextureVec4f32();
    this._bvhDataTexture.initialize(2048);

    this._camera = {
      position: glm.vec3.fromValues(0, 0, 0),
      target: glm.vec3.fromValues(1.5, 1.5, 1.5),
      up: glm.vec3.fromValues(0, 1, 0)
    };
  }

  pushSphere({
    position,
    orientation,
    radius,
    color,
    reflectionFactor,
    refractionFactor,
    chessboardEnabled,
    castShadowEnabled,
    receiveLightEnabled
  }: IPublicSphere): void {
    if (radius <= 0) {
      throw new Error('invalid sphere radius');
    }
    if (reflectionFactor < 0 || reflectionFactor > 1) {
      throw new Error('invalid sphere reflection');
    }
    if (refractionFactor < 0 || refractionFactor > 1) {
      throw new Error('invalid sphere refractionFactor');
    }


    // const quat = glm.quat.identity(glm.quat.create());
    // glm.quat.setAxisAngle(quat, [0,0,1], Math.PI * 0.25);

    // const quatA = glm.quat.identity(glm.quat.create());
    // glm.quat.setAxisAngle(quatA, [0,0,1], Math.PI * 0.25);

    // const quatB = glm.quat.identity(glm.quat.create());
    // glm.quat.setAxisAngle(quatB, [1,0,0], Math.PI * 0.25);

    // const quatC = glm.quat.identity(glm.quat.create());
    // glm.quat.multiply(quatC, quatA, quatB);

    // const mat4 = glm.mat4.create();
    // glm.mat4.identity(mat4);
    // glm.mat4.translate(mat4, mat4, position);

    // glm.mat4.rotateY(mat4, mat4, Math.PI * 0.25); // vertical axis first

    // // glm.mat4.rotateY(mat4, mat4, angleY); // vertical axis first
    // // glm.mat4.rotateZ(mat4, mat4, angleZ);
    // // glm.mat4.rotateX(mat4, mat4, angleX);
    // // // glm.mat4.scale(mat4, mat4, [0.5,0.5,0.5]);

    this._spheres.push({
      position: [position[0], position[1], position[2]],
      // orientation: [quatC[0], quatC[1], quatC[2], quatC[3]],
      orientation: [orientation[0], orientation[1], orientation[2], orientation[3]],
      // matrix: mat4,
      radius,
      color: [color[0], color[1], color[2]],
      reflectionFactor,
      refractionFactor,
      chessboardEnabled,
      castShadowEnabled,
      receiveLightEnabled
    });
  }

  pushBox({
    position,
    orientation,
    boxSize,
    color,
    reflectionFactor,
    refractionFactor,
    chessboardEnabled,
    castShadowEnabled,
    receiveLightEnabled
  }: IPublicBox): void {
    if (boxSize[0] <= 0 || boxSize[1] <= 0 || boxSize[2] <= 0) {
      throw new Error('invalid box size');
    }
    if (reflectionFactor < 0 || reflectionFactor > 1) {
      throw new Error('invalid box reflection');
    }

    this._boxes.push({
      position: [position[0], position[1], position[2]],
      orientation: [orientation[0], orientation[1], orientation[2], orientation[3]],
      boxSize: glm.vec3.clone(boxSize),
      color: glm.vec3.clone(color),
      reflectionFactor,
      refractionFactor,
      chessboardEnabled,
      castShadowEnabled,
      receiveLightEnabled
    });
  }

  pushTriangle({
    v0,
    v1,
    v2,
    color,
    reflectionFactor,
    castShadowEnabled,
    receiveLightEnabled
  }: IPublicTriangle) {
    if (reflectionFactor < 0 || reflectionFactor > 1) {
      throw new Error('invalid triangle reflection');
    }

    this._triangles.push({
      v0: glm.vec3.clone(v0),
      v1: glm.vec3.clone(v1),
      v2: glm.vec3.clone(v2),
      color: glm.vec3.clone(color),
      reflectionFactor,
      castShadowEnabled,
      receiveLightEnabled
    });
  }

  pushSunLight({ direction, intensity }: ISunLight) {
    // add sun light

    if (intensity <= 0) throw new Error('intensity cannot be 0');
    if (glm.vec3.length(direction) === 0)
      throw new Error('direction cannot be 0');

    const dir = glm.vec3.normalize(glm.vec3.clone(direction), direction);

    this._sunLights.push({ direction: dir, intensity });
  }

  pushSpotLight({ position, intensity, radius }: ISpotLight): void {
    // add spot light

    if (intensity <= 0) throw new Error('intensity cannot be 0');
    if (radius <= 0) throw new Error('radius cannot be <= 0');

    this._spotLights.push({
      position: glm.vec3.clone(position),
      intensity,
      radius
    });
  }

  lookAt(
    eye: glm.ReadonlyVec3,
    target: glm.ReadonlyVec3,
    up: glm.ReadonlyVec3
  ) {
    glm.vec3.copy(this._camera.position, eye);

    //
    //

    let forwardDir = glm.vec3.sub(glm.vec3.create(), target, eye);
    forwardDir = glm.vec3.normalize(forwardDir, forwardDir);
    forwardDir = glm.vec3.add(forwardDir, eye, forwardDir);
    glm.vec3.copy(this._camera.target, forwardDir);

    //
    //

    const upDir = glm.vec3.normalize(glm.vec3.create(), up);
    glm.vec3.copy(this._camera.up, upDir);
  }

  render() {
    // texture pass first
    // -> we render the previous frame to avoid potential webgl queue blocking
    this._renderTexturePass();
    this._renderRayTracingPass();
  }

  private _renderTexturePass() {
    const gl = WebGLContext.getContext();

    gl.viewport(0, 0, this._canvasWidth, this._canvasHeight);
    gl.clear(gl.COLOR_BUFFER_BIT /*| gl.DEPTH_BUFFER_BIT*/);

    const shader = this._textureShaderProgram;

    shader.bind((boundShader) => {
      boundShader.setTextureUniform('u_texture', this._finalTexture, 0);

      // anti aliasing setup

      if (this._antiAliasing) {
        const stepX = (1 - this._renderWidth / this._canvasWidth) * 0.005;
        const stepY = (1 - this._renderHeight / this._canvasHeight) * 0.005;

        boundShader.setFloat2Uniform('u_step', stepX, stepY);
      } else {
        boundShader.setFloat2Uniform('u_step', 0, 0);
      }

      this._screenGeometry.render();
    });
  }

  private _renderRayTracingPass() {
    const gl = WebGLContext.getContext();

    const farCorners = this._computeCameraFarCorners();
    this._rayTracerGeometry.allocateBuffer(1, farCorners, farCorners.length);

    const scaledWidth = Math.floor(this._renderWidth);
    const scaledHeight = Math.floor(this._renderHeight);

    this._bvh.synchronize(this._spheres, this._boxes, this._triangles);

    const bvhPixelsData = this._bvh.fillDataTexture();

    // u_bvhDataTexture
    this._bvhDataTexture.bind((boundTexture) => {
      boundTexture.update(0, bvhPixelsData);
    })

    this._frameBuffer.bind(() => {
      gl.viewport(0, 0, scaledWidth, scaledHeight);
      gl.clear(gl.COLOR_BUFFER_BIT /*| gl.DEPTH_BUFFER_BIT*/);

      {
        // raytracing pass

        const shader = this._rayTracerShaderProgram;

        shader.bind((boundShader) => {
          boundShader.setFloat3Uniform(
            'u_cameraEye',
            this._camera.position[0],
            this._camera.position[1],
            this._camera.position[2]
          );

          //
          //
          //

          {
            // scene data

            const sceneDataValues: [number,number,number,number][] = [];
            const materialsDataValues: [number,number,number,number][] = [];

            let materialIndex = 0;

            {
              {
                // spheres

                for (const sphere of this._spheres) {
                  // add sphere

                  sceneDataValues.push([
                    1, // [0]
                    materialIndex + 0.5, // [1]
                    sphere.position[0], // [2]
                    sphere.position[1], // [3]
                  ]);
                  sceneDataValues.push([
                    sphere.position[2], // [4]
                    sphere.orientation[0], // [5]
                    sphere.orientation[1], // [6]
                    sphere.orientation[2], // [7]
                  ]);
                  sceneDataValues.push([
                    sphere.orientation[3], // [8]
                    sphere.radius, // [9]
                    0,
                    0,
                  ]);

                  materialsDataValues.push([
                    sphere.color[0], // [0]
                    sphere.color[1], // [1]
                    sphere.color[2], // [2]
                    sphere.reflectionFactor, // [3]
                  ]);
                  materialsDataValues.push([
                    sphere.refractionFactor, // [4]
                    sphere.castShadowEnabled ? 1 : 0, // [5]
                    sphere.receiveLightEnabled ? 1 : 0, // [6]
                    sphere.chessboardEnabled ? 1 : 0, // [7]
                  ]);
                  materialIndex += 1;

                }

              } // spheres

              {
                // boxes

                for (const box of this._boxes) {
                  // add box

                  sceneDataValues.push([
                    2,
                    materialIndex + 0.5, // [10]
                    box.position[0], // [0]
                    box.position[1], // [1]
                  ]);
                  sceneDataValues.push([
                    box.position[2], // [2]
                    box.orientation[0], // [3]
                    box.orientation[1], // [4]
                    box.orientation[2], // [5]
                  ]);
                  sceneDataValues.push([
                    box.orientation[3], // [6]
                    box.boxSize[0], // [7]
                    box.boxSize[1], // [8]
                    box.boxSize[2], // [9]
                  ]);

                  materialsDataValues.push([
                    box.color[0], // [0]
                    box.color[1], // [1]
                    box.color[2], // [2]
                    box.reflectionFactor, // [3]
                  ]);
                  materialsDataValues.push([
                    box.refractionFactor, // [4]
                    box.castShadowEnabled ? 1 : 0, // [5]
                    box.receiveLightEnabled ? 1 : 0, // [6]
                    box.chessboardEnabled ? 1 : 0, // [7]
                  ]);
                  materialIndex += 1;


                }

              } // boxes

              {
                // triangles

                for (const triangle of this._triangles) {
                  // add triangle

                  sceneDataValues.push([
                    3,
                    materialIndex + 0.5, // [0]
                    triangle.v0[0], // [1]
                    triangle.v0[1], // [2]
                  ]);
                  sceneDataValues.push([
                    triangle.v0[2], // [3]
                    triangle.v1[0], // [4]
                    triangle.v1[1], // [5]
                    triangle.v1[2], // [6]
                  ]);
                  sceneDataValues.push([
                    triangle.v2[0], // [7]
                    triangle.v2[1], // [8]
                    triangle.v2[2], // [9]
                    0,
                  ]);

                  materialsDataValues.push([
                    triangle.color[0], // [0]
                    triangle.color[1], // [1]
                    triangle.color[2], // [2]
                    triangle.reflectionFactor, // [3]
                  ]);
                  materialsDataValues.push([
                    // triangle.refractionFactor, // [4]
                    0,
                    triangle.castShadowEnabled ? 1 : 0, // [5]
                    triangle.receiveLightEnabled ? 1 : 0, // [6]
                    // triangle.chessboardEnabled ? 1 : 0, // [7]
                    0,
                  ]);
                  materialIndex += 1;

                }

                boundShader.setInteger1Uniform(
                  'u_totalShapes',
                  sceneDataValues.length
                );

              } // triangles
            }

            gl.activeTexture(gl.TEXTURE0 + 0);
            this._sceneDataTexture.preBind((boundDataTexture) => {
              boundDataTexture.update(0, sceneDataValues);
            });

            boundShader.setInteger1Uniform('u_sceneTextureData', 0);
            boundShader.setInteger1Uniform(
              'u_sceneTextureSize',
              sceneDataValues.length
            );

            {
              gl.activeTexture(gl.TEXTURE0 + 7);
              this._materialsDataTexture.preBind((boundDataTexture) => {
                boundDataTexture.update(0, materialsDataValues);
              });

              boundShader.setInteger1Uniform('u_materialsTextureData', 7);
            }

          } // scene data

          {
            // lights data

            const lightsDataValues: [number, number, number, number][] = [];

            {
              // sun lights

              for (const sunLight of this._sunLights) {
                // add sun light

                lightsDataValues.push([
                  sunLight.direction[0],
                  sunLight.direction[1],
                  sunLight.direction[2],
                  sunLight.intensity,
                ]);
              }

              boundShader.setInteger1Uniform(
                'u_sunLightsStop',
                lightsDataValues.length
              );
            } // sun lights

            {
              // spot lights

              for (const spotLight of this._spotLights) {
                // add spot light

                lightsDataValues.push([
                  spotLight.position[0],
                  spotLight.position[1],
                  spotLight.position[2],
                  spotLight.radius,
                ]);
                lightsDataValues.push([
                  spotLight.intensity,
                  0,
                  0,
                  0,
                ]);
              }

              boundShader.setInteger1Uniform(
                'u_spotLightsStop',
                lightsDataValues.length
              );
            } // spot lights

            gl.activeTexture(gl.TEXTURE0 + 1);
            this._lightsDataTexture.preBind((boundDataTexture) => {
              boundDataTexture.update(0, lightsDataValues);
            });

            boundShader.setInteger1Uniform('u_lightsTextureData', 1);
          } // lights data


          {
            gl.activeTexture(gl.TEXTURE0 + 6);
            this._bvhDataTexture.preBind((boundDataTexture) => {
              boundDataTexture.update(0, bvhPixelsData);
            });

            boundShader.setInteger1Uniform('u_bvhDataTexture', 6);
          }

          //
          //
          //

          this._rayTracerGeometry.render();
        });
      } // raytracing pass
    });

    gl.viewport(0, 0, this._canvasWidth, this._canvasHeight);
  }

  reset(): void {
    this._sunLights.length = 0;
    this._spotLights.length = 0;

    this._spheres.length = 0;
    this._boxes.length = 0;
    this._triangles.length = 0;
  }

  bvhRender(
    renderer: IStackRenderer,
  ) {
    this._bvh.render(renderer);
  }

  setResolutionCoef(inResolutionCoef: number): void {
    if (
      inResolutionCoef === this._resolutionCoef ||
      inResolutionCoef <= 0 ||
      inResolutionCoef > 1
    ) {
      return;
    }

    this._resolutionCoef = inResolutionCoef;

    this._renderWidth = Math.floor(this._canvasWidth * this._resolutionCoef);
    this._renderHeight = Math.floor(this._canvasHeight * this._resolutionCoef);

    this._finalTexture.preBind((boundTexture) => {
      boundTexture.resize(this._renderWidth, this._renderHeight);
    });
  }

  getResolutionCoef(): number {
    return this._resolutionCoef;
  }

  setAntiAliasing(enabled: boolean) {
    this._antiAliasing = enabled;
  }

  getAntiAliasing(): boolean {
    return this._antiAliasing;
  }

  getCurrentSize(): glm.ReadonlyVec2 {
    return [this._renderWidth, this._renderHeight];
  }

  private _computeCameraFarCorners(): ReadonlyArray<number> {
    const forwardDir = glm.vec3.sub(
      glm.vec3.create(),
      this._camera.target,
      this._camera.position
    );

    const leftDir = glm.vec3.cross(
      glm.vec3.create(),
      forwardDir,
      this._camera.up
    );
    const upDir = glm.vec3.cross(glm.vec3.create(), leftDir, forwardDir);

    const radHFovy = _degreeToRad(this._cameraFovy * 0.5);
    const xLength = (Math.cos(radHFovy) * 1) / Math.sin(radHFovy);

    const scaledForwardDir = glm.vec3.multiply(
      glm.vec3.create(),
      forwardDir,
      glm.vec3.fromValues(xLength, xLength, xLength)
    );
    const farCenter = glm.vec3.add(
      glm.vec3.create(),
      this._camera.position,
      scaledForwardDir
    );

    const aspectRatio = this._canvasWidth / this._canvasHeight;
    const farHalfWidth = glm.vec3.multiply(
      glm.vec3.create(),
      leftDir,
      glm.vec3.fromValues(aspectRatio, aspectRatio, aspectRatio)
    );

    const farUp = glm.vec3.add(glm.vec3.create(), farCenter, upDir);
    const farBottom = glm.vec3.subtract(glm.vec3.create(), farCenter, upDir);
    const farTopLeft = glm.vec3.subtract(
      glm.vec3.create(),
      farUp,
      farHalfWidth
    );
    const farBottomLeft = glm.vec3.subtract(
      glm.vec3.create(),
      farBottom,
      farHalfWidth
    );
    const farTopRight = glm.vec3.add(glm.vec3.create(), farUp, farHalfWidth);
    const farBottomRight = glm.vec3.add(
      glm.vec3.create(),
      farBottom,
      farHalfWidth
    );

    return [
      farTopRight[0],
      farTopRight[1],
      farTopRight[2],
      farTopLeft[0],
      farTopLeft[1],
      farTopLeft[2],
      farBottomRight[0],
      farBottomRight[1],
      farBottomRight[2],
      farBottomLeft[0],
      farBottomLeft[1],
      farBottomLeft[2]
    ];
  }

  get canvasWidth() {
    return this._canvasWidth;
  }
  get canvasHeight() {
    return this._canvasHeight;
  }
  get renderWidth() {
    return this._renderWidth;
  }
  get renderHeight() {
    return this._renderHeight;
  }

  get camera(): Readonly<ICamera> {
    return this._camera;
  }

  get spheres(): ReadonlyArray<IInternalSphere> {
    return this._spheres;
  }
  get boxes(): ReadonlyArray<IInternalBox> {
    return this._boxes;
  }
  get triangles(): ReadonlyArray<IInternalTriangle> {
    return this._triangles;
  }

  get sunLights(): ReadonlyArray<ISunLight> {
    return this._sunLights;
  }
  get spotLights(): ReadonlyArray<ISpotLight> {
    return this._spotLights;
  }
}


// #endregion lol
