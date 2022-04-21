module.exports = {
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'space-before-function-paren': ['error', 'always'],
  },
  globals: {
    defineEmits: 'readonly',
    defineProps: 'readonly',
  },
  plugins: ['vue'],
  extends: ['standard', 'plugin:vue/vue3-recommended'],
}
