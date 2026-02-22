'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { CONTACT_INFO, SITE_NAME } from '@/lib/constants';
import { generateJSONLD } from '@/lib/seo-utils';
import { useEnhancedSEO } from '@/hooks/useEnhancedSEO';
import { useTranslations, useLocale } from 'next-intl';
import { localizePath } from '@/lib/i18n/locale-path';

type TermsSection = {
  title: string;
  paragraphs: string[];
};

type TermsCopy = {
  breadcrumbAria: string;
  pageTitle: string;
  pageDescription: string;
  heading: string;
  lastUpdated: string;
  intro: string[];
  sections: TermsSection[];
  contactHeading: string;
  contactLabel: string;
  contactEmailLabel: string;
  contactPhoneLabel: string;
  contactAddressLabel: string;
};

const EN_SECTIONS: TermsSection[] = [
  {
    title: '1. Purchases',
    paragraphs: [
      'If you place an order through our Service, you may be asked to provide payment, billing, and shipping details.',
      'You represent that your payment method is valid and that submitted information is accurate and complete.',
      'We may refuse or cancel orders for availability, pricing errors, fraud prevention, or suspected unauthorized transactions.',
    ],
  },
  {
    title: '2. Availability and Accuracy',
    paragraphs: [
      'Product listings, pricing, and availability may change without notice.',
      'We do not guarantee that all information is always complete, current, or error-free.',
    ],
  },
  {
    title: '3. User Content',
    paragraphs: [
      'If you submit content to the Service, you are responsible for legality and appropriateness.',
      'You grant us a license to use submitted content in connection with operating and improving the Service.',
    ],
  },
  {
    title: '4. Accounts',
    paragraphs: [
      'Account information must be accurate and kept up to date.',
      'You are responsible for safeguarding your account credentials and reporting unauthorized access.',
    ],
  },
  {
    title: '5. Intellectual Property',
    paragraphs: [
      'The Service, including original content and branding, remains the property of Purrify and its licensors.',
      'Our trademarks may not be used without prior written permission.',
    ],
  },
  {
    title: '6. Third-Party Links',
    paragraphs: [
      'The Service may link to third-party websites not controlled by Purrify.',
      'We are not responsible for third-party content, policies, or practices.',
    ],
  },
  {
    title: '7. Termination',
    paragraphs: [
      'We may suspend or terminate access for violations of these Terms or other misuse of the Service.',
      'On termination, your right to use the Service ends immediately.',
    ],
  },
  {
    title: '8. Limitation of Liability',
    paragraphs: [
      'To the maximum extent permitted by law, Purrify is not liable for indirect, incidental, special, consequential, or punitive damages resulting from use of the Service.',
    ],
  },
  {
    title: '9. Disclaimer',
    paragraphs: [
      'The Service is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, express or implied.',
    ],
  },
  {
    title: '10. Governing Law',
    paragraphs: [
      'These Terms are governed by the laws of Quebec, Canada, without regard to conflict-of-law rules.',
    ],
  },
  {
    title: '11. Changes to Terms',
    paragraphs: [
      'We may update these Terms from time to time. Continued use of the Service after updates means you accept the revised Terms.',
    ],
  },
];

const TERMS_COPY: Record<'en' | 'fr', TermsCopy> = {
  en: {
    breadcrumbAria: 'Breadcrumb',
    pageTitle: `Terms of Service | ${SITE_NAME}`,
    pageDescription: `Read Purrify's Terms of Service, user agreements, and conditions for using our products and services.`,
    heading: 'Terms of Service',
    lastUpdated: 'Last Updated: February 12, 2026',
    intro: [
      'Please read these Terms carefully before using our website and services.',
      'By accessing or using the Service, you agree to be bound by these Terms.',
    ],
    sections: EN_SECTIONS,
    contactHeading: '12. Contact Us',
    contactLabel: 'Questions about these Terms?',
    contactEmailLabel: 'Email',
    contactPhoneLabel: 'Phone',
    contactAddressLabel: 'Address',
  },
  fr: {
    breadcrumbAria: 'Fil d Ariane',
    pageTitle: `Conditions d Utilisation | ${SITE_NAME}`,
    pageDescription: `Consultez les conditions d utilisation de Purrify et les regles applicables a nos produits et services.`,
    heading: 'Conditions d Utilisation',
    lastUpdated: 'Derniere mise a jour : 12 fevrier 2026',
    intro: [
      'Veuillez lire attentivement ces conditions avant d utiliser notre site et nos services.',
      'En accedant au Service, vous acceptez d etre lie par ces conditions.',
    ],
    sections: EN_SECTIONS,
    contactHeading: '12. Nous Contacter',
    contactLabel: 'Des questions sur ces conditions ?',
    contactEmailLabel: 'Courriel',
    contactPhoneLabel: 'Telephone',
    contactAddressLabel: 'Adresse',
  },
};

export default function TermsPage() {
  const t = useTranslations();
  const locale = useLocale() as 'en' | 'fr';
  const language = locale === 'fr' ? locale : 'en';
  const copy = TERMS_COPY[language];

  const { nextSeoProps, schema, breadcrumb } = useEnhancedSEO({
    path: '/terms',
    title: copy.pageTitle,
    description: copy.pageDescription,
    targetKeyword: 'terms of service',
    schemaType: 'article',
    schemaData: {
      headline: copy.pageTitle,
      description: copy.pageDescription,
      datePublished: '2024-01-01T10:00:00Z',
      dateModified: '2026-02-12T10:00:00Z',
      category: 'Legal',
      wordCount: 1200,
    },
    keywords: ['terms of service', 'purrify terms', 'legal terms', 'user agreement'],
  });

  return (
    <>
      <title>{nextSeoProps.title}</title>
      <meta name="description" content={nextSeoProps.description} />
      <link rel="canonical" href={nextSeoProps.canonical || 'https://www.purrify.ca/terms/'/} />
      {schema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={generateJSONLD(schema)} />
      )}

      <main className="min-h-screen bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <section className="py-4 border-b border-gray-200 dark:border-gray-800">
          <Container>
            <nav aria-label={copy.breadcrumbAria} className="flex items-center space-x-2 text-sm">
              <Link
                href={localizePath('/', locale)}
                className="flex items-center text-gray-500 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors"
              >
                <Home className="w-4 h-4" />
              </Link>
              {breadcrumb?.items?.slice(1).map((item, index, arr) => (
                <span key={item.path} className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1 text-gray-400 dark:text-gray-500" />
                  {index === arr.length - 1 ? (
                    <span className="font-medium text-gray-900 dark:text-gray-100">{item.name}</span>
                  ) : (
                    <Link
                      href={item.path}
                      className="text-gray-500 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </span>
              ))}
            </nav>
          </Container>
        </section>

        <section className="py-16">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="font-heading text-4xl font-bold tracking-tight mb-4 text-[#03E46A]">{copy.heading}</h1>
                <p className="text-gray-600 dark:text-gray-300">{copy.lastUpdated}</p>
              </div>

              <div className="prose prose-lg max-w-none dark:prose-invert text-gray-700 dark:text-gray-200">
                {copy.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}

                {copy.sections.map((section) => (
                  <section key={section.title}>
                    <h2>{section.title}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                ))}

                <h2>{copy.contactHeading}</h2>
                <p>{copy.contactLabel}</p>
                <p>
                  {SITE_NAME}
                  <br />
                  {`${copy.contactEmailLabel}: ${CONTACT_INFO.email}`}
                  <br />
                  {`${copy.contactPhoneLabel}: ${CONTACT_INFO.phone}`}
                  <br />
                  {`${copy.contactAddressLabel}: ${CONTACT_INFO.address}`}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('nav.termsOfService')}
                </p>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
