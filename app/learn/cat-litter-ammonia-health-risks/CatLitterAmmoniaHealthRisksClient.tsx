'use client';

import { Container } from '../../../src/components/ui/container';
import Link from 'next/link';
import Image from 'next/image';
import { AlertTriangle, ShieldCheck, Wind, Heart, Home, ChevronRight, Check, X, Thermometer, Clock } from 'lucide-react';
import { RelatedContent } from '@/components/seo/RelatedContent';

export default function CatLitterAmmoniaHealthRisksClient() {
  const exposureLevels = [
    { level: '< 25 ppm', description: 'Normal household with clean litter box', risk: 'Safe', color: 'green' },
    { level: '25-50 ppm', description: 'Detectable odor, slightly irritating', risk: 'Low', color: 'yellow' },
    { level: '50-100 ppm', description: 'Strong odor, eye and throat irritation', risk: 'Moderate', color: 'orange' },
    { level: '> 100 ppm', description: 'Severe irritation, respiratory distress', risk: 'High', color: 'red' },
  ];

  const riskGroups = [
    {
      icon: Heart,
      title: 'Cats',
      risks: [
        'Respiratory irritation and coughing',
        'Avoidance of litter box (leading to accidents)',
        'Eye irritation and watering',
        'Worsening of existing asthma',
      ],
      note: 'Cats are closer to the litter and breathe ammonia more directly when using the box.',
    },
    {
      icon: AlertTriangle,
      title: 'Humans',
      risks: [
        'Eye, nose, and throat irritation',
        'Headaches and nausea',
        'Aggravation of asthma or allergies',
        'Respiratory issues with prolonged exposure',
      ],
      note: 'People with respiratory conditions are more sensitive to ammonia fumes.',
    },
    {
      icon: ShieldCheck,
      title: 'Vulnerable Groups',
      risks: [
        'Infants and young children (developing lungs)',
        'Elderly individuals',
        'People with asthma or COPD',
        'Pregnant women',
      ],
      note: 'Extra precautions needed for these groups.',
    },
  ];

  const preventionTips = [
    {
      title: 'Scoop Daily',
      description: 'Remove waste at least once daily to prevent ammonia buildup. Twice daily for multi-cat households.',
      icon: Clock,
    },
    {
      title: 'Improve Ventilation',
      description: 'Place litter box in well-ventilated area. Consider a nearby window or exhaust fan.',
      icon: Wind,
    },
    {
      title: 'Use Activated Carbon',
      description: 'Activated carbon adsorbs ammonia molecules before they become airborne, eliminating the source.',
      icon: ShieldCheck,
    },
    {
      title: 'Change Litter Regularly',
      description: 'Complete litter change every 1-2 weeks, even with daily scooping. Wash the box monthly.',
      icon: Thermometer,
    },
  ];

  return (
    <div className="bg-cream-50 dark:bg-gray-900 min-h-screen">
      <Container>
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="pt-6 pb-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:text-forest-600 dark:hover:text-forest-400 transition-colors">
            <Home className="w-4 h-4" />
            <span className="sr-only">Home</span>
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href="/learn" className="hover:text-forest-600 dark:hover:text-forest-400 transition-colors">
            Learn
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900 dark:text-gray-100 font-medium">Ammonia Health Risks</span>
        </nav>

        <article className="max-w-4xl mx-auto py-8 md:py-12 px-4">

          {/* Header Section */}
          <header className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200 text-sm font-medium mb-6">
              <AlertTriangle className="w-4 h-4" />
              <span>Health & Safety</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-50 leading-tight">
              Is Ammonia From Cat Litter Dangerous?
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Understanding the health risks of cat litter ammonia and how to keep your family safe.
            </p>
          </header>

          {/* Quick Answer Box */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 mb-12">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-forest-500" />
              The Short Answer
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>At typical household levels, ammonia from cat litter is an irritant, not a serious health hazard.</strong> However, in poorly ventilated spaces or with multiple cats, ammonia can reach concentrations that cause discomfort and may pose risks to vulnerable individuals.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              The key is prevention: regular cleaning, good ventilation, and using odor eliminators that actually neutralize ammonia rather than just masking it.
            </p>
          </div>

          <div className="prose prose-lg prose-forest max-w-none dark:prose-invert">

            {/* What is Ammonia */}
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Where Does Litter Box Ammonia Come From?</h2>

            <p className="text-gray-700 dark:text-gray-300">
              Ammonia (NH₃) is produced when bacteria break down the urea in cat urine. This process, called <strong>urease hydrolysis</strong>, happens naturally and quickly - often within hours of urination.
            </p>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 my-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">The Chemistry</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Cat urine contains high levels of urea (a nitrogen compound). Bacteria naturally present in the litter produce an enzyme called urease that converts urea into ammonia and carbon dioxide:
                  </p>
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-4 text-center font-mono text-gray-700 dark:text-gray-300">
                    Urea + H₂O → 2NH₃ (ammonia) + CO₂
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-4">
                    This is why the ammonia smell gets stronger over time - more urea is being converted to gas.
                  </p>
                </div>
                <div className="relative h-full min-h-[200px]">
                  <Image
                    src="/optimized/blog/ammonia-science.webp"
                    alt="Scientific diagram of ammonia production from cat urine"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="w-full h-full object-cover rounded-xl shadow-md"
                  />
                </div>
              </div>
            </div>

            {/* Exposure Levels */}
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Ammonia Exposure Levels</h2>

            <p className="text-gray-700 dark:text-gray-300 mb-6">
              The health impact of ammonia depends on concentration (measured in parts per million, or ppm) and duration of exposure:
            </p>

            <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg mb-8">
              <div className="grid grid-cols-4 bg-gray-50 dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 font-bold text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider">
                <div>Level</div>
                <div className="col-span-2">Description</div>
                <div className="text-center">Risk</div>
              </div>
              {exposureLevels.map((item, i) => (
                <div key={i} className={`grid grid-cols-4 p-4 items-center ${i % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/50 dark:bg-gray-800/50'}`}>
                  <div className="font-semibold text-gray-900 dark:text-gray-100">{item.level}</div>
                  <div className="col-span-2 text-gray-700 dark:text-gray-300 text-sm">{item.description}</div>
                  <div className="text-center">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${item.color === 'green' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' :
                        item.color === 'yellow' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' :
                          item.color === 'orange' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300' :
                            'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
                      }`}>
                      {item.risk}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-gray-700 dark:text-gray-300">
              <strong>For context:</strong> A well-maintained single-cat household typically stays well under 25 ppm. Problems arise when litter boxes are neglected, ventilation is poor, or multiple cats share inadequate facilities.
            </p>

            {/* Who is at Risk */}
            <h2 className="text-3xl font-bold mb-6 mt-12 text-gray-900 dark:text-gray-100">Who is at Risk?</h2>

            <div className="mb-8">
              <Image
                src="/optimized/blog/ammonia-haze-ghibli.webp"
                alt="Visual representation of potential ammonia exposure in the home"
                width={1600}
                height={640}
                className="w-full h-64 object-cover rounded-xl shadow-lg"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6 my-8">
              {riskGroups.map((group, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-forest-100 dark:bg-forest-900/50 rounded-lg">
                      <group.icon className="w-5 h-5 text-forest-600 dark:text-forest-400" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{group.title}</h3>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {group.risks.map((risk, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <X className="w-4 h-4 text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" />
                        {risk}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-gray-500 dark:text-gray-400 italic">{group.note}</p>
                </div>
              ))}
            </div>

            {/* How to Reduce Ammonia */}
            <h2 className="text-3xl font-bold mb-6 mt-12 text-gray-900 dark:text-gray-100">How to Reduce Ammonia Exposure</h2>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              {preventionTips.map((tip, index) => (
                <div key={index} className="bg-gradient-to-br from-forest-50 to-white dark:from-gray-800 dark:to-gray-800 rounded-xl p-6 border border-forest-100 dark:border-forest-900/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-forest-100 dark:bg-forest-900/50 rounded-lg">
                      <tip.icon className="w-5 h-5 text-forest-600 dark:text-forest-400" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{tip.title}</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{tip.description}</p>
                </div>
              ))}
            </div>

            {/* Why Activated Carbon Works */}
            <div className="bg-forest-900 dark:bg-forest-950 text-white dark:text-gray-100 rounded-2xl p-8 my-12">
              <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Why Activated Carbon is the Best Solution</h3>
                  <p className="text-forest-100 dark:text-forest-200">
                    Unlike air fresheners that mask odors or baking soda that only neutralizes acids, activated carbon physically traps ammonia molecules through <strong>adsorption</strong>. The ammonia is permanently captured in the carbon&apos;s micropores, preventing it from ever reaching your nose - or your lungs.
                  </p>
                </div>
                <Image
                  src="/optimized/blog/microscopic-carbon-odor-trap.webp"
                  alt="Microscopic view of activated carbon trapping ammonia molecules"
                  width={1200}
                  height={800}
                  className="w-full rounded-xl shadow-lg border border-forest-700/50"
                />
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white/10 dark:bg-white/10 rounded-lg p-4">
                  <Check className="w-5 h-5 text-green-400 dark:text-green-300 mb-2" />
                  <p className="text-sm text-forest-100">Eliminates ammonia at the source</p>
                </div>
                <div className="bg-white/10 dark:bg-white/10 rounded-lg p-4">
                  <Check className="w-5 h-5 text-green-400 dark:text-green-300 mb-2" />
                  <p className="text-sm text-forest-100">Non-toxic and safe for cats</p>
                </div>
                <div className="bg-white/10 dark:bg-white/10 rounded-lg p-4">
                  <Check className="w-5 h-5 text-green-400 dark:text-green-300 mb-2" />
                  <p className="text-sm text-forest-100">Works continuously for 7-14 days</p>
                </div>
              </div>
              <Link
                href="/products/"
                className="inline-flex items-center gap-2 bg-white dark:bg-gray-100 text-forest-900 dark:text-forest-950 font-medium px-6 py-3 rounded-lg mt-6 hover:bg-forest-50 dark:hover:bg-gray-200 transition-colors"
              >
                Try Purrify Activated Carbon
              </Link>
            </div>

            {/* When to Seek Help */}
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">When to Be Concerned</h2>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 my-8">
              <h3 className="text-xl font-bold text-red-800 dark:text-red-200 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Seek Medical Attention If:
              </h3>
              <ul className="space-y-2 text-red-700 dark:text-red-300">
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 mt-1 flex-shrink-0" />
                  Difficulty breathing or wheezing after exposure
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 mt-1 flex-shrink-0" />
                  Severe eye irritation that doesn't resolve
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 mt-1 flex-shrink-0" />
                  Persistent coughing or chest tightness
                </li>
                <li className="flex items-start gap-2">
                  <X className="w-4 h-4 mt-1 flex-shrink-0" />
                  Your cat shows signs of respiratory distress
                </li>
              </ul>
              <p className="text-red-600 dark:text-red-400 text-sm mt-4">
                These symptoms are rare with normal household exposure but warrant prompt attention.
              </p>
            </div>

            {/* Summary */}
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">The Bottom Line</h2>

            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Ammonia from cat litter is primarily a quality-of-life issue rather than a serious health hazard for most households. However, it can cause discomfort and may pose real risks in certain situations:
            </p>

            <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-6">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-forest-500 mt-0.5 flex-shrink-0" />
                Multi-cat households with inadequate litter facilities
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-forest-500 mt-0.5 flex-shrink-0" />
                Small, poorly ventilated spaces (apartments, basements)
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-forest-500 mt-0.5 flex-shrink-0" />
                Homes with vulnerable individuals (infants, elderly, asthmatics)
              </li>
            </ul>

            <p className="text-gray-700 dark:text-gray-300">
              The solution is straightforward: maintain clean litter boxes, ensure good ventilation, and use effective odor eliminators like activated carbon that actually neutralize ammonia rather than just covering it up.
            </p>

            {/* Related Ammonia Content Links */}
            <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="font-heading font-bold text-gray-900 dark:text-gray-100 mb-4">Related Ammonia Guides</h3>
              <div className="space-y-3">
                <Link href="/blog/how-to-neutralize-ammonia-cat-litter" className="flex items-center gap-2 text-[#FF3131] dark:text-[#FF5050] hover:underline font-medium">
                  → Stop That Ammonia Smell: Complete Solution Guide
                </Link>
                <Link href="/learn/ammonia-science" className="flex items-center gap-2 text-[#FF3131] dark:text-[#FF5050] hover:underline font-medium">
                  → Why Cat Urine Smells Like Ammonia (The Science)
                </Link>
                <Link href="/blog/how-to-neutralize-ammonia-cat-litter" className="flex items-center gap-2 text-[#FF3131] dark:text-[#FF5050] hover:underline font-medium">
                  → 5 Proven Methods to Neutralize Ammonia
                </Link>
              </div>
            </div>

          </div>

          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
            <p>Published January 2025</p>
            <Link href="/learn" className="mt-4 md:mt-0 px-6 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full transition-colors duration-200">
              ← Back to Learn
            </Link>
          </footer>

        </article>

        {/* Related Articles */}
        <div className="py-12 border-t border-gray-100 dark:border-gray-800">
          <RelatedContent currentUrl="/learn/cat-litter-ammonia-health-risks" />
        </div>
      </Container>
    </div>
  );
}
