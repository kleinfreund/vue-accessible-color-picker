import { describe, test, expect } from 'vitest'

import { convertHsvToHwb } from './convertHsvToHwb.js'

describe('convertHsvToHwb', () => {
	test.each([
		[{ h: 0, s: 0, v: 100, a: 1 }, { h: 0, w: 100, b: 0, a: 1 }],
		[{ h: 0, s: 100, v: 100, a: 1 }, { h: 0, w: 0, b: 0, a: 1 }],
		[{ h: 120, s: 100, v: 100, a: 0.33 }, { h: 120, w: 0, b: 0, a: 0.33 }],
		[{ h: 240, s: 100, v: 100, a: 0.66 }, { h: 240, w: 0, b: 0, a: 0.66 }],
		[{ h: 324, s: 15, v: 81.25, a: 0.9 }, { h: 324, w: 69.0625, b: 18.75, a: 0.9 }],
		[{ h: 0, s: 0, v: 0, a: 1 }, { h: 0, w: 0, b: 100, a: 1 }],
		[{ h: 0, s: 100, v: 80, a: 0.8 }, { h: 0, w: 0, b: 20, a: 0.8 }],
	])('works', (hsv, hwb) => {
		expect(convertHsvToHwb(hsv)).toEqual(hwb)
	})
})
