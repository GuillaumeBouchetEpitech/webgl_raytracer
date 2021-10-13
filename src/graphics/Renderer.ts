
import { WebGLContext } from "./wrappers/WebGLContext";
import { DataTexture } from "./wrappers/DataTexture";

import { Texture } from "./wrappers/Texture";
import { FrameBuffer } from "./wrappers/FrameBuffer";

import { ShaderProgram } from "./wrappers/ShaderProgram";
import { GeometryWrapper } from "./wrappers/Geometry";

import { fetchTextFile } from "./utilities/fetchTextFile";

import * as glm from "gl-matrix";

const g_fovy = 70;
const degToRad = (deg: number) => deg*Math.PI/180;

interface ISphere {
    position: glm.vec3;
    radius: number;
    color: glm.vec3;
    reflection: number;
    shadowEnabled: boolean;
    lightEnabled: boolean;
    chessboard: boolean;
};

interface IBox {
    matrix: glm.mat4;
    boxSize: glm.vec3;
    color: glm.vec3;
    reflection: number;
    shadowEnabled: boolean;
    lightEnabled: boolean;
    chessboard: boolean;
};

interface ITriangle {
    v0: glm.vec3;
    v1: glm.vec3;
    v2: glm.vec3;
    min: glm.vec3;
    max: glm.vec3;
    color: glm.vec3;
    reflection: number;
    shadowEnabled: boolean;
    lightEnabled: boolean;
};

interface ISunLight {
    direction: glm.vec3;
    intensity: number;
};

interface ISpotLight {
    position: glm.vec3;
    intensity: number;
    radius: number;
};



interface IVoxelChunk {
    used?: boolean;
    keyStr?: string;
    primitives: {
        triangles: Set<number>,
        spheres: Set<number>,
        boxes: Set<number>,
    },
};

interface IGridBox {
    origin: glm.vec3;
    size: glm.vec3;
    primitives: {
        triangles: Set<number>,
        spheres: Set<number>,
        boxes: Set<number>,
    },
};

interface IGrid {
    voxelGrid: IVoxelChunk[];
    gridBoxes: IGridBox[];
};


const gridSize = 8;


export class Renderer {

    private _width: number;
    private _height: number;
    private _resolutionCoef: number = 1;

    private _wireframeShaderProgram: ShaderProgram;
    private _raytracingShaderProgram: ShaderProgram;
    private _textureShaderProgram: ShaderProgram;

    private _finalTexture: Texture;
    private _frameBuffer: FrameBuffer;

    private _antiAliasing: boolean = false;

    private _wireframeStackGeometry: GeometryWrapper.Geometry;
    private _wireframeStackVertices: number[] = [];
    private _raytracingGeometry: GeometryWrapper.Geometry;
    private _screenGeometry: GeometryWrapper.Geometry;

    private _projectionMatrix: glm.mat4;
    private _modelViewMatrix: glm.mat4;

    private _sceneDataTexture: DataTexture;
    private _spheres: ISphere[] = [];
    private _boxes: IBox[] = [];
    private _triangles: ITriangle[] = [];

    private _lightsDataTexture: DataTexture;
    private _sunLights: ISunLight[] = [];
    private _spotLights: ISpotLight[] = [];

    private _gridDataTexture: DataTexture;

    private _camera: {
        position: glm.vec3,
        target: glm.vec3,
        up: glm.vec3,
    };

    private _grid: IGrid = {
        voxelGrid: [],
        gridBoxes: [],
    };

    constructor() {
    }

    async initialise(canvas: HTMLCanvasElement) {

        this._width = canvas.width;
        this._height = canvas.height;

        WebGLContext.initialise(canvas);
        const gl = WebGLContext.getContext();


        // fot the data texture to got from "float to float"
        // => instead of "vec4 to vec4"
        const alignment = 1;
        gl.pixelStorei(gl.UNPACK_ALIGNMENT, alignment);


        //
        //
        // initialise WebGL

        gl.disable(gl.DEPTH_TEST);
        gl.disable(gl.BLEND);
        gl.disable(gl.CULL_FACE);
        gl.depthFunc(gl.NEVER);

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clearDepth(1.0);

        //
        //
        // initialise shaders

        this._wireframeShaderProgram = new ShaderProgram({
            vertexShaderSourceCode: await fetchTextFile("./assets/shaders/wireframe.vert"),
            fragmentShaderSourceCode: await fetchTextFile("./assets/shaders/wireframe.frag"),
            attributes: [ "a_vertexPosition", "a_vertexColor" ],
            uniforms: [ "u_modelViewMatrix", "u_projectionMatrix" ],
        });

        this._raytracingShaderProgram = new ShaderProgram({
            vertexShaderSourceCode: await fetchTextFile("./assets/shaders/raytracer.vert"),
            fragmentShaderSourceCode: await fetchTextFile("./assets/shaders/raytracer.frag"),
            attributes: [ "a_vertexPosition", "a_plotPosition" ],
            uniforms: [
                "u_cameraEye",

                "u_sceneTextureData", "u_sceneTextureSize",
                "u_lightsTextureData", "u_lightsTextureSize",
                "u_gridTextureData", "u_gridTextureSize",

                "u_spheresStart", "u_spheresStop",
                "u_boxesStart", "u_boxesStop",
                "u_trianglesStart", "u_trianglesStop",

                "u_sunLightsStart", "u_sunLightsStop",
                "u_spotLightsStart", "u_spotLightsStop",

                // "u_gridStart", "u_gridStop",
            ],
        });

        this._textureShaderProgram = new ShaderProgram({
            vertexShaderSourceCode: await fetchTextFile("./assets/shaders/texture.vert"),
            fragmentShaderSourceCode: await fetchTextFile("./assets/shaders/texture.frag"),
            attributes: [ "a_vertexPosition", "a_vertexTextureCoord" ],
            uniforms: [ "u_texture", "u_step" ],
        });

        this._finalTexture = new Texture();
        this._finalTexture.allocate(this._width, this._height, true);

        this._frameBuffer = new FrameBuffer();
        this._frameBuffer.attachTexture(this._finalTexture);

        //
        //

        const bytesPerPixel = 4;

        //
        //

        this._wireframeStackGeometry = new GeometryWrapper.Geometry(this._wireframeShaderProgram, {
            vertexBufferObjects: [
                {
                    attributes: [
                        { name: "a_vertexPosition", type: GeometryWrapper.AttributeType.vec3f, index: 0 },
                        { name: "a_vertexColor", type: GeometryWrapper.AttributeType.vec3f, index: 3 },
                    ],
                    stride: 6 * bytesPerPixel,
                    instanced: false,
                },
            ],
            primitiveType: GeometryWrapper.PrimitiveType.lines,
        });
        this._wireframeStackGeometry.setPrimitiveStart(0);
        this._wireframeStackGeometry.setPrimitiveCount(0);

        this._raytracingGeometry = new GeometryWrapper.Geometry(this._raytracingShaderProgram, {
            vertexBufferObjects: [
                {
                    attributes: [
                        { name: "a_vertexPosition", type: GeometryWrapper.AttributeType.vec2f, index: 0 },
                    ],
                    stride: 2 * bytesPerPixel,
                    instanced: false,
                },
                {
                    attributes: [
                        { name: "a_plotPosition", type: GeometryWrapper.AttributeType.vec3f, index: 0 },
                    ],
                    stride: 3 * bytesPerPixel,
                    instanced: false,
                },
            ],
            primitiveType: GeometryWrapper.PrimitiveType.triangleStrip,
        });

        const raytracingVertices = [
            +1.0,+1.0, // top right
            -1.0,+1.0, // top left
            +1.0,-1.0, // bottom right
            -1.0,-1.0  // bottom left
        ];
        this._raytracingGeometry.updateBuffer(0, raytracingVertices, false);
        this._raytracingGeometry.setPrimitiveStart(0);
        this._raytracingGeometry.setPrimitiveCount(4);

        //
        //

        this._screenGeometry = new GeometryWrapper.Geometry(this._textureShaderProgram, {
            vertexBufferObjects: [
                {
                    attributes: [
                        { name: "a_vertexPosition", type: GeometryWrapper.AttributeType.vec2f, index: 0 },
                        { name: "a_vertexTextureCoord", type: GeometryWrapper.AttributeType.vec2f, index: 2 },
                    ],
                    stride: 4 * bytesPerPixel,
                    instanced: false,
                },
            ],
            primitiveType: GeometryWrapper.PrimitiveType.triangleStrip,
        });

        const screenVertices = [
            +1.0,+1.0,   1,1, // top right
            -1.0,+1.0,   0,1, // top left
            +1.0,-1.0,   1,0, // bottom right
            -1.0,-1.0,   0,0, // bottom left
        ];
        this._screenGeometry.updateBuffer(0, screenVertices, false);
        this._screenGeometry.setPrimitiveStart(0);
        this._screenGeometry.setPrimitiveCount(4);

        //
        //

        this._projectionMatrix = glm.mat4.create();
        this._modelViewMatrix = glm.mat4.create();

        //
        //

        this._sceneDataTexture = new DataTexture();
        this._sceneDataTexture.initialise();

        this._lightsDataTexture = new DataTexture();
        this._lightsDataTexture.initialise();

        this._gridDataTexture = new DataTexture();
        this._gridDataTexture.initialise();

        this._camera = {
            position: glm.vec3.fromValues(0, 0, 0),
            target: glm.vec3.fromValues(1.5, 1.5, 1.5),
            up: glm.vec3.fromValues(0, 1, 0),
        };

        // this._grid = {
        //     min: glm.vec3.fromValues(0, 0, 0),
        //     max: glm.vec3.fromValues(0, 0, 0),
        //     voxels: [],
        // };
    }

    pushSphere(position: glm.vec3,
               radius: number,
               color: glm.vec3,
               reflection: number,
               chessboard: boolean,
               shadowEnabled: boolean = true,
               lightEnabled: boolean = true) {

        if (radius <= 0)
            throw new Error("invalid sphere radius");
        if (reflection < 0 || reflection > 1)
            throw new Error("invalid sphere reflection");

        this._spheres.push({
            position: [ position[0], position[1], position[2] ],
            radius,
            color: [ color[0], color[1], color[2] ],
            reflection,
            chessboard,
            shadowEnabled,
            lightEnabled
        });
    }

    pushBox(position: glm.vec3,
        angleX: number,
        angleY: number,
        angleZ: number,
        boxSize: glm.vec3,
        color: glm.vec3,
        reflection: number,
        chessboard: boolean,
        shadowEnabled: boolean = true,
        lightEnabled: boolean = true) {

    if (boxSize[0] <= 0 || boxSize[1] <= 0 || boxSize[2] <= 0)
        throw new Error("invalid box size");
    if (reflection < 0 || reflection > 1)
        throw new Error("invalid box reflection");

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
        lightEnabled,
    });
}

    pushTriangle(v0: glm.vec3,
                 v1: glm.vec3,
                 v2: glm.vec3,
                 color: glm.vec3,
                 reflection: number,
                 shadowEnabled: boolean = true,
                 lightEnabled: boolean = true) {

        if (reflection < 0 || reflection > 1)
            throw new Error("invalid triangle reflection");

        const min = glm.vec3.fromValues(+999999, +999999, +999999);
        const max = glm.vec3.fromValues(-999999, -999999, -999999);

        for (let ii = 0; ii < 3; ++ii) {

            if (min[ii] > v0[ii]) min[ii] = v0[ii];
            if (min[ii] > v1[ii]) min[ii] = v1[ii];
            if (min[ii] > v2[ii]) min[ii] = v2[ii];

            if (max[ii] < v0[ii]) max[ii] = v0[ii];
            if (max[ii] < v1[ii]) max[ii] = v1[ii];
            if (max[ii] < v2[ii]) max[ii] = v2[ii];
        }

        this._triangles.push({
            v0: glm.vec3.clone(v0),
            v1: glm.vec3.clone(v1),
            v2: glm.vec3.clone(v2),
            min,
            max,
            color: glm.vec3.clone(color),
            reflection,
            shadowEnabled,
            lightEnabled,
        });
    }

    pushSunLight(direction: glm.vec3, intensity: number) {

        // add sun light

        if (intensity <= 0)
            throw new Error("intensity cannot be 0");
        if (glm.vec3.length(direction) === 0)
            throw new Error("direction cannot be 0");

        const dir = glm.vec3.normalize(glm.vec3.clone(direction), direction);

        this._sunLights.push({ direction: dir, intensity });
    }

    pushSpotLight(position: glm.vec3, intensity: number, radius: number) {

        // add spot light

        if (intensity <= 0)
            throw new Error("intensity cannot be 0");
        if (radius <= 0)
            throw new Error("radius cannot be <= 0");

        this._spotLights.push({ position: glm.vec3.clone(position), intensity, radius });
    }

    lookAt(eye: glm.vec3, target: glm.vec3, up: glm.vec3) {
        glm.vec3.copy(this._camera.position, eye);
        glm.vec3.copy(this._camera.target, target);
        glm.vec3.copy(this._camera.up, up);
    }

    computeGrid() {

        this._grid.gridBoxes.length = 0;
        this._grid.voxelGrid.length = 0;

        for (let ii = 0; ii < gridSize * gridSize * gridSize; ++ii) {
            this._grid.voxelGrid.push({
                primitives: {
                    triangles: new Set<number>(),
                    spheres: new Set<number>(),
                    boxes: new Set<number>(),
                },
            });
        }

        const getVox = (x: number, y: number, z: number) => {

            if (x < 0 || x >= gridSize ||
                y < 0 || y >= gridSize ||
                z < 0 || z >= gridSize) {
                throw new Error(`out of bound -> ${x}/${y}/${z} (${gridSize})`);
            }

            return this._grid.voxelGrid[z * gridSize * gridSize + y * gridSize + x];
        };

        for (let zz = 0; zz < gridSize; ++zz)
        for (let yy = 0; yy < gridSize; ++yy)
        for (let xx = 0; xx < gridSize; ++xx) {

             // TODO: hardcoded
             const min = glm.vec3.fromValues(
                -35 + 70 / gridSize * xx,
                -35 + 70 / gridSize * yy,
                -35 + 70 / gridSize * zz);
            const max = glm.vec3.fromValues(
                -35 + 70 / gridSize * (xx + 1),
                -35 + 70 / gridSize * (yy + 1),
                -35 + 70 / gridSize * (zz + 1));

            const v = getVox(xx, yy, zz);

            this._triangles.forEach((triangle, index) => {

                const noCollision = (
                    triangle.min[0] > max[0] ||
                    triangle.min[1] > max[1] ||
                    triangle.min[2] > max[2] ||
                    triangle.max[0] < min[0] ||
                    triangle.max[1] < min[1] ||
                    triangle.max[2] < min[2]);

                if (noCollision)
                    return;

                v.primitives.triangles.add(index);
            });

            this._spheres.forEach((sphere, index) => {

                const noCollision = (
                    sphere.position[0] - sphere.radius > max[0] ||
                    sphere.position[1] - sphere.radius > max[1] ||
                    sphere.position[2] - sphere.radius > max[2] ||
                    sphere.position[0] + sphere.radius < min[0] ||
                    sphere.position[1] + sphere.radius < min[1] ||
                    sphere.position[2] + sphere.radius < min[2]);

                if (noCollision)
                    return;

                v.primitives.spheres.add(index);
            });

            this._boxes.forEach((box, index) => {

                const pos = glm.vec3.fromValues(0,0,0);
                glm.vec3.transformMat4(pos, pos, box.matrix);

                const radius = Math.max(box.boxSize[0], Math.max(box.boxSize[1], box.boxSize[2]));

                const noCollision = (
                    pos[0] - radius > max[0] ||
                    pos[1] - radius > max[1] ||
                    pos[2] - radius > max[2] ||
                    pos[0] + radius < min[0] ||
                    pos[1] + radius < min[1] ||
                    pos[2] + radius < min[2]);

                if (noCollision)
                    return;

                v.primitives.boxes.add(index);
            });

            const trianglesStr = Array.from(v.primitives.triangles).join("-");
            const spheresStr = Array.from(v.primitives.spheres).join("-");
            const boxesStr = Array.from(v.primitives.boxes).join("-");

            v.keyStr = `T=${trianglesStr}_S=${spheresStr}_B=${boxesStr}`;
        }

        let iterationLeft = 100;

        do {

            if (--iterationLeft < 0)
                break;

            // find unsued block
            // expand unused block, x+y+z

            const newPos = glm.vec3.fromValues(-1, -1, -1);

            for (let zz = 0; newPos[2] < 0 && zz < gridSize; ++zz)
            for (let yy = 0; newPos[1] < 0 && yy < gridSize; ++yy)
            for (let xx = 0; newPos[0] < 0 && xx < gridSize; ++xx) {

                const v = getVox(xx, yy, zz);

                if (v.used === true)
                    continue;

                newPos[0] = xx;
                newPos[1] = yy;
                newPos[2] = zz;
                break;
            }

            if (newPos[0] < 0)
                break;

            const searchSize = glm.vec3.fromValues(1, 1, 1);
            const searchAxis = glm.vec3.fromValues(1, 1, 1);

            const masterVox = getVox(newPos[0], newPos[1], newPos[2]);
            const masterKeyStr = masterVox.keyStr;

            // expand until all axis are 0
            do {

                // expand axis x
                if (searchAxis[0] === 1) {

                    if (newPos[0] + searchSize[0] + 1 >= gridSize) {
                        searchAxis[0] = 0;
                    }
                    else {
                        searchSize[0] += 1;

                        let interrupted = false;
                        for (let yy = newPos[1]; !interrupted && yy < newPos[1] + searchSize[1]; ++yy)
                        for (let zz = newPos[2]; !interrupted && zz < newPos[2] + searchSize[2]; ++zz) {

                            const v = getVox(newPos[0] + searchSize[0] - 1, yy, zz);

                            if (v.used === true || v.keyStr !== masterKeyStr) {
                                interrupted = true;
                                searchAxis[0] = 0;
                                searchSize[0] -= 1; // cancel
                            }
                        }
                    }
                }

                // expand axis y
                if (searchAxis[1] === 1) {

                    if (newPos[1] + searchSize[1] + 1 >= gridSize) {
                        searchAxis[1] = 0;
                    }
                    else {
                        searchSize[1] += 1;

                        let interrupted = false;
                        for (let xx = newPos[0]; !interrupted && xx < newPos[0] + searchSize[0]; ++xx)
                        for (let zz = newPos[2]; !interrupted && zz < newPos[2] + searchSize[2]; ++zz) {

                            const v = getVox(xx, newPos[1] + searchSize[1] - 1, zz);

                            if (v.used === true || v.keyStr !== masterKeyStr) {
                                interrupted = true;
                                searchAxis[1] = 0;
                                searchSize[1] -= 1; // cancel
                            }
                        }
                    }
                }

                // expand axis z
                if (searchAxis[2] === 1) {

                    if (newPos[2] + searchSize[2] + 1 >= gridSize) {
                        searchAxis[2] = 0;
                    }
                    else {
                        searchSize[2] += 1;

                        let interrupted = false;
                        for (let xx = newPos[0]; !interrupted && xx < newPos[0] + searchSize[0]; ++xx)
                        for (let yy = newPos[1]; !interrupted && yy < newPos[1] + searchSize[1]; ++yy) {

                            const v = getVox(xx, yy, newPos[2] + searchSize[2] - 1);

                            if (v.used === true || v.keyStr !== masterKeyStr) {
                                interrupted = true;
                                searchAxis[2] = 0;
                                searchSize[2] -= 1; // cancel
                            }
                        }
                    }
                }

                //
                //
                //

                if (searchAxis[0] === 0 &&
                    searchAxis[1] === 0 &&
                    searchAxis[2] === 0) {

                    break;
                }

            } while (true);

            // console.log("newPos", newPos, "searchAxis", searchAxis, "searchSize", searchSize);
            // console.log("newPos", newPos, "searchSize", searchSize);

            // mark as used
            for (let zz = newPos[2]; zz < newPos[2] + searchSize[2]; ++zz)
            for (let yy = newPos[1]; yy < newPos[1] + searchSize[1]; ++yy)
            for (let xx = newPos[0]; xx < newPos[0] + searchSize[0]; ++xx) {

                const v = getVox(xx, yy, zz);
                v.used = true;
            }

            // save box

            this._grid.gridBoxes.push({
                origin: glm.vec3.clone(newPos),
                size: glm.vec3.clone(searchSize),
                primitives: masterVox.primitives,
            });

        } while (true);

    }

    pushLine(posA: glm.vec3, posB: glm.vec3, color: glm.vec3) {
        // push A
        this._wireframeStackVertices.push(posA[0], posA[1], posA[2]);
        this._wireframeStackVertices.push(color[0], color[1], color[2]);
        // push B
        this._wireframeStackVertices.push(posB[0], posB[1], posB[2]);
        this._wireframeStackVertices.push(color[0], color[1], color[2]);
    }

    pushWireframeSphere(sphere: ISphere) {

        const X = 0.525731112119133606 * sphere.radius;
        const Z = 0.850650808352039932 * sphere.radius;
        const N = 0.0;

        const positions: glm.vec3[] = [
            [ -X, N, Z ], [  X, N, Z ], [ -X, N,-Z ], [  X, N,-Z ],
            [  N, Z, X ], [  N, Z,-X ], [  N,-Z, X ], [  N,-Z,-X ],
            [  Z, X, N ], [ -Z, X, N ], [  Z,-X, N ], [ -Z,-X, N ]
        ];

        for (let ii = 0; ii < positions.length; ++ii) {
            positions[ii][0] += sphere.position[0];
            positions[ii][1] += sphere.position[1];
            positions[ii][2] += sphere.position[2];
        }

        const indices: glm.vec3[] = [
            [ 0, 4, 1], [ 0, 9, 4], [ 9, 5, 4], [ 4, 5, 8], [ 4, 8, 1],
            [ 8,10, 1], [ 8, 3,10], [ 5, 3, 8], [ 5, 2, 3], [ 2, 7, 3],
            [ 7,10, 3], [ 7, 6,10], [ 7,11, 6], [11, 0, 6], [ 0, 1, 6],
            [ 6, 1,10], [ 9, 0,11], [ 9,11, 2], [ 9, 2, 5], [ 7, 2,11],
        ];

        for (const index of indices) {

            const v1 = positions[index[0]];
            const v2 = positions[index[1]];
            const v3 = positions[index[2]];

            this.pushLine(v1, v2, sphere.color);
            this.pushLine(v2, v3, sphere.color);
            this.pushLine(v3, v1, sphere.color);
        }
    }

    pushWireframeBox(box: IBox) {

        const vertices = [
            glm.vec3.fromValues(-box.boxSize[0], -box.boxSize[1], -box.boxSize[2]),
            glm.vec3.fromValues(+box.boxSize[0], -box.boxSize[1], -box.boxSize[2]),
            glm.vec3.fromValues(-box.boxSize[0], +box.boxSize[1], -box.boxSize[2]),
            glm.vec3.fromValues(+box.boxSize[0], +box.boxSize[1], -box.boxSize[2]),
            glm.vec3.fromValues(-box.boxSize[0], -box.boxSize[1], +box.boxSize[2]),
            glm.vec3.fromValues(+box.boxSize[0], -box.boxSize[1], +box.boxSize[2]),
            glm.vec3.fromValues(-box.boxSize[0], +box.boxSize[1], +box.boxSize[2]),
            glm.vec3.fromValues(+box.boxSize[0], +box.boxSize[1], +box.boxSize[2]),
        ];

        const vertices2: glm.vec3[] = [];

        vertices.forEach((vertex) => {

            const pos = glm.vec3.fromValues(0,0,0);
            glm.vec3.transformMat4(pos, vertex, box.matrix);
            vertices2.push(pos);
        });

        const indicesGroup = [
            [0,1], [1,3], [3,2], [2,0],
            [4,5], [5,7], [7,6], [6,4],
            [0,4], [1,5], [3,7], [2,6],
        ];

        indicesGroup.forEach((index) => {
            this.pushLine(vertices2[index[0]], vertices2[index[1]], box.color);
        });
    }

    pushWireframeTriangle(triangle: ITriangle) {

        this.pushLine(triangle.v0, triangle.v1, triangle.color);
        this.pushLine(triangle.v1, triangle.v2, triangle.color);
        this.pushLine(triangle.v2, triangle.v0, triangle.color);
    }

    flushWireframe() {

        this._wireframeShaderProgram.bind();

        const gl = WebGLContext.getContext();

        gl.uniformMatrix4fv(this._wireframeShaderProgram.getUniform("u_projectionMatrix"), false, this._projectionMatrix);
        gl.uniformMatrix4fv(this._wireframeShaderProgram.getUniform("u_modelViewMatrix"), false, this._modelViewMatrix);

        this._wireframeStackGeometry.updateBuffer(0, this._wireframeStackVertices, true);
        this._wireframeStackGeometry.setPrimitiveCount(this._wireframeStackVertices.length / 6);
        this._wireframeStackGeometry.render();

        // reset vertices
        this._wireframeStackVertices.length = 0;
    }

    render2() {

        glm.mat4.perspective(this._projectionMatrix, degToRad(g_fovy), this._width / this._height, 1, 1500);

        glm.mat4.lookAt(
            this._modelViewMatrix,
            this._camera.position,
            this._camera.target,
            this._camera.up);

        const composed = glm.mat4.create();
        glm.mat4.multiply(composed, this._projectionMatrix, this._modelViewMatrix);

        this._spheres.forEach((sphere) => this.pushWireframeSphere(sphere));
        this._boxes.forEach((box) => this.pushWireframeBox(box));
        this._triangles.forEach((triangle) => this.pushWireframeTriangle(triangle));

        //
        ////
        //

        { // grid

            const renderCube = (min: glm.vec3, max: glm.vec3) => {

                const vertices: glm.vec3[] = [
                    glm.vec3.fromValues(min[0], min[1], min[2]),
                    glm.vec3.fromValues(max[0], min[1], min[2]),
                    glm.vec3.fromValues(min[0], max[1], min[2]),
                    glm.vec3.fromValues(max[0], max[1], min[2]),
                    glm.vec3.fromValues(min[0], min[1], max[2]),
                    glm.vec3.fromValues(max[0], min[1], max[2]),
                    glm.vec3.fromValues(min[0], max[1], max[2]),
                    glm.vec3.fromValues(max[0], max[1], max[2]),
                ];

                const indicesGroup: [number, number][] = [
                    [0,1], [1,3], [3,2], [2,0],
                    [4,5], [5,7], [7,6], [6,4],
                    [0,4], [1,5], [3,7], [2,6],
                ];

                const color = glm.vec3.fromValues(1,1,1);

                indicesGroup.forEach((index) => {
                    this.pushLine(vertices[index[0]], vertices[index[1]], color);
                });
            };

            for (let ii = 0; ii < this._grid.gridBoxes.length; ++ii) {

                const gridBox = this._grid.gridBoxes[ii];

                // TODO: hardcoded
                const min = glm.vec3.fromValues(
                    -35 + 70 / gridSize * gridBox.origin[0] + 0.5,
                    -35 + 70 / gridSize * gridBox.origin[1] + 0.5,
                    -35 + 70 / gridSize * gridBox.origin[2] + 0.5);
                const max = glm.vec3.fromValues(
                    -35 + 70 / gridSize * (gridBox.origin[0] + gridBox.size[0]) - 0.5,
                    -35 + 70 / gridSize * (gridBox.origin[1] + gridBox.size[1]) - 0.5,
                    -35 + 70 / gridSize * (gridBox.origin[2] + gridBox.size[2]) - 0.5);

                renderCube(min, max);
            }
        } // grid
    }

    render() {

        const gl = WebGLContext.getContext();

        const farCorners = this._computeCameraFarCorners();
        this._raytracingGeometry.updateBuffer(1, farCorners, true);

        const scaledWidth = Math.floor(this._width * this._resolutionCoef);
        const scaledHeight = Math.floor(this._height * this._resolutionCoef);

        this._frameBuffer.bind();
        gl.viewport(0, 0, scaledWidth, scaledHeight);
        gl.clear(gl.COLOR_BUFFER_BIT /*| gl.DEPTH_BUFFER_BIT*/);

        { // raytracing pass

            const shader = this._raytracingShaderProgram;

            shader.bind();

            const u_cameraEye = shader.getUniform("u_cameraEye");
            gl.uniform3f(u_cameraEye, this._camera.position[0], this._camera.position[1], this._camera.position[2]);

            //
            //
            //

            { // scene data

                const sceneDataValues: number[] = [];

                {

                    { // spheres

                        const u_spheresStart = shader.getUniform("u_spheresStart");
                        const u_spheresStop = shader.getUniform("u_spheresStop");

                        gl.uniform1f(u_spheresStart, 0);

                        for (const sphere of this._spheres) {

                            // add sphere

                            sceneDataValues.push(sphere.position[0], sphere.position[1], sphere.position[2]);
                            sceneDataValues.push(sphere.radius);

                            sceneDataValues.push(sphere.color[0], sphere.color[1], sphere.color[2]);
                            sceneDataValues.push(sphere.reflection);

                            sceneDataValues.push(sphere.shadowEnabled ? 1 : 0);
                            sceneDataValues.push(sphere.lightEnabled ? 1 : 0);

                            sceneDataValues.push(sphere.chessboard ? 1 : 0);
                        }

                        gl.uniform1f(u_spheresStop, sceneDataValues.length);

                    } // spheres

                    { // boxes

                        const u_boxesStart = shader.getUniform("u_boxesStart");
                        const u_boxesStop = shader.getUniform("u_boxesStop");

                        gl.uniform1f(u_boxesStart, sceneDataValues.length);

                        for (const box of this._boxes) {

                            // add box

                            sceneDataValues.push(box.matrix[ 0], box.matrix[ 1], box.matrix[ 2], box.matrix[ 3]);
                            sceneDataValues.push(box.matrix[ 4], box.matrix[ 5], box.matrix[ 6], box.matrix[ 7]);
                            sceneDataValues.push(box.matrix[ 8], box.matrix[ 9], box.matrix[10], box.matrix[11]);
                            sceneDataValues.push(box.matrix[12], box.matrix[13], box.matrix[14], box.matrix[15]);

                            sceneDataValues.push(box.boxSize[0], box.boxSize[1], box.boxSize[2]);

                            sceneDataValues.push(box.color[0], box.color[1], box.color[2]);
                            sceneDataValues.push(box.reflection);

                            sceneDataValues.push(box.shadowEnabled ? 1 : 0);
                            sceneDataValues.push(box.lightEnabled ? 1 : 0);

                            sceneDataValues.push(box.chessboard ? 1 : 0);
                        }

                        gl.uniform1f(u_boxesStop, sceneDataValues.length);

                    } // boxes

                    { // triangles

                        const u_trianglesStart = shader.getUniform("u_trianglesStart");
                        const u_trianglesStop = shader.getUniform("u_trianglesStop");

                        gl.uniform1f(u_trianglesStart, sceneDataValues.length);

                        for (const triangle of this._triangles) {

                            // add triangle

                            sceneDataValues.push(triangle.v0[0], triangle.v0[1], triangle.v0[2]);
                            sceneDataValues.push(triangle.v1[0], triangle.v1[1], triangle.v1[2]);
                            sceneDataValues.push(triangle.v2[0], triangle.v2[1], triangle.v2[2]);

                            sceneDataValues.push(triangle.color[0], triangle.color[1], triangle.color[2]); // color
                            sceneDataValues.push(triangle.reflection); // reflection

                            sceneDataValues.push(triangle.shadowEnabled ? 1 : 0); // shadowEnabled
                            sceneDataValues.push(triangle.lightEnabled ? 1 : 0); // lightEnabled
                        }

                        gl.uniform1f(u_trianglesStop, sceneDataValues.length);

                    } // triangles
                }


                gl.activeTexture(gl.TEXTURE0 + 0);
                this._sceneDataTexture.bind();

                this._sceneDataTexture.update(sceneDataValues);

                const u_sceneTextureData = shader.getUniform("u_sceneTextureData");
                const u_sceneTextureSize = shader.getUniform("u_sceneTextureSize");

                gl.uniform1i(u_sceneTextureData, 0);
                gl.uniform2f(u_sceneTextureSize, sceneDataValues.length, 1);

            } // scene data

            { // lights data

                const lightsDataValues: number[] = [];

                { // sun lights

                    const u_sunLightsStart = shader.getUniform("u_sunLightsStart");
                    const u_sunLightsStop = shader.getUniform("u_sunLightsStop");

                    gl.uniform1f(u_sunLightsStart, 0);

                    for (const sunLight of this._sunLights) {

                        // add sun light

                        lightsDataValues.push(sunLight.direction[0], sunLight.direction[1], sunLight.direction[2]);
                        lightsDataValues.push(sunLight.intensity);
                    }

                    gl.uniform1f(u_sunLightsStop, lightsDataValues.length);

                } // sun lights

                { // spot lights

                    const u_spotLightsStart = shader.getUniform("u_spotLightsStart");
                    const u_spotLightsStop = shader.getUniform("u_spotLightsStop");

                    gl.uniform1f(u_spotLightsStart, lightsDataValues.length);

                    for (const spotLight of this._spotLights) {

                        // add spot light

                        lightsDataValues.push(spotLight.position[0], spotLight.position[1], spotLight.position[2]);
                        lightsDataValues.push(spotLight.intensity);
                        lightsDataValues.push(spotLight.radius);
                    }

                    gl.uniform1f(u_spotLightsStop, lightsDataValues.length);

                } // spot lights


                gl.activeTexture(gl.TEXTURE0 + 1);
                this._lightsDataTexture.bind();

                this._lightsDataTexture.update(lightsDataValues);

                const u_lightsTextureData = shader.getUniform("u_lightsTextureData");
                const u_lightsTextureSize = shader.getUniform("u_lightsTextureSize");

                gl.uniform1i(u_lightsTextureData, 1);
                gl.uniform2f(u_lightsTextureSize, lightsDataValues.length, 1);

                //

                { // grid

                    // upload to gpu
                    // -> master box
                    // -> children boxes
                    // ---> must contains primitives indices

                    const gridDataValues: number[] = [];

                    // gridDataValues.push(-35, -35, -35);
                    // gridDataValues.push(70, 70, 70);

                    this._grid.gridBoxes.forEach((gridBox) => {

                        // TODO: hardcoded
                        const min = glm.vec3.fromValues(
                            -35 + 70 / gridSize * gridBox.origin[0],
                            -35 + 70 / gridSize * gridBox.origin[1],
                            -35 + 70 / gridSize * gridBox.origin[2]);
                        const max = glm.vec3.fromValues(
                            -35 + 70 / gridSize * (gridBox.origin[0] + gridBox.size[0]),
                            -35 + 70 / gridSize * (gridBox.origin[1] + gridBox.size[1]),
                            -35 + 70 / gridSize * (gridBox.origin[2] + gridBox.size[2]));

                        const p = gridBox.primitives;

                        const dataSize = (
                            // data size
                            1 // 0
                            // origin
                            + 3 // 1..3
                            // size
                            + 3 // 4..6
                            // triangles
                            + 1 // 7
                            + p.triangles.size // 8..x
                            // + 1
                            // + p.spheres.size
                            // + 1
                            // + p.boxes.size
                        );
                        gridDataValues.push(dataSize);

                        // origin
                        gridDataValues.push(min[0], min[1], min[2]);
                        // size
                        gridDataValues.push(max[0] - min[0], max[1] - min[1], max[2] - min[2]);

                        // triangles
                        gridDataValues.push(p.triangles.size);
                        p.triangles.forEach((triangleIndex) => gridDataValues.push(triangleIndex));


                        // console.log("this._triangles.length", this._triangles.length);
                        // console.log("p.triangles", p.triangles);

                        // p.triangles.forEach((triangleIndex) => {
                        //     if (triangleIndex >= this._triangles.length) {
                        //         console.log("p.triangles", p.triangles);
                        //         throw new Error(`invalid index ${triangleIndex}/${this._triangles.length}`);
                        //     }
                        // });


                        // gridDataValues.push(p.spheres.size);
                        // p.spheres.forEach((sphereIndex) => gridDataValues.push(sphereIndex));

                        // gridDataValues.push(p.boxes.size);
                        // p.boxes.forEach((boxIndex) => gridDataValues.push(boxIndex));
                    });

                    //

                    gl.activeTexture(gl.TEXTURE0 + 2);
                    this._gridDataTexture.bind();

                    this._gridDataTexture.update(gridDataValues);

                    const u_gridTextureData = shader.getUniform("u_gridTextureData");
                    const u_gridTextureSize = shader.getUniform("u_gridTextureSize");

                    gl.uniform1i(u_gridTextureData, 2);
                    gl.uniform2f(u_gridTextureSize, gridDataValues.length, 1);

                } // grid

            } // lights data

            //
            //
            //

            this._raytracingGeometry.render();

        } // raytracing pass

        FrameBuffer.unbind();
        gl.viewport(0, 0, this._width, this._height);
        gl.clear(gl.COLOR_BUFFER_BIT /*| gl.DEPTH_BUFFER_BIT*/);

        { // texture pass

            const shader = this._textureShaderProgram;

            shader.bind();

            const u_texture = shader.getUniform("u_texture");
            gl.uniform1i(u_texture, 0);

            gl.activeTexture(gl.TEXTURE0 + 0);
            this._finalTexture.bind();

            // anti aliasing setup

            const u_step = shader.getUniform("u_step");

            if (this._antiAliasing) {

                const scaledWidth = Math.floor(this._width * this._resolutionCoef);
                const scaledHeight = Math.floor(this._height * this._resolutionCoef);
                const stepX = (1 - scaledWidth / this._width) * 0.005;
                const stepY = (1 - scaledHeight / this._height) * 0.005;

                gl.uniform2f(u_step, stepX, stepY);
            }
            else {
                gl.uniform2f(u_step, 0, 0);
            }

            this._screenGeometry.render();

            gl.bindTexture(gl.TEXTURE_2D, null);

        } // texture pass

        gl.useProgram(null);
    }

    reset() {
        this._sunLights.length = 0;
        this._spotLights.length = 0;

        this._spheres.length = 0;
        this._boxes.length = 0;
        this._triangles.length = 0;
    }

    setResolutionCoef(newResolutionCoef: number) {

        if (newResolutionCoef === this._resolutionCoef)
            return;

        this._resolutionCoef = newResolutionCoef;

        const newWidth = Math.floor(this._width * this._resolutionCoef);
        const newHeight = Math.floor(this._height * this._resolutionCoef);

        this._finalTexture.resize(newWidth, newHeight);
    }

    getResolutionCoef() {
        return this._resolutionCoef;
    }

    setAntiAliasing(enabled: boolean) {
        this._antiAliasing = enabled;
    }

    getAntiAliasing() {
        return this._antiAliasing;
    }

    getCurrentSize(): [number, number] {
        return [
            Math.floor(this._width * this._resolutionCoef),
            Math.floor(this._height * this._resolutionCoef)
        ];
    }

    // getTriangles(): Readonly<ITriangle[]> {
    //     return this._triangles;
    // }

    private _computeCameraFarCorners() {

        const forwardDir = glm.vec3.sub(glm.vec3.create(), this._camera.target, this._camera.position);

        const leftDir = glm.vec3.cross(glm.vec3.create(), forwardDir, this._camera.up);
        const upDir = glm.vec3.cross(glm.vec3.create(), leftDir, forwardDir);

        const radHFovy = degToRad(g_fovy * 0.5);
        const xLength = Math.cos(radHFovy) * 1 / Math.sin(radHFovy);

        const scaledForwardDir = glm.vec3.multiply(glm.vec3.create(), forwardDir, glm.vec3.fromValues(xLength, xLength, xLength));
        const farCenter = glm.vec3.add(glm.vec3.create(), this._camera.position, scaledForwardDir);

        const aspectRatio  = this._width / this._height;
        const farHalfWidth = glm.vec3.multiply(glm.vec3.create(), leftDir, glm.vec3.fromValues(aspectRatio, aspectRatio, aspectRatio))

        const farUp     = glm.vec3.add(glm.vec3.create(), farCenter, upDir);
        const farBottom = glm.vec3.subtract(glm.vec3.create(), farCenter, upDir);
        const farTopLeft     = glm.vec3.subtract(glm.vec3.create(), farUp, farHalfWidth);
        const farBottomLeft  = glm.vec3.subtract(glm.vec3.create(), farBottom, farHalfWidth);
        const farTopRight    = glm.vec3.add(glm.vec3.create(), farUp, farHalfWidth);
        const farBottomRight = glm.vec3.add(glm.vec3.create(), farBottom, farHalfWidth);

        return [
            farTopRight[0],    farTopRight[1],    farTopRight[2],
            farTopLeft[0],     farTopLeft[1],     farTopLeft[2],
            farBottomRight[0], farBottomRight[1], farBottomRight[2],
            farBottomLeft[0],  farBottomLeft[1],  farBottomLeft[2],
        ];
    }

};