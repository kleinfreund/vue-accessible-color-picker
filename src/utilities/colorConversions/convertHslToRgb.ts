import { ColorHsl, ColorRgb } from '../../types.js'

/**
 * Converts an HSL color object to an RGB color object.
 *
 * Source: https://github.com/LeaVerou/color.js/blob/2bd19b0a913da3f3310b9d8c1daa859ceb123c37/src/spaces/hsl.js#L49-L67
 */
export function convertHslToRgb (hsl: ColorHsl): ColorRgb {
	let h = hsl.h % 360
	if (h < 0) {
		h += 360
	}

	const s = hsl.s/100
	const l = hsl.l/100

	return {
		r: fn(0, h, s, l) * 255,
		g: fn(8, h, s, l) * 255,
		b: fn(4, h, s, l) * 255,
		a: hsl.a,
	}
}

function fn (n: number, h: number, s: number, l: number) {
	const k = (n + h/30) % 12
	const a = s*Math.min(l, 1 - l)

	return l - a*Math.max(-1, Math.min(k - 3, 9 - k, 1))
}
