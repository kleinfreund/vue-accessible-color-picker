/**
 * @param {T} color
 * @returns {T}
 * @template T
 */
export function copyColorObject (color) {
  // @ts-expect-error because whatever TypeScript
  /** @type {T} */ const newColor = {}

  for (const prop in color) {
    newColor[prop] = color[prop]
  }

  return newColor
}
