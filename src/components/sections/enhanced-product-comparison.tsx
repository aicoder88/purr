import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { useCurrency } from "@/lib/currency-context";
import { CheckCircle, ChevronRight, MapPin } from "lucide-react";
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
    <section className="py-14 md:py-16 bg-gray-50 dark:bg-gray-900/50">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {t("productComparison.title")}
          </h2>
          <p className="mt-3 text-base md:text-lg text-gray-600 dark:text-gray-400">
            {t("productComparison.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {products.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 flex flex-col"
            >
              <div className="px-5 pt-5 pb-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-4">
                  <div
                    className={[
                      "relative shrink-0",
                      product.imageSize === "sm" ? "w-16 h-20" : "",
                      product.imageSize === "md" ? "w-20 h-24" : "",
                      product.imageSize === "lg" ? "w-24 h-28" : "",
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
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{product.subtitle}</p>
                  </div>
                </div>
                <div className="mt-3 inline-flex rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3 py-1">
                  <span className="text-xs font-semibold tracking-wide text-gray-700 dark:text-gray-300">{product.badgeLabel}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-3 text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400">{t("productComparison.duration")}</p>
                    <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{product.duration}</p>
                  </div>
                  <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-3 text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400">{t("productComparison.idealFor")}</p>
                    <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{product.idealFor}</p>
                  </div>
                </div>

                <div className="mb-5">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{t("productComparison.features")}</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-gray-900 dark:text-white">{t("productComparison.idealFor")}:</span> {product.bestFor}
                  </p>
                </div>

                <div className="mt-auto">
                  {product.ctaType === "stripe" && product.stripeLink ? (
                    <div className="space-y-2">
                      <a href={product.stripeLink} target="_blank" rel="noopener noreferrer" className="block">
                        <Button className="w-full rounded-full bg-gray-900 hover:bg-gray-800 text-gray-50 dark:bg-gray-100 dark:hover:bg-gray-200 dark:text-gray-900">
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
                      <Button className="w-full rounded-full bg-white hover:bg-gray-100 text-gray-900 border border-gray-300 dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-gray-100 dark:border-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        {t("nav.findStore")}
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
