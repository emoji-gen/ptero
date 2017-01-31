'use strict'

const customLaunchers = {
  sl_chrome: {
    base: 'SauceLabs',
    browserName: 'chrome',
    platform: 'Windows 10',
    version: '51.0'
  },
  sl_firefox: {
    base: 'SauceLabs',
    browserName: 'firefox',
    platform: 'Windows 10',
    version: '47.0'
  },
  sl_ie9: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '9.0',
  },
  sl_ie10: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '10.0',
  },
  sl_ie11: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 10',
    version: '11.0',
  },
  sl_edge: {
    base: 'SauceLabs',
    browserName: 'MicrosoftEdge',
    platform: 'Windows 10',
    version: '13.10586'
  },
  sl_safari: {
    base: 'SauceLabs',
    browserName: 'safari',
    platform: 'OS X 10.11',
    version: '9.0',
  },
}

const isTravis   = process.env.TRAVIS === 'true'
const isFirstJob = /\.1$/.test(process.env.TRAVIS_JOB_NUMBER)

const browsers = ['PhantomJS']
if (isTravis && isFirstJob) {
  Array.prototype.push.apply(browsers, Object.keys(customLaunchers))
}

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    browsers: browsers,
    customLaunchers: customLaunchers,

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

    reporters: ['mocha', 'growl'],

    port: 9876,
    colors: true,
    logLevel: config.LOG_LOG,

    singleRun: false,
    autoWatch: true,
  })
}
