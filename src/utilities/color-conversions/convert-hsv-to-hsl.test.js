import { convertHsvToHsl } from './convert-hsv-to-hsl.js'

describe('convertHsvToHsl', () => {
  test.each([
    [{ h: 0, s: 0, v: 1, a: 1 }, { h: 0, s: 0, l: 1, a: 1 }],
    [{ h: 0, s: 1, v: 1, a: 1 }, { h: 0, s: 1, l: 0.5, a: 1 }],
    [{ h: 0.3333333333333333, s: 1, v: 1, a: 0.33 }, { h: 0.3333333333333333, s: 1, l: 0.5, a: 0.33 }],
    [{ h: 0.6666666666666666, s: 1, v: 1, a: 0.66 }, { h: 0.6666666666666666, s: 1, l: 0.5, a: 0.66 }],
    [{ h: 0.9, s: 0.15384615384615374, v: 0.8125, a: 0.9 }, { h: 0.9, s: 0.25, l: 0.75, a: 0.9 }],
    [{ h: 0, s: 0, v: 0, a: 1 }, { h: 0, s: 0, l: 0, a: 1 }],
    [{ h: 0, s: 1, v: 0.8, a: 0.8 }, { h: 0, s: 1, l: 0.4, a: 0.8 }],
  ])('works', (hsvColor, hslColor) => {
    expect(convertHsvToHsl(hsvColor)).toEqual(hslColor)
  })
})
