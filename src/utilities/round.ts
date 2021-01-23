/**
 * Rounds a given number to a certain level of precision after the decimal point.
 *
 * The default decimal precision is 2 (e.g. the value `10.333` would result in `'10.33'`).
 */
export function round (value: number, decimalPrecision = 2): string {
  return value.toFixed(decimalPrecision).replace(/0+$/, '').replace(/\.$/, '')
}
