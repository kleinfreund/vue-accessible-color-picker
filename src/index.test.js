describe('index.js', () => {
  test('default export has install function', async () => {
    const { default: defaultExport } = await import('./index.js')

    expect(typeof defaultExport.install).toBe('function')
  })

  test('calling install calls Vue.component correctly', async () => {
    const { default: defaultExport, ColorPicker } = await import('./index.js')

    const Vue = {
      component () {
        return jest.fn()
      },
    }

    jest.spyOn(Vue, 'component')

    defaultExport.install(Vue)

    expect(Vue.component).toHaveBeenNthCalledWith(1, 'ColorPicker', ColorPicker)

    defaultExport.install(Vue)

    expect(Vue.component).toHaveBeenNthCalledWith(1, 'ColorPicker', ColorPicker)
  })

  test('calls Vue.use if Vue is available on window (for browsers)', async () => {
    jest.resetModuleRegistry()
    const vueUseMock = jest.fn()
    const windowSpy = jest.spyOn(global, 'window', 'get')
    windowSpy.mockImplementation(() => {
      return {
        Vue: {
          use: vueUseMock,
        },
      }
    })

    const { default: defaultExport } = await import('./index.js')

    expect(vueUseMock).toHaveBeenCalledWith(defaultExport)
  })

  test('calls Vue.use if Vue is available on global', async () => {
    jest.resetModuleRegistry()
    const windowSpy = jest.spyOn(global, 'window', 'get')
    windowSpy.mockImplementation(() => undefined)
    global.Vue = {
      use: jest.fn(),
    }

    const { default: defaultExport } = await import('./index.js')

    expect(global.Vue.use).toHaveBeenCalledWith(defaultExport)
  })
})
