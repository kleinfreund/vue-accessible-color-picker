import Color from 'colorjs.io'

import type { ColorFormat } from '../types.js'

/**
 * Formats a given color object as a CSS color string.
 */
export function serialize (color: Color, { format = 'srgb', alpha = true }: { format?: ColorFormat, alpha?: boolean } = { format: 'srgb', alpha: true }): string {
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
		options.collapse = true
	}

	const spaceId = 'hex' === format ? 'srgb' : format
	return color.to(spaceId).toString(options).replace(/none/g, '0')
}
