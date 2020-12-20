/** @typedef {import('../../types/index').VueAccessibleColorPicker.ColorHex} ColorHex */
/** @typedef {import('../../types/index').VueAccessibleColorPicker.ColorHsl} ColorHsl */
/** @typedef {import('../../types/index').VueAccessibleColorPicker.ColorHsv} ColorHsv */
/** @typedef {import('../../types/index').VueAccessibleColorPicker.ColorHwb} ColorHwb */
/** @typedef {import('../../types/index').VueAccessibleColorPicker.ColorRgb} ColorRgb */
/** @typedef {import('../../types/index').VueAccessibleColorPicker.SupportedColorFormat} SupportedColorFormat */

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
 * @typedef {Object} HexConversions
 * @property {(arg0: ColorHex) => ColorHsl} hsl
 * @property {(arg0: ColorHex) => ColorHsv} hsv
 * @property {(arg0: ColorHex) => ColorHwb} hwb
 * @property {(arg0: ColorHex) => ColorRgb} rgb
 */

/**
 * @typedef {Object} HslConversions
 * @property {(arg0: ColorHsl) => ColorHex} hex
 * @property {(arg0: ColorHsl) => ColorHsv} hsv
 * @property {(arg0: ColorHsl) => ColorHwb} hwb
 * @property {(arg0: ColorHsl) => ColorRgb} rgb
 */

/**
 * @typedef {Object} HsvConversions
 * @property {(arg0: ColorHsv) => ColorHex} hex
 * @property {(arg0: ColorHsv) => ColorHsl} hsl
 * @property {(arg0: ColorHsv) => ColorHwb} hwb
 * @property {(arg0: ColorHsv) => ColorRgb} rgb
 */

/**
 * @typedef {Object} HwbConversions
 * @property {(arg0: ColorHwb) => ColorHex} hex
 * @property {(arg0: ColorHwb) => ColorHsl} hsl
 * @property {(arg0: ColorHwb) => ColorHsv} hsv
 * @property {(arg0: ColorHwb) => ColorRgb} rgb
 */

/**
 * @typedef {Object} RgbConversions
 * @property {(arg0: ColorRgb) => ColorHex} hex
 * @property {(arg0: ColorRgb) => ColorHsl} hsl
 * @property {(arg0: ColorRgb) => ColorHsv} hsv
 * @property {(arg0: ColorRgb) => ColorHwb} hwb
 */

/** @type {HexConversions} */ const hexConversions = {
  hsl: convertHexToHsl,
  hsv: convertHexToHsv,
  hwb: convertHexToHwb,
  rgb: convertHexToRgb,
}

/** @type {HslConversions} */ const hslConversions = {
  hex: convertHslToHex,
  hsv: convertHslToHsv,
  hwb: convertHslToHwb,
  rgb: convertHslToRgb,
}

/** @type {HsvConversions} */ const hsvConversions = {
  hex: convertHsvToHex,
  hsl: convertHsvToHsl,
  hwb: convertHsvToHwb,
  rgb: convertHsvToRgb,
}

/** @type {HwbConversions} */ const hwbConversions = {
  hex: convertHwbToHex,
  hsl: convertHwbToHsl,
  hsv: convertHwbToHsv,
  rgb: convertHwbToRgb,
}

/** @type {RgbConversions} */ const rgbConversions = {
  hex: convertRgbToHex,
  hsl: convertRgbToHsl,
  hsv: convertRgbToHsv,
  hwb: convertRgbToHwb,
}

/** @type {{ [key in SupportedColorFormat]: HexConversions | HslConversions | HsvConversions | HwbConversions | RgbConversions }} */
const conversions = {
  hex: hexConversions,
  hsl: hslConversions,
  hsv: hsvConversions,
  hwb: hwbConversions,
  rgb: rgbConversions,
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

/**
 * Converts a given color object from one color format to another.
 *
 * @param {ColorHex | ColorHsl | ColorHsv | ColorHwb | ColorRgb} color
 * @param {SupportedColorFormat} sourceFormat
 * @param {SupportedColorFormat} targetFormat
 * @returns {ColorHex | ColorHsl | ColorHsv | ColorHwb | ColorRgb}
 */
export function convertColor (color, sourceFormat, targetFormat) {
  return conversions[sourceFormat][targetFormat](color)
}
