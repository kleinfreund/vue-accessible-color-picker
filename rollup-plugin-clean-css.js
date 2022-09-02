import CleanCSS from 'clean-css'

/** @typedef {{ cleanCssOptions?: CleanCSS.OptionsOutput }} CleanCssPluginOptions */

/**
 * Minifies CSS using [CleanCSS][1].
 *
 * [1]: https://www.npmjs.com/package/clean-css
 *
 * @type {(options: CleanCssPluginOptions) => import('rollup').Plugin}
 */
export function cleanCss (options = {}) {
  return {
    name: 'clean-css',
    transform (code, id) {
      // Handles only CSS files.
      if (!id.endsWith('css')) {
        return null
      }

      const { styles, errors } = new CleanCSS(options.cleanCssOptions).minify(code)

      if (errors.length > 0) {
        throw new Error(errors.join('\n'))
      }

      return { code: styles }
    },
  }
}
