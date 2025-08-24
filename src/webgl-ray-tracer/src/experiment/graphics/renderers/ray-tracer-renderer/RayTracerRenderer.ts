import { graphics } from '@local-framework';
const {
  WebGLContext,
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

// @ts-ignore
import asciiArtVertex from './shaders/ascii-art.glsl.vert';
// @ts-ignore
import asciiArtFragment from './shaders/ascii-art.glsl.frag';

import * as glm from 'gl-matrix';

import { BVH } from './BVH';

const _degreeToRad = (angle: number) => (angle * Math.PI) / 180;

export interface IDefinition {
  canvasWidth: number;
  canvasHeight: number;
  fovy: number;
}

//
//
//

export interface IPublicBaseMaterial {
  materialAlias: number;
  castShadowEnabled: boolean;
}
export interface IInternalBaseMaterial {
  materialType: 0 | 1;
}

export interface IPublicBasicMaterial extends IPublicBaseMaterial {
  reflectionFactor: number;
  refractionFactor: number;
  color: glm.ReadonlyVec3;
  receiveLightEnabled: boolean;
}

export type IInternalBasicMaterial = IPublicBasicMaterial & IInternalBaseMaterial;

export interface IPublicChessboardMaterial extends IPublicBaseMaterial {
  materialIdA: number;
  materialIdB: number;
  chessboardArgs?: glm.ReadonlyVec3;
}

export type IInternalChessboardMaterial = IPublicChessboardMaterial & IInternalBaseMaterial;

//
//
//

export interface IPublicSphere {
  position: glm.ReadonlyVec3;
  orientation: glm.ReadonlyQuat;
  radius: number;
  materialAlias: number;
}

export type IInternalSphere = IPublicSphere;

export interface IPublicBox {
  position: glm.ReadonlyVec3;
  orientation: glm.ReadonlyQuat;
  boxSize: glm.ReadonlyVec3;
  materialAlias: number;
}

export type IInternalBox = IPublicBox;

export interface IPublicTriangle {
  v0: glm.ReadonlyVec3;
  v1: glm.ReadonlyVec3;
  v2: glm.ReadonlyVec3;
  materialAlias: number;
}

export type IInternalTriangle = IPublicTriangle;

//
//
//

// export interface ISunLight {
//   direction: glm.ReadonlyVec3;
//   intensity: number;
// }

export interface ISpotLight {
  position: glm.ReadonlyVec3;
  intensity: number;
  radius: number;
}

//
//
//

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

  pushBasicMaterial(params: IPublicBasicMaterial): void;
  pushChessboardMaterial(params: IPublicChessboardMaterial): void;

  pushSphere(params: IPublicSphere): void;
  pushBox(params: IPublicBox): void;
  pushTriangle(params: IPublicTriangle): void;

  // pushSunLight({ direction, intensity }: ISunLight): void;

  pushSpotLight({ position, intensity, radius }: ISpotLight): void;

  lookAt(
    eye: glm.ReadonlyVec3,
    target: glm.ReadonlyVec3,
    up: glm.ReadonlyVec3
  ): void;

  render(): void;
  renderAsciiArt(): void;

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
  private _asciiArtShaderProgram: graphics.webgl2.IUnboundShader;

  private _rayTracerGeometry: graphics.webgl2.GeometryWrapper.Geometry;
  private _screenGeometry: graphics.webgl2.GeometryWrapper.Geometry;
  private _asciiArtScreenGeometry: graphics.webgl2.GeometryWrapper.Geometry;

  private _finalTexture: graphics.webgl2.IUnboundTexture;
  private _frameBuffer: graphics.webgl2.IUnboundFrameBuffer;

  private _sceneDataTexture: graphics.webgl2.IUnboundDataTextureVec4f32;
  private _spheres: IInternalSphere[] = [];
  private _boxes: IInternalBox[] = [];
  private _triangles: IInternalTriangle[] = [];

  private _allBasicMaterials: IInternalBasicMaterial[] = []
  private _allChessboardMaterials: IInternalChessboardMaterial[] = []
  private _materialsDataTexture: graphics.webgl2.IUnboundDataTextureVec4f32;

  private _lightsDataTexture: graphics.webgl2.IUnboundDataTextureVec4f32;
  // private _sunLights: ISunLight[] = [];
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
        // 'u_sceneTextureSize',
        'u_materialsTextureData',

        // 'u_totalShapes',

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

    this._asciiArtShaderProgram = new ShaderProgram('RayTracerRenderer-ascii-art', {
      vertexSrc: asciiArtVertex,
      fragmentSrc: asciiArtFragment,
      attributes: ['a_vertexPosition', 'a_vertexTextureCoord'],
      uniforms: ['u_texture']
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

    const screenVertices: number[] = [];
    screenVertices.push(+1.0, +1.0, 1, 1); // top right
    screenVertices.push(-1.0, +1.0, 0, 1); // top left
    screenVertices.push(+1.0, -1.0, 1, 0); // bottom right
    screenVertices.push(-1.0, -1.0, 0, 0); // bottom left

    //

    geoBuilder
      .reset()
      .setPrimitiveType('triangleStrip')
      .addVbo()
      .addVboAttribute('a_vertexPosition', 'vec2f')
      .addVboAttribute('a_vertexTextureCoord', 'vec2f');

    //

    this._screenGeometry = new GeometryWrapper.Geometry(
      this._asciiArtShaderProgram,
      geoBuilder.getDef()
    );

    this._screenGeometry.allocateBuffer(
      0,
      screenVertices,
      screenVertices.length
    );
    this._screenGeometry.setPrimitiveStart(0);
    this._screenGeometry.setPrimitiveCount(4);

    //

    this._asciiArtScreenGeometry = new GeometryWrapper.Geometry(
      this._asciiArtShaderProgram,
      geoBuilder.getDef()
    );

    this._asciiArtScreenGeometry.allocateBuffer(
      0,
      screenVertices,
      screenVertices.length
    );
    this._asciiArtScreenGeometry.setPrimitiveStart(0);
    this._asciiArtScreenGeometry.setPrimitiveCount(4);

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

  pushBasicMaterial(params: IPublicBasicMaterial): void {

    if (params.reflectionFactor < 0 || params.reflectionFactor > 1) {
      throw new Error('invalid sphere reflection');
    }
    if (params.refractionFactor < 0 || params.refractionFactor > 1) {
      throw new Error('invalid sphere refractionFactor');
    }
    const foundMat = this._allBasicMaterials.find(currVal => currVal.materialAlias === params.materialAlias);
    if (foundMat) {
      throw new Error(`duplicated material alias -> "${params.materialAlias}"`)
    }

    this._allBasicMaterials.push({ ...params, materialType: 0 });
  }

  pushChessboardMaterial(params: IPublicChessboardMaterial): void {

    const foundMat = this._allChessboardMaterials.find(currVal => currVal.materialAlias === params.materialAlias);
    if (foundMat) {
      throw new Error(`duplicated material alias -> "${params.materialAlias}"`);
    }
    const foundSubMatA = this._allBasicMaterials.find(currVal => currVal.materialAlias === params.materialIdA);
    if (!foundSubMatA) {
      throw new Error(`missing material alias -> "${params.materialIdA}"`);
    }
    const foundSubMatB = this._allBasicMaterials.find(currVal => currVal.materialAlias === params.materialIdB);
    if (!foundSubMatB) {
      throw new Error(`missing material alias -> "${params.materialIdB}"`);
    }

    this._allChessboardMaterials.push({ ...params, materialType: 1 });
  }

  pushSphere({
    position,
    orientation,
    radius,
    materialAlias,
  }: IPublicSphere): void {
    if (radius <= 0) {
      throw new Error('invalid sphere radius');
    }

    const foundMat1 = this._allBasicMaterials.find(currVal => currVal.materialAlias === materialAlias);
    const foundMat2 = this._allChessboardMaterials.find(currVal => currVal.materialAlias === materialAlias);
    if (!foundMat1 && !foundMat2) {
      throw new Error(`not found material alias -> "${materialAlias}"`);
    }

    this._spheres.push({
      position: [position[0], position[1], position[2]],
      orientation: [orientation[0], orientation[1], orientation[2], orientation[3]],
      radius,
      materialAlias,
    });
  }

  pushBox({
    position,
    orientation,
    boxSize,
    materialAlias,
  }: IPublicBox): void {
    if (boxSize[0] <= 0 || boxSize[1] <= 0 || boxSize[2] <= 0) {
      throw new Error('invalid box size');
    }

    const foundMat1 = this._allBasicMaterials.find(currVal => currVal.materialAlias === materialAlias);
    const foundMat2 = this._allChessboardMaterials.find(currVal => currVal.materialAlias === materialAlias);
    if (!foundMat1 && !foundMat2) {
      throw new Error(`not found material alias -> "${materialAlias}"`);
    }

    this._boxes.push({
      position: [position[0], position[1], position[2]],
      orientation: [orientation[0], orientation[1], orientation[2], orientation[3]],
      boxSize: glm.vec3.clone(boxSize),
      materialAlias,
    });
  }

  pushTriangle({
    v0,
    v1,
    v2,
    materialAlias,
  }: IPublicTriangle) {

    const foundMat1 = this._allBasicMaterials.find(currVal => currVal.materialAlias === materialAlias);
    const foundMat2 = this._allChessboardMaterials.find(currVal => currVal.materialAlias === materialAlias);
    if (!foundMat1 && !foundMat2) {
      throw new Error(`not found material alias -> "${materialAlias}"`);
    }

    this._triangles.push({
      v0: glm.vec3.clone(v0),
      v1: glm.vec3.clone(v1),
      v2: glm.vec3.clone(v2),
      materialAlias,
    });
  }

  // pushSunLight({ direction, intensity }: ISunLight) {
  //   // add sun light

  //   if (intensity <= 0) throw new Error('intensity cannot be 0');
  //   if (glm.vec3.length(direction) === 0)
  //     throw new Error('direction cannot be 0');

  //   const dir = glm.vec3.normalize(glm.vec3.clone(direction), direction);

  //   this._sunLights.push({ direction: dir, intensity });
  // }

  pushSpotLight({ position, intensity, radius }: ISpotLight): void {
    // add spot light

    if (intensity <= 0) {
      throw new Error('intensity cannot be <= 0');
    }
    if (radius <= 0) {
      throw new Error('radius cannot be <= 0');
    }

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

  renderAsciiArt() {
    // texture pass first
    // -> we render the previous frame to avoid potential webgl queue blocking
    this._renderAsciiArtTexturePass();
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

  private _renderAsciiArtTexturePass() {
    const gl = WebGLContext.getContext();

    gl.viewport(0, 0, this._canvasWidth, this._canvasHeight);
    gl.clear(gl.COLOR_BUFFER_BIT /*| gl.DEPTH_BUFFER_BIT*/);

    const shader = this._asciiArtShaderProgram;

    shader.bind((boundShader) => {
      boundShader.setTextureUniform('u_texture', this._finalTexture, 0);

      this._asciiArtScreenGeometry.render();
    });
  }

  private _renderRayTracingPass() {
    const gl = WebGLContext.getContext();

    const farCorners = this._computeCameraFarCornersBufferGeometry();
    this._rayTracerGeometry.allocateBuffer(1, farCorners, farCorners.length);

    const scaledWidth = Math.floor(this._renderWidth);
    const scaledHeight = Math.floor(this._renderHeight);

    this._bvh.synchronize(this._spheres, this._boxes, this._triangles);

    const bvhPixelsData = this._bvh.fillDataTexture();

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

            let currIndex = 0;

            const matAliasToIndex = new Map<number, number>();
            this._allBasicMaterials.forEach((currMat) => {

              matAliasToIndex.set(currMat.materialAlias, currIndex);
              currIndex += 1;

              const matType = 0;

              // currMat.materialAlias
              materialsDataValues.push([
                matType + 0.5, // [0] R
                (currMat.castShadowEnabled ? 1 : 0) + 0.5, // [1] G
                currMat.reflectionFactor, // [2] B
                currMat.refractionFactor, // [3] A
              ]);
              materialsDataValues.push([
                currMat.receiveLightEnabled ? 1 : 0, // [4] R
                currMat.color[0], // [5] G
                currMat.color[1], // [6] B
                currMat.color[2], // [7] A
              ]);

            });

            this._allChessboardMaterials.forEach((currMat) => {

              matAliasToIndex.set(currMat.materialAlias, currIndex);
              currIndex += 1;

              const sunMatIndexA = this._allBasicMaterials.findIndex(currVal => currVal.materialAlias === currMat.materialIdA);
              const sunMatIndexB = this._allBasicMaterials.findIndex(currVal => currVal.materialAlias === currMat.materialIdB);

              if (sunMatIndexA < 0 || sunMatIndexB < 0) {
                throw new Error("chessboard material, material not found");
              }

              const matType = 1;

              // currMat.materialAlias
              materialsDataValues.push([
                matType + 0.5, // [0] R
                (currMat.castShadowEnabled ? 1 : 0) + 0.5, // [1] G
                sunMatIndexA + 0.5, // [2] B
                sunMatIndexB + 0.5, // [3] A
              ]);
              materialsDataValues.push([
                currMat.chessboardArgs ? currMat.chessboardArgs[0] : 1.0, // [4] R
                currMat.chessboardArgs ? currMat.chessboardArgs[1] : 1.0, // [5] G
                currMat.chessboardArgs ? currMat.chessboardArgs[2] : 1.0, // [6] B
                0, // [7] A
              ]);

            });

            {
              {
                // spheres

                for (const sphere of this._spheres) {
                  // add sphere

                  const currMatIndex = matAliasToIndex.get(sphere.materialAlias);
                  if (currMatIndex === undefined) {
                    throw new Error(`sphere materialAlias not found ${sphere.materialAlias} (${JSON.stringify(this._allBasicMaterials)})`);
                  }


                  sceneDataValues.push([
                    1 + 0.5, // [0] R
                    currMatIndex + 0.5, // [1] G
                    sphere.position[0], // [2] B
                    sphere.position[1], // [3] A
                  ]);
                  sceneDataValues.push([
                    sphere.position[2], // [4] R
                    sphere.orientation[0], // [5] G
                    sphere.orientation[1], // [6] B
                    sphere.orientation[2], // [7] A
                  ]);
                  sceneDataValues.push([
                    sphere.orientation[3], // [8] R
                    sphere.radius, // [9] G
                    0,
                    0,
                  ]);

                }

              } // spheres

              {
                // boxes

                for (const box of this._boxes) {
                  // add box

                  const currMatIndex = matAliasToIndex.get(box.materialAlias);
                  if (currMatIndex === undefined) {
                    throw new Error(`box materialAlias not found ${box.materialAlias} (${JSON.stringify(this._allBasicMaterials)})`);
                  }

                  sceneDataValues.push([
                    2 + 0.5,
                    currMatIndex + 0.5, // [10]
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

                }

              } // boxes

              {
                // triangles

                for (const triangle of this._triangles) {
                  // add triangle

                  const currMatIndex = matAliasToIndex.get(triangle.materialAlias);
                  if (currMatIndex === undefined) {
                    throw new Error(`triangle materialAlias not found ${triangle.materialAlias} (${JSON.stringify(this._allBasicMaterials)})`);
                  }

                  sceneDataValues.push([
                    3 + 0.5,
                    currMatIndex + 0.5, // [0]
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

                }

                // boundShader.setInteger1Uniform(
                //   'u_totalShapes',
                //   sceneDataValues.length
                // );

              } // triangles
            }

            gl.activeTexture(gl.TEXTURE0 + 0);
            this._sceneDataTexture.preBind((boundDataTexture) => {
              boundDataTexture.update(0, sceneDataValues);
            });

            boundShader.setInteger1Uniform('u_sceneTextureData', 0);
            // boundShader.setInteger1Uniform(
            //   'u_sceneTextureSize',
            //   sceneDataValues.length
            // );

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
              // // sun lights

              // for (const sunLight of this._sunLights) {
              //   // add sun light

              //   lightsDataValues.push([
              //     sunLight.direction[0],
              //     sunLight.direction[1],
              //     sunLight.direction[2],
              //     sunLight.intensity,
              //   ]);
              // }

              // boundShader.setInteger1Uniform(
              //   'u_sunLightsStop',
              //   lightsDataValues.length
              // );

              boundShader.setInteger1Uniform(
                'u_sunLightsStop',
                0
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
    // this._sunLights.length = 0;
    this._spotLights.length = 0;

    this._allBasicMaterials.length = 0;
    this._allChessboardMaterials.length = 0;
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

  private _computeCameraFarCornersBufferGeometry(): ReadonlyArray<number> {
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

  // getMaterialByAlias(materialAlias: number): IPublicBasicMaterial {
  //   const foundMat = this._allBasicMaterials.find(currVal => currVal.materialAlias === materialAlias);
  //   if (!foundMat) {
  //     throw new Error(`not found material alias -> "${materialAlias}"`);
  //   }
  //   return foundMat;
  // }
  get basicMaterials(): ReadonlyArray<IInternalBasicMaterial> {
    return this._allBasicMaterials;
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

  // get sunLights(): ReadonlyArray<ISunLight> {
  //   return this._sunLights;
  // }
  get spotLights(): ReadonlyArray<ISpotLight> {
    return this._spotLights;
  }
}


// #endregion lol
