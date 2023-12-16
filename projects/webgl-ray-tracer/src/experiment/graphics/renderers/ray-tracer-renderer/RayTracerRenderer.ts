
import { graphics } from '@local-framework';
const {
  WebGLContext,
  DataTexture,
  Texture,
  FrameBuffer,
  ShaderProgram,
  GeometryWrapper,
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

const _degreeToRad = (angle: number) => angle * Math.PI / 180;

export interface IDefinition {
  canvasWidth: number;
  canvasHeight: number;
  fovy: number;
}

export interface IPublicSphere {
  position: glm.ReadonlyVec3;
  radius: number;
  color: glm.ReadonlyVec3;
  reflection: number;
  chessboard: boolean;
  shadowEnabled: boolean;
  lightEnabled: boolean;
}

export interface IInternalSphere {
  position: glm.ReadonlyVec3;
  radius: number;
  color: glm.ReadonlyVec3;
  reflection: number;
  shadowEnabled: boolean;
  lightEnabled: boolean;
  chessboard: boolean;
}

export interface IPublicBox {
  position: glm.ReadonlyVec3;
  angleX: number;
  angleY: number;
  angleZ: number;
  boxSize: glm.ReadonlyVec3;
  color: glm.ReadonlyVec3;
  reflection: number;
  chessboard: boolean;
  shadowEnabled: boolean;
  lightEnabled: boolean;
}

export interface InternalBox {
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
  pushSphere({
    position,
    radius,
    color,
    reflection,
    chessboard,
    shadowEnabled,
    lightEnabled
  }: IPublicSphere): void;

  pushBox({
    position,
    angleX,
    angleY,
    angleZ,
    boxSize,
    color,
    reflection,
    chessboard,
    shadowEnabled,
    lightEnabled
  }: IPublicBox): void;

  pushTriangle({
    v0,
    v1,
    v2,
    color,
    reflection,
    shadowEnabled,
    lightEnabled
  }: ITriangle): void;

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

  private _sceneDataTexture: graphics.webgl2.IUnboundDataTexture;
  private _spheres: IInternalSphere[] = [];
  private _boxes: InternalBox[] = [];
  private _triangles: ITriangle[] = [];

  private _lightsDataTexture: graphics.webgl2.IUnboundDataTexture;
  private _sunLights: ISunLight[] = [];
  private _spotLights: ISpotLight[] = [];

  private _camera: ICamera;

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
    // this._frameBuffer = new FrameBuffer({
    //   width: this._renderWidth,
    //   height: this._renderHeight,
    //   colorTextures: [
    //     this._finalTexture,
    //   ],
    // });
    // this._frameBuffer.attachTexture();

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

    this._rayTracerGeometry.updateBuffer(
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

    this._screenGeometry.updateBuffer(0, screenVertices, screenVertices.length);
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

  pushSphere({
    position,
    radius,
    color,
    reflection,
    chessboard,
    shadowEnabled,
    lightEnabled
  }: IPublicSphere): void {
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

  pushBox({
    position,
    angleX,
    angleY,
    angleZ,
    boxSize,
    color,
    reflection,
    chessboard,
    shadowEnabled,
    lightEnabled
  }: IPublicBox): void {
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

    // gl.disable(gl.DEPTH_TEST);

    const farCorners = this._computeCameraFarCorners();
    this._rayTracerGeometry.updateBuffer(1, farCorners, farCorners.length);

    const scaledWidth = Math.floor(this._renderWidth);
    const scaledHeight = Math.floor(this._renderHeight);

    this._frameBuffer.bind(() => {
      gl.viewport(0, 0, scaledWidth, scaledHeight);
      gl.clear(gl.COLOR_BUFFER_BIT /*| gl.DEPTH_BUFFER_BIT*/);
      // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

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

            const sceneDataValues: number[] = [];

            {
              {
                // spheres

                boundShader.setInteger1Uniform('u_spheresStart', 0);

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

                boundShader.setInteger1Uniform(
                  'u_spheresStop',
                  sceneDataValues.length
                );
              } // spheres

              {
                // boxes

                boundShader.setInteger1Uniform(
                  'u_boxesStart',
                  sceneDataValues.length
                );

                for (const box of this._boxes) {
                  // add box

                  for (let ii = 0; ii < 16; ++ii)
                    sceneDataValues.push(box.matrix[ii]);

                  sceneDataValues.push(
                    box.boxSize[0],
                    box.boxSize[1],
                    box.boxSize[2]
                  );

                  sceneDataValues.push(
                    box.color[0],
                    box.color[1],
                    box.color[2]
                  );
                  sceneDataValues.push(box.reflection);

                  sceneDataValues.push(box.shadowEnabled ? 1 : 0);
                  sceneDataValues.push(box.lightEnabled ? 1 : 0);

                  sceneDataValues.push(box.chessboard ? 1 : 0);
                }

                boundShader.setInteger1Uniform(
                  'u_boxesStop',
                  sceneDataValues.length
                );
              } // boxes

              {
                // triangles

                boundShader.setInteger1Uniform(
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

                boundShader.setInteger1Uniform(
                  'u_trianglesStop',
                  sceneDataValues.length
                );
              } // triangles
            }

            gl.activeTexture(gl.TEXTURE0 + 0);
            this._sceneDataTexture.preBind((boundDataTexture) => {
              boundDataTexture.update(sceneDataValues);
            });

            boundShader.setInteger1Uniform('u_sceneTextureData', 0);
            boundShader.setInteger1Uniform(
              'u_sceneTextureSize',
              sceneDataValues.length
            );
          } // scene data

          {
            // lights data

            const lightsDataValues: number[] = [];

            {
              // sun lights

              boundShader.setInteger1Uniform('u_sunLightsStart', 0);

              for (const sunLight of this._sunLights) {
                // add sun light

                lightsDataValues.push(
                  sunLight.direction[0],
                  sunLight.direction[1],
                  sunLight.direction[2]
                );
                lightsDataValues.push(sunLight.intensity);
              }

              boundShader.setInteger1Uniform(
                'u_sunLightsStop',
                lightsDataValues.length
              );
            } // sun lights

            {
              // spot lights

              boundShader.setInteger1Uniform(
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

              boundShader.setInteger1Uniform(
                'u_spotLightsStop',
                lightsDataValues.length
              );
            } // spot lights

            gl.activeTexture(gl.TEXTURE0 + 1);
            this._lightsDataTexture.preBind((boundDataTexture) => {
              boundDataTexture.update(lightsDataValues);
            });

            boundShader.setInteger1Uniform('u_lightsTextureData', 1);
          } // lights data

          //
          //
          //

          this._rayTracerGeometry.render();
        });
      } // raytracing pass
    });

    gl.viewport(0, 0, this._canvasWidth, this._canvasHeight);
    gl.clear(gl.COLOR_BUFFER_BIT /*| gl.DEPTH_BUFFER_BIT*/);

    {
      // texture pass

      const shader = this._textureShaderProgram;

      shader.bind((boundShader) => {
        // shader.setInteger1Uniform('u_texture', 0);
        // gl.activeTexture(gl.TEXTURE0 + 0);
        // this._finalTexture.bind();
        boundShader.setTextureUniform('u_texture', this._finalTexture, 0);

        // anti aliasing setup

        // const u_step = boundShader.getUniform('u_step');

        if (this._antiAliasing) {
          const stepX = (1 - this._renderWidth / this._canvasWidth) * 0.005;
          const stepY = (1 - this._renderHeight / this._canvasHeight) * 0.005;

          boundShader.setFloat2Uniform('u_step', stepX, stepY);
        } else {
          boundShader.setFloat2Uniform('u_step', 0, 0);
        }

        this._screenGeometry.render();
      });
    } // texture pass

    // ShaderProgram.unbind();

    // gl.enable(gl.DEPTH_TEST);
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
  get boxes(): ReadonlyArray<InternalBox> {
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
