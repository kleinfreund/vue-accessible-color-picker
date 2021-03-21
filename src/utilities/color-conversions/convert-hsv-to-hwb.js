/** @typedef {import('../../../types/index').ColorHsv} ColorHsv */
/** @typedef {import('../../../types/index').ColorHwb} ColorHwb */

/**
 * Converts an HSV color object to an HWB color object.
 *
 * @param {ColorHsv} hsv
 * @returns {ColorHwb}
 */
export function convertHsvToHwb (hsv) {
  return {
    h: hsv.h,
    w: (1 - hsv.s) * hsv.v,
    b: 1 - hsv.v,
    a: hsv.a,
  }
}
