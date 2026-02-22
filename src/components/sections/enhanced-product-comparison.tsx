import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useCurrency } from "@/lib/currency-context";
import { CheckCircle2, ChevronRight, MapPin } from "lucide-react";
import Image from "next/image";
import { formatProductPrice } from "@/lib/pricing";
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

const IMAGE_BY_ID: Record<string, { image: string; imageSize: "sm" | "md" | "lg"; ctaType: "stripe" | "store" }> = {
  trial: { image: "/optimized/products/17g-transparent-v2.webp", imageSize: "sm", ctaType: "stripe" },
  regular: { image: "/optimized/products/60g-transparent.webp", imageSize: "md", ctaType: "store" },
  large: { image: "/optimized/products/140g-transparent.webp", imageSize: "lg", ctaType: "store" },
};

const CARD_TONE_BY_ID: Record<string, { badge: string; glow: string; dot: string; storeButton: string }> = {
  trial: {
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    glow: "before:bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.16),transparent_58%)]",
    dot: "text-emerald-500 dark:text-emerald-300",
    storeButton:
      "bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/40 dark:text-emerald-200 dark:border-emerald-800",
  },
  regular: {
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    glow: "before:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_58%)]",
    dot: "text-blue-500 dark:text-blue-300",
    storeButton:
      "bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-950/40 dark:hover:bg-blue-900/40 dark:text-blue-200 dark:border-blue-800",
  },
  large: {
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    glow: "before:bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.16),transparent_58%)]",
    dot: "text-amber-500 dark:text-amber-300",
    storeButton:
      "bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 dark:bg-amber-950/40 dark:hover:bg-amber-900/40 dark:text-amber-200 dark:border-amber-800",
  },
};

export function EnhancedProductComparison() {
  const t = useTranslations();
  const locale = useLocale();
  const { currency } = useCurrency();

  const trialPrice = formatProductPrice("trial", currency, locale);
  const trialLink = getPaymentLink("trialSingle");

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

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_40%,#f8fafc_100%)] py-14 md:py-16 dark:bg-[linear-gradient(180deg,#020617_0%,#0f172a_45%,#020617_100%)]">
      <Container>
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {t("productComparison.title")}
          </h2>
          <p className="mt-3 text-base md:text-lg text-gray-600 dark:text-gray-400">
            {t("productComparison.subtitle")}
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 lg:grid-cols-3">
          {products.map((product) => {
            const tone = CARD_TONE_BY_ID[product.id] ?? CARD_TONE_BY_ID.regular;

            return (
              <article
                key={product.id}
                className={[
                  "relative isolate flex h-full flex-col overflow-hidden rounded-[2rem] border border-gray-200/90 bg-white/95 shadow-[0_14px_36px_-26px_rgba(15,23,42,0.7)] backdrop-blur-sm transition-all duration-300",
                  "before:absolute before:inset-0 before:-z-10 before:content-['']",
                  "hover:-translate-y-1 hover:shadow-[0_22px_44px_-24px_rgba(15,23,42,0.8)]",
                  "dark:border-gray-700 dark:bg-gray-950/90",
                  tone.glow,
                ].join(" ")}
              >
                <div className="border-b border-gray-200/80 px-6 pb-5 pt-6 dark:border-gray-800">
                  <div className="mb-5 flex items-center">
                    <span className={["inline-flex rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.14em]", tone.badge].join(" ")}>
                      {product.badgeLabel}
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
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{product.subtitle}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
                  <div className="mb-6 grid grid-cols-2 gap-4 border-y border-gray-200/80 py-4 dark:border-gray-800">
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">
                        {t("productComparison.duration")}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">{product.duration}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">
                        {t("productComparison.idealFor")}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">{product.idealFor}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">
                      {t("productComparison.features")}
                    </h4>
                    <ul className="space-y-2.5">
                      {product.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
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

                  <div className="mt-auto">
                    {product.ctaType === "stripe" && product.stripeLink ? (
                      <div className="space-y-2">
                        <a href={product.stripeLink} target="_blank" rel="noopener noreferrer" className="block">
                          <Button className="h-11 w-full rounded-full bg-gray-900 text-gray-50 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200">
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
