/** @typedef {import('../../../types/index').VueAccessibleColorPicker.ColorRgb} ColorRgb */
/** @typedef {import('../../../types/index').VueAccessibleColorPicker.ColorHsv} ColorHsv */

/**
 * Converts an RGB color object to an HSV color object.
 *
 * Source: https://en.m.wikipedia.org/wiki/HSL_and_HSV#RGB_to_HSL_and_HSV
 *
 * @param {ColorRgb} rgb
 * @returns {ColorHsv}
 */
export function convertRgbToHsv (rgb) {
  const min = Math.min(rgb.r, rgb.g, rgb.b)
  const max = Math.max(rgb.r, rgb.g, rgb.b)

  let h
  if (max === min) {
    h = 0
  } else if (max === rgb.r) {
    h = (0 + (rgb.g - rgb.b) / (max - min)) / 6
  } else if (max === rgb.g) {
    h = (2 + (rgb.b - rgb.r) / (max - min)) / 6
  } else {
    h = (4 + (rgb.r - rgb.g) / (max - min)) / 6
  }

  if (h < 0) {
    h += 1
  }

  let s
  if (max === 0) {
    s = 0
  } else {
    s = (max - min) / max
  }

  const v = max

  return {
    h,
    s,
    v,
    a: rgb.a,
  }
}
