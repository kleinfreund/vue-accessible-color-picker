import { createFilter } from '@rollup/pluginutils'
import CleanCSS from 'clean-css'

/** @typedef {import('rollup').Plugin} Plugin */
/** @typedef {import('rollup').TransformResult} TransformResult */
/** @typedef {import('@rollup/pluginutils').FilterPattern} FilterPattern */
/**
 * @typedef {object} CleanCssPluginOptions
 * @property {FilterPattern} [include] Determines with modules to include by their ID.
 * @property {FilterPattern} [exclude] Determines with modules to exclude by their ID.
 * @property {CleanCSS.OptionsOutput} [cleanCssOptions] Options to pass along to `new CleanCSS`.
 */

/**
 * Minifies CSS using [CleanCSS][1]. Passes CleanCSS options along if provided.
 *
 * Does not bundle CSS.
 *
 * **Example usage**:
 *
 * ```js
 * plugins: [
 *   vue(),
 *   cleanCss({
 *     cleanCssOptions: {
 *       sourceMap: true,
 *     },
 *   }),
 *   postcss(),
 *   terser(),
 * ],
 * ```
 *
 * [1]: https://www.npmjs.com/package/clean-css
 *
 * @param {CleanCssPluginOptions} [pluginOptions]
 * @returns {Plugin}
 */
export function cleanCss (pluginOptions = {}) {
  const filter = createFilter(pluginOptions.include ?? '**/*.css', pluginOptions.exclude)

  return {
    name: 'clean-css',

    transform (code, id) {
      if (!filter(id)) {
        return
      }

      if (!pluginOptions.cleanCssOptions) {
        pluginOptions.cleanCssOptions = {}
      }

      // Enables source map generation by default.
      // See https://rollupjs.org/guide/en/#source-code-transformations.
      if (!('sourceMap' in pluginOptions.cleanCssOptions)) {
        pluginOptions.cleanCssOptions.sourceMap = true
      }

      const { styles, errors, warnings, sourceMap } = new CleanCSS(pluginOptions.cleanCssOptions).minify(code)

      for (const warning of warnings) {
        this.warn(warning)
      }

      if (errors.length > 0) {
        // Concatenates all errors first since calling `this.error` will throw and so looping like it’s done for warnings would only report one error at a time.
        this.error(errors.join('\n'))
      }

      /** @type {TransformResult} */ const transformResult = { code: styles }

      // The current type of `Output.sourceMap` is incomplete. The `sourceMap` property should be optional as it is only included in `Output` if the CleanCSS `sourceMap` option is `true`.
      // The root cause is an incorrect type definition in https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/clean-css/index.d.ts#L97.
      const sourceMapGenerator = /** @type {typeof sourceMap | undefined} */ (sourceMap)

      if (sourceMapGenerator !== undefined) {
        transformResult.map = sourceMapGenerator.toString()
      }

      return transformResult
    },
  }
}
