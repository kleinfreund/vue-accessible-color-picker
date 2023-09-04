import { ColorRgb } from '../../types.js'

/**
 * Converts an RGB color object to an HEX color string.
 */
export function convertRgbToHex (rgb: ColorRgb): string {
	const hexChannels = Object.values(rgb).map((channel) => {
		const int = channel * 255
		const hex = Math.round(int).toString(16)
		return hex.length === 1 ? '0' + hex : hex
	})

	return '#' + hexChannels.join('')
}
