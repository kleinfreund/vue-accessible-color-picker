/** @typedef {import('../../../types/index').ColorHsl} ColorHsl */
/** @typedef {import('../../../types/index').ColorRgb} ColorRgb */

import { convertRgbToHwb } from './convert-rgb-to-hwb.js'

/**
 * Converts an RGB color object to an HSL color object.
 *
 * Source: https://en.m.wikipedia.org/wiki/HSL_and_HSV#RGB_to_HSL_and_HSV
 *
 * @param {ColorRgb} rgb
 * @returns {ColorHsl}
 */
export function convertRgbToHsl (rgb) {
	const hwb = convertRgbToHwb(rgb)
	const min = hwb.w
	const max = 1 - hwb.b

	const l = (max + min) / 2

	let s
	if (max === 0 || min === 1) {
		s = 0
	} else {
		s = (max - l) / Math.min(l, 1 - l)
	}

	return {
		h: hwb.h,
		s,
		l,
		a: rgb.a,
	}
}
