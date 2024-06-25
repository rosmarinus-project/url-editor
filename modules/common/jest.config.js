export default {
  rootDir: './',
  bail: true,
  testMatch: ['<rootDir>/test/**/*.{spec,test}.{ts,tsx}'],
  transform: {
    '^.+.(tsx|ts|js|jsx)$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleFileExtensions: ['tsx', 'ts', 'js', 'json', 'jsx'],
  collectCoverage: true,
  clearMocks: true,
  coverageDirectory: 'reports/coverage',
  coverageReporters: ['json-summary', 'text', 'lcov', 'html'],
  // 只测算法部分
  collectCoverageFrom: ['src/search/algorithms/**/*.{ts,tsx}', '!src/**/*.d.ts', '!src/@types/**/*'],
};
