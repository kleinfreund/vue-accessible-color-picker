import { describe, test, expect } from 'vitest'

import { convertHsvToRgb } from './convertHsvToRgb.js'

describe('convertHsvToRgb', () => {
	test.each([
		[{ h: 0, s: 0, v: 1, a: 1 }, { r: 1, g: 1, b: 1, a: 1 }],
		[{ h: 0, s: 1, v: 1, a: 1 }, { r: 1, g: 0, b: 0, a: 1 }],
		[{ h: 0.3333333333333333, s: 1, v: 1, a: 0.33 }, { r: 0, g: 1, b: 0, a: 0.33 }],
		[{ h: 0.6666666666666666, s: 1, v: 1, a: 0.66 }, { r: 0, g: 0, b: 1, a: 0.66 }],
		[{ h: 0.9, s: 0.15384615384615385, v: 0.8125, a: 0.9 }, { r: 0.8125, g: 0.6875, b: 0.7625, a: 0.9 }],
		[{ h: 0, s: 0, v: 0, a: 1 }, { r: 0, g: 0, b: 0, a: 1 }],
		[{ h: 0, s: 1, v: 0.8, a: 0.8 }, { r: 0.8, g: 0, b: 0, a: 0.8 }],
	])('works', (hsv, rgb) => {
		expect(convertHsvToRgb(hsv)).toEqual(rgb)
	})
})
