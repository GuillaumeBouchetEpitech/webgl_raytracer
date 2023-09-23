
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
    entrypoints: [`./src/main.ts`],
    outdir: './dist',
    target: 'browser',
    format: "esm",
    root: `./src`,
    naming: `[dir]/main.[ext]`,
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

  console.log('result', result);
};
asyncRun();
