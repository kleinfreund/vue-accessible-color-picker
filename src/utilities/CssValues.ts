import { clamp } from './clamp.js'

interface CssValue {
	from: (value: string) => number
}

const angleFactor = {
	deg: 1,
	grad: 0.9,
	rad: 180/Math.PI,
	turn: 360,
}

export function createAngle (): CssValue {
	const number = createPercentageNumber(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, 1)

	return {
		from (value) {
			const match = value.match(/deg|g?rad|turn$/)
			if (match === null) {
				return number.from(value)
			}

			const unit = match[0] as 'deg' | 'grad' | 'rad' | 'turn'
			const numberValue = number.from(value.slice(0, -unit.length))

			return numberValue*angleFactor[unit]
		},
	}
}

/**
 * @param min Minimum to clamp a number to.
 * @param max Maximum to clamp a number to.
 * @param referenceValue Value to which the percentage is in reference with (e.g. for RGB number values, this would be `255` meaning that `100%` will correspond to 255).
 */
export function createPercentageNumber (min: number, max: number, referenceValue: number): CssValue {
	return {
		from (value) {
			if (value.endsWith('%')) {
				const valueWithoutPercent = value.slice(0, -1)
				if (valueWithoutPercent.endsWith('.')) {
					// Returns `NaN` so we can avoid processing something as a color while the user is making an input. For example, typing "1" and then "." should only commit a color value at the input of "1" but not the input of ".". This allows us to avoid changing the corresponding input element's value while the user is typing.
					return NaN
				}

				const numberValue = clamp(Number(valueWithoutPercent), 0, 100)
				return numberValue*referenceValue/100
			}

			if (value.endsWith('.')) {
				// Returns `NaN` so we can avoid processing something as a color while the user is making an input. For example, typing "1" and then "." should only commit a color value at the input of "1" but not the input of ".". This allows us to avoid changing the corresponding input element's value while the user is typing.
				return NaN
			}

			return clamp(Number(value), min, max)
		},
	}
}
