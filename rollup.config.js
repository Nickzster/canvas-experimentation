import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/main.js",
  output: {
    file: "index.js",
    format: "module",
  },
  plugins: [commonjs(), babel({ babelHelpers: "bundled" })],
};
