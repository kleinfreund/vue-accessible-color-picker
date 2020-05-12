/**
 * Converts an HSV color object to an RGB color object.
 *
 * Source: https://en.m.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB
 *
 * @param {{ h: number, s: number, v: number, a: number }} hsv
 * @returns {{ r: number, g: number, b: number, a: number }}
 */
export default function convertHsvToRgb (hsv) {
  return {
    r: fn(5, hsv),
    g: fn(3, hsv),
    b: fn(1, hsv),
    a: hsv.a,
  }
}

function fn (n, hsv) {
  const k = (n + hsv.h * 6) % 6
  return hsv.v - hsv.v * hsv.s * Math.max(0, Math.min(k, 4 - k, 1))
}
