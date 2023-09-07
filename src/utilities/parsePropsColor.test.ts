import { describe, test, expect, vi } from 'vitest'

import { parsePropsColor } from './parsePropsColor.js'

describe('parsePropsColor', () => {
	test.each([
		['rgb(255, 0, 0)', { format: 'rgb', color: { r: 255, g: 0, b: 0, a: 1 } }],
		['rgba(255, 0, 0, 1)', { format: 'rgb', color: { r: 255, g: 0, b: 0, a: 1 } }],
		['rgb(127.5, 0, 255)', { format: 'rgb', color: { r: 127.5, g: 0, b: 255, a: 1 } }],
		['rgb(127.5 0 255)', { format: 'rgb', color: { r: 127.5, g: 0, b: 255, a: 1 } }],
		['rgb(127.5 0 255 / 0.5)', { format: 'rgb', color: { r: 127.5, g: 0, b: 255, a: 0.5 } }],
		['rgb(50% 0% 100% / 0.5)', { format: 'rgb', color: { r: 127.5, g: 0, b: 255, a: 0.5 } }],
		['hsl(255, 0%, 0%)', { format: 'hsl', color: { h: 255, s: 0, l: 0, a: 1 } }],
		['hsla(255, 0%, 0%, 1)', { format: 'hsl', color: { h: 255, s: 0, l: 0, a: 1 } }],
		['hsl(127.5, 0%, 100%)', { format: 'hsl', color: { h: 127.5, s: 0, l: 100, a: 1 } }],
		['hsl(127.5 0% 100%)', { format: 'hsl', color: { h: 127.5, s: 0, l: 100, a: 1 } }],
		['hsl(127.5 0% 100% / 0.5)', { format: 'hsl', color: { h: 127.5, s: 0, l: 100, a: 0.5 } }],
		['hsl(360 0% 100% / 0.5)', { format: 'hsl', color: { h: 0, s: 0, l: 100, a: 0.5 } }],
		[{ r: 127.5, g: 0, b: 255, a: 1 }, { format: 'rgb', color: { r: 127.5, g: 0, b: 255, a: 1 } }],
		[{ h: 127.5, s: 0, l: 255, a: 0.5 }, { format: 'hsl', color: { h: 127.5, s: 0, l: 255, a: 0.5 } }],
		['#1234', { format: 'hex', color: '#1234' }],
		['#12345', null],
		['#123456', { format: 'hex', color: '#123456' }],
		['#12345678', { format: 'hex', color: '#12345678' }],
		['#123456789', null],
	])('parses “%s” correctly', (cssColor, rgbColorString) => {
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
