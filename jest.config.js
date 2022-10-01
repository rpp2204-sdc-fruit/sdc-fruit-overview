module.exports = {
  collectCoverage: false,
  // collectCoverageFrom: ['./client/src/**/*.jsx'],
  collectCoverageFrom: ['./client/src/components/reviews_module/**/*.jsx'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.js'],
};
