import { graphics } from '@local-framework';
const {
  WebGLContext,
} = graphics.webgl2;
const {
  Camera,
} = graphics.camera;
const {
  TextRenderer,
  StackRenderers,
} = graphics.renderers;

import {
  RayTracerRenderer,
  ITriangle,
  IPublicSphere,
  IRayTracerRenderer,
  InternalBox,
} from './renderers';

import * as glm from 'gl-matrix';

//

const k_fovy = 70;

interface IDefinition {
  canvasDomElement: HTMLCanvasElement;
}

export class Renderer {
  private _def: IDefinition;

  private _rayTracerRenderer: RayTracerRenderer;
  private _textRenderer: graphics.renderers.TextRenderer;
  private _stackRenderers: graphics.renderers.StackRenderers;

  private _debugSceneCamera = new Camera();
  private _mainHudCamera = new Camera();

  constructor(def: IDefinition) {
    this._def = def;

    this.resize(
      this._def.canvasDomElement.width,
      this._def.canvasDomElement.height
    );

    WebGLContext.initialize(this._def.canvasDomElement);

    this._rayTracerRenderer = new RayTracerRenderer({
      canvasWidth: this._def.canvasDomElement.width,
      canvasHeight: this._def.canvasDomElement.height,
      fovy: k_fovy
    });
    this._textRenderer = new TextRenderer();
    this._stackRenderers = new StackRenderers();
  }

  initialize() {
    const gl = WebGLContext.getContext();

    // fot the data texture to got from "float to float"
    // => instead of "vec4 to vec4"
    const alignment = 1;
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, alignment);

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

  private _pushWireFrameSphere(sphere: IPublicSphere) {
    const X = 0.525731112119133606 * sphere.radius;
    const Z = 0.850650808352039932 * sphere.radius;
    const N = 0.0;

    const positions: ReadonlyArray<glm.vec3> = [
      [-X, N, Z],
      [X, N, Z],
      [-X, N, -Z],
      [X, N, -Z],
      [N, Z, X],
      [N, Z, -X],
      [N, -Z, X],
      [N, -Z, -X],
      [Z, X, N],
      [-Z, X, N],
      [Z, -X, N],
      [-Z, -X, N]
    ];

    for (let ii = 0; ii < positions.length; ++ii) {
      positions[ii][0] += sphere.position[0];
      positions[ii][1] += sphere.position[1];
      positions[ii][2] += sphere.position[2];
    }

    const indices: ReadonlyArray<glm.ReadonlyVec3> = [
      [0, 4, 1],
      [0, 9, 4],
      [9, 5, 4],
      [4, 5, 8],
      [4, 8, 1],
      [8, 10, 1],
      [8, 3, 10],
      [5, 3, 8],
      [5, 2, 3],
      [2, 7, 3],
      [7, 10, 3],
      [7, 6, 10],
      [7, 11, 6],
      [11, 0, 6],
      [0, 1, 6],
      [6, 1, 10],
      [9, 0, 11],
      [9, 11, 2],
      [9, 2, 5],
      [7, 2, 11]
    ];

    for (const index of indices) {
      const v1 = positions[index[0]];
      const v2 = positions[index[1]];
      const v3 = positions[index[2]];

      this._stackRenderers.pushLine(v1, v2, sphere.color);
      this._stackRenderers.pushLine(v2, v3, sphere.color);
      this._stackRenderers.pushLine(v3, v1, sphere.color);
    }
  }

  private _pushWireFrameBox(box: InternalBox) {
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

    vertices.forEach((vertex) => {
      const pos = glm.vec3.fromValues(0, 0, 0);
      glm.vec3.transformMat4(pos, vertex, box.matrix);
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
      this._stackRenderers.pushLine(
        vertices2[index[0]],
        vertices2[index[1]],
        box.color
      );
    });
  }

  private _pushWireFrameTriangle(triangle: ITriangle) {
    this._stackRenderers.pushLine(triangle.v0, triangle.v1, triangle.color);
    this._stackRenderers.pushLine(triangle.v1, triangle.v2, triangle.color);
    this._stackRenderers.pushLine(triangle.v2, triangle.v0, triangle.color);
  }

  safeSceneWireFrame(inCallback: () => void) {
    this._debugSceneCamera.setEye(this._rayTracerRenderer.camera.position);
    this._debugSceneCamera.setTarget(this._rayTracerRenderer.camera.target);
    this._debugSceneCamera.setUpAxis(this._rayTracerRenderer.camera.up);
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

  setupDebugRenderer() {
    this._rayTracerRenderer.spheres.forEach((sphere) =>
      this._pushWireFrameSphere(sphere)
    );
    this._rayTracerRenderer.boxes.forEach((box) => this._pushWireFrameBox(box));
    this._rayTracerRenderer.triangles.forEach((triangle) =>
      this._pushWireFrameTriangle(triangle)
    );
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
}
