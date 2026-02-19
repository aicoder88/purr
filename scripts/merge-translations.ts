import { en } from '../src/translations/en';
import { fr } from '../src/translations/fr';
import fs from 'fs';
import path from 'path';

const enJsonPath = path.join(__dirname, '../src/i18n/messages/en.json');
const frJsonPath = path.join(__dirname, '../src/i18n/messages/fr.json');

const enJson = JSON.parse(fs.readFileSync(enJsonPath, 'utf8'));
const frJson = JSON.parse(fs.readFileSync(frJsonPath, 'utf8'));

function deepMerge(target: Record<string, unknown>, source: Record<string, unknown>) {
  if (!source || typeof source !== 'object') return target;
  for (const key of Object.keys(source)) {
    if (!(key in target)) {
      target[key] = source[key];
    } else if (
      typeof source[key] === 'object' &&
      source[key] !== null &&
      !Array.isArray(source[key]) &&
      typeof target[key] === 'object' &&
      !Array.isArray(target[key])
    ) {
      deepMerge(target[key] as Record<string, unknown>, source[key] as Record<string, unknown>);
    }
  }
  return target;
}

const mergedEn = deepMerge(enJson, en as unknown as Record<string, unknown>);
const mergedFr = deepMerge(frJson, fr as unknown as Record<string, unknown>);

fs.writeFileSync(enJsonPath, JSON.stringify(mergedEn, null, 2) + '\n');
fs.writeFileSync(frJsonPath, JSON.stringify(mergedFr, null, 2) + '\n');
console.log('Done. Top-level keys in merged en.json:', Object.keys(mergedEn).length);
console.log('Done. Top-level keys in merged fr.json:', Object.keys(mergedFr).length);
