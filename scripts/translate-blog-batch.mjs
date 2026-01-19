#!/usr/bin/env node

import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const TRANSLATIONS_NEEDED = [
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

async function translateBlogPost(englishContent, targetLang) {
  const config = LANGUAGE_CONFIG[targetLang];

  const prompt = `Translate this blog post JSON from English to ${config.language}.

CRITICAL REQUIREMENTS:
1. Keep UNCHANGED: id, slug, publishDate, modifiedDate, status, featuredImage (entire object), categories, tags, readingTime
2. Update locale to "${config.locale}"
3. Update author.name to "${config.authorName}"
4. Translate these fields:
   - title
   - excerpt
   - content (FULL HTML - maintain ALL structure, classes, and attributes EXACTLY)
   - seo.title
   - seo.description
5. Maintain ALL HTML classes, Tailwind utilities, image paths, and structure
6. Professional marketing tone appropriate for ${config.language}
7. Keep all anchor hrefs, image src paths, and HTML attributes identical

English JSON:
${JSON.stringify(englishContent, null, 2)}

Return ONLY the complete translated JSON, no explanations.`;

  console.log(`  Translating to ${config.language}...`);

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 16000,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const responseText = message.content[0].text;

  // Extract JSON from response (in case there's any surrounding text)
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('No valid JSON found in response');
  }

  return JSON.parse(jsonMatch[0]);
}

async function processTranslations() {
  const contentDir = path.join(__dirname, '..', 'content', 'blog');
  let completed = 0;
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
      continue;
    }

    const englishContent = JSON.parse(fs.readFileSync(englishPath, 'utf-8'));
    console.log(`\n📄 Processing: ${post.slug}`);

    for (const lang of post.languages) {
      const outputPath = path.join(contentDir, lang, `${post.slug}.json`);

      // Skip if already exists
      if (fs.existsSync(outputPath)) {
        console.log(`  ✓ ${lang.toUpperCase()} - already exists, skipping`);
        completed++;
        continue;
      }

      try {
        const translated = await translateBlogPost(englishContent, lang);

        // Ensure output directory exists
        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        fs.writeFileSync(outputPath, JSON.stringify(translated, null, 2));
        completed++;
        console.log(`  ✓ ${lang.toUpperCase()} - completed (${completed}/${total})`);

        // Rate limiting - wait 2 seconds between translations
        if (completed < total) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      } catch (error) {
        console.error(`  ✗ ${lang.toUpperCase()} - ERROR:`, error.message);
      }
    }
  }

  console.log(`\n✅ Batch translation complete: ${completed}/${total} files\n`);
}

// Run
processTranslations().catch(console.error);
