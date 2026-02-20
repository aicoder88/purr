"use client";

import { Container } from "@/components/ui/container";
import { useTranslations } from "next-intl";
import { IconMoneyBack } from "@/components/icons/custom-trust-icons";

export function MadeInCanada() {
  const t = useTranslations('madeInCanada');

  const items = [
    {
      icon: "🌊",
      title: t('carbon.title'),
      description: t('carbon.description'),
    },
    {
      icon: "🚫",
      title: t('noPerfumes.title'),
      description: t('noPerfumes.description'),
    },
    {
      icon: "🐾",
      title: t('loved.title'),
      description: t('loved.description'),
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white dark:bg-gray-900">
      <Container>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-50 dark:bg-red-900/20 rounded-full mb-6 border border-red-200 dark:border-red-800">
            <span className="text-red-700 dark:text-red-400 font-bold text-lg">{t('badge')}</span>
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            {t('headline')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {items.map((item, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Guarantee strip */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-50 dark:bg-green-900/20 rounded-full border border-green-200 dark:border-green-800">
            <IconMoneyBack className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="text-green-800 dark:text-green-300 font-semibold">
              {t('guarantee')}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
