import { ColorHsl, ColorHsv } from '../../types.js'

/**
 * Converts an HSL color object to an HSV color object.
 *
 * Source: https://github.com/LeaVerou/color.js/blob/2bd19b0a913da3f3310b9d8c1daa859ceb123c37/src/spaces/hsv.js#L30-L42
 */
export function convertHslToHsv (hsl: ColorHsl): ColorHsv {
	const l = hsl.l / 100
	const v = l + hsl.s/100*Math.min(l, 1 - l)
	const s = v === 0 ? 0 : 200*(1 - l/v)

	return {
		h: hsl.h,
		s,
		v: v*100,
		a: hsl.a,
	}
}
