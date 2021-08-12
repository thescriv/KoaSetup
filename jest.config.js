module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/?(*.)+(spec|test).ts'],
    coveragePathIgnorePatterns: [
      '<rootDir>/src/__tests__/',
      '<rootDir>/node_modules/',
      '<rootDir>/dist',
      '<rootDir>/doc',
      '<rootDir>/coverage',
      '<rootDir>/scripts',
      '<rootDir>/tools',
    ],
    testRunner: 'jest-circus/runner',
    //setupFiles: ['./src/__tests__/setup.ts'],
  }
  