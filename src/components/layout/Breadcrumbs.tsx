import Link from 'next/link';
import { Home } from 'lucide-react';
import Script from 'next/script';
import { Container } from '@/components/ui/container';
import { useTranslation } from '@/lib/translation-context';
import { StructuredDataGenerator } from '@/lib/seo/structured-data-generator';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  className = "py-4 border-b border-[#E0EFC7] dark:border-gray-800"
}) => {
  const { locale } = useTranslation();
  const homeHref = locale === 'en' ? '/' : `/${locale}`;
  const baseUrl = 'https://www.purrify.ca';

  // Generate breadcrumb structured data
  const breadcrumbItems = [
    { name: 'Home', url: `${baseUrl}${homeHref}` },
    ...items
      .filter(item => item.href) // Only include items with hrefs
      .map(item => ({
        name: item.label,
        url: `${baseUrl}${item.href}`,
      })),
    // Add current page (last item without href) if it exists
    ...items
      .filter(item => !item.href)
      .map(item => ({
        name: item.label,
        url: typeof globalThis.window !== 'undefined' ? window.location.href : `${baseUrl}${homeHref}`,
      })),
  ];

  const generator = new StructuredDataGenerator({ baseUrl });
  const breadcrumbSchema = generator.generateBreadcrumbs(breadcrumbItems);

  return (
    <>
      {/* Breadcrumb Structured Data */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />

      <section className={className}>
        <Container>
          <nav
            className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400"
            aria-label="Breadcrumb"
          >
            <Link href={homeHref} className="hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
              <Home className="w-4 h-4" aria-label="Home" />
            </Link>
            {items.map((item, index) => (
              <span key={index} className="flex items-center space-x-2">
                <span aria-hidden="true">/</span>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-gray-900 dark:text-gray-100" aria-current="page">
                    {item.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        </Container>
      </section>
    </>
  );
};