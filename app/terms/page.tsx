'use client';

import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';

import { Container } from '@/components/ui/container';
import { SITE_NAME, SITE_DESCRIPTION, CONTACT_INFO } from '@/lib/constants';
import { useTranslation } from '@/lib/translation-context';
import { useEnhancedSEO } from '@/hooks/useEnhancedSEO';
import { generateJSONLD } from '@/lib/seo-utils';

export default function TermsPage() {
  const { locale } = useTranslation();
  const pageTitle = `Terms of Service | ${SITE_NAME}`;
  const pageDescription = `Read Purrify's Terms of Service. Learn about our policies, user agreements, and conditions for using our activated carbon cat litter products and services.`;

  // Use enhanced SEO hook for automated optimization
  const { nextSeoProps, schema, breadcrumb } = useEnhancedSEO({
    path: '/terms',
    title: pageTitle,
    description: pageDescription,
    targetKeyword: 'terms of service',
    schemaType: 'article',
    schemaData: {
      headline: pageTitle,
      description: pageDescription,
      datePublished: '2024-01-01T10:00:00Z',
      dateModified: '2025-05-22T10:00:00Z',
      category: 'Legal',
      wordCount: 2000,
    },
    keywords: ['terms of service', 'purrify terms', 'legal terms', 'user agreement'],
  });

  return (
    <>
      {/* SEO Meta Tags */}
      <title>{nextSeoProps.title}</title>
      <meta name="description" content={nextSeoProps.description} />
      <link rel="canonical" href={nextSeoProps.canonical || "https://www.purrify.ca/terms"} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={nextSeoProps.canonical || "https://www.purrify.ca/terms"} />
      <meta property="og:image" content="https://www.purrify.ca/og-image.jpg" />
      <meta property="og:site_name" content="Purrify" />
      <meta property="og:locale" content="en_CA" />
      <meta property="article:published_time" content="2024-01-01T10:00:00Z" />
      <meta property="article:modified_time" content="2026-01-05T10:00:00Z" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content="https://www.purrify.ca/og-image.jpg" />

      {/* Last Modified */}
      <meta name="last-modified" content="2026-01-05T10:30:00Z" />

      {/* Auto-generated Article Schema with Breadcrumb */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={generateJSONLD(schema)}
        />
      )}

      <main className="min-h-screen bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        {/* Breadcrumb Navigation */}
        <section className="py-4 border-b border-gray-200 dark:border-gray-800">
          <Container>
            <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm">
              <Link
                href={locale === 'fr' ? '/fr' : '/'}
                className="flex items-center text-gray-500 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors"
              >
                <Home className="w-4 h-4" />
              </Link>
              {breadcrumb?.items?.slice(1).map((item, index, arr) => (
                <span key={item.path} className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1 text-gray-400 dark:text-gray-500" />
                  {index === arr.length - 1 ? (
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {item.name}
                    </span>
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
                <h1 className="font-heading text-4xl font-bold tracking-tight mb-4 text-[#03E46A]">
                  Terms of Service
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Last Updated: May 22, 2025
                </p>
              </div>

              <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-200">
                <p>
                  Please read these Terms of Service (&quot;Terms&quot;, &quot;Terms of Service&quot;) carefully before using the https://www.purrify.ca website (the &quot;Service&quot;) operated by {SITE_NAME} (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;).
                </p>
                <p>
                  Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.
                </p>
                <p>
                  By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
                </p>

                <h2>1. Purchases</h2>
                <p>
                  If you wish to purchase any product or service made available through the Service (&quot;Purchase&quot;), you may be asked to supply certain information relevant to your Purchase including, without limitation, your credit card number, the expiration date of your credit card, your billing address, and your shipping information.
                </p>
                <p>
                  You represent and warrant that: (i) you have the legal right to use any credit card(s) or other payment method(s) in connection with any Purchase; and that (ii) the information you supply to us is true, correct and complete.
                </p>
                <p>
                  By submitting such information, you grant us the right to provide the information to third parties for purposes of facilitating the completion of Purchases.
                </p>
                <p>
                  We reserve the right to refuse or cancel your order at any time for certain reasons including but not limited to: product or service availability, errors in the description or price of the product or service, error in your order or other reasons.
                </p>
                <p>
                  We reserve the right to refuse or cancel your order if fraud or an unauthorized or illegal transaction is suspected.
                </p>

                <h2>2. Availability, Errors and Inaccuracies</h2>
                <p>
                  We are constantly updating our offerings of products and services on the Service. The products or services available on our Service may be mispriced, described inaccurately, or unavailable, and we may experience delays in updating information on the Service and in our advertising on other websites.
                </p>
                <p>
                  We cannot and do not guarantee the accuracy or completeness of any information, including prices, product images, specifications, availability, and services. We reserve the right to change or update information and to correct errors, inaccuracies, or omissions at any time without prior notice.
                </p>

                <h2>3. Content</h2>
                <p>
                  Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material (&quot;Content&quot;). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.
                </p>
                <p>
                  By posting Content to the Service, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service. You retain any and all of your rights to any Content you submit, post or display on or through the Service and you are responsible for protecting those rights.
                </p>
                <p>
                  You represent and warrant that: (i) the Content is yours (you own it) or you have the right to use it and grant us the rights and license as provided in these Terms, and (ii) the posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person.
                </p>

                <h2>4. Accounts</h2>
                <p>
                  When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                </p>
                <p>
                  You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
                </p>
                <p>
                  You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
                </p>

                <h2>5. Intellectual Property</h2>
                <p>
                  The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of {SITE_NAME} and its licensors. The Service is protected by copyright, trademark, and other laws of both Canada and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of {SITE_NAME}.
                </p>

                <h2>6. Links To Other Web Sites</h2>
                <p>
                  Our Service may contain links to third-party web sites or services that are not owned or controlled by {SITE_NAME}.
                </p>
                <p>
                  {SITE_NAME} has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that {SITE_NAME} shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
                </p>
                <p>
                  We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.
                </p>

                <h2>7. Termination</h2>
                <p>
                  We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
                <p>
                  Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.
                </p>

                <h2>8. Limitation Of Liability</h2>
                <p>
                  In no event shall {SITE_NAME}, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
                </p>

                <h2>9. Disclaimer</h2>
                <p>
                  Your use of the Service is at your sole risk. The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.
                </p>
                <p>
                  {SITE_NAME}, its subsidiaries, affiliates, and its licensors do not warrant that a) the Service will function uninterrupted, secure or available at any particular time or location; b) any errors or defects will be corrected; c) the Service is free of viruses or other harmful components; or d) the results of using the Service will meet your requirements.
                </p>

                <h2>10. Governing Law</h2>
                <p>
                  These Terms shall be governed and construed in accordance with the laws of Quebec, Canada, without regard to its conflict of law provisions.
                </p>
                <p>
                  Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.
                </p>

                <h2>11. Changes</h2>
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                </p>
                <p>
                  By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
                </p>

                <h2>12. Contact Us</h2>
                <p>
                  If you have any questions about these Terms, please contact us:
                </p>
                <p>
                  {SITE_NAME}<br />
                  Email: {CONTACT_INFO.email}<br />
                  Phone: {CONTACT_INFO.phone}<br />
                  Address: {CONTACT_INFO.address}
                </p>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
