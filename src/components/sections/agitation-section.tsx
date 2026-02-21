"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { useTranslations } from "next-intl";

export function AgitationSection() {
  const t = useTranslations("agitationSection");

  const paragraphs: string[] = [];
  for (let i = 0; i < 4; i += 1) {
    try {
      const copy = t(`paragraphs.${i}`);
      if (copy && !copy.startsWith("agitationSection.")) {
        paragraphs.push(copy);
      }
    } catch {
      break;
    }
  }

  const headline = t("headline");
  const badge = t("badge");
  const transition = t("transition");
  const imageCaption = t("ui.imageCaption");

  return (
    <section className="py-14 md:py-16 bg-white dark:bg-gray-950">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
              <Image
                src="/optimized/marketing/holdnose.png"
                alt={t("ui.imageAlt")}
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
              <p className="absolute bottom-0 left-0 right-0 text-sm text-gray-50 dark:text-gray-900 bg-black/45 px-4 py-3">
                {imageCaption}
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-4 py-1.5 mb-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{badge}</span>
            </div>

            <h2 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-5">
              {headline}
            </h2>

            <div className="space-y-3">
              {paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-base md:text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-5">
              <p className="text-base md:text-lg font-medium text-gray-900 dark:text-white leading-relaxed">
                {transition}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
