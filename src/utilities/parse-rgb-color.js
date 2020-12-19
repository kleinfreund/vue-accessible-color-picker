/** @typedef {import('../../types/index').VueAccessibleColorPicker.ColorRgb} ColorRgb */

import { CssValues } from './css-values.js'

/**
 * Parses an RGB color string into an RGB color object.
 *
 * @param {string} rgbColorString
 * @returns {ColorRgb}
 */
export function parseRgbColor (rgbColorString) {
  // We only care about the bits between the parentheses of `rgb()` or `rgba()`, so let’s strip those off.
  const rawValueString = rgbColorString.substring(rgbColorString.indexOf('(') + 1, rgbColorString.indexOf(')'))

  // The characters space (` `), comma (`,`), and forward slash (`/`)
  // are valid delimiters in an RGB color string.
  // The string `rgb(0,0,0)` is written in legacy syntax with commas as delimiters.
  // The string `rgb(0 0 0 / 0.5)` is written in modern syntax with spaces and a forward slash as delimiters.
  // By replacing those valid delimiters with one common character,
  // we can reliably split the individual values.
  // The length of the result also tells us whether the color included an alpha channel value.
  const functionValues = rawValueString.replace(/[,/]/g, ' ').replace(/\s+/g, ' ').split(' ')

  return {
    r: CssValues.from8BitDecimal(functionValues[0]),
    g: CssValues.from8BitDecimal(functionValues[1]),
    b: CssValues.from8BitDecimal(functionValues[2]),
    a: functionValues.length === 4 ? CssValues.fromAlpha(functionValues[3]) : 1,
  }
}
