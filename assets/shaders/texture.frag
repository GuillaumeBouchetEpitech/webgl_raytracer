#version 300 es

precision highp float;

uniform sampler2D u_texture;
uniform vec2 u_step;

in vec2 v_textureCoord;

out vec4 o_color;

void main(void)
{
    // gl_FragColor = texture(u_texture, v_textureCoord);

    float total = 0.0;
    vec4 accumulated = vec4(0.0);

    //

    if (v_textureCoord.x - u_step.x > 0.0)
    {
        accumulated += texture(u_texture, vec2(v_textureCoord.x - u_step.x, v_textureCoord.y));
        total += 1.0;
    }

    if (v_textureCoord.x + u_step.x > 0.0)
    {
        accumulated += texture(u_texture, vec2(v_textureCoord.x + u_step.x, v_textureCoord.y));
        total += 1.0;
    }

    if (v_textureCoord.y - u_step.y > 0.0)
    {
        accumulated += texture(u_texture, vec2(v_textureCoord.x, v_textureCoord.y - u_step.y));
        total += 1.0;
    }

    if (v_textureCoord.y + u_step.y > 0.0)
    {
        accumulated += texture(u_texture, vec2(v_textureCoord.x, v_textureCoord.y + u_step.y));
        total += 1.0;
    }

    //

    if (v_textureCoord.x - u_step.x > 0.0 && v_textureCoord.y - u_step.y > 0.0)
    {
        accumulated += texture(u_texture, vec2(v_textureCoord.x - u_step.x, v_textureCoord.y - u_step.y));
        total += 1.0;
    }

    if (v_textureCoord.x + u_step.x > 0.0 && v_textureCoord.y - u_step.y > 0.0)
    {
        accumulated += texture(u_texture, vec2(v_textureCoord.x + u_step.x, v_textureCoord.y - u_step.y));
        total += 1.0;
    }

    if (v_textureCoord.x - u_step.x > 0.0 && v_textureCoord.y + u_step.y > 0.0)
    {
        accumulated += texture(u_texture, vec2(v_textureCoord.x - u_step.x, v_textureCoord.y + u_step.y));
        total += 1.0;
    }

    if (v_textureCoord.x + u_step.x > 0.0 && v_textureCoord.y + u_step.y > 0.0)
    {
        accumulated += texture(u_texture, vec2(v_textureCoord.x + u_step.x, v_textureCoord.y + u_step.y));
        total += 1.0;
    }

    //

    if (total > 0.0)
        o_color = accumulated / total;
    else
        o_color = vec4(1.0, 0.0, 0.0, 1.0); // warning
}
