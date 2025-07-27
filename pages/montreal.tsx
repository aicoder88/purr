import { NextSeo } from 'next-seo';
import { Layout } from '../src/components/layout/layout';
import { OptimizedImage } from '../src/components/performance/OptimizedImage';
import { SITE_NAME } from '../src/lib/constants';

export default function Montreal() {
  const pageTitle = 'Cat Litter Deodorizer Montreal - Purrify Available at Local Stores';
  const pageDescription = 'Find Purrify cat litter deodorizer in Montreal stores. Available at Mondou, PetSmart locations across Montreal. Natural odor control made in Canada.';
  const canonicalUrl = 'https://purrify.ca/montreal';

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Purrify Montreal",
    "description": "Premium activated carbon cat litter additive available at Montreal pet stores",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Montreal",
      "addressRegion": "QC",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 45.5017,
      "longitude": -73.5673
    },
    "url": "https://purrify.ca/montreal",
    "telephone": "+1-514-XXX-XXXX",
    "priceRange": "$6.99-$29.99",
    "paymentAccepted": "Cash, Credit Card, Debit",
    "currenciesAccepted": "CAD"
  };

  return (
    <Layout>
      <NextSeo
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        openGraph={{
          type: 'website',
          url: canonicalUrl,
          title: pageTitle,
          description: pageDescription,
          images: [
            {
              url: 'https://purrify.ca/images/montreal-stores.jpg',
              width: 1200,
              height: 630,
              alt: 'Purrify cat litter deodorizer available at Montreal pet stores',
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'cat litter deodorizer Montreal, Purrify Montreal stores, cat odor eliminator Quebec, natural litter additive Montreal, Mondou Purrify',
          },
        ]}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Cat Litter Deodorizer Montreal
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Find Purrify's premium activated carbon cat litter additive at Montreal pet stores. 
            Natural odor control made in Canada, available throughout the Greater Montreal Area.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-blue-900 mb-3">Now Available in Montreal!</h2>
            <p className="text-blue-800">
              Visit your local Mondou, PetSmart, or independent pet store to find Purrify. 
              Call ahead to confirm availability at your preferred location.
            </p>
          </div>
        </section>

        {/* Store Locations */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Where to Buy Purrify in Montreal
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Mondou Locations */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <OptimizedImage
                  src="/images/mondou-logo.png"
                  alt="Mondou"
                  width={60}
                  height={40}
                  className="mr-3"
                />
                <h3 className="text-xl font-semibold">Mondou Locations</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Mondou Plateau Mont-Royal</strong><br />
                  4381 Rue Saint-Denis<br />
                  Montreal, QC H2J 2L1<br />
                  <span className="text-blue-600">(514) 844-2652</span>
                </div>
                <div>
                  <strong>Mondou Westmount</strong><br />
                  4915 Rue Sherbrooke O<br />
                  Westmount, QC H3Z 1H7<br />
                  <span className="text-blue-600">(514) 489-7600</span>
                </div>
                <div>
                  <strong>Mondou Rosemont</strong><br />
                  6555 Rue Saint-Hubert<br />
                  Montreal, QC H2S 2M2<br />
                  <span className="text-blue-600">(514) 277-7387</span>
                </div>
              </div>
            </div>

            {/* PetSmart Locations */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <OptimizedImage
                  src="/images/petsmart-logo.png"
                  alt="PetSmart"
                  width={60}
                  height={40}
                  className="mr-3"
                />
                <h3 className="text-xl font-semibold">PetSmart Locations</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>PetSmart Downtown</strong><br />
                  1500 Rue Atwater<br />
                  Montreal, QC H3H 2S8<br />
                  <span className="text-blue-600">(514) 939-8885</span>
                </div>
                <div>
                  <strong>PetSmart Anjou</strong><br />
                  7999 Bd les Galeries d'Anjou<br />
                  Anjou, QC H1M 1W6<br />
                  <span className="text-blue-600">(514) 354-0745</span>
                </div>
                <div>
                  <strong>PetSmart Pointe-Claire</strong><br />
                  6815 Autoroute Transcanadienne<br />
                  Pointe-Claire, QC H9R 5J2<br />
                  <span className="text-blue-600">(514) 426-8424</span>
                </div>
              </div>
            </div>

            {/* Independent Stores */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-2xl">🏪</span>
                </div>
                <h3 className="text-xl font-semibold">Independent Stores</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Animalerie Pierrefonds</strong><br />
                  15555 Boul Gouin O<br />
                  Pierrefonds, QC H9H 1C7<br />
                  <span className="text-blue-600">(514) 626-5551</span>
                </div>
                <div>
                  <strong>Safari Animalerie</strong><br />
                  Multiple locations across Montreal<br />
                  <span className="text-blue-600">Call to confirm availability</span>
                </div>
                <div>
                  <strong>Boutique d'Animaux Chico</strong><br />
                  6192 Rue Saint-Hubert<br />
                  Montreal, QC H2S 2L7<br />
                  <span className="text-blue-600">(514) 276-0444</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Can't Find Purrify at Your Local Store?</h3>
            <p className="text-yellow-700 mb-4">
              Ask your store manager to order Purrify! Many stores are happy to stock products their customers request.
            </p>
            <a 
              href="/support/contact" 
              className="inline-block bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition-colors"
            >
              Contact Us for Store Requests
            </a>
          </div>
        </section>

        {/* Why Choose Purrify in Montreal */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Montreal Cat Owners Choose Purrify
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-3">🍁 Made in Canada</h3>
              <p className="text-blue-800">
                Proudly manufactured in Canada with premium activated carbon. Supporting local business 
                while providing superior odor control for Montreal's cat families.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-900 mb-3">❄️ Perfect for Montreal Winters</h3>
              <p className="text-green-800">
                When windows stay closed during long Montreal winters, Purrify keeps your home fresh. 
                Natural odor elimination without harsh chemicals or overpowering fragrances.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-purple-900 mb-3">🏠 Ideal for Small Apartments</h3>
              <p className="text-purple-800">
                Many Montreal cat owners live in smaller spaces where litter box odors can be problematic. 
                Purrify provides powerful odor control perfect for apartments and condos.
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-orange-900 mb-3">🌿 Natural & Safe</h3>
              <p className="text-orange-800">
                Fragrance-free and non-toxic formula is safe for cats, kittens, and families. 
                No synthetic chemicals - just pure activated carbon odor elimination.
              </p>
            </div>
          </div>
        </section>

        {/* Local Testimonials */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            What Montreal Cat Owners Say
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold text-blue-600">MF</span>
                </div>
                <div>
                  <h4 className="font-semibold">Marie Fournier</h4>
                  <p className="text-sm text-gray-600">Plateau Mont-Royal</p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-3">
                "Living in a small apartment with my cat Biscuit, odor control is essential. 
                Purrify from Mondou has been a game-changer - no more embarrassing smells when guests visit!"
              </p>
              <div className="text-yellow-400">★★★★★</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold text-green-600">JT</span>
                </div>
                <div>
                  <h4 className="font-semibold">Jean Tremblay</h4>
                  <p className="text-sm text-gray-600">Rosemont</p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-3">
                "My two cats Pickles and Mochi love their litter box, and I love that Purrify keeps 
                our condo fresh all winter long. Found it at the Rosemont Mondou - highly recommend!"
              </p>
              <div className="text-yellow-400">★★★★★</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <span className="font-bold text-purple-600">SL</span>
                </div>
                <div>
                  <h4 className="font-semibold">Sophie Lavoie</h4>
                  <p className="text-sm text-gray-600">Westmount</p>
                </div>
              </div>
              <p className="text-gray-700 italic mb-3">
                "As a veterinary technician in Montreal, I recommend Purrify to all my clients. 
                It's natural, effective, and safe for cats of all ages. My own cat Noodle approves!"
              </p>
              <div className="text-yellow-400">★★★★★</div>
            </div>
          </div>
        </section>

        {/* Directions from Crescent Street */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Getting to Montreal Pet Stores
          </h2>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-4">From Downtown Montreal (Crescent Street Area)</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-blue-600 mb-2">To Mondou Plateau (Closest Location)</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• Head east on Rue Sherbrooke</li>
                  <li>• Turn left on Rue Saint-Denis</li>
                  <li>• Continue north to 4381 Rue Saint-Denis</li>
                  <li>• <strong>Distance:</strong> 3.2 km (8 minutes by car)</li>
                  <li>• <strong>Metro:</strong> Mont-Royal station (Orange line)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-600 mb-2">To PetSmart Downtown</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• Head southwest on Rue Atwater</li>
                  <li>• Continue to 1500 Rue Atwater</li>
                  <li>• <strong>Distance:</strong> 2.1 km (6 minutes by car)</li>
                  <li>• <strong>Metro:</strong> Atwater station (Green line)</li>
                  <li>• <strong>Parking:</strong> Available on-site</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Product Information */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Purrify Products Available in Montreal
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
              <h3 className="text-xl font-semibold mb-3">17g Trial Size</h3>
              <div className="text-3xl font-bold text-blue-600 mb-2">$6.99 CAD</div>
              <p className="text-gray-600 mb-4">Perfect for trying Purrify or travel</p>
              <ul className="text-sm text-gray-700 text-left space-y-1 mb-4">
                <li>• 2-3 weeks of odor control</li>
                <li>• Ideal for 1 cat household</li>
                <li>• Risk-free trial size</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-300 rounded-lg p-6 text-center shadow-sm relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold mb-3">60g Regular Size</h3>
              <div className="text-3xl font-bold text-blue-600 mb-2">$19.99 CAD</div>
              <p className="text-gray-600 mb-4">Best value for most cat owners</p>
              <ul className="text-sm text-gray-700 text-left space-y-1 mb-4">
                <li>• 6-8 weeks of odor control</li>
                <li>• Perfect for 1-2 cats</li>
                <li>• Most economical choice</li>
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
              <h3 className="text-xl font-semibold mb-3">120g Large Size</h3>
              <div className="text-3xl font-bold text-blue-600 mb-2">$29.99 CAD</div>
              <p className="text-gray-600 mb-4">Maximum value for multi-cat homes</p>
              <ul className="text-sm text-gray-700 text-left space-y-1 mb-4">
                <li>• 10-12 weeks of odor control</li>
                <li>• Great for 2+ cats</li>
                <li>• Best long-term value</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Visit Your Local Montreal Pet Store Today
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Experience the difference Purrify makes in your home. Available now at Mondou, PetSmart, 
              and independent pet stores throughout the Greater Montreal Area.
            </p>
            <div className="space-x-4">
              <a 
                href="/support/contact" 
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Find Nearest Store
              </a>
              <a 
                href="/products" 
                className="inline-block border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                View All Products
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
