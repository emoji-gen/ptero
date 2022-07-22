## ptero
[![npm](https://img.shields.io/npm/v/@emoji-gen/ptero.svg?maxAge=2592000&style=shield)](https://www.npmjs.com/package/@emoji-gen/ptero)
[![build](https://github.com/emoji-gen/ptero/actions/workflows/build.yml/badge.svg)](https://github.com/emoji-gen/ptero/actions/workflows/build.yml)
[![License](https://img.shields.io/static/v1?label=License&message=MIT&color=green)](https://opensource.org/licenses/MIT)

:deciduous_tree: Simple CustomEvent listener and emitter

## Getting started

```bash
$ npm install @emoji-gen/ptero --save # for npm users
$ yarn add @emoji-gen/ptero           # for yarn users
```

```js
import { Ptero } from '@emoji-gen/ptero'

const ptero = new Ptero()

ptero.on('eventname', e => {
    console.log(e.detail) // => { foo: 1 }
})

ptero.emit('eventname', { foo: 1 })
```

## Features

- Supports TypeScript
- Supports both CommonJS and ESModules

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

```bash
$ yarn start     # for development
$ yarn run build # for production
$ yarn test      # run tests
```

## License
MIT &copy; [Emoji Generator](https://emoji-gen.ninja/)
