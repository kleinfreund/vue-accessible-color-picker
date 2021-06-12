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
  return convertRgbToHsl(convertHexToRgb(hex))
}

/**
 * @param {string} hex
 * @returns {ColorHsv}
 */
function convertHexToHsv (hex) {
  return convertRgbToHsv(convertHexToRgb(hex))
}

/**
 * @param {string} hex
 * @returns {ColorHwb}
 */
function convertHexToHwb (hex) {
  return convertRgbToHwb(convertHexToRgb(hex))
}

/**
 * @param {ColorHsl} hsl
 * @returns {string}
 */
function convertHslToHex (hsl) {
  return convertRgbToHex(convertHslToRgb(hsl))
}

/**
 * @param {ColorHsl} hsl
 * @returns {ColorHwb}
 */
function convertHslToHwb (hsl) {
  return convertRgbToHwb(convertHslToRgb(hsl))
}

/**
 * @param {ColorHwb} hwb
 * @returns {string}
 */
function convertHwbToHex (hwb) {
  return convertRgbToHex(convertHwbToRgb(hwb))
}

/**
 * @param {ColorHwb} hwb
 * @returns {ColorHsl}
 */
function convertHwbToHsl (hwb) {
  return convertRgbToHsl(convertHwbToRgb(hwb))
}

/**
 * @param {ColorHwb} hwb
 * @returns {ColorRgb}
 */
function convertHwbToRgb (hwb) {
  return convertHsvToRgb(convertHwbToHsv(hwb))
}

/**
 * @param {ColorHsv} hsv
 * @returns {string}
 */
function convertHsvToHex (hsv) {
  return convertRgbToHex(convertHsvToRgb(hsv))
}

/**
 * @param {ColorRgb} rgb
 * @returns {ColorHsv}
 */
export function convertRgbToHsv (rgb) {
  return convertHwbToHsv(convertRgbToHwb(rgb))
}
