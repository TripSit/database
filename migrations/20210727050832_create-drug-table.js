'use strict';

exports.up = async function up(knex) {
  return knex.schema
    .createTable('drugs', table => {
      table
        .uuid('id')
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'))
        .primary();

      table
        .text('name')
        .notNullable()
        .unique();

      table.text('summary');
      table.text('psychonautwiki_slug');
      table.text('errowid_experiences_url');

      table
        .timestamp('updated_at')
        .notNullable()
        .defaultTo(knex.fn.now());

      table
        .timestamp('created_at')
        .notNullable()
        .defaultTo(knex.fn.now());
    })

    .createTable('drug_aliases', table => {
      table
        .uuid('id')
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'))
        .primary();

      table
        .uuid('drug_id')
        .notNullable()
        .references('id')
        .inTable('drugs');

      table.text('text').notNullable();
    })

    .createTable('drug_roas', table => {
      table
        .uuid('id')
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'))
        .primary();

      table
        .uuid('drug_id')
        .notNullable()
        .references('id')
        .inTable('drugs');

      table
        .enum('route', [
          'oral',
          'insufflated',
          'inhaled',
          'topical',
          'sublingual',
          'buccal',
          'rectal',
          'intramuscular',
          'intravenous',
          'subcutanious',
          'transdermal',
        ], {
          useNative: true,
          enumName: 'drug_route_of_administration',
        })
        .notNullable();

      table.float('dose_threshold');
      table.float('dose_light');
      table.float('dose_common');
      table.float('dose_strong');
      table.float('dose_heavy');
      table.text('dose_warning');

      table.float('duration_total_min');
      table.float('duration_total_max');
      table.float('duration_onset_min');
      table.float('duration_onset_max');
      table.float('duration_comeup_min');
      table.float('duration_comeup_max');
      table.float('duration_peak_min');
      table.float('duration_peak_max');
      table.float('duration_offset_min');
      table.float('duration_offset_max');
      table.float('duration_after_effects_min');
      table.float('duration_after_effects_max');

      table
        .timestamp('updated_at')
        .notNullable()
        .defaultTo(knex.fn.now());

      table
        .timestamp('created_at')
        .notNullable()
        .defaultTo(knex.fn.now());
    });
};

exports.down = async function down(knex) {
  await knex.schema
    .dropTableIfExists('drug_roas')
    .dropTableIfExists('drug_aliases')
    .dropTableIfExists('drugs');

  return knex.raw('DROP TYPE IF EXISTS "drug_route_of_administration";');
};
