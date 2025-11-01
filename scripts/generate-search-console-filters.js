#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const root = path.join(__dirname, '..');
const citiesPath = path.join(root, 'src', 'lib', 'locations', 'cities.ts');
const outputPath = path.join(root, 'reports', 'search-console-filters.json');

const englishSeoKeywords = {
  headTerms: [
    'cat litter smell',
    'cat litter odor',
    'cat litter odour',
    'cat litter smell removal',
    'best cat litter for smell',
    'cat litter deodorizer'
  ],
  solutionVariants: [
    'natural cat litter odor eliminator',
    'activated carbon litter additive',
    'cat litter deodorizer without perfume',
    'how to neutralize cat litter smell fast'
  ],
  modifiers: {
    housing: ['condo', 'apartment', 'basement', 'multi-cat home'],
  },
};

const loadCityProfiles = () => {
  const source = fs.readFileSync(citiesPath, 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  });

  const citiesModule = { exports: {} };
  const evaluator = new Function('exports', 'require', 'module', '__filename', '__dirname', outputText);
  evaluator(citiesModule.exports, require, citiesModule, citiesPath, path.dirname(citiesPath));

  if (!citiesModule.exports.cityOdorProfiles) {
    throw new Error('Failed to load cityOdorProfiles from cities.ts');
  }

  return citiesModule.exports.cityOdorProfiles;
};

const normalizeFragment = (value) => value.replace(/[-\s]+/g, '\\s*');

const buildRegex = (profile) => {
  const cityFragment = normalizeFragment(profile.name);
  const provinceFragment = normalizeFragment(profile.province);
  const synonyms = ['smell', 'odor', 'odour'];
  const synonymGroup = synonyms.join('|');

  return `(?i)(cat\\s+litter\\s+(${synonymGroup}).*(${cityFragment}|${profile.provinceCode}|${provinceFragment})|${cityFragment}.*cat\\s+litter\\s+(${synonymGroup}))`;
};

const collectQueries = (profile) => {
  const translationCombos = [
    ...englishSeoKeywords.headTerms.map((term) => `${term} ${profile.name}`),
    ...englishSeoKeywords.solutionVariants.map((term) => `${term} ${profile.name}`),
    ...englishSeoKeywords.modifiers.housing.map((term) => `${profile.name} ${term}`),
  ];

  const deduped = Array.from(new Set([
    ...profile.englishQueries.slice(0, 10),
    ...translationCombos,
  ]));

  return deduped.slice(0, 25);
};

const main = () => {
  const profiles = loadCityProfiles();

  const filters = profiles.map((profile) => ({
    city: profile.name,
    province: profile.province,
    provinceCode: profile.provinceCode,
    region: profile.region,
    pagePath: `/locations/${profile.slug}`,
    regex: buildRegex(profile),
    topQueries: collectQueries(profile),
    generatedAt: new Date().toISOString(),
  }));

  const payload = {
    description: 'Auto-generated Search Console filters derived from cityOdorProfiles for Canadian odor domination strategy.',
    filterVersion: 1,
    filters,
  };

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(payload, null, 2));
  console.log(`Search Console filters written to ${path.relative(root, outputPath)}`);
};

main();
