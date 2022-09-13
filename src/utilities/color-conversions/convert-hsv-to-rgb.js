/** @typedef {import('../../../types/index').ColorHsv} ColorHsv */
/** @typedef {import('../../../types/index').ColorRgb} ColorRgb */

/**
 * Converts an HSV color object to an RGB color object.
 *
 * Source: https://en.m.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB
 *
 * @param {ColorHsv} hsv
 * @returns {ColorRgb}
 */
export function convertHsvToRgb (hsv) {
	return {
		r: fn(5, hsv),
		g: fn(3, hsv),
		b: fn(1, hsv),
		a: hsv.a,
	}
}

/**
 * @param {number} n
 * @param {ColorHsv} hsv
 * @returns {number}
 */
function fn (n, hsv) {
	const k = (n + hsv.h * 6) % 6
	return hsv.v - hsv.v * hsv.s * Math.max(0, Math.min(k, 4 - k, 1))
}
