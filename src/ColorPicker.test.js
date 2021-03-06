import { shallowMount, flushPromises } from '@vue/test-utils'

import ColorPicker from './ColorPicker.vue'
import * as copyToClipboardModule from './utilities/copy-to-clipboard.js'

/**
 * These tests make use of [Jest][1] and [Vue Test Utils][2].
 *
 * [1]: https://jestjs.io/
 * [2]: https://vue-test-utils.vuejs.org/
 */

/**
 * Helper function for injecting a test element into the DOM
 * This element can then be used as the mount point when using the [`attachTo`][1] option.
 *
 * [1]: https://vue-test-utils.vuejs.org/api/options.html#attachto
 *
 * @returns {string} a CSS selector that should be used as the value for the `attachTo` option
 */
function injectTestDiv () {
  const id = 'root'
  const div = document.createElement('div')
  div.id = id
  document.body.appendChild(div)
  return `#${id}`
}

describe('ColorPicker', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  test('can be mounted', () => {
    const wrapper = shallowMount(ColorPicker)

    expect(wrapper.html()).toBeTruthy()
  })

  test.each([
    ['hex', '#f00'],
    ['rgb', { r: 1, g: 0.5, b: 0, a: 0.5 }],
    ['hsl', { h: 0, s: 1, l: 0.5, a: 1 }],
    ['hwb', { h: 0.5, w: 0.33, b: 0.5, a: 1 }],
    ['hsv', { h: 0.5, s: 0.33, v: 0.5, a: 1 }],
  ])('mounts correctly with a valid color prop', (format, colorProp) => {
    const wrapper = shallowMount(ColorPicker, {
      props: {
        color: colorProp,
      },
    })

    expect(wrapper.vm.colors[format]).toEqual(colorProp)
  })

  test('mounts correctly with an invalid color prop', () => {
    const wrapper = shallowMount(ColorPicker, {
      props: {
        color: '#ff',
      },
    })

    expect(wrapper.vm.colors.hex).toBe('#ffffffff')
  })

  test.each([
    [undefined, 'hsl'],
    ['hex', 'hex'],
    ['hsl', 'hsl'],
    ['hwb', 'hwb'],
    ['rgb', 'rgb'],
  ])('sets active color format to “%s” when providing default format prop', (defaultFormat, expectedActiveFormat) => {
    const wrapper = shallowMount(ColorPicker, {
      propsData: {
        defaultFormat,
      },
    })

    expect(wrapper.vm.activeFormat).toBe(expectedActiveFormat)
  })

  test.each([
    [
      '#f80c',
      { r: 1, g: 0.5333333333333333, b: 0, a: 0.8 },
    ],
    [
      { h: 0.5, s: 0.33, v: 0.5, a: 1 },
      { r: 0.33499999999999996, g: 0.5, b: 0.5, a: 1 },
    ],
  ])('recomputes colors when color prop changes', async (colorProp, expectedColorChangePayload) => {
    const wrapper = shallowMount(ColorPicker)

    await wrapper.setProps({ color: colorProp })
    let emittedColorChangeEvents = wrapper.emitted()['color-change']
    // @ts-ignore because `unknown` is clearly not a correct type for emitted records.
    let emittedRgbColor = emittedColorChangeEvents[emittedColorChangeEvents.length - 1][0].colors.rgb
    expect(emittedRgbColor).toEqual(expectedColorChangePayload)

    await wrapper.setProps({ color: '#fffc' })
    emittedColorChangeEvents = wrapper.emitted()['color-change']
    // @ts-ignore because `unknown` is clearly not a correct type for emitted records.
    emittedRgbColor = emittedColorChangeEvents[emittedColorChangeEvents.length - 1][0].colors.rgb
    expect(emittedRgbColor).toEqual({ r: 1, g: 1, b: 1, a: 0.8 })
  })

  test('removes event listeners on unmount', async () => {
    const wrapper = shallowMount(ColorPicker)

    const colorSpace = wrapper.find('.vacp-color-space')
    await colorSpace.trigger('mousedown')
    const mouseMoveEvent = new MouseEvent('mousemove', { buttons: 1 })

    document.dispatchEvent(mouseMoveEvent)
    let emittedColorChangeEvents = wrapper.emitted()['color-change']
    expect(emittedColorChangeEvents.length).toBe(1)

    document.dispatchEvent(mouseMoveEvent)
    emittedColorChangeEvents = wrapper.emitted()['color-change']
    expect(emittedColorChangeEvents.length).toBe(2)

    wrapper.unmount()

    document.dispatchEvent(mouseMoveEvent)
    emittedColorChangeEvents = wrapper.emitted()['color-change']
    // Note that we assert here that the method hasn’t been called *again*.
    expect(emittedColorChangeEvents.length).toBe(2)
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

    wrapper.vm.activeFormat = 'rgb'
    await flushPromises()

    const colorRgbRedInput = wrapper.find(`#${id}-color-rgb-r`)
    expect(colorRgbRedInput.exists()).toBe(true)
    const colorRgbGreenInput = wrapper.find(`#${id}-color-rgb-g`)
    expect(colorRgbGreenInput.exists()).toBe(true)
    const colorRgbBlueInput = wrapper.find(`#${id}-color-rgb-b`)
    expect(colorRgbBlueInput.exists()).toBe(true)
    const colorRgbAlphaInput = wrapper.find(`#${id}-color-rgb-a`)
    expect(colorRgbAlphaInput.exists()).toBe(true)
  })

  test('sets pointer origin when interacting with the color space element', async () => {
    const wrapper = shallowMount(ColorPicker)

    expect(wrapper.vm.pointerOriginatedInColorSpace).toBe(false)

    const colorSpace = wrapper.find('.vacp-color-space')
    await colorSpace.trigger('mousedown')
    expect(wrapper.vm.pointerOriginatedInColorSpace).toBe(true)

    document.dispatchEvent(new Event('mouseup'))
    expect(wrapper.vm.pointerOriginatedInColorSpace).toBe(false)

    await colorSpace.trigger('touchstart')
    expect(wrapper.vm.pointerOriginatedInColorSpace).toBe(true)

    document.dispatchEvent(new Event('touchend'))
    expect(wrapper.vm.pointerOriginatedInColorSpace).toBe(false)
  })

  test('can initiate moving the color space thumb with a mouse', async () => {
    const clientX = 0
    const clientY = 0
    const mouseMoveEvent = {
      buttons: 1,
      preventDefault: jest.fn(),
      clientX,
      clientY,
    }

    const wrapper = shallowMount(ColorPicker, { attachTo: injectTestDiv(), props: { color: '#f80c' } })

    let emittedColorChangeEvents = wrapper.emitted()['color-change']
    expect(emittedColorChangeEvents.length).toBe(1)

    const colorSpace = wrapper.find('.vacp-color-space')
    await colorSpace.trigger('mousedown')
    await colorSpace.trigger('mousemove', mouseMoveEvent)

    emittedColorChangeEvents = wrapper.emitted()['color-change']
    expect(emittedColorChangeEvents.length).toBe(2)

    // Remove test HTML injected via the `attachTo` option during mount.
    wrapper.unmount()
  })

  test('can initiate moving the color space thumb with a touch-based device', async () => {
    const clientX = 0
    const clientY = 0
    const touchMoveEvent = {
      preventDefault: jest.fn(),
      touches: [{ clientX, clientY }],
    }

    const wrapper = shallowMount(ColorPicker, { attachTo: injectTestDiv(), props: { color: '#f80c' } })

    let emittedColorChangeEvents = wrapper.emitted()['color-change']
    expect(emittedColorChangeEvents.length).toBe(1)

    const colorSpace = wrapper.find('.vacp-color-space')
    await colorSpace.trigger('touchstart')
    await colorSpace.trigger('touchmove', touchMoveEvent)

    emittedColorChangeEvents = wrapper.emitted()['color-change']
    expect(emittedColorChangeEvents.length).toBe(2)

    await colorSpace.trigger('touchstart')
    await colorSpace.trigger('touchmove', touchMoveEvent)

    emittedColorChangeEvents = wrapper.emitted()['color-change']
    expect(emittedColorChangeEvents.length).toBe(3)

    // Remove test HTML injected via the `attachTo` option during mount.
    wrapper.unmount()
  })

  test('can not move the color space thumb with the wrong key', () => {
    const keydownEvent = {
      key: 'a',
      preventDefault: jest.fn(),
    }

    const wrapper = shallowMount(ColorPicker)

    wrapper.vm.moveThumbWithArrows(keydownEvent)

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
  ])('can move the color space thumb with the %s key (holding shift: %s)', (key, shiftKey, channel, expectedColorValue) => {
    const keydownEvent = {
      key,
      shiftKey,
      preventDefault: jest.fn(),
    }

    const wrapper = shallowMount(ColorPicker, {
      props: {
        color: 'rgb(128, 0, 255)',
      },
    })
    expect(keydownEvent.preventDefault).not.toHaveBeenCalled()

    wrapper.vm.moveThumbWithArrows(keydownEvent)

    expect(keydownEvent.preventDefault).toHaveBeenCalled()
    const emittedColorChangeEvents = wrapper.emitted()['color-change']
    // @ts-ignore because `unknown` is clearly not a correct type for emitted records.
    const emittedHsvColor = emittedColorChangeEvents[emittedColorChangeEvents.length - 1][0].colors.hsv
    expect(emittedHsvColor[channel]).toEqual(expectedColorValue)
  })

  test('can not increment/decrement in big steps without holding down shift', () => {
    const keydownEvent = {
      key: 'ArrowRight',
      shiftKey: false,
    }

    const wrapper = shallowMount(ColorPicker)
    const hueRangeInput = wrapper.find(`#${wrapper.vm.id}-hue-slider`)
    const hueRangeInputElement = /** @type {HTMLInputElement} */ (hueRangeInput.element)
    const originalInputValue = hueRangeInputElement.value

    wrapper.vm.changeInputValue(keydownEvent)

    expect(hueRangeInputElement.value).toBe(originalInputValue)
  })

  test.each([
    ['decrement', 1, 'ArrowDown', '1'],
    ['decrement', 3, 'ArrowDown', '1'],
    ['decrement', 1, 'ArrowLeft', '1'],
    ['increment', 1, 'ArrowUp', '9'],
    ['increment', 1, 'ArrowRight', '9'],
    ['increment', 3, 'ArrowRight', '27'],
  ])('can %s range inputs %dx in big steps with %s', (_, numberOfPresses, key, expectedValue) => {
    const wrapper = shallowMount(ColorPicker)
    const hueRangeInput = wrapper.find(`#${wrapper.vm.id}-hue-slider`)
    const hueRangeInputElement = /** @type {HTMLInputElement} */ (hueRangeInput.element)
    const keydownEvent = {
      key,
      shiftKey: true,
      currentTarget: hueRangeInputElement,
    }

    expect(hueRangeInput.exists()).toBe(true)

    while (numberOfPresses--) {
      wrapper.vm.changeInputValue(keydownEvent)
    }

    expect(hueRangeInputElement.value).toBe(expectedValue)
  })

  test.each([
    ['rgb', 'rgb(255 255 255 / 1)'],
    ['hsl', 'hsl(0 0% 100% / 1)'],
    ['hwb', 'hwb(0 100% 0% / 1)'],
    ['hex', '#ffffffff'],
  ])('copy button copies %s format as %s', (format, cssColor) => {
    jest.spyOn(copyToClipboardModule, 'copyToClipboard').mockImplementation(jest.fn())

    const wrapper = shallowMount(ColorPicker)

    wrapper.vm.activeFormat = format
    wrapper.vm.copyColor()
    expect(copyToClipboardModule.copyToClipboard).toHaveBeenCalledWith(cssColor)
  })

  test('hue slider updates internal colors', async () => {
    const hueAngle = 30
    const expectedHueValue = hueAngle / 360

    const wrapper = shallowMount(ColorPicker)
    const hueRangeInput = wrapper.find(`#${wrapper.vm.id}-hue-slider`)
    const hueRangeInputElement = /** @type {HTMLInputElement} */ (hueRangeInput.element)
    hueRangeInputElement.value = String(hueAngle)
    const hueInputEvent = { currentTarget: hueRangeInputElement }

    await hueRangeInput.trigger('input', hueInputEvent)

    let emittedColorChangeEvents = wrapper.emitted()['color-change']
    expect(emittedColorChangeEvents.length).toBe(1)

    // @ts-ignore because `unknown` is clearly not a correct type for emitted records.
    let emittedHsvColor = emittedColorChangeEvents[emittedColorChangeEvents.length - 1][0].colors.hsv
    expect(emittedHsvColor.h).toEqual(expectedHueValue)

    const alpha = 90
    const expectedAlphaValue = alpha / 100

    const alphaRangeInput = wrapper.find(`#${wrapper.vm.id}-alpha-slider`)
    const alphaRangeInputElement = /** @type {HTMLInputElement} */ (alphaRangeInput.element)
    alphaRangeInputElement.value = String(alpha)
    const alphaInputEvent = { currentTarget: alphaRangeInputElement }

    await alphaRangeInput.trigger('input', alphaInputEvent)

    emittedColorChangeEvents = wrapper.emitted()['color-change']
    expect(emittedColorChangeEvents.length).toBe(2)

    // @ts-ignore because `unknown` is clearly not a correct type for emitted records.
    emittedHsvColor = emittedColorChangeEvents[emittedColorChangeEvents.length - 1][0].colors.hsv
    expect(emittedHsvColor.a).toEqual(expectedAlphaValue)
  })

  test.each([
    ['rgb', 'r', '127.'],
    ['hsl', 's', 'a'],
    ['hwb', 'b', '25.%'],
  ])('updating a %s color input with an invalid value does not update the internal color data', async (format, channel, channelValue) => {
    const wrapper = shallowMount(ColorPicker)

    jest.resetAllMocks()

    wrapper.vm.activeFormat = format
    await flushPromises()

    const inputSelector = `#${wrapper.vm.id}-color-${format}-${channel}`
    const inputElement = /** @type {HTMLInputElement} */ (wrapper.find(inputSelector).element)
    inputElement.value = channelValue
    const inputEvent = { target: inputElement }

    wrapper.vm.updateColorValue(inputEvent, format, channel)

    const emittedColorChangeEvents = wrapper.emitted()['color-change']
    expect(emittedColorChangeEvents).toBe(undefined)
  })

  test.each([
    ['abc'],
    ['25%'],
  ])('updating a hex color input with an invalid value does not update the internal color data', async (invalidHexColorString) => {
    const wrapper = shallowMount(ColorPicker)

    jest.resetAllMocks()

    wrapper.vm.activeFormat = 'hex'
    await flushPromises()

    const inputSelector = `#${wrapper.vm.id}-color-hex`
    const inputElement = /** @type {HTMLInputElement} */ (wrapper.find(inputSelector).element)
    inputElement.value = invalidHexColorString
    const inputEvent = { target: inputElement }

    wrapper.vm.updateHexColorValue(inputEvent)

    const emittedColorChangeEvents = wrapper.emitted()['color-change']
    expect(emittedColorChangeEvents).toBe(undefined)
  })

  test.each([
    ['rgb', 'r', '127.5'],
    ['hsl', 's', '75%'],
    ['hwb', 'b', '25.5%'],
  ])('updating a %s color input with a valid value updates the internal color data', async (format, channel, channelValue) => {
    const wrapper = shallowMount(ColorPicker)

    jest.resetAllMocks()

    wrapper.vm.activeFormat = format
    await flushPromises()

    const inputSelector = `#${wrapper.vm.id}-color-${format}-${channel}`
    const inputElement = /** @type {HTMLInputElement} */ (wrapper.find(inputSelector).element)
    inputElement.value = channelValue
    const inputEvent = { target: inputElement }

    wrapper.vm.updateColorValue(inputEvent, format, channel)

    const emittedColorChangeEvents = wrapper.emitted()['color-change']
    expect(emittedColorChangeEvents.length).toBe(1)
  })

  test.each([
    ['#ff8800cc'],
  ])('updating a %s color input with a valid value updates the internal color data', async (channelValue) => {
    const wrapper = shallowMount(ColorPicker)

    jest.resetAllMocks()

    wrapper.vm.activeFormat = 'hex'
    await flushPromises()

    const inputSelector = `#${wrapper.vm.id}-color-hex`
    const inputElement = /** @type {HTMLInputElement} */ (wrapper.find(inputSelector).element)
    inputElement.value = channelValue
    const inputEvent = { target: inputElement }

    wrapper.vm.updateHexColorValue(inputEvent)

    const emittedColorChangeEvents = wrapper.emitted()['color-change']
    expect(emittedColorChangeEvents.length).toBe(1)
  })

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
