import babel from '@rollup/plugin-babel'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import vue from 'rollup-plugin-vue'

import discardCss from './rollup-plugin-discard-css.js'

/*
vue options:
https://rollup-plugin-vue.vuejs.org/options.html

postcss options:
https://github.com/egoist/rollup-plugin-postcss#options

babel options:
https://github.com/rollup/plugins/tree/master/packages/babel#options

terser options:
https://github.com/TrySound/rollup-plugin-terser#options
*/

const styledComponentPlugins = [
  vue({ preprocessStyles: true }),
  postcss(),
  babel({ babelHelpers: 'bundled' }),
  terser(),
]

const unstyledComponentPlugins = [
  vue(),
  discardCss(),
  babel({ babelHelpers: 'bundled' }),
  terser(),
]

export default [
  {
    input: 'src/index.js',
    output: {
      format: 'umd',
      name: 'AccessibleColorPicker',
      exports: 'named',
      file: 'dist/vue-accessible-color-picker.js',
      globals: {
        vue: 'vue',
      },
    },
    plugins: styledComponentPlugins,
  },

  {
    input: 'src/index.js',
    output: {
      format: 'umd',
      name: 'AccessibleColorPicker',
      exports: 'named',
      file: 'dist/vue-accessible-color-picker-unstyled.js',
      globals: {
        vue: 'vue',
      },
    },
    plugins: unstyledComponentPlugins,
  },
]
