module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleDirectories: ['node_modules', 'src'],
  rootDir: './',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  collectCoverage: false,
  verbose: true,
  testRunner: 'jest-jasmine2',
};
