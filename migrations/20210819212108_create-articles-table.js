'use strict';

exports.up = async function up(knex) {
  return knex.schema
    .createTable('articles', table => {
      table
        .uuid('id')
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'))
        .primary();

      table.text('title').notNullable();
      table.text('description');

      table
        .timestamp('created_at')
        .notNullable()
        .defaultTo(knex.fn.now());
    })
    .createTable('article_drugs', table => {
      table
        .uuid('article_id')
        .notNullable()
        .references('id')
        .inTable('articles');

      table
        .uuid('drug_id')
        .notNullable()
        .references('id')
        .inTable('drugs');
    });
};

exports.down = async function down(knex) {
  return knex.schema
    .dropTableIfExists('article_drugs')
    .dropTableIfExists('articles');
};
