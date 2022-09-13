/** @typedef {import('../../types/index').ColorFormat} ColorFormat */
/** @typedef {import('../../types/index').ColorHsl} ColorHsl */
/** @typedef {import('../../types/index').ColorHsv} ColorHsv */
/** @typedef {import('../../types/index').ColorHwb} ColorHwb */
/** @typedef {import('../../types/index').ColorRgb} ColorRgb */

import { describe, test, expect } from 'vitest'

import { detectFormat } from './detect-format.js'

describe('detectFormat', () => {
	test.each(/** @type {[ColorHsl | ColorHsv | ColorHwb | ColorRgb, ColorFormat][]} */ ([
		[{ r: 0.5, g: 0.75, b: 0.125, a: 1 }, 'rgb'],
		[{ h: 0.5, s: 0.75, l: 0.125, a: 1 }, 'hsl'],
		[{ h: 0.5, s: 0.75, v: 0.125, a: 1 }, 'hsv'],
		[{ h: 0.5, w: 0.75, b: 0.125, a: 1 }, 'hwb'],
	]))('work', (color, expectedResult) => {
		expect(detectFormat(color)).toBe(expectedResult)
	})
})
