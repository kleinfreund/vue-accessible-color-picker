import { VisibleColorFormat } from '../types.js'
import { clamp } from './clamp.js'
import { round } from './round.js'

interface CssValueNumberFromOptions {
	/**
	 * Minimum to clamp a number to.
	 *
	 * **Default**: `Number.NEGATIVE_INFINITY`
	 */
	min?: number

	/**
	 * Maximum to clamp a number to.
	 *
	 * **Default**: `Number.POSITIVE_INFINITY`
	 */
	max?: number
}

interface CssValuePercentageFromOptions extends CssValueNumberFromOptions {
	/**
	 * Value to which the percentage is in reference with (e.g. for RGB number values, this would be `255` meaning that `100%` will correspond to 255).
	 *
	 * **Default**: `100`
	 */
	referenceValue?: number
}

type CssValue<
	FromOptions = Record<string, never>,
	ToOptions = Record<string, never>,
> = {
	from: (value: string, options?: FromOptions) => number
	to: (value: number, options?: ToOptions) => string
}

export type CssValueNumber = CssValue<CssValueNumberFromOptions>
export type CssValuePercentage = CssValue<CssValuePercentageFromOptions>

const angleFactor = {
	deg: 1,
	grad: 0.9,
	rad: 180/Math.PI,
	turn: 360,
}

/**
 * Reference: https://www.w3.org/TR/css-color-4/#typedef-alpha-value
 */
export const alpha: CssValueNumber = {
	from (value) {
		if (value.endsWith('%')) {
			return percentage.from(value, { referenceValue: 1 })
		}

		return number.from(value, { min: 0, max: 1 })
	},

	to (value) {
		return number.to(value)
	},
}

/**
 * Reference: https://www.w3.org/TR/css-values-4/#angle-value
 */
export const angle: CssValue = {
	from (value) {
		const match = value.match(/deg|g?rad|turn$/)
		if (match === null) {
			return number.from(value)
		}

		const unit = match[0] as 'deg' | 'grad' | 'rad' | 'turn'
		const numberValue = number.from(value.slice(0, -unit.length))

		return numberValue*angleFactor[unit]
	},

	to (value) {
		return number.to(value)
	},
}

export const number: CssValueNumber = {
	from (value, { min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY } = {}) {
		if (value.endsWith('.')) {
			// Returns `NaN` so we can avoid processing something as a color while the user is making an input. For example, typing "1" and then "." should only commit a color value at the input of "1" but not the input of ".". This allows us to avoid changing the corresponding input element's value while the user is typing.
			return NaN
		}

		return clamp(Number(value), min, max)
	},

	to (value) {
		return round(value, 2)
	},
}

/**
 * Reference: https://www.w3.org/TR/css-values-4/#percentage-value
 */
export const percentage: CssValuePercentage = {
	from (value, { referenceValue = 100, min = 0, max = 100 } = {}) {
		if (!value.endsWith('%')) {
			return NaN
		}

		const numberValue = number.from(value.slice(0, -1), { min, max })

		return numberValue*referenceValue/100
	},

	to (value) {
		return number.to(value) + '%'
	},
}

/**
 * Reference: https://www.w3.org/TR/css-color-4/#funcdef-rgb
 */
export const rgbNumber: CssValue = {
	from (value) {
		if (value.endsWith('%')) {
			return percentage.from(value, { referenceValue: 255 })
		}

		return number.from(value, { min: 0, max: 255 })
	},

	to (value) {
		return number.to(value)
	},
}


const colorChannels: Record<Exclude<VisibleColorFormat, 'hex'>, Record<string, CssValue>> = {
	hsl: {
		h: angle,
		s: percentage,
		l: percentage,
		a: alpha,
	},
	hwb: {
		h: angle,
		w: percentage,
		b: percentage,
		a: alpha,
	},
	rgb: {
		r: rgbNumber,
		g: rgbNumber,
		b: rgbNumber,
		a: alpha,
	},
}

export function getCssValue (format: Exclude<VisibleColorFormat, 'hex'>, channel: string): CssValue {
	return colorChannels[format][channel] as CssValue
}
