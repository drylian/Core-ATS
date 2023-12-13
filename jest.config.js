module.exports = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.test.js'],
  setupFiles: ['<rootDir>/tests/SetupTest.js']
};
