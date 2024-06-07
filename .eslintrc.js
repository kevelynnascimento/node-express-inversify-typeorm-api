module.exports = {
  extends: ['plugin:@typescript-eslint/recommended'],
  rules: {
    'linebreak-style': ['error', 'unix'],
    "indent": ["error", 2, { "ignoredNodes": ["PropertyDefinition"], "SwitchCase": 1 }],
    "@typescript-eslint/no-unused-vars": "off",
    'no-restricted-imports': [
      'error',
      {
        paths: [{
          name: 'src',
          message: 'Use relative imports instead of absolute imports from the src directory.'
        }],
        patterns: [
          'src/*'
        ]
      }
    ],
  },
};