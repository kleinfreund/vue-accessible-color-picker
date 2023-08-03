/** @typedef {import('../../types/index.d.js').ColorFormat} ColorFormat */
/** @typedef {import('../../types/index.d.js').ColorHsl} ColorHsl */
/** @typedef {import('../../types/index.d.js').ColorHsv} ColorHsv */
/** @typedef {import('../../types/index.d.js').ColorHwb} ColorHwb */
/** @typedef {import('../../types/index.d.js').ColorRgb} ColorRgb */

import { describe, test, expect, vi } from 'vitest'

import { parsePropsColor } from './parse-props-color.js'

describe('getCssColorAsRgbString', () => {
	test.each(/** @type {[string | ColorHsl | ColorHsv | ColorHwb | ColorRgb, { format: ColorFormat, color: string | ColorHsl | ColorHsv | ColorHwb | ColorRgb } | null][]} */ ([
		['rgb(255, 0, 0)', { format: 'rgb', color: { r: 1, g: 0, b: 0, a: 1 } }],
		['rgba(255, 0, 0, 1)', { format: 'rgb', color: { r: 1, g: 0, b: 0, a: 1 } }],
		['rgb(127.5, 0, 255)', { format: 'rgb', color: { r: 0.5, g: 0, b: 1, a: 1 } }],
		['rgb(127.5 0 255)', { format: 'rgb', color: { r: 0.5, g: 0, b: 1, a: 1 } }],
		['rgb(127.5 0 255 / 0.5)', { format: 'rgb', color: { r: 0.5, g: 0, b: 1, a: 0.5 } }],
		['rgb(50% 0% 100% / 0.5)', { format: 'rgb', color: { r: 0.5, g: 0, b: 1, a: 0.5 } }],
		['hsl(255, 0%, 0%)', { format: 'hsl', color: { h: 0.7083333333333334, s: 0, l: 0, a: 1 } }],
		['hsla(255, 0%, 0%, 1)', { format: 'hsl', color: { h: 0.7083333333333334, s: 0, l: 0, a: 1 } }],
		['hsl(127.5, 0%, 100%)', { format: 'hsl', color: { h: 0.3541666666666667, s: 0, l: 1, a: 1 } }],
		['hsl(127.5 0% 100%)', { format: 'hsl', color: { h: 0.3541666666666667, s: 0, l: 1, a: 1 } }],
		['hsl(127.5 0% 100% / 0.5)', { format: 'hsl', color: { h: 0.3541666666666667, s: 0, l: 1, a: 0.5 } }],
		['hsl(360 0% 100% / 0.5)', { format: 'hsl', color: { h: 0, s: 0, l: 1, a: 0.5 } }],
		[{ r: 0.5, g: 0, b: 1, a: 1 }, { format: 'rgb', color: { r: 0.5, g: 0, b: 1, a: 1 } }],
		[{ h: 0.3541666666666667, s: 0, l: 1, a: 0.5 }, { format: 'hsl', color: { h: 0.3541666666666667, s: 0, l: 1, a: 0.5 } }],
		['#1234', { format: 'hex', color: '#1234' }],
		['#12345', null],
		['#123456', { format: 'hex', color: '#123456' }],
		['#12345678', { format: 'hex', color: '#12345678' }],
		['#123456789', null],
	]))('parses “%s” correctly', (cssColor, rgbColorString) => {
		expect(parsePropsColor(cssColor)).toEqual(rgbColorString)
	})

	test('handles valid named color correctly', () => {
		class FillStyle {
			get fillStyle () {
				return '#663399'
			}

			set fillStyle (_fillStyle) {}
		}
		// @ts-ignore
		vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(() => new FillStyle())

		expect(parsePropsColor('rebeccapurple')).toEqual({ format: 'hex', color: '#663399' })
	})

	test('handles invalid named color correctly', () => {
		class FillStyle {
			get fillStyle () {
				return '#000000'
			}

			set fillStyle (_fillStyle) {}
		}
		// @ts-ignore
		vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(() => new FillStyle())

		expect(parsePropsColor('invalid')).toEqual(null)
	})
})
