'use strict'

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],

    browsers: ['PhantomJS'],

    files: [
      'test/**/*_test.ts',
    ],
    exclude: [],

    preprocessors: {
      'test/**/*_test.ts': ['webpack']
    },

    webpack: {
      resolve: {
        extensions: ['', '.ts', '.tsx', '.js', '.json'],
        modulesDirectories: ['node_modules'],
        alias: {
          'sinon': 'sinon/pkg/sinon',
        },
      },
      module: {
        noParse: [
          /sinon/,
        ],
        loaders: [
          {
            test: /sinon.*\.js$/,
            loader: 'imports?define=>false,require=>false',
          },
          { test: /\.tsx?$/, loader: 'ts' },
          { test: /\.json$/, loader: 'json' },
        ],
      },
      browsers: {
        fs: false,
      },
    },
    webpackMiddleware: {
      noInfo: true
    },

    reporters: ['mocha'],

    port: 9876,
    colors: true,
    logLevel: config.LOG_LOG,

    singleRun: false,
    autoWatch: true,
  })
}
