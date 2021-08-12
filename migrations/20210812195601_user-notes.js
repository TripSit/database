'use strict';

exports.up = async function up(knex) {
  return knex.schema.createTable('user_notes', table => {
    table
      .uuid('id')
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .primary();

    table
      .uuid('user_id')
      .notNullable()
      .references('id')
      .inTable('users');

    table
      .uuid('issued_by')
      .notNullable()
      .references('id')
      .inTable('users');

    table.text('content').notNullable();

    table
      .enum('type', [
        'ban',
        'quiet',
        'warning',
        'generic',
      ], {
        useNative: true,
        enumName: 'user_note_type',
      })
      .notNullable()
      .defaultTo('generic');

    table
      .boolean('deleted')
      .notNullable()
      .defaultTo(false);

    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists('user_notes');

  return knex.raw('DROP TYPE IF EXISTS "user_note_type";');
};
