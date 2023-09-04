/** @type {import('eslint').Linter.Config} */ const config = {
	root: true,
	parserOptions: {
		parser: '@typescript-eslint/parser',
		sourceType: 'module',
	},
	env: {
		browser: true,
	},
	plugins: ['@typescript-eslint', 'vue'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:vue/vue3-recommended',
		'@vue/eslint-config-typescript',
	],
	rules: {
		// Necessary to use tabs for indentation.
		'no-tabs': ['error', { allowIndentationTabs: true }],
		indent: 'off',
		'vue/html-indent': ['error', 'tab'],
		'@typescript-eslint/indent': ['error', 'tab'],
		// Other rules.
		'comma-dangle': 'off',
		'@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
		'space-before-function-paren': ['error', 'always'],
		// Reason: https://github.com/vuejs/eslint-plugin-vue/issues/2259
		'vue/no-setup-props-destructure': 'off',
	},
	overrides: [
		{
			files: '*.test.ts',
			rules: {
				'@typescript-eslint/ban-ts-comment': 'off',
			},
		},
	],
}

/* eslint-env node */
module.exports = config
