
import { WebGLContext } from "./WebGLContext";
import { ShaderProgram } from "./ShaderProgram";

export namespace GeometryWrapper {

    export const BytesPerPixel = 4; // float (float32 = 4 bytes)

    export enum AttributeType {
        float,
        vec2f,
        vec3f,
        vec4f,
        mat3f,
        mat4f
    };

    export enum PrimitiveType {
        lines,
        triangles,
        triangleStrip,
    };

    export interface VertexBufferObjectAttr {
        name: string;
        type: AttributeType;
        index: number;
    };

    export interface VertexBufferObjectDefinition {
        attributes: VertexBufferObjectAttr[];
        stride?: number;
        instanced: boolean;
    };

    export interface GeometryDefinition {
        vertexBufferObjects: VertexBufferObjectDefinition[];
        primitiveType: PrimitiveType;
    };

    export class Geometry {

        private _def: GeometryDefinition;
        private _vertexArrayObject: WebGLVertexArrayObjectOES;
        private _vertexBufferObjects: WebGLBuffer[];
        private _primitiveType: number;
        private _primitiveStart: number = 0;
        private _primitiveCount: number = 0;
        private _instanceCount: number = 0;
        private _isInstanced: boolean = false;

        constructor(shader: ShaderProgram, def: GeometryDefinition) {

            const gl = WebGLContext.getContext();

            if (def.vertexBufferObjects.length === 0)
                throw new Error("empty vbo defintion");

            for (const vbo of def.vertexBufferObjects) {

                if (vbo.attributes.length === 0)
                    throw new Error("empty vbo attribute defintion");

                for (const attr of vbo.attributes)
                    if (!shader.hasAttribute(attr.name))
                        throw new Error(`attribute not found, name="${attr.name}"`);
            }

            this._def = def;

            switch (def.primitiveType) {
                case PrimitiveType.lines:
                    this._primitiveType = gl.LINES;
                    break;
                case PrimitiveType.triangles:
                    this._primitiveType = gl.TRIANGLES;
                    break;
                case PrimitiveType.triangleStrip:
                    this._primitiveType = gl.TRIANGLE_STRIP;
                    break;
                default:
                    throw new Error("primitive type not found");
            }

            const vao = gl.createVertexArray();
            if (!vao)
                throw new Error("fail o create a vao unit");

            this._vertexArrayObject = vao;
            gl.bindVertexArray(this._vertexArrayObject);

            //

            this._vertexBufferObjects = [];
            for (const vboDef of this._def.vertexBufferObjects) {

                const vbo = gl.createBuffer();
                if (!vbo)
                    throw new Error("fail o create a vbo unit");

                this._vertexBufferObjects.push(vbo);

                gl.bindBuffer(gl.ARRAY_BUFFER, vbo);

                let stride = vboDef.stride || 0;
                if (!stride) {
                    // auto determine stride value
                    for (const attr of vboDef.attributes) {
                        switch (attr.type) {
                            case AttributeType.float: stride += 1; break;
                            case AttributeType.vec2f: stride += 2; break;
                            case AttributeType.vec3f: stride += 3; break;
                            case AttributeType.vec4f: stride += 4; break;
                            case AttributeType.mat3f: stride += 9; break;
                            case AttributeType.mat4f: stride += 16; break;
                        }
                    }
                    stride *= BytesPerPixel;
                }

                for (const attr of vboDef.attributes) {

                    let rowSize = 1;
                    let totalRows = 1;
                    switch (attr.type) {
                        case AttributeType.float: rowSize = 1; totalRows = 1; break;
                        case AttributeType.vec2f: rowSize = 2; totalRows = 1; break;
                        case AttributeType.vec3f: rowSize = 3; totalRows = 1; break;
                        case AttributeType.vec4f: rowSize = 4; totalRows = 1; break;
                        case AttributeType.mat3f: rowSize = 3; totalRows = 3; break;
                        case AttributeType.mat4f: rowSize = 4; totalRows = 4; break;
                    }

                    const attrLocation = shader.getAttribute(attr.name);

                    // TODO: check if the index is 0 on k>0 and assert/throw on it

                    for (let ii = 0; ii < totalRows; ++ii) {

                        const attrId = attrLocation + ii;
                        const rowIndex = (attr.index + ii * rowSize) * BytesPerPixel;

                        gl.enableVertexAttribArray(attrId);
                        gl.vertexAttribPointer(attrId, rowSize, gl.FLOAT, false, stride, rowIndex);

                        if (vboDef.instanced === true) {
                            gl.vertexAttribDivisor(attrId, 1);
                            this._isInstanced = true;
                        }
                    }
                }
            }

            //

            gl.bindVertexArray(null);
        }

        dispose() {

            const gl = WebGLContext.getContext();

            for (let ii = 0; ii < this._vertexBufferObjects.length; ++ii)
                gl.deleteBuffer(this._vertexBufferObjects[ii]);

            gl.deleteVertexArray( this._vertexArrayObject );
        }

        updateBuffer(index: number, vertices: number[] | Float32Array, dynamic: boolean = false)  {

            if (index < 0 || index >= this._vertexBufferObjects.length)
                throw new Error("no buffer avaialble to tha index");

            const gl = WebGLContext.getContext();

            const vbo = this._vertexBufferObjects[index];
            const buffer = (vertices instanceof Float32Array) ? vertices : new Float32Array(vertices);
            const usage = (dynamic ? gl.DYNAMIC_DRAW : gl.STATIC_DRAW);

            gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
            gl.bufferData(gl.ARRAY_BUFFER, buffer, usage);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
        }

        render() {

            if (this._primitiveCount == 0 || (this._isInstanced && this._instanceCount == 0))
                return;

            const gl = WebGLContext.getContext();

            gl.bindVertexArray(this._vertexArrayObject);

            if (this._isInstanced === true) {
                gl.drawArraysInstanced(this._primitiveType, this._primitiveStart, this._primitiveCount, this._instanceCount);
            }
            else {
                gl.drawArrays(this._primitiveType, this._primitiveStart, this._primitiveCount);
            }

            gl.bindVertexArray(null);
        }

        setPrimitiveStart(start: number) {
            this._primitiveStart = start;
        }

        setPrimitiveCount(count: number) {
            this._primitiveCount = count;
        }

        setInstancedCount(count: number) {
            this._instanceCount = count;
        }
    };
};
