/** @typedef {import('rollup').Plugin} Plugin */

/**
 * Discards CSS.
 *
 * **Example usage**:
 *
 * ```js
 * plugins: [
 *   vue(),
 *   discardCss(),
 *   terser(),
 * ],
 * ```
 *
 * **Background**:
 *
 * rollup-plugin-vue wants another plugin to handle bundling the extracted CSS.
 * Since I want to bundle an unstyled version of my component, I want to throw that CSS away.
 *
 * @returns {Plugin}
 */
export function discardCss () {
  return {
    name: 'discard-css',
    transform (_code, id) {
      // Only processes CSS files.
      if (!id.endsWith('.css')) {
        return null
      }

      return ''
    },
  }
}
