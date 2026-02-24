// Parse TypeScript files to find missing keys in French translations
const fs = require('fs');

const enFile = fs.readFileSync('./src/translations/en.ts', 'utf-8');
const frFile = fs.readFileSync('./src/translations/fr.ts', 'utf-8');

// Extract top-level sections from the export object
function extractTopLevelSections(content) {
  const sections = [];
  const lines = content.split('\n');
  
  for (const line of lines) {
    // Match top-level keys (2 spaces indent followed by word:)
    const match = line.match(/^  (\w+):/);
    if (match && !line.includes('//')) {
      sections.push(match[1]);
    }
  }
  
  return [...new Set(sections)];
}

const enSections = extractTopLevelSections(enFile);
const frSections = extractTopLevelSections(frFile);

console.log('=== TOP-LEVEL SECTIONS COMPARISON ===\n');
console.log('EN sections count:', enSections.length);
console.log('FR sections count:', frSections.length);

const missingInFr = enSections.filter(s => !frSections.includes(s));
const extraInFr = frSections.filter(s => !enSections.includes(s));

if (missingInFr.length > 0) {
  console.log('\n⚠️  Sections MISSING in French:');
  missingInFr.forEach(s => console.log('  -', s));
} else {
  console.log('\n✓ All top-level sections present in French');
}

if (extraInFr.length > 0) {
  console.log('\n⚠️  Extra sections in French (not in English):');
  extraInFr.forEach(s => console.log('  -', s));
}

// Check for nav sub-keys
console.log('\n=== NAV SECTION ===');
const enNavMatch = enFile.match(/nav:\s*\{[\s\S]*?^  \},/m);
const frNavMatch = frFile.match(/nav:\s*\{[\s\S]*?^  \},/m);

if (enNavMatch && frNavMatch) {
  const enNavKeys = [...enNavMatch[0].matchAll(/^(\s+)(\w+):/gm)].map(m => m[2]);
  const frNavKeys = [...frNavMatch[0].matchAll(/^(\s+)(\w+):/gm)].map(m => m[2]);
  
  const missingNav = [...new Set(enNavKeys)].filter(k => !frNavKeys.includes(k));
  if (missingNav.length > 0) {
    console.log('Missing in nav:', missingNav);
  } else {
    console.log('✓ All nav keys present');
  }
}

// Check specific critical keys
console.log('\n=== CRITICAL KEYS CHECK ===');

const criticalChecks = [
  ['hero.headline', /hero:\s*\{[\s\S]*?headline:/],
  ['hero.subheadline', /hero:\s*\{[\s\S]*?subheadline:/],
  ['productsHero.headline', /productsHero:\s*\{[\s\S]*?headline:/],
  ['featuresSection', /featuresSection:/],
  ['benefitsSection', /benefitsSection:/],
  ['scienceSection', /scienceSection:/],
  ['howItWorks', /howItWorks:/],
  ['cta', /cta:\s*\{/],
  ['faq', /faq:\s*\{/],
  ['contact', /contact:\s*\{/],
  ['footerNav', /footerNav:/],
  ['privacyPolicy', /privacyPolicy:/],
  ['productComparison', /productComparison:/],
  ['productsPage', /productsPage:/],
  ['freeTrialPage', /freeTrialPage:/],
  ['contactPage', /contactPage:/],
  ['retailers', /retailers:/],
  ['affiliate', /affiliate:/],
  ['ammonia', /ammonia:/],
  ['cityPage', /cityPage:/],
  ['referral', /referral:/],
];

let allPresent = true;
for (const [name, regex] of criticalChecks) {
  const enHas = regex.test(enFile);
  const frHas = regex.test(frFile);
  if (!frHas && enHas) {
    console.log(`❌ MISSING: ${name}`);
    allPresent = false;
  }
}

if (allPresent) {
  console.log('✓ All critical keys present in French');
}

// Check for translation completeness by looking for English strings in FR file
console.log('\n=== ENGLISH STRINGS IN FRENCH FILE ===');
const frLines = frFile.split('\n');
const potentialIssues = [];

for (let i = 0; i < frLines.length; i++) {
  const line = frLines[i];
  // Skip comments and imports
  if (line.trim().startsWith('//') || line.trim().startsWith('import')) continue;
  
  // Check for strings that look like English (simple heuristic)
  const stringMatch = line.match(/"([A-Za-z][A-Za-z\s]{10,})"/);
  if (stringMatch) {
    const str = stringMatch[1];
    // Check if it looks like English (contains common English words)
    const englishWords = ['the', 'and', 'for', 'you', 'your', 'with', 'that', 'this', 'have', 'from'];
    const hasEnglishWords = englishWords.some(w => str.toLowerCase().includes(` ${w} `) || str.toLowerCase().startsWith(`${w} `));
    if (hasEnglishWords) {
      potentialIssues.push({ line: i + 1, text: str.substring(0, 60) });
    }
  }
}

if (potentialIssues.length > 0) {
  console.log(`Found ${potentialIssues.length} potential English strings (first 10):`);
  potentialIssues.slice(0, 10).forEach(issue => {
    console.log(`  Line ${issue.line}: "${issue.text}..."`);
  });
} else {
  console.log('✓ No obvious English strings found in French file');
}

console.log('\n=== SUMMARY ===');
console.log('EN file size:', enFile.length, 'bytes');
console.log('FR file size:', frFile.length, 'bytes');
