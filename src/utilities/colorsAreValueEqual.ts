/**
 * Checks whether two objects are value equal.
 */
export function colorsAreValueEqual (colorA: string | Record<string, number>, colorB: string | Record<string, number>): boolean {
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
