// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: ['html'],
  globals: {
    wx: true,
    _hmt: true,
    AMap: true,
    gtag: true,
    require: true,
    // 'MarkerShape': true,
  },
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: '/build/webpack.base.conf.js',
      },
    },
  },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        vue: 'never',
      },
    ],
    'linebreak-style': [0 ,'error', 'windows'],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': [
      'error',
      {
        optionalDependencies: ['test/unit/index.js'],
      },
    ],
    // allow debugger during development
    'no-console': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'arrow-parens': 1,
    'prefer-destructuring': 0,
    'consistent-return': 0,
    // 'no-unused-vars': 1,
    'max-len': 0,
    'arrow-parens': 0,
    'no-param-reassign': 0,
    'no-mixed-operators': 0,
    'spaced-comment': 0,
    'no-underscore-dangle': 0,
    radix: 0,
  },
};
