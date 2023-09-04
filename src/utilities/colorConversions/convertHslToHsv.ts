import { ColorHsl, ColorHsv } from '../../types.js'

/**
 * Converts an HSL color object to an HSV color object.
 *
 * Source: https://en.m.wikipedia.org/wiki/HSL_and_HSV#HSL_to_HSV
 */
export function convertHslToHsv (hsl: ColorHsl): ColorHsv {
	const v = hsl.l + hsl.s * Math.min(hsl.l, 1 - hsl.l)
	const s = v === 0 ? 0 : 2 - (2 * hsl.l) / v

	return {
		h: hsl.h,
		s,
		v,
		a: hsl.a,
	}
}
