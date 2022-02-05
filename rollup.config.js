import babel from '@rollup/plugin-babel'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import vue from 'rollup-plugin-vue'

import { discardCss } from './rollup-plugin-discard-css.js'

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

/** @type {import('rollup').RollupOptions[]} */ const options = [
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
    // The package lists “vue” as a peer dependency; thus, it is marked as external to this package here and won’t be included in the bundle. Package consumers must provide it in their project.
    external: ['vue'],
    plugins: [
      vue({ preprocessStyles: true }),
      postcss(),
      babel({ babelHelpers: 'bundled' }),
      terser(),
    ],
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
    // The package lists “vue” as a peer dependency; thus, it is marked as external to this package here and won’t be included in the bundle. Package consumers must provide it in their project.
    external: ['vue'],
    plugins: [
      vue(),
      discardCss(),
      babel({ babelHelpers: 'bundled' }),
      terser(),
    ],
  },

  {
    input: 'src/index.js',
    output: {
      file: 'dist/vue-accessible-color-picker.esm.js',
    },
    // The package lists “vue” as a peer dependency; thus, it is marked as external to this package here and won’t be included in the bundle. Package consumers must provide it in their project.
    external: ['vue'],
    plugins: [
      vue({ preprocessStyles: true }),
      postcss(),
      terser(),
    ],
  },

  {
    input: 'src/index.js',
    output: {
      file: 'dist/vue-accessible-color-picker-unstyled.esm.js',
    },
    // The package lists “vue” as a peer dependency; thus, it is marked as external to this package here and won’t be included in the bundle. Package consumers must provide it in their project.
    external: ['vue'],
    plugins: [
      vue(),
      discardCss(),
      terser(),
    ],
  },
]

export default options
