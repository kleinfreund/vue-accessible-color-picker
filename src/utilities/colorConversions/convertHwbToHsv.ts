import { ColorHsv, ColorHwb } from '../../types.js'

/**
 * Converts an HWB color object to an HSV color object.
 *
 * Source: https://github.com/LeaVerou/color.js/blob/2bd19b0a913da3f3310b9d8c1daa859ceb123c37/src/spaces/hwb.js#L34-L51
 */
export function convertHwbToHsv (hwb: ColorHwb): ColorHsv {
	const w = hwb.w/100
	const b = hwb.b/100

	let s
	let v
	const sum = w + b
	if (sum >= 1) {
		s = 0
		v = w/sum
	} else {
		v = 1 - b
		s = (1 - w/v)*100
	}

	return {
		h: hwb.h,
		s,
		v: v*100,
		a: hwb.a,
	}
}
