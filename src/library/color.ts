export class Color { }

export class ColorHex extends Color {
  readonly value: string

  constructor(value: string) {
    super()
    this.value = value
  }
}

export class ColorHsl extends Color {
  readonly h: number
  readonly s: number
  readonly l: number
  readonly a: number

  constructor({ h, s, l, a }: { h: number, s: number, l: number, a: number }) {
    super()
    this.h = h
    this.s = s
    this.l = l
    this.a = a
  }
}
// https://github.com/microsoft/vscode/blob/master/src/vs/base/common/color.ts

export class ColorHsv extends Color {
  readonly h: number
  readonly w: number
  readonly b: number
  readonly a: number

  constructor({ h, w, b, a }: { h: number, w: number, b: number, a: number }) {
    super()
    this.h = h
    this.w = w
    this.b = b
    this.a = a
  }
}

export class ColorHwb extends Color {
  readonly h: number
  readonly w: number
  readonly b: number
  readonly a: number

  constructor({ h, w, b, a }: { h: number, w: number, b: number, a: number }) {
    super()
    this.h = h
    this.w = w
    this.b = b
    this.a = a
  }
}

export class ColorRgb extends Color {
  readonly r: number
  readonly g: number
  readonly b: number
  readonly a: number

  constructor({ r, g, b, a }: { r: number, g: number, b: number, a: number }) {
    super()
    this.r = r
    this.g = g
    this.b = b
    this.a = a
  }
}

export const colorClasses = {
  hex: ColorHex,
  hsl: ColorHsl,
  hsv: ColorHsv,
  hwb: ColorHwb,
  rgb: ColorRgb,
}
