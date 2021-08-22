'use strict';

module.exports = function createArticleQueries(knex) {
  return {
    async find(articleId) {
      return knex('article')
        .where('id', articleId)
        .first();
    },
  };
};
