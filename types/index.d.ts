export namespace VueAccessibleColorPicker {
  export type VisibleColorFormat = 'hex' | 'hsl' | 'hwb' | 'rgb'

  export type ColorFormat = 'hex' | 'hsl' | 'hsv' | 'hwb' | 'rgb'

  export type ColorHex = string

  export type ColorHsl = {
    h: number
    s: number
    l: number
    a: number
  }

  export type ColorHsv = {
    h: number
    s: number
    v: number
    a: number
  }

  export type ColorHwb = {
    h: number
    w: number
    b: number
    a: number
  }

  export type ColorRgb = {
    r: number
    g: number
    b: number
    a: number
  }

  export type Colors = {
    hex: ColorHex
    hsl: ColorHsl
    hsv: ColorHsv
    hwb: ColorHwb
    rgb: ColorRgb
  }
}
