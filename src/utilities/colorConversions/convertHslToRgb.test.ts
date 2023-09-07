import { describe, test, expect } from 'vitest'

import { convertHslToRgb } from './convertHslToRgb.js'

describe('convertHslToRgb', () => {
	test.each([
		[{ h: 0, s: 0, l: 100, a: 1 }, { r: 255, g: 255, b: 255, a: 1 }],
		[{ h: 0, s: 100, l: 50, a: 1 }, { r: 255, g: 0, b: 0, a: 1 }],
		[{ h: 120, s: 100, l: 50, a: 0.33 }, { r: 0, g: 255, b: 0, a: 0.33 }],
		[{ h: 240, s: 100, l: 50, a: 0.66 }, { r: 0, g: 0, b: 255, a: 0.66 }],
		[{ h: 324, s: 25, l: 75, a: 0.9 }, { r: 207.1875, g: 175.3125, b: 194.4375, a: 0.9 }],
		[{ h: 0, s: 0, l: 0, a: 1 }, { r: 0, g: 0, b: 0, a: 1 }],
		[{ h: 0, s: 100, l: 40, a: 0.8 }, { r: 204, g: 0, b: 0, a: 0.8 }],
		[{ h: 270, s: 100, l: 50, a: 0.8 }, { r: 127.5, g: 0, b: 255, a: 0.8 }],
		[{ h: -90, s: 100, l: 50, a: 0.8 }, { r: 127.5, g: 0, b: 255, a: 0.8 }],
	])('works', (hsl, rgb) => {
		expect(convertHslToRgb(hsl)).toEqual(rgb)
	})
})
