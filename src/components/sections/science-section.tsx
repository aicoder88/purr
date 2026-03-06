"use client";

import { Container } from "@/components/ui/container";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IconOdor } from "@/components/icons/custom-benefit-icons";
import { IconSciencePores, IconZeroPerfumes } from "@/components/icons/custom-trust-icons";

type ScienceFeature = {
  title: string;
  description: string;
};

const featureIcons = [
  <IconSciencePores key="science" className="w-5 h-5 text-gray-700 dark:text-gray-300" />,
  <IconZeroPerfumes key="zero" className="w-5 h-5 text-gray-700 dark:text-gray-300" />,
  <IconOdor key="odor" className="w-5 h-5 text-gray-700 dark:text-gray-300" />,
];

export function ScienceSection() {
  const t = useTranslations();
  const locale = useLocale();

  const rawFeatures = t.raw("scienceSection.features");
  const features: ScienceFeature[] = Array.isArray(rawFeatures)
    ? rawFeatures.filter(
      (item): item is ScienceFeature =>
        typeof item === "object" &&
        item !== null &&
        "title" in item &&
        "description" in item &&
        typeof (item as { title?: unknown }).title === "string" &&
        typeof (item as { description?: unknown }).description === "string"
    )
    : [];

  return (
    <section id="science" className="py-12 md:py-14 bg-white dark:bg-gray-950">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-pink/30 bg-gradient-to-r from-brand-yellow/25 to-brand-pink/25 px-4 py-1.5 mb-4">
              <IconSciencePores className="w-4 h-4 text-gray-800 dark:text-gray-100" />
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{t("scienceSection.badge")}</span>
            </div>

            <h2 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white leading-tight">
              {t("scienceSection.headline")}{" "}
              <span className="text-gray-700 dark:text-gray-300">{t("scienceSection.headlineHighlight")}</span>
            </h2>

            <p className="mt-4 text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              {t("scienceSection.description")}
            </p>

            <div className="mt-5">
              <a href="https://www.epa.gov/indoor-air-quality-iaq/volatile-organic-compounds-impact-indoor-air-quality" target="_blank" rel="nofollow noopener noreferrer" className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 underline decoration-gray-300 dark:decoration-gray-600 underline-offset-4 transition-colors">
                {t("scienceSection.expertInsightSource")}
              </a>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <article key={feature.title} className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-900/60 p-4">
                  <div className="mb-3 inline-flex rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 p-2">
                    {featureIcons[index] || featureIcons[0]}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">{t("scienceSection.expertInsightTitle")}</span>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {t("scienceSection.expertInsightBody")}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild className="rounded-full bg-gradient-to-r from-brand-yellow to-brand-pink hover:from-brand-yellow/90 hover:to-brand-pink/90 text-gray-950 border-0">
                <Link href={`${locale === "fr" ? "/fr" : ""}/learn/science`}>
                  {t("scienceSection.learnMore")} <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Link
                href="/blog/activated-carbon-vs-baking-soda-comparison"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white underline-offset-4 hover:underline"
              >
                {t("nav.carbonVsBakingSoda")}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 aspect-square bg-gray-100 dark:bg-gray-900">
              <Image
                src="/optimized/blog/Carbon-sktech.webp"
                alt={t("homepage.altText.scientificDiagram")}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
              <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-950/90 px-4 py-3 backdrop-blur-sm">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{t("scienceSection.floatingLabel.title")}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{t("scienceSection.floatingLabel.description")}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
