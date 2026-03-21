
import { system, graphics } from '@local-framework';

// @ts-ignore
import rayTracerVertex from './shaders/ray-tracer-0.glsl.vert';
// @ts-ignore
import rayTracerFragment from './shaders/ray-tracer-1.glsl.frag';

import * as glm from 'gl-matrix';

// import { ShapesBvh2Tree } from './internals/bvh/bvh2/ShapesBvh2Tree';
// import { Bvh2Debug } from './internals/bvh/bvh2/Bvh2Debug';
// import { GpuBvh2NodeManager } from './internals/GpuBvh2NodeManager';

import { ShapesBvh4Tree } from './internals/bvh/bvh4/ShapesBvh4Tree';
import { Bvh4Debug } from './internals/bvh/bvh4/Bvh4Debug';
import { GpuBvh4NodeManager } from './internals/GpuBvh4NodeManager';

import { IGpuMaterialsManager, GpuMaterialsManager } from './internals/GpuMaterialsManager';
import { IGpuPointLightsManager, GpuPointLightsManager } from './internals/GpuPointLightsManager';
import { IGpuShapesManager, GpuShapesManager } from './internals/GpuShapesManager';
import { GpuDataTexture2d } from './internals/GpuDataTexture2d';

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

// MARK: ITestScene
interface ITestScene {
  markAsDirty(): void;
  bvhRenderDebugWireframe(renderer: IStackRenderer, modelView?: glm.ReadonlyMat4): void;
  gpuMaterialsManager: Readonly<IGpuMaterialsManager>;
  gpuShapesManager: Readonly<IGpuShapesManager>;
};

// MARK: TestScene
class TestScene {

  private _gpuDataTexture2d: GpuDataTexture2d;

  private _gpuMaterialsManager: GpuMaterialsManager;
  private _gpuShapesManager: GpuShapesManager;

  // private _bvhTree = new ShapesBvh2Tree();
  // private _gpuBvh2NodeManager: GpuBvh2NodeManager;
  private _bvhTree = new ShapesBvh4Tree();
  private _gpuBvh4NodeManager: GpuBvh4NodeManager;

  private _isDirty: boolean = true;

  constructor(inGpuDataTexture2d: GpuDataTexture2d) {
    this._gpuDataTexture2d = inGpuDataTexture2d;

    this._gpuMaterialsManager = new GpuMaterialsManager(this._gpuDataTexture2d);
    this._gpuShapesManager = new GpuShapesManager(
      this._gpuDataTexture2d,
      this._gpuMaterialsManager,
    );

    // this._gpuBvh2NodeManager = new GpuBvh2NodeManager(this._gpuDataTexture2d);
    this._gpuBvh4NodeManager = new GpuBvh4NodeManager(this._gpuDataTexture2d);
  }

  reset(): void {
    // this._bvhTree.reset(); // <- commented, breaks the "graphic debugger"
    this._gpuBvh4NodeManager.clear();
    this._gpuMaterialsManager.clear();
    this._gpuShapesManager.clear();
  }

  // isDirty(sceneIndex: number): boolean {
  //   const baseIndex = 1 + sceneIndex * 6;
  //   for (let ii = 0; ii < 6; ++ii) {
  //     if (this._gpuDataTexture2d.getDataRow(baseIndex + ii).isDirty) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  markAsDirty(): void {
    this._isDirty = true;
  }

  prepareBuffer(sceneIndex: number, allScenes: ReadonlyArray<TestScene>): void {

    if (!this._isDirty) {
      return;
    }
    this._isDirty = false;

    // if (!this.isDirty(sceneIndex)) {
    //   return;
    // }

    const baseIndex = 1 + sceneIndex * 6;

    this._bvhTree.synchronize(
      this._gpuShapesManager.spheres,
      this._gpuShapesManager.boxes,
      this._gpuShapesManager.triangles,
      this._gpuShapesManager.subScenes,
      allScenes,
    );

    this._gpuBvh4NodeManager.syncRootNode(this._bvhTree.getRootNode());

    this._gpuMaterialsManager.prepareBuffer(baseIndex + 0);
    this._gpuBvh4NodeManager.prepareBuffer(baseIndex + 1);
    this._gpuShapesManager.prepareBufferSpheres(baseIndex + 2);
    this._gpuShapesManager.prepareBufferBoxes(baseIndex + 3);
    this._gpuShapesManager.prepareBufferTriangles(baseIndex + 4);
    this._gpuShapesManager.prepareBufferSubScene(baseIndex + 5);
  }

  bvhRenderDebugWireframe(renderer: IStackRenderer, modelView?: glm.ReadonlyMat4) {
    // Bvh2Debug.renderDebugWireframe(this._bvhTree.getRootNode(), renderer)
    Bvh4Debug.renderDebugWireframe(this._bvhTree.getRootNode(), renderer, modelView);
  }

  get min(): glm.ReadonlyVec3 { return this._bvhTree.getRootNode()?.min ?? [0,0,0]; }
  get max(): glm.ReadonlyVec3 { return this._bvhTree.getRootNode()?.max ?? [0,0,0]; }

  get gpuMaterialsManager(): Readonly<IGpuMaterialsManager> {
    return this._gpuMaterialsManager;
  }

  get gpuShapesManager(): Readonly<IGpuShapesManager> {
    return this._gpuShapesManager;
  }

}


// MARK: IRayTracerPass
export interface IRayTracerPass {

  lookAt(
    eye: glm.ReadonlyVec3,
    target: glm.ReadonlyVec3,
    up: glm.ReadonlyVec3
  ): void;

  render(): void;
  reset(): void;

  // bvhRenderDebugWireframe(renderer: IStackRenderer): void;

  getCurrentSize(): glm.ReadonlyVec2;

  camera: Readonly<ICamera>;
  renderWidth: number;
  renderHeight: number;

  // gpuMaterialsManager: Readonly<IGpuMaterialsManager>;
  // gpuShapesManager: Readonly<IGpuShapesManager>;
  gpuPointLightsManager: Readonly<IGpuPointLightsManager>;

  allScenes: ReadonlyArray<Readonly<ITestScene>>;
};

// MARK: RayTracerPass
export class RayTracerPass implements IRayTracerPass {
  private _cameraFovy: number;

  private _renderWidth: number;
  private _renderHeight: number;

  private _sceneStack: number = 7;
  private _lightStack: number = 5;

  private _rayTracerShaderProgram: graphics.webgl2.IUnboundShader;

  // the far corners of the camera
  private _rayTracerGeometry: graphics.webgl2.GeometryWrapper.Geometry;

  private _camera: ICamera;

  private _gpuDataTexture2d = new GpuDataTexture2d("u_dataTexture");

  private _gpuPointLightsManager: GpuPointLightsManager;

  private _allScenes: TestScene[] = [];

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
        'u_dataTexture',
        'u_lightsTextureSize',
        'u_maxSceneStackSize',
        'u_maxLightStackSize',
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

    this._gpuPointLightsManager = new GpuPointLightsManager(this._gpuDataTexture2d);

    this._allScenes.push(new TestScene(this._gpuDataTexture2d));
    this._allScenes.push(new TestScene(this._gpuDataTexture2d));

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

  // MARK: render
  render() {
    const gl = WebGLContext.getContext();

    const farCorners = this._computeCameraFarCornersBufferGeometry();
    this._rayTracerGeometry.allocateBuffer(1, farCorners, farCorners.length);

    this._gpuPointLightsManager.prepareBuffer(0);
    const lightsTextureSize = this._gpuDataTexture2d.getDataRow(0).currentIndex;

    this._allScenes.forEach((currScene, index) => currScene.prepareBuffer(index, this._allScenes));

    this._gpuDataTexture2d.uploadToGpu();

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

        // boundShader.setInteger1Uniform('u_sceneTextureSize', sceneTextureSize);
        boundShader.setInteger1Uniform('u_lightsTextureSize', lightsTextureSize);

        boundShader.setInteger1Uniform('u_maxSceneStackSize', this._sceneStack);
        boundShader.setInteger1Uniform('u_maxLightStackSize', this._lightStack);

        //
        //
        //

        {
          const textureUnit = 0;
          gl.activeTexture(gl.TEXTURE0 + textureUnit);
          this._gpuDataTexture2d.setForShader(boundShader, textureUnit);
        }

        //
        //
        //

        this._rayTracerGeometry.render();
      });
    } // raytracing pass
  }

  // MARK: reset, etc.
  reset(): void {
    this._gpuPointLightsManager.clear();
    this._allScenes.forEach(currScene => currScene.reset());
  }

  // MARK: getters/setters
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

  setSceneMaxStack(inValue: number): void {
    const safeValue = system.math.clamp(inValue, 1, 7); // [1..7]
    this._sceneStack = safeValue;
  }

  setLightMaxStack(inValue: number): void {
    const safeValue = system.math.clamp(inValue, 1, 5); // [1..5]
    this._lightStack = safeValue;
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

  get allScenes(): ReadonlyArray<Readonly<ITestScene>> {
    return this._allScenes;
  }

  get gpuPointLightsManager(): Readonly<IGpuPointLightsManager> {
    return this._gpuPointLightsManager;
  }

  // MARK: computeCameraFarCornersBufferGeometry
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
