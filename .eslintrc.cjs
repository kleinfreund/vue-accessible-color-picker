/** @type {import('eslint').Linter.Config} */ const config = {
	plugins: ['vue'],
	extends: ['standard', 'plugin:vue/vue3-recommended'],
	rules: {
		// Necessary to use tabs for indentation.
		'no-tabs': ['error', { allowIndentationTabs: true }],
		indent: ['error', 'tab'],
		'vue/html-indent': ['error', 'tab'],
		// Other rules.
		'comma-dangle': ['error', 'always-multiline'],
		'space-before-function-paren': ['error', 'always'],
		// Reason: https://github.com/vuejs/eslint-plugin-vue/issues/2259
		'vue/no-setup-props-destructure': 'off',
	},
}

module.exports = config
