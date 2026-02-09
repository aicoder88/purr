#!/usr/bin/env node

/**
 * AlsoAsked API Integration
 * 
 * AlsoAsked provides structured PAA data via API
 * Sign up: https://alsoasked.com/
 * API docs: https://alsoasked.com/api
 * 
 * Usage:
 *   node alsoasked-api.js "cat litter odor control"
 *   node alsoasked-api.js --bulk queries.txt
 * 
 * Environment:
 *   ALSOASKED_API_KEY=your_key
 */

const fs = require('fs');

const API_BASE = 'https://alsoasked.com/api/v1';

async function fetchPAA(query, apiKey, options = {}) {
  const { 
    region = 'us', // us, uk, ca, au, etc.
    language = 'en',
    depth = 2 
  } = options;

  const url = new URL(`${API_BASE}/search`);
  url.searchParams.append('q', query);
  url.searchParams.append('region', region);
  url.searchParams.append('language', language);
  url.searchParams.append('depth', depth.toString());

  const response = await fetch(url.toString(), {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`AlsoAsked API error: ${error}`);
  }

  return response.json();
}

function extractQuestions(data, maxDepth = 2, currentDepth = 0) {
  const questions = [];

  if (currentDepth >= maxDepth) return questions;

  if (Array.isArray(data)) {
    for (const item of data) {
      if (item.question) {
        questions.push({
          question: item.question,
          category: guessCategory(item.question),
          level: currentDepth,
        });
      }

      if (item.questions) {
        questions.push(...extractQuestions(item.questions, maxDepth, currentDepth + 1));
      }
    }
  }

  return questions;
}

function guessCategory(question) {
  const lower = question.toLowerCase();
  
  if (lower.includes('smell') || lower.includes('odor')) return 'Odor Control';
  if (lower.includes('work') || lower.includes('science') || lower.includes('carbon')) return 'Science';
  if (lower.includes('often') || lower.includes('change') || lower.includes('clean')) return 'Maintenance';
  if (lower.includes('why') && lower.includes('smell')) return 'Problems';
  if (lower.includes('vs') || lower.includes('compare') || lower.includes('better')) return 'Comparison';
  if (lower.includes('apartment') || lower.includes('small space')) return 'Apartment Living';
  if (lower.includes('safe') || lower.includes('toxic')) return 'Safety';
  if (lower.includes('summer') || lower.includes('winter')) return 'Seasonal';
  if (lower.includes('where') || lower.includes('place')) return 'Placement';
  
  return 'General';
}

async function processSingleQuery(query, apiKey, options) {
  console.log(`🔍 Query: "${query}"`);
  
  try {
    const data = await fetchPAA(query, apiKey, options);
    const questions = extractQuestions(data, options.depth);
    
    console.log(`   ✅ Found ${questions.length} questions\n`);
    return questions;
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}\n`);
    return [];
  }
}

async function main() {
  const apiKey = process.env.ALSOASKED_API_KEY;

  if (!apiKey) {
    console.error('❌ Error: ALSOASKED_API_KEY environment variable required');
    console.error('\nGet your API key at: https://alsoasked.com/');
    console.error('\nAdd to .env.local:');
    console.error('ALSOASKED_API_KEY=your_key_here');
    process.exit(1);
  }

  const isBulk = process.argv.includes('--bulk');
  const input = process.argv[2];

  if (!input || input.startsWith('--')) {
    console.log('Usage:');
    console.log('  Single query:  node alsoasked-api.js "cat litter odor"');
    console.log('  Bulk from file: node alsoasked-api.js --bulk queries.txt');
    console.log('\nOptions:');
    console.log('  --region=ca    Region code (us, uk, ca, au) - default: us');
    console.log('  --depth=2      Search depth (1-3) - default: 2');
    process.exit(0);
  }

  // Parse options
  const region = process.argv.find(arg => arg.startsWith('--region='))?.split('=')[1] || 'us';
  const depth = parseInt(process.argv.find(arg => arg.startsWith('--depth='))?.split('=')[1] || '2');

  const options = { region, depth };
  let allQuestions = [];

  if (isBulk) {
    // Process multiple queries from file
    if (!fs.existsSync(input)) {
      console.error(`❌ File not found: ${input}`);
      process.exit(1);
    }

    const queries = fs.readFileSync(input, 'utf8')
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#'));

    console.log(`📁 Processing ${queries.length} queries from ${input}\n`);

    for (const query of queries) {
      const questions = await processSingleQuery(query, apiKey, options);
      allQuestions.push(...questions);
      
      // Rate limiting
      await new Promise(r => setTimeout(r, 1000));
    }
  } else {
    // Single query
    allQuestions = await processSingleQuery(input, apiKey, options);
  }

  // Deduplicate
  const seen = new Set();
  const unique = allQuestions.filter(q => {
    if (seen.has(q.question)) return false;
    seen.add(q.question);
    return true;
  });

  console.log(`\n📊 Total unique questions: ${unique.length}`);

  if (unique.length === 0) {
    console.log('No questions found. Check your API key and query.');
    process.exit(0);
  }

  // Save as JSON
  const jsonFile = `alsoasked-results-${Date.now()}.json`;
  fs.writeFileSync(jsonFile, JSON.stringify(unique, null, 2));
  console.log(`📁 JSON saved: ${jsonFile}`);

  // Save as CSV for generate-answers.js
  const csvFile = `alsoasked-results-${Date.now()}.csv`;
  const csvContent = 'question,category\n' + 
    unique.map(q => `"${q.question.replace(/"/g, '""')}","${q.category}"`).join('\n');
  fs.writeFileSync(csvFile, csvContent);
  console.log(`📁 CSV saved: ${csvFile}`);

  console.log(`\n🚀 Next steps:`);
  console.log(`   1. node generate-answers.js ${csvFile}`);
  console.log(`   2. node bulk-page-generator.js [generated-json]`);

  // Preview
  console.log(`\n📋 Preview (first 5 questions):`);
  unique.slice(0, 5).forEach((q, i) => {
    console.log(`   ${i + 1}. [${q.category}] ${q.question}`);
  });
}

main().catch(console.error);
