import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { configFile: './babel.config.js' }]
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverage: false,
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  transformIgnorePatterns: [
    '/node_modules/(?!(react-markdown|vfile|vfile-message|unist-util-stringify-position|unist-util-position|unist-util-generated|unist-util-is|unist-util-visit|unist-util-visit-parents|unist-util-remove-position|unist-util-stringify-position|unist-util-position|unist-util-generated|unist-util-is|unist-util-remove|unist-util-visit|unist-util-visit-parents|unist-util-remove-position|unist-util-stringify-position|unist-util-position|unist-util-generated|unist-util-is|unist-util-visit|unist-util-visit-parents|unist-util-remove-position|unist-util-stringify-position|unist-util-position|unist-util-generated|unist-util-is|unist-util-visit|unist-util-visit-parents)/.*',
  ],
};

export default config;
