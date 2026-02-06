#!/usr/bin/env node

import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Parse command line arguments
const args = process.argv.slice(2);
const VALIDATE_ONLY = args.includes('--validate-only');
const FIX_IMAGES = args.includes('--fix-images');
const VERBOSE = args.includes('--verbose');
const FORCE = args.includes('--force');

// Retry configuration
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;
const CONTENT_COMPLETENESS_THRESHOLD = 0.9; // 90%

// Translations needed - can be overridden via TRANSLATIONS_NEEDED env var
const TRANSLATIONS_NEEDED = process.env.TRANSLATIONS_NEEDED 
  ? JSON.parse(process.env.TRANSLATIONS_NEEDED)
  : [
      {
        slug: 'best-cat-litter-multiple-cats-odor-control',
        languages: ['es'], // FR and ZH already done
      },
      {
        slug: 'best-natural-cat-litter-odor-control',
        languages: ['fr', 'zh', 'es'],
      },
      {
        slug: 'cat-litter-odour-control-tips',
        languages: ['fr', 'zh', 'es'],
      },
      {
        slug: 'litter-deodorizer-frequency-guide',
        languages: ['fr', 'zh', 'es'],
      },
    ];

const LANGUAGE_CONFIG = {
  fr: {
    locale: 'fr',
    authorName: 'Équipe Purrify',
    language: 'French',
  },
  zh: {
    locale: 'zh',
    authorName: 'Purrify团队',
    language: 'Chinese',
  },
  es: {
    locale: 'es',
    authorName: 'Equipo Purrify',
    language: 'Spanish',
  },
};

/**
 * Extract all image URLs from content HTML
 */
function extractImageUrls(content) {
  const urls = new Set();
  const imgRegex = /<img[^>]+src="([^"]+)"/g;
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    urls.add(match[1]);
  }
  return Array.from(urls);
}

/**
 * Get featured image URL from post
 */
function getFeaturedImageUrl(post) {
  return post?.featuredImage?.url || null;
}

/**
 * Validate that all referenced images exist in the filesystem
 */
async function validateImagesExist(post, baseDir) {
  const issues = [];
  const publicDir = path.join(baseDir, '..', 'public');
  
  // Check featured image
  const featuredUrl = getFeaturedImageUrl(post);
  if (featuredUrl) {
    const featuredPath = path.join(publicDir, featuredUrl.replace(/^\//, ''));
    if (!fs.existsSync(featuredPath)) {
      issues.push(`Missing featured image: ${featuredUrl} (expected at ${featuredPath})`);
    }
  }
  
  // Check content images
  if (post.content) {
    const imageUrls = extractImageUrls(post.content);
    for (const url of imageUrls) {
      // Skip external URLs
      if (url.startsWith('http://') || url.startsWith('https://')) {
        continue;
      }
      const imagePath = path.join(publicDir, url.replace(/^\//, ''));
      if (!fs.existsSync(imagePath)) {
        issues.push(`Missing content image: ${url} (expected at ${imagePath})`);
      }
    }
  }
  
  return issues;
}

/**
 * Calculate content length for completeness check
 */
function getContentLength(post) {
  let length = 0;
  length += (post.title || '').length;
  length += (post.excerpt || '').length;
  length += (post.content || '').length;
  length += (post.seo?.title || '').length;
  length += (post.seo?.description || '').length;
  return length;
}

/**
 * Check if translated content meets completeness threshold
 */
function validateContentCompleteness(source, translated, threshold = CONTENT_COMPLETENESS_THRESHOLD) {
  const sourceLength = getContentLength(source);
  const translatedLength = getContentLength(translated);
  const ratio = translatedLength / sourceLength;
  
  return {
    isComplete: ratio >= threshold,
    ratio,
    sourceLength,
    translatedLength,
    missingChars: sourceLength - translatedLength,
  };
}

/**
 * Synchronize image URLs from source to translated content
 * This ensures all locales use the same image paths
 */
function syncImageUrls(source, translated) {
  const result = { ...translated };
  
  // Sync featured image URL (keep same image, only translate alt)
  if (source.featuredImage?.url) {
    result.featuredImage = {
      ...result.featuredImage,
      url: source.featuredImage.url, // Force same URL
    };
    // Translate alt text if present
    if (source.featuredImage.alt && result.featuredImage) {
      // Alt should already be translated by AI, but ensure it exists
      if (!result.featuredImage.alt) {
        result.featuredImage.alt = source.featuredImage.alt;
      }
    }
  }
  
  // Sync content image URLs
  if (source.content && result.content) {
    const sourceUrls = extractImageUrls(source.content);
    
    // Replace any translated URLs back to source URLs
    let fixedContent = result.content;
    for (const url of sourceUrls) {
      // Find any variations of this URL in translated content and replace with source URL
      const urlPattern = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`src="[^"]*${urlPattern}[^"]*"`, 'g');
      fixedContent = fixedContent.replace(regex, `src="${url}"`);
    }
    result.content = fixedContent;
  }
  
  return result;
}

/**
 * Sleep helper for retry delays
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Make API call with retry logic
 */
async function callClaudeAPI(prompt, maxTokens = 16000, retryCount = 0) {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: maxTokens,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });
    
    return message;
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      console.log(`    ⚠️ API error (attempt ${retryCount + 1}/${MAX_RETRIES + 1}): ${error.message}`);
      console.log(`    Retrying in ${RETRY_DELAY_MS}ms...`);
      await sleep(RETRY_DELAY_MS * (retryCount + 1)); // Exponential backoff
      return callClaudeAPI(prompt, maxTokens, retryCount + 1);
    }
    throw error;
  }
}

/**
 * Translate blog post with validation and retries
 */
async function translateBlogPost(englishContent, targetLang, attempt = 1) {
  const config = LANGUAGE_CONFIG[targetLang];
  const maxTokens = attempt === 1 ? 16000 : 24000; // Increase tokens on retry

  const prompt = `Translate this blog post JSON from English to ${config.language}.

CRITICAL REQUIREMENTS:
1. Keep UNCHANGED (exact copy): id, slug, publishDate, modifiedDate, status, categories, tags, readingTime
2. Keep image URLs EXACTLY the same (featuredImage.url, all <img src="..."> in content) - ONLY translate alt text and captions
3. Update locale to "${config.locale}"
4. Update author.name to "${config.authorName}"
5. Translate these fields:
   - title
   - excerpt
   - content (FULL HTML - maintain ALL structure, classes, and attributes EXACTLY)
   - seo.title
   - seo.description
   - featuredImage.alt (translate the alt text)
6. Maintain ALL HTML classes, Tailwind utilities, and structure
7. Professional marketing tone appropriate for ${config.language}
8. Keep all anchor hrefs and HTML attributes identical
9. DO NOT translate image paths/URLs - use exact same paths as source

English JSON:
${JSON.stringify(englishContent, null, 2)}

Return ONLY the complete translated JSON, no explanations. Ensure content is complete and not truncated.`;

  console.log(`  Translating to ${config.language}...${attempt > 1 ? ` (retry ${attempt})` : ''}`);

  const message = await callClaudeAPI(prompt, maxTokens);
  const responseText = message.content[0].text;

  // Check for truncation indicators
  const truncationIndicators = [
    '...', '…', '[truncated]', '[cut off]', '[continued]', 
    'content continues', 'to be continued'
  ];
  const mightBeTruncated = truncationIndicators.some(indicator => 
    responseText.toLowerCase().endsWith(indicator.toLowerCase()) ||
    responseText.toLowerCase().includes('truncated') ||
    responseText.toLowerCase().includes('cut off')
  );

  if (mightBeTruncated) {
    throw new Error('Response appears to be truncated');
  }

  // Extract JSON from response
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('No valid JSON found in response');
  }

  let translated;
  try {
    translated = JSON.parse(jsonMatch[0]);
  } catch (parseError) {
    throw new Error(`JSON parse error: ${parseError.message}`);
  }

  // Sync image URLs to ensure consistency
  translated = syncImageUrls(englishContent, translated);

  // Validate content completeness
  const completeness = validateContentCompleteness(englishContent, translated);
  if (!completeness.isComplete) {
    throw new Error(
      `Content incomplete: ${(completeness.ratio * 100).toFixed(1)}% of source ` +
      `(${completeness.translatedLength}/${completeness.sourceLength} chars)`
    );
  }

  // Validate images exist
  const contentDir = path.join(__dirname, '..');
  const imageIssues = await validateImagesExist(translated, contentDir);
  if (imageIssues.length > 0 && VERBOSE) {
    console.log(`    ⚠️ Image warnings: ${imageIssues.join(', ')}`);
  }

  return translated;
}

/**
 * Validate existing translations without regenerating
 */
async function validateOnly() {
  const contentDir = path.join(__dirname, '..', 'content', 'blog');
  let totalChecked = 0;
  let issuesFound = 0;

  console.log('\n🔍 Running validation-only mode...\n');

  for (const post of TRANSLATIONS_NEEDED) {
    const englishPath = path.join(contentDir, 'en', `${post.slug}.json`);
    
    if (!fs.existsSync(englishPath)) {
      console.log(`⚠️  Skipping ${post.slug} - English file not found`);
      continue;
    }

    const englishContent = JSON.parse(fs.readFileSync(englishPath, 'utf-8'));
    console.log(`\n📄 Checking: ${post.slug}`);

    for (const lang of post.languages) {
      const translatedPath = path.join(contentDir, lang, `${post.slug}.json`);
      
      if (!fs.existsSync(translatedPath)) {
        console.log(`  ⚠️ ${lang.toUpperCase()} - MISSING`);
        issuesFound++;
        continue;
      }

      const translatedContent = JSON.parse(fs.readFileSync(translatedPath, 'utf-8'));
      const issues = [];

      // Check image URL consistency
      if (englishContent.featuredImage?.url !== translatedContent.featuredImage?.url) {
        issues.push(`Featured image URL mismatch: ${translatedContent.featuredImage?.url} !== ${englishContent.featuredImage?.url}`);
      }

      // Check content completeness
      const completeness = validateContentCompleteness(englishContent, translatedContent);
      if (!completeness.isComplete) {
        issues.push(`Content incomplete: ${(completeness.ratio * 100).toFixed(1)}%`);
      }

      // Check images exist
      const imageIssues = await validateImagesExist(translatedContent, path.join(__dirname, '..'));
      if (imageIssues.length > 0) {
        issues.push(...imageIssues);
      }

      // Check required fields
      const requiredFields = ['title', 'excerpt', 'content', 'seo.title', 'seo.description'];
      for (const field of requiredFields) {
        const value = field.includes('.') 
          ? translatedContent[field.split('.')[0]]?.[field.split('.')[1]]
          : translatedContent[field];
        if (!value || value.trim() === '') {
          issues.push(`Missing or empty field: ${field}`);
        }
      }

      totalChecked++;
      
      if (issues.length === 0) {
        console.log(`  ✓ ${lang.toUpperCase()} - valid`);
      } else {
        console.log(`  ✗ ${lang.toUpperCase()} - issues found:`);
        issues.forEach(issue => console.log(`    - ${issue}`));
        issuesFound++;
      }
    }
  }

  console.log(`\n✅ Validation complete: ${totalChecked} files checked, ${issuesFound} issues found\n`);
  return issuesFound === 0;
}

/**
 * Fix image paths in existing translations without re-translating text
 */
async function fixImages() {
  const contentDir = path.join(__dirname, '..', 'content', 'blog');
  let totalFixed = 0;
  let totalChecked = 0;

  console.log('\n🖼️  Running fix-images mode...\n');

  for (const post of TRANSLATIONS_NEEDED) {
    const englishPath = path.join(contentDir, 'en', `${post.slug}.json`);
    
    if (!fs.existsSync(englishPath)) {
      console.log(`⚠️  Skipping ${post.slug} - English file not found`);
      continue;
    }

    const englishContent = JSON.parse(fs.readFileSync(englishPath, 'utf-8'));
    console.log(`\n📄 Processing: ${post.slug}`);

    for (const lang of post.languages) {
      const translatedPath = path.join(contentDir, lang, `${post.slug}.json`);
      
      if (!fs.existsSync(translatedPath)) {
        console.log(`  ⚠️ ${lang.toUpperCase()} - file not found, skipping`);
        continue;
      }

      const translatedContent = JSON.parse(fs.readFileSync(translatedPath, 'utf-8'));
      totalChecked++;

      // Apply image URL sync
      const fixedContent = syncImageUrls(englishContent, translatedContent);

      // Check if anything changed
      const wasChanged = JSON.stringify(translatedContent) !== JSON.stringify(fixedContent);

      if (wasChanged) {
        fs.writeFileSync(translatedPath, JSON.stringify(fixedContent, null, 2));
        console.log(`  ✓ ${lang.toUpperCase()} - image paths fixed`);
        totalFixed++;
      } else {
        console.log(`  ✓ ${lang.toUpperCase()} - no changes needed`);
      }
    }
  }

  console.log(`\n✅ Fix-images complete: ${totalFixed}/${totalChecked} files updated\n`);
}

/**
 * Main translation process
 */
async function processTranslations() {
  const contentDir = path.join(__dirname, '..', 'content', 'blog');
  let completed = 0;
  let failed = 0;
  let skipped = 0;
  let total = 0;

  // Count total
  for (const post of TRANSLATIONS_NEEDED) {
    total += post.languages.length;
  }

  console.log(`\n🌍 Starting batch translation of ${total} files...\n`);

  for (const post of TRANSLATIONS_NEEDED) {
    const englishPath = path.join(contentDir, 'en', `${post.slug}.json`);

    if (!fs.existsSync(englishPath)) {
      console.log(`⚠️  Skipping ${post.slug} - English file not found`);
      skipped += post.languages.length;
      continue;
    }

    const englishContent = JSON.parse(fs.readFileSync(englishPath, 'utf-8'));
    console.log(`\n📄 Processing: ${post.slug}`);

    for (const lang of post.languages) {
      const outputPath = path.join(contentDir, lang, `${post.slug}.json`);

      // Skip if already exists (unless force mode)
      if (fs.existsSync(outputPath) && !FORCE) {
        console.log(`  ✓ ${lang.toUpperCase()} - already exists, skipping`);
        completed++;
        continue;
      }

      let success = false;
      let lastError = null;

      // Try with retries for completeness issues
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          const translated = await translateBlogPost(englishContent, lang, attempt);

          // Ensure output directory exists
          const outputDir = path.dirname(outputPath);
          if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
          }

          fs.writeFileSync(outputPath, JSON.stringify(translated, null, 2));
          success = true;
          break;
        } catch (error) {
          lastError = error;
          console.log(`    ⚠️ Attempt ${attempt} failed: ${error.message}`);
          
          if (attempt === 1 && error.message.includes('incomplete')) {
            console.log('    Retrying with higher token limit...');
            await sleep(1000);
          }
        }
      }

      if (success) {
        completed++;
        console.log(`  ✓ ${lang.toUpperCase()} - completed (${completed}/${total})`);
      } else {
        failed++;
        console.error(`  ✗ ${lang.toUpperCase()} - FAILED: ${lastError?.message}`);
      }

      // Rate limiting - wait between translations
      if (completed + failed < total) {
        await sleep(2000);
      }
    }
  }

  console.log(`\n✅ Batch translation complete: ${completed} successful, ${failed} failed, ${skipped} skipped\n`);
  
  if (failed > 0) {
    process.exit(1);
  }
}

// Main entry point
async function main() {
  if (VALIDATE_ONLY) {
    const success = await validateOnly();
    process.exit(success ? 0 : 1);
  } else if (FIX_IMAGES) {
    await fixImages();
    process.exit(0);
  } else {
    await processTranslations();
  }
}

// Run
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
