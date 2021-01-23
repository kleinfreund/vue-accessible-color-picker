import { CssValues } from './css-values.js'

type Channel = {
  to: (value: number) => string
  from: (value: string) => number
}

export const colorChannels: { hsl: { [key: string]: Channel }, hwb: { [key: string]: Channel }, rgb: { [key: string]: Channel } } = {
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
