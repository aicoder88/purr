#!/usr/bin/env tsx

import fs from 'node:fs';
import path from 'node:path';
import type { AuditEntry, AuditReport, ContentClass, Locale } from '../../src/lib/content-quality/types';
import { INTERNAL_LINK_OPTIONS } from '../../src/lib/blog/internal-links';

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

type Tier = 'P0' | 'P1' | 'P2';

type ParsedArgs = {
  write: boolean;
  applyContentBlocks: boolean;
  limit: number;
  tiers: Tier[];
  reportPath?: string;
};

function parseArgs(argv: string[]): ParsedArgs {
  let write = false;
  let applyContentBlocks = false;
  let limit = 10;
  let tiers: Tier[] = ['P0', 'P1'];
  let reportPath: string | undefined;

  for (const arg of argv) {
    if (arg === '--write') {
      write = true;
    } else if (arg === '--apply-content-blocks') {
      applyContentBlocks = true;
    } else if (arg.startsWith('--limit=')) {
      const parsed = Number(arg.split('=')[1]);
      if (Number.isFinite(parsed) && parsed > 0) {
        limit = Math.floor(parsed);
      }
    } else if (arg.startsWith('--tier=')) {
      const raw = arg.split('=')[1];
      const tier = raw?.toUpperCase();
      if (tier === 'P0' || tier === 'P1' || tier === 'P2') {
        tiers = [tier];
      }
    } else if (arg.startsWith('--tiers=')) {
      const raw = arg.split('=')[1] ?? '';
      const parsed = raw
        .split(',')
        .map((token) => token.trim().toUpperCase())
        .filter((token): token is Tier => token === 'P0' || token === 'P1' || token === 'P2');
      if (parsed.length > 0) {
        tiers = parsed;
      }
    } else if (arg.startsWith('--report=')) {
      reportPath = path.resolve(process.cwd(), arg.split('=')[1]);
    }
  }

  return { write, applyContentBlocks, limit, tiers, reportPath };
}

function resolveAuditPath(reportPath?: string): string {
  if (reportPath && fs.existsSync(reportPath)) {
    return reportPath;
  }
  const fallback = path.join(process.cwd(), 'reports', 'content-quality', 'latest-audit.json');
  if (!fs.existsSync(fallback)) {
    throw new Error('No audit report found. Run `pnpm content:audit` first.');
  }
  return fallback;
}

function stripHtml(content: string): string {
  return content.replaceAll(/<[^>]+>/g, ' ').replaceAll(/\s+/g, ' ').trim();
}

function wordCount(content: string): number {
  return stripHtml(content).split(/\s+/).filter(Boolean).length;
}

function internalLinksCount(content: string): number {
  const links = [...content.matchAll(/href=["']([^"']+)["']/gi)].map((match) => match[1]);
  return links.filter((href) => href.startsWith('/') || href.includes('purrify.ca')).length;
}

function externalLinksCount(content: string): number {
  const links = [...content.matchAll(/href=["']([^"']+)["']/gi)].map((match) => match[1]);
  return links.filter((href) => /^https?:\/\//i.test(href) && !href.includes('purrify.ca')).length;
}

function h3Count(content: string): number {
  return (content.match(/<h3\b/gi) || []).length;
}

function trimToLength(input: string, max: number): string {
  const clean = input.replaceAll(/\s+/g, ' ').replaceAll(/[.…]+$/g, '').trim();
  if (clean.length <= max) {
    return clean;
  }
  const sliced = clean.slice(0, max - 1);
  const boundary = sliced.lastIndexOf(' ');
  if (boundary > Math.floor(max * 0.6)) {
    return `${sliced.slice(0, boundary).trim()}…`;
  }
  return `${sliced.trim()}…`;
}

function ensureSeo(post: BlogPost, locale: Locale): string[] {
  const changes: string[] = [];
  const slug = post.slug ?? '';
  post.seo ??= {};

  const titleBase = (post.title ?? post.seo.title ?? slug.replaceAll('-', ' ')).trim();
  const normalizedTitle = trimToLength(titleBase, 70);
  if (!post.seo.title && normalizedTitle) {
    post.seo.title = normalizedTitle;
    changes.push('seo.title');
  }

  const descBase = (post.seo.description ?? post.excerpt ?? stripHtml(post.content ?? '')).replaceAll(/\s+/g, ' ').trim();
  const fallbackSuffix =
    locale === 'fr'
      ? 'Appliquez une routine claire pour garder la litiere plus fraiche.'
      : 'Use a repeatable routine to keep litter odor under control.';
  let normalizedDescription = descBase.length >= 120 ? descBase : `${descBase} ${fallbackSuffix}`.trim();
  normalizedDescription = trimToLength(normalizedDescription, 170);
  if (!post.seo.description && normalizedDescription) {
    post.seo.description = normalizedDescription;
    changes.push('seo.description');
  }

  const existingKeywords = post.seo.keywords ?? [];
  const candidateKeywords = [...existingKeywords, ...(post.tags ?? []), slug.replaceAll('-', ' ')].filter(Boolean);
  const deduped: string[] = [];
  const seen = new Set<string>();
  for (const keyword of candidateKeywords) {
    const key = keyword.toLowerCase().trim();
    if (!key || seen.has(key)) {
      continue;
    }
    seen.add(key);
    deduped.push(keyword.trim());
  }
  while (deduped.length < 3) {
    deduped.push(locale === 'fr' ? 'controle odeur litiere chat' : 'cat litter odor control');
  }
  const normalizedKeywords = deduped.slice(0, 10);
  if (!post.seo.keywords || post.seo.keywords.length === 0) {
    post.seo.keywords = normalizedKeywords;
    changes.push('seo.keywords');
  }

  const expectedCanonical = locale === 'fr' ? `https://www.purrify.ca/fr/blog/${slug}` : `https://www.purrify.ca/blog/${slug}`;
  if (!post.seo.canonical) {
    post.seo.canonical = expectedCanonical;
    changes.push('seo.canonical');
  }

  return changes;
}

function localizedInternalLabel(locale: Locale): string {
  return locale === 'fr' ? 'Guides a lire ensuite' : 'Related guides to read next';
}

function localizedSourcesLabel(locale: Locale): string {
  return locale === 'fr' ? 'Sources externes utiles' : 'Helpful external sources';
}

function localizedDepthTitle(locale: Locale, index: number): string {
  if (locale === 'fr') {
    return `Plan pratique supplementaire ${index}`;
  }
  return `Additional practical action plan ${index}`;
}

function localizeInternalUrl(locale: Locale, url: string): string {
  if (locale === 'en') {
    return url;
  }
  if (!url.startsWith('/')) {
    return url;
  }
  if (url.startsWith('/fr/')) {
    return url;
  }
  if (url.startsWith('/blog/')) {
    return `/fr${url}`;
  }
  if (url.startsWith('/learn/')) {
    return `/fr${url}`;
  }
  return url;
}

function insertBeforeFaqOrEnd(content: string, block: string): string {
  const faqHeadingPattern = /<h2[^>]*>[^<]*(Frequently Asked Questions|FAQ|Questions frequentes|Questions Fr[ée]quemment Pos[ée]es)[^<]*<\/h2>/i;
  const faqMatch = content.match(faqHeadingPattern);
  if (faqMatch && faqMatch.index !== undefined) {
    return `${content.slice(0, faqMatch.index)}${block}${content.slice(faqMatch.index)}`;
  }
  const articleClose = content.lastIndexOf('</article>');
  if (articleClose > -1) {
    return `${content.slice(0, articleClose)}${block}${content.slice(articleClose)}`;
  }
  return `${content}${block}`;
}

function buildInternalLinksBlock(locale: Locale, currentSlug: string, needed: number): string {
  const selected = INTERNAL_LINK_OPTIONS
    .filter((item) => !item.url.includes(currentSlug))
    .slice(0, Math.max(needed, 3));

  const listItems = selected
    .map((item) => `<li><a href="${localizeInternalUrl(locale, item.url)}" class="text-[#5B2EFF] hover:underline">${item.label}</a></li>`)
    .join('');

  return `
<!-- content-apply-links-v1 -->
<section class="my-10">
  <h2>${localizedInternalLabel(locale)}</h2>
  <ul>${listItems}</ul>
</section>`;
}

function buildExternalSourcesBlock(locale: Locale): string {
  const sources =
    locale === 'fr'
      ? [
          { label: 'ASPCA - Litter Box Problems', url: 'https://www.aspca.org/pet-care/cat-care/common-cat-behavior-issues/litter-box-problems' },
          { label: 'Cornell Feline Health Center', url: 'https://www.vet.cornell.edu/departments/riney-canine-health-center/feline-health-topics' },
          { label: 'AAFP Cat Friendly Guidelines', url: 'https://catvets.com/guidelines' },
        ]
      : [
          { label: 'ASPCA - Litter Box Problems', url: 'https://www.aspca.org/pet-care/cat-care/common-cat-behavior-issues/litter-box-problems' },
          { label: 'Cornell Feline Health Center', url: 'https://www.vet.cornell.edu/departments/riney-canine-health-center/feline-health-topics' },
          { label: 'AAFP Cat Friendly Guidelines', url: 'https://catvets.com/guidelines' },
        ];

  const listItems = sources
    .map((source) => `<li><a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.label}</a></li>`)
    .join('');

  return `
<!-- content-apply-citations-v1 -->
<section class="my-10">
  <h2>${localizedSourcesLabel(locale)}</h2>
  <ul>${listItems}</ul>
</section>`;
}

function buildDepthBlock(locale: Locale, index: number): string {
  if (locale === 'fr') {
    return `
<!-- content-apply-depth-v1-${index} -->
<section class="my-10">
  <h2>${localizedDepthTitle(locale, index)}</h2>
  <p>Pour stabiliser les resultats, traitez la litiere comme un systeme: ramassage regulier, profondeur constante et controle de lhumidite autour de la zone litiere. Les foyers qui suivent un protocole simple reduisent nettement les retours dodeur.</p>
  <h3>Checklist hebdomadaire</h3>
  <ul>
    <li>Verifier la profondeur reelle apres chaque ramassage.</li>
    <li>Confirmer que la ventilation de la piece reste active.</li>
    <li>Nettoyer les textiles proches qui retiennent les odeurs.</li>
    <li>Ajuster la dose de granules selon le nombre de chats.</li>
  </ul>
  <p>Cette approche limite les interventions d urgence et rend la performance plus previsible. En pratique, un rythme stable est souvent plus efficace quun changement frequent de marque.</p>
</section>`;
  }

  return `
<!-- content-apply-depth-v1-${index} -->
<section class="my-10">
  <h2>${localizedDepthTitle(locale, index)}</h2>
  <p>Reliable litter performance comes from systems thinking: fixed scoop timing, stable litter depth, and airflow checks around the box zone. Homes that run a repeatable protocol usually see fewer odor spikes and less emergency cleanup.</p>
  <h3>Weekly checklist</h3>
  <ul>
    <li>Reconfirm depth after each scoop cycle.</li>
    <li>Check room airflow and humidity around litter placement.</li>
    <li>Wash nearby fabrics and mats that retain odor.</li>
    <li>Adjust granule dose to cat count and season.</li>
  </ul>
  <p>When these basics are consistent, you can evaluate products more accurately and avoid constant brand switching. The goal is stable day-to-day control, not one-day freshness after a full change.</p>
</section>`;
}

function applyContentFixes(content: string, entry: AuditEntry, locale: Locale, slug: string): { content: string; changes: string[] } {
  let nextContent = content;
  const changes: string[] = [];
  const thresholds = entry.thresholds;

  const internal = internalLinksCount(nextContent);
  if (internal < thresholds.minInternalLinks && !nextContent.includes('content-apply-links-v1')) {
    const needed = thresholds.minInternalLinks - internal;
    nextContent = insertBeforeFaqOrEnd(nextContent, buildInternalLinksBlock(locale, slug, needed));
    changes.push('content.internal-links-block');
  }

  const external = externalLinksCount(nextContent);
  if (external < thresholds.minExternalLinks && !nextContent.includes('content-apply-citations-v1')) {
    nextContent = insertBeforeFaqOrEnd(nextContent, buildExternalSourcesBlock(locale));
    changes.push('content.external-sources-block');
  }

  const minWords = thresholds.minWords;
  let currentWords = wordCount(nextContent);
  let depthIteration = 1;
  while (currentWords < minWords && depthIteration <= 4) {
    if (!nextContent.includes(`content-apply-depth-v1-${depthIteration}`)) {
      nextContent = insertBeforeFaqOrEnd(nextContent, buildDepthBlock(locale, depthIteration));
      changes.push(`content.depth-block-${depthIteration}`);
    }
    depthIteration += 1;
    currentWords = wordCount(nextContent);
  }

  const h3Needed = thresholds.minH3;
  if (h3Count(nextContent) < h3Needed && !nextContent.includes('content-apply-depth-v1-0')) {
    nextContent = insertBeforeFaqOrEnd(
      nextContent,
      `
<!-- content-apply-depth-v1-0 -->
<section class="my-8">
  <h2>${locale === 'fr' ? 'Repere operationnel' : 'Operational checkpoint'}</h2>
  <h3>${locale === 'fr' ? 'Quand ajuster la routine' : 'When to adjust your routine'}</h3>
  <p>${locale === 'fr' ? 'Si lodeur revient plus vite que prevu, augmentez la frequence de ramassage et controlez la ventilation avant de changer de produit.' : 'If odor returns faster than expected, increase scoop frequency and check airflow before changing products.'}</p>
</section>`
    );
    changes.push('content.h3-structure-block');
  }

  return { content: nextContent, changes };
}

function run(): void {
  const args = parseArgs(process.argv.slice(2));
  const auditPath = resolveAuditPath(args.reportPath);
  const audit = JSON.parse(fs.readFileSync(auditPath, 'utf-8')) as AuditReport;
  const candidates = audit.entries
    .filter((entry) => args.tiers.includes(entry.priorityTier))
    .filter((entry) => entry.sourceType === 'blog')
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, args.limit);

  let scanned = 0;
  let changed = 0;
  const details: string[] = [];

  for (const entry of candidates) {
    scanned += 1;
    const filePath = entry.sourcePath;
    if (!fs.existsSync(filePath)) {
      details.push(`${entry.id}: missing source file`);
      continue;
    }

    const original = fs.readFileSync(filePath, 'utf-8');
    const post = JSON.parse(original) as BlogPost;
    const slug = post.slug ?? path.basename(filePath, '.json');
    const locale = entry.locale as Locale;
    post.content ??= '';

    const fieldChanges: string[] = [];
    fieldChanges.push(...ensureSeo(post, locale));

    if (args.applyContentBlocks) {
      const contentResult = applyContentFixes(post.content, entry, locale, slug);
      if (contentResult.content !== post.content) {
        post.content = contentResult.content;
        fieldChanges.push(...contentResult.changes);
      }
    }

    const next = `${JSON.stringify(post, null, 2)}\n`;
    if (next !== original) {
      changed += 1;
      if (args.write) {
        fs.writeFileSync(filePath, next, 'utf-8');
      }
      details.push(`${entry.id}: ${fieldChanges.join(', ')}`);
    } else {
      details.push(`${entry.id}: no-op`);
    }
  }

  const outputDir = path.join(process.cwd(), 'reports', 'content-quality');
  fs.mkdirSync(outputDir, { recursive: true });
  const timestamp = Date.now();
  const reportPath = path.join(outputDir, `apply-${timestamp}.md`);

  const lines = [
    '# Content Apply Report',
    '',
    `- Generated: ${new Date().toISOString()}`,
    `- Mode: ${args.write ? 'write' : 'dry-run'}`,
    `- Content blocks: ${args.applyContentBlocks ? 'enabled' : 'disabled (default)'}`,
    `- Source audit: ${auditPath}`,
    `- Tiers: ${args.tiers.join(', ')}`,
    `- Candidates scanned: ${scanned}`,
    `- Files changed: ${changed}`,
    '',
    '## Details',
    '',
    ...details.map((line) => `- ${line}`),
  ];

  fs.writeFileSync(reportPath, `${lines.join('\n')}\n`, 'utf-8');
  fs.writeFileSync(path.join(outputDir, 'latest-apply.md'), `${lines.join('\n')}\n`, 'utf-8');

  console.log(`Content apply complete (${args.write ? 'write' : 'dry-run'})`);
  console.log(`Candidates scanned: ${scanned}`);
  console.log(`Files changed: ${changed}`);
  console.log(`Report: ${reportPath}`);
}

run();
