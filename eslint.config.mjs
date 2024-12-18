import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import("eslint").Linter.Config[]} */
export default [
  { files: [".src/**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "react/react-in-jsx-scope": "off",
      "simple-import-sort/imports": "error",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
];
