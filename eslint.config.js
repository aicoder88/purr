// @ts-check
import js from '@eslint/js';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import nextjs from '@next/eslint-plugin-next';
import prettier from 'eslint-config-prettier';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';

export default [
  // Base JS configuration
  js.configs.recommended,
  
  // TypeScript configuration
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      ...typescriptPlugin.configs['eslint-recommended'].rules,
      ...typescriptPlugin.configs['recommended'].rules,
      '@typescript-eslint/no-explicit-any': 'warn', // Warn about any types instead of error
      '@typescript-eslint/no-empty-object-type': 'off', // Turn off empty object type errors
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Warn about unused variables
      '@typescript-eslint/no-unused-expressions': 'warn', // Warn about unused expressions
    },
  },
  
  // React configuration
  {
    ...reactRecommended,
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  
  // Next.js configuration
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@next/next': nextjs,
    },
    rules: {
      ...nextjs.configs.recommended.rules,
      // Add any custom Next.js rules here
    },
  },
  
  // Prettier configuration (must be last)
  {
    ...prettier,
    files: ['**/*.{js,jsx,ts,tsx,md,json}'],
  },
  
  // Project-specific overrides
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      'react/react-in-jsx-scope': 'off', // Not needed in Next.js 13+
      'react/prop-types': 'off', // Not needed with TypeScript
      '@next/next/no-img-element': 'warn', // Warn about using img instead of Next.js Image
      'react/no-unescaped-entities': 'warn', // Warn about unescaped entities
      'react/jsx-key': 'warn', // Warn about missing key prop in iterators instead of error
      'no-undef': 'off', // TypeScript handles this
      '@next/next/no-html-link-for-pages': 'warn' // Warn about using <a> instead of Next.js <Link>
    },
  },
];
