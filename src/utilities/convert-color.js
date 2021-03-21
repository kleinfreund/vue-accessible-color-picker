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
import { convertRgbToHsv } from './color-conversions/convert-rgb-to-hsv.js'
import { convertRgbToHex } from './color-conversions/convert-rgb-to-hex.js'
import { convertRgbToHwb } from './color-conversions/convert-rgb-to-hwb.js'

/**
 * @type {{ [key in ColorFormat]: Array<[ColorFormat, (color: any) => any]> }}
 */
export const conversions = {
  hex: [
    ['hsl', convertHexToHsl],
    ['hsv', convertHexToHsv],
    ['hwb', convertHexToHwb],
    ['rgb', convertHexToRgb],
  ],
  hsl: [
    ['hex', convertHslToHex],
    ['hsv', convertHslToHsv],
    ['hwb', convertHslToHwb],
    ['rgb', convertHslToRgb],
  ],
  hsv: [
    ['hex', convertHsvToHex],
    ['hsl', convertHsvToHsl],
    ['hwb', convertHsvToHwb],
    ['rgb', convertHsvToRgb],
  ],
  hwb: [
    ['hex', convertHwbToHex],
    ['hsl', convertHwbToHsl],
    ['hsv', convertHwbToHsv],
    ['rgb', convertHwbToRgb],
  ],
  rgb: [
    ['hex', convertRgbToHex],
    ['hsl', convertRgbToHsl],
    ['hsv', convertRgbToHsv],
    ['hwb', convertRgbToHwb],
  ],
}

/**
 * @param {string} hex
 * @returns {ColorHsl}
 */
function convertHexToHsl (hex) {
  const rgb = convertHexToRgb(hex)
  return convertRgbToHsl(rgb)
}

/**
 * @param {string} hex
 * @returns {ColorHsv}
 */
function convertHexToHsv (hex) {
  const rgb = convertHexToRgb(hex)
  return convertRgbToHsv(rgb)
}

/**
 * @param {string} hex
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
 * @param {ColorHsv} hsv
 * @returns {string}
 */
function convertHsvToHex (hsv) {
  const rgb = convertHsvToRgb(hsv)
  return convertRgbToHex(rgb)
}
