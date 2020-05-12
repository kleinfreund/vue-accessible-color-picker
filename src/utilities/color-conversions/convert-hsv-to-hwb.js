/**
 * Converts an HSV color object to an HWB color object.
 *
 * @param {{ h: number, s: number, v: number, a: number }} hsv
 * @returns {{ h: number, w: number, b: number, a: number }}
 */
export default function convertHsvToHwb (hsv) {
  return {
    h: hsv.h,
    w: (1 - hsv.s) * hsv.v,
    b: 1 - hsv.v,
    a: hsv.a,
  }
}
