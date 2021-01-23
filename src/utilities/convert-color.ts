import { ColorHex, ColorHsl, ColorHsv, ColorHwb, ColorRgb, ColorFormat } from '../../types/index'

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

export const conversions: { [key in ColorFormat]: Array<{ format: ColorFormat, convert: (color: any) => any }> } = {
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

function convertHexToHsl (hex: ColorHex): ColorHsl {
  const rgb = convertHexToRgb(hex)
  return convertRgbToHsl(rgb)
}

function convertHexToHsv (hex: ColorHex): ColorHsv {
  const rgb = convertHexToRgb(hex)
  return convertRgbToHsv(rgb)
}

function convertHexToHwb (hex: ColorHex): ColorHwb {
  const rgb = convertHexToRgb(hex)
  return convertRgbToHwb(rgb)
}

function convertHslToHex (hsl: ColorHsl): string {
  const rgb = convertHslToRgb(hsl)
  return convertRgbToHex(rgb)
}

function convertHslToHwb (hsl: ColorHsl): ColorHwb {
  const rgb = convertHslToRgb(hsl)
  return convertRgbToHwb(rgb)
}

function convertHwbToHex (hwb: ColorHwb): string {
  const rgb = convertHwbToRgb(hwb)
  return convertRgbToHex(rgb)
}

function convertHwbToHsl (hwb: ColorHwb): ColorHsl {
  const rgb = convertHwbToRgb(hwb)
  return convertRgbToHsl(rgb)
}

function convertHwbToRgb (hwb: ColorHwb): ColorRgb {
  const hsv = convertHwbToHsv(hwb)
  return convertHsvToRgb(hsv)
}

/**
 * Note: This is not moved into its dedicated `convert-hsv-to-hex.js` file
 * because its implementation is completely covered by the composition
 * of `convertRgbToHex` and `convertHsvToRgb`.
 */
function convertHsvToHex (hsv: ColorHsv): string {
  const rgb = convertHsvToRgb(hsv)
  return convertRgbToHex(rgb)
}
