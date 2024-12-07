
/// @ts-ignore
import bulletJsLoader from "../../../build/bulletJs.0.0.1.js";

import bulletJsTypes from "../types/bulletJsTypes";

import * as path from "path";

export type BulletJsInstance = typeof bulletJsTypes;

export class NodeJsBulletWasmModule {

  private static _wasmModule: BulletJsInstance | undefined;

  static async loadWasmPart(urlPrefix: string) {
    NodeJsBulletWasmModule._wasmModule = await bulletJsLoader({
      locateFile: (url: string) => {
        return path.join(urlPrefix, url);
      },
      // TOTAL_MEMORY: 1 * 1024
    });
  }

  static get(): BulletJsInstance {
    if (!this._wasmModule) {
      throw new Error("bulletJs wasm module not loaded");
    }
    return this._wasmModule;
  }

};
