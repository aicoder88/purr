import { NextSeo, OrganizationJsonLd } from 'next-seo';
import { Layout } from '../src/components/layout/layout';
import { Hero } from '../src/components/sections/hero';
import { About } from '../src/components/sections/about';
import { HowItWorks } from '../src/components/sections/how-it-works';
import { WhyPurrify } from '../src/components/sections/why-purrify';
import { Products } from '../src/components/sections/products';
import { Testimonials } from '../src/components/sections/testimonials';
import { FAQ } from '../src/components/sections/faq';
import { Newsletter } from '../src/components/sections/newsletter';
import { CTA } from '../src/components/sections/cta';
import { Contact } from '../src/components/sections/contact';
import { SITE_NAME, SITE_DESCRIPTION } from '../src/lib/constants';

export default function Home() {
  const pageTitle = `${SITE_NAME} - Activated Carbon Cat Litter Additive`;
  const canonicalUrl = 'https://purrify.ca/';
  
  return (
    <>
      <NextSeo
        title={pageTitle}
        description={SITE_DESCRIPTION}
        canonical={canonicalUrl}
        openGraph={{
          type: 'website',
          url: canonicalUrl,
          title: pageTitle,
          description: SITE_DESCRIPTION,
          images: [
            {
              url: 'https://purrify.ca/purrify-logo.png',
              width: 1200,
              height: 630,
              alt: SITE_NAME,
            },
          ],
        }}
        twitter={{
          handle: '@purrify',
          site: '@purrify',
          cardType: 'summary_large_image',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'cat litter, odor control, activated carbon, cat litter additive, pet odor, cat odor elimination',
          },
        ]}
      />

      <OrganizationJsonLd
        name="Purrify"
        url={canonicalUrl}
        logo="https://purrify.ca/purrify-logo.png"
        sameAs={[
          'https://facebook.com/purrify',
          'https://instagram.com/purrify',
          'https://twitter.com/purrify'
        ]}
        contactPoint={[
          {
            telephone: '+1-438-931-7345',
            contactType: 'customer service',
            email: 'hello@purrify.ca',
            areaServed: 'CA',
            availableLanguage: ['English', 'French'],
          },
        ]}
      />

      <Layout>
        <Hero />
        <About />
        <HowItWorks />
        <WhyPurrify />
        <Products />
        <Testimonials />
        <FAQ />
        <Newsletter />
        <CTA />
        <Contact />
      </Layout>
    </>
  );
}