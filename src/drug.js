'use strict';

module.exports = function createDrugQueries(knex) {
  return {
    async find() {
      return knex('drugs')
        .where('deleted', false)
        .orderBy('name', 'asc');
    },

    async findById(id) {
      return knex('drugs')
        .where('id', id)
        .where('deleted', false)
        .first();
    },

    async create(drug) {
      return knex('drugs')
        .insert(drug)
        .returning('*')
        .then(([newDrug]) => newDrug);
    },

    async update(id, updates) {
      return knex('drugs')
        .update(updates)
        .where('id', id)
        .where('deleted', false)
        .returning('*')
        .then(([updatedDrug]) => updatedDrug);
    },

    async delete(id) {
      await knex('drugs')
        .update('deleted', true)
        .where('id', id);
    },

    async aliases(drugId) {
      return knex('drug_aliases')
        .select('text')
        .where('drug_id', drugId)
        .orderBy('text', 'asc')
        .then(records => records.map(record => record.text));
    },

    async roas(drugId) {
      return knex('drug_roas').where('drug_id', drugId);
    },

    async deleteRoa(id) {
      await knex('drug_roas')
        .update('deleted', true)
        .where('id', id);
    },
  };
};
