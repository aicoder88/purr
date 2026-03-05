#!/usr/bin/env tsx

import fs from 'node:fs';
import path from 'node:path';

type Locale = 'en' | 'fr' | 'es' | 'zh';

type BlogPost = {
  id?: string;
  slug?: string;
  title?: string;
  excerpt?: string;
  content?: string;
  author?: { name?: string; avatar?: string };
  publishDate?: string;
  modifiedDate?: string;
  status?: string;
  featuredImage?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
  };
  categories?: string[];
  tags?: string[];
  locale?: string;
  translations?: Record<string, string>;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    canonical?: string;
    ogImage?: string;
  };
  faq?: Array<{ question?: string; answerHtml?: string }>;
};

type PostFile = {
  filePath: string;
  locale: Locale;
  slug: string;
  post: BlogPost;
};

type AuditIssue = {
  locale: Locale;
  slug: string;
  filePath: string;
  issues: string[];
  fixes: string[];
};

const LOCALES: Locale[] = ['en', 'fr', 'es', 'zh'];
const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
const REPORT_DIR = path.join(process.cwd(), 'reports');
const FIX_MODE = process.argv.includes('--fix');
const FIX_PRIMARY_PLACEMENT = process.argv.includes('--fix-primary-placement');

const DEFAULT_CATEGORIES: Record<Locale, string[]> = {
  en: ['odor-control'],
  fr: ['contrôle-odeurs'],
  es: ['control-olor'],
  zh: ['气味控制'],
};

const IMAGE_LIBRARY = {
  apartment: '/optimized/blog/apartment-cat-lifestyle-ghibli.png',
  carbon: '/optimized/blog/activated-carbon-macro-obsidian.webp',
  diagram: '/optimized/blog/carbon-trapping-diagram-ghibli.webp',
  freshHome: '/optimized/blog/fresh-home-hero-ghibli.webp',
  multiCat: '/optimized/blog/multi-cat-happy-home-ghibli.webp',
  kittens: '/optimized/blog/deodorizers-with-kittens.webp',
  myths: '/optimized/products/masking-products-ghibli.webp',
  routine: '/optimized/blog/scooping-routine-ghibli.webp',
  results: '/optimized/marketing/before-after.webp',
  science: '/optimized/blog/science-diagram.webp',
} as const;

const ALT_AND_CAPTION: Record<Locale, Array<{ alt: string; caption: string }>> = {
  en: [
    {
      alt: 'Activated carbon adsorption process for litter box odor control',
      caption: 'Activated carbon traps ammonia and sulfur molecules inside microscopic pores.',
    },
    {
      alt: 'Clean apartment home with cat after consistent litter odor control routine',
      caption: 'A consistent scooping and additive routine keeps homes fresher between litter changes.',
    },
  ],
  fr: [
    {
      alt: 'Processus d adsorption du charbon actif pour le contrôle des odeurs de litière',
      caption: 'Le charbon actif piège l ammoniaque et les composés soufrés dans ses micropores.',
    },
    {
      alt: 'Appartement propre avec chat après une routine régulière de contrôle des odeurs',
      caption: 'Une routine constante de nettoyage et d additif garde la maison plus fraîche.',
    },
  ],
  es: [
    {
      alt: 'Proceso de adsorcion del carbon activado para controlar el olor de la arena',
      caption: 'El carbon activado atrapa amoniaco y compuestos de azufre en microporos.',
    },
    {
      alt: 'Hogar limpio con gato despues de una rutina constante de control de olores',
      caption: 'Una rutina consistente de limpieza y aditivo mantiene el ambiente fresco.',
    },
  ],
  zh: [
    {
      alt: '活性炭吸附过程示意图用于猫砂除臭',
      caption: '活性炭通过微孔锁定氨气和含硫异味分子。',
    },
    {
      alt: '坚持猫砂护理后更清新的家庭环境',
      caption: '稳定的清理和补充节奏可以在换砂间隔内维持清新。',
    },
  ],
};

function extractImageUrls(content: string): string[] {
  return [...content.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map((m) => m[1]);
}

function stripHtml(html: string): string {
  return html.replaceAll(/<[^>]+>/g, ' ').replaceAll(/\s+/g, ' ').trim();
}

function normalizeTextForMatch(text: string): string {
  return stripHtml(text)
    .toLowerCase()
    .replaceAll(/&[a-z0-9#]+;/gi, ' ')
    .replaceAll(/[^\p{L}\p{N}]+/gu, ' ')
    .replaceAll(/\s+/g, ' ')
    .trim();
}

function tokenizeForMatch(text: string): string[] {
  return normalizeTextForMatch(text)
    .split(' ')
    .map((token) => token.trim())
    .filter((token) => token.length >= 3);
}

function includesNormalizedPhrase(source: string, phrase: string): boolean {
  const normalizedSource = normalizeTextForMatch(source);
  const normalizedPhrase = normalizeTextForMatch(phrase);
  if (!normalizedSource || !normalizedPhrase) {
    return false;
  }
  return normalizedSource.includes(normalizedPhrase);
}

function extractHeadingTexts(content: string): string[] {
  const matches = [...content.matchAll(/<h[1-3]\b[^>]*>([\s\S]*?)<\/h[1-3]>/gi)];
  return matches
    .map((match) => stripHtml(match[1] ?? ''))
    .filter(Boolean);
}

function getLeadText(content: string, maxWords = 100): string {
  return stripHtml(content)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, maxWords)
    .join(' ');
}

function cleanCandidatePhrase(text: string): string {
  return stripHtml(text)
    .replace(/\s*\|\s*Purrify.*$/i, '')
    .replace(/\s*[—-]\s*Purrify.*$/i, '')
    .replace(/\(\d{4}[^)]*\)/g, '')
    .replace(/（\d{4}[^）]*）/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/[|:：\-—–]+$/g, '')
    .trim();
}

function buildCandidatePhrases(text: string): string[] {
  const cleaned = cleanCandidatePhrase(text);
  if (!cleaned) {
    return [];
  }

  const candidates = new Set<string>([cleaned]);
  const separators = [':', '：', ' - ', ' — ', ' – ', '|'];

  for (const separator of separators) {
    if (cleaned.includes(separator)) {
      const firstSegment = cleaned.split(separator)[0]?.trim();
      if (firstSegment) {
        candidates.add(firstSegment);
      }
    }
  }

  return [...candidates].filter((candidate) => candidate.length >= 4);
}

function wordCountForLocale(content: string, locale: Locale): number {
  const text = stripHtml(content);
  if (locale === 'zh') {
    return text.length;
  }
  return text.split(' ').filter(Boolean).length;
}

function expectedCanonical(locale: Locale, slug: string): string {
  return `https://www.purrify.ca/${locale}/blog/${slug}`;
}

function buildFigureHtml(url: string, alt: string, caption: string): string {
  return `<figure class="my-8"><img src="${url}" alt="${alt}" class="w-full h-auto rounded-xl shadow-lg" loading="lazy" /><figcaption class="mt-2 text-sm text-gray-500 dark:text-gray-400">${caption}</figcaption></figure>`;
}

function pickImageCandidates(slug: string): string[] {
  const lowered = slug.toLowerCase();
  if (lowered.includes('apartment')) {
    return [IMAGE_LIBRARY.apartment, IMAGE_LIBRARY.results, IMAGE_LIBRARY.freshHome];
  }
  if (lowered.includes('multi-cat')) {
    return [IMAGE_LIBRARY.multiCat, IMAGE_LIBRARY.freshHome, IMAGE_LIBRARY.results];
  }
  if (lowered.includes('kitten')) {
    return [IMAGE_LIBRARY.kittens, IMAGE_LIBRARY.freshHome, IMAGE_LIBRARY.routine];
  }
  if (
    lowered.includes('carbon') ||
    lowered.includes('baking-soda') ||
    lowered.includes('science') ||
    lowered.includes('absorber')
  ) {
    return [IMAGE_LIBRARY.carbon, IMAGE_LIBRARY.diagram, IMAGE_LIBRARY.science];
  }
  if (lowered.includes('myth') || lowered.includes('powder') || lowered.includes('spray')) {
    return [IMAGE_LIBRARY.myths, IMAGE_LIBRARY.diagram, IMAGE_LIBRARY.results];
  }
  if (lowered.includes('frequency') || lowered.includes('how-to') || lowered.includes('often')) {
    return [IMAGE_LIBRARY.routine, IMAGE_LIBRARY.freshHome, IMAGE_LIBRARY.results];
  }
  return [IMAGE_LIBRARY.diagram, IMAGE_LIBRARY.freshHome, IMAGE_LIBRARY.science];
}

function insertFigures(content: string, figureHtml: string[]): string {
  if (figureHtml.length === 0) return content;

  const h2Matches = [...content.matchAll(/<\/h2>/gi)];
  let updated = content;

  if (figureHtml[0]) {
    if (h2Matches[0]?.index !== undefined) {
      const idx = h2Matches[0].index + h2Matches[0][0].length;
      updated = `${updated.slice(0, idx)}${figureHtml[0]}${updated.slice(idx)}`;
    } else {
      updated += figureHtml[0];
    }
  }

  if (figureHtml[1]) {
    const faqHeadingRegex = /<h2[^>]*>[^<]*(Frequently Asked Questions|Questions Fréquemment Posées|Preguntas Frecuentes|常见问题)[^<]*<\/h2>/i;
    const faqMatch = updated.match(faqHeadingRegex);
    if (faqMatch && faqMatch.index !== undefined) {
      updated = `${updated.slice(0, faqMatch.index)}${figureHtml[1]}${updated.slice(faqMatch.index)}`;
    } else {
      updated += figureHtml[1];
    }
  }

  return updated;
}

function makePrimaryKeywordUnique(
  locale: Locale,
  baseKeyword: string,
  slug: string,
  used: Set<string>
): string {
  const suffix = locale === 'zh' ? ' 指南' : locale === 'fr' ? ' guide' : locale === 'es' ? ' guia' : ' guide';
  const slugHint = slug.split('-').slice(-2).join(' ').trim();
  let candidate = `${baseKeyword}${suffix}`.trim();
  let n = 2;

  while (used.has(candidate.toLowerCase())) {
    candidate = `${baseKeyword}${suffix} ${slugHint || n}`.trim();
    n += 1;
  }

  return candidate;
}

function trimToLength(text: string, max: number): string {
  const clean = text.replaceAll(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trim()}…`;
}

function scoreKeywordTargetMatch(post: BlogPost, keyword: string): number {
  if (!keyword) {
    return 0;
  }

  const normalizedKeyword = normalizeTextForMatch(keyword);
  if (!normalizedKeyword) {
    return 0;
  }

  const headingTexts = extractHeadingTexts(post.content ?? '');
  const firstHeading = headingTexts[0] ?? '';
  const leadText = getLeadText(post.content ?? '');
  const slugText = post.slug?.replaceAll('-', ' ') ?? '';
  const keywordTokens = tokenizeForMatch(keyword);
  const sources = [
    post.title ?? '',
    post.seo?.title ?? '',
    slugText,
    post.excerpt ?? '',
    firstHeading,
    leadText,
    ...(post.seo?.keywords ?? []),
    ...(post.tags ?? []),
  ];

  let score = 0;

  if (includesNormalizedPhrase(post.seo?.title ?? '', keyword)) score += 120;
  if (includesNormalizedPhrase(post.title ?? '', keyword)) score += 100;
  if (includesNormalizedPhrase(slugText, keyword)) score += 90;
  if (includesNormalizedPhrase(firstHeading, keyword)) score += 60;
  if (includesNormalizedPhrase(post.excerpt ?? '', keyword)) score += 50;
  if (includesNormalizedPhrase(leadText, keyword)) score += 40;
  if ((post.seo?.keywords ?? []).some((entry) => includesNormalizedPhrase(entry, keyword))) score += 30;
  if ((post.tags ?? []).some((entry) => includesNormalizedPhrase(entry, keyword))) score += 20;

  if (keywordTokens.length > 0) {
    const sourceTokens = new Set(sources.flatMap((source) => tokenizeForMatch(source)));
    const matchedTokens = keywordTokens.filter((token) => sourceTokens.has(token));
    score += Math.round((matchedTokens.length / keywordTokens.length) * 30);
  }

  return score;
}

function placementCoverage(post: BlogPost, keyword: string): number {
  const headingTexts = extractHeadingTexts(post.content ?? '');
  const firstHeading = headingTexts[0] ?? '';
  const leadText = getLeadText(post.content ?? '');

  let coverage = 0;
  if (includesNormalizedPhrase(post.title ?? '', keyword)) coverage += 1;
  if (includesNormalizedPhrase(post.seo?.title ?? '', keyword)) coverage += 1;
  if (includesNormalizedPhrase(firstHeading, keyword)) coverage += 1;
  if (includesNormalizedPhrase(leadText, keyword)) coverage += 1;
  return coverage;
}

function suggestSupportedPrimaryKeyword(post: BlogPost): string | null {
  const headingTexts = extractHeadingTexts(post.content ?? '');
  const firstHeading = headingTexts[0] ?? '';
  const currentKeywords = post.seo?.keywords ?? [];
  const sources = [
    ...(currentKeywords ?? []),
    ...(post.tags ?? []),
    ...buildCandidatePhrases(post.title ?? ''),
    ...buildCandidatePhrases(post.seo?.title ?? ''),
    ...buildCandidatePhrases(firstHeading),
    ...buildCandidatePhrases(post.slug?.replaceAll('-', ' ') ?? ''),
  ];

  const seen = new Set<string>();
  const candidates = sources.filter((candidate) => {
    const normalized = normalizeTextForMatch(candidate);
    if (!normalized || seen.has(normalized)) {
      return false;
    }
    seen.add(normalized);
    return true;
  });

  if (candidates.length === 0) {
    return null;
  }

  let bestCandidate: string | null = null;
  let bestCoverage = -1;
  let bestScore = -1;

  for (const candidate of candidates) {
    const coverage = placementCoverage(post, candidate);
    const score = scoreKeywordTargetMatch(post, candidate);
    if (
      coverage > bestCoverage ||
      (coverage === bestCoverage && score > bestScore) ||
      (coverage === bestCoverage && score === bestScore && candidate.length < (bestCandidate?.length ?? Infinity))
    ) {
      bestCandidate = candidate;
      bestCoverage = coverage;
      bestScore = score;
    }
  }

  return bestCandidate;
}

function listPosts(): PostFile[] {
  const postFiles: PostFile[] = [];
  for (const locale of LOCALES) {
    const localeDir = path.join(BLOG_DIR, locale);
    const files = fs.readdirSync(localeDir).filter((f) => f.endsWith('.json'));
    for (const file of files) {
      const filePath = path.join(localeDir, file);
      const slug = file.replace('.json', '');
      const post = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as BlogPost;
      postFiles.push({ filePath, locale, slug, post });
    }
  }
  return postFiles;
}

function auditAndFixPost(item: PostFile): AuditIssue {
  const { locale, slug } = item;
  const post = item.post;
  const issues: string[] = [];
  const fixes: string[] = [];

  post.seo ??= {};
  post.author ??= {};
  post.translations ??= {};

  const requiredChecks: Array<[string, unknown]> = [
    ['id', post.id],
    ['slug', post.slug],
    ['title', post.title],
    ['excerpt', post.excerpt],
    ['content', post.content],
    ['author.name', post.author.name],
    ['publishDate', post.publishDate],
    ['status', post.status],
    ['featuredImage.url', post.featuredImage?.url],
    ['featuredImage.alt', post.featuredImage?.alt],
  ];

  for (const [field, value] of requiredChecks) {
    if (!value) {
      issues.push(`missing:${field}`);
    }
  }

  if (!post.modifiedDate) {
    issues.push('missing:modifiedDate');
    if (FIX_MODE && !FIX_PRIMARY_PLACEMENT) {
      post.modifiedDate = post.publishDate ?? new Date().toISOString();
      fixes.push('Set modifiedDate from publishDate.');
    }
  }

  if (!post.publishDate) {
    issues.push('missing:publishDate');
    if (FIX_MODE && !FIX_PRIMARY_PLACEMENT) {
      post.publishDate = post.modifiedDate ?? new Date().toISOString();
      fixes.push('Set missing publishDate.');
    }
  }

  if (!post.categories || post.categories.length === 0) {
    issues.push('missing:categories');
    if (FIX_MODE && !FIX_PRIMARY_PLACEMENT) {
      post.categories = DEFAULT_CATEGORIES[locale];
      fixes.push('Added default category.');
    }
  }

  if (!post.seo.title) {
    issues.push('missing:seo.title');
    if (FIX_MODE && !FIX_PRIMARY_PLACEMENT) {
      post.seo.title = trimToLength(post.title ?? slug, 68);
      fixes.push('Generated missing SEO title from post title.');
    }
  }

  if (!post.seo.description) {
    issues.push('missing:seo.description');
    if (FIX_MODE && !FIX_PRIMARY_PLACEMENT) {
      post.seo.description = trimToLength(post.excerpt ?? stripHtml(post.content ?? ''), 160);
      fixes.push('Generated missing SEO description.');
    }
  }

  if (!post.seo.keywords || post.seo.keywords.length === 0) {
    issues.push('missing:seo.keywords');
    if (FIX_MODE && !FIX_PRIMARY_PLACEMENT) {
      const generated = (post.tags ?? []).slice(0, 6);
      post.seo.keywords = generated.length > 0 ? generated : [slug.replaceAll('-', ' ')];
      fixes.push('Generated missing SEO keywords from tags.');
    }
  }

  if (!post.seo.canonical) {
    issues.push('missing:seo.canonical');
    if (FIX_MODE && !FIX_PRIMARY_PLACEMENT) {
      post.seo.canonical = expectedCanonical(locale, slug);
      fixes.push('Added missing canonical URL.');
    }
  }

  const content = post.content ?? '';
  const textLength = wordCountForLocale(content, locale);
  if ((locale !== 'zh' && textLength < 650) || (locale === 'zh' && textLength < 900)) {
    issues.push(`content:short(${textLength})`);
  }

  const primaryKeyword = post.seo.keywords?.[0]?.trim();
  if (primaryKeyword) {
    if (!includesNormalizedPhrase(post.title ?? '', primaryKeyword)) {
      issues.push(`seo:primary-keyword-missing(title:${primaryKeyword})`);
    }
    if (!includesNormalizedPhrase(post.seo.title ?? '', primaryKeyword)) {
      issues.push(`seo:primary-keyword-missing(meta-title:${primaryKeyword})`);
    }

    const headingTexts = extractHeadingTexts(content);
    const firstHeading = headingTexts[0] ?? '';
    if (firstHeading && !includesNormalizedPhrase(firstHeading, primaryKeyword)) {
      issues.push(`seo:primary-keyword-missing(first-heading:${primaryKeyword})`);
    }

    const leadText = getLeadText(content);
    if (leadText && !includesNormalizedPhrase(leadText, primaryKeyword)) {
      issues.push(`seo:primary-keyword-missing(first-100-words:${primaryKeyword})`);
    }
  }

  const h2Count = (content.match(/<h2\b/gi) || []).length;
  if (h2Count < 3) {
    issues.push(`content:h2(${h2Count})`);
  }

  const contentImageUrls = extractImageUrls(content);
  const featuredImageCount = post.featuredImage?.url ? 1 : 0;
  const totalImageCount = featuredImageCount + contentImageUrls.length;
  if (totalImageCount < 3) {
    issues.push(`images:count(${totalImageCount})`);
    if (FIX_MODE && !FIX_PRIMARY_PLACEMENT && post.content) {
      const needed = 3 - totalImageCount;
      const existingUrls = new Set<string>([...(post.featuredImage?.url ? [post.featuredImage.url] : []), ...contentImageUrls]);
      const candidates = pickImageCandidates(slug).filter((url) => !existingUrls.has(url));
      const additions = candidates.slice(0, needed);

      const localizedText = ALT_AND_CAPTION[locale];
      const figures = additions.map((url, index) =>
        buildFigureHtml(url, localizedText[index]?.alt ?? localizedText[0].alt, localizedText[index]?.caption ?? localizedText[0].caption)
      );

      if (figures.length > 0) {
        post.content = insertFigures(post.content, figures);
        fixes.push(`Inserted ${figures.length} inline image(s) to reach minimum of 3 total images.`);
      }
    }
  }

  return {
    locale,
    slug,
    filePath: item.filePath,
    issues,
    fixes,
  };
}

function writePost(filePath: string, post: BlogPost): void {
  fs.writeFileSync(filePath, `${JSON.stringify(post, null, 2)}\n`, 'utf-8');
}

function main(): void {
  const posts = listPosts();

  if (FIX_MODE && FIX_PRIMARY_PLACEMENT) {
    const proposals = posts
      .map((item) => {
        const post = item.post;
        post.seo ??= {};

        const currentPrimary = post.seo.keywords?.[0]?.trim();
        const suggestedPrimary = suggestSupportedPrimaryKeyword(post);
        if (!suggestedPrimary) {
          return null;
        }

        const currentCoverage = currentPrimary ? placementCoverage(post, currentPrimary) : -1;
        const suggestedCoverage = placementCoverage(post, suggestedPrimary);
        const suggestedScore = scoreKeywordTargetMatch(post, suggestedPrimary);

        if (suggestedCoverage < 4 || suggestedCoverage <= currentCoverage) {
          return null;
        }

        const localePublishedPosts = posts.filter((candidate) =>
          candidate.locale === item.locale && candidate.post.status === 'published'
        );
        const bestScoreForCandidate = Math.max(
          ...localePublishedPosts.map((candidate) => scoreKeywordTargetMatch(candidate.post, suggestedPrimary))
        );

        if (suggestedScore < bestScoreForCandidate) {
          return null;
        }

        return {
          item,
          suggestedPrimary,
          suggestedScore,
        };
      })
      .filter((proposal): proposal is { item: PostFile; suggestedPrimary: string; suggestedScore: number } => proposal !== null)
      .sort((a, b) => b.suggestedScore - a.suggestedScore);

    const claimedKeywords = new Set<string>();
    for (const proposal of proposals) {
      const claimKey = `${proposal.item.locale}:${normalizeTextForMatch(proposal.suggestedPrimary)}`;
      if (claimedKeywords.has(claimKey)) {
        continue;
      }
      claimedKeywords.add(claimKey);

      const post = proposal.item.post;
      const nextKeywords = [
        proposal.suggestedPrimary,
        ...(post.seo?.keywords ?? []).filter(
          (keyword) => normalizeTextForMatch(keyword) !== normalizeTextForMatch(proposal.suggestedPrimary)
        ),
      ];
      post.seo = {
        ...(post.seo ?? {}),
        keywords: nextKeywords,
      };
    }
  }

  const issuesByPost: AuditIssue[] = [];

  for (const item of posts) {
    const result = auditAndFixPost(item);
    issuesByPost.push(result);
  }

  if (FIX_MODE) {
    for (const locale of LOCALES) {
      const localePosts = posts.filter((p) => p.locale === locale && p.post.seo?.keywords?.length);
      const byPrimary = new Map<string, PostFile[]>();
      for (const item of localePosts) {
        const primary = item.post.seo?.keywords?.[0]?.toLowerCase().trim();
        if (!primary) continue;
        if (!byPrimary.has(primary)) {
          byPrimary.set(primary, []);
        }
        byPrimary.get(primary)?.push(item);
      }

      for (const [, duplicates] of byPrimary) {
        if (duplicates.length < 2) continue;
        const used = new Set<string>(duplicates.map((p) => p.post.seo?.keywords?.[0]?.toLowerCase() ?? ''));
        for (let index = 1; index < duplicates.length; index += 1) {
          const duplicate = duplicates[index];
          const current = duplicate.post.seo?.keywords?.[0] ?? duplicate.slug.replaceAll('-', ' ');
          const replacement = makePrimaryKeywordUnique(locale, current, duplicate.slug, used);
          used.add(replacement.toLowerCase());
          if (duplicate.post.seo?.keywords && duplicate.post.seo.keywords.length > 0) {
            duplicate.post.seo.keywords[0] = replacement;
          } else {
            duplicate.post.seo = { ...(duplicate.post.seo ?? {}), keywords: [replacement] };
          }

          const issueRecord = issuesByPost.find((i) => i.filePath === duplicate.filePath);
          issueRecord?.issues.push('seo:cannibalization(primary-keyword-duplicate)');
          issueRecord?.fixes.push(`Adjusted primary keyword to "${replacement}".`);
        }
      }
    }
  }

  for (const locale of LOCALES) {
    const publishedPosts = posts.filter((item) => item.locale === locale && item.post.status === 'published');

    for (const item of publishedPosts) {
      const primaryKeyword = item.post.seo?.keywords?.[0]?.trim();
      if (!primaryKeyword) {
        continue;
      }

      const currentScore = scoreKeywordTargetMatch(item.post, primaryKeyword);
      let bestCandidate = {
        slug: item.slug,
        score: currentScore,
      };

      for (const candidate of publishedPosts) {
        const candidateScore = scoreKeywordTargetMatch(candidate.post, primaryKeyword);
        if (candidateScore > bestCandidate.score) {
          bestCandidate = {
            slug: candidate.slug,
            score: candidateScore,
          };
        }
      }

      if (bestCandidate.slug !== item.slug && bestCandidate.score >= currentScore + 40) {
        const issueRecord = issuesByPost.find((issue) => issue.filePath === item.filePath);
        issueRecord?.issues.push(
          `seo:better-target-exists(${primaryKeyword} -> ${bestCandidate.slug}; current=${currentScore}; best=${bestCandidate.score})`
        );
      }
    }
  }

  let changedCount = 0;
  if (FIX_MODE) {
    for (const item of posts) {
      const original = fs.readFileSync(item.filePath, 'utf-8');
      const next = `${JSON.stringify(item.post, null, 2)}\n`;
      if (original !== next) {
        writePost(item.filePath, item.post);
        changedCount += 1;
      }
    }
  }

  const failingImageRule = issuesByPost.filter((p) => p.issues.some((i) => i.startsWith('images:count('))).length;
  const missingSeoFields = issuesByPost.filter((p) => p.issues.some((i) => i.startsWith('missing:seo.'))).length;
  const completenessIssues = issuesByPost.filter((p) => p.issues.some((i) => i.startsWith('missing:'))).length;
  const cannibalIssues = issuesByPost.filter((p) => p.issues.includes('seo:cannibalization(primary-keyword-duplicate)')).length;
  const primaryKeywordPlacementIssues = issuesByPost.filter((p) =>
    p.issues.some((issue) => issue.startsWith('seo:primary-keyword-missing('))
  ).length;
  const betterTargetIssues = issuesByPost.filter((p) =>
    p.issues.some((issue) => issue.startsWith('seo:better-target-exists('))
  ).length;

  const reportLines: string[] = [];
  reportLines.push('# Blog Quality Audit Report');
  reportLines.push('');
  reportLines.push(`- Generated: ${new Date().toISOString()}`);
  reportLines.push(`- Mode: ${FIX_MODE ? 'audit + fix' : 'audit only'}`);
  reportLines.push(`- Total posts scanned: ${posts.length}`);
  reportLines.push(`- Posts with completeness issues: ${completenessIssues}`);
  reportLines.push(`- Posts below 3-image minimum: ${failingImageRule}`);
  reportLines.push(`- Posts with missing SEO fields: ${missingSeoFields}`);
  reportLines.push(`- Posts with primary-keyword cannibalization: ${cannibalIssues}`);
  reportLines.push(`- Posts missing primary-keyword placement signals: ${primaryKeywordPlacementIssues}`);
  reportLines.push(`- Posts with a better published keyword target elsewhere: ${betterTargetIssues}`);
  if (FIX_MODE) {
    reportLines.push(`- Posts modified: ${changedCount}`);
  }
  reportLines.push('');
  reportLines.push('## Issues By Post');
  reportLines.push('');

  for (const issue of issuesByPost.filter((p) => p.issues.length > 0)) {
    reportLines.push(`### ${issue.locale}/${issue.slug}`);
    reportLines.push(`- File: ${issue.filePath.replace(`${process.cwd()}/`, '')}`);
    reportLines.push(`- Issues: ${issue.issues.join(', ')}`);
    if (issue.fixes.length > 0) {
      reportLines.push(`- Fixes: ${issue.fixes.join(' ')}`);
    }
    reportLines.push('');
  }

  fs.mkdirSync(REPORT_DIR, { recursive: true });
  const reportPath = path.join(REPORT_DIR, `blog-quality-audit-${Date.now()}.md`);
  fs.writeFileSync(reportPath, `${reportLines.join('\n')}\n`, 'utf-8');

  console.log(`Scanned ${posts.length} blog posts.`);
  console.log(`Posts below 3-image minimum: ${failingImageRule}`);
  console.log(`Posts with missing SEO fields: ${missingSeoFields}`);
  console.log(`Posts with completeness issues: ${completenessIssues}`);
  console.log(`Posts with primary keyword cannibalization: ${cannibalIssues}`);
  console.log(`Posts missing primary keyword placement signals: ${primaryKeywordPlacementIssues}`);
  console.log(`Posts with a better published keyword target elsewhere: ${betterTargetIssues}`);
  if (FIX_MODE) {
    console.log(`Posts modified: ${changedCount}`);
  }
  console.log(`Report: ${reportPath}`);
}

main();
