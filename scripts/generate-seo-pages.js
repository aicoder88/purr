const fs = require('fs');
const path = require('path');

// Canadian cities data for programmatic SEO
const CANADIAN_CITIES = [
  {
    name: 'Ontario',
    slug: 'ontario',
    cities: [
      {
        name: 'Toronto',
        slug: 'toronto',
        province: 'Ontario',
        population: 2794356,
        coords: { lat: 43.6532, lng: -79.3832 },
        keyFeatures: ['Dense urban living', 'High-rise apartments', 'Multi-cat households'],
        competitors: ['PetSmart', 'Pet Valu', 'Global Pet Foods']
      },
      {
        name: 'Ottawa',
        slug: 'ottawa', 
        province: 'Ontario',
        population: 994837,
        coords: { lat: 45.4215, lng: -75.6972 },
        keyFeatures: ['Government workers', 'Urban professionals', 'Cat-friendly city'],
        competitors: ['Rens Pets', 'PetSmart', 'Walmart']
      },
      {
        name: 'Hamilton',
        slug: 'hamilton',
        province: 'Ontario', 
        population: 569353,
        coords: { lat: 43.2557, lng: -79.8711 },
        keyFeatures: ['Steel city workers', 'Urban renewal', 'Pet-friendly neighborhoods'],
        competitors: ['Pet Valu', 'Canadian Tire', 'Metro']
      }
    ]
  },
  {
    name: 'Quebec',
    slug: 'quebec',
    cities: [
      {
        name: 'Montreal',
        slug: 'montreal',
        province: 'Quebec',
        population: 1762949,
        coords: { lat: 45.5017, lng: -73.5673 },
        keyFeatures: ['Bilingual market', 'Dense apartments', 'Cat-loving culture'],
        competitors: ['Animaleries Taschereau', 'Mondou', 'PetSmart']
      },
      {
        name: 'Quebec City',
        slug: 'quebec-city',
        province: 'Quebec',
        population: 542298,
        coords: { lat: 46.8139, lng: -71.2080 },
        keyFeatures: ['Historic city', 'French-speaking', 'Tourist destination'],
        competitors: ['Mondou', 'Canadian Tire', 'IGA']
      }
    ]
  },
  {
    name: 'British Columbia',
    slug: 'british-columbia',
    cities: [
      {
        name: 'Vancouver',
        slug: 'vancouver',
        province: 'British Columbia',
        population: 675218,
        coords: { lat: 49.2827, lng: -123.1207 },
        keyFeatures: ['Eco-conscious', 'High-density living', 'Pet-friendly culture'],
        competitors: ['Bosleys', 'Pet Habitat', 'PetSmart']
      },
      {
        name: 'Calgary',
        slug: 'calgary',
        province: 'Alberta',
        population: 1336000,
        coords: { lat: 51.0447, lng: -114.0719 },
        keyFeatures: ['Oil industry', 'High income', 'Pet-friendly city'],
        competitors: ['PetLand', 'Pet Planet', 'PetSmart']
      }
    ]
  }
];

const PROBLEM_KEYWORDS = [
  {
    problem: 'ammonia-smell-cat-litter',
    title: 'Ammonia Smell from Cat Litter',
    solution: 'Purrify neutralizes ammonia at the source with activated carbon'
  },
  {
    problem: 'multiple-cats-odor-control',
    title: 'Multiple Cats Odor Control', 
    solution: 'Purrify handles multi-cat households with industrial-strength odor elimination'
  },
  {
    problem: 'apartment-cat-smell-solution',
    title: 'Apartment Cat Smell Solution',
    solution: 'Purrify eliminates odors completely, perfect for apartment living'
  },
  {
    problem: 'natural-cat-litter-additive',
    title: 'Natural Cat Litter Additive',
    solution: '100% natural activated carbon thats safe for cats and humans'
  }
];

async function generateLocationPages() {
  console.log('🚀 Starting location page generation...');
  
  const locationsDir = path.join(process.cwd(), 'pages', 'locations');
  
  if (!fs.existsSync(locationsDir)) {
    fs.mkdirSync(locationsDir, { recursive: true });
  }

  let totalPages = 0;

  // Generate pages for each city
  for (const province of CANADIAN_CITIES) {
    for (const city of province.cities) {
      await generateCityPage(city, locationsDir);
      totalPages++;
    }
  }

  console.log(`✅ Generated ${totalPages} location pages`);
  return totalPages;
}

async function generateCityPage(city, baseDir) {
  const fileName = city.slug + '.tsx';
  const componentName = city.slug.replace(/-/g, '').replace(/'/g, '');
  
  const pageContent = `import { NextSeo } from 'next-seo';

export default function ${componentName}Page() {
  const city = {
    name: '${city.name}',
    province: '${city.province}',
    population: ${city.population},
    competitors: ${JSON.stringify(city.competitors)},
    keyFeatures: ${JSON.stringify(city.keyFeatures)}
  };

  const seoTitle = \`Best Cat Litter Odor Eliminator in \${city.name}, \${city.province} | Purrify\`;
  const seoDescription = \`Eliminate cat litter odors in \${city.name}, \${city.province}. Fast shipping across \${city.province}. Trusted by \${Math.floor(city.population / 1000)}+ cat owners.\`;
  
  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: \`cat litter \${city.name}, pet supplies \${city.province}, cat odor control \${city.name}\`,
          },
          {
            name: 'geo.region',
            content: '${city.province}',
          },
          {
            name: 'geo.placename', 
            content: '${city.name}',
          },
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              Best Cat Litter Odor Eliminator in {city.name}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8">
              Trusted by {Math.floor(city.population / 1000).toLocaleString()}+ cat owners across {city.province}
            </p>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Why {city.name} Cat Owners Choose Purrify</h2>
              <ul className="text-left space-y-2">
                {city.keyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Perfect for {feature.toLowerCase()}
                  </li>
                ))}
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Fast shipping across {city.province}
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Works with any litter brand
                </li>
              </ul>
              
              <div className="mt-6">
                <a 
                  href="/products/trial-size"
                  className="inline-block bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all"
                >
                  Try Purrify in {city.name}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Local Competition */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Better Than Local {city.name} Pet Stores
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-red-700 mb-4">
                  Local Pet Stores ({city.competitors.join(', ')})
                </h3>
                <ul className="space-y-2 text-red-600">
                  <li>❌ Limited product selection</li>
                  <li>❌ Higher prices due to overhead</li>
                  <li>❌ Chemical-based deodorizers</li>
                  <li>❌ No satisfaction guarantee</li>
                </ul>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-green-700 mb-4">
                  Purrify Direct to {city.name}
                </h3>
                <ul className="space-y-2 text-green-600">
                  <li>✅ 100% natural activated carbon</li>
                  <li>✅ Direct pricing, no middleman</li>
                  <li>✅ Eliminates odors permanently</li>
                  <li>✅ 30-day money-back guarantee</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              What {city.name} Cat Owners Are Saying
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  {[1,2,3,4,5].map((star) => (
                    <span key={star} className="text-yellow-400">⭐</span>
                  ))}
                </div>
                <p className="italic mb-4">
                  "Living in {city.name} with three cats was challenging until I found Purrify. 
                  The odor control is incredible!"
                </p>
                <p className="font-semibold">- Sarah M., {city.name}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  {[1,2,3,4,5].map((star) => (
                    <span key={star} className="text-yellow-400">⭐</span>
                  ))}
                </div>
                <p className="italic mb-4">
                  "I tried everything at pet stores in {city.name}. Nothing worked like Purrify!"
                </p>
                <p className="font-semibold">- Mike R., {city.name}</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              {city.name} FAQ
            </h2>
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-2">
                  Do you deliver to {city.name}, {city.province}?
                </h3>
                <p>
                  Yes! Fast shipping across {city.province}, including {city.name}. 
                  Orders arrive within 2-3 business days.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-2">
                  How is Purrify different from products at {city.name} pet stores?
                </h3>
                <p>
                  We sell direct to keep costs low and quality high. 
                  Our activated carbon actually eliminates odors instead of masking them.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}`;

  const filePath = path.join(baseDir, fileName);
  fs.writeFileSync(filePath, pageContent);
  
  console.log(`✅ Generated: /locations/${city.slug} (${city.name})`);
}

async function generateProblemPages() {
  console.log('🎯 Generating problem/solution pages...');
  
  const solutionsDir = path.join(process.cwd(), 'pages', 'solutions');
  
  if (!fs.existsSync(solutionsDir)) {
    fs.mkdirSync(solutionsDir, { recursive: true });
  }

  let totalPages = 0;

  for (const problem of PROBLEM_KEYWORDS) {
    await generateProblemPage(problem, solutionsDir);
    totalPages++;
  }

  console.log(`✅ Generated ${totalPages} problem/solution pages`);
  return totalPages;
}

async function generateProblemPage(problem, baseDir) {
  const fileName = problem.problem + '.tsx';
  const componentName = problem.problem.replace(/-/g, '');
  
  const pageContent = `import { NextSeo } from 'next-seo';

export default function ${componentName}Page() {
  const seoTitle = '${problem.title} Solution | Purrify Activated Carbon';
  const seoDescription = 'Effective solution for ${problem.title.toLowerCase()}. ${problem.solution}. Works with any litter brand.';
  
  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: '${problem.problem.replace(/-/g, ' ')}, cat odor control, activated carbon, natural solution',
          },
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              ${problem.title}
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
              Complete solution for ${problem.title.toLowerCase()}
            </p>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-xl max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4 text-green-600">The Purrify Solution</h2>
              <p className="text-lg mb-6">${problem.solution}</p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-3xl mb-2">⚡</div>
                  <h3 className="font-bold">Instant Results</h3>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🌿</div>
                  <h3 className="font-bold">100% Natural</h3>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">💰</div>
                  <h3 className="font-bold">Cost Effective</h3>
                </div>
              </div>
              
              <a 
                href="/products/trial-size"
                className="inline-block bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold py-3 px-8 rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all"
              >
                Try Purrify Risk-Free
              </a>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Sprinkle</h3>
                <p>Add Purrify to your existing litter</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Activate</h3>
                <p>Activated carbon absorbs odor molecules</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Eliminate</h3>
                <p>Odors are permanently trapped</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to Solve Your ${problem.title}?</h2>
            <p className="text-xl mb-8">Join 1,000+ satisfied cat owners</p>
            <a 
              href="/products/compare"
              className="inline-block bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold py-4 px-8 rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all text-lg"
            >
              Shop Purrify Now
            </a>
          </div>
        </section>
      </div>
    </>
  );
}`;

  const filePath = path.join(baseDir, fileName);
  fs.writeFileSync(filePath, pageContent);
  
  console.log(`✅ Generated: /solutions/${problem.problem}`);
}

async function main() {
  try {
    console.log('🚀 Starting SEO page generation...');
    
    const locationPages = await generateLocationPages();
    const problemPages = await generateProblemPages();
    
    const totalPages = locationPages + problemPages;
    
    console.log('\\n✅ SEO PAGE GENERATION COMPLETE!');
    console.log('📊 Total pages generated: ' + totalPages);
    console.log('🌍 Location pages: ' + locationPages);
    console.log('🎯 Problem pages: ' + problemPages);
    console.log('\\n🎉 Ready to dominate search results!');
    
  } catch (error) {
    console.error('❌ Error generating SEO pages:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
