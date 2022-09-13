import { describe, test, expect } from 'vitest'

import { convertRgbToHwb } from './convert-rgb-to-hwb.js'

describe('convertRgbToHwb', () => {
	test.each([
		[{ r: 1, g: 1, b: 1, a: 1 }, { h: 0, w: 1, b: 0, a: 1 }],
		[{ r: 1, g: 0, b: 0, a: 1 }, { h: 0, w: 0, b: 0, a: 1 }],
		[{ r: 0, g: 1, b: 0, a: 0.33 }, { h: 0.3333333333333333, w: 0, b: 0, a: 0.33 }],
		[{ r: 0, g: 0, b: 1, a: 0.66 }, { h: 0.6666666666666666, w: 0, b: 0, a: 0.66 }],
		[{ r: 0.8125, g: 0.6875, b: 0.7625, a: 0.9 }, { h: 0.9, w: 0.6875, b: 0.1875, a: 0.9 }],
		[{ r: 0, g: 0, b: 0, a: 1 }, { h: 0, w: 0, b: 1, a: 1 }],
		[{ r: 0.8, g: 0, b: 0, a: 0.8 }, { h: 0, w: 0, b: 0.19999999999999996, a: 0.8 }],
	])('works', (rgbColor, hwbColor) => {
		expect(convertRgbToHwb(rgbColor)).toEqual(hwbColor)
	})
})
