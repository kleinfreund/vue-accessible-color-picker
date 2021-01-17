describe('index.js', () => {
  test('default export has “install” function', async () => {
    const { default: ColorPickerPlugin } = await import('./index.js')

    expect(typeof ColorPickerPlugin.install).toBe('function')
  })

  test('install function calls component function on argument', async () => {
    const { default: ColorPickerPlugin } = await import('./index.js')
    const app = { component: jest.fn() }

    ColorPickerPlugin.install(app)
    expect(app.component).toHaveBeenCalled()
  })
})
