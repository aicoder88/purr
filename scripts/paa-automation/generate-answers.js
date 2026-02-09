#!/usr/bin/env node

/**
 * Generate answers for PAA questions using OpenRouter API
 * Cheaper alternative to Perplexity ($0.001-0.003 per answer vs Perplexity's $0.005+)
 * 
 * Usage:
 *   node generate-answers.js questions.csv
 *   node generate-answers.js "Single question here?"
 * 
 * Input CSV format:
 *   question,category
 *   "How do I keep my litter box from smelling?","Odor Control"
 *   "Does activated carbon work?","Science"
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// OpenRouter API - access to multiple cheap LLMs
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const DEFAULT_MODEL = 'anthropic/claude-3.5-haiku'; // Cheap and fast
// Alternative cheap models:
// - google/gemini-flash-1.5
// - meta-llama/llama-3.1-8b-instruct
// - nvidia/llama-3.1-nemotron-70b-instruct

const SYSTEM_PROMPT = `You are an expert in cat litter odor control and activated carbon technology. 
Write concise, factual answers for cat owners. Use plain English. Avoid marketing speak.
Focus on science-backed explanations. Keep answers practical and actionable.
Never use em-dashes. Use commas and periods instead.`;

function getAnswerPrompt(question) {
  return `Write a plain text answer (110-130 words) to this cat litter question: "${question}"

Requirements:
- 110-130 words exactly
- Plain text only (no bullet points, no markdown)
- Scientifically accurate
- Practical advice
- No em-dashes (use commas instead)
- No "In conclusion" or similar phrases
- Direct, helpful tone

Answer:`;
}

async function generateAnswer(question, apiKey) {
  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://purrify.ca',
        'X-Title': 'Purrify PAA Generator'
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: getAnswerPrompt(question) }
        ],
        max_tokens: 300,
        temperature: 0.3 // Lower = more consistent
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API error: ${error}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error(`Error generating answer for "${question}":`, error.message);
    return null;
  }
}

async function processCSV(filePath, apiKey) {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const results = [];
  let isFirstLine = true;
  let lineNumber = 0;

  console.log('📝 Processing questions...\n');

  for await (const line of rl) {
    lineNumber++;
    
    // Skip header
    if (isFirstLine) {
      isFirstLine = false;
      continue;
    }

    // Parse CSV (simple split, assumes no commas in quoted fields)
    const parts = line.split(',');
    const question = parts[0].replace(/^"|"$/g, '');
    const category = parts[1] ? parts[1].replace(/^"|"$/g, '') : 'General';

    if (!question) continue;

    console.log(`[${lineNumber}] ${question}`);
    
    const answer = await generateAnswer(question, apiKey);
    
    if (answer) {
      results.push({
        question,
        category,
        answer,
        wordCount: answer.split(/\s+/).length
      });
      console.log(`    ✅ Generated (${answer.split(/\s+/).length} words)\n`);
    } else {
      console.log(`    ❌ Failed\n`);
    }

    // Rate limiting - be nice to the API
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  return results;
}

async function generateSingleQuestion(question, apiKey) {
  console.log(`📝 Generating answer for: "${question}"\n`);
  
  const answer = await generateAnswer(question, apiKey);
  
  if (answer) {
    console.log('\n=== GENERATED ANSWER ===\n');
    console.log(answer);
    console.log(`\n=== WORD COUNT: ${answer.split(/\s+/).length} ===\n`);
    console.log('Copy this answer into your page template.');
  } else {
    console.log('❌ Failed to generate answer');
    process.exit(1);
  }
}

async function main() {
  // Get API key from env
  const apiKey = process.env.OPENROUTER_API_KEY;
  
  if (!apiKey) {
    console.error('❌ Error: OPENROUTER_API_KEY environment variable required');
    console.error('\nGet a free API key at: https://openrouter.ai/');
    console.error('\nAdd to .env.local:');
    console.error('OPENROUTER_API_KEY=your_key_here');
    process.exit(1);
  }

  const input = process.argv[2];

  if (!input) {
    console.log('Usage:');
    console.log('  node generate-answers.js questions.csv');
    console.log('  node generate-answers.js "How do I stop litter box smell?"');
    console.log('\nCSV format:');
    console.log('  question,category');
    console.log('  "How do I...?","Odor Control"');
    process.exit(0);
  }

  if (input.endsWith('.csv')) {
    // Process CSV file
    if (!fs.existsSync(input)) {
      console.error(`❌ File not found: ${input}`);
      process.exit(1);
    }

    const results = await processCSV(input, apiKey);
    
    // Save results
    const outputFile = input.replace('.csv', '-answers.json');
    fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
    
    console.log(`\n✅ Done! Generated ${results.length} answers`);
    console.log(`📁 Saved to: ${outputFile}`);
    console.log(`\nNext step: Run bulk-page-generator.js to create pages`);
  } else {
    // Single question
    await generateSingleQuestion(input, apiKey);
  }
}

main().catch(console.error);
