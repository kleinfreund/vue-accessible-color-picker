import { describe, test, expect } from 'vitest'

import { convertHslToHsv } from './convertHslToHsv.js'

describe('convertHslToHsv', () => {
	test.each([
		[{ h: 0, s: 0, l: 100, a: 1 }, { h: 0, s: 0, v: 100, a: 1 }],
		[{ h: 0, s: 100, l: 50, a: 1 }, { h: 0, s: 100, v: 100, a: 1 }],
		[{ h: 120, s: 100, l: 50, a: 0.33 }, { h: 120, s: 100, v: 100, a: 0.33 }],
		[{ h: 240, s: 100, l: 50, a: 0.66 }, { h: 240, s: 100, v: 100, a: 0.66 }],
		[{ h: 324, s: 25, l: 75, a: 0.9 }, { h: 324, s: 15.384615384615374, v: 81.25, a: 0.9 }],
		[{ h: 0, s: 0, l: 0, a: 1 }, { h: 0, s: 0, v: 0, a: 1 }],
		[{ h: 0, s: 100, l: 40, a: 0.8 }, { h: 0, s: 100, v: 80, a: 0.8 }],
	])('works', (hsl, hsv) => {
		expect(convertHslToHsv(hsl)).toEqual(hsv)
	})
})
