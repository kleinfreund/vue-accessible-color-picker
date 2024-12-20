/**
 * Checks whether two objects are value equal.
 */
export function colorsAreValueEqual<T extends string | Record<string, number>> (colorA: T, colorB: T): boolean {
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
