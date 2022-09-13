import { beforeAll, beforeEach, describe, test, expect, vi } from 'vitest'
import { shallowMount, flushPromises } from '@vue/test-utils'

import ColorPicker from './ColorPicker.vue'

/**
 * These tests make use of [Vitest][1] and [Vue Test Utils][2].
 *
 * [1]: https://vitest.dev/
 * [2]: https://vue-test-utils.vuejs.org/
 */

describe('ColorPicker', () => {
	beforeEach(() => {
		vi.restoreAllMocks()
	})

	test('can be mounted', () => {
		const wrapper = shallowMount(ColorPicker)

		expect(wrapper.html()).toBeTruthy()
	})

	test.each([
		{},
		{
			color: '#ffffffff',
			alphaChannel: 'show',
		},
		{
			color: '#ffffffff',
			alphaChannel: 'hide',
		},
		{
			color: '#ffffff',
			alphaChannel: 'show',
		},
		{
			color: '#ffffff',
			alphaChannel: 'hide',
		},
		{
			color: '#fff',
			alphaChannel: 'show',
		},
		{
			color: '#fff',
			alphaChannel: 'hide',
		},
		{
			color: 'white',
			alphaChannel: 'show',
		},
		{
			color: 'white',
			alphaChannel: 'hide',
		},
		{
			color: 'hsl(0, 0%, 100%, 1)',
			alphaChannel: 'show',
		},
		{
			color: 'hsl(0, 0%, 100%, 1)',
			alphaChannel: 'hide',
		},
	])('initializes color space and thumb correctly with default color value', ({ color, alphaChannel }) => {
		const wrapper = shallowMount(ColorPicker, {
			props: {
				color,
				defaultFormat: 'hex',
				alphaChannel,
			},
		})

		const colorPicker = /** @type {HTMLElement} */ (wrapper.find('.vacp-color-picker').element)
		expect(colorPicker.style.getPropertyValue('--vacp-hsl-h')).toBe('0')
		expect(colorPicker.style.getPropertyValue('--vacp-hsl-s')).toBe('0')
		expect(colorPicker.style.getPropertyValue('--vacp-hsl-l')).toBe('1')
		expect(colorPicker.style.getPropertyValue('--vacp-hsl-a')).toBe('1')

		const thumb = /** @type {HTMLElement} */ (wrapper.find('.vacp-color-space-thumb').element)
		expect(thumb.style.left).toBe('0%')
		expect(thumb.style.bottom).toBe('100%')
	})

	test('removes event listeners on unmount', async () => {
		const wrapper = shallowMount(ColorPicker)

		const colorSpace = wrapper.find('.vacp-color-space')
		await colorSpace.trigger('mousedown')
		const mouseMoveEvent = new MouseEvent('mousemove', { buttons: 1 })

		document.dispatchEvent(mouseMoveEvent)
		let emittedColorChangeEvents = wrapper.emitted('color-change')
		expect(emittedColorChangeEvents?.length).toBe(1)

		document.dispatchEvent(mouseMoveEvent)
		emittedColorChangeEvents = wrapper.emitted('color-change')
		expect(emittedColorChangeEvents?.length).toBe(2)

		wrapper.unmount()

		document.dispatchEvent(mouseMoveEvent)
		emittedColorChangeEvents = wrapper.emitted('color-change')
		// Note that we assert here that the method hasn’t been called *again*.
		expect(emittedColorChangeEvents).toBe(undefined)
	})

	describe('props & attributes', () => {
		test.each(/** @type {[any, string][]} */ ([
			['#f00', '#f00'],
			[{ r: 1, g: 0.5, b: 0, a: 0.5 }, '#ff800080'],
			[{ h: 0, s: 1, l: 0.5, a: 1 }, '#ff0000ff'],
			[{ h: 0.5, w: 0.33, b: 0.5, a: 1 }, '#548080ff'],
			[{ h: 0.5, s: 0.33, v: 0.5, a: 1 }, '#558080ff'],
		]))('mounts correctly with a valid color prop', async (colorProp, expectedHexInputValue) => {
			const wrapper = shallowMount(ColorPicker, {
				props: {
					color: colorProp,
					defaultFormat: 'hex',
				},
			})

			// We need to wait one tick before Vue will have re-rendered the component.
			await flushPromises()

			const input = /** @type {HTMLInputElement} */ (wrapper.find('.vacp-color-input').element)
			expect(input.value).toBe(expectedHexInputValue)
		})

		test('mounts correctly with an invalid color prop', () => {
			const wrapper = shallowMount(ColorPicker, {
				props: {
					color: '#ff',
					defaultFormat: 'hex',
				},
			})

			const input = /** @type {HTMLInputElement} */ (wrapper.find('.vacp-color-input').element)
			expect(input.value).toBe('#ffffffff')
		})

		test.each([
			[undefined, ['H', 'S', 'L']],
			['hex', ['Hex']],
			['hsl', ['H', 'S', 'L']],
			['hwb', ['H', 'W', 'B']],
			['rgb', ['R', 'G', 'B']],
		])('sets active color format to “%s” when providing default format prop', (defaultFormat, expectedLabels) => {
			const wrapper = shallowMount(ColorPicker, {
				props: {
					defaultFormat,
				},
			})

			const inputGroupMarkup = wrapper.find('.vacp-color-input-group').html()
			for (const expectedLabel of expectedLabels) {
				expect(inputGroupMarkup).toContain(expectedLabel)
			}
		})

		test.each(/** @type {[any, any][]} */([
			[
				'#f80c',
				{ r: 1, g: 0.5333333333333333, b: 0, a: 0.8 },
			],
			[
				{ h: 0.5, s: 0.33, v: 0.5, a: 1 },
				{ r: 0.33499999999999996, g: 0.5, b: 0.5, a: 1 },
			],
		]))('recomputes colors when color prop changes', async (colorProp, expectedColorChangePayload) => {
			const wrapper = shallowMount(ColorPicker)

			await wrapper.setProps({ color: colorProp })
			let emittedColorChangeEvents = wrapper.emitted('color-change')
			// @ts-ignore because `unknown` is clearly not a correct type for emitted records.
			let emittedRgbColor = emittedColorChangeEvents[emittedColorChangeEvents.length - 1][0].colors.rgb
			expect(emittedRgbColor).toEqual(expectedColorChangePayload)

			await wrapper.setProps({ color: '#fffc' })
			emittedColorChangeEvents = wrapper.emitted('color-change')
			// @ts-ignore because `unknown` is clearly not a correct type for emitted records.
			emittedRgbColor = emittedColorChangeEvents[emittedColorChangeEvents.length - 1][0].colors.rgb
			expect(emittedRgbColor).toEqual({ r: 1, g: 1, b: 1, a: 0.8 })
		})

		test('id attributes are set correctly', async () => {
			const id = 'test-color-picker'
			const wrapper = shallowMount(ColorPicker, {
				props: {
					id,
				},
			})

			const hueInput = wrapper.find(`#${id}-hue-slider`)
			expect(hueInput.exists()).toBe(true)
			const alphaInput = wrapper.find(`#${id}-alpha-slider`)
			expect(alphaInput.exists()).toBe(true)

			const colorHslHueInput = wrapper.find(`#${id}-color-hsl-h`)
			expect(colorHslHueInput.exists()).toBe(true)
			const colorHslSaturationInput = wrapper.find(`#${id}-color-hsl-s`)
			expect(colorHslSaturationInput.exists()).toBe(true)
			const colorHslLightnessInput = wrapper.find(`#${id}-color-hsl-l`)
			expect(colorHslLightnessInput.exists()).toBe(true)
			const colorHslAlphaInput = wrapper.find(`#${id}-color-hsl-a`)
			expect(colorHslAlphaInput.exists()).toBe(true)

			const formatSwitchButton = wrapper.find('.vacp-format-switch-button')
			await formatSwitchButton.trigger('click')

			const colorRgbRedInput = wrapper.find(`#${id}-color-hwb-h`)
			expect(colorRgbRedInput.exists()).toBe(true)
			const colorRgbGreenInput = wrapper.find(`#${id}-color-hwb-w`)
			expect(colorRgbGreenInput.exists()).toBe(true)
			const colorRgbBlueInput = wrapper.find(`#${id}-color-hwb-b`)
			expect(colorRgbBlueInput.exists()).toBe(true)
			const colorRgbAlphaInput = wrapper.find(`#${id}-color-hwb-a`)
			expect(colorRgbAlphaInput.exists()).toBe(true)
		})

		test.each([
			['show', true, 'hsl(180 0% 100% / 1)'],
			['hide', false, 'hsl(180 0% 100%)'],
		])('shows/hides correct elements when setting alphaChannel', async (alphaChannel, isElementVisible, expectedCssColor) => {
			const id = 'test-color-picker'
			const wrapper = shallowMount(ColorPicker, {
				attachTo: document.body,
				props: {
					id,
					alphaChannel,
				},
			})

			const alphaInput = wrapper.find(`#${id}-alpha-slider`)
			expect(alphaInput.exists()).toBe(isElementVisible)

			const colorHslAlphaInput = wrapper.find(`#${id}-color-hsl-a`)
			expect(colorHslAlphaInput.exists()).toBe(isElementVisible)

			const input = wrapper.find(`#${id}-color-hsl-h`)
			const inputElement = /** @type {HTMLInputElement} */ (input.element)
			inputElement.value = '180'

			await input.trigger('input')

			const emittedColorChangeEvents = wrapper.emitted('color-change')
			// @ts-ignore because `unknown` is clearly not a correct type for emitted records.
			const emittedCssColor = emittedColorChangeEvents[emittedColorChangeEvents.length - 1][0].cssColor
			expect(emittedCssColor).toEqual(expectedCssColor)
		})
	})

	describe('color space thumb interactions', () => {
		test('sets pointer origin when interacting with the color space element', async () => {
			const wrapper = shallowMount(ColorPicker)

			expect(wrapper.vm.pointerOriginatedInColorSpace).toBe(false)

			const colorSpace = wrapper.find('.vacp-color-space')
			await colorSpace.trigger('mousedown')
			expect(wrapper.vm.pointerOriginatedInColorSpace).toBe(true)

			document.dispatchEvent(new MouseEvent('mouseup'))
			expect(wrapper.vm.pointerOriginatedInColorSpace).toBe(false)

			await colorSpace.trigger('touchstart', {
				preventDefault: vi.fn(),
				touches: [{ clientX: 0, clientY: 0 }],
			})
			expect(wrapper.vm.pointerOriginatedInColorSpace).toBe(true)

			document.dispatchEvent(new TouchEvent('touchend'))
			expect(wrapper.vm.pointerOriginatedInColorSpace).toBe(false)
		})

		test('can initiate moving the color space thumb with a mouse', async () => {
			const clientX = 0
			const clientY = 0
			const mouseMoveEvent = {
				buttons: 1,
				preventDefault: vi.fn(),
				clientX,
				clientY,
			}

			const wrapper = shallowMount(ColorPicker, {
				attachTo: document.body,
				props: {
					color: '#f80c',
				},
			})

			let emittedColorChangeEvents = wrapper.emitted('color-change')
			expect(emittedColorChangeEvents?.length).toBe(1)

			const colorSpace = wrapper.find('.vacp-color-space')
			await colorSpace.trigger('mousedown')
			await colorSpace.trigger('mousemove', mouseMoveEvent)

			emittedColorChangeEvents = wrapper.emitted('color-change')
			expect(emittedColorChangeEvents?.length).toBe(2)

			// Remove test HTML injected via the `attachTo` option during mount.
			wrapper.unmount()
		})

		test('can initiate moving the color space thumb with a touch-based device', async () => {
			const wrapper = shallowMount(ColorPicker, {
				attachTo: document.body,
				props: {
					color: '#f80c',
				},
			})

			let emittedColorChangeEvents = wrapper.emitted('color-change')
			expect(emittedColorChangeEvents?.length).toBe(1)

			const colorSpace = wrapper.find('.vacp-color-space')
			await colorSpace.trigger('touchstart', {
				preventDefault: vi.fn(),
				touches: [{ clientX: 0, clientY: 0 }],
			})
			await colorSpace.trigger('touchmove', {
				preventDefault: vi.fn(),
				touches: [{ clientX: 0, clientY: 0 }],
			})

			emittedColorChangeEvents = wrapper.emitted('color-change')
			expect(emittedColorChangeEvents?.length).toBe(3)

			await colorSpace.trigger('touchstart', {
				preventDefault: vi.fn(),
				touches: [{ clientX: 0, clientY: 0 }],
			})
			await colorSpace.trigger('touchmove', {
				preventDefault: vi.fn(),
				touches: [{ clientX: 0, clientY: 0 }],
			})

			emittedColorChangeEvents = wrapper.emitted('color-change')
			expect(emittedColorChangeEvents?.length).toBe(5)

			// Remove test HTML injected via the `attachTo` option during mount.
			wrapper.unmount()
		})

		test('can not move the color space thumb with the wrong key', async () => {
			const keydownEvent = {
				key: 'a',
				preventDefault: vi.fn(),
			}

			const wrapper = shallowMount(ColorPicker)

			const thumb = wrapper.find('.vacp-color-space-thumb')
			await thumb.trigger('keydown', keydownEvent)

			expect(keydownEvent.preventDefault).not.toHaveBeenCalled()
		})

		test.each([
			['ArrowDown', false, 'v', 0.99],
			['ArrowDown', true, 'v', 0.9],
			['ArrowUp', false, 'v', 1],
			['ArrowUp', true, 'v', 1],
			['ArrowRight', false, 's', 1],
			['ArrowRight', true, 's', 1],
			['ArrowLeft', false, 's', 0.99],
			['ArrowLeft', true, 's', 0.9],
		])('can move the color space thumb with the %s key (holding shift: %s)', async (key, shiftKey, channel, expectedColorValue) => {
			const keydownEvent = {
				key,
				shiftKey,
				preventDefault: vi.fn(),
			}

			const wrapper = shallowMount(ColorPicker, {
				props: {
					color: 'rgb(128, 0, 255)',
				},
			})
			expect(keydownEvent.preventDefault).not.toHaveBeenCalled()

			const thumb = wrapper.find('.vacp-color-space-thumb')
			await thumb.trigger('keydown', keydownEvent)

			expect(keydownEvent.preventDefault).toHaveBeenCalled()
			const emittedColorChangeEvents = wrapper.emitted('color-change')
			// @ts-ignore because `unknown` is clearly not a correct type for emitted records.
			const emittedHsvColor = emittedColorChangeEvents[emittedColorChangeEvents.length - 1][0].colors.hsv
			expect(emittedHsvColor[channel]).toEqual(expectedColorValue)
		})
	})

	describe('hue & alpha range inputs', () => {
		test('can not increment/decrement in big steps without holding down shift', async () => {
			const keydownEvent = {
				key: 'ArrowRight',
				shiftKey: false,
			}

			const wrapper = shallowMount(ColorPicker, {
				props: {
					id: 'color-picker',
				},
			})
			const hueRangeInput = wrapper.find('#color-picker-hue-slider')
			const hueRangeInputElement = /** @type {HTMLInputElement} */ (hueRangeInput.element)
			const originalInputValue = hueRangeInputElement.value

			await hueRangeInput.trigger('keydown', keydownEvent)

			expect(hueRangeInputElement.value).toBe(originalInputValue)
		})

		test.each(/** @type {['increment' | 'decrement', number, string, string][]} */ ([
			['decrement', 1, 'ArrowDown', '1'],
			['decrement', 3, 'ArrowDown', '1'],
			['decrement', 1, 'ArrowLeft', '1'],
			['increment', 1, 'ArrowUp', '9'],
			['increment', 1, 'ArrowRight', '9'],
			['increment', 3, 'ArrowRight', '27'],
		]))('can %s range inputs %dx in big steps with %s', async (_, numberOfPresses, key, expectedValue) => {
			const wrapper = shallowMount(ColorPicker, {
				props: {
					id: 'color-picker',
				},
			})
			const hueRangeInput = wrapper.find('#color-picker-hue-slider')
			const hueRangeInputElement = /** @type {HTMLInputElement} */ (hueRangeInput.element)
			const keydownEvent = {
				key,
				shiftKey: true,
			}

			expect(hueRangeInput.exists()).toBe(true)

			while (numberOfPresses--) {
				await hueRangeInput.trigger('keydown', keydownEvent)
			}

			expect(hueRangeInputElement.value).toBe(expectedValue)
		})

		test('hue slider updates internal colors', async () => {
			const hueAngle = 30
			const expectedHueValue = hueAngle / 360

			const wrapper = shallowMount(ColorPicker, {
				props: {
					id: 'color-picker',
				},
			})
			const hueRangeInput = wrapper.find('#color-picker-hue-slider')
			const hueRangeInputElement = /** @type {HTMLInputElement} */ (hueRangeInput.element)
			hueRangeInputElement.value = String(hueAngle)
			const hueInputEvent = { currentTarget: hueRangeInputElement }

			await hueRangeInput.trigger('input', hueInputEvent)

			let emittedColorChangeEvents = wrapper.emitted('color-change')
			expect(emittedColorChangeEvents?.length).toBe(1)

			// @ts-ignore because `unknown` is clearly not a correct type for emitted records.
			let emittedHsvColor = emittedColorChangeEvents[emittedColorChangeEvents.length - 1][0].colors.hsv
			expect(emittedHsvColor.h).toEqual(expectedHueValue)

			const alpha = 90
			const expectedAlphaValue = alpha / 100

			const alphaRangeInput = wrapper.find('#color-picker-alpha-slider')
			const alphaRangeInputElement = /** @type {HTMLInputElement} */ (alphaRangeInput.element)
			alphaRangeInputElement.value = String(alpha)
			const alphaInputEvent = { currentTarget: alphaRangeInputElement }

			await alphaRangeInput.trigger('input', alphaInputEvent)

			emittedColorChangeEvents = wrapper.emitted('color-change')
			expect(emittedColorChangeEvents?.length).toBe(2)

			// @ts-ignore because `unknown` is clearly not a correct type for emitted records.
			emittedHsvColor = emittedColorChangeEvents[emittedColorChangeEvents.length - 1][0].colors.hsv
			expect(emittedHsvColor.a).toEqual(expectedAlphaValue)
		})
	})

	describe('copy button', () => {
		beforeAll(() => {
			Object.defineProperty(global.navigator, 'clipboard', {
				value: {
					writeText: () => {},
				},
			})
		})

		test.each([
			[{ defaultFormat: 'rgb', alphaChannel: 'show' }, 'rgb(255 255 255 / 1)'],
			[{ defaultFormat: 'hsl', alphaChannel: 'show' }, 'hsl(0 0% 100% / 1)'],
			[{ defaultFormat: 'hwb', alphaChannel: 'show' }, 'hwb(0 100% 0% / 1)'],
			[{ defaultFormat: 'hex', alphaChannel: 'show' }, '#ffffffff'],
			[{ defaultFormat: 'hex', alphaChannel: 'hide' }, '#ffffff'],
		])('copy button copies %s format as %s', async (props, cssColor) => {
			vi.spyOn(global.navigator.clipboard, 'writeText').mockImplementation(vi.fn(() => Promise.resolve()))

			const wrapper = shallowMount(ColorPicker, { props })

			const copyButton = wrapper.find('.vacp-copy-button')
			await copyButton.trigger('click')

			expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith(cssColor)
		})
	})

	describe('switch format button', () => {
		test('clicking switch format button cycles through active formats correctly', async () => {
			const wrapper = shallowMount(ColorPicker)
			const formatSwitchButton = wrapper.find('.vacp-format-switch-button')

			expect(wrapper.find('#color-picker-color-hsl-l').exists()).toBe(true)

			await formatSwitchButton.trigger('click')
			expect(wrapper.find('#color-picker-color-hwb-w').exists()).toBe(true)

			await formatSwitchButton.trigger('click')
			expect(wrapper.find('#color-picker-color-rgb-r').exists()).toBe(true)

			await formatSwitchButton.trigger('click')
			expect(wrapper.find('#color-picker-color-hex').exists()).toBe(true)

			await formatSwitchButton.trigger('click')
			expect(wrapper.find('#color-picker-color-hsl-l').exists()).toBe(true)
		})
	})

	describe('color value inputs', () => {
		test.each([
			[{ id: 'color-picker', defaultFormat: 'rgb' }, 'r', '127.'],
			[{ id: 'color-picker', defaultFormat: 'hsl' }, 's', 'a'],
			[{ id: 'color-picker', defaultFormat: 'hwb' }, 'b', '25.%'],
		])('updating a color input with an invalid value does not update the internal color data', async (props, channel, channelValue) => {
			const wrapper = shallowMount(ColorPicker, { props })

			const input = wrapper.find(`#${props.id}-color-${props.defaultFormat}-${channel}`)
			const inputElement = /** @type {HTMLInputElement} */ (input.element)
			inputElement.value = channelValue

			await input.trigger('input')

			const emittedColorChangeEvents = wrapper.emitted('color-change')
			expect(emittedColorChangeEvents).toBe(undefined)
		})

		test.each([
			['abc'],
			['25%'],
		])('updating a hex color input with an invalid value does not update the internal color data', async (invalidHexColorString) => {
			const wrapper = shallowMount(ColorPicker, {
				props: {
					id: 'color-picker',
					defaultFormat: 'hex',
				},
			})

			const input = wrapper.find('#color-picker-color-hex')
			const inputElement = /** @type {HTMLInputElement} */ (input.element)
			inputElement.value = invalidHexColorString

			await input.trigger('input')

			const emittedColorChangeEvents = wrapper.emitted('color-change')
			expect(emittedColorChangeEvents).toBe(undefined)
		})

		test.each([
			[{ id: 'color-picker', defaultFormat: 'rgb' }, 'r', '127.5'],
			[{ id: 'color-picker', defaultFormat: 'hsl' }, 's', '75%'],
			[{ id: 'color-picker', defaultFormat: 'hwb' }, 'b', '25.5%'],
		])('updating a %s color input with a valid value updates the internal color data', async (props, channel, channelValue) => {
			const wrapper = shallowMount(ColorPicker, { props })

			const input = wrapper.find(`#${props.id}-color-${props.defaultFormat}-${channel}`)
			const inputElement = /** @type {HTMLInputElement} */ (input.element)
			inputElement.value = channelValue

			await input.trigger('input')

			const emittedColorChangeEvents = wrapper.emitted('color-change')
			expect(emittedColorChangeEvents?.length).toBe(1)
		})

		test.each([
			['#ff8800cc'],
		])('updating a %s color input with a valid value updates the internal color data', async (channelValue) => {
			const wrapper = shallowMount(ColorPicker, {
				props: {
					id: 'color-picker',
					defaultFormat: 'hex',
				},
			})

			const input = wrapper.find('#color-picker-color-hex')
			const inputElement = /** @type {HTMLInputElement} */ (input.element)
			inputElement.value = channelValue

			await input.trigger('input')

			const emittedColorChangeEvents = wrapper.emitted('color-change')
			expect(emittedColorChangeEvents?.length).toBe(1)
		})
	})

	describe('color-change event', () => {
		test.each([
			[
				{ color: '#ff99aacc', defaultFormat: 'hsl', alphaChannel: 'show' },
				{
					cssColor: 'hsl(350 100% 80% / 0.8)',
					colors: {
						hex: '#ff99aacc',
						hsl: { h: 0.9722222222222222, s: 1, l: 0.8, a: 0.8 },
						hsv: { h: 0.9722222222222222, s: 0.4, v: 1, a: 0.8 },
						hwb: { h: 0.9722222222222222, w: 0.6, b: 0, a: 0.8 },
						rgb: { r: 1, g: 0.6, b: 0.6666666666666666, a: 0.8 },
					},
				},
			],
			[
				{ color: '#f9ac', defaultFormat: 'hsl', alphaChannel: 'show' },
				{
					cssColor: 'hsl(350 100% 80% / 0.8)',
					colors: {
						hex: '#f9ac',
						hsl: { h: 0.9722222222222222, s: 1, l: 0.8, a: 0.8 },
						hsv: { h: 0.9722222222222222, s: 0.4, v: 1, a: 0.8 },
						hwb: { h: 0.9722222222222222, w: 0.6, b: 0, a: 0.8 },
						rgb: { r: 1, g: 0.6, b: 0.6666666666666666, a: 0.8 },
					},
				},
			],
			[
				{ color: '#ff99aacc', defaultFormat: 'hex', alphaChannel: 'show' },
				{
					cssColor: '#ff99aacc',
					colors: {
						hex: '#ff99aacc',
						hsl: { h: 0.9722222222222222, s: 1, l: 0.8, a: 0.8 },
						hsv: { h: 0.9722222222222222, s: 0.4, v: 1, a: 0.8 },
						hwb: { h: 0.9722222222222222, w: 0.6, b: 0, a: 0.8 },
						rgb: { r: 1, g: 0.6, b: 0.6666666666666666, a: 0.8 },
					},
				},
			],
			[
				{ color: '#f9ac', defaultFormat: 'hex', alphaChannel: 'show' },
				{
					cssColor: '#f9ac',
					colors: {
						hex: '#f9ac',
						hsl: { h: 0.9722222222222222, s: 1, l: 0.8, a: 0.8 },
						hsv: { h: 0.9722222222222222, s: 0.4, v: 1, a: 0.8 },
						hwb: { h: 0.9722222222222222, w: 0.6, b: 0, a: 0.8 },
						rgb: { r: 1, g: 0.6, b: 0.6666666666666666, a: 0.8 },
					},
				},
			],
			[
				{ color: '#ff99aacc', defaultFormat: 'hsl', alphaChannel: 'hide' },
				{
					cssColor: 'hsl(350 100% 80%)',
					colors: {
						hex: '#ff99aaff',
						hsl: { h: 0.9722222222222222, s: 1, l: 0.8, a: 1 },
						hsv: { h: 0.9722222222222222, s: 0.4, v: 1, a: 1 },
						hwb: { h: 0.9722222222222222, w: 0.6, b: 0, a: 1 },
						rgb: { r: 1, g: 0.6, b: 0.6666666666666666, a: 1 },
					},
				},
			],
			[
				{ color: '#f9ac', defaultFormat: 'hsl', alphaChannel: 'hide' },
				{
					cssColor: 'hsl(350 100% 80%)',
					colors: {
						hex: '#f9af',
						hsl: { h: 0.9722222222222222, s: 1, l: 0.8, a: 1 },
						hsv: { h: 0.9722222222222222, s: 0.4, v: 1, a: 1 },
						hwb: { h: 0.9722222222222222, w: 0.6, b: 0, a: 1 },
						rgb: { r: 1, g: 0.6, b: 0.6666666666666666, a: 1 },
					},
				},
			],
			[
				{ color: '#ff99aacc', defaultFormat: 'hex', alphaChannel: 'hide' },
				{
					cssColor: '#ff99aa',
					colors: {
						hex: '#ff99aaff',
						hsl: { h: 0.9722222222222222, s: 1, l: 0.8, a: 1 },
						hsv: { h: 0.9722222222222222, s: 0.4, v: 1, a: 1 },
						hwb: { h: 0.9722222222222222, w: 0.6, b: 0, a: 1 },
						rgb: { r: 1, g: 0.6, b: 0.6666666666666666, a: 1 },
					},
				},
			],
			[
				{ color: '#f9ac', defaultFormat: 'hex', alphaChannel: 'hide' },
				{
					cssColor: '#f9a',
					colors: {
						hex: '#f9af',
						hsl: { h: 0.9722222222222222, s: 1, l: 0.8, a: 1 },
						hsv: { h: 0.9722222222222222, s: 0.4, v: 1, a: 1 },
						hwb: { h: 0.9722222222222222, w: 0.6, b: 0, a: 1 },
						rgb: { r: 1, g: 0.6, b: 0.6666666666666666, a: 1 },
					},
				},
			],
			[
				{ color: '#23a96a', defaultFormat: 'hex', alphaChannel: 'hide' },
				{
					cssColor: '#23a96a',
					colors: {
						hex: '#23a96aff',
						hsl: { h: 0.4216417910447761, s: 0.6568627450980391, l: 0.4, a: 1 },
						hsv: { h: 0.4216417910447761, s: 0.7928994082840236, v: 0.6627450980392157, a: 1 },
						hwb: { h: 0.4216417910447761, w: 0.13725490196078433, b: 0.33725490196078434, a: 1 },
						rgb: { r: 0.13725490196078433, g: 0.6627450980392157, b: 0.41568627450980394, a: 1 },
					},
				},
			],
		])('emits correct data', async (props, expectedData) => {
			const wrapper = shallowMount(ColorPicker, { props })

			await wrapper.setProps({ color: props.color })

			const emittedColorChangeEvents = wrapper.emitted('color-change')
			// @ts-ignore because `unknown` is clearly not a correct type for emitted records.
			const colorChangeData = emittedColorChangeEvents[emittedColorChangeEvents.length - 1][0]
			expect(colorChangeData).toEqual(expectedData)
		})
	})

	describe('color inputs', () => {
		test.each([
			[{ color: '#12345678', defaultFormat: 'hex', alphaChannel: 'show' }, '#12345678'],
			[{ color: '#12345678', defaultFormat: 'hex', alphaChannel: 'hide' }, '#123456'],
			[{ color: '#123456', defaultFormat: 'hex', alphaChannel: 'show' }, '#123456'],
			[{ color: '#123456', defaultFormat: 'hex', alphaChannel: 'hide' }, '#123456'],
			[{ color: '#123a', defaultFormat: 'hex', alphaChannel: 'show' }, '#123a'],
			[{ color: '#123a', defaultFormat: 'hex', alphaChannel: 'hide' }, '#123'],
			[{ color: '#123', defaultFormat: 'hex', alphaChannel: 'show' }, '#123'],
			[{ color: '#123', defaultFormat: 'hex', alphaChannel: 'hide' }, '#123'],
		])('shows expected color for hex colors', async (props, expectedHexColor) => {
			const wrapper = shallowMount(ColorPicker, { props })

			await wrapper.setProps({ color: props.color })

			const input = /** @type {HTMLInputElement} */ (wrapper.find('#color-picker-color-hex').element)
			expect(input.value).toBe(expectedHexColor)
		})
	})
})
