/** @typedef {import('../../types/index').ColorFormat} ColorFormat */
/** @typedef {import('../../types/index').ColorHsl} ColorHsl */
/** @typedef {import('../../types/index').ColorHsv} ColorHsv */
/** @typedef {import('../../types/index').ColorHwb} ColorHwb */
/** @typedef {import('../../types/index').ColorRgb} ColorRgb */

/**
 * Lazy function that returns the format of a given color object.
 *
 * Doesn’t handle invalid formats.
 *
 * @param {ColorHsl | ColorHsv | ColorHwb | ColorRgb} color
 * @returns {ColorFormat}
 */
export function detectFormat (color) {
	if (Object.prototype.hasOwnProperty.call(color, 'r')) {
		return 'rgb'
	} else if (Object.prototype.hasOwnProperty.call(color, 'w')) {
		return 'hwb'
	} else if (Object.prototype.hasOwnProperty.call(color, 'v')) {
		return 'hsv'
	} else {
		return 'hsl'
	}
}
