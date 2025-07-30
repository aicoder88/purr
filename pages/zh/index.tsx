import { Container } from '@/components/ui/container';
import { NextPage } from "next";
import Head from "next/head";
import { SITE_NAME } from "@/lib/constants";
import { useTranslation } from "@/lib/translation-context";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { HowItWorks } from "@/components/sections/how-it-works";
import { EnhancedProductComparison } from "@/components/sections/enhanced-product-comparison";
import { SubscriptionOffer } from "@/components/sections/subscription-offer";
import { UrgencyBanner, StickyUrgencyBar } from "@/components/sections/urgency-banner";
import { EmailCapturePopup } from "@/components/sections/email-capture-popup";
import { Stores } from "@/components/sections/stores";
import { WhyPurrify } from "@/components/sections/why-purrify";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";
import { BlogPreview } from "@/components/sections/blog-preview";
import { Contact } from "@/components/sections/contact";

const HomePage: NextPage = () => {
  const { t } = useTranslation();
  
  return (
    <Container>
      <Head>
        <title>{SITE_NAME} - {t.siteDescription}</title>
        <meta name="description" content={t.siteDescription} />
        <meta name="keywords" content={t.seo.keywords} />
        <link rel="canonical" href="https://purrify.ca/zh" />
        <link rel="alternate" hrefLang="zh" href="https://purrify.ca/zh" />
        <link rel="alternate" hrefLang="en" href="https://purrify.ca" />
        <link rel="alternate" hrefLang="fr" href="https://purrify.ca/fr" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://purrify.ca/zh" />
        <meta property="og:title" content={t.seo.openGraph.title} />
        <meta property="og:description" content={t.seo.openGraph.description} />
        <meta property="og:image" content="https://purrify.ca/purrify-logo-text.png" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://purrify.ca/zh" />
        <meta property="twitter:title" content={t.seo.openGraph.title} />
        <meta property="twitter:description" content={t.seo.openGraph.description} />
        <meta property="twitter:image" content="https://purrify.ca/purrify-logo-text.png" />
      </Head>
      
      <UrgencyBanner />
      <Hero />
      <Features />
      <HowItWorks />
      <EnhancedProductComparison />
      <SubscriptionOffer />
      <Stores />
      <WhyPurrify />
      <Testimonials />
      <FAQ />
      <CTA />
      <BlogPreview />
      <Contact />
      <EmailCapturePopup />
      <StickyUrgencyBar />
    </Container>
  );
};

export default HomePage;
