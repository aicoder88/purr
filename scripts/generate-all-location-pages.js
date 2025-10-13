const fs = require('fs');
const path = require('path');

// Parse cities.md to get all cities organized by province
function parseCitiesMd(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.trim().split('\n').filter(line => line.trim());

  const citiesByProvince = {};
  let currentProvince = null;

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) return;

    // Check if it's a province name (appears standalone without special chars)
    if (isProvinceName(trimmed)) {
      currentProvince = trimmed;
      citiesByProvince[currentProvince] = [];
    } else if (currentProvince) {
      citiesByProvince[currentProvince].push(trimmed);
    }
  });

  return citiesByProvince;
}

function isProvinceName(text) {
  const provinces = [
    'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick',
    'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia',
    'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan',
    'Yukon'
  ];
  return provinces.includes(text);
}

// Get province abbreviation
function getProvinceAbbr(province) {
  const abbrs = {
    'Alberta': 'AB',
    'British Columbia': 'BC',
    'Manitoba': 'MB',
    'New Brunswick': 'NB',
    'Newfoundland and Labrador': 'NL',
    'Northwest Territories': 'NT',
    'Nova Scotia': 'NS',
    'Nunavut': 'NU',
    'Ontario': 'ON',
    'Prince Edward Island': 'PE',
    'Quebec': 'QC',
    'Saskatchewan': 'SK',
    'Yukon': 'YT'
  };
  return abbrs[province] || 'CA';
}

// Generate city-specific context based on province and size
function getCityContext(cityName, province) {
  const contexts = {
    'Alberta': {
      keyFeatures: ['Energy sector workers', 'Dry climate homes', 'Growing communities'],
      competitors: ['PetSmart', 'Pet Valu', 'Homes Alive Pets'],
      testimonial1: `"Our ${cityName} home stays fresh year-round with Alberta's dry climate. Purrify works perfectly with our active lifestyle!"`,
      testimonial2: `"Great for busy families in ${cityName}. No fuss, just results. Our cats love it and so do we!"`,
      faq: {
        q: 'Does Purrify work in dry climates?',
        a: 'Yes! Activated carbon works excellently in Alberta\'s dry climate. It actually helps maintain optimal moisture levels in the litter box while eliminating odors.'
      }
    },
    'British Columbia': {
      keyFeatures: ['Eco-conscious living', 'Outdoor lifestyle', 'Pet-friendly communities'],
      competitors: ['PetSmart', 'Pet Valu', 'Bosley\'s'],
      testimonial1: `"Perfect for our eco-conscious ${cityName} household! Natural, sustainable, and it actually works better than chemical alternatives."`,
      testimonial2: `"Living the BC lifestyle means caring about what goes in our home. Purrify is 100% natural and our cats are healthier for it!"`,
      faq: {
        q: 'Is Purrify environmentally friendly?',
        a: 'Absolutely! Purrify is 100% natural activated carbon derived from renewable sources. Perfect for BC\'s eco-conscious communities. Biodegradable and zero chemicals.'
      }
    },
    'Ontario': {
      keyFeatures: ['Diverse communities', 'Urban and suburban living', 'Family-focused neighborhoods'],
      competitors: ['PetSmart', 'Pet Valu', 'Ren\'s Pets'],
      testimonial1: `"Our ${cityName} family loves Purrify! Works great in our home, and the kids can have friends over without any worries."`,
      testimonial2: `"Affordable and effective! Perfect for Ontario families who need real solutions that fit the budget."`,
      faq: {
        q: 'Is Purrify safe for families with children?',
        a: 'Yes! Purrify is 100% natural with no chemicals, fragrances, or additives. Completely safe for homes with kids, pets, and everyone in between.'
      }
    },
    'Quebec': {
      keyFeatures: ['Bilingual community', 'Urban apartments', 'Rich cultural heritage'],
      competitors: ['Mondou', 'PetSmart', 'Chico'],
      testimonial1: `"Parfait pour notre maison à ${cityName}! Purrify garde tout frais et naturel."`,
      testimonial2: `"Natural and effective! Works great in our ${cityName} apartment. Highly recommend to fellow cat owners!"`,
      faq: {
        q: 'Est-ce disponible au Québec?',
        a: `Oui! Livraison gratuite partout au Québec, incluant ${cityName}. Orders arrive within 2-3 business days. Support disponible en français!`
      }
    },
    'Manitoba': {
      keyFeatures: ['Prairie resilience', 'Extreme weather adaptability', 'Close-knit communities'],
      competitors: ['PetSmart', 'Pet Valu', 'Pets & Friends'],
      testimonial1: `"Manitoba winters mean we're indoors a lot. Purrify keeps our ${cityName} home fresh even when we can't open windows!"`,
      testimonial2: `"Reliable and effective - just like us prairie folk! Works great in our ${cityName} home year-round."`,
      faq: {
        q: 'Does Purrify work in extreme temperatures?',
        a: 'Yes! Activated carbon works in any temperature. Perfect for Manitoba\'s extreme winters and summers - keeps your home fresh no matter the weather outside.'
      }
    },
    'Saskatchewan': {
      keyFeatures: ['Prairie communities', 'Family-oriented', 'Agricultural heritage'],
      competitors: ['PetSmart', 'Pet Valu', 'Co-op'],
      testimonial1: `"Simple, natural, effective - everything we value in ${cityName}. Purrify delivers without the fancy packaging."`,
      testimonial2: `"Great value for prairie families! Our ${cityName} home stays fresh without breaking the bank."`,
      faq: {
        q: 'How economical is Purrify?',
        a: 'Very! One container typically lasts 1-2 months for most households. Much more economical than constantly buying expensive specialty litters or deodorizers.'
      }
    },
    'New Brunswick': {
      keyFeatures: ['Maritime culture', 'Bilingual communities', 'Coastal living'],
      competitors: ['PetSmart', 'Pet Valu', 'Atlantic Co-op'],
      testimonial1: `"Maritime hospitality means our home is always ready for guests. Purrify keeps our ${cityName} home welcoming!"`,
      testimonial2: `"Great for Maritime homes! Works in our ${cityName} house through all seasons. Highly recommend!"`,
      faq: {
        q: 'Does humidity affect Purrify?',
        a: 'Not at all! Activated carbon actually works great in humid maritime climates. It helps control both odors and excess moisture in the litter box.'
      }
    },
    'Nova Scotia': {
      keyFeatures: ['Coastal communities', 'Tourism-friendly', 'Historic homes'],
      competitors: ['PetSmart', 'Pet Valu', 'Global Pet Foods'],
      testimonial1: `"Our historic ${cityName} home deserves the best. Purrify keeps it fresh without harsh chemicals that could damage old woodwork!"`,
      testimonial2: `"Perfect for Nova Scotia living! Natural solution that works with our coastal lifestyle and our cats love it."`,
      faq: {
        q: 'Is Purrify safe for older homes?',
        a: 'Yes! Unlike harsh chemical deodorizers, Purrify is 100% natural and won\'t emit fumes or chemicals that could affect sensitive historic homes or finishes.'
      }
    },
    'Newfoundland and Labrador': {
      keyFeatures: ['Tight-knit communities', 'Coastal living', 'Resilient spirit'],
      competitors: ['PetSmart', 'Pet Valu', 'Colemans'],
      testimonial1: `"Newfoundland hospitality means keeping a fresh home! Purrify works perfectly in our ${cityName} house, even with two cats by the bay!"`,
      testimonial2: `"Reliable as the tides! Our ${cityName} family trusts Purrify to keep our home smelling fresh no matter the weather."`,
      faq: {
        q: 'Does Purrify work in coastal climates?',
        a: 'Absolutely! The activated carbon works great in Newfoundland\'s humid coastal climate. It controls both odors and moisture effectively.'
      }
    },
    'Prince Edward Island': {
      keyFeatures: ['Island community', 'Tourism-focused', 'Agricultural heritage'],
      competitors: ['PetSmart', 'Co-op', 'Local Pet Shops'],
      testimonial1: `"Island living means a small community - we recommend Purrify to all our ${cityName} neighbors with cats!"`,
      testimonial2: `"Perfect for our PEI home! Natural, effective, and keeps our cottage country fresh for visitors."`,
      faq: {
        q: 'How does Purrify compare to other products?',
        a: 'Purrify actually eliminates odors at the molecular level, unlike perfumed products that just mask smells. It\'s 100% natural and more effective.'
      }
    }
  };

  // Default context for territories and less common provinces
  const defaultContext = {
    keyFeatures: ['Northern communities', 'Resilient households', 'Close-knit neighbors'],
    competitors: ['Northern Stores', 'Co-op', 'Local Retailers'],
    testimonial1: `"Purrify works great in our ${cityName} home! Simple, natural, and effective - exactly what we need up here."`,
    testimonial2: `"Reliable odor control for our northern household. Our ${cityName} cats and family all appreciate the fresh air!"`,
    faq: {
      q: 'Do you ship to remote areas?',
      a: `Yes! We ship across Canada including ${cityName}. Free shipping on all orders, typically arriving within 3-5 business days.`
    }
  };

  return contexts[province] || defaultContext;
}

// Estimate population based on city size/recognition
function estimatePopulation(cityName, province) {
  const majorCities = {
    'Toronto': 2794356, 'Montreal': 1762949, 'Calgary': 1306784,
    'Ottawa': 1017449, 'Edmonton': 1010899, 'Winnipeg': 749607,
    'Vancouver': 675218, 'Quebec': 549459, 'Hamilton': 569353,
    'Kitchener': 256885, 'London': 422324, 'Victoria': 92141,
    'Halifax': 439819, 'Oshawa': 175383, 'Windsor': 229660,
    'Saskatoon': 273010, 'Regina': 226404, 'St. John\'s': 108860,
    'Barrie': 150443, 'Kelowna': 144576, 'Guelph': 135474,
    'Mississauga': 721599, 'Brampton': 656480, 'Laval': 438366,
    'Markham': 338503, 'Vaughan': 323103, 'Gatineau': 291041,
    'Longueuil': 246900, 'Burlington': 183314, 'Oakville': 211382,
    'Richmond Hill': 202022, 'Scarborough': 632098
  };

  if (majorCities[cityName]) return majorCities[cityName];

  // Estimate based on province capitals and known cities
  if (cityName.includes('Saint') || cityName.includes('Fort')) return 15000;
  return 25000; // Default estimate for smaller cities
}

// Convert city name to URL-safe slug
function cityToSlug(cityName) {
  return cityName
    .toLowerCase()
    .replace(/[áàâä]/g, 'a')
    .replace(/[éèêë]/g, 'e')
    .replace(/[íìîï]/g, 'i')
    .replace(/[óòôö]/g, 'o')
    .replace(/[úùûü]/g, 'u')
    .replace(/ç/g, 'c')
    .replace(/'/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/--+/g, '-');
}

// Generate a complete location page
function generateLocationPage(cityName, province, context, population) {
  const slug = cityToSlug(cityName);
  const trustedBy = Math.floor(population / 5000) * 10 || 50; // Rough estimate

  const nameParts = cityName.split(' ');
  const firstName1 = getRandomName(province, 1);
  const firstName2 = getRandomName(province, 2);

  return `import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { LocationSchema } from '../../src/components/seo/json-ld-schema';

export default function ${slug.replace(/-/g, '')}Page() {
  const city = {
    name: '${cityName}',
    province: '${province}',
    population: ${population},
    competitors: ${JSON.stringify(context.competitors)},
    keyFeatures: ${JSON.stringify(context.keyFeatures)}
  };

  const seoTitle = \`Best Cat Litter Odor Eliminator in \${city.name}, \${city.province} | Purrify\`;
  const seoDescription = \`Eliminate cat litter odors in \${city.name}, \${city.province}. Free shipping across \${city.province}. Trusted by ${trustedBy}+ cat owners.\`;

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
            content: '${getProvinceAbbr(province)}',
          },
          {
            name: 'geo.placename',
            content: '${cityName}',
          },
        ]}
      />

      <LocationSchema
        cityName='${cityName}'
        province='${province}'
        locale='en'
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              Best Cat Litter Odor Eliminator in {city.name}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 mb-8">
              Trusted by ${trustedBy}+ cat owners in {city.name} and across {city.province}
            </p>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-50">Why {city.name} Cat Owners Choose Purrify</h2>
              <ul className="text-left space-y-2 text-gray-700 dark:text-gray-200">
                {city.keyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-green-500 dark:text-green-400 mr-2">✓</span>
                    Perfect for {feature.toLowerCase()}
                  </li>
                ))}
                <li className="flex items-center">
                  <span className="text-green-500 dark:text-green-400 mr-2">✓</span>
                  Free shipping across {city.province}
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 dark:text-green-400 mr-2">✓</span>
                  Works with any litter brand
                </li>
              </ul>

              <div className="mt-6">
                <Link
                  href="/products/trial-size"
                  className="inline-block bg-gradient-to-r from-orange-500 to-pink-500 text-white dark:text-gray-100 font-bold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all"
                >
                  Try Purrify in {city.name}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Where to Buy */}
        <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-50">
              Where to Find Purrify in {city.name}
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <p className="text-lg mb-6 text-gray-700 dark:text-gray-200">
                We partner with local pet stores across {city.name} to bring you the best natural cat litter odor control solution.
              </p>
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
                  <h3 className="text-xl font-bold mb-3 text-blue-900 dark:text-blue-200">
                    Ask Your Local Pet Store
                  </h3>
                  <p className="text-gray-700 dark:text-gray-200 mb-2">
                    Visit your favorite {city.name} pet store and ask them to stock Purrify!
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    We work with retailers like {city.competitors.join(', ')} and independent stores
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-700">
                  <h3 className="text-xl font-bold mb-3 text-purple-900 dark:text-purple-200">
                    Order Direct
                  </h3>
                  <p className="text-gray-700 dark:text-gray-200 mb-4">
                    Can't find us in stores? Order directly from our website with free shipping to {city.name}
                  </p>
                  <Link
                    href="/products/trial-size"
                    className="inline-block bg-gradient-to-r from-orange-500 to-pink-500 text-white dark:text-gray-100 font-bold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all"
                  >
                    Shop Online Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-50">
              What {city.name} Cat Owners Are Saying
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="flex items-center mb-4">
                  {[1,2,3,4,5].map((star) => (
                    <span key={star} className="text-yellow-400 dark:text-yellow-300">⭐</span>
                  ))}
                </div>
                <p className="italic mb-4 text-gray-700 dark:text-gray-200">
                  ${context.testimonial1}
                </p>
                <p className="font-semibold text-gray-900 dark:text-gray-50">- ${firstName1}, {city.name}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="flex items-center mb-4">
                  {[1,2,3,4,5].map((star) => (
                    <span key={star} className="text-yellow-400 dark:text-yellow-300">⭐</span>
                  ))}
                </div>
                <p className="italic mb-4 text-gray-700 dark:text-gray-200">
                  ${context.testimonial2}
                </p>
                <p className="font-semibold text-gray-900 dark:text-gray-50">- ${firstName2}, {city.name}</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-50">
              {city.name} FAQ
            </h2>
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">
                  Do you deliver to {city.name}, {city.province}?
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Yes! Free shipping across {city.province}, including {city.name}.
                  Orders arrive within 2-3 business days.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-50">
                  ${context.faq.q}
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  ${context.faq.a}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
`;
}

// Get appropriate names based on province demographics
function getRandomName(province, variant) {
  const names = {
    'Quebec': variant === 1 ? ['Marie-Claude L.', 'Sophie B.', 'Jean-Pierre D.', 'Luc M.'][Math.floor(Math.random() * 4)] : ['André T.', 'Philippe D.', 'Caroline B.', 'Marc L.'][Math.floor(Math.random() * 4)],
    'default': variant === 1 ? ['Jennifer K.', 'Sarah W.', 'Michael B.', 'Amanda P.'][Math.floor(Math.random() * 4)] : ['David T.', 'Lisa M.', 'Robert S.', 'Emily R.'][Math.floor(Math.random() * 4)]
  };

  return names[province] || names.default;
}

// Main execution
console.log('🚀 Starting bulk location page generation...\n');

const citiesMdPath = path.join(__dirname, '..', 'cities.md');
const locationsDir = path.join(__dirname, '..', 'pages', 'locations');

// Ensure locations directory exists
if (!fs.existsSync(locationsDir)) {
  fs.mkdirSync(locationsDir, { recursive: true });
}

// Parse cities
const citiesByProvince = parseCitiesMd(citiesMdPath);
let totalGenerated = 0;
let totalSkipped = 0;

// Generate pages for each city
Object.entries(citiesByProvince).forEach(([province, cities]) => {
  console.log(`\n📍 Processing ${province}...`);

  cities.forEach(cityName => {
    const slug = cityToSlug(cityName);
    const filePath = path.join(locationsDir, `${slug}.tsx`);

    // Skip if file already exists
    if (fs.existsSync(filePath)) {
      console.log(`  ⏭️  Skipping ${cityName} (already exists)`);
      totalSkipped++;
      return;
    }

    const context = getCityContext(cityName, province);
    const population = estimatePopulation(cityName, province);
    const pageContent = generateLocationPage(cityName, province, context, population);

    fs.writeFileSync(filePath, pageContent, 'utf8');
    console.log(`  ✅ Generated ${cityName} -> ${slug}.tsx`);
    totalGenerated++;
  });
});

console.log(`\n\n🎉 Generation Complete!`);
console.log(`✅ Generated: ${totalGenerated} new pages`);
console.log(`⏭️  Skipped: ${totalSkipped} existing pages`);
console.log(`📁 Total location pages: ${totalGenerated + totalSkipped}\n`);
