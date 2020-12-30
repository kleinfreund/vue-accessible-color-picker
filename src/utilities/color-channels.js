import { CssValues } from './css-values.js'

/**
 * @typedef {Object} HslChannels
 * @property {Channel} h
 * @property {Channel} s
 * @property {Channel} l
 * @property {Channel} a
 */

/**
 * @typedef {Object} HwbChannels
 * @property {Channel} h
 * @property {Channel} w
 * @property {Channel} b
 * @property {Channel} a
 */

/**
 * @typedef {Object} RgbChannels
 * @property {Channel} r
 * @property {Channel} g
 * @property {Channel} b
 * @property {Channel} a
 */

/**
 * @typedef {Object} Channel
 * @property {(value: number) => string} to
 * @property {(value: string) => number} from
 */

/** @type {{ hsl: HslChannels, hwb: HwbChannels, rgb: RgbChannels }} */
export const colorChannels = {
  hsl: {
    h: {
      to: CssValues.toHueAngle,
      from: CssValues.fromHueAngle,
    },

    s: {
      to: CssValues.toPercentage,
      from: CssValues.fromPercentage,
    },

    l: {
      to: CssValues.toPercentage,
      from: CssValues.fromPercentage,
    },

    a: {
      to: CssValues.toAlpha,
      from: CssValues.fromAlpha,
    },
  },

  hwb: {
    h: {
      to: CssValues.toHueAngle,
      from: CssValues.fromHueAngle,
    },

    w: {
      to: CssValues.toPercentage,
      from: CssValues.fromPercentage,
    },

    b: {
      to: CssValues.toPercentage,
      from: CssValues.fromPercentage,
    },

    a: {
      to: CssValues.toAlpha,
      from: CssValues.fromAlpha,
    },
  },

  rgb: {
    r: {
      to: CssValues.to8BitDecimal,
      from: CssValues.from8BitDecimal,
    },

    g: {
      to: CssValues.to8BitDecimal,
      from: CssValues.from8BitDecimal,
    },

    b: {
      to: CssValues.to8BitDecimal,
      from: CssValues.from8BitDecimal,
    },

    a: {
      to: CssValues.toAlpha,
      from: CssValues.fromAlpha,
    },
  },
}
