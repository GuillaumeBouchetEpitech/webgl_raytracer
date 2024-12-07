
import bulletTypes from "../types/bulletJsTypes";

import { scriptLoadingUtility } from "./scriptLoadingUtility";

export type BulletJsInstance = typeof bulletTypes;

interface IOptions {
  jsUrl: string,
  wasmUrl: string
}

export class BrowserBulletWasmModule {

  private static _wasmModule: BulletJsInstance | undefined;

  static async load(opts: IOptions) {
    await BrowserBulletWasmModule.loadJsPart(opts.jsUrl);
    await BrowserBulletWasmModule.loadWasmPart(opts.wasmUrl);
  }

  static async loadJsPart(url: string) {
    await scriptLoadingUtility(url);
  }

  static async loadWasmPart(urlPrefix: string) {
    // @ts-ignore
    BrowserBulletWasmModule._wasmModule = await bulletJsLoader({
      locateFile: (url: string) => {
        return `${urlPrefix}/${url}`;
      },
      // TOTAL_MEMORY: 1 * 1024
    });
  }

  static get(): BulletJsInstance {
    if (!this._wasmModule) {
      throw new Error("bulletjs wasm module not loaded");
    }
    return this._wasmModule;
  }

};
