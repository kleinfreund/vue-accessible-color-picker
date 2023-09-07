import {
	ColorHsl,
	ColorHwb,
	ColorRgb,
	VisibleColorFormat,
} from '../types.js'
import { round } from './round.js'

type Formatters = {
	hex: (color: string, excludeAlphaChannel: boolean) => string
	hsl: (color: ColorHsl, excludeAlphaChannel: boolean) => string
	hwb: (color: ColorHwb, excludeAlphaChannel: boolean) => string
	rgb: (color: ColorRgb, excludeAlphaChannel: boolean) => string
}

const formatters: Formatters = {
	hex (hex: string, excludeAlphaChannel: boolean): string {
		return excludeAlphaChannel && [5, 9].includes(hex.length) ? hex.substring(0, hex.length - (hex.length - 1) / 4) : hex
	},

	hsl (hsl: ColorHsl, excludeAlphaChannel: boolean): string {
		const h = round(hsl.h, 2)
		const s = round(hsl.s, 2)
		const l = round(hsl.l, 2)

		return `hsl(${h} ${s}% ${l}%` + (excludeAlphaChannel ? ')' : ` / ${round(hsl.a, 2)})`)
	},

	hwb (hwb: ColorHwb, excludeAlphaChannel: boolean): string {
		const h = round(hwb.h, 2)
		const w = round(hwb.w, 2)
		const b = round(hwb.b, 2)

		return `hwb(${h} ${w}% ${b}%` + (excludeAlphaChannel ? ')' : ` / ${round(hwb.a, 2)})`)
	},

	rgb (rgb: ColorRgb, excludeAlphaChannel: boolean): string {
		const r = round(rgb.r, 2)
		const g = round(rgb.g, 2)
		const b = round(rgb.b, 2)

		return `rgb(${r} ${g} ${b}` + (excludeAlphaChannel ? ')' : ` / ${round(rgb.a, 2)})`)
	},
}

/**
 * Formats a given color object as a CSS color string.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatAsCssColor (color: any, format: VisibleColorFormat, excludeAlphaChannel: boolean): string {
	return formatters[format](color, excludeAlphaChannel)
}
