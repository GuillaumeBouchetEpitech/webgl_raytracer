
import * as esbuild from 'esbuild'

const isRelease = process.argv[2] !== 'debug';

const asyncRun = async () => {

  console.log(`start (release: ${isRelease})`)

  const minifyOptions = {
    minify: true,
    minifyWhitespace: true,
    minifyIdentifiers: true,
    minifySyntax: true,
  };

  let buildOptions = {
    entryPoints: ['./src/main.ts'],
    bundle: true,
    target: ['chrome58','firefox57','safari11','edge18'],
    tsconfig: './/tsconfig.json',
    outfile: './dist/bundle.js',
  };

  if (isRelease) {
    buildOptions = { ...buildOptions, ...minifyOptions };
  }

  await esbuild.build(buildOptions);

  console.log("stop");
};
asyncRun();

