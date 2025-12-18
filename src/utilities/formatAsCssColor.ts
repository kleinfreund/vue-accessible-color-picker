import Color from 'colorjs.io'

import type { ColorFormat } from '../types.js'

/**
 * Formats a given color object as a CSS color string.
 */
export function format (color: Color, { format = 'srgb', alpha = true, collapse = true }: { format?: ColorFormat, alpha?: boolean, collapse?: boolean } = { format: 'srgb', alpha: true, collapse: true }): string {
	const options: Parameters<typeof color.toString>[0] = {
		alpha,
	}

	if (format === 'srgb') {
		// colorjs.io serializes RGB colors using percentage values by default
		options.format = {
			name: 'rgb',
			coords: ['<number>[0, 255]', '<number>[0, 255]', '<number>[0, 255]'],
		}
	} else if (format === 'hex') {
		options.format = 'hex'
		options.collapse = collapse
	}

	const spaceId = 'hex' === format ? 'srgb' : format
	return color.to(spaceId).toString(options).replace(/none/g, '0')
}
