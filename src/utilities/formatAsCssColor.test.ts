import Color from 'colorjs.io'
import { describe, test, expect } from 'vitest'

import { format } from './formatAsCssColor.js'

describe('formatAsCssColor', () => {
	test.each<[...Parameters<typeof format>, ReturnType<typeof format>]>([
		[new Color('srgb', [1, 1, 1], 1 ), { format: 'srgb' }, 'rgb(255 255 255 / 1)'],
		[new Color('srgb', [1, 0, 0], 1 ), { format: 'srgb' }, 'rgb(255 0 0 / 1)'],
		[new Color('srgb', [1, 1, 1], 1 ), { format: 'srgb', alpha: false }, 'rgb(255 255 255)'],
		[new Color('srgb', [1, 0, 0], 1 ), { format: 'srgb', alpha: false }, 'rgb(255 0 0)'],
		[new Color('srgb', [1, 0, 0], 1 ), { format: 'srgb' }, 'rgb(255 0 0 / 1)'],
		[new Color('srgb', [1, 0, 0], 1 ), { format: 'srgb' }, 'rgb(255 0 0 / 1)'],
		[new Color('srgb', [1, 0, 0], 1 ), { format: 'srgb' }, 'rgb(255 0 0 / 1)'],
		[new Color('srgb', [1, 0, 0], 0.333 ), { format: 'srgb' }, 'rgb(255 0 0 / 0.333)'],
		[new Color('srgb', [0.5, 0.5, 0.25], 1 ), { format: 'srgb' }, 'rgb(127.5 127.5 63.75 / 1)'],
		[new Color('srgb', [0.5, 0.75, 0.125], 1 ), { format: 'srgb' }, 'rgb(127.5 191.25 31.875 / 1)'],
		[new Color('srgb', [1, 1, 1], 1 ), { format: 'hex' }, '#ffff'],
		[new Color('srgb', [1, 0, 0], 1 ), { format: 'hex' }, '#f00f'],
		[new Color('srgb', [1, 1, 1], 1 ), { format: 'hex', alpha: false }, '#fff'],
		[new Color('srgb', [1, 0, 0], 1 ), { format: 'hex', alpha: false }, '#f00'],
		[new Color('srgb', [1, 1, 1], 1 ), { format: 'hex', collapse: false }, '#ffffffff'],
		[new Color('srgb', [1, 0, 0], 1 ), { format: 'hex', collapse: false }, '#ff0000ff'],
		[new Color('srgb', [1, 1, 1], 1 ), { format: 'hex', alpha: false, collapse: false }, '#ffffff'],
		[new Color('srgb', [1, 0, 0], 1 ), { format: 'hex', alpha: false, collapse: false }, '#ff0000'],
		[new Color('srgb', [1, 1, 1], 1 ), { format: 'hsl' }, 'hsl(0 0% 100% / 1)'],
		[new Color('srgb', [1, 0, 0], 1 ), { format: 'hsl' }, 'hsl(0 100% 50% / 1)'],
		[new Color('srgb', [1, 1, 1], 1 ), { format: 'hsl', alpha: false }, 'hsl(0 0% 100%)'],
		[new Color('srgb', [1, 0, 0], 1 ), { format: 'hsl', alpha: false }, 'hsl(0 100% 50%)'],
		[new Color('srgb', [1, 1, 1], 1 ), { format: 'hwb' }, 'hwb(0 100% 0% / 1)'],
		[new Color('srgb', [1, 0, 0], 1 ), { format: 'hwb' }, 'hwb(0 0% 0% / 1)'],
		[new Color('srgb', [1, 1, 1], 1 ), { format: 'hwb', alpha: false }, 'hwb(0 100% 0%)'],
		[new Color('srgb', [1, 0, 0], 1 ), { format: 'hwb', alpha: false }, 'hwb(0 0% 0%)'],
		[new Color('hsl', [0, 0, 100], 0.8 ), { format: 'hwb' }, 'hwb(0 100% 0% / 0.8)'],
		[new Color('hwb', [0, 100, 0], 0.8 ), { format: 'hsl' }, 'hsl(0 0% 100% / 0.8)'],
	])('works', (color, options, result) => {
		expect(format(color, options)).toEqual(result)
	})
})
