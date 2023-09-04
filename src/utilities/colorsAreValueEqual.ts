/**
 * Checks whether two objects are value equal.
 */
export function colorsAreValueEqual (colorA: string | { [key: string]: number }, colorB: string | { [key: string]: number }): boolean {
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
