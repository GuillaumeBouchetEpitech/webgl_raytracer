
//
//
//
//
//

void fetchMaterialTexels(in RayResult rayResult, out vec4 matTexel[2])

{
  int baseIndex = 2 + rayResult.sceneIndex * 6;

  // material-texel[0]:R: material type (0=basic or 1=chessboard)
  // material-texel[0]:G: can cast shadows (0 or 1)
  // material-texel[0]:B: ??? (per material type)
  // material-texel[0]:A: ??? (per material type)
  // material-texel[1]:R: ??? (per material type)
  // material-texel[1]:G: ??? (per material type)
  // material-texel[1]:B: ??? (per material type)
  // material-texel[1]:A: ??? (per material type)
  vec4 matTexel0 = texelFetch(u_dataTexture, ivec2(rayResult.materialIndex * 2 + 0, baseIndex + ROW_OFFSET_MATERIALS), 0);
  vec4 matTexel1 = texelFetch(u_dataTexture, ivec2(rayResult.materialIndex * 2 + 1, baseIndex + ROW_OFFSET_MATERIALS), 0);

  int materialType = int(matTexel0.r);

  if (materialType == 1)
  {
    // as a chessboard material

    // chessboard-material-texel[0]:R: material type (0=basic or 1=chessboard)
    // chessboard-material-texel[0]:G: can cast shadows (0 or 1)
    // chessboard-material-texel[0]:B: sub material index A
    // chessboard-material-texel[0]:A: sub material index B
    // chessboard-material-texel[1]:R: chessboard-fraction.x
    // chessboard-material-texel[1]:G: chessboard-fraction.y
    // chessboard-material-texel[1]:B: chessboard-fraction.z
    // chessboard-material-texel[1]:A: <unused>

    int subMaterialIndex = 0;

    if (
      (fract(rayResult.txPos.x * matTexel1.r) > 0.5)
      == (fract(rayResult.txPos.y * matTexel1.g) > 0.5)
      == (fract(rayResult.txPos.z * matTexel1.b) > 0.5)
    ) {
      subMaterialIndex = int(matTexel0.a);
    } else {
      subMaterialIndex = int(matTexel0.b);
    }

    // as a basic material

    // basic-material-texel[0]:R: material type (0=basic or 1=chessboard)
    // basic-material-texel[0]:G: can cast shadows (0 or 1)
    // basic-material-texel[0]:B: reflection index [0..1]
    // basic-material-texel[0]:A: refraction index [0..1]
    // basic-material-texel[1]:R: can receive light
    // basic-material-texel[1]:G: color.r
    // basic-material-texel[1]:B: color.g
    // basic-material-texel[1]:A: color.b
    matTexel0 = texelFetch(u_dataTexture, ivec2(subMaterialIndex * 2 + 0, baseIndex + ROW_OFFSET_MATERIALS), 0);
    matTexel1 = texelFetch(u_dataTexture, ivec2(subMaterialIndex * 2 + 1, baseIndex + ROW_OFFSET_MATERIALS), 0);
  }

  matTexel[0] = matTexel0;
  matTexel[1] = matTexel1;
}

//
//
//
//
//
