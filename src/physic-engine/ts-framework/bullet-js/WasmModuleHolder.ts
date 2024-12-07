
import bulletJsTypes from "../types/bulletJsTypes";

export type BulletJsInstance = typeof bulletJsTypes;

export class WasmModuleHolder {

  private static _wasmModule: BulletJsInstance | undefined;

  static async set(wasmModule: BulletJsInstance) {
    WasmModuleHolder._wasmModule = wasmModule;
  }

  static get(): BulletJsInstance {
    if (!this._wasmModule) {
      throw new Error("bulletJs wasm module not loaded");
    }
    return this._wasmModule;
  }
};

