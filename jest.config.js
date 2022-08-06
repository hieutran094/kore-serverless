module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    moduleDirectories: ['node_modules', 'src'],
    rootDir: 'tests',
    testRegex: '.spec.ts$',
    transform: {
        '^.+\\.(t|j)s$': ['@swc/jest']
    },
    coverageDirectory: '../coverage',
    testEnvironment: 'node'
}
