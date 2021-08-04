'use strict';

const knex = require('knex');
const knexConfig = require('../knexfile');
const drug = require('./drug');
const user = require('./user');

module.exports = function createDb() {
  const db = knex(knexConfig);

  return {
    knex: db,
    drug: drug(db),
    user: user(db),
  };
};
