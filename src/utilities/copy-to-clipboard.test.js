import { beforeEach, describe, test, expect, vi } from 'vitest'

import { copyToClipboard } from './copy-to-clipboard.js'

describe('copyToClipboard', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    document.execCommand = vi.fn()
    document.queryCommandSupported = vi.fn()
  })

  test('fails if document.queryCommandSupported returns false', () => {
    vi.spyOn(document, 'queryCommandSupported').mockImplementation(() => false)

    const result = copyToClipboard('test')

    expect(document.queryCommandSupported).toHaveBeenCalledWith('copy')

    expect(result).toBe(false)
  })

  test('fails if document.execCommand returns false', () => {
    vi.spyOn(document, 'queryCommandSupported').mockImplementation(() => true)
    vi.spyOn(document, 'execCommand').mockImplementation(() => false)

    const result = copyToClipboard('test')

    expect(document.queryCommandSupported).toHaveBeenCalledWith('copy')

    expect(result).toBe(false)
  })

  test('fails if document.execCommand throws', () => {
    vi.spyOn(document, 'queryCommandSupported').mockImplementation(() => true)
    vi.spyOn(document, 'execCommand').mockImplementation(() => {
      throw new Error('fail')
    })

    const result = copyToClipboard('test')

    expect(document.queryCommandSupported).toHaveBeenCalledWith('copy')

    expect(result).toBe(false)
  })

  test('works', () => {
    vi.spyOn(document, 'queryCommandSupported').mockImplementation(() => true)
    vi.spyOn(document, 'execCommand').mockImplementation(() => true)

    const result = copyToClipboard('test')

    expect(document.queryCommandSupported).toHaveBeenCalledWith('copy')
    expect(document.execCommand).toHaveBeenCalledWith('copy')

    expect(result).toBe(true)
  })
})
