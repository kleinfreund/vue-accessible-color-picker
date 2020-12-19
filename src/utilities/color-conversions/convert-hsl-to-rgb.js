/** @typedef {import('../../../types/index').VueAccessibleColorPicker.ColorHsl} ColorHsl */
/** @typedef {import('../../../types/index').VueAccessibleColorPicker.ColorRgb} ColorRgb */

/**
 * Converts an HSL color object to an RGB color object.
 *
 * Source: https://en.m.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB
 *
 * @param {ColorHsl} hsl
 * @returns {ColorRgb}
 */
export default function convertHslToRgb (hsl) {
  const q = hsl.l < 0.5 ? hsl.l * (1 + hsl.s) : hsl.l + hsl.s - hsl.l * hsl.s
  const p = 2 * hsl.l - q

  return {
    r: hue2rgb(p, q, hsl.h + 1 / 3),
    g: hue2rgb(p, q, hsl.h),
    b: hue2rgb(p, q, hsl.h - 1 / 3),
    a: hsl.a,
  }
}

/**
 * @param {number} p
 * @param {number} q
 * @param {number} t
 * @returns {number}
 */
function hue2rgb (p, q, t) {
  if (t < 0) {
    t += 1
  } else if (t > 1) {
    t -= 1
  }

  if (t < 1 / 6) {
    return p + (q - p) * 6 * t
  } else if (t < 1 / 2) {
    return q
  } else if (t < 2 / 3) {
    return p + (q - p) * (2 / 3 - t) * 6
  } else {
    return p
  }
}
