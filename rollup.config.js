// rollup.config.js

import merge from "deepmerge";
import { createBasicConfig } from "@open-wc/building-rollup";
import typescript from "rollup-plugin-typescript2";
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const baseConfig = createBasicConfig();

export default merge(baseConfig, [
  {
    input: "./dist/esm/index.js",
    output: {
      dir: "lib/esm",
      format: "esm",
      exports: 'named'
    },
    context: "window",
    plugins: [
      typescript({
        rollupCommonJSResolveHack: false,
        clean: true,
      }),
      nodeResolve(),
      commonjs(),
    ],
  },
  {
    input: "./dist/cjs/index.js",
    output: {
      dir: "lib/cjs",
      format: "cjs",
      exports: 'named'
    },
    context: "window",
    plugins: [
      typescript({
        rollupCommonJSResolveHack: false,
        clean: true,
      }),
      nodeResolve(),
      commonjs(),
    ],
  },
]);
