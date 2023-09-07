import { describe, test, expect } from 'vitest'

import {
	ColorHsl,
	ColorHwb,
	ColorRgb,
	VisibleColorFormat,
} from '../types.js'
import { formatAsCssColor } from './formatAsCssColor.js'

describe('formatAsCssColor', () => {
	test.each([
		['#fff', 'hex', false, '#fff'],
		['#FFF', 'hex', false, '#FFF'],
		['#000', 'hex', false, '#000'],
		['#000000', 'hex', false, '#000000'],
		['#000000aa', 'hex', false, '#000000aa'],
		['#000000aa', 'hex', true, '#000000'],
		['#112233', 'hex', true, '#112233'],
		['#123a', 'hex', true, '#123'],
		['#123', 'hex', true, '#123'],
	] as [string, VisibleColorFormat, boolean, string][])('works for HEX colors', (color, format, excludeAlphaChannel, cssColorString) => {
		expect(formatAsCssColor(color, format, excludeAlphaChannel)).toEqual(cssColorString)
	})

	test.each([
		[{ h: 360, s: 100, l: 50, a: 1 }, 'hsl', false, 'hsl(360 100% 50% / 1)'],
		[{ h: 270, s: 100, l: 50, a: 1 }, 'hsl', false, 'hsl(270 100% 50% / 1)'],
		[{ h: 360, s: 100, l: 50, a: 1 }, 'hsl', true, 'hsl(360 100% 50%)'],
		[{ h: 270, s: 100, l: 50, a: 1 }, 'hsl', true, 'hsl(270 100% 50%)'],
	] as [ColorHsl, VisibleColorFormat, boolean, string][])('works for HSL colors', (color, format, excludeAlphaChannel, cssColorString) => {
		expect(formatAsCssColor(color, format, excludeAlphaChannel)).toEqual(cssColorString)
	})

	test.each([
		[{ h: 360, w: 100, b: 100, a: 1 }, 'hwb', false, 'hwb(360 100% 100% / 1)'],
		[{ h: 270, w: 100, b: 100, a: 1 }, 'hwb', false, 'hwb(270 100% 100% / 1)'],
		[{ h: 360, w: 100, b: 100, a: 1 }, 'hwb', true, 'hwb(360 100% 100%)'],
		[{ h: 270, w: 100, b: 100, a: 1 }, 'hwb', true, 'hwb(270 100% 100%)'],
	] as [ColorHwb, VisibleColorFormat, boolean, string][])('works for HWB colors', (color, format, excludeAlphaChannel, cssColorString) => {
		expect(formatAsCssColor(color, format, excludeAlphaChannel)).toEqual(cssColorString)
	})

	test.each([
		[{ r: 255, g: 255, b: 255, a: 1 }, 'rgb', false, 'rgb(255 255 255 / 1)'],
		[{ r: 255, g: 0, b: 0, a: 1 }, 'rgb', false, 'rgb(255 0 0 / 1)'],
		[{ r: 255, g: 255, b: 255, a: 1 }, 'rgb', true, 'rgb(255 255 255)'],
		[{ r: 255, g: 0, b: 0, a: 1 }, 'rgb', true, 'rgb(255 0 0)'],
		[{ r: 255, g: 0, b: 0, a: 1 }, 'rgb', false, 'rgb(255 0 0 / 1)'],
		[{ r: 255, g: 0, b: 0, a: 1 }, 'rgb', false, 'rgb(255 0 0 / 1)'],
		[{ r: 255, g: 0, b: 0, a: 1 }, 'rgb', false, 'rgb(255 0 0 / 1)'],
		[{ r: 255, g: 0, b: 0, a: 0.333 }, 'rgb', false, 'rgb(255 0 0 / 0.33)'],
		[{ r: 127.5, g: 127.5, b: 63.75, a: 1 }, 'rgb', false, 'rgb(127.5 127.5 63.75 / 1)'],
		[{ r: 127.5, g: 191.25, b: 31.88, a: 1 }, 'rgb', false, 'rgb(127.5 191.25 31.88 / 1)'],
	] as [ColorRgb, VisibleColorFormat, boolean, string][])('works for RGB colors', (color, format, excludeAlphaChannel, cssColorString) => {
		expect(formatAsCssColor(color, format, excludeAlphaChannel)).toEqual(cssColorString)
	})
})
