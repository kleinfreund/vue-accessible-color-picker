/** @typedef {import('../../types/index.d').ColorHsl} ColorHsl */
/** @typedef {import('../../types/index.d').ColorHwb} ColorHwb */
/** @typedef {import('../../types/index.d').ColorRgb} ColorRgb */
/** @typedef {import('../../types/index.d').VisibleColorFormat} VisibleColorFormat */

import { round } from './round.js'

/**
 * @typedef {Object} Formatters
 * @property {(color: string, excludeAlphaChannel: boolean) => string} hex
 * @property {(color: ColorHsl, excludeAlphaChannel: boolean) => string} hsl
 * @property {(color: ColorHwb, excludeAlphaChannel: boolean) => string} hwb
 * @property {(color: ColorRgb, excludeAlphaChannel: boolean) => string} rgb
 */

/** @type {Formatters} */
const formatters = {
	/**
	 * @param {string} hex
	 * @param {boolean} excludeAlphaChannel
	 * @returns {string}
	 */
	hex (hex, excludeAlphaChannel) {
		return excludeAlphaChannel && [5, 9].includes(hex.length) ? hex.substring(0, hex.length - (hex.length - 1) / 4) : hex
	},

	/**
	 * @param {ColorHsl} hsl
	 * @param {boolean} excludeAlphaChannel
	 * @returns {string}
	 */
	hsl (hsl, excludeAlphaChannel) {
		const h = round(hsl.h * 360)
		const s = round(hsl.s * 100)
		const l = round(hsl.l * 100)

		return `hsl(${h} ${s}% ${l}%` + (excludeAlphaChannel ? ')' : ` / ${round(hsl.a)})`)
	},

	/**
	 * @param {ColorHwb} hwb
	 * @param {boolean} excludeAlphaChannel
	 * @returns {string}
	 */
	hwb (hwb, excludeAlphaChannel) {
		const h = round(hwb.h * 360)
		const w = round(hwb.w * 100)
		const b = round(hwb.b * 100)

		return `hwb(${h} ${w}% ${b}%` + (excludeAlphaChannel ? ')' : ` / ${round(hwb.a)})`)
	},

	/**
	 * @param {ColorRgb} rgb
	 * @param {boolean} excludeAlphaChannel
	 * @returns {string}
	 */
	rgb (rgb, excludeAlphaChannel) {
		const r = round(rgb.r * 255)
		const g = round(rgb.g * 255)
		const b = round(rgb.b * 255)

		return `rgb(${r} ${g} ${b}` + (excludeAlphaChannel ? ')' : ` / ${round(rgb.a)})`)
	},
}

/**
 * Formats a given color object as a CSS color string.
 *
 * @param {string | ColorHsl | ColorHwb | ColorRgb} color
 * @param {VisibleColorFormat} format
 * @param {boolean} excludeAlphaChannel
 * @returns {string}
 */
export function formatAsCssColor (color, format, excludeAlphaChannel) {
	return formatters[format](color, excludeAlphaChannel)
}
