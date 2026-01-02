import { NextSeo } from 'next-seo';
import { useTranslation } from '../../src/lib/translation-context';
import { SITE_NAME, CONTACT_INFO } from '../../src/lib/constants';
import { buildLanguageAlternates, getLocalizedUrl } from '../../src/lib/seo-utils';
// Unused: import { Container } from '../../src/components/ui/container';
import { Button } from '../../src/components/ui/button';
import Image from 'next/image';
import { Printer, Check } from 'lucide-react';

export default function SellSheetPage() {
  const { locale } = useTranslation();
  const pageTitle = `${SITE_NAME} B2B Sell Sheet - Wholesale Partner Information`;
  const pageDescription = 'Download our B2B sell sheet with wholesale pricing, product specifications, and partnership opportunities. Perfect for retailers, veterinarians, and pet professionals.';
  const canonicalUrl = getLocalizedUrl('/b2b/sell-sheet', locale);
  const languageAlternates = buildLanguageAlternates('/b2b/sell-sheet');

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <NextSeo
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        languageAlternates={languageAlternates}
        openGraph={{
          type: 'website',
          url: canonicalUrl,
          title: pageTitle,
          description: pageDescription,
          locale: locale === 'fr' ? 'fr_CA' : locale === 'zh' ? 'zh_CN' : 'en_CA',
        }}
        additionalMetaTags={[
          {
            name: 'robots',
            content: 'index, follow',
          },
        ]}
      />

      {/* Print Button - Hidden in print */}
      <div className="print:hidden fixed top-4 right-4 z-50 flex gap-2">
        <Button
          onClick={handlePrint}
          className="bg-gradient-to-r from-[#10B981] to-[#3694FF] hover:from-[#059669] hover:to-[#2563EB] text-white dark:text-white font-bold shadow-xl"
        >
          <Printer className="w-5 h-5 mr-2" />
          Print / Save as PDF
        </Button>
        <Button
          variant="outline"
          onClick={() => window.history.back()}
          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
        >
          Back
        </Button>
      </div>

      {/* Sell Sheet Content - Optimized for printing */}
      <main className="min-h-screen bg-white dark:bg-gray-900 print:bg-white">
        <div className="max-w-[8.5in] mx-auto p-8 print:p-4">

          {/* Header */}
          <header className="flex justify-between items-start mb-8 pb-6 border-b-4 border-[#10B981]">
            <div>
              <Image
                src="/optimized/purrify-logo-icon.webp"
                alt="Purrify Logo"
                width={60}
                height={60}
                className="mb-2"
              />
              <h1 className="text-3xl font-black text-gray-900 dark:text-gray-900">Purrify</h1>
              <p className="text-sm text-gray-600 dark:text-gray-600">Activated Carbon Cat Litter Additive</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-[#10B981]">B2B Partner Program</p>
              <p className="text-sm text-gray-600 dark:text-gray-600">{CONTACT_INFO.email}</p>
              <p className="text-sm text-gray-600 dark:text-gray-600">{CONTACT_INFO.phone}</p>
              <p className="text-sm text-gray-600 dark:text-gray-600">purrify.ca</p>
            </div>
          </header>

          {/* Value Proposition */}
          <section className="mb-8">
            <h2 className="text-2xl font-black text-gray-900 dark:text-gray-900 mb-4 text-[#10B981]">
              The Natural Solution to Litter Box Odor
            </h2>
            <p className="text-gray-700 dark:text-gray-700 mb-4">
              Purrify is a premium activated carbon litter additive made from 100% natural coconut shells.
              Unlike scented products that mask odors, Purrify uses molecular adsorption to eliminate ammonia
              and other odor compounds at the source.
            </p>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div className="bg-[#10B981]/10 rounded-lg p-3">
                <p className="text-2xl font-black text-[#10B981]">100%</p>
                <p className="text-xs text-gray-600 dark:text-gray-600">Natural</p>
              </div>
              <div className="bg-[#3694FF]/10 rounded-lg p-3">
                <p className="text-2xl font-black text-[#3694FF]">7+</p>
                <p className="text-xs text-gray-600 dark:text-gray-600">Days Protection</p>
              </div>
              <div className="bg-[#F59E0B]/10 rounded-lg p-3">
                <p className="text-2xl font-black text-[#F59E0B]">4.9</p>
                <p className="text-xs text-gray-600 dark:text-gray-600">Star Rating</p>
              </div>
              <div className="bg-[#EC4899]/10 rounded-lg p-3">
                <p className="text-2xl font-black text-[#EC4899]">Zero</p>
                <p className="text-xs text-gray-600 dark:text-gray-600">Chemicals</p>
              </div>
            </div>
          </section>

          {/* Product Line */}
          <section className="mb-8">
            <h3 className="text-xl font-black text-gray-900 dark:text-gray-900 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
              Product Line & Wholesale Pricing
            </h3>
            <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="text-left p-3 font-bold text-gray-900 dark:text-gray-900">Product</th>
                    <th className="text-center p-3 font-bold text-gray-900 dark:text-gray-900">Size</th>
                    <th className="text-center p-3 font-bold text-gray-900 dark:text-gray-900">MSRP</th>
                    <th className="text-center p-3 font-bold text-gray-900 dark:text-gray-900">Wholesale</th>
                    <th className="text-center p-3 font-bold text-gray-900 dark:text-gray-900">Margin</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200 dark:border-gray-700">
                    <td className="p-3 text-gray-700 dark:text-gray-700">Trial Size</td>
                    <td className="p-3 text-center text-gray-700 dark:text-gray-700">12g</td>
                    <td className="p-3 text-center text-gray-700 dark:text-gray-700">$4.99</td>
                    <td className="p-3 text-center font-bold text-[#10B981]">$2.99</td>
                    <td className="p-3 text-center text-gray-700 dark:text-gray-700">40%</td>
                  </tr>
                  <tr className="border-t border-gray-200 dark:border-gray-700 bg-[#10B981]/5">
                    <td className="p-3 text-gray-700 dark:text-gray-700 font-bold">Standard Size ★</td>
                    <td className="p-3 text-center text-gray-700 dark:text-gray-700">50g</td>
                    <td className="p-3 text-center text-gray-700 dark:text-gray-700">$14.99</td>
                    <td className="p-3 text-center font-bold text-[#10B981]">$8.99</td>
                    <td className="p-3 text-center text-gray-700 dark:text-gray-700">40%</td>
                  </tr>
                  <tr className="border-t border-gray-200 dark:border-gray-700">
                    <td className="p-3 text-gray-700 dark:text-gray-700">Family Pack</td>
                    <td className="p-3 text-center text-gray-700 dark:text-gray-700">120g</td>
                    <td className="p-3 text-center text-gray-700 dark:text-gray-700">$29.99</td>
                    <td className="p-3 text-center font-bold text-[#10B981]">$17.99</td>
                    <td className="p-3 text-center text-gray-700 dark:text-gray-700">40%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">★ Best seller - recommended starter SKU for new partners</p>
          </section>

          {/* Two Column Section */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            {/* Key Benefits */}
            <section>
              <h3 className="text-lg font-black text-gray-900 dark:text-gray-900 mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">
                Why Customers Love Purrify
              </h3>
              <ul className="space-y-2">
                {[
                  'Eliminates ammonia odor in 60 seconds',
                  'Works with any litter type',
                  'Fragrance-free - safe for sensitive cats',
                  'Made from coconut shell activated carbon',
                  'One application lasts 7+ days',
                  'No dust, no mess, easy to use',
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start text-sm">
                    <Check className="w-4 h-4 text-[#10B981] mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Ideal For */}
            <section>
              <h3 className="text-lg font-black text-gray-900 dark:text-gray-900 mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">
                Ideal Partner Types
              </h3>
              <ul className="space-y-2">
                {[
                  { type: 'Pet Retailers', desc: 'In-store and online sales' },
                  { type: 'Veterinary Clinics', desc: 'Retail + recommendations' },
                  { type: 'Cat Cafes', desc: 'In-house use + customer sales' },
                  { type: 'Animal Shelters', desc: 'Bulk pricing available' },
                  { type: 'Pet Groomers', desc: 'Add-on service offering' },
                  { type: 'Pet Hotels', desc: 'Guest amenity + retail' },
                ].map((partner, i) => (
                  <li key={i} className="text-sm">
                    <span className="font-bold text-gray-900 dark:text-gray-900">{partner.type}</span>
                    <span className="text-gray-500 dark:text-gray-500"> - {partner.desc}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Partnership Benefits */}
          <section className="mb-8 bg-gradient-to-r from-[#10B981]/10 to-[#3694FF]/10 rounded-lg p-6">
            <h3 className="text-lg font-black text-gray-900 dark:text-gray-900 mb-4">
              Partnership Benefits
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="font-bold text-[#10B981] mb-1">Starter Package</p>
                <ul className="text-xs text-gray-700 dark:text-gray-700 space-y-1">
                  <li>• Free sample kit</li>
                  <li>• 15% wholesale discount</li>
                  <li>• Email support</li>
                </ul>
              </div>
              <div>
                <p className="font-bold text-[#3694FF] mb-1">Professional Partner</p>
                <ul className="text-xs text-gray-700 dark:text-gray-700 space-y-1">
                  <li>• 25% wholesale discount</li>
                  <li>• Staff training session</li>
                  <li>• Co-branded materials</li>
                </ul>
              </div>
              <div>
                <p className="font-bold text-[#F59E0B] mb-1">Enterprise</p>
                <ul className="text-xs text-gray-700 dark:text-gray-700 space-y-1">
                  <li>• 30%+ volume discounts</li>
                  <li>• Custom packaging</li>
                  <li>• Dedicated account manager</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Product Specs */}
          <section className="mb-8">
            <h3 className="text-lg font-black text-gray-900 dark:text-gray-900 mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">
              Product Specifications
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p><span className="font-bold">Material:</span> Coconut shell activated carbon</p>
                <p><span className="font-bold">Form:</span> Fine granules</p>
                <p><span className="font-bold">Color:</span> Black</p>
                <p><span className="font-bold">Fragrance:</span> None (fragrance-free)</p>
              </div>
              <div>
                <p><span className="font-bold">Shelf Life:</span> Indefinite (sealed)</p>
                <p><span className="font-bold">Storage:</span> Cool, dry place</p>
                <p><span className="font-bold">Origin:</span> Made in Canada</p>
                <p><span className="font-bold">Certifications:</span> Food-grade carbon</p>
              </div>
            </div>
          </section>

          {/* Footer CTA */}
          <footer className="bg-gray-900 dark:bg-gray-950 text-white dark:text-white rounded-lg p-6 text-center">
            <h3 className="text-xl font-black mb-2">Ready to Partner?</h3>
            <p className="text-gray-300 dark:text-gray-300 mb-4">
              Contact us for a free sample kit and personalized wholesale pricing
            </p>
            <div className="flex justify-center gap-8 text-sm">
              <div>
                <p className="font-bold text-[#10B981]">Email</p>
                <p>{CONTACT_INFO.email}</p>
              </div>
              <div>
                <p className="font-bold text-[#10B981]">Phone</p>
                <p>{CONTACT_INFO.phone}</p>
              </div>
              <div>
                <p className="font-bold text-[#10B981]">Website</p>
                <p>purrify.ca/veterinarians</p>
              </div>
            </div>
          </footer>

        </div>
      </main>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: letter;
            margin: 0.5in;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
          nav, footer, .no-print {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
