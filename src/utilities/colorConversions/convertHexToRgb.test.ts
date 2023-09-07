import { describe, test, expect } from 'vitest'

import { convertHexToRgb } from './convertHexToRgb.js'

describe('convertHexToRgb', () => {
	test.each([
		['#fff', { r: 255, g: 255, b: 255, a: 1 }],
		['#ffff', { r: 255, g: 255, b: 255, a: 1 }],
		['#ffffff', { r: 255, g: 255, b: 255, a: 1 }],
		['#ffffffff', { r: 255, g: 255, b: 255, a: 1 }],
		['#f00', { r: 255, g: 0, b: 0, a: 1 }],
		['#f00f', { r: 255, g: 0, b: 0, a: 1 }],
		['#ff0000', { r: 255, g: 0, b: 0, a: 1 }],
		['#ff0000ff', { r: 255, g: 0, b: 0, a: 1 }],
		['#00ff0054', { r: 0, g: 255, b: 0, a: 0.32941176470588235 }],
		['#0000ffa8', { r: 0, g: 0, b: 255, a: 0.6588235294117647 }],
		['#000000ff', { r: 0, g: 0, b: 0, a: 1 }],
		['#cc0000cc', { r: 204, g: 0, b: 0, a: 0.8 }],
		['#B000B135', { r: 176, g: 0, b: 177, a: 0.20784313725490197 }],
	])('works', (hex, rgb) => {
		expect(convertHexToRgb(hex)).toEqual(rgb)
	})
})
