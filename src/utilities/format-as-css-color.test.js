/** @typedef {import('../../types/index').VueAccessibleColorPicker.ColorHsl} ColorHsl */
/** @typedef {import('../../types/index').VueAccessibleColorPicker.ColorHwb} ColorHwb */
/** @typedef {import('../../types/index').VueAccessibleColorPicker.ColorRgb} ColorRgb */
/** @typedef {import('../../types/index').VueAccessibleColorPicker.VisibleColorFormat} VisibleColorFormat */

import { formatAsCssColor } from './format-as-css-color.js'

describe('formatAsCssColor', () => {
  test.each(/** @type {[string, VisibleColorFormat, string][]} */ ([
    ['#fff', 'hex', '#fff'],
    ['#FFF', 'hex', '#FFF'],
    ['#000', 'hex', '#000'],
  ]))('works for HEX colors', (color, format, cssColorString) => {
    expect(formatAsCssColor(color, format)).toEqual(cssColorString)
  })

  test.each(/** @type {[ColorHsl, VisibleColorFormat, string][]} */ ([
    [{ h: 1, s: 1, l: 0.5, a: 1 }, 'hsl', 'hsl(360 100% 50% / 1)'],
    [{ h: 0.75, s: 1, l: 0.5, a: 1 }, 'hsl', 'hsl(270 100% 50% / 1)'],
  ]))('works for HSL colors', (color, format, cssColorString) => {
    expect(formatAsCssColor(color, format)).toEqual(cssColorString)
  })

  test.each(/** @type {[ColorHwb, VisibleColorFormat, string][]} */ ([
    [{ h: 1, w: 1, b: 1, a: 1 }, 'hwb', 'hwb(360 100% 100% / 1)'],
    [{ h: 0.75, w: 1, b: 1, a: 1 }, 'hwb', 'hwb(270 100% 100% / 1)'],
  ]))('works for HWB colors', (color, format, cssColorString) => {
    expect(formatAsCssColor(color, format)).toEqual(cssColorString)
  })

  test.each(/** @type {[ColorRgb, VisibleColorFormat, string][]} */ ([
    [{ r: 1, g: 1, b: 1, a: 1 }, 'rgb', 'rgb(255 255 255 / 1)'],
    [{ r: 1, g: 0, b: 0, a: 1 }, 'rgb', 'rgb(255 0 0 / 1)'],
    [{ r: 1, g: 0, b: 0, a: 1 }, 'rgb', 'rgb(255 0 0 / 1)'],
    [{ r: 1, g: 0, b: 0, a: 1 }, 'rgb', 'rgb(255 0 0 / 1)'],
    [{ r: 1, g: 0, b: 0, a: 1 }, 'rgb', 'rgb(255 0 0 / 1)'],
    [{ r: 1, g: 0, b: 0, a: 0.333 }, 'rgb', 'rgb(255 0 0 / 0.33)'],
    [{ r: 0.5, g: 0.5, b: 0.25, a: 1 }, 'rgb', 'rgb(127.5 127.5 63.75 / 1)'],
    [{ r: 0.5, g: 0.75, b: 0.125, a: 1 }, 'rgb', 'rgb(127.5 191.25 31.88 / 1)'],
  ]))('works for RGB colors', (color, format, cssColorString) => {
    expect(formatAsCssColor(color, format)).toEqual(cssColorString)
  })
})
