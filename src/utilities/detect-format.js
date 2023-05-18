/** @typedef {import('../../types/index.d.js').ColorFormat} ColorFormat */
/** @typedef {import('../../types/index.d.js').ColorHsl} ColorHsl */
/** @typedef {import('../../types/index.d.js').ColorHsv} ColorHsv */
/** @typedef {import('../../types/index.d.js').ColorHwb} ColorHwb */
/** @typedef {import('../../types/index.d.js').ColorRgb} ColorRgb */

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
