/* eslint-disable unicorn/prefer-module */
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  transform: {
    '\\.[jt]sx?$': 'ts-jest',
  },
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./test/jest.setup.ts'],
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      useESM: true,
      isolatedModules: true,
    },
  },
};
