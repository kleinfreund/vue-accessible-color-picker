import { ColorHwb, ColorRgb } from '../../types.js'
import { convertHslToHsv } from './convertHslToHsv.js'
import { convertHsvToHwb } from './convertHsvToHwb.js'
import { convertRgbToHsl } from './convertRgbToHsl.js'

/**
 * Converts an RGB color object to an HWB color object.
 */
export function convertRgbToHwb (rgb: ColorRgb): ColorHwb {
	return convertHsvToHwb(convertHslToHsv(convertRgbToHsl(rgb)))
}
