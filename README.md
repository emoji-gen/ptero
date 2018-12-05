## ptero
[![npm](https://img.shields.io/npm/v/ptero.svg?maxAge=2592000&style=shield)](https://www.npmjs.org/package/ptero)
[![Build Status](https://travis-ci.org/emoji-gen/ptero.svg?branch=master)](https://travis-ci.org/emoji-gen/ptero)
[![dependencies Status](https://david-dm.org/emoji-gen/ptero/status.svg)](https://david-dm.org/emoji-gen/ptero)
[![devDependencies Status](https://david-dm.org/emoji-gen/ptero/dev-status.svg)](https://david-dm.org/emoji-gen/ptero?type=dev)

:deciduous_tree: Simple CustomEvent listener and emitter

## Getting started

```
$ npm install ptero --save # for npm users
$ yarn add ptero           # for yarn users
```

```js
const {Ptero} = require('ptero')
const ptero = new Ptero()

ptero.on('eventname', e => {
    console.log(e.detail) // => { foo: 1 }
})

ptero.emit('eventname', { foo: 1 })
```

## References
### `new Ptero(target)`
Create new `Ptero` instance.

```js
// Default target is `window`
const ptero = new Ptero()
```

```js
// Set `document.body` for an event target
const ptero = new Ptero(document.body)
```

### `ptero.addListener(event, listener)`
Listen a single custom event.

```js
ptero.addListener('eventname', e => {
    console.log(e.detail)
})
```

### `ptero.on(event, listener)`
Listen a single custom event or multi custom events.

```js
ptero.on('eventname', e => {
    console.log(e.detail)
})

ptero.on(['eventname1', 'eventname2'], e => {
    console.log(e.detail)
})
```

### `ptero.removeListener(event, listener)`
Stop listening a single custom event.

```js
const listener = e => {
    console.log(e.detail)
}

ptero.addListener('eventname', listener)
ptero.removeListener('eventname', listener)
```

### `ptero.off(event, listener)`
Stop listening a single custom event or multi custom events.

```js
const listener = e => {
    console.log(e.detail)
}

ptero.on('eventname1', listener)
ptero.on(['eventname2', 'eventname3'], listener)

ptero.off('eventname1', listener)
ptero.off(['eventname2', 'eventname3'], listener)
```

### `ptero.emit(event, detail)`
Dispatch a single custom event.

```js
ptero.emit('eventname', { foo: 1 })
```

## Development

```
$ yarn

$ yarn start     # for development
$ yarn run build # for production
$ yarn test      # run tests
```

## License
MIT &copy; [Emoji Generator](https://emoji-gen.ninja/)
