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
					:value="colors.hsv.h"
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
					:value="colors.hsv.a"
					type="range"
					min="0"
					max="1"
					step="0.01"
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
				<span class="vacp-visually-hidden">Copy color</span>

				<svg
					class="vacp-icon"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
					width="24"
					height="24"
					viewBox="0 0 32 32"
				>
					<path
						d="M25.313 28v-18.688h-14.625v18.688h14.625zM25.313 6.688c1.438 0 2.688 1.188 2.688 2.625v18.688c0 1.438-1.25 2.688-2.688 2.688h-14.625c-1.438 0-2.688-1.25-2.688-2.688v-18.688c0-1.438 1.25-2.625 2.688-2.625h14.625zM21.313 1.313v2.688h-16v18.688h-2.625v-18.688c0-1.438 1.188-2.688 2.625-2.688h16z"
						fill="currentColor"
					/>
				</svg>
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
						@input="updateHexColorValue"
					>
				</label>

				<label
					v-for="channel in visibleChannels"
					v-else
					:id="`${id}-color-${activeFormat}-${channel}-label`"
					:key="`${id}-color-${activeFormat}-${channel}-label`"
					class="vacp-color-input-label"
					:for="`${id}-color-${activeFormat}-${channel}`"
					@input="updateColorValue($event, channel)"
				>
					<span class="vacp-color-input-label-text">
						{{ channel.toUpperCase() }}
					</span>

					<input
						:id="`${id}-color-${activeFormat}-${channel}`"
						class="vacp-color-input"
						type="text"
						:value="getChannelAsCssValue(channel)"
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
					<span class="vacp-visually-hidden">Switch format</span>

					<svg
						class="vacp-icon"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="15"
					>
						<path
							d="M8 15l5-5-1-1-4 2-4-2-1 1zm4-9l1-1-5-5-5 5 1 1 4-2z"
							fill="currentColor"
						/>
					</svg>
				</slot>
			</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import {
	computed,
	onBeforeUnmount,
	onMounted,
	reactive,
	ref,
	watch,
} from 'vue'

import { clamp } from './utilities/clamp.js'
import { colorsAreValueEqual } from './utilities/colorsAreValueEqual.js'
import { convert } from './utilities/convert.js'
import { getCssValue } from './utilities/CssValues.js'
import { formatAsCssColor } from './utilities/formatAsCssColor.js'
import { isValidHexColor } from './utilities/isValidHexColor.js'
import { parsePropsColor } from './utilities/parsePropsColor.js'
import {
	ColorChangeDetail,
	ColorFormat,
	ColorHsl,
	ColorHsv,
	ColorHwb,
	ColorPickerProps,
	ColorRgb,
	VisibleColorFormat,
} from './types.js'
import { getNewThumbPosition } from './utilities/getNewThumbPosition.js'

const COLOR_FORMATS = ['hex', 'hsl', 'hsv', 'hwb', 'rgb'] as const satisfies ReadonlyArray<ColorFormat>

const props = withDefaults(defineProps<ColorPickerProps>(), {
	color: '#ffffffff',
	id: 'color-picker',
	visibleFormats: () => ['hex', 'hsl', 'hwb', 'rgb'],
	defaultFormat: 'hsl',
	alphaChannel: 'show',
})

const emit = defineEmits<{
	(event: 'color-change', data: ColorChangeDetail): void
}>()

/**
 * The root element of the color picker.
 */
const colorPicker = ref<HTMLElement | null>(null)

/**
 * The color space. It represents the saturation and lightness or the current color’s hue.
 */
const colorSpace = ref<HTMLElement | null>(null)

/**
 * The color space thumb. Can be dragged around within the color space to change a color’s saturation and lightness.
 */
const thumb = ref<HTMLElement | null>(null)

/**
 * Tracks whether a pointer originated from within the color space.
 *
 * Only if it did do we want to run the logic of dragging the color space thumb around.
 */
let pointerOriginatedInColorSpace = false

/**
 * The currently visible color format (i.e. what’s cycled through using the “Switch format” button).
 */
const activeFormat = ref<VisibleColorFormat>(props.visibleFormats.includes(props.defaultFormat) ? props.defaultFormat : props.visibleFormats[0] as VisibleColorFormat)

/**
 * The current color represented in all supported color formats.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const colors = reactive<any>({
	hex: '#ffffffff',
	hsl: { h: 0, s: 0, l: 100, a: 1 },
	hsv: { h: 0, s: 0, v: 100, a: 1 },
	hwb: { h: 0, w: 100, b: 0, a: 1 },
	rgb: { r: 255, g: 255, b: 255, a: 1 },
})

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
 */
const hexInputValue = computed<string>(function () {
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
	activeFormat.value = props.visibleFormats[newFormatIndex] as VisibleColorFormat
}

function startMovingThumbWithMouse (event: MouseEvent) {
	pointerOriginatedInColorSpace = true
	moveThumbWithMouse(event)
}

function startMovingThumbWithTouch (event: TouchEvent) {
	pointerOriginatedInColorSpace = true
	moveThumbWithTouch(event)
}

function stopMovingThumb () {
	pointerOriginatedInColorSpace = false
}

function moveThumbWithMouse (event: MouseEvent) {
	if (
		event.buttons !== 1 ||
		pointerOriginatedInColorSpace === false ||
		!(colorSpace.value instanceof HTMLElement)
	) {
		return
	}

	moveThumb(colorSpace.value, event.clientX, event.clientY)
}

function moveThumbWithTouch (event: TouchEvent) {
	if (
		pointerOriginatedInColorSpace === false ||
		!(colorSpace.value instanceof HTMLElement)
	) {
		return
	}

	// Prevents touch events from dragging the page.
	event.preventDefault()

	const touchPoint = event.touches[0] as Touch
	moveThumb(colorSpace.value, touchPoint.clientX, touchPoint.clientY)
}

function moveThumb (colorSpace: HTMLElement, clientX: number, clientY: number) {
	const newThumbPosition = getNewThumbPosition(colorSpace, clientX, clientY)
	const hsvColor = Object.assign({}, colors.hsv)
	hsvColor.s = newThumbPosition.x
	hsvColor.v = newThumbPosition.y

	setColor('hsv', hsvColor)
}

function moveThumbWithArrows (event: KeyboardEvent) {
	if (!['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].includes(event.key)) {
		return
	}

	event.preventDefault()
	const direction = ['ArrowLeft', 'ArrowDown'].includes(event.key) ? -1 : 1
	const channel = ['ArrowLeft', 'ArrowRight'].includes(event.key) ? 's' : 'v'
	const step = event.shiftKey ? 10 : 1
	const newColorValue = colors.hsv[channel] + direction * step
	const hsvColor = Object.assign({}, colors.hsv)
	hsvColor[channel] = clamp(newColorValue, 0, 100)

	setColor('hsv', hsvColor)
}

function setColorFromProp (propsColor: string | ColorHsl | ColorHsv | ColorHwb | ColorRgb) {
	const result = parsePropsColor(propsColor)
	if (result !== null) {
		setColor(result.format, result.color)
	}
}

function handleSliderInput (event: Event, channel: 'h' | 'a') {
	const input = event.currentTarget as HTMLInputElement
	const hsvColor = Object.assign({}, colors.hsv)
	hsvColor[channel] = Number(input.value)

	setColor('hsv', hsvColor)
}

function updateHexColorValue (event: Event) {
	const input = event.target as HTMLInputElement

	if (isValidHexColor(input.value)) {
		setColor('hex', input.value)
	}
}

function updateColorValue (event: Event, channel: string) {
	const input = event.target as HTMLInputElement

	const format = activeFormat.value as Exclude<ColorFormat, 'hex' | 'hsv'>
	const color = Object.assign({}, colors[format])
	const cssValue = getCssValue(format, channel)
	const value = cssValue.from(input.value)

	if (Number.isNaN(value) || value === undefined) {
		// This means that the input value does not result in a valid CSS value.
		return
	}

	color[channel] = value

	setColor(format, color)
}

/**
 * May mutate `color`.
 */
function setColor (format: ColorFormat, color: string | ColorHsl | ColorHsv | ColorHwb | ColorRgb) {
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
		colors[format] = normalizedColor

		for (const targetFormat of COLOR_FORMATS) {
			if (targetFormat !== format) {
				colors[targetFormat] = convert(format, targetFormat, normalizedColor)
			}
		}

		emit('color-change', getColorChangeDetail())
	}

	if (
		(colorPicker.value instanceof HTMLElement) &&
		(colorSpace.value instanceof HTMLElement) &&
		(thumb.value instanceof HTMLElement)
	) {
		setCssProps(colorPicker.value, colorSpace.value, thumb.value)
	}
}

/**
 * Copies the current color (determined by the active color format).
 *
 * For example, if the active color format is HSL, the copied text will be a valid CSS color in HSL format.
 *
 * Only works in secure browsing contexts (i.e. HTTPS).
 */
async function copyColor (): Promise<void> {
	const activeColor = colors[activeFormat.value]
	const excludeAlphaChannel = props.alphaChannel === 'hide'
	const cssColor = formatAsCssColor({ color: activeColor, format: activeFormat.value }, excludeAlphaChannel)

	// Note: the Clipboard API’s `writeText` method can throw a `DOMException` error in case of insufficient write permissions (see https://w3c.github.io/clipboard-apis/#dom-clipboard-writetext). This error is explicitly not handled here so that users of this package can see the original error in the console.
	await window.navigator.clipboard.writeText(cssColor)
}

/**
 * Wrapper function. Converts a color channel’s value into its CSS value representation.
 */
function getChannelAsCssValue (channel: string): string {
	const format = activeFormat.value as Exclude<ColorFormat, 'hex' | 'hsv'>
	const cssValue = getCssValue(format, channel)
	return cssValue.to(colors[format][channel])
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
function setCssProps (colorPicker: HTMLElement, colorSpace: HTMLElement, thumb: HTMLElement) {
	colorPicker.style.setProperty('--vacp-hsl-h', String(colors.hsl.h))
	colorPicker.style.setProperty('--vacp-hsl-s', String(colors.hsl.s))
	colorPicker.style.setProperty('--vacp-hsl-l', String(colors.hsl.l))
	colorPicker.style.setProperty('--vacp-hsl-a', String(colors.hsl.a))

	// Sets a few CSS properties as inline styles because they're essential for the operation of the color picker.
	colorSpace.style.position = 'relative'
	// Sets the background of the hue slice to the color represented by the currently selected hue with full saturation and half the lightness (which is 100% value for an HSV color).
	colorSpace.style.backgroundColor = 'hsl(var(--vacp-hsl-h) 100% 50%)'
	// These overlapping gradients together with the underlying background color create a visual representation of a slice through the HSV cylinder. The slice’s angle is determined by the current hue. Changing the hue is equivalent with rotating the slice inside the HSV cylinder.
	colorSpace.style.backgroundImage = 'linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)'

	thumb.style.boxSizing = 'border-box'
	thumb.style.position = 'absolute'
	// The X and Y coordinates of the color space thumb’s position are expressed in the saturation and value parts of an HSV color. This is because the color space represents the hue slice of the HSV cylinder. This the most convenient option because a fully saturated color at 50% lightness is located in the top right corner of that slice (i.e. at saturation 100% and value 100%). A full red (#f00) can thus be picked by dragging the hue slider all the way to either end and the color space thumb in the most top right corner of the color space. This will set the hue to 0, the saturation to 100%, and the value to 100%.
	thumb.style.left = `${colors.hsv.s}%`
	thumb.style.bottom = `${colors.hsv.v}%`
}

function getColorChangeDetail (): ColorChangeDetail {
	const excludeAlphaChannel = props.alphaChannel === 'hide'
	const cssColor = formatAsCssColor({ color: colors[activeFormat.value], format: activeFormat.value }, excludeAlphaChannel)

	return {
		colors,
		cssColor,
	}
}

function changeInputValue (event: KeyboardEvent) {
	if (
		!['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].includes(event.key) ||
		!event.shiftKey
	) {
		return
	}

	const input = event.currentTarget as HTMLInputElement
	const step = Number(input.step)
	const direction = ['ArrowLeft', 'ArrowDown'].includes(event.key) ? -1 : 1
	const value = Number(input.value) + direction * step * 10
	const newValue = clamp(value, Number(input.min), Number(input.max))
	// Intentionally removes a single step from `newValue` because the default action associated with an `input[type=range]` element’s `keydown` event will add one itself.
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
	--vacp-focus-color: #19f;
	--vacp-focus-outline: 2px solid var(--vacp-focus-color);
	--vacp-border-width: 1px;
	--vacp-border-color: #000;
	--vacp-border: var(--vacp-border-width) solid var(--vacp-border-color);
	--vacp-color-space-width: 300px;
	--vacp-spacing: 6px;

	max-width: var(--vacp-color-space-width);
	padding: var(--vacp-spacing);
	display: grid;
	grid-gap: var(--vacp-spacing);
	grid-template-columns: 1fr min-content;
	font-size: 0.8em;
	font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
	background-color: #fff;
}

.vacp-color-picker,
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
	outline: var(--vacp-focus-outline);
}

.vacp-color-space {
	grid-column: 1 / -1;

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
	box-shadow: 0 0 0 var(--vacp-border-width) var(--vacp-border-color);
	/* Corrects the box-shadow being cut-off in Firefox. “isolation: isolate” doesn't work. */
	transform: rotate(0);
}

/*
1. Don’t fully remove a focus outline or border. This is important to maintain a focus style in Windows’ high contrast mode.
*/
.vacp-color-space-thumb:focus {
	outline-color: transparent; /* 1. */
	box-shadow: 0 0 0 var(--vacp-border-width) var(--vacp-border-color), 0 0 0 3px var(--vacp-focus-color);
}

.vacp-range-input-label {
	--vacp-slider-track-width: 100%;
	--vacp-slider-track-height: calc(var(--vacp-spacing) * 3);

	display: block;
}

.vacp-range-input-group {
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
	margin-top: calc(var(--vacp-spacing) / 2 + 1px);
	margin-bottom: calc(var(--vacp-spacing) / 2 + 1px);
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
	background-image:
		linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee),
		linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee)
	;
	background-size: calc(var(--vacp-spacing) * 2) calc(var(--vacp-spacing) * 2);
	background-position: 0 0, var(--vacp-spacing) var(--vacp-spacing);
}

/*
Range input: Tracks
*/

.vacp-range-input::-moz-range-track {
	box-sizing: content-box;
	width: var(--vacp-slider-track-width);
	height: var(--vacp-slider-track-height);
	border: var(--vacp-border);
}

.vacp-range-input::-webkit-slider-runnable-track {
	box-sizing: content-box;
	width: var(--vacp-slider-track-width);
	height: var(--vacp-slider-track-height);
	border: var(--vacp-border);
}

.vacp-range-input::-ms-track {
	box-sizing: content-box;
	width: var(--vacp-slider-track-width);
	height: var(--vacp-slider-track-height);
	border: var(--vacp-border);
}

.vacp-range-input:focus::-moz-range-track {
	outline: var(--vacp-focus-outline);
}

.vacp-range-input:focus::-webkit-slider-runnable-track {
	outline: var(--vacp-focus-outline);
}

.vacp-range-input:focus::-ms-track {
	outline: var(--vacp-focus-outline);
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
	box-sizing: content-box;
	width: var(--vacp-slider-track-height);
	height: var(--vacp-slider-track-height);
	border: 3px solid #fff;
	border-radius: 50%;
	background-color: transparent;
	box-shadow: 0 0 0 var(--vacp-border-width) var(--vacp-border-color);
	isolation: isolate;
}

.vacp-range-input::-webkit-slider-thumb {
	box-sizing: content-box;
	width: var(--vacp-slider-track-height);
	height: var(--vacp-slider-track-height);
	margin-top: calc(-1 * (var(--vacp-spacing) / 2));
	border: 3px solid #fff;
	border-radius: 50%;
	background-color: transparent;
	box-shadow: 0 0 0 var(--vacp-border-width) var(--vacp-border-color);
	isolation: isolate;
}

.vacp-range-input::-ms-thumb {
	box-sizing: content-box;
	width: var(--vacp-slider-track-height);
	height: var(--vacp-slider-track-height);
	margin-top: calc(-1 * (var(--vacp-spacing) / 2));
	border: 3px solid #fff;
	border-radius: 50%;
	background-color: transparent;
	box-shadow: 0 0 0 var(--vacp-border-width) var(--vacp-border-color);
	isolation: isolate;
}

.vacp-copy-button {
	justify-self: center;
	align-self: center;

	position: relative;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	width: calc(var(--vacp-spacing) * 6);
	height: calc(var(--vacp-spacing) * 6);
	border: var(--vacp-border-width) solid transparent;
	border-radius: 50%;
	background-color: #fff;
}

/*
1. Justification for removing the outline: The focus styles are maintained using a solid border style. This maintains a focus style in Windows’ high contrast mode which would be lost with a combination of `outline: none` and a box shadow because box shadows are removed in high contrast mode.
*/
.vacp-copy-button:enabled:focus {
	outline: none; /* 1. */
	border-color: var(--vacp-border-color);
	box-shadow: 0 0 0 2px var(--vacp-focus-color);
}

.vacp-copy-button:enabled:hover {
	background-color: #0002;
}

.vacp-color-inputs {
	grid-column: 1 / -1;

	display: flex;
	align-items: center;
}

.vacp-color-inputs > :not(:first-child) {
	margin-left: var(--vacp-spacing);
}

.vacp-color-input-group {
	flex-grow: 1;
	display: grid;
	grid-auto-flow: column;
	column-gap: var(--vacp-spacing);
}

.vacp-color-input-label {
	text-align: center;
}

.vacp-color-input {
	width: 100%;
	margin: 0;
	margin-top: calc(var(--vacp-spacing) / 2);
	padding: var(--vacp-spacing);
	border: var(--vacp-border);
	font: inherit;
	text-align: center;
	color: inherit;
	background-color: #fff;
}

.vacp-format-switch-button {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0;
	padding: var(--vacp-spacing);
	border: var(--vacp-border-width) solid transparent;
	border-radius: 50%;
	font: inherit;
	color: inherit;
	background-color: #fff;
}

.vacp-format-switch-button:enabled:focus {
	border-color: var(--vacp-border-color);
}

.vacp-format-switch-button:enabled:hover {
	background-color: #0002;
}

.vacp-visually-hidden {
	position: absolute;
	overflow: hidden;
	clip: rect(0 0 0 0);
	width: 1px;
	height: 1px;
	margin: -1px;
	padding: 0;
	border: 0;
	white-space: nowrap;
}
</style>
