/**
 * Tiny rollup plugin that discards CSS and ignores everything else.
 *
 * **Background**:
 *
 * rollup-plugin-vue wants another plugin to handle bundling the extracted CSS.
 * Since I want to bundle an unstyled version of my component, I want to throw that CSS away.
 *
 * @type {() => import('rollup').Plugin}
 */
export function discardCss () {
  return {
    name: 'discard-css',
    transform (_code, id) {
      return id.endsWith('css') ? { code: '', map: null } : null
    },
  }
}
