'use strict';

const path = require('path');

module.exports = {
  root: true,
  extends: [
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring',
  ],
  parserOptions: {
    project: path.resolve('./tsconfig.json'),
  },
  env: {
    node: true,
  },
};
