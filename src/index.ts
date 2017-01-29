'use strict'

export function addListener(event: string, listener: (e: CustomEvent) => void) {
    window.addEventListener(event, listener, false)
}

export function on(event: string|string[], listener: (e: CustomEvent) => void) {
    if (Array.isArray(event)) {
        event.forEach(e => { addListener(e, listener) })
    } else {
        addListener(event, listener)
    }
}

export function once(event: string, listener: (e: CustomEvent) => void) {
    const wrapper = (e: CustomEvent) => {
        removeEventListener(event, wrapper)
        listener(e)
    }
    addEventListener(event, wrapper)
}

export function removeListener(event: string, listener: (e: CustomEvent) => void) {
    window.removeEventListener(event, listener, false)
}

export function off(event: string|string[], listener: (e: CustomEvent) => void) {
    if (Array.isArray(event)) {
        event.forEach(e => { removeListener(e, listener) })
    } else {
        removeListener(event, listener)
    }
}

export function emit(event: string|string[], detail: any = null) {
    if (Array.isArray(event)) {
        event.forEach(e => { emit(e, detail) })
    } else {
        const customEvent = new CustomEvent(event, { detail })
        window.dispatchEvent(customEvent)
    }
}
