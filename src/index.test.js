import defaultExport, { ColorPicker } from './index.js'

describe('index.js', () => {
  test('default export has install function', () => {
    expect(typeof defaultExport.install).toBe('function')
  })

  test('calling install calls Vue.component correctly', () => {
    const Vue = {
      component () {
        return jest.fn()
      },
    }

    jest.spyOn(Vue, 'component')

    defaultExport.install(Vue)

    expect(Vue.component).toHaveBeenCalledWith('ColorPicker', ColorPicker)
  })
})
