'use strict';

const { createConnection } = require('./lib');

createConnection().then(() => {
  console.log('It works!');
});
