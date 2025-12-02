import React from 'react';
import Image from 'next/image';
import { useTranslation } from '../../lib/translation-context';

interface ClientLocationsMapProps {
  className?: string;
  height?: string;
  showHeader?: boolean;
  headerTitle?: string;
  headerDescription?: string;
}

export const ClientLocationsMap: React.FC<ClientLocationsMapProps> = ({
  className = '',
  height = '480',
  showHeader = true,
  headerTitle,
  headerDescription
}) => {
  const { t, locale } = useTranslation();

  const defaultTitle = locale === 'fr'
    ? 'Trouvez Purrify Près de Chez Vous | Magasins Détaillants'
    : 'Find Purrify Near You | Retail Store Locations';

  const defaultDescription = locale === 'fr'
    ? 'Découvrez où acheter Purrify à travers le Canada. Chaque point représente un magasin de détail où vous pouvez trouver nos produits.'
    : 'Discover where to buy Purrify across Canada. Each location represents a retail store where you can find our products.';

  const title = headerTitle || defaultTitle;
  const description = headerDescription || defaultDescription;

  return (
    <section className={`py-8 ${className}`}>
      {showHeader && (
        <div className="container mx-auto px-4 mb-8">
          <div className="flex justify-center mb-6">
            <Image
              src="/optimized/purrify-logo-text.webp"
              alt="Purrify Logo"
              width={160}
              height={53}
              className="h-10 w-auto filter drop-shadow-sm transition-all duration-300 dark:invert dark:brightness-110 dark:contrast-125"
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4 text-center">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-4xl mx-auto">
            {description}
          </p>
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
          <iframe
            src="https://www.google.com/maps/d/embed?mid=1tp1A30e-7ixcKLz4hrvMI1cY0FPhs2A&ehbc=2E312F"
            width="100%"
            height={height}
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={locale === 'fr' ? 'Carte des Magasins Détaillants Purrify' : 'Purrify Retail Store Locations Map'}
            className="rounded-lg"
          />
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {locale === 'fr'
                ? '🗺️ Magasins détaillants Purrify à travers le Canada - Montréal, Toronto, Vancouver et plus'
                : '🗺️ Purrify retail stores across Canada - Montreal, Toronto, Vancouver and more'
              }
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 rounded">
                {locale === 'fr' ? 'Montréal' : 'Montreal'}
              </span>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 rounded">Toronto</span>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 rounded">Vancouver</span>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 rounded">Calgary</span>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 rounded">Ottawa</span>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 rounded">
                {locale === 'fr' ? 'Québec' : 'Quebec City'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
