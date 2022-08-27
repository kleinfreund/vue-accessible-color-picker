import { describe, test, expect } from 'vitest'

import { isValidHexColor } from './is-valid-hex-color.js'

describe('isValidHexColor', () => {
  test.each(/** @type {[string, boolean][]} */ ([
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
    ['#012345678', false],
  ]))('of “%s” returns %s', (hex, expectedResult) => {
    expect(isValidHexColor(hex)).toBe(expectedResult)
  })
})
