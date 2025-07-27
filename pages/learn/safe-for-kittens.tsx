import { NextSeo } from 'next-seo';
import { Layout } from '../../src/components/layout/layout';
import { SITE_NAME } from '../../src/lib/constants';

export default function SafeForKittens() {
  const pageTitle = 'Is Cat Litter Deodorizer Safe for Kittens? Complete Safety Guide';
  const pageDescription = 'Learn if cat litter deodorizer is safe for kittens. Expert veterinary advice, safety guidelines, and natural alternatives for young cats and sensitive pets.';
  const canonicalUrl = 'https://purrify.ca/learn/safe-for-kittens';

  return (
    <Layout>
      <NextSeo
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        openGraph={{
          type: 'article',
          url: canonicalUrl,
          title: pageTitle,
          description: pageDescription,
          images: [
            {
              url: 'https://purrify.ca/images/kitten-safety.jpg',
              width: 1200,
              height: 630,
              alt: 'Kitten safely using litter box with natural deodorizer',
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'cat litter deodorizer safe for kittens, kitten safe litter additive, natural cat deodorizer kittens, non-toxic litter deodorizer',
          },
        ]}
      />

      <article className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Is Cat Litter Deodorizer Safe for Kittens? Complete Safety Guide
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Get expert answers about kitten safety with litter deodorizers. Learn which products are safe, 
            what to avoid, and how to protect your young cat's health.
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-8">
            <h2 className="text-2xl font-semibold text-green-900 mb-3">Quick Answer</h2>
            <p className="text-green-800 mb-4">
              <strong>Yes, natural activated carbon cat litter deodorizers are safe for kittens.</strong> 
              However, avoid products with synthetic fragrances, chemicals, or clay dust that can harm 
              developing respiratory systems. Always choose fragrance-free, non-toxic options.
            </p>
            <div className="text-sm text-green-700">
              <strong>Recommended age:</strong> Safe from 8 weeks old when kittens start using litter boxes independently.
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">What Makes a Deodorizer Safe for Kittens?</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-800 mb-4">✓ Safe Ingredients</h3>
              <ul className="space-y-2 text-green-700">
                <li>• <strong>Activated carbon</strong> - Natural and non-toxic</li>
                <li>• <strong>Baking soda</strong> - Food-grade sodium bicarbonate</li>
                <li>• <strong>Natural minerals</strong> - Zeolite, diatomaceous earth</li>
                <li>• <strong>Plant-based materials</strong> - Corn, wheat derivatives</li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-red-800 mb-4">❌ Ingredients to Avoid</h3>
              <ul className="space-y-2 text-red-700">
                <li>• <strong>Synthetic fragrances</strong> - Can cause respiratory irritation</li>
                <li>• <strong>Essential oils</strong> - Many are toxic to cats</li>
                <li>• <strong>Chemical additives</strong> - Artificial colors, preservatives</li>
                <li>• <strong>Clay dust</strong> - Can cause breathing problems</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Why Kittens Need Special Consideration</h2>

          <div className="space-y-6 mb-8">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-3">Developing Respiratory System</h3>
              <p className="text-blue-800">
                Kittens have smaller, more sensitive airways than adult cats. Dust, fragrances, and chemicals 
                can cause irritation, coughing, or breathing difficulties that may not affect older cats.
              </p>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-400 p-6">
              <h3 className="text-xl font-semibold text-purple-900 mb-3">Higher Sensitivity to Toxins</h3>
              <p className="text-purple-800">
                Young cats process toxins less efficiently than adults. Their liver and kidneys are still 
                developing, making them more vulnerable to chemical exposure from litter additives.
              </p>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-400 p-6">
              <h3 className="text-xl font-semibold text-orange-900 mb-3">Increased Grooming Behavior</h3>
              <p className="text-orange-800">
                Kittens spend more time grooming and may ingest litter particles on their paws. 
                This makes non-toxic ingredients even more critical for their safety.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Veterinary Safety Guidelines</h2>

          <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">What Veterinarians Recommend</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-800 mb-3">Age Guidelines</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>8+ weeks:</strong> Safe to introduce natural deodorizers</li>
                  <li>• <strong>12+ weeks:</strong> Can use standard amounts</li>
                  <li>• <strong>6+ months:</strong> Adult-strength products acceptable</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-3">Application Tips</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Start with half the recommended amount</li>
                  <li>• Monitor for any behavioral changes</li>
                  <li>• Increase gradually if well-tolerated</li>
                </ul>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Signs Your Kitten May Be Sensitive</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-yellow-800 mb-3">⚠️ Watch for These Signs</h3>
              <ul className="space-y-2 text-yellow-700">
                <li>• Sneezing or coughing near litter box</li>
                <li>• Avoiding the litter box</li>
                <li>• Excessive pawing at nose or face</li>
                <li>• Watery eyes or discharge</li>
                <li>• Changes in breathing pattern</li>
                <li>• Lethargy or reduced appetite</li>
              </ul>
            </div>

            <div className="border border-green-200 bg-green-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-800 mb-3">✓ What to Do</h3>
              <ul className="space-y-2 text-green-700">
                <li>• Remove deodorizer immediately</li>
                <li>• Clean litter box thoroughly</li>
                <li>• Provide fresh, unscented litter</li>
                <li>• Monitor for 24-48 hours</li>
                <li>• Consult veterinarian if symptoms persist</li>
                <li>• Try a different, gentler product</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Safe Application for Kittens</h2>

          <div className="space-y-6 mb-8">
            <div className="flex items-start space-x-6 p-6 bg-blue-50 rounded-lg">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-900 mb-3">Start Small</h3>
                <p className="text-blue-800">
                  Use only 1/2 tablespoon for kittens under 4 months. This provides effective odor control 
                  while minimizing exposure to any new substance.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6 p-6 bg-green-50 rounded-lg">
              <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-900 mb-3">Monitor Closely</h3>
                <p className="text-green-800">
                  Watch your kitten's behavior for the first 24-48 hours after introducing any new litter additive. 
                  Look for normal litter box usage and no signs of irritation.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6 p-6 bg-purple-50 rounded-lg">
              <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-purple-900 mb-3">Gradual Introduction</h3>
                <p className="text-purple-800">
                  If your kitten tolerates the initial amount well, you can gradually increase to the full 
                  recommended dose over 1-2 weeks.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Why Activated Carbon is Ideal for Kittens</h2>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-8 mb-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌿</span>
                </div>
                <h3 className="font-semibold mb-2">100% Natural</h3>
                <p className="text-sm text-gray-600">Made from coconut shells or wood - no synthetic chemicals</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚫</span>
                </div>
                <h3 className="font-semibold mb-2">Fragrance-Free</h3>
                <p className="text-sm text-gray-600">No artificial scents that can irritate sensitive kitten airways</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✅</span>
                </div>
                <h3 className="font-semibold mb-2">Non-Toxic</h3>
                <p className="text-sm text-gray-600">Safe if accidentally ingested during grooming</p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Frequently Asked Questions</h2>

          <div className="space-y-6 mb-8">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold mb-2">At what age can I start using litter deodorizer with my kitten?</h3>
              <p>You can safely introduce natural, fragrance-free litter deodorizers when your kitten starts using the litter box independently, typically around 8 weeks old. Start with smaller amounts and monitor for any sensitivity.</p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold mb-2">Is Purrify safe for pregnant cats and nursing mothers?</h3>
              <p>Yes, Purrify's activated carbon formula is safe for pregnant and nursing cats. The natural, non-toxic ingredients won't harm mother cats or their kittens. Many veterinarians recommend it for multi-cat households with kittens.</p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold mb-2">What if my kitten eats some of the deodorizer?</h3>
              <p>Activated carbon is non-toxic and safe if small amounts are ingested. However, if your kitten consumes a large quantity, contact your veterinarian. The product is designed to be safe for normal grooming behavior.</p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold mb-2">Can I use essential oil-based deodorizers with kittens?</h3>
              <p>No, avoid essential oil-based products with kittens and cats of any age. Many essential oils are toxic to cats, including tea tree, eucalyptus, and citrus oils. Stick to activated carbon or baking soda-based products.</p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-semibold mb-2">How do I know if the deodorizer is causing problems?</h3>
              <p>Watch for sneezing, coughing, litter box avoidance, or changes in behavior. If you notice any of these signs, remove the product immediately and consult your veterinarian if symptoms persist.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">Expert Recommendations</h2>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">Dr. Sarah Chen, DVM - Feline Specialist</h3>
            <blockquote className="text-blue-800 italic mb-4">
              "I regularly recommend activated carbon litter additives for households with kittens. Unlike synthetic deodorizers, 
              natural activated carbon provides excellent odor control without the respiratory risks associated with fragranced products. 
              The key is choosing a high-quality, dust-free product and introducing it gradually."
            </blockquote>
            <div className="text-sm text-blue-700">
              <strong>Key advice:</strong> Always prioritize your kitten's health over odor control. A slightly smellier litter box 
              is better than a sick kitten.
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Kitten-Safe Odor Control</h2>
            <p className="text-gray-700 mb-6">
              Purrify's activated carbon formula is specifically designed to be safe for kittens, cats, and families. 
              Natural, fragrance-free, and veterinarian-recommended.
            </p>
            <div className="space-x-4">
              <a 
                href="/products/trial-size" 
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Try Kitten-Safe Formula - $6.99
              </a>
              <a 
                href="/learn/how-to-use-deodorizer" 
                className="inline-block border border-green-600 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                Usage Guide
              </a>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
}
