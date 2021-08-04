'use strict';

module.exports = function babelConfig(api) {
  api.cache(process.env.NODE_ENV !== 'production');

  return {
    presets: [
      ['@babel/preset-env', {
        useBuiltIns: false,
      }],
    ],
    plugins: [
      '@babel/plugin-transform-runtime',
    ],
  };
};
