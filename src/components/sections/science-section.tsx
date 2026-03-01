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
  <IconSciencePores key="science" className="w-5 h-5 text-gray-700 text-gray-300" />,
  <IconZeroPerfumes key="zero" className="w-5 h-5 text-gray-700 text-gray-300" />,
  <IconOdor key="odor" className="w-5 h-5 text-gray-700 text-gray-300" />,
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
    <section id="science" className="py-14 md:py-16 bg-white bg-gray-950">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 border-gray-700 bg-gray-50 bg-gray-900 px-4 py-1.5 mb-4">
              <IconSciencePores className="w-4 h-4 text-gray-700 text-gray-300" />
              <span className="text-sm font-medium text-gray-700 text-gray-300">{t("scienceSection.badge")}</span>
            </div>

            <h2 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 text-white leading-tight">
              {t("scienceSection.headline")}{" "}
              <span className="text-gray-700 text-gray-300">{t("scienceSection.headlineHighlight")}</span>
            </h2>

            <p className="mt-4 text-base md:text-lg leading-relaxed text-gray-600 text-gray-400">
              {t("scienceSection.description")}
            </p>

            <div className="mt-6 space-y-4">
              {features.map((feature, index) => (
                <div key={feature.title} className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full border border-gray-200 border-gray-700 bg-white bg-gray-900 p-2">
                    {featureIcons[index] || featureIcons[0]}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-white">{feature.title}</h3>
                    <p className="text-sm md:text-base text-gray-600 text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button asChild className="rounded-full bg-gray-900 hover:bg-gray-800 text-gray-50 bg-gray-100 hover:bg-gray-200 text-gray-900">
                <Link href={`${locale === "fr" ? "/fr" : ""}/learn/science`}>
                  {t("scienceSection.learnMore")} <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Link
                href="/blog/activated-carbon-vs-baking-soda-comparison"
                className="text-sm font-medium text-gray-700 text-gray-300 hover:text-gray-900 hover:text-white underline-offset-4 hover:underline"
              >
                {t("nav.carbonVsBakingSoda")}
              </Link>
            </div>
          </div>

          <div>
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 border-gray-700 aspect-square bg-gray-100 bg-gray-900">
              <Image
                src="/optimized/blog/Carbon-sktech.webp"
                alt={t("homepage.altText.scientificDiagram")}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
              <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-gray-200 border-gray-700 bg-white/90 bg-gray-950/90 px-4 py-3 backdrop-blur-sm">
                <p className="text-sm font-semibold text-gray-900 text-white">{t("scienceSection.floatingLabel.title")}</p>
                <p className="text-xs text-gray-600 text-gray-400 mt-1">{t("scienceSection.floatingLabel.description")}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
