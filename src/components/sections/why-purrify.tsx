"use client";

import { Container } from "@/components/ui/container";
import {
  IconAnyLitter,
  IconBeforeAfter,
  IconCatFriendly,
  IconCostEffective,
  IconLongLasting,
  IconOdor,
} from "@/components/icons/custom-benefit-icons";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { ComponentType } from "react";

type CardConfig = {
  icon: ComponentType<{ className?: string }>;
  image: string;
  titleKeys: string[];
  descriptionKeys: string[];
};

const CARD_CONFIG: CardConfig[] = [
  {
    icon: IconOdor,
    image: "/optimized/marketing/catcoco.webp",
    titleKeys: ["features.odorElimination.title"],
    descriptionKeys: ["features.odorElimination.description"],
  },
  {
    icon: IconCatFriendly,
    image: "/optimized/marketing/cats-and-filters.webp",
    titleKeys: ["features.catFriendly.title"],
    descriptionKeys: ["features.catFriendly.description"],
  },
  {
    icon: IconLongLasting,
    image: "/optimized/marketing/catonbed.avif",
    titleKeys: ["features.longLasting.title", "features.longLastingFreshness.title"],
    descriptionKeys: ["features.longLasting.description", "features.longLastingFreshness.description"],
  },
  {
    icon: IconAnyLitter,
    image: "/optimized/blog/cat-favorite-litter.webp",
    titleKeys: ["features.anyLitter.title", "features.worksWithAnyLitter.title"],
    descriptionKeys: ["features.anyLitter.description", "features.worksWithAnyLitter.description"],
  },
  {
    icon: IconCostEffective,
    image: "/optimized/marketing/cost-effective.webp",
    titleKeys: ["features.costEffective.title"],
    descriptionKeys: ["features.costEffective.description"],
  },
  {
    icon: IconBeforeAfter,
    image: "/optimized/marketing/before-after.webp",
    titleKeys: ["features.beforeAfter.title"],
    descriptionKeys: ["features.beforeAfter.description"],
  },
];

export function WhyPurrify() {
  const t = useTranslations();

  const read = (keys: string[]): string => {
    for (const key of keys) {
      try {
        const value = t(key as never);
        if (value && typeof value === "string" && value.trim().length > 0) {
          return value;
        }
      } catch {
        continue;
      }
    }
    return "";
  };

  const cards = CARD_CONFIG.map((card) => ({
    icon: card.icon,
    image: card.image,
    title: read(card.titleKeys),
    description: read(card.descriptionKeys),
  })).filter((card) => card.title && card.description);

  return (
    <section id="why-purrify" className="py-14 md:py-16 bg-gray-50 dark:bg-gray-900">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-1.5 mb-4">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t("whyPurrify.badge")}</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {t("whyPurrify.title")}
          </h2>
          {t("whyPurrify.subtitle") && (
            <p className="mt-3 text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {t("whyPurrify.subtitle")}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{card.title}</h3>
                  </div>
                  <p className="text-sm md:text-base leading-relaxed text-gray-600 dark:text-gray-400">
                    {card.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
