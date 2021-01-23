import { VisibleColorFormat } from '../../types/index.js'
import { round } from './round.js'

const formatters: { [key: string]: (color: { [key: string]: number }) => string } = {
  hsl (hsl: { [key: string]: number }): string {
    const h = round(hsl.h * 360)
    const s = round(hsl.s * 100)
    const l = round(hsl.l * 100)
    const a = round(hsl.a)

    return `hsl(${h} ${s}% ${l}% / ${a})`
  },

  hwb (hwb: { [key: string]: number }): string {
    const h = round(hwb.h * 360)
    const w = round(hwb.w * 100)
    const b = round(hwb.b * 100)
    const a = round(hwb.a)

    return `hwb(${h} ${w}% ${b}% / ${a})`
  },

  rgb (rgb: { [key: string]: number }): string {
    const r = round(rgb.r * 255)
    const g = round(rgb.g * 255)
    const b = round(rgb.b * 255)
    const a = round(rgb.a)

    return `rgb(${r} ${g} ${b} / ${a})`
  },
}

/**
 * Formats a given color object as a CSS color string.
 */
export function formatAsCssColor (color: string | { [key: string]: number }, format: VisibleColorFormat): string {
  if (typeof color === 'string') {
    return color
  } else {
    return formatters[format](color)
  }
}
