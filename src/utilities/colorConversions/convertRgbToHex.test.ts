import { describe, test, expect } from 'vitest'

import { convertRgbToHex } from './convertRgbToHex.js'

describe('convertRgbToHex', () => {
	test.each([
		[{ r: 255, g: 255, b: 255, a: 1 }, '#ffffffff'],
		[{ r: 255, g: 0, b: 0, a: 1 }, '#ff0000ff'],
		[{ r: 0, g: 255, b: 0, a: 0.33 }, '#00ff0054'],
		[{ r: 0, g: 0, b: 255, a: 0.66 }, '#0000ffa8'],
		[{ r: 0, g: 0, b: 0, a: 1 }, '#000000ff'],
		[{ r: 204, g: 0, b: 0, a: 0.8 }, '#cc0000cc'],
		[{ r: 176, g: 0, b: 177, a: 0.20784313725490197 }, '#b000b135'],
	])('works', (rgb, hex) => {
		expect(convertRgbToHex(rgb)).toEqual(hex)
	})
})
