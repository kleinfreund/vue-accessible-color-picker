import { copyToClipboard } from './copy-to-clipboard.js'

describe('copyToClipboard', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
    document.execCommand = jest.fn()
    document.queryCommandSupported = jest.fn()
  })

  test('fails if document.queryCommandSupported returns false', () => {
    jest.spyOn(document, 'queryCommandSupported').mockImplementation(() => false)

    const result = copyToClipboard('test')

    expect(document.queryCommandSupported).toHaveBeenCalledWith('copy')

    expect(result).toBe(false)
  })

  test('fails if document.execCommand returns false', () => {
    jest.spyOn(document, 'queryCommandSupported').mockImplementation(() => true)
    jest.spyOn(document, 'execCommand').mockImplementation(() => false)

    const result = copyToClipboard('test')

    expect(document.queryCommandSupported).toHaveBeenCalledWith('copy')

    expect(result).toBe(false)
  })

  test('fails if document.execCommand throws', () => {
    jest.spyOn(document, 'queryCommandSupported').mockImplementation(() => true)
    jest.spyOn(document, 'execCommand').mockImplementation(() => {
      throw new Error('fail')
    })

    const result = copyToClipboard('test')

    expect(document.queryCommandSupported).toHaveBeenCalledWith('copy')

    expect(result).toBe(false)
  })

  test('works', () => {
    jest.spyOn(document, 'queryCommandSupported').mockImplementation(() => true)
    jest.spyOn(document, 'execCommand').mockImplementation(() => true)

    const result = copyToClipboard('test')

    expect(document.queryCommandSupported).toHaveBeenCalledWith('copy')
    expect(document.execCommand).toHaveBeenCalledWith('copy')

    expect(result).toBe(true)
  })
})
