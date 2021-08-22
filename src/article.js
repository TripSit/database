'use strict';

module.exports = function createArticleQueries(knex) {
  return {
    async findById(articleId) {
      return knex('article')
        .where('id', articleId)
        .where('deleted', false)
        .first();
    },

    async findByDrugId(drugId) {
      return knex('article')
        .innerJoin('article_drugs', 'article_drugs.article_id', 'articles.id')
        .where('article_drugs.drug_id', drugId)
        .where('article.deleted', false)
        .select('article.*');
    },

    async create(article) {
      return knex('article')
        .insert(article)
        .returning('*')
        .then(([newArticle]) => newArticle);
    },

    async update(articleId, updates) {
      return knex('article')
        .update(updates)
        .where('id', articleId)
        .where('deleted', false)
        .returning('*')
        .then(([updatedArticle]) => updatedArticle);
    },

    async delete(articleId) {
      return knex('article')
        .update('deleted', true)
        .where('id', articleId);
    },
  };
};
