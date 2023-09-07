import { ColorHsv, ColorHwb } from '../../types.js'

/**
 * Converts an HSV color object to an HWB color object.
 */
export function convertHsvToHwb (hsv: ColorHsv): ColorHwb {
	return {
		h: hsv.h,
		w: hsv.v*(100 - hsv.s)/100,
		b: 100 - hsv.v,
		a: hsv.a,
	}
}
