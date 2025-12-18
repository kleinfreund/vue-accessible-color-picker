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

export type ColorFormat = 'hex' | 'hsl' | 'hwb' | 'lab' | 'lch' | 'oklab' | 'oklch' | 'rgb'

export interface ColorPickerProps {
	/**
	 * The initially rendered color.
	 */
	color?: string | Color

	/**
	 * Takes a function that will be used in place of `window.navigator.clipboard.writeText` when triggering the color picker's copy color functionality (programmatically or via the UI).
	 */
	copy?: (cssColor: string) => Promise<void> | void

	/**
	 * The prefix for all ID attribute values used by the color picker.
	 */
	id?: string

	/**
	 * The list of visible color formats.
	 */
	visibleFormats?: ColorFormat[]

	/**
	 * The initially visible color format.
	 */
	defaultFormat?: ColorFormat

	/**
	 * Controls whether the control related to a color’s alpha channel are rendered in the color picker.
	 *
	 * The following settings are available:
	 *
	 * - **show**: Default. The alpha channel range input and the alpha channel value input are rendered.
	 * - **hide**: The alpha channel range input and the alpha channel value input are not rendered. The `color-change` event emits a `cssColor` property without the alpha channel part.
	 */
	alphaChannel?: 'show' | 'hide'
}
