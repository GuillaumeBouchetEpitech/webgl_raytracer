
import { readFileSync } from "fs";

const GlslFilesLoaderPlugin = {
  name: "GLSL Loader",
  setup(build) {
    build.onLoad({ filter: /\.glsl\.(?:frag|vert)$/ }, ({ path }) => {

      const fileContent = readFileSync(path, { encoding: "utf8" });

      const lines = fileContent
        .split("\n")
        // .map(line => line.trim())
        // .filter(line => line.replace(/(.*?)\/\/.*/, "$1"))
        // .filter(line => line.length > 0)
        ;

      const contents = `export default \`${lines.join('\n')}\`.trim();`;

      return { contents, loader: "js" };
    });
  },
};

const asyncRun = async () => {

  console.log('run');

  const isRelease = process.argv[2] === 'release';

  const config = {
    entrypoints: [`./projects/webgl-ray-tracer/src/main.ts`],
    outdir: './dist',
    target: 'browser',
    format: "esm",
    root: `./projects/webgl-ray-tracer`,
    naming: `bundle.js`,
    plugins: [GlslFilesLoaderPlugin],
  };

  if (isRelease === true) {
    config.minify = {
      whitespace: true,
      identifiers: true,
      syntax: true,
    };
  } else {
    config.sourcemap = "inline";
  }

  const result = await Bun.build(config);

  if (result?.success === true) {
    console.log('SUCCESS');
  } else {
    console.log('ERROR.result', result);
  }
};
asyncRun();
