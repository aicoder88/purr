#!/usr/bin/env node
/**
 * SEO Content Quality Audit Script
 * Checks for thin content, duplicates, keyword usage, and content freshness
 */

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(process.cwd(), 'content/blog');
const MIN_WORD_COUNT = 300;

// Strip HTML tags for word counting
function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

// Count words in text
function countWords(text) {
  if (!text) return 0;
  const words = text.split(/\s+/).filter(w => w.length > 0);
  return words.length;
}

// Calculate text similarity percentage
function calculateSimilarity(text1, text2) {
  const words1 = text1.toLowerCase().split(/\s+/).filter(w => w.length > 3);
  const words2 = text2.toLowerCase().split(/\s+/).filter(w => w.length > 3);
  
  const set1 = new Set(words1);
  const set2 = new Set(words2);
  
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  
  return union.size > 0 ? (intersection.size / union.size) * 100 : 0;
}

// Extract internal links from content
function extractLinks(content) {
  if (!content) return [];
  const links = [];
  const linkRegex = /href="([^"]+)"/g;
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const url = match[1];
    if (url.startsWith('/') && !url.startsWith('//')) {
      links.push(url);
    }
  }
  return links;
}

// Check keyword usage
function analyzeKeywordUsage(content, title, seoKeywords) {
  const text = stripHtml(content).toLowerCase();
  const titleLower = (title || '').toLowerCase();
  const results = {
    inTitle: [],
    inContent: [],
    missing: [],
    keywordDensity: {}
  };
  
  const keywords = seoKeywords || [];
  const wordCount = countWords(text);
  
  keywords.forEach(keyword => {
    const kw = keyword.toLowerCase();
    const inTitle = titleLower.includes(kw);
    const regex = new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
    const matches = text.match(regex);
    const count = matches ? matches.length : 0;
    const density = wordCount > 0 ? (count / wordCount) * 100 : 0;
    
    if (inTitle) results.inTitle.push(keyword);
    if (count > 0) {
      results.inContent.push(keyword);
      results.keywordDensity[keyword] = {
        count,
        density: density.toFixed(2) + '%'
      };
    } else {
      results.missing.push(keyword);
    }
  });
  
  return results;
}

// Check content freshness
function checkFreshness(modifiedDate, publishedDate) {
  const now = new Date('2026-01-30'); // Using audit date
  const modified = modifiedDate ? new Date(modifiedDate) : null;
  const published = publishedDate ? new Date(publishedDate) : null;
  
  const daysSinceModified = modified ? Math.floor((now - modified) / (1000 * 60 * 60 * 24)) : null;
  const daysSincePublished = published ? Math.floor((now - published) / (1000 * 60 * 60 * 24)) : null;
  
  return {
    daysSinceModified,
    daysSincePublished,
    needsUpdate: daysSinceModified !== null && daysSinceModified > 180, // > 6 months
    isFresh: daysSinceModified !== null && daysSinceModified <= 90 // <= 3 months
  };
}

// Process all blog posts
async function auditContent() {
  const locales = ['en', 'fr', 'zh', 'es'];
  const results = {
    totalPosts: 0,
    thinContent: [],
    byLocale: {},
    duplicateContent: [],
    staleContent: [],
    keywordIssues: [],
    internalLinking: {
      avgLinksPerPost: 0,
      postsWithNoLinks: [],
      totalLinks: 0
    }
  };
  
  const allContent = [];
  
  for (const locale of locales) {
    const localeDir = path.join(CONTENT_DIR, locale);
    if (!fs.existsSync(localeDir)) continue;
    
    results.byLocale[locale] = {
      total: 0,
      thinContent: 0,
      avgWordCount: 0,
      staleContent: 0
    };
    
    const files = fs.readdirSync(localeDir).filter(f => f.endsWith('.json'));
    let totalWords = 0;
    let totalLinks = 0;
    
    for (const file of files) {
      const filePath = path.join(localeDir, file);
      try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const content = data.content || '';
        const plainText = stripHtml(content);
        const wordCount = countWords(plainText);
        const links = extractLinks(content);
        
        results.totalPosts++;
        results.byLocale[locale].total++;
        totalWords += wordCount;
        totalLinks += links.length;
        
        const postData = {
          locale,
          slug: data.slug,
          title: data.title,
          wordCount,
          file: file,
          plainText: plainText.substring(0, 500), // Store preview
          links,
          modifiedDate: data.modifiedDate,
          publishedDate: data.publishDate
        };
        
        allContent.push(postData);
        
        // Check for thin content
        if (wordCount < MIN_WORD_COUNT) {
          results.thinContent.push({
            locale,
            slug: data.slug,
            title: data.title,
            wordCount,
            file
          });
          results.byLocale[locale].thinContent++;
        }
        
        // Check freshness
        const freshness = checkFreshness(data.modifiedDate, data.publishDate);
        if (freshness.needsUpdate) {
          results.staleContent.push({
            locale,
            slug: data.slug,
            title: data.title,
            daysSinceModified: freshness.daysSinceModified,
            modifiedDate: data.modifiedDate
          });
          results.byLocale[locale].staleContent++;
        }
        
        // Analyze keywords
        if (data.seo?.keywords) {
          const kwAnalysis = analyzeKeywordUsage(content, data.title, data.seo.keywords);
          if (kwAnalysis.missing.length > 0 || kwAnalysis.inContent.length === 0) {
            results.keywordIssues.push({
              locale,
              slug: data.slug,
              title: data.title,
              missingKeywords: kwAnalysis.missing,
              keywordsInContent: kwAnalysis.inContent.length,
              totalKeywords: data.seo.keywords.length,
              density: kwAnalysis.keywordDensity
            });
          }
        }
        
        // Check internal linking
        if (links.length === 0) {
          results.internalLinking.postsWithNoLinks.push({
            locale,
            slug: data.slug,
            title: data.title
          });
        }
        
      } catch (error) {
        console.error(`Error reading ${filePath}:`, error.message);
      }
    }
    
    // Calculate averages
    if (results.byLocale[locale].total > 0) {
      results.byLocale[locale].avgWordCount = Math.round(totalWords / results.byLocale[locale].total);
    }
    results.internalLinking.totalLinks += totalLinks;
  }
  
  // Calculate average links per post
  if (results.totalPosts > 0) {
    results.internalLinking.avgLinksPerPost = (results.internalLinking.totalLinks / results.totalPosts).toFixed(2);
  }
  
  // Check for duplicate content within each locale
  for (const locale of locales) {
    const localeContent = allContent.filter(c => c.locale === locale);
    for (let i = 0; i < localeContent.length; i++) {
      for (let j = i + 1; j < localeContent.length; j++) {
        const similarity = calculateSimilarity(
          localeContent[i].plainText,
          localeContent[j].plainText
        );
        if (similarity > 60) { // 60% similarity threshold
          results.duplicateContent.push({
            locale,
            post1: localeContent[i].slug,
            post2: localeContent[j].slug,
            title1: localeContent[i].title,
            title2: localeContent[j].title,
            similarity: similarity.toFixed(1) + '%'
          });
        }
      }
    }
  }
  
  return results;
}

// Main execution
auditContent().then(results => {
  console.log('\n' + '='.repeat(80));
  console.log('SEO CONTENT QUALITY AUDIT REPORT');
  console.log('='.repeat(80));
  
  console.log('\n📊 OVERVIEW');
  console.log('-'.repeat(40));
  console.log(`Total Posts Analyzed: ${results.totalPosts}`);
  console.log(`\nBy Locale:`);
  for (const [locale, data] of Object.entries(results.byLocale)) {
    console.log(`  ${locale.toUpperCase()}: ${data.total} posts (avg ${data.avgWordCount} words)`);
  }
  
  console.log('\n\n📝 THIN CONTENT (< 300 words)');
  console.log('-'.repeat(40));
  if (results.thinContent.length === 0) {
    console.log('✅ No thin content detected!');
  } else {
    console.log(`⚠️  Found ${results.thinContent.length} posts with thin content:\n`);
    results.thinContent.forEach(post => {
      console.log(`  • [${post.locale.toUpperCase()}] ${post.title}`);
      console.log(`    Slug: ${post.slug} | Words: ${post.wordCount}`);
    });
  }
  
  console.log('\n\n🔄 DUPLICATE CONTENT (> 60% similarity)');
  console.log('-'.repeat(40));
  if (results.duplicateContent.length === 0) {
    console.log('✅ No duplicate content detected!');
  } else {
    console.log(`⚠️  Found ${results.duplicateContent.length} potential duplicates:\n`);
    results.duplicateContent.forEach(dup => {
      console.log(`  • [${dup.locale.toUpperCase()}] ${dup.similarity} similar`);
      console.log(`    1: ${dup.title1}`);
      console.log(`    2: ${dup.title2}`);
    });
  }
  
  console.log('\n\n📅 CONTENT FRESHNESS (> 6 months since update)');
  console.log('-'.repeat(40));
  if (results.staleContent.length === 0) {
    console.log('✅ All content is fresh!');
  } else {
    console.log(`⚠️  Found ${results.staleContent.length} stale posts:\n`);
    results.staleContent.slice(0, 10).forEach(post => {
      console.log(`  • [${post.locale.toUpperCase()}] ${post.title}`);
      console.log(`    Last updated: ${post.daysSinceModified} days ago (${new Date(post.modifiedDate).toLocaleDateString()})`);
    });
    if (results.staleContent.length > 10) {
      console.log(`    ... and ${results.staleContent.length - 10} more`);
    }
  }
  
  console.log('\n\n🔑 KEYWORD USAGE ISSUES');
  console.log('-'.repeat(40));
  const criticalKwIssues = results.keywordIssues.filter(i => i.keywordsInContent === 0);
  if (criticalKwIssues.length === 0) {
    console.log('✅ All posts have keyword presence in content!');
  } else {
    console.log(`⚠️  Found ${criticalKwIssues.length} posts with no keywords in content:\n`);
    criticalKwIssues.slice(0, 10).forEach(post => {
      console.log(`  • [${post.locale.toUpperCase()}] ${post.title}`);
      console.log(`    Missing: ${post.missingKeywords.slice(0, 3).join(', ')}${post.missingKeywords.length > 3 ? '...' : ''}`);
    });
  }
  
  console.log('\n\n🔗 INTERNAL LINKING');
  console.log('-'.repeat(40));
  console.log(`Average links per post: ${results.internalLinking.avgLinksPerPost}`);
  console.log(`Posts with no internal links: ${results.internalLinking.postsWithNoLinks.length}`);
  if (results.internalLinking.postsWithNoLinks.length > 0) {
    console.log('\nPosts needing more internal links:');
    results.internalLinking.postsWithNoLinks.slice(0, 10).forEach(post => {
      console.log(`  • [${post.locale.toUpperCase()}] ${post.title}`);
    });
  }
  
  // Summary by locale
  console.log('\n\n📈 LOCALE SUMMARY');
  console.log('-'.repeat(40));
  for (const [locale, data] of Object.entries(results.byLocale)) {
    const thinPercent = data.total > 0 ? ((data.thinContent / data.total) * 100).toFixed(1) : 0;
    const stalePercent = data.total > 0 ? ((data.staleContent / data.total) * 100).toFixed(1) : 0;
    console.log(`\n${locale.toUpperCase()}:`);
    console.log(`  Total posts: ${data.total}`);
    console.log(`  Avg word count: ${data.avgWordCount} words`);
    console.log(`  Thin content: ${data.thinContent} (${thinPercent}%)`);
    console.log(`  Stale content: ${data.staleContent} (${stalePercent}%)`);
  }
  
  console.log('\n' + '='.repeat(80));
  console.log('END OF AUDIT REPORT');
  console.log('='.repeat(80) + '\n');
  
  // Save detailed report
  const reportPath = path.join(process.cwd(), 'reports/content-quality-audit.json');
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`📄 Detailed report saved to: ${reportPath}\n`);
  
}).catch(error => {
  console.error('Audit failed:', error);
  process.exit(1);
});
