/**
 * Returns whether a given HEX color string is a valid CSS color.
 */
export function isValidHexColor (hexColor: string): boolean {
  if (!hexColor.startsWith('#')) {
    return false
  }

  if (![3, 4, 6, 8].includes(hexColor.length - 1)) {
    return false
  }

  return /^#[0-9A-Fa-f]+$/.test(hexColor)
}
