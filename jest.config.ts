import type { Config } from 'jest';

const jestConfig: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      isolatedModules: true,
      stringifyContentPathRegex: '\\.html$'
    }
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^@core/(.*)$': '<rootDir>/src/app/core/$1',
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'test-results',
        outputName: 'jest-junit.xml',
      },
    ],
  ],
  collectCoverage: true,
  coverageReporters: ['lcov'],
};

export default jestConfig;
