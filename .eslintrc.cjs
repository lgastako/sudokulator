/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,

  env: {
    browser: true,
    es2022: true,
  },

  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    ecmaFeatures: { jsx: true },
  },

  plugins: [
    "@typescript-eslint",
    "react",
    "react-hooks",
    "import",
  ],

  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],

  settings: {
    react: {
      version: "detect",
    },
  },

  rules: {
    /* TypeScript: zero tolerance */
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-misused-promises": "error",
    "@typescript-eslint/strict-boolean-expressions": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",

    /* React discipline */
    "react/react-in-jsx-scope": "off", // JSX runtime
    "react/prop-types": "off",

    /* Import hygiene */
    "import/no-cycle": "error",
    "import/no-self-import": "error",
  },
};
