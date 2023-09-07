import { clamp } from './clamp.js'
import { round } from './round.js'

export function fromHueAngle (value: string): number {
	if (value.endsWith('.')) {
		return NaN
	}

	// Maps the angle to the range [0, 360] (e.g. -30 becomes 330, 385 becomes 15, etc).
	return ((parseFloat(value) % 360) + 360) % 360
}

export function toHueAngle (value: number): string {
	return round(value, 2)
}

export function fromPercentage (value: string): number {
	if (!value.endsWith('%')) {
		return NaN
	}

	const numberString = value.substring(0, value.length - 1)

	if (numberString.endsWith('.')) {
		return NaN
	}

	const numberValue = parseFloat(numberString)

	if (Number.isNaN(numberValue)) {
		return NaN
	}

	return clamp(numberValue, 0, 100)
}

export function toPercentage (value: number): string {
	return round(value, 2) + '%'
}

export function from8BitDecimal (value: string): number {
	if (value.endsWith('%')) {
		return fromPercentage(value)/100*255
	}

	if (value.endsWith('.')) {
		return NaN
	}

	const numberValue = parseFloat(value)

	if (Number.isNaN(numberValue)) {
		return NaN
	}

	return clamp(numberValue, 0, 255)
}

export function to8BitDecimal (value: number): string {
	return round(value, 2)
}

export function fromAlpha (value: string): number {
	if (value.endsWith('%')) {
		return fromPercentage(value)/100
	} else {
		return clamp(parseFloat(value), 0, 1)
	}
}

export function toAlpha (value: number): string {
	return String(value)
}
