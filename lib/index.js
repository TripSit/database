'use strict';

var knex = require('knex');

var knexConfig = require('../knexfile');

var createDrugQueries = require('./drug');

module.exports = function createDb() {
  var conn = knex(knexConfig);
  return {
    knex: conn,
    drug: createDrugQueries(conn)
  };
};
//# sourceMappingURL=index.js.map