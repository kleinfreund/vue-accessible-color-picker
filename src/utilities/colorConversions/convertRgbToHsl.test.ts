import { describe, test, expect } from 'vitest'

import { convertRgbToHsl } from './convertRgbToHsl.js'

describe('convertRgbToHsl', () => {
	test.each([
		[{ r: 1, g: 1, b: 1, a: 1 }, { h: 0, s: 0, l: 1, a: 1 }],
		[{ r: 1, g: 0, b: 0, a: 1 }, { h: 0, s: 1, l: 0.5, a: 1 }],
		[{ r: 0, g: 1, b: 0, a: 0.33 }, { h: 0.3333333333333333, s: 1, l: 0.5, a: 0.33 }],
		[{ r: 0, g: 0, b: 1, a: 0.66 }, { h: 0.6666666666666666, s: 1, l: 0.5, a: 0.66 }],
		[{ r: 0.8125, g: 0.6875, b: 0.7625, a: 0.9 }, { h: 0.9, s: 0.25, l: 0.75, a: 0.9 }],
		[{ r: 0, g: 0, b: 0, a: 1 }, { h: 0, s: 0, l: 0, a: 1 }],
		[{ r: 0.8, g: 0, b: 0, a: 0.8 }, { h: 0, s: 1, l: 0.4, a: 0.8 }],
	])('works', (rgb, hsl) => {
		expect(convertRgbToHsl(rgb)).toEqual(hsl)
	})
})
