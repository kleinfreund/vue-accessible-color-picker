/** @typedef {import('../../types/index').VueAccessibleColorPicker.ColorHex} ColorHex */
/** @typedef {import('../../types/index').VueAccessibleColorPicker.ColorHsl} ColorHsl */
/** @typedef {import('../../types/index').VueAccessibleColorPicker.ColorHwb} ColorHwb */
/** @typedef {import('../../types/index').VueAccessibleColorPicker.ColorRgb} ColorRgb */
/** @typedef {import('../../types/index').VueAccessibleColorPicker.VisibleColorFormat} VisibleColorFormat */

import { round } from './round.js'

/**
 * @typedef {Object} Formatters
 * @property {(color: ColorHex) => string} hex
 * @property {(color: ColorHsl) => string} hsl
 * @property {(color: ColorHwb) => string} hwb
 * @property {(color: ColorRgb) => string} rgb
 */

/** @type {Formatters} */
const formatters = {
  /**
   * @param {ColorHex} hex
   * @returns {string}
   */
  hex (hex) {
    return hex
  },

  /**
   * @param {ColorHsl} hsl
   * @returns {string}
   */
  hsl (hsl) {
    const h = round(hsl.h * 360)
    const s = round(hsl.s * 100)
    const l = round(hsl.l * 100)
    const a = round(hsl.a)

    return `hsl(${h} ${s}% ${l}% / ${a})`
  },

  /**
   * @param {ColorHwb} hwb
   * @returns {string}
   */
  hwb (hwb) {
    const h = round(hwb.h * 360)
    const w = round(hwb.w * 100)
    const b = round(hwb.b * 100)
    const a = round(hwb.a)

    return `hwb(${h} ${w}% ${b}% / ${a})`
  },

  /**
   * @param {ColorRgb} rgb
   * @returns {string}
   */
  rgb (rgb) {
    const r = round(rgb.r * 255)
    const g = round(rgb.g * 255)
    const b = round(rgb.b * 255)
    const a = round(rgb.a)

    return `rgb(${r} ${g} ${b} / ${a})`
  },
}

/**
 * Formats a given color object as a CSS color string.
 *
 * @param {ColorHex | ColorHsl | ColorHwb | ColorRgb} color
 * @param {VisibleColorFormat} format
  * @returns {string}
 */
export function formatAsCssColor (color, format) {
  return formatters[format](color)
}
