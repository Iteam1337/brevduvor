module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['lib/**/*.{ts,tsx}'],
  moduleFileExtensions: ['js', 'json', 'ts', 'node', 'd.ts'],
  globals: {
    'ts-jest': {
      diagnostics: true,
    },
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}
