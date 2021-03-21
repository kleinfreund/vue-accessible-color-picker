export type VisibleColorFormat = 'hex' | 'hsl' | 'hwb' | 'rgb'

export type ColorFormat = 'hex' | 'hsl' | 'hsv' | 'hwb' | 'rgb'

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
