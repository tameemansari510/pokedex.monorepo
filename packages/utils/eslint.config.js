import js from "@eslint/js";
import tseslint from "typescript-eslint";
import unusedImports from "eslint-plugin-unused-imports";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig, // disables ESLint rules that conflict with Prettier

  {
    files: ["**/*.ts"],
    ignores: ["**/dist/**", "**/node_modules/**"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "unused-imports": unusedImports,
      prettier: prettierPlugin,
    },
    rules: {
      // Turn off default unused vars rules
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",

      // Unused imports/vars cleanup
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // Enable Prettier formatting as lint rule
      "prettier/prettier": "warn",
    },
  },
];
