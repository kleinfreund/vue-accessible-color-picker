/** @typedef {import('../../../types/index').VueAccessibleColorPicker.ColorHex} ColorHex */
/** @typedef {import('../../../types/index').VueAccessibleColorPicker.ColorRgb} ColorRgb */

/**
 * Converts a HEX color string to an RGB color object.
 *
 * Supports HEX color strings with length 3, 4, 6, and 8.
 *
 * @param {ColorHex} hex
 * @returns {ColorRgb}
 */
export function convertHexToRgb (hex) {
  const hexWithoutHash = hex.replace(/^#/, '')

  const channels = []

  // Slice hex color string into two characters each.
  // For longhand hex color strings, two characters can be consumed at a time.
  const step = hexWithoutHash.length > 4 ? 2 : 1
  for (let i = 0; i < hexWithoutHash.length; i += step) {
    const channel = hexWithoutHash.slice(i, i + step)
    // Repeat the character once for shorthand hex color strings.
    channels.push(channel.repeat(step % 2 + 1))
  }

  if (channels.length === 3) {
    channels.push('ff')
  }

  const rgbChannels = channels.map(channel => parseInt(channel, 16) / 255)

  return {
    r: rgbChannels[0],
    g: rgbChannels[1],
    b: rgbChannels[2],
    a: rgbChannels[3],
  }
}
