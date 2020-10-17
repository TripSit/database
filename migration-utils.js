'use strict';

module.exports = function createBuilder(knex) {
	return {
		createTableBuilder(table) {
			return {
				pk(name = 'id') {
					return table
						.uuid(name)
						.defaultTo(knex.raw('generate_uuid_v4()'))
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
	};
};
