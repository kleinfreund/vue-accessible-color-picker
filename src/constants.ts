import { ColorFormat } from './types.js'
import { createAngle, createPercentageNumber } from './utilities/CssValues.js'

export const PRECISION = 5

type ChannelDefinition = {
	channel: string
	label: string
	preferredType: string
	from: (value: string) => number
}

const alpha = createPercentageNumber(0, 1, 1)
const angle = createAngle()
const percentageNumber = createPercentageNumber(0, 100, 100)
const rgbNumber = createPercentageNumber(0, 255, 255)

export const ALPHA_DEFINITION: ChannelDefinition = {
	channel: 'alpha',
	label: 'Alpha',
	preferredType: '<number>',
	from: alpha.from,
}

export const CHANNEL_DEFINITIONS: Record<Exclude<ColorFormat, 'hex'>, [ChannelDefinition, ChannelDefinition, ChannelDefinition]> = {
	'hsl': [
		{
			channel: 'h',
			label: 'H',
			preferredType: '<number>',
			from: angle.from,
		},
		{
			channel: 's',
			label: 'S',
			preferredType: '<percentage>',
			from: percentageNumber.from,
		},
		{
			channel: 'l',
			label: 'L',
			preferredType: '<percentage>',
			from: percentageNumber.from,
		},
	],
	'hwb': [
		{
			channel: 'h',
			label: 'H',
			preferredType: '<number>',
			from: angle.from,
		},
		{
			channel: 'w',
			label: 'W',
			preferredType: '<percentage>',
			from: percentageNumber.from,
		},
		{
			channel: 'b',
			label: 'B',
			preferredType: '<percentage>',
			from: percentageNumber.from,
		},
	],
	'rgb': [
		{
			channel: 'r',
			label: 'R',
			preferredType: '<number>',
			from: rgbNumber.from,
		},
		{
			channel: 'g',
			label: 'G',
			preferredType: '<number>',
			from: rgbNumber.from,
		},
		{
			channel: 'b',
			label: 'B',
			preferredType: '<number>',
			from: rgbNumber.from,
		},
	],
}
