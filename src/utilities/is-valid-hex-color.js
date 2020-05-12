/**
 * Returns whether a given HEX color string is a valid CSS color.
 *
 * @param {string} hexColor
 * @returns {boolean}
 */
export function isValidHexColor (hexColor) {
  if (!hexColor.startsWith('#')) {
    return false
  }

  if (![3, 4, 6, 8].includes(hexColor.length - 1)) {
    return false
  }

  return /^#[0-9A-Fa-f]+$/.test(hexColor)
}
