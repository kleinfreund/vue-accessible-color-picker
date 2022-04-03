import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import vue from 'rollup-plugin-vue'

import { discardCss } from './rollup-plugin-discard-css.js'

/*
vue options:
https://rollup-plugin-vue.vuejs.org/options.html

postcss options:
https://github.com/egoist/rollup-plugin-postcss#options

terser options:
https://github.com/TrySound/rollup-plugin-terser#options
*/

/** @type {import('rollup').RollupOptions[]} */ const options = [
  {
    input: 'src/index.js',
    output: {
      file: 'dist/vue-accessible-color-picker.js',
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
      file: 'dist/vue-accessible-color-picker-unstyled.js',
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
