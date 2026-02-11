#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const TITLE_MAX_LENGTH = 60;
const DESC_MIN_LENGTH = 120;
const DESC_MAX_LENGTH = 155;
const APP_DIR = '/Users/macpro/dev/purr/app';

// Track changes
const changes = {
  descriptionsFixed: [],
  h1sAdded: [],
  errors: []
};

// Helper to read file
function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

// Helper to write file
function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf8');
}

// Fix descriptions that are too long
function fixLongDescription(filePath, oldDesc, newDesc) {
  try {
    let content = readFile(filePath);
    
    // Escape special regex characters in the old description
    const escapedDesc = oldDesc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Replace the description
    const descRegex = new RegExp(`(description:\s*['"])${escapedDesc}(['"])`, 'g');
    content = content.replace(descRegex, `$1${newDesc}$2`);
    
    writeFile(filePath, content);
    console.log(`✅ Fixed long description in ${path.relative('/Users/macpro/dev/purr', filePath)}`);
    changes.descriptionsFixed.push({ file: filePath, type: 'too_long' });
    return true;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    changes.errors.push({ file: filePath, error: error.message });
    return false;
  }
}

// Fix descriptions that are too short
function fixShortDescription(filePath, oldDesc, newDesc) {
  try {
    let content = readFile(filePath);
    
    // Escape special regex characters
    const escapedDesc = oldDesc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Replace the description
    const descRegex = new RegExp(`(description:\s*['"])${escapedDesc}(['"])`, 'g');
    content = content.replace(descRegex, `$1${newDesc}$2`);
    
    writeFile(filePath, content);
    console.log(`✅ Fixed short description in ${path.relative('/Users/macpro/dev/purr', filePath)}`);
    changes.descriptionsFixed.push({ file: filePath, type: 'too_short' });
    return true;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    changes.errors.push({ file: filePath, error: error.message });
    return false;
  }
}

// Main fix definitions - LONG DESCRIPTIONS (>155 chars)
const longDescFixes = [
  {
    file: '/Users/macpro/dev/purr/app/b2b/page.tsx',
    oldDesc: 'Become a Purrify retail partner. Exclusive wholesale program for pet stores, animal boutiques, and distributors across Canada. Attractive margins and comprehensive marketing support.',
    newDesc: 'Become a Purrify retail partner. Exclusive wholesale program for pet stores and distributors across Canada. Attractive margins and marketing support.'
  },
  {
    file: '/Users/macpro/dev/purr/app/b2b/sell-sheet/page.tsx',
    oldDesc: 'Download our B2B sell sheet with wholesale pricing, product specifications, and partnership opportunities. Perfect for retailers, veterinarians, and pet professionals.',
    newDesc: 'Download our B2B sell sheet with wholesale pricing and partnership opportunities. Perfect for retailers, veterinarians, and pet professionals.'
  },
  {
    file: '/Users/macpro/dev/purr/app/customer/portal/page.tsx',
    oldDesc: 'Access your Purrify customer portal to track orders, manage subscriptions, and update your account information. Easy order tracking and subscription management.',
    newDesc: 'Access your Purrify customer portal to track orders and manage subscriptions. Easy order tracking and account management.'
  },
  {
    file: '/Users/macpro/dev/purr/app/es/opiniones/page.tsx',
    oldDesc: 'Lee opiniones verificadas de Purrify. Descubre por qué más de 1,000 dueños de gatos confían en Purrify para eliminar olores de arena naturalmente. Reseñas reales de Canadá.',
    newDesc: 'Lee opiniones verificadas de Purrify. Descubre por qué 1,000+ dueños de gatos confían en Purrify para eliminar olores naturalmente. Reseñas reales.'
  },
  {
    file: '/Users/macpro/dev/purr/app/learn/activated-carbon-benefits/page.tsx',
    oldDesc: 'Discover how activated carbon litter additive benefits your cat and home. Learn the science behind odor elimination, safety, and why activated carbon is the best cat litter deodorizer.',
    newDesc: 'Discover how activated carbon litter additive benefits your cat and home. Learn the science behind odor elimination and safety.'
  },
  {
    file: '/Users/macpro/dev/purr/app/learn/activated-carbon-vs-baking-soda-deodorizers/page.tsx',
    oldDesc: 'Stop wasting money on baking soda. Science reveals activated carbon traps ammonia molecules while baking soda just masks odors. See the 90-day test results.',
    newDesc: 'Stop wasting money on baking soda. Science reveals activated carbon traps ammonia molecules while baking soda only masks odors. See test results.'
  },
  {
    file: '/Users/macpro/dev/purr/app/learn/answers/how-do-i-stop-my-cat-litter-from-smelling/page.tsx',
    oldDesc: 'Stop cat litter odor permanently with these science-backed methods. Learn why most deodorizers fail and how activated carbon eliminates ammonia at the molecular level.',
    newDesc: 'Stop cat litter odor permanently with science-backed methods. Learn why deodorizers fail and how activated carbon eliminates ammonia at molecular level.'
  },
  {
    file: '/Users/macpro/dev/purr/app/learn/cat-litter-answers/page.tsx',
    oldDesc: 'Get expert answers to every cat litter question: odor control, ammonia elimination, litter box placement, and activated carbon science. Real solutions from Purrify.',
    newDesc: 'Get expert answers to cat litter questions: odor control, ammonia elimination, litter box placement, and activated carbon science. Real solutions.'
  },
  {
    file: '/Users/macpro/dev/purr/app/learn/cat-litter-guide/page.tsx',
    oldDesc: 'Comprehensive guide to cat litter types, maintenance tips, and solving common problems. Learn how to choose the best litter for your cat and keep it fresh longer.',
    newDesc: 'Comprehensive guide to cat litter types and maintenance tips. Learn how to choose the best litter for your cat and keep it fresh longer.'
  },
  {
    file: '/Users/macpro/dev/purr/app/learn/faq/page.tsx',
    oldDesc: 'Get expert answers about activated carbon cat litter additives: how they work, activated carbon vs baking soda comparison, usage tips, safety information, and troubleshooting. Learn why coconut shell activated carbon eliminates cat litter odors better than fragrances or baking soda.',
    newDesc: 'Get expert answers about activated carbon cat litter additives: how they work, usage tips, safety, and troubleshooting. Learn why coconut shell carbon eliminates odors best.'
  },
  {
    file: '/Users/macpro/dev/purr/app/learn/glossary/page.tsx',
    oldDesc: 'Learn key terms about activated carbon, cat litter odor control, and pet care science. Definitions of adsorption, ammonia, activated carbon, coconut shell carbon, VOCs, and more.',
    newDesc: 'Learn key terms about activated carbon, cat litter odor control, and pet care science. Definitions of adsorption, ammonia, activated carbon, and more.'
  },
  {
    file: '/Users/macpro/dev/purr/app/learn/how-activated-carbon-works/page.tsx',
    oldDesc: 'Activated carbon traps odor molecules through adsorption—a physical process where molecules stick to its massive surface area. One gram = 3,000 m² surface. Here',
    newDesc: 'Activated carbon traps odor molecules through adsorption. One gram has 3,000 m² surface area for maximum odor elimination power.'
  },
  {
    file: '/Users/macpro/dev/purr/app/learn/how-to-use-deodorizer/page.tsx',
    oldDesc: 'Learn how to use activated carbon cat litter additive properly. Step-by-step instructions for your litter box, common mistakes to avoid, and pro tips for maximum odor control.',
    newDesc: 'Learn how to use activated carbon cat litter additive properly. Step-by-step instructions, common mistakes to avoid, and pro tips for maximum odor control.'
  },
  {
    file: '/Users/macpro/dev/purr/app/learn/page.tsx',
    oldDesc: 'Comprehensive guides on cat litter odor control. Learn how activated carbon works, explore solutions for every situation, and discover the science behind Purrify.',
    newDesc: 'Comprehensive guides on cat litter odor control. Learn how activated carbon works, explore solutions for every situation, and discover Purrify science.'
  },
  {
    file: '/Users/macpro/dev/purr/app/learn/safety/page.tsx',
    oldDesc: 'Comprehensive technical datasheet and safety information for Purrify Activated Carbon. Learn about certifications, specifications, and safe usage guidelines.',
    newDesc: 'Comprehensive technical datasheet and safety information for Purrify Activated Carbon. Learn about certifications, specs, and safe usage guidelines.'
  },
  {
    file: '/Users/macpro/dev/purr/app/learn/science/page.tsx',
    oldDesc: 'Explore the molecular science behind activated carbon. Learn how micropores, mesopores, and macropores work together to eliminate cat litter odors at the source.',
    newDesc: 'Explore molecular science behind activated carbon. Learn how micropores, mesopores, and macropores eliminate cat litter odors at the source.'
  },
  {
    file: '/Users/macpro/dev/purr/app/products/family-pack/page.tsx',
    oldDesc: 'Best value cat litter freshener for multi-cat households. 240g activated charcoal additive provides 2 months of odor control. Natural coconut shell formula works with any litter. Ships to USA & Canada.',
    newDesc: 'Best value cat litter freshener for multi-cat homes. 240g activated charcoal provides 2 months of odor control. Natural, works with any litter. Ships USA & Canada.'
  },
  {
    file: '/Users/macpro/dev/purr/app/products/standard/page.tsx',
    oldDesc: 'Best cat litter freshener for single-cat homes. 50g activated charcoal cat litter additive eliminates ammonia odors for 4-6 weeks. Natural, fragrance-free, works with any litter. Ships to USA & Canada.',
    newDesc: 'Best cat litter freshener for single-cat homes. 50g activated charcoal eliminates ammonia odors for 4-6 weeks. Natural, works with any litter. Ships USA & Canada.'
  },
  {
    file: '/Users/macpro/dev/purr/app/products/trial-size/page.tsx',
    oldDesc: 'FREE Cat Litter Deodorizer Trial | Just Pay $4.76 Shipping | 87% of customers upgrade within 7 days. ★ 4.8 rating. Ships to USA & Canada. Risk-free guarantee.',
    newDesc: 'FREE Cat Litter Deodorizer Trial | Just Pay $4.76 Shipping | 87% upgrade within 7 days. ★ 4.8 rating. Ships USA & Canada. Risk-free.'
  },
  {
    file: '/Users/macpro/dev/purr/app/results/page.tsx',
    oldDesc: 'See how 1,000+ cat owners eliminated litter box odor with Purrify. Real testimonials, verified reviews, and proven results from happy cat parents across Canada.',
    newDesc: 'See how 1,000+ cat owners eliminated litter box odor with Purrify. Real testimonials and verified reviews from happy cat parents across Canada.'
  },
  {
    file: '/Users/macpro/dev/purr/app/us/page.tsx',
    oldDesc: 'Eliminate cat litter odors at the source. Purrify is coming to the USA in Q1 2026! Premium activated carbon cat litter deodorizer for ultimate odor control.',
    newDesc: 'Eliminate cat litter odors at the source. Purrify is coming to USA in Q1 2026! Premium activated carbon cat litter deodorizer for odor control.'
  }
];

// SHORT DESCRIPTION FIXES - Priority pages only (most important for SEO)
const shortDescFixes = [
  {
    file: '/Users/macpro/dev/purr/app/about/page.tsx',
    oldDesc: 'Learn about Purrify and our mission to eliminate cat litter odors naturally with activated carbon technology.',
    newDesc: 'Learn about Purrify and our mission to eliminate cat litter odors naturally with activated carbon technology. Discover our story and commitment to pet health.'
  },
  {
    file: '/Users/macpro/dev/purr/app/free-trial/page.tsx',
    oldDesc: 'Get your free Purrify trial. Just pay shipping. Eliminate cat litter odors naturally with activated carbon.',
    newDesc: 'Get your free Purrify trial today. Just pay shipping. Eliminate cat litter odors naturally with premium activated carbon technology. Ships across Canada and USA.'
  },
  {
    file: '/Users/macpro/dev/purr/app/case-studies/page.tsx',
    oldDesc: 'Before & After: See how 1,000+ cat owners eliminated litter box odors. Real photos, real results. ',
    newDesc: 'Before & After: See how 1,000+ cat owners eliminated litter box odors. Real photos, real results from satisfied customers. Discover how Purrify works.'
  },
  {
    file: '/Users/macpro/dev/purr/app/learn/how-it-works/page.tsx',
    oldDesc: 'Discover the science behind Purrify',
    newDesc: 'Discover the science behind Purrify activated carbon technology. Learn how millions of micropores trap and eliminate cat litter odors at the molecular level.'
  },
  {
    file: '/Users/macpro/dev/purr/app/canada/page.tsx',
    oldDesc: 'Proudly manufactured in Canada using premium coconut shell activated carbon.',
    newDesc: 'Proudly manufactured in Canada using premium coconut shell activated carbon. Support local business while keeping your home odor-free. Ships nationwide.'
  },
  {
    file: '/Users/macpro/dev/purr/app/locations/page.tsx',
    oldDesc: 'Canadian manufacturer of activated carbon cat litter deodorizer with shipping across all provinces',
    newDesc: 'Canadian manufacturer of activated carbon cat litter deodorizer with shipping across all provinces and territories. Find retailers near you or order online.'
  },
  {
    file: '/Users/macpro/dev/purr/app/learn/solutions/ammonia-smell-cat-litter/page.tsx',
    oldDesc: 'Follow these 5 steps to eliminate ammonia odor at the source and keep your home fresh.',
    newDesc: 'Follow these 5 steps to eliminate ammonia odor at the source and keep your home fresh. Learn why activated carbon works better than baking soda or sprays.'
  },
  {
    file: '/Users/macpro/dev/purr/app/learn/solutions/how-to-neutralize-ammonia-cat-litter/page.tsx',
    oldDesc: 'Follow this proven 5-step process to eliminate ammonia smell from your litter box using activated carbon.',
    newDesc: 'Follow this proven 5-step process to eliminate ammonia smell from your litter box using activated carbon. Science-backed method for permanent odor control.'
  },
  {
    file: '/Users/macpro/dev/purr/app/learn/solutions/litter-box-smell-elimination/page.tsx',
    oldDesc: 'Follow these 5 steps to eliminate persistent litter box odor and keep your home fresh between cleanings.',
    newDesc: 'Follow these 5 steps to eliminate persistent litter box odor and keep your home fresh between cleanings. Complete guide to permanent odor elimination.'
  },
  {
    file: '/Users/macpro/dev/purr/app/learn/solutions/multiple-cats-odor-control/page.tsx',
    oldDesc: 'Follow this 5-step system to eliminate odor from 2, 3, 4, or more cats and keep your home fresh.',
    newDesc: 'Follow this 5-step system to eliminate odor from 2, 3, 4, or more cats and keep your home fresh. Multi-cat tested and proven effective for any household.'
  },
  {
    file: '/Users/macpro/dev/purr/app/learn/solutions/natural-cat-litter-additive/page.tsx',
    oldDesc: 'Follow these steps to safely and effectively control litter box odor without chemicals or fragrances.',
    newDesc: 'Follow these steps to safely and effectively control litter box odor without chemicals or fragrances. 100% natural coconut shell activated carbon method.'
  },
  {
    file: '/Users/macpro/dev/purr/app/learn/solutions/senior-cat-litter-solutions/page.tsx',
    oldDesc: 'Create an accessible, comfortable litter box solution for senior cats with arthritis and mobility issues.',
    newDesc: 'Create an accessible, comfortable litter box solution for senior cats with arthritis and mobility issues. Specialized care for aging feline companions.'
  },
  {
    file: '/Users/macpro/dev/purr/app/learn/solutions/apartment-cat-smell-solution/page.tsx',
    oldDesc: 'Follow this 5-step system to keep your apartment odor-free, even with limited ventilation or small square footage.',
    newDesc: 'Follow this 5-step system to keep your apartment odor-free, even with limited ventilation or small square footage. Perfect for condos and small spaces.'
  },
  {
    file: '/Users/macpro/dev/purr/app/thank-you/page.tsx',
    oldDesc: 'Your Purrify order has been confirmed. Get ready to experience an odor-free home!',
    newDesc: 'Your Purrify order has been confirmed. Get ready to experience an odor-free home! Track your shipment and start enjoying fresh, clean air today.'
  },
  {
    file: '/Users/macpro/dev/purr/app/thank-you/upsell/page.tsx',
    oldDesc: 'Exclusive one-time offer for new customers. Save 25% on quarterly autoship subscription.',
    newDesc: 'Exclusive one-time offer for new customers. Save 25% on quarterly autoship subscription. Never run out of Purrify and keep your home fresh year-round.'
  }
];

// Main execution
console.log('🔧 Applying SEO Meta Tag Fixes...\n');
console.log('='.repeat(70));

// Apply long description fixes
console.log('\n📛 FIXING DESCRIPTIONS TOO LONG (>155 chars):');
console.log('-'.repeat(70));
let longFixed = 0;
for (const fix of longDescFixes) {
  if (fs.existsSync(fix.file)) {
    if (fixLongDescription(fix.file, fix.oldDesc, fix.newDesc)) {
      longFixed++;
    }
  } else {
    console.log(`⚠️ File not found: ${fix.file}`);
  }
}

// Apply short description fixes
console.log('\n📛 FIXING DESCRIPTIONS TOO SHORT (<120 chars):');
console.log('-'.repeat(70));
let shortFixed = 0;
for (const fix of shortDescFixes) {
  if (fs.existsSync(fix.file)) {
    if (fixShortDescription(fix.file, fix.oldDesc, fix.newDesc)) {
      shortFixed++;
    }
  } else {
    console.log(`⚠️ File not found: ${fix.file}`);
  }
}

// Summary
console.log('\n' + '='.repeat(70));
console.log('📊 FIX SUMMARY');
console.log('='.repeat(70));
console.log(`✅ Long descriptions fixed: ${longFixed}/${longDescFixes.length}`);
console.log(`✅ Short descriptions fixed: ${shortFixed}/${shortDescFixes.length}`);
console.log(`❌ Errors: ${changes.errors.length}`);

if (changes.errors.length > 0) {
  console.log('\nErrors encountered:');
  changes.errors.forEach(e => console.log(`  - ${e.file}: ${e.error}`));
}

console.log('\n✨ Next steps:');
console.log('  1. Run the audit again to verify fixes: node /Users/macpro/dev/purr/seo_meta_audit.js');
console.log('  2. Check H1 issues - many pages need semantic H1 tags added');
console.log('  3. Build the project to verify no errors: pnpm build');
