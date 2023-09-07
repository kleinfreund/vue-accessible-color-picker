import { ColorHsl, ColorRgb } from '../../types.js'

/**
 * Converts an RGB color object to an HSL color object.
 *
 * Source: https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB
 */
export function convertRgbToHsl (rgb: ColorRgb): ColorHsl {
	const { r, g, b, a } = rgb
	const min = Math.min(r, g, b)
	const max = Math.max(r, g, b)
	const chroma = max - min
	const l = (max + min)/2

	let h = 0
	if (chroma !== 0) {
		if (max === r) {
			h = (g - b)/chroma + (g < b ? 6 : 0)
		} else if (max === g) {
			h = (b - r)/chroma + 2
		} else if (max === b) {
			h = (r - g)/chroma + 4
		}

		h *= 60
	}

	let s = 0
	if (l !== 0 && l !== 255) {
		s = (max - l)/Math.min(l, 255 - l)
	}

	return {
		h,
		s: s*100,
		l: l/255*100,
		a,
	}
}
