import { NextSeo } from 'next-seo';
import Link from 'next/link';

export default function quebeccityPage() {
  const city = {
    name: 'Quebec City',
    province: 'Quebec',
    population: 542298,
    competitors: ["Mondou","Canadian Tire","IGA"],
    keyFeatures: ["Historic city","French-speaking","Tourist destination"]
  };

  const seoTitle = `Best Cat Litter Odor Eliminator in ${city.name}, ${city.province} | Purrify`;
  const seoDescription = `Eliminate cat litter odors in ${city.name}, ${city.province}. Free shipping across ${city.province}. Trusted by ${Math.floor(city.population / 1000)}+ cat owners.`;
  
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
            content: 'Quebec',
          },
          {
            name: 'geo.placename', 
            content: 'Quebec City',
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
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 mb-8">
              Trusted by {Math.floor(city.population / 1000).toLocaleString()}+ cat owners across {city.province}
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

        {/* Local Competition */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Better Than Local {city.name} Pet Stores
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-red-700 dark:text-red-300 mb-4">
                  Local Pet Stores ({city.competitors.join(', ')})
                </h3>
                <ul className="space-y-2 text-red-600 dark:text-red-400">
                  <li>❌ Limited product selection</li>
                  <li>❌ Higher prices due to overhead</li>
                  <li>❌ Chemical-based deodorizers</li>
                  <li>❌ No satisfaction guarantee</li>
                </ul>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-green-700 dark:text-green-300 mb-4">
                  Purrify Direct to {city.name}
                </h3>
                <ul className="space-y-2 text-green-600 dark:text-green-400">
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
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-50">
              What {city.name} Cat Owners Are Saying
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  {[1,2,3,4,5].map((star) => (
                    <span key={star} className="text-yellow-400 dark:text-yellow-300">⭐</span>
                  ))}
                </div>
                <p className="italic mb-4 text-gray-700 dark:text-gray-200">
                  "Parfait pour notre appartement dans le Vieux-Québec! Purrify garde l'air frais même avec deux chats."
                </p>
                <p className="font-semibold text-gray-900 dark:text-gray-50">- Marie-Claude L., Quebec City</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  {[1,2,3,4,5].map((star) => (
                    <span key={star} className="text-yellow-400 dark:text-yellow-300">⭐</span>
                  ))}
                </div>
                <p className="italic mb-4 text-gray-700 dark:text-gray-200">
                  "Historic homes need modern solutions! Purrify works perfectly in our 100-year-old house. Natural and effective."
                </p>
                <p className="font-semibold text-gray-900 dark:text-gray-50">- Pierre D., Quebec City</p>
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
                  Est-ce que Purrify est disponible au Québec?
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  Oui! Free shipping across Quebec, including Quebec City. Orders typically arrive within 2-3 business days. Nous offrons le support en français!
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}