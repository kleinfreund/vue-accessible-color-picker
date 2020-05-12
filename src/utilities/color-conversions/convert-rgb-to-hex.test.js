import convertRgbToHex from './convert-rgb-to-hex.js'

describe('convertRgbToHex', () => {
  test.each([
    [{ r: 1, g: 1, b: 1, a: 1 }, '#ffffffff'],
    [{ r: 1, g: 0, b: 0, a: 1 }, '#ff0000ff'],
    [{ r: 0, g: 1, b: 0, a: 0.33 }, '#00ff0054'],
    [{ r: 0, g: 0, b: 1, a: 0.66 }, '#0000ffa8'],
    [{ r: 0, g: 0, b: 0, a: 1 }, '#000000ff'],
    [{ r: 0.8, g: 0, b: 0, a: 0.8 }, '#cc0000cc'],
  ])('works', (rgbColor, hexColor) => {
    expect(convertRgbToHex(rgbColor)).toEqual(hexColor)
  })
})
