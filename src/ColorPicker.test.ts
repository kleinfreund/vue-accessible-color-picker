import { beforeAll, beforeEach, describe, test, expect, vi, afterEach } from 'vitest'
import { shallowMount, flushPromises, ComponentMountingOptions, enableAutoUnmount } from '@vue/test-utils'

import ColorPicker from './ColorPicker.vue'
import { ColorChangeDetail, ColorPickerProps } from './types.js'
import { CHANNEL_DEFINITIONS } from './constants.js'

function createWrapper (options: ComponentMountingOptions<typeof ColorPicker, ColorPickerProps> = {}) {
	options.props = options.props ?? {}
	options.props.id = options.props.id ?? 'color-picker'
	options.props.visibleFormats = options.props.visibleFormats ?? ['hex', 'hsl', 'hwb', 'lab', 'lch', 'oklab', 'oklch', 'rgb']
	return shallowMount(ColorPicker, options)
}

enableAutoUnmount(afterEach)

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

		const thumb = wrapper.find<HTMLElement>('.vacp-color-space-thumb')
		expect(thumb.element.style.left).toBe('0%')
		expect(thumb.element.style.bottom).toBe('100%')
	})

	test('thumb is inside the color space for out-of-gamut colors', () => {
		const wrapper = createWrapper({
			props: {
				color: 'oklab(88% 0.145 -0.392)',
			},
		})

		const thumb = wrapper.find<HTMLElement>('.vacp-color-space-thumb')
		// Without converting the color to be in-gamut, the thumb coordinates for the color “oklab(88% 0.145 -0.392)” are at left 75.37% and bottom 181.00% which puts the thumb “off screen”. With the color being converted to be in-gamut, the coordinates are as expected below.
		expect(thumb.element.style.left).toBe('21.028102086240466%')
		expect(thumb.element.style.bottom).toBe('100%')
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
		expect((wrapper.emitted<[ColorChangeDetail]>('color-change') ?? []).length).toBe(0)

		document.dispatchEvent(new MouseEvent('pointermove', { buttons: 1, clientX: 0 }))
		expect((wrapper.emitted<[ColorChangeDetail]>('color-change') ?? []).length).toBe(0)

		document.dispatchEvent(new MouseEvent('pointermove', { buttons: 1, clientX: 1 }))
		expect((wrapper.emitted<[ColorChangeDetail]>('color-change') ?? []).length).toBe(1)

		wrapper.unmount()

		document.dispatchEvent(new MouseEvent('pointermove', { buttons: 1, clientX: 2 }))
		// Note that we assert here that the method hasn’t been called *again*.
		expect(wrapper.emitted<[ColorChangeDetail]>('color-change')).toBe(undefined)
	})

	describe('props & attributes', () => {
		test.each<[ColorPickerProps, string]>([
			[
				{ color: '#f00' },
				'#f00f',
			],
			[
				{ color: 'rgb(255 127.5 0 / 0.5)' },
				'#ff800080',
			],
			[
				{ color: 'hsl(0 100% 50% / 1)' },
				'#f00f',
			],
			[
				{ color: 'hwb(180 33% 50% / 1)' },
				'#548080ff',
			],
			[
				{ color: 'lab(55 -71 111 / 1)' },
				'#090f',
			],
		])('mounts correctly with a valid color prop', (props, expectedHexInputValue) => {
			const wrapper = createWrapper({
				props: {
					defaultFormat: 'hex',
					...props,
				},
			})

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
			expect(input.value).toBe('#ffff')
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
			expect(input.value).toBe('#ffff')
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
				{ defaultFormat: 'lab' },
				['L', 'a', 'b'],
			],
			[
				{ defaultFormat: 'lch' },
				['L', 'C', 'H'],
			],
			[
				{ defaultFormat: 'oklab' },
				['L', 'a', 'b'],
			],
			[
				{ defaultFormat: 'oklch' },
				['L', 'C', 'H'],
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
				'rgb(100% 53.333% 0% / 0.8)',
			],
			[
				'hsl(180 50% 50% / 1)',
				'rgb(25% 75% 75% / 1)',
			],
		])('recomputes colors when color prop changes', async (colorProp, expectedColorChangePayload) => {
			const wrapper = createWrapper()

			await wrapper.setProps({ color: colorProp })
			expect((wrapper.emitted<[ColorChangeDetail]>('color-change') ?? []).at(-1)![0].color.to('srgb').toString({ alpha: true })).toEqual(expectedColorChangePayload)

			await wrapper.setProps({ color: '#fffc' })
			expect((wrapper.emitted<[ColorChangeDetail]>('color-change') ?? []).at(-1)![0].color.to('srgb').toString({ alpha: true })).toEqual('rgb(100% 100% 100% / 0.8)')
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

			for (const [format, channels] of Object.entries(CHANNEL_DEFINITIONS)) {
				const attributePrefix = `${id}-color-${format}`

				expect(wrapper.find(`[id="${attributePrefix}-${channels[0].channel}-label"]`).exists()).toBe(true)
				expect(wrapper.find(`[id="${attributePrefix}-${channels[0].channel}"]`).exists()).toBe(true)
				expect(wrapper.find(`[for="${attributePrefix}-${channels[0].channel}"]`).exists()).toBe(true)

				expect(wrapper.find(`[id="${attributePrefix}-${channels[1].channel}-label"]`).exists()).toBe(true)
				expect(wrapper.find(`[id="${attributePrefix}-${channels[1].channel}"]`).exists()).toBe(true)
				expect(wrapper.find(`[for="${attributePrefix}-${channels[1].channel}"]`).exists()).toBe(true)

				expect(wrapper.find(`[id="${attributePrefix}-${channels[2].channel}-label"]`).exists()).toBe(true)
				expect(wrapper.find(`[id="${attributePrefix}-${channels[2].channel}"]`).exists()).toBe(true)
				expect(wrapper.find(`[for="${attributePrefix}-${channels[2].channel}"]`).exists()).toBe(true)

				expect(wrapper.find(`[id="${attributePrefix}-alpha"]`).exists()).toBe(true)
				expect(wrapper.find(`[for="${attributePrefix}-alpha"]`).exists()).toBe(true)

				await formatSwitchButton.trigger('click')
			}
		})

		test.each<[ColorPickerProps, boolean, string]>([
			[{ alphaChannel: 'show' }, true, 'hsl(0 0% 50% / 1)'],
			[{ alphaChannel: 'hide' }, false, 'hsl(0 0% 50%)'],
		])('shows/hides correct elements when setting alphaChannel', async (props, isElementVisible, expectedCssColor) => {
			const id = 'test-color-picker'
			const wrapper = createWrapper({
				props: {
					id,
					...props,
				},
			})

			const alphaInput = wrapper.find(`#${id}-alpha-slider`)
			expect(alphaInput.exists()).toBe(isElementVisible)

			const colorHslAlphaInput = wrapper.find(`#${id}-color-hsl-alpha`)
			expect(colorHslAlphaInput.exists()).toBe(isElementVisible)

			const input = wrapper.find<HTMLInputElement>(`#${id}-color-hsl-l`)
			await input.setValue('50%')
			expect(
				(wrapper.emitted<[ColorChangeDetail]>('color-change') ?? []).at(-1)![0].cssColor,
			).toEqual(expectedCssColor)
		})

		test('sets fully-opaque “--vacp-color” custom property', async () => {
			const wrapper = createWrapper()
			expect(wrapper.element.style.getPropertyValue('--vacp-color')).toBe('hsl(0 0% 100%)')

			await wrapper.setProps({
				color: '#f60c',
			})
			expect(wrapper.element.style.getPropertyValue('--vacp-color')).toBe('hsl(24 100% 50%)')
		})
	})

	describe('color space thumb interactions', () => {
		test('can initiate moving the color space thumb with a pointer device', () => {
			const wrapper = createWrapper({
				props: {
					color: '#f80c',
				},
			})

			expect((wrapper.emitted<[ColorChangeDetail]>('color-change') ?? []).length).toBe(1)

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

			colorSpace.element.dispatchEvent(new PointerEvent('pointerdown', { buttons: 1 }))
			colorSpace.element.dispatchEvent(new PointerEvent('pointermove', { buttons: 1 }))

			expect((wrapper.emitted<[ColorChangeDetail]>('color-change') ?? []).length).toBe(2)
		})

		test('can initiate moving the color space thumb with a touch-based device', async () => {
			const wrapper = createWrapper({
				props: {
					color: '#f80c',
				},
			})

			expect((wrapper.emitted<[ColorChangeDetail]>('color-change') ?? []).length).toBe(1)

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

			expect((wrapper.emitted<[ColorChangeDetail]>('color-change') ?? []).length).toBe(2)

			await colorSpace.trigger('touchstart', {
				preventDefault: vi.fn(),
				touches: [{ clientX: 1, clientY: 0 }],
			})
			await colorSpace.trigger('touchmove', {
				preventDefault: vi.fn(),
				touches: [{ clientX: 1, clientY: 0 }],
			})

			expect((wrapper.emitted<[ColorChangeDetail]>('color-change') ?? []).length).toBe(3)
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
			['ArrowDown', false, 'hwb(180 24.5% 51% / 1)'],
			['ArrowDown', true, 'hwb(180 20% 60% / 1)'],
			['ArrowUp', false, 'hwb(180 25.5% 49% / 1)'],
			['ArrowUp', true, 'hwb(180 30% 40% / 1)'],
			['ArrowRight', false, 'hwb(180 24.5% 50% / 1)'],
			['ArrowRight', true, 'hwb(180 20% 50% / 1)'],
			['ArrowLeft', false, 'hwb(180 25.5% 50% / 1)'],
			['ArrowLeft', true, 'hwb(180 30% 50% / 1)'],
		])('can move the color space thumb with the %s key (holding shift: %s)', async (key, shiftKey, expectedCssColor) => {
			const keydownEvent = {
				key,
				shiftKey,
				preventDefault: vi.fn(),
			}

			const wrapper = createWrapper({
				props: {
					defaultFormat: 'hwb',
					color: 'hwb(180 25% 50% / 1)',
				},
			})
			expect(keydownEvent.preventDefault).not.toHaveBeenCalled()

			const thumb = wrapper.find('.vacp-color-space-thumb')
			await thumb.trigger('keydown', keydownEvent)

			expect(keydownEvent.preventDefault).toHaveBeenCalled()
			expect((wrapper.emitted<[ColorChangeDetail]>('color-change') ?? []).at(-1)![0].cssColor).toEqual(expectedCssColor)
		})

		test('moves out-of-gamut color with arrow keys correctly', async () => {
			const wrapper = createWrapper({
				props: {
					color: 'oklab(88% 0.145 -0.392)',
				},
			})

			const thumb = wrapper.find<HTMLElement>('.vacp-color-space-thumb')
			expect(thumb.element.style.left).toBe('21.028102086240466%')
			expect(thumb.element.style.bottom).toBe('100%')

			await thumb.trigger('keydown', { key: 'ArrowDown' })
			expect(thumb.element.style.left).toBe('21.028102086240466%')
			expect(thumb.element.style.bottom).toBe('99%')
			expect(
				(wrapper.emitted<[ColorChangeDetail]>('color-change') ?? []).at(-1)![0].color.toString({ format: 'oklab' }),
			).toEqual('oklab(85.366% 0.02551 -0.06894)')

			await thumb.trigger('keydown', { key: 'ArrowRight' })
			expect(thumb.element.style.left).toBe('22.028102086240466%')
			expect(thumb.element.style.bottom).toBe('99%')
			expect(
				(wrapper.emitted<[ColorChangeDetail]>('color-change') ?? []).at(-1)![0].color.toString({ format: 'oklab' }),
			).toEqual('oklab(84.707% 0.02664 -0.07241)')
		})
	})

	describe('hue & alpha range inputs', () => {
		test('can not increment/decrement in big steps without holding down shift', async () => {
			const keydownEvent = {
				key: 'ArrowRight',
				shiftKey: false,
			}

			const wrapper = createWrapper()
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
			const wrapper = createWrapper()
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
			const wrapper = createWrapper({
				props: {
					color: '#f00',
				},
			})

			const expectedHueValue = '30'
			await wrapper.find<HTMLInputElement>('#color-picker-hue-slider').setValue(expectedHueValue)
			expect((wrapper.emitted<[ColorChangeDetail]>('color-change') ?? []).length).toBe(2)
			expect((wrapper.emitted<[ColorChangeDetail]>('color-change') ?? []).at(-1)![0].cssColor).toBe(`hsl(${expectedHueValue} 100% 50% / 1)`)

			const expectedAlphaValue = '0.9'
			await wrapper.find<HTMLInputElement>('#color-picker-alpha-slider').setValue(expectedAlphaValue)
			expect((wrapper.emitted<[ColorChangeDetail]>('color-change') ?? []).length).toBe(3)
			expect((wrapper.emitted<[ColorChangeDetail]>('color-change') ?? []).at(-1)![0].cssColor).toBe(`hsl(30 100% 50% / ${expectedAlphaValue})`)
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
				{ defaultFormat: 'lab', alphaChannel: 'show' },
				'lab(100% 0 0 / 1)',
			],
			[
				{ defaultFormat: 'lch', alphaChannel: 'show' },
				'lch(100% 0 0 / 1)',
			],
			[
				{ defaultFormat: 'oklab', alphaChannel: 'show' },
				'oklab(100% 0 0 / 1)',
			],
			[
				{ defaultFormat: 'oklch', alphaChannel: 'show' },
				'oklch(100% 0 0 / 1)',
			],
			[
				{ defaultFormat: 'hex', alphaChannel: 'show' },
				'#ffff',
			],
			[
				{ defaultFormat: 'hex', alphaChannel: 'hide' },
				'#fff',
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
			expect(wrapper.find('#color-picker-color-lab-a').exists()).toBe(true)

			await formatSwitchButton.trigger('click')
			expect(wrapper.find('#color-picker-color-lch-c').exists()).toBe(true)

			await formatSwitchButton.trigger('click')
			expect(wrapper.find('#color-picker-color-oklab-a').exists()).toBe(true)

			await formatSwitchButton.trigger('click')
			expect(wrapper.find('#color-picker-color-oklch-c').exists()).toBe(true)

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
				{ defaultFormat: 'rgb' },
				'r',
				'127.',
			],
			[
				{ defaultFormat: 'hsl' },
				's',
				'a',
			],
			[
				{ defaultFormat: 'hwb' },
				'b',
				'25.%',
			],
		])('updating a color input with an invalid value does not update the internal color data', async (props, channel, channelValue) => {
			const wrapper = createWrapper({ props })

			await wrapper.find<HTMLInputElement>(`#${props.id!}-color-${props.defaultFormat!}-${channel}`).setValue(channelValue)
			expect(wrapper.emitted<[ColorChangeDetail]>('color-change')).toBe(undefined)
		})

		test.each([
			['abc'],
			['25%'],
		])('updating a hex color input with an invalid value does not update the internal color data', async (invalidHexColorString) => {
			const wrapper = createWrapper({
				props: {
					defaultFormat: 'hex',
				},
			})

			await wrapper.find<HTMLInputElement>('#color-picker-color-hex').setValue(invalidHexColorString)
			expect(wrapper.emitted<[ColorChangeDetail]>('color-change')).toBe(undefined)
		})

		test.each<[ColorPickerProps, string, string]>([
			[
				{ defaultFormat: 'rgb' },
				'r',
				'127.5',
			],
			[
				{ defaultFormat: 'hsl' },
				'l',
				'75%',
			],
			[
				{ defaultFormat: 'hwb' },
				'b',
				'25.5%',
			],
		])('updating a %s color input with a valid value updates the internal color data', async (props, channel, channelValue) => {
			const wrapper = createWrapper({ props })

			await wrapper.find<HTMLInputElement>(`#${props.id!}-color-${props.defaultFormat!}-${channel}`).setValue(channelValue)
			expect((wrapper.emitted<[ColorChangeDetail]>('color-change') ?? []).length).toBe(1)
		})

		test.each([
			['#ff8800cc'],
		])('updating a %s color input with a valid value updates the internal color data', async (channelValue) => {
			const wrapper = createWrapper({
				props: {
					defaultFormat: 'hex',
				},
			})

			await wrapper.find<HTMLInputElement>('#color-picker-color-hex').setValue(channelValue)
			expect((wrapper.emitted<[ColorChangeDetail]>('color-change') ?? []).length).toBe(1)
		})

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
				'#123456ff',
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
				'#123f',
			],
			[
				{ color: '#123', alphaChannel: 'hide' },
				'#123',
			],
		])('shows expected color for hex colors', (props, expectedHexColor) => {
			const wrapper = createWrapper({
				props: {
					defaultFormat: 'hex',
					...props,
				},
			})

			const input = wrapper.find<HTMLInputElement>('#color-picker-color-hex')
			expect(input.element.value).toBe(expectedHexColor)
		})

		test.each<[ColorPickerProps, Record<string, string>]>([
			[
				{
					defaultFormat: 'hsl',
					color: 'hsl(270 50% 25% / 0.5)',
				},
				{
					h: '270',
					s: '50%',
					l: '25%',
					alpha: '0.5',
				},
			],
			[
				{
					defaultFormat: 'hwb',
					color: 'hwb(180 25% 50% / 100%)',
				},
				{
					h: '180',
					w: '25%',
					b: '50%',
					alpha: '1',
				},
			],
			[
				{
					defaultFormat: 'lab',
					color: 'lab(55 -71 111 / 1)',
				},
				{
					l: '55%',
					a: '-71',
					b: '111',
					alpha: '1',
				},
			],
			[
				{
					defaultFormat: 'lch',
					color: 'lch(69% 7 306)',
				},
				{
					l: '69%',
					c: '7',
					h: '306',
					alpha: '1',
				},
			],
			[
				{
					defaultFormat: 'oklab',
					color: 'oklab(88% 0.145 -0.392)',
				},
				{
					l: '88%',
					a: '0.145',
					b: '-0.392',
					alpha: '1',
				},
			],
			[
				{
					defaultFormat: 'oklch',
					color: 'oklch(93% 0.142 0)',
				},
				{
					l: '93%',
					c: '0.142',
					h: '0',
					alpha: '1',
				},
			],
			[
				{
					defaultFormat: 'rgb',
					color: 'rgb(255 127.5 63.75 / .2)',
				},
				{
					r: '255',
					g: '127.5',
					b: '63.75',
					alpha: '0.2',
				},
			],
			[
				{
					defaultFormat: 'rgb',
					// Use `rgba` because `rgb` with percentages isn't parsed by colorjs.io.
					color: 'rgba(100% 50% 25% / 0)',
				},
				{
					r: '255',
					g: '127.5',
					b: '63.75',
					alpha: '0',
				},
			],
		])('have correct value per channel', (props, expectedInputValues) => {
			const wrapper = createWrapper({ props })

			for (const [channel, expectedValue] of Object.entries(expectedInputValues)) {
				const input = wrapper.find<HTMLInputElement>(`#color-picker-color-${props.defaultFormat!}-${channel}`)
				expect(input.element.value).toBe(expectedValue)
			}
		})

		test('outputs in-gamut color', () => {
			const wrapper = createWrapper({
				props: {
					color: 'oklab(88% 0.145 -0.392)',
					defaultFormat: 'hsl',
				},
			})

			const input = wrapper.find<HTMLInputElement>('#color-picker-color-hsl-h')
			expect(input.element.value).toBe('247.16')
		})
	})

	describe('color-change event', () => {
		test.each<[
			ColorPickerProps,
			{
				cssColor: ColorChangeDetail['cssColor'],
				color: { alpha: number, coords: [number, number, number] },
			},
		]>([
			[
				{ color: '#ff99aacc', defaultFormat: 'hsl', alphaChannel: 'show' },
				{
					cssColor: 'hsl(350 100% 80% / 0.8)',
					color: {
						alpha: 0.8,
						coords: [1, 0.6, 0.6666666666666666],
					},
				},
			],
			[
				{ color: '#f9ac', defaultFormat: 'hsl', alphaChannel: 'show' },
				{
					cssColor: 'hsl(350 100% 80% / 0.8)',
					color: {
						alpha: 0.8,
						coords: [1, 0.6, 0.6666666666666666],
					},
				},
			],
			[
				{ color: '#ff99aacc', defaultFormat: 'hex', alphaChannel: 'show' },
				{
					cssColor: '#f9ac',
					color: {
						alpha: 0.8,
						coords: [1, 0.6, 0.6666666666666666],
					},
				},
			],
			[
				{ color: '#f9ac', defaultFormat: 'hex', alphaChannel: 'show' },
				{
					cssColor: '#f9ac',
					color: {
						alpha: 0.8,
						coords: [1, 0.6, 0.6666666666666666],
					},
				},
			],
			[
				{ color: '#ff99aacc', defaultFormat: 'hsl', alphaChannel: 'hide' },
				{
					cssColor: 'hsl(350 100% 80%)',
					color: {
						alpha: 0.8,
						coords: [1, 0.6, 0.6666666666666666],
					},
				},
			],
			[
				{ color: '#f9ac', defaultFormat: 'hsl', alphaChannel: 'hide' },
				{
					cssColor: 'hsl(350 100% 80%)',
					color: {
						alpha: 0.8,
						coords: [1, 0.6, 0.6666666666666666],
					},
				},
			],
			[
				{ color: '#ff99aacc', defaultFormat: 'hex', alphaChannel: 'hide' },
				{
					cssColor: '#f9a',
					color: {
						alpha: 0.8,
						coords: [1, 0.6, 0.6666666666666666],
					},
				},
			],
			[
				{ color: '#f9ac', defaultFormat: 'hex', alphaChannel: 'hide' },
				{
					cssColor: '#f9a',
					color: {
						alpha: 0.8,
						coords: [1, 0.6, 0.6666666666666666],
					},
				},
			],
			[
				{ color: '#23a96a', defaultFormat: 'hex', alphaChannel: 'hide' },
				{
					cssColor: '#23a96a',
					color: {
						alpha: 1,
						coords: [0.13725490196078433, 0.6627450980392157, 0.41568627450980394],
					},
				},
			],
		])('emits correct data', async (props, expectedData) => {
			const wrapper = createWrapper({ props })

			await wrapper.setProps({ color: props.color })
			expect((wrapper.emitted<[ColorChangeDetail]>('color-change') ?? []).at(-1)![0].cssColor).toEqual(expectedData.cssColor)
			expect((wrapper.emitted<[ColorChangeDetail]>('color-change') ?? []).at(-1)![0].color).toEqual(expect.objectContaining(expectedData.color))
		})
	})

	describe('color-copy event', () => {
		test.each<[
			ColorPickerProps,
			{
				cssColor: ColorChangeDetail['cssColor'],
				color: { alpha: number, coords: [number, number, number] },
			},
		]>([
			[
				{ color: '#ff99aacc', defaultFormat: 'hsl', alphaChannel: 'show' },
				{
					cssColor: 'hsl(350 100% 80% / 0.8)',
					color: {
						alpha: 0.8,
						coords: [1, 0.6, 0.6666666666666666],
					},
				},
			],
		])('emits correct data', async (props, expectedData) => {
			const wrapper = createWrapper({ props })

			const copyButton = wrapper.find('.vacp-copy-button')
			await copyButton.trigger('click')
			expect((wrapper.emitted<[ColorChangeDetail]>('color-change') ?? []).at(-1)![0].cssColor).toEqual(expectedData.cssColor)
			expect((wrapper.emitted<[ColorChangeDetail]>('color-change') ?? []).at(-1)![0].color).toEqual(expect.objectContaining(expectedData.color))
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
				'#123456ff',
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
				'#123f',
			],
			[
				{ color: '#123', alphaChannel: 'hide' },
				'#123',
			],
		])('shows expected color for hex colors', (props, expectedHexColor) => {
			const wrapper = createWrapper({
				props: {
					defaultFormat: 'hex',
					...props,
				},
			})

			const input = wrapper.find<HTMLInputElement>('#color-picker-color-hex')
			expect(input.element.value).toBe(expectedHexColor)
		})
	})
})
