import { CssValues } from './css-values.js'

describe('CssValues', () => {
  describe('hue angle', () => {
    test.each([
      ['0', 0],
      ['360', 0],
      ['450', 0.25],
      ['270', 0.75],
      ['270.', NaN],
    ])('fromHueAngle', (value, expected) => {
      expect(CssValues.fromHueAngle(value)).toEqual(expected)
    })

    test.each([
      [0, '0'],
      [0.166666, '60'],
      [0.25, '90'],
      [0.333333, '120'],
      [0.5, '180'],
      [0.75, '270'],
    ])('toHueAngle', (value, expected) => {
      expect(CssValues.toHueAngle(value)).toEqual(expected)
    })
  })

  describe('percentage', () => {
    test.each([
      ['0%', 0],
      ['0', NaN],
      ['10.%', NaN],
      ['a%', NaN],
      ['-13%', 0],
      ['55.55%', 0.5555],
      ['100%', 1],
      ['1300%', 1],
    ])('fromPercentage', (value, expected) => {
      expect(CssValues.fromPercentage(value)).toEqual(expected)
    })

    test.each([
      [0, '0%'],
      [0.5555, '55.55%'],
      [1, '100%'],
    ])('toPercentage', (value, expected) => {
      expect(CssValues.toPercentage(value)).toEqual(expected)
    })
  })

  describe('8 bit decimal', () => {
    test.each([
      ['0', 0],
      ['0%', 0],
      ['10.', NaN],
      ['10.%', NaN],
      ['a', NaN],
      ['141.65', 0.5554901960784314],
      ['255', 1],
      ['100%', 1],
      ['50%', 0.5],
    ])('from8BitDecimal', (value, expected) => {
      expect(CssValues.from8BitDecimal(value)).toEqual(expected)
    })

    test.each([
      [0, '0'],
      [0.5555, '141.65'],
      [1, '255'],
    ])('to8BitDecimal', (value, expected) => {
      expect(CssValues.to8BitDecimal(value)).toEqual(expected)
    })
  })

  describe('alpha', () => {
    test.each([
      ['0', 0],
      ['0.5555', 0.5555],
      ['1', 1],
      ['0%', 0],
      ['55.55%', 0.5555],
      ['100%', 1],
    ])('fromAlpha', (value, expected) => {
      expect(CssValues.fromAlpha(value)).toEqual(expected)
    })

    test.each([
      [0, '0'],
      [0.5555, '0.5555'],
      [1, '1'],
    ])('toAlpha', (value, expected) => {
      expect(CssValues.toAlpha(value)).toEqual(expected)
    })
  })
})
