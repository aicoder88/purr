#!/usr/bin/env tsx
/**
 * Internal Link Analysis Script
 * Analyzes site structure to identify orphan and weak pages
 */

import {
  analyzeLinkStructure,
  getLinkSuggestions,
  findPagesNeedingLinks,
} from '../src/lib/seo/link-analyzer';

async function main() {
  console.log('🔗 Analyzing internal link structure...\n');

  const analysis = await analyzeLinkStructure();

  console.log('📊 Overview:');
  console.log(`   Total pages: ${analysis.totalPages}`);
  console.log(`   Orphan pages (0 links): ${analysis.orphanPages.length}`);
  console.log(`   Weak pages (1-2 links): ${analysis.weakPages.length}`);
  console.log(`   Strong pages (5+ links): ${analysis.strongPages.length}`);
  console.log(`   Avg incoming links: ${analysis.averageIncomingLinks.toFixed(2)}`);
  console.log(`   Avg outgoing links: ${analysis.averageOutgoingLinks.toFixed(2)}\n`);

  // Show orphan pages
  if (analysis.orphanPages.length > 0) {
    console.log('❌ Orphan Pages (0 incoming links):');
    console.log('   These pages are not linked from anywhere!\n');

    analysis.orphanPages.slice(0, 15).forEach(node => {
      console.log(`   ${node.url}`);
      console.log(`      Type: ${node.pageType}`);
      console.log(`      Outgoing: ${node.outgoingLinks.length} links`);

      // Show link suggestions
      const suggestions = getLinkSuggestions(node.url, analysis.linkGraph, 3);
      if (suggestions.length > 0) {
        console.log(`      💡 Could be linked from:`);
        suggestions.forEach(s => {
          console.log(`         - ${s.url} (${s.pageType})`);
        });
      }
      console.log();
    });

    if (analysis.orphanPages.length > 15) {
      console.log(`   ... and ${analysis.orphanPages.length - 15} more\n`);
    }
  }

  // Show weak pages
  if (analysis.weakPages.length > 0) {
    console.log('⚠️  Weak Pages (1-2 incoming links):');
    console.log('   These pages need more internal links\n');

    analysis.weakPages.slice(0, 15).forEach(node => {
      console.log(`   ${node.url}`);
      console.log(`      Type: ${node.pageType}`);
      console.log(`      Incoming: ${node.incomingLinks.length} | Outgoing: ${node.outgoingLinks.length}`);
      console.log(`      Linked from: ${node.incomingLinks.join(', ')}`);
      console.log();
    });

    if (analysis.weakPages.length > 15) {
      console.log(`   ... and ${analysis.weakPages.length - 15} more\n`);
    }
  }

  // Show strongest pages
  if (analysis.strongPages.length > 0) {
    console.log('✅ Strongest Pages (5+ incoming links):');
    console.log('   These pages have good internal link equity\n');

    analysis.strongPages.slice(0, 10).forEach(node => {
      console.log(`   ${node.url}`);
      console.log(`      Type: ${node.pageType}`);
      console.log(`      Incoming: ${node.incomingLinks.length} | Outgoing: ${node.outgoingLinks.length}`);
      console.log(`      Score: ${node.linkScore}`);
      console.log();
    });
  }

  // Show action items
  console.log('📋 Action Items:\n');

  const needsLinks = findPagesNeedingLinks(analysis.linkGraph, 3);
  const priorityPages = needsLinks.slice(0, 20);

  console.log(`   ${needsLinks.length} pages need more internal links`);
  console.log(`   Top 20 priority pages:\n`);

  priorityPages.forEach((node, i) => {
    console.log(`   ${i + 1}. ${node.url}`);
    console.log(`      Type: ${node.pageType} | Links: ${node.incomingLinks.length}`);

    const suggestions = getLinkSuggestions(node.url, analysis.linkGraph, 2);
    if (suggestions.length > 0) {
      console.log(`      💡 Add links from: ${suggestions.map(s => s.url).join(', ')}`);
    }
    console.log();
  });

  // Summary
  console.log('📈 Recommendations:\n');

  if (analysis.orphanPages.length > 0) {
    console.log(`   1. Fix ${analysis.orphanPages.length} orphan pages by adding links from:`);
    console.log('      - Related blog posts');
    console.log('      - Category/hub pages');
    console.log('      - Navigation or footer');
  }

  if (analysis.weakPages.length > 5) {
    console.log(`   2. Strengthen ${analysis.weakPages.length} weak pages by:`);
    console.log('      - Adding "Related Articles" sections');
    console.log('      - Creating topic cluster hub pages');
    console.log('      - Adding contextual links in existing content');
  }

  console.log('   3. Build topic clusters:');
  console.log('      - Create hub pages for major topics');
  console.log('      - Link all related content to the hub');
  console.log('      - Add bidirectional links between related pages');

  console.log('\n✅ Analysis complete');
}

main().catch(error => {
  console.error('❌ Analysis failed:', error);
  process.exit(1);
});
