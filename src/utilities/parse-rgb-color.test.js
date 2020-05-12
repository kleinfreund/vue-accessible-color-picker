import { parseRgbColor } from './parse-rgb-color.js'

describe('parseRgbColor', () => {
  test.each([
    ['rgb(255, 0, 0)', { r: 1, g: 0, b: 0, a: 1 }],
    ['rgba(255, 0, 0, 1)', { r: 1, g: 0, b: 0, a: 1 }],
    ['rgb(255 0 0)', { r: 1, g: 0, b: 0, a: 1 }],
    ['rgb(255 0 0 / 1)', { r: 1, g: 0, b: 0, a: 1 }],
    ['rgba(255 0 0 / 0.333)', { r: 1, g: 0, b: 0, a: 0.333 }],
    ['rgb(127.5 127.5 63.75)', { r: 0.5, g: 0.5, b: 0.25, a: 1 }],
    ['rgb(255.12 255.23 255.34)', { r: 1, g: 1, b: 1, a: 1 }],
    ['rgb(50% 75% 12.5%)', { r: 0.5, g: 0.75, b: 0.125, a: 1 }],
  ])('works', (rgbColorString, rgbColor) => {
    expect(parseRgbColor(rgbColorString)).toEqual(rgbColor)
  })
})
