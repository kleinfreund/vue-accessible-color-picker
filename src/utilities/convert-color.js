import convertHexToRgb from './color-conversions/convert-hex-to-rgb.js'

import convertHslToHsv from './color-conversions/convert-hsl-to-hsv.js'
import convertHslToRgb from './color-conversions/convert-hsl-to-rgb.js'

import convertHsvToHsl from './color-conversions/convert-hsv-to-hsl.js'
import convertHsvToHwb from './color-conversions/convert-hsv-to-hwb.js'
import convertHsvToRgb from './color-conversions/convert-hsv-to-rgb.js'

import convertHwbToHsv from './color-conversions/convert-hwb-to-hsv.js'

import convertRgbToHsl from './color-conversions/convert-rgb-to-hsl.js'
import convertRgbToHsv from './color-conversions/convert-rgb-to-hsv.js'
import convertRgbToHex from './color-conversions/convert-rgb-to-hex.js'
import convertRgbToHwb from './color-conversions/convert-rgb-to-hwb.js'

const conversions = {
  hex: {
    hsl: convertHexToHsl,
    hsv: convertHexToHsv,
    hwb: convertHexToHwb,
    rgb: convertHexToRgb,
  },

  hsl: {
    hex: convertHslToHex,
    hsv: convertHslToHsv,
    hwb: convertHslToHwb,
    rgb: convertHslToRgb,
  },

  hsv: {
    hsl: convertHsvToHsl,
    hwb: convertHsvToHwb,
    rgb: convertHsvToRgb,
    hex: convertHsvToHex,
  },

  hwb: {
    hex: convertHwbToHex,
    hsl: convertHwbToHsl,
    hsv: convertHwbToHsv,
    rgb: convertHwbToRgb,
  },

  rgb: {
    hsl: convertRgbToHsl,
    hsv: convertRgbToHsv,
    hwb: convertRgbToHwb,
    hex: convertRgbToHex,
  },
}

/**
 * @param {string} hex
 * @returns {{ h: number, s: number, l: number, a: number }}
 */
function convertHexToHsl (hex) {
  const rgb = convertHexToRgb(hex)
  return convertRgbToHsl(rgb)
}

/**
 * @param {string} hex
 * @returns {{ h: number, s: number, v: number, a: number }}
 */
function convertHexToHsv (hex) {
  const rgb = convertHexToRgb(hex)
  return convertRgbToHsv(rgb)
}

/**
 * @param {string} hex
 * @returns {{ h: number, w: number, b: number, a: number }}
 */
function convertHexToHwb (hex) {
  const rgb = convertHexToRgb(hex)
  return convertRgbToHwb(rgb)
}

/**
 * @param {{ h: number, s: number, l: number, a: number }} hsl
 * @returns {string}
 */
function convertHslToHex (hsl) {
  const rgb = convertHslToRgb(hsl)
  return convertRgbToHex(rgb)
}

/**
 * @param {{ h: number, s: number, l: number, a: number }} hsl
 * @returns {{ h: number, w: number, b: number, a: number }}
 */
function convertHslToHwb (hsl) {
  const rgb = convertHslToRgb(hsl)
  return convertRgbToHwb(rgb)
}

/**
 * @param {{ h: number, w: number, b: number, a: number }} hwb
 * @returns {string}
 */
function convertHwbToHex (hwb) {
  const rgb = convertHwbToRgb(hwb)
  return convertRgbToHex(rgb)
}

/**
 * @param {{ h: number, w: number, b: number, a: number }} hwb
 * @returns {{ h: number, s: number, l: number, a: number }}
 */
function convertHwbToHsl (hwb) {
  const rgb = convertHwbToRgb(hwb)
  return convertRgbToHsl(rgb)
}

/**
 * @param {{ h: number, w: number, b: number, a: number }} hwb
 * @returns {{ r: number, g: number, b: number, a: number }}
 */
function convertHwbToRgb (hwb) {
  const hsv = convertHwbToHsv(hwb)
  return convertHsvToRgb(hsv)
}

/**
 * Note: This is not moved into its dedicated `convert-hsv-to-hex.js` file
 * because its implementation is completely covered by the composition
 * of `convertRgbToHex` and `convertHsvToRgb`.
 *
 * @param {{ h: number, s: number, v: number, a: number }} hsv
 * @returns {string}
 */
function convertHsvToHex (hsv) {
  const rgb = convertHsvToRgb(hsv)
  return convertRgbToHex(rgb)
}

/**
 * Converts a given color object from one color format to another.
 *
 * @param {string | object} color
 * @param {'hex' | 'hsl' | 'hsv' | 'hwb' | 'rgb'} sourceFormat
 * @param {'hex' | 'hsl' | 'hsv' | 'hwb' | 'rgb'} targetFormat
 * @returns {string | object}
 */
export function convertColor (color, sourceFormat, targetFormat) {
  return conversions[sourceFormat][targetFormat](color)
}
