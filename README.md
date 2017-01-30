# ptero &nbsp;[![npm](https://img.shields.io/npm/v/ptero.svg?maxAge=2592000&style=flat-square)](https://www.npmjs.org/package/ptero) [![Travis](https://img.shields.io/travis/emoji-gen/ptero/master.svg?maxAge=2592000&style=flat-square&x)](https://travis-ci.org/emoji-gen/ptero) [![Dependency Status](https://img.shields.io/gemnasium/emoji-gen/ptero.svg?maxAge=2592000&style=flat-square)](https://gemnasium.com/github.com/emoji-gen/ptero)

:deciduous_tree: Simple CustomEvent listener and emitter

## Getting started

```
$ npm install ptero --save # for npm users
$ yarn add ptero           # for yarn users
```

```js
const {Presto} = require('presto')
const presto = new Presto()

presto.on('eventname', e => {
    console.log(e.detail) // => { foo: 1 }
})

presto.emit('eventname', { foo: 1 })
```

## References
### `new Presto(target)`
Create new `Presto` instance.

```js
// Default target is `window`
const presto = new Presto()
```

```js
// Set `document.body` for an event target
const presto = new Presto(document.body)
```

### `presto.addListener(event, listener)`
Listen a single custom event.

```js
presto.addListener('eventname', e => {
    console.log(e.detail)
})
```

### `presto.on(event, listener)`
Listen a single custom event or multi custom events.

```js
presto.on('eventname', e => {
    console.log(e.detail)
})

presto.on(['eventname1', 'eventname2'], e => {
    console.log(e.detail)
})
```

### `presto.removeListener(event, listener)`
Stop listening a single custom event.

```js
const listener = e => {
    console.log(e.detail)
}

presto.addListener('eventname', listener)
presto.removeListener('eventname', listener)
```

### `presto.off(event, listener)`
Stop listening a single custom event or multi custom events.

```js
const listener = e => {
    console.log(e.detail)
}

presto.on('eventname1', listener)
presto.on(['eventname2', 'eventname3'], listener)

presto.off('eventname1', listener)
presto.off(['eventname2', 'eventname3'], listener)
```

### `presto.emit(event, detail)`
Dispatch a single custom event.

```js
presto.emit('eventname', { foo: 1 })
```

## Development

```
$ yarn

$ yarn start     # for development
$ yarn run build # for production
$ yarn run test  # run tests
```

## License
MIT @ [Pine Mizune](https://github.com/pine)
