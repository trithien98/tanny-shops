module.exports = {
  root: true,
  extends: [
    "@turbo",
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "next/core-web-vitals"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-explicit-any": "warn",
    "prefer-const": "error",
    "no-var": "error"
  },
  env: {
    browser: true,
    es2022: true,
    node: true
  },
  ignorePatterns: [
    "node_modules/",
    "dist/",
    "build/",
    ".next/",
    ".turbo/",
    "coverage/"
  ]
}