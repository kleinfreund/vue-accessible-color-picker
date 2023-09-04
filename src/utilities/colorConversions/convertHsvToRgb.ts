import { ColorHsv, ColorRgb } from '../../types.js'

/**
 * Converts an HSV color object to an RGB color object.
 *
 * Source: https://en.m.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB
 */
export function convertHsvToRgb (hsv: ColorHsv): ColorRgb {
	return {
		r: fn(5, hsv),
		g: fn(3, hsv),
		b: fn(1, hsv),
		a: hsv.a,
	}
}

function fn (n: number, hsv: ColorHsv): number {
	const k = (n + hsv.h * 6) % 6
	return hsv.v - hsv.v * hsv.s * Math.max(0, Math.min(k, 4 - k, 1))
}
