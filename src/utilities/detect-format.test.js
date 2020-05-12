import { detectFormat } from './detect-format.js'

describe('detectFormat', () => {
  test.each([
    [{ r: 0.5, g: 0.75, b: 0.125, a: 1 }, 'rgb'],
    [{ h: 0.5, s: 0.75, l: 0.125, a: 1 }, 'hsl'],
    [{ h: 0.5, s: 0.75, v: 0.125, a: 1 }, 'hsv'],
    [{ h: 0.5, w: 0.75, b: 0.125, a: 1 }, 'hwb'],
  ])('work', (color, expectedResult) => {
    expect(detectFormat(color)).toBe(expectedResult)
  })
})
