
const isRelease = process.argv[2] === 'release';

const asyncRun = async () => {

  const config = {
    entrypoints: [`./src/main.ts`],
    outdir: './dist',
    target: 'browser',
    format: "esm",
    root: `./src`,
    naming: `[dir]/main.[ext]`,
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

  await Bun.build(config);
};
asyncRun();
