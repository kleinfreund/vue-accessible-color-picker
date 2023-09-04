import { describe, test, expect } from 'vitest'

import { isValidHexColor } from './isValidHexColor.js'

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
		['#012345678', false],
	])('of “%s” returns %s', (hex, expectedResult) => {
		expect(isValidHexColor(hex)).toBe(expectedResult)
	})
})
