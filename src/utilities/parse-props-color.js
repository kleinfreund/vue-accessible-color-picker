/** @typedef {import('../../types/index').VueAccessibleColorPicker.ColorHsl} ColorHsl */
/** @typedef {import('../../types/index').VueAccessibleColorPicker.ColorHsv} ColorHsv */
/** @typedef {import('../../types/index').VueAccessibleColorPicker.ColorHwb} ColorHwb */
/** @typedef {import('../../types/index').VueAccessibleColorPicker.ColorRgb} ColorRgb */
/** @typedef {import('../../types/index').VueAccessibleColorPicker.ColorFormat} ColorFormat */

import { colorChannels } from './color-channels.js'
import { detectFormat } from './detect-format.js'
import { isValidHexColor } from './is-valid-hex-color.js'

/**
 * Parses a color as it can be provided to the color picker’s `color` prop.
 *
 * Supports all valid CSS colors in string form (e.g. tomato, #f80c, hsl(266.66 50% 100% / 0.8), hwb(0.9 0.9 0.9 / 1), etc.) as well as the color formats used for internal storage by the color picker.
 *
 * @param {string | ColorHsl | ColorHsv | ColorHwb | ColorRgb} propsColor
 * @returns {{ format: ColorFormat, color: string | ColorHsl | ColorHsv | ColorHwb | ColorRgb } | null}
 */
export function parsePropsColor (propsColor) {
  if (typeof propsColor !== 'string') {
    const format = detectFormat(propsColor)
    return { format, color: propsColor }
  }

  if (isValidHexColor(propsColor)) {
    return { format: 'hex', color: propsColor }
  }

  // Attempt to parse CSS colors like named CSS color (e.g. “tomato”, “rebeccapurple”, etc.).
  if (!propsColor.includes('(')) {
    const tempElement = document.createElement('span')
    tempElement.style.display = 'none'
    tempElement.style.color = propsColor

    // `colorString` is not a valid CSS color value
    if (tempElement.style.color === '') {
      return null
    }

    document.body.appendChild(tempElement)
    propsColor = getComputedStyle(tempElement).color
    tempElement.remove()
  }

  const [cssFormat, rest] = propsColor.split('(')
  const format = /** @type {ColorFormat} */ (cssFormat.substring(0, 3))
  const parameters = rest.replace(/[,/)]/g, ' ').replace(/\s+/g, ' ').trim().split(' ')
  if (parameters.length === 3) {
    parameters.push('1')
  }

  const channels = format.split('').concat('a')
  const color = Object.fromEntries(channels.map((channel, index) => {
    return [
      channel,
      colorChannels[format][channel].from(parameters[index]),
    ]
  }))
  return { format, color }
}
