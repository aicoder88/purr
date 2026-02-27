'use client';

import Link from 'next/link';
import { MapPin, ChevronRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { useLocale } from 'next-intl';

export function ProductsCTASection() {
  const locale = useLocale();

  const useEnglishVariantCtaCopy = false;

  return (
    <section className="py-16 bg-gradient-to-br from-brand-purple to-brand-red cv-auto cis-720">
      <Container>
        <div className="text-center text-white dark:text-gray-100 max-w-3xl mx-auto">
          <MapPin className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
            {useEnglishVariantCtaCopy
              ? 'Ready to Get Odor Control Working This Week?'
              : locale === 'fr'
                ? 'Trouvez Purrify près de chez vous'
                : 'Get Purrify Near You'}
          </h2>
          <p className="text-xl mb-4 opacity-90">
            {useEnglishVariantCtaCopy
              ? 'Find a nearby retailer or contact us for the fastest way to start.'
              : locale === 'fr'
                ? 'Disponible dans les animaleries à travers le Canada. Demandez Purrify à votre magasin préféré.'
                : 'Available at pet stores across Canada. Ask for Purrify at your favorite store.'}
          </p>
          <p className="text-base mb-8 opacity-80">
            {locale === 'fr'
              ? "Votre magasin ne l'a pas encore? Dites-le nous et nous les contacterons."
              : "Your store doesn't carry it yet? Tell us and we'll reach out."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`${locale === 'fr' ? '/fr' : ''}/stores`}>
              <Button size="lg" className="bg-white dark:bg-gray-900 text-brand-purple hover:bg-gray-100 dark:hover:bg-gray-700 font-bold">
                <MapPin className="w-5 h-5 mr-2" />
                {useEnglishVariantCtaCopy
                  ? 'Find Nearby Availability'
                  : locale === 'fr'
                    ? 'Trouver un magasin'
                    : 'Find a Store'}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href={`${locale === 'fr' ? '/fr' : ''}/contact`}>
              <Button size="lg" variant="outline" className="border-white dark:border-gray-600 text-gray-900 dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 transition-colors">
                {useEnglishVariantCtaCopy
                  ? 'Talk to Product Support'
                  : locale === 'fr'
                    ? 'Des questions? Contactez-nous'
                    : 'Questions? Contact Us'}
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
