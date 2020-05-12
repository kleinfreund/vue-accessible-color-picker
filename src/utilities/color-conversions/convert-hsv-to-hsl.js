/**
 * Converts an HSV color object to an HSL color object.
 *
 * Source: https://en.m.wikipedia.org/wiki/HSL_and_HSV#HSV_to_HSL
 *
 * @param {{ h: number, s: number, v: number, a: number }} hsv
 * @returns {{ h: number, s: number, l: number, a: number }}
 */
export default function convertHsvToHsl (hsv) {
  const l = hsv.v - (hsv.v * hsv.s) / 2
  const lMin = Math.min(l, 1 - l)
  const s = lMin === 0 ? 0 : (hsv.v - l) / lMin

  return {
    h: hsv.h,
    s,
    l,
    a: hsv.a,
  }
}
