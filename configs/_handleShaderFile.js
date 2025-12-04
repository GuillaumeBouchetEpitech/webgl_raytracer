
import * as fs from 'node:fs';
import * as path from 'node:path';

// do not make this regex a "global" one
// -> the text content given to it change between each calls
const k_shaderIncludeRegex = /#include "(.*?)"/;

export const _handleShaderFile = (shaderFilepath, isDebug, isIncluded, depth) => {

  // console.log(`depth1: ${depth}`);

  isDebug = isDebug ?? false
  isIncluded = isIncluded ?? false
  depth = depth ?? 1

  const padding = "".padStart(depth * 2, '-');

  const shaderFolderPath = path.dirname(shaderFilepath);
  const shaderFilename = path.basename(shaderFilepath);
  let fileContent = fs.readFileSync(shaderFilepath, { encoding: "utf8" });

  console.log(` ${padding}-> handling the shader file: "${shaderFilename}"`);

  // handle the #include directive here
  let regexCapture = null;
  while (regexCapture = k_shaderIncludeRegex.exec(fileContent)) {

    const toReplace = regexCapture[0];
    const toIncludeFilename = regexCapture[1];
    const toIncludeFilepath = path.join(shaderFolderPath, toIncludeFilename);

    console.log(` ${padding}---> include detected: "${toIncludeFilename}"`);

    // TODO: fix the technically possible "infinite include recursion"
    const includedFileContent = _handleShaderFile(toIncludeFilepath, isDebug, true, depth + 2);

    fileContent = fileContent.replace(toReplace, includedFileContent);
  }

  if (isDebug && isIncluded) {
    console.log(` ${padding}-> adding debug comments`);
    fileContent = `\n\n// START: ${shaderFilename}\n\n${fileContent}\n\n// STOP: ${shaderFilename}\n\n`
  }

  // console.log(` ${padding}-> done handling the shader file: "${shaderFilename}"`);

  return fileContent;
}
