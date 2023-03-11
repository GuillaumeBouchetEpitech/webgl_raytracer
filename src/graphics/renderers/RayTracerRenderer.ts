import {
  WebGLContext,
  DataTexture,
  Texture,
  FrameBuffer,
  ShaderProgram,
  GeometryWrapper
} from '../wrappers';

import { rayTracer, texture } from './shaders';

import * as glm from 'gl-matrix';

// TODO: wrong place
export const g_fovy = 70;
export const degToRad = (deg: number) => (deg * Math.PI) / 180;

export interface ISphere {
  position: glm.ReadonlyVec3;
  radius: number;
  color: glm.ReadonlyVec3;
  reflection: number;
  shadowEnabled: boolean;
  lightEnabled: boolean;
  chessboard: boolean;
}

export interface IBox {
  matrix: glm.mat4;
  boxSize: glm.ReadonlyVec3;
  color: glm.ReadonlyVec3;
  reflection: number;
  shadowEnabled: boolean;
  lightEnabled: boolean;
  chessboard: boolean;
}

export interface ITriangle {
  v0: glm.ReadonlyVec3;
  v1: glm.ReadonlyVec3;
  v2: glm.ReadonlyVec3;
  color: glm.ReadonlyVec3;
  reflection: number;
  shadowEnabled: boolean;
  lightEnabled: boolean;
}

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

export interface IRayTracerRenderer {
  pushSphere(
    position: glm.ReadonlyVec3,
    radius: number,
    color: glm.ReadonlyVec3,
    reflection: number,
    chessboard: boolean,
    shadowEnabled?: boolean,
    lightEnabled?: boolean
  ): void;

  pushBox(
    position: glm.ReadonlyVec3,
    angleX: number,
    angleY: number,
    angleZ: number,
    boxSize: glm.ReadonlyVec3,
    color: glm.ReadonlyVec3,
    reflection: number,
    chessboard: boolean,
    shadowEnabled?: boolean,
    lightEnabled?: boolean
  ): void;

  pushTriangle({
    v0,
    v1,
    v2,
    color,
    reflection,
    shadowEnabled,
    lightEnabled
  }: ITriangle): void;

  pushSunLight(direction: glm.ReadonlyVec3, intensity: number): void;

  pushSpotLight(
    position: glm.ReadonlyVec3,
    intensity: number,
    radius: number
  ): void;

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
  private _canvasWidth: number;
  private _canvasHeight: number;
  private _renderWidth: number;
  private _renderHeight: number;
  private _resolutionCoef: number = 1;
  private _antiAliasing: boolean = false;

  private _rayTracerShaderProgram: ShaderProgram;
  private _textureShaderProgram: ShaderProgram;

  private _rayTracerGeometry: GeometryWrapper.Geometry;
  private _screenGeometry: GeometryWrapper.Geometry;

  private _finalTexture: Texture;
  private _frameBuffer: FrameBuffer;

  private _sceneDataTexture: DataTexture;
  private _spheres: ISphere[] = [];
  private _boxes: IBox[] = [];
  private _triangles: ITriangle[] = [];

  private _lightsDataTexture: DataTexture;
  private _sunLights: ISunLight[] = [];
  private _spotLights: ISpotLight[] = [];

  private _camera: ICamera;

  constructor(canvasWidth: number, canvasHeight: number) {
    this._renderWidth = this._canvasWidth = canvasWidth;
    this._renderHeight = this._canvasHeight = canvasHeight;

    this._rayTracerShaderProgram = new ShaderProgram({
      vertexSrc: rayTracer.vertex,
      fragmentSrc: rayTracer.fragment,
      attributes: ['a_vertexPosition', 'a_plotPosition'],
      uniforms: [
        'u_cameraEye',

        'u_sceneTextureData',
        'u_sceneTextureSize',

        'u_spheresStart',
        'u_spheresStop',
        'u_boxesStart',
        'u_boxesStop',
        'u_trianglesStart',
        'u_trianglesStop',

        'u_lightsTextureData',

        'u_sunLightsStart',
        'u_sunLightsStop',
        'u_spotLightsStart',
        'u_spotLightsStop'
      ]
    });

    this._textureShaderProgram = new ShaderProgram({
      vertexSrc: texture.vertex,
      fragmentSrc: texture.fragment,
      attributes: ['a_vertexPosition', 'a_vertexTextureCoord'],
      uniforms: ['u_texture', 'u_step']
    });

    this._finalTexture = new Texture();
    this._finalTexture.allocate(this._renderWidth, this._renderHeight, true);

    this._frameBuffer = new FrameBuffer();
    this._frameBuffer.attachTexture(this._finalTexture);

    //
    //

    const bytesPerPixel = 4;

    //
    //

    this._rayTracerGeometry = new GeometryWrapper.Geometry(
      this._rayTracerShaderProgram,
      {
        vbos: [
          {
            attrs: [
              {
                name: 'a_vertexPosition',
                type: GeometryWrapper.AttributeType.vec2f,
                index: 0
              }
            ],
            stride: 2 * bytesPerPixel,
            instanced: false
          },
          {
            attrs: [
              {
                name: 'a_plotPosition',
                type: GeometryWrapper.AttributeType.vec3f,
                index: 0
              }
            ],
            stride: 3 * bytesPerPixel,
            instanced: false
          }
        ],
        primitiveType: GeometryWrapper.PrimitiveType.triangleStrip
      }
    );

    const rayTracerVertices = [];
    rayTracerVertices.push(+1.0, +1.0); // top right
    rayTracerVertices.push(-1.0, +1.0); // top left
    rayTracerVertices.push(+1.0, -1.0); // bottom right
    rayTracerVertices.push(-1.0, -1.0); // bottom left

    this._rayTracerGeometry.updateBuffer(0, rayTracerVertices, false);
    this._rayTracerGeometry.setPrimitiveStart(0);
    this._rayTracerGeometry.setPrimitiveCount(4);

    //
    //

    this._screenGeometry = new GeometryWrapper.Geometry(
      this._textureShaderProgram,
      {
        vbos: [
          {
            attrs: [
              {
                name: 'a_vertexPosition',
                type: GeometryWrapper.AttributeType.vec2f,
                index: 0
              },
              {
                name: 'a_vertexTextureCoord',
                type: GeometryWrapper.AttributeType.vec2f,
                index: 2
              }
            ],
            stride: 4 * bytesPerPixel,
            instanced: false
          }
        ],
        primitiveType: GeometryWrapper.PrimitiveType.triangleStrip
      }
    );

    const screenVertices: number[] = [];
    screenVertices.push(+1.0, +1.0, 1, 1); // top right
    screenVertices.push(-1.0, +1.0, 0, 1); // top left
    screenVertices.push(+1.0, -1.0, 1, 0); // bottom right
    screenVertices.push(-1.0, -1.0, 0, 0); // bottom left

    this._screenGeometry.updateBuffer(0, screenVertices, false);
    this._screenGeometry.setPrimitiveStart(0);
    this._screenGeometry.setPrimitiveCount(4);

    //
    //

    this._sceneDataTexture = new DataTexture();
    this._sceneDataTexture.initialize();

    this._lightsDataTexture = new DataTexture();
    this._lightsDataTexture.initialize();

    this._camera = {
      position: glm.vec3.fromValues(0, 0, 0),
      target: glm.vec3.fromValues(1.5, 1.5, 1.5),
      up: glm.vec3.fromValues(0, 1, 0)
    };
  }

  pushSphere(
    position: glm.ReadonlyVec3,
    radius: number,
    color: glm.ReadonlyVec3,
    reflection: number,
    chessboard: boolean,
    shadowEnabled: boolean = true,
    lightEnabled: boolean = true
  ) {
    if (radius <= 0) throw new Error('invalid sphere radius');
    if (reflection < 0 || reflection > 1)
      throw new Error('invalid sphere reflection');

    this._spheres.push({
      position: [position[0], position[1], position[2]],
      radius,
      color: [color[0], color[1], color[2]],
      reflection,
      chessboard,
      shadowEnabled,
      lightEnabled
    });
  }

  pushBox(
    position: glm.ReadonlyVec3,
    angleX: number,
    angleY: number,
    angleZ: number,
    boxSize: glm.ReadonlyVec3,
    color: glm.ReadonlyVec3,
    reflection: number,
    chessboard: boolean,
    shadowEnabled: boolean = true,
    lightEnabled: boolean = true
  ) {
    if (boxSize[0] <= 0 || boxSize[1] <= 0 || boxSize[2] <= 0)
      throw new Error('invalid box size');
    if (reflection < 0 || reflection > 1)
      throw new Error('invalid box reflection');

    const mat4 = glm.mat4.create();
    glm.mat4.identity(mat4);
    glm.mat4.translate(mat4, mat4, position);
    glm.mat4.rotateY(mat4, mat4, angleY); // vertical axis first
    glm.mat4.rotateZ(mat4, mat4, angleZ);
    glm.mat4.rotateX(mat4, mat4, angleX);

    this._boxes.push({
      matrix: mat4,
      boxSize: glm.vec3.clone(boxSize),
      color: glm.vec3.clone(color),
      reflection,
      chessboard,
      shadowEnabled,
      lightEnabled
    });
  }

  pushTriangle({
    v0,
    v1,
    v2,
    color,
    reflection,
    shadowEnabled,
    lightEnabled
  }: ITriangle) {
    if (reflection < 0 || reflection > 1)
      throw new Error('invalid triangle reflection');

    this._triangles.push({
      v0: glm.vec3.clone(v0),
      v1: glm.vec3.clone(v1),
      v2: glm.vec3.clone(v2),
      color: glm.vec3.clone(color),
      reflection,
      shadowEnabled,
      lightEnabled
    });
  }

  pushSunLight(direction: glm.ReadonlyVec3, intensity: number) {
    // add sun light

    if (intensity <= 0) throw new Error('intensity cannot be 0');
    if (glm.vec3.length(direction) === 0)
      throw new Error('direction cannot be 0');

    const dir = glm.vec3.normalize(glm.vec3.clone(direction), direction);

    this._sunLights.push({ direction: dir, intensity });
  }

  pushSpotLight(position: glm.ReadonlyVec3, intensity: number, radius: number) {
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
    // const leftDir = glm.vec3.cross(glm.vec3.create(), forwardDir, this._camera.up);
    // const upDir = glm.vec3.cross(glm.vec3.create(), leftDir, forwardDir);

    glm.vec3.copy(this._camera.position, eye);

    //
    //

    // glm.vec3.copy(this._camera.target, target);
    let forwardDir = glm.vec3.sub(glm.vec3.create(), target, eye);
    forwardDir = glm.vec3.normalize(forwardDir, forwardDir);
    forwardDir = glm.vec3.add(forwardDir, eye, forwardDir);
    glm.vec3.copy(this._camera.target, forwardDir);

    //
    //

    // glm.vec3.copy(this._camera.up, up);
    const upDir = glm.vec3.normalize(glm.vec3.create(), up);
    glm.vec3.copy(this._camera.up, upDir);
  }

  render() {
    const gl = WebGLContext.getContext();

    const farCorners = this._computeCameraFarCorners();
    this._rayTracerGeometry.updateBuffer(1, farCorners, true);

    const scaledWidth = Math.floor(this._renderWidth);
    const scaledHeight = Math.floor(this._renderHeight);

    this._frameBuffer.bind();
    gl.viewport(0, 0, scaledWidth, scaledHeight);
    gl.clear(gl.COLOR_BUFFER_BIT /*| gl.DEPTH_BUFFER_BIT*/);

    {
      // raytracing pass

      const shader = this._rayTracerShaderProgram;

      shader.bind();
      shader.setFloat3Uniform(
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

        const sceneDataValues: number[] = [];

        {
          {
            // spheres

            shader.setInteger1Uniform('u_spheresStart', 0);

            for (const sphere of this._spheres) {
              // add sphere

              sceneDataValues.push(
                sphere.position[0],
                sphere.position[1],
                sphere.position[2]
              );
              sceneDataValues.push(sphere.radius);

              sceneDataValues.push(
                sphere.color[0],
                sphere.color[1],
                sphere.color[2]
              );
              sceneDataValues.push(sphere.reflection);

              sceneDataValues.push(sphere.shadowEnabled ? 1 : 0);
              sceneDataValues.push(sphere.lightEnabled ? 1 : 0);

              sceneDataValues.push(sphere.chessboard ? 1 : 0);
            }

            shader.setInteger1Uniform('u_spheresStop', sceneDataValues.length);
          } // spheres

          {
            // boxes

            shader.setInteger1Uniform('u_boxesStart', sceneDataValues.length);

            for (const box of this._boxes) {
              // add box

              for (let ii = 0; ii < 16; ++ii)
                sceneDataValues.push(box.matrix[ii]);

              sceneDataValues.push(
                box.boxSize[0],
                box.boxSize[1],
                box.boxSize[2]
              );

              sceneDataValues.push(box.color[0], box.color[1], box.color[2]);
              sceneDataValues.push(box.reflection);

              sceneDataValues.push(box.shadowEnabled ? 1 : 0);
              sceneDataValues.push(box.lightEnabled ? 1 : 0);

              sceneDataValues.push(box.chessboard ? 1 : 0);
            }

            shader.setInteger1Uniform('u_boxesStop', sceneDataValues.length);
          } // boxes

          {
            // triangles

            shader.setInteger1Uniform(
              'u_trianglesStart',
              sceneDataValues.length
            );

            for (const triangle of this._triangles) {
              // add triangle

              sceneDataValues.push(
                triangle.v0[0],
                triangle.v0[1],
                triangle.v0[2]
              );
              sceneDataValues.push(
                triangle.v1[0],
                triangle.v1[1],
                triangle.v1[2]
              );
              sceneDataValues.push(
                triangle.v2[0],
                triangle.v2[1],
                triangle.v2[2]
              );

              sceneDataValues.push(
                triangle.color[0],
                triangle.color[1],
                triangle.color[2]
              ); // color
              sceneDataValues.push(triangle.reflection); // reflection

              sceneDataValues.push(triangle.shadowEnabled ? 1 : 0); // shadowEnabled
              sceneDataValues.push(triangle.lightEnabled ? 1 : 0); // lightEnabled
            }

            shader.setInteger1Uniform(
              'u_trianglesStop',
              sceneDataValues.length
            );
          } // triangles
        }

        gl.activeTexture(gl.TEXTURE0 + 0);
        this._sceneDataTexture.bind();

        this._sceneDataTexture.update(sceneDataValues);

        shader.setInteger1Uniform('u_sceneTextureData', 0);
        shader.setInteger1Uniform('u_sceneTextureSize', sceneDataValues.length);
      } // scene data

      {
        // lights data

        const lightsDataValues: number[] = [];

        {
          // sun lights

          shader.setInteger1Uniform('u_sunLightsStart', 0);

          for (const sunLight of this._sunLights) {
            // add sun light

            lightsDataValues.push(
              sunLight.direction[0],
              sunLight.direction[1],
              sunLight.direction[2]
            );
            lightsDataValues.push(sunLight.intensity);
          }

          shader.setInteger1Uniform('u_sunLightsStop', lightsDataValues.length);
        } // sun lights

        {
          // spot lights

          shader.setInteger1Uniform(
            'u_spotLightsStart',
            lightsDataValues.length
          );

          for (const spotLight of this._spotLights) {
            // add spot light

            lightsDataValues.push(
              spotLight.position[0],
              spotLight.position[1],
              spotLight.position[2]
            );
            lightsDataValues.push(spotLight.radius);
            lightsDataValues.push(spotLight.intensity);
          }

          shader.setInteger1Uniform(
            'u_spotLightsStop',
            lightsDataValues.length
          );
        } // spot lights

        gl.activeTexture(gl.TEXTURE0 + 1);
        this._lightsDataTexture.bind();

        this._lightsDataTexture.update(lightsDataValues);

        shader.setInteger1Uniform('u_lightsTextureData', 1);
      } // lights data

      //
      //
      //

      this._rayTracerGeometry.render();
    } // raytracing pass

    FrameBuffer.unbind();
    gl.viewport(0, 0, this._canvasWidth, this._canvasHeight);
    gl.clear(gl.COLOR_BUFFER_BIT /*| gl.DEPTH_BUFFER_BIT*/);

    {
      // texture pass

      const shader = this._textureShaderProgram;

      shader.bind();

      shader.setInteger1Uniform('u_texture', 0);
      gl.activeTexture(gl.TEXTURE0 + 0);
      this._finalTexture.bind();

      // anti aliasing setup

      const u_step = shader.getUniform('u_step');

      if (this._antiAliasing) {
        const stepX = (1 - this._renderWidth / this._canvasWidth) * 0.005;
        const stepY = (1 - this._renderHeight / this._canvasHeight) * 0.005;

        shader.setFloat2Uniform('u_step', stepX, stepY);
      } else {
        shader.setFloat2Uniform('u_step', 0, 0);
      }

      this._screenGeometry.render();

      Texture.unbind();
    } // texture pass

    ShaderProgram.unbind();
  }

  reset(): void {
    this._sunLights.length = 0;
    this._spotLights.length = 0;

    this._spheres.length = 0;
    this._boxes.length = 0;
    this._triangles.length = 0;
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

    this._finalTexture.resize(this._renderWidth, this._renderHeight);
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

    const radHFovy = degToRad(g_fovy * 0.5);
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

  get spheres(): ReadonlyArray<ISphere> {
    return this._spheres;
  }
  get boxes(): ReadonlyArray<IBox> {
    return this._boxes;
  }
  get triangles(): ReadonlyArray<ITriangle> {
    return this._triangles;
  }

  get sunLights(): ReadonlyArray<ISunLight> {
    return this._sunLights;
  }
  get spotLights(): ReadonlyArray<ISpotLight> {
    return this._spotLights;
  }
}
