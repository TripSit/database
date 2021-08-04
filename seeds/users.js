'use strict';

const createUserQueries = require('../src/user');

exports.seed = async function createUsers(knex) {
  await knex('users').del();
  const user = createUserQueries(knex);

  return user.create({
    nick: 'TestAdmin',
    password: 'P@ssw0rd',
  });
};
