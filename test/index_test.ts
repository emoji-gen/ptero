'use strict'

import {assert} from 'chai'
import * as sinon from 'sinon'

import {Ptero} from '../src/index'
import {makeEventName} from './test_helpers'


describe('init', () => {
  it('should be initialized without arguments', () => {
    const ptero = new Ptero()
    assert.equal(ptero.target, window)
  })

  it('should be initialized with window', () => {
    const ptero = new Ptero(window)
    assert.equal(ptero.target, window)
  })

  it('should be initialized with document.body', () => {
    const ptero = new Ptero(document.body)
    assert.equal(ptero.target, document.body)
  })
})


describe('addListener', () => {
  let ptero: Ptero
  let eventName: string

  beforeEach(() => {
    ptero   = new Ptero()
    eventName = makeEventName()
  })

  it('should add event listener', () => {
    const listener = sinon.spy()
    const result   = ptero.addListener(eventName, listener)
    assert.isNotOk(listener.called)
    assert.equal(result, ptero)

    ptero.emit(eventName, 128)
    ptero.emit(eventName, { foo: 256 })
    assert.isOk(listener.called)
    assert.isOk(listener.calledTwice)

    const customEvents = <CustomEvent[][]>(listener.args)
    assert.deepEqual(customEvents[0][0].detail, 128)
    assert.deepEqual(customEvents[1][0].detail, { foo: 256 })
  })
})


describe('on', () => {
  let ptero: Ptero
  let eventName: string
  let eventName2: string

  beforeEach(() => {
    ptero    = new Ptero()
    eventName  = makeEventName()
    eventName2 = makeEventName()

    assert(eventName !== eventName2)
  })

  it('should add single event listener', () => {
    const listener = sinon.spy()
    const result   = ptero.on(eventName, listener)
    assert.isNotOk(listener.called)
    assert.equal(result, ptero)

    ptero.emit(eventName, 128)
    ptero.emit(eventName, { foo: 256 })
    assert.isOk(listener.called)
    assert.isOk(listener.calledTwice)

    const customEvents = <CustomEvent[][]>(listener.args)
    assert.deepEqual(customEvents[0][0].detail, 128)
    assert.deepEqual(customEvents[1][0].detail, { foo: 256 })
  })

  it('should add multi event listener', () => {
    const listener = sinon.spy()
    const result   = ptero.on([ eventName, eventName2 ], listener)
    assert.isNotOk(listener.called)
    assert.equal(result, ptero)

    ptero.emit(eventName, 128)
    ptero.emit(eventName, { foo: 256 })
    ptero.emit(eventName2, [ 1, 2, 'xxx' ])
    assert.isOk(listener.called)
    assert.isOk(listener.calledThrice)

    const customEvents = <CustomEvent[][]>(listener.args)
    assert.deepEqual(customEvents[0][0].detail, 128)
    assert.deepEqual(customEvents[1][0].detail, { foo: 256 })
    assert.deepEqual(customEvents[2][0].detail, [ 1, 2, 'xxx' ])
  })
})


describe('removeListener', () => {
  let ptero: Ptero
  let eventName: string

  beforeEach(() => {
    ptero   = new Ptero()
    eventName = makeEventName()
  })

  it('should remove listener', () => {
    const listener = sinon.spy()
    ptero.on(eventName, listener)
    assert.isNotOk(listener.called)

    ptero.emit(eventName)
    assert.isOk(listener.calledOnce)

    const result = ptero.removeListener(eventName, listener)
    ptero.emit(eventName)
    assert.isOk(listener.calledOnce)
    assert.equal(result, ptero)
  })
})


describe('off', () => {
  let ptero: Ptero
  let eventName: string
  let eventName2: string

  beforeEach(() => {
    ptero    = new Ptero()
    eventName  = makeEventName()
    eventName2 = makeEventName()
  })

  it('should remove single event listener', () => {
    const listener = sinon.spy()
    ptero.on(eventName, listener)
    assert.isNotOk(listener.called)

    ptero.emit(eventName)
    assert.isOk(listener.calledOnce)

    const result = ptero.off(eventName, listener)
    ptero.emit(eventName)
    assert.isOk(listener.calledOnce)
    assert.equal(result, ptero)
  })

  it('should remove multi event listener', () => {
    const listener = sinon.spy()
    ptero.on(eventName, listener)
    ptero.on(eventName2, listener)
    assert.isNotOk(listener.called)

    ptero.emit(eventName)
    ptero.emit(eventName2)
    assert.isOk(listener.calledTwice)

    const result = ptero.off([ eventName, eventName2 ], listener)
    ptero.emit(eventName)
    ptero.emit(eventName2)
    assert.isOk(listener.calledTwice)
    assert.equal(result, ptero)
  })
})


describe('emit', () => {
  let ptero: Ptero
  let eventName: string
  let eventName2: string

  beforeEach(() => {
    ptero = new Ptero(document.body)
    eventName  = makeEventName()
    eventName2 = makeEventName()
  })

  it('should emit a single event', () => {
    const listener = sinon.spy()
    ptero.on([ eventName, eventName2 ], listener)
    assert.isNotOk(listener.called)

    ptero.emit(eventName, 128)
    ptero.emit(eventName2, { foo: 256 })
    assert.isOk(listener.calledTwice)

    const customEvents = <CustomEvent[][]>(listener.args)
    assert.deepEqual(customEvents[0][0].detail, 128)
    assert.deepEqual(customEvents[1][0].detail, { foo: 256 })
  })

  it('should emit multi events', () => {
    const listener = sinon.spy()
    ptero.on([ eventName, eventName2 ], listener)
    assert.isNotOk(listener.called)

    ptero.emit([ eventName, eventName2 ], 128)
    assert.isOk(listener.calledTwice)

    const customEvents = <CustomEvent[][]>(listener.args)
    assert.deepEqual(customEvents[0][0].detail, 128)
    assert.deepEqual(customEvents[1][0].detail, 128)
  })
})

