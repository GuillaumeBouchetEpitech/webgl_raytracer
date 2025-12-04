
import * as fs from 'node:fs';
import * as path from 'node:path';

import { _handleShaderFile } from './_handleShaderFile.js';

// console.log('process.argv', process.argv);

const _getBuildOptions = () => {
  const buildOptionsRegex = /build-options-(debug|release)/;

  // start at 2 (since 0 is "bun", and 1 is "bun-build.js")
  for (let ii = 2; ii < process.argv.length; ++ii) {
    const capture = buildOptionsRegex.exec(process.argv[ii]);
    if (!capture) {
      continue;
    }

    return { isRelease: capture[1] === 'release' };
  }

  throw new Error('missing build options argument, stopping now');
};

const buildOptions = _getBuildOptions();

//
//
//

const GlslFilesLoaderPlugin = {
  name: "GLSL Loader",
  setup(build) {
    build.onLoad({ filter: /\.glsl\.(?:frag|vert)$/ }, ({ path: shaderFilepath }) => {

      const fileContent = _handleShaderFile(shaderFilepath);

      const contents = `export default \`${fileContent}\`.trim();`;

      return { contents, loader: "js" };
    });
  },
};

const asyncBuild = async ({
  name,
  // tsConfigFilePath,
  inputFilePath,
  outputFilePath,
}) => {

  console.log(` -> BUILDING ${name}`);
  const startTime = Date.now();

  const config = {
    entrypoints: [inputFilePath],
    outdir: '.',
    target: 'browser',
    format: "esm",
    root: path.dirname(inputFilePath),
    naming: outputFilePath,
    plugins: [GlslFilesLoaderPlugin],
  };

  if (buildOptions.isRelease) {
    config.minify = {
      whitespace: true,
      identifiers: true,
      syntax: true,
    }
  } else {
    config.sourcemap = "inline";
  }

  const result = await Bun.build(config);

  if (!result || result.success === false) {
    console.log('ERROR.result', result);
    return;
  }

  const endTime = Date.now();
  const elapsedTime = ((endTime - startTime) / 1000).toFixed(3);

  console.log(`    -> BUILT ${name} (${elapsedTime}sec)`);
  const statData = fs.statSync(outputFilePath);
  console.log(`      -> SIZE ${Math.ceil(statData.size / 1024)}ko`);
};

const asyncRun = async () => {
  await Promise.all([
    asyncBuild({
      name: 'main',
      tsConfigFilePath: `./src/webgl-ray-tracer/tsconfig.json`,
      inputFilePath: `./src/webgl-ray-tracer/src/main.ts`,
      outputFilePath: `./dist/bundle.js`,
    }),
  ]);
};
asyncRun();
