#!/usr/bin/env node

/**
 * PAA Pipeline - Full Automation for Purrify.ca
 * 
 * This is the MASTER script that orchestrates the entire PAA workflow:
 * 1. Get PAA questions (AlsoAsked API, file, or manual)
 * 2. Generate answers (OpenRouter API)
 * 3. Create Next.js pages
 * 4. Update hub page
 * 
 * Usage:
 *   FULL AUTO:   node paa-pipeline.js --alsoasked "cat litter odor"
 *   FROM FILE:   node paa-pipeline.js --file questions.csv
 *   WITH PROMPTS: node paa-pipeline.js (interactive)
 * 
 * Prerequisites:
 *   - OPENROUTER_API_KEY in .env.local (for answer generation)
 *   - ALSOASKED_API_KEY in .env.local (for --alsoasked mode)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 80);
}

async function checkAPIKeys() {
  const openrouter = process.env.OPENROUTER_API_KEY;
  const alsoasked = process.env.ALSOASKED_API_KEY;

  console.log('🔑 API Key Status:');
  console.log(`   OpenRouter: ${openrouter ? '✅' : '❌'} (required for answer generation)`);
  console.log(`   AlsoAsked:  ${alsoasked ? '✅' : '❌'} (required for --alsoasked mode)\n`);

  if (!openrouter) {
    console.error('❌ OPENROUTER_API_KEY is required');
    console.log('Get free key: https://openrouter.ai/\n');
    return false;
  }

  return true;
}

async function fetchFromAlsoAsked(query) {
  console.log(`🔍 Fetching PAA from AlsoAsked: "${query}"`);
  
  try {
    const { execSync } = require('child_process');
    const result = execSync(
      `node ${path.join(__dirname, 'alsoasked-api.js')} "${query}"`,
      { encoding: 'utf8', env: process.env }
    );
    console.log(result);

    // Find the generated CSV file
    const files = fs.readdirSync('.').filter(f => f.startsWith('alsoasked-results-') && f.endsWith('.csv'));
    if (files.length > 0) {
      // Sort by newest
      files.sort((a, b) => fs.statSync(b).mtime - fs.statSync(a).mtime);
      return files[0];
    }
    return null;
  } catch (error) {
    console.error('❌ AlsoAsked fetch failed:', error.message);
    return null;
  }
}

async function generateAnswers(csvFile) {
  console.log(`\n📝 Generating answers from: ${csvFile}`);
  
  try {
    const { execSync } = require('child_process');
    const result = execSync(
      `node ${path.join(__dirname, 'generate-answers.js')} "${csvFile}"`,
      { encoding: 'utf8', env: process.env }
    );
    console.log(result);

    // Find the generated JSON file
    const jsonFile = csvFile.replace('.csv', '-answers.json');
    if (fs.existsSync(jsonFile)) {
      return jsonFile;
    }
    return null;
  } catch (error) {
    console.error('❌ Answer generation failed:', error.message);
    return null;
  }
}

async function createPages(jsonFile) {
  console.log(`\n📄 Creating pages from: ${jsonFile}`);
  
  try {
    const { execSync } = require('child_process');
    const result = execSync(
      `node ${path.join(__dirname, 'bulk-page-generator.js')} "${jsonFile}"`,
      { encoding: 'utf8', env: process.env }
    );
    console.log(result);
    return true;
  } catch (error) {
    console.error('❌ Page creation failed:', error.message);
    return false;
  }
}

async function interactiveMode() {
  console.log('\n🐱 Purrify PAA Pipeline - Interactive Mode\n');

  const questions = [];
  
  console.log('Enter PAA questions (empty line to finish):\n');
  
  while (true) {
    const question = await ask(`Question ${questions.length + 1}: `);
    if (!question.trim()) break;
    
    const category = await ask('Category [General]: ') || 'General';
    questions.push({ question: question.trim(), category });
  }

  if (questions.length === 0) {
    console.log('No questions entered. Exiting.');
    return;
  }

  // Save to CSV
  const timestamp = Date.now();
  const csvFile = `manual-questions-${timestamp}.csv`;
  const csvContent = 'question,category\n' + 
    questions.map(q => `"${q.question.replace(/"/g, '""')}","${q.category}"`).join('\n');
  fs.writeFileSync(csvFile, csvContent);
  
  console.log(`\n✅ Saved ${questions.length} questions to ${csvFile}`);

  // Generate answers
  const shouldGenerate = await ask('\nGenerate answers with AI? [Y/n]: ');
  if (shouldGenerate.toLowerCase() !== 'n') {
    const jsonFile = await generateAnswers(csvFile);
    if (jsonFile) {
      const shouldCreate = await ask('\nCreate Next.js pages? [Y/n]: ');
      if (shouldCreate.toLowerCase() !== 'n') {
        await createPages(jsonFile);
      }
    }
  }
}

async function main() {
  console.log('\n╔════════════════════════════════════════╗');
  console.log('║     PURRIFY PAA AUTOMATION PIPELINE    ║');
  console.log('╚════════════════════════════════════════╝\n');

  // Check API keys
  const hasKeys = await checkAPIKeys();
  if (!hasKeys && process.argv.includes('--alsoasked')) {
    process.exit(1);
  }

  // Parse arguments
  const isAlsoAsked = process.argv.includes('--alsoasked');
  const isFile = process.argv.includes('--file');
  const isHelp = process.argv.includes('--help') || process.argv.includes('-h');

  if (isHelp) {
    console.log('Usage:');
    console.log('  Interactive:  node paa-pipeline.js');
    console.log('  AlsoAsked:    node paa-pipeline.js --alsoasked "cat litter odor"');
    console.log('  From CSV:     node paa-pipeline.js --file questions.csv');
    console.log('\nExamples:');
    console.log('  # Full auto from AlsoAsked:');
    console.log('  node paa-pipeline.js --alsoasked "how to stop litter box smell"');
    console.log('');
    console.log('  # From existing CSV (skip question discovery):');
    console.log('  node paa-pipeline.js --file my-questions.csv');
    console.log('');
    console.log('  # Interactive (manual entry):');
    console.log('  node paa-pipeline.js');
    process.exit(0);
  }

  if (isAlsoAsked) {
    // Full auto mode with AlsoAsked
    const queryIndex = process.argv.indexOf('--alsoasked') + 1;
    const query = process.argv[queryIndex];
    
    if (!query) {
      console.error('❌ Please provide a search query');
      console.log('Example: node paa-pipeline.js --alsoasked "cat litter odor"');
      process.exit(1);
    }

    console.log(`🚀 FULL AUTO MODE: "${query}"\n`);

    // Step 1: Get questions from AlsoAsked
    const csvFile = await fetchFromAlsoAsked(query);
    if (!csvFile) {
      console.error('❌ Failed to fetch questions');
      process.exit(1);
    }

    // Step 2: Generate answers
    const jsonFile = await generateAnswers(csvFile);
    if (!jsonFile) {
      console.error('❌ Failed to generate answers');
      process.exit(1);
    }

    // Step 3: Create pages
    await createPages(jsonFile);

    console.log('\n✅ Pipeline complete!');
    console.log('\nNext steps:');
    console.log('  1. Update hub page: /app/learn/cat-litter-answers/page.tsx');
    console.log('  2. Run: pnpm check-types');
    console.log('  3. Run: pnpm build');
    console.log('  4. Submit URLs to Google Search Console');

  } else if (isFile) {
    // From CSV file mode
    const fileIndex = process.argv.indexOf('--file') + 1;
    const csvFile = process.argv[fileIndex];
    
    if (!csvFile || !fs.existsSync(csvFile)) {
      console.error(`❌ File not found: ${csvFile}`);
      process.exit(1);
    }

    console.log(`📁 FILE MODE: ${csvFile}\n`);

    // Generate answers
    const jsonFile = await generateAnswers(csvFile);
    if (jsonFile) {
      // Create pages
      await createPages(jsonFile);
    }

  } else {
    // Interactive mode
    await interactiveMode();
  }

  rl.close();
}

main().catch(err => {
  console.error('❌ Error:', err);
  rl.close();
  process.exit(1);
});
