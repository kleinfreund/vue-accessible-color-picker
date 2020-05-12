module.exports = {
  env: {
    jest: true,
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
  },
  extends: ['plugin:vue/strongly-recommended', 'standard'],
  plugins: ['vue'],
}
