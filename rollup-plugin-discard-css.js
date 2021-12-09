/** @typedef {import('rollup').Plugin} RollupPlugin */

/**
 * Tiny rollup plugin that discards CSS and ignores everything else.
 *
 * **Background**:
 *
 * `vue({ css: false })` wants another plugin to handle bundling the extracted CSS.
 * Since I want to bundle an unstyled version of my component, I want to throw that CSS away.
 *
 * @type {() => RollupPlugin}
 */
export function discardCss () {
  return {
    name: 'discard-css',
    transform (_code, id) {
      return id.endsWith('css') ? { code: '', map: null } : null
    },
  }
}
