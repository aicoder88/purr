import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { getPaymentLink } from '@/lib/payment-links';

type TrialSizePageContentProps = {
  locale: 'en' | 'fr';
};

const COPY = {
  en: {
    badge: 'Limited Offer',
    title: 'Free Trial Size',
    subtitle: 'Try Purrify for FREE. Just pay shipping.',
    body: 'See the odor difference in one scoop cycle. Works with your current litter and does not add fragrance.',
    shipping: 'Shipping & handling: $4.76 (Canada/US)',
    cta: 'Get Free Trial',
    pointsTitle: 'What you get',
    points: [
      '12g trial pack (up to 7 days)',
      'Activated carbon from coconut shell',
      'Unscented, cat-safe formula',
    ],
    backToProducts: 'Back to all products',
  },
  fr: {
    badge: 'Offre limitee',
    title: 'Format essai gratuit',
    subtitle: 'Essayez Purrify GRATUITEMENT. Payez seulement la livraison.',
    body: "Constater la difference d'odeur des le premier cycle de litiere. Compatible avec votre litiere actuelle, sans parfum.",
    shipping: 'Livraison et manutention: 4.76 $ (Canada/E.-U.)',
    cta: "Obtenir l'essai gratuit",
    pointsTitle: 'Ce que vous recevez',
    points: [
      "Essai de 12 g (jusqu'a 7 jours)",
      'Charbon actif de coque de noix de coco',
      'Formule sans parfum, securitaire pour les chats',
    ],
    backToProducts: 'Retour a tous les produits',
  },
} as const;

export default function TrialSizePageContent({ locale }: TrialSizePageContentProps) {
  const copy = COPY[locale];
  const localePrefix = locale === 'fr' ? '/fr' : '';
  const checkoutUrl = getPaymentLink('trialSingle') ?? '/products/trial-size/';

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <section className="border-b border-gray-200 dark:border-gray-800 bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-green-950/30 dark:via-gray-900 dark:to-emerald-950/30">
        <Container className="py-14 md:py-20">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div className="space-y-5">
              <p className="inline-block rounded-full bg-green-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                {copy.badge}
              </p>
              <h1 className="font-heading text-4xl font-extrabold leading-tight text-gray-900 dark:text-gray-100 md:text-5xl">
                {copy.title}
              </h1>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{copy.subtitle}</p>
              <p className="text-gray-700 dark:text-gray-300">{copy.body}</p>
              <p className="font-semibold text-gray-900 dark:text-gray-100">{copy.shipping}</p>
              <div className="flex flex-wrap gap-3">
                <a href={checkoutUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">{copy.cta}</Button>
                </a>
                <Link href={`${localePrefix}/products/`}>
                  <Button variant="outline">{copy.backToProducts}</Button>
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-800 dark:bg-gray-950">
              <Image
                src="/optimized/products/17g-transparent-v2.webp"
                alt="Purrify trial-size pack"
                width={640}
                height={640}
                priority
                className="mx-auto h-auto w-full max-w-sm object-contain"
              />
              <div className="mt-6 rounded-xl bg-gray-50 p-4 dark:bg-gray-900">
                <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-900 dark:text-gray-100">
                  {copy.pointsTitle}
                </h2>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  {copy.points.map((point) => (
                    <li key={point}>• {point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

