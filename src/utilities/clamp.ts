/**
 * Clamps the given value between the min and max boundaries.
 *
 * @returns - `value` if `min <= value <= max`
 *          - `min` if `value < min`
 *          - `max` if `value > max`
 */
export function clamp (value: number, min: number, max: number): number {
	return Math.max(min, Math.min(value, max))
}
