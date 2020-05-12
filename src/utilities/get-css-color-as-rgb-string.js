/**
 * Returns a valid CSS color string (e.g. `tomato`, `#f80`, `hsl(270 100% 50%)`, etc.) in RGB format.
 *
 * Note: This implementation is very lossy.
 * The color string `rgb(127.5 0 0)` results in `rgb(128, 0, 0).
 *
 * @param {string} colorString
 * @returns {string}
 */
export function getCssColorAsRgbString (colorString) {
  const tempElement = document.createElement('span')
  tempElement.style.display = 'none'
  tempElement.style.color = colorString

  // `colorString` is not a valid CSS color value
  if (tempElement.style.color === '') {
    return ''
  }

  document.body.appendChild(tempElement)
  const rgbColorString = getComputedStyle(tempElement).color

  tempElement.remove()

  return rgbColorString
}
