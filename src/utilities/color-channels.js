import { CssValues } from './css-values.js'

/** @type {object.<string, object>} */
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
