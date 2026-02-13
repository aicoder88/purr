#!/usr/bin/env tsx

import fs from 'node:fs';
import path from 'node:path';

type Locale = 'en' | 'fr' | 'es' | 'zh';

type BlogPost = {
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: string;
  tags?: string[];
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    canonical?: string;
    ogImage?: string;
  };
};

const APPLY = process.argv.includes('--apply');
const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
const REPORT_DIR = path.join(process.cwd(), 'reports');
const LOCALES: Locale[] = ['en', 'fr', 'es', 'zh'];

const TITLE_MIN = 40;
const TITLE_MAX = 70;
const DESC_MIN = 120;
const DESC_MAX = 175;
const KW_MIN = 3;
const KW_MAX = 10;

const FALLBACK_KEYWORDS: Record<Locale, string[]> = {
  en: [
    'cat litter odor control',
    'activated carbon litter additive',
    'unscented litter deodorizer',
  ],
  fr: [
    'contrôle odeur litière chat',
    'additif litière charbon actif',
    'désodorisant litière sans parfum',
  ],
  es: [
    'control de olor arena para gatos',
    'aditivo de carbon activado para arena',
    'desodorante de arena sin fragancia',
  ],
  zh: [
    '猫砂除臭控制',
    '活性炭猫砂添加剂',
    '无香猫砂除臭',
  ],
};

const DESC_SUFFIX: Record<Locale, string> = {
  en: 'Get practical steps to keep your home fresh with a repeatable, cat-safe routine.',
  fr: 'Découvrez des étapes concrètes pour garder votre maison fraîche avec une routine sûre et régulière.',
  es: 'Aprende pasos claros para mantener tu hogar fresco con una rutina segura y constante.',
  zh: '查看可执行步骤，用稳定且安全的方式持续保持居家清新。',
};

const TITLE_SUFFIX: Record<Locale, string> = {
  en: 'Purrify Guide',
  fr: 'Guide Purrify',
  es: 'Guia Purrify',
  zh: 'Purrify 指南',
};

function stripHtml(input: string): string {
  return input.replaceAll(/<[^>]+>/g, ' ').replaceAll(/\s+/g, ' ').trim();
}

function trimToMax(input: string, max: number, locale: Locale): string {
  const text = input.replaceAll(/\s+/g, ' ').trim();
  if (text.length <= max) return text;

  if (locale === 'zh') {
    return `${text.slice(0, max - 1).trim()}…`;
  }

  const sliced = text.slice(0, max - 1);
  const boundary = sliced.lastIndexOf(' ');
  if (boundary > Math.floor(max * 0.6)) {
    return `${sliced.slice(0, boundary).trim()}…`;
  }
  return `${sliced.trim()}…`;
}

function ensureMinLength(input: string, min: number, appendPool: string[], locale: Locale): string {
  let out = input.trim();
  let index = 0;
  while (out.length < min && index < appendPool.length) {
    out = `${out} ${appendPool[index]}`.replaceAll(/\s+/g, ' ').trim();
    index += 1;
  }

  // If still short (rare), repeat the last tokenized addition.
  while (out.length < min && appendPool.length > 0) {
    out = `${out} ${appendPool[appendPool.length - 1]}`.replaceAll(/\s+/g, ' ').trim();
  }

  if (out.length > TITLE_MAX && min === TITLE_MIN) {
    return trimToMax(out, TITLE_MAX, locale);
  }
  if (out.length > DESC_MAX && min === DESC_MIN) {
    return trimToMax(out, DESC_MAX, locale);
  }
  return out;
}

function slugToPhrase(slug: string): string {
  return slug.replaceAll('-', ' ').trim();
}

function normalizeKeywords(post: BlogPost, locale: Locale): { value: string[]; changed: boolean } {
  const existing = post.seo?.keywords ?? [];
  const candidate = [...existing, ...(post.tags ?? []), slugToPhrase(post.slug ?? '')]
    .map((k) => k.trim())
    .filter(Boolean);

  const deduped: string[] = [];
  const seen = new Set<string>();
  for (const k of candidate) {
    const key = k.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(k);
  }

  for (const fallback of FALLBACK_KEYWORDS[locale]) {
    if (deduped.length >= KW_MIN) break;
    const key = fallback.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      deduped.push(fallback);
    }
  }

  const normalized = deduped.slice(0, KW_MAX);
  const changed =
    normalized.length !== existing.length ||
    normalized.some((k, i) => k !== existing[i]);

  return { value: normalized, changed };
}

function normalizeTitle(post: BlogPost, locale: Locale): { value: string; changed: boolean } {
  const current = (post.seo?.title ?? '').trim();
  const base = current || post.title?.trim() || slugToPhrase(post.slug ?? '');
  const primaryKeyword = post.seo?.keywords?.[0]?.trim() || '';

  let title = base;
  if (title.length > TITLE_MAX) {
    title = trimToMax(title, TITLE_MAX, locale);
  }
  if (title.length < TITLE_MIN) {
    title = ensureMinLength(
      title,
      TITLE_MIN,
      [primaryKeyword, TITLE_SUFFIX[locale]].filter(Boolean),
      locale
    );
  }
  if (title.length > TITLE_MAX) {
    title = trimToMax(title, TITLE_MAX, locale);
  }

  return { value: title, changed: title !== current };
}

function normalizeDescription(post: BlogPost, locale: Locale): { value: string; changed: boolean } {
  const current = stripHtml(post.seo?.description ?? '');
  const excerpt = stripHtml(post.excerpt ?? '');
  const contentLead = stripHtml(post.content ?? '').slice(0, 220);

  let desc = current || excerpt || contentLead;
  desc = desc.replaceAll(/\s+/g, ' ').trim();
  if (!desc) desc = DESC_SUFFIX[locale];

  if (desc.length < DESC_MIN) {
    const source = excerpt || contentLead || desc;
    desc = ensureMinLength(
      source,
      DESC_MIN,
      [DESC_SUFFIX[locale], 'Purrify'],
      locale
    );
  }
  if (desc.length > DESC_MAX) {
    desc = trimToMax(desc, DESC_MAX, locale);
  }

  return { value: desc, changed: desc !== current };
}

function main(): void {
  let scanned = 0;
  let changed = 0;
  const byLocale = { en: 0, fr: 0, es: 0, zh: 0 } as Record<Locale, number>;
  const detail: string[] = [];

  for (const locale of LOCALES) {
    const localeDir = path.join(BLOG_DIR, locale);
    const files = fs.readdirSync(localeDir).filter((f) => f.endsWith('.json'));

    for (const file of files) {
      scanned += 1;
      const filePath = path.join(localeDir, file);
      const original = fs.readFileSync(filePath, 'utf-8');
      const post = JSON.parse(original) as BlogPost;
      post.seo ??= {};

      const changedFields: string[] = [];

      const keywordNorm = normalizeKeywords(post, locale);
      if (keywordNorm.changed) {
        post.seo.keywords = keywordNorm.value;
        changedFields.push('keywords');
      }

      const titleNorm = normalizeTitle(post, locale);
      if (titleNorm.changed) {
        post.seo.title = titleNorm.value;
        changedFields.push('title');
      }

      const descNorm = normalizeDescription(post, locale);
      if (descNorm.changed) {
        post.seo.description = descNorm.value;
        changedFields.push('description');
      }

      if (!post.seo.canonical && post.slug) {
        post.seo.canonical = `https://www.purrify.ca/${locale}/blog/${post.slug}`;
        changedFields.push('canonical');
      }

      const next = `${JSON.stringify(post, null, 2)}\n`;
      if (next !== original) {
        changed += 1;
        byLocale[locale] += 1;
        detail.push(`${locale}/${file.replace('.json', '')}: ${changedFields.join(', ')}`);
        if (APPLY) {
          fs.writeFileSync(filePath, next, 'utf-8');
        }
      }
    }
  }

  fs.mkdirSync(REPORT_DIR, { recursive: true });
  const reportPath = path.join(REPORT_DIR, `blog-seo-normalization-${Date.now()}.md`);
  const lines = [
    '# Blog SEO Normalization Report',
    '',
    `- Generated: ${new Date().toISOString()}`,
    `- Mode: ${APPLY ? 'apply' : 'dry-run'}`,
    `- Posts scanned: ${scanned}`,
    `- Posts changed: ${changed}`,
    `- Changed by locale: en=${byLocale.en}, fr=${byLocale.fr}, es=${byLocale.es}, zh=${byLocale.zh}`,
    '',
    '## Changes',
    ...detail.map((d) => `- ${d}`),
  ];
  fs.writeFileSync(reportPath, `${lines.join('\n')}\n`, 'utf-8');

  console.log(`Scanned: ${scanned}`);
  console.log(`Posts changed: ${changed}`);
  console.log(`Changed by locale: en=${byLocale.en}, fr=${byLocale.fr}, es=${byLocale.es}, zh=${byLocale.zh}`);
  console.log(`Report: ${reportPath}`);
}

main();
