module.exports = {
  collectCoverage: false,
  collectCoverageFrom: ['./server/controllers/products.js'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.js'],
};
