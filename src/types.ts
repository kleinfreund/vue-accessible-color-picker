export type AlphaChannelProp = 'show' | 'hide'

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

export type ColorMap = {
	hex: string
	hsl: ColorHsl
	hsv: ColorHsv
	hwb: ColorHwb
	rgb: ColorRgb
}

export type ColorChangeDetail = {
	colors: ColorMap
	cssColor: string
}

export type ColorFormat = 'hex' | 'hsl' | 'hsv' | 'hwb' | 'rgb'
export type VisibleColorFormat = Exclude<ColorFormat, 'hsv'>

export interface ColorPairHex { format: 'hex', color: string }
export interface ColorPairHsl { format: 'hsl', color: ColorHsl }
export interface ColorPairHsv { format: 'hsv', color: ColorHsv }
export interface ColorPairHwb { format: 'hwb', color: ColorHwb }
export interface ColorPairRgb { format: 'rgb', color: ColorRgb }

export type ColorPair = ColorPairHex | ColorPairHsl | ColorPairHsv | ColorPairHwb | ColorPairRgb
export type VisibleColorPair = Exclude<ColorPair, ColorPairHsv>

export interface ColorPickerProps {
	/**
	 * The initially rendered color.
	 */
	color?: string | ColorHsl | ColorHwb | ColorRgb

	/**
	 * The prefix for all ID attribute values used by the color picker.
	 */
	id?: string

	/**
	 * The list of visible color formats.
	 */
	visibleFormats?: VisibleColorFormat[]

	/**
	 * The initially visible color format.
	 */
	defaultFormat?: VisibleColorFormat

	/**
	 * Controls whether the control related to a color’s alpha channel are rendered in the color picker.
	 *
	 * The following settings are available:
	 *
	 * - **show**: Default. The alpha channel range input and the alpha channel value input are rendered.
	 * - **hide**: The alpha channel range input and the alpha channel value input are not rendered. The `color-change` event emits a `cssColor` property without the alpha channel part.
	 */
	alphaChannel?: AlphaChannelProp
}
