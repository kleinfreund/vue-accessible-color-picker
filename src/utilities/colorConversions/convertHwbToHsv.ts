import { ColorHsv, ColorHwb } from '../../types.js'

/**
 * Converts an HWB color object to an HSV color object.
 */
export function convertHwbToHsv (hwb: ColorHwb): ColorHsv {
	return {
		h: hwb.h,
		s: hwb.b === 1 ? 0 : 1 - hwb.w / (1 - hwb.b),
		v: 1 - hwb.b,
		a: hwb.a,
	}
}
