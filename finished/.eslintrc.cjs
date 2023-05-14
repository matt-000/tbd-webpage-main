module.exports = {
  env: {
    'browser': true,
    "root": true
  },
  parserOptions: {
    'ecmaVersion': 2018,
  },
  globals: {
    'web3': 'readonly',
    'ethereum': 'readonly',
  },
  plugins: [
    'json',
  ],
  rules: {
    'quotes': 'off',
    "semi": "off",
    'import/no-unassigned-import': 'off',
    'eol-last': 'off',
    "indent": "off",
    "comma-dangle": ["error", "never"],
    'import/extensions': ['error', 'ignorePackages', {
      'js': 'never',
      'jsx': 'never',
      'ts': 'never',
      'tsx': 'never',
      'allowImportingTsExtensions': true
    }]
  },
  extends: [
    '@metamask/eslint-config',
    '@metamask/eslint-config/config/nodejs',
  ],
  overrides: [{
    'files': ['src/index.js'],
    'parserOptions': {
      'sourceType': 'module',
    },
  }],
  ignorePatterns: [
    '!.eslintrc.js',
    'dist',
  ],
}
