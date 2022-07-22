import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
    moduleNameMapper: {
        '^nanoid$': '<rootDir>/node_modules/nanoid/index.js',
    },
    preset: 'ts-jest',
    transform: {
        '\\.js$': 'babel-jest',
    },
    transformIgnorePatterns: [
        '/node_modules/(?!nanoid/)',
        '\\.pnp\\.[^\\\/]+$',
    ],
    verbose: true,
}

export default config
