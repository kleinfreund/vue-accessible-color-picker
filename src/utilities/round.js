/**
 * Rounds a given number to a certain level of precision after the decimal point.
 *
 * The default decimal precision is 2 (e.g. the value `10.333` would result in `'10.33'`).
 *
 * @param {number} value
 * @param {number} [decimalPrecision]
 * @returns {string}
 */
export function round (value, decimalPrecision = 2) {
  return value.toFixed(decimalPrecision).replace(/0+$/, '').replace(/\.$/, '')
}
