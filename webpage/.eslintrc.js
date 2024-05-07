/* eslint-disable unicorn/prefer-module */
const MAX_LEN = [
  'warn',
  {
    code: 100,
    ignoreComments: true,
    ignoreRegExpLiterals: true,
    ignoreStrings: true,
    ignoreTemplateLiterals: true,
  },
];
const INDENT = 2;
const QUOTE = 'single';

const react = {
  extends: [
    'plugin:react/all',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react'],
  rules: {
    'react/display-name': 'off',
    'react/forbid-component-props': 'off',
    'react/jsx-closing-bracket-location': [
      'warn',
      { nonEmpty: 'after-props', selfClosing: 'after-props' },
    ],
    'react/jsx-closing-tag-location': 'warn',
    'react/jsx-curly-newline': [
      'warn',
      { multiline: 'consistent', singleline: 'forbid' },
    ],
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'react/jsx-indent': ['warn', INDENT],
    'react/jsx-indent-props': ['warn', INDENT],
    'react/jsx-max-depth': 'off',
    'react/jsx-newline': ['warn', { allowMultilines: true, prevent: true }],
    'react/jsx-no-bind': [
      'warn',
      { allowArrowFunctions: true, ignoreDOMComponents: true },
    ],
    'react/jsx-no-literals': 'off',
    'react/jsx-sort-props': 'off',
    'react/no-multi-comp': 'off',
    'react/no-unescaped-entities': 'off',
    'react/require-default-props': 'off',
  },
  settings: { react: { version: 'detect' } },
};

/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: {
    browser: true,
    es2022: true, // TODO: check new version
    node: true,
  },

  extends: [
    ...react.extends,

    'eslint:recommended',

    'plugin:optimize-regex/all',
    'plugin:json/recommended',
    'plugin:markdown/recommended',
    'plugin:n/recommended',
    'plugin:no-unsanitized/DOM',
    'plugin:promise/recommended',
    'plugin:security/recommended',
    'plugin:sonarjs/recommended',
    'plugin:unicorn/all',
    'prettier',
  ],
  overrides: [
    {
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:@typescript-eslint/strict',
      ],

      files: ['*.ts', '*.tsx'],
      parserOptions: {
        parser: '@typescript-eslint/parser',
        project: ['./tsconfig.json'],
      },

      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/consistent-type-assertions': 'error',
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-redundant-type-constituents': 'error',
        '@typescript-eslint/prefer-readonly': 'warn',
        '@typescript-eslint/restrict-template-expressions': [
          'warn',
          {
            allowBoolean: true,
            allowNullish: true,
            allowNumber: true,
          },
        ],
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
        'default-case': 'off', // only typescript
        'no-shadow': 'off', // only typescript
      },
    },
  ],
  parser: react.parser,
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  plugins: [
    ...react.plugins,
    'html',
    'json',
    'markdown',
    'n',
    'no-secrets',
    'promise',
    'sonarjs',
    'autofix',
    'sort-keys',
  ],
  root: true,

  rules: {
    ...react.rules,

    // enabled
    'array-element-newline': ['warn', 'consistent'],
    'arrow-parens': ['warn', 'as-needed'],
    'autofix/no-debugger': 'error',
    'capitalized-comments': 'off',
    'comma-dangle': ['warn', 'only-multiline'],
    'comma-spacing': 'warn',
    'consistent-return': 'off',
    curly: ['warn', 'multi'],
    'dot-location': ['warn', 'property'],
    'func-style': ['warn', 'declaration'],
    'function-call-argument-newline': 'off',
    'id-length': 'off',
    indent: ['warn', INDENT, { SwitchCase: 1 }],
    'jsx-quotes': ['warn', `prefer-${QUOTE}`],
    'key-spacing': 'warn',
    'line-comment-position': 'off',
    'linebreak-style': ['warn', 'unix'],
    'lines-between-class-members': 'off',
    'max-classes-per-file': 'off',
    'max-len': MAX_LEN,
    'max-lines': 'off',
    'max-lines-per-function': 'off',
    'max-params': 'off',
    'max-statements': 'off',
    'multiline-comment-style': 'off',
    'multiline-ternary': 'off',
    'n/no-missing-import': 'off',
    'n/no-unpublished-import': 'off',
    'n/no-unsupported-features/es-syntax': 'off',
    'no-console': ['warn', { allow: ['error'] }],
    'no-continue': 'off',
    'no-else-return': 'warn', // not in recommended
    'no-inline-comments': 'off',
    'no-magic-numbers': 'off',
    'no-multi-spaces': ['warn', { ignoreEOLComments: true }],
    'no-multiple-empty-lines': 'warn',
    'no-secrets/no-secrets': 'warn',
    'no-ternary': 'off',
    'no-warning-comments': 'warn',
    'object-curly-newline': ['warn', { multiline: true }],
    'object-curly-spacing': ['warn', 'always'],
    'object-property-newline': ['warn', { allowAllPropertiesOnSameLine: true }],
    'one-var': 'off',
    'padded-blocks': 'off',
    'promise/always-return': ['warn', { ignoreLastCallback: true }],
    'quote-props': ['warn', 'as-needed'],
    quotes: ['warn', QUOTE, { avoidEscape: true }],
    semi: ['warn', 'never'],
    'sonarjs/cognitive-complexity': 'off',
    'sonarjs/no-duplicate-string': 'warn',
    'sort-imports': [
      'warn',
      {
        allowSeparatedGroups: true,
        memberSyntaxSortOrder: ['all', 'multiple', 'single', 'none'],
      },
    ],
    'sort-keys': [
      'warn',
      'asc',
      {
        allowLineSeparatedGroups: true,
        natural: true,
      },
    ],
    'sort-keys/sort-keys-fix': 1,
    'sort-vars': 'off',
    'space-before-function-paren': ['warn', 'never'],
    'space-in-parens': ['warn', 'never'],
    'space-infix-ops': 'warn',

    // enabled plugin
    'unicorn/catch-error-name': 'off',
    'unicorn/filename-case': [
      'warn',
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
        ignore: [/UI.+/, /RT.+/],
      },
    ],
    'unicorn/no-keyword-prefix': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prefer-query-selector': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/switch-case-braces': 'off',
    'wrap-regex': 'off',
  },

  settings: {
    ...react.settings,

    'html/indent': INDENT,
  },
};
