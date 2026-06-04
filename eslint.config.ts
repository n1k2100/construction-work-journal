import { defineConfig } from 'eslint/config'
import importX from 'eslint-plugin-import-x'
import jsonc from 'eslint-plugin-jsonc'
import perfectionist from 'eslint-plugin-perfectionist'
import * as jsoncParser from 'jsonc-eslint-parser'
import tseslint from 'typescript-eslint'

/**
 * Конфигурация eslint
 */
const config = defineConfig(
  {
    files: ['**/*.{ts,tsx,cts,mts}'],
    languageOptions: {
      parser: tseslint.parser
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx,cjs,cts,mts,mjs,svelte}'],
    plugins: {
      'import-x': importX,
    },
    rules: {
      'import-x/order': [
        2,
        {
          'alphabetize': {
            caseInsensitive: true,
            order: 'asc',
          },
          'groups': [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          'pathGroups': [
            {
              group: 'internal',
              pattern: '@/**',
              position: 'after',
            },
          ],
          'warnOnUnassignedImports': true,
        },
      ],
    },
    settings: {
      'import-x/resolver': {
        node: true,
        typescript: true,
      },
    },
  },
  {
    plugins: {
      perfectionist,
    },
    rules: {
      'perfectionist/sort-imports': 0,
      'perfectionist/sort-objects': [
        1,
        {
          ignoreCase: true,
          order: 'asc',
          type: 'alphabetical',
        },
      ],
    },
  },
  {
    files: ['**/*.json', '**/*.jsonc', '**/*.json5'],
    ignores: ['**/package.json', '**/package-lock.json'],
    languageOptions: {
      parser: jsoncParser,
    },
    plugins: { jsonc },
    rules: {
      'jsonc/sort-keys': [
        1,
        'asc',
        {
          caseSensitive: false,
          natural: true,
        },
      ],
    },
  },
)

export default config
