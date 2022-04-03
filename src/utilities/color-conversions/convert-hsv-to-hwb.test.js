import { describe, test, expect } from 'vitest'

import { convertHsvToHwb } from './convert-hsv-to-hwb.js'

describe('convertHsvToHwb', () => {
  test.each([
    [{ h: 0, s: 0, v: 1, a: 1 }, { h: 0, w: 1, b: 0, a: 1 }],
    [{ h: 0, s: 1, v: 1, a: 1 }, { h: 0, w: 0, b: 0, a: 1 }],
    [{ h: 0.3333333333333333, s: 1, v: 1, a: 0.33 }, { h: 0.3333333333333333, w: 0, b: 0, a: 0.33 }],
    [{ h: 0.6666666666666666, s: 1, v: 1, a: 0.66 }, { h: 0.6666666666666666, w: 0, b: 0, a: 0.66 }],
    [{ h: 0.9, s: 0.15384615384615374, v: 0.8125, a: 0.9 }, { h: 0.9, w: 0.6875000000000001, b: 0.1875, a: 0.9 }],
    [{ h: 0, s: 0, v: 0, a: 1 }, { h: 0, w: 0, b: 1, a: 1 }],
    [{ h: 0, s: 1, v: 0.8, a: 0.8 }, { h: 0, w: 0, b: 0.19999999999999996, a: 0.8 }],
  ])('works', (hsvColor, hwbColor) => {
    expect(convertHsvToHwb(hsvColor)).toEqual(hwbColor)
  })
})
