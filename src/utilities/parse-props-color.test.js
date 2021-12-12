import { parsePropsColor } from './parse-props-color.js'

describe('getCssColorAsRgbString', () => {
  test.each([
    ['rgb(255, 0, 0)', { format: 'rgb', color: { r: 1, g: 0, b: 0, a: 1 } }],
    ['rgba(255, 0, 0, 1)', { format: 'rgb', color: { r: 1, g: 0, b: 0, a: 1 } }],
    ['rgb(127.5, 0, 255)', { format: 'rgb', color: { r: 0.5, g: 0, b: 1, a: 1 } }],
    ['rgb(127.5 0 255)', { format: 'rgb', color: { r: 0.5, g: 0, b: 1, a: 1 } }],
    ['rgb(127.5 0 255 / 0.5)', { format: 'rgb', color: { r: 0.5, g: 0, b: 1, a: 0.5 } }],
    ['rgb(50% 0% 100% / 0.5)', { format: 'rgb', color: { r: 0.5, g: 0, b: 1, a: 0.5 } }],
    ['#1234', { format: 'hex', color: '#1234' }],
    ['#12345', null],
    ['#123456', { format: 'hex', color: '#123456' }],
    ['#12345678', { format: 'hex', color: '#12345678' }],
    ['#123456789', null],
    // Doesn’t work because `getComputedStyle(el).color` returns `'red'` instead of `'rgb(255, 0, 0).
    // ['red', { format: 'rgb', color: { r: 1, g: 0, b: 0, a: 1 } }],
  ])('works', (cssColor, rgbColorString) => {
    expect(parsePropsColor(cssColor)).toEqual(rgbColorString)
  })
})
