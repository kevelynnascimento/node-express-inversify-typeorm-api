module.exports = {
  extends: ['plugin:@typescript-eslint/recommended'],
  rules: {
    'linebreak-style': ['error', 'unix'],
    "indent": ["error", 2, { "ignoredNodes": ["PropertyDefinition"], "SwitchCase": 1 }],
    "@typescript-eslint/no-unused-vars": "off"
  },
};