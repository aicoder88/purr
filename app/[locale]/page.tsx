import type { Metadata } from 'next';
import { Hero } from '@/components/sections/hero';
import { HowItWorks } from '@/components/sections/how-it-works';
import { MadeInCanada } from '@/components/sections/made-in-canada';
import { AgitationSection } from '@/components/sections/agitation-section';
import { WhyPurrify } from '@/components/sections/why-purrify';
import { ScienceSection } from '@/components/sections/science-section';
import { HomepageTestimonials } from '@/components/sections/homepage-testimonials';
import { BlogPreview } from '@/components/sections/blog-preview';
import { ScrollingAnnouncementBar } from '@/components/sections/scrolling-announcement-bar';
import { Stores } from '@/components/sections/stores';
import { Newsletter } from '@/components/sections/newsletter';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { TrustBadges } from '@/components/social-proof/TrustBadges';
import { ClientLocationsMap } from '@/components/maps/ClientLocationsMap';

import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants';
import { getSEOMeta } from '@/translations/seo-meta';
import {
    getPriceValidityDate,
    generateHomepageSchema,
    buildLanguageAlternates,
    getLocalizedKeywords,
    normalizeLocale,
    getLocalizedUrl,
} from '@/lib/seo-utils';
import { isValidLocale } from '@/i18n/config';
import type { Currency } from '@/lib/geo/currency-detector';
import { notFound } from 'next/navigation';

// Import client components
import { HomepageClient } from '../homepage-client';

interface LocalizedHomepageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LocalizedHomepageProps): Promise<Metadata> {
    const { locale } = await params;

    if (!isValidLocale(locale)) {
        return { title: 'Not Found' };
    }

    const normalizedLocale = normalizeLocale(locale);
    const seoMeta = getSEOMeta(normalizedLocale, 'homepage');
    const pageTitle = seoMeta?.title || `${SITE_NAME} - Cat Litter Odor Control`;
    const pageDescription = seoMeta?.description || SITE_DESCRIPTION;
    const keywords = seoMeta?.targetKeyword
        ? [...getLocalizedKeywords(normalizedLocale), seoMeta.targetKeyword]
        : getLocalizedKeywords(normalizedLocale);

    const canonicalUrl = getLocalizedUrl('/', normalizedLocale);
    const languageAlternates = buildLanguageAlternates('/');

    const alternates: Record<string, string> = {};
    languageAlternates.forEach((alt) => {
        alternates[alt.hrefLang] = alt.href;
    });

    return {
        title: pageTitle,
        description: pageDescription,
        keywords: keywords.join(', '),
        metadataBase: new URL(SITE_URL),
        alternates: {
            canonical: canonicalUrl,
            languages: alternates,
        },
        openGraph: {
            type: 'website',
            url: canonicalUrl,
            title: pageTitle,
            description: pageDescription,
            locale: normalizedLocale === 'fr' ? 'fr_CA' : 'en_CA',
            siteName: SITE_NAME,
            images: [
                {
                    url: '/images/Logos/purrify-logo.png',
                    width: 1200,
                    height: 800,
                    alt: pageTitle,
                },
            ],
        },
    };
}

export default async function LocalizedHomePage({ params }: LocalizedHomepageProps) {
    const { locale } = await params;

    if (!isValidLocale(locale)) {
        notFound();
    }

    const currency: Currency = 'CAD';
    const priceValidUntil = getPriceValidityDate();
    const normalizedLocale = normalizeLocale(locale);

    const homepageSchema = generateHomepageSchema(normalizedLocale, currency);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema) }}
            />

            <main
                id="main-content"
                className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-900"
            >
                {/* Section 1: Hero */}
                <ErrorBoundary>
                    <Hero />
                </ErrorBoundary>

                <ScrollingAnnouncementBar />

                {/* Section 2: How It Works (Three-Step) */}
                <ErrorBoundary>
                    <HowItWorks />
                </ErrorBoundary>

                {/* Section 3: Made in Canada / Ingredients */}
                <ErrorBoundary>
                    <MadeInCanada />
                </ErrorBoundary>

                {/* Section 4: The Story ("The Embarrassed Cat Owner") */}
                <ErrorBoundary>
                    <AgitationSection />
                </ErrorBoundary>

                {/* Section 5: Why Cat Parents Keep Coming Back (Features) */}
                <ErrorBoundary>
                    <WhyPurrify />
                </ErrorBoundary>

                {/* Section 6: The Science ("The Secret Sauce") */}
                <ErrorBoundary>
                    <ScienceSection />
                </ErrorBoundary>

                {/* Section 7: Products / Offer + CTA */}
                <HomepageClient
                    priceValidUntil={priceValidUntil}
                    locale={locale}
                    currency={currency}
                />

                {/* Social Proof: Named Testimonials */}
                <ErrorBoundary>
                    <HomepageTestimonials />
                </ErrorBoundary>

                <section className="py-10 cv-auto cis-480">
                    <div className="container mx-auto px-4">
                        <TrustBadges variant="elegant" showIcons={true} />
                    </div>
                </section>

                <div className="cv-auto cis-720">
                    <ErrorBoundary>
                        <ClientLocationsMap height="400" />
                    </ErrorBoundary>
                </div>

                <div className="cv-auto cis-720">
                    <ErrorBoundary>
                        <Stores />
                    </ErrorBoundary>
                </div>

                <div className="cv-auto cis-720">
                    <ErrorBoundary>
                        <Newsletter />
                    </ErrorBoundary>
                </div>

                <div className="cv-auto cis-720">
                    <ErrorBoundary>
                        <BlogPreview />
                    </ErrorBoundary>
                </div>
            </main>
        </>
    );
}
