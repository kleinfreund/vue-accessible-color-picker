import { defineConfig } from 'rollup'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import vue from 'rollup-plugin-vue'

import { discardCss } from './rollup-plugin-discard-css.js'
import { cleanCss } from './rollup-plugin-clean-css.js'

/*
vue options:
https://rollup-plugin-vue.vuejs.org/options.html

postcss options:
https://github.com/egoist/rollup-plugin-postcss#options

terser options:
https://github.com/TrySound/rollup-plugin-terser#options
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
      vue(),
      cleanCss(),
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
])
