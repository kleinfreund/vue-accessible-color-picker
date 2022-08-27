/**
 * Returns whether a given HEX color string is a valid CSS color.
 *
 * @param {string} hexColor
 * @returns {boolean}
 */
export function isValidHexColor (hexColor) {
  return /^#(?:(?:[A-F0-9]{2}){3,4}|[A-F0-9]{3,4})$/i.test(hexColor)
}
