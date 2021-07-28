'use strict';

const argon = require('argon2');

module.exports = function createUserQueries(knex) {
  return {
    async createUser({ password, ...user }) {
      return knex('usrs')
        .insert({
          ...user,
          password: await argon.hash(password),
        })
        .returning(['id', 'nick', 'createdAt'])
        .then(([newUser]) => newUser);
    },

    async authenticate(nick, password) {
      const hash = await knex('users')
        .select('password')
        .where('nick', nick)
        .first()
        .then(record => record?.password);

      if (!hash) return false;
      return argon.verify(hash, password);
    },
  };
};
