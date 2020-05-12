/**
 * Copies a given string to the user’s clipboard ([source][1]).
 *
 * TODO: Consider using the [Clipboard API][2].
 *
 * [1]: https://stackoverflow.com/a/33928558/2036825
 * [2]: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
 *
 * @param {string} str
 * @returns {boolean}
 */
export function copyToClipboard (str) {
  if (
    !(typeof document.queryCommandSupported === 'function' && document.queryCommandSupported('copy'))
  ) {
    return false
  }

  const textarea = document.createElement('textarea')
  textarea.textContent = str

  // Prevent scrolling to bottom of page in MS Edge.
  textarea.style.position = 'fixed'

  document.body.appendChild(textarea)
  textarea.select()

  let result

  try {
    result = document.execCommand('copy')
  } catch {
    // Copying to the clipboard failed.
    result = false
  } finally {
    document.body.removeChild(textarea)
  }

  return result
}
