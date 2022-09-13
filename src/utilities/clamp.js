/**
 * Clamps the given value between the min and max boundaries.
 *
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number} - `value` if `min <= value <= max`
 *                   - `min` if `value < min`
 *                   - `max` if `value > max`
 */
export function clamp (value, min, max) {
	return Math.max(min, Math.min(value, max))
}
