#!/usr/bin/env node

/**
 * SEO Keyword Analysis CLI Tool
 * 
 * Analyzes content files for keyword optimization opportunities
 * and generates detailed reports.
 * 
 * Usage:
 *   npm run seo:keywords
 *   npm run seo:keywords -- --file=path/to/file.md
 *   npm run seo:keywords -- --category=blog
 */

import fs from 'node:fs';
import path from 'node:path';
import { KeywordOptimizer } from '../../src/lib/seo/keyword-optimizer';

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const options: {
    file: string | null;
    category: string | null;
    directory: string | null;
    output: string | null;
  } = {
    file: null,
    category: null,
    directory: null,
    output: null,
  };

  for (const arg of args) {
    if (arg.startsWith('--file=')) {
      options.file = arg.split('=')[1];
    } else if (arg.startsWith('--category=')) {
      options.category = arg.split('=')[1];
    } else if (arg.startsWith('--directory=')) {
      options.directory = arg.split('=')[1];
    } else if (arg.startsWith('--output=')) {
      options.output = arg.split('=')[1];
    }
  }

  return options;
}

/**
 * Find all markdown files in a directory
 */
function findMarkdownFiles(dir: string): string[] {
  const files: string[] = [];
  
  function traverse(currentDir: string): void {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Skip node_modules and hidden directories
        if (!item.startsWith('.') && item !== 'node_modules') {
          traverse(fullPath);
        }
      } else if (item.endsWith('.md') || item.endsWith('.mdx')) {
        files.push(fullPath);
      }
    }
  }
  
  traverse(dir);
  return files;
}

/**
 * Analyze a single file
 */
async function analyzeFile(filePath: string, optimizer: any, category: string): Promise<any> {
  console.log(`\n${colors.cyan}Analyzing: ${filePath}${colors.reset}`);
  
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Get keyword suggestions
  const suggestions = await optimizer.suggestKeywords(content, category, 10);
  
  // Get keyword opportunities
  const opportunities = await optimizer.getKeywordOpportunities(content, category, 5);
  
  // Extract current keywords from content
  const currentKeywords = extractKeywordsFromContent(content);
  
  // Validate current keywords
  let validation = null;
  if (currentKeywords.length > 0) {
    validation = await optimizer.validateKeywordUsage(content, currentKeywords);
  }
  
  return {
    file: filePath,
    content,
    suggestions,
    opportunities,
    currentKeywords,
    validation,
  };
}

/**
 * Extract keywords that appear to be targeted in content
 */
function extractKeywordsFromContent(content: string): string[] {
  const keywords = [];
  const lines = content.split('\n');
  
  // Look for keywords in frontmatter or meta tags
  let inFrontmatter = false;
  for (const line of lines) {
    if (line.trim() === '---') {
      inFrontmatter = !inFrontmatter;
      continue;
    }
    
    if (inFrontmatter) {
      if (line.includes('keywords:') || line.includes('tags:')) {
        const match = line.match(/:\s*\[(.*?)\]/);
        if (match) {
          const tags = match[1].split(',').map(t => t.trim().replaceAll(/['"]/g, ''));
          keywords.push(...tags);
        }
      }
    }
  }
  
  return keywords;
}

/**
 * Print analysis results
 */
function printResults(results: any): void {
  console.log(`\n${colors.bright}${colors.blue}═══════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bright}${colors.blue}  KEYWORD ANALYSIS RESULTS${colors.reset}`);
  console.log(`${colors.bright}${colors.blue}═══════════════════════════════════════════════════${colors.reset}\n`);
  
  // Print validation results
  if (results.validation) {
    console.log(`${colors.bright}Current Keyword Validation:${colors.reset}`);
    
    if (results.validation.passed) {
      console.log(`${colors.green}✓ All keywords properly optimized${colors.reset}`);
    } else {
      console.log(`${colors.red}✗ Issues found:${colors.reset}`);
      for (const issue of results.validation.issues) {
        console.log(`  ${colors.red}• ${issue}${colors.reset}`);
      }
    }
    
    if (results.validation.warnings.length > 0) {
      console.log(`\n${colors.yellow}Warnings:${colors.reset}`);
      for (const warning of results.validation.warnings) {
        console.log(`  ${colors.yellow}• ${warning}${colors.reset}`);
      }
    }
    
    console.log(`\n${colors.bright}Keyword Density:${colors.reset}`);
    for (const [keyword, density] of Object.entries(results.validation.keywordDensity)) {
      const densityNum = Number(density);
      const color = densityNum > 3 ? colors.red : densityNum < 0.5 ? colors.yellow : colors.green;
      console.log(`  ${color}${keyword}: ${densityNum.toFixed(2)}%${colors.reset}`);
    }
  }
  
  // Print keyword suggestions
  console.log(`\n${colors.bright}Top Keyword Suggestions:${colors.reset}`);
  if (results.suggestions.length === 0) {
    console.log(`  ${colors.yellow}No suggestions found${colors.reset}`);
  } else {
    for (let i = 0; i < Math.min(5, results.suggestions.length); i++) {
      const suggestion = results.suggestions[i];
      const keyword = suggestion.keyword;
      console.log(`\n  ${colors.bright}${i + 1}. ${keyword.term}${colors.reset}`);
      console.log(`     Search Volume: ${colors.cyan}${keyword.searchVolume.toLocaleString()}${colors.reset}`);
      console.log(`     Competition: ${getCompetitionColor(keyword.competition)}${keyword.competition}${colors.reset}`);
      console.log(`     Relevance Score: ${colors.cyan}${suggestion.relevanceScore.toFixed(1)}${colors.reset}`);
      console.log(`     Current Usage: ${suggestion.currentUsage} times`);
      if (suggestion.recommendedPlacement.length > 0) {
        console.log(`     Recommended: ${colors.yellow}${suggestion.recommendedPlacement.join(', ')}${colors.reset}`);
      }
    }
  }
  
  // Print keyword opportunities
  if (results.opportunities.length > 0) {
    console.log(`\n${colors.bright}High-Value Opportunities (Not Currently Used):${colors.reset}`);
    for (let i = 0; i < results.opportunities.length; i++) {
      const opp = results.opportunities[i];
      const keyword = opp.keyword;
      console.log(`\n  ${colors.bright}${i + 1}. ${keyword.term}${colors.reset}`);
      console.log(`     Search Volume: ${colors.green}${keyword.searchVolume.toLocaleString()}${colors.reset}`);
      console.log(`     Competition: ${getCompetitionColor(keyword.competition)}${keyword.competition}${colors.reset}`);
      console.log(`     Difficulty: ${keyword.difficulty}/100`);
    }
  }
}

/**
 * Get color for competition level
 */
function getCompetitionColor(competition: string): string {
  switch (competition) {
    case 'low':
      return colors.green;
    case 'medium':
      return colors.yellow;
    case 'high':
      return colors.red;
    default:
      return colors.reset;
  }
}

/**
 * Generate JSON report
 */
function generateReport(allResults: any[], outputPath: string): void {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalFiles: allResults.length,
      totalSuggestions: allResults.reduce((sum, r) => sum + r.suggestions.length, 0),
      totalOpportunities: allResults.reduce((sum, r) => sum + r.opportunities.length, 0),
    },
    files: allResults.map(result => ({
      file: result.file,
      currentKeywords: result.currentKeywords,
      validation: result.validation,
      topSuggestions: result.suggestions.slice(0, 5).map((s: any) => ({
        keyword: s.keyword.term,
        searchVolume: s.keyword.searchVolume,
        competition: s.keyword.competition,
        relevanceScore: s.relevanceScore,
        currentUsage: s.currentUsage,
        recommendedPlacement: s.recommendedPlacement,
      })),
      opportunities: result.opportunities.map((o: any) => ({
        keyword: o.keyword.term,
        searchVolume: o.keyword.searchVolume,
        competition: o.keyword.competition,
        difficulty: o.keyword.difficulty,
      })),
    })),
  };
  
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  console.log(`\n${colors.green}Report saved to: ${outputPath}${colors.reset}`);
}

/**
 * Main function
 */
async function main() {
  const options = parseArgs();
  
  console.log(`${colors.bright}${colors.blue}SEO Keyword Analysis Tool${colors.reset}\n`);
  
  try {
    // Initialize optimizer
    const optimizer = new KeywordOptimizer();
    console.log('Loading keywords...');
    await optimizer.loadKeywords();
    const keywordCount = optimizer.getKeywords().length;
    console.log(`${colors.green}✓ Loaded ${keywordCount} keywords${colors.reset}`);
    
    let filesToAnalyze = [];
    
    // Determine which files to analyze
    if (options.file) {
      filesToAnalyze = [options.file];
    } else if (options.directory) {
      filesToAnalyze = findMarkdownFiles(options.directory);
    } else {
      // Default: analyze blog posts and pages
      const defaultDirs = ['pages', 'content', 'docs'];
      for (const dir of defaultDirs) {
        if (fs.existsSync(dir)) {
          filesToAnalyze.push(...findMarkdownFiles(dir));
        }
      }
    }
    
    if (filesToAnalyze.length === 0) {
      console.log(`${colors.yellow}No files found to analyze${colors.reset}`);
      console.log('\nUsage:');
      console.log('  npm run seo:keywords -- --file=path/to/file.md');
      console.log('  npm run seo:keywords -- --directory=content/blog');
      console.log('  npm run seo:keywords -- --category=blog');
      return;
    }
    
    console.log(`\nAnalyzing ${filesToAnalyze.length} file(s)...\n`);
    
    // Analyze all files
    const allResults = [];
    for (const file of filesToAnalyze) {
      const result = await analyzeFile(file, optimizer, options.category || 'general');
      allResults.push(result);
      printResults(result);
    }
    
    // Generate report if output specified
    if (options.output) {
      generateReport(allResults, options.output);
    }
    
    console.log(`\n${colors.green}${colors.bright}Analysis complete!${colors.reset}\n`);
    
  } catch (error) {
    const err = error as Error;
    console.error(`${colors.red}Error: ${err.message}${colors.reset}`);
    console.error(err.stack);
    process.exit(1);
  }
}

// Run the tool
main();
