import {
	from8BitDecimal,
	fromAlpha,
	fromHueAngle,
	fromPercentage,
	to8BitDecimal,
	toAlpha,
	toHueAngle,
	toPercentage,
} from './css-values.js'

/** @type {any} */
export const colorChannels = {
	hsl: {
		h: {
			to: toHueAngle,
			from: fromHueAngle,
		},

		s: {
			to: toPercentage,
			from: fromPercentage,
		},

		l: {
			to: toPercentage,
			from: fromPercentage,
		},

		a: {
			to: toAlpha,
			from: fromAlpha,
		},
	},

	hwb: {
		h: {
			to: toHueAngle,
			from: fromHueAngle,
		},

		w: {
			to: toPercentage,
			from: fromPercentage,
		},

		b: {
			to: toPercentage,
			from: fromPercentage,
		},

		a: {
			to: toAlpha,
			from: fromAlpha,
		},
	},

	rgb: {
		r: {
			to: to8BitDecimal,
			from: from8BitDecimal,
		},

		g: {
			to: to8BitDecimal,
			from: from8BitDecimal,
		},

		b: {
			to: to8BitDecimal,
			from: from8BitDecimal,
		},

		a: {
			to: toAlpha,
			from: fromAlpha,
		},
	},
}
