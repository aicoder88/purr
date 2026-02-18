'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Calculator, Cat, Check, ChevronRight, DollarSign, Home, Info, Leaf, Share2, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { useTranslation } from '@/lib/translation-context';
import { localizePath } from '@/lib/i18n/locale-path';

interface LitterType {
  id: string;
  name: string;
  pricePerKg: number;
  usagePerCatPerMonth: number;
  odorRating: number;
  dustLevel: string;
  clumping: boolean;
  biodegradable: boolean;
  notes: string;
}

const LITTER_TYPES: LitterType[] = [
  {
    id: 'clay-clumping',
    name: 'Clay Clumping',
    pricePerKg: 2.5,
    usagePerCatPerMonth: 4.5,
    odorRating: 3,
    dustLevel: 'High',
    clumping: true,
    biodegradable: false,
    notes: 'Most common; solid clumps and moderate odor control.',
  },
  {
    id: 'clay-non-clumping',
    name: 'Clay Non-Clumping',
    pricePerKg: 1.5,
    usagePerCatPerMonth: 6,
    odorRating: 2,
    dustLevel: 'High',
    clumping: false,
    biodegradable: false,
    notes: 'Lower price but requires more frequent full replacement.',
  },
  {
    id: 'silica-crystal',
    name: 'Silica Crystal',
    pricePerKg: 8,
    usagePerCatPerMonth: 2,
    odorRating: 4,
    dustLevel: 'Low',
    clumping: false,
    biodegradable: false,
    notes: 'Lower monthly usage with strong odor control.',
  },
  {
    id: 'wood-pellet',
    name: 'Wood Pellets',
    pricePerKg: 1.2,
    usagePerCatPerMonth: 5,
    odorRating: 3,
    dustLevel: 'Low',
    clumping: false,
    biodegradable: true,
    notes: 'Natural and biodegradable option with moderate control.',
  },
  {
    id: 'paper',
    name: 'Paper-Based',
    pricePerKg: 3.5,
    usagePerCatPerMonth: 4,
    odorRating: 2,
    dustLevel: 'Very Low',
    clumping: false,
    biodegradable: true,
    notes: 'Low-dust option often chosen for sensitive cats.',
  },
  {
    id: 'corn',
    name: 'Corn/Wheat',
    pricePerKg: 4,
    usagePerCatPerMonth: 3.5,
    odorRating: 3,
    dustLevel: 'Low',
    clumping: true,
    biodegradable: true,
    notes: 'Natural clumping profile and moderate monthly usage.',
  },
  {
    id: 'tofu',
    name: 'Tofu-Based',
    pricePerKg: 5,
    usagePerCatPerMonth: 3,
    odorRating: 3,
    dustLevel: 'Very Low',
    clumping: true,
    biodegradable: true,
    notes: 'Very low dust with strong clumping behavior.',
  },
  {
    id: 'walnut',
    name: 'Walnut Shell',
    pricePerKg: 4.5,
    usagePerCatPerMonth: 3.5,
    odorRating: 4,
    dustLevel: 'Low',
    clumping: true,
    biodegradable: true,
    notes: 'Natural option with stronger odor performance.',
  },
];

type ToolCopy = {
  breadcrumbAria: string;
  home: string;
  pageName: string;
  heroTitle: string;
  heroDescription: string;
  detailsHeading: string;
  catsLabel: string;
  litterLabel: string;
  customPriceLabel: string;
  customPricePlaceholder: string;
  propertiesHeading: string;
  odorLabel: string;
  dustLabel: string;
  clumpingLabel: string;
  ecoLabel: string;
  yes: string;
  no: string;
  ecoTrue: string;
  ecoFalse: string;
  annualCostHeading: string;
  yearlySuffix: string;
  monthlyLabel: string;
  dailyLabel: string;
  usageHeading: string;
  monthlyUsageLabel: string;
  annualUsageLabel: string;
  potentialSavingsHeading: string;
  potentialSavingsBodyPrefix: string;
  potentialSavingsBodySuffix: string;
  addDeodorizer: string;
  addDeodorizerBody: string;
  deodorizerCostLabel: string;
  litterSavingsLabel: string;
  netCostLabel: string;
  copiedLink: string;
  shareResults: string;
  compareHeading: string;
  litterTypeHeader: string;
  priceHeader: string;
  annualCostHeader: string;
  odorHeader: string;
  ecoHeader: string;
  selectedBadge: string;
  annualShort: string;
  tableFootnotePrefix: string;
  tableFootnoteSuffix: string;
  tipsHeading: string;
  tips: Array<{ title: string; description: string }>;
  ctaTitle: string;
  ctaBody: string;
  ctaPrimary: string;
  ctaSecondary: string;
  shareTitle: string;
  shareBodyPrefix: string;
  shareBodySuffix: string;
};

const COPY: Record<'en' | 'fr', ToolCopy> = {
  en: {
    breadcrumbAria: 'Breadcrumb',
    home: 'Home',
    pageName: 'Cat Litter Calculator',
    heroTitle: 'Cat Litter Cost Calculator',
    heroDescription: 'Estimate annual litter costs, compare litter types, and review practical savings opportunities.',
    detailsHeading: 'Your Details',
    catsLabel: 'Number of Cats',
    litterLabel: 'Litter Type',
    customPriceLabel: 'Your Price per kg (optional)',
    customPricePlaceholder: 'Enter a custom price',
    propertiesHeading: 'Litter Properties',
    odorLabel: 'Odor',
    dustLabel: 'Dust',
    clumpingLabel: 'Clumping',
    ecoLabel: 'Eco',
    yes: 'Yes',
    no: 'No',
    ecoTrue: 'Biodegradable',
    ecoFalse: 'Not biodegradable',
    annualCostHeading: 'Your Annual Cat Litter Cost',
    yearlySuffix: '/year',
    monthlyLabel: 'Monthly',
    dailyLabel: 'Daily',
    usageHeading: 'Litter Usage',
    monthlyUsageLabel: 'Monthly usage',
    annualUsageLabel: 'Annual usage',
    potentialSavingsHeading: 'Potential Savings',
    potentialSavingsBodyPrefix: 'Switching to',
    potentialSavingsBodySuffix: 'could reduce annual cost.',
    addDeodorizer: 'Add Deodorizer',
    addDeodorizerBody: 'Activated carbon can extend litter life and reduce odor without perfume masking.',
    deodorizerCostLabel: 'Deodorizer cost',
    litterSavingsLabel: 'Litter savings',
    netCostLabel: 'Net cost',
    copiedLink: 'Link Copied',
    shareResults: 'Share Results',
    compareHeading: 'Compare All Litter Types',
    litterTypeHeader: 'Litter Type',
    priceHeader: '$/kg',
    annualCostHeader: 'Annual Cost',
    odorHeader: 'Odor',
    ecoHeader: 'Eco',
    selectedBadge: 'Selected',
    annualShort: '/yr',
    tableFootnotePrefix: 'Annual costs estimated for',
    tableFootnoteSuffix: 'cat(s). Actual costs vary by household.',
    tipsHeading: 'Tips to Reduce Cat Litter Costs',
    tips: [
      { title: 'Buy in bulk', description: 'Larger packs usually lower your effective price per kg.' },
      { title: 'Scoop daily', description: 'Frequent scooping helps delay full litter replacement.' },
      { title: 'Use a litter mat', description: 'Reduce tracked litter waste and improve reuse.' },
      { title: 'Use deodorizer strategically', description: 'Activated carbon can reduce the need for early full dumps.' },
      { title: 'Match box size to cat usage', description: 'Oversized boxes often consume unnecessary litter volume.' },
      { title: 'Use subscription discounts', description: 'Recurring delivery can lower long-term costs.' },
    ],
    ctaTitle: 'Managing Odor Alongside Cost?',
    ctaBody: 'Purrify uses activated coconut carbon to trap odor molecules at the source.',
    ctaPrimary: 'Try Free (Just Pay Shipping)',
    ctaSecondary: 'Learn How It Works',
    shareTitle: 'Cat Litter Cost Calculator',
    shareBodyPrefix: 'Estimated annual litter cost:',
    shareBodySuffix: 'with this setup.',
  },
  fr: {
    breadcrumbAria: 'Fil d Ariane',
    home: 'Accueil',
    pageName: 'Calculateur de Litiere',
    heroTitle: 'Calculateur de Cout de Litiere',
    heroDescription: 'Estimez vos couts annuels de litiere et comparez les types de litiere.',
    detailsHeading: 'Vos Parametres',
    catsLabel: 'Nombre de Chats',
    litterLabel: 'Type de Litiere',
    customPriceLabel: 'Votre prix par kg (optionnel)',
    customPricePlaceholder: 'Entrez un prix personnalise',
    propertiesHeading: 'Caracteristiques',
    odorLabel: 'Odeur',
    dustLabel: 'Poussiere',
    clumpingLabel: 'Agglomerante',
    ecoLabel: 'Eco',
    yes: 'Oui',
    no: 'Non',
    ecoTrue: 'Biodegradable',
    ecoFalse: 'Non biodegradable',
    annualCostHeading: 'Cout Annuel de Litiere',
    yearlySuffix: '/an',
    monthlyLabel: 'Mensuel',
    dailyLabel: 'Quotidien',
    usageHeading: 'Utilisation de Litiere',
    monthlyUsageLabel: 'Utilisation mensuelle',
    annualUsageLabel: 'Utilisation annuelle',
    potentialSavingsHeading: 'Economies Potentielles',
    potentialSavingsBodyPrefix: 'Passer a',
    potentialSavingsBodySuffix: 'peut reduire votre cout annuel.',
    addDeodorizer: 'Ajouter un Desodorisant',
    addDeodorizerBody: 'Le carbone active peut prolonger la duree d usage de la litiere et reduire les odeurs.',
    deodorizerCostLabel: 'Cout desodorisant',
    litterSavingsLabel: 'Economies litiere',
    netCostLabel: 'Cout net',
    copiedLink: 'Lien Copie',
    shareResults: 'Partager les Resultats',
    compareHeading: 'Comparer Tous les Types de Litiere',
    litterTypeHeader: 'Type',
    priceHeader: '$/kg',
    annualCostHeader: 'Cout Annuel',
    odorHeader: 'Odeur',
    ecoHeader: 'Eco',
    selectedBadge: 'Selectionne',
    annualShort: '/an',
    tableFootnotePrefix: 'Couts annuels estimes pour',
    tableFootnoteSuffix: 'chat(s). Les resultats varient selon le foyer.',
    tipsHeading: 'Conseils pour Reduire les Couts',
    tips: [
      { title: 'Acheter en gros', description: 'Les grands formats reduisent souvent le cout au kg.' },
      { title: 'Ramasser chaque jour', description: 'Le nettoyage quotidien prolonge la duree de la litiere.' },
      { title: 'Utiliser un tapis', description: 'Recupere la litiere sortie du bac pour limiter le gaspillage.' },
      { title: 'Ajouter du carbone active', description: 'Peut diminuer la frequence des changements complets.' },
      { title: 'Adapter la taille du bac', description: 'Un bac surdimensionne consomme plus de litiere.' },
      { title: 'Abonnements', description: 'La livraison recurrente peut offrir un rabais.' },
    ],
    ctaTitle: 'Controler les Odeurs et le Budget ?',
    ctaBody: 'Purrify utilise du carbone active de noix de coco pour capter les molecules d odeur.',
    ctaPrimary: 'Essai Gratuit (Frais d envoi)',
    ctaSecondary: 'Voir le Fonctionnement',
    shareTitle: 'Calculateur de Cout de Litiere',
    shareBodyPrefix: 'Cout annuel estime :',
    shareBodySuffix: 'avec cette configuration.',
  },
};

export default function CatLitterCalculatorPage() {
  const { locale } = useTranslation();
  const language = locale === 'fr' ? locale : 'en';
  const copy = COPY[language];

  const [numberOfCats, setNumberOfCats] = useState(1);
  const [selectedLitter, setSelectedLitter] = useState('clay-clumping');
  const [customPricePerKg, setCustomPricePerKg] = useState<number | null>(null);
  const [useDeodorizer, setUseDeodorizer] = useState(false);
  const [copied, setCopied] = useState(false);

  const selectedLitterType = LITTER_TYPES.find((litter) => litter.id === selectedLitter) || LITTER_TYPES[0];
  const effectivePrice = customPricePerKg ?? selectedLitterType.pricePerKg;

  const calculations = useMemo(() => {
    const monthlyUsageKg = selectedLitterType.usagePerCatPerMonth * numberOfCats;
    const monthlyCost = monthlyUsageKg * effectivePrice;
    const annualCost = monthlyCost * 12;

    const deodorizerMonthly = numberOfCats <= 1 ? 8.99 : numberOfCats <= 2 ? 12.99 : 16.99;
    const deodorizerAnnual = deodorizerMonthly * 12;
    const litterSavings = annualCost * 0.2;
    const netDeodorizerCost = deodorizerAnnual - litterSavings;

    const allLitterCosts = LITTER_TYPES.map((litter) => ({
      ...litter,
      annualCost: litter.usagePerCatPerMonth * numberOfCats * litter.pricePerKg * 12,
    })).sort((a, b) => a.annualCost - b.annualCost);

    const cheapest = allLitterCosts[0];
    const potentialSavings = annualCost - cheapest.annualCost;

    return {
      monthlyUsageKg,
      monthlyCost,
      annualCost,
      costPerDay: annualCost / 365,
      deodorizerAnnual,
      litterSavings,
      netDeodorizerCost,
      allLitterCosts,
      cheapest,
      potentialSavings,
    };
  }, [effectivePrice, numberOfCats, selectedLitterType.usagePerCatPerMonth]);

  const handleShare = async () => {
    const url = `${window.location.origin}/tools/cat-litter-calculator?cats=${numberOfCats}&litter=${selectedLitter}`;
    const text = `${copy.shareBodyPrefix} $${calculations.annualCost.toFixed(0)} ${copy.shareBodySuffix}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: copy.shareTitle,
          text,
          url,
        });
      } catch {
        // Ignore user cancel
      }
      return;
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <Container>
          <nav aria-label={copy.breadcrumbAria} className="py-3 flex items-center text-sm text-gray-600 dark:text-gray-300">
            <Link href={localizePath('/', locale)} className="flex items-center hover:text-green-600 dark:hover:text-green-400">
              <Home className="w-4 h-4 mr-1" />
              {copy.home}
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900 dark:text-gray-100 font-medium">{copy.pageName}</span>
          </nav>
        </Container>
      </div>

      <section className="bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800 py-12">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mb-6">
              <Calculator className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">{copy.heroTitle}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">{copy.heroDescription}</p>
          </div>
        </Container>
      </section>

      <section className="py-12 bg-white dark:bg-gray-900">
        <Container>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-6">{copy.detailsHeading}</h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  <Cat className="w-4 h-4 inline mr-2" />
                  {copy.catsLabel}
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setNumberOfCats(Math.max(1, numberOfCats - 1))}
                    className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 font-bold text-lg"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold text-gray-900 dark:text-gray-50 w-12 text-center">{numberOfCats}</span>
                  <button
                    onClick={() => setNumberOfCats(Math.min(10, numberOfCats + 1))}
                    className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 font-bold text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">{copy.litterLabel}</label>
                <select
                  value={selectedLitter}
                  onChange={(event) => {
                    setSelectedLitter(event.target.value);
                    setCustomPricePerKg(null);
                  }}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500"
                >
                  {LITTER_TYPES.map((litter) => (
                    <option key={litter.id} value={litter.id}>
                      {`${litter.name} (~$${litter.pricePerKg.toFixed(2)}/kg)`}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{selectedLitterType.notes}</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  {copy.customPriceLabel}
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder={copy.customPricePlaceholder}
                  value={customPricePerKg ?? ''}
                  onChange={(event) => setCustomPricePerKg(event.target.value ? parseFloat(event.target.value) : null)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">{copy.propertiesHeading}</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 dark:text-gray-400">{copy.odorLabel}:</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <span key={rating} className={rating <= selectedLitterType.odorRating ? 'text-yellow-500 dark:text-yellow-400' : 'text-gray-300 dark:text-gray-600'}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 dark:text-gray-400">{copy.dustLabel}:</span>
                    <span className="text-gray-900 dark:text-gray-100">{selectedLitterType.dustLevel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 dark:text-gray-400">{copy.clumpingLabel}:</span>
                    <span className={selectedLitterType.clumping ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}>
                      {selectedLitterType.clumping ? copy.yes : copy.no}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Leaf className={`w-4 h-4 ${selectedLitterType.biodegradable ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}`} />
                    <span className={selectedLitterType.biodegradable ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}>
                      {selectedLitterType.biodegradable ? copy.ecoTrue : copy.ecoFalse}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 rounded-2xl p-6 text-white dark:text-gray-50 shadow-lg">
                <h2 className="text-lg font-medium opacity-90 mb-2">{copy.annualCostHeading}</h2>
                <div className="text-5xl font-bold mb-4">
                  {`$${calculations.annualCost.toFixed(0)}`}
                  <span className="text-xl font-normal opacity-80">{copy.yearlySuffix}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                  <div>
                    <div className="text-sm opacity-80">{copy.monthlyLabel}</div>
                    <div className="text-xl font-semibold">{`$${calculations.monthlyCost.toFixed(2)}`}</div>
                  </div>
                  <div>
                    <div className="text-sm opacity-80">{copy.dailyLabel}</div>
                    <div className="text-xl font-semibold">{`$${calculations.costPerDay.toFixed(2)}`}</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-gray-50 mb-3">{copy.usageHeading}</h3>
                <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                  <div className="flex justify-between">
                    <span>{copy.monthlyUsageLabel}:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{`${calculations.monthlyUsageKg.toFixed(1)} kg`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{copy.annualUsageLabel}:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{`${(calculations.monthlyUsageKg * 12).toFixed(0)} kg`}</span>
                  </div>
                </div>
              </div>

              {calculations.potentialSavings > 20 && (
                <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-5 border border-amber-200 dark:border-amber-700">
                  <div className="flex items-start gap-3">
                    <TrendingDown className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-amber-800 dark:text-amber-200">{copy.potentialSavingsHeading}</h3>
                      <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                        {`${copy.potentialSavingsBodyPrefix} ${calculations.cheapest.name} ${copy.potentialSavingsBodySuffix}`}
                        {` $${calculations.potentialSavings.toFixed(0)}`}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-5 border border-blue-200 dark:border-blue-700">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useDeodorizer}
                    onChange={(event) => setUseDeodorizer(event.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400 focus:ring-green-500"
                  />
                  <div>
                    <span className="font-semibold text-blue-800 dark:text-blue-200">{copy.addDeodorizer}</span>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">{copy.addDeodorizerBody}</p>
                  </div>
                </label>

                {useDeodorizer && (
                  <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-600 text-sm text-blue-800 dark:text-blue-200 space-y-2">
                    <div className="flex justify-between">
                      <span>{copy.deodorizerCostLabel}:</span>
                      <span>{`$${calculations.deodorizerAnnual.toFixed(0)}/year`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{copy.litterSavingsLabel}:</span>
                      <span className="text-green-600 dark:text-green-400">{`-$${calculations.litterSavings.toFixed(0)}/year`}</span>
                    </div>
                    <div className="flex justify-between font-semibold pt-2 border-t border-blue-200 dark:border-blue-600">
                      <span>{copy.netCostLabel}:</span>
                      <span>{`$${calculations.netDeodorizerCost.toFixed(0)}/year`}</span>
                    </div>
                  </div>
                )}
              </div>

              <Button onClick={handleShare} variant="outline" className="w-full flex items-center justify-center gap-2">
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    {copy.copiedLink}
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    {copy.shareResults}
                  </>
                )}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6 text-center">{copy.compareHeading}</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">{copy.litterTypeHeader}</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-gray-100">{copy.priceHeader}</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-gray-100">{copy.annualCostHeader}</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 dark:text-gray-100">{copy.odorHeader}</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 dark:text-gray-100">{copy.ecoHeader}</th>
                  </tr>
                </thead>
                <tbody>
                  {calculations.allLitterCosts.map((litter, index) => (
                    <tr
                      key={litter.id}
                      className={`border-t border-gray-100 dark:border-gray-700 ${litter.id === selectedLitter
                        ? 'bg-green-50 dark:bg-green-900/20'
                        : index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800/50'
                        }`}
                    >
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 font-medium">
                        {litter.name}
                        {litter.id === selectedLitter && (
                          <span className="ml-2 text-xs bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 px-2 py-0.5 rounded">
                            {copy.selectedBadge}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-700 dark:text-gray-300">{`$${litter.pricePerKg.toFixed(2)}`}</td>
                      <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900 dark:text-gray-100">
                        {`$${litter.annualCost.toFixed(0)}`}
                        <span className="text-gray-500 dark:text-gray-400 font-normal">{copy.annualShort}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <span key={rating} className={`text-xs ${rating <= litter.odorRating ? 'text-yellow-500 dark:text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}>
                              ★
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {litter.biodegradable ? (
                          <Leaf className="w-4 h-4 text-green-500 dark:text-green-400 mx-auto" />
                        ) : (
                          <span className="text-gray-300 dark:text-gray-600">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
              {`${copy.tableFootnotePrefix} ${numberOfCats} ${copy.tableFootnoteSuffix}`}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12 bg-white dark:bg-gray-900">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6 text-center">{copy.tipsHeading}</h2>
            <div className="space-y-4">
              {copy.tips.map((tip, index) => (
                <article key={tip.title} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <span className="text-green-600 dark:text-green-400 font-bold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{tip.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{tip.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 bg-green-50 dark:bg-gray-800">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <Info className="w-10 h-10 text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">{copy.ctaTitle}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{copy.ctaBody}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={localizePath('/free', locale)}>
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white dark:text-gray-100">
                  {copy.ctaPrimary}
                </Button>
              </Link>
              <Link href={localizePath('/learn/how-it-works', locale)}>
                <Button size="lg" variant="outline">
                  {copy.ctaSecondary}
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
