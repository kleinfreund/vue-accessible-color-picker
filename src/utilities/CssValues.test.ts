import { describe, test, expect } from 'vitest'

import {
	from8BitDecimal,
	fromAlpha,
	fromHueAngle,
	fromPercentage,
	to8BitDecimal,
	toAlpha,
	toHueAngle,
	toPercentage,
} from './CssValues.js'

describe('CssValues', () => {
	describe('hue angle', () => {
		test.each([
			['-30', 330],
			['0', 0],
			['360', 0],
			['450', 90],
			['270', 270],
			['270.', NaN],
		])('fromHueAngle', (value, expected) => {
			expect(fromHueAngle(value)).toEqual(expected)
		})

		test.each([
			[0, '0'],
			[60, '60'],
			[90, '90'],
			[120, '120'],
			[180, '180'],
			[270, '270'],
		])('toHueAngle', (value, expected) => {
			expect(toHueAngle(value)).toEqual(expected)
		})
	})

	describe('percentage', () => {
		test.each([
			['0%', 0],
			['0', NaN],
			['10.%', NaN],
			['a%', NaN],
			['-13%', 0],
			['55.55%', 55.55],
			['100%', 100],
			['1300%', 100],
		])('fromPercentage', (value, expected) => {
			expect(fromPercentage(value)).toEqual(expected)
		})

		test.each([
			[0, '0%'],
			[55.55, '55.55%'],
			[100, '100%'],
		])('toPercentage', (value, expected) => {
			expect(toPercentage(value)).toEqual(expected)
		})
	})

	describe('8 bit decimal', () => {
		test.each([
			['0', 0],
			['0%', 0],
			['10.', NaN],
			['10.%', NaN],
			['a', NaN],
			['141.65', 141.65],
			['255', 255],
			['100%', 255],
			['50%', 127.5],
		])('from8BitDecimal', (value, expected) => {
			expect(from8BitDecimal(value)).toEqual(expected)
		})

		test.each([
			[0, '0'],
			[141.6525, '141.65'],
			[255, '255'],
		])('to8BitDecimal', (value, expected) => {
			expect(to8BitDecimal(value)).toEqual(expected)
		})
	})

	describe('alpha', () => {
		test.each([
			['0', 0],
			['0.5555', 0.5555],
			['1', 1],
			['0%', 0],
			['55.55%', 0.5555],
			['100%', 1],
		])('fromAlpha', (value, expected) => {
			expect(fromAlpha(value)).toEqual(expected)
		})

		test.each([
			[0, '0'],
			[0.5555, '0.5555'],
			[1, '1'],
		])('toAlpha', (value, expected) => {
			expect(toAlpha(value)).toEqual(expected)
		})
	})
})
