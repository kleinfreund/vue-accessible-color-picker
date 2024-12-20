import { VisibleColorPair } from '../types.js'
import { alpha, getCssValue } from './CssValues.js'

/**
 * Formats a given color object as a CSS color string.
 */
export function formatAsCssColor ({ format, color }: VisibleColorPair, excludeAlphaChannel: boolean): string {
	if (format === 'hex') {
		return excludeAlphaChannel && [5, 9].includes(color.length)
			? color.substring(0, color.length - (color.length - 1)/4)
			: color
	}

	const parameters = Object.entries(color)
		.slice(0, excludeAlphaChannel ? 3 : 4)
		.map(([channel, value]) => {
			const cssValue = channel === 'a' ? alpha : getCssValue(format, channel)
			return (channel === 'a' ? '/ ' : '') + cssValue.to(value)
		})

	return `${format}(${parameters.join(' ')})`
}
