import { defineConfig } from 'rollup'
import postcss from 'rollup-plugin-postcss'
import terser from '@rollup/plugin-terser'
import vue from 'rollup-plugin-vue'

import { discardCss } from './rollup-plugin-discard-css.js'

/*
vue options:
https://rollup-plugin-vue.vuejs.org/options.html

postcss options:
https://github.com/egoist/rollup-plugin-postcss#options

terser options:
https://github.com/rollup/plugins/tree/master/packages/terser#options
*/

export default defineConfig([
	{
		input: 'src/index.js',
		output: {
			file: 'dist/vue-accessible-color-picker.js',
		},
		// The package lists “vue” as a peer dependency; thus, it is marked as external to this package here and won’t be included in the bundle. Package consumers must provide it in their project.
		external: ['vue'],
		plugins: [
			vue({
				compilerOptions: {
					comments: false,
				},
			}),
			postcss({ minimize: true }),
			terser({
				output: {
					comments: false,
					ecma: 2020,
				},
			}),
		],
	},

	{
		input: 'src/index.js',
		output: {
			file: 'dist/vue-accessible-color-picker-unstyled.js',
		},
		// The package lists “vue” as a peer dependency; thus, it is marked as external to this package here and won’t be included in the bundle. Package consumers must provide it in their project.
		external: ['vue'],
		plugins: [
			vue({
				compilerOptions: {
					comments: false,
				},
			}),
			discardCss(),
			terser({
				output: {
					comments: false,
					ecma: 2020,
				},
			}),
		],
	},
])
