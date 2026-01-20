#!/usr/bin/env tsx
/**
 * Link Equity Optimization Script
 * Analyzes and optimizes internal link equity distribution
 */

import {
  analyzeLinkStructure,
  findPagesNeedingLinks,
} from '../src/lib/seo/link-analyzer';
import {
  generateLinkSuggestions,
  prioritizeSuggestions,
  groupSuggestionsByPage,
  getSuggestionsToPage,
} from '../src/lib/seo/link-suggestions';

async function main() {
  console.log('🔗 Analyzing link equity distribution...\n');

  // 1. Analyze current link structure
  const analysis = await analyzeLinkStructure();

  console.log('📊 Current State:');
  console.log(`   Total pages: ${analysis.totalPages}`);
  console.log(`   Orphan pages: ${analysis.orphanPages.length}`);
  console.log(`   Weak pages: ${analysis.weakPages.length}`);
  console.log(`   Strong pages: ${analysis.strongPages.length}`);
  console.log(`   Avg incoming links: ${analysis.averageIncomingLinks.toFixed(2)}`);
  console.log(`   Avg outgoing links: ${analysis.averageOutgoingLinks.toFixed(2)}\n`);

  // 2. Generate link suggestions
  console.log('💡 Generating link suggestions...\n');

  const allSuggestions = generateLinkSuggestions();
  const prioritized = prioritizeSuggestions(allSuggestions);
  const grouped = groupSuggestionsByPage(prioritized);

  console.log(`   Total suggestions: ${allSuggestions.length}`);
  console.log(`   High priority: ${prioritized.filter(s => s.priority === 'high').length}`);
  console.log(`   Medium priority: ${prioritized.filter(s => s.priority === 'medium').length}`);
  console.log(`   Low priority: ${prioritized.filter(s => s.priority === 'low').length}\n`);

  // 3. Show top priority fixes
  console.log('🎯 Top Priority Link Additions:\n');

  const highPriority = prioritized.filter(s => s.priority === 'high').slice(0, 20);

  highPriority.forEach((suggestion, i) => {
    console.log(`${i + 1}. Add link on ${suggestion.fromPage}`);
    console.log(`   → To: ${suggestion.toPage}`);
    console.log(`   → Anchor: "${suggestion.anchorText}"`);
    console.log(`   → Reason: ${suggestion.reason}`);
    if (suggestion.context) {
      console.log(`   → Context: ${suggestion.context}`);
    }
    console.log();
  });

  // 4. Pages that will benefit most
  console.log('📈 Pages That Will Benefit Most:\n');

  const pagesNeedingLinks = findPagesNeedingLinks(analysis.linkGraph, 3);
  const topBeneficiaries = pagesNeedingLinks.slice(0, 10);

  for (const page of topBeneficiaries) {
    const incomingSuggestions = getSuggestionsToPage(page.url);

    console.log(`${page.url}`);
    console.log(`   Current links: ${page.incomingLinks.length}`);
    console.log(`   Suggested links: ${incomingSuggestions.length}`);
    console.log(`   Potential total: ${page.incomingLinks.length + incomingSuggestions.length}`);
    console.log(`   Impact: +${incomingSuggestions.length} links (+${(incomingSuggestions.length / Math.max(page.incomingLinks.length, 1) * 100).toFixed(0)}%)`);
    console.log();
  }

  // 5. Estimated impact
  console.log('📊 Estimated Impact After Implementation:\n');

  // Calculate new averages if all suggestions are implemented
  const currentAvg = analysis.averageIncomingLinks;
  const suggestionsPerPage = allSuggestions.length / analysis.totalPages;
  const estimatedNewAvg = currentAvg + suggestionsPerPage;

  console.log(`   Current avg incoming links: ${currentAvg.toFixed(2)}`);
  console.log(`   Estimated new avg: ${estimatedNewAvg.toFixed(2)}`);
  console.log(`   Improvement: +${(estimatedNewAvg - currentAvg).toFixed(2)} links per page`);
  console.log(`   Percentage increase: +${((estimatedNewAvg / currentAvg - 1) * 100).toFixed(0)}%\n`);

  // Orphan page reduction
  const orphansWithSuggestions = analysis.orphanPages.filter(page => {
    const suggestions = getSuggestionsToPage(page.url);
    return suggestions.length > 0;
  });

  console.log(`   Orphan pages that will be fixed: ${orphansWithSuggestions.length}/${analysis.orphanPages.length}`);
  console.log(`   Remaining orphans: ${analysis.orphanPages.length - orphansWithSuggestions.length}\n`);

  // 6. Implementation plan
  console.log('📋 Implementation Plan:\n');

  console.log('Phase 1: Fix Orphan Pages (High Priority)');
  console.log(`   - Add RelatedContent component to all blog/learn pages`);
  console.log(`   - Add breadcrumbs to all pages`);
  console.log(`   - Create topic cluster hub pages`);
  console.log(`   - Expected: ${orphansWithSuggestions.length} orphans fixed\n`);

  console.log('Phase 2: Strengthen Weak Pages (Medium Priority)');
  console.log(`   - Add "Related Articles" sections`);
  console.log(`   - Add contextual links in existing content`);
  console.log(`   - Link from blog index to all posts`);
  console.log(`   - Expected: ${analysis.weakPages.length} weak pages strengthened\n`);

  console.log('Phase 3: Build Topic Clusters (Medium Priority)');
  console.log(`   - Create hub-and-spoke linking structure`);
  console.log(`   - Bidirectional links between hub and spokes`);
  console.log(`   - Expected: Full cluster coverage for all content\n`);

  console.log('Phase 4: Optimize Link Distribution (Low Priority)');
  console.log(`   - Balance outgoing links across pages`);
  console.log(`   - Add footer navigation`);
  console.log(`   - Create category landing pages`);
  console.log(`   - Expected: All pages with 3+ incoming links\n`);

  // 7. Quick wins
  console.log('⚡ Quick Wins (Implement First):\n');

  const quickWins = [
    '1. Add <RelatedContent> component to blog post template → fixes ~60 orphan blog posts',
    '2. Add <Breadcrumbs> component to all pages → adds 1-2 links per page',
    '3. Create /learn/cat-litter-guide hub page → central link hub for odor control content',
    '4. Add "Try Free" CTA links to all blog posts → drives traffic to /products/trial-size',
    '5. Link /blog index to all blog posts → fixes blog post discoverability',
  ];

  quickWins.forEach(win => {
    console.log(`   ${win}`);
  });

  console.log('\n✅ Analysis complete');
  console.log('\n💡 Next steps:');
  console.log('   1. Run: pnpm seo:analyze-links (to see current orphans)');
  console.log('   2. Implement RelatedContent component on blog pages');
  console.log('   3. Add Breadcrumbs component to page layouts');
  console.log('   4. Create topic cluster hub pages');
  console.log('   5. Re-run analysis to measure improvement');
}

main().catch(error => {
  console.error('❌ Analysis failed:', error);
  process.exit(1);
});
