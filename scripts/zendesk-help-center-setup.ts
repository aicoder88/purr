/**
 * Zendesk Help Center Setup Script
 *
 * Creates categories, sections, and articles in Zendesk Help Center
 * to power the chatbot with Purrify product knowledge.
 *
 * Run with: pnpm tsx scripts/zendesk-help-center-setup.ts
 */

import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Zendesk API configuration
const ZENDESK_CONFIG = {
  subdomain: process.env.ZENDESK_SUBDOMAIN || 'purrifyca',
  email: process.env.ZENDESK_EMAIL || 'hello@purrify.ca',
  apiToken: process.env.ZENDESK_API_TOKEN || '',
};

const HELP_CENTER_BASE_URL = `https://${ZENDESK_CONFIG.subdomain}.zendesk.com/api/v2/help_center`;

function getAuthHeader(): string {
  const credentials = `${ZENDESK_CONFIG.email}/token:${ZENDESK_CONFIG.apiToken}`;
  return `Basic ${Buffer.from(credentials).toString('base64')}`;
}

interface Category {
  id?: number;
  name: string;
  description: string;
}

interface Section {
  id?: number;
  name: string;
  description: string;
  categoryName: string;
}

interface Article {
  title: string;
  body: string;
  sectionName: string;
  promoted?: boolean;
  labels?: string[];
}

// ============================================================================
// HELP CENTER STRUCTURE
// ============================================================================

const categories: Category[] = [
  {
    name: 'Getting Started',
    description: 'Learn the basics of Purrify activated carbon cat litter additive',
  },
  {
    name: 'Product Information',
    description: 'Technical specifications, ingredients, safety, and certifications',
  },
  {
    name: 'Usage & Application',
    description: 'How to use Purrify for best results',
  },
  {
    name: 'Orders & Shipping',
    description: 'Shipping times, tracking, and delivery information',
  },
  {
    name: 'Troubleshooting',
    description: 'Solutions for common issues',
  },
  {
    name: 'Comparisons',
    description: 'How activated carbon compares to other odor control methods',
  },
];

const sections: Section[] = [
  // Getting Started
  { name: 'What is Purrify', description: 'Introduction to Purrify', categoryName: 'Getting Started' },
  { name: 'Quick Start Guide', description: 'Get started in minutes', categoryName: 'Getting Started' },

  // Product Information
  { name: 'Ingredients & Safety', description: 'What Purrify is made of', categoryName: 'Product Information' },
  { name: 'Certifications', description: 'Quality standards and certifications', categoryName: 'Product Information' },
  { name: 'Product Sizes', description: 'Available sizes and pricing', categoryName: 'Product Information' },

  // Usage & Application
  { name: 'How to Use', description: 'Step-by-step instructions', categoryName: 'Usage & Application' },
  { name: 'Dosage Guide', description: 'How much to use', categoryName: 'Usage & Application' },
  { name: 'Compatibility', description: 'Works with all litter types', categoryName: 'Usage & Application' },

  // Orders & Shipping
  { name: 'Shipping Options', description: 'Delivery speeds and costs', categoryName: 'Orders & Shipping' },
  { name: 'Delivery Times', description: 'Province-by-province estimates', categoryName: 'Orders & Shipping' },
  { name: 'Returns & Refunds', description: '30-day satisfaction guarantee', categoryName: 'Orders & Shipping' },

  // Troubleshooting
  { name: 'Common Issues', description: 'Solutions for common problems', categoryName: 'Troubleshooting' },

  // Comparisons
  { name: 'Activated Carbon vs Alternatives', description: 'How Purrify compares', categoryName: 'Comparisons' },
];

// ============================================================================
// ARTICLES CONTENT
// ============================================================================

const articles: Article[] = [
  // GETTING STARTED - What is Purrify
  {
    title: 'What is Purrify and how does it work?',
    sectionName: 'What is Purrify',
    promoted: true,
    labels: ['product', 'basics', 'how-it-works'],
    body: `
<h2>What is Purrify?</h2>
<p>Purrify is an activated carbon additive for cat litter that eliminates odors at the molecular level through a process called <strong>adsorption</strong>.</p>

<h3>How It Works</h3>
<p>One gram of activated carbon has a surface area equivalent to a football field, filled with microscopic pores that physically trap odor molecules like ammonia and hydrogen sulfide on contact.</p>

<p><strong>Key difference:</strong> Unlike fragrances that mask odors, Purrify removes them at the source.</p>

<h3>What Makes Purrify Special</h3>
<ul>
<li><strong>100% Natural:</strong> Made from coconut shell activated carbon</li>
<li><strong>Fragrance-Free:</strong> No artificial scents that can stress cats</li>
<li><strong>Works Instantly:</strong> Begins working within 60 seconds</li>
<li><strong>Long-Lasting:</strong> Effective for 7-14 days per application</li>
<li><strong>Universal:</strong> Works with all litter types</li>
</ul>

<h3>The Science</h3>
<p>Activated carbon works through physical adsorption - odor molecules stick to the carbon's surface rather than being chemically altered. This makes it safe, effective, and long-lasting.</p>
    `,
  },

  // GETTING STARTED - Quick Start Guide
  {
    title: 'How to Use Purrify - Quick Start Guide',
    sectionName: 'Quick Start Guide',
    promoted: true,
    labels: ['how-to', 'quick-start', 'instructions'],
    body: `
<h2>Quick Start Guide</h2>
<p>Get started with Purrify in 3 simple steps:</p>

<h3>Step 1: Sprinkle</h3>
<p>Sprinkle 1-2 tablespoons of Purrify evenly over your existing cat litter.</p>

<h3>Step 2: Mix</h3>
<p>Gently mix into the top layer of litter with a scoop, focusing on your cat's favorite spots.</p>

<h3>Step 3: Enjoy</h3>
<p>That's it! Enjoy instant odor control that lasts for weeks.</p>

<h3>Dosage Guide</h3>
<table>
<tr><th>Household</th><th>Amount</th></tr>
<tr><td>1 cat, standard box</td><td>1-2 tablespoons</td></tr>
<tr><td>2+ cats or large box</td><td>2-3 tablespoons</td></tr>
</table>

<h3>Pro Tips</h3>
<ul>
<li>For best results, add Purrify to fresh, clean litter</li>
<li>Reapply every 7-14 days or when odors return</li>
<li>Store in a cool, dry place in the sealed bag</li>
</ul>
    `,
  },

  // PRODUCT INFORMATION - Ingredients & Safety
  {
    title: 'Is Purrify safe for cats and kittens?',
    sectionName: 'Ingredients & Safety',
    promoted: true,
    labels: ['safety', 'ingredients', 'cats'],
    body: `
<h2>Safety Information</h2>
<p>Yes, Purrify is completely safe for cats, kittens, and other pets.</p>

<h3>What's in Purrify</h3>
<p>Purrify is made from <strong>100% pure coconut shell activated carbon</strong> - the same food-grade, non-toxic material used in:</p>
<ul>
<li>Hospital water systems</li>
<li>Municipal drinking water treatment</li>
<li>Household water filters</li>
<li>Aquarium filtration</li>
</ul>

<h3>What's NOT in Purrify</h3>
<ul>
<li>No added chemicals</li>
<li>No fragrances or perfumes</li>
<li>No preservatives</li>
<li>No binding agents or fillers</li>
</ul>

<h3>Certifications</h3>
<p>Purrify meets the highest safety standards:</p>
<ul>
<li><strong>NSF/ANSI 61:</strong> Safe for drinking water systems</li>
<li><strong>Food Chemicals Codex (FCC):</strong> Food-grade quality</li>
<li><strong>AWWA B604:</strong> Granular activated carbon standard</li>
<li><strong>Halal & Kosher Certified</strong></li>
</ul>

<h3>For Sensitive Cats</h3>
<p>Purrify is fragrance-free, making it ideal for cats with respiratory sensitivities. Unlike scented litters, it won't irritate your cat's nose or lungs.</p>
    `,
  },

  // PRODUCT INFORMATION - Certifications
  {
    title: 'Purrify Certifications and Quality Standards',
    sectionName: 'Certifications',
    labels: ['certifications', 'quality', 'standards'],
    body: `
<h2>Certifications & Standards</h2>
<p>Purrify meets multiple international quality and safety standards.</p>

<h3>Certifications</h3>
<ul>
<li><strong>NSF/ANSI 61:</strong> Drinking water system components</li>
<li><strong>AWWA B604:</strong> Granular activated carbon standard</li>
<li><strong>Food Chemicals Codex (FCC):</strong> Food-grade quality</li>
<li><strong>Halal Certified</strong></li>
<li><strong>Kosher Certified</strong></li>
</ul>

<h3>Technical Specifications</h3>
<table>
<tr><th>Property</th><th>Value</th></tr>
<tr><td>Iodine Number</td><td>≥ 1000 mg/g</td></tr>
<tr><td>BET Surface Area</td><td>~1050 m²/g</td></tr>
<tr><td>Moisture</td><td>≤ 5%</td></tr>
<tr><td>Ash Content</td><td>≤ 4%</td></tr>
<tr><td>Hardness</td><td>≥ 98%</td></tr>
<tr><td>Mesh Size</td><td>8×30 (2.36 – 0.60 mm)</td></tr>
</table>

<h3>Sustainable Sourcing</h3>
<p>Purrify is made from coconut shells - a renewable, sustainable resource. Coconut shell carbon is considered the highest quality for activated carbon due to its microporous structure.</p>
    `,
  },

  // PRODUCT INFORMATION - Product Sizes
  {
    title: 'Purrify Product Sizes and Pricing',
    sectionName: 'Product Sizes',
    labels: ['sizes', 'pricing', 'products'],
    body: `
<h2>Available Sizes</h2>

<h3>Trial Size - 12g</h3>
<ul>
<li>Perfect for testing with one cat</li>
<li>1-2 litter box applications</li>
<li>Shipping included</li>
</ul>

<h3>Standard Size - 50g (Most Popular)</h3>
<ul>
<li>Ideal for single-cat homes</li>
<li>6-8 applications</li>
<li>1-2 months supply</li>
</ul>

<h3>Family Pack - 120g (Best Value)</h3>
<ul>
<li>Perfect for multi-cat homes</li>
<li>15-20 applications</li>
<li>3-4 months supply</li>
</ul>

<h3>How Long Does It Last?</h3>
<p>Each application lasts 7-14 days depending on:</p>
<ul>
<li>Number of cats</li>
<li>Litter box size</li>
<li>How often you scoop</li>
</ul>

<p>For current pricing and to order, visit <a href="https://purrify.ca/products">purrify.ca/products</a></p>
    `,
  },

  // USAGE & APPLICATION - How to Use
  {
    title: 'Step-by-Step Guide: How to Use Purrify',
    sectionName: 'How to Use',
    promoted: true,
    labels: ['how-to', 'instructions', 'guide'],
    body: `
<h2>How to Use Purrify</h2>

<h3>Step 1: Clean the Litter Box</h3>
<p>Start with a clean litter box. Remove all waste and clumps. For best results, add Purrify to fresh litter.</p>

<h3>Step 2: Measure the Right Amount</h3>
<ul>
<li><strong>Standard box (1 cat):</strong> 1-2 tablespoons</li>
<li><strong>Large box or 2+ cats:</strong> 2-3 tablespoons</li>
</ul>

<h3>Step 3: Sprinkle Evenly</h3>
<p>Sprinkle Purrify evenly across the surface of the litter. Focus on corners and edges where odors concentrate.</p>

<h3>Step 4: Mix Gently</h3>
<p>Use a litter scoop to gently mix the carbon into the top layer. No need to reach the bottom.</p>

<h3>Step 5: Reapply as Needed</h3>
<p>Reapply every 7-14 days, or when you notice odors returning.</p>

<h3>Common Mistakes to Avoid</h3>
<ul>
<li><strong>Using too much:</strong> More isn't better - stick to the recommended amount</li>
<li><strong>Applying to dirty litter:</strong> Always scoop first for best results</li>
<li><strong>Not mixing:</strong> Gently mixing helps distribute the carbon</li>
</ul>
    `,
  },

  // USAGE & APPLICATION - Dosage Guide
  {
    title: 'How Much Purrify Should I Use?',
    sectionName: 'Dosage Guide',
    labels: ['dosage', 'amount', 'multi-cat'],
    body: `
<h2>Dosage Guide</h2>

<h3>Recommended Amounts</h3>
<table>
<tr><th>Situation</th><th>Amount</th></tr>
<tr><td>1 cat, standard litter box</td><td>1-2 tablespoons (6-12g)</td></tr>
<tr><td>1 cat, large litter box</td><td>2 tablespoons (12g)</td></tr>
<tr><td>2-3 cats</td><td>2-3 tablespoons (12-18g)</td></tr>
<tr><td>4+ cats</td><td>3+ tablespoons per box</td></tr>
</table>

<h3>Multi-Cat Households</h3>
<p>The general rule is one litter box per cat, plus one extra. Apply Purrify to each box.</p>

<h3>Can I Use Too Much?</h3>
<p>Using more Purrify won't harm your cat, but it's unnecessary and wasteful. The recommended amount provides optimal coverage.</p>

<h3>How Often to Reapply</h3>
<ul>
<li><strong>Single cat:</strong> Every 10-14 days</li>
<li><strong>Multiple cats:</strong> Every 7-10 days</li>
<li><strong>Strong odors:</strong> Weekly</li>
</ul>

<p>You'll know it's time to reapply when you start noticing odors returning.</p>
    `,
  },

  // USAGE & APPLICATION - Compatibility
  {
    title: 'What Types of Litter Does Purrify Work With?',
    sectionName: 'Compatibility',
    labels: ['litter-types', 'compatibility', 'automatic'],
    body: `
<h2>Litter Compatibility</h2>
<p>Purrify works with ALL types of cat litter.</p>

<h3>Compatible Litter Types</h3>
<ul>
<li>Clumping clay litter</li>
<li>Non-clumping clay litter</li>
<li>Crystal/silica gel litter</li>
<li>Wood pellet litter</li>
<li>Paper-based litter</li>
<li>Corn litter</li>
<li>Wheat litter</li>
<li>Walnut shell litter</li>
<li>Pine litter</li>
<li>Tofu/soy litter</li>
</ul>

<h3>Automatic Litter Boxes</h3>
<p>Yes! Purrify works with automatic and self-cleaning litter boxes including:</p>
<ul>
<li>Litter-Robot</li>
<li>PetSafe ScoopFree</li>
<li>CatGenie</li>
<li>And other brands</li>
</ul>

<p>The activated carbon granules are similar in size to clumping litter, so they won't interfere with sensors or mechanical components.</p>

<h3>Why It Works with Everything</h3>
<p>Purrify is an additive, not a replacement. It enhances your existing litter's odor control without changing its properties.</p>
    `,
  },

  // ORDERS & SHIPPING - Shipping Options
  {
    title: 'Shipping Options and Costs',
    sectionName: 'Shipping Options',
    labels: ['shipping', 'delivery', 'costs'],
    body: `
<h2>Shipping Options</h2>

<h3>Standard Shipping</h3>
<ul>
<li><strong>Cost:</strong> FREE on orders $25+</li>
<li><strong>Time:</strong> 5-7 business days</li>
<li><strong>Carrier:</strong> Canada Post</li>
</ul>

<h3>Express Shipping</h3>
<ul>
<li><strong>Cost:</strong> $9.99</li>
<li><strong>Time:</strong> 2-3 business days</li>
<li><strong>Carrier:</strong> Canada Post Expedited</li>
</ul>

<h3>Priority Shipping</h3>
<ul>
<li><strong>Cost:</strong> $14.99</li>
<li><strong>Time:</strong> 1-2 business days</li>
<li><strong>Carrier:</strong> Canada Post Priority</li>
</ul>

<h3>Trial Size Orders</h3>
<p>Shipping is included with all trial size orders!</p>

<h3>Order Processing</h3>
<p>Orders placed before 2 PM EST (Monday-Friday) ship the same day.</p>
    `,
  },

  // ORDERS & SHIPPING - Delivery Times
  {
    title: 'Delivery Times by Province',
    sectionName: 'Delivery Times',
    labels: ['delivery', 'provinces', 'timing'],
    body: `
<h2>Delivery Times by Province</h2>

<h3>Standard Shipping Estimates</h3>
<table>
<tr><th>Province</th><th>Standard</th><th>Express</th></tr>
<tr><td>Ontario</td><td>3-5 days</td><td>1-2 days</td></tr>
<tr><td>Quebec</td><td>3-5 days</td><td>1-2 days</td></tr>
<tr><td>British Columbia</td><td>5-7 days</td><td>2-3 days</td></tr>
<tr><td>Alberta</td><td>4-6 days</td><td>2-3 days</td></tr>
<tr><td>Manitoba</td><td>5-7 days</td><td>2-3 days</td></tr>
<tr><td>Saskatchewan</td><td>5-7 days</td><td>2-3 days</td></tr>
<tr><td>Nova Scotia</td><td>5-7 days</td><td>3-4 days</td></tr>
<tr><td>New Brunswick</td><td>5-7 days</td><td>3-4 days</td></tr>
<tr><td>Newfoundland</td><td>7-10 days</td><td>4-5 days</td></tr>
<tr><td>PEI</td><td>6-8 days</td><td>3-4 days</td></tr>
<tr><td>Northwest Territories</td><td>10-14 days</td><td>5-7 days</td></tr>
<tr><td>Nunavut</td><td>14-21 days</td><td>7-10 days</td></tr>
<tr><td>Yukon</td><td>10-14 days</td><td>5-7 days</td></tr>
</table>

<h3>Tracking Your Order</h3>
<p>You'll receive a tracking number via email once your order ships. Track your package at canadapost.ca</p>
    `,
  },

  // ORDERS & SHIPPING - Returns & Refunds
  {
    title: '30-Day Satisfaction Guarantee',
    sectionName: 'Returns & Refunds',
    labels: ['returns', 'refunds', 'guarantee'],
    body: `
<h2>30-Day Satisfaction Guarantee</h2>
<p>We stand behind Purrify with a 30-day money-back guarantee.</p>

<h3>Our Promise</h3>
<p>If Purrify doesn't meet your expectations for any reason, contact us for a full refund - no questions asked.</p>

<h3>How to Request a Refund</h3>
<ol>
<li>Contact our support team within 30 days of purchase</li>
<li>Let us know you'd like a refund</li>
<li>We'll process it within 1-2 business days</li>
<li>Refunds appear in 5-10 business days depending on your bank</li>
</ol>

<h3>Damaged Packages</h3>
<p>If your package arrives damaged, contact us within 48 hours for a free replacement.</p>

<h3>Contact Us</h3>
<p>Email: support@purrify.ca</p>
<p>Or use the chat widget on our website.</p>
    `,
  },

  // TROUBLESHOOTING - Common Issues
  {
    title: 'Why Is My Litter Box Still Smelly?',
    sectionName: 'Common Issues',
    promoted: true,
    labels: ['troubleshooting', 'odor', 'problems'],
    body: `
<h2>Troubleshooting: Still Smelly?</h2>
<p>If odors persist after adding Purrify, check these common issues:</p>

<h3>1. Not Enough Product</h3>
<p><strong>Solution:</strong> Try increasing to 2-3 tablespoons. Multi-cat homes often need more.</p>

<h3>2. Litter Needs Full Replacement</h3>
<p><strong>Solution:</strong> Old, saturated litter will smell regardless of additives. Do a complete litter change.</p>

<h3>3. Litter Box Needs Deep Cleaning</h3>
<p><strong>Solution:</strong> Wash the box with enzymatic cleaner before adding fresh litter. Plastic absorbs odors over time.</p>

<h3>4. Too Many Cats for One Box</h3>
<p><strong>Solution:</strong> The rule is one box per cat, plus one extra. Add more litter boxes if needed.</p>

<h3>5. Medical Issue</h3>
<p><strong>When to see a vet:</strong> Persistent strong urine odor can indicate a urinary tract infection. Consult your veterinarian if you notice changes in your cat's bathroom habits.</p>

<h3>6. Not Mixed In</h3>
<p><strong>Solution:</strong> Gently mix Purrify into the top layer of litter for better distribution.</p>

<h3>Still Need Help?</h3>
<p>Contact our support team - we're happy to troubleshoot with you!</p>
    `,
  },

  {
    title: 'My Cat Is Avoiding the Litter Box After Adding Purrify',
    sectionName: 'Common Issues',
    labels: ['troubleshooting', 'cat-behavior', 'litter-box'],
    body: `
<h2>Cat Avoiding Litter Box?</h2>
<p>This is rare since Purrify is odorless, but some cats are sensitive to any change.</p>

<h3>Try These Steps</h3>
<ol>
<li><strong>Reduce the amount:</strong> Start with just 1 tablespoon and gradually increase</li>
<li><strong>Mix it well:</strong> So it's less visible and blends with the litter</li>
<li><strong>Check the amount:</strong> Too much can change the litter texture</li>
<li><strong>Rule out other changes:</strong> Did you also change litter brand, box location, etc.?</li>
</ol>

<h3>When to See a Vet</h3>
<p>If litter box avoidance persists, your cat may have an unrelated health issue. Urinary problems are common in cats and require veterinary attention.</p>

<h3>Signs to Watch For</h3>
<ul>
<li>Straining to urinate</li>
<li>Blood in urine</li>
<li>Urinating outside the box frequently</li>
<li>Crying when using the litter box</li>
</ul>
    `,
  },

  // COMPARISONS - Activated Carbon vs Alternatives
  {
    title: 'Activated Carbon vs Baking Soda: Which Is Better?',
    sectionName: 'Activated Carbon vs Alternatives',
    promoted: true,
    labels: ['comparison', 'baking-soda', 'activated-carbon'],
    body: `
<h2>Activated Carbon vs Baking Soda</h2>
<p>Many cat owners wonder which is better for odor control. Here's the science.</p>

<h3>How They Work</h3>

<h4>Baking Soda (Sodium Bicarbonate)</h4>
<ul>
<li>Works through chemical neutralization</li>
<li>Reacts with acids to reduce odors</li>
<li>Limited effectiveness</li>
<li>Needs frequent replacement</li>
</ul>

<h4>Activated Carbon</h4>
<ul>
<li>Works through physical adsorption</li>
<li>Millions of microscopic pores trap odor molecules permanently</li>
<li>~3,000 times more surface area than baking soda</li>
<li>Captures a wider range of odor compounds</li>
</ul>

<h3>Effectiveness Comparison</h3>
<table>
<tr><th>Factor</th><th>Baking Soda</th><th>Activated Carbon</th></tr>
<tr><td>Surface Area</td><td>Low</td><td>~1,000 m²/g</td></tr>
<tr><td>Ammonia Removal</td><td>Moderate</td><td>Excellent</td></tr>
<tr><td>Hydrogen Sulfide</td><td>Poor</td><td>Excellent</td></tr>
<tr><td>VOCs</td><td>Poor</td><td>Excellent</td></tr>
<tr><td>Longevity</td><td>Days</td><td>7-14 days</td></tr>
</table>

<h3>The Bottom Line</h3>
<p>Activated carbon is significantly more effective at capturing a wider range of odor compounds, especially ammonia and sulfur-based molecules that cause the worst litter box smells.</p>
    `,
  },

  {
    title: 'Is Activated Carbon Better Than Scented Litter?',
    sectionName: 'Activated Carbon vs Alternatives',
    labels: ['comparison', 'scented-litter', 'fragrance-free'],
    body: `
<h2>Activated Carbon vs Scented Litter</h2>

<h3>The Key Difference</h3>
<ul>
<li><strong>Scented litters:</strong> MASK odors with fragrances</li>
<li><strong>Activated carbon:</strong> ELIMINATES odors at their source</li>
</ul>

<h3>Problems with Scented Litters</h3>
<ol>
<li><strong>Cat sensitivity:</strong> Fragrances can irritate cats' respiratory systems</li>
<li><strong>Litter box avoidance:</strong> Some cats refuse to use strongly scented boxes</li>
<li><strong>Mixed smells:</strong> Perfumes can combine with ammonia to create new unpleasant odors</li>
<li><strong>Temporary effect:</strong> The masking effect wears off quickly</li>
</ol>

<h3>Benefits of Fragrance-Free (Activated Carbon)</h3>
<ul>
<li>Actually removes odor molecules</li>
<li>Better for cats with sensitivities</li>
<li>No artificial chemicals</li>
<li>Won't deter cats from using the box</li>
<li>Long-lasting effectiveness</li>
</ul>

<h3>Best for Sensitive Cats</h3>
<p>Cats have much more sensitive noses than humans. What smells "fresh" to us can be overwhelming to them. Purrify's fragrance-free formula is ideal for cats with respiratory issues or scent sensitivities.</p>
    `,
  },

  {
    title: 'How Does Purrify Compare to Crystal Litter?',
    sectionName: 'Activated Carbon vs Alternatives',
    labels: ['comparison', 'crystal-litter', 'silica-gel'],
    body: `
<h2>Activated Carbon vs Crystal/Silica Gel Litter</h2>

<h3>How They Work Differently</h3>

<h4>Crystal/Silica Gel Litter</h4>
<ul>
<li>Absorbs moisture (liquid)</li>
<li>Some odor control through silica gel</li>
<li>Works best with fresh urine</li>
</ul>

<h4>Activated Carbon (Purrify)</h4>
<ul>
<li>Captures gas-phase odor molecules</li>
<li>Specifically targets ammonia and sulfur compounds</li>
<li>Works continuously in the air</li>
</ul>

<h3>Best Results: Use Both Together</h3>
<p>Many customers find the best results by combining crystal litter with Purrify:</p>
<ul>
<li>Crystals handle moisture absorption</li>
<li>Activated carbon captures remaining odors</li>
<li>Especially effective for ammonia that silica gel doesn't trap well</li>
</ul>

<h3>Comparison Table</h3>
<table>
<tr><th>Factor</th><th>Crystal Litter</th><th>Activated Carbon</th></tr>
<tr><td>Moisture Control</td><td>Excellent</td><td>Not applicable</td></tr>
<tr><td>Ammonia Capture</td><td>Moderate</td><td>Excellent</td></tr>
<tr><td>Sulfur Odors</td><td>Poor</td><td>Excellent</td></tr>
<tr><td>VOC Removal</td><td>Moderate</td><td>Excellent</td></tr>
</table>
    `,
  },

  // Additional FAQ articles
  {
    title: 'Can I Use Purrify for Hamsters and Other Rodents?',
    sectionName: 'Compatibility',
    labels: ['rodents', 'hamsters', 'small-pets'],
    body: `
<h2>Using Purrify with Small Pets</h2>
<p>Purrify uses the same type of activated carbon found in veterinary applications and hospital water systems.</p>

<h3>Recommended Method for Rodents</h3>
<p>For hamsters, mice, rats, and other small pets, we recommend placing Purrify in a breathable pouch near the cage rather than mixing directly with bedding.</p>

<h3>Why Use a Pouch?</h3>
<ul>
<li>Prevents direct contact with bedding</li>
<li>Minimizes dust exposure</li>
<li>Rodents can't chew or ingest the carbon</li>
<li>Still effective at absorbing odors from the air</li>
</ul>

<h3>Safety Guidelines</h3>
<ul>
<li>Ensure proper ventilation in the cage area</li>
<li>Rinse carbon before use to minimize any dust</li>
<li>Keep pouches secure and out of reach</li>
<li>Observe your pet's behavior</li>
</ul>

<h3>Product Quality</h3>
<p>Purrify meets NSF/ANSI 61 and Food Chemicals Codex standards - the same guidelines used for potable water systems.</p>
    `,
  },

  {
    title: 'What Payment Methods Do You Accept?',
    sectionName: 'Shipping Options',
    labels: ['payment', 'checkout', 'ordering'],
    body: `
<h2>Payment Methods</h2>
<p>We accept multiple secure payment options for your convenience.</p>

<h3>Accepted Payment Methods</h3>
<ul>
<li>Visa</li>
<li>Mastercard</li>
<li>American Express</li>
<li>Debit Cards</li>
<li>Apple Pay</li>
<li>Google Pay</li>
<li>Shop Pay</li>
</ul>

<h3>Security</h3>
<p>All transactions are securely processed through Stripe with industry-standard encryption. We never store your full credit card information.</p>

<h3>Currency</h3>
<p>All prices are displayed in Canadian Dollars (CAD).</p>
    `,
  },

  {
    title: 'How Long Does Purrify Last?',
    sectionName: 'Dosage Guide',
    labels: ['duration', 'longevity', 'how-long'],
    body: `
<h2>How Long Does Purrify Last?</h2>

<h3>Per Application</h3>
<p>Each application of Purrify remains effective for <strong>7-14 days</strong> depending on:</p>
<ul>
<li>Number of cats</li>
<li>Litter box size</li>
<li>How often you scoop</li>
<li>Indoor air circulation</li>
</ul>

<h3>Per Container</h3>
<table>
<tr><th>Size</th><th>Applications</th><th>Duration</th></tr>
<tr><td>Trial 12g</td><td>1-2</td><td>1-2 weeks</td></tr>
<tr><td>Standard 50g</td><td>6-8</td><td>1-2 months</td></tr>
<tr><td>Family 120g</td><td>15-20</td><td>3-4 months</td></tr>
</table>

<h3>Storage Life</h3>
<p>Properly stored (sealed, cool, dry place), Purrify has an indefinite shelf life. Activated carbon doesn't expire until its pores are saturated with odor molecules.</p>

<h3>Signs It's Time to Reapply</h3>
<p>You'll know it's time when you start noticing odors returning. Don't wait until it smells bad - reapply as soon as you notice a change.</p>
    `,
  },

  {
    title: 'What Is Activated Carbon Made From?',
    sectionName: 'Ingredients & Safety',
    labels: ['ingredients', 'coconut-shell', 'manufacturing'],
    body: `
<h2>What Is Purrify Made From?</h2>

<h3>Premium Coconut Shell</h3>
<p>Purrify uses 100% coconut shell activated carbon - considered the highest quality source for activated carbon.</p>

<h3>Why Coconut Shell?</h3>
<ul>
<li><strong>Highest surface area per gram:</strong> More odor-trapping capacity</li>
<li><strong>Optimal micropore structure:</strong> Perfect for small odor molecules</li>
<li><strong>Renewable resource:</strong> Sustainable and eco-friendly</li>
<li><strong>Lowest dust:</strong> Cleaner to handle</li>
<li><strong>Premium quality:</strong> Used in medical and water treatment applications</li>
</ul>

<h3>The Activation Process</h3>
<p>Coconut shells are processed at very high temperatures (800-1000°C) with steam to create millions of microscopic pores. This "activation" gives it a surface area of 1,000-2,000 square meters per gram - about the size of 4-8 tennis courts in every gram!</p>

<h3>No Additives</h3>
<p>Purrify contains no added chemicals, fragrances, preservatives, or fillers. The only processing is physical steam activation - the same process used for food-grade and pharmaceutical-grade carbon.</p>
    `,
  },
];

// ============================================================================
// API FUNCTIONS
// ============================================================================

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthHeader(),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Zendesk API Error (${response.status}): ${errorText}`);
  }

  return response.json();
}

async function createCategoryAPI(category: Category, locale: string = 'en-us') {
  const url = `${HELP_CENTER_BASE_URL}/${locale}/categories.json`;
  return fetchWithAuth(url, {
    method: 'POST',
    body: JSON.stringify({ category }),
  });
}

async function listCategoriesAPI(locale: string = 'en-us') {
  const url = `${HELP_CENTER_BASE_URL}/${locale}/categories.json`;
  return fetchWithAuth(url);
}

async function createSectionAPI(categoryId: number, section: { name: string; description: string }, locale: string = 'en-us') {
  const url = `${HELP_CENTER_BASE_URL}/${locale}/categories/${categoryId}/sections.json`;
  return fetchWithAuth(url, {
    method: 'POST',
    body: JSON.stringify({ section }),
  });
}

async function listSectionsAPI(categoryId: number, locale: string = 'en-us') {
  const url = `${HELP_CENTER_BASE_URL}/${locale}/categories/${categoryId}/sections.json`;
  return fetchWithAuth(url);
}

async function listPermissionGroupsAPI() {
  const url = `${HELP_CENTER_BASE_URL}/permission_groups.json`;
  return fetchWithAuth(url);
}

async function listUserSegmentsAPI() {
  const url = `${HELP_CENTER_BASE_URL}/user_segments.json`;
  return fetchWithAuth(url);
}

async function createArticleAPI(sectionId: number, article: { title: string; body: string; draft?: boolean; promoted?: boolean; label_names?: string[]; user_segment_id?: number | null; permission_group_id?: number }, locale: string = 'en-us') {
  const url = `${HELP_CENTER_BASE_URL}/${locale}/sections/${sectionId}/articles.json`;
  return fetchWithAuth(url, {
    method: 'POST',
    body: JSON.stringify({ article }),
  });
}

// ============================================================================
// MAIN SCRIPT
// ============================================================================

async function main() {
  console.log('🚀 Starting Zendesk Help Center Setup\n');

  if (!ZENDESK_CONFIG.apiToken) {
    console.error('❌ Error: ZENDESK_API_TOKEN is not set');
    process.exit(1);
  }

  console.log(`📍 Using subdomain: ${ZENDESK_CONFIG.subdomain}`);
  console.log(`📧 Using email: ${ZENDESK_CONFIG.email}\n`);

  // Store created IDs
  const categoryIds: Record<string, number> = {};
  const sectionIds: Record<string, number> = {};

  // Step 1: Create or get categories
  console.log('📁 Setting up categories...');

  try {
    // First, check existing categories
    const existingCategories = await listCategoriesAPI();
    for (const cat of existingCategories.categories || []) {
      categoryIds[cat.name] = cat.id;
      console.log(`  ✓ Found existing category: ${cat.name} (ID: ${cat.id})`);
    }
  } catch (error) {
    console.log('  ℹ️ No existing categories found, will create new ones');
  }

  for (const category of categories) {
    if (categoryIds[category.name]) {
      continue; // Already exists
    }

    try {
      const result = await createCategoryAPI(category);
      categoryIds[category.name] = result.category.id;
      console.log(`  ✓ Created category: ${category.name} (ID: ${result.category.id})`);
    } catch (error) {
      console.error(`  ❌ Failed to create category "${category.name}":`, error);
    }
  }

  // Step 2: Create sections
  console.log('\n📂 Setting up sections...');

  for (const section of sections) {
    const categoryId = categoryIds[section.categoryName];
    if (!categoryId) {
      console.error(`  ❌ Category not found for section: ${section.name}`);
      continue;
    }

    // Check existing sections in this category
    try {
      const existingSections = await listSectionsAPI(categoryId);
      const existingSection = (existingSections.sections || []).find(
        (s: { name: string }) => s.name === section.name
      );
      if (existingSection) {
        sectionIds[section.name] = existingSection.id;
        console.log(`  ✓ Found existing section: ${section.name} (ID: ${existingSection.id})`);
        continue;
      }
    } catch (error) {
      // Section doesn't exist, create it
    }

    try {
      const result = await createSectionAPI(categoryId, {
        name: section.name,
        description: section.description,
      });
      sectionIds[section.name] = result.section.id;
      console.log(`  ✓ Created section: ${section.name} (ID: ${result.section.id})`);
    } catch (error) {
      console.error(`  ❌ Failed to create section "${section.name}":`, error);
    }
  }

  // Step 3: Get user segments (for article visibility)
  console.log('\n🔐 Fetching user segments and permission groups...');
  let userSegmentId: number | null = null;

  try {
    const userSegments = await listUserSegmentsAPI();
    // Find "Everyone" or use the first public segment
    if (userSegments.user_segments && userSegments.user_segments.length > 0) {
      const everyoneSegment = userSegments.user_segments.find(
        (s: { name: string; user_type: string }) => s.name === 'Everyone' || s.user_type === 'everyone'
      );
      userSegmentId = everyoneSegment ? everyoneSegment.id : userSegments.user_segments[0].id;
      console.log(`  ✓ Using user segment ID: ${userSegmentId}`);
    }
  } catch (error) {
    console.error('  ❌ Failed to fetch user segments:', error);
  }

  // Get permission_group_id from user segments (the segment includes edit_permissions)
  // The ID we found is actually suitable - it's the "Signed-in users" or "Everyone" segment
  // For Guide, we need a different approach - use the Guide Admin API
  console.log('  ℹ️ Getting permission_group_id from Guide settings...');

  // Try to fetch from Guide general settings
  let permissionGroupId: number | null = null;
  try {
    // Try calling the Guide settings endpoint which includes default_permission_group_id
    const settingsUrl = `${HELP_CENTER_BASE_URL}/general_settings.json`;
    const settingsResponse = await fetch(settingsUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: getAuthHeader(),
      },
    });
    if (settingsResponse.ok) {
      const settings = await settingsResponse.json();
      if (settings.settings?.default_permission_group_id) {
        permissionGroupId = settings.settings.default_permission_group_id;
        console.log(`  ✓ Found default permission_group_id: ${permissionGroupId}`);
      }
    }
  } catch (error) {
    console.log('  ⚠️ Could not fetch Guide settings');
  }

  // If still no permission_group_id, try to get it from an existing article
  if (!permissionGroupId) {
    console.log('  ℹ️ Trying to get permission_group_id from existing articles...');
    try {
      // Try to search for any existing article
      const articlesUrl = `${HELP_CENTER_BASE_URL}/en-us/articles.json?per_page=1`;
      const articlesResponse = await fetch(articlesUrl, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: getAuthHeader(),
        },
      });
      if (articlesResponse.ok) {
        const articlesData = await articlesResponse.json();
        if (articlesData.articles && articlesData.articles.length > 0) {
          permissionGroupId = articlesData.articles[0].permission_group_id;
          console.log(`  ✓ Found permission_group_id from existing article: ${permissionGroupId}`);
        }
      }
    } catch (error) {
      console.log('  ⚠️ Could not fetch existing articles');
    }
  }

  if (!permissionGroupId) {
    console.error('\n❌ Could not determine permission_group_id.');
    console.log('Please create at least one article manually in Zendesk Guide first,');
    console.log('then run this script again to copy its permission_group_id.');
    return;
  }

  // Step 4: Create articles
  console.log('\n📝 Creating articles...');

  let articlesCreated = 0;
  let articlesFailed = 0;

  for (const article of articles) {
    const sectionId = sectionIds[article.sectionName];
    if (!sectionId) {
      console.error(`  ❌ Section not found for article: ${article.title}`);
      articlesFailed++;
      continue;
    }

    try {
      await createArticleAPI(sectionId, {
        title: article.title,
        body: article.body,
        draft: false, // Publish immediately
        promoted: article.promoted || false,
        label_names: article.labels || [],
        user_segment_id: userSegmentId,
        permission_group_id: permissionGroupId,
      });
      articlesCreated++;
      console.log(`  ✓ Created article: ${article.title}`);
    } catch (error) {
      articlesFailed++;
      console.error(`  ❌ Failed to create article "${article.title}":`, error);
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 SUMMARY');
  console.log('='.repeat(50));
  console.log(`Categories: ${Object.keys(categoryIds).length}`);
  console.log(`Sections: ${Object.keys(sectionIds).length}`);
  console.log(`Articles created: ${articlesCreated}`);
  console.log(`Articles failed: ${articlesFailed}`);
  console.log('\n✅ Help Center setup complete!');
  console.log(`\n🔗 View your Help Center at: https://${ZENDESK_CONFIG.subdomain}.zendesk.com/hc`);
}

main().catch(console.error);
