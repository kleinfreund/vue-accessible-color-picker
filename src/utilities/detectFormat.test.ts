import { describe, test, expect } from 'vitest'

import { detectFormat } from './detectFormat.js'

describe('detectFormat', () => {
	test.each([
		[{ h: 0, s: 0, l: 0, a: 0 }, 'hsl'],
		[{ h: 0, s: 0, v: 0, a: 0 }, 'hsv'],
		[{ h: 0, w: 0, b: 0, a: 0 }, 'hwb'],
		[{ l: 0, aAxis: 0, bAxis: 0, a: 0 }, null],
		[{ l: 0, c: 0, h: 0, a: 0 }, null],
		[{ r: 0, g: 0, b: 0, a: 0 }, 'rgb'],
	])('works', (color, expectedResult) => {
		expect(detectFormat(color)).toBe(expectedResult)
	})
})
