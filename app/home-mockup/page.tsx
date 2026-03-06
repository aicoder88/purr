export const dynamic = "force-static";

import { ErrorBoundary } from "@/components/ui/error-boundary";
import { ScopedIntlProvider } from "@/components/providers/ScopedIntlProvider";
import { HowItWorks } from "@/components/sections/how-it-works";
import { WhyPurrify } from "@/components/sections/why-purrify";
import { HomepageTestimonials } from "@/components/sections/homepage-testimonials";
import { EnhancedProductComparison } from "@/components/sections/enhanced-product-comparison";
import { ScienceSection } from "@/components/sections/science-section";
import { AgitationSection } from "@/components/sections/agitation-section";
import { Stores } from "@/components/sections/stores";
import { BlogPreview } from "@/components/sections/blog-preview";
import { ClientLocationsMap } from "@/components/maps/ClientLocationsMap";
import {
  HomepagePackagingMockupBar,
  HomepagePackagingMockupCTA,
  HomepagePackagingMockupHero,
} from "@/components/mockups/HomepagePackagingMockup";

export default async function HomeMockupPage() {
  return (
    <ScopedIntlProvider scopes={["root", "home"]}>
      <main
        id="main-content"
        role="main"
        className="overflow-x-clip bg-[linear-gradient(180deg,#fff9fd_0%,#fcfcff_40%,#fffdf8_100%)] dark:bg-[linear-gradient(180deg,#0d1320_0%,#111827_46%,#151b27_100%)]"
      >
        <ErrorBoundary>
          <HomepagePackagingMockupHero />
        </ErrorBoundary>

        <ErrorBoundary>
          <HomepagePackagingMockupBar />
        </ErrorBoundary>

        <ErrorBoundary>
          <HowItWorks />
        </ErrorBoundary>

        <ErrorBoundary>
          <WhyPurrify />
        </ErrorBoundary>

        <ErrorBoundary>
          <HomepageTestimonials />
        </ErrorBoundary>

        <ErrorBoundary>
          <EnhancedProductComparison />
        </ErrorBoundary>

        <ErrorBoundary>
          <ScienceSection />
        </ErrorBoundary>

        <ErrorBoundary>
          <AgitationSection />
        </ErrorBoundary>

        <ErrorBoundary>
          <Stores />
        </ErrorBoundary>

        <ErrorBoundary>
          <ClientLocationsMap
            className="bg-[linear-gradient(180deg,#fff9fd_0%,#fcfcff_42%,#fffdf8_100%)] dark:bg-[linear-gradient(180deg,#0d1320_0%,#111827_48%,#151b27_100%)]"
            height="400"
          />
        </ErrorBoundary>

        <ErrorBoundary>
          <BlogPreview />
        </ErrorBoundary>

        <ErrorBoundary>
          <HomepagePackagingMockupCTA />
        </ErrorBoundary>
      </main>
    </ScopedIntlProvider>
  );
}
