import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";

export default [
  // Ignore generated / vendor files
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "routeTree.gen.ts",
    ],
  },

  // Base JS rules
  js.configs.recommended,

  // TypeScript (type-aware, strict)
  ...tseslint.configs.recommendedTypeChecked,

  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
      import: importPlugin,
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      /* TypeScript: no forgiveness */
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/strict-boolean-expressions": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",

      /* React discipline */
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      /* Import hygiene */
      "import/no-cycle": "error",
      "import/no-self-import": "error",
    },
  },
];
