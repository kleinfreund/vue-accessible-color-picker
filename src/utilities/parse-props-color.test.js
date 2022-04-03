/** @typedef {import('../../types/index').ColorFormat} ColorFormat */
/** @typedef {import('../../types/index').ColorHsl} ColorHsl */
/** @typedef {import('../../types/index').ColorHsv} ColorHsv */
/** @typedef {import('../../types/index').ColorHwb} ColorHwb */
/** @typedef {import('../../types/index').ColorRgb} ColorRgb */

import { describe, test, expect } from 'vitest'

import { parsePropsColor } from './parse-props-color.js'

// Note: This test is the reason this project has the package `canvas` installed. JSDom uses it automatically to handle HTML canvas which is used by `parsePropsColor` to convert a CSS color name to a color in hexadecimal format.

describe('getCssColorAsRgbString', () => {
  test.each(/** @type {[string | ColorHsl | ColorHsv | ColorHwb | ColorRgb, { format: ColorFormat, color: string | ColorHsl | ColorHsv | ColorHwb | ColorRgb } | null][]} */ ([
    ['rgb(255, 0, 0)', { format: 'rgb', color: { r: 1, g: 0, b: 0, a: 1 } }],
    ['rgba(255, 0, 0, 1)', { format: 'rgb', color: { r: 1, g: 0, b: 0, a: 1 } }],
    ['rgb(127.5, 0, 255)', { format: 'rgb', color: { r: 0.5, g: 0, b: 1, a: 1 } }],
    ['rgb(127.5 0 255)', { format: 'rgb', color: { r: 0.5, g: 0, b: 1, a: 1 } }],
    ['rgb(127.5 0 255 / 0.5)', { format: 'rgb', color: { r: 0.5, g: 0, b: 1, a: 0.5 } }],
    ['rgb(50% 0% 100% / 0.5)', { format: 'rgb', color: { r: 0.5, g: 0, b: 1, a: 0.5 } }],
    ['hsl(255, 0%, 0%)', { format: 'hsl', color: { h: 0.7083333333333334, s: 0, l: 0, a: 1 } }],
    ['hsla(255, 0%, 0%, 1)', { format: 'hsl', color: { h: 0.7083333333333334, s: 0, l: 0, a: 1 } }],
    ['hsl(127.5, 0%, 100%)', { format: 'hsl', color: { h: 0.3541666666666667, s: 0, l: 1, a: 1 } }],
    ['hsl(127.5 0% 100%)', { format: 'hsl', color: { h: 0.3541666666666667, s: 0, l: 1, a: 1 } }],
    ['hsl(127.5 0% 100% / 0.5)', { format: 'hsl', color: { h: 0.3541666666666667, s: 0, l: 1, a: 0.5 } }],
    ['hsl(360 0% 100% / 0.5)', { format: 'hsl', color: { h: 0, s: 0, l: 1, a: 0.5 } }],
    [{ r: 0.5, g: 0, b: 1, a: 1 }, { format: 'rgb', color: { r: 0.5, g: 0, b: 1, a: 1 } }],
    [{ h: 0.3541666666666667, s: 0, l: 1, a: 0.5 }, { format: 'hsl', color: { h: 0.3541666666666667, s: 0, l: 1, a: 0.5 } }],
    ['#1234', { format: 'hex', color: '#1234' }],
    ['#12345', null],
    ['#123456', { format: 'hex', color: '#123456' }],
    ['#12345678', { format: 'hex', color: '#12345678' }],
    ['#123456789', null],
    ['red', { format: 'hex', color: '#ff0000' }],
    ['rebeccapurple', { format: 'hex', color: '#663399' }],
    ['black', { format: 'hex', color: '#000000' }],
    ['invalid', null],
  ]))('parses “%s” correctly', (cssColor, rgbColorString) => {
    expect(parsePropsColor(cssColor)).toEqual(rgbColorString)
  })
})
