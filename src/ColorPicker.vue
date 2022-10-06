<template>
	<div
		ref="colorPicker"
		class="vacp-color-picker"
	>
		<div
			ref="colorSpace"
			class="vacp-color-space"
			@mousedown="startMovingThumbWithMouse"
			@touchstart="startMovingThumbWithTouch"
		>
			<!-- Accessibility remark: I don’t know of a better, semantic HTML element that would be adequate for the job of a planar range thumb. -->
			<div
				ref="thumb"
				class="vacp-color-space-thumb"
				tabindex="0"
				aria-label="Color space thumb"
				@keydown="moveThumbWithArrows"
			/>
		</div>

		<div class="vacp-range-input-group">
			<label
				class="vacp-range-input-label vacp-range-input-label--hue"
				:for="`${id}-hue-slider`"
			>
				<span class="vacp-range-input-label-text vacp-range-input-label-text--hue">
					<slot name="hue-range-input-label">Hue</slot>
				</span>

				<input
					:id="`${id}-hue-slider`"
					class="vacp-range-input vacp-range-input--hue"
					:value="colors.hsv.h * 360"
					type="range"
					min="0"
					max="360"
					step="1"
					@keydown.passive="changeInputValue"
					@input="handleSliderInput($event, 'h')"
				>
			</label>

			<label
				v-if="alphaChannel === 'show'"
				class="vacp-range-input-label vacp-range-input-label--alpha"
				:for="`${id}-alpha-slider`"
			>
				<span class="vacp-range-input-label-text vacp-range-input-label-text--alpha">
					<slot name="alpha-range-input-label">Alpha</slot>
				</span>

				<input
					:id="`${id}-alpha-slider`"
					class="vacp-range-input vacp-range-input--alpha"
					:value="colors.hsv.a * 100"
					type="range"
					min="0"
					max="100"
					step="1"
					@keydown.passive="changeInputValue"
					@input="handleSliderInput($event, 'a')"
				>
			</label>
		</div>

		<button
			class="vacp-copy-button"
			type="button"
			@click="copyColor"
		>
			<slot name="copy-button">
				Copy color
			</slot>
		</button>

		<div class="vacp-color-inputs">
			<div class="vacp-color-input-group">
				<label
					v-if="activeFormat === 'hex'"
					class="vacp-color-input-label"
					:for="`${id}-color-hex`"
				>
					<span class="vacp-color-input-label-text">
						Hex
					</span>

					<input
						:id="`${id}-color-hex`"
						class="vacp-color-input"
						type="text"
						:value="hexInputValue"
						@input="updateHexColorValue($event)"
					>
				</label>

				<label
					v-for="channel in visibleChannels"
					v-else
					:id="`${id}-color-${activeFormat}-${channel}`"
					:key="`${id}-color-${activeFormat}-${channel}`"
					class="vacp-color-input-label"
					:for="`${id}-color-${activeFormat}`"
					@input="updateColorValue($event, channel)"
				>
					<span class="vacp-color-input-label-text">
						{{ channel.toUpperCase() }}
					</span>

					<input
						:id="`${id}-color-${activeFormat}`"
						class="vacp-color-input"
						type="text"
						:value="getChannelAsCssValue(activeFormat, channel)"
						@input="updateColorValue($event, channel)"
					>
				</label>
			</div>

			<button
				v-if="visibleFormats.length > 1"
				class="vacp-format-switch-button"
				type="button"
				@click="switchFormat"
			>
				<slot name="format-switch-button">
					Switch format
				</slot>
			</button>
		</div>
	</div>
</template>

<script setup>
/**
 * @typedef {import('vue').ComputedRef<T>} ComputedRef<T>
 * @template T
 */
/**
 * @typedef {import('vue').PropType<T>} PropType<T>
 * @template T
 */
/**
 * @typedef {import('vue').Ref<T>} Ref<T>
 * @template T
 */
/**
 * @typedef {import('vue').UnwrapRef<T>} UnwrapRef<T>
 * @template T
 */
/** @typedef {import('../types/index').AlphaChannelProp} AlphaChannelProp */
/** @typedef {import('../types/index').ColorChangeEvent} ColorChangeEvent */
/** @typedef {import('../types/index').ColorFormat} ColorFormat */
/** @typedef {import('../types/index').ColorHsl} ColorHsl */
/** @typedef {import('../types/index').ColorHsv} ColorHsv */
/** @typedef {import('../types/index').ColorHwb} ColorHwb */
/** @typedef {import('../types/index').ColorRgb} ColorRgb */
/** @typedef {import('../types/index').VisibleColorFormat} VisibleColorFormat */

import {
	computed,
	onBeforeUnmount,
	onMounted,
	reactive,
	ref,
	watch,
} from 'vue'

import { clamp } from './utilities/clamp.js'
import { colorChannels } from './utilities/color-channels.js'
import { colorsAreValueEqual } from './utilities/colors-are-value-equal.js'
import { conversions } from './utilities/conversions.js'
import { copyColorObject } from './utilities/copy-color-object.js'
import { formatAsCssColor } from './utilities/format-as-css-color.js'
import { isValidHexColor } from './utilities/is-valid-hex-color.js'
import { parsePropsColor } from './utilities/parse-props-color.js'
import { ALLOWED_VISIBLE_FORMATS, ALPHA_CHANNEL_PROP_VALUES, RANGE_INPUT_STEP_FACTOR } from './constants.js'

const props = defineProps({
	/**
	 * The initially rendered color.
	 */
	color: {
		type: /** @type {PropType<string | ColorHsl | ColorHsv | ColorHwb | ColorRgb>} */ ([String, Object]),
		required: false,
		default: '#ffffffff',
	},

	/**
	 * The prefix for all ID attribute values used by the color picker.
	 */
	id: {
		type: String,
		required: false,
		default: 'color-picker',
	},

	/**
	 * The list of visible color formats.
	 */
	visibleFormats: {
		type: /** @type {PropType<VisibleColorFormat[]>} */ (Array),
		required: false,
		default: () => ALLOWED_VISIBLE_FORMATS,
		validator (/** @type {any[]} */ visibleFormats) {
			return visibleFormats.length > 0 && visibleFormats.every((format) => ALLOWED_VISIBLE_FORMATS.includes(format))
		},
	},

	/**
	 * The initially visible color format. Default: `'hsl'`.
	 */
	defaultFormat: {
		type: /** @type {PropType<VisibleColorFormat>} */ (String),
		required: false,
		default: 'hsl',
		validator (/** @type {VisibleColorFormat} */ defaultFormat) {
			return ALLOWED_VISIBLE_FORMATS.includes(defaultFormat)
		},
	},

	/**
	 * Controls whether the control related to a color’s alpha channel are rendered in the color picker.
	 *
	 * The following settings are available:
	 *
	 * - **show**: Default. The alpha channel range input and the alpha channel value input are rendered.
	 * - **hide**: The alpha channel range input and the alpha channel value input are not rendered. The `color-change` event emits a `cssColor` property without the alpha channel part.
	 */
	alphaChannel: {
		type: /** @type {PropType<AlphaChannelProp>} */ (String),
		required: false,
		default: 'show',
		validator (/** @type {string} */ alphaChannel) {
			return ALPHA_CHANNEL_PROP_VALUES.includes(alphaChannel)
		},
	},
})

const emit = defineEmits(['color-change'])

/**
 * The root element of the color picker.
 */
const colorPicker = /** @type {Ref<HTMLElement | null>} */ (ref(null))

/**
 * The color space. It represents the saturation and lightness or the current color’s hue.
 */
const colorSpace = /** @type {Ref<HTMLElement | null>} */ (ref(null))

/**
 * The color space thumb. Can be dragged around within the color space to change a color’s saturation and lightness.
 */
const thumb = /** @type {Ref<HTMLElement | null>} */ (ref(null))

/**
 * Tracks whether a pointer originated from within the color space.
 *
 * Only if it did do we want to run the logic of dragging the color space thumb around.
 */
const pointerOriginatedInColorSpace = ref(false)

/**
 * The currently visible color format (i.e. what’s cycled through using the “Switch format” button).
 */
const activeFormat = /** @type {Ref<VisibleColorFormat>} */ (ref(props.defaultFormat))

/**
 * The current color represented in all supported color formats.
 */
const colors = /** @type {UnwrapRef<any>} */ (reactive({
	hex: '#ffffffff',
	hsl: { h: 0, s: 0, l: 1, a: 1 },
	hsv: { h: 0, s: 0, v: 1, a: 1 },
	hwb: { h: 0, w: 1, b: 0, a: 1 },
	rgb: { r: 1, g: 1, b: 1, a: 1 },
}))

/**
 * A list of color channels rendered as part of the color picker.
 */
const visibleChannels = computed(function () {
	const allChannels = Object.keys(colors[activeFormat.value])
	return activeFormat.value !== 'hex' && props.alphaChannel === 'hide'
		? allChannels.slice(0, 3)
		: allChannels
})

/**
 * Input value of the color `input` element for the hexadecimal representation of the current color.
 *
 * @type {ComputedRef<string>}
 */
const hexInputValue = computed(function () {
	return props.alphaChannel === 'hide' && [5, 9].includes(colors.hex.length)
		? colors.hex.substring(0, colors.hex.length - (colors.hex.length - 1) / 4)
		: colors.hex
})

watch(() => props.color, setColorFromProp)

onMounted(function () {
	document.addEventListener('mousemove', moveThumbWithMouse, { passive: false })
	document.addEventListener('touchmove', moveThumbWithTouch, { passive: false })
	document.addEventListener('mouseup', stopMovingThumb)
	document.addEventListener('touchend', stopMovingThumb)

	setColorFromProp(props.color)
})

onBeforeUnmount(function () {
	document.removeEventListener('mousemove', moveThumbWithMouse)
	document.removeEventListener('touchmove', moveThumbWithTouch)
	document.removeEventListener('mouseup', stopMovingThumb)
	document.removeEventListener('touchend', stopMovingThumb)
})

/**
 * Sets the next active color format by cycling through the visible color formats.
 */
function switchFormat () {
	const activeFormatIndex = props.visibleFormats.findIndex((format) => format === activeFormat.value)
	const newFormatIndex = (activeFormatIndex + 1) % props.visibleFormats.length
	activeFormat.value = /** @type {VisibleColorFormat} */ (props.visibleFormats[newFormatIndex])
}

/**
 * @param {MouseEvent} event
 */
function startMovingThumbWithMouse (event) {
	pointerOriginatedInColorSpace.value = true
	moveThumbWithMouse(event)
}

/**
 * @param {TouchEvent} event
 */
function startMovingThumbWithTouch (event) {
	pointerOriginatedInColorSpace.value = true
	moveThumbWithTouch(event)
}

function stopMovingThumb () {
	pointerOriginatedInColorSpace.value = false
}

/**
 * @param {MouseEvent} event
 */
function moveThumbWithMouse (event) {
	if (
		event.buttons !== 1 ||
		pointerOriginatedInColorSpace.value === false ||
		!(colorSpace.value instanceof HTMLElement)
	) {
		return
	}

	moveThumb(colorSpace.value, event.clientX, event.clientY)
}

/**
 * @param {TouchEvent} event
 */
function moveThumbWithTouch (event) {
	if (
		pointerOriginatedInColorSpace.value === false ||
		!(colorSpace.value instanceof HTMLElement)
	) {
		return
	}

	// Prevents touch events from dragging the page.
	event.preventDefault()

	const touchPoint = /** @type {Touch} */ (event.touches[0])
	moveThumb(colorSpace.value, touchPoint.clientX, touchPoint.clientY)
}

/**
 * @param {HTMLElement} colorSpace
 * @param {number} clientX
 * @param {number} clientY
 */
function moveThumb (colorSpace, clientX, clientY) {
	const newThumbPosition = getNewThumbPosition(colorSpace, clientX, clientY)
	const hsvColor = copyColorObject(colors.hsv)
	hsvColor.s = newThumbPosition.x
	hsvColor.v = newThumbPosition.y

	setColor('hsv', hsvColor)
}

/**
 * @param {KeyboardEvent} event
 */
function moveThumbWithArrows (event) {
	if (!['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].includes(event.key)) {
		return
	}

	event.preventDefault()
	const direction = ['ArrowLeft', 'ArrowDown'].includes(event.key) ? -1 : 1
	const channel = ['ArrowLeft', 'ArrowRight'].includes(event.key) ? 's' : 'v'
	const step = event.shiftKey ? RANGE_INPUT_STEP_FACTOR : 1
	const newColorValue = colors.hsv[channel] + direction * step * 0.01
	const hsvColor = copyColorObject(colors.hsv)
	hsvColor[channel] = clamp(newColorValue, 0, 1)

	setColor('hsv', hsvColor)
}

/**
 * @param {string | ColorHsl | ColorHsv | ColorHwb | ColorRgb} propsColor
 */
function setColorFromProp (propsColor) {
	const result = parsePropsColor(propsColor)
	if (result !== null) {
		setColor(result.format, result.color)
	}
}

/**
 * @param {Event} event
 * @param {'h' | 'a'} channel
 */
function handleSliderInput (event, channel) {
	const input = /** @type {HTMLInputElement} */ (event.currentTarget)
	const hsvColor = copyColorObject(colors.hsv)
	hsvColor[channel] = parseInt(input.value) / parseInt(input.max)

	setColor('hsv', hsvColor)
}

/**
 * @param {Event} event
 */
function updateHexColorValue (event) {
	const input = /** @type {HTMLInputElement} */ (event.target)

	if (isValidHexColor(input.value)) {
		setColor('hex', input.value)
	}
}

/**
 * @param {Event} event
 * @param {string} channel
 */
function updateColorValue (event, channel) {
	const input = /** @type {HTMLInputElement} */ (event.target)

	const color = copyColorObject(colors[activeFormat.value])
	const value = colorChannels[activeFormat.value][channel].from(input.value)

	if (Number.isNaN(value) || value === undefined) {
		// This means that the input value does not result in a valid CSS value.
		return
	}

	color[channel] = value

	setColor(activeFormat.value, color)
}

/**
 * May mutate `color`.
 *
 * @param {ColorFormat} format
 * @param {string | ColorHsl | ColorHsv | ColorHwb | ColorRgb} color
 */
function setColor (format, color) {
	let normalizedColor = color
	if (props.alphaChannel === 'hide') {
		if (typeof color !== 'string') {
			color.a = 1
			normalizedColor = color
		} else if ([5, 9].includes(color.length)) {
			const alphaChannelLength = (color.length - 1) / 4
			normalizedColor = color.substring(0, color.length - alphaChannelLength) + 'f'.repeat(alphaChannelLength)
		} else if ([4, 7].includes(color.length)) {
			normalizedColor = color + 'f'.repeat((color.length - 1) / 3)
		}
	}

	if (!colorsAreValueEqual(colors[format], normalizedColor)) {
		applyColorUpdates(format, normalizedColor)
		const eventData = getEventData()
		emit('color-change', eventData)
	}

	setCssProps()
}

/**
 * Updates the internal color representation for a given format and recomputes all colors for other formats.
 *
 * @param {ColorFormat} sourceFormat
 * @param {string | ColorHsl | ColorHsv | ColorHwb | ColorRgb} newColor
 */
function applyColorUpdates (sourceFormat, newColor) {
	colors[sourceFormat] = newColor

	for (const [format, convert] of conversions[sourceFormat]) {
		colors[format] = convert(colors[sourceFormat])
	}
}

/**
 * Copies the current color (determined by the active color format).
 *
 * For example, if the active color format is HSL, the copied text will be a valid CSS color in HSL format.
 *
 * Only works in secure browsing contexts (i.e. HTTPS).
 *
 * @returns {Promise<void>}
 */
async function copyColor () {
	const activeColor = colors[activeFormat.value]
	const excludeAlphaChannel = props.alphaChannel === 'hide'
	const cssColor = formatAsCssColor(activeColor, activeFormat.value, excludeAlphaChannel)

	// Note: the Clipboard API’s `writeText` method can throw a `DOMException` error in case of insufficient write permissions (see https://w3c.github.io/clipboard-apis/#dom-clipboard-writetext). This error is explicitly not handled here so that users of this package can see the original error in the console.
	await window.navigator.clipboard.writeText(cssColor)
}

/**
 * Wrapper function. Converts a color channel’s value into its CSS value representation.
 *
 * @param {'hsl' | 'hwb' | 'rgb'} format
 * @param {string} channel
 * @returns {string}
 */
function getChannelAsCssValue (format, channel) {
	return colorChannels[format][channel].to(colors[format][channel])
}

/**
 * Sets some CSS properties.
 *
 * 1. Sets the background of the hue slice to the color represented by the currently selected hue with full saturation and half the lightness (which is 100% value for an HSV color).
 *
 * 2. These overlapping gradients together with the underlying background color create a visual representation of a slice through the HSV cylinder. The slice’s angle is determined by the current hue. Changing the hue is equivalent with rotating the slice inside the HSV cylinder.
 *
 * 3. The X and Y coordinates of the color space thumb’s position are expressed in the saturation and value parts of an HSV color. This is because the color space represents the hue slice of the HSV cylinder. This the most convenient option because a fully saturated color at 50% lightness is located in the top right corner of that slice (i.e. at saturation 100% and value 100%). A full red (#f00) can thus be picked by dragging the hue slider all the way to either end and the color space thumb in the most top right corner of the color space. This will set the hue to 0, the saturation to 100%, and the value to 100%.
 */
function setCssProps () {
	if (
		!(colorPicker.value instanceof HTMLElement) ||
		!(colorSpace.value instanceof HTMLElement) ||
		!(thumb.value instanceof HTMLElement)
	) {
		return
	}

	colorPicker.value.style.setProperty('--vacp-hsl-h', String(colors.hsl.h))
	colorPicker.value.style.setProperty('--vacp-hsl-s', String(colors.hsl.s))
	colorPicker.value.style.setProperty('--vacp-hsl-l', String(colors.hsl.l))
	colorPicker.value.style.setProperty('--vacp-hsl-a', String(colors.hsl.a))

	colorSpace.value.setAttribute('style', `
		position: relative;
		background-color: hsl(calc(var(--vacp-hsl-h) * 360) 100% 50%); /* 1. */
		background-image:
			linear-gradient(to top, #000, transparent),  /* 2. */
			linear-gradient(to right, #fff, transparent) /* 2. */
		;
	`)

	thumb.value.setAttribute('style', `
		box-sizing: border-box;
		position: absolute;
		left: ${colors.hsv.s * 100}%;   /* 3. */
		bottom: ${colors.hsv.v * 100}%; /* 3. */
	`)
}

/**
 * @returns {ColorChangeEvent}
 */
function getEventData () {
	const excludeAlphaChannel = props.alphaChannel === 'hide'
	const cssColor = formatAsCssColor(colors[activeFormat.value], activeFormat.value, excludeAlphaChannel)

	return {
		colors,
		cssColor,
	}
}

/**
 * @param {HTMLElement} colorSpace
 * @param {number} clientX
 * @param {number} clientY
 * @returns {{ x: number, y: number }}
 */
function getNewThumbPosition (colorSpace, clientX, clientY) {
	const rect = colorSpace.getBoundingClientRect()
	const x = clientX - rect.left
	const y = clientY - rect.top

	return {
		x: clamp(x / rect.width, 0, 1),
		y: clamp(1 - y / rect.height, 0, 1),
	}
}

/**
 * @param {KeyboardEvent} event
 */
function changeInputValue (event) {
	if (
		!['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].includes(event.key) ||
		!event.shiftKey
	) {
		return
	}

	const input = /** @type {HTMLInputElement} */ (event.currentTarget)
	const step = parseFloat(input.step)
	const direction = ['ArrowLeft', 'ArrowDown'].includes(event.key) ? -1 : 1
	const value = parseFloat(input.value) + direction * step * RANGE_INPUT_STEP_FACTOR
	const newValue = clamp(value, parseInt(input.min), parseInt(input.max))
	// Intentionally removes a single step from `newValue` because the default action associated with an `input` element’s `keydown` event will add one itself.
	input.value = String(newValue - direction * step)
}
</script>

<style>
/*
This style block is unscoped intentionally.

This is done to have a lower specificity for its selectors which in turn makes it easier to override their styles.

Example: the specificity for `.vacp-color-space[data-v-76c97bd2]` is 20 while the specificity for `.vacp-color-space` is 10.
*/
.vacp-color-picker {
	--vacp-color: hsl(calc(var(--vacp-hsl-h) * 360) calc(var(--vacp-hsl-s) * 100%) calc(var(--vacp-hsl-l) * 100%) / var(--vacp-hsl-a));
	--vacp-focus-color: dodgerblue;
	--vacp-color-space-width: 300px;
	--vacp-spacing: 6px;
	--vacp-tiled-background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee), linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee);

	max-width: var(--vacp-color-space-width);
	padding: var(--vacp-spacing);
	display: grid;
	grid-gap: var(--vacp-spacing);
	grid-template-columns: 1fr min-content;
	grid-template-areas:
		"color-space color-space"
		"range-inputs copy-button"
		"color-inputs color-inputs"
	;
	font-size: 0.8em;
	font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
	background-color: #fff;
}

.vacp-color-picker *,
.vacp-color-picker *::before,
.vacp-color-picker *::after {
	box-sizing: border-box;
}

.vacp-color-picker button::-moz-focus-inner {
	border: none;
	padding: 0;
}

.vacp-color-picker :focus {
	outline: 2px solid var(--vacp-focus-color);
}

.vacp-color-space {
	grid-area: color-space;

	overflow: hidden;
	height: calc(var(--vacp-color-space-width) * 0.6);
}

.vacp-color-space-thumb {
	--vacp-thumb-size: calc(var(--vacp-spacing) * 4);

	width: var(--vacp-thumb-size);
	height: var(--vacp-thumb-size);
	margin-left: calc(-1 * var(--vacp-thumb-size) / 2);
	margin-bottom: calc(-1 * var(--vacp-thumb-size) / 2);
	border: 3px solid #fff;
	border-radius: 50%;
	box-shadow: 0 0 0 1px #000;
}

/*
1. Don’t fully remove a focus outline or border. This is important to maintain a focus style in Windows’ high contrast mode.
*/
.vacp-color-space-thumb:focus {
	outline-color: transparent; /* 1. */
	box-shadow: 0 0 0 1px #000, 0 0 0 3px var(--vacp-focus-color);
}

.vacp-range-input-label {
	--vacp-slider-track-width: 100%;
	--vacp-slider-track-height: calc(var(--vacp-spacing) * 3);
	--vacp-slider-thumb-size: calc(var(--vacp-slider-track-height) + var(--vacp-spacing));

	display: block;
}

.vacp-range-input-group {
	grid-area: range-inputs;
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.vacp-range-input-group > :not(:first-child) {
	margin-top: var(--vacp-spacing);
}

.vacp-range-input,
.vacp-range-input::-webkit-slider-thumb {
	-webkit-appearance: none;
}

.vacp-range-input {
	display: block;
	width: var(--vacp-slider-track-width);
	height: var(--vacp-slider-track-height);
	margin-right: 0;
	margin-left: 0;
	margin-top: calc(var(--vacp-spacing) / 2);
	margin-bottom: calc(var(--vacp-spacing) / 2);
	padding: 0;
	border: none;
	background: none;
}

.vacp-range-input:focus {
	outline: none;
}

/* Resets one of these annoying custom focus styles in Firefox. */
.vacp-range-input::-moz-focus-outer {
	border: none;
}

.vacp-range-input--alpha {
	background-color: #fff;
	background-image: var(--vacp-tiled-background-image);
	background-size: calc(var(--vacp-spacing) * 2) calc(var(--vacp-spacing) * 2);
	background-position: 0 0, var(--vacp-spacing) var(--vacp-spacing);
}

/*
Range input: Tracks
*/

.vacp-range-input::-moz-range-track {
	display: block;
	box-sizing: border-box;
	height: var(--vacp-slider-track-height);
	border: none;
}

.vacp-range-input::-webkit-slider-runnable-track {
	width: var(--vacp-slider-track-width);
	height: var(--vacp-slider-track-height);
	border: none;
}

.vacp-range-input::-ms-track {
	width: var(--vacp-slider-track-width);
	height: var(--vacp-slider-track-height);
	border: none;
}

.vacp-range-input:focus::-moz-range-track {
	border: 1px solid var(--vacp-focus-color);
	outline: 2px solid var(--vacp-focus-color);
}

.vacp-range-input:focus::-webkit-slider-runnable-track {
	border: 1px solid var(--vacp-focus-color);
	outline: 2px solid var(--vacp-focus-color);
}

.vacp-range-input:focus::-ms-track {
	border: 1px solid var(--vacp-focus-color);
	outline: 2px solid var(--vacp-focus-color);
}

.vacp-range-input--alpha::-moz-range-track {
	background-image: linear-gradient(to right, transparent, var(--vacp-color));
}

.vacp-range-input--alpha::-webkit-slider-runnable-track {
	background-image: linear-gradient(to right, transparent, var(--vacp-color));
}

.vacp-range-input--alpha::-ms-track {
	background-image: linear-gradient(to right, transparent, var(--vacp-color));
}

.vacp-range-input--hue::-moz-range-track {
	background-image: linear-gradient(to right, #f00 calc(100% * 0/360), #ff0 calc(100% * 60/360), #0f0 calc(100% * 120/360), #0ff calc(100% * 180/360), #00f calc(100% * 240/360), #f0f calc(100% * 300/360), #f00 calc(100% * 360/360));
}

.vacp-range-input--hue::-webkit-slider-runnable-track {
	background-image: linear-gradient(to right, #f00 calc(100% * 0/360), #ff0 calc(100% * 60/360), #0f0 calc(100% * 120/360), #0ff calc(100% * 180/360), #00f calc(100% * 240/360), #f0f calc(100% * 300/360), #f00 calc(100% * 360/360));
}

.vacp-range-input--hue::-ms-track {
	background-image: linear-gradient(to right, #f00 calc(100% * 0/360), #ff0 calc(100% * 60/360), #0f0 calc(100% * 120/360), #0ff calc(100% * 180/360), #00f calc(100% * 240/360), #f0f calc(100% * 300/360), #f00 calc(100% * 360/360));
}

/*
Range input: thumbs
*/
.vacp-range-input::-moz-range-thumb {
	box-sizing: border-box;
	width: var(--vacp-slider-thumb-size);
	height: var(--vacp-slider-thumb-size);
	border: 3px solid #fff;
	border-radius: 50%;
	background-color: transparent;
	box-shadow: 0 0 0 1px #000;
	transform: rotate(0);
}

.vacp-range-input::-webkit-slider-thumb {
	width: var(--vacp-slider-thumb-size);
	height: var(--vacp-slider-thumb-size);
	margin-top: calc((var(--vacp-slider-track-height) - var(--vacp-slider-thumb-size)) / 2);
	border: 3px solid #fff;
	border-radius: 50%;
	background-color: transparent;
	box-shadow: 0 0 0 1px #000;
	transform: rotate(0);
}

.vacp-range-input::-ms-thumb {
	width: var(--vacp-slider-thumb-size);
	height: var(--vacp-slider-thumb-size);
	margin-top: 0;
	border: 3px solid #fff;
	border-radius: 50%;
	background-color: transparent;
	box-shadow: 0 0 0 1px #000;
	transform: rotate(0);
}

.vacp-copy-button {
	grid-area: copy-button;
	justify-self: center;
	align-self: center;

	position: relative;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	width: calc(var(--vacp-spacing) * 6);
	height: calc(var(--vacp-spacing) * 6);
	border: 1px solid transparent;
	border-radius: 50%;
	color: #fff;

	/* Tiled background */
	background-color: #fff;
	background-image: linear-gradient(var(--vacp-color), var(--vacp-color)), var(--vacp-tiled-background-image);
	background-size: calc(var(--vacp-spacing) * 2) calc(var(--vacp-spacing) * 2);
	background-position: 0 0, var(--vacp-spacing) var(--vacp-spacing);
}

.vacp-copy-button:enabled:not(:hover) svg {
	display: none;
}

/*
1. Justification for removing the outline: The focus styles are maintained using a solid border style. This maintains a focus style in Windows’ high contrast mode which would be lost with a combination of `outline: none` and a box shadow because box shadows are removed in high contrast mode.
*/
.vacp-copy-button:enabled:focus {
	outline: none; /* 1. */
	box-shadow: 0 0 0 2px var(--vacp-focus-color);
	border-color: var(--vacp-focus-color);
}

.vacp-copy-button:enabled:hover {
	background-color: var(--vacp-color);
	background-image: linear-gradient(rgb(0 0 0 / 0.25), rgb(0 0 0 / 0.25));
}

.vacp-color-inputs {
	grid-area: color-inputs;
	display: flex;
	align-items: center;
}

.vacp-color-inputs > :not(:first-child) {
	margin-left: var(--vacp-spacing);
}

.vacp-color-input-group {
	flex-grow: 1;
	display: flex;
}

.vacp-color-input-label {
	flex-grow: 1;
	text-align: center;
}

.vacp-color-input-label:not(:first-child) {
	margin-left: var(--vacp-spacing);
}

.vacp-color-input {
	width: 100%;
	margin: 0;
	margin-top: calc(var(--vacp-spacing) / 2);
	padding: var(--vacp-spacing);
	border: 1px solid #ccc;
	font: inherit;
	text-align: center;
	color: inherit;
	background-color: #fff;
}

.vacp-color-input:enabled:focus {
	border-color: var(--vacp-focus-color);
}

.vacp-format-switch-button {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0;
	padding: var(--vacp-spacing);
	border: 1px solid transparent;
	font: inherit;
	color: inherit;
	background-color: #fff;
}

.vacp-format-switch-button:enabled:focus {
	border-color: var(--vacp-focus-color);
}

.vacp-format-switch-button:enabled:hover {
	background-color: #eee;
}
</style>
