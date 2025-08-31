import { Container } from '@/components/ui/container';
import { NextPage } from "next";
import { SITE_NAME } from "@/lib/constants";
import { useTranslation } from "@/lib/translation-context";
import { LocalizedMeta } from "@/components/seo/LocalizedMeta";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { HowItWorks } from "@/components/sections/how-it-works";
import { EnhancedProductComparison } from "@/components/sections/enhanced-product-comparison";
import { SubscriptionOffer } from "@/components/sections/subscription-offer";
import { UrgencyBanner, StickyUrgencyBar } from "@/components/sections/urgency-banner";
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
      <LocalizedMeta
        title={`${SITE_NAME} - ${t.siteDescription}`}
        description={t.siteDescription}
        keywords={t.seo.keywords}
        canonicalPath=""
        ogTitle={t.seo.openGraph.title}
        ogDescription={t.seo.openGraph.description}
        ogImage="https://purrify.ca/purrify-logo-text.png"
      />
      
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
      <StickyUrgencyBar />
    </Container>
  );
};

export default HomePage;
