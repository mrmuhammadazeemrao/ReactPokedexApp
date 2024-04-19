module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testEnvironment: 'jest-environment-jsdom',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporter: ['text', 'lcov'],
  collectCoverageForm: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
  ]
};