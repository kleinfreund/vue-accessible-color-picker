import { ColorHsl, ColorHsv } from '../../types.js'

/**
 * Converts an HSV color object to an HSL color object.
 *
 * Source: https://en.m.wikipedia.org/wiki/HSL_and_HSV#HSV_to_HSL
 */
export function convertHsvToHsl (hsv: ColorHsv): ColorHsl {
	const l = hsv.v - (hsv.v * hsv.s) / 2
	const lMin = Math.min(l, 1 - l)
	const s = lMin === 0 ? 0 : (hsv.v - l) / lMin

	return {
		h: hsv.h,
		s,
		l,
		a: hsv.a,
	}
}
