module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['@rosmarinus/eslint-config-rosmarinus', '@rosmarinus/eslint-config-rosmarinus/vue'],
  ignorePatterns: ['**/*.less', '**/*.html'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  globals: {},
  rules: {
    'no-undef': 'off',
  },
};
