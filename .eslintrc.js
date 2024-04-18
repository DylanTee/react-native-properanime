module.exports = {
  env: {
      browser: true,
      es2021: true,
      es6: true,
      node: true,
      jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
      ecmaFeatures: {
          jsx: true,
      },
      tsconfigRootDir: __dirname,
      project: ['./tsconfig.json'],
  },
  extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  rules: {
      'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
      'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'react/display-name': 'off',
      'no-extra-boolean-cast': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      'no-useless-escape': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
      '@typescript-eslint/restrict-plus-operands': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-misused-promises': [
          'error',
          {
              checksVoidReturn: false,
          },
      ],
      'no-empty': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
  },
  settings: {
      react: {
          version: 'detect',
      },
      'import/resolver': {
          typescript: {},
      },
  },
  ignorePatterns: ['.eslintrc.js', 'babel.config.js', 'metro.config.js'],
};
