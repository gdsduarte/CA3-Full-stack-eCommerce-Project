module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  extends: ["eslint:recommended", "google"],
  rules: {
    "linebreak-style": 0,
    "object-curly-spacing": ["error", "always"],
    "camelcase": 0,
    "new-cap": 0,
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    "quotes": ["error", "double", { allowTemplateLiterals: true }],
    "indent": ["error", 2],
    "require-jsdoc": "off",
    "space-before-function-paren": ["error", "never"],
    "no-unused-vars": "warn",
    "spaced-comment": ["error", "always"],
    "no-console": "off",
    "max-len": ["error", { code: 120 }],
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};
