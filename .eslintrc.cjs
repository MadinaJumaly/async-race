module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.app.json',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  settings: { react: { version: 'detect' } },
  ignorePatterns: ['dist', 'vite.config.ts', '.eslintrc.cjs'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'max-lines-per-function': ['error', { max: 40, skipBlankLines: true, skipComments: true }],
    'no-magic-numbers': ['warn', { ignore: [-1, 0, 1, 2], ignoreArrayIndexes: true }],
    'import/prefer-default-export': 'off',
    'react/require-default-props': 'off',
  },
};
