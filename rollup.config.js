import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/main.js",
  output: {
    file: "index.js",
    format: "module",
    plugins: [terser()],
  },
  plugins: [commonjs(), babel({ babelHelpers: "bundled" })],
};
