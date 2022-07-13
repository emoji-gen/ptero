'use strict'

module.exports = config => {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    browsers: ['ChromeHeadless'],
    customLaunchers: {},
    concurrency: 1,
    browserDisconnectTimeout: 10000,
    browserNoActivityTimeout: 10000,
    browserDisconnectTolerance: 16,

    files: [
      'test/**/*_test.ts',
    ],
    exclude: [],

    preprocessors: {
      'test/**/*_test.ts': ['webpack']
    },

    webpack: {
      mode: 'development',
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
          'sinon': 'sinon/pkg/sinon',
        },
      },
      module: {
        noParse: [
          /sinon/,
        ],
        rules: [
          {
            test: /sinon.*\.js$/,
            loader: 'imports-loader?define=>false,require=>false',
          },
          { test: /\.tsx?$/, loader: 'ts-loader' },
          { test: /\.json$/, loader: 'json-loader' },
        ],
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
