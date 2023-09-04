import { ColorHsv, ColorHwb } from '../../types.js'

/**
 * Converts an HSV color object to an HWB color object.
 */
export function convertHsvToHwb (hsv: ColorHsv): ColorHwb {
	return {
		h: hsv.h,
		w: (1 - hsv.s) * hsv.v,
		b: 1 - hsv.v,
		a: hsv.a,
	}
}
