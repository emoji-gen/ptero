## ptero
[![npm](https://img.shields.io/npm/v/@emoji-gen/ptero.svg?maxAge=2592000&style=shield)](https://www.npmjs.com/package/@emoji-gen/ptero)
[![test](https://github.com/emoji-gen/ptero/actions/workflows/test.yml/badge.svg)](https://github.com/emoji-gen/ptero/actions/workflows/test.yml)
[![License](https://img.shields.io/static/v1?label=License&message=MIT&color=green)](https://opensource.org/licenses/MIT)

:deciduous_tree: Simple CustomEvent listener and emitter

## Getting started

```bash
$ npm install @emoji-gen/ptero --save
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
### Build

```
$ npm run build
```

### Test

```
$ npm test
```

### Publish

Update the version in `package.json` to the version you want to release.

Then, manually trigger the [publish.yml](https://github.com/emoji-gen/ptero/actions/workflows/publish.yml) workflow via the `workflow_dispatch` event to create a release.


## License
MIT &copy; [Emoji Generator](https://emoji-gen.ninja/)
