module.exports = {
    displayName: 'Lib.Web.Forms',
    preset: '../jest.preset.js',
    setupFilesAfterEnv: [ '<rootDir>/src/test-setup.ts' ],
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json',
            stringifyContentPathRegex: '\\.(html|svg)$'
        }
    },
    coverageDirectory: '../coverage/libs/Lib.Web.Forms',
    snapshotSerializers: [
        'jest-preset-angular/build/serializers/no-ng-attributes',
        'jest-preset-angular/build/serializers/ng-snapshot',
        'jest-preset-angular/build/serializers/html-comment'
    ],
    transform: {
        '^.+.(ts|mjs|js|html)$': 'jest-preset-angular'
    },
    transformIgnorePatterns: [ 'node_modules/(?!.*.mjs$)' ]
};
