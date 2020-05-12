import { convertColor } from './convert-color.js'

describe('convertColor', () => {
  test('works in general', () => {
    const color = '#ffffff'
    const result = convertColor(color, 'hex', 'rgb')
    expect(result).toEqual({ r: 1, g: 1, b: 1, a: 1 })
  })
})
