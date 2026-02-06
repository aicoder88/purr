/**
 * Blog Content Completeness Analysis Script
 * Compares content length of translated blog posts against English source
 */

import * as fs from 'fs';
import * as path from 'path';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  locale: string;
}

interface PostAnalysis {
  slug: string;
  en: { length: number; file: string } | null;
  fr: { length: number; file: string } | null;
  es: { length: number; file: string } | null;
  zh: { length: number; file: string } | null;
  frPct: number | null;
  esPct: number | null;
  zhPct: number | null;
}

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');
const THRESHOLD = 0.85; // 85% threshold

function getAllSlugs(): string[] {
  const enDir = path.join(CONTENT_DIR, 'en');
  const files = fs.readdirSync(enDir).filter(f => f.endsWith('.json'));
  return files.map(f => f.replace('.json', ''));
}

function readPost(locale: string, slug: string): BlogPost | null {
  const filePath = path.join(CONTENT_DIR, locale, `${slug}.json`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(content);
    return {
      slug,
      title: data.title || '',
      excerpt: data.excerpt || '',
      content: data.content || '',
      locale: data.locale || locale,
    };
  } catch (e) {
    console.error(`Error reading ${filePath}:`, e);
    return null;
  }
}

function calculateTotalLength(post: BlogPost): number {
  // Calculate total content length: title + excerpt + content
  const titleLength = post.title.length;
  const excerptLength = post.excerpt.length;
  const contentLength = post.content.length;
  return titleLength + excerptLength + contentLength;
}

function analyzePost(slug: string): PostAnalysis {
  const enPost = readPost('en', slug);
  const frPost = readPost('fr', slug);
  const esPost = readPost('es', slug);
  const zhPost = readPost('zh', slug);

  const enLength = enPost ? calculateTotalLength(enPost) : 0;
  const frLength = frPost ? calculateTotalLength(frPost) : 0;
  const esLength = esPost ? calculateTotalLength(esPost) : 0;
  const zhLength = zhPost ? calculateTotalLength(zhPost) : 0;

  return {
    slug,
    en: enLength > 0 ? { length: enLength, file: `content/blog/en/${slug}.json` } : null,
    fr: frLength > 0 ? { length: frLength, file: `content/blog/fr/${slug}.json` } : null,
    es: esLength > 0 ? { length: esLength, file: `content/blog/es/${slug}.json` } : null,
    zh: zhLength > 0 ? { length: zhLength, file: `content/blog/zh/${slug}.json` } : null,
    frPct: enLength > 0 && frLength > 0 ? frLength / enLength : null,
    esPct: enLength > 0 && esLength > 0 ? esLength / enLength : null,
    zhPct: enLength > 0 && zhLength > 0 ? zhLength / enLength : null,
  };
}

function formatPct(pct: number | null): string {
  if (pct === null) return 'N/A';
  return `${(pct * 100).toFixed(1)}%`;
}

function formatStatus(pct: number | null, threshold: number): string {
  if (pct === null) return '⚠️ MISSING';
  if (pct >= threshold) return '✅ GOOD';
  if (pct >= 0.70) return '⚠️ NEEDS WORK';
  return '❌ CRITICAL';
}

function generateReport() {
  console.log('🔍 Blog Content Completeness Analysis\n');
  console.log('=' .repeat(80));

  const slugs = getAllSlugs();
  const analyses: PostAnalysis[] = slugs.map(slug => analyzePost(slug));

  // Categorize posts
  const goodTranslations: PostAnalysis[] = [];
  const needsWork: PostAnalysis[] = [];
  const critical: PostAnalysis[] = [];
  const missing: PostAnalysis[] = [];

  analyses.forEach(analysis => {
    const locales = ['fr', 'es', 'zh'] as const;
    let hasIssue = false;
    let hasCritical = false;
    let hasMissing = false;

    locales.forEach(locale => {
      const pct = analysis[`${locale}Pct`];
      if (pct === null) {
        hasMissing = true;
      } else if (pct < 0.70) {
        hasCritical = true;
      } else if (pct < THRESHOLD) {
        hasIssue = true;
      }
    });

    if (hasMissing) {
      missing.push(analysis);
    } else if (hasCritical) {
      critical.push(analysis);
    } else if (hasIssue) {
      needsWork.push(analysis);
    } else {
      goodTranslations.push(analysis);
    }
  });

  // Summary statistics
  console.log('\n📊 SUMMARY STATISTICS\n');
  console.log('-'.repeat(80));

  const allFrPcts = analyses.map(a => a.frPct).filter((p): p is number => p !== null);
  const allEsPcts = analyses.map(a => a.esPct).filter((p): p is number => p !== null);
  const allZhPcts = analyses.map(a => a.zhPct).filter((p): p is number => p !== null);

  const enLengths = analyses.map(a => a.en?.length || 0).filter(l => l > 0);
  const frLengths = analyses.map(a => a.fr?.length || 0).filter(l => l > 0);
  const esLengths = analyses.map(a => a.es?.length || 0).filter(l => l > 0);
  const zhLengths = analyses.map(a => a.zh?.length || 0).filter(l => l > 0);

  const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;

  console.log(`Total Posts Analyzed: ${slugs.length}`);
  console.log(`\nAverage Content Length by Locale:`);
  console.log(`  EN (Source):  ${Math.round(avg(enLengths)).toLocaleString().padStart(6)} chars`);
  console.log(`  FR:           ${Math.round(avg(frLengths)).toLocaleString().padStart(6)} chars (${(avg(frLengths)/avg(enLengths)*100).toFixed(1)}% of EN)`);
  console.log(`  ES:           ${Math.round(avg(esLengths)).toLocaleString().padStart(6)} chars (${(avg(esLengths)/avg(enLengths)*100).toFixed(1)}% of EN)`);
  console.log(`  ZH:           ${Math.round(avg(zhLengths)).toLocaleString().padStart(6)} chars (${(avg(zhLengths)/avg(enLengths)*100).toFixed(1)}% of EN)`);

  console.log(`\nAverage Completeness Ratio:`);
  console.log(`  FR: ${(avg(allFrPcts) * 100).toFixed(1)}%`);
  console.log(`  ES: ${(avg(allEsPcts) * 100).toFixed(1)}%`);
  console.log(`  ZH: ${(avg(allZhPcts) * 100).toFixed(1)}%`);

  console.log(`\nStatus Breakdown:`);
  console.log(`  ✅ Good (>= 85%):      ${goodTranslations.length} posts`);
  console.log(`  ⚠️  Needs Work (70-85%): ${needsWork.length} posts`);
  console.log(`  ❌ Critical (< 70%):    ${critical.length} posts`);
  console.log(`  ⚠️  Missing Files:      ${missing.length} posts`);

  // Chinese-specific analysis (as requested)
  console.log('\n\n🇨🇳 CHINESE (ZH) LOCALE ANALYSIS\n');
  console.log('-'.repeat(80));

  const zhSorted = [...analyses].sort((a, b) => (a.zhPct || 1) - (b.zhPct || 1));
  const zhWorstOffenders = zhSorted.slice(0, 10);

  console.log('\n📉 Top 10 Worst Offenders (ZH):\n');
  zhWorstOffenders.forEach((analysis, i) => {
    console.log(`${i + 1}. ${analysis.slug}`);
    console.log(`   EN: ${analysis.en?.length.toLocaleString().padStart(6)} chars | ZH: ${analysis.zh?.length.toLocaleString().padStart(6)} chars | ${formatStatus(analysis.zhPct, THRESHOLD)} (${formatPct(analysis.zhPct)})`);
  });

  // CRITICAL posts detail
  if (critical.length > 0) {
    console.log('\n\n❌ CRITICAL POSTS NEEDING RE-TRANSLATION (< 70%)\n');
    console.log('-'.repeat(80));

    critical.forEach(analysis => {
      console.log(`\n📝 ${analysis.slug}`);
      console.log(`   EN: ${analysis.en?.length.toLocaleString().padStart(6)} chars`);
      ['fr', 'es', 'zh'].forEach(locale => {
        const data = analysis[locale as 'fr' | 'es' | 'zh'];
        const pct = analysis[`${locale}Pct` as 'frPct' | 'esPct' | 'zhPct'];
        if (pct !== null && pct < 0.70) {
          console.log(`   ${locale.toUpperCase()}: ${data?.length.toLocaleString().padStart(6)} chars | ${formatStatus(pct, THRESHOLD)} (${formatPct(pct)})`);
          console.log(`   → File: ${data?.file}`);
        }
      });
    });
  }

  // NEEDS WORK posts detail
  if (needsWork.length > 0) {
    console.log('\n\n⚠️  POSTS NEEDING WORK (70-85%)\n');
    console.log('-'.repeat(80));

    needsWork.forEach(analysis => {
      const zhPct = analysis.zhPct;
      if (zhPct !== null && zhPct < THRESHOLD && zhPct >= 0.70) {
        console.log(`\n📝 ${analysis.slug}`);
        console.log(`   EN: ${analysis.en?.length.toLocaleString().padStart(6)} chars`);
        console.log(`   ZH: ${analysis.zh?.length.toLocaleString().padStart(6)} chars | ${formatStatus(zhPct, THRESHOLD)} (${formatPct(zhPct)})`);
        console.log(`   → File: ${analysis.zh?.file}`);
      }
    });
  }

  // All problematic files list
  console.log('\n\n📋 ALL FILES NEEDING RE-TRANSLATION\n');
  console.log('-'.repeat(80));

  const problematicZh = analyses
    .filter(a => a.zhPct !== null && a.zhPct < THRESHOLD)
    .sort((a, b) => (a.zhPct || 0) - (b.zhPct || 0));

  console.log('\nChinese (ZH) - Priority Order:\n');
  problematicZh.forEach(analysis => {
    console.log(`  ${formatPct(analysis.zhPct).padStart(6)} → ${analysis.zh?.file}`);
  });

  const problematicFr = analyses
    .filter(a => a.frPct !== null && a.frPct < THRESHOLD)
    .sort((a, b) => (a.frPct || 0) - (b.frPct || 0));

  if (problematicFr.length > 0) {
    console.log('\nFrench (FR) - Priority Order:\n');
    problematicFr.forEach(analysis => {
      console.log(`  ${formatPct(analysis.frPct).padStart(6)} → ${analysis.fr?.file}`);
    });
  }

  const problematicEs = analyses
    .filter(a => a.esPct !== null && a.esPct < THRESHOLD)
    .sort((a, b) => (a.esPct || 0) - (b.esPct || 0));

  if (problematicEs.length > 0) {
    console.log('\nSpanish (ES) - Priority Order:\n');
    problematicEs.forEach(analysis => {
      console.log(`  ${formatPct(analysis.esPct).padStart(6)} → ${analysis.es?.file}`);
    });
  }

  // Good translations list
  console.log('\n\n✅ POSTS WITH GOOD TRANSLATIONS (>= 85%)\n');
  console.log('-'.repeat(80));

  goodTranslations.forEach(analysis => {
    console.log(`\n📝 ${analysis.slug}`);
    ['fr', 'es', 'zh'].forEach(locale => {
      const pct = analysis[`${locale}Pct` as 'frPct' | 'esPct' | 'zhPct'];
      console.log(`   ${locale.toUpperCase()}: ${formatPct(pct)} ${pct && pct >= THRESHOLD ? '✅' : ''}`);
    });
  });

  return {
    totalPosts: slugs.length,
    goodCount: goodTranslations.length,
    needsWorkCount: needsWork.length,
    criticalCount: critical.length,
    missingCount: missing.length,
    problematicZhFiles: problematicZh.map(a => a.zh?.file),
    problematicFrFiles: problematicFr.map(a => a.fr?.file),
    problematicEsFiles: problematicEs.map(a => a.es?.file),
  };
}

// Run the analysis
const results = generateReport();

// Write report to file
const reportPath = path.join(process.cwd(), 'blog-completeness-report.txt');
const reportContent = `
Blog Content Completeness Report
Generated: ${new Date().toISOString()}

SUMMARY:
- Total Posts: ${results.totalPosts}
- Good Translations (>=85%): ${results.goodCount}
- Needs Work (70-85%): ${results.needsWorkCount}
- Critical (<70%): ${results.criticalCount}
- Missing Files: ${results.missingCount}

ZH (Chinese) Files Needing Re-translation (${results.problematicZhFiles.length} files):
${results.problematicZhFiles.map(f => `- ${f}`).join('\n')}

FR (French) Files Needing Re-translation (${results.problematicFrFiles.length} files):
${results.problematicFrFiles.map(f => `- ${f}`).join('\n')}

ES (Spanish) Files Needing Re-translation (${results.problematicEsFiles.length} files):
${results.problematicEsFiles.map(f => `- ${f}`).join('\n')}
`;

fs.writeFileSync(reportPath, reportContent);
console.log(`\n\n📄 Full report saved to: ${reportPath}`);
