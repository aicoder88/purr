#!/usr/bin/env node

/**
 * Script to compare translation keys across languages and identify missing sections
 */

const fs = require('node:fs');
const path = require('node:path');

// Helper function to extract keys from object
function extractKeys(obj, prefix = '') {
  const keys = [];
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        keys.push(...extractKeys(obj[key], fullKey));
      } else {
        keys.push(fullKey);
      }
    }
  }
  
  return keys;
}

// Read translation files
const translationsDir = './src/translations';
const enFile = path.join(translationsDir, 'en.ts');
const frFile = path.join(translationsDir, 'fr.ts');
const zhFile = path.join(translationsDir, 'zh.ts');

try {
  // Read files as text and extract the exported objects
  const enContent = fs.readFileSync(enFile, 'utf8');
  const frContent = fs.readFileSync(frFile, 'utf8');
  const zhContent = fs.readFileSync(zhFile, 'utf8');
  
  // Extract the object literals (simple parsing)
  const enMatch = enContent.match(/export const en = ({[\s\S]*?});?\s*$/m);
  const frMatch = frContent.match(/export const fr = ({[\s\S]*?});?\s*$/m);
  const zhMatch = zhContent.match(/export const zh = ({[\s\S]*?});?\s*$/m);
  
  if (!enMatch || !frMatch || !zhMatch) {
    console.error('Could not parse translation files');
    process.exit(1);
  }
  
  // Use eval to parse the objects (unsafe but for development analysis)
  const en = eval('(' + enMatch[1] + ')');
  const fr = eval('(' + frMatch[1] + ')');
  const zh = eval('(' + zhMatch[1] + ')');
  
  // Extract all keys
  const enKeys = extractKeys(en).sort();
  const frKeys = extractKeys(fr).sort();
  const zhKeys = extractKeys(zh).sort();
  
  // Find missing keys
  const missingInFr = enKeys.filter(key => !frKeys.includes(key));
  const missingInZh = enKeys.filter(key => !zhKeys.includes(key));
  
  // Find extra keys (shouldn't exist if en is complete)
  const extraInFr = frKeys.filter(key => !enKeys.includes(key));
  const extraInZh = zhKeys.filter(key => !enKeys.includes(key));
  
  console.log('=== TRANSLATION COMPARISON REPORT ===\n');
  
  console.log(`English (en): ${enKeys.length} keys`);
  console.log(`French (fr): ${frKeys.length} keys`);
  console.log(`Chinese (zh): ${zhKeys.length} keys\n`);
  
  if (missingInFr.length > 0) {
    console.log('🔍 MISSING IN FRENCH (fr.ts):');
    missingInFr.forEach(key => console.log(`  - ${key}`));
    console.log('');
  } else {
    console.log('✅ French translations are complete\n');
  }
  
  if (missingInZh.length > 0) {
    console.log('🔍 MISSING IN CHINESE (zh.ts):');
    missingInZh.forEach(key => console.log(`  - ${key}`));
    console.log('');
  } else {
    console.log('✅ Chinese translations are complete\n');
  }
  
  if (extraInFr.length > 0) {
    console.log('ℹ️  EXTRA KEYS IN FRENCH (not in en.ts):');
    extraInFr.forEach(key => console.log(`  - ${key}`));
    console.log('');
  }
  
  if (extraInZh.length > 0) {
    console.log('ℹ️  EXTRA KEYS IN CHINESE (not in en.ts):');
    extraInZh.forEach(key => console.log(`  - ${key}`));
    console.log('');
  }
  
  // Check specific homepage-related sections
  const homepageRelatedSections = [
    'homepage',
    'hero',
    'howItWorks',
    'about',
    'features',
    'enhancedProductComparison',
    'subscriptionOffer',
    'subscriptionOfferExtended',
    'productComparison',
    'testimonials',
    'faq',
    'cta',
    'newsletter',
    'contact',
    'blogSection'
  ];
  
  console.log('🏠 HOMEPAGE-RELATED SECTIONS ANALYSIS:');
  
  for (const section of homepageRelatedSections) {
    const inEn = enKeys.some(key => key.startsWith(section + '.'));
    const enCount = enKeys.filter(key => key.startsWith(section + '.')).length;
    const frCount = frKeys.filter(key => key.startsWith(section + '.')).length;
    const zhCount = zhKeys.filter(key => key.startsWith(section + '.')).length;
    
    if (inEn) {
      console.log(`  ${section}: EN(${enCount}) FR(${frCount}) ZH(${zhCount})${frCount < enCount ? ' ⚠️  FR incomplete' : ''}${zhCount < enCount ? ' ⚠️  ZH incomplete' : ''}`);
    }
  }
  
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
