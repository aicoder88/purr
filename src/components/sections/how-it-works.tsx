"use client";

import Image from "next/image";
import { Container } from "@/components/ui/container";
import { useTranslations } from "next-intl";

interface Step {
  number: string;
  title: string;
  description: string;
  image: string;
}

export function HowItWorks() {
  const t = useTranslations("howItWorks");

  const steps = t.raw("steps") as Step[];

  return (
    <section id="how-it-works" className="py-14 md:py-16 bg-white dark:bg-gray-950">
      <Container>
        <div className="max-w-2xl text-center mx-auto mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {t("simpleAs123")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step) => (
            <article
              key={step.number}
              className="flex flex-col h-full"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 mb-6">
                <Image
                  src={step.image}
                  alt={`${step.title} - Step ${step.number}`}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold tracking-wider text-gray-500 dark:text-gray-400 capitalize">
                  {t("stepLabel")} {parseInt(step.number, 10)}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">{step.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-gray-600 dark:text-gray-400">{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
