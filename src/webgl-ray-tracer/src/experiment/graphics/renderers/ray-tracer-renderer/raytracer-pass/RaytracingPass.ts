
import { graphics } from '@local-framework';

// @ts-ignore
import rayTracerVertex from './shaders/ray-tracer.glsl.vert';
// @ts-ignore
import rayTracerFragment from './shaders/ray-tracer.glsl.frag';

import * as glm from 'gl-matrix';

import { BvhTree } from './internals/BvhTree';

import { BvhManager } from './internals/BvhManager';
import { BvhDebug } from './internals/BvhDebug';
import { IMaterialsManager, MaterialsManager } from './internals/MaterialsManager';
import { ISpotLightsManager, SpotLightsManager } from './internals/SpotLightsManager';
import { IShapesManager, ShapesManager } from './internals/ShapesManager';

const {
  WebGLContext,
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

  materialsManager: Readonly<IMaterialsManager>;
  shapesManager: Readonly<IShapesManager>;
  spotLightsManager: Readonly<ISpotLightsManager>;
};

export class RayTracerPass implements IRayTracerPass {
  private _cameraFovy: number;

  private _renderWidth: number;
  private _renderHeight: number;

  private _rayTracerShaderProgram: graphics.webgl2.IUnboundShader;

  private _rayTracerGeometry: graphics.webgl2.GeometryWrapper.Geometry;

  private _bvhTree = new BvhTree();

  private _camera: ICamera;

  private _bvhManager = new BvhManager('u_bvhDataTexture');
  private _materialsManager = new MaterialsManager('u_materialsTextureData');
  private _shapesManager: ShapesManager;
  private _spotLightsManager = new SpotLightsManager("u_lightsTextureData", "u_lightsTextureSize");

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

    this._shapesManager = new ShapesManager(this._materialsManager, 'u_sceneTextureData', 'u_sceneTextureSize');

    this._camera = {
      position: glm.vec3.fromValues(0, 0, 0),
      target: glm.vec3.fromValues(1.5, 1.5, 1.5),
      up: glm.vec3.fromValues(0, 1, 0)
    };
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

    this._bvhTree.synchronize(this._shapesManager.spheres, this._shapesManager.boxes, this._shapesManager.triangles);
    this._bvhManager.syncRootNode(this._bvhTree.getRootNode());
    this._bvhManager.prepareBuffer();
    this._materialsManager.prepareBuffer();
    this._shapesManager.prepareBuffer();
    this._spotLightsManager.prepareBuffer();

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
          const textureUnit = 6;
          gl.activeTexture(gl.TEXTURE0 + textureUnit);
          this._bvhManager.dataTexture.syncGpuData();
          this._bvhManager.dataTexture.setForShader(boundShader, textureUnit);
        }

        {
          const textureUnit = 0;
          gl.activeTexture(gl.TEXTURE0 + textureUnit);
          this._shapesManager.dataTexture.syncGpuDataLength(boundShader);
          this._shapesManager.dataTexture.syncGpuData();
          this._shapesManager.dataTexture.setForShader(boundShader, textureUnit);
        }

        {
          const textureUnit = 7;
          gl.activeTexture(gl.TEXTURE0 + textureUnit);
          this._materialsManager.dataTexture.syncGpuData();
          this._materialsManager.dataTexture.setForShader(boundShader, textureUnit);
        }

        {
          const textureUnit = 1;
          gl.activeTexture(gl.TEXTURE0 + textureUnit);
          this._spotLightsManager.dataTexture.syncGpuDataLength(boundShader);
          this._spotLightsManager.dataTexture.syncGpuData();
          this._spotLightsManager.dataTexture.setForShader(boundShader, textureUnit);
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
    this._spotLightsManager.clear();
    this._materialsManager.clear();
    this._shapesManager.clear();
  }

  bvhRenderDebugWireframe(renderer: IStackRenderer) {
    BvhDebug.renderDebugWireframe(this._bvhTree.getRootNode(), renderer)
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

  get renderWidth() {
    return this._renderWidth;
  }
  get renderHeight() {
    return this._renderHeight;
  }

  get camera(): Readonly<ICamera> {
    return this._camera;
  }

  get materialsManager(): Readonly<IMaterialsManager> {
    return this._materialsManager;
  }

  get shapesManager(): Readonly<IShapesManager> {
    return this._shapesManager;
  }

  get spotLightsManager(): Readonly<ISpotLightsManager> {
    return this._spotLightsManager;
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

    // must calculate the "camera up axis"
    // -> since the value of "this._camera.up" is likely constant
    const upDir = glm.vec3.cross(glm.vec3.create(), leftDir, forwardDir);

    const radHalfFovy = _degreeToRad(this._cameraFovy * 0.5);
    const xLength = (Math.cos(radHalfFovy) * 1) / Math.sin(radHalfFovy);

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

}
