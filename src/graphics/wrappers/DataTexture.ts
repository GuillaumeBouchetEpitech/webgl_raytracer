
import { WebGLContext } from "./WebGLContext";

export class DataTexture {

    private _textureObject: WebGLTexture = null;

    initialise(data: number[] = [ -1 ], numComponents: number = 1) {

        if (this._textureObject)
            throw new Error("data texture already initialised");

        // expand the data to 4 values per pixel.
        const numElements = data.length / numComponents;
        const expandedData = new Float32Array(numElements * 4);
        for (let ii = 0; ii < numElements; ++ii) {
            const srcOff = ii * numComponents;
            const dstOff = ii * 4;
            for (let jj = 0; jj < numComponents; ++jj) {
                expandedData[dstOff + jj] = data[srcOff + jj];
            }
        }

        const gl = WebGLContext.getContext();

        this._textureObject = gl.createTexture();

        gl.bindTexture(gl.TEXTURE_2D, this._textureObject);

        // make it possible to use a non-power-of-2 texture and we don't need any filtering
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

        // TODO: refactor

        const level = 0;
        const internalFormat = gl.RGBA32F; // gl.RGBA
        const width = numElements;
        const height = 1;
        const border = 0;
        const format = gl.RGBA;
        const type = gl.FLOAT;
        gl.texImage2D(
            gl.TEXTURE_2D,
            level,
            internalFormat,
            width,
            height,
            border,
            format,
            type,
            expandedData,
        );

        // // default to one value set to -1
        // this.update([ -1 ], 1);
    }

    update(data: number[], numComponents: number) {

        if (!this._textureObject)
            throw new Error("data texture not initialised");

        // expand the data to 4 values per pixel.
        const numElements = data.length / numComponents;
        const expandedData = new Float32Array(numElements * 4);
        for (let ii = 0; ii < numElements; ++ii) {
            const srcOff = ii * numComponents;
            const dstOff = ii * 4;
            for (let jj = 0; jj < numComponents; ++jj) {
                expandedData[dstOff + jj] = data[srcOff + jj];
            }
        }

        const gl = WebGLContext.getContext();

        gl.bindTexture(gl.TEXTURE_2D, this._textureObject);

        // TODO: refactor

        const level = 0;
        const internalFormat = gl.RGBA32F; // gl.RGBA
        const width = numElements;
        const height = 1;
        const border = 0;
        const format = gl.RGBA;
        const type = gl.FLOAT;
        gl.texImage2D(
            gl.TEXTURE_2D,
            level,
            internalFormat,
            width,
            height,
            border,
            format,
            type,
            expandedData,
        );
    }

    bind() {

        if (!this._textureObject)
            throw new Error("data texture not initialised");

        const gl = WebGLContext.getContext();

        gl.bindTexture(gl.TEXTURE_2D, this._textureObject);
    }
};
