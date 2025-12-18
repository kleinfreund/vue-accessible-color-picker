import Color from 'colorjs.io'

export type ColorChangeDetail = {
	/**
	 * The [colorjs.io `Color` object](https://colorjs.io/docs/the-color-object) representing the currently selected color.
	 */
	color: Color

	/**
	 * The currently selected color as a CSS color string formatted based on the active format.
	 */
	cssColor: string
}

export type ColorFormat = 'hex' | 'hsl' | 'hwb' | 'lab' | 'lch' | 'oklab' | 'oklch' | 'srgb'
