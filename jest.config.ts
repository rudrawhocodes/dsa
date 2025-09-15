import type { Config } from 'jest';
const config: Config = {
  testEnvironment: 'jsdom',
  transform: { '^.+\.(t|j)sx?$': ['ts-jest', { tsconfig: 'tsconfig.json' }] },
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/$1' },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['**/__tests__/**/*.test.(ts|tsx)'],
  collectCoverage: true,
  collectCoverageFrom: ['lib/**/*.ts', 'components/**/*.tsx'],
};
export default config;