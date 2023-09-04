/**
 * Rounds a given number to a certain level of precision after the decimal point.
 *
 * If the input value is an integer, no decimal point will be shown (e.g. `10` results in `'10'`).
 */
export function round (value: number, decimalPrecision: number): string {
	const string = value.toFixed(decimalPrecision)
	return string.includes('.') ? string.replace(/\.?0+$/, '') : string
}
