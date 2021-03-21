/** @typedef {import('../../types/index').VueAccessibleColorPicker.ColorHex} ColorHex */
/** @typedef {import('../../types/index').VueAccessibleColorPicker.ColorHsl} ColorHsl */
/** @typedef {import('../../types/index').VueAccessibleColorPicker.ColorHsv} ColorHsv */
/** @typedef {import('../../types/index').VueAccessibleColorPicker.ColorHwb} ColorHwb */
/** @typedef {import('../../types/index').VueAccessibleColorPicker.ColorRgb} ColorRgb */
/** @typedef {import('../../types/index').VueAccessibleColorPicker.ColorFormat} ColorFormat */

import { convertHexToRgb } from './color-conversions/convert-hex-to-rgb.js'

import { convertHslToHsv } from './color-conversions/convert-hsl-to-hsv.js'
import { convertHslToRgb } from './color-conversions/convert-hsl-to-rgb.js'

import { convertHsvToHsl } from './color-conversions/convert-hsv-to-hsl.js'
import { convertHsvToHwb } from './color-conversions/convert-hsv-to-hwb.js'
import { convertHsvToRgb } from './color-conversions/convert-hsv-to-rgb.js'

import { convertHwbToHsv } from './color-conversions/convert-hwb-to-hsv.js'

import { convertRgbToHsl } from './color-conversions/convert-rgb-to-hsl.js'
import { convertRgbToHsv } from './color-conversions/convert-rgb-to-hsv.js'
import { convertRgbToHex } from './color-conversions/convert-rgb-to-hex.js'
import { convertRgbToHwb } from './color-conversions/convert-rgb-to-hwb.js'

/**
 * @type {{ [key in ColorFormat]: Array<{ format: ColorFormat, convert: (color: any) => any }> }}
 */
export const conversions = {
  hex: [
    { format: 'hsl', convert: convertHexToHsl },
    { format: 'hsv', convert: convertHexToHsv },
    { format: 'hwb', convert: convertHexToHwb },
    { format: 'rgb', convert: convertHexToRgb },
  ],
  hsl: [
    { format: 'hex', convert: convertHslToHex },
    { format: 'hsv', convert: convertHslToHsv },
    { format: 'hwb', convert: convertHslToHwb },
    { format: 'rgb', convert: convertHslToRgb },
  ],
  hsv: [
    { format: 'hex', convert: convertHsvToHex },
    { format: 'hsl', convert: convertHsvToHsl },
    { format: 'hwb', convert: convertHsvToHwb },
    { format: 'rgb', convert: convertHsvToRgb },
  ],
  hwb: [
    { format: 'hex', convert: convertHwbToHex },
    { format: 'hsl', convert: convertHwbToHsl },
    { format: 'hsv', convert: convertHwbToHsv },
    { format: 'rgb', convert: convertHwbToRgb },
  ],
  rgb: [
    { format: 'hex', convert: convertRgbToHex },
    { format: 'hsl', convert: convertRgbToHsl },
    { format: 'hsv', convert: convertRgbToHsv },
    { format: 'hwb', convert: convertRgbToHwb },
  ],
}

/**
 * @param {ColorHex} hex
 * @returns {ColorHsl}
 */
function convertHexToHsl (hex) {
  const rgb = convertHexToRgb(hex)
  return convertRgbToHsl(rgb)
}

/**
 * @param {ColorHex} hex
 * @returns {ColorHsv}
 */
function convertHexToHsv (hex) {
  const rgb = convertHexToRgb(hex)
  return convertRgbToHsv(rgb)
}

/**
 * @param {ColorHex} hex
 * @returns {ColorHwb}
 */
function convertHexToHwb (hex) {
  const rgb = convertHexToRgb(hex)
  return convertRgbToHwb(rgb)
}

/**
 * @param {ColorHsl} hsl
 * @returns {string}
 */
function convertHslToHex (hsl) {
  const rgb = convertHslToRgb(hsl)
  return convertRgbToHex(rgb)
}

/**
 * @param {ColorHsl} hsl
 * @returns {ColorHwb}
 */
function convertHslToHwb (hsl) {
  const rgb = convertHslToRgb(hsl)
  return convertRgbToHwb(rgb)
}

/**
 * @param {ColorHwb} hwb
 * @returns {string}
 */
function convertHwbToHex (hwb) {
  const rgb = convertHwbToRgb(hwb)
  return convertRgbToHex(rgb)
}

/**
 * @param {ColorHwb} hwb
 * @returns {ColorHsl}
 */
function convertHwbToHsl (hwb) {
  const rgb = convertHwbToRgb(hwb)
  return convertRgbToHsl(rgb)
}

/**
 * @param {ColorHwb} hwb
 * @returns {ColorRgb}
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
 * @param {ColorHsv} hsv
 * @returns {string}
 */
function convertHsvToHex (hsv) {
  const rgb = convertHsvToRgb(hsv)
  return convertRgbToHex(rgb)
}
