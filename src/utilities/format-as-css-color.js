import { round } from './round.js'

const formatters = {
  /**
   * @param {string} hex
   * @returns {string}
   */
  hex (hex) {
    return hex
  },

  /**
   * @param {{ h: number, s: number, l: number, a: number }} hsl
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
   * @param {{ h: number, w: number, b: number, a: number }} hwb
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
   * @param {{ r: number, g: number, b: number, a: number }} rgb
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
 * @param {string|object} color
 * @param {'hex' | 'hsl' | 'hwb' | 'rgb'} format
  * @returns {string}
 */
export function formatAsCssColor (color, format) {
  return formatters[format](color)
}
