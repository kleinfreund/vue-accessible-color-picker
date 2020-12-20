import { config, shallowMount } from '@vue/test-utils'

import ColorPicker from './ColorPicker.vue'
import * as copyToClipboardModule from './utilities/copy-to-clipboard.js'

/**
 * These tests make use of [Jest][1] and [Vue Test Utils][2].
 *
 * [1]: https://jestjs.io/
 * [2]: https://vue-test-utils.vuejs.org/
 */

// Suppresses Vue console errors (e.g. for prop validators logging an error).
// See: https://vue-test-utils.vuejs.org/api/config.html#silent
config.silent = true

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
    ['hex', '#f00', '#f00'],
    ['rgb', { r: 1, g: 0.5, b: 0, a: 0.5 }, { r: 1, g: 0.5, b: 0, a: 0.5 }],
    ['hsl', { h: 0, s: 1, l: 0.5, a: 1 }, { h: 0, s: 1, l: 0.5, a: 1 }],
    ['hwb', { h: 0.5, w: 0.33, b: 0.5, a: 1 }, { h: 0.5, w: 0.33, b: 0.5, a: 1 }],
    ['hsv', { h: 0.5, s: 0.33, v: 0.5, a: 1 }, { h: 0.5, s: 0.33, v: 0.5, a: 1 }],
  ])('mounts correctly with a valid color prop', (format, colorProp, rgbColor) => {
    jest.spyOn(ColorPicker.methods, 'setColorValue')

    shallowMount(ColorPicker, {
      propsData: {
        color: colorProp,
      },
    })

    expect(ColorPicker.methods.setColorValue).toHaveBeenCalledWith(rgbColor, format)
  })

  test('mounts correctly with an invalid color prop', () => {
    const wrapper = shallowMount(ColorPicker, {
      propsData: {
        color: '#ff',
      },
    })

    expect(wrapper.vm.colors.hex).toBe('#ffffffff')
  })

  test('recomputes colors when color prop changes', async () => {
    jest.spyOn(ColorPicker.methods, 'setColorValue')
    const wrapper = shallowMount(ColorPicker)

    await wrapper.setProps({ color: '#f80c' })
    await wrapper.vm.$nextTick()
    expect(ColorPicker.methods.setColorValue).toHaveBeenCalledTimes(1)

    await wrapper.setProps({ color: { h: 0.5, s: 0.33, v: 0.5, a: 1 } })
    await wrapper.vm.$nextTick()
    expect(ColorPicker.methods.setColorValue).toHaveBeenCalledTimes(2)
  })

  test('removes event listeners on beforeDestroy', () => {
    jest.spyOn(ColorPicker.methods, 'moveThumbWithMouse')

    const wrapper = shallowMount(ColorPicker)

    document.dispatchEvent(new Event('mousemove'))
    expect(ColorPicker.methods.moveThumbWithMouse).toHaveBeenCalledTimes(1)

    wrapper.destroy()

    document.dispatchEvent(new Event('mousemove'))
    // Note that we assert here that the method hasn’t been called *again*.
    expect(ColorPicker.methods.moveThumbWithMouse).toHaveBeenCalledTimes(1)
  })

  test('id attributes are set correctly', async () => {
    const id = 'test-color-picker'
    const wrapper = shallowMount(ColorPicker, {
      propsData: {
        id,
      },
    })

    const hueInput = wrapper.find(`#${id}-hue-slider`)
    expect(hueInput.exists()).toBe(true)
    const alphaInput = wrapper.find(`#${id}-alpha-slider`)
    expect(alphaInput.exists()).toBe(true)

    const colorRgbRedInput = wrapper.find(`#${id}-color-rgb-r`)
    expect(colorRgbRedInput.exists()).toBe(true)
    const colorRgbGreenInput = wrapper.find(`#${id}-color-rgb-g`)
    expect(colorRgbGreenInput.exists()).toBe(true)
    const colorRgbBlueInput = wrapper.find(`#${id}-color-rgb-b`)
    expect(colorRgbBlueInput.exists()).toBe(true)
    const colorRgbAlphaInput = wrapper.find(`#${id}-color-rgb-a`)
    expect(colorRgbAlphaInput.exists()).toBe(true)

    wrapper.vm.activeFormat = 'hsl'
    await wrapper.vm.$nextTick()

    const colorHslHueInput = wrapper.find(`#${id}-color-hsl-h`)
    expect(colorHslHueInput.exists()).toBe(true)
    const colorHslSaturationInput = wrapper.find(`#${id}-color-hsl-s`)
    expect(colorHslSaturationInput.exists()).toBe(true)
    const colorHslLightnessInput = wrapper.find(`#${id}-color-hsl-l`)
    expect(colorHslLightnessInput.exists()).toBe(true)
    const colorHslAlphaInput = wrapper.find(`#${id}-color-hsl-a`)
    expect(colorHslAlphaInput.exists()).toBe(true)
  })

  test('sets pointer origin when interacting with the color space element', async () => {
    const wrapper = shallowMount(ColorPicker)

    expect(wrapper.vm.pointerOriginatedInColorSpace).toBe(false)

    const colorSpace = wrapper.findComponent({ ref: 'colorSpace' })

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
    jest.spyOn(ColorPicker.methods, 'startMovingThumb')
    jest.spyOn(ColorPicker.methods, 'moveThumbWithMouse')
    jest.spyOn(ColorPicker.methods, 'moveThumb')
    jest.spyOn(ColorPicker.methods, 'getColorValue')
    jest.spyOn(ColorPicker.methods, 'setColorValue')

    const clientX = 0
    const clientY = 0
    const mouseMoveEvent = {
      buttons: 1,
      preventDefault: jest.fn(),
      clientX,
      clientY,
    }

    const wrapper = shallowMount(ColorPicker, { attachTo: injectTestDiv() })
    const colorSpace = wrapper.findComponent({ ref: 'colorSpace' })
    jest.spyOn(colorSpace.element, 'getBoundingClientRect')

    await colorSpace.trigger('mousedown')

    expect(ColorPicker.methods.startMovingThumb).toHaveBeenCalled()
    wrapper.vm.moveThumbWithMouse(mouseMoveEvent)

    expect(ColorPicker.methods.moveThumbWithMouse).toHaveBeenCalledWith(mouseMoveEvent)
    expect(ColorPicker.methods.moveThumb).toHaveBeenCalledWith(clientX, clientY)
    expect(colorSpace.element.getBoundingClientRect).toHaveBeenCalled()
    expect(ColorPicker.methods.getColorValue).toHaveBeenCalledWith('hsv')
    expect(ColorPicker.methods.setColorValue).toHaveBeenCalledWith(wrapper.vm.colors.hsv, 'hsv')

    // Remove test HTML injected via the `attachTo` option during mount.
    wrapper.destroy()
  })

  test('can initiate moving the color space thumb with a touch-based device', async () => {
    jest.spyOn(ColorPicker.methods, 'startMovingThumb')
    jest.spyOn(ColorPicker.methods, 'moveThumbWithTouch')
    jest.spyOn(ColorPicker.methods, 'moveThumb')
    jest.spyOn(ColorPicker.methods, 'getColorValue')
    jest.spyOn(ColorPicker.methods, 'setColorValue')

    const clientX = 0
    const clientY = 0
    const touchMoveEvent = {
      preventDefault: jest.fn(),
      touches: [{ clientX, clientY }],
    }

    const wrapper = shallowMount(ColorPicker, { attachTo: injectTestDiv() })
    const colorSpace = wrapper.findComponent({ ref: 'colorSpace' })
    jest.spyOn(colorSpace.element, 'getBoundingClientRect')

    wrapper.vm.moveThumbWithTouch(touchMoveEvent)
    expect(ColorPicker.methods.moveThumbWithTouch).toHaveBeenNthCalledWith(1, touchMoveEvent)

    await colorSpace.trigger('touchstart')

    expect(ColorPicker.methods.startMovingThumb).toHaveBeenCalled()
    wrapper.vm.moveThumbWithTouch(touchMoveEvent)

    expect(ColorPicker.methods.moveThumbWithTouch).toHaveBeenNthCalledWith(2, touchMoveEvent)
    expect(ColorPicker.methods.moveThumb).toHaveBeenCalledWith(clientX, clientY)
    expect(colorSpace.element.getBoundingClientRect).toHaveBeenCalled()
    expect(ColorPicker.methods.getColorValue).toHaveBeenCalledWith('hsv')
    expect(ColorPicker.methods.setColorValue).toHaveBeenCalledWith(wrapper.vm.colors.hsv, 'hsv')

    // Remove test HTML injected via the `attachTo` option during mount.
    wrapper.destroy()
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
  ])('can move the color space thumb with the %s key (holding shift: %s)', (key, shiftKey, expectedChannel, expectedChannelValue) => {
    jest.spyOn(ColorPicker.methods, 'getColorValue')
    jest.spyOn(ColorPicker.methods, 'setColorValue')

    const keydownEvent = {
      key,
      shiftKey,
      preventDefault: jest.fn(),
    }

    const wrapper = shallowMount(ColorPicker, {
      propsData: {
        color: 'rgb(128, 0, 255)',
      },
    })

    wrapper.vm.moveThumbWithArrows(keydownEvent)

    expect(keydownEvent.preventDefault).toHaveBeenCalled()
    expect(ColorPicker.methods.getColorValue).toHaveBeenCalledWith('hsv', expectedChannel)
    expect(ColorPicker.methods.setColorValue).toHaveBeenCalledWith(expectedChannelValue, 'hsv', expectedChannel)
  })

  test('can not increment/decrement in big steps without holding down shift', () => {
    const keydownEvent = {
      key: 'ArrowRight',
      shiftKey: false,
    }

    const wrapper = shallowMount(ColorPicker)
    const hueRangeInput = wrapper.find(`#${wrapper.vm.id}-hue-slider`)
    const originalInputValue = hueRangeInput.element.value

    wrapper.vm.changeInputValue(keydownEvent)

    expect(hueRangeInput.element.value).toBe(originalInputValue)
  })

  test.each([
    ['decrement', 1, 'ArrowDown', '1'],
    ['decrement', 3, 'ArrowDown', '1'],
    ['decrement', 1, 'ArrowLeft', '1'],
    ['increment', 1, 'ArrowUp', '9'],
    ['increment', 1, 'ArrowRight', '9'],
    ['increment', 3, 'ArrowRight', '27'],
  ])('can %s range inputs %dx in big steps with %s', (_, numberOfPresses, key, expectedValue) => {
    const keydownEvent = {
      key,
      shiftKey: true,
    }

    const wrapper = shallowMount(ColorPicker)
    const hueRangeInput = wrapper.find(`#${wrapper.vm.id}-hue-slider`)
    keydownEvent.currentTarget = hueRangeInput.element

    expect(hueRangeInput.exists()).toBe(true)

    while (numberOfPresses--) {
      wrapper.vm.changeInputValue(keydownEvent)
    }

    expect(hueRangeInput.element.value).toBe(expectedValue)
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

  test('hue slider updates internal colors', () => {
    jest.spyOn(ColorPicker.methods, 'updateHue')
    jest.spyOn(ColorPicker.methods, 'updateAlpha')
    jest.spyOn(ColorPicker.methods, 'setColorValue')

    const hueAngle = 30
    const alpha = 90
    const hueInputEvent = {}
    const alphaInputEvent = {}

    const wrapper = shallowMount(ColorPicker)
    const hueRangeInput = wrapper.find(`#${wrapper.vm.id}-hue-slider`)
    hueInputEvent.currentTarget = hueRangeInput.element
    hueInputEvent.currentTarget.value = String(hueAngle)

    hueRangeInput.trigger('input')
    expect(ColorPicker.methods.updateHue).toHaveBeenCalled()

    wrapper.vm.updateHue(hueInputEvent)
    expect(ColorPicker.methods.updateHue).toHaveBeenLastCalledWith(hueInputEvent)
    expect(ColorPicker.methods.setColorValue).toHaveBeenLastCalledWith(hueAngle / 360, 'hsv', 'h')

    const alphaRangeInput = wrapper.find(`#${wrapper.vm.id}-alpha-slider`)
    alphaInputEvent.currentTarget = hueRangeInput.element
    alphaInputEvent.currentTarget.value = String(alpha)

    alphaRangeInput.trigger('input')
    expect(ColorPicker.methods.updateAlpha).toHaveBeenCalled()

    wrapper.vm.updateAlpha(alphaInputEvent)
    expect(ColorPicker.methods.updateAlpha).toHaveBeenLastCalledWith(alphaInputEvent)
    expect(ColorPicker.methods.setColorValue).toHaveBeenLastCalledWith(alpha / 100, 'hsv', 'a')
  })

  test.each([
    ['rgb', 'r', '127.'],
    ['hsl', 's', 'a'],
    ['hwb', 'b', '25.%'],
    ['hex', undefined, 'abc'],
    ['hex', undefined, '25%'],
  ])('updating a %s color input with an invalid value does not update the internal color data', async (format, channel, channelValue) => {
    jest.spyOn(ColorPicker.methods, 'setColorValue')

    const inputEvent = {}

    const wrapper = shallowMount(ColorPicker)

    jest.resetAllMocks()

    wrapper.vm.activeFormat = format
    await wrapper.vm.$nextTick()

    const inputSelector = `#${wrapper.vm.id}-color-${format}` + (channel !== undefined ? `-${channel}` : '')
    const inputElement = wrapper.find(inputSelector)
    inputEvent.target = inputElement.element
    inputEvent.target.value = channelValue

    wrapper.vm.updateColorValue(inputEvent, format, channel)

    expect(ColorPicker.methods.setColorValue).not.toHaveBeenCalled()
  })

  test.each([
    ['rgb', 'r', '127.5'],
    ['hsl', 's', '75%'],
    ['hwb', 'b', '25.5%'],
    ['hex', undefined, '#ff8800cc'],
  ])('updating a %s color input with a valid value updates the internal color data', async (format, channel, channelValue) => {
    jest.spyOn(ColorPicker.methods, 'setColorValue')

    const inputEvent = {}

    const wrapper = shallowMount(ColorPicker)

    jest.resetAllMocks()

    wrapper.vm.activeFormat = format
    await wrapper.vm.$nextTick()

    const inputSelector = `#${wrapper.vm.id}-color-${format}` + (channel !== undefined ? `-${channel}` : '')
    const inputElement = wrapper.find(inputSelector)
    inputEvent.target = inputElement.element
    inputEvent.target.value = channelValue

    wrapper.vm.updateColorValue(inputEvent, format, channel)

    expect(ColorPicker.methods.setColorValue).toHaveBeenCalledTimes(1)
  })

  test('clicking switch format button cycles through active formats correctly', async () => {
    jest.spyOn(ColorPicker.methods, 'switchFormat')

    const wrapper = shallowMount(ColorPicker)
    const formatSwitchButton = wrapper.find('.vacp-format-switch-button')

    expect(ColorPicker.methods.switchFormat).not.toHaveBeenCalled()
    expect(wrapper.vm.activeFormat).toBe('rgb')

    await formatSwitchButton.trigger('click')
    expect(ColorPicker.methods.switchFormat).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.activeFormat).toBe('hex')

    await formatSwitchButton.trigger('click')
    expect(ColorPicker.methods.switchFormat).toHaveBeenCalledTimes(2)
    expect(wrapper.vm.activeFormat).toBe('hsl')

    await formatSwitchButton.trigger('click')
    expect(ColorPicker.methods.switchFormat).toHaveBeenCalledTimes(3)
    expect(wrapper.vm.activeFormat).toBe('hwb')

    await formatSwitchButton.trigger('click')
    expect(ColorPicker.methods.switchFormat).toHaveBeenCalledTimes(4)
    expect(wrapper.vm.activeFormat).toBe('rgb')
  })
})
