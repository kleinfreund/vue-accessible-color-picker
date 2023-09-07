import { VisibleColorFormat } from '../types.js'
import {
	alpha,
	angle,
	CssValue,
	percentage,
	rgbNumber,
} from './CssValues.js'

export const colorChannels: Record<Exclude<VisibleColorFormat, 'hex'>, Record<string, CssValue>> = {
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
