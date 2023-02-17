module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb-typescript'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: [
    'react',
  ],
  ignorePatterns: [".eslintrc.cjs"],
  rules: {
    "max-len": ["error", { "code": 150, "ignoreComments": true, }],
  },
};
