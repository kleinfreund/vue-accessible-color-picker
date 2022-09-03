import CleanCSS from 'clean-css'

/** @typedef {import('rollup').Plugin} Plugin */

/**
 * Minifies CSS using [CleanCSS][1]. Passes CleanCSS options along if provided.
 *
 * **Example usage**:
 *
 * ```js
 * plugins: [
 *   vue(),
 *   cleanCss({ cleanCssOptions: { sourceMap: true } }),
 *   postcss(),
 *   terser(),
 * ],
 * ```
 *
 * [1]: https://www.npmjs.com/package/clean-css
 *
 * @param {{ cleanCssOptions?: CleanCSS.OptionsOutput }} options
 * @returns {Plugin}
 */
export function cleanCss (options = {}) {
  return {
    name: 'clean-css',
    transform (code, id) {
      // Only processes CSS files.
      if (!id.endsWith('.css')) {
        return null
      }

      const { styles, errors, warnings, sourceMap } = new CleanCSS(options.cleanCssOptions).minify(code)

      for (const warning of warnings) {
        this.warn(warning)
      }

      if (errors.length > 0) {
        // Concatenates all errors because calling `this.error` will throw and so looping like it’s done for warnings isn’t feasible.
        this.error(errors.join('\n'))
      }

      const transformResult = { code: styles }

      // Note: This is necessary. The current type of sourceMap (`SourceMapGenerator`) is not accurate as the `sourceMap` property isn’t even returned by CleanCSS when not setting `sourceMap: true`.
      if (sourceMap !== undefined) {
        transformResult.map = sourceMap.toString()
      }

      return transformResult
    },
  }
}
