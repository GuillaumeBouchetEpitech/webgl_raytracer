
//
////

// Indices of refractionFactor
const float REFRACTION_AIR = 1.0;
const float REFRACTION_GLASS = 1.51714;

// Air to glass ratio of the indices of refractionFactor (Eta)
const float REFRACTION_ETA = REFRACTION_AIR / REFRACTION_GLASS;

// see https://en.wikipedia.org/wiki/Refractive_index
// const float R0 = ((Air - Glass) * (Air - Glass)) / ((Air + Glass) * (Air + Glass));

////
//

//
////

const float     AMBIENT_LIGHT_INTENSITY = 0.05;
const vec3      BACKGROUND_COLOR = vec3(0.1);

const float     NEAR_VALUE = 0.001; // TODO: hardcoded
const float     FAR_VALUE = 100.0; // TODO: hardcoded

// ideal scene stack size is >=7 for reflective AND refractive shapes
const int       MAX_SCENE_STACK_SIZE = 7;

// ideal light stack size is >=5 to handle multiple transparent shapes
const int       MAX_LIGHT_STACK_SIZE = 5;

// ideal bvh stack size is >=16 (is now smaller -> a benefit of BVH4 over BVH2)
const int       MAX_BVH_STACK = 16;
// const int       MAX_BVH_STACK = 32; // <- safer in case of sub-scenes

////
//

//
////

const int   POINT_LIGHTS_ROW_INDEX = 0;
const int   ROW_OFFSET_MATERIALS = 0;
const int   ROW_OFFSET_BVH_NODES = 1;
const int   ROW_OFFSET_SHAPES_SPHERE = 2;
const int   ROW_OFFSET_SHAPES_BOX = 3;
const int   ROW_OFFSET_SHAPES_TRIANGLE = 4;
const int   ROW_OFFSET_SHAPES_SUB_SCENE = 5;

////
//
