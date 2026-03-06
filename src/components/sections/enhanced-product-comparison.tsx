'use client';

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useCurrency } from "@/lib/currency-context";
import { useEffect, useState } from "react";
import { CheckCircle2, ChevronRight, MapPin, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { formatProductPrice } from "@/lib/pricing";
import { getOrCreateFreshnessSessionId } from "@/lib/freshness-session";
import { getPaymentLink } from "@/lib/payment-links";

type LocalizedProduct = {
  id: string;
  name: string;
  subtitle: string;
  duration: string;
  cats: string;
  features: string[];
  bestFor: string;
  cta: string;
};

type ProductCard = {
  id: string;
  name: string;
  subtitle: string;
  duration: string;
  idealFor: string;
  features: string[];
  bestFor: string;
  ctaLabel: string;
  image: string;
  imageSize: "sm" | "md" | "lg";
  badgeLabel: string;
  ctaType: "stripe" | "store";
  stripeLink: string | null;
};

type FreshnessProfileSummary = {
  recommendedProductId: string | null;
  recommendationReason: string | null;
  source: 'QUIZ' | 'CHAT';
};

type TopReview = {
  authorName: string;
  rating: number;
  content: string;
};

// Map card IDs to the primary product IDs stored in the review DB
const REVIEW_PRODUCT_ID_BY_CARD: Record<string, string> = {
  trial: 'purrify-12g',
  regular: 'purrify-50g',
  large: 'purrify-120g',
};

const IMAGE_BY_ID: Record<string, { image: string; imageSize: "sm" | "md" | "lg"; ctaType: "stripe" | "store" }> = {
  trial: { image: "/optimized/products/17g-transparent-v2.webp", imageSize: "sm", ctaType: "stripe" },
  regular: { image: "/optimized/products/60g-transparent.webp", imageSize: "md", ctaType: "store" },
  large: { image: "/optimized/products/140g-transparent.webp", imageSize: "lg", ctaType: "store" },
};

const CARD_TONE_BY_ID: Record<string, { badge: string; glow: string; dot: string; storeButton: string }> = {
  trial: {
    badge: "border border-brand-pink/30 bg-gradient-to-r from-brand-yellow/25 via-brand-pink/25 to-brand-pink/25 text-gray-900 dark:text-gray-100",
    glow: "before:bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.16),transparent_58%)]",
    dot: "text-emerald-500 dark:text-emerald-300",
    storeButton:
      "bg-gradient-to-r from-brand-yellow via-brand-pink to-brand-pink hover:from-brand-yellow/90 hover:via-brand-pink/90 hover:to-brand-pink/90 text-gray-950 border-0",
  },
  regular: {
    badge: "border border-brand-pink/30 bg-gradient-to-r from-brand-yellow/25 via-brand-pink/25 to-brand-pink/25 text-gray-900 dark:text-gray-100",
    glow: "before:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_58%)]",
    dot: "text-blue-500 dark:text-blue-300",
    storeButton:
      "bg-gradient-to-r from-brand-yellow via-brand-pink to-brand-pink hover:from-brand-yellow/90 hover:via-brand-pink/90 hover:to-brand-pink/90 text-gray-950 border-0",
  },
  large: {
    badge: "border border-brand-pink/30 bg-gradient-to-r from-brand-yellow/25 via-brand-pink/25 to-brand-pink/25 text-gray-900 dark:text-gray-100",
    glow: "before:bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.16),transparent_58%)]",
    dot: "text-amber-500 dark:text-amber-300",
    storeButton:
      "bg-gradient-to-r from-brand-yellow via-brand-pink to-brand-pink hover:from-brand-yellow/90 hover:via-brand-pink/90 hover:to-brand-pink/90 text-gray-950 border-0",
  },
};

function mapRecommendedProductIdToCardId(productId: string | null | undefined): string | null {
  if (!productId) {
    return null;
  }

  if (productId === 'purrify-12g') {
    return 'trial';
  }

  if (
    productId === 'purrify-50g' ||
    productId === 'purrify-50g-autoship' ||
    productId === 'purrify-120g' ||
    productId === 'purrify-120g-autoship'
  ) {
    return 'regular';
  }

  if (productId === 'purrify-240g' || productId === 'purrify-240g-autoship') {
    return 'large';
  }

  return null;
}

export function EnhancedProductComparison() {
  const t = useTranslations();
  const locale = useLocale();
  const { currency } = useCurrency();
  const [freshnessProfile, setFreshnessProfile] = useState<FreshnessProfileSummary | null>(null);

  const trialPrice = formatProductPrice("trial", currency, locale);
  const trialLink = getPaymentLink("trialSingle");
  const [topReviews, setTopReviews] = useState<Record<string, TopReview>>({});

  useEffect(() => {
    const cardIds = Object.keys(REVIEW_PRODUCT_ID_BY_CARD);
    Promise.all(
      cardIds.map(async (cardId) => {
        const productId = REVIEW_PRODUCT_ID_BY_CARD[cardId];
        try {
          const res = await fetch(
            `/api/reviews?productId=${encodeURIComponent(productId)}&sort=helpful&limit=1`,
            { cache: 'no-store' }
          );
          if (!res.ok) return null;
          const data = (await res.json()) as { reviews?: Array<{ authorName: string; rating: number; content: string }> };
          const review = data.reviews?.[0];
          if (!review) return null;
          return { cardId, review: { authorName: review.authorName, rating: review.rating, content: review.content } };
        } catch {
          return null;
        }
      })
    ).then((results) => {
      const map: Record<string, TopReview> = {};
      for (const r of results) {
        if (r) map[r.cardId] = r.review;
      }
      setTopReviews(map);
    });
  }, []);

  useEffect(() => {
    let isCancelled = false;

    async function loadFreshnessProfile() {
      try {
        const sessionId = getOrCreateFreshnessSessionId();
        const response = await fetch(`/api/freshness-profile?sessionId=${encodeURIComponent(sessionId)}`, {
          cache: 'no-store',
        });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as { profile?: FreshnessProfileSummary | null };
        if (!isCancelled) {
          setFreshnessProfile(data.profile ?? null);
        }
      } catch {
        if (!isCancelled) {
          setFreshnessProfile(null);
        }
      }
    }

    void loadFreshnessProfile();

    return () => {
      isCancelled = true;
    };
  }, []);

  const rawProducts = t.raw("productComparison.products");
  const localizedProducts: LocalizedProduct[] = Array.isArray(rawProducts)
    ? rawProducts.filter(
        (product): product is LocalizedProduct =>
          typeof product === "object" &&
          product !== null &&
          "id" in product &&
          "name" in product &&
          "subtitle" in product &&
          "duration" in product &&
          "cats" in product &&
          "features" in product &&
          "bestFor" in product &&
          "cta" in product &&
          typeof (product as { id?: unknown }).id === "string" &&
          typeof (product as { name?: unknown }).name === "string" &&
          typeof (product as { subtitle?: unknown }).subtitle === "string" &&
          typeof (product as { duration?: unknown }).duration === "string" &&
          typeof (product as { cats?: unknown }).cats === "string" &&
          Array.isArray((product as { features?: unknown }).features) &&
          typeof (product as { bestFor?: unknown }).bestFor === "string" &&
          typeof (product as { cta?: unknown }).cta === "string"
      )
    : [];

  const products = localizedProducts.reduce<ProductCard[]>((acc, product) => {
      const imageMeta = IMAGE_BY_ID[product.id];
      if (!imageMeta) {
        return acc;
      }

      const badgeLabel =
        product.id === "trial"
          ? t("enhancedProductComparison.trial")
          : product.id === "regular"
            ? t("enhancedProductComparison.mostPopular")
            : t("enhancedProductComparison.bestValue");

      acc.push({
        id: product.id,
        name: product.name,
        subtitle: product.subtitle,
        duration: product.duration,
        idealFor: product.cats,
        features: product.features,
        bestFor: product.bestFor,
        ctaLabel: product.cta,
        image: imageMeta.image,
        imageSize: imageMeta.imageSize,
        ctaType: imageMeta.ctaType,
        stripeLink: imageMeta.ctaType === "stripe" ? trialLink : null,
        badgeLabel,
      });

      return acc;
    }, []);
  const recommendedCardId = mapRecommendedProductIdToCardId(freshnessProfile?.recommendedProductId);
  const recommendedProduct = products.find((product) => product.id === recommendedCardId) ?? null;

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_40%,#f8fafc_100%)] py-14 md:py-16 dark:bg-[linear-gradient(180deg,#020617_0%,#0f172a_45%,#020617_100%)]">
      <Container>
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {t("productComparison.title")}
          </h2>
          <p className="mt-3 text-base md:text-lg text-gray-600 dark:text-gray-300">
            {t("productComparison.subtitle")}
          </p>
        </div>

        {recommendedProduct ? (
          <div className="mx-auto mb-8 max-w-4xl rounded-[2rem] border border-emerald-200 bg-emerald-50/80 p-5 shadow-sm dark:border-emerald-900 dark:bg-emerald-950/30">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
              {t("productComparison.personalizedBadge")}
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {t("productComparison.personalizedTitle", { product: recommendedProduct.name })}
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {freshnessProfile?.recommendationReason || t("productComparison.personalizedDescription")}
            </p>
          </div>
        ) : null}

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 lg:grid-cols-3">
          {products.map((product) => {
            const tone = CARD_TONE_BY_ID[product.id] ?? CARD_TONE_BY_ID.regular;
            const isRecommended = product.id === recommendedCardId;

            return (
              <article
                key={product.id}
                className={[
                  "relative isolate flex h-full flex-col overflow-hidden rounded-[2rem] border border-gray-200/90 bg-white/95 shadow-[0_14px_36px_-26px_rgba(15,23,42,0.7)] backdrop-blur-sm transition-all duration-300",
                  "before:absolute before:inset-0 before:-z-10 before:content-['']",
                  "hover:-translate-y-1 hover:shadow-[0_22px_44px_-24px_rgba(15,23,42,0.8)]",
                  "dark:border-gray-700 dark:bg-gray-950/90",
                  tone.glow,
                  isRecommended ? "ring-2 ring-emerald-400 dark:ring-emerald-500" : "",
                ].join(" ")}
              >
                <div className="border-b border-gray-200/80 px-6 pb-5 pt-6 dark:border-gray-800">
                  <div className="mb-5 flex items-center">
                    <span className={["inline-flex rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.14em]", tone.badge].join(" ")}>
                      {isRecommended ? t("productComparison.recommendedForYou") : product.badgeLabel}
                    </span>
                  </div>
                  <div className="flex items-start gap-4">
                    <div
                      className={[
                        "relative shrink-0",
                        product.imageSize === "sm" ? "h-20 w-16" : "",
                        product.imageSize === "md" ? "h-24 w-20" : "",
                        product.imageSize === "lg" ? "h-28 w-24" : "",
                      ].join(" ")}
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 80px, 120px"
                        className="object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.name}</h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{product.subtitle}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
                  <div className="mb-6 grid grid-cols-2 gap-4 border-y border-gray-200/80 py-4 dark:border-gray-800">
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-gray-500 dark:text-gray-300">
                        {t("productComparison.duration")}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">{product.duration}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-gray-500 dark:text-gray-300">
                        {t("productComparison.idealFor")}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">{product.idealFor}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-gray-500 dark:text-gray-300">
                      {t("productComparison.features")}
                    </h4>
                    <ul className="space-y-2.5">
                      {product.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <CheckCircle2 className={["mt-0.5 h-4 w-4 shrink-0", tone.dot].join(" ")} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6 rounded-2xl border border-gray-200 bg-gray-50/80 p-4 dark:border-gray-700 dark:bg-gray-900">
                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      <span className="font-semibold text-gray-900 dark:text-white">{t("productComparison.idealFor")}:</span>{" "}
                      {product.bestFor}
                    </p>
                  </div>

                  {topReviews[product.id] && (
                    <div className="mb-5 rounded-2xl border border-gray-200/60 bg-white/60 p-4 dark:border-gray-700/60 dark:bg-gray-900/60">
                      <div className="flex items-center gap-1 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            className={["w-3.5 h-3.5", i < topReviews[product.id].rating ? "text-brand-yellow" : "text-gray-600"].join(" ")}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                        {'\u201c'}{topReviews[product.id].content}{'\u201d'}
                      </p>
                      <p className="mt-1.5 text-xs font-medium text-gray-400">
                        — {topReviews[product.id].authorName}
                      </p>
                    </div>
                  )}

                  <div className="mt-auto">
                    {product.ctaType === "stripe" && product.stripeLink ? (
                      <div className="space-y-2">
                        <a href={product.stripeLink} className="block">
                          <Button className="h-11 w-full rounded-full bg-gradient-to-r from-brand-yellow via-brand-pink to-brand-pink hover:from-brand-yellow/90 hover:via-brand-pink/90 hover:to-brand-pink/90 text-gray-950 border-0">
                            {product.ctaLabel}
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </a>
                        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                          {t("hero.simplified.justPayShipping")} ({trialPrice})
                        </p>
                      </div>
                    ) : (
                      <Link href={`${locale === "fr" ? "/fr" : ""}/stores`} className="block">
                        <Button className={["h-11 w-full rounded-full", tone.storeButton].join(" ")}>
                          <MapPin className="w-4 h-4 mr-1" />
                          {product.ctaLabel}
                        </Button>
                      </Link>
                    )}
                    <div className="mt-3 flex items-center justify-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="text-xs text-gray-400">
                        {t("enhancedProductComparison.guarantee30Day")}
                      </span>
                      <span className="text-gray-600 text-xs">·</span>
                      <Link
                        href={`${locale === "fr" ? "/fr" : ""}/support/shipping/`}
                        className="text-xs text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline underline-offset-2"
                      >
                        {t("enhancedProductComparison.shippingAndReturns")}
                      </Link>
                    </div>
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
