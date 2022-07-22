/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals'
import { nanoid } from 'nanoid'
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
    eventName = nanoid()
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

describe('on', () => {
  let ptero: Ptero
  let eventName: string
  let eventName2: string

  beforeEach(() => {
    ptero = new Ptero()
    eventName = nanoid()
    eventName2 = nanoid()

    expect(eventName).not.toBe(eventName2)
  })

  test('should add single event listener', () => {
    const listener = jest.fn()
    const result = ptero.on(eventName, listener)
    expect(listener).not.toHaveBeenCalled()
    expect(result).toBe(ptero)

    ptero.emit(eventName, 128)
    ptero.emit(eventName, { foo: 256 })
    expect(listener).toHaveBeenCalledTimes(2)

    const customEvents = listener.mock.calls as CustomEvent[][]
    expect(customEvents[0][0].detail).toBe(128)
    expect(customEvents[1][0].detail).toEqual({ foo: 256 })
  })

  test('should add multi event listener', () => {
    const listener = jest.fn()
    const result = ptero.on([ eventName, eventName2 ], listener)
    expect(listener).not.toHaveBeenCalled()
    expect(result).toBe(ptero)

    ptero.emit(eventName, 128)
    ptero.emit(eventName, { foo: 256 })
    ptero.emit(eventName2, [ 1, 2, 'xxx' ])
    expect(listener).toHaveBeenCalledTimes(3)

    const customEvents = listener.mock.calls as CustomEvent[][]
    expect(customEvents[0][0].detail).toBe(128)
    expect(customEvents[1][0].detail).toEqual({ foo: 256 })
    expect(customEvents[2][0].detail).toEqual([ 1, 2, 'xxx' ])
  })
})

describe('removeListener', () => {
  let ptero: Ptero
  let eventName: string

  beforeEach(() => {
    ptero = new Ptero()
    eventName = nanoid()
  })

  test('should remove listener', () => {
    const listener = jest.fn()
    ptero.on(eventName, listener)
    expect(listener).not.toHaveBeenCalled()

    ptero.emit(eventName)
    expect(listener).toHaveBeenCalledTimes(1)

    const result = ptero.removeListener(eventName, listener)
    ptero.emit(eventName)
    expect(listener).toHaveBeenCalledTimes(1)
    expect(result).toBe(ptero)
  })
})

describe('off', () => {
  let ptero: Ptero
  let eventName: string
  let eventName2: string

  beforeEach(() => {
    ptero = new Ptero()
    eventName = nanoid()
    eventName2 = nanoid()
  })

  test('should remove single event listener', () => {
    const listener = jest.fn()
    ptero.on(eventName, listener)
    expect(listener).not.toHaveBeenCalled()

    ptero.emit(eventName)
    expect(listener).toHaveBeenCalledTimes(1)

    const result = ptero.off(eventName, listener)
    ptero.emit(eventName)
    expect(listener).toHaveBeenCalledTimes(1)
    expect(result).toBe(ptero)
  })

  test('should remove multi event listener', () => {
    const listener = jest.fn()
    ptero.on(eventName, listener)
    ptero.on(eventName2, listener)
    expect(listener).not.toHaveBeenCalled()

    ptero.emit(eventName)
    ptero.emit(eventName2)
    expect(listener).toHaveBeenCalledTimes(2)

    const result = ptero.off([ eventName, eventName2 ], listener)
    ptero.emit(eventName)
    ptero.emit(eventName2)
    expect(listener).toHaveBeenCalledTimes(2)
    expect(result).toBe(ptero)
  })
})


describe('emit', () => {
  let ptero: Ptero
  let eventName: string
  let eventName2: string

  beforeEach(() => {
    ptero = new Ptero(document.body)
    eventName = nanoid()
    eventName2 = nanoid()
  })

  test('should emit a single event', () => {
    const listener = jest.fn()
    ptero.on([ eventName, eventName2 ], listener)
    expect(listener).not.toHaveBeenCalled()

    ptero.emit(eventName, 128)
    ptero.emit(eventName2, { foo: 256 })
    expect(listener).toHaveBeenCalledTimes(2)

    const customEvents = listener.mock.calls as CustomEvent[][]
    expect(customEvents[0][0].detail).toBe(128)
    expect(customEvents[1][0].detail).toEqual({ foo: 256 })
  })

  test('should emit multi events', () => {
    const listener = jest.fn()
    ptero.on([ eventName, eventName2 ], listener)
    expect(listener).not.toHaveBeenCalled()

    ptero.emit([ eventName, eventName2 ], 128)
    expect(listener).toHaveBeenCalledTimes(2)

    const customEvents = listener.mock.calls as CustomEvent[][]
    expect(customEvents[0][0].detail).toBe(128)
    expect(customEvents[1][0].detail).toBe(128)
  })
})

