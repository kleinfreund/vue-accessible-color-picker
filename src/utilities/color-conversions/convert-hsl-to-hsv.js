/** @typedef {import('../../../types/index.d.js').ColorHsl} ColorHsl */
/** @typedef {import('../../../types/index.d.js').ColorHsv} ColorHsv */

/**
 * Converts an HSL color object to an HSV color object.
 *
 * Source: https://en.m.wikipedia.org/wiki/HSL_and_HSV#HSL_to_HSV
 *
 * @param {ColorHsl} hsl
 * @returns {ColorHsv}
 */
export function convertHslToHsv (hsl) {
	const v = hsl.l + hsl.s * Math.min(hsl.l, 1 - hsl.l)
	const s = v === 0 ? 0 : 2 - (2 * hsl.l) / v

	return {
		h: hsl.h,
		s,
		v,
		a: hsl.a,
	}
}
