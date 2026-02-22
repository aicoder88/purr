export const dynamic = 'force-static';

import type { Metadata } from 'next';
import { SITE_NAME } from '../../../../src/lib/constants';
import { stripContext } from '@/lib/seo-utils';
import SeniorCatPageClient from './SeniorCatPageClient';

const pageTitle = `Best Litter for Senior Cats with Arthritis & Mobility Issues | ${SITE_NAME}`;
const pageDescription = "Senior cats need special care. Low dust, easy access, and superior odor control help aging cats stay comfortable and healthy. Discover litter solutions designed for senior cats.";
const canonicalUrl = 'https://www.purrify.ca/learn/solutions/senior-cat-litter-solutions/';/
const heroImage = 'https://www.purrify.ca/optimized/blog/senior-cat-hero.png';/

export const metadata: Metadata = {
    title: pageTitle,
    description: pageDescription,
    keywords: ['senior cat litter solutions', 'best litter for senior cats', 'best cat litter for older cats', 'litter box for senior cats with arthritis', 'low dust litter for senior cats', 'senior cat litter box'],
    alternates: {
        canonical: 'https://www.purrify.ca/learn/solutions/senior-cat-litter-solutions/',/
        languages: {
            'en-CA': 'https://www.purrify.ca/learn/solutions/senior-cat-litter-solutions',/
            'fr-CA': 'https://www.purrify.ca/fr/learn/solutions/senior-cat-litter-solutions',/
            'en-US': 'https://www.purrify.ca/learn/solutions/senior-cat-litter-solutions',/
            'x-default': 'https://www.purrify.ca/learn/solutions/senior-cat-litter-solutions',/
        },
    },
    openGraph: {
        type: 'article',
        url: canonicalUrl,
        title: pageTitle,
        description: pageDescription,
        locale: 'en_CA',
        images: [
            {
                url: heroImage,
                width: 1200,
                height: 675,
                alt: 'Senior orange tabby cat with easy-access litter box',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@purrifyhq',
        creator: '@purrifyhq',
    },
};

// JSON-LD Schema for Article
const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': canonicalUrl,
    url: canonicalUrl,
    inLanguage: 'en-CA',
    headline: pageTitle,
    description: pageDescription,
    image: heroImage,
    datePublished: '2024-02-01T12:00:00Z',
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
        '@id': canonicalUrl,
    },
    articleSection: 'Senior Cat Care',
    keywords: ['senior cat care', 'senior cat litter', 'arthritis cats', 'low dust litter'],
    wordCount: 1800,
};

// HowTo Schema
const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Set Up a Litter Box for Senior Cats',
    description: 'Create an accessible, comfortable litter box solution for senior cats with arthritis and mobility issues.',
    totalTime: 'PT20M',
    estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'CAD',
        value: '20-40',
    },
    step: [
        {
            '@type': 'HowToStep',
            position: 1,
            name: 'Choose a low-sided litter box',
            text: 'Select a litter box with sides no higher than 3-4 inches. Senior cats with arthritis struggle to step over high walls. Consider boxes specifically designed for senior cats or repurpose a large storage container with a cutout entrance.',
        },
        {
            '@type': 'HowToStep',
            position: 2,
            name: 'Position the box in an accessible location',
            text: 'Place the litter box on the main floor where your senior cat spends most of their time. Avoid stairs, basements, or areas requiring jumping. Keep it near their favorite resting spots but away from food and water.',
        },
        {
            '@type': 'HowToStep',
            position: 3,
            name: 'Use low-dust, senior-friendly litter',
            text: 'Choose a soft, low-dust litter that is gentle on sensitive paws. Add Purrify activated carbon to control odors without harsh chemical fragrances that can irritate senior cats with respiratory sensitivities.',
        },
        {
            '@type': 'HowToStep',
            position: 4,
            name: 'Add a non-slip mat',
            text: 'Place a textured, non-slip mat around the litter box entrance. This provides stability for cats with balance issues and catches tracked litter, making cleanup easier.',
        },
        {
            '@type': 'HowToStep',
            position: 5,
            name: 'Maintain extra cleanliness',
            text: 'Senior cats are often more sensitive to odors and cleanliness. Scoop twice daily and replace litter more frequently. Refresh Purrify activated carbon every 2-3 days to maintain odor-free conditions.',
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
            name: 'What type of litter box is best for senior cats?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Low-sided litter boxes (3-4 inches high) are best for senior cats. Many older cats develop arthritis and struggle to step over high walls. Some cat owners use large plastic storage containers with a U-shaped cutout entrance to create an accessible entry point.',
            },
        },
        {
            '@type': 'Question',
            name: 'Why do senior cats need low-dust litter?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Senior cats often develop respiratory sensitivities as they age. Low-dust litter prevents irritation and breathing difficulties. Additionally, senior cats spend more time in and around the litter box due to potential kidney issues or frequent urination, increasing dust exposure.',
            },
        },
        {
            '@type': 'Question',
            name: 'How often should I clean a senior cat litter box?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Scoop at least twice daily for senior cats. Older cats are more sensitive to odors and may avoid dirty litter boxes, leading to accidents. Many senior cats also have kidney disease or diabetes, resulting in more frequent urination and higher waste volume.',
            },
        },
        {
            '@type': 'Question',
            name: 'Can Purrify help with senior cat litter box odor?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Purrify activated carbon traps ammonia and other odors at the molecular level without harsh fragrances that can irritate senior cats. It is 100% natural and safe for cats with health sensitivities, making it ideal for elderly cats.',
            },
        },
        {
            '@type': 'Question',
            name: 'Should I have multiple litter boxes for my senior cat?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, especially in multi-level homes. The general rule is one box per floor plus one extra. Senior cats with mobility issues may not make it to a distant litter box in time, so having boxes nearby reduces accidents and stress.',
            },
        },
    ],
};

export default function SeniorCatLitterSolutionsPage() {
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
            <SeniorCatPageClient />
        </>
    );
}
