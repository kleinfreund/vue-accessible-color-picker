/**
 * Tiny rollup plugin that discards CSS and ignores everything else.
 *
 * **Background**:
 *
 * `vue({ css: false })` wants another plugin to handle bundling the extracted CSS.
 * Since I want to bundle an unstyled version of my component, I want to throw that CSS away.
 */
export default function discardCss () {
  return {
    transform (code, id) {
      return id.endsWith('css') ? { code: '', map: null } : null
    },
  }
}
