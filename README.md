# Webgl Raytracer

## Live Demo

### Disclaimer(s)
* It does require WebGL2
* It might not work on smartphones
* Chromium based web browsers behave the best so far
* Click the canvas for free fly camera controls
* The resolution will be scaled down if performance issues arise
* Some people like it with a low resolution and no anti aliasing

### Demo
Beyond that: [follow that link to see for yourself](http://guillaumebouchetepitech.github.io/webgl_raytracer/index.html).

### Demo2
Some failed experiment: [link to failed demo](http://guillaumebouchetepitech.github.io/webgl_raytracer/dist-failed-experiment/index.html).

## Physic Engine Used

"FrankenPhys", here's the [link](https://github.com/GuillaumeBouchetEpitech/FrankenPhys) get it.

## How To Run

First start the file server

```bash
node dumbFileServer.js 16000 0.0.0.0
```

Then open that link: http://localhost:16000/index.html

## How To Build

Tested with: node@22 + npm@10

```bash
# only once
npm install
```
```bash
# watch for changes
# ---> nodemon, typescript + shader files
# and build debug version
# ---> bun.js fast debug build with inlined sourcemap (~0.1s)
# ---> type safety is NOT applied
npm run watch
```

```bash
# build release version
# ---> rollup.js build with minification passes and comments removal (~4.5s)
# ---> type safety is applied
npm run release
```

```bash
# build debug version
# ---> rollup.js build with inlined sourcemap (~3.5s)
# ---> type safety is applied
npm run debug
```
