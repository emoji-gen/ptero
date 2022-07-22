module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: 'false',
        useBuiltIns: 'usage',
        targets: 'maintained node versions',
      }
    ]
  ],
  env: {
    test: {
      presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
    },
  },
}
