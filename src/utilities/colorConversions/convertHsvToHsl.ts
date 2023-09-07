import { ColorHsl, ColorHsv } from '../../types.js'

/**
 * Converts an HSV color object to an HSL color object.
 *
 * Source: https://en.m.wikipedia.org/wiki/HSL_and_HSV#HSV_to_HSL
 */
export function convertHsvToHsl (hsv: ColorHsv): ColorHsl {
	const s = hsv.s/100
	const v = hsv.v/100
	const l = v*(1 - s/2)

	return {
		h: hsv.h,
		s: (l === 0 || l === 1) ? 0 : ((v - l)/Math.min(l, 1 - l)) * 100,
		l: l * 100,
		a: hsv.a,
	}
}
