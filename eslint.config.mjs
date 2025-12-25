import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';

export default [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'out/**',
      'dist/**',
      'build/**',
      'backup/**',
      'scripts/**',
      '*.config.js',
      '*.config.ts',
      'next-env.d.ts',
      'public/sw-optimized.js',
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    rules: {
      // Disable rules that are too strict for now
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/set-state-in-effect': 'off',
      'react-compiler/react-compiler': 'off',
      'prefer-const': 'warn',
      '@typescript-eslint/no-require-imports': 'off',

      // Performance-related rules
      'no-return-await': 'error',
      // Disabled: too many violations and minimal performance impact in most cases
      'react/jsx-no-bind': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
  {
    files: [
      'src/types/window.d.ts',
    ],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      'prefer-const': 'off',
    },
  },
  {
    files: [
      'src/components/**/*.tsx',
      'src/components/**/*.ts',
    ],
    rules: {
      'react-compiler/react-compiler': 'off',
    },
  },
];