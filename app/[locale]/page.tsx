import type { Metadata } from 'next';
import { Hero } from '@/components/sections/hero';
import { HowItWorks } from '@/components/sections/how-it-works';
import { AgitationSection } from '@/components/sections/agitation-section';
import { WhyPurrify } from '@/components/sections/why-purrify';
import { ScienceSection } from '@/components/sections/science-section';
import { HomepageTestimonials } from '@/components/sections/homepage-testimonials';
import { BlogPreview } from '@/components/sections/blog-preview';
import { ScrollingAnnouncementBar } from '@/components/sections/scrolling-announcement-bar';
import { Stores } from '@/components/sections/stores';
import { WaitlistSection } from '@/components/sections/newsletter';
import { ErrorBoundary } from '@/components/ui/error-boundary';
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
import { ScopedIntlProvider } from '@/components/providers/ScopedIntlProvider';

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
                    url: '/optimized/logos/purrify-logo.png',
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

            <ScopedIntlProvider locale={locale} scopes={['root', 'home']}>
                <main
                    id="main-content"
                    className="overflow-x-clip bg-[linear-gradient(180deg,#fffdf7_0%,#fdf8f1_36%,#fffdf8_100%)] dark:bg-[linear-gradient(180deg,#030712_0%,#0b1220_52%,#030712_100%)]"
                >
                    <ErrorBoundary>
                        <Hero />
                    </ErrorBoundary>

                    <ScrollingAnnouncementBar />

                    <ErrorBoundary>
                        <HowItWorks />
                    </ErrorBoundary>

                    <ErrorBoundary>
                        <WhyPurrify />
                    </ErrorBoundary>

                    <ErrorBoundary>
                        <HomepageTestimonials />
                    </ErrorBoundary>

                    <HomepageClient
                        priceValidUntil={priceValidUntil}
                        locale={locale}
                        currency={currency}
                    />

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
                            className="bg-[linear-gradient(180deg,#fffdf7_0%,#fdf8f1_36%,#fffdf8_100%)] dark:bg-[linear-gradient(180deg,#030712_0%,#0b1220_52%,#030712_100%)]"
                            height="400"
                        />
                    </ErrorBoundary>

                    <ErrorBoundary>
                        <WaitlistSection />
                    </ErrorBoundary>

                    <ErrorBoundary>
                        <BlogPreview />
                    </ErrorBoundary>
                </main>
            </ScopedIntlProvider>
        </>
    );
}
