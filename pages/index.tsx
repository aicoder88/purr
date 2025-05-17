import Head from 'next/head';
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
  return (
    <>
      <Head>
        <title>{SITE_NAME} - Activated Carbon Cat Litter Additive</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://purrify.ca/" />
        <meta property="og:title" content={`${SITE_NAME} - Activated Carbon Cat Litter Additive`} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:image" content="https://purrify.ca/purrify-logo.png" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://purrify.ca/" />
        <meta property="twitter:title" content={`${SITE_NAME} - Activated Carbon Cat Litter Additive`} />
        <meta property="twitter:description" content={SITE_DESCRIPTION} />
        <meta property="twitter:image" content="https://purrify.ca/purrify-logo.png" />
        
        {/* Canonical Link */}
        <link rel="canonical" href="https://purrify.ca/" />
      </Head>

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Purrify',
            url: 'https://purrify.ca',
            logo: 'https://purrify.ca/purrify-logo.png',
            sameAs: [
              'https://facebook.com/purrify',
              'https://instagram.com/purrify',
              'https://twitter.com/purrify'
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+1-438-931-7345',
              contactType: 'customer service',
              email: 'hello@purrify.ca'
            }
          })
        }}
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