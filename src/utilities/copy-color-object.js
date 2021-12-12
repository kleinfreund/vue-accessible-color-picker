/**
 * @param {T} color
 * @returns {T}
 * @template T
 */
export function copyColorObject (color) {
  const newColor = {}

  for (const prop in color) {
    newColor[prop] = color[prop]
  }

  return newColor
}
