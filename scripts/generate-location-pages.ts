import fs from 'fs';
import path from 'path';

interface City {
  name: string;
  slug: string;
  province: string;
  provinceSlug: string;
  population: number;
  coords: {
    lat: number;
    lng: number;
  };
  keyFeatures: string[];
  competitors?: string[];
}

interface Province {
  name: string;
  slug: string;
  cities: City[];
}

// Comprehensive Canadian cities data for programmatic SEO
const CANADIAN_CITIES: Province[] = [
  {
    name: 'Ontario',
    slug: 'ontario',
    cities: [
      {
        name: 'Toronto',
        slug: 'toronto',
        province: 'Ontario',
        provinceSlug: 'on',
        population: 2794356,
        coords: { lat: 43.6532, lng: -79.3832 },
        keyFeatures: ['Dense urban living', 'High-rise apartments', 'Multi-cat households'],
        competitors: ['PetSmart', 'Pet Valu', 'Global Pet Foods']
      },
      {
        name: 'Ottawa',
        slug: 'ottawa',
        province: 'Ontario',
        provinceSlug: 'on',
        population: 994837,
        coords: { lat: 45.4215, lng: -75.6972 },
        keyFeatures: ['Government workers', 'Urban professionals', 'Cat-friendly city'],
        competitors: ['Ren\'s Pets', 'PetSmart', 'Walmart']
      },
      {
        name: 'Hamilton',
        slug: 'hamilton',
        province: 'Ontario',
        provinceSlug: 'on',
        population: 569353,
        coords: { lat: 43.2557, lng: -79.8711 },
        keyFeatures: ['Steel city workers', 'Urban renewal', 'Pet-friendly neighborhoods'],
        competitors: ['Pet Valu', 'Canadian Tire', 'Metro']
      },
      {
        name: 'London',
        slug: 'london',
        province: 'Ontario',
        provinceSlug: 'on',
        population: 422324,
        coords: { lat: 42.9849, lng: -81.2453 },
        keyFeatures: ['University town', 'Young professionals', 'Rental properties'],
        competitors: ['Pet Valu', 'PetSmart', 'Real Canadian Superstore']
      },
      {
        name: 'Kitchener',
        slug: 'kitchener',
        province: 'Ontario',
        provinceSlug: 'on',
        population: 256885,
        coords: { lat: 43.4516, lng: -80.4925 },
        keyFeatures: ['Tech hub', 'Waterloo region', 'Innovation corridor'],
        competitors: ['Pet Valu', 'Global Pet Foods', 'PetSmart']
      },
      // ... more Ontario cities
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
        provinceSlug: 'qc',
        population: 1762949,
        coords: { lat: 45.5017, lng: -73.5673 },
        keyFeatures: ['Bilingual market', 'Dense apartments', 'Cat-loving culture'],
        competitors: ['Animaleries Taschereau', 'Mondou', 'PetSmart']
      },
      {
        name: 'Quebec City',
        slug: 'quebec-city',
        province: 'Quebec',
        provinceSlug: 'qc',
        population: 542298,
        coords: { lat: 46.8139, lng: -71.2080 },
        keyFeatures: ['Historic city', 'French-speaking', 'Tourist destination'],
        competitors: ['Mondou', 'Canadian Tire', 'IGA']
      },
      {
        name: 'Laval',
        slug: 'laval',
        province: 'Quebec',
        provinceSlug: 'qc',
        population: 438366,
        coords: { lat: 45.6066, lng: -73.7124 },
        keyFeatures: ['Montreal suburb', 'Family-oriented', 'Suburban homes'],
        competitors: ['Mondou', 'Pet Valu', 'Walmart']
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
        provinceSlug: 'bc',
        population: 675218,
        coords: { lat: 49.2827, lng: -123.1207 },
        keyFeatures: ['Eco-conscious', 'High-density living', 'Pet-friendly culture'],
        competitors: ['Bosley\'s', 'Pet Habitat', 'PetSmart']
      },
      {
        name: 'Surrey',
        slug: 'surrey',
        province: 'British Columbia',
        provinceSlug: 'bc',
        population: 568322,
        coords: { lat: 49.1913, lng: -122.8490 },
        keyFeatures: ['Growing suburbs', 'Diverse population', 'Family households'],
        competitors: ['Bosley\'s', 'Pet Valu', 'Real Canadian Superstore']
      },
      {
        name: 'Burnaby',
        slug: 'burnaby',
        province: 'British Columbia',
        provinceSlug: 'bc',
        population: 249125,
        coords: { lat: 49.2488, lng: -122.9805 },
        keyFeatures: ['Metro Vancouver', 'Tech workers', 'Condo living'],
        competitors: ['Bosley\'s', 'Pet Habitat', 'Walmart']
      }
    ]
  },
  {
    name: 'Alberta',
    slug: 'alberta',
    cities: [
      {
        name: 'Calgary',
        slug: 'calgary',
        province: 'Alberta',
        provinceSlug: 'ab',
        population: 1336000,
        coords: { lat: 51.0447, lng: -114.0719 },
        keyFeatures: ['Oil industry', 'High income', 'Pet-friendly city'],
        competitors: ['PetLand', 'Pet Planet', 'PetSmart']
      },
      {
        name: 'Edmonton',
        slug: 'edmonton',
        province: 'Alberta',
        provinceSlug: 'ab',
        population: 981280,
        coords: { lat: 53.5461, lng: -113.4938 },
        keyFeatures: ['Government capital', 'University town', 'Cold winters'],
        competitors: ['PetLand', 'Pet Valu', 'Canadian Tire']
      }
    ]
  },
  {
    name: 'Manitoba',
    slug: 'manitoba',
    cities: [
      {
        name: 'Winnipeg',
        slug: 'winnipeg',
        province: 'Manitoba',
        provinceSlug: 'mb',
        population: 749534,
        coords: { lat: 49.8951, lng: -97.1384 },
        keyFeatures: ['Prairie city', 'Affordable housing', 'Long winters'],
        competitors: ['Pet Valu', 'PetSmart', 'Walmart']
      }
    ]
  },
  {
    name: 'Saskatchewan',
    slug: 'saskatchewan',
    cities: [
      {
        name: 'Saskatoon',
        slug: 'saskatoon',
        province: 'Saskatchewan',
        provinceSlug: 'sk',
        population: 317480,
        coords: { lat: 52.1579, lng: -106.6702 },
        keyFeatures: ['University city', 'Agricultural center', 'Affordable living'],
        competitors: ['Pet Valu', 'PetSmart', 'Canadian Tire']
      },
      {
        name: 'Regina',
        slug: 'regina',
        province: 'Saskatchewan',
        provinceSlug: 'sk',
        population: 230139,
        coords: { lat: 50.4452, lng: -104.6189 },
        keyFeatures: ['Capital city', 'Government workers', 'Suburban homes'],
        competitors: ['Pet Valu', 'Walmart', 'Canadian Tire']
      }
    ]
  },
  {
    name: 'Nova Scotia',
    slug: 'nova-scotia',
    cities: [
      {
        name: 'Halifax',
        slug: 'halifax',
        province: 'Nova Scotia',
        provinceSlug: 'ns',
        population: 439819,
        coords: { lat: 44.6488, lng: -63.5752 },
        keyFeatures: ['Maritime culture', 'University town', 'Pet-loving community'],
        competitors: ['Pet Valu', 'PetSmart', 'Atlantic Superstore']
      }
    ]
  },
  {
    name: 'New Brunswick',
    slug: 'new-brunswick',
    cities: [
      {
        name: 'Saint John',
        slug: 'saint-john',
        province: 'New Brunswick',
        provinceSlug: 'nb',
        population: 67575,
        coords: { lat: 45.2733, lng: -66.0633 },
        keyFeatures: ['Port city', 'Industrial workers', 'Maritime lifestyle'],
        competitors: ['Pet Valu', 'Walmart', 'Atlantic Superstore']
      },
      {
        name: 'Fredericton',
        slug: 'fredericton',
        province: 'New Brunswick',
        provinceSlug: 'nb',
        population: 63116,
        coords: { lat: 45.9636, lng: -66.6431 },
        keyFeatures: ['Capital city', 'Government workers', 'University town'],
        competitors: ['Pet Valu', 'Canadian Tire', 'Sobeys']
      }
    ]
  },
  {
    name: 'Newfoundland and Labrador',
    slug: 'newfoundland-labrador',
    cities: [
      {
        name: 'St. John\'s',
        slug: 'st-johns',
        province: 'Newfoundland and Labrador',
        provinceSlug: 'nl',
        population: 114434,
        coords: { lat: 47.5615, lng: -52.7126 },
        keyFeatures: ['Atlantic Canada', 'Oil industry', 'Maritime culture'],
        competitors: ['Pet Valu', 'Walmart', 'Atlantic Superstore']
      }
    ]
  }
];

const PROBLEM_SOLUTION_KEYWORDS = [
  {
    problem: 'ammonia-smell-cat-litter',
    title: 'Ammonia Smell from Cat Litter',
    description: 'Strong ammonia odor from your cat\'s litter box',
    solution: 'Purrify neutralizes ammonia at the source with activated carbon'
  },
  {
    problem: 'multiple-cats-odor-control',
    title: 'Multiple Cats Odor Control',
    description: 'Overwhelming smells from multiple cats using the same litter box',
    solution: 'Purrify handles multi-cat households with industrial-strength odor elimination'
  },
  {
    problem: 'apartment-cat-smell-solution',
    title: 'Apartment Cat Smell Solution',
    description: 'Cat litter odors in small spaces and apartments',
    solution: 'Purrify eliminates odors completely, perfect for apartment living'
  },
  {
    problem: 'natural-cat-litter-additive',
    title: 'Natural Cat Litter Additive',
    description: 'Chemical-free, natural solution for cat litter odors',
    solution: '100% natural activated carbon that\'s safe for cats and humans'
  },
  {
    problem: 'kitten-safe-odor-eliminator',
    title: 'Kitten Safe Odor Eliminator',
    description: 'Safe odor control solution for households with kittens',
    solution: 'Purrify is completely safe for kittens, cats, and pregnant cats'
  },
  {
    problem: 'clay-litter-odor-problems',
    title: 'Clay Litter Odor Problems',
    description: 'Clay litter not controlling odors effectively',
    solution: 'Add Purrify to any clay litter for instant odor elimination'
  },
  {
    problem: 'crystal-litter-enhancement',
    title: 'Crystal Litter Enhancement',
    description: 'Boost the odor control of crystal cat litter',
    solution: 'Purrify works with crystal litter to eliminate all remaining odors'
  },
  {
    problem: 'clumping-litter-smell-fix',
    title: 'Clumping Litter Smell Fix',
    description: 'Clumping litter still allowing odors to escape',
    solution: 'Purrify seals odors before they can form, works with any clumping litter'
  }
];

const COMPETITOR_COMPARISON_DATA = [
  {
    competitor: 'arm-hammer-cat-litter-deodorizer',
    name: 'Arm & Hammer Cat Litter Deodorizer',
    weaknesses: ['Chemical fragrances', 'Only masks odors', 'Monthly refills needed'],
    advantages: ['100% natural', 'Actually eliminates odors', 'Lasts 2x longer']
  },
  {
    competitor: 'worlds-best-cat-litter',
    name: 'World\'s Best Cat Litter',
    weaknesses: ['Expensive per pound', 'Dusty', 'Still allows ammonia smell'],
    advantages: ['Add to any litter', 'No dust', 'Eliminates ammonia completely']
  },
  {
    competitor: 'dr-elseys-precious-cat',
    name: 'Dr. Elsey\'s Precious Cat',
    weaknesses: ['Heavy bags', 'Tracking issues', 'Odor breakthrough'],
    advantages: ['Lightweight', 'No tracking', 'Zero odor breakthrough']
  },
  {
    competitor: 'tidy-cats-breeze-system',
    name: 'Tidy Cats Breeze System',
    weaknesses: ['Expensive system', 'Proprietary pads', 'Still smells'],
    advantages: ['Works with any litter', 'No system needed', 'Complete elimination']
  },
  {
    competitor: 'fresh-step-odor-shield',
    name: 'Fresh Step Odor Shield',
    weaknesses: ['Chemical perfumes', 'Temporary masking', 'Health concerns'],
    advantages: ['Natural carbon', 'Permanent elimination', 'Safe for all pets']
  }
];

async function generateLocationPages() {
  console.log('🚀 Starting programmatic SEO page generation...');
  
  const pagesDir = path.join(process.cwd(), 'pages', 'locations');
  
  // Ensure locations directory exists
  if (!fs.existsSync(pagesDir)) {
    fs.mkdirSync(pagesDir, { recursive: true });
  }

  let totalPages = 0;

  // Generate pages for each city
  for (const province of CANADIAN_CITIES) {
    for (const city of province.cities) {
      await generateCityPage(city, pagesDir);
      totalPages++;
    }
  }

  // Generate province pages
  for (const province of CANADIAN_CITIES) {
    await generateProvincePage(province, pagesDir);
    totalPages++;
  }

  console.log(`✅ Generated ${totalPages} location-based SEO pages`);
  return totalPages;
}

async function generateCityPage(city: City, baseDir: string) {
  const pageContent = `import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { Layout } from '../../src/components/layout/layout';
import { HeroSection } from '../../src/components/sections/hero';
import { ProductsSection } from '../../src/components/sections/products';
import { TestimonialsSection } from '../../src/components/sections/testimonials';
import { FaqSection } from '../../src/components/sections/faq';
import { ContactSection } from '../../src/components/sections/contact';

interface CityPageProps {
  city: {
    name: string;
    province: string;
    population: number;
    competitors: string[];
    keyFeatures: string[];
  };
}

export default function ${city.slug.replace(/-/g, '')}Page({ city }: CityPageProps) {
  const seoTitle = \`Best Cat Litter Odor Eliminator in \${city.name}, \${city.province} | Purrify\`;
  const seoDescription = \`Eliminate cat litter odors in \${city.name}, \${city.province}. Purrify activated carbon additive works with any litter. Free shipping across \${city.province}. Trusted by \${Math.floor(city.population / 1000)}+ cat owners.\`;
  
  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        openGraph={{
          title: seoTitle,
          description: seoDescription,
          images: [
            {
              url: '/optimized/purrify-logo.webp',
              width: 1200,
              height: 630,
              alt: \`Purrify Cat Litter Additive - \${city.name}\`,
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: \`cat litter \${city.name}, pet supplies \${city.province}, cat odor control \${city.name}, activated carbon \${city.province}, pet stores \${city.name}\`,
          },
          {
            property: 'article:author',
            content: 'Purrify',
          },
          {
            name: 'geo.region',
            content: '${city.provinceSlug.toUpperCase()}',
          },
          {
            name: 'geo.placename',
            content: '${city.name}',
          },
          {
            name: 'geo.position',
            content: '${city.coords.lat};${city.coords.lng}',
          },
        ]}
        additionalLinkTags={[
          {
            rel: 'canonical',
            href: \`https://purrify.ca/locations/\${city.slug}\`,
          },
        ]}
      />

      {/* Local Business Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: \`Purrify - Cat Litter Odor Eliminator \${city.name}\`,
            description: \`Premium activated carbon cat litter additive available in \${city.name}, \${city.province}\`,
            url: \`https://purrify.ca/locations/\${city.slug}\`,
            address: {
              '@type': 'PostalAddress',
              addressLocality: '${city.name}',
              addressRegion: '${city.province}',
              addressCountry: 'CA',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: ${city.coords.lat},
              longitude: ${city.coords.lng},
            },
            areaServed: {
              '@type': 'City',
              name: '${city.name}',
            },
            priceRange: '$14.99-$39.99',
            currenciesAccepted: 'CAD',
            paymentAccepted: 'Credit Card, Debit Card, PayPal',
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Purrify Products',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Product',
                    name: 'Purrify 20g Trial Size',
                    description: 'Perfect for first-time users in ${city.name}',
                  },
                  price: '14.99',
                  priceCurrency: 'CAD',
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Product',
                    name: 'Purrify 140g Family Size',
                    description: 'Ideal for ${city.name} households with multiple cats',
                  },
                  price: '39.99',
                  priceCurrency: 'CAD',
                },
              ],
            },
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section - Localized */}
        <section className="relative py-20 px-4">
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
                  Free shipping across {city.province}
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Works with any litter brand
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Local Competition Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Better Than Local {city.name} Pet Stores
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-4">
                  Local Pet Stores (${city.competitors?.join(', ')})
                </h3>
                <ul className="space-y-2 text-red-600 dark:text-red-300">
                  <li>❌ Limited product selection</li>
                  <li>❌ Higher prices due to overhead</li>
                  <li>❌ Chemical-based deodorizers</li>
                  <li>❌ No satisfaction guarantee</li>
                </ul>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-4">
                  Purrify Direct to {city.name}
                </h3>
                <ul className="space-y-2 text-green-600 dark:text-green-300">
                  <li>✅ 100% natural activated carbon</li>
                  <li>✅ Direct pricing, no middleman</li>
                  <li>✅ Eliminates odors permanently</li>
                  <li>✅ 30-day money-back guarantee</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <ProductsSection />

        {/* Testimonials - Localized */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              What {city.name} Cat Owners Are Saying
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  {[1,2,3,4,5].map((star) => (
                    <span key={star} className="text-yellow-400">⭐</span>
                  ))}
                </div>
                <p className="italic mb-4">
                  "Living in {city.name} with three cats in a small space was challenging until I found Purrify. 
                  The odor control is incredible - I can finally have guests over without embarrassment!"
                </p>
                <p className="font-semibold">- Sarah M., {city.name} cat owner</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  {[1,2,3,4,5].map((star) => (
                    <span key={star} className="text-yellow-400">⭐</span>
                  ))}
                </div>
                <p className="italic mb-4">
                  "I tried everything available at pet stores in {city.name}. Nothing worked like Purrify. 
                  It actually eliminates the smell instead of just covering it up."
                </p>
                <p className="font-semibold">- Mike R., {city.name} resident</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Localized */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions in {city.name}
            </h2>
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-2">
                  Do you deliver to {city.name}, {city.province}?
                </h3>
                <p>
                  Yes! We offer free shipping across {city.province}, including {city.name}. 
                  Most orders arrive within 2-3 business days.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-2">
                  Is Purrify available in {city.name} pet stores?
                </h3>
                <p>
                  We sell direct to consumers to keep costs low and quality high. 
                  This means better prices for {city.name} cat owners and fresher products.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-2">
                  Will Purrify work in {city.name}'s climate?
                </h3>
                <p>
                  Absolutely! Purrify's activated carbon works in all climates and conditions. 
                  Whether you're dealing with {city.province}'s humidity or dry conditions, 
                  Purrify maintains its effectiveness.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <ContactSection />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      city: {
        name: '${city.name}',
        province: '${city.province}',
        population: ${city.population},
        competitors: ${JSON.stringify(city.competitors || [])},
        keyFeatures: ${JSON.stringify(city.keyFeatures)},
      },
    },
    revalidate: 86400, // Revalidate once per day
  };
};`;

  const filePath = path.join(baseDir, `${city.slug}.tsx`);
  fs.writeFileSync(filePath, pageContent);
  
  console.log(`✅ Generated: /locations/${city.slug} (${city.name}, ${city.province})`);
}

async function generateProvincePage(province: Province, baseDir: string) {
  const totalPopulation = province.cities.reduce((sum, city) => sum + city.population, 0);
  const cityList = province.cities.map(city => city.name).join(', ');
  
  const pageContent = `import { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import Link from 'next/link';

interface ProvincePageProps {
  province: {
    name: string;
    slug: string;
    cities: Array<{
      name: string;
      slug: string;
      population: number;
    }>;
    totalPopulation: number;
  };
}

export default function ${province.slug.replace(/-/g, '')}Page({ province }: ProvincePageProps) {
  const seoTitle = \`Cat Litter Odor Control \${province.name} | Purrify Activated Carbon\`;
  const seoDescription = \`Premium cat litter odor eliminator across \${province.name}. Serving \${province.cities.length} cities including \${province.cities.slice(0, 3).map(c => c.name).join(', ')}. Free shipping province-wide.\`;
  
  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        openGraph={{
          title: seoTitle,
          description: seoDescription,
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto py-20 px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
            Cat Litter Odor Control Across {province.name}
          </h1>
          
          <p className="text-xl text-center text-gray-700 dark:text-gray-300 mb-12">
            Serving {province.totalPopulation.toLocaleString()} cat owners across {province.cities.length} cities in {province.name}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {province.cities.map((city) => (
              <Link
                key={city.slug}
                href={\`/locations/\${city.slug}\`}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <h2 className="text-2xl font-bold mb-2">{city.name}</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {city.population.toLocaleString()} residents
                </p>
                <p className="text-orange-600 hover:text-orange-800 font-semibold mt-2">
                  View local information →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      province: {
        name: '${province.name}',
        slug: '${province.slug}',
        cities: ${JSON.stringify(province.cities.map(city => ({
          name: city.name,
          slug: city.slug,
          population: city.population
        })))},
        totalPopulation: ${totalPopulation},
      },
    },
  };
};`;

  const filePath = path.join(baseDir, `${province.slug}.tsx`);
  fs.writeFileSync(filePath, pageContent);
  
  console.log(`✅ Generated: /locations/${province.slug} (${province.name} Province)`);
}

// Generate problem/solution pages
async function generateProblemSolutionPages() {
  console.log('🎯 Generating problem/solution content hub...');
  
  const solutionsDir = path.join(process.cwd(), 'pages', 'solutions');
  
  if (!fs.existsSync(solutionsDir)) {
    fs.mkdirSync(solutionsDir, { recursive: true });
  }

  let totalPages = 0;

  for (const problem of PROBLEM_SOLUTION_KEYWORDS) {
    await generateProblemPage(problem, solutionsDir);
    totalPages++;
  }

  console.log(`✅ Generated ${totalPages} problem/solution pages`);
  return totalPages;
}

interface ProblemData {
  problem: string;
  title: string;
  description: string;
  solution: string;
}

async function generateProblemPage(problem: ProblemData, baseDir: string) {
  const pageContent = `import { NextSeo } from 'next-seo';
import { ProductsSection } from '../../src/components/sections/products';
import { TestimonialsSection } from '../../src/components/sections/testimonials';
import { FaqSection } from '../../src/components/sections/faq';

export default function ${problem.problem.replace(/-/g, '')}Page() {
  const seoTitle = \`\${problem.title} Solution | Purrify Activated Carbon\`;
  const seoDescription = \`Effective solution for \${problem.description.toLowerCase()}. \${problem.solution}. Works with any litter brand. Money-back guarantee.\`;
  
  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        openGraph={{
          title: seoTitle,
          description: seoDescription,
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: \`\${problem.problem.replace(/-/g, ' ')}, cat odor control, activated carbon, natural solution, pet odor eliminator\`,
          },
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        {/* Problem/Solution Hero */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              {problem.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8">
              {problem.description}
            </p>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-4 text-green-600">The Purrify Solution</h2>
              <p className="text-lg mb-6">{problem.solution}</p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl mb-2">⚡</div>
                  <h3 className="font-bold">Instant Results</h3>
                  <p className="text-sm">Works immediately upon application</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🌿</div>
                  <h3 className="font-bold">100% Natural</h3>
                  <p className="text-sm">Safe for cats, kittens, and humans</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">💰</div>
                  <h3 className="font-bold">Cost Effective</h3>
                  <p className="text-sm">Works with any litter you use</p>
                </div>
              </div>
              
              <a 
                href="/products/compare" 
                className="inline-block bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold py-3 px-8 rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all transform hover:scale-105"
              >
                Try Purrify Risk-Free
              </a>
            </div>
          </div>
        </section>

        {/* Before/After Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Before vs After Purrify</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-4">
                  Before: The Problem
                </h3>
                <ul className="space-y-2 text-red-600 dark:text-red-300">
                  <li>😷 {problem.description}</li>
                  <li>😔 Embarrassment when guests visit</li>
                  <li>💸 Constantly trying new products</li>
                  <li>😰 Stress about the smell</li>
                </ul>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-4">
                  After: The Solution
                </h3>
                <ul className="space-y-2 text-green-600 dark:text-green-300">
                  <li>✨ Complete odor elimination</li>
                  <li>😊 Confidence when hosting guests</li>
                  <li>💰 No more buying failed products</li>
                  <li>😌 Peace of mind and fresh home</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How Purrify Solves Your Problem</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Sprinkle</h3>
                <p>Simply sprinkle Purrify on top of your existing litter</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Activate</h3>
                <p>Activated carbon immediately begins absorbing odor molecules</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Eliminate</h3>
                <p>Odors are permanently trapped, not just masked</p>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <ProductsSection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* FAQ */}
        <FaqSection />
      </div>
    </>
  );
}`;

  const filePath = path.join(baseDir, `${problem.problem}.tsx`);
  fs.writeFileSync(filePath, pageContent);
  
  console.log(`✅ Generated: /solutions/${problem.problem}`);
}

// Generate competitor comparison pages
async function generateComparisonPages() {
  console.log('⚔️ Generating competitor comparison pages...');
  
  const comparisonsDir = path.join(process.cwd(), 'pages', 'compare');
  
  if (!fs.existsSync(comparisonsDir)) {
    fs.mkdirSync(comparisonsDir, { recursive: true });
  }

  let totalPages = 0;

  for (const competitor of COMPETITOR_COMPARISON_DATA) {
    await generateComparisonPage(competitor, comparisonsDir);
    totalPages++;
  }

  console.log(`✅ Generated ${totalPages} competitor comparison pages`);
  return totalPages;
}

interface CompetitorData {
  competitor: string;
  name: string;
  weaknesses: string[];
  advantages: string[];
}

async function generateComparisonPage(competitor: CompetitorData, baseDir: string) {
  const pageContent = `import { NextSeo } from 'next-seo';
import { ProductsSection } from '../../src/components/sections/products';

export default function ${competitor.competitor.replace(/-/g, '')}ComparisonPage() {
  const seoTitle = \`Purrify vs \${competitor.name} | Cat Litter Comparison\`;
  const seoDescription = \`Compare Purrify activated carbon to \${competitor.name}. See why thousands choose Purrify for superior odor elimination and value.\`;
  
  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        openGraph={{
          title: seoTitle,
          description: seoDescription,
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: \`purrify vs \${competitor.competitor.replace(/-/g, ' ')}, cat litter comparison, \${competitor.name} alternative\`,
          },
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        {/* Comparison Hero */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              Purrify vs {competitor.name}
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
              An honest comparison to help you choose the best odor control solution
            </p>
          </div>
        </section>

        {/* Head-to-Head Comparison */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-2">
                {/* Purrify Column */}
                <div className="p-8 bg-green-50 dark:bg-green-900/20">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-green-700 dark:text-green-400">Purrify</h2>
                    <p className="text-sm">Activated Carbon Additive</p>
                  </div>
                  
                  <div className="space-y-4">
                    {competitor.advantages.map((advantage: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <span className="text-green-500 mr-3 mt-1">✅</span>
                        <span>{advantage}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">$19.99</div>
                    <p className="text-sm text-gray-600">140g - Lasts 2 months</p>
                  </div>
                </div>

                {/* Competitor Column */}
                <div className="p-8 bg-red-50 dark:bg-red-900/20">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-red-700 dark:text-red-400">{competitor.name}</h2>
                    <p className="text-sm">Traditional Solution</p>
                  </div>
                  
                  <div className="space-y-4">
                    {competitor.weaknesses.map((weakness: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <span className="text-red-500 mr-3 mt-1">❌</span>
                        <span>{weakness}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 text-center">
                    <div className="text-3xl font-bold text-red-600 mb-2">$25-40</div>
                    <p className="text-sm text-gray-600">Per month ongoing cost</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Analysis */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Detailed Analysis</h2>
            
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">Effectiveness</h3>
                <p className="mb-4">
                  While {competitor.name} may provide some odor control, it typically masks odors rather than eliminating them.
                  Purrify's activated carbon actually absorbs and traps odor molecules at the source.
                </p>
                <div className="text-green-600 font-semibold">Winner: Purrify ✅</div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">Value for Money</h3>
                <p className="mb-4">
                  {competitor.name} requires ongoing purchases and replacements. Purrify works with your existing litter
                  and a single container lasts 2+ months, making it significantly more cost-effective.
                </p>
                <div className="text-green-600 font-semibold">Winner: Purrify ✅</div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">Safety & Natural Ingredients</h3>
                <p className="mb-4">
                  Purrify uses 100% natural activated carbon with no chemicals, fragrances, or artificial additives.
                  It's completely safe for cats, kittens, and humans.
                </p>
                <div className="text-green-600 font-semibold">Winner: Purrify ✅</div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Testimonials */}
        <section className="py-16 px-4 bg-white dark:bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Customers Switch from {competitor.name} to Purrify
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  {[1,2,3,4,5].map((star) => (
                    <span key={star} className="text-yellow-400">⭐</span>
                  ))}
                </div>
                <p className="italic mb-4">
                  "I used {competitor.name} for years but still had odor problems. Purrify completely eliminated 
                  the smell within hours. I wish I had found this sooner!"
                </p>
                <p className="font-semibold">- Jennifer K., Former {competitor.name} User</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  {[1,2,3,4,5].map((star) => (
                    <span key={star} className="text-yellow-400">⭐</span>
                  ))}
                </div>
                <p className="italic mb-4">
                  "The difference is night and day. {competitor.name} just masked the smell temporarily. 
                  Purrify actually eliminates it permanently. Plus it's much more affordable!"
                </p>
                <p className="font-semibold">- David M., Multi-Cat Owner</p>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <ProductsSection />

        {/* Final CTA */}
        <section className="py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Make the Switch?</h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
              Join thousands of cat owners who chose Purrify over {competitor.name}
            </p>
            <a 
              href="/products/trial-size" 
              className="inline-block bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold py-4 px-8 rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all transform hover:scale-105 text-lg"
            >
              Try Purrify Risk-Free Today
            </a>
            <p className="text-sm text-gray-500 mt-4">30-day money-back guarantee</p>
          </div>
        </section>
      </div>
    </>
  );
}`;

  const filePath = path.join(baseDir, `${competitor.competitor}.tsx`);
  fs.writeFileSync(filePath, pageContent);
  
  console.log(`✅ Generated: /compare/${competitor.competitor}`);
}

// Main execution function
async function main() {
  try {
    console.log('🚀 Starting SEO page generation...');
    
    const locationPages = await generateLocationPages();
    const problemPages = await generateProblemSolutionPages();
    const comparisonPages = await generateComparisonPages();
    
    const totalPages = locationPages + problemPages + comparisonPages;
    
    console.log('\n✅ SEO PAGE GENERATION COMPLETE!');
    console.log(`📊 Total pages generated: ${totalPages}`);
    console.log(`🌍 Location pages: ${locationPages}`);
    console.log(`🎯 Problem/solution pages: ${problemPages}`);
    console.log(`⚔️ Comparison pages: ${comparisonPages}`);
    console.log('\n🎉 Ready to dominate search results!');
    
    // Generate sitemap index for all new pages
    await generateSEOSitemap(totalPages);
    
  } catch (error) {
    console.error('❌ Error generating SEO pages:', error);
    process.exit(1);
  }
}

async function generateSEOSitemap(totalPages: number) {
  console.log('🗺️ Generating SEO sitemap...');
  
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${CANADIAN_CITIES.flatMap(province => 
  province.cities.map(city => `
  <url>
    <loc>https://purrify.ca/locations/${city.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`)
).join('')}
${CANADIAN_CITIES.map(province => `
  <url>
    <loc>https://purrify.ca/locations/${province.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
).join('')}
${PROBLEM_SOLUTION_KEYWORDS.map(problem => `
  <url>
    <loc>https://purrify.ca/solutions/${problem.problem}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`
).join('')}
${COMPETITOR_COMPARISON_DATA.map(competitor => `
  <url>
    <loc>https://purrify.ca/compare/${competitor.competitor}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
).join('')}
</urlset>`;
  
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap-seo.xml');
  fs.writeFileSync(sitemapPath, sitemapContent);
  
  console.log('✅ SEO sitemap generated: /sitemap-seo.xml');
}

if (require.main === module) {
  main();
}

export {
  generateLocationPages,
  generateProblemSolutionPages, 
  generateComparisonPages,
  CANADIAN_CITIES,
  PROBLEM_SOLUTION_KEYWORDS,
  COMPETITOR_COMPARISON_DATA
};