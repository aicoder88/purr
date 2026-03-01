'use client';

import { Container } from '@/components/ui/container';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

export function UsageCalculatorSection() {
  const t = useTranslations();
  const locale = useLocale();

  const usageCalculator = [
    {
      cats: 1,
      litterChanges: t('productComparison.units.weekly'),
      trial: `1 ${t('productComparison.units.week')}`,
      regular: `30 ${t('productComparison.units.days')}`,
      large: `10-12 ${t('productComparison.units.weeks')}`
    },
    {
      cats: 2,
      litterChanges: `2x ${t('productComparison.units.perWeek')}`,
      trial: `3-4 ${t('productComparison.units.days')}`,
      regular: `2-3 ${t('productComparison.units.weeks')}`,
      large: `5-6 ${t('productComparison.units.weeks')}`
    },
    {
      cats: 3,
      litterChanges: `3x ${t('productComparison.units.perWeek')}`,
      trial: `2-3 ${t('productComparison.units.days')}`,
      regular: `1-2 ${t('productComparison.units.weeks')}`,
      large: `3-4 ${t('productComparison.units.weeks')}`
    }
  ];

  return (
    <section className="py-16 cv-auto cis-720">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-gray-900 text-gray-100">
            {t('productComparison.howLongWillEachSizeLast')}
          </h2>
          <p className="text-xl text-gray-600 text-gray-300">
            {t('productComparison.usageCalculator.subtitle')}
          </p>
        </div>

        <div className="bg-white bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-brand-purple to-brand-red text-white text-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">{t('productComparison.usageCalculator.numberOfCats')}</th>
                  <th className="px-6 py-4 text-center font-bold">{t('productComparison.usageCalculator.typicalChanges')}</th>
                  <th className="px-6 py-4 text-center font-bold">{locale === 'fr' ? 'Format Essai' : 'Trial Bag'}</th>
                  <th className="px-6 py-4 text-center font-bold">{locale === 'fr' ? 'Format Régulier' : 'Regular Bag'}</th>
                  <th className="px-6 py-4 text-center font-bold">{locale === 'fr' ? 'Grand Format' : 'Large Bag'}</th>
                </tr>
              </thead>
              <tbody>
                {usageCalculator.map((row, index) => (
                  <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50 bg-gray-700/50' : 'bg-white bg-gray-800'}`}>
                    <td className="px-6 py-4 font-bold text-brand-purple">
                      {row.cats} {row.cats > 1 ? t('productComparison.units.cats') : t('productComparison.units.cat')}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600 text-gray-300">
                      {row.litterChanges}
                    </td>
                    <td className="px-6 py-4 text-center font-medium text-gray-900 text-gray-100">
                      {row.trial}
                    </td>
                    <td className="px-6 py-4 text-center font-medium text-gray-900 text-gray-100">
                      {row.regular}
                    </td>
                    <td className="px-6 py-4 text-center font-medium text-gray-900 text-gray-100">
                      {row.large}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Transition to CTA - Natural conclusion */}
        <p className="text-center mt-10 text-lg text-gray-700 text-gray-300 max-w-2xl mx-auto">
          {locale === 'fr'
            ? "Vous avez vu la science. Vous avez entendu les témoignages. Vous savez quel format vous convient. Il ne reste plus qu'une chose à faire..."
            : "You've seen the science. You've heard the testimonials. You know which size fits. There's only one thing left to do..."}
        </p>
      </Container>
    </section>
  );
}
