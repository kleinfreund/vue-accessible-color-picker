/**
 * Lazy functions that returns the format of a given color object.
 *
 * Doesn’t handle invalid formats.
 *
 * @param {object} color
 * @returns {'hsl' | 'hsv' | 'hwb' | 'rgb'}
 */
export function detectFormat (color) {
  if (Object.prototype.hasOwnProperty.call(color, 'r')) {
    return 'rgb'
  } else if (Object.prototype.hasOwnProperty.call(color, 'w')) {
    return 'hwb'
  } else if (Object.prototype.hasOwnProperty.call(color, 'v')) {
    return 'hsv'
  } else {
    return 'hsl'
  }
}
