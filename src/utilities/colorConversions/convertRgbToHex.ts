import { ColorRgb } from '../../types.js'

/**
 * Converts an RGB color object to an HEX color string.
 */
export function convertRgbToHex (rgb: ColorRgb): string {
	return '#' + Object.values(rgb)
		.map((channel, i) => Math.round(i === 3 ? channel * 255 : channel).toString(16).padStart(2, '0'))
		.join('')
}
