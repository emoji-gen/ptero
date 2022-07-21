import { jest } from '@jest/globals'
import cuid from 'cuid'
import { Ptero } from './index'

describe('init', () => {
    test('should be initialized without arguments', () => {
        const ptero = new Ptero()
        expect(ptero.target).toBe(window)
    })

    test('should be initialized with window', () => {
        const ptero = new Ptero(window)
        expect(ptero.target).toBe(window)
    })

    test('should be initialized with document.body', () => {
        const ptero = new Ptero(document.body)
        expect(ptero.target).toBe(document.body)
    })
})

describe('addListener', () => {
  let ptero: Ptero
  let eventName: string

  beforeEach(() => {
    ptero = new Ptero()
    eventName = cuid()
  })

  test('should add event listener', () => {
    const listener = jest.fn()
    const result = ptero.addListener(eventName, listener)
    expect(listener).not.toHaveBeenCalled()
    expect(result).toBe(ptero)

    ptero.emit(eventName, 128)
    ptero.emit(eventName, { foo: 256 })
    expect(listener).toHaveBeenCalledTimes(2)

    const customEvents = listener.mock.calls as CustomEvent[][]
    expect(customEvents[0][0].detail).toBe(128)
    expect(customEvents[1][0].detail).toEqual({ foo: 256 })
  })
})

