module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.jest.json' }],
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testRegex: 'src/.*\\.spec\\.(ts|tsx)$',
  moduleNameMapper: {
    '\\.(css|module\\.css)$': '<rootDir>/__mocks__/styleMock.js',
  },
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
};
