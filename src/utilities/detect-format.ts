/**
 * Lazy function that returns the format of a given color object.
 *
 * Doesn’t handle invalid formats.
 */
export function detectFormat (colorObject: { [key: string]: number }): 'hsl' | 'hsv' | 'hwb' | 'rgb' {
  if (Object.prototype.hasOwnProperty.call(colorObject, 'r')) {
    return 'rgb'
  } else if (Object.prototype.hasOwnProperty.call(colorObject, 'w')) {
    return 'hwb'
  } else if (Object.prototype.hasOwnProperty.call(colorObject, 'v')) {
    return 'hsv'
  } else {
    return 'hsl'
  }
}
