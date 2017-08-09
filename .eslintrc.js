module.exports = {
  extends: ['airbnb', 'plugin:flowtype/recommended'],
  plugins: ['react', 'flowtype'],
  rules: {
    'react/jsx-boolean-value': 0,
    'react/require-default-props': 0,
    'react/no-array-index-key': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  },
  parser: 'babel-eslint',
  globals: {
    window: true,
    document: true,
    navigator: true,
  },
};
