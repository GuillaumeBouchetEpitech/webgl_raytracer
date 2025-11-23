
import { graphics } from '@local-framework';

// @ts-ignore
import rayTracerVertex from './shaders/ray-tracer.glsl.vert';
// @ts-ignore
import rayTracerFragment from './shaders/ray-tracer.glsl.frag';

import * as allInterfaces from './all-interfaces';

import * as glm from 'gl-matrix';

import { BvhTree } from './internals/BvhTree';
import { GpuDataTexture } from './internals/GpuDataTexture';

const {
  WebGLContext,
  DataTextureVec4f32,
  ShaderProgram,
  GeometryWrapper
} = graphics.webgl2;

const _degreeToRad = (angle: number) => (angle * Math.PI) / 180;

export interface IDefinition {
  width: number;
  height: number;
  fovy: number;
}

//
//
//

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

  push3dLine(
    inPointA: glm.ReadonlyVec3,
    inPointB: glm.ReadonlyVec3,
    thicknessA: number,
    thicknessB: number,
    inColorA: glm.ReadonlyVec3 | glm.ReadonlyVec4,
    inColorB: glm.ReadonlyVec3 | glm.ReadonlyVec4
  ): void;


};

//
//
//

export interface IRayTracerPass {

  pushBasicMaterial(params: allInterfaces.IPublicBasicMaterial): void;
  pushChessboardMaterial(params: allInterfaces.IPublicChessboardMaterial): void;

  pushSphere(params: allInterfaces.IPublicSphere): void;
  pushBox(params: allInterfaces.IPublicBox): void;
  pushTriangle(params: allInterfaces.IPublicTriangle): void;

  pushSpotLight({ position, intensity, radius }: allInterfaces.ISpotLight): void;

  lookAt(
    eye: glm.ReadonlyVec3,
    target: glm.ReadonlyVec3,
    up: glm.ReadonlyVec3
  ): void;

  render(): void;
  reset(): void;

  bvhRenderDebugWireframe(renderer: IStackRenderer): void;

  getCurrentSize(): glm.ReadonlyVec2;

  camera: Readonly<ICamera>;
  renderWidth: number;
  renderHeight: number;

  basicMaterials: ReadonlyArray<allInterfaces.IInternalBasicMaterial>;
  spheres: ReadonlyArray<allInterfaces.IInternalSphere>;
  boxes: ReadonlyArray<allInterfaces.IInternalBox>;
  triangles: ReadonlyArray<allInterfaces.IInternalTriangle>;
  spotLights: ReadonlyArray<allInterfaces.ISpotLight>;
};




export class RayTracerPass implements IRayTracerPass {
  private _cameraFovy: number;

  private _renderWidth: number;
  private _renderHeight: number;

  private _rayTracerShaderProgram: graphics.webgl2.IUnboundShader;

  private _rayTracerGeometry: graphics.webgl2.GeometryWrapper.Geometry;

  private _sceneDataTexture: GpuDataTexture;
  private _spheres: allInterfaces.IInternalSphere[] = [];
  private _boxes: allInterfaces.IInternalBox[] = [];
  private _triangles: allInterfaces.IInternalTriangle[] = [];

  private _basicMaterialsPerAliases = new Map<number, allInterfaces.IInternalBasicMaterial>();
  private _allBasicMaterials: allInterfaces.IInternalBasicMaterial[] = []
  private _chessboardMaterialsPerAliases = new Map<number, allInterfaces.IInternalChessboardMaterial>();
  private _allChessboardMaterials: allInterfaces.IInternalChessboardMaterial[] = []
  private _materialsDataTexture: GpuDataTexture;

  private _lightsDataTexture: GpuDataTexture;
  private _spotLights: allInterfaces.ISpotLight[] = [];

  private _bvhDataTexture: GpuDataTexture;
  private _bvhTree = new BvhTree();

  private _camera: ICamera;


  constructor(inDef: IDefinition) {
    this._cameraFovy = inDef.fovy;

    this._renderWidth = inDef.width;
    this._renderHeight = inDef.height;

    this._rayTracerShaderProgram = new ShaderProgram('RayTracerRenderer-1', {
      vertexSrc: rayTracerVertex,
      fragmentSrc: rayTracerFragment,
      attributes: ['a_vertexPosition', 'a_plotPosition'],
      uniforms: [
        'u_cameraEye',

        'u_useBvh',

        'u_sceneTextureData',
        'u_sceneTextureSize',

        'u_materialsTextureData',

        'u_lightsTextureData',
        'u_lightsTextureSize',

        'u_bvhDataTexture',
      ]
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

    this._sceneDataTexture = new GpuDataTexture('u_sceneTextureData', 'u_sceneTextureSize');
    this._materialsDataTexture = new GpuDataTexture('u_materialsTextureData');
    this._lightsDataTexture = new GpuDataTexture("u_lightsTextureData", "u_lightsTextureSize");


    // this._bvhDataTexture = new DataTextureVec4f32();
    // this._bvhDataTexture.initialize(2048);
    this._bvhDataTexture = new GpuDataTexture("u_bvhDataTexture");


    this._camera = {
      position: glm.vec3.fromValues(0, 0, 0),
      target: glm.vec3.fromValues(1.5, 1.5, 1.5),
      up: glm.vec3.fromValues(0, 1, 0)
    };
  }

  pushBasicMaterial(params: allInterfaces.IPublicBasicMaterial): void {

    if (this._basicMaterialsPerAliases.has(params.materialAlias)) {
      throw new Error(`duplicated basic material alias -> "${params.materialAlias}"`);
    }
    if (params.reflectionFactor < 0 || params.reflectionFactor > 1) {
      throw new Error('invalid sphere reflection');
    }
    if (params.refractionFactor < 0 || params.refractionFactor > 1) {
      throw new Error('invalid sphere refractionFactor');
    }

    const newMat: allInterfaces.IInternalBasicMaterial = { ...params, materialType: 0 };
    this._allBasicMaterials.push(newMat);
    this._basicMaterialsPerAliases.set(newMat.materialAlias, newMat);
  }

  pushChessboardMaterial(params: allInterfaces.IPublicChessboardMaterial): void {

    if (this._chessboardMaterialsPerAliases.has(params.materialAlias)) {
      throw new Error(`duplicated chessboard material alias -> "${params.materialAlias}"`);
    }
    if (!this._basicMaterialsPerAliases.has(params.materialAliasA)) {
      throw new Error(`missing material alias A -> "${params.materialAliasA}"`);
    }
    if (!this._basicMaterialsPerAliases.has(params.materialAliasB)) {
      throw new Error(`missing material alias B -> "${params.materialAliasB}"`);
    }

    const newMat: allInterfaces.IInternalChessboardMaterial = { ...params, materialType: 0 };
    this._allChessboardMaterials.push(newMat);
    this._chessboardMaterialsPerAliases.set(newMat.materialAlias, newMat);
  }

  pushSphere({
    position,
    orientation,
    radius,
    materialAlias,
  }: allInterfaces.IPublicSphere): void {
    if (radius <= 0) {
      throw new Error('invalid sphere radius');
    }

    if (
      !this._basicMaterialsPerAliases.has(materialAlias) &&
      !this._chessboardMaterialsPerAliases.has(materialAlias)
    ) {
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
  }: allInterfaces.IPublicBox): void {
    if (boxSize[0] <= 0 || boxSize[1] <= 0 || boxSize[2] <= 0) {
      throw new Error('invalid box size');
    }

    if (
      !this._basicMaterialsPerAliases.has(materialAlias) &&
      !this._chessboardMaterialsPerAliases.has(materialAlias)
    ) {
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
  }: allInterfaces.IPublicTriangle) {

    if (
      !this._basicMaterialsPerAliases.has(materialAlias) &&
      !this._chessboardMaterialsPerAliases.has(materialAlias)
    ) {
      throw new Error(`not found material alias -> "${materialAlias}"`);
    }

    this._triangles.push({
      v0: glm.vec3.clone(v0),
      v1: glm.vec3.clone(v1),
      v2: glm.vec3.clone(v2),
      materialAlias,
    });
  }

  pushSpotLight({ position, intensity, radius }: allInterfaces.ISpotLight): void {
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

// #region RENDER

  render() {
    const gl = WebGLContext.getContext();

    const farCorners = this._computeCameraFarCornersBufferGeometry();
    this._rayTracerGeometry.allocateBuffer(1, farCorners, farCorners.length);

    this._sceneDataTexture.clear();
    this._materialsDataTexture.clear();
    this._lightsDataTexture.clear();
    this._bvhDataTexture.clear();

    {
      // scene data

      let currIndex = 0;

      const matAliasToIndex = new Map<number, number>();
      this._allBasicMaterials.forEach((currMat) => {

        matAliasToIndex.set(currMat.materialAlias, currIndex);
        currIndex += 1;

        const matType = 0;

        this._materialsDataTexture.push(
          matType + 0.5, // [0] R
          (currMat.castShadowEnabled ? 1 : 0) + 0.5, // [1] G
          currMat.reflectionFactor, // [2] B
          currMat.refractionFactor, // [3] A
        );
        this._materialsDataTexture.push(
          currMat.receiveLightEnabled ? 1 : 0, // [4] R
          currMat.color[0], // [5] G
          currMat.color[1], // [6] B
          currMat.color[2], // [7] A
        );

      });

      this._allChessboardMaterials.forEach((currMat) => {

        matAliasToIndex.set(currMat.materialAlias, currIndex);
        currIndex += 1;

        const subMatIndexA = matAliasToIndex.get(currMat.materialAliasA);
        const subMatIndexB = matAliasToIndex.get(currMat.materialAliasB);

        if (subMatIndexA === undefined || subMatIndexB === undefined) {
          throw new Error("chessboard material, associated basic material not found");
        }

        const matType = 1;

        this._materialsDataTexture.push(
          matType + 0.5, // [0] R
          (currMat.castShadowEnabled ? 1 : 0) + 0.5, // [1] G
          subMatIndexA + 0.5, // [2] B
          subMatIndexB + 0.5, // [3] A
        );
        this._materialsDataTexture.push(
          currMat.chessboardArgs ? currMat.chessboardArgs[0] : 1.0, // [4] R
          currMat.chessboardArgs ? currMat.chessboardArgs[1] : 1.0, // [5] G
          currMat.chessboardArgs ? currMat.chessboardArgs[2] : 1.0, // [6] B
          0, // [7] A
        );

      });

      {
        {
          // spheres

          for (const sphere of this._spheres) {
            // add sphere

            const currMatIndex = matAliasToIndex.get(sphere.materialAlias);
            if (currMatIndex === undefined) {
              throw new Error(`sphere materialAlias not found ${sphere.materialAlias}`);
            }

            const shapeType = 1;

            this._sceneDataTexture.push(
              shapeType + 0.5, // [0] R
              currMatIndex + 0.5, // [1] G
              sphere.position[0], // [2] B
              sphere.position[1], // [3] A
            );
            this._sceneDataTexture.push(
              sphere.position[2], // [4] R
              sphere.orientation[0], // [5] G
              sphere.orientation[1], // [6] B
              sphere.orientation[2], // [7] A
            );
            this._sceneDataTexture.push(
              sphere.orientation[3], // [8] R
              sphere.radius, // [9] G
              0,
              0,
            );

          }

        } // spheres

        {
          // boxes

          for (const box of this._boxes) {
            // add box

            const currMatIndex = matAliasToIndex.get(box.materialAlias);
            if (currMatIndex === undefined) {
              throw new Error(`box materialAlias not found ${box.materialAlias}`);
            }

            const shapeType = 2;

            this._sceneDataTexture.push(
              shapeType + 0.5,
              currMatIndex + 0.5, // [10]
              box.position[0], // [0]
              box.position[1], // [1]
            );
            this._sceneDataTexture.push(
              box.position[2], // [2]
              box.orientation[0], // [3]
              box.orientation[1], // [4]
              box.orientation[2], // [5]
            );
            this._sceneDataTexture.push(
              box.orientation[3], // [6]
              box.boxSize[0], // [7]
              box.boxSize[1], // [8]
              box.boxSize[2], // [9]
            );

          }

        } // boxes

        {
          // triangles

          for (const triangle of this._triangles) {
            // add triangle

            const currMatIndex = matAliasToIndex.get(triangle.materialAlias);
            if (currMatIndex === undefined) {
              throw new Error(`triangle materialAlias not found ${triangle.materialAlias}`);
            }

            const shapeType = 3;

            this._sceneDataTexture.push(
              shapeType + 0.5,
              currMatIndex + 0.5, // [0]
              triangle.v0[0], // [1]
              triangle.v0[1], // [2]
            );
            this._sceneDataTexture.push(
              triangle.v0[2], // [3]
              triangle.v1[0], // [4]
              triangle.v1[1], // [5]
              triangle.v1[2], // [6]
            );
            this._sceneDataTexture.push(
              triangle.v2[0], // [7]
              triangle.v2[1], // [8]
              triangle.v2[2], // [9]
              0,
            );

          }

        } // triangles
      }

    } // scene data

    {
      // lights data

      {
        // spot lights

        for (const spotLight of this._spotLights) {
          // add spot light

          this._lightsDataTexture.push(
            spotLight.position[0],
            spotLight.position[1],
            spotLight.position[2],
            spotLight.radius,
          );
          this._lightsDataTexture.push(
            spotLight.intensity,
            0,
            0,
            0,
          );
        }

      } // spot lights

    } // lights data

    this._bvhTree.synchronize(this._spheres, this._boxes, this._triangles);

    this._bvhTree.fillDataTexture(this._bvhDataTexture);

    gl.viewport(0, 0, this._renderWidth, this._renderHeight);
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

        boundShader.setInteger1Uniform('u_useBvh', 1);

        //
        //
        //

        {
          const textureUnit = 0;
          gl.activeTexture(gl.TEXTURE0 + textureUnit);
          this._sceneDataTexture.syncGpuDataLength(boundShader);
          this._sceneDataTexture.syncGpuData();
          this._sceneDataTexture.setForShader(boundShader, textureUnit);
        }

        {
          const textureUnit = 7;
          gl.activeTexture(gl.TEXTURE0 + textureUnit);
          this._materialsDataTexture.syncGpuData();
          this._materialsDataTexture.setForShader(boundShader, textureUnit);
        }

        {
          const textureUnit = 1;
          gl.activeTexture(gl.TEXTURE0 + textureUnit);
          this._lightsDataTexture.syncGpuDataLength(boundShader);
          this._lightsDataTexture.syncGpuData();
          this._lightsDataTexture.setForShader(boundShader, textureUnit);
        }

        {
          const textureUnit = 6;
          gl.activeTexture(gl.TEXTURE0 + textureUnit);
          this._bvhDataTexture.syncGpuData();
          this._bvhDataTexture.setForShader(boundShader, textureUnit);
        }

        //
        //
        //

        this._rayTracerGeometry.render();
      });
    } // raytracing pass
  }

// #endregion RENDER

  reset(): void {
    this._spotLights.length = 0;

    this._chessboardMaterialsPerAliases.clear();
    this._allBasicMaterials.length = 0;

    this._basicMaterialsPerAliases.clear();
    this._allChessboardMaterials.length = 0;

    this._spheres.length = 0;
    this._boxes.length = 0;
    this._triangles.length = 0;
  }

  bvhRenderDebugWireframe(renderer: IStackRenderer) {
    this._bvhTree.renderDebugWireframe(renderer);
  }

  setRenderSize(width: number, height: number): void {
    if (width < 10 || height < 10) {
      return;
    }

    this._renderWidth = Math.floor(width);
    this._renderHeight = Math.floor(height);
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

    const aspectRatio = this._renderWidth / this._renderHeight;
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

  get renderWidth() {
    return this._renderWidth;
  }
  get renderHeight() {
    return this._renderHeight;
  }

  get camera(): Readonly<ICamera> {
    return this._camera;
  }

  get basicMaterials(): ReadonlyArray<allInterfaces.IInternalBasicMaterial> {
    return this._allBasicMaterials;
  }
  get spheres(): ReadonlyArray<allInterfaces.IInternalSphere> {
    return this._spheres;
  }
  get boxes(): ReadonlyArray<allInterfaces.IInternalBox> {
    return this._boxes;
  }
  get triangles(): ReadonlyArray<allInterfaces.IInternalTriangle> {
    return this._triangles;
  }
  get spotLights(): ReadonlyArray<allInterfaces.ISpotLight> {
    return this._spotLights;
  }
}
