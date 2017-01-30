# ptero &nbsp;[![npm](https://img.shields.io/npm/v/ptero.svg?maxAge=2592000&style=flat-square)](https://www.npmjs.org/package/ptero) [![Travis](https://img.shields.io/travis/emoji-gen/ptero/master.svg?maxAge=2592000&style=flat-square&x)](https://travis-ci.org/emoji-gen/ptero) [![Dependency Status](https://img.shields.io/gemnasium/emoji-gen/ptero.svg?maxAge=2592000&style=flat-square)](https://gemnasium.com/github.com/emoji-gen/ptero)

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
