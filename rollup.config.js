import babel from '@rollup/plugin-babel'
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
  vue(),
  babel({ babelHelpers: 'bundled' }),
  terser(),
]

const unstyledComponentPlugins = [
  vue({ css: false }),
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
    },
    plugins: unstyledComponentPlugins,
  },
]
