import { ColorHsv, ColorRgb } from '../../types.js'
import { convertHslToRgb } from './convertHslToRgb.js'
import { convertHsvToHsl } from './convertHsvToHsl.js'

/**
 * Converts an HSV color object to an RGB color object.
 *
 * Source: https://en.m.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB
 */
export function convertHsvToRgb (hsv: ColorHsv): ColorRgb {
	return convertHslToRgb(convertHsvToHsl(hsv))
}
