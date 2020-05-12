/**
 * Checks whether two objects are value equal.
 *
 * @param {ColorHex | ColorHsl | ColorHsv | ColorHwb | ColorRgb} colorA
 * @param {ColorHex | ColorHsl | ColorHsv | ColorHwb | ColorRgb} colorB
 * @returns {boolean}
 */
export function colorsAreValueEqual (colorA, colorB) {
  if (colorA === colorB) {
    return true
  }

  for (const channelA in colorA) {
    if (colorA[channelA] !== colorB[channelA]) {
      return false
    }
  }

  return true
}
