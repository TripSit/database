'use strict';

const knex = require('knex');
const knexConfig = require('../knexfile');

module.exports = function createDb() {
  return knex(knexConfig);
};
