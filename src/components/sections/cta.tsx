'use client';

import React from 'react';
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { GRADIENTS } from "@/lib/theme-utils";
import { getPaymentLink } from "@/lib/payment-links";
import { ArrowRight } from "lucide-react";
import { IconMoneyBack, IconCanadaMade } from "@/components/icons/custom-trust-icons";

interface DecorativeElementProps {
  className: string;
  style?: React.CSSProperties;
}

const DecorativeElement = ({ className, style }: DecorativeElementProps) => (
  <div className={`bg-gray-300 dark:bg-gray-800 rounded-full opacity-10 dark:opacity-10 ${className}`} style={style} />
);

const CustomerAvatar = ({ src, alt }: { src: string; alt: string }) => (
  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
    <Image
      src={src}
      alt={alt}
      width={40}
      height={40}
      sizes="40px"
      className="w-full h-full object-cover"
    />
  </div>
);

const customerAvatars = [
  '/optimized/marketing/cat-rose-thumbnail.webp',
  '/optimized/blog/multi-cat-household.webp',
  '/optimized/blog/deodorizers-with-kittens.webp'
];

export const CTA = React.memo(function CTA() {
  const t = useTranslations();
  const paymentLink = getPaymentLink('trialSingle') || '/products';

  return (
    <section className={`py-12 relative overflow-hidden ${GRADIENTS.background.cta} opacity-90 dark:opacity-95 transition-colors duration-300`}>
      {/* Background overlay */}
      <div className={`absolute inset-0 ${GRADIENTS.background.cta} opacity-90`} />

      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <DecorativeElement className="absolute top-10 left-10 w-40 h-40" />
        <DecorativeElement className="absolute bottom-10 right-10 w-60 h-60" />
        <DecorativeElement className="absolute top-1/2 left-1/4 w-20 h-20 animate-pulse" />
        <DecorativeElement
          className="absolute bottom-1/3 right-1/3 w-32 h-32 animate-pulse"
          style={{ animationDuration: "3s" }}
        />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 backdrop-blur-sm bg-white dark:bg-gray-800/10 dark:bg-gray-900/30 rounded-3xl p-10 border border-gray-200 dark:border-gray-700 shadow-2xl relative overflow-hidden">

          {/* Background image */}
          <Image
            src="/optimized/marketing/pet-safety-home.webp"
            alt={t('homepage.altText.happyCatAlt') || "Happy cat"}
            width={800}
            height={800}
            sizes="(max-width: 768px) 50vw, 33vw"
            className="absolute top-0 right-0 w-1/3 h-full object-cover opacity-20 rounded-r-3xl"
          />

          {/* Content section */}
          <div className="text-gray-900 dark:text-gray-100 max-w-2xl bg-gray-50 dark:bg-gray-900 px-6 py-8 rounded-xl">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 leading-tight text-gray-900 dark:text-gray-100">
              {t('cta.title')}
            </h2>

            <p className="text-gray-700 dark:text-gray-100/90 text-lg">
              {t('cta.subtitle')}
            </p>

            {/* Social proof */}
            <div className="mt-8 flex items-center space-x-4">
              <div className="flex -space-x-4">
                {customerAvatars.map((src, index) => (
                  <CustomerAvatar
                    key={index}
                    src={src}
                    alt={t('homepage.altText.userAvatar') || "User"}
                  />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-100/90 text-sm font-medium">
                {t('cta.joinText')}
              </p>
            </div>
          </div>

          {/* CTA Button section */}
          <div className="flex flex-col gap-4 min-w-[200px]">
            <Link
              href={paymentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Button
                size="lg"
                className="w-full md:w-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-bold py-7 px-10 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-orange-500/30 hover:-translate-y-1 active:translate-y-0 active:scale-95 transition-all duration-200 text-lg cursor-pointer relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t('cta.buttonText') || "Get My Free Trial"}
                  <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
                {/* Shine effect on hover */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </Button>
            </Link>

            <div className="flex items-center justify-center gap-4 mt-3">
              <div className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
                <IconMoneyBack className="w-5 h-5 drop-shadow-sm" />
                <span className="text-gray-600 dark:text-gray-100/90 text-xs font-medium">
                  {t('cta.moneyBackGuarantee') || "30-Day Guarantee"}
                </span>
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
              <div className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
                <IconCanadaMade className="w-5 h-5 drop-shadow-sm" />
                <span className="text-gray-600 dark:text-gray-100/90 text-xs font-medium">
                  {t('cta.madeInCanada') || "Made in Canada"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
});
