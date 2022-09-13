/**
 * Checks whether two objects are value equal.
 *
 * @param {string | { [key: string]: number }} colorA
 * @param {string | { [key: string]: number }} colorB
 * @returns {boolean}
 */
export function colorsAreValueEqual (colorA, colorB) {
	if (typeof colorA === 'string' || typeof colorB === 'string') {
		return colorA === colorB
	}

	for (const channelA in colorA) {
		if (colorA[channelA] !== colorB[channelA]) {
			return false
		}
	}

	return true
}
