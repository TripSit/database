'use strict';

const { Duration } = require('luxon');
const drugs = require('./drug-import.json');

// TODO: Revise
const routeMap = {
  sublingually: 'sublingual',
  plugged: 'rectal',
  none: 'oral',
  light: 'oral',
  duration: 'oral',
  therapeutic: 'oral',
  vapourised: 'oral',
  threshold: 'oral',
  sleep: 'oral',
  orally: 'oral',
  'oral-ir': 'oral',
  'oral-xr': 'oral',
  'insufflated-xr': 'insufflated',
  'insufflated-ir': 'insufflated',
  'pain-relief': 'oral',
  fever: 'oral',
  metabolites: 'oral',
  'sublingual/insufflated': 'sublingual',
  'insufflated/rectal': 'insufflated',
  'insufflated/inhaled': 'insufflated',
  'vapourized/sublingual': 'inhaled',
  intranasal: 'insufflated',
  6: 'oral',
  60: 'oral',
  parent: 'oral',
  low: 'oral',
  smoking: 'inhaled',
  insufflted: 'insufflated',
  recovery: 'oral',
  oral_maoi: 'oral',
  chewed: 'oral',
  morning_glory: 'oral',
  oral_ir: 'oral',
  oral_er: 'oral',
  'iv/im': 'intravenous',
  hbwr: 'oral',
  'plugged/rectal': 'rectal',
  'vaporized/smoked': 'inhaled',
  smoked: 'inhaled',
  im: 'intramuscular',
  intramuscul: 'intramuscular',
  iv: 'intravenous',
  vaporized: 'inhaled',
  vapourized: 'inhaled',
  'buccal/sublingual': 'sublingual',
  'sublingual/buccal': 'sublingual',
  'insufflated/plugged': 'insufflated',
  '(tentative)': 'oral',
  common: 'oral',
  intravenously: 'intravenous',
  oral_tea: 'oral',
  fresh: 'oral',
  dried: 'oral',
  vaped: 'inhaled',
  intranasally: 'insufflated',
  'oral(pure)': 'oral',
  'insufflated(pure)': 'oral',
  'oral(benzedrex)': 'oral',
  nasal: 'insufflated',
  tilidine: 'oral',
  wet: 'oral',
  dry: 'oral',
};

function parseDose(name, doses) {
  if (!doses) return null;
  const dose = doses.find(a => a.name.toLowerCase() === name);
  if (!dose || !dose.value) return null;

  const valueText = dose.value.trim().toLowerCase();
  let value = parseFloat(dose.value.split('-')[0].replace(/\D/g, ''));
  if (valueText.includes('g')) value *= 1000;
  else if (valueText.includes('\u00b5g') || valueText.endsWith('ug')) value *= 0.001;
  else if (valueText.includes('kg')) value *= 1000000;

  return value;
}

function parseDuration(name, range, durations) {
  if (!durations) return null;
  const duration = durations.find(a => a.name.toLowerCase() === name);
  if (
    !duration
    || duration.value.includes('?')
    || duration.value.toLowerCase().includes('rapid')
  ) {
    return null;
  }

  const valueText = duration.value.trim().toLowerCase();
  if (!/\d/.test(valueText)) return null; // TODO: Validation is omitting dirty values
  const value = valueText.includes('-')
    ? valueText.split('-')[range === 'min' ? 0 : 1]
    : valueText;

  let unitKey = valueText.split(/\s+/g);
  unitKey = unitKey[unitKey.length - 1];
  if (!['seconds', 'minutes', 'hours', 'days'].includes(unitKey)) return null; // TODO: Validation is omitting dirty values

  return Duration.fromObject({
    [unitKey]: parseFloat(value.replace(/\D/g, '')),
  }).get('minutes');
}

exports.seed = async function seed(knex) {
  await knex('drug_roas').del();
  await knex('drug_aliases').del();
  await knex('drugs').del();

  const drugRecords = await knex('drugs')
    .insert(drugs.map(drug => ({
      name: drug.name,
      summary: drug.summary,
      psychonautwikiSlug: drug.url && new URL(drug.url).pathname.substring(6),
      errowidExperiencesUrl: drug.experiencesUrl,
    })))
    .returning(['id'])
    .then(records => records.map(({ id }, i) => ({
      id,
      ...drugs[i],
    })));

  await knex('drug_aliases').insert(drugRecords.flatMap(drug => drug.aliases.map(alias => ({
    drugId: drug.id,
    text: alias,
  }))));

  return knex('drug_roas').insert(drugRecords.flatMap(drug => drug.roas
    .map(({ name, ...roa }) => ({
      ...roa,
      route: name.toLowerCase().replace(/:$/, ''),
    }))
    .map(roa => ({
      drugId: drug.id,
      route: routeMap[roa.route] || roa.route,

      doseThreshold: parseDose('threshold', roa.dosage),
      doseLight: parseDose('light', roa.dosage),
      doseCommon: parseDose('common', roa.dosage),
      doseStrong: parseDose('strong', roa.dosage),
      doseHeavy: parseDose('heavy', roa.dosage),

      durationTotalMin: parseDuration('total', 'min', roa.duration),
      durationTotalMax: parseDuration('total', 'max', roa.duration),
      durationOnsetMin: parseDuration('onset', 'min', roa.duration),
      durationOnsetMax: parseDuration('onset', 'max', roa.duration),
      durationComeupMin: parseDuration('comeup', 'min', roa.duration),
      durationComeupMax: parseDuration('comeup', 'max', roa.duration),
      durationPeakMin: parseDuration('peak', 'min', roa.duration),
      durationPeakMax: parseDuration('peak', 'max', roa.duration),
      durationOffsetMin: parseDuration('offset', 'min', roa.duration),
      durationOffsetMax: parseDuration('offset', 'max', roa.duration),
      durationAfterEffectsMin: parseDuration('after effects', 'min', roa.duration),
      durationAfterEffectsMax: parseDuration('after effects', 'max', roa.duration),
    }))));
};
