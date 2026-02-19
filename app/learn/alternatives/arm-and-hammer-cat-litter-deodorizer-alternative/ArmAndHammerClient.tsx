'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Beaker, Check, ChevronRight, Clock, Home, Leaf, Shield, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { useCurrency } from '@/lib/currency-context';
import { localizePath } from '@/lib/i18n/locale-path';
import { getPaymentLink } from '@/lib/payment-links';
import { formatProductPrice } from '@/lib/pricing';
import { useTranslations, useLocale } from 'next-intl';

type ComparisonRow = {
    feature: string;
    armHammer: string;
    purrify: string;
    winner: 'arm' | 'purrify' | 'tie';
};

type FAQItem = {
    question: string;
    answer: string;
};

type AlternativeCopy = {
    breadcrumbAria: string;
    badge: string;
    titleTop: string;
    titleHighlight: string;
    intro: string;
    introStrong: string;
    heroAlt: string;
    problemTitle: string;
    problemP1: string;
    problemP2: string;
    reactionLabel: string;
    reactionValue: string;
    reactionResult: string;
    problemP3: string;
    whatItDoesTitle: string;
    solutionTitle: string;
    solutionIntro: string;
    solutionCards: Array<{ title: string; body: string }>;
    surfaceTitle: string;
    surfaceCaption: string;
    surfaceArmValue: string;
    surfacePurrifyValue: string;
    tableTitle: string;
    tableHeaders: {
        feature: string;
        arm: string;
        purrify: string;
    };
    howToTitle: string;
    howToIntro: string;
    howToTime: string;
    socialTitle: string;
    ctaTitle: string;
    ctaBody: string;
    ctaSecondary: string;
    ctaFootnote: string;
    faqTitle: string;
    relatedTitle: string;
    related: Array<{ title: string; description: string; href: string }>;
    testimonials: Array<{ quote: string; author: string }>;
    comparison: ComparisonRow[];
    limits: string[];
    howTo: Array<{ title: string; body: string }>;
    faqs: FAQItem[];
};

const EN_COPY: AlternativeCopy = {
    breadcrumbAria: 'Breadcrumb',
    badge: 'Product Comparison',
    titleTop: 'Arm & Hammer Not Working?',
    titleHighlight: 'Here Is Why (And What Works Better)',
    intro: 'If ammonia odor keeps coming back after baking soda products, you are not imagining it.',
    introStrong: 'This is mostly a chemistry mismatch.',
    heroAlt: 'Activated carbon and baking soda comparison for litter odor control',
    problemTitle: 'Why Baking Soda Often Misses Ammonia',
    problemP1: 'Many deodorizer products rely on baking soda, which can help with some acidic odor compounds.',
    problemP2: 'Cat urine ammonia is alkaline, so base-on-base neutralization is limited.',
    reactionLabel: 'pH context',
    reactionValue: 'Baking soda ~8.3, ammonia ~11.6',
    reactionResult: 'Base + base means minimal neutralization for ammonia-heavy odor.',
    problemP3: 'That is why daily reapplication can still leave persistent smell in multi-cat homes.',
    whatItDoesTitle: 'What baking soda can do',
    solutionTitle: 'Why Activated Carbon Performs Differently',
    solutionIntro: 'Activated carbon traps odor molecules physically through adsorption instead of relying on acid-base reaction.',
    solutionCards: [
        { title: 'Targets Ammonia', body: 'Works through physical adsorption regardless of pH.' },
        { title: 'Longer Cycle', body: 'Often remains effective for 7+ days between refreshes.' },
        { title: 'Fragrance-Free', body: 'No perfume masking layer needed.' },
    ],
    surfaceTitle: 'Surface Area Difference',
    surfaceCaption: 'Activated carbon can expose dramatically more capture area than baking soda.',
    surfaceArmValue: '0.2 m2/g',
    surfacePurrifyValue: '1,150 m2/g',
    tableTitle: 'Arm & Hammer vs Activated Carbon',
    tableHeaders: {
        feature: 'Feature',
        arm: 'Arm & Hammer',
        purrify: 'Purrify (Activated Carbon)',
    },
    howToTitle: 'How to Switch',
    howToIntro: 'Most cat owners can switch without changing litter brand or routine.',
    howToTime: 'Estimated setup time: about 5 minutes.',
    socialTitle: 'Cat Owner Feedback After Switching',
    ctaTitle: 'Ready to Test an Alternative?',
    ctaBody: 'Purrify uses coconut-shell activated carbon for ammonia-focused odor capture.',
    ctaSecondary: 'View All Products',
    ctaFootnote: 'No subscription required. Made in Canada.',
    faqTitle: 'Common Questions',
    relatedTitle: 'Related Reading',
    related: [
        {
            title: 'Activated Carbon vs Baking Soda',
            description: 'Side-by-side technical comparison.',
            href: '/blog/activated-carbon-vs-baking-soda-comparison',
        },
        {
            title: 'Stop Ammonia Smell',
            description: 'Practical ammonia control guide.',
            href: '/blog/how-to-neutralize-ammonia-cat-litter',
        },
        {
            title: 'Neutralization Methods',
            description: 'Methods ranked by effectiveness.',
            href: '/blog/how-to-neutralize-ammonia-cat-litter',
        },
    ],
    testimonials: [
        {
            quote: 'I stopped daily baking soda top-ups and the weekly freshness is far more consistent now.',
            author: 'Jennifer M., 2 cats',
        },
        {
            quote: 'Apartment odor complaints disappeared after switching to activated carbon.',
            author: 'Alex T., shared apartment',
        },
        {
            quote: 'Once I understood the pH issue, the switch was obvious.',
            author: 'Sarah K., multi-cat household',
        },
        {
            quote: 'For me, weekly refresh beats constant reapplication.',
            author: 'Michael R., studio apartment',
        },
    ],
    comparison: [
        {
            feature: 'Mechanism',
            armHammer: 'Moisture handling and partial masking',
            purrify: 'Adsorption in microporous carbon',
            winner: 'purrify',
        },
        {
            feature: 'Typical interval',
            armHammer: '1-2 days',
            purrify: 'About 7 days',
            winner: 'purrify',
        },
        {
            feature: 'Ammonia focus',
            armHammer: 'Limited on alkaline ammonia',
            purrify: 'Designed for ammonia capture',
            winner: 'purrify',
        },
        {
            feature: 'Surface area',
            armHammer: '~0.2 m2/g',
            purrify: '~1,150 m2/g',
            winner: 'purrify',
        },
        {
            feature: 'Fragrance dependency',
            armHammer: 'Often paired with scent',
            purrify: 'Fragrance-free operation',
            winner: 'purrify',
        },
    ],
    limits: [
        'Can absorb moisture short-term',
        'Can help with certain non-ammonia odor notes',
        'May need frequent reapplication in humid or multi-cat settings',
        'Limited neutralization for alkaline ammonia-driven odor',
    ],
    howTo: [
        {
            title: 'Stop daily baking soda additions',
            body: 'No deep reset needed. Just pause the daily bicarbonate top-up cycle.',
        },
        {
            title: 'Add activated carbon with fresh litter',
            body: 'Distribute 2-3 tablespoons and mix through the top layer.',
        },
        {
            title: 'Refresh weekly',
            body: 'Most homes maintain performance with a weekly refresh.',
        },
        {
            title: 'Evaluate in 24 hours',
            body: 'You should notice clearer ammonia reduction within the first day.',
        },
    ],
    faqs: [
        {
            question: 'Why can ammonia persist with baking soda products?',
            answer: 'Ammonia is alkaline and baking soda is also alkaline, so neutralization is limited for ammonia-heavy odor cases.',
        },
        {
            question: 'Is activated carbon safe around cats?',
            answer: 'Filtration-grade activated carbon is commonly used for pet and home odor applications when used as directed.',
        },
        {
            question: 'Can I combine both approaches?',
            answer: 'Yes, but activated carbon typically handles the main ammonia burden and often reduces reliance on baking soda.',
        },
        {
            question: 'How often should I refresh activated carbon?',
            answer: 'Many homes refresh weekly; higher-load setups may refresh sooner.',
        },
    ],
};

const COPY: Record<'en' | 'fr', AlternativeCopy> = {
    en: EN_COPY,
    fr: {
        ...EN_COPY,
        breadcrumbAria: 'Fil d Ariane',
        badge: 'Comparaison Produit',
        titleTop: 'Arm & Hammer ne suffit pas ?',
        titleHighlight: 'Voici pourquoi (et une meilleure option)',
        ctaSecondary: 'Voir Tous les Produits',
    },
};

export default function ArmAndHammerClient() {
    const t = useTranslations();
  const locale = useLocale() as 'en' | 'fr';
    const { currency } = useCurrency();
    const language = locale === 'fr' ? locale : 'en';
    const copy = COPY[language];

    const trialPrice = formatProductPrice('trial', currency, locale);
    const trialCheckoutUrl = getPaymentLink('trialSingle') || '/products/trial-size';
    const trialCtaLabel = `${t('nav.trialSize')} - ${trialPrice}`;

    return (
        <main className="min-h-screen bg-gradient-to-br from-[#FFFFFF] via-[#FFFFF5] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
            <section className="py-4 border-b border-gray-200 dark:border-gray-800">
                <Container>
                    <nav aria-label={copy.breadcrumbAria} className="flex items-center space-x-2 text-sm">
                        <Link href={localizePath('/', locale)} className="flex items-center text-gray-500 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
                            <Home className="w-4 h-4" />
                        </Link>
                        <span className="flex items-center">
                            <ChevronRight className="w-4 h-4 mx-1 text-gray-400 dark:text-gray-500" />
                            <Link href={localizePath('/learn', locale)} className="text-gray-500 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
                                {t('nav.learn')}
                            </Link>
                        </span>
                        <span className="flex items-center">
                            <ChevronRight className="w-4 h-4 mx-1 text-gray-400 dark:text-gray-500" />
                            <span className="font-medium text-gray-900 dark:text-gray-100">{copy.titleTop}</span>
                        </span>
                    </nav>
                </Container>
            </section>

            <section className="py-16">
                <Container>
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 text-sm font-medium mb-6">
                            <Beaker className="w-4 h-4" />
                            <span>{copy.badge}</span>
                        </div>

                        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-50 leading-tight">
                            {copy.titleTop}
                            <br />
                            <span className="text-[#FF3131] dark:text-[#FF5050]">{copy.titleHighlight}</span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                            {copy.intro} <strong>{copy.introStrong}</strong>
                        </p>

                        <div className="relative max-w-2xl mx-auto">
                            <div className="absolute -inset-4 bg-gradient-to-r from-[#FF3131]/20 to-[#5B2EFF]/30 dark:from-[#FF5050]/10 dark:to-[#3694FF]/20 rounded-3xl blur-xl opacity-70" />
                            <div className="relative">
                                <Image
                                    src="/optimized/activated-carbon-vs-baking-soda-comparison.webp"
                                    alt={copy.heroAlt}
                                    width={1200}
                                    height={630}
                                    className="w-full h-auto rounded-2xl shadow-2xl"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="py-16 bg-white dark:bg-gray-800/50">
                <Container>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
                        <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-gray-100 mb-6">{copy.problemTitle}</h2>
                        <div className="grid md:grid-cols-2 gap-8 items-start">
                            <div>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">{copy.problemP1}</p>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">{copy.problemP2}</p>

                                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
                                    <p className="text-red-800 dark:text-red-200 font-medium">{`${copy.reactionLabel}: ${copy.reactionValue}`}</p>
                                    <p className="text-red-700 dark:text-red-300 text-sm mt-2">{copy.reactionResult}</p>
                                </div>

                                <p className="text-gray-700 dark:text-gray-300">{copy.problemP3}</p>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">{copy.whatItDoesTitle}</h3>
                                <ul className="space-y-3">
                                    {copy.limits.map((item, index) => (
                                        <li key={`${item}-${index}`} className="flex items-start gap-2">
                                            {index < 2 ? (
                                                <Check className="w-5 h-5 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                            ) : (
                                                <X className="w-5 h-5 text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" />
                                            )}
                                            <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="py-16">
                <Container>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800">
                        <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-gray-100 mb-4">{copy.solutionTitle}</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg">{copy.solutionIntro}</p>

                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            {copy.solutionCards.map((card, index) => (
                                <div key={card.title} className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
                                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        {index === 0 ? <Beaker className="w-6 h-6 text-green-600 dark:text-green-400" /> : index === 1 ? <Clock className="w-6 h-6 text-green-600 dark:text-green-400" /> : <Leaf className="w-6 h-6 text-green-600 dark:text-green-400" />}
                                    </div>
                                    <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">{card.title}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{card.body}</p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">{copy.surfaceTitle}</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-700 dark:text-gray-300">{copy.tableHeaders.arm}</span>
                                        <span className="font-mono text-gray-900 dark:text-gray-100">{copy.surfaceArmValue}</span>
                                    </div>
                                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-red-400 dark:bg-red-500 rounded-full" style={{ width: '2%' }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-700 dark:text-gray-300">{copy.tableHeaders.purrify}</span>
                                        <span className="font-mono text-gray-900 dark:text-gray-100">{copy.surfacePurrifyValue}</span>
                                    </div>
                                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 dark:bg-green-400 rounded-full" style={{ width: '100%' }} />
                                    </div>
                                </div>
                            </div>
                            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">{copy.surfaceCaption}</p>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="py-16 bg-white dark:bg-gray-800/50">
                <Container>
                    <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">{copy.tableTitle}</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-gray-700">
                                    <th className="p-4 text-left text-gray-900 dark:text-gray-100 font-bold">{copy.tableHeaders.feature}</th>
                                    <th className="p-4 text-left text-gray-900 dark:text-gray-100 font-bold">{copy.tableHeaders.arm}</th>
                                    <th className="p-4 text-left text-gray-900 dark:text-gray-100 font-bold">{copy.tableHeaders.purrify}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {copy.comparison.map((row, index) => (
                                    <tr key={row.feature} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-750'}>
                                        <td className="p-4 text-gray-700 dark:text-gray-300 font-medium">{row.feature}</td>
                                        <td className={`p-4 ${row.winner === 'purrify' ? 'text-gray-500 dark:text-gray-400' : 'text-gray-700 dark:text-gray-300'}`}>
                                            {row.armHammer}
                                        </td>
                                        <td className={`p-4 ${row.winner === 'purrify' ? 'text-green-700 dark:text-green-400 font-medium' : 'text-gray-700 dark:text-gray-300'}`}>
                                            {row.winner === 'purrify' && <Check className="w-4 h-4 inline mr-1" />}
                                            {row.purrify}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Container>
            </section>

            <section className="py-16">
                <Container>
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-2">{copy.howToTitle}</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">{copy.howToIntro}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{copy.howToTime}</p>
                        <ol className="space-y-6">
                            {copy.howTo.map((step, index) => (
                                <li key={step.title} className="relative pl-12 pb-6 border-l-2 border-green-200 dark:border-green-800 last:border-l-0 last:pb-0">
                                    <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 rounded-full bg-green-500 dark:bg-green-600 text-white dark:text-gray-100 flex items-center justify-center font-bold text-sm">
                                        {index + 1}
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                        <h3 className="font-semibold text-gray-900 dark:text-gray-50 mb-2">{step.title}</h3>
                                        <p className="text-gray-700 dark:text-gray-300">{step.body}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </Container>
            </section>

            <section className="py-16 bg-white dark:bg-gray-800/50">
                <Container>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                        <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">{copy.socialTitle}</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {copy.testimonials.map((item) => (
                                <blockquote key={item.author} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                                    <p className="text-gray-700 dark:text-gray-300 italic mb-4">{item.quote}</p>
                                    <footer className="text-sm text-gray-500 dark:text-gray-400">{item.author}</footer>
                                </blockquote>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            <section className="py-16">
                <Container>
                    <div className="bg-gradient-to-r from-[#FF3131] to-[#FF5050] rounded-2xl p-8 text-center text-white dark:text-gray-100">
                        <h2 className="text-3xl font-heading font-bold mb-4">{copy.ctaTitle}</h2>
                        <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">{copy.ctaBody}</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href={trialCheckoutUrl} target="_blank" rel="noopener noreferrer">
                                <Button size="lg" className="bg-white dark:bg-gray-900 text-[#FF3131] hover:bg-gray-100 dark:hover:bg-gray-700 font-bold shadow-xl">
                                    <Shield className="w-5 h-5 mr-2" />
                                    {trialCtaLabel}
                                </Button>
                            </a>
                            <Link href={localizePath('/products', locale)}>
                                <Button size="lg" variant="outline" className="border-white dark:border-gray-600 text-gray-900 dark:text-gray-50 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 transition-colors">
                                    {copy.ctaSecondary}
                                </Button>
                            </Link>
                        </div>
                        <p className="text-sm mt-4 opacity-75">{copy.ctaFootnote}</p>
                    </div>
                </Container>
            </section>

            <section className="py-16 bg-white dark:bg-gray-800/50">
                <Container>
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6">{copy.faqTitle}</h2>
                        <div className="space-y-3">
                            {copy.faqs.map((item) => (
                                <div key={item.question} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                    <details className="group">
                                        <summary className="w-full px-4 py-4 flex items-center justify-between text-left bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 cursor-pointer list-none">
                                            <span className="font-medium text-gray-900 dark:text-gray-100 pr-4">{item.question}</span>
                                            <ChevronRight className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0 transition-transform duration-200 group-open:rotate-90" />
                                        </summary>
                                        <div className="px-4 pb-4 pt-0 text-gray-700 dark:text-gray-300 border-t border-gray-100 dark:border-gray-800">
                                            <div className="pt-3">{item.answer}</div>
                                        </div>
                                    </details>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            <section className="py-16">
                <Container>
                    <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-gray-100 mb-6">{copy.relatedTitle}</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {copy.related.map((item) => (
                            <Link key={item.href} href={localizePath(item.href, locale)} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700 group">
                                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-[#FF3131] dark:group-hover:text-[#FF5050] transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                            </Link>
                        ))}
                    </div>
                </Container>
            </section>
        </main>
    );
}
