"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HeroVideo } from "@/components/sections/hero/HeroVideo";
import { getPaymentLink } from "@/lib/payment-links";
import { useTranslation } from "@/lib/translation-context";

export function HomepagePackagingMockupHero() {
  const { t, locale } = useTranslation();
  const localePrefix = locale === "fr" ? "/fr" : "";
  const trialLink = getPaymentLink("trialSingle") || `${localePrefix}/products/trial-size`;
  const primaryLine = t.hero.simplified?.noMore || t.hero.headline || t.hero.eliminateCatOdors;
  const highlightedLine = t.hero.simplified?.litterBoxSmell || t.hero.headline || t.hero.eliminateCatOdors;
  const supportingCopy = t.hero.simplified?.valueProposition || t.hero.subheadline || t.hero.description;
  const longLastingFeature = t.features.longLasting;
  const anyLitterFeature = t.features.anyLitter;
  const topBadges = [
    t.hero.simplified?.thirtyDayGuarantee || t.hero.socialProof.ratingText,
    t.madeInCanada.badge,
  ].filter((badge): badge is string => Boolean(badge));
  const proofItems = [
    {
      icon: Zap,
      title: t.features.odorElimination.title,
      description: t.features.odorElimination.description,
      iconClassName: "bg-[#ff38b8] text-gray-900 dark:bg-[#ff38b8] dark:text-gray-900",
    },
    {
      icon: Sparkles,
      title: longLastingFeature.title,
      description: longLastingFeature.description,
      iconClassName: "bg-[#ffe347] text-gray-900 dark:bg-[#ffe347] dark:text-gray-900",
    },
    {
      icon: ShieldCheck,
      title: anyLitterFeature.title,
      description: anyLitterFeature.description,
      iconClassName: "bg-[#171c28] text-gray-50 dark:bg-[#eef2ff] dark:text-gray-900",
    },
  ];

  return (
    <section className="relative overflow-hidden border-b border-[#ebe8f2] py-16 md:py-20 dark:border-[#2a3140]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#fffafc_0%,#fff8ff_44%,#fffdfb_100%)] dark:bg-[radial-gradient(circle_at_top_left,#171220_0%,#111827_56%,#0b1220_100%)]" />
        <div className="absolute left-[-6rem] top-[-4rem] h-72 w-72 rounded-full bg-[#ff38b8]/16 blur-3xl dark:bg-[#ff38b8]/18" />
        <div className="absolute right-[-5rem] top-16 h-64 w-64 rounded-full bg-[#ffe347]/20 blur-3xl dark:bg-[#ffe347]/12" />
        <div className="absolute bottom-[-8rem] left-[30%] h-72 w-72 rounded-full bg-[#f4f6fb] blur-3xl dark:bg-[#1d2532]/70" />
      </div>

      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <div className="mb-5 flex flex-wrap gap-2">
              {topBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-[#f2d5ea] bg-white/88 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#596072] dark:border-[#333b4a] dark:bg-[#151c28]/75 dark:text-[#d6ddec]"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="space-y-4">
              <p className="max-w-xl text-balance font-heading text-5xl font-semibold leading-[0.96] tracking-[-0.05em] text-[#171c28] sm:text-6xl lg:text-7xl dark:text-[#f6f7fb]">
                {primaryLine}
              </p>
              <div className="inline-flex rounded-[1.5rem] border border-[#ffd4ee] bg-[linear-gradient(135deg,#fff6fc_0%,#fff3fb_100%)] px-5 py-3 shadow-[0_20px_60px_rgba(255,56,184,0.08)] dark:border-[#4a2d4d] dark:bg-[linear-gradient(135deg,#201525_0%,#181c2a_100%)]">
                <span className="font-heading text-4xl font-semibold leading-none tracking-[-0.05em] text-[#ff38b8] sm:text-5xl dark:text-[#ff38b8]">
                  {highlightedLine}
                </span>
              </div>
              <p className="max-w-xl text-lg leading-8 text-[#5c6273] dark:text-[#bcc3cf]">
                {supportingCopy}
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                className="min-h-[58px] rounded-full border border-[#ff38b8] bg-[#ff38b8] px-8 text-base font-semibold text-gray-900 shadow-[0_20px_50px_rgba(255,56,184,0.18)] hover:bg-[#ff55c4] dark:border-[#ff38b8] dark:bg-[#ff38b8] dark:text-gray-900 dark:hover:bg-[#ff55c4]"
              >
                <a href={trialLink}>
                  {t.hero.buttons.tryFree || t.hero.buttons.shopNow}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="min-h-[58px] rounded-full border border-[#ffe347] bg-white/80 px-8 text-base font-semibold text-[#171c28] hover:bg-[#fffde9] dark:border-[#ffe347] dark:bg-[#151c28]/65 dark:text-[#f6f7fb] dark:hover:bg-[#1b2432]"
              >
                <Link href="#how-it-works">
                  {t.hero.buttons.learnMore}
                </Link>
              </Button>
            </div>

            <p className="mt-4 text-sm font-medium text-[#687082] dark:text-[#98a2b3]">
              {t.hero.simplified?.justPayShipping || t.hero.socialProof.trustText}
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {proofItems.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="rounded-[1.75rem] border border-[#ebe8f2] bg-white/80 p-5 shadow-[0_18px_45px_rgba(23,28,40,0.05)] backdrop-blur dark:border-[#333b4a] dark:bg-[#151c28]/72"
                  >
                    <div className={`mb-4 inline-flex rounded-2xl p-3 ${item.iconClassName}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-lg font-semibold tracking-tight text-[#171c28] dark:text-[#f6f7fb]">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-[#606779] dark:text-[#a7afbc]">
                      {item.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-[2rem] border border-[#ebe8f2] bg-[linear-gradient(180deg,rgba(255,255,255,0.86),rgba(247,249,253,0.96))] p-4 shadow-[0_28px_90px_rgba(23,28,40,0.08)] backdrop-blur-md dark:border-[#333b4a] dark:bg-[linear-gradient(180deg,rgba(21,28,40,0.82),rgba(14,20,31,0.96))] dark:shadow-[0_28px_90px_rgba(0,0,0,0.3)]">
              <HeroVideo
                playLabel={t.hero.ariaLabels.playVideo}
                posterAlt={t.hero.ariaLabels.playVideo}
              />
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#f2d9ea] bg-[#fff8fd] px-4 py-3 dark:border-[#2f3745] dark:bg-[#111827]/72">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ff38b8] dark:text-[#ff38b8]">
                    {t.hero.simplified?.soldThisWeek || t.hero.socialProof.ratingText}
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#171c28] dark:text-[#d8e0ed]">
                    {t.hero.socialProof.trustText}
                  </p>
                </div>
                <div className="rounded-2xl border border-[#fff1b0] bg-[#fffdf0] px-4 py-3 dark:border-[#2f3745] dark:bg-[#111827]/72">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#caa500] dark:text-[#ffe347]">
                    {t.hero.simplified?.limitedStock || t.hero.simplified?.freeShippingOver}
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#171c28] dark:text-[#d8e0ed]">
                    {t.hero.simplified?.moneyBackGuarantee || t.hero.socialProof.trustText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function HomepagePackagingMockupBar() {
  const { t } = useTranslation();

  const chips = [
    {
      line1: t.announcementBar.freeShipping.line1,
      line2: t.announcementBar.freeShipping.line2,
      icon: Star,
      iconClassName: "bg-[#ffe347] text-gray-900 dark:bg-[#ffe347] dark:text-gray-900",
    },
    {
      line1: t.announcementBar.naturalCarbon.line1,
      line2: t.announcementBar.naturalCarbon.line2,
      icon: Sparkles,
      iconClassName: "bg-[#ff38b8] text-gray-900 dark:bg-[#ff38b8] dark:text-gray-900",
    },
    {
      line1: t.announcementBar.moneyBack.line1,
      line2: t.announcementBar.moneyBack.line2,
      icon: ShieldCheck,
      iconClassName: "bg-[#171c28] text-gray-50 dark:bg-[#eef2ff] dark:text-gray-900",
    },
  ];

  return (
    <section className="py-6 md:py-8">
      <Container className="relative z-10">
        <div className="grid gap-4 rounded-[2rem] border border-[#ebe8f2] bg-white/80 p-4 shadow-[0_18px_50px_rgba(23,28,40,0.05)] md:grid-cols-3 dark:border-[#2f3745] dark:bg-[#131a26]/78">
          {chips.map((chip) => {
            const Icon = chip.icon;

            return (
              <article
                key={chip.line1}
                className="rounded-[1.5rem] border border-[#f0edf6] bg-[#fcfcff] p-4 dark:border-[#2f3745] dark:bg-[#0f1623]"
              >
                <div className="flex items-start gap-3">
                  <div className={`rounded-2xl p-3 ${chip.iconClassName}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#171c28] dark:text-[#f4f7ff]">
                      {chip.line1}
                    </p>
                    <p className="mt-1 text-sm text-[#61697a] dark:text-[#a0a9b6]">
                      {chip.line2}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export function HomepagePackagingMockupCTA() {
  const { t, locale } = useTranslation();
  const localePrefix = locale === "fr" ? "/fr" : "";
  const paymentLink = getPaymentLink("trialSingle") || `${localePrefix}/products/trial-size`;
  const ctaTitle = t.cta?.title || t.hero.headline || t.hero.eliminateCatOdors;
  const ctaSubtitle = t.cta?.subtitle || t.hero.description;
  const ctaButtonText = t.cta?.buttonText || t.hero.buttons.shopNow;
  const ctaJoinText = t.cta?.joinText || t.hero.socialProof.trustText;
  const ctaGuarantee = t.cta?.guarantee || t.hero.simplified?.moneyBackGuarantee || t.hero.socialProof.ratingText;
  const powerLevels = t.productsSection?.powerLevels;
  const productTiles = [
    {
      label: t.hero.simplified?.trialSize || powerLevels?.kittenPower || t.hero.buttons.tryFree || t.hero.buttons.shopNow,
      image: "/optimized/products/17g-transparent-v2.webp",
      cardClassName:
        "border-[#ebe8f2] bg-[#fcfcff] dark:border-[#2f3745] dark:bg-[#111827]",
    },
    {
      label: t.hero.simplified?.standard || powerLevels?.standardPower || t.hero.socialProof.trustText,
      image: "/optimized/products/60g-transparent.avif",
      cardClassName:
        "border-[#ffd4ee] bg-[linear-gradient(180deg,#fff7fd_0%,#fdf7ff_100%)] shadow-[0_20px_50px_rgba(255,56,184,0.1)] dark:border-[#5d3850] dark:bg-[linear-gradient(180deg,#1d1620_0%,#151b28_100%)]",
    },
    {
      label: t.hero.simplified?.familyPack || powerLevels?.maximumPower || t.hero.simplified?.moneyBackGuarantee || t.hero.socialProof.ratingText,
      image: "/optimized/products/140g-transparent.webp",
      cardClassName:
        "border-[#ebe8f2] bg-[#fcfcff] dark:border-[#2f3745] dark:bg-[#111827]",
    },
  ];

  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#fff9fd_0%,#fcfcff_42%,#fffdf8_100%)] dark:bg-[linear-gradient(180deg,#101623_0%,#111827_42%,#18131d_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-20 dark:opacity-12" style={{ backgroundImage: "radial-gradient(circle at 15% 20%, rgba(255,56,184,0.15), transparent 26%), radial-gradient(circle at 82% 24%, rgba(255,227,71,0.18), transparent 28%)" }} />

      <Container className="relative z-10">
        <div className="grid items-center gap-10 rounded-[2rem] border border-[#ebe8f2] bg-white/80 p-8 shadow-[0_28px_90px_rgba(23,28,40,0.07)] backdrop-blur md:p-10 lg:grid-cols-[1.05fr_0.95fr] dark:border-[#2f3745] dark:bg-[#131a26]/78 dark:shadow-[0_28px_90px_rgba(0,0,0,0.3)]">
          <div className="max-w-2xl">
            <div className="inline-flex rounded-full border border-[#ffd4ee] bg-[linear-gradient(135deg,#fff6fd_0%,#fff0fb_100%)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ff38b8] dark:border-[#4a2d4d] dark:bg-[linear-gradient(135deg,#1d1620_0%,#212838_100%)] dark:text-[#ff38b8]">
              {ctaGuarantee}
            </div>
            <h2 className="mt-5 font-heading text-4xl font-semibold tracking-[-0.05em] text-[#171c28] md:text-5xl dark:text-[#f6f7fb]">
              {ctaTitle}
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-[#5d6476] dark:text-[#b8c0cc]">
              {ctaSubtitle}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                asChild
                className="min-h-[58px] rounded-full border border-[#ffe347] bg-[#ffe347] px-8 text-base font-semibold text-gray-900 shadow-[0_20px_50px_rgba(255,227,71,0.18)] hover:bg-[#ffea6d] dark:border-[#ffe347] dark:bg-[#ffe347] dark:text-gray-900 dark:hover:bg-[#ffea6d]"
              >
                <a href={paymentLink}>
                  {ctaButtonText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <p className="text-sm font-medium text-[#687082] dark:text-[#98a2b3]">
                {ctaJoinText}
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {productTiles.map((product, index) => (
              <div
                key={product.label}
                className={`flex flex-col items-center rounded-[1.75rem] border p-4 shadow-[0_16px_40px_rgba(31,36,48,0.05)] ${product.cardClassName} ${index === 1 ? "sm:-translate-y-3" : ""}`}
              >
                <div className="mb-3 rounded-full border border-[#ece8f4] bg-white/74 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#667084] dark:border-[#3a4352] dark:bg-[#141c28] dark:text-[#d8dff0]">
                  {product.label}
                </div>
                <div className="relative h-48 w-full">
                  <Image
                    src={product.image}
                    alt={product.label}
                    fill
                    sizes="180px"
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
