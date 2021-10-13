#version 300 es

precision highp float;

//

uniform vec3        u_cameraEye;

uniform sampler2D   u_sceneTextureData;
uniform vec2        u_sceneTextureSize;

uniform sampler2D   u_lightsTextureData;
uniform vec2        u_lightsTextureSize;

uniform float       u_spheresStart;
uniform float       u_spheresStop;

uniform float       u_boxesStart;
uniform float       u_boxesStop;

uniform float       u_trianglesStart;
uniform float       u_trianglesStop;

uniform float       u_sunLightsStart;
uniform float       u_sunLightsStop;

uniform float       u_spotLightsStart;
uniform float       u_spotLightsStop;

uniform sampler2D   u_gridTextureData;
uniform vec2        u_gridTextureSize;

//

in vec3  v_position;

out vec4 o_color;

//

const float     g_ambiantLight = 0.2;

const int       g_reflectionMax = 2;
const bool      g_shadowsEnabled = true;

// const vec3      g_backgroundColor = vec3(0.4);
const vec3      g_backgroundColor = vec3(1.0, 0.3, 0.3);

//

struct RayValues
{
    vec3 origin;
    vec3 direction;
};

struct RayResult
{
    bool hasHit;
    float depth;
    vec3 position;
    vec3 normal;
    vec4 color;
    float reflection;
    bool lightEnabled;
};

//
//
//
//
//

float texelFetch(sampler2D tex, vec2 texSize, vec2 pixelCoord)
{
    vec2 uv = (pixelCoord + 0.5) / texSize;
    return texture(tex, uv).x;
}

float getValueByIndexFromTexture(sampler2D tex, vec2 texSize, float index)
{
    float col = mod(index, texSize.x);
    float row = floor(index / texSize.x);
    return texelFetch(tex, texSize, vec2(col, row));
}

//
//
//
//
//

bool intersectSphere(RayValues ray, float radius, out float distance, out vec3 normal)
{
    float nearValue = 0.001; // TODO: hardcoded
    float farValue = 100.0; // TODO: hardcoded

    float b = dot(ray.origin, ray.direction);
    float c = dot(ray.origin, ray.origin) - radius * radius;
    float h = b * b - c;
    if (h < 0.0)
        return false;

    h = sqrt(h);

    float d1 = -b - h;
    if (d1 >= nearValue && d1 <= farValue)
    {
        normal = normalize(ray.origin + ray.direction * d1);
        distance = d1;
        return true;
    }

    float d2 = -b + h;
    if (d2 >= nearValue && d2 <= farValue)
    {
        normal = normalize(ray.origin + ray.direction * d2);
        distance = d2;
        return true;
    }

    return false;
}

bool intersectBox(RayValues ray, vec3 boxSize, out float distance, out vec3 normal)
{
    float nearValue = 0.001; // TODO: hardcoded
    float farValue = 100.0; // TODO: hardcoded

    //
    //
    // sad hack: fix a shadow related bug

    if (ray.direction.x == 0.0) ray.direction.x = -1e-8;
    if (ray.direction.y == 0.0) ray.direction.y = -1e-8;
    if (ray.direction.z == 0.0) ray.direction.z = -1e-8;

    // sad hack: fix a shadow related bug
    //
    //

    vec3 m = sign(ray.direction) / max(abs(ray.direction), 1e-8);
    vec3 n = m * ray.origin;
    vec3 k = abs(m) * boxSize;

    vec3 t1 = -n - k;
    vec3 t2 = -n + k;

	float tN = max(max(t1.x, t1.y), t1.z);
	float tF = min(min(t2.x, t2.y), t2.z);

    if (tN > tF || tF <= 0.0)
        return false;

    if (tN >= nearValue && tN <= farValue)
    {
        normal = normalize(-sign(ray.direction) * step(t1.yzx, t1.xyz) * step(t1.zxy, t1.xyz));
        distance = tN;
        return true;
    }

    if (tF >= nearValue && tF <= farValue)
    {
        normal = normalize(-sign(ray.direction) * step(t1.yzx, t1.xyz) * step(t1.zxy, t1.xyz));
        distance = tF;
        return true;
    }

    return false;
}

bool intersectTriangle(RayValues ray, vec3 v0, vec3 v1, vec3 v2, out float distance, out vec3 normal)
{
    float nearValue = 0.001; // TODO: hardcoded
    float farValue = 100.0; // TODO: hardcoded

    vec3 v1v0 = v1 - v0;
    vec3 v2v0 = v2 - v0;
    vec3 rov0 = ray.origin - v0;

    vec3 n = cross(v1v0, v2v0);
    vec3 q = cross(rov0, ray.direction);
    float d = 1.0 / dot(ray.direction, n);
    float u = d * dot(-q, v2v0);
    float v = d * dot(q, v1v0);
    float t = d * dot(-n, rov0);

    if (u < 0.0 || v < 0.0 || (u + v) > 1.0 || t < nearValue || t > farValue)
        return false;

    normal = normalize(-n);
    distance = t;
    return true;
}

float intersectPlane(RayValues ray, vec3 normal, float offset)
{
    return -(dot(ray.origin, normal) + offset) / dot(ray.direction, normal);
}

float intersectPlane2(RayValues ray, vec3 normal, float offset)
{
    float nearValue = 0.001; // TODO: hardcoded
    float farValue = 1000.0; // TODO: hardcoded

    float a = dot(ray.direction, normal);
    float d = -(dot(ray.origin, normal) + offset) / a;

    if (a > 0.0 || d < nearValue || d > farValue)
        return -1.0;

    return d;
}


// float diskIntersect(RayValues ray, vec3 center, vec3 normal, float radius)
// {
//     vec3  o = ray.origin - center;
//     float t = -dot(normal, o) / dot(ray.direction, normal);
//     vec3  q = o + ray.direction * t;
//     return (dot(q, q) < radius * radius) ? t : -1.0;
// }

//
//
//
//
//

bool intersectScene(RayValues ray, out RayResult result, bool shadowMode)
{
    float bestDistance = -1.0;

    result.hasHit = false;

    if (u_sceneTextureSize.x <= 1.0)
        return false;

    RayValues tmpRay;
    vec3 normal;

    for (float index = u_spheresStart; index < u_spheresStop; index += 11.0)
    {
        bool shadowEnabled = (getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 8.0) != 0.0);

        if (shadowMode && !shadowEnabled)
            continue;

        tmpRay.origin = ray.origin;
        tmpRay.direction = ray.direction;

        vec3 center = vec3(0.0);
        center.x = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 0.0);
        center.y = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 1.0);
        center.z = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 2.0);

        tmpRay.origin -= center;

        float radius = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 3.0);

        float currDistance = 0.0;
        if (!intersectSphere(tmpRay, radius, currDistance, normal) || (bestDistance > 0.0 && currDistance > bestDistance))
            continue;

        bestDistance = currDistance;

        result.hasHit = true;
        result.depth = bestDistance;
        result.position = ray.origin + bestDistance * ray.direction;
        result.normal = normal;

        bool chessboardMaterial = (getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 10.0) != 0.0);

        if (chessboardMaterial)
        {
            // vec3 txPos = (txx * vec4(result.position - center, 1.0)).xyz;
            vec3 txPos = (vec4(result.position - center, 1.0)).xyz;
            // chessboard color effect
            if (fract(txPos.x * 0.2) > 0.5 == fract(txPos.z * 0.2) > 0.5 == fract(txPos.y * 0.2) > 0.5)
            {
                result.color = vec4(1.0);
                result.reflection = 0.3;
            }
            else
            {
                result.color = vec4(0.0, 0.4, 0.45, 1.0);
                result.reflection = 0.0;
            }
        }
        else
        {
            vec3 color = vec3(0.0);
            color.x = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 4.0);
            color.y = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 5.0);
            color.z = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 6.0);

            float reflection = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 7.0);

            result.color = vec4(color, 0.5);
            result.reflection = reflection;
        }

        bool lightEnabled = (getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 9.0) != 0.0);
        result.lightEnabled = lightEnabled;
    }

    for (float index = u_boxesStart; index < u_boxesStop; index += 26.0)
    {
        bool shadowEnabled = (getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 23.0) != 0.0);

        if (shadowMode && !shadowEnabled)
            continue;

        tmpRay.origin = ray.origin;
        tmpRay.direction = ray.direction;

        mat4 normalTransformationMatrix = mat4(
            getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 0.0),
            getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 1.0),
            getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 2.0),
            getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 3.0),

            getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 4.0),
            getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 5.0),
            getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 6.0),
            getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 7.0),

            getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 8.0),
            getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 9.0),
            getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 10.0),
            getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 11.0),

            getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 12.0),
            getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 13.0),
            getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 14.0),
            getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 15.0)
        );

        vec3 boxSize = vec3(1.0);
        boxSize.x = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 16.0);
        boxSize.y = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 17.0);
        boxSize.z = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 18.0);

        mat4 inversedTransformationMatrix = inverse(normalTransformationMatrix);

        // convert ray from world space to box space
        tmpRay.origin = (inversedTransformationMatrix * vec4(tmpRay.origin, 1.0)).xyz;
        tmpRay.direction = (inversedTransformationMatrix * vec4(tmpRay.direction, 0.0)).xyz;

        float currDistance = 0.0;
        if (!intersectBox(tmpRay, boxSize, currDistance, normal) || (bestDistance > 0.0 && currDistance > bestDistance))
            continue;

        bestDistance = currDistance;

        // convert normal from box space to world space
        normal = (normalTransformationMatrix * vec4(normal, 0.0)).xyz;

        result.hasHit = true;
        result.depth = bestDistance;
        result.position = ray.origin + bestDistance * ray.direction;
        result.normal = normal;



        bool chessboardMaterial = (getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 25.0) != 0.0);

        if (chessboardMaterial)
        {
            vec3 txPos = (inversedTransformationMatrix * vec4(result.position, 1.0)).xyz;

            // chessboard color effect
            if (fract(txPos.x * 0.2) > 0.5 == fract(txPos.z * 0.2) > 0.5 == fract(txPos.y * 0.2) > 0.5)
            {
                result.color = vec4(1.0);
                result.reflection = 0.3;
            }
            else
            {
                result.color = vec4(0.0, 0.4, 0.45, 1.0);
                result.reflection = 0.0;
            }
        }
        else
        {
            vec3 color = vec3(0.0);
            color.x = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 19.0);
            color.y = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 20.0);
            color.z = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 21.0);

            float reflection = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 22.0);

            result.color = vec4(color, 1.0);
            result.reflection = reflection;
        }



        bool lightEnabled = (getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 24.0) != 0.0);
        result.lightEnabled = lightEnabled;
    }

    for (float index = u_trianglesStart; index < u_trianglesStop; index += 15.0)
    {
        bool shadowEnabled = (getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 13.0) != 0.0);

        if (shadowMode && !shadowEnabled)
            continue;

        tmpRay.origin = ray.origin;
        tmpRay.direction = ray.direction;

        vec3 v0 = vec3(0.0);
        v0.x = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 0.0);
        v0.y = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 1.0);
        v0.z = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 2.0);

        vec3 v1 = vec3(0.0);
        v1.x = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 3.0);
        v1.y = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 4.0);
        v1.z = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 5.0);

        vec3 v2 = vec3(0.0);
        v2.x = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 6.0);
        v2.y = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 7.0);
        v2.z = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 8.0);


        float currDistance = 0.0;
        if (!intersectTriangle(tmpRay, v0, v1, v2, currDistance, normal) || (bestDistance > 0.0 && currDistance > bestDistance))
            continue;

        bestDistance = currDistance;

        result.hasHit = true;
        result.depth = bestDistance;
        result.position = ray.origin + bestDistance * ray.direction;
        result.normal = normal;

        vec3 color = vec3(0.0);
        color.x = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 9.0);
        color.y = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 10.0);
        color.z = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 11.0);

        float reflection = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 12.0);

        result.color = vec4(color, 1.0);
        result.reflection = reflection;

        bool lightEnabled = (getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 14.0) != 0.0);
        result.lightEnabled = lightEnabled;
    }

    { // plane test

        // vec3 planeNormal = normalize(vec3(0.0, 0.0, 1.0));
        // float val = intersectPlane(tmpRay, planeNormal, 35.0/4.0*3.0);

        // vec3 planeNormal = normalize(vec3(0.0, 0.0, 1.0));
        // float val = intersectPlane(tmpRay, planeNormal, 0.0);

        vec3 planeNormal = normalize(vec3(0.0, 0.0, 1.0));
        float val = intersectPlane(tmpRay, planeNormal, 10.0);

        if (val > 0.0 && (bestDistance <= 0.0 || val < bestDistance))
        {
            result.hasHit = true;
            result.depth = val;
            result.position = ray.origin + val * ray.direction;
            result.normal = vec3(planeNormal);
            result.color = vec4(1.0, 1.0, 1.0, 1.0);
            result.reflection = 0.0;
            result.lightEnabled = true;
        }

    } // plane test

    return result.hasHit;
}

bool intersectScene2(RayValues initialRay, out RayResult result, bool shadowMode)
{

    // -> gpu logic (smart intersect)
    // -> find current box
    // ----> hit master box if out of it
    // -> process primitives
    // ----> stop on a hit
    // -> find box exit (planes intersections)
    // -> repeat until outside of the main box



    float bestDistance = -1.0;

    result.hasHit = false;

    if (u_gridTextureSize.x <= 1.0)
        return false;

    // RayValues tmpRay;
    RayValues tmpRay = RayValues(initialRay.origin, initialRay.direction);

    vec3 normal;



    // -> find current box
    // ----> hit master box if out of it



    // // TODO: hardcoded
    // if (tmpRay.origin.x < -35.0 || tmpRay.origin.x > +35.0 ||
    //     tmpRay.origin.y < -35.0 || tmpRay.origin.y > +35.0 ||
    //     tmpRay.origin.z < -35.0 || tmpRay.origin.z > +35.0)
    // {
    //     return false;
    // }

    int iterationleft2 = 500;

    do {

        if (--iterationleft2 < 0)
            break;


        // TODO: hardcoded
        if (tmpRay.origin.x < -35.0 || tmpRay.origin.x > +35.0 ||
            tmpRay.origin.y < -35.0 || tmpRay.origin.y > +35.0 ||
            tmpRay.origin.z < -35.0 || tmpRay.origin.z > +35.0)
        {
            return false;
        }


        vec3 idealPos = tmpRay.origin + tmpRay.direction * 1.1;


        vec3 boxOrigin = vec3(0.0);
        vec3 boxSize = vec3(0.0);

        float gridIndex = 0.0;
        for (; gridIndex < u_gridTextureSize.x; )
        {
            float dataSize = getValueByIndexFromTexture(u_gridTextureData, u_gridTextureSize, gridIndex + 0.0);

            boxOrigin.x = getValueByIndexFromTexture(u_gridTextureData, u_gridTextureSize, gridIndex + 1.0);
            boxOrigin.y = getValueByIndexFromTexture(u_gridTextureData, u_gridTextureSize, gridIndex + 2.0);
            boxOrigin.z = getValueByIndexFromTexture(u_gridTextureData, u_gridTextureSize, gridIndex + 3.0);

            boxSize.x = getValueByIndexFromTexture(u_gridTextureData, u_gridTextureSize, gridIndex + 4.0);
            boxSize.y = getValueByIndexFromTexture(u_gridTextureData, u_gridTextureSize, gridIndex + 5.0);
            boxSize.z = getValueByIndexFromTexture(u_gridTextureData, u_gridTextureSize, gridIndex + 6.0);

            bool isInside = (
                idealPos.x >= boxOrigin.x && idealPos.x <= boxOrigin.x + boxSize.x &&
                idealPos.y >= boxOrigin.y && idealPos.y <= boxOrigin.y + boxSize.y &&
                idealPos.z >= boxOrigin.z && idealPos.z <= boxOrigin.z + boxSize.z
            );

            if (isInside)
                break;

            gridIndex += dataSize;
        }

        if (gridIndex >= u_gridTextureSize.x)
            return false;

        float trianglesSize = floor(getValueByIndexFromTexture(u_gridTextureData, u_gridTextureSize, gridIndex + 7.0));

        for (float primIndex = 0.0; primIndex < trianglesSize; primIndex += 1.0)
        {

            // float index = primIndex * 15.0;
            float triangleIndex = getValueByIndexFromTexture(u_gridTextureData, u_gridTextureSize, gridIndex + 7.0 + 1.0 + primIndex);
            float index = u_trianglesStart + triangleIndex * 15.0;

            // if (index >= u_trianglesStop)
            //     continue;

            // for (float index = u_trianglesStart; index < u_trianglesStop; index += 15.0)
            {
                bool shadowEnabled = (getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 13.0) != 0.0);

                if (shadowMode && !shadowEnabled)
                    continue;

                vec3 v0 = vec3(0.0);
                v0.x = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 0.0);
                v0.y = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 1.0);
                v0.z = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 2.0);

                vec3 v1 = vec3(0.0);
                v1.x = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 3.0);
                v1.y = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 4.0);
                v1.z = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 5.0);

                vec3 v2 = vec3(0.0);
                v2.x = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 6.0);
                v2.y = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 7.0);
                v2.z = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 8.0);


                float currDistance = 0.0;
                if (!intersectTriangle(tmpRay, v0, v1, v2, currDistance, normal) || (bestDistance > 0.0 && currDistance > bestDistance))
                    continue;

                bestDistance = currDistance;

                result.hasHit = true;
                result.depth = bestDistance;
                result.position = tmpRay.origin + bestDistance * tmpRay.direction;
                result.normal = normal;

                vec3 color = vec3(0.0);
                color.x = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 9.0);
                color.y = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 10.0);
                color.z = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 11.0);

                float reflection = getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 12.0);

                result.color = vec4(color, 1.0);
                result.reflection = reflection;

                bool lightEnabled = (getValueByIndexFromTexture(u_sceneTextureData, u_sceneTextureSize, index + 14.0) != 0.0);
                result.lightEnabled = lightEnabled;
            }
        }

        // float spheresSize = getValueByIndexFromTexture(u_gridTextureData, u_gridTextureSize, gridIndex + 7.0 + 1.0 + trianglesSize + 1.0);
        // // TODO

        // float boxesSize = getValueByIndexFromTexture(u_gridTextureData, u_gridTextureSize, gridIndex + 7.0 + 1.0 + trianglesSize + 1.0 + spheresSize);
        // // TODO

        if (result.hasHit)
            return true;

        // find box exit (planes intersections)
        // repeat until outside of the main box

        const float maxDepth = 999999.0;

        float bestDepth = maxDepth; // TODO: hardcoded

        if (tmpRay.direction.x < 0.0)
        {
            float val = intersectPlane(tmpRay, vec3(1.0, 0.0, 0.0), boxOrigin.x);
            if (val > 0.0 && val < bestDepth)
                bestDepth = val;

            // val = intersectPlane(tmpRay, vec3(-1.0, 0.0, 0.0), -boxOrigin.x);
            // if (val > 0.0 && val < bestDepth)
            //     bestDepth = val;
        }
        else if (tmpRay.direction.x > 0.0)
        {
            float val = intersectPlane(tmpRay, vec3(1.0, 0.0, 0.0), boxOrigin.x + boxSize.x);
            if (val > 0.0 && val < bestDepth)
                bestDepth = val;

            // val = intersectPlane(tmpRay, vec3(-1.0, 0.0, 0.0), -boxOrigin.x - boxSize.x);
            // if (val > 0.0 && val < bestDepth)
            //     bestDepth = val;
        }

        if (tmpRay.direction.y < 0.0)
        {
            float val = intersectPlane(tmpRay, vec3(0.0, 1.0, 0.0), boxOrigin.y);
            if (val > 0.0 && val < bestDepth)
                bestDepth = val;

            // val = intersectPlane(tmpRay, vec3(0.0, -1.0, 0.0), -boxOrigin.y);
            // if (val > 0.0 && val < bestDepth)
            //     bestDepth = val;
        }
        else if (tmpRay.direction.y > 0.0)
        {
            float val = intersectPlane(tmpRay, vec3(0.0, 1.0, 0.0), boxOrigin.y + boxSize.y);
            if (val > 0.0 && val < bestDepth)
                bestDepth = val;

            // val = intersectPlane(tmpRay, vec3(0.0, -1.0, 0.0), -boxOrigin.y - boxSize.y);
            // if (val > 0.0 && val < bestDepth)
            //     bestDepth = val;
        }

        if (tmpRay.direction.z < 0.0)
        {
            float val = intersectPlane(tmpRay, vec3(0.0, 0.0, 1.0), boxOrigin.z);
            if (val > 0.0 && val < bestDepth)
                bestDepth = val;

            // val = intersectPlane(tmpRay, vec3(0.0, 0.0, -1.0), -boxOrigin.z);
            // if (val > 0.0 && val < bestDepth)
            //     bestDepth = val;
        }
        else if (tmpRay.direction.z > 0.0)
        {
            float val = intersectPlane(tmpRay, vec3(0.0, 0.0, 1.0), boxOrigin.z + boxSize.z);
            if (val > 0.0 && val < bestDepth)
                bestDepth = val;

            // val = intersectPlane(tmpRay, vec3(0.0, 0.0, -1.0), -boxOrigin.z - boxSize.z);
            // if (val > 0.0 && val < bestDepth)
            //     bestDepth = val;
        }

        if (bestDepth == maxDepth)
            break;

        tmpRay.origin += normalize(tmpRay.direction) * bestDepth;

    } while (true);

    return result.hasHit;
}

float lightAt(vec3 impactPosition, vec3 impactNormal, vec3 viewer)
{
    float bestIntensity = 0.0;

    for (float index = u_sunLightsStart; index < u_sunLightsStop; index += 4.0)
    {
        vec3 lightDir = vec3(1.0);
        float coef = 1.0;

        if (!g_shadowsEnabled)
            continue;

        lightDir.x = getValueByIndexFromTexture(u_lightsTextureData, u_lightsTextureSize, index + 0.0);
        lightDir.y = getValueByIndexFromTexture(u_lightsTextureData, u_lightsTextureSize, index + 1.0);
        lightDir.z = getValueByIndexFromTexture(u_lightsTextureData, u_lightsTextureSize, index + 2.0);
        float localIntensity = getValueByIndexFromTexture(u_lightsTextureData, u_lightsTextureSize, index + 3.0);

        coef = localIntensity;
        lightDir = normalize(lightDir);

        // is the light blocked by an object?
        RayResult result;
        if (intersectScene(RayValues(impactPosition, lightDir), result, true))
            continue; // an object is shadowing this light: ignore this light

        //
        //
        //

        float intensity = 0.0;
        vec3 reflection = reflect(-lightDir, impactNormal);
        intensity += 0.6 * pow(max(dot(reflection, viewer), 0.0), 30.0);
        intensity += 1.0 * dot(lightDir, impactNormal);

        intensity *= coef;

        if (bestIntensity < intensity)
            bestIntensity = intensity;
    }

    for (float index = u_spotLightsStart; index < u_spotLightsStop; index += 5.0)
    {
        vec3 lightDir = vec3(1.0);
        float coef = 1.0;

        // spot light

        vec3 lightPos = vec3(0.0);
        lightPos.x = getValueByIndexFromTexture(u_lightsTextureData, u_lightsTextureSize, index + 0.0);
        lightPos.y = getValueByIndexFromTexture(u_lightsTextureData, u_lightsTextureSize, index + 1.0);
        lightPos.z = getValueByIndexFromTexture(u_lightsTextureData, u_lightsTextureSize, index + 2.0);
        float radius = getValueByIndexFromTexture(u_lightsTextureData, u_lightsTextureSize, index + 4.0);

        vec3 diff = lightPos - impactPosition;

        // is too far?
        float magnitude = length(diff);
        if (magnitude > radius)
            continue; // too far

        lightDir.x = diff.x / magnitude; // normalize
        lightDir.y = diff.y / magnitude; // normalize
        lightDir.z = diff.z / magnitude; // normalize

        float localIntensity = getValueByIndexFromTexture(u_lightsTextureData, u_lightsTextureSize, index + 3.0);

        coef = localIntensity * (1.0 - magnitude / radius);

        if (!g_shadowsEnabled)
            continue;

        // is the light blocked by an object?
        RayResult result;
        if (intersectScene(RayValues(impactPosition, lightDir), result, true))
        {
            float distance = length(impactPosition - result.position);
            if (distance < radius)
                continue; // an object is shadowing this light: ignore this light
        }

        //
        //
        //

        float intensity = 0.0;
        vec3 reflection = reflect(-lightDir, impactNormal);
        intensity += 0.6 * pow(max(dot(reflection, viewer), 0.0), 30.0);
        intensity += 1.0 * dot(lightDir, impactNormal);

        intensity *= coef;

        if (bestIntensity < intensity)
            bestIntensity = intensity;
    }

    return max(g_ambiantLight, bestIntensity);
}

void main()
{
    //
    //
    // initial ray

    vec3 rayDir = normalize(v_position - u_cameraEye); // camera direction
    vec3 finalPixelColor = g_backgroundColor;

    RayValues currRay = RayValues(u_cameraEye, rayDir);
    RayResult result;

    result.position = u_cameraEye;
    result.reflection = 1.0;
    result.lightEnabled = true;

    float lastReflection = 1.0;

    const int maxIteration = g_reflectionMax;
    for (int iterationLeft = maxIteration; iterationLeft >= 0; --iterationLeft)
    {
        if (result.reflection <= 0.05)
            break;

        bool mustStop = false;

        currRay = RayValues(result.position, rayDir);

        // result.hasHit = intersectScene(currRay, result, false);
        // if (!result.hasHit)
            result.hasHit = intersectScene2(currRay, result, false);

        vec3 tmpColor = g_backgroundColor;

        if (result.hasHit)
        {
            float lightIntensity = 1.0;

            if (result.lightEnabled)
            {
                lightIntensity = lightAt(result.position, result.normal, -currRay.direction);

                if (lightIntensity <= 0.0)
                {
                    // not lighted
                    mustStop = true;
                }
            }

            tmpColor = result.color.xyz * lightIntensity;

            // if (result.color.w < 1.0)
            // {
            // }
        }

        finalPixelColor = finalPixelColor * (1.0 - lastReflection) + tmpColor * lastReflection;

        if (mustStop || !result.hasHit)
        {
            break;
        }

        lastReflection *= result.reflection;

        rayDir = reflect(rayDir, result.normal);
    }

    o_color = vec4(finalPixelColor, 1.0);
}
