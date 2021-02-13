module.exports = {
  env: {
    jest: true,
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'space-before-function-paren': ['error', 'always'],
  },
  extends: ['plugin:vue/recommended', 'standard'],
  plugins: ['vue'],
}
