import eslint from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
	{
		ignores: ['coverage/', 'dist/', 'temp/'],
	},
	eslint.configs.recommended,
	...tseslint.configs.strict,
	...tseslint.configs.stylistic,
	...pluginVue.configs['flat/recommended'],
	...vueTsEslintConfig(),
	{
		files: ['**/*.{js,ts,vue}'],
		languageOptions: {
			globals: {
				...globals.browser,
			},
		},
		plugins: {
			'@stylistic': stylistic,
		},
		rules: {
			// Interferes with `get [Symbol.toStringTag]`.
			'@typescript-eslint/class-literal-property-style': 'off',
			// Don't care.
			'@typescript-eslint/no-non-null-assertion': 'off',
			// Intereferes with assigning Color* object types to `Record<string, unknown>`.
			'@typescript-eslint/consistent-type-definitions': 'off',

			'@stylistic/comma-dangle': ['error', 'always-multiline'],
			'@stylistic/indent': ['error', 'tab'],
			'vue/html-indent': ['error', 'tab'],
			'@stylistic/semi': ['error', 'never'],
			'@stylistic/space-before-function-paren': ['error', 'always'],
			'@stylistic/quotes': ['error', 'single'],
		},
	},
	{
		files: ['**/*.test.{js,ts}'],
		rules: {
			'@typescript-eslint/ban-ts-comment': 'off',
		},
	},
)
