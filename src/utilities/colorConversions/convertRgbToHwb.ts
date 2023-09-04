import { ColorHwb, ColorRgb } from '../../types.js'

/**
 * Converts an RGB color object to an HWB color object.
 */
export function convertRgbToHwb (rgb: ColorRgb): ColorHwb {
	const min = Math.min(rgb.r, rgb.g, rgb.b)
	const max = Math.max(rgb.r, rgb.g, rgb.b)

	let h
	if (max === min) {
		h = 0
	} else if (max === rgb.r) {
		h = (0 + (rgb.g - rgb.b) / (max - min)) / 6
	} else if (max === rgb.g) {
		h = (2 + (rgb.b - rgb.r) / (max - min)) / 6
	} else {
		h = (4 + (rgb.r - rgb.g) / (max - min)) / 6
	}

	if (h < 0) {
		h += 1
	}

	return {
		h,
		w: min,
		b: 1 - max,
		a: rgb.a,
	}
}
