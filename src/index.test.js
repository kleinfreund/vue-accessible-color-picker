import { describe, test, expect, vi } from 'vitest'

import plugin from './index.js'

describe('index.js', () => {
  test('default export has “install” function', () => {
    expect(typeof plugin.install).toBe('function')
  })

  test('install function calls component function on argument', () => {
    const app = { component: vi.fn() }

    // @ts-ignore
    plugin.install(app)

    expect(app.component).toHaveBeenCalled()
  })
})
