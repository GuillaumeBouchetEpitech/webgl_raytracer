# Webgl Raytracer

## Live Demo

### Disclaimer(s)
* It might not work well on smartphones
* Chromium based web browsers behave the best so far
* Click the canvas for free fly camera controls
* The resolution will be scaled down if performance issues arise

### Demo
Beyond that: [follow that link to see for yourself](http://guillaumebouchetepitech.github.io/webgl_raytracer/index.html).

### Demo2
Some failed experiment: [link to failed demo](http://guillaumebouchetepitech.github.io/webgl_raytracer/dist-failed-experiment/index.html).

## Physic Engine Used

"FrankenPhys", follow that [link](https://github.com/GuillaumeBouchetEpitech/FrankenPhys).

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

## Main data texture description

* **Dimensions:** 2048x6
* **Type:** 2D texture
* **Format:** RGBA32F

Example of "table-cell" / "data-texture-pixel" (vec4 f32):
```
*---------------*
| R | G | B | A |
*---------------*
```

All data texture rows:

| row index | row type        |
|-----------|-----------------|
|         0 | materials       |
|         1 | sphere shapes   |
|         2 | box shapes      |
|         3 | triangle shapes |
|         4 | point lights    |
|         5 | bvh tree nodes  |

Material row values (row index: 0)
```
2 x vec4f
basic-material-texel[0]:R: material type (0=basic)
basic-material-texel[0]:G: can cast shadows (0 or 1)
basic-material-texel[0]:B: reflection index [0..1]
basic-material-texel[0]:A: refraction index [0..1]
basic-material-texel[1]:R: can receive light
basic-material-texel[1]:G: color.r
basic-material-texel[1]:B: color.g
basic-material-texel[1]:A: color.b

2 x vec4f
chessboard-material-texel[0]:R: material type (1=chessboard)
chessboard-material-texel[0]:G: can cast shadows (0 or 1)
chessboard-material-texel[0]:B: sub material index A (basic-material index)
chessboard-material-texel[0]:A: sub material index B (basic-material index)
chessboard-material-texel[1]:R: chessboard-fraction.x
chessboard-material-texel[1]:G: chessboard-fraction.y
chessboard-material-texel[1]:B: chessboard-fraction.z
chessboard-material-texel[1]:A: <unused>
```

Sphere shapes row values (row index: 1)
```
3 x vec4f
sphere-shape-texel[0]:R: can cast shadow (0 or 1)
sphere-shape-texel[0]:G: material index
sphere-shape-texel[0]:B: center.x
sphere-shape-texel[0]:A: center.y
sphere-shape-texel[1]:R: center.z
sphere-shape-texel[1]:G: quat.x
sphere-shape-texel[1]:B: quat.y
sphere-shape-texel[1]:A: quat.z
sphere-shape-texel[2]:R: quat.w
sphere-shape-texel[2]:G: radius
sphere-shape-texel[2]:B: <unused>
sphere-shape-texel[2]:A: <unused>
```

Box shapes row values (row index: 2)
```
3 x vec4f
box-shape-texel[0]:R: can cast shadow (0 or 1)
box-shape-texel[0]:G: material index
box-shape-texel[0]:B: center.x
box-shape-texel[0]:A: center.y
box-shape-texel[1]:R: center.z
box-shape-texel[1]:G: quat.x
box-shape-texel[1]:B: quat.y
box-shape-texel[1]:A: quat.z
box-shape-texel[2]:R: quat.w
box-shape-texel[2]:G: boxSize.x
box-shape-texel[2]:B: boxSize.y
box-shape-texel[2]:A: boxSize.z
```

Triangle shapes row values (row index: 3)
```
3 x vec4f
triangle-shape-texel[0]:R: can cast shadow (0 or 1)
triangle-shape-texel[0]:G: material index
triangle-shape-texel[0]:B: triangle0.x
triangle-shape-texel[0]:A: triangle0.y
triangle-shape-texel[1]:R: triangle0.z
triangle-shape-texel[1]:G: triangle1.x
triangle-shape-texel[1]:B: triangle1.y
triangle-shape-texel[1]:A: triangle1.z
triangle-shape-texel[2]:R: triangle2.x
triangle-shape-texel[2]:G: triangle2.y
triangle-shape-texel[2]:B: triangle2.z
triangle-shape-texel[2]:A: <unused>
```

Point lights row values (row index: 4)
```
2 x vec4f
point-light-texel[0]:R: point light position.x
point-light-texel[0]:G: point light position.y
point-light-texel[0]:B: point light position.z
point-light-texel[0]:A: point light radius
point-light-texel[1]:R: point light intensity
point-light-texel[1]:G: <unused>
point-light-texel[1]:B: <unused>
point-light-texel[1]:A: <unused>
```

BVH tree node row values (row index: 5)
```
3 x vec4f
BVH-node-texel[0]:R: AABB.min.x
BVH-node-texel[0]:G: AABB.min.y
BVH-node-texel[0]:B: AABB.min.z
BVH-node-texel[0]:A: AABB.max.x
BVH-node-texel[1]:R: AABB.max.y
BVH-node-texel[1]:G: AABB.max.z
BVH-node-texel[1]:B: child node (left) index (if none: set to -1 )
BVH-node-texel[1]:A: child node (right) index (if none: set to -1 )
BVH-node-texel[2]:R: leaf shape (left) index (if none: set to -1 )
BVH-node-texel[2]:G: leaf shape (right) index (if none: set to -1 )
BVH-node-texel[2]:B: leaf shape (left) "can cast shadow" (0 or 1)
BVH-node-texel[2]:A: leaf shape (right) "can cast shadow" (0 or 1)
```
