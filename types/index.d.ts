export type VisibleColorFormat = 'hex' | 'hsl' | 'hwb' | 'rgb'

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

interface ColorMap {
  hex: string
  hsl: { [key: string]: number }
  hsv: { [key: string]: number }
  hwb: { [key: string]: number }
  rgb: { [key: string]: number }
}

export type ColorFormat = keyof ColorMap

type ColorByFormat<T extends keyof ColorMap> = ColorMap[T]

export type Colors = {
  [K in keyof ColorMap]: ColorByFormat<K>
}

export type Color = ColorHex | ColorHsl | ColorHsv | ColorHwb | ColorRgb

interface ColorChannelMap {
  hex: undefined
  hsl: keyof ColorHsl
  hsv: keyof ColorHsv
  hwb: keyof ColorHwb
  rgb: keyof ColorRgb
}

export type ColorChannel<T extends keyof ColorChannelMap> = ColorChannelMap[T]

export type SetColorValueParams = {
  [K in keyof ColorMap]: [
    format: K,
    channel: ColorChannel<K>,
    value: any
  ]
}[keyof ColorMap]
