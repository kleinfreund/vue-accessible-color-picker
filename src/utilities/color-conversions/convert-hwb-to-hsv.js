/** @typedef {import('../../../types/index').ColorHsv} ColorHsv */
/** @typedef {import('../../../types/index').ColorHwb} ColorHwb */

/**
 * Converts an HWB color object to an HSV color object.
 *
 * @param {ColorHwb} hwb
 * @returns {ColorHsv}
 */
export function convertHwbToHsv (hwb) {
  return {
    h: hwb.h,
    s: hwb.b === 1 ? 0 : 1 - hwb.w / (1 - hwb.b),
    v: 1 - hwb.b,
    a: hwb.a,
  }
}
