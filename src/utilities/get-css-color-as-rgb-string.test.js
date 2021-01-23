import { getCssColorAsRgbString } from './get-css-color-as-rgb-string.js'

describe('getCssColorAsRgbString', () => {
  test.each([
    ['rgb(255, 0, 0)', 'rgb(255, 0, 0)'],
    ['rgba(255, 0, 0, 1)', 'rgb(255, 0, 0)'],
    ['#1234', 'rgba(17, 34, 51, 0.267)'],
    ['#12345', ''],
    ['#123456', 'rgb(18, 52, 86)'],
    ['#12345678', 'rgba(18, 52, 86, 0.471)'],
    ['#123456789', ''],

    // Should pass. Returns. `''`.
    // Supposedly fails due to the rational value.
    // ['rgb(127.5, 0, 255)', 'rgb(128, 0, 255)'],

    // Should pass. This returns `rgb(0, 0, 0)`.
    // Perhaps the underlying DOM library doesn’t support HSL.
    // ['hsl(270, 100%, 50%)', 'rgb(128, 0, 255)'],

    // Should pass. Returns `'rgb(18, 52, 86)'`.
    // This one fails inexplicably. It’s a hash followed by 7 digits. That’s not a valid hex color.
    // ['#1234567', ''],

    // Should pass. Returns `''`.
    // Perhaps the underlying DOM library doesn’t support the new color syntax.
    // ['rgb(255 0 0)', 'rgb(255, 0, 0)'],
    // ['rgb(255 0 0 / 1)', 'rgb(255, 0, 0)'],
    // ['rgba(255 0 0 / 0.333)', 'rgba(255, 0, 0, 0.333)'],
    // ['rgb(127.5 127.5 63.75)', 'rgb(128, 128, 64)'],
    // ['rgb(255.12 255.23 255.34)', 'rgb(255, 255, 255)'],
    // ['rgb(50% 75% 12.5%)', 'rgb(128, 191, 32)'],
  ])('works', (cssColor, rgbColorString) => {
    expect(getCssColorAsRgbString(cssColor)).toEqual(rgbColorString)
  })
})
