import { isValidHexColor } from './is-valid-hex-color.js'

describe('isValidHexColor', () => {
  test.each([
    ['#f', false],
    ['#ff', false],
    ['#fff', true],
    ['#ffff', true],
    ['#fffff', false],
    ['#ffffff', true],
    ['#fffffff', false],
    ['#ffffffff', true],
    ['#', false],
    ['', false],
    ['#aaa', true],
    ['#ggg', false],
    ['#01234567', true],
  ])('of “%s” returns %s', (hex, expectedResult) => {
    expect(isValidHexColor(hex)).toBe(expectedResult)
  })
})
