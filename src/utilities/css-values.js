import { clamp } from './clamp.js'
import { round } from './round.js'

/**
 * @param {string} value a string representing an arbitrary number
 * @returns {number} in the range [0, 1]
 */
export function fromHueAngle (value) {
  if (value.endsWith('.')) {
    return NaN
  }

  // Maps the angle to the range [0, 360] (e.g. -30 becomes 330, 385 becomes 15, etc).
  const boundAngle = ((parseFloat(value) % 360) + 360) % 360

  return boundAngle / 360
}

/**
 * @param {number} value in the range [0, 1]
 * @returns {string} in the range [0, 360]
 */
export function toHueAngle (value) {
  return round(value * 360)
}

/**
 * @param {string} value a string representing an arbitrary percentage value
 * @returns {number} in the range [0, 1]
 */
export function fromPercentage (value) {
  if (!value.endsWith('%')) {
    return NaN
  }

  const numberString = value.substring(0, value.length - 1)

  if (numberString.endsWith('.')) {
    return NaN
  }

  const numberValue = parseFloat(numberString)

  if (Number.isNaN(numberValue)) {
    return NaN
  }

  return clamp(numberValue, 0, 100) / 100
}

/**
 * @param {number} value in the range [0, 1]
 * @returns {string} in the range [0%, 100%]
 */
export function toPercentage (value) {
  return round(value * 100) + '%'
}

/**
 * @param {string} value a string representing an arbitrary number value
 * @returns {number} in the range [0, 1]
 */
export function from8BitDecimal (value) {
  if (value.endsWith('%')) {
    return fromPercentage(value)
  }

  if (value.endsWith('.')) {
    return NaN
  }

  const numberValue = parseFloat(value)

  if (Number.isNaN(numberValue)) {
    return NaN
  }

  return clamp(numberValue, 0, 255) / 255
}

/**
 * @param {number} value in the range [0, 1]
 * @returns {string} in the range [0, 255]
 */
export function to8BitDecimal (value) {
  return round(value * 255)
}

/**
 * @param {string} value in the range [0, 1] or [0%, 100%]
 * @returns {number} in the range [0, 1]
 */
export function fromAlpha (value) {
  if (value.endsWith('%')) {
    return fromPercentage(value)
  } else {
    return clamp(parseFloat(value), 0, 1)
  }
}

/**
 * @param {number} value in the range [0, 1]
 * @returns {string} in the range [0, 1]
 */
export function toAlpha (value) {
  return String(value)
}
