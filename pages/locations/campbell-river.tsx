import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { LocationSchema } from '../../src/components/seo/json-ld-schema';
import { CityInterlinkSection } from '../../src/components/sections/locations/CityInterlinkSection';

export default function campbellriverPage() {
  const city = {
    name: 'Campbell River',
    province: 'British Columbia',
    population: 25000,
    competitors: ["PetSmart","Pet Valu","Bosley's"],
    keyFeatures: ["Eco-conscious living","Outdoor lifestyle","Pet-friendly communities"]
  };

  const seoTitle = `Best Cat Litter Odor Eliminator in ${city.name}, ${city.province} | Purrify`;
  const seoDescription = `Eliminate cat litter odors in ${city.name}, ${city.province}. Free shipping across ${city.province}. Trusted by 50+ cat owners.`;

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: `cat litter ${city.name}, pet supplies ${city.province}, cat odor control ${city.name}`,
          },
          {
            name: 'geo.region',
            content: 'BC',
          },
          {
            name: 'geo.placename',
            content: 'Campbell River',
          },
        ]}
      />

      <LocationSchema
        cityName='Campbell River'
        province='British Columbia'
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
              Trusted by 50+ cat owners in {city.name} and across {city.province}
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
                  "Perfect for our eco-conscious Campbell River household! Natural, sustainable, and it actually works better than chemical alternatives."
                </p>
                <p className="font-semibold text-gray-900 dark:text-gray-50">- Jennifer K., {city.name}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                <div className="flex items-center mb-4">
                  {[1,2,3,4,5].map((star) => (
                    <span key={star} className="text-yellow-400 dark:text-yellow-300">⭐</span>
                  ))}
                </div>
                <p className="italic mb-4 text-gray-700 dark:text-gray-200">
                  "Living the BC lifestyle means caring about what goes in our home. Purrify is 100% natural and our cats are healthier for it!"
                </p>
                <p className="font-semibold text-gray-900 dark:text-gray-50">- Lisa M., {city.name}</p>
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
                  Is Purrify environmentally friendly?
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Absolutely! Purrify is 100% natural activated carbon derived from renewable sources. Perfect for BC's eco-conscious communities. Biodegradable and zero chemicals.
                </p>
              </div>
            </div>
          </div>
        </section>
        <CityInterlinkSection cityName={city.name} provinceName={city.province} />

      </div>
    </>
  );
}
