'use strict'

import {assert} from 'chai'
import * as sinon from 'sinon'

import * as ptero from '../src/index'
import {makeEventName} from './test_helpers'


describe('addListener', () => {
    let eventName: string

    beforeEach(() => {
        eventName = makeEventName()
    })

    it('should add event listener', () => {
        const listener = sinon.spy()
        ptero.addListener(eventName, listener)
        assert.isNotOk(listener.called)

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
    let eventName: string
    let eventName2: string

    beforeEach(() => {
        eventName  = makeEventName()
        eventName2 = makeEventName()

        assert(eventName !== eventName2)
    })

    it('should add single event listener', () => {
        const listener = sinon.spy()
        ptero.on(eventName, listener)
        assert.isNotOk(listener.called)

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
        ptero.on([ eventName, eventName2 ], listener)
        assert.isNotOk(listener.called)

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


