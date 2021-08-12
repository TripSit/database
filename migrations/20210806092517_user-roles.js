'use strict';

exports.up = async function up(knex) {
  return knex.schema
    .createTable('user_roles', table => {
      table
        .uuid('id')
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'))
        .primary();

      table
        .text('name')
        .notNullable()
        .unique();

      table.text('description').notNullable();

      table
        .timestamp('created_at')
        .notNullable()
        .defaultTo(knex.fn.now());
    })
    .createTable('user_role_users', table => {
      table
        .uuid('user_id')
        .notNullable()
        .references('id')
        .inTable('users');

      table
        .uuid('user_role_id')
        .notNullable()
        .references('id')
        .inTable('user_roles');
    });
};

exports.down = function down(knex) {
  return knex.schema
    .dropTableIfExists('user_role_users')
    .dropTableIfExists('user_roles');
};
