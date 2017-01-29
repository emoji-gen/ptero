import cuid = require('cuid')

export function makeEventName() : string {
    return 'event-' + cuid()
}
