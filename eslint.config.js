import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser, // Use browser globals
        // Add any additional globals your project might need
      },
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    // Add custom rules here
    rules: {
      curly: 'error',
      eqeqeq: ['error', 'always'],
      'no-eval': 'error',
      'no-magic-numbers': ['warn', { ignore: [0, 1] }],
      'react/prop-types': 'off',
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-no-bind': ['error', { allowFunctions: true }],
      'react/jsx-no-duplicate-props': 'error',
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'max-len': ['error', { code: 80 }],
      'space-before-function-paren': ['error', 'never'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': ['warn'],
      'no-undef': 'error',
      'no-duplicate-imports': 'error',
      'prefer-const': 'error',
      'no-return-assign': 'error',
    },
  },
];
