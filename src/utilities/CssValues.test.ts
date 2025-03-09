import { describe, test, expect } from 'vitest'

import {
	createAngle,
	createPercentageNumber,
} from './CssValues.js'

describe('CssValues', () => {
	test.each([
		['0', 0],
		['0.5555', 0.5555],
		['1', 1],
		['0%', 0],
		['55.55%', 0.5555],
		['100%', 1],
	])('alpha.from("%s") = %s', (value, expected) => {
		const alpha = createPercentageNumber(0, 1, 1)
		expect(alpha.from(value)).toEqual(expected)
	})

	test.each([
		['-30', -30],
		['0', 0],
		['360', 360],
		['450', 450],
		['270', 270],
		['270.', NaN],
		['90deg', 90],
		['100grad', 90],
		['1.5707963267948966rad', 90],
		['0.25turn', 90],
		['90xdeg', NaN],
		['90.deg', NaN],
	])('angle.from("%s") = %s', (value, expected) => {
		const angle = createAngle()
		expect(angle.from(value)).toEqual(expected)
	})

	test.each([
		['0', 0],
		['10.', NaN],
		['a', NaN],
		['-13', -13],
		['55.55', 55.55],
		['100', 100],
		['1300', 1300],
	])('number.from("%s") = %s', (value, expected) => {
		const number = createPercentageNumber(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, 1)
		expect(number.from(value)).toEqual(expected)
	})

	test.each([
		// E.g. HSL saturation and lightness channels
		['0%', 0],
		['0', 0],
		['10', 10],
		['10%', 10],
		['10.%', NaN],
		['a%', NaN],
		['a', NaN],
		['-13%', 0],
		['-13', 0],
		['-0%', 0],
		['-0', 0],
		['55.55%', 55.55],
		['100%', 100],
		['100', 100],
		['1300%', 100],
		['1300', 100],
	])('100s percentageNumber.from("%s") = %s', (value, expected) => {
		const percentage = createPercentageNumber(0, 100, 100)
		expect(percentage.from(value)).toEqual(expected)
	})

	test.each([
		['100%', 1],
		['1', 1],
		['50%', 0.5],
		['0.5', 0.5],
		['0%', 0],
		['0', 0],
		['1300%', 1],
		['1300', 1],
		['-13%', 0],
		['-13', 0],
	])('1s percentageNumber.from("%s") = %s', (value, expected) => {
		const percentage = createPercentageNumber(0, 1, 1)
		expect(percentage.from(value)).toEqual(expected)
	})

	test.each([
		['0%', 0],
		['0', 0],
		['10.', NaN],
		['10.%', NaN],
		['10%', 25.5],
		['10', 10],
		['50%', 127.5],
		['50', 50],
		['a%', NaN],
		['a', NaN],
		['-13%', 0],
		['-13', 0],
		['-0%', 0],
		['-0', 0],
		['141.65', 141.65],
		['255', 255],
		['100%', 255],
		['100', 100],
		['1300%', 255],
		['1300', 255],
	])('rgbNumber.from("%s") = %s', (value, expected) => {
		const rgbNumber = createPercentageNumber(0, 255, 255)
		expect(rgbNumber.from(value)).toEqual(expected)
	})
})
