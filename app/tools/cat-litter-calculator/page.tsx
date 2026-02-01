'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { Container } from '../../../src/components/ui/container';
import { Button } from '../../../src/components/ui/button';
import { useTranslation } from '../../../src/lib/translation-context';
import {
  Calculator,
  ChevronRight,
  Home,
  Cat,
  DollarSign,
  TrendingDown,
  Leaf,
  Info,
  Share2,
  Check
} from 'lucide-react';

interface LitterType {
  id: string;
  name: string;
  pricePerKg: number;
  usagePerCatPerMonth: number; // kg
  odorRating: number; // 1-5
  dustLevel: string;
  clumping: boolean;
  biodegradable: boolean;
  notes: string;
}

const litterTypes: LitterType[] = [
  {
    id: 'clay-clumping',
    name: 'Clay Clumping',
    pricePerKg: 2.50,
    usagePerCatPerMonth: 4.5,
    odorRating: 3,
    dustLevel: 'High',
    clumping: true,
    biodegradable: false,
    notes: 'Most popular. Creates solid clumps but can be dusty.'
  },
  {
    id: 'clay-non-clumping',
    name: 'Clay Non-Clumping',
    pricePerKg: 1.50,
    usagePerCatPerMonth: 6,
    odorRating: 2,
    dustLevel: 'High',
    clumping: false,
    biodegradable: false,
    notes: 'Budget option. Requires full replacement more often.'
  },
  {
    id: 'silica-crystal',
    name: 'Silica Crystal',
    pricePerKg: 8.00,
    usagePerCatPerMonth: 2,
    odorRating: 4,
    dustLevel: 'Low',
    clumping: false,
    biodegradable: false,
    notes: 'Low maintenance, good odor control but some cats dislike texture.'
  },
  {
    id: 'wood-pellet',
    name: 'Wood Pellets',
    pricePerKg: 1.20,
    usagePerCatPerMonth: 5,
    odorRating: 3,
    dustLevel: 'Low',
    clumping: false,
    biodegradable: true,
    notes: 'Eco-friendly, natural pine scent. Breaks into sawdust when wet.'
  },
  {
    id: 'paper',
    name: 'Paper-Based',
    pricePerKg: 3.50,
    usagePerCatPerMonth: 4,
    odorRating: 2,
    dustLevel: 'Very Low',
    clumping: false,
    biodegradable: true,
    notes: 'Good for cats with respiratory issues. Less odor control.'
  },
  {
    id: 'corn',
    name: 'Corn/Wheat',
    pricePerKg: 4.00,
    usagePerCatPerMonth: 3.5,
    odorRating: 3,
    dustLevel: 'Low',
    clumping: true,
    biodegradable: true,
    notes: 'Natural clumping, flushable. Can attract insects if humid.'
  },
  {
    id: 'tofu',
    name: 'Tofu-Based',
    pricePerKg: 5.00,
    usagePerCatPerMonth: 3,
    odorRating: 3,
    dustLevel: 'Very Low',
    clumping: true,
    biodegradable: true,
    notes: 'Ultra-low dust, flushable. Newer option gaining popularity.'
  },
  {
    id: 'walnut',
    name: 'Walnut Shell',
    pricePerKg: 4.50,
    usagePerCatPerMonth: 3.5,
    odorRating: 4,
    dustLevel: 'Low',
    clumping: true,
    biodegradable: true,
    notes: 'Natural dark color hides stains. Good odor control.'
  }
];

export default function CatLitterCalculatorPage() {
  const { locale } = useTranslation();

  const [numberOfCats, setNumberOfCats] = useState(1);
  const [selectedLitter, setSelectedLitter] = useState('clay-clumping');
  const [customPricePerKg, setCustomPricePerKg] = useState<number | null>(null);
  const [useDeodorizer, setUseDeodorizer] = useState(false);
  const [copied, setCopied] = useState(false);

  const selectedLitterType = litterTypes.find(l => l.id === selectedLitter) || litterTypes[0];
  const effectivePrice = customPricePerKg ?? selectedLitterType.pricePerKg;

  const calculations = useMemo(() => {
    const monthlyUsageKg = selectedLitterType.usagePerCatPerMonth * numberOfCats;
    const monthlyCost = monthlyUsageKg * effectivePrice;
    const annualCost = monthlyCost * 12;

    // Deodorizer calculations (Purrify pricing)
    const deodomonthlyCost = numberOfCats <= 1 ? 8.99 : numberOfCats <= 2 ? 12.99 : 16.99;
    const deodoAnnualCost = deodomonthlyCost * 12;

    // With deodorizer, litter lasts ~25% longer due to less frequent full changes
    const litterSavingsWithDeodorizer = annualCost * 0.20;
    const netDeodorizerCost = deodoAnnualCost - litterSavingsWithDeodorizer;

    // Compare all litter types
    const allLitterCosts = litterTypes.map(litter => ({
      ...litter,
      annualCost: litter.usagePerCatPerMonth * numberOfCats * litter.pricePerKg * 12
    })).sort((a, b) => a.annualCost - b.annualCost);

    const cheapestLitter = allLitterCosts[0];
    const potentialSavings = annualCost - cheapestLitter.annualCost;

    return {
      monthlyUsageKg,
      monthlyCost,
      annualCost,
      deodoAnnualCost,
      litterSavingsWithDeodorizer,
      netDeodorizerCost,
      allLitterCosts,
      cheapestLitter,
      potentialSavings,
      costPerDay: annualCost / 365
    };
  }, [selectedLitterType, numberOfCats, effectivePrice]);

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/tools/cat-litter-calculator?cats=${numberOfCats}&litter=${selectedLitter}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Cat Litter Cost Calculator',
          text: `I spend $${calculations.annualCost.toFixed(0)}/year on cat litter for ${numberOfCats} cat${numberOfCats > 1 ? 's' : ''}. Check yours:`,
          url: shareUrl
        });
      } catch {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <Container>
          <nav className="py-3 flex items-center text-sm text-gray-600 dark:text-gray-300">
            <Link href="/" className="flex items-center hover:text-green-600 dark:hover:text-green-400">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900 dark:text-gray-100 font-medium">Cat Litter Calculator</span>
          </nav>
        </Container>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800 py-12">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mb-6">
              <Calculator className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">
              Cat Litter Cost Calculator
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Find out exactly how much you spend on cat litter per year. Compare different litter types and discover potential savings.
            </p>
          </div>
        </Container>
      </section>

      {/* Calculator Section */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">

              {/* Input Panel */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-6">
                  Your Details
                </h2>

                {/* Number of Cats */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    <Cat className="w-4 h-4 inline mr-2" />
                    Number of Cats
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setNumberOfCats(Math.max(1, numberOfCats - 1))}
                      className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 font-bold text-lg"
                    >
                      -
                    </button>
                    <span className="text-2xl font-bold text-gray-900 dark:text-gray-50 w-12 text-center">
                      {numberOfCats}
                    </span>
                    <button
                      onClick={() => setNumberOfCats(Math.min(10, numberOfCats + 1))}
                      className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 font-bold text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Litter Type */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Litter Type
                  </label>
                  <select
                    value={selectedLitter}
                    onChange={(e) => {
                      setSelectedLitter(e.target.value);
                      setCustomPricePerKg(null);
                    }}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500"
                  >
                    {litterTypes.map(litter => (
                      <option key={litter.id} value={litter.id}>
                        {litter.name} (~${litter.pricePerKg.toFixed(2)}/kg)
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {selectedLitterType.notes}
                  </p>
                </div>

                {/* Custom Price */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Your Price per kg (optional)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder={`Default: $${selectedLitterType.pricePerKg.toFixed(2)}`}
                    value={customPricePerKg ?? ''}
                    onChange={(e) => setCustomPricePerKg(e.target.value ? parseFloat(e.target.value) : null)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500"
                  />
                </div>

                {/* Litter Properties */}
                <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">
                    Litter Properties
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 dark:text-gray-400">Odor Control:</span>
                      <div className="flex">
                        {[1,2,3,4,5].map(i => (
                          <span key={i} className={i <= selectedLitterType.odorRating ? 'text-yellow-500 dark:text-yellow-400' : 'text-gray-300 dark:text-gray-600'}>
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 dark:text-gray-400">Dust:</span>
                      <span className="text-gray-900 dark:text-gray-100">{selectedLitterType.dustLevel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 dark:text-gray-400">Clumping:</span>
                      <span className={selectedLitterType.clumping ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}>
                        {selectedLitterType.clumping ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Leaf className={`w-4 h-4 ${selectedLitterType.biodegradable ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}`} />
                      <span className={selectedLitterType.biodegradable ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}>
                        {selectedLitterType.biodegradable ? 'Eco-Friendly' : 'Not Biodegradable'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Panel */}
              <div className="space-y-6">
                {/* Main Cost Card */}
                <div className="bg-gradient-to-br from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 rounded-2xl p-6 text-white dark:text-gray-50 shadow-lg">
                  <h2 className="text-lg font-medium opacity-90 mb-2">Your Annual Cat Litter Cost</h2>
                  <div className="text-5xl font-bold mb-4">
                    ${calculations.annualCost.toFixed(0)}
                    <span className="text-xl font-normal opacity-80">/year</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                    <div>
                      <div className="text-sm opacity-80">Monthly</div>
                      <div className="text-xl font-semibold">${calculations.monthlyCost.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-sm opacity-80">Daily</div>
                      <div className="text-xl font-semibold">${calculations.costPerDay.toFixed(2)}</div>
                    </div>
                  </div>
                </div>

                {/* Litter Usage */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-50 mb-3">Litter Usage</h3>
                  <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                    <div className="flex justify-between">
                      <span>Monthly usage:</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{calculations.monthlyUsageKg.toFixed(1)} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Annual usage:</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{(calculations.monthlyUsageKg * 12).toFixed(0)} kg</span>
                    </div>
                  </div>
                </div>

                {/* Savings Opportunity */}
                {calculations.potentialSavings > 20 && (
                  <div className="bg-amber-50 dark:bg-amber-900/30 rounded-xl p-5 border border-amber-200 dark:border-amber-700">
                    <div className="flex items-start gap-3">
                      <TrendingDown className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-amber-800 dark:text-amber-200">Potential Savings</h3>
                        <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                          Switching to <strong>{calculations.cheapestLitter.name}</strong> could save you{' '}
                          <strong>${calculations.potentialSavings.toFixed(0)}/year</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Deodorizer Toggle */}
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-5 border border-blue-200 dark:border-blue-700">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useDeodorizer}
                      onChange={(e) => setUseDeodorizer(e.target.checked)}
                      className="mt-1 w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-green-600 dark:text-green-400 focus:ring-green-500"
                    />
                    <div>
                      <span className="font-semibold text-blue-800 dark:text-blue-200">Add Litter Deodorizer?</span>
                      <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                        Activated carbon deodorizers extend litter life by ~20% and eliminate odors without fragrances.
                      </p>
                    </div>
                  </label>

                  {useDeodorizer && (
                    <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-600 text-sm text-blue-800 dark:text-blue-200 space-y-2">
                      <div className="flex justify-between">
                        <span>Deodorizer cost:</span>
                        <span>${calculations.deodoAnnualCost.toFixed(0)}/year</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Litter savings:</span>
                        <span className="text-green-600 dark:text-green-400">-${calculations.litterSavingsWithDeodorizer.toFixed(0)}/year</span>
                      </div>
                      <div className="flex justify-between font-semibold pt-2 border-t border-blue-200 dark:border-blue-600">
                        <span>Net cost for odor-free litter:</span>
                        <span>${calculations.netDeodorizerCost.toFixed(0)}/year</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Share Button */}
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Link Copied!
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      Share Your Results
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Comparison Table */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6 text-center">
              Compare All Litter Types
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Litter Type</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-gray-100">$/kg</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-gray-100">Annual Cost</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 dark:text-gray-100">Odor</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 dark:text-gray-100">Eco</th>
                  </tr>
                </thead>
                <tbody>
                  {calculations.allLitterCosts.map((litter, idx) => (
                    <tr
                      key={litter.id}
                      className={`border-t border-gray-100 dark:border-gray-700 ${
                        litter.id === selectedLitter
                          ? 'bg-green-50 dark:bg-green-900/20'
                          : idx % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800/50'
                      }`}
                    >
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 font-medium">
                        {litter.name}
                        {litter.id === selectedLitter && (
                          <span className="ml-2 text-xs bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 px-2 py-0.5 rounded">
                            Selected
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-700 dark:text-gray-300">
                        ${litter.pricePerKg.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900 dark:text-gray-100">
                        ${litter.annualCost.toFixed(0)}
                        <span className="text-gray-500 dark:text-gray-400 font-normal">/yr</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center">
                          {[1,2,3,4,5].map(i => (
                            <span key={i} className={`text-xs ${i <= litter.odorRating ? 'text-yellow-500 dark:text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}>
                              ★
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {litter.biodegradable ? (
                          <Leaf className="w-4 h-4 text-green-500 dark:text-green-400 mx-auto" />
                        ) : (
                          <span className="text-gray-300 dark:text-gray-600">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
              * Annual costs based on {numberOfCats} cat{numberOfCats > 1 ? 's' : ''} using average consumption rates. Actual costs may vary.
            </p>
          </div>
        </Container>
      </section>

      {/* Tips Section */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6 text-center">
              Tips to Reduce Cat Litter Costs
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: 'Buy in bulk',
                  description: 'Large bags (18kg+) often cost 30-40% less per kg than smaller bags.'
                },
                {
                  title: 'Scoop daily',
                  description: 'Regular scooping extends litter life significantly vs weekly deep cleans.'
                },
                {
                  title: 'Use a litter mat',
                  description: 'Catches tracked litter so it can be returned to the box instead of vacuumed up.'
                },
                {
                  title: 'Add a deodorizer',
                  description: 'Activated carbon extends time between full litter changes by absorbing odors.'
                },
                {
                  title: 'Right-size your box',
                  description: 'A properly sized box uses less litter than an oversized one.'
                },
                {
                  title: 'Consider subscriptions',
                  description: 'Many brands offer 10-15% off for auto-delivery subscriptions.'
                }
              ].map((tip, idx) => (
                <div key={idx} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <span className="text-green-600 dark:text-green-400 font-bold text-sm">{idx + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{tip.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-green-50 dark:bg-gray-800">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <Info className="w-10 h-10 text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">
              Tired of Litter Box Odors?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Purrify uses activated carbon from coconut shells to trap odor molecules - the same technology used in water filters. No fragrances, no chemicals, just science.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white dark:text-gray-100">
                  Try Free (Just Pay Shipping)
                </Button>
              </Link>
              <Link href="/learn/how-it-works">
                <Button size="lg" variant="outline">
                  Learn How It Works
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
