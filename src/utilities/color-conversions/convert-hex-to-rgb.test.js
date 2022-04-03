import { describe, test, expect } from 'vitest'

import { convertHexToRgb } from './convert-hex-to-rgb.js'

describe('convertHexToRgb', () => {
  test.each([
    ['#fff', { r: 1, g: 1, b: 1, a: 1 }],
    ['#ffff', { r: 1, g: 1, b: 1, a: 1 }],
    ['#ffffff', { r: 1, g: 1, b: 1, a: 1 }],
    ['#ffffffff', { r: 1, g: 1, b: 1, a: 1 }],
    ['#f00', { r: 1, g: 0, b: 0, a: 1 }],
    ['#f00f', { r: 1, g: 0, b: 0, a: 1 }],
    ['#ff0000', { r: 1, g: 0, b: 0, a: 1 }],
    ['#ff0000ff', { r: 1, g: 0, b: 0, a: 1 }],
    ['#00ff0054', { r: 0, g: 1, b: 0, a: 0.32941176470588235 }],
    ['#0000ffa8', { r: 0, g: 0, b: 1, a: 0.6588235294117647 }],
    ['#000000ff', { r: 0, g: 0, b: 0, a: 1 }],
    ['#cc0000cc', { r: 0.8, g: 0, b: 0, a: 0.8 }],
  ])('works', (hexColor, rgbColor) => {
    expect(convertHexToRgb(hexColor)).toEqual(rgbColor)
  })
})
