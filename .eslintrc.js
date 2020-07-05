module.exports = {
  env: {
    jest: true,
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
  },
  extends: ['plugin:vue/recommended', 'standard'],
  plugins: ['vue'],
}
