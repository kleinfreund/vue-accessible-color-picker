import { ColorRgb } from '../../types.js'

/**
 * Converts a HEX color string to an RGB color object.
 *
 * Supports HEX color strings with length 3, 4, 6, and 8.
 */
export function convertHexToRgb (hex: string): ColorRgb {
	const channels: number[] = []

	// Slice hex color string into two characters each.
	// For longhand hex color strings, two characters can be consumed at a time.
	const step = hex.length > 5 ? 2 : 1
	for (let i = 1; i < hex.length; i += step) {
		// Repeat the character twice for shorthand and once for longhand hex color strings.
		const channel = hex.substring(i, i + step).repeat(step % 2 + 1)
		const value = parseInt(channel, 16)
		channels.push(i === 3 * step + 1 ? value / 255 : value)
	}

	if (channels.length === 3) {
		channels.push(1)
	}

	return {
		r: channels[0] as number,
		g: channels[1] as number,
		b: channels[2] as number,
		a: channels[3] as number,
	}
}
