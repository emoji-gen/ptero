export type ListenerFunction = (e: CustomEvent) => void
export type EventListener = (e: CustomEvent) => void

export class Ptero {
  target: EventTarget;

  constructor(target: EventTarget = window) {
    this.target = target
  }

  addListener(event: string, listener: EventListener) : Ptero {
    // @ts-ignore
    this.target.addEventListener(event, listener, false)
    return this
  }

  on(event: string|string[], listener: ListenerFunction) : Ptero {
    if (Array.isArray(event)) {
      event.forEach(e => { this.addListener(e, listener) })
    } else {
      this.addListener(event, listener)
    }
    return this
  }

  removeListener(event: string, listener: ListenerFunction) : Ptero {
    // this.target.removeEventListener(event, listener, false)
    return this
  }

  off(event: string|string[], listener: (e: CustomEvent) => void) {
    if (Array.isArray(event)) {
      event.forEach(e => { this.removeListener(e, listener) })
    } else {
      this.removeListener(event, listener)
    }
    return this
  }

  emit(event: string|string[], detail: any = null) : Ptero {
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
