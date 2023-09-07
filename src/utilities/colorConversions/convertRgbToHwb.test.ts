import { describe, test, expect } from 'vitest'

import { convertRgbToHwb } from './convertRgbToHwb.js'

describe('convertRgbToHwb', () => {
	test.each([
		[{ r: 255, g: 255, b: 255, a: 1 }, { h: 0, w: 100, b: 0, a: 1 }],
		[{ r: 255, g: 0, b: 0, a: 1 }, { h: 0, w: 0, b: 0, a: 1 }],
		[{ r: 0, g: 255, b: 0, a: 0.33 }, { h: 120, w: 0, b: 0, a: 0.33 }],
		[{ r: 0, g: 0, b: 255, a: 0.66 }, { h: 240, w: 0, b: 0, a: 0.66 }],
		[{ r: 207.1875, g: 175.3125, b: 194.4375, a: 0.9 }, { h: 324, w: 68.75000000000001, b: 18.75, a: 0.9 }],
		[{ r: 0, g: 0, b: 0, a: 1 }, { h: 0, w: 0, b: 100, a: 1 }],
		[{ r: 204, g: 0, b: 0, a: 0.8 }, { h: 0, w: 0, b: 20, a: 0.8 }],
		[{ r: 85, g: 127.5, b: 127.5, a: 1 }, { h: 180, w: 33.33333333333334, b: 49.999999999999986, a: 1 }],
		[{ r: 85, g: 128, b: 128, a: 1 }, { h: 180, w: 33.333333333333336, b: 49.80392156862745, a: 1 }],
	])('works', (rgb, hwb) => {
		expect(convertRgbToHwb(rgb)).toEqual(hwb)
	})
})
