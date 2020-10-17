'use strict';

const sql = require('fake-tag');
const createBuilder = require('../migration-utils');

exports.up = async function up(knex) {
	const { createTableBuilder } = createBuilder(knex);

	await knex.raw(sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

	await Promise.all([

		// Users
		knex.schema.createTable('users', table => {
			const builder = createTableBuilder(table);
			builder.pk();
			table
				.text('nick')
				.notNullable()
				.unique();
			builder.createdAt();
		}),

		// Drug categories
		knex.schema.createTable('drug_categories', table => {
			const builder = createTableBuilder(table);
			builder.pk();
			table
				.text('name')
				.notNullable()
				.unique();
		})

			// Drugs
			.then(() => knex.schema.createTable('drugs', table => {
				const builder = createTableBuilder(table);
				builder.pk();
				table
					.text('name')
					.notNullable()
					.unique();
				table.text('summary').notNullable();
				builder.interval('duration');
				builder.interval('onset');
				builder.interval('after_effects');
				table.text('avoid');
				table.float('dose_threshold_milligrams');
				table.float('dose_light_milligrams');
				table.float('dose_common_milligrams');
				table.float('dose_strong_milligrams');
			}))
			.then(() => Promise.all([

				// User doses
				knex.schema.createTable('user_doses', table => {
					const builder = createTableBuilder(table);
					builder.pk();
					builder.fk('user_id', 'users.id').notNullable();
					builder.fk('drug_id', 'drugs.id').notNullable();
					builder.createdAt('dosed_at');
					table.text('dose');
					table.enum('roa', [
						'oral',
						'insufflated',
						'smoked',
						'im',
						'iv',
						'subcutanious',
						'buccal',
						'rectal',
						'topical',
					], {
						useNative: true,
						enumName: 'roa',
					});
				}),

				// Drug aliases
				knex.schema.createTable('drug_aliases', table => {
					const builder = createTableBuilder(table);
					builder.pk();
					builder.fk('drug_id', 'drugs.id').notNullable();
					table.text('alias').notNullable();
				}),

				// Effects
				knex.schema.createTable('effects', table => {
					const builder = createTableBuilder(table);
					builder.pk();
					table
						.text('name')
						.notNullable()
						.unique();
					table.text('resource_url');
				})

					// Drug effects
					.then(() => knex.schema.table('drug_effects', table => {
						const builder = createTableBuilder(table);
						builder.fk('drug_id', 'drugs.id').notNullable();
						builder.fk('effect_id', 'effects.id').notNullable();
					})),
			])),

		// Channels
		knex.schema.createTable('channels', table => {
			const builder = createTableBuilder(table);
			builder.pk();
			table
				.text('name')
				.notNullable()
				.unique();
			builder.createdAt();
		}),
	]);
};

exports.down = async function down(knex) {
	await Promise.all([
		knex.schema.dropTableIfExists('channels'),
		Promise.all([
			knex.schema.dropTableIfExists('drug_effects')
				.then(() => knex.schema.dropTableIfExists('effects')),
			knex.schema.dropTableIfExists('drug_aliases'),
			knex.schema.dropTableIfExists('doses')
				.then(() => Promise.all([
					knex.schema.dropTableIfExists('users'),
					knex.raw(sql`DROP TYPE IF EXISTS roa;`),
				])),
		])
			.then(() => knex.schema.dropTableIfExists('drugs')),
	]);

	return knex.raw(sql`DROP EXTENSION IF NOT EXISTS "uuid-ossp";`);
};
