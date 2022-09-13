import { describe, test, expect } from 'vitest'

import { round } from './round.js'

describe('round', () => {
	test.each(/** @type {[number, string][]} */ ([
		[10.3, '10.3'],
		[10.3001, '10.3'],
		[10.33, '10.33'],
		[10.333, '10.33'],
		[10.333333333, '10.33'],
		[10.00333333333, '10'],
		[10, '10'],
	]))('works (one argument)', (value, expectedValue) => {
		expect(round(value)).toBe(expectedValue)
	})

	test.each(/** @type {[number, number, string][]} */ ([
		[10.3, 4, '10.3'],
		[10.33, 4, '10.33'],
		[10.333, 4, '10.333'],
		[10.333333333, 4, '10.3333'],
		[10.00333333333, 4, '10.0033'],
		[10, 4, '10'],
	]))('works (two arguments)', (value, precision, expectedValue) => {
		expect(round(value, precision)).toBe(expectedValue)
	})
})
