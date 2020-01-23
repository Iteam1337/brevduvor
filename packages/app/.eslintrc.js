module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    '@react-native-community',
    'plugin:jest/recommended',
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  plugins: ['jest', '@typescript-eslint'],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'jsx-quotes': ['error', 'prefer-double'],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'object-curly-spacing': ['error', 'always'],
    quotes: ['error', 'single'],
    'react/prop-types': 'off',
    semi: ['error', 'never'],
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    'space-before-function-paren': [2, { anonymous: 'always', named: 'never' }],
    'react-native/no-inline-styles': [0],
  },
}
