'use strict';

const sql = require('fake-tag');

module.exports = function createBuilder(knex) {
	return {
		createTableBuilder(table) {
			return {
				pk(name = 'id') {
					return table
						.uuid(name)
						.defaultTo(knex.raw('uuid_generate_v4()'))
						.notNullable()
						.primary();
				},

				fk(name, references) {
					return table
						.uuid(name)
						.references(references);
				},

				createdAt(name = 'created_at') {
					return table
						.timestamp(name)
						.defaultTo(knex.fn.now())
						.notNullable();
				},

				interval(name) {
					return table.specificType(name, 'interval');
				},
			};
		},

		async dropType(name) {
			return knex.raw(sql`DROP TYPE IF EXISTS ${name};`);
		},

		async createExtension(name) {
			return knex.raw(sql`CREATE EXTENSION IF NOT EXISTS "${name}";`);
		},

		async dropExtension(name) {
			return knex.raw(sql`DROP EXTENSION IF EXISTS "${name}";`);
		},
	};
};
