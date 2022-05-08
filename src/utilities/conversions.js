/** @typedef {import('../../types/index').ColorFormat} ColorFormat */
/** @typedef {import('../../types/index').ColorHsl} ColorHsl */
/** @typedef {import('../../types/index').ColorHsv} ColorHsv */
/** @typedef {import('../../types/index').ColorHwb} ColorHwb */
/** @typedef {import('../../types/index').ColorRgb} ColorRgb */

import { convertHexToRgb } from './color-conversions/convert-hex-to-rgb.js'

import { convertHslToHsv } from './color-conversions/convert-hsl-to-hsv.js'
import { convertHslToRgb } from './color-conversions/convert-hsl-to-rgb.js'

import { convertHsvToHsl } from './color-conversions/convert-hsv-to-hsl.js'
import { convertHsvToHwb } from './color-conversions/convert-hsv-to-hwb.js'
import { convertHsvToRgb } from './color-conversions/convert-hsv-to-rgb.js'

import { convertHwbToHsv } from './color-conversions/convert-hwb-to-hsv.js'

import { convertRgbToHsl } from './color-conversions/convert-rgb-to-hsl.js'
import { convertRgbToHex } from './color-conversions/convert-rgb-to-hex.js'
import { convertRgbToHwb } from './color-conversions/convert-rgb-to-hwb.js'

/**
 * @type {{ [key in ColorFormat]: Array<[ColorFormat, (color: any) => any]> }}
 */
export const conversions = {
  hex: [
    ['hsl', (hex) => chainConvert(hex, [convertHexToRgb, convertRgbToHsl])],
    ['hsv', (hex) => chainConvert(hex, [convertHexToRgb, convertRgbToHwb, convertHwbToHsv])],
    ['hwb', (hex) => chainConvert(hex, [convertHexToRgb, convertRgbToHwb])],
    ['rgb', convertHexToRgb],
  ],
  hsl: [
    ['hex', (hsl) => chainConvert(hsl, [convertHslToRgb, convertRgbToHex])],
    ['hsv', convertHslToHsv],
    ['hwb', (hsl) => chainConvert(hsl, [convertHslToRgb, convertRgbToHwb])],
    ['rgb', convertHslToRgb],
  ],
  hsv: [
    ['hex', (hsv) => chainConvert(hsv, [convertHsvToRgb, convertRgbToHex])],
    ['hsl', convertHsvToHsl],
    ['hwb', convertHsvToHwb],
    ['rgb', convertHsvToRgb],
  ],
  hwb: [
    ['hex', (hwb) => chainConvert(hwb, [convertHwbToHsv, convertHsvToRgb, convertRgbToHex])],
    ['hsl', (hwb) => chainConvert(hwb, [convertHwbToHsv, convertHsvToRgb, convertRgbToHsl])],
    ['hsv', convertHwbToHsv],
    ['rgb', (hwb) => chainConvert(hwb, [convertHwbToHsv, convertHsvToRgb])],
  ],
  rgb: [
    ['hex', convertRgbToHex],
    ['hsl', convertRgbToHsl],
    ['hsv', (rgb) => chainConvert(rgb, [convertRgbToHwb, convertHwbToHsv])],
    ['hwb', convertRgbToHwb],
  ],
}

/**
 * Takes a `color` and passes it through a list of conversion functions.
 *
 * This process is necessary when a direct conversion algorithm isn’t known/available for the conversion between two color formats. Then, several conversion functions are chained to get to the result in an indirect manner (e.g. to convert from RGB to HSV, we first convert from RGB to HWB and then from HWB to HSV).
 *
 * @param {any} sourceColor
 * @param {Function[]} convertFunctions
 * @returns {any}
 */
function chainConvert (sourceColor, convertFunctions) {
  return convertFunctions.reduce((color, convert) => convert(color), sourceColor)
}
