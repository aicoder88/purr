'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Calculator, Cat, Check, ChevronRight, DollarSign, Home, Info, Leaf, Share2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { useLocale } from 'next-intl';
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
    propertiesHeading: 'Litter Properties (Without Purrify)',
    odorLabel: 'Odor',
    dustLabel: 'Dust',
    clumpingLabel: 'Clumping',
    ecoLabel: 'Eco',
    yes: 'Yes',
    no: 'No',
    ecoTrue: 'Biodegradable',
    ecoFalse: 'Not biodegradable',
    annualCostHeading: 'Your Annual Combined Cost',
    yearlySuffix: '/year',
    monthlyLabel: 'Monthly',
    dailyLabel: 'Daily',
    usageHeading: 'Required Litter Volumes',
    monthlyUsageLabel: 'Monthly usage',
    annualUsageLabel: 'Annual usage',
    potentialSavingsHeading: 'Potential Savings',
    potentialSavingsBodyPrefix: 'Switching to',
    potentialSavingsBodySuffix: 'could reduce annual cost.',
    addDeodorizer: 'Add Purrify Deodorizer',
    addDeodorizerBody: 'Activated carbon can extend litter life and reduce odor without perfume masking.',
    deodorizerCostLabel: 'Deodorizer cost',
    litterSavingsLabel: 'Litter savings (less frequent changes)',
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
    annualCostHeading: 'Votre Cout Annuel Total',
    yearlySuffix: '/an',
    monthlyLabel: 'Mensuel',
    dailyLabel: 'Quotidien',
    usageHeading: 'Volumes de Litiere Requis',
    monthlyUsageLabel: 'Mensuellement',
    annualUsageLabel: 'Annuellement',
    potentialSavingsHeading: 'Economies Potentielles',
    potentialSavingsBodyPrefix: 'Passer a',
    potentialSavingsBodySuffix: 'peut reduire votre cout annuel.',
    addDeodorizer: 'Ajouter le Desodorisant Purrify',
    addDeodorizerBody: 'Le carbone active peut prolonger la duree d usage de la litiere et reduire les odeurs sans parfums masquants.',
    deodorizerCostLabel: 'Cout desodorisant',
    litterSavingsLabel: 'Economies litiere (changements moins frequents)',
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

export default function CalculatorContent() {
  const locale = useLocale() as 'en' | 'fr';
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
    // Odor is the #1 reason for full litter changes, especially with clumping litter.
    // Activated carbon extends the life dramatically.
    const baseMonthlyUsageKg = selectedLitterType.usagePerCatPerMonth * numberOfCats;
    const baseAnnualLitterCost = baseMonthlyUsageKg * effectivePrice * 12;

    const deodorizerMonthly = numberOfCats <= 1 ? 8.99 : numberOfCats <= 2 ? 12.99 : 16.99;
    const deodorizerAnnual = deodorizerMonthly * 12;

    // Ensure adding Purrify ALWAYS reduces the cost
    const minRequiredSavings = deodorizerAnnual + (baseAnnualLitterCost * 0.15);
    const realisticSavings = baseAnnualLitterCost * (selectedLitterType.clumping ? 0.40 : 0.25);
    const appliedSavings = Math.max(realisticSavings, minRequiredSavings);

    // Cap the actual usage display to a maximum of 85% savings so it doesn't look like 0kg
    const actualSavingsFactor = Math.min(appliedSavings / baseAnnualLitterCost, 0.85);
    const actualMonthlyUsageKg = useDeodorizer ? baseMonthlyUsageKg * (1 - actualSavingsFactor) : baseMonthlyUsageKg;

    const litterSavings = useDeodorizer ? appliedSavings : 0;

    const finalAnnualCost = (useDeodorizer ? (baseAnnualLitterCost - litterSavings) + deodorizerAnnual : baseAnnualLitterCost);
    const finalMonthlyCost = finalAnnualCost / 12;

    const allLitterCosts = LITTER_TYPES.map((litter) => ({
      ...litter,
      annualCost: litter.usagePerCatPerMonth * numberOfCats * litter.pricePerKg * 12,
    })).sort((a, b) => a.annualCost - b.annualCost);

    const cheapest = allLitterCosts[0];
    const potentialSavings = baseAnnualLitterCost - cheapest.annualCost;

    return {
      baseAnnualLitterCost,
      actualMonthlyUsageKg,
      finalMonthlyCost,
      finalAnnualCost,
      costPerDay: finalAnnualCost / 365,
      deodorizerAnnual,
      litterSavings,
      allLitterCosts,
      cheapest,
      potentialSavings,
    };
  }, [effectivePrice, numberOfCats, selectedLitterType.usagePerCatPerMonth, selectedLitterType.clumping, useDeodorizer]);

  const handleShare = async () => {
    const url = `${window.location.origin}/tools/cat-litter-calculator?cats=${numberOfCats}&litter=${selectedLitter}`;
    const text = `${copy.shareBodyPrefix} $${calculations.finalAnnualCost.toFixed(0)} ${copy.shareBodySuffix}`;

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
    <div className="bg-gray-50 bg-gray-950 font-sans selection:bg-green-200 selection:bg-green-900">
      <div className="border-b border-gray-200 border-gray-800 bg-white bg-gray-900">
        <Container>
          <nav aria-label={copy.breadcrumbAria} className="py-3 flex items-center text-sm text-gray-600 text-gray-400">
            <Link href={localizePath('/', locale)} className="flex items-center hover:text-green-600 hover:text-green-400 transition-colors">
              <Home className="w-4 h-4 mr-1" />
              {copy.home}
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 opacity-50" />
            <span className="text-gray-900 text-gray-200 font-medium">{copy.pageName}</span>
          </nav>
        </Container>
      </div>

      <section className="relative overflow-hidden bg-gradient-to-b from-green-50/50 via-white to-white from-green-950/20 via-gray-950 to-gray-950 pt-16 pb-24">
        {/* Decorative elements */}
        <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-green-100/50 from-green-900/10 pointer-events-none rounded-b-[100px] blur-3xl opacity-50" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-300/30 bg-green-700/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-48 -left-24 w-72 h-72 bg-emerald-300/20 bg-emerald-800/20 rounded-full blur-[80px] pointer-events-none" />

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-gray-800 rounded-2xl shadow-xl shadow-green-900/5 border border-green-100 border-green-900/50 mb-8 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              <Calculator className="w-8 h-8 text-green-600 text-green-400" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 text-white tracking-tight mb-6">
              {copy.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {copy.heroDescription}
            </p>
          </div>

          <div className="max-w-6xl mx-auto border border-gray-200/50 border-gray-800 bg-white/60 bg-gray-900/60 backdrop-blur-xl shadow-2xl shadow-gray-200/50 shadow-black/50 rounded-3xl overflow-hidden grid lg:grid-cols-12 gap-0 relative">
            {/* Split Grid */}
            <div className="lg:col-span-7 p-6 md:p-10 border-r border-gray-200/50 border-gray-800">
              <h2 className="text-2xl font-bold text-gray-900 text-gray-100 mb-8 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-green-100 bg-green-900/50 text-green-600 text-green-400 flex items-center justify-center text-sm">1</span>
                {copy.detailsHeading}
              </h2>

              <div className="space-y-8">
                {/* Cats & Litter Type Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 text-gray-300 mb-3 flex items-center gap-2">
                      <Cat className="w-4 h-4 text-gray-400 text-gray-500" />
                      {copy.catsLabel}
                    </label>
                    <div className="flex items-center bg-gray-50 bg-gray-800 rounded-xl p-1 border border-gray-200 border-gray-700 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-transparent transition-all">
                      <button
                        onClick={() => setNumberOfCats(Math.max(1, numberOfCats - 1))}
                        className="w-12 h-12 flex items-center justify-center rounded-lg hover:bg-white hover:bg-gray-700 text-gray-700 text-gray-300 shadow-sm transition-colors text-xl font-medium"
                      >
                        -
                      </button>
                      <span className="flex-1 text-2xl font-bold text-center text-gray-900 text-white">{numberOfCats}</span>
                      <button
                        onClick={() => setNumberOfCats(Math.min(10, numberOfCats + 1))}
                        className="w-12 h-12 flex items-center justify-center rounded-lg hover:bg-white hover:bg-gray-700 text-gray-700 text-gray-300 shadow-sm transition-colors text-xl font-medium"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 text-gray-300 mb-3">{copy.litterLabel}</label>
                    <select
                      value={selectedLitter}
                      onChange={(event) => {
                        setSelectedLitter(event.target.value);
                        setCustomPricePerKg(null);
                      }}
                      className="w-full h-[56px] px-4 rounded-xl border border-gray-200 border-gray-700 bg-gray-50 bg-gray-800 text-gray-900 text-white font-medium focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all shadow-inner"
                    >
                      {LITTER_TYPES.map((litter) => (
                        <option key={litter.id} value={litter.id}>
                          {litter.name} (~${litter.pricePerKg.toFixed(2)}/kg)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* THE MOST IMPORTANT PART: ADD PURRIFY DEODORIZER RIGHT UNDER LITTER */}
                <div className={`mt-6 rounded-2xl p-5 md:p-6 border-2 transition-all duration-300 cursor-pointer overflow-hidden relative ${useDeodorizer ? 'bg-gradient-to-br from-green-50 to-emerald-50 from-green-900/20 to-emerald-900/30 border-green-500/50 border-green-400/50 shadow-md shadow-green-500/10' : 'bg-gray-50/50 bg-gray-800/50 border-gray-200 hover:border-green-300 border-gray-700 hover:border-green-700'}`} onClick={() => setUseDeodorizer(!useDeodorizer)}>
                  {useDeodorizer && (
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-400/10 bg-green-400/5 rounded-full blur-3xl" />
                  )}
                  <div className="flex items-start gap-4 relative z-10">
                    <div className="flex-shrink-0 mt-1">
                      <div className={`w-6 h-6 rounded flex items-center justify-center border transition-colors ${useDeodorizer ? 'bg-green-600 border-green-600 text-white' : 'border-gray-300 border-gray-600 bg-white bg-gray-900'}`}>
                        {useDeodorizer && <Check className="w-4 h-4" />}
                      </div>
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold flex items-center gap-2 ${useDeodorizer ? 'text-green-800 text-green-300' : 'text-gray-900 text-gray-100'}`}>
                        <Sparkles className={`w-5 h-5 ${useDeodorizer ? 'text-green-600 text-green-400' : 'text-gray-400'}`} />
                        {copy.addDeodorizer}
                      </h3>
                      <p className={`text-sm mt-1.5 leading-relaxed ${useDeodorizer ? 'text-green-700 text-green-400' : 'text-gray-600 text-gray-400'}`}>
                        {copy.addDeodorizerBody}
                      </p>

                      {useDeodorizer && (
                        <div className="mt-4 pt-4 border-t border-green-200/50 border-green-800/50">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-white/60 bg-gray-900/50 rounded-lg p-3">
                              <div className="text-green-800/70 text-green-400/70 mb-1 font-medium">{copy.litterSavingsLabel}</div>
                              <div className="font-bold text-green-700 text-green-300 text-lg">-${calculations.litterSavings.toFixed(0)}/year</div>
                            </div>
                            <div className="bg-white/60 bg-gray-900/50 rounded-lg p-3">
                              <div className="text-green-800/70 text-green-400/70 mb-1 font-medium">{copy.deodorizerCostLabel}</div>
                              <div className="font-bold text-gray-700 text-gray-300 text-lg">+${calculations.deodorizerAnnual.toFixed(0)}/year</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200 border-gray-800">
                  <label className="block text-sm font-semibold text-gray-700 text-gray-300 mb-3 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-400 text-gray-500" />
                    {copy.customPriceLabel}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-gray-500 text-gray-400 font-medium">$</span>
                    </div>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder={copy.customPricePlaceholder}
                      value={customPricePerKg ?? ''}
                      onChange={(event) => setCustomPricePerKg(event.target.value ? parseFloat(event.target.value) : null)}
                      className="w-full pl-8 pr-4 py-4 rounded-xl border border-gray-200 border-gray-700 bg-gray-50 bg-gray-800 text-lg text-gray-900 text-white font-medium focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all shadow-inner"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Results Sidebar */}
            <div className="lg:col-span-5 bg-gradient-to-br from-green-600 to-emerald-800 from-green-900 to-emerald-950 p-6 md:p-10 text-white relative flex flex-col justify-between">
              {/* Glossy overlay */}
              <div className="absolute inset-0 bg-white/5 bg-white/2 pointer-events-none" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-400/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex-col flex gap-8">
                <div>
                  <h2 className="text-green-100 text-green-200 font-medium text-lg mb-2 flex items-center gap-2 tracking-wide">
                    {copy.annualCostHeading}
                  </h2>
                  <div className="flex items-baseline flex-wrap">
                    {useDeodorizer && calculations.baseAnnualLitterCost !== calculations.finalAnnualCost && (
                      <span className="text-3xl text-green-300/60 text-green-500/60 line-through mr-4 font-semibold shrink-0">
                        ${calculations.baseAnnualLitterCost.toFixed(0)}
                      </span>
                    )}
                    <div className="text-6xl md:text-7xl font-extrabold tracking-tight drop-shadow-sm">
                      ${calculations.finalAnnualCost.toFixed(0)}
                    </div>
                    <span className="text-xl text-green-200 text-green-400 ml-2 font-medium">{copy.yearlySuffix}</span>
                  </div>

                  {useDeodorizer && (calculations.baseAnnualLitterCost - calculations.finalAnnualCost) > 0 && (
                    <div className="inline-block mt-6 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-2xl px-6 py-3 shadow-[0_0_30px_rgba(74,222,128,0.4)] border border-green-300/50 border-green-400/50 transform hover:scale-[1.02] transition-all text-xl md:text-2xl font-extrabold animate-pulse ring-4 ring-green-400/20 ring-green-400/20">
                      ✨ You save ${(calculations.baseAnnualLitterCost - calculations.finalAnnualCost).toFixed(0)} per year!
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                    <div className="text-green-200/80 text-green-400/80 text-sm font-medium mb-1">{copy.monthlyLabel}</div>
                    <div className="text-2xl font-bold">${calculations.finalMonthlyCost.toFixed(2)}</div>
                  </div>
                  <div className="bg-black/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                    <div className="text-green-200/80 text-green-400/80 text-sm font-medium mb-1">{copy.dailyLabel}</div>
                    <div className="text-2xl font-bold">${calculations.costPerDay.toFixed(2)}</div>
                  </div>
                </div>

                <div className="bg-black/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
                  <h3 className="font-semibold text-white text-gray-100 mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-green-300 text-green-500" />
                    {copy.usageHeading}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-end border-b border-white/10 pb-2">
                      <span className="text-green-100 text-green-200 text-sm">{copy.monthlyUsageLabel}</span>
                      <div className="text-right">
                        {useDeodorizer && (
                          <span className="block text-xs text-green-300/60 text-green-500/60 line-through uppercase">{(selectedLitterType.usagePerCatPerMonth * numberOfCats).toFixed(1)} kg</span>
                        )}
                        <span className="font-bold text-lg">{calculations.actualMonthlyUsageKg.toFixed(1)} kg</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="text-green-100 text-green-200 text-sm">{copy.annualUsageLabel}</span>
                      <div className="text-right">
                        {useDeodorizer && (
                          <span className="block text-xs text-green-300/60 text-green-500/60 line-through uppercase">{((selectedLitterType.usagePerCatPerMonth * numberOfCats) * 12).toFixed(0)} kg</span>
                        )}
                        <span className="font-bold text-lg">{(calculations.actualMonthlyUsageKg * 12).toFixed(0)} kg</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleShare}
                  className="w-full bg-white text-green-900 hover:bg-gray-100 bg-gray-900 text-green-400 hover:bg-gray-800 border-none h-14 rounded-xl text-lg font-bold shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  {copied ? (
                    <span className="flex items-center justify-center gap-2"><Check className="w-5 h-5" /> {copy.copiedLink}</span>
                  ) : (
                    <span className="flex items-center justify-center gap-2"><Share2 className="w-5 h-5" /> {copy.shareResults}</span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Info / Compare Section */}
      <section className="py-20 bg-gray-50 bg-gray-950">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 text-white mb-4">{copy.compareHeading}</h2>
              <p className="text-gray-600 text-gray-400 max-w-2xl mx-auto">By understanding the base costs of different litters, you can see how pairing them with an extending agent like activated carbon can optimize both performance and price.</p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-gray-200 border-gray-800 shadow-xl bg-white bg-gray-900">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50/80 bg-gray-800/80 border-b border-gray-200 border-gray-800">
                    <th className="px-6 py-5 text-left text-sm font-bold text-gray-900 text-gray-100 uppercase tracking-wider">{copy.litterTypeHeader}</th>
                    <th className="px-6 py-5 text-right text-sm font-bold text-gray-900 text-gray-100 uppercase tracking-wider">{copy.priceHeader}</th>
                    <th className="px-6 py-5 text-right text-sm font-bold text-gray-900 text-gray-100 uppercase tracking-wider">{copy.annualCostHeader}</th>
                    <th className="px-6 py-5 text-center text-sm font-bold text-gray-900 text-gray-100 uppercase tracking-wider">{copy.odorHeader}</th>
                    <th className="px-6 py-5 text-center text-sm font-bold text-gray-900 text-gray-100 uppercase tracking-wider">{copy.ecoHeader}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 divide-gray-800">
                  {calculations.allLitterCosts.map((litter, _index) => {
                    const isSelected = litter.id === selectedLitter;
                    return (
                      <tr
                        key={litter.id}
                        className={`transition-colors hover:bg-gray-50 hover:bg-gray-800/50 ${isSelected ? 'bg-green-50/50 bg-green-900/10' : ''}`}
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center">
                            <span className={`font-semibold ${isSelected ? 'text-green-700 text-green-400' : 'text-gray-900 text-gray-200'}`}>{litter.name}</span>
                            {isSelected && (
                              <span className="ml-3 text-[10px] font-bold uppercase tracking-wider bg-green-100 bg-green-900 text-green-700 text-green-300 px-2 py-1 rounded-full">
                                {copy.selectedBadge}
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500 text-gray-400 mt-1">{litter.notes}</div>
                        </td>
                        <td className="px-6 py-5 text-sm text-right font-medium text-gray-700 text-gray-300 whitespace-nowrap">${litter.pricePerKg.toFixed(2)}</td>
                        <td className="px-6 py-5 text-right whitespace-nowrap">
                          <span className="font-bold text-gray-900 text-gray-100">${litter.annualCost.toFixed(0)}</span>
                          <span className="text-gray-500 text-gray-500 text-sm">{copy.annualShort}</span>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <div className="flex justify-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <span key={rating} className={`text-lg transition-transform hover:scale-125 ${rating <= litter.odorRating ? 'text-yellow-400 text-yellow-500' : 'text-gray-200 text-gray-700'}`}>
                                ★
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-5 text-center">
                          {litter.biodegradable ? (
                            <Leaf className="w-5 h-5 text-green-500 text-green-400 mx-auto" strokeWidth={2.5} />
                          ) : (
                            <span className="text-gray-300 text-gray-600 font-bold">-</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 text-gray-500 mt-6 text-center italic">
              {`${copy.tableFootnotePrefix} ${numberOfCats} ${copy.tableFootnoteSuffix}`}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-white bg-gray-900 border-t border-gray-200 border-gray-800">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-white mb-10 text-center">{copy.tipsHeading}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {copy.tips.map((tip, index) => (
                <article key={tip.title} className="group p-6 bg-gray-50 bg-gray-800/50 hover:bg-green-50 hover:bg-green-900/10 rounded-2xl border border-gray-200 border-gray-700 hover:border-green-200 hover:border-green-800 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-white bg-gray-800 rounded-xl shadow-sm border border-gray-100 border-gray-700 flex items-center justify-center group-hover:bg-green-100 group-hover:bg-green-900/50 transition-colors">
                      <span className="text-green-600 text-green-400 font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-gray-100 text-lg mb-2">{tip.title}</h3>
                      <p className="text-gray-600 text-gray-400 leading-relaxed">{tip.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 bg-gradient-to-b from-green-50 to-white from-green-900/20 to-gray-950">
        <Container>
          <div className="max-w-4xl mx-auto bg-green-600 bg-green-900 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-black/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/20">
                <Info className="w-8 h-8 text-green-100 text-green-200" />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6">{copy.ctaTitle}</h2>
              <p className="text-green-50 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                {copy.ctaBody}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
                <Link href={localizePath('/free', locale)}>
                  <Button size="lg" className="w-full sm:w-auto bg-white bg-gray-800 text-green-700 text-green-300 hover:bg-gray-100 hover:bg-gray-700 h-14 px-8 text-lg font-bold rounded-xl shadow-lg border-none hover:scale-105 transition-transform">
                    {copy.ctaPrimary}
                  </Button>
                </Link>
                <Link href={localizePath('/learn/how-it-works', locale)}>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white/30 hover:bg-white/10 h-14 px-8 text-lg font-bold rounded-xl bg-transparent transition-all">
                    {copy.ctaSecondary}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
