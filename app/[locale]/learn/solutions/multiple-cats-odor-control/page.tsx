export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import MultipleCatsOdorControlPageClient from '@/app/learn/solutions/multiple-cats-odor-control/MultipleCatsOdorControlPageClient';
import { stripContext } from '@/lib/seo-utils';
import { locales, isValidLocale } from '@/i18n/config';

export async function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

interface PageProps {
    params: Promise<{ locale: string }>;
}

const pageTitle = `Multi-Cat Household Odor Solution: Complete Guide for 2+ Cats | ${SITE_NAME}`;
const pageDescription = 'Struggling with cat smell from multiple cats? Odors multiply exponentially with each cat. Activated carbon handles 3, 4, 5+ cats where other solutions fail. See dosage guide.';
const heroImage = 'https://www.purrify.ca/optimized/blog/multiple-cats-together.webp';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params;
    if (!isValidLocale(locale)) return { title: 'Not Found' };

    const canonicalPath = locale === 'en'
        ? `${SITE_URL}/learn/solutions/multiple-cats-odor-control/`
        : `${SITE_URL}/${locale}/learn/solutions/multiple-cats-odor-control/`;

    return {
        title: pageTitle,
        description: pageDescription,
        keywords: ['multi cat household odor solution', 'multiple cats smell', 'how to control cat smell with multiple cats', 'best litter for multiple cats', 'cat odor 3 cats 4 cats 5 cats', 'multi-cat litter box odor'],
        alternates: {
            canonical: canonicalPath,
            languages: {
                'en-CA': `${SITE_URL}/learn/solutions/multiple-cats-odor-control/`,
                'fr-CA': `${SITE_URL}/fr/learn/solutions/multiple-cats-odor-control/`,
                'en-US': `${SITE_URL}/us/learn/solutions/multiple-cats-odor-control/`,
                'x-default': `${SITE_URL}/learn/solutions/multiple-cats-odor-control/`,
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
                    alt: 'Multiple cats living harmoniously in odor-free home',
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
    '@id': 'https://www.purrify.ca/learn/solutions/multiple-cats-odor-control/',
    url: 'https://www.purrify.ca/learn/solutions/multiple-cats-odor-control/',
    inLanguage: 'en-CA',
    headline: pageTitle,
    description: pageDescription,
    image: heroImage,
    datePublished: '2024-01-15T11:00:00Z',
    dateModified: new Date().toISOString(),
    author: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: 'https://www.purrify.ca',
    },
    publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        logo: {
            '@type': 'ImageObject',
            url: 'https://www.purrify.ca/optimized/logos/purrify-logo.png',
            width: 400,
            height: 400,
        },
    },
    mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://www.purrify.ca/learn/solutions/multiple-cats-odor-control/',
    },
    articleSection: 'Multi-Cat Solutions',
    keywords: ['multiple cats', 'multi-cat household', 'odor control', 'cat colony', 'large cat family', 'several cats', 'many cats'],
    wordCount: 1800,
};

// HowTo Schema
const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Control Odor in a Multi-Cat Household',
    description: 'Follow this 5-step system to eliminate odor from 2, 3, 4, or more cats and keep your home fresh.',
    totalTime: 'PT20M',
    step: [
        {
            '@type': 'HowToStep',
            position: 1,
            name: 'Set up enough litter boxes',
            text: 'Follow the golden rule: one litter box per cat, plus one extra. For 3 cats, you need 4 boxes. Spread them across different rooms to prevent odor concentration.',
        },
        {
            '@type': 'HowToStep',
            position: 2,
            name: 'Choose the right litter depth',
            text: 'Add 3-4 inches of litter per box. Multi-cat households need slightly more depth since boxes get used more frequently throughout the day.',
        },
        {
            '@type': 'HowToStep',
            position: 3,
            name: 'Add activated carbon additive to each box',
            text: 'Sprinkle 3-4 tablespoons of Purrify per box for households with 2-3 cats. For 4+ cats, use 4-5 tablespoons. Mix the carbon into the top layer of litter.',
        },
        {
            '@type': 'HowToStep',
            position: 4,
            name: 'Scoop all boxes twice daily',
            text: 'Multi-cat households generate more waste faster. Twice-daily scooping prevents ammonia buildup and keeps all cats happy to use their boxes.',
        },
        {
            '@type': 'HowToStep',
            position: 5,
            name: 'Refresh carbon and litter weekly',
            text: 'Top up each box with 1-2 tablespoons of activated carbon mid-week. Complete litter changes every 1-2 weeks depending on usage.',
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
            name: 'How much Purrify do I need for multiple cats?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'For 2-3 cats, use 3-4 tablespoons per litter box. For 4+ cats, use 4-5 tablespoons. Our 500g jar lasts 6-8 weeks for 2-3 cats with 4 boxes. For larger multi-cat households, the 1kg size offers better value.',
            },
        },
        {
            '@type': 'Question',
            name: 'Why does having multiple cats make odor so much worse?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: "Odors don't just add up—they multiply. Each cat produces 3-4 ounces of urine daily, and the bacteria converting it to ammonia work faster in concentrated waste. Two cats don't create double the odor; they can create 3-4x the smell.",
            },
        },
        {
            '@type': 'Question',
            name: 'Can Purrify help reduce territorial marking in multi-cat homes?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Cats often mark territory in response to detecting other cats\' scent markers. By neutralizing these odor signals, activated carbon can reduce the triggers that lead to territorial marking and spraying behavior.',
            },
        },
        {
            '@type': 'Question',
            name: 'Do I need to use Purrify in every litter box?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'For best results, yes. Odor can build up in any box, and cats may avoid smelly boxes and use other areas of your home. Treating all boxes ensures consistent odor control and encourages proper litter box use.',
            },
        },
        {
            '@type': 'Question',
            name: 'Is it safe if my cats share litter boxes?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: "Purrify is 100% safe regardless of how your cats use their boxes. Made from food-grade coconut shell carbon, it's non-toxic even if ingested during grooming. However, we recommend maintaining enough boxes to reduce stress and territorial issues.",
            },
        },
    ],
};

export default async function MultipleCatsOdorControlPage({ params }: PageProps) {
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
            <MultipleCatsOdorControlPageClient />
        </>
    );
}
