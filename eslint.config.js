import eslint from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import { globalIgnores } from 'eslint/config'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfigWithVueTs(
	{
		files: ['**/*.ts', '**/*.vue'],
	},
	globalIgnores(['coverage/', 'dist/', 'temp/']),
	eslint.configs.recommended,
	tseslint.configs.strict,
	tseslint.configs.stylistic,
	pluginVue.configs['flat/recommended'],
	vueTsConfigs.strictTypeChecked,
	{
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
		files: ['**/*.test.ts'],
		rules: {
			'@typescript-eslint/ban-ts-comment': 'off',
			'@typescript-eslint/unbound-method': 'off',
		},
	},
)
