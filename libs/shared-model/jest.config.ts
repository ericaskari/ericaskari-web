/* eslint-disable */
export default {
    displayName: 'shared-model',
    preset: '../../jest.preset.js',
    globals: {},
    testEnvironment: 'node',
    transform: {
        '^.+\\.[tj]s$': [
            'ts-jest',
            {
                tsconfig: '<rootDir>/tsconfig.spec.json'
            }
        ]
    },
    moduleFileExtensions: ['ts', 'js', 'html'],
    coverageDirectory: '../../coverage/libs/shared-model'
};
