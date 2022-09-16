import { Component, Plugin } from 'vue'

export type VisibleColorFormat = 'hex' | 'hsl' | 'hwb' | 'rgb'

export type ColorFormat = 'hex' | 'hsl' | 'hsv' | 'hwb' | 'rgb'

export type ColorHsl = {
	h: number
	s: number
	l: number
	a: number
}

export type ColorHsv = {
	h: number
	s: number
	v: number
	a: number
}

export type ColorHwb = {
	h: number
	w: number
	b: number
	a: number
}

export type ColorRgb = {
	r: number
	g: number
	b: number
	a: number
}

export type AlphaChannelProp = 'show' | 'hide'

export type ColorChangeEvent = {
	colors: {
		hex: string
		hsl: ColorHsl
		hsv: ColorHsv
		hwb: ColorHwb
		rgb: ColorRgb
	}
	cssColor: string
}

declare const ColorPicker: Component

export { ColorPicker }

export default Plugin
