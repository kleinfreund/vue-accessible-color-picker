import { beforeAll, beforeEach, describe, test, expect, vi } from 'vitest'
import { shallowMount, flushPromises, ComponentMountingOptions } from '@vue/test-utils'

import ColorPicker from './ColorPicker.vue'
import { ColorChangeDetail, ColorPickerProps } from './types.js'

type MountingOptions = ComponentMountingOptions<ColorPickerProps> & {
	// Overrides the props in `ComponentMountingOptions` to be more accurate.
	props?: ColorPickerProps
}

function createWrapper (options: MountingOptions = {}) {
	return shallowMount(ColorPicker, options)
}

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
		const wrapper = createWrapper()

		expect(wrapper.html()).toBeTruthy()
	})

	test.each<ColorPickerProps>([
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
			color: 'hsl(0 0% 100% / 1)',
			alphaChannel: 'show',
		},
		{
			color: 'hsl(0 0% 100% / 1)',
			alphaChannel: 'hide',
		},
	])('initializes color space and thumb correctly with default color value', (props) => {
		const wrapper = createWrapper({
			props: {
				defaultFormat: 'hex',
				...props,
			},
		})

		const colorPicker = wrapper.find<HTMLElement>('.vacp-color-picker').element
		expect(colorPicker.style.getPropertyValue('--vacp-color')).toBe('hsl(0 0% 100%)')

		const thumb = wrapper.find<HTMLElement>('.vacp-color-space-thumb').element
		expect(thumb.style.left).toBe('0%')
		expect(thumb.style.bottom).toBe('100%')
	})

	test('removes event listeners on unmount', () => {
		const wrapper = createWrapper()

		const colorSpace = wrapper.find('.vacp-color-space')

		colorSpace.element.getBoundingClientRect = vi.fn(() => ({
			width: 200,
			height: 200,
			x: 0,
			y: 0,
			top: 0,
			left: 0,
			bottom: 0,
			right: 0,
			toJSON: vi.fn(),
		}))

		colorSpace.element.dispatchEvent(new MouseEvent('pointerdown', { buttons: 1, clientX: 0 }))
		expect(wrapper.emitted<[ColorChangeDetail]>('color-change')?.length ?? 0).toBe(0)

		document.dispatchEvent(new MouseEvent('pointermove', { buttons: 1, clientX: 0 }))
		expect(wrapper.emitted<[ColorChangeDetail]>('color-change')?.length ?? 0).toBe(0)

		document.dispatchEvent(new MouseEvent('pointermove', { buttons: 1, clientX: 1 }))
		expect(wrapper.emitted<[ColorChangeDetail]>('color-change')?.length ?? 0).toBe(1)

		wrapper.unmount()

		document.dispatchEvent(new MouseEvent('pointermove', { buttons: 1, clientX: 2 }))
		// Note that we assert here that the method hasn’t been called *again*.
		expect(wrapper.emitted('color-change')).toBe(undefined)
	})

	describe('props & attributes', () => {
		test.each<[ColorPickerProps, string]>([
			[
				{ color: '#f00' },
				'#f00',
			],
			[
				{ color: { r: 255, g: 127.5, b: 0, a: 0.5 } },
				'#ff800080',
			],
			[
				{ color: { h: 0, s: 100, l: 50, a: 1 } },
				'#ff0000ff',
			],
			[
				{ color: { h: 180, w: 33, b: 50, a: 1 } },
				'#548080ff',
			],
		])('mounts correctly with a valid color prop', async (props, expectedHexInputValue) => {
			const wrapper = createWrapper({
				props: {
					defaultFormat: 'hex',
					...props,
				},
			})

			// We need to wait one tick before Vue will have re-rendered the component.
			await flushPromises()

			const input = wrapper.find<HTMLInputElement>('.vacp-color-input').element
			expect(input.value).toBe(expectedHexInputValue)
		})

		test('mounts correctly with an invalid color prop', () => {
			const wrapper = createWrapper({
				props: {
					color: '#ff',
					defaultFormat: 'hex',
				},
			})

			const input = wrapper.find<HTMLInputElement>('.vacp-color-input').element
			expect(input.value).toBe('#ffffffff')
		})

		test('falls back to visible color format when defaultFormat isn\'t a visible format', () => {
			const wrapper = createWrapper({
				props: {
					color: '#fff',
					defaultFormat: 'hsl',
					visibleFormats: ['hex'],
				},
			})

			const input = wrapper.find<HTMLInputElement>('.vacp-color-input').element
			expect(input.value).toBe('#ffffffff')
		})

		test.each<[ColorPickerProps, string[]]>([
			[
				{ defaultFormat: undefined },
				['H', 'S', 'L'],
			],
			[
				{ defaultFormat: 'hex' },
				['Hex'],
			],
			[
				{ defaultFormat: 'hsl' },
				['H', 'S', 'L'],
			],
			[
				{ defaultFormat: 'hwb' },
				['H', 'W', 'B'],
			],
			[
				{ defaultFormat: 'rgb' },
				['R', 'G', 'B'],
			],
		])('sets active color format to “%s” when providing default format prop', (props, expectedLabels) => {
			const wrapper = createWrapper({ props })

			const inputGroupMarkup = wrapper.find('.vacp-color-input-group').html()
			for (const expectedLabel of expectedLabels) {
				expect(inputGroupMarkup).toContain(expectedLabel)
			}
		})

		test.each([
			[
				'#f80c',
				{ r: 255, g: 136, b: 0, a: 0.8 },
			],
			[
				{ h: 180, s: 50, l: 50, a: 1 },
				{ r: 63.75, g: 191.25, b: 191.25, a: 1 },
			],
		])('recomputes colors when color prop changes', async (colorProp, expectedColorChangePayload) => {
			const wrapper = createWrapper()

			await wrapper.setProps({ color: colorProp })
			let emittedColorChangeEvents = wrapper.emitted('color-change')
			// @ts-ignore because `unknown` is clearly not a correct type for emitted records.
			let emittedRgbColor = emittedColorChangeEvents[emittedColorChangeEvents.length - 1][0].colors.rgb
			expect(emittedRgbColor).toEqual(expectedColorChangePayload)

			await wrapper.setProps({ color: '#fffc' })
			emittedColorChangeEvents = wrapper.emitted('color-change')
			// @ts-ignore because `unknown` is clearly not a correct type for emitted records.
			emittedRgbColor = emittedColorChangeEvents[emittedColorChangeEvents.length - 1][0].colors.rgb
			expect(emittedRgbColor).toEqual({ r: 255, g: 255, b: 255, a: 0.8 })
		})

		test('id attributes are set correctly', async () => {
			const id = 'test-color-picker'
			const wrapper = createWrapper({
				props: {
					id,
				},
			})
			const formatSwitchButton = wrapper.find('.vacp-format-switch-button')

			const hueInput = wrapper.find(`#${id}-hue-slider`)
			expect(hueInput.exists()).toBe(true)
			const alphaInput = wrapper.find(`#${id}-alpha-slider`)
			expect(alphaInput.exists()).toBe(true)

			const formats = ['hsl', 'hwb', 'rgb']

			for (const format of formats) {
				const channels = format.split('')
				expect(wrapper.find(`[id="${id}-color-${format}-${channels[0]!}-label"]`).exists()).toBe(true)
				expect(wrapper.find(`[id="${id}-color-${format}-${channels[0]!}"]`).exists()).toBe(true)
				expect(wrapper.find(`[for="${id}-color-${format}-${channels[0]!}"]`).exists()).toBe(true)
				expect(wrapper.find(`[id="${id}-color-${format}-${channels[1]!}-label"]`).exists()).toBe(true)
				expect(wrapper.find(`[id="${id}-color-${format}-${channels[1]!}"]`).exists()).toBe(true)
				expect(wrapper.find(`[for="${id}-color-${format}-${channels[1]!}"]`).exists()).toBe(true)
				expect(wrapper.find(`[id="${id}-color-${format}-${channels[2]!}-label"]`).exists()).toBe(true)
				expect(wrapper.find(`[id="${id}-color-${format}-${channels[2]!}"]`).exists()).toBe(true)
				expect(wrapper.find(`[for="${id}-color-${format}-${channels[2]!}"]`).exists()).toBe(true)
				expect(wrapper.find(`[id="${id}-color-${format}-a"]`).exists()).toBe(true)
				expect(wrapper.find(`[for="${id}-color-${format}-a"]`).exists()).toBe(true)

				await formatSwitchButton.trigger('click')
			}
		})

		test.each<[ColorPickerProps, boolean, string]>([
			[{ alphaChannel: 'show' }, true, 'hsl(180 0% 100% / 1)'],
			[{ alphaChannel: 'hide' }, false, 'hsl(180 0% 100%)'],
		])('shows/hides correct elements when setting alphaChannel', (props, isElementVisible, expectedCssColor) => {
			const id = 'test-color-picker'
			const wrapper = createWrapper({
				props: {
					id,
					...props,
				},
			})

			const alphaInput = wrapper.find(`#${id}-alpha-slider`)
			expect(alphaInput.exists()).toBe(isElementVisible)

			const colorHslAlphaInput = wrapper.find(`#${id}-color-hsl-a`)
			expect(colorHslAlphaInput.exists()).toBe(isElementVisible)

			const inputElement = wrapper.find<HTMLInputElement>(`#${id}-color-hsl-h`).element
			inputElement.value = '180'
			inputElement.dispatchEvent(new InputEvent('input'))

			const emittedColorChangeEvents = wrapper.emitted('color-change')
			// @ts-ignore because `unknown` is clearly not a correct type for emitted records.
			const emittedCssColor = emittedColorChangeEvents[emittedColorChangeEvents.length - 1][0].cssColor
			expect(emittedCssColor).toEqual(expectedCssColor)
		})

		test('sets fully-opaque “--vacp-color” custom property', async () => {
			const wrapper = createWrapper()
			await flushPromises()
			expect(wrapper.element.style.getPropertyValue('--vacp-color')).toBe('hsl(0 0% 100%)')

			await wrapper.setProps({
				color: '#f60c',
			})
			await flushPromises()
			expect(wrapper.element.style.getPropertyValue('--vacp-color')).toBe('hsl(24 100% 50%)')
		})
	})

	describe('color space thumb interactions', () => {
		test('can initiate moving the color space thumb with a pointer device', async () => {
			const wrapper = createWrapper({
				props: {
					color: '#f80c',
				},
			})

			expect(wrapper.emitted('color-change')?.length).toBe(1)

			const colorSpace = wrapper.find('.vacp-color-space')

			colorSpace.element.getBoundingClientRect = vi.fn(() => ({
				width: 200,
				height: 200,
				x: 0,
				y: 0,
				top: 0,
				left: 0,
				bottom: 0,
				right: 0,
				toJSON: vi.fn(),
			}))

			await colorSpace.trigger('pointerdown', {
				buttons: 1,
				// Remove these once pointer events are implemented in JSDOM: https://github.com/jsdom/jsdom/issues/2527
				clientX: 0,
				clientY: 0,
			})
			await colorSpace.trigger('pointermove', {
				buttons: 1,
				preventDefault: vi.fn(),
				// Remove these once pointer events are implemented in JSDOM: https://github.com/jsdom/jsdom/issues/2527
				clientX: 0,
				clientY: 0,
			})

			expect(wrapper.emitted('color-change')?.length).toBe(2)
		})

		test('can initiate moving the color space thumb with a touch-based device', async () => {
			const wrapper = createWrapper({
				props: {
					color: '#f80c',
				},
			})

			expect(wrapper.emitted('color-change')?.length).toBe(1)

			const colorSpace = wrapper.find('.vacp-color-space')

			colorSpace.element.getBoundingClientRect = vi.fn(() => ({
				width: 200,
				height: 200,
				x: 0,
				y: 0,
				top: 0,
				left: 0,
				bottom: 0,
				right: 0,
				toJSON: vi.fn(),
			}))

			await colorSpace.trigger('touchstart', {
				preventDefault: vi.fn(),
				touches: [{ clientX: 0, clientY: 0 }],
			})
			await colorSpace.trigger('touchmove', {
				preventDefault: vi.fn(),
				touches: [{ clientX: 0, clientY: 0 }],
			})

			expect(wrapper.emitted('color-change')?.length).toBe(2)

			await colorSpace.trigger('touchstart', {
				preventDefault: vi.fn(),
				touches: [{ clientX: 1, clientY: 0 }],
			})
			await colorSpace.trigger('touchmove', {
				preventDefault: vi.fn(),
				touches: [{ clientX: 1, clientY: 0 }],
			})

			expect(wrapper.emitted('color-change')?.length).toBe(3)
		})

		test('can not move the color space thumb with the wrong key', async () => {
			const keydownEvent = {
				key: 'a',
				preventDefault: vi.fn(),
			}

			const wrapper = createWrapper()

			const thumb = wrapper.find('.vacp-color-space-thumb')
			await thumb.trigger('keydown', keydownEvent)

			expect(keydownEvent.preventDefault).not.toHaveBeenCalled()
		})

		test.each([
			['ArrowDown', false, 'v', 49],
			['ArrowDown', true, 'v', 40],
			['ArrowUp', false, 'v', 51],
			['ArrowUp', true, 'v', 60],
			['ArrowRight', false, 's', 51],
			['ArrowRight', true, 's', 60],
			['ArrowLeft', false, 's', 49],
			['ArrowLeft', true, 's', 40],
		])('can move the color space thumb with the %s key (holding shift: %s)', async (key, shiftKey, channel, expectedColorValue) => {
			const keydownEvent = {
				key,
				shiftKey,
				preventDefault: vi.fn(),
			}

			const wrapper = createWrapper({
				props: {
					color: 'hwb(180 25% 50% / 1)',
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

			const wrapper = createWrapper({
				props: {
					id: 'color-picker',
				},
			})
			const hueRangeInput = wrapper.find<HTMLInputElement>('#color-picker-hue-slider')
			const hueRangeInputElement = hueRangeInput.element
			const originalInputValue = hueRangeInputElement.value

			await hueRangeInput.trigger('keydown', keydownEvent)

			expect(hueRangeInputElement.value).toBe(originalInputValue)
		})

		test.each([
			['decrement', 1, 'ArrowDown', '1'],
			['decrement', 3, 'ArrowDown', '1'],
			['decrement', 1, 'ArrowLeft', '1'],
			['increment', 1, 'ArrowUp', '9'],
			['increment', 1, 'ArrowRight', '9'],
			['increment', 3, 'ArrowRight', '27'],
		])('can %s range inputs %dx in big steps with %s', async (_, numberOfPresses, key, expectedValue) => {
			const wrapper = createWrapper({
				props: {
					id: 'color-picker',
				},
			})
			const hueRangeInput = wrapper.find<HTMLInputElement>('#color-picker-hue-slider')
			const hueRangeInputElement = hueRangeInput.element
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
			const expectedHueValue = '30'

			const wrapper = createWrapper({
				props: {
					id: 'color-picker',
				},
			})
			const hueRangeInput = wrapper.find<HTMLInputElement>('#color-picker-hue-slider')
			const hueRangeInputElement = hueRangeInput.element
			hueRangeInputElement.value = expectedHueValue
			const hueInputEvent = { currentTarget: hueRangeInputElement }

			await hueRangeInput.trigger('input', hueInputEvent)

			let emittedColorChangeEvents = wrapper.emitted('color-change')
			expect(emittedColorChangeEvents?.length).toBe(1)

			// @ts-ignore because `unknown` is clearly not a correct type for emitted records.
			let emittedHsvColor = emittedColorChangeEvents[emittedColorChangeEvents.length - 1][0].colors.hsv
			expect(emittedHsvColor.h).toEqual(expectedHueValue)

			const expectedAlphaValue = '0.9'

			const alphaRangeInput = wrapper.find<HTMLInputElement>('#color-picker-alpha-slider')
			const alphaRangeInputElement = alphaRangeInput.element
			alphaRangeInputElement.value = expectedAlphaValue
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
					// eslint-disable-next-line @typescript-eslint/no-empty-function
					writeText: () => {},
				},
			})
		})

		test.each<[ColorPickerProps, string]>([
			[
				{ defaultFormat: 'rgb', alphaChannel: 'show' },
				'rgb(255 255 255 / 1)',
			],
			[
				{ defaultFormat: 'hsl', alphaChannel: 'show' },
				'hsl(0 0% 100% / 1)',
			],
			[
				{ defaultFormat: 'hwb', alphaChannel: 'show' },
				'hwb(0 100% 0% / 1)',
			],
			[
				{ defaultFormat: 'hex', alphaChannel: 'show' },
				'#ffffffff',
			],
			[
				{ defaultFormat: 'hex', alphaChannel: 'hide' },
				'#ffffff',
			],
		])('copy button copies %s format as %s', async (props, cssColor) => {
			vi.spyOn(global.navigator.clipboard, 'writeText').mockImplementation(vi.fn(() => Promise.resolve()))

			const wrapper = createWrapper({ props })

			const copyButton = wrapper.find('.vacp-copy-button')
			await copyButton.trigger('click')

			expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith(cssColor)
		})

		test('works with alternative copy function', async () => {
			const spy = vi.fn()
			const wrapper = createWrapper({
				props: {
					copy: spy,
				},
			})

			await wrapper.vm.copyColor()
			expect(spy).toHaveBeenCalledTimes(1)
		})
	})

	describe('switch format button', () => {
		test('clicking switch format button cycles through active formats correctly', async () => {
			const wrapper = createWrapper()
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

		test('exposes switchFormat method', async () => {
			const wrapper = createWrapper()

			expect(wrapper.find('#color-picker-color-hsl-l').exists()).toBe(true)

			wrapper.vm.switchFormat()
			await flushPromises()
			expect(wrapper.find('#color-picker-color-hwb-w').exists()).toBe(true)
		})
	})

	describe('color value inputs', () => {
		test.each<[ColorPickerProps, string, string]>([
			[
				{ id: 'color-picker', defaultFormat: 'rgb' },
				'r',
				'127.',
			],
			[
				{ id: 'color-picker', defaultFormat: 'hsl' },
				's',
				'a',
			],
			[
				{ id: 'color-picker', defaultFormat: 'hwb' },
				'b',
				'25.%',
			],
		])('updating a color input with an invalid value does not update the internal color data', async (props, channel, channelValue) => {
			const wrapper = createWrapper({ props })

			const input = wrapper.find<HTMLInputElement>(`#${props.id!}-color-${props.defaultFormat!}-${channel}`)
			const inputElement = input.element
			inputElement.value = channelValue

			await input.trigger('input')

			const emittedColorChangeEvents = wrapper.emitted('color-change')
			expect(emittedColorChangeEvents).toBe(undefined)
		})

		test.each([
			['abc'],
			['25%'],
		])('updating a hex color input with an invalid value does not update the internal color data', async (invalidHexColorString) => {
			const wrapper = createWrapper({
				props: {
					id: 'color-picker',
					defaultFormat: 'hex',
				},
			})

			const input = wrapper.find<HTMLInputElement>('#color-picker-color-hex')
			const inputElement = input.element
			inputElement.value = invalidHexColorString

			await input.trigger('input')

			const emittedColorChangeEvents = wrapper.emitted('color-change')
			expect(emittedColorChangeEvents).toBe(undefined)
		})

		test.each<[ColorPickerProps, string, string]>([
			[
				{ id: 'color-picker', defaultFormat: 'rgb' },
				'r',
				'127.5',
			],
			[
				{ id: 'color-picker', defaultFormat: 'hsl' },
				's',
				'75%',
			],
			[
				{ id: 'color-picker', defaultFormat: 'hwb' },
				'b',
				'25.5%',
			],
		])('updating a %s color input with a valid value updates the internal color data', async (props, channel, channelValue) => {
			const wrapper = createWrapper({ props })

			const input = wrapper.find<HTMLInputElement>(`#${props.id!}-color-${props.defaultFormat!}-${channel}`)
			const inputElement = input.element
			inputElement.value = channelValue

			await input.trigger('input')

			const emittedColorChangeEvents = wrapper.emitted('color-change')
			expect(emittedColorChangeEvents?.length).toBe(1)
		})

		test.each([
			['#ff8800cc'],
		])('updating a %s color input with a valid value updates the internal color data', async (channelValue) => {
			const wrapper = createWrapper({
				props: {
					id: 'color-picker',
					defaultFormat: 'hex',
				},
			})

			const input = wrapper.find<HTMLInputElement>('#color-picker-color-hex')
			const inputElement = input.element
			inputElement.value = channelValue

			await input.trigger('input')

			const emittedColorChangeEvents = wrapper.emitted('color-change')
			expect(emittedColorChangeEvents?.length).toBe(1)
		})
	})

	describe('color-change event', () => {
		test.each<[ColorPickerProps, ColorChangeDetail]>([
			[
				{ color: '#ff99aacc', defaultFormat: 'hsl', alphaChannel: 'show' },
				{
					cssColor: 'hsl(350 100% 80% / 0.8)',
					colors: {
						hex: '#ff99aacc',
						hsl: { h: 350, s: 100, l: 80, a: 0.8 },
						hsv: { h: 350, s: 39.99999999999999, v: 100, a: 0.8 },
						hwb: { h: 350, w: 60.00000000000001, b: 0, a: 0.8 },
						rgb: { r: 255, g: 153, b: 170, a: 0.8 },
					},
				},
			],
			[
				{ color: '#f9ac', defaultFormat: 'hsl', alphaChannel: 'show' },
				{
					cssColor: 'hsl(350 100% 80% / 0.8)',
					colors: {
						hex: '#f9ac',
						hsl: { h: 350, s: 100, l: 80, a: 0.8 },
						hsv: { h: 350, s: 39.99999999999999, v: 100, a: 0.8 },
						hwb: { h: 350, w: 60.00000000000001, b: 0, a: 0.8 },
						rgb: { r: 255, g: 153, b: 170, a: 0.8 },
					},
				},
			],
			[
				{ color: '#ff99aacc', defaultFormat: 'hex', alphaChannel: 'show' },
				{
					cssColor: '#ff99aacc',
					colors: {
						hex: '#ff99aacc',
						hsl: { h: 350, s: 100, l: 80, a: 0.8 },
						hsv: { h: 350, s: 39.99999999999999, v: 100, a: 0.8 },
						hwb: { h: 350, w: 60.00000000000001, b: 0, a: 0.8 },
						rgb: { r: 255, g: 153, b: 170, a: 0.8 },
					},
				},
			],
			[
				{ color: '#f9ac', defaultFormat: 'hex', alphaChannel: 'show' },
				{
					cssColor: '#f9ac',
					colors: {
						hex: '#f9ac',
						hsl: { h: 350, s: 100, l: 80, a: 0.8 },
						hsv: { h: 350, s: 39.99999999999999, v: 100, a: 0.8 },
						hwb: { h: 350, w: 60.00000000000001, b: 0, a: 0.8 },
						rgb: { r: 255, g: 153, b: 170, a: 0.8 },
					},
				},
			],
			[
				{ color: '#ff99aacc', defaultFormat: 'hsl', alphaChannel: 'hide' },
				{
					cssColor: 'hsl(350 100% 80%)',
					colors: {
						hex: '#ff99aaff',
						hsl: { h: 350, s: 100, l: 80, a: 1 },
						hsv: { h: 350, s: 39.99999999999999, v: 100, a: 1 },
						hwb: { h: 350, w: 60.00000000000001, b: 0, a: 1 },
						rgb: { r: 255, g: 153, b: 170, a: 1 },
					},
				},
			],
			[
				{ color: '#f9ac', defaultFormat: 'hsl', alphaChannel: 'hide' },
				{
					cssColor: 'hsl(350 100% 80%)',
					colors: {
						hex: '#f9af',
						hsl: { h: 350, s: 100, l: 80, a: 1 },
						hsv: { h: 350, s: 39.99999999999999, v: 100, a: 1 },
						hwb: { h: 350, w: 60.00000000000001, b: 0, a: 1 },
						rgb: { r: 255, g: 153, b: 170, a: 1 },
					},
				},
			],
			[
				{ color: '#ff99aacc', defaultFormat: 'hex', alphaChannel: 'hide' },
				{
					cssColor: '#ff99aa',
					colors: {
						hex: '#ff99aaff',
						hsl: { h: 350, s: 100, l: 80, a: 1 },
						hsv: { h: 350, s: 39.99999999999999, v: 100, a: 1 },
						hwb: { h: 350, w: 60.00000000000001, b: 0, a: 1 },
						rgb: { r: 255, g: 153, b: 170, a: 1 },
					},
				},
			],
			[
				{ color: '#f9ac', defaultFormat: 'hex', alphaChannel: 'hide' },
				{
					cssColor: '#f9a',
					colors: {
						hex: '#f9af',
						hsl: { h: 350, s: 100, l: 80, a: 1 },
						hsv: { h: 350, s: 39.99999999999999, v: 100, a: 1 },
						hwb: { h: 350, w: 60.00000000000001, b: 0, a: 1 },
						rgb: { r: 255, g: 153, b: 170, a: 1 },
					},
				},
			],
			[
				{ color: '#23a96a', defaultFormat: 'hex', alphaChannel: 'hide' },
				{
					cssColor: '#23a96a',
					colors: {
						hex: '#23a96aff',
						hsl: { h: 151.7910447761194, s: 65.68627450980392, l: 40, a: 1 },
						hsv: { h: 151.7910447761194, s: 79.28994082840237, v: 66.27450980392157, a: 1 },
						hwb: { h: 151.7910447761194, w: 13.725490196078432, b: 33.725490196078425, a: 1 },
						rgb: { r: 35, g: 169, b: 106, a: 1 },
					},
				},
			],
		])('emits correct data', async (props, expectedData) => {
			const wrapper = createWrapper({ props })

			await wrapper.setProps({ color: props.color })

			const emittedEvents = wrapper.emitted('color-change')
			// @ts-ignore because `unknown` is clearly not a correct type for emitted records.
			const data = emittedEvents[emittedEvents.length - 1][0]
			expect(data).toEqual(expectedData)
		})
	})

	describe('color-copy event', () => {
		test.each<[ColorPickerProps, ColorChangeDetail]>([
			[
				{ color: '#ff99aacc', defaultFormat: 'hsl', alphaChannel: 'show' },
				{
					cssColor: 'hsl(350 100% 80% / 0.8)',
					colors: {
						hex: '#ff99aacc',
						hsl: { h: 350, s: 100, l: 80, a: 0.8 },
						hsv: { h: 350, s: 39.99999999999999, v: 100, a: 0.8 },
						hwb: { h: 350, w: 60.00000000000001, b: 0, a: 0.8 },
						rgb: { r: 255, g: 153, b: 170, a: 0.8 },
					},
				},
			],
		])('emits correct data', async (props, expectedData) => {
			const wrapper = createWrapper({ props })

			const copyButton = wrapper.find('.vacp-copy-button')
			await copyButton.trigger('click')

			const emittedEvents = wrapper.emitted('color-copy')
			// @ts-ignore because `unknown` is clearly not a correct type for emitted records.
			const data = emittedEvents[emittedEvents.length - 1][0]
			expect(data).toEqual(expectedData)
		})
	})

	describe('color inputs', () => {
		test.each<[ColorPickerProps, string]>([
			[
				{ color: '#12345678', alphaChannel: 'show' },
				'#12345678',
			],
			[
				{ color: '#12345678', alphaChannel: 'hide' },
				'#123456',
			],
			[
				{ color: '#123456', alphaChannel: 'show' },
				'#123456',
			],
			[
				{ color: '#123456', alphaChannel: 'hide' },
				'#123456',
			],
			[
				{ color: '#123a', alphaChannel: 'show' },
				'#123a',
			],
			[
				{ color: '#123a', alphaChannel: 'hide' },
				'#123',
			],
			[
				{ color: '#123', alphaChannel: 'show' },
				'#123',
			],
			[
				{ color: '#123', alphaChannel: 'hide' },
				'#123',
			],
		])('shows expected color for hex colors', async (props, expectedHexColor) => {
			const wrapper = createWrapper({
				props: {
					defaultFormat: 'hex',
					...props,
				},
			})

			await flushPromises()

			const input = wrapper.find<HTMLInputElement>('#color-picker-color-hex').element
			expect(input.value).toBe(expectedHexColor)
		})
	})
})
