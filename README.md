# Webgl Raytracer

## Live Demo

* It does require WebGL2
* It might not work on smartphones
* Chromium based web browsers behave the best so far
* Click the canvas for free fly camera controls
* The resolution will be scaled down if performance issues arise
* Some people like it with a low resolution and no anti aliasing

Beyond that: [follow that link to see for yourself](http://guillaumebouchetepitech.github.io/webgl_raytracer/index.html).

# How To Build

### Only Once
```bash
npm install -g bun # if not already installed
bun install
```

### Release Build
```bash
npm run build-release # minified
```

### Debug Build
```bash
npm run build debug # inlined sourcemap
```
