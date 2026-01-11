import * as dotenv from 'dotenv';
import * as path from 'path';
import * as https from 'https';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const ZENDESK_CONFIG = {
  subdomain: process.env.ZENDESK_SUBDOMAIN || 'purrifyca',
  email: process.env.ZENDESK_EMAIL || 'hello@purrify.ca',
  apiToken: process.env.ZENDESK_API_TOKEN || '',
};

if (!ZENDESK_CONFIG.apiToken) {
  console.error('ZENDESK_API_TOKEN is not set');
  process.exit(1);
}

const AUTH_HEADER = 'Basic ' + Buffer.from(`${ZENDESK_CONFIG.email}/token:${ZENDESK_CONFIG.apiToken}`).toString('base64');

// Complete article content with accurate pricing and product information
const UPDATED_ARTICLES: Record<string, { title: string; body: string }> = {
  // Product Sizes and Pricing - COMPLETE
  'Purrify Product Sizes and Pricing': {
    title: 'Purrify Product Sizes and Pricing',
    body: `<h2>Available Sizes</h2>

<p>Purrify is available in three convenient sizes to suit every household:</p>

<table>
  <thead>
    <tr>
      <th>Size</th>
      <th>Price</th>
      <th>Best For</th>
      <th>Duration</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>12g Trial Size</strong></td>
      <td><strong>FREE</strong> (just pay $4.76 S&amp;H Canada / $6.39 USA)</td>
      <td>First-time customers</td>
      <td>~1 week for 1 cat</td>
    </tr>
    <tr>
      <td><strong>50g Standard</strong></td>
      <td><strong>$14.99</strong> + shipping</td>
      <td>Single-cat households</td>
      <td>2-3 weeks for 1 cat</td>
    </tr>
    <tr>
      <td><strong>120g Family Pack</strong></td>
      <td><strong>$24.99</strong> (free shipping over $25)</td>
      <td>Multi-cat households (2-3 cats)</td>
      <td>~1 week for 2-3 cats</td>
    </tr>
  </tbody>
</table>

<h2>Subscribe &amp; Save (Autoship)</h2>

<p>Save up to <strong>29%</strong> with our quarterly autoship program:</p>

<ul>
  <li><strong>3 × 50g Quarterly</strong>: $31.99 every 3 months (reg. $44.97 - save $12.98)</li>
  <li><strong>3 × 120g Quarterly</strong>: Best value for multi-cat homes</li>
  <li>Free shipping on all autoship orders</li>
  <li>Cancel or pause anytime</li>
  <li>Price locked in forever</li>
</ul>

<h2>Money-Back Guarantee</h2>

<p>All purchases are covered by our <strong>30-day satisfaction guarantee</strong>. If Purrify doesn't eliminate your litter box odors, we'll refund your purchase - no questions asked.</p>

<h2>Where to Buy</h2>

<ul>
  <li><strong>Online</strong>: <a href="https://purrify.ca/shop">purrify.ca/shop</a></li>
  <li><strong>Free Trial</strong>: <a href="https://purrify.ca/free">purrify.ca/free</a></li>
</ul>`
  },

  // Shipping Options - COMPLETE
  'Shipping Options and Costs': {
    title: 'Shipping Options and Costs',
    body: `<h2>Canadian Shipping</h2>

<table>
  <thead>
    <tr>
      <th>Shipping Method</th>
      <th>Delivery Time</th>
      <th>Cost</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Standard Shipping</td>
      <td>5-7 business days</td>
      <td><strong>FREE</strong> on orders over $25</td>
    </tr>
    <tr>
      <td>Express Shipping</td>
      <td>2-3 business days</td>
      <td>$9.99</td>
    </tr>
    <tr>
      <td>Priority Shipping</td>
      <td>1-2 business days</td>
      <td>$14.99</td>
    </tr>
  </tbody>
</table>

<p><strong>Same-day shipping</strong> on orders placed before 2 PM EST (Monday-Friday).</p>

<h2>International Shipping</h2>

<table>
  <thead>
    <tr>
      <th>Destination</th>
      <th>Cost</th>
      <th>Delivery Time</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>United States</td>
      <td>$12.99</td>
      <td>7-14 business days</td>
    </tr>
    <tr>
      <td>UK / European Union</td>
      <td>$19.99</td>
      <td>14-21 business days</td>
    </tr>
    <tr>
      <td>Australia</td>
      <td>$24.99</td>
      <td>21-35 business days</td>
    </tr>
  </tbody>
</table>

<p><em>Note: International orders may be subject to customs duties and taxes, which are the responsibility of the recipient.</em></p>

<h2>Free Shipping</h2>

<ul>
  <li>Orders over <strong>$25 CAD</strong> qualify for free standard shipping within Canada</li>
  <li>All <strong>autoship/subscription orders</strong> include free shipping</li>
</ul>

<h2>Order Tracking</h2>

<p>You'll receive a tracking number via email once your order ships. Track your order anytime at <a href="https://purrify.ca/support/orders">purrify.ca/support/orders</a>.</p>`
  },

  // Delivery Times by Province - COMPLETE
  'Delivery Times by Province': {
    title: 'Delivery Times by Province',
    body: `<h2>Standard Shipping (5-7 Business Days)</h2>

<p>We ship from our fulfillment center in Ontario. Here are typical delivery times by province:</p>

<table>
  <thead>
    <tr>
      <th>Province</th>
      <th>Standard</th>
      <th>Express</th>
      <th>Priority</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Ontario (ON)</td>
      <td>2-4 days</td>
      <td>1-2 days</td>
      <td>Next day</td>
    </tr>
    <tr>
      <td>Quebec (QC)</td>
      <td>3-5 days</td>
      <td>1-2 days</td>
      <td>1-2 days</td>
    </tr>
    <tr>
      <td>British Columbia (BC)</td>
      <td>4-6 days</td>
      <td>2-3 days</td>
      <td>1-2 days</td>
    </tr>
    <tr>
      <td>Alberta (AB)</td>
      <td>4-6 days</td>
      <td>2-3 days</td>
      <td>1-2 days</td>
    </tr>
    <tr>
      <td>Manitoba (MB)</td>
      <td>4-5 days</td>
      <td>2-3 days</td>
      <td>1-2 days</td>
    </tr>
    <tr>
      <td>Saskatchewan (SK)</td>
      <td>4-5 days</td>
      <td>2-3 days</td>
      <td>1-2 days</td>
    </tr>
    <tr>
      <td>Nova Scotia (NS)</td>
      <td>5-7 days</td>
      <td>2-3 days</td>
      <td>2-3 days</td>
    </tr>
    <tr>
      <td>New Brunswick (NB)</td>
      <td>5-7 days</td>
      <td>2-3 days</td>
      <td>2-3 days</td>
    </tr>
    <tr>
      <td>Newfoundland (NL)</td>
      <td>6-8 days</td>
      <td>3-4 days</td>
      <td>2-3 days</td>
    </tr>
    <tr>
      <td>Prince Edward Island (PE)</td>
      <td>5-7 days</td>
      <td>2-3 days</td>
      <td>2-3 days</td>
    </tr>
    <tr>
      <td>Territories (NT, YT, NU)</td>
      <td>7-10 days</td>
      <td>4-5 days</td>
      <td>3-4 days</td>
    </tr>
  </tbody>
</table>

<h2>Shipping Costs</h2>

<ul>
  <li><strong>Standard</strong>: FREE on orders over $25</li>
  <li><strong>Express</strong>: $9.99</li>
  <li><strong>Priority</strong>: $14.99</li>
</ul>

<p>Orders placed before 2 PM EST ship same day (Monday-Friday).</p>`
  },

  // How to Use - Quick Start Guide
  'How to Use Purrify - Quick Start Guide': {
    title: 'How to Use Purrify - Quick Start Guide',
    body: `<h2>3 Simple Steps</h2>

<h3>Step 1: Sprinkle</h3>
<p>Sprinkle <strong>1-2 tablespoons</strong> of Purrify evenly over your cat's litter. For the 12g trial size, use the entire pouch for one litter box.</p>

<h3>Step 2: Mix</h3>
<p>Gently mix Purrify into the top layer of litter using your scoop. This ensures maximum odor-trapping contact.</p>

<h3>Step 3: Maintain</h3>
<p>Scoop daily as normal. Reapply Purrify every <strong>5-7 days</strong>, or whenever you add fresh litter.</p>

<h2>Dosage Guide</h2>

<table>
  <thead>
    <tr>
      <th>Household</th>
      <th>Amount per Box</th>
      <th>Frequency</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1 cat</td>
      <td>1 tablespoon</td>
      <td>Every 5-7 days</td>
    </tr>
    <tr>
      <td>2 cats</td>
      <td>1.5 tablespoons</td>
      <td>Every 5-7 days</td>
    </tr>
    <tr>
      <td>3+ cats</td>
      <td>2 tablespoons</td>
      <td>Every 4-5 days</td>
    </tr>
  </tbody>
</table>

<h2>How Long Does Each Size Last?</h2>

<ul>
  <li><strong>12g Trial</strong>: ~1 week for 1 cat (1-2 applications)</li>
  <li><strong>50g Standard ($14.99)</strong>: 2-3 weeks for 1 cat</li>
  <li><strong>120g Family Pack ($24.99)</strong>: ~1 week for multi-cat homes, or 3+ weeks for 1 cat</li>
</ul>

<h2>Pro Tips</h2>

<ul>
  <li>Works with ALL litter types: clumping, non-clumping, crystal, paper, wood, corn</li>
  <li>Safe for automatic/self-cleaning litter boxes</li>
  <li>For best results, apply after scooping or when adding fresh litter</li>
  <li>Store in a cool, dry place with lid sealed to maintain freshness</li>
</ul>`
  },

  // What is Purrify - COMPLETE
  'What is Purrify and how does it work?': {
    title: 'What is Purrify and how does it work?',
    body: `<h2>What is Purrify?</h2>

<p>Purrify is a premium <strong>activated coconut carbon</strong> cat litter additive that eliminates litter box odors at the molecular level. Unlike air fresheners that mask smells, Purrify actually <strong>traps and neutralizes</strong> odor-causing molecules.</p>

<h2>How It Works</h2>

<p>Activated carbon has millions of microscopic pores that act like tiny sponges. When odor molecules (ammonia, sulfur compounds, etc.) come into contact with Purrify, they get trapped in these pores through a process called <strong>adsorption</strong>.</p>

<p>Key benefits:</p>
<ul>
  <li><strong>Instant odor elimination</strong> - Works within seconds</li>
  <li><strong>Long-lasting</strong> - One application lasts 5-7 days</li>
  <li><strong>100% natural</strong> - Made from coconut shells, no chemicals</li>
  <li><strong>Safe for all cats</strong> - Including kittens and seniors</li>
</ul>

<h2>Technical Specifications</h2>

<ul>
  <li><strong>Material</strong>: 100% activated coconut shell carbon</li>
  <li><strong>Iodine Number</strong>: ≥1000 mg/g (high adsorption capacity)</li>
  <li><strong>Surface Area</strong>: ~1050 m²/g (massive odor-trapping surface)</li>
  <li><strong>Certifications</strong>: NSF/ANSI 61, FCC Food Grade</li>
</ul>

<h2>Product Sizes &amp; Pricing</h2>

<ul>
  <li><strong>12g Trial</strong>: FREE (just pay $4.76 S&amp;H) - <a href="https://purrify.ca/free">Get yours here</a></li>
  <li><strong>50g Standard</strong>: $14.99 - Best for single-cat homes</li>
  <li><strong>120g Family Pack</strong>: $24.99 - Best for multi-cat homes</li>
</ul>

<p>All purchases include our <strong>30-day satisfaction guarantee</strong>.</p>`
  },

  // Safety - COMPLETE
  'Is Purrify safe for cats and kittens?': {
    title: 'Is Purrify safe for cats and kittens?',
    body: `<h2>100% Safe for All Cats</h2>

<p>Yes! Purrify is completely safe for cats of all ages, including kittens and senior cats. Here's why:</p>

<h3>What's In Purrify?</h3>

<p>Purrify contains only <strong>100% activated coconut shell carbon</strong> - nothing else. No chemicals, no fragrances, no additives, no fillers.</p>

<h3>Why It's Safe</h3>

<ul>
  <li><strong>Non-toxic</strong>: Activated carbon is the same material used in water filters and medical treatments</li>
  <li><strong>Food-grade certified</strong>: Meets NSF/ANSI 61 and FCC Food Grade standards</li>
  <li><strong>Dust-free formula</strong>: Won't irritate respiratory systems</li>
  <li><strong>No fragrances</strong>: Won't overwhelm your cat's sensitive nose</li>
  <li><strong>Inert material</strong>: Doesn't react with anything in the litter box</li>
</ul>

<h3>If Ingested</h3>

<p>If your cat accidentally ingests a small amount of Purrify, don't worry. Activated carbon passes through the digestive system without being absorbed. It's actually used in veterinary medicine to treat poisoning.</p>

<h3>Safe for Sensitive Cats</h3>

<p>Purrify is ideal for cats with:</p>
<ul>
  <li>Respiratory sensitivities</li>
  <li>Allergies to fragrances</li>
  <li>Sensitive skin</li>
  <li>Anxiety around strong scents</li>
</ul>

<h2>Certifications</h2>

<ul>
  <li>NSF/ANSI 61 Certified (safe for drinking water contact)</li>
  <li>FCC Food Grade Certified</li>
  <li>Made from sustainable coconut shells</li>
</ul>`
  },

  // 30-Day Guarantee
  '30-Day Satisfaction Guarantee': {
    title: '30-Day Satisfaction Guarantee',
    body: `<h2>Our Promise to You</h2>

<p>We're confident Purrify will eliminate your litter box odors. If it doesn't, we'll refund your purchase - <strong>no questions asked</strong>.</p>

<h2>How It Works</h2>

<ol>
  <li>Try Purrify for up to 30 days</li>
  <li>If you're not completely satisfied, contact us</li>
  <li>We'll process your refund promptly</li>
</ol>

<h2>What's Covered</h2>

<ul>
  <li>All Purrify products purchased from purrify.ca</li>
  <li>First-time and repeat purchases</li>
  <li>Single purchases and subscription orders</li>
</ul>

<h2>How to Request a Refund</h2>

<p>Contact us within 30 days of delivery:</p>
<ul>
  <li><strong>Email</strong>: support@purrify.ca</li>
  <li><strong>Chat</strong>: Use the chat widget on purrify.ca</li>
  <li><strong>Phone</strong>: Available Mon-Fri 9 AM - 5 PM EST</li>
</ul>

<p>Please have your order number ready (found in your confirmation email).</p>

<h2>Refund Timeline</h2>

<ul>
  <li><strong>Processing</strong>: 1-2 business days</li>
  <li><strong>Bank processing</strong>: 5-10 business days (varies by bank)</li>
  <li><strong>Refund method</strong>: Original payment method</li>
</ul>

<h2>Try Risk-Free</h2>

<p>Start with our <strong>FREE trial</strong> (just pay $4.76 S&amp;H): <a href="https://purrify.ca/free">purrify.ca/free</a></p>`
  },

  // Payment Methods
  'What Payment Methods Do You Accept?': {
    title: 'What Payment Methods Do You Accept?',
    body: `<h2>Accepted Payment Methods</h2>

<p>We accept all major payment methods for your convenience:</p>

<h3>Credit &amp; Debit Cards</h3>
<ul>
  <li>Visa</li>
  <li>Mastercard</li>
  <li>American Express</li>
  <li>Discover</li>
</ul>

<h3>Digital Wallets</h3>
<ul>
  <li>Apple Pay</li>
  <li>Google Pay</li>
  <li>Shop Pay</li>
  <li>PayPal</li>
</ul>

<h3>Buy Now, Pay Later</h3>
<ul>
  <li>Klarna (pay in 4 installments)</li>
  <li>Affirm</li>
  <li>Afterpay</li>
</ul>

<h2>Security</h2>

<p>All transactions are processed securely through <strong>Stripe</strong>, a PCI-compliant payment processor. Your payment information is encrypted and never stored on our servers.</p>

<h2>Currency</h2>

<p>All prices are displayed in <strong>Canadian Dollars (CAD)</strong>. International customers will see the converted amount at checkout based on current exchange rates.</p>

<h2>Subscription Billing</h2>

<p>For autoship/subscription orders:</p>
<ul>
  <li>Charged automatically every 3 months</li>
  <li>Email reminder sent 3 days before billing</li>
  <li>Easy to pause, skip, or cancel anytime</li>
</ul>`
  },

  // Troubleshooting - Still Smelly
  'Why Is My Litter Box Still Smelly?': {
    title: 'Why Is My Litter Box Still Smelly?',
    body: `<h2>Troubleshooting Odor Issues</h2>

<p>If you're still experiencing odors after using Purrify, here are the most common causes and solutions:</p>

<h3>1. Not Using Enough</h3>
<p><strong>Solution</strong>: Use 1-2 tablespoons per standard litter box. Multi-cat households need more.</p>

<h3>2. Not Mixed In</h3>
<p><strong>Solution</strong>: Gently mix Purrify into the top layer of litter for better contact with waste.</p>

<h3>3. Litter Needs Changing</h3>
<p><strong>Solution</strong>: Even with Purrify, litter should be completely changed every 1-2 weeks. Scoop daily.</p>

<h3>4. Not Enough Litter</h3>
<p><strong>Solution</strong>: Maintain 2-3 inches of litter depth for proper odor control and clumping.</p>

<h3>5. Multiple Cats, One Box</h3>
<p><strong>Solution</strong>: The rule is one litter box per cat, plus one extra. Apply Purrify to each box.</p>

<h3>6. Low-Quality Litter</h3>
<p><strong>Solution</strong>: Purrify works with all litter types, but very low-quality litters may need more help. Consider upgrading your base litter.</p>

<h2>Recommended Amounts</h2>

<table>
  <thead>
    <tr>
      <th>Cats</th>
      <th>Amount</th>
      <th>Frequency</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1 cat</td>
      <td>1 tbsp</td>
      <td>Every 5-7 days</td>
    </tr>
    <tr>
      <td>2 cats</td>
      <td>1.5 tbsp per box</td>
      <td>Every 5-7 days</td>
    </tr>
    <tr>
      <td>3+ cats</td>
      <td>2 tbsp per box</td>
      <td>Every 4-5 days</td>
    </tr>
  </tbody>
</table>

<h2>Still Having Issues?</h2>

<p>Contact us at support@purrify.ca with:</p>
<ul>
  <li>How many cats you have</li>
  <li>Type of litter you're using</li>
  <li>How much Purrify you're applying</li>
</ul>

<p>Remember: All purchases are covered by our <strong>30-day satisfaction guarantee</strong>.</p>`
  },

  // How Much to Use
  'How Much Purrify Should I Use?': {
    title: 'How Much Purrify Should I Use?',
    body: `<h2>Dosage Guide</h2>

<table>
  <thead>
    <tr>
      <th>Number of Cats</th>
      <th>Amount per Litter Box</th>
      <th>Reapply Every</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1 cat</td>
      <td>1 tablespoon (~5g)</td>
      <td>5-7 days</td>
    </tr>
    <tr>
      <td>2 cats</td>
      <td>1.5 tablespoons (~7g)</td>
      <td>5-7 days</td>
    </tr>
    <tr>
      <td>3+ cats</td>
      <td>2 tablespoons (~10g)</td>
      <td>4-5 days</td>
    </tr>
  </tbody>
</table>

<h2>How Long Each Size Lasts</h2>

<table>
  <thead>
    <tr>
      <th>Size</th>
      <th>Price</th>
      <th>1 Cat</th>
      <th>2 Cats</th>
      <th>3+ Cats</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>12g Trial</td>
      <td>FREE + $4.76 S&amp;H</td>
      <td>~1 week</td>
      <td>3-4 days</td>
      <td>2-3 days</td>
    </tr>
    <tr>
      <td>50g Standard</td>
      <td>$14.99</td>
      <td>2-3 weeks</td>
      <td>1-2 weeks</td>
      <td>~1 week</td>
    </tr>
    <tr>
      <td>120g Family</td>
      <td>$24.99</td>
      <td>4-6 weeks</td>
      <td>2-3 weeks</td>
      <td>1-2 weeks</td>
    </tr>
  </tbody>
</table>

<h2>Can I Use Too Much?</h2>

<p>No! Using extra Purrify won't harm your cat or reduce effectiveness. However, using the recommended amounts gives optimal results without waste.</p>

<h2>Application Tips</h2>

<ol>
  <li>Sprinkle Purrify evenly over the litter surface</li>
  <li>Gently mix into the top 1-2 inches of litter</li>
  <li>Reapply after scooping or when adding fresh litter</li>
</ol>

<h2>Multiple Litter Boxes?</h2>

<p>Apply the recommended amount to <strong>each</strong> litter box. The general rule is one box per cat, plus one extra.</p>`
  },
};

// Function to make API requests
function apiRequest(method: string, path: string, body?: object): Promise<any> {
  return new Promise((resolve, reject) => {
    const bodyStr = body ? JSON.stringify(body) : undefined;

    const options: https.RequestOptions = {
      hostname: `${ZENDESK_CONFIG.subdomain}.zendesk.com`,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': AUTH_HEADER,
        ...(bodyStr && { 'Content-Length': Buffer.byteLength(bodyStr) }),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: data ? JSON.parse(data) : null });
        } catch {
          resolve({ status: res.statusCode, data });
        }
      });
    });

    req.on('error', reject);
    if (bodyStr) req.write(bodyStr);
    req.end();
  });
}

async function getAllArticles(): Promise<any[]> {
  const result = await apiRequest('GET', '/api/v2/help_center/en-us/articles.json?per_page=100');
  return result.data?.articles || [];
}

async function updateArticle(articleId: number, title: string, body: string): Promise<boolean> {
  // Use translations endpoint with translation wrapper
  const result = await apiRequest('PUT', `/api/v2/help_center/articles/${articleId}/translations/en-us.json`, {
    translation: { title, body },
  });

  return result.status === 200;
}

async function main() {
  console.log('🔍 Fetching existing articles...\n');

  const articles = await getAllArticles();
  console.log(`Found ${articles.length} articles\n`);

  let updated = 0;
  let notFound = 0;

  for (const [targetTitle, content] of Object.entries(UPDATED_ARTICLES)) {
    // Find article by title (case-insensitive, partial match)
    const article = articles.find((a: any) =>
      a.title.toLowerCase().includes(targetTitle.toLowerCase()) ||
      targetTitle.toLowerCase().includes(a.title.toLowerCase())
    );

    if (article) {
      console.log(`📝 Updating: ${article.title}`);
      const success = await updateArticle(article.id, content.title, content.body);
      if (success) {
        console.log(`   ✅ Updated successfully\n`);
        updated++;
      } else {
        console.log(`   ❌ Update failed\n`);
      }
    } else {
      console.log(`⚠️  Article not found: "${targetTitle}"`);
      notFound++;
    }
  }

  console.log('\n📊 SUMMARY');
  console.log(`Updated: ${updated}`);
  console.log(`Not found: ${notFound}`);
}

main().catch(console.error);
