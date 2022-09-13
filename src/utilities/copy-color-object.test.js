import { describe, test, expect } from 'vitest'

import { copyColorObject } from './copy-color-object.js'

describe('copyColorObject', () => {
	test.each(/** @type {[any][]} */ ([
		[{ h: 0.75, s: 1, l: 0.5, a: 1 }],
		[{ h: 0.75, s: 1, v: 0.5, a: 1 }],
		[{ h: 0.75, w: 1, b: 1, a: 1 }],
		[{ r: 0.5, g: 0.75, b: 0.125, a: 1 }],
	]))('works', (color) => {
		expect(copyColorObject(color)).toEqual(color)
	})

	test('doesn’t mutate original', () => {
		const color = { r: 0.5, g: 0.75, b: 0.125, a: 1 }
		const colorCopy = copyColorObject(color)
		colorCopy.a = 2
		expect(color.a).toBe(1)
		expect(colorCopy.a).toBe(2)
	})
})
