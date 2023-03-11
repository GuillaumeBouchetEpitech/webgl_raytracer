
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

const plugins = [
  typescript(),
  commonjs(),
  nodeResolve(),
];

if (process.env["BUILD_MODE"] !== 'DEBUG') {
  plugins.push(terser({
    format: { comments: false },
    compress: true
  }));
}

export default {
  input: './src/main.ts',
  output: {
    file: './dist/bundle.js',
    format: 'cjs',
  },
  plugins,
};
