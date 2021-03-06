#version 300 es

precision mediump float;

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

//

in vec3  v_position;

out vec4 o_color;

//

const float     g_ambiantLight = 0.2;

const int       g_reflectionMax = 2;
const bool      g_shadowsEnabled = true;

const vec3      g_backgroundColor = vec3(0.4);

//

struct t_ray
{
    vec3 origin;
    vec3 direction;
};

struct t_rayResult
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
    // return texture2D(tex, uv).x;
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

bool intersectSphere(t_ray ray, float radius, out float distance, out vec3 normal)
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
    float d2 = -b + h;

    if (d1 >= nearValue && d1 <= farValue)
    {
        normal = normalize(ray.origin + ray.direction * d1);
        distance = d1;
        return true;
    }

    if (d2 >= nearValue && d2 <= farValue)
    {
        normal = normalize(ray.origin + ray.direction * d2);
        distance = d2;
        return true;
    }

    return false;
}

bool intersectBox(t_ray ray, vec3 boxSize, out float distance, out vec3 normal)
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

	float tN = max( max( t1.x, t1.y ), t1.z );
	float tF = min( min( t2.x, t2.y ), t2.z );

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

bool intersectTriangle(t_ray ray, vec3 v0, vec3 v1, vec3 v2, out float distance, out vec3 normal)
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

//
//
//
//
//

bool intersectScene(t_ray ray, out t_rayResult result, bool shadowMode)
{
    float bestDistance = -1.0;

    result.hasHit = false;

    if (u_sceneTextureSize.x <= 1.0)
        return false;

    t_ray tmpRay;
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
        t_rayResult result;
        if (intersectScene(t_ray(impactPosition, lightDir), result, true))
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
        t_rayResult result;
        if (intersectScene(t_ray(impactPosition, lightDir), result, true))
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

    t_ray currRay = t_ray(u_cameraEye, rayDir);
    t_rayResult result;

    result.position = u_cameraEye;
    result.reflection = 1.0;
    result.lightEnabled = true;

    float lastReflection = 1.0;

    const int maxIteration = g_reflectionMax;
    for (int iterationLeft = maxIteration; iterationLeft >= 0; --iterationLeft)
    {
        if (result.reflection == 0.0)
            break;

        bool mustStop = false;

        currRay = t_ray(result.position, rayDir);

        result.hasHit = intersectScene(currRay, result, false);

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

        // first iteration
        // if (iterationLeft == maxIteration)
        // {
        //     finalPixelColor = tmpColor;
        // }
        // else
        {
            finalPixelColor = finalPixelColor * (1.0 - lastReflection) + tmpColor * lastReflection;
            // finalPixelColor = finalPixelColor * lastReflection + tmpColor * (1.0 - lastReflection);
            // finalPixelColor = finalPixelColor * (1.0 - lastReflection) + tmpColor * result.reflection;
        }

        if (mustStop || !result.hasHit)
        {
            break;
        }

        lastReflection = result.reflection;

        rayDir = reflect(rayDir, result.normal);
    }

    o_color = vec4(finalPixelColor, 1.0);
}
