const fs = require('fs');
const path = require('path');

// Read the files
const enFile = fs.readFileSync(path.join(__dirname, 'src/translations/en.ts'), 'utf-8');
const frFile = fs.readFileSync(path.join(__dirname, 'src/translations/fr.ts'), 'utf-8');
// Manual comparison of key sections
console.log('=== TRANSLATION AUDIT ===\n');

// Check hero section differences
console.log('Checking hero.headline...');
console.log('EN has hero.headline:', enFile.includes('headline: "Love Your Cat. Lose The Smell.'));
console.log('FR has hero.headline:', frFile.includes('headline:'));

console.log('\nChecking hero.subheadline...');
console.log('EN has hero.subheadline:', enFile.includes('subheadline:'));
console.log('FR has hero.subheadline:', frFile.includes('subheadline:'));

// Count nav items
const enNavMatches = enFile.match(/nav:\s*\{[\s\S]*?\},?\s*\/\/ Navigation/);
const frNavMatches = frFile.match(/nav:\s*\{[\s\S]*?\},?\s*\/\/ Navigation/);

console.log('\n=== NAV ITEMS COUNT ===');
console.log('EN nav section length:', enNavMatches ? enNavMatches[0].length : 0);
console.log('FR nav section length:', frNavMatches ? frNavMatches[0].length : 0);

// Check FAQ items count
const enFaqItems = (enFile.match(/items:\s*\[/g) || []).length;
const frFaqItems = (frFile.match(/items:\s*\[/g) || []).length;
console.log('\n=== FAQ SECTIONS ===');
console.log('EN faq items arrays:', enFaqItems);
console.log('FR faq items arrays:', frFaqItems);

// Check structuredData
console.log('\n=== STRUCTURED DATA ===');
console.log('EN has structuredData:', enFile.includes('structuredData:'));
console.log('FR has structuredData:', frFile.includes('structuredData:'));

// Check freeTrialPage
console.log('\n=== FREE TRIAL PAGE ===');
console.log('EN has freeTrialPage:', enFile.includes('freeTrialPage:'));
console.log('FR has freeTrialPage:', frFile.includes('freeTrialPage:'));

// Check contactPage
console.log('\n=== CONTACT PAGE ===');
console.log('EN has contactPage:', enFile.includes('contactPage:'));
console.log('FR has contactPage:', frFile.includes('contactPage:'));

// Check productComparison
console.log('\n=== PRODUCT COMPARISON ===');
console.log('EN has productComparison:', enFile.includes('productComparison:'));
console.log('FR has productComparison:', frFile.includes('productComparison:'));

// Check productsPage
console.log('\n=== PRODUCTS PAGE ===');
console.log('EN has productsPage:', enFile.includes('productsPage:'));
console.log('FR has productsPage:', frFile.includes('productsPage:'));

// Check privacyPolicy
console.log('\n=== PRIVACY POLICY ===');
console.log('EN has privacyPolicy:', enFile.includes('privacyPolicy:'));
console.log('FR has privacyPolicy:', frFile.includes('privacyPolicy:'));

// Check faqItems and faqCategories
console.log('\n=== FAQ ITEMS/CATEGORIES ===');
console.log('EN has faqItems:', enFile.includes('faqItems:'));
console.log('FR has faqItems:', frFile.includes('faqItems:'));
console.log('EN has faqCategories:', enFile.includes('faqCategories:'));
console.log('FR has faqCategories:', frFile.includes('faqCategories:'));

// Check faqPage
console.log('\n=== FAQ PAGE ===');
console.log('EN has faqPage:', enFile.includes('faqPage:'));
console.log('FR has faqPage:', frFile.includes('faqPage:'));

// Check ui
console.log('\n=== UI ===');
console.log('EN has ui:', enFile.includes('ui:'));
console.log('FR has ui:', frFile.includes('ui:'));

// Check exitPopup
console.log('\n=== EXIT POPUP ===');
console.log('EN has exitPopup:', enFile.includes('exitPopup:'));
console.log('FR has exitPopup:', frFile.includes('exitPopup:'));

// Check homepage
console.log('\n=== HOMEPAGE ===');
console.log('EN has homepage:', enFile.includes('homepage:'));
console.log('FR has homepage:', frFile.includes('homepage:'));

// Check blog
console.log('\n=== BLOG ===');
console.log('EN has blog:', enFile.includes('blog:'));
console.log('FR has blog:', frFile.includes('blog:'));

// Check retailers
console.log('\n=== RETAILERS ===');
console.log('EN has retailers:', enFile.includes('retailers:'));
console.log('FR has retailers:', frFile.includes('retailers:'));

// Check scrollingBar
console.log('\n=== SCROLLING BAR ===');
console.log('EN has scrollingBar:', enFile.includes('scrollingBar:'));
console.log('FR has scrollingBar:', frFile.includes('scrollingBar:'));

// Check maps
console.log('\n=== MAPS ===');
console.log('EN has maps:', enFile.includes('maps:'));
console.log('FR has maps:', frFile.includes('maps:'));

// Check upsell
console.log('\n=== UPSELL ===');
console.log('EN has upsell:', enFile.includes('upsell:'));
console.log('FR has upsell:', frFile.includes('upsell:'));

// Check affiliate
console.log('\n=== AFFILIATE ===');
console.log('EN has affiliate:', enFile.includes('affiliate:'));
console.log('FR has affiliate:', frFile.includes('affiliate:'));

// Check ammonia
console.log('\n=== AMMONIA ===');
console.log('EN has ammonia:', enFile.includes('ammonia:'));
console.log('FR has ammonia:', frFile.includes('ammonia:'));

// Check tryFreePage
console.log('\n=== TRY FREE PAGE ===');
console.log('EN has tryFreePage:', enFile.includes('tryFreePage:'));
console.log('FR has tryFreePage:', frFile.includes('tryFreePage:'));

// Check socialProofBadges
console.log('\n=== SOCIAL PROOF BADGES ===');
console.log('EN has socialProofBadges:', enFile.includes('socialProofBadges:'));
console.log('FR has socialProofBadges:', frFile.includes('socialProofBadges:'));

// Check b2bCaseStudies
console.log('\n=== B2B CASE STUDIES ===');
console.log('EN has b2bCaseStudies:', enFile.includes('b2bCaseStudies:'));
console.log('FR has b2bCaseStudies:', frFile.includes('b2bCaseStudies:'));

// Check referral
console.log('\n=== REFERRAL ===');
console.log('EN has referral:', enFile.includes('referral:'));
console.log('FR has referral:', frFile.includes('referral:'));

// Check cityPage
console.log('\n=== CITY PAGE ===');
console.log('EN has cityPage:', enFile.includes('cityPage:'));
console.log('FR has cityPage:', frFile.includes('cityPage:'));

// Check locations
console.log('\n=== LOCATIONS ===');
console.log('EN has locations:', enFile.includes('locations:'));
console.log('FR has locations:', frFile.includes('locations:'));

console.log('\n=== END OF AUDIT ===');
