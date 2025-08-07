import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import importPlugin from 'eslint-plugin-import';
import jestPlugin from 'eslint-plugin-jest';
import prettierPlugin from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import storybook from 'eslint-plugin-storybook';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const config = [
  {
    ignores: ['.next/*', 'node_modules/*', '!src/**/*'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        React: true,
        jest: true,
      },
    },
    settings: {
      react: {
        version: 'detect',
        runtime: 'automatic',
      },
    },
  },

  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  ...storybook.configs['flat/recommended'],

  eslint.configs.recommended,

  {
    plugins: {
      import: importPlugin,
      'simple-import-sort': simpleImportSort,
      prettier: prettierPlugin,
      next: nextPlugin,
      storybook: storybook,
    },
    rules: {
      'prettier/prettier': 'error',

      'next/no-img-element': 'warn',
      'next/no-sync-scripts': 'warn',
      'next/no-head-element': 'warn',

      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react$'], // 리액트는 항상 최상단
            ['^next', '^@?\\w'], // Next.js, 외부 라이브러리
            ['^(@|components|utils|hooks)(/.*|$)'], // 절대경로 alias
            ['^.+\\.d\\.ts$', '^.*\\btype\\b'], // 타입 선언 관련 import
            ['^\\u0000'], // 가상 모듈(import '\0virtual:')
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'], // 상대경로 상위 (../)
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'], // 현재경로 내 import(./)
            ['^.+\\.?(css|scss)$'], // CSS 또는 SCSS import는 가장 아래
          ],
        },
      ],
      'prefer-arrow-callback': ['error'],
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-unused-vars': 'warn',
    },
  },
  {
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/__tests__/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...jestPlugin.environments.globals.globals,
      },
    },
    plugins: {
      jest: jestPlugin,
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
  },
];

export default config;
