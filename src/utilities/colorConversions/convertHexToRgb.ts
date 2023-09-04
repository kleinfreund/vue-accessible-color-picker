import { ColorRgb } from '../../types.js'

/**
 * Converts a HEX color string to an RGB color object.
 *
 * Supports HEX color strings with length 3, 4, 6, and 8.
 */
export function convertHexToRgb (hex: string): ColorRgb {
	const hexWithoutHash = hex.replace(/^#/, '')

	const channels = []

	// Slice hex color string into two characters each.
	// For longhand hex color strings, two characters can be consumed at a time.
	const step = hexWithoutHash.length > 4 ? 2 : 1
	for (let i = 0; i < hexWithoutHash.length; i += step) {
		const channel = hexWithoutHash.slice(i, i + step)
		// Repeat the character once for shorthand hex color strings.
		channels.push(channel.repeat(step % 2 + 1))
	}

	if (channels.length === 3) {
		channels.push('ff')
	}

	// Okay, TypeScript, let’s agree that we got four elements in that array, alright?
	const rgbChannels = channels.map(channel => parseInt(channel, 16) / 255) as [number, number, number, number]

	return {
		r: rgbChannels[0],
		g: rgbChannels[1],
		b: rgbChannels[2],
		a: rgbChannels[3],
	}
}
