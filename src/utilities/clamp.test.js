import { describe, test, expect } from 'vitest'

import { clamp } from './clamp.js'

describe('clamp', () => {
  test.each([
    [1, 1, 3, 1],
    [2, 1, 3, 2],
    [3, 1, 3, 3],
  ])('doesn’t change value', (value, min, max, expectedValue) => {
    expect(clamp(value, min, max)).toBe(expectedValue)
  })

  test.each([
    [0, 1, 3, 1],
    [-1, 1, 3, 1],
    [-100000, 1, 3, 1],
  ])('changes value to minimum', (value, min, max, expectedValue) => {
    expect(clamp(value, min, max)).toBe(expectedValue)
  })

  test.each([
    [3, 1, 3, 3],
    [4, 1, 3, 3],
    [100000, 1, 3, 3],
  ])('changes value to maximum', (value, min, max, expectedValue) => {
    expect(clamp(value, min, max)).toBe(expectedValue)
  })
})
