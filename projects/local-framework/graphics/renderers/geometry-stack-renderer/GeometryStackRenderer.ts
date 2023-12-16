import { graphics } from '../../..';

// @ts-ignore
import vertexShader from './shaders/geometry-stack-renderer.glsl.vert';
// @ts-ignore
import fragmentShader from './shaders/geometry-stack-renderer.glsl.frag';

import * as glm from 'gl-matrix';

interface IAliasedGeometry {
  geometry: graphics.webgl2.GeometryWrapper.Geometry;
  buffer: Float32Array;
  currentSize: number;
}

export class GeometryStackRenderer {
  private _shader: graphics.webgl2.ShaderProgram;
  private _geoDef: graphics.webgl2.GeometryWrapper.GeometryDefinition;

  private _aliasedGeometriesMap = new Map<number, IAliasedGeometry>();

  constructor() {
    this._shader = new graphics.webgl2.ShaderProgram('GeometryStackRenderer', {
      vertexSrc: vertexShader,
      fragmentSrc: fragmentShader,
      attributes: [
        'a_vertexPosition',
        'a_vertexNormal',
        'a_offsetPosition',
        'a_offsetOrientation',
        'a_offsetScale',
        'a_offsetColor',
      ],
      uniforms: ['u_composedMatrix', 'u_lightPos']
    });

    const geoBuilder = new graphics.webgl2.GeometryWrapper.GeometryBuilder();
    geoBuilder
      .reset()
      .setPrimitiveType('triangles')
      .addVbo()
      .addVboAttribute('a_vertexPosition', 'vec3f')
      .addVboAttribute('a_vertexNormal', 'vec3f')
      .addVbo()
      .setVboAsDynamic()
      .setVboAsInstanced()
      .addVboAttribute('a_offsetPosition', 'vec3f')
      .addVboAttribute('a_offsetOrientation', 'vec4f')
      .addVboAttribute('a_offsetScale', 'vec3f')
      .addVboAttribute('a_offsetColor', 'vec3f');

    this._geoDef = geoBuilder.getDef();

    // this._geometry = new graphics.webgl2.GeometryWrapper.Geometry(
    //   this._shader,
    //   this._geoDef
    // );

    // const modelMat4 = glm.mat4.create();
    // glm.mat4.identity(modelMat4);
    // glm.mat4.scale(modelMat4, modelMat4, [2,1,1]);
    // const vertices = generateSphereVertices(0, 0.5, modelMat4);

    // const rawData = vertices.map(vertex => [
    //   vertex.position[0],
    //   vertex.position[1],
    //   vertex.position[2],
    //   vertex.normal[0],
    //   vertex.normal[1],
    //   vertex.normal[2]]
    // ).flat();

    // this._geometry.updateBuffer(0, rawData, rawData.length);
    // this._geometry.setPrimitiveCount(rawData.length / 6);
  }

  createAlias(alias: number, bufferSize: number, vertices: number[]): void {
    const aliasGeometry = this._aliasedGeometriesMap.get(alias);
    if (aliasGeometry) {
      throw new Error("alias already exist, alias: " + alias);
    }

    const newAlias: IAliasedGeometry = {
      geometry: new graphics.webgl2.GeometryWrapper.Geometry(this._shader, this._geoDef),
      buffer: new Float32Array(bufferSize * 13),
      currentSize: 0,
    };

    newAlias.geometry.updateBuffer(0, vertices, vertices.length);
    newAlias.geometry.setPrimitiveCount(vertices.length / 6);
    this._aliasedGeometriesMap.set(alias, newAlias);
  }
  deleteAlias(alias: number): void {
    const aliasGeometry = this._aliasedGeometriesMap.get(alias);
    if (!aliasGeometry) {
      throw new Error("alias not found, alias: " + alias);
    }
    this._aliasedGeometriesMap.delete(alias);
  }
  clearAlias(alias: number): void {
    const aliasGeometry = this._aliasedGeometriesMap.get(alias);
    if (!aliasGeometry) {
      throw new Error("alias not found, alias: " + alias);
    }
    aliasGeometry.currentSize = 0;
  }
  pushAlias(
    alias: number,
    position: glm.ReadonlyVec3,
    orientation: glm.ReadonlyQuat,
    scale: glm.ReadonlyVec3,
    color: glm.ReadonlyVec3,
  ): void {

    const aliasGeometry = this._aliasedGeometriesMap.get(alias);
    if (!aliasGeometry) {
      throw new Error("alias not found, alias: " + alias);
    }

    aliasGeometry.buffer[aliasGeometry.currentSize++] = position[0];
    aliasGeometry.buffer[aliasGeometry.currentSize++] = position[1];
    aliasGeometry.buffer[aliasGeometry.currentSize++] = position[2];
    aliasGeometry.buffer[aliasGeometry.currentSize++] = orientation[0];
    aliasGeometry.buffer[aliasGeometry.currentSize++] = orientation[1];
    aliasGeometry.buffer[aliasGeometry.currentSize++] = orientation[2];
    aliasGeometry.buffer[aliasGeometry.currentSize++] = orientation[3];
    aliasGeometry.buffer[aliasGeometry.currentSize++] = scale[0];
    aliasGeometry.buffer[aliasGeometry.currentSize++] = scale[1];
    aliasGeometry.buffer[aliasGeometry.currentSize++] = scale[2];
    aliasGeometry.buffer[aliasGeometry.currentSize++] = color[0];
    aliasGeometry.buffer[aliasGeometry.currentSize++] = color[1];
    aliasGeometry.buffer[aliasGeometry.currentSize++] = color[2];
    // aliasGeometry.currentSize += 13;

  }

  flush(
    composedMatrix: glm.ReadonlyMat4,
    lightPos: glm.ReadonlyVec3,
    clearStack: boolean = true
  ) {

    let canRender = false;
    [...this._aliasedGeometriesMap.values()].forEach(val => {
      if (val.currentSize > 0) {
        canRender = true
      }
    });

    if (!canRender) {
      return;
    }

    this._shader.bind((boundShader) => {
      boundShader.setMatrix4Uniform('u_composedMatrix', composedMatrix);
      boundShader.setFloat3Uniform('u_lightPos', lightPos[0], lightPos[1], lightPos[2]);

      [...this._aliasedGeometriesMap.values()].forEach(val => {

        if (val.currentSize === 0) {
          return;
        }

        val.geometry.updateBuffer(1, val.buffer, val.currentSize);
        val.geometry.setInstancedCount(val.currentSize / 13);
        val.geometry.render();

        if (clearStack === true) {
          val.currentSize = 0;
        }

      });

    });

  }

  clear(): void {
    [...this._aliasedGeometriesMap.values()].forEach(val => {
      val.currentSize = 0;
    });
  }
}
