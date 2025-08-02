module.exports = {
  testEnvironment: 'jsdom',  // Use jsdom for React component testing
  testMatch: ['**/__tests__/**/*.test.js?(x)'],
  transform: {
    '^.+\\.(js|jsx)$': ['babel-jest', { configFile: './babel.test.config.js' }],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverage: false,  // Disable coverage for now
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  transformIgnorePatterns: [
    '/node_modules/(?!(@babel/runtime|@babel/plugin-transform-runtime|@babel/plugin-syntax-jsx|@babel/plugin-transform-react-jsx|@babel/plugin-transform-react-jsx-self|@babel/plugin-transform-react-jsx-source|@babel/plugin-syntax-import-attributes|@babel/plugin-syntax-import-assertions|@babel/plugin-transform-modules-commonjs|@babel/plugin-proposal-export-namespace-from|@babel/plugin-proposal-export-default-from|@babel/plugin-proposal-dynamic-import|@babel/plugin-proposal-class-properties|@babel/plugin-proposal-object-rest-spread|@babel/plugin-syntax-dynamic-import|@babel/plugin-transform-arrow-functions|@babel/plugin-transform-block-scoped-functions|@babel/plugin-transform-block-scoping|@babel/plugin-transform-classes|@babel/plugin-transform-computed-properties|@babel/plugin-transform-destructuring|@babel/plugin-transform-dotall-regex|@babel/plugin-transform-duplicate-keys|@babel/plugin-transform-exponentiation-operator|@babel/plugin-transform-for-of|@babel/plugin-transform-function-name|@babel/plugin-transform-literals|@babel/plugin-transform-member-expression-literals|@babel/plugin-transform-modules-amd|@babel/plugin-transform-modules-commonjs|@babel/plugin-transform-modules-systemjs|@babel/plugin-transform-modules-umd|@babel/plugin-transform-named-capturing-groups-regex|@babel/plugin-transform-new-target|@babel/plugin-transform-object-super|@babel/plugin-transform-parameters|@babel/plugin-transform-property-literals|@babel/plugin-transform-react-constant-elements|@babel/plugin-transform-react-display-name|@babel/plugin-transform-react-inline-elements|@babel/plugin-transform-react-jsx|@babel/plugin-transform-react-jsx-development|@babel/plugin-transform-react-jsx-self|@babel/plugin-transform-react-jsx-source|@babel/plugin-transform-regenerator|@babel/plugin-transform-reserved-words|@babel/plugin-transform-runtime|@babel/plugin-transform-shorthand-properties|@babel/plugin-transform-spread|@babel/plugin-transform-sticky-regex|@babel/plugin-transform-template-literals|@babel/plugin-transform-typeof-symbol|@babel/plugin-transform-unicode-escapes|@babel/plugin-transform-unicode-regex|@babel/plugin-transform-unicode-sets-regex|@babel/plugin-transform-unicode-escapes|@babel/plugin-transform-unicode-property-regex|@babel/plugin-transform-unicode-sets-regex|@babel/plugin-transform-unicode-escapes|@babel/plugin-transform-unicode-property-regex|@babel/plugin-transform-unicode-sets-regex|@babel/plugin-transform-unicode-escapes|@babel/plugin-transform-unicode-property-regex|@babel/plugin-transform-unicode-sets-regex)/)',
  ],
};
