/** @type {import('eslint').Linter.Config} */ const config = {
  plugins: ['vue'],
  extends: ['standard', 'plugin:vue/vue3-recommended'],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'space-before-function-paren': ['error', 'always'],
  },
}

module.exports = config
