/** @typedef {import('../../types/index').ColorHsl} ColorHsl */
/** @typedef {import('../../types/index').ColorHwb} ColorHwb */
/** @typedef {import('../../types/index').ColorRgb} ColorRgb */
/** @typedef {import('../../types/index').VisibleColorFormat} VisibleColorFormat */

import { describe, test, expect } from 'vitest'

import { formatAsCssColor } from './format-as-css-color.js'

describe('formatAsCssColor', () => {
	test.each(/** @type {[string, VisibleColorFormat, boolean, string][]} */ ([
		['#fff', 'hex', false, '#fff'],
		['#FFF', 'hex', false, '#FFF'],
		['#000', 'hex', false, '#000'],
		['#000000', 'hex', false, '#000000'],
		['#000000aa', 'hex', false, '#000000aa'],
		['#000000aa', 'hex', true, '#000000'],
		['#112233', 'hex', true, '#112233'],
		['#123a', 'hex', true, '#123'],
		['#123', 'hex', true, '#123'],
	]))('works for HEX colors', (color, format, excludeAlphaChannel, cssColorString) => {
		expect(formatAsCssColor(color, format, excludeAlphaChannel)).toEqual(cssColorString)
	})

	test.each(/** @type {[ColorHsl, VisibleColorFormat, boolean, string][]} */ ([
		[{ h: 1, s: 1, l: 0.5, a: 1 }, 'hsl', false, 'hsl(360 100% 50% / 1)'],
		[{ h: 0.75, s: 1, l: 0.5, a: 1 }, 'hsl', false, 'hsl(270 100% 50% / 1)'],
		[{ h: 1, s: 1, l: 0.5, a: 1 }, 'hsl', true, 'hsl(360 100% 50%)'],
		[{ h: 0.75, s: 1, l: 0.5, a: 1 }, 'hsl', true, 'hsl(270 100% 50%)'],
	]))('works for HSL colors', (color, format, excludeAlphaChannel, cssColorString) => {
		expect(formatAsCssColor(color, format, excludeAlphaChannel)).toEqual(cssColorString)
	})

	test.each(/** @type {[ColorHwb, VisibleColorFormat, boolean, string][]} */ ([
		[{ h: 1, w: 1, b: 1, a: 1 }, 'hwb', false, 'hwb(360 100% 100% / 1)'],
		[{ h: 0.75, w: 1, b: 1, a: 1 }, 'hwb', false, 'hwb(270 100% 100% / 1)'],
		[{ h: 1, w: 1, b: 1, a: 1 }, 'hwb', true, 'hwb(360 100% 100%)'],
		[{ h: 0.75, w: 1, b: 1, a: 1 }, 'hwb', true, 'hwb(270 100% 100%)'],
	]))('works for HWB colors', (color, format, excludeAlphaChannel, cssColorString) => {
		expect(formatAsCssColor(color, format, excludeAlphaChannel)).toEqual(cssColorString)
	})

	test.each(/** @type {[ColorRgb, VisibleColorFormat, boolean, string][]} */ ([
		[{ r: 1, g: 1, b: 1, a: 1 }, 'rgb', false, 'rgb(255 255 255 / 1)'],
		[{ r: 1, g: 0, b: 0, a: 1 }, 'rgb', false, 'rgb(255 0 0 / 1)'],
		[{ r: 1, g: 1, b: 1, a: 1 }, 'rgb', true, 'rgb(255 255 255)'],
		[{ r: 1, g: 0, b: 0, a: 1 }, 'rgb', true, 'rgb(255 0 0)'],
		[{ r: 1, g: 0, b: 0, a: 1 }, 'rgb', false, 'rgb(255 0 0 / 1)'],
		[{ r: 1, g: 0, b: 0, a: 1 }, 'rgb', false, 'rgb(255 0 0 / 1)'],
		[{ r: 1, g: 0, b: 0, a: 1 }, 'rgb', false, 'rgb(255 0 0 / 1)'],
		[{ r: 1, g: 0, b: 0, a: 0.333 }, 'rgb', false, 'rgb(255 0 0 / 0.33)'],
		[{ r: 0.5, g: 0.5, b: 0.25, a: 1 }, 'rgb', false, 'rgb(127.5 127.5 63.75 / 1)'],
		[{ r: 0.5, g: 0.75, b: 0.125, a: 1 }, 'rgb', false, 'rgb(127.5 191.25 31.88 / 1)'],
	]))('works for RGB colors', (color, format, excludeAlphaChannel, cssColorString) => {
		expect(formatAsCssColor(color, format, excludeAlphaChannel)).toEqual(cssColorString)
	})
})
