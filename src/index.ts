export type EventListener = (e: CustomEvent) => void

export class Ptero {
  target: EventTarget;

  constructor(target: EventTarget = window) {
    this.target = target
  }

  addListener(event: string, listener: EventListener) : this {
    this.target.addEventListener(event, listener as EventListenerOrEventListenerObject, false)
    return this
  }

  on(event: string|string[], listener: EventListener) : this {
    if (Array.isArray(event)) {
      event.forEach(e => { this.addListener(e, listener) })
    } else {
      this.addListener(event, listener)
    }
    return this
  }

  removeListener(event: string, listener: EventListener) : this {
    this.target.removeEventListener(event, listener as EventListenerOrEventListenerObject, false)
    return this
  }

  off(event: string|string[], listener: EventListener) : this {
    if (Array.isArray(event)) {
      event.forEach(e => { this.removeListener(e, listener) })
    } else {
      this.removeListener(event, listener)
    }
    return this
  }

  emit(event: string|string[], detail: any = null) : this {
    if (Array.isArray(event)) {
      event.forEach(e => { this.emit(e, detail) })
    } else {
      let customEvent: CustomEvent

      try {
        customEvent = new CustomEvent(event, { detail })
      }

      // for IE 9 ~ 11
      catch (e) {
        customEvent = document.createEvent('CustomEvent')
        customEvent.initCustomEvent(event, false, false, detail)
      }

      this.target.dispatchEvent(customEvent)
    }
    return this
  }
}
