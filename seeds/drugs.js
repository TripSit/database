'use strict';

const { Duration } = require('luxon');
const drugsJson = require('../imports/drugs');

function parseInterval(value) {
	const [range, unit] = value.split(/\s+/g);
	return range
		.split('-')
		.map(a => new Duration(`${a} ${unit}`).seconds);
}

exports.seed = async function seed(knex) {
	const drugs = drugsJson.map(({ properties, ...xs }) => ({ ...properties, ...xs }));

	// Insert drug categories
	await knex('drug_categories').del();
	const categories = await Array.from(new Set(drugs.flatMap(drug => drug.categories)))
		.reduce((query, name) => query.insert({ name }), knex('drug_categories'))
		.returning(['id', 'name']);

	// Insert drugs
	await knex('drugs').del();
	await drugs
		.map(({
			duration,
			onset,
			afterEffects,
			...xs
		}) => {
			const [durationMin, durationMax] = parseInterval(duration);
			const [onsetMin, onsetMax] = parseInterval(onset);
			const [afterEffectsMin, afterEffectsMax] = parseInterval(afterEffects);

			return {
				...xs,
				intervals: {
					durationMin,
					durationMax,
					onsetMin,
					onsetMax,
					afterEffectsMin,
					afterEffectsMax,
				},
			};
		})
		// TODO: Get dose info
		.map(({ formatted_dose: formattedDose, ...drug }) => {
			Object.entries(formattedDose).map(([roa, doses]) => ({}));
			return { ...drug };
		})
		.map(({ intervals, doses, ...drug }) => ({
			...intervals,
			...doses,
			name: drug.name,
			summary: drug.summary,
			avoid: drug.avoid,
		}))
		.reduce((query, drug) => query.insert(drug), knex('drugs'));
};
