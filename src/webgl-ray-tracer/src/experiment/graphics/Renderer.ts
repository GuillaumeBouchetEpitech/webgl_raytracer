import { graphics, system } from '@local-framework';
const { WebGLContext } = graphics.webgl2;
const { Camera } = graphics.camera;
const { TextRenderer, StackRenderers } = graphics.renderers;

import {
  RayTracerRenderer,
  IRayTracerRenderer,
  allInterfaces
} from './renderers';

import * as glm from 'gl-matrix';

//

const k_fovy = 70;

interface IDefinition {
  width: number;
  height: number;
}

export class Renderer {
  private _def: IDefinition;

  private _rayTracerRenderer: RayTracerRenderer;
  private _textRenderer: graphics.renderers.TextRenderer;
  private _stackRenderers: graphics.renderers.StackRenderers;
  private _multipleBuffering: graphics.renderers.MultiBuffersRendering;

  private _debugSceneCamera = new Camera();
  private _mainHudCamera = new Camera();

  constructor(def: IDefinition) {
    this._def = def;

    this.resize(
      this._def.width,
      this._def.height
    );

    this._rayTracerRenderer = new RayTracerRenderer({
      canvasWidth: this._def.width,
      canvasHeight: this._def.height,
      fovy: k_fovy
    });
    this._textRenderer = new TextRenderer();
    this._stackRenderers = new StackRenderers();
    this._multipleBuffering = new graphics.renderers.MultiBuffersRendering(
      this._def.width,
      this._def.height
    );
  }

  initialize() {
    const gl = WebGLContext.getContext();

    // // for the data texture to got from "float to float"
    // // => instead of "vec4 to vec4"
    // const alignment = 1;
    // gl.pixelStorei(gl.UNPACK_ALIGNMENT, alignment);

    //
    //
    // initialize WebGL

    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.BLEND);
    gl.disable(gl.CULL_FACE);
    gl.depthFunc(gl.NEVER);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
  }

  resize(width: number, height: number) {
    this._debugSceneCamera.setViewportSize(width, height);
    this._debugSceneCamera.setAsPerspective({
      fovy: k_fovy,
      near: 1,
      far: 500
    });

    this._mainHudCamera.setViewportSize(width, height);

    const hWidth = width * 0.5;
    const hHeight = height * 0.5;

    this._mainHudCamera.setAsOrthogonal({
      left: -hWidth,
      right: +hWidth,
      top: -hHeight,
      bottom: +hHeight,
      near: -200,
      far: 200
    });
    this._mainHudCamera.setEye([hWidth, hHeight, 1]);
    this._mainHudCamera.setTarget([hWidth, hHeight, 0]);
    this._mainHudCamera.setUpAxis([0, 1, 0]);
    this._mainHudCamera.computeMatrices();
  }

  private _pushWireFrameSphere(sphere: allInterfaces.IPublicSphere, color: glm.ReadonlyVec3) {
    // const X = 0.525731112119133606;
    // const Z = 0.850650808352039932;
    // const N = 0.0;

    // const k_positions: ReadonlyArray<glm.vec3> = [
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

    // const k_indices: ReadonlyArray<glm.ReadonlyVec3> = [
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

    const mat4 = glm.mat4.identity(glm.mat4.create());
    glm.mat4.translate(mat4, mat4, sphere.position);
    const mat4b = glm.mat4.fromQuat(glm.mat4.create(), sphere.orientation);
    glm.mat4.multiply(mat4, mat4, mat4b);

    // const allVertices: glm.vec3[] = [];
    // for (const index of k_indices) {
    //   const v1 = k_positions[index[0]];
    //   const v2 = k_positions[index[1]];
    //   const v3 = k_positions[index[2]];

    //   const v12 = system.math.lerpVec3(glm.vec3.create(), 0.5, v1, v2);
    //   const v23 = system.math.lerpVec3(glm.vec3.create(), 0.5, v2, v3);
    //   const v31 = system.math.lerpVec3(glm.vec3.create(), 0.5, v3, v1);

    //   system.math.safeNormalize(v12, v12);
    //   system.math.safeNormalize(v23, v23);
    //   system.math.safeNormalize(v31, v31);

    //   allVertices.push(v1, v12, v31);
    //   allVertices.push(v2, v23, v12);
    //   allVertices.push(v3, v23, v31);
    // }

    // const positions1: glm.ReadonlyVec3[] = [];

    // allVertices.forEach((vertex) => {
    //   positions1.push(glm.vec3.fromValues(
    //     vertex[0] * sphere.radius,
    //     vertex[1] * sphere.radius,
    //     vertex[2] * sphere.radius,
    //   ));
    // });

    const positions2: glm.ReadonlyVec3[] = [];

    // positions1.forEach((vertex) => {
    //   const pos = glm.vec3.fromValues(0, 0, 0);
    //   glm.vec3.transformMat4(pos, vertex, mat4);
    //   positions2.push(pos);
    // });

    const vertices = graphics.geometries.makeSphere(1, sphere.radius);
    vertices.forEach((vertex) => {
      const pos = glm.vec3.fromValues(0, 0, 0);
      glm.vec3.transformMat4(pos, vertex.pos, mat4);
      positions2.push(pos);
    });


    for (let index = 0; index < positions2.length; index += 3) {
      const v1 = positions2[index + 0];
      const v2 = positions2[index + 1];
      const v3 = positions2[index + 2];

      // this._stackRenderers.pushLine(v1, v2, color);
      // this._stackRenderers.pushLine(v2, v3, color);
      // this._stackRenderers.pushLine(v3, v1, color);
      this._stackRenderers.push3dLine(v1, v2, 0.02, 0.02, color, color);
      this._stackRenderers.push3dLine(v2, v3, 0.02, 0.02, color, color);
      this._stackRenderers.push3dLine(v3, v1, 0.02, 0.02, color, color);
    }
  }

  private _pushWireFrameBox(box: allInterfaces.IPublicBox, color: glm.ReadonlyVec3) {
    const vertices: ReadonlyArray<glm.ReadonlyVec3> = [
      glm.vec3.fromValues(-box.boxSize[0], -box.boxSize[1], -box.boxSize[2]),
      glm.vec3.fromValues(+box.boxSize[0], -box.boxSize[1], -box.boxSize[2]),
      glm.vec3.fromValues(-box.boxSize[0], +box.boxSize[1], -box.boxSize[2]),
      glm.vec3.fromValues(+box.boxSize[0], +box.boxSize[1], -box.boxSize[2]),
      glm.vec3.fromValues(-box.boxSize[0], -box.boxSize[1], +box.boxSize[2]),
      glm.vec3.fromValues(+box.boxSize[0], -box.boxSize[1], +box.boxSize[2]),
      glm.vec3.fromValues(-box.boxSize[0], +box.boxSize[1], +box.boxSize[2]),
      glm.vec3.fromValues(+box.boxSize[0], +box.boxSize[1], +box.boxSize[2])
    ];

    const vertices2: glm.ReadonlyVec3[] = [];

    const mat4 = glm.mat4.identity(glm.mat4.create());
    glm.mat4.translate(mat4, mat4, box.position);
    const mat4b = glm.mat4.fromQuat(glm.mat4.create(), box.orientation);
    glm.mat4.multiply(mat4, mat4, mat4b);

    vertices.forEach((vertex) => {
      const pos = glm.vec3.fromValues(0, 0, 0);
      glm.vec3.transformMat4(pos, vertex, mat4);
      vertices2.push(pos);
    });

    const indicesGroup: ReadonlyArray<glm.ReadonlyVec2> = [
      [0, 1],
      [1, 3],
      [3, 2],
      [2, 0],
      [4, 5],
      [5, 7],
      [7, 6],
      [6, 4],
      [0, 4],
      [1, 5],
      [3, 7],
      [2, 6]
    ];

    indicesGroup.forEach((index) => {
      // this._stackRenderers.pushLine(
      //   vertices2[index[0]],
      //   vertices2[index[1]],
      //   color
      // );
      this._stackRenderers.push3dLine(
        vertices2[index[0]],
        vertices2[index[1]],
        0.02,
        0.02,
        color,
        color
      );
    });
  }

  private _pushWireFrameTriangle(triangle: allInterfaces.IPublicTriangle, color: glm.ReadonlyVec3) {
    // this._stackRenderers.pushLine(triangle.v0, triangle.v1, color);
    // this._stackRenderers.pushLine(triangle.v1, triangle.v2, color);
    // this._stackRenderers.pushLine(triangle.v2, triangle.v0, color);
    this._stackRenderers.push3dLine(triangle.v0, triangle.v1, 0.02, 0.02, color, color);
    this._stackRenderers.push3dLine(triangle.v1, triangle.v2, 0.02, 0.02, color, color);
    this._stackRenderers.push3dLine(triangle.v2, triangle.v0, 0.02, 0.02, color, color);
  }

  safeSceneWireFrame(inCallback: () => void) {
    this._debugSceneCamera.setEye(this._rayTracerRenderer.rayTracerPass.camera.position);
    this._debugSceneCamera.setTarget(this._rayTracerRenderer.rayTracerPass.camera.target);
    this._debugSceneCamera.setUpAxis(this._rayTracerRenderer.rayTracerPass.camera.up);
    this._debugSceneCamera.computeMatrices();

    this._stackRenderers.safeRender(
      this._debugSceneCamera.getComposedMatrix(),
      inCallback
    );
  }

  flushHudWireFrame() {
    this._stackRenderers.flush(this._mainHudCamera.getComposedMatrix());
  }

  flushHudText() {
    this._textRenderer.flush(this._mainHudCamera.getComposedMatrix());
  }

  bvhRenderDebugWireframe() {

    this._rayTracerRenderer.rayTracerPass.bvhRenderDebugWireframe(this._stackRenderers);

    const defaultColor: glm.ReadonlyVec3 = [1,1,1];
    this._rayTracerRenderer.rayTracerPass.spheres.forEach((sphere) => {
      this._pushWireFrameSphere(sphere, defaultColor);
    });
    this._rayTracerRenderer.rayTracerPass.boxes.forEach((box) => {
      this._pushWireFrameBox(box, defaultColor);
    });
    this._rayTracerRenderer.rayTracerPass.triangles.forEach((triangle) => {
      this._pushWireFrameTriangle(triangle, defaultColor);
    });

  }

  get rayTracerRenderer(): IRayTracerRenderer {
    return this._rayTracerRenderer;
  }
  get stackRenderers(): graphics.renderers.IStackRenderers {
    return this._stackRenderers;
  }
  get textRenderer(): graphics.renderers.ITextRenderer {
    return this._textRenderer;
  }
  get multipleBuffering(): graphics.renderers.MultiBuffersRendering {
    return this._multipleBuffering;
  }

  get debugSceneCamera(): graphics.camera.ICamera {
    return this._debugSceneCamera;
  }
  get mainHudCamera(): graphics.camera.ICamera {
    return this._mainHudCamera;
  }
}
