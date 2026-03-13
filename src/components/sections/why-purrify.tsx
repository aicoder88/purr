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
import Link from "next/link";
import type { ComponentType } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { getLearnPagePreviewImage } from "@/lib/learn/page-preview-images";

type CardConfig = {
  icon: ComponentType<{ className?: string }>;
  image: string;
  href: string;
  titleKeys: string[];
  descriptionKeys: string[];
};

const CARD_CONFIG: CardConfig[] = [
  {
    icon: IconOdor,
    image: "/optimized/marketing/catcoco-640w.webp",
    href: "/learn/how-activated-carbon-works",
    titleKeys: ["features.odorElimination.title"],
    descriptionKeys: ["features.odorElimination.description"],
  },
  {
    icon: IconCatFriendly,
    image: "/optimized/marketing/cats-and-filters-640w.webp",
    href: "/learn/science",
    titleKeys: ["features.catFriendly.title"],
    descriptionKeys: ["features.catFriendly.description"],
  },
  {
    icon: IconLongLasting,
    image: "/optimized/marketing/catonbed-640w.webp",
    href: "/learn/how-it-works",
    titleKeys: ["features.longLasting.title", "features.longLastingFreshness.title"],
    descriptionKeys: ["features.longLasting.description", "features.longLastingFreshness.description"],
  },
  {
    icon: IconAnyLitter,
    image: "/optimized/blog/cat-favorite-litter-640w.webp",
    href: "/products",
    titleKeys: ["features.anyLitter.title", "features.worksWithAnyLitter.title"],
    descriptionKeys: ["features.anyLitter.description", "features.worksWithAnyLitter.description"],
  },
  {
    icon: IconCostEffective,
    image: "/optimized/marketing/cost-effective.webp",
    href: "/products/trial-size",
    titleKeys: ["features.costEffective.title"],
    descriptionKeys: ["features.costEffective.description"],
  },
  {
    icon: IconBeforeAfter,
    image: "/optimized/marketing/before-after-640w.webp",
    href: "/reviews",
    titleKeys: ["features.beforeAfter.title"],
    descriptionKeys: ["features.beforeAfter.description"],
  },
];

export async function WhyPurrify() {
  const t = await getTranslations();
  const locale = await getLocale();
  const localePrefix = locale === "fr" ? "/fr" : "";

  const read = (keys: string[]): string => {
    for (const key of keys) {
      if (t.has(key as never)) {
        const value = t(key as never);
        if (value && typeof value === "string" && value.trim().length > 0) {
          return value;
        }
      }
    }
    return "";
  };

  const cards = CARD_CONFIG.map((card) => {
    const preview = getLearnPagePreviewImage(card.href);

    return {
      preview,
      icon: card.icon,
      image: preview?.image || card.image,
      href: `${localePrefix}${card.href}`,
      title: read(card.titleKeys),
      description: read(card.descriptionKeys),
    };
  }).filter((card) => card.title && card.description);

  return (
    <section id="why-purrify" className="py-14 md:py-16 bg-gray-50 dark:bg-gray-900">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center rounded-full border border-brand-pink/30 bg-gradient-to-r from-brand-yellow/25 via-brand-pink/25 to-brand-pink/25 px-4 py-1.5 mb-4">
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{t("whyPurrify.badge")}</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {t("whyPurrify.title")}
          </h2>
          {t.has("whyPurrify.subtitle") ? (
            <p className="mt-3 text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {t("whyPurrify.subtitle")}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                href={card.href}
                className="group block h-full overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-900 dark:hover:shadow-black/20 dark:focus-visible:ring-gray-500"
              >
                <article className="h-full">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.preview?.alt || card.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <div className="mb-2 flex items-center gap-2">
                      <Icon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{card.title}</h3>
                    </div>
                    <p className="text-sm md:text-base leading-relaxed text-gray-600 dark:text-gray-400">
                      {card.description}
                    </p>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
