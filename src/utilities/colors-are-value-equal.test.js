import { describe, test, expect } from 'vitest'

import { colorsAreValueEqual } from './colors-are-value-equal.js'

const testColorObject = { r: 1, g: 1, b: 1, a: 1 }

describe('colors-are-equal', () => {
	test.each(/** @type {[string | { [key: string]: number }, string | { [key: string]: number }, boolean][]} */ ([
		['#ffffffcc', '#ff0000cc', false],
		['#ffffffcc', '#ffffffcc', true],
		[testColorObject, testColorObject, true],
		[{ r: 1, g: 1, b: 1, a: 1 }, { r: 1, g: 1, b: 1, a: 1 }, true],
		[{ r: 1, g: 1, b: 1, a: 1 }, { r: 1, g: 1, b: 1, a: 0 }, false],
		[{ r: 1, g: 1, b: 1, a: 1 }, { h: 1, s: 1, l: 1, a: 0 }, false],
	]))('works', (colorA, colorB, expectedResult) => {
		expect(colorsAreValueEqual(colorA, colorB)).toBe(expectedResult)
	})
})
