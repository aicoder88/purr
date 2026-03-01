import fs from 'node:fs';
import path from 'node:path';
import { parse as parseCsv } from 'csv-parse/sync';
import { CORE_LEARN_ROUTES, CONTENT_THRESHOLDS } from './config';
import type {
  AuditEntry,
  AuditOptions,
  AuditReport,
  ContentClass,
  GscMetrics,
  Locale,
  PageMetrics,
  Recommendation,
  ScoreBreakdown,
} from './types';
import { GUIDE_COPY, type GuideCopy } from '../../../app/learn/cat-litter-guide/components/GuideCopy';

type BlogPostFile = {
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: string;
  status?: string;
  publishDate?: string;
  modifiedDate?: string;
  featuredImage?: { url?: string; alt?: string };
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    canonical?: string;
    ogImage?: string;
  };
};

type GscMap = Map<string, GscMetrics>;

const CONTENT_ROOT = path.join(process.cwd(), 'content', 'blog');
const LEARN_COMPONENT_PATHS = [
  path.join(process.cwd(), 'app', 'learn', 'cat-litter-guide', 'CatLitterGuidePageContent.tsx'),
  path.join(process.cwd(), 'app', 'learn', 'cat-litter-guide', 'components', 'HeroSection.tsx'),
  path.join(process.cwd(), 'app', 'learn', 'cat-litter-guide', 'components', 'LitterTypesSection.tsx'),
  path.join(process.cwd(), 'app', 'learn', 'cat-litter-guide', 'components', 'MaintenanceSection.tsx'),
  path.join(process.cwd(), 'app', 'learn', 'cat-litter-guide', 'components', 'ProblemsSection.tsx'),
  path.join(process.cwd(), 'app', 'learn', 'cat-litter-guide', 'components', 'CTASection.tsx'),
];

function normalizePathUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) {
    return '/';
  }

  try {
    const parsed = new URL(trimmed);
    return parsed.pathname.endsWith('/') ? parsed.pathname : `${parsed.pathname}/`;
  } catch {
    return trimmed.endsWith('/') ? trimmed : `${trimmed}/`;
  }
}

function stripHtml(html: string): string {
  return html
    .replaceAll(/<script[\s\S]*?<\/script>/gi, ' ')
    .replaceAll(/<style[\s\S]*?<\/style>/gi, ' ')
    .replaceAll(/<[^>]+>/g, ' ')
    .replaceAll(/&nbsp;/g, ' ')
    .replaceAll(/&amp;/g, '&')
    .replaceAll(/\s+/g, ' ')
    .trim();
}

function countWordsFromText(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

function countHtmlTag(html: string, tag: string): number {
  const regex = new RegExp(`<${tag}\\b`, 'gi');
  return (html.match(regex) || []).length;
}

function countLinks(html: string): { internal: number; external: number } {
  const links = [...html.matchAll(/href=["']([^"']+)["']/gi)].map((match) => match[1]);
  let internal = 0;
  let external = 0;
  for (const href of links) {
    if (!href) {
      continue;
    }
    if (href.startsWith('/') || href.includes('purrify.ca')) {
      internal += 1;
      continue;
    }
    if (/^https?:\/\//i.test(href)) {
      external += 1;
    }
  }
  return { internal, external };
}

function maxWordsBetweenImages(html: string): number {
  const segments = html.split(/<img\b[^>]*>/gi).map((segment) => countWordsFromText(stripHtml(segment)));
  if (segments.length === 0) {
    return 0;
  }
  return Math.max(...segments);
}

function inferBlogContentClass(slug: string): ContentClass {
  const lowered = slug.toLowerCase();
  if (lowered.includes('-vs-') || lowered.includes('comparison')) {
    return 'comparison';
  }
  if (
    lowered.startsWith('how-') ||
    lowered.includes('guide') ||
    lowered.includes('how-to') ||
    lowered.includes('how-often')
  ) {
    return 'how_to';
  }
  return 'quick_answer';
}

function scoreWordCount(words: number, minWords: number, maxWords: number): number {
  if (words >= minWords && words <= maxWords) {
    return 100;
  }
  if (words < minWords) {
    return Math.max(0, Math.round((words / minWords) * 100));
  }
  const overRatio = words / maxWords;
  if (overRatio <= 1.2) {
    return Math.max(70, Math.round(100 - ((overRatio - 1) * 150)));
  }
  if (overRatio <= 1.5) {
    return Math.max(45, Math.round(70 - ((overRatio - 1.2) * 83)));
  }
  return 30;
}

function ratioScore(actual: number, target: number): number {
  if (target <= 0) {
    return 100;
  }
  return Math.max(0, Math.min(100, Math.round((actual / target) * 100)));
}

function scoreHeadings(metrics: PageMetrics, contentClass: ContentClass): number {
  const thresholds = CONTENT_THRESHOLDS[contentClass];
  const h2Score = ratioScore(metrics.h2, thresholds.minH2);
  const h3Score = ratioScore(metrics.h3, thresholds.minH3);
  return Math.round((h2Score * 0.7) + (h3Score * 0.3));
}

function scoreMediaDistribution(metrics: PageMetrics, contentClass: ContentClass): number {
  const thresholds = CONTENT_THRESHOLDS[contentClass];
  const imageCountScore = ratioScore(metrics.inlineImages, thresholds.minInlineImages);
  const spacingScore =
    metrics.maxWordsBetweenImages <= thresholds.maxWordsBetweenImages
      ? 100
      : Math.max(
          20,
          Math.round((thresholds.maxWordsBetweenImages / Math.max(1, metrics.maxWordsBetweenImages)) * 100)
        );
  return Math.round((imageCountScore * 0.7) + (spacingScore * 0.3));
}

function scoreLinks(metrics: PageMetrics, contentClass: ContentClass): number {
  const thresholds = CONTENT_THRESHOLDS[contentClass];
  const internalScore = ratioScore(metrics.internalLinks, thresholds.minInternalLinks);
  const externalScore = ratioScore(metrics.externalLinks, thresholds.minExternalLinks);
  return Math.round((internalScore * 0.7) + (externalScore * 0.3));
}

function scoreLayoutReadability(metrics: PageMetrics): number {
  const paragraphScore = metrics.paragraphs >= 8 ? 100 : ratioScore(metrics.paragraphs, 8);
  const listTableSignal = metrics.listCount + metrics.tableCount;
  const listTableScore = listTableSignal >= 3 ? 100 : ratioScore(listTableSignal, 3);
  const calloutScore = metrics.calloutCount > 0 ? 100 : 50;
  return Math.round((paragraphScore * 0.5) + (listTableScore * 0.35) + (calloutScore * 0.15));
}

function scoreSeoMetadata(post: BlogPostFile | null): number {
  if (!post) {
    return 60;
  }
  const title = (post.seo?.title ?? post.title ?? '').trim();
  const description = (post.seo?.description ?? post.excerpt ?? '').trim();
  const keywords = post.seo?.keywords ?? [];
  const canonical = (post.seo?.canonical ?? '').trim();

  const titleScore = title.length >= 45 && title.length <= 70 ? 100 : ratioScore(title.length, 45);
  const descScore = description.length >= 120 && description.length <= 175 ? 100 : ratioScore(description.length, 120);
  const keywordScore = keywords.length >= 3 && keywords.length <= 10 ? 100 : ratioScore(keywords.length, 3);
  const canonicalScore = canonical.length > 0 ? 100 : 40;

  return Math.round((titleScore * 0.3) + (descScore * 0.3) + (keywordScore * 0.25) + (canonicalScore * 0.15));
}

function buildScoreBreakdown(
  metrics: PageMetrics,
  contentClass: ContentClass,
  seoMetadataScore: number
): ScoreBreakdown {
  const wordCount = scoreWordCount(
    metrics.words,
    CONTENT_THRESHOLDS[contentClass].minWords,
    CONTENT_THRESHOLDS[contentClass].maxWords
  );
  const headings = scoreHeadings(metrics, contentClass);
  const mediaDistribution = scoreMediaDistribution(metrics, contentClass);
  const links = scoreLinks(metrics, contentClass);
  const layoutReadability = scoreLayoutReadability(metrics);
  const seoMetadata = seoMetadataScore;
  const overall = Math.round(
    (wordCount * 0.30) +
      (headings * 0.18) +
      (mediaDistribution * 0.18) +
      (links * 0.14) +
      (layoutReadability * 0.10) +
      (seoMetadata * 0.10)
  );

  return {
    overall,
    wordCount,
    headings,
    mediaDistribution,
    links,
    layoutReadability,
    seoMetadata,
  };
}

function recommendationPriority(score: number): 'high' | 'medium' | 'low' {
  if (score < 55) {
    return 'high';
  }
  if (score < 75) {
    return 'medium';
  }
  return 'low';
}

function buildRecommendations(
  metrics: PageMetrics,
  contentClass: ContentClass,
  score: ScoreBreakdown
): Recommendation[] {
  const recommendations: Recommendation[] = [];
  const thresholds = CONTENT_THRESHOLDS[contentClass];

  if (metrics.words < thresholds.minWords) {
    recommendations.push({
      category: 'content_depth',
      priority: recommendationPriority(score.wordCount),
      message: `Expand to at least ${thresholds.minWords} words (current ${metrics.words}).`,
      autoFixCandidate: false,
    });
  }

  if (metrics.h2 < thresholds.minH2 || metrics.h3 < thresholds.minH3) {
    recommendations.push({
      category: 'structure',
      priority: recommendationPriority(score.headings),
      message: `Increase heading depth to at least ${thresholds.minH2} H2 and ${thresholds.minH3} H3.`,
      autoFixCandidate: false,
    });
  }

  if (metrics.inlineImages < thresholds.minInlineImages) {
    recommendations.push({
      category: 'image_layout',
      priority: recommendationPriority(score.mediaDistribution),
      message: `Add inline visuals to reach ${thresholds.minInlineImages}+ inline images.`,
      autoFixCandidate: true,
    });
  }

  if (metrics.maxWordsBetweenImages > thresholds.maxWordsBetweenImages) {
    recommendations.push({
      category: 'layout',
      priority: recommendationPriority(score.mediaDistribution),
      message: `Reduce text walls: keep image spacing under ${thresholds.maxWordsBetweenImages} words (current max ${metrics.maxWordsBetweenImages}).`,
      autoFixCandidate: false,
    });
  }

  if (metrics.internalLinks < thresholds.minInternalLinks || metrics.externalLinks < thresholds.minExternalLinks) {
    recommendations.push({
      category: 'linking',
      priority: recommendationPriority(score.links),
      message: `Raise linking depth to ${thresholds.minInternalLinks}+ internal and ${thresholds.minExternalLinks}+ external links.`,
      autoFixCandidate: true,
    });
  }

  if (score.seoMetadata < 75) {
    recommendations.push({
      category: 'seo_meta',
      priority: recommendationPriority(score.seoMetadata),
      message: 'Normalize SEO title, description, keyword set, and canonical field quality.',
      autoFixCandidate: true,
    });
  }

  if (score.layoutReadability < 70) {
    recommendations.push({
      category: 'layout',
      priority: recommendationPriority(score.layoutReadability),
      message: 'Improve readability cadence using lists, tables/callouts, and shorter paragraph blocks.',
      autoFixCandidate: false,
    });
  }

  return recommendations.sort((a, b) => {
    const ranking = { high: 0, medium: 1, low: 2 };
    return ranking[a.priority] - ranking[b.priority];
  });
}

function parseCsvNumber(value: string | undefined): number {
  if (!value) {
    return 0;
  }
  const cleaned = value.replaceAll('%', '').replaceAll(',', '.').trim();
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

function loadGscMap(gscCsvPath?: string): GscMap {
  if (!gscCsvPath || !fs.existsSync(gscCsvPath)) {
    return new Map();
  }

  const raw = fs.readFileSync(gscCsvPath, 'utf-8');
  const rows = parseCsv(raw, {
    columns: true,
    skip_empty_lines: true,
  }) as Array<Record<string, string>>;

  const map: GscMap = new Map();

  for (const row of rows) {
    const rawUrl = row.url ?? row.page ?? row.path ?? '';
    const url = normalizePathUrl(rawUrl);
    const clicks = parseCsvNumber(row.clicks);
    const impressions = parseCsvNumber(row.impressions);
    const rawCtr = parseCsvNumber(row.ctr);
    const ctr = rawCtr > 1 ? rawCtr / 100 : rawCtr;
    const position = parseCsvNumber(row.position);
    if (!url) {
      continue;
    }
    map.set(url, { clicks, impressions, ctr, position });
  }

  return map;
}

function buildPriorityScore(score: ScoreBreakdown, gsc?: GscMetrics): { priorityScore: number; priorityTier: 'P0' | 'P1' | 'P2' } {
  const qualityDeficit = 100 - score.overall;
  let priorityScore = qualityDeficit;

  if (gsc) {
    const impressionsScore = Math.min(100, Math.log10(gsc.impressions + 1) * 25);
    const ctrGapScore = Math.max(0, Math.min(100, ((0.05 - gsc.ctr) / 0.05) * 100));
    const positionOpportunity = gsc.position <= 5 ? 0 : Math.min(100, (gsc.position - 5) * 8);
    const opportunity = (impressionsScore * 0.45) + (ctrGapScore * 0.35) + (positionOpportunity * 0.20);
    priorityScore = Math.round((qualityDeficit * 0.60) + (opportunity * 0.40));
  }
  if (priorityScore >= 45) {
    return { priorityScore, priorityTier: 'P0' };
  }
  if (priorityScore >= 30) {
    return { priorityScore, priorityTier: 'P1' };
  }
  return { priorityScore, priorityTier: 'P2' };
}

function extractBlogMetrics(contentHtml: string, featuredImage: string | undefined): PageMetrics {
  const cleanText = stripHtml(contentHtml);
  const words = countWordsFromText(cleanText);
  const inlineImages = countHtmlTag(contentHtml, 'img');
  const links = countLinks(contentHtml);

  return {
    words,
    h2: countHtmlTag(contentHtml, 'h2'),
    h3: countHtmlTag(contentHtml, 'h3'),
    paragraphs: countHtmlTag(contentHtml, 'p'),
    inlineImages,
    totalImages: inlineImages + (featuredImage ? 1 : 0),
    internalLinks: links.internal,
    externalLinks: links.external,
    maxWordsBetweenImages: maxWordsBetweenImages(contentHtml),
    listCount: countHtmlTag(contentHtml, 'ul') + countHtmlTag(contentHtml, 'ol'),
    tableCount: countHtmlTag(contentHtml, 'table'),
    calloutCount: countHtmlTag(contentHtml, 'blockquote') + countHtmlTag(contentHtml, 'aside'),
  };
}

function extractTextValues(value: unknown): string[] {
  if (typeof value === 'string') {
    return [value];
  }
  if (Array.isArray(value)) {
    return value.flatMap((item) => extractTextValues(item));
  }
  if (value && typeof value === 'object') {
    return Object.values(value as Record<string, unknown>).flatMap((item) => extractTextValues(item));
  }
  return [];
}

function extractLearnMetrics(locale: Locale): PageMetrics {
  const sourceCopy = (GUIDE_COPY[locale] ?? GUIDE_COPY.en) as GuideCopy;
  const copyText = extractTextValues(sourceCopy).join(' ');
  const words = countWordsFromText(copyText);

  let h2 = 0;
  let h3 = 0;
  let inlineImages = 0;
  let observedInternalLinks = 0;
  let observedExternalLinks = 0;

  for (const filePath of LEARN_COMPONENT_PATHS) {
    if (!fs.existsSync(filePath)) {
      continue;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    h2 += countHtmlTag(content, 'h2');
    h3 += countHtmlTag(content, 'h3');
    inlineImages += (content.match(/src=["'`](\/[^"'`]+)["'`]/gi) || []).length;
    observedInternalLinks += (content.match(/href=["'`](\/[^"'`]+)["'`]/gi) || []).length;
    observedInternalLinks += (content.match(/<Link\s+href=/g) || []).length;
    observedExternalLinks += (content.match(/target="_blank"/g) || []).length;
  }

  const estimatedParagraphs = Math.max(1, Math.round(words / 90));
  const estimatedMaxWordsBetweenImages = inlineImages > 0 ? Math.round(words / inlineImages) : words;
  const modeledInternalLinks =
    (sourceCopy.commonProblems?.filter((item) => Boolean(item.link)).length ?? 0) +
    (sourceCopy.relatedGuides?.length ?? 0) +
    4;
  const modeledExternalLinks = sourceCopy.externalResources?.length ?? 0;
  const internalLinks = Math.max(observedInternalLinks, modeledInternalLinks);
  const externalLinks = Math.max(observedExternalLinks, modeledExternalLinks);

  return {
    words,
    h2,
    h3,
    paragraphs: estimatedParagraphs,
    inlineImages,
    totalImages: inlineImages,
    internalLinks,
    externalLinks,
    maxWordsBetweenImages: estimatedMaxWordsBetweenImages,
    listCount: (sourceCopy.litterTypes?.length ?? 0) + (sourceCopy.maintenanceTips?.length ?? 0),
    tableCount: 0,
    calloutCount: 0,
  };
}

function auditBlogPosts(locale: Locale, gscMap: GscMap): AuditEntry[] {
  const localeDir = path.join(CONTENT_ROOT, locale);
  if (!fs.existsSync(localeDir)) {
    return [];
  }

  const files = fs.readdirSync(localeDir).filter((filename) => filename.endsWith('.json')).sort();
  const entries: AuditEntry[] = [];

  for (const fileName of files) {
    const filePath = path.join(localeDir, fileName);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const post = JSON.parse(raw) as BlogPostFile;
    if (post.status !== 'published') {
      continue;
    }

    const slug = post.slug ?? fileName.replace('.json', '');
    const url = locale === 'en' ? `/blog/${slug}/` : `/${locale}/blog/${slug}/`;
    const contentClass = inferBlogContentClass(slug);
    const metrics = extractBlogMetrics(post.content ?? '', post.featuredImage?.url);
    const score = buildScoreBreakdown(metrics, contentClass, scoreSeoMetadata(post));
    const gsc = gscMap.get(normalizePathUrl(url));
    const { priorityScore, priorityTier } = buildPriorityScore(score, gsc);

    entries.push({
      id: `${locale}:blog:${slug}`,
      url,
      locale,
      sourceType: 'blog',
      sourcePath: filePath,
      status: 'published',
      contentClass,
      thresholds: CONTENT_THRESHOLDS[contentClass],
      metrics,
      score,
      gsc,
      priorityScore,
      priorityTier,
      recommendations: buildRecommendations(metrics, contentClass, score),
    });
  }

  return entries;
}

function auditLearnCore(locale: Locale, gscMap: GscMap): AuditEntry[] {
  const targets = CORE_LEARN_ROUTES.filter((route) => route.locale === locale);
  return targets.map((target) => {
    const metrics = extractLearnMetrics(locale);
    const contentClass: ContentClass = 'pillar_guide';
    const score = buildScoreBreakdown(metrics, contentClass, 70);
    const gsc = gscMap.get(normalizePathUrl(target.url));
    const { priorityScore, priorityTier } = buildPriorityScore(score, gsc);

    return {
      id: `${locale}:learn:${target.id}`,
      url: target.url,
      locale,
      sourceType: 'learn',
      sourcePath: path.join(process.cwd(), 'app', 'learn', 'cat-litter-guide'),
      status: 'published',
      contentClass,
      thresholds: CONTENT_THRESHOLDS[contentClass],
      metrics,
      score,
      gsc,
      priorityScore,
      priorityTier,
      recommendations: buildRecommendations(metrics, contentClass, score),
    };
  });
}

export function auditContentQuality(options: AuditOptions = {}): AuditReport {
  const locales: Locale[] = options.locale ? [options.locale] : ['en', 'fr'];
  const gscMap = loadGscMap(options.gscCsvPath);
  let entries = locales.flatMap((locale) => [
    ...auditBlogPosts(locale, gscMap),
    ...auditLearnCore(locale, gscMap),
  ]);

  if (options.contentClass) {
    entries = entries.filter((entry) => entry.contentClass === options.contentClass);
  }

  entries.sort((a, b) => b.priorityScore - a.priorityScore);

  if (typeof options.limit === 'number' && options.limit > 0) {
    entries = entries.slice(0, options.limit);
  }

  const localeSummary = locales.map((locale) => {
    const localeEntries = entries.filter((entry) => entry.locale === locale);
    return {
      locale,
      pages: localeEntries.length,
      p0: localeEntries.filter((entry) => entry.priorityTier === 'P0').length,
      p1: localeEntries.filter((entry) => entry.priorityTier === 'P1').length,
      p2: localeEntries.filter((entry) => entry.priorityTier === 'P2').length,
      belowWordTarget: localeEntries.filter((entry) => entry.metrics.words < entry.thresholds.minWords).length,
      missingImageTarget: localeEntries.filter((entry) => entry.metrics.inlineImages < entry.thresholds.minInlineImages).length,
      missingLinkTarget: localeEntries.filter(
        (entry) =>
          entry.metrics.internalLinks < entry.thresholds.minInternalLinks ||
          entry.metrics.externalLinks < entry.thresholds.minExternalLinks
      ).length,
    };
  });

  return {
    summary: {
      scannedAt: new Date().toISOString(),
      totalPages: entries.length,
      p0: entries.filter((entry) => entry.priorityTier === 'P0').length,
      p1: entries.filter((entry) => entry.priorityTier === 'P1').length,
      p2: entries.filter((entry) => entry.priorityTier === 'P2').length,
      localeSummary,
    },
    entries,
  };
}
