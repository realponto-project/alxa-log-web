module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'prettier',
    'prettier-standard',
    'plugin:react/recommended',
    'standard'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['prettier', 'react'],
  rules: {
    'react/prop-types': [0],
    'react/display-name': [0],
    'multiline-ternary': 0,
    camelcase: 0
  }
}
