'use strict';

exports.up = async function up(knex) {
  await knex.raw('CREATE EXTENSION "uuid-ossp";');

  return knex.schema.createTable('users', table => {
    table
      .uuid('id')
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .primary();

    table
      .text('nick')
      .notNullable()
      .unique();

    table
      .text('password')
      .notNullable();

    table
      .timestamp('createdAt')
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists('users');
  return knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp";');
};
