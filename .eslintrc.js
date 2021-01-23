module.exports = {
  root: true,
  env: {
    jest: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  plugins: [
    '@typescript-eslint',
    'vue',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/recommended',
    'standard',
  ],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
  },
}
