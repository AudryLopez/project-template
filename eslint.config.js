import js from "@eslint/js"
import typescript from "@typescript-eslint/eslint-plugin"
import typescriptParser from "@typescript-eslint/parser"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import importPlugin from "eslint-plugin-import"

export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        React: "readonly",
        JSX: "readonly",
        console: "readonly",
        window: "readonly",
        document: "readonly",
        localStorage: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        fetch: "readonly",
        Headers: "readonly",
        URLSearchParams: "readonly",
        RequestInit: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
      react,
      "react-hooks": reactHooks,
      import: importPlugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "no-unused-vars": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/function-component-definition": ["error", { namedComponents: "function-declaration" }],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "import/order": ["error", { groups: ["builtin", "external", "internal", "parent", "sibling", "index", "type"], "newlines-between": "never" }],
      "import/no-default-export": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "error",
    },
    settings: { react: { version: "detect" } },
  },
  {
    files: ["**/app/**/page.tsx", "**/app/**/layout.tsx", "**/app/**/loading.tsx", "**/app/**/error.tsx", "**/app/**/not-found.tsx", "*.config.{js,ts}"],
    rules: { "import/no-default-export": "off" },
  },
  { ignores: ["node_modules", "dist", ".next", ".output", "build"] },
]
