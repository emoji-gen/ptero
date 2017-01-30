# ptero

:deciduous_tree: Simple CustomEvent listener and emitter

## Usage

```js
const {Presto} = require('presto')
const presto = new Presto()

presto.on('eventname', e => {
    console.log(e.detail) // => { foo: 1 }
})

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
