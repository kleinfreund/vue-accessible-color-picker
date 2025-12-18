<template>
	<div
		ref="colorPicker"
		class="vacp-color-picker"
		:style="`--vacp-color: ${serialize(currentColor, { format: 'hsl', alpha: false })}`"
	>
		<div
			ref="colorSpaceRef"
			class="vacp-color-space"
			:style="`position: relative; background: linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent); background-color: hsl(${currentHsv.h} 100% 50%)`"
			@pointerdown="startMovingThumbWithPointer"
			@touchstart="startMovingThumbWithTouch"
		>
			<!-- Accessibility remark: I don’t know of a better, semantic HTML element that would be adequate for the job of a planar range thumb. -->
			<div
				ref="thumb"
				class="vacp-color-space-thumb"
				tabindex="0"
				aria-label="Color space thumb"
				:style="`box-sizing: border-box; position: absolute; left: ${currentHsv.s}%; bottom: ${currentHsv.v}%;`"
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
					:value="currentColor.to('hsl').toGamut().h ?? 0"
					type="range"
					min="0"
					max="360"
					step="1"
					@keydown="changeInputValue"
					@input="handleSliderChange($event, 'h')"
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
					:value="currentColor.alpha"
					type="range"
					min="0"
					max="1"
					step="0.01"
					@keydown="changeInputValue"
					@input="handleSliderChange($event, 'alpha')"
				>
			</label>
		</div>

		<div class="vacp-actions">
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

			<slot name="actions" />
		</div>

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
						@change="updateHexColorValue"
					>
				</label>

				<label
					v-for="{ value, channel, label } in visibleChannels"
					v-else
					:id="`${id}-color-${activeFormat}-${channel}-label`"
					:key="`${id}-color-${activeFormat}-${channel}-label`"
					class="vacp-color-input-label"
					:for="`${id}-color-${activeFormat}-${channel}`"
				>
					<span class="vacp-color-input-label-text">
						{{ label }}
					</span>

					<input
						:id="`${id}-color-${activeFormat}-${channel}`"
						class="vacp-color-input"
						type="text"
						:value="value"
						@change="updateColorValue"
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
import Color from 'colorjs.io'
import {
	computed,
	onBeforeUnmount,
	onMounted,
	ref,
	toRaw,
	useTemplateRef,
	watch,
} from 'vue'

import { clamp } from './utilities/clamp.js'
import { serialize } from './utilities/serialize.js'
import {
	ColorChangeDetail,
	ColorFormat,
} from './types.js'
import { getNewThumbPosition } from './utilities/getNewThumbPosition.js'
import { ALPHA_DEFINITION, CHANNEL_DEFINITIONS, PRECISION } from './constants.js'

const {
	color = '#ffffffff',
	id = 'color-picker',
	visibleFormats = ['hex', 'hsl', 'hwb', 'srgb'],
	defaultFormat = 'hsl',
	alphaChannel = 'show',
	copy = undefined,
} = defineProps<{
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
}>()

const emit = defineEmits<{
	'color-change': [ColorChangeDetail]
	'color-copy': [ColorChangeDetail]
}>()

defineExpose({
	copyColor,
	switchFormat,
})

const colorPicker = useTemplateRef('colorPicker')

/**
 * The color space. It represents the saturation and lightness or the current color’s hue.
 */
const colorSpace = useTemplateRef('colorSpaceRef')

/**
 * Tracks whether a pointer originated from within the color space.
 *
 * Only if it did do we want to run the logic of dragging the color space thumb around.
 */
let pointerOriginatedInColorSpace = false

/**
 * The currently visible color format (i.e. what’s cycled through using the “Switch format” button).
 */
const activeFormat = ref<ColorFormat>(visibleFormats.includes(defaultFormat) ? defaultFormat : visibleFormats[0]!)

/**
 * The current color represented in all supported color formats.
 */
const currentColor = ref(new Color('srgb', [1, 1, 1], 1))

/**
 * A list of color channels rendered as part of the color picker.
 */
const visibleChannels = computed(function () {
	const format = activeFormat.value as Exclude<ColorFormat, 'hex'>
	const typesByCoord = currentColor.value.space.getFormat('default')!.coords

	return CHANNEL_DEFINITIONS[format]
		.map(({ channel, label, preferredType }, index) => {
			const color = currentColor.value.to(format)
			// Mutates `color` so it's in gamut.
			color.toGamut()
			const types = typesByCoord[index]!
			const type = types.find(({ type }) => type === preferredType) ?? types.at(0)!
			const value = type.serialize(color.coords[index] ?? 0, PRECISION)

			return { value, channel, label }
		})
		.concat(alphaChannel === 'show' ? [{
			value: currentColor.value.alpha.toPrecision(PRECISION).replace(/\.?0+$/, ''),
			channel: ALPHA_DEFINITION.channel,
			label: ALPHA_DEFINITION.label,
		}] : [])
})

/**
 * Input value of the color `input` element for the hexadecimal representation of the current color.
 */
const hexInputValue = computed(function () {
	return serialize(currentColor.value, { format: 'hex', alpha: alphaChannel === 'show' })
})

/**
 * The background color of the color space. The color space shows a *slice* through the HSV color cylinder's center. The slice's angle represents the color's *hue* (i.e. rotating the angle of the HSV slice changes the color's hue). We want this color at 100% *saturation* and 100% *value* (which is the same as 50% lightness of the corresponding HSL color).
 */
const currentHsv = computed(function () {
	const hsv = currentColor.value.to('hsv')
	hsv.toGamut()
	return hsv
})

watch(() => color, parseAndSetColor, { immediate: true })

onMounted(function () {
	document.addEventListener('pointermove', moveThumbWithPointer, { passive: false })
	document.addEventListener('touchmove', moveThumbWithTouch, { passive: false })
	document.addEventListener('pointerup', stopMovingThumb)
	document.addEventListener('touchend', stopMovingThumb)
})

onBeforeUnmount(function () {
	document.removeEventListener('pointermove', moveThumbWithPointer)
	document.removeEventListener('touchmove', moveThumbWithTouch)
	document.removeEventListener('pointerup', stopMovingThumb)
	document.removeEventListener('touchend', stopMovingThumb)
})

/**
 * Sets the next active color format by cycling through the visible color formats.
 */
function switchFormat () {
	const activeFormatIndex = visibleFormats.findIndex((format) => format === activeFormat.value)
	const newFormatIndex = (activeFormatIndex + 1) % visibleFormats.length
	activeFormat.value = visibleFormats[newFormatIndex]!
}

function startMovingThumbWithPointer (event: PointerEvent) {
	pointerOriginatedInColorSpace = true
	moveThumbWithPointer(event)
}

function startMovingThumbWithTouch (event: TouchEvent) {
	pointerOriginatedInColorSpace = true
	moveThumbWithTouch(event)
}

function stopMovingThumb () {
	pointerOriginatedInColorSpace = false
}

function moveThumbWithPointer (event: PointerEvent) {
	if (
		event.buttons !== 1 ||
		!pointerOriginatedInColorSpace ||
		!(colorSpace.value instanceof HTMLElement)
	) {
		return
	}

	moveThumb(getNewThumbPosition(colorSpace.value, event.clientX, event.clientY))
}

function moveThumbWithTouch (event: TouchEvent) {
	if (
		!pointerOriginatedInColorSpace ||
		!(colorSpace.value instanceof HTMLElement)
	) {
		return
	}

	// Prevents touch events from dragging the page.
	event.preventDefault()

	const touchPoint = event.touches[0]!
	moveThumb(getNewThumbPosition(colorSpace.value, touchPoint.clientX, touchPoint.clientY))
}

function moveThumb ({ x: s, y: v }: { x: number, y: number }) {
	const hsv = currentColor.value.to('hsv')
	hsv.toGamut()
	setColor(new Color('hsv', [hsv.h ?? 0, s, v], currentColor.value.alpha))
}

function moveThumbWithArrows (event: KeyboardEvent) {
	if (!['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].includes(event.key)) {
		return
	}

	event.preventDefault()
	const direction = ['ArrowLeft', 'ArrowDown'].includes(event.key) ? -1 : 1
	const channel = ['ArrowLeft', 'ArrowRight'].includes(event.key) ? 's' : 'v'
	const step = event.shiftKey ? 10 : 1

	const hsv = currentColor.value.to('hsv')
	hsv.toGamut()
	const s = hsv.s ?? 0
	const v = hsv.v ?? 0
	const x = channel === 's' ? clamp(s + direction * step, 0, 100) : s
	const y = channel === 'v' ? clamp(v + direction * step, 0, 100) : v

	moveThumb({ x, y })
}

function parseAndSetColor (propsColor: string | Color) {
	let newColor: Color
	try {
		newColor = propsColor instanceof Color ? propsColor: new Color(propsColor)
	} catch (error) {
		if (error instanceof TypeError) {
			// An error here means colorjs.io couldn't parse the input. We catch and ignore this error to mirror how native form controls generally behave. There's a difference to the native `input[type="color"]` though: on an invalid `value`, it continues as if `#000000` was the input which I don't think is desirable.
			return
		} else {
			throw error
		}
	}

	setColor(newColor)
}

function handleSliderChange (event: Event, channel: 'h' | 'alpha') {
	const input = event.currentTarget as HTMLInputElement
	const alpha = channel === 'alpha' ? Number(input.value) : currentColor.value.alpha
	const hsl = currentColor.value.to('hsl')
	hsl.toGamut()
	const hue = channel === 'h' ? Number(input.value) : hsl.h ?? 0

	setColor(new Color('hsl', [hue, hsl.s ?? 0, hsl.l ?? 0], alpha))
}

function updateHexColorValue (event: Event) {
	const input = event.target as HTMLInputElement

	if (/^#(([A-F0-9]{2}){3,4}|[A-F0-9]{3,4})$/i.test(input.value)) {
		parseAndSetColor(input.value)
	}
}

function updateColorValue () {
	const format = activeFormat.value as Exclude<ColorFormat, 'hex'>
	const values = CHANNEL_DEFINITIONS[format]
		.concat(alphaChannel === 'show' ? [ALPHA_DEFINITION] : [])
		.map(({ channel, from }) => {
			const input = colorPicker.value!.querySelector<HTMLInputElement>(`input[id="${id}-color-${format}-${channel}"]`)!

			return from(input.value)
		})

	if (values.some((value) => Number.isNaN(value))) {
		// A `NaN` value is used as a signal for an invalid or incomplete user input. In either case, we don't want to continue updating the processing color value and risk overriding the input element's value while the user is still inputting data.
		return
	}

	const coords = values.slice(0, 3) as [number, number, number]

	setColor(new Color(format, coords, values[3]))
}

function setColor (newColor: Color) {
	// If the color hasn't changed, don't do anything further.
	if (
		Math.abs(currentColor.value.distance(newColor)) < Number.EPSILON &&
		currentColor.value.alpha === newColor.alpha
	) {
		return
	}

	currentColor.value = newColor
	emit('color-change', getColorChangeDetail())
}

/**
 * Copies the current color (determined by the active color format).
 *
 * For example, if the active color format is HSL, the copied text will be a valid CSS color in HSL format.
 *
 * Only works in secure browsing contexts (i.e. HTTPS).
 */
async function copyColor (): Promise<void> {
	const cssColor = serialize(currentColor.value, { format: activeFormat.value, alpha: alphaChannel === 'show' })

	// Note: the Clipboard API’s `writeText` method can throw a `DOMException` error in case of insufficient write permissions (see https://w3c.github.io/clipboard-apis/#dom-clipboard-writetext). This error is explicitly not handled here so that users of this package can see the original error in the console.
	const copyFunction = copy ? copy : (data: string) => window.navigator.clipboard.writeText(data)
	await copyFunction(cssColor)

	emit('color-copy', getColorChangeDetail())
}

function getColorChangeDetail (): ColorChangeDetail {
	return {
		color: toRaw(currentColor.value),
		cssColor: serialize(currentColor.value, { format: activeFormat.value, alpha: alphaChannel === 'show' }),
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

<style lang="scss">
/*
This style block is unscoped intentionally.

This is done to have a lower specificity for its selectors which in turn makes it easier to override their styles.

Example: the specificity for `.vacp-color-space[data-v-76c97bd2]` is 20 while the specificity for `.vacp-color-space` is 10.
*/

$color-background-input: #fff;
$color-background: #fff;
$color-border: #000;
$color-focus: #19f;
$color-text-input: currentColor;
$color-text: currentColor;
$font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Arial, sans-serif;
$font-size: 0.8em;
$spacing: 6px;
$width-border: 1px;
$inline-size-color-space: 300px;

.vacp-color-picker {
	max-inline-size: var(--vacp-width-color-space, $inline-size-color-space);
	padding: var(--vacp-spacing, $spacing);
	display: grid;
	grid-gap: var(--vacp-spacing, $spacing);
	grid-template-columns: 1fr min-content;
	font-size: var(--vacp-font-size, $font-size);
	font-family: var(--vacp-font-family, $font-family);
	color: var(--vacp-color-text, $color-text);
	background-color: var(--vacp-color-background, $color-background);
}

.vacp-color-picker,
.vacp-color-picker *,
.vacp-color-picker *::before,
.vacp-color-picker *::after {
	box-sizing: border-box;
}

.vacp-color-picker :focus {
	outline: 2px solid var(--vacp-color-focus, $color-focus);
}

.vacp-color-picker button::-moz-focus-inner {
	border: none;
	padding: 0;
}

:where(.vacp-color-picker) button {
	inline-size: calc(var(--vacp-spacing, $spacing) * 6);
	block-size: calc(var(--vacp-spacing, $spacing) * 6);
	margin: 0;
	padding: var(--vacp-spacing, $spacing);
	display: flex;
	align-items: center;
	justify-content: center;
	border: var(--vacp-width-border, $width-border) solid transparent;
	border-radius: 50%;
	font: inherit;
	color: var(--vacp-color-text-input, $color-text-input);
	background-color: var(--vacp-color-background-input, $color-background-input);
}

:where(.vacp-color-picker) button:focus {
	border-color: var(--vacp-color-border, $color-border);
}

:where(.vacp-color-picker) button:enabled:hover {
	background-color: #0002;
}

.vacp-color-space {
	grid-column: 1 / -1;

	overflow: hidden;
	aspect-ratio: 1 / 0.6;
}

.vacp-color-space-thumb {
	--vacp-thumb-size: calc(var(--vacp-spacing, #{$spacing}) * 4);

	inline-size: var(--vacp-thumb-size);
	block-size: var(--vacp-thumb-size);
	margin-inline-start: calc(-1 * var(--vacp-thumb-size) / 2);
	margin-block-end: calc(-1 * var(--vacp-thumb-size) / 2);
	border: 3px solid #fff;
	border-radius: 50%;
	box-shadow: 0 0 0 var(--vacp-width-border, $width-border) var(--vacp-color-border, $color-border);
	/* Corrects the box-shadow being cut-off in Firefox. “isolation: isolate” doesn't work. */
	transform: rotate(0);
}

/*
1. Don’t fully remove a focus outline or border. This is important to maintain a focus style in Windows’ high contrast mode.
*/
.vacp-color-space-thumb:focus {
	outline-color: transparent; /* 1. */
	box-shadow: 0 0 0 var(--vacp-width-border, $width-border) var(--vacp-color-border, $color-border), 0 0 0 calc(var(--vacp-width-border, $width-border) + 2px) var(--vacp-color-focus, $color-focus);
}

.vacp-range-input-label {
	--vacp-slider-track-height: calc(var(--vacp-spacing, #{$spacing}) * 3);
	--vacp-slider-thumb-size: calc(var(--vacp-spacing, #{$spacing}) * 4 - var(--vacp-width-border, #{$width-border}) * 2);

	display: block;
}

.vacp-range-input-group {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.vacp-range-input-group > :not(:first-child) {
	margin-block-start: var(--vacp-spacing, $spacing);
}

.vacp-range-input,
.vacp-range-input::-webkit-slider-thumb {
	-webkit-appearance: none;
}

.vacp-range-input {
	display: block;
	inline-size: 100%;
	block-size: var(--vacp-slider-track-height);
	margin-inline: 0;
	margin-block: calc(var(--vacp-spacing, $spacing) / 2 + 1px);
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
	background-size: calc(var(--vacp-spacing, $spacing) * 2) calc(var(--vacp-spacing, $spacing) * 2);
	background-position: 0 0, var(--vacp-spacing, $spacing) var(--vacp-spacing, $spacing);
}

/*
Range input: Tracks
*/

.vacp-range-input::-moz-range-track {
	box-sizing: border-box;
	inline-size: 100%;
	block-size: var(--vacp-slider-track-height);
	border: var(--vacp-width-border, $width-border) solid var(--vacp-color-border, $color-border);
}

.vacp-range-input::-webkit-slider-runnable-track {
	box-sizing: border-box;
	inline-size: 100%;
	block-size: var(--vacp-slider-track-height);
	border: var(--vacp-width-border, $width-border) solid var(--vacp-color-border, $color-border);
}

.vacp-range-input::-ms-track {
	box-sizing: border-box;
	inline-size: 100%;
	block-size: var(--vacp-slider-track-height);
	border: var(--vacp-width-border, $width-border) solid var(--vacp-color-border, $color-border);
}

.vacp-range-input:focus::-moz-range-track {
	outline: 2px solid var(--vacp-color-focus, $color-focus);
}

.vacp-range-input:focus::-webkit-slider-runnable-track {
	outline: 2px solid var(--vacp-color-focus, $color-focus);
}

.vacp-range-input:focus::-ms-track {
	outline: 2px solid var(--vacp-color-focus, $color-focus);
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

$hue-gradient: linear-gradient(
	to right,
	#f00 calc(100% *   0/360),
	#ff0 calc(100% *  60/360),
	#0f0 calc(100% * 120/360),
	#0ff calc(100% * 180/360),
	#00f calc(100% * 240/360),
	#f0f calc(100% * 300/360),
	#f00 calc(100% * 360/360)
);

.vacp-range-input--hue::-moz-range-track {
	background-image: $hue-gradient;
}

.vacp-range-input--hue::-webkit-slider-runnable-track {
	background-image: $hue-gradient;
}

.vacp-range-input--hue::-ms-track {
	background-image: $hue-gradient;
}

/*
Range input: thumbs
*/
.vacp-range-input::-moz-range-thumb {
	box-sizing: border-box;
	inline-size: var(--vacp-slider-thumb-size);
	block-size: var(--vacp-slider-thumb-size);
	border: 3px solid #fff;
	border-radius: 50%;
	background-color: transparent;
	box-shadow: 0 0 0 var(--vacp-width-border, $width-border) var(--vacp-color-border, $color-border);
	isolation: isolate;
}

.vacp-range-input::-webkit-slider-thumb {
	box-sizing: border-box;
	inline-size: var(--vacp-slider-thumb-size);
	block-size: var(--vacp-slider-thumb-size);
	margin-block-start: calc(-1 * (var(--vacp-spacing, $spacing) / 2));
	border: 3px solid #fff;
	border-radius: 50%;
	background-color: transparent;
	box-shadow: 0 0 0 var(--vacp-width-border, $width-border) var(--vacp-color-border, $color-border);
	isolation: isolate;
}

.vacp-range-input::-ms-thumb {
	box-sizing: border-box;
	inline-size: var(--vacp-slider-thumb-size);
	block-size: var(--vacp-slider-thumb-size);
	margin-block-start: calc(-1 * (var(--vacp-spacing, $spacing) / 2));
	border: 3px solid #fff;
	border-radius: 50%;
	background-color: transparent;
	box-shadow: 0 0 0 var(--vacp-width-border, $width-border) var(--vacp-color-border, $color-border);
	isolation: isolate;
}

.vacp-actions {
	justify-self: center;
	align-self: center;

	display: flex;
	gap: var(--vacp-spacing, $spacing);
	align-items: center;
}

.vacp-color-inputs {
	grid-column: 1 / -1;

	display: flex;
	align-items: center;
}

.vacp-color-inputs > :not(:first-child) {
	margin-inline-start: var(--vacp-spacing, $spacing);
}

.vacp-color-input-group {
	flex-grow: 1;
	display: grid;
	grid-auto-flow: column;
	column-gap: var(--vacp-spacing, $spacing);
}

.vacp-color-input-label {
	text-align: center;
}

.vacp-color-input {
	width: 100%;
	margin: 0;
	margin-block-start: calc(var(--vacp-spacing, $spacing) / 2);
	padding: var(--vacp-spacing, $spacing);
	border: var(--vacp-width-border, $width-border) solid var(--vacp-color-border, $color-border);
	font: inherit;
	text-align: center;
	color: inherit;
	color: var(--vacp-color-text-input, $color-text-input);
	background-color: var(--vacp-color-background-input, $color-background-input);
}

.vacp-format-switch-button {
	flex-shrink: 0;
}

.vacp-visually-hidden {
	position: absolute;
	overflow: hidden;
	clip: rect(0 0 0 0);
	inline-size: 1px;
	block-size: 1px;
	margin: -1px;
	padding: 0;
	border: 0;
	white-space: nowrap;
}
</style>
