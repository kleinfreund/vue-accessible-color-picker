import { describe, test, expect, vi } from 'vitest'

import { parsePropsColor } from './parsePropsColor.js'

describe('parsePropsColor', () => {
	test.each([
		['rgb(255, 0, 0)', { format: 'rgb', color: { r: 255, g: 0, b: 0, a: 1 } }],
		['rgb(255,0,0)', { format: 'rgb', color: { r: 255, g: 0, b: 0, a: 1 } }],
		['rgba(255, 0, 0, 1)', { format: 'rgb', color: { r: 255, g: 0, b: 0, a: 1 } }],
		['rgba(255,0,0,1)', { format: 'rgb', color: { r: 255, g: 0, b: 0, a: 1 } }],
		['rgba(  255,  0,  0,  1  )', { format: 'rgb', color: { r: 255, g: 0, b: 0, a: 1 } }],
		['rgb(127.5, 0, 255)', { format: 'rgb', color: { r: 127.5, g: 0, b: 255, a: 1 } }],
		['rgb(127.5 0 255)', { format: 'rgb', color: { r: 127.5, g: 0, b: 255, a: 1 } }],
		['rgb(127.5 0 255 / 0.5)', { format: 'rgb', color: { r: 127.5, g: 0, b: 255, a: 0.5 } }],
		['rgb(50% 0% 100% / 0.5)', { format: 'rgb', color: { r: 127.5, g: 0, b: 255, a: 0.5 } }],
		['hsl(255, 0%, 0%)', { format: 'hsl', color: { h: 255, s: 0, l: 0, a: 1 } }],
		['hsla(255, 0%, 0%, 1)', { format: 'hsl', color: { h: 255, s: 0, l: 0, a: 1 } }],
		['hsl(127.5, 0%, 100%)', { format: 'hsl', color: { h: 127.5, s: 0, l: 100, a: 1 } }],
		['hsl(127.5 0% 100%)', { format: 'hsl', color: { h: 127.5, s: 0, l: 100, a: 1 } }],
		['hsl(127.5 0% 100% / 0.5)', { format: 'hsl', color: { h: 127.5, s: 0, l: 100, a: 0.5 } }],
		['hsl(360 0% 100% / 0.5)', { format: 'hsl', color: { h: 360, s: 0, l: 100, a: 0.5 } }],
		['hsl(90deg 0% 100% / 0.5)', { format: 'hsl', color: { h: 90, s: 0, l: 100, a: 0.5 } }],
		['hsl(100grad 0% 100% / 0.5)', { format: 'hsl', color: { h: 90, s: 0, l: 100, a: 0.5 } }],
		['hsl(1.5707963267948966rad 0% 100% / 0.5)', { format: 'hsl', color: { h: 90, s: 0, l: 100, a: 0.5 } }],
		['hsl(0.25turn 0% 100% / 0.5)', { format: 'hsl', color: { h: 90, s: 0, l: 100, a: 0.5 } }],
		['lab(100% 62.5 0 / 0.5)', null],
		['lch(50% 75 180 / 0.5)', null],
		[{ r: 127.5, g: 0, b: 255, a: 1 }, { format: 'rgb', color: { r: 127.5, g: 0, b: 255, a: 1 } }],
		[{ h: 127.5, s: 0, l: 255, a: 0.5 }, { format: 'hsl', color: { h: 127.5, s: 0, l: 255, a: 0.5 } }],
		[{ l: 100, aAxis: 62.5, bAxis: 0, a: 0.5 }, null],
		[{ l: 50, c: 75, h: 180, a: 0.5 }, null],
		['#', null],
		['#1', null],
		['#12', null],
		['#123', { format: 'hex', color: '#123' }],
		['#1234', { format: 'hex', color: '#1234' }],
		['#12345', null],
		['#123456', { format: 'hex', color: '#123456' }],
		['#1234567', null],
		['#12345678', { format: 'hex', color: '#12345678' }],
		['#123456789', null],
		['bla(1 1 1 / 1)', null],
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
