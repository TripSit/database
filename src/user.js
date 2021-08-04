'use strict';

const argon = require('argon2');

module.exports = function createUserQueries(knex) {
  return {
    find({ nick } = {}) {
      const query = knex('users');
      if (nick) query.where('nick', 'like', `%${nick}%`);
      return query;
    },

    async create(user) {
      return knex('users')
        .insert({
          ...user,
          password: await argon.hash(user.password),
        })
        .returning(['id', 'nick', 'createdAt'])
        .then(([newUser]) => newUser);
    },

    async authenticate(nick, password) {
      const { password: hash } = await knex('users')
        .select('password')
        .where('nick', nick)
        .first();
      return argon.verify(hash, password);
    },
  };
};
