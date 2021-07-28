'use strict';

const knex = require('knex');
const knexConfig = require('../knexfile');
const createDrugQueries = require('./drug');

module.exports = function createDb() {
  const conn = knex(knexConfig);

  return {
    knex: conn,
    drug: createDrugQueries(conn),
  };
};
