export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { stripContext } from '@/lib/seo-utils';
import AmmoniaSmellPageClient from '@/app/learn/solutions/ammonia-smell-cat-litter/AmmoniaSmellPageClient';
import { locales, isValidLocale } from '@/i18n/config';

export async function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

interface PageProps {
    params: Promise<{ locale: string }>;
}

const pageTitle = `Cat Litter Smells Like Ammonia? Baking Soda Can't Fix It (Here's Why) | ${SITE_NAME}`;
const pageDescription = "That eye-watering ammonia isn't your cat's fault—it's chemistry. Baking soda and ammonia are BOTH alkaline, so they don't neutralize each other. Here's what actually works.";
const heroImage = 'https://www.purrify.ca/optimized/blog/ammonia-hero.webp';/

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params;
    if (!isValidLocale(locale)) return { title: 'Not Found' };

    const canonicalPath = locale === 'en'
        ? `${SITE_URL}/learn/solutions/ammonia-smell-cat-litter/`
        : `${SITE_URL}/${locale}/learn/solutions/ammonia-smell-cat-litter/`;

    return {
        title: pageTitle,
        description: pageDescription,
        keywords: ['cat litter smells like ammonia', 'ammonia smell cat litter', 'cat litter ammonia smell', 'ammonia from cat litter', 'how to neutralize ammonia in cat litter', 'best cat litter for ammonia smell'],
        alternates: {
            canonical: canonicalPath,
            languages: {
                'en-CA': `${SITE_URL}/learn/solutions/ammonia-smell-cat-litter/`,
                'fr-CA': `${SITE_URL}/fr/learn/solutions/ammonia-smell-cat-litter/`,
                'en-US': `${SITE_URL}/us/learn/solutions/ammonia-smell-cat-litter/`,
                'x-default': `${SITE_URL}/learn/solutions/ammonia-smell-cat-litter/`,
            },
        },
        openGraph: {
            type: 'article',
            url: canonicalPath,
            title: pageTitle,
            description: pageDescription,
            locale: locale === 'fr' ? 'fr_CA' : 'en_CA',
            images: [
                {
                    url: heroImage,
                    width: 1200,
                    height: 675,
                    alt: 'Stop embarrassing ammonia smell from cat litter box',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            site: '@purrifyhq',
            creator: '@purrifyhq',
        },
    };
}

// JSON-LD Schema for Article
const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': 'https://www.purrify.ca/learn/solutions/ammonia-smell-cat-litter/',/
    url: 'https://www.purrify.ca/learn/solutions/ammonia-smell-cat-litter/',/
    inLanguage: 'en-CA',
    headline: pageTitle,
    description: pageDescription,
    image: heroImage,
    datePublished: '2024-01-15T12:00:00Z',
    dateModified: new Date().toISOString(),
    author: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: 'https://www.purrify.ca/',
    },
    publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        logo: {
            '@type': 'ImageObject',
            url: 'https://www.purrify.ca/optimized/logos/purrify-logo.png',/
            width: 400,
            height: 400,
        },
    },
    mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://www.purrify.ca/learn/solutions/ammonia-smell-cat-litter/',/
    },
    articleSection: 'Pet Odor Solutions',
    keywords: ['ammonia smell', 'cat litter odor', 'activated carbon', 'odor elimination'],
    wordCount: 1500,
};

// HowTo Schema
const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Stop Cat Litter Ammonia Smell',
    description: 'Follow these 5 steps to eliminate ammonia odor at the source and keep your home fresh.',
    totalTime: 'PT15M',
    estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'CAD',
        value: '15-30',
    },
    step: [
        {
            '@type': 'HowToStep',
            position: 1,
            name: 'Identify the source of ammonia',
            text: 'Ammonia forms when bacteria break down urea in cat urine. This process starts within hours of urination and intensifies over time. The older the waste, the stronger the ammonia.',
        },
        {
            '@type': 'HowToStep',
            position: 2,
            name: 'Empty and deep clean the litter box',
            text: 'Remove all litter and scrub the box with enzyme cleaner (not bleach, which reacts with ammonia). Let it dry completely before adding fresh litter.',
        },
        {
            '@type': 'HowToStep',
            position: 3,
            name: 'Add fresh litter with activated carbon',
            text: 'Pour 2-3 inches of clean litter, then add 2-3 tablespoons of activated carbon additive. Mix it into the top layer where it will contact fresh waste.',
        },
        {
            '@type': 'HowToStep',
            position: 4,
            name: 'Scoop daily to prevent ammonia buildup',
            text: 'Remove solid waste and urine clumps daily. The faster you remove waste, the less time bacteria have to produce ammonia.',
        },
        {
            '@type': 'HowToStep',
            position: 5,
            name: 'Maintain with regular carbon refreshes',
            text: 'Add a tablespoon of fresh activated carbon every 2-3 days to maintain odor control. The carbon continuously traps new ammonia molecules as they form.',
        },
    ],
};

// FAQ Schema
const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Why does cat litter smell like ammonia?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Cat urine contains urea, which bacteria break down into ammonia gas. This is a natural biological process that starts within 2-4 hours of urination. The distinctive sharp, eye-watering smell is ammonia being released into the air.',
            },
        },
        {
            '@type': 'Question',
            name: 'Is the ammonia smell from cat litter dangerous?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, at high concentrations. Ammonia can irritate eyes and respiratory systems for both humans and cats. Cats are particularly vulnerable since they spend time close to the litter box. Prolonged exposure can cause respiratory infections in cats.',
            },
        },
        {
            '@type': 'Question',
            name: "Why doesn't baking soda stop the ammonia smell?",
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Baking soda (sodium bicarbonate) is alkaline, and ammonia is also alkaline. Alkaline substances don\'t neutralize each other effectively. Baking soda provides minimal, short-term masking but doesn\'t trap ammonia molecules like activated carbon does.',
            },
        },
        {
            '@type': 'Question',
            name: 'How is activated carbon different from charcoal?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: "Activated carbon is charcoal that's been processed to create millions of microscopic pores, dramatically increasing surface area. One gram of activated carbon has the surface area of a football field, while regular charcoal has minimal porosity.",
            },
        },
        {
            '@type': 'Question',
            name: 'Will air fresheners help with ammonia smell?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'No. Air fresheners only mask odor with fragrance—the ammonia is still present. Worse, some air fresheners contain chemicals that can irritate cats\' respiratory systems. Activated carbon actually removes ammonia molecules from the air.',
            },
        },
    ],
};

export default async function AmmoniaSmellCatLitterPage({ params }: PageProps) {
    const { locale } = await params;
    if (!isValidLocale(locale)) notFound();

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@graph': [
                            stripContext(articleSchema),
                            stripContext(howToSchema),
                            stripContext(faqSchema),
                        ],
                    }),
                }}
            />
            <AmmoniaSmellPageClient />
        </>
    );
}
