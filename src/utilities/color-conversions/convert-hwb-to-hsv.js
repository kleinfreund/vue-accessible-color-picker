/**
 * Converts an HWB color object to an HSV color object.
 *
 * @param {{ h: number, w: number, b: number, a: number }} hwb
 * @returns {{ h: number, s: number, v: number, a: number }}
 */
export default function convertHwbToHsv (hwb) {
  return {
    h: hwb.h,
    s: hwb.b === 1 ? 0 : 1 - hwb.w / (1 - hwb.b),
    v: 1 - hwb.b,
    a: hwb.a,
  }
}
