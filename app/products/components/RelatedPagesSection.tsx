'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { useTranslations, useLocale } from 'next-intl';

export function RelatedPagesSection() {
  const t = useTranslations();
  const locale = useLocale();
  const localePrefix = locale === 'en' ? '' : `/${locale}`;

  const relatedPages = (t.raw('productsPage.relatedPages') || t.raw('productComparison.relatedPages')) as Array<{ link: string; title: string; description: string }> || [];

  return (
    <section className="py-16 cv-auto cis-720">
      <Container>
        <div className="text-center mb-12">
          <p className="text-gray-600 text-gray-400 mb-4 max-w-2xl mx-auto">
            {t('productsPage.relatedIntro')}
          </p>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-gray-900 text-gray-100">
            {locale === 'fr' ? "En savoir plus" : "Learn More"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedPages?.map((page: { link: string; title: string; description: string }, index: number) => (
            <Link href={`${localePrefix}${page.link}`} key={index} className="group">
              <div className="bg-white bg-gray-800 rounded-xl p-6 shadow-lg border border-brand-light border-gray-700 hover:shadow-xl transition-shadow">
                <h3 className="font-heading text-xl font-bold mb-3 text-gray-900 text-gray-100 group-hover:text-brand-purple transition-colors">
                  {page.title}
                </h3>
                <p className="text-gray-600 text-gray-300">
                  {page.description}
                </p>
              </div>
            </Link>
          ))}
          <Link href="/blog/activated-carbon-vs-baking-soda-comparison" className="group">
            <div className="bg-white bg-gray-800 rounded-xl p-6 shadow-lg border border-brand-light border-gray-700 hover:shadow-xl transition-shadow">
              <h3 className="font-heading text-xl font-bold mb-3 text-gray-900 text-gray-100 group-hover:text-brand-purple transition-colors">
                {t('nav.carbonVsBakingSoda')}
              </h3>
              <p className="text-gray-600 text-gray-300">
                {t('nav.carbonVsBakingSodaDesc')}
              </p>
            </div>
          </Link>
        </div>
      </Container>
    </section>
  );
}
