'use client';

import Link from 'next/link';
import { MapPin, Sparkles, Cat, Users } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

export function QuickDecisionSection() {
  const t = useTranslations();
  const locale = useLocale();

  const quickPicks = [
    {
      question: t('productsPage.quickDecision.trial.question') || "Skeptical? Good. Prove it to yourself.",
      answer: t('productsPage.quickDecision.trial.answer') || "The FREE Trial Bag",
      detail: t('productsPage.quickDecision.trial.detail') || "Just pay shipping. If your nose isn't convinced in 7 days, we've both learned something.",
      icon: <Sparkles className="w-6 h-6" />,
    },
    {
      question: t('productsPage.quickDecision.regular.question') || "One or two furry overlords at home?",
      answer: t('productsPage.quickDecision.regular.answer') || "The Regular Bag",
      detail: t('productsPage.quickDecision.regular.detail') || "3 months of 'wait, where's the litter box?' moments. Our most popular size for a reason.",
      icon: <Cat className="w-6 h-6" />,
    },
    {
      question: t('productsPage.quickDecision.large.question') || "Running a cat hotel? (No judgment.)",
      answer: t('productsPage.quickDecision.large.answer') || "The Large Bag",
      detail: t('productsPage.quickDecision.large.detail') || "For multi-cat homes where odor control isn't optional. Free shipping. Maximum freshness.",
      icon: <Users className="w-6 h-6" />,
    },
  ];

  return (
    <section className="py-12 bg-brand-light/30 dark:bg-gray-800/50">
      <Container>
        <div className="text-center mb-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {locale === 'fr'
              ? "Répondez à une question. Trouvez votre format."
              : "Answer One Question. Find Your Size."}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {quickPicks.map((pick, index) => (
            <Link
              key={index}
              href={`${locale === 'fr' ? '/fr' : ''}/stores`}
              className="group bg-white dark:bg-gray-700 rounded-xl p-6 hover:bg-brand-light dark:hover:bg-gray-600 transition-all hover:shadow-lg border-2 border-transparent hover:border-brand-purple"
            >
              <div className="text-brand-purple dark:text-purple-400 mb-3">
                {pick.icon}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{pick.question}</p>
              <p className="font-heading font-bold text-xl text-gray-900 dark:text-gray-100 mb-2 group-hover:text-brand-purple transition-colors">
                {pick.answer} <MapPin className="inline w-4 h-4 ml-1" />
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{pick.detail}</p>
            </Link>
          ))}
        </div>

        {/* Transition to detailed comparison */}
        <p className="text-center mt-10 text-gray-600 dark:text-gray-400">
          {locale === 'fr'
            ? "Vous voulez tous les détails? Comparez côte à côte:"
            : "Want all the details? Compare side by side:"}
        </p>
      </Container>
    </section>
  );
}
