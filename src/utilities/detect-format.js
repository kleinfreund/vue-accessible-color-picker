/** @typedef {import('../../types/index.d').ColorFormat} ColorFormat */
/** @typedef {import('../../types/index.d').ColorHsl} ColorHsl */
/** @typedef {import('../../types/index.d').ColorHsv} ColorHsv */
/** @typedef {import('../../types/index.d').ColorHwb} ColorHwb */
/** @typedef {import('../../types/index.d').ColorRgb} ColorRgb */

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
