import { describe, expect, test, vi } from 'vitest'

import { getNewThumbPosition } from './getNewThumbPosition.js'

const el = document.createElement('div')
el.getBoundingClientRect = vi.fn(() => ({
	width: 300,
	height: 180,
	x: 100,
	y: 10,
	top: 10,
	left: 100,
	bottom: 0,
	right: 0,
	toJSON: vi.fn(),
}))

describe('getNewThumbPosition', () => {
	test.each([
		[
			{ clientX: 0, clientY: 0 },
			{ x: 0, y: 100 },
		],
		[
			{ clientX: 1137, clientY: 17 },
			{ x: 100, y: 96.11111111111111 },
		],
		[
			{ clientX: 100, clientY: 20 },
			{ x: 0, y: 94.44444444444444 },
		],
	])('works', ({ clientX, clientY }, expectedThumbPosition) => {
		expect(getNewThumbPosition(el, clientX, clientY)).toEqual(expectedThumbPosition)
	})

	test('handles division by zero edge case', () => {
		const el = document.createElement('div')
		el.getBoundingClientRect = vi.fn(() => ({
			width: 0,
			height: 0,
			x: 1,
			y: 1,
			top: 1,
			left: 1,
			bottom: 1,
			right: 1,
			toJSON: vi.fn(),
		}))
		expect(getNewThumbPosition(el, 1, 1)).toEqual({ x: 0, y: 0 })
	})
})
