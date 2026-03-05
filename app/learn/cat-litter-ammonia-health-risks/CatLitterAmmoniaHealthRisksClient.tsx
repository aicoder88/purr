'use client';

import { Container } from '@/components/ui/container';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { AlertTriangle, ShieldCheck, Wind, Heart, Home, ChevronRight, Check, X, Thermometer, Clock } from 'lucide-react';
import { RelatedContent } from '@/components/seo/RelatedContent';
import { localizePath } from '@/lib/i18n/locale-path';

export default function CatLitterAmmoniaHealthRisksClient() {
  const locale = useLocale() as 'en' | 'fr';
  const exposureLevels = [
    { level: '< 5 ppm', description: 'Clean, freshly scooped litter box', risk: 'None', color: 'green' },
    { level: '5\u201325 ppm', description: 'Mild odor; typical in a well-maintained single-cat home', risk: 'Safe', color: 'green' },
    { level: '25\u201350 ppm', description: 'OSHA PEL threshold; noticeable eye and throat irritation begins', risk: 'Low', color: 'yellow' },
    { level: '50\u2013100 ppm', description: 'Strong burning odor; lung, eye, and respiratory irritation', risk: 'Moderate', color: 'orange' },
    { level: '> 100 ppm', description: 'Severe respiratory distress; dangerous for vulnerable groups', risk: 'High', color: 'red' },
  ];

  const riskGroups = [
    {
      icon: Heart,
      title: 'Cats',
      risks: [
        'Respiratory irritation and chronic coughing',
        'Litter box avoidance (leading to accidents)',
        'Watery eyes and persistent squinting',
        'Worsening of feline asthma or bronchitis',
      ],
      note: 'Cats breathe closer to the litter surface and inhale ammonia far more directly during use than humans ever do.',
    },
    {
      icon: AlertTriangle,
      title: 'Humans',
      risks: [
        'Eye, nose, and throat irritation',
        'Headaches and nausea',
        'Aggravation of existing asthma or allergies',
        'Respiratory issues with prolonged daily exposure',
      ],
      note: 'People with respiratory conditions are significantly more sensitive to ammonia fumes at any concentration.',
    },
    {
      icon: ShieldCheck,
      title: 'Vulnerable Groups',
      risks: [
        'Infants and children (faster breathing, developing lungs)',
        'Elderly individuals (reduced respiratory reserve)',
        'People with asthma, COPD, or heart disease',
        'Pregnant women (fetal sensitivity to inhaled toxins)',
      ],
      note: 'Extra precautions are non-negotiable. Move litter boxes out of rooms where these individuals spend regular time.',
    },
  ];

  const reductionMethods = [
    { method: 'Air freshener / spray', mechanism: 'Masking', eliminates: false as boolean | string, duration: 'Minutes', verdict: 'Worsens combined smell' },
    { method: 'Baking soda', mechanism: 'Acid neutralization', eliminates: false as boolean | string, duration: 'Hours', verdict: 'Ineffective \u2014 ammonia is alkaline' },
    { method: 'Scented litter', mechanism: 'Masking', eliminates: false as boolean | string, duration: 'Days', verdict: 'Creates perfume-ammonia mix' },
    { method: 'HEPA air purifier', mechanism: 'Air filtration', eliminates: 'Partial' as boolean | string, duration: 'Continuous', verdict: 'Treats air, not the source' },
    { method: 'Activated carbon (Purrify)', mechanism: 'Adsorption', eliminates: true as boolean | string, duration: '7\u201314 days', verdict: 'Eliminates at the molecular source' },
  ];

  const protocolSteps = [
    {
      number: '01',
      title: 'Scoop Every 12\u201324 Hours',
      description: 'Remove solid waste and clumps at minimum once daily\u2014twice daily for multi-cat homes. Ammonia production starts within 20\u201330 minutes of urination; removing waste before 24 hours prevents exponential buildup.',
      icon: Clock,
      metric: 'Every 12\u201324h',
    },
    {
      number: '02',
      title: 'Ventilate the Litter Area',
      description: 'Place litter boxes within 6 feet of a fresh-air source: an operable window, bathroom exhaust fan, or whole-house ventilation register. A 60-CFM exhaust fan can reduce localized ammonia by up to 80% in small rooms.',
      icon: Wind,
      metric: '60+ CFM airflow',
    },
    {
      number: '03',
      title: 'Add Activated Carbon Granules',
      description: 'Sprinkle 1\u20132 tablespoons of activated carbon granules directly into the litter. The carbon adsorbs ammonia molecules at the molecular level before they become airborne. Reapply every 7\u201314 days with each litter refresh.',
      icon: ShieldCheck,
      metric: '1\u20132 tbsp per box',
    },
    {
      number: '04',
      title: 'Complete Full Litter Change Weekly',
      description: 'Even with daily scooping and carbon treatment, ammonia-saturated litter needs full replacement. Single-cat homes: every 7\u201310 days. Multi-cat homes: every 5\u20137 days. Wash the box with unscented dish soap\u2014never bleach, which reacts with ammonia to form toxic chloramine vapors.',
      icon: Thermometer,
      metric: 'Every 7\u201310 days',
    },
  ];

  const faqs = [
    {
      question: 'Can ammonia from cat litter make you sick?',
      answer: 'At typical household levels below 25 ppm, ammonia causes irritation rather than illness. Symptoms like watery eyes, headaches, and throat discomfort appear at 25&ndash;50 ppm. Serious respiratory harm requires prolonged exposure above 100 ppm&mdash;rare in most homes but possible with multiple neglected litter boxes in a sealed, unventilated room.',
    },
    {
      question: 'How much ammonia is typically in a dirty litter box?',
      answer: 'A freshly scooped single-cat box typically produces under 10 ppm near the surface. A box left for 48+ hours can reach 50&ndash;100 ppm in the immediate area. OSHA&rsquo;s permissible exposure limit for workplace ammonia is 50 ppm over an 8-hour workday&mdash;a threshold an uncleaned multi-cat box can match or exceed.',
    },
    {
      question: 'Is cat litter ammonia dangerous for babies?',
      answer: 'More so than for healthy adults. Infants breathe faster relative to body weight, have developing respiratory systems, and spend more time at floor level where ammonia concentrations are highest. If a litter box shares any space with a baby, move it to a separate room with a closed door and enforce twice-daily scooping with activated carbon.',
    },
    {
      question: 'Can cat litter cause chronic respiratory problems?',
      answer: 'Chronic low-level exposure can aggravate existing asthma, cause recurring headaches, and produce persistent eye irritation. True chronic respiratory disease from household cat litter is uncommon in well-maintained setups. The highest-risk scenario is three or more cats in a small apartment with inadequate ventilation and infrequent litter changes.',
    },
    {
      question: 'Does baking soda neutralize ammonia in cat litter?',
      answer: 'No&mdash;this is one of the most persistent myths in cat care. Baking soda (sodium bicarbonate) neutralizes acids. Ammonia is a base with a pH around 11. You cannot neutralize a base with another base&mdash;that&rsquo;s fundamental chemistry. Only adsorption via activated carbon, or enzymatic bacterial treatments, can actually capture ammonia molecules.',
    },
    {
      question: 'How long does it take for ammonia to build up in a litter box?',
      answer: 'Ammonia production begins within 20&ndash;30 minutes of urination as bacteria start converting urea. Detectable odor (above 5 ppm) typically appears within 2&ndash;4 hours. In warm conditions above 75&deg;F (24&deg;C), a box left 24 hours can reach concentrations 3&ndash;5&times; higher than one cleaned the same day, because heat accelerates bacterial enzyme activity.',
    },
    {
      question: 'What is a safe ammonia level for a home with cats?',
      answer: 'Below 25 ppm is the practical safety threshold for continuous household exposure, based on OSHA occupational guidelines. For homes with infants, elderly residents, or anyone with asthma or COPD, targeting below 10 ppm is more appropriate. Daily scooping plus activated carbon granules can maintain this level consistently.',
    },
  ];

  const relatedGuides = [
    { href: '/learn/ammonia-science', text: 'Why Cat Urine Smells Like Ammonia: The Science Explained' },
    { href: '/learn/how-activated-carbon-works', text: 'How Activated Carbon Adsorbs Ammonia Molecules' },
    { href: '/blog/how-to-neutralize-ammonia-cat-litter', text: 'Stop That Ammonia Smell: 5 Proven Methods' },
    { href: '/blog/baking-soda-vs-activated-carbon-cat-litter', text: 'Baking Soda vs. Activated Carbon: Which Actually Works?' },
    { href: '/learn/solutions/litter-box-smell-elimination', text: 'Complete Litter Box Smell Elimination Guide' },
    { href: '/blog/best-cat-litter-for-apartments', text: 'Best Cat Litter for Apartments (Low Ammonia Picks)' },
    { href: '/blog/most-powerful-odor-absorber', text: 'The Most Powerful Cat Litter Odor Absorbers Compared' },
    { href: '/blog/how-often-change-cat-litter', text: 'How Often to Change Cat Litter to Prevent Ammonia Buildup' },
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
          <Link href="/learn/" className="hover:text-forest-600 dark:hover:text-forest-400 transition-colors">
            Learn
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900 dark:text-gray-100 font-medium">Ammonia Health Risks</span>
        </nav>

        <article className="max-w-4xl mx-auto py-8 md:py-12 px-4">

          {/* Header Section */}
          <header className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200 text-sm font-medium mb-6">
              <AlertTriangle className="w-4 h-4" />
              <span>Health &amp; Safety</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-50 leading-tight">
              Is Ammonia From Cat Litter Dangerous?
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              The answer depends on four factors: concentration, duration, ventilation, and who&rsquo;s in the room. Here&rsquo;s what the science actually says&mdash;and the fix.
            </p>
          </header>

          {/* TL;DR Quick Answer Box */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 dark:border-amber-500 rounded-r-xl p-6 mb-8">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2">TL;DR &mdash; Quick Answer</p>
            <p className="text-gray-800 dark:text-gray-200">
              Cat litter ammonia is an irritant&mdash;not an emergency toxin&mdash;at typical household levels below 25 ppm. In small apartments, multi-cat homes, or poorly ventilated rooms, concentrations can climb high enough to cause respiratory irritation for cats, infants, and anyone with asthma or COPD.
            </p>
          </div>

          {/* Jump-Link TOC */}
          <nav aria-label="Table of Contents" className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-12">
            <p className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">In This Guide</p>
            <ol className="space-y-2 text-sm list-none">
              <li><a href="#where-ammonia-comes-from" className="text-[#FF3131] dark:text-[#FF5050] hover:underline">1. Where does litter box ammonia come from?</a></li>
              <li><a href="#exposure-levels" className="text-[#FF3131] dark:text-[#FF5050] hover:underline">2. Ammonia exposure levels: when does it get dangerous?</a></li>
              <li><a href="#who-is-at-risk" className="text-[#FF3131] dark:text-[#FF5050] hover:underline">3. Who is most at risk?</a></li>
              <li><a href="#warning-signs" className="text-[#FF3131] dark:text-[#FF5050] hover:underline">4. Warning signs your ammonia is too high</a></li>
              <li><a href="#methods-compared" className="text-[#FF3131] dark:text-[#FF5050] hover:underline">5. Ammonia reduction methods compared</a></li>
              <li><a href="#protocol" className="text-[#FF3131] dark:text-[#FF5050] hover:underline">6. The 4-step ammonia reduction protocol</a></li>
              <li><a href="#activated-carbon" className="text-[#FF3131] dark:text-[#FF5050] hover:underline">7. Why activated carbon is the most effective solution</a></li>
              <li><a href="#when-to-seek-help" className="text-[#FF3131] dark:text-[#FF5050] hover:underline">8. When to seek medical or veterinary attention</a></li>
              <li><a href="#faq" className="text-[#FF3131] dark:text-[#FF5050] hover:underline">9. Frequently asked questions</a></li>
            </ol>
          </nav>

          <div className="prose prose-lg prose-forest max-w-none dark:prose-invert">

            {/* Section 1: Where Does Ammonia Come From */}
            <h2 id="where-ammonia-comes-from" className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Where Does Litter Box Ammonia Come From?</h2>

            <p className="text-gray-700 dark:text-gray-300">
              Here&rsquo;s the ugly truth: the moment your cat urinates, a biochemical clock starts ticking.
            </p>

            <p className="text-gray-700 dark:text-gray-300">
              Cat urine contains high concentrations of <strong>urea</strong>&mdash;a nitrogen-rich waste compound the kidneys excrete. Bacteria naturally present in the litter produce an enzyme called <strong>urease</strong> that immediately begins breaking urea down. The chemical reaction produces ammonia gas (NH&#8323;) and carbon dioxide:
            </p>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 my-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">The Chemistry</h3>
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-4 text-center font-mono text-gray-700 dark:text-gray-300 mb-4">
                    Urea + H&#8322;O &rarr; 2NH&#8323; + CO&#8322;
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    This process&mdash;called <strong>urease hydrolysis</strong>&mdash;begins within 20&ndash;30 minutes of urination. The longer waste sits, the more urea converts to gas. Heat above 75&deg;F (24&deg;C) accelerates bacterial enzyme activity by 3&ndash;5&times;, which is why litter boxes smell dramatically worse in warmer months.
                  </p>
                </div>
                <div className="relative h-full min-h-[200px]">
                  <Image
                    src="/optimized/blog/ammonia-science.webp"
                    alt="Scientific diagram of ammonia production from cat urine through urease hydrolysis"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="w-full h-full object-cover rounded-xl shadow-md"
                  />
                </div>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300">
              One underappreciated factor: <strong>senior cats</strong> (over 10 years) often have reduced kidney function, producing more concentrated urine with higher urea content&mdash;meaning more ammonia per bathroom visit. To understand the full biochemistry, see our deep-dive on <Link href="/learn/ammonia-science" className="text-[#FF3131] dark:text-[#FF5050] hover:underline">why cat urine smells like ammonia</Link>.
            </p>

            {/* Section 2: Exposure Levels */}
            <h2 id="exposure-levels" className="text-3xl font-bold mb-6 mt-12 text-gray-900 dark:text-gray-100">Ammonia Exposure Levels: When Does It Get Dangerous?</h2>

            <p className="text-gray-700 dark:text-gray-300">
              The health impact of ammonia is entirely dose-dependent. &ldquo;Parts per million&rdquo; (ppm) is the standard measurement unit. Here&rsquo;s how those numbers translate to real-world risk&mdash;and where regulatory agencies draw the line:
            </p>

            <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg mb-6">
              <div className="grid grid-cols-4 bg-gray-50 dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 font-bold text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider">
                <div>Level</div>
                <div className="col-span-2">What It Means</div>
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

            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
              <strong>Sources:</strong>{' '}
              <a href="https://www.osha.gov/annotated-pels/table-z-1" target="_blank" rel="nofollow noopener noreferrer" className="text-[#FF3131] dark:text-[#FF5050] hover:underline">
                OSHA Table Z-1 Permissible Exposure Limits
              </a>{' '}
              and{' '}
              <a href="https://www.atsdr.cdc.gov/substances/toxsubstance.asp?toxid=5" target="_blank" rel="nofollow noopener noreferrer" className="text-[#FF3131] dark:text-[#FF5050] hover:underline">
                ATSDR Ammonia Toxicological Profile
              </a>.
            </p>

            <p className="text-gray-700 dark:text-gray-300">
              Pay close attention to this: a well-maintained single-cat household typically stays below 10 ppm. The danger zone begins when litter boxes are neglected for 48+ hours, multiple cats share inadequate facilities, or rooms lack cross-ventilation.
            </p>

            {/* Section 3: Who is at Risk */}
            <h2 id="who-is-at-risk" className="text-3xl font-bold mb-6 mt-12 text-gray-900 dark:text-gray-100">Who Is Most at Risk From Cat Litter Ammonia?</h2>

            <div className="mb-8">
              <Image
                src="/optimized/blog/ammonia-haze-ghibli.webp"
                alt="Visual representation of potential ammonia exposure in the home affecting cats and humans"
                width={1600}
                height={640}
                className="w-full h-64 object-cover rounded-xl shadow-lg"
              />
            </div>

            <p className="text-gray-700 dark:text-gray-300">
              Not everyone in your household is equally vulnerable. Here&rsquo;s who faces the highest exposure and why:
            </p>

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

            {/* Section 4: Warning Signs */}
            <h2 id="warning-signs" className="text-3xl font-bold mb-6 mt-12 text-gray-900 dark:text-gray-100">Warning Signs Your Litter Box Ammonia Is Too High</h2>

            <p className="text-gray-700 dark:text-gray-300">
              But it gets worse: most people underestimate their exposure because they&rsquo;ve become nose-blind to the smell. Here&rsquo;s a quick sensory protocol that bypasses that adaptation.
            </p>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6 my-8">
              <h3 className="text-lg font-bold text-yellow-800 dark:text-yellow-200 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                The 30-Second Sniff Test
              </h3>
              <p className="text-yellow-700 dark:text-yellow-300 text-sm mb-4">
                Stand 3 feet (1 metre) from the litter box and take one slow breath through your nose. Compare:
              </p>
              <ul className="space-y-3 list-none">
                <li className="flex items-start gap-3">
                  <span className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap mt-0.5">No odor</span>
                  <span className="text-yellow-700 dark:text-yellow-300 text-sm">Below 5 ppm&mdash;excellent maintenance.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap mt-0.5">Mild smell</span>
                  <span className="text-yellow-700 dark:text-yellow-300 text-sm">5&ndash;25 ppm range. Scoop today and add activated carbon.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300 text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap mt-0.5">Stinging sensation</span>
                  <span className="text-yellow-700 dark:text-yellow-300 text-sm">25&ndash;50 ppm. Eyes or throat mildly irritated. Full litter change needed today.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap mt-0.5">Eye watering</span>
                  <span className="text-yellow-700 dark:text-yellow-300 text-sm">50+ ppm. Ventilate immediately. Vulnerable household members should leave the room.</span>
                </li>
              </ul>
              <p className="text-yellow-600 dark:text-yellow-400 text-xs mt-4">
                Not sure where you fall?{' '}
                <Link href="/tools/smell-quiz" className="underline font-medium">
                  Take our 60-second smell quiz
                </Link>{' '}
                to get a personalized assessment.
              </p>
            </div>

            <p className="text-gray-700 dark:text-gray-300">
              Watch your cat, too. A cat that suddenly starts eliminating outside the litter box&mdash;with no change in routine&mdash;is often signaling that ammonia levels are too high for comfort. Cats will choose a &ldquo;cleaner&rdquo; spot before you&rsquo;ll ever consciously register the problem.
            </p>

            {/* Section 5: Methods Compared */}
            <h2 id="methods-compared" className="text-3xl font-bold mb-6 mt-12 text-gray-900 dark:text-gray-100">Ammonia Reduction Methods Compared</h2>

            <p className="text-gray-700 dark:text-gray-300">
              Now, pay close attention. Most cat owners are using methods that <em>feel</em> effective but do nothing to reduce actual ammonia concentrations.
            </p>

            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Here&rsquo;s an honest comparison of every mainstream approach&mdash;including the critical chemistry fact most people don&rsquo;t know about baking soda:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <th className="text-left p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-sm">Method</th>
                    <th className="text-left p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-sm">Mechanism</th>
                    <th className="text-center p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-sm">Eliminates NH&#8323;?</th>
                    <th className="text-left p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-sm">Duration</th>
                    <th className="text-left p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold text-sm">Verdict</th>
                  </tr>
                </thead>
                <tbody>
                  {reductionMethods.map((m, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/50 dark:bg-gray-800/50'}>
                      <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 font-medium text-sm">{m.method}</td>
                      <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm">{m.mechanism}</td>
                      <td className="p-3 border border-gray-200 dark:border-gray-700 text-center">
                        {m.eliminates === true ? (
                          <Check className="w-5 h-5 text-green-500 dark:text-green-400 mx-auto" />
                        ) : m.eliminates === 'Partial' ? (
                          <span className="text-yellow-600 dark:text-yellow-400 text-xs font-medium">Partial</span>
                        ) : (
                          <X className="w-5 h-5 text-red-500 dark:text-red-400 mx-auto" />
                        )}
                      </td>
                      <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm">{m.duration}</td>
                      <td className="p-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm">{m.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-gray-700 dark:text-gray-300">
              The baking soda myth deserves special mention. Baking soda is a base (pH ~8.3). Ammonia is also a base (pH ~11). A base cannot neutralize another base&mdash;that&rsquo;s basic chemistry. It does nothing.{' '}
              <Link href="/blog/baking-soda-vs-activated-carbon-cat-litter" className="text-[#FF3131] dark:text-[#FF5050] hover:underline">
                See our full breakdown of baking soda vs. activated carbon
              </Link>.
            </p>

            {/* CTA 1 */}
            <div className="bg-forest-50 dark:bg-forest-900/30 border border-forest-200 dark:border-forest-800 rounded-xl p-6 my-10 flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1">
                <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Ready to eliminate ammonia at the source?</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Purrify activated carbon granules adsorb NH&#8323; molecules before they become airborne. Try a free sample&mdash;you only cover $4.76 shipping.</p>
              </div>
              <Link
                href={localizePath('/products/trial-size', locale)}
                className="whitespace-nowrap bg-[#FF3131] hover:bg-[#e02828] dark:bg-[#FF5050] dark:hover:bg-[#e04040] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Try a free sample (pay $4.76 shipping)
              </Link>
            </div>

            {/* Section 6: 4-Step Protocol */}
            <h2 id="protocol" className="text-3xl font-bold mb-6 mt-12 text-gray-900 dark:text-gray-100">The 4-Step Ammonia Reduction Protocol</h2>

            <p className="text-gray-700 dark:text-gray-300">
              Here is a specific, actionable protocol&mdash;with quantities and timing&mdash;that keeps most single-cat households below 10 ppm and multi-cat homes below 25 ppm:
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              {protocolSteps.map((step, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl font-black text-forest-200 dark:text-forest-700 leading-none">{step.number}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <step.icon className="w-4 h-4 text-forest-600 dark:text-forest-400" />
                        <h3 className="font-bold text-gray-900 dark:text-gray-100">{step.title}</h3>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">{step.description}</p>
                      <span className="inline-flex items-center gap-1 bg-forest-100 dark:bg-forest-900/40 text-forest-700 dark:text-forest-300 text-xs px-2 py-1 rounded-full font-medium">
                        {step.metric}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-gray-700 dark:text-gray-300">
              For a complete maintenance schedule tailored to your number of cats, see our guide on{' '}
              <Link href="/blog/how-often-change-cat-litter" className="text-[#FF3131] dark:text-[#FF5050] hover:underline">
                how often to change cat litter
              </Link>.
            </p>

            {/* Section 7: Why Activated Carbon */}
            <h2 id="activated-carbon" className="text-3xl font-bold mb-6 mt-12 text-gray-900 dark:text-gray-100">Why Activated Carbon Is the Most Effective Solution</h2>

            <p className="text-gray-700 dark:text-gray-300">
              Listen: most odor-control products work on your <em>perception</em> of ammonia. Activated carbon works on the <em>ammonia molecule itself</em>.
            </p>

            <div className="bg-forest-900 dark:bg-forest-950 text-white dark:text-gray-100 rounded-2xl p-8 my-8">
              <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">The Science of Adsorption</h3>
                  <p className="text-forest-100 dark:text-forest-200 mb-4">
                    Activated carbon has a surface area of 500&ndash;1,500 m&#178; per gram&mdash;roughly the area of a football field in a single teaspoon. Ammonia molecules (NH&#8323;) are physically trapped in carbon&rsquo;s micropores through <strong>adsorption</strong>: a molecular-level adhesion that permanently captures the gas before it becomes airborne.
                  </p>
                  <p className="text-forest-100 dark:text-forest-200">
                    Unlike air fresheners that mix with ammonia to create a &ldquo;perfume plus urine&rdquo; smell, activated carbon removes the molecule entirely.{' '}
                    <Link href="/learn/science" className="text-forest-300 dark:text-forest-200 hover:text-white underline">
                      See the full science
                    </Link>.
                  </p>
                </div>
                <Image
                  src="/optimized/blog/microscopic-carbon-odor-trap.webp"
                  alt="Microscopic view of activated carbon trapping ammonia molecules in micropores"
                  width={1200}
                  height={800}
                  className="w-full rounded-xl shadow-lg border border-forest-700/50"
                />
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white/10 dark:bg-white/10 rounded-lg p-4">
                  <Check className="w-5 h-5 text-green-400 dark:text-green-300 mb-2" />
                  <p className="text-sm text-forest-100">Eliminates ammonia at the molecular source</p>
                </div>
                <div className="bg-white/10 dark:bg-white/10 rounded-lg p-4">
                  <Check className="w-5 h-5 text-green-400 dark:text-green-300 mb-2" />
                  <p className="text-sm text-forest-100">Non-toxic and pet-friendly</p>
                </div>
                <div className="bg-white/10 dark:bg-white/10 rounded-lg p-4">
                  <Check className="w-5 h-5 text-green-400 dark:text-green-300 mb-2" />
                  <p className="text-sm text-forest-100">Works continuously for 7&ndash;14 days per application</p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300">
              Purrify is a dedicated team of cat parents who got obsessive about odor chemistry. We&rsquo;re not a fragrance company selling a cover-up&mdash;we&rsquo;re a science-first product built around the one mechanism that actually works on ammonia.
            </p>

            <p className="text-gray-700 dark:text-gray-300">
              For a detailed comparison of all carbon-based options, see{' '}
              <Link href="/blog/most-powerful-odor-absorber" className="text-[#FF3131] dark:text-[#FF5050] hover:underline">
                our breakdown of the most powerful cat litter odor absorbers
              </Link>. For apartment-specific strategies, read{' '}
              <Link href="/blog/best-cat-litter-for-apartments" className="text-[#FF3131] dark:text-[#FF5050] hover:underline">
                our apartment cat odor guide
              </Link>.
            </p>

            {/* Section 8: When to Seek Help */}
            <h2 id="when-to-seek-help" className="text-3xl font-bold mb-6 mt-12 text-gray-900 dark:text-gray-100">When to Seek Medical or Veterinary Attention</h2>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 my-8">
              <h3 className="text-xl font-bold text-red-800 dark:text-red-200 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Seek Immediate Attention If:
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-red-700 dark:text-red-300 mb-2">For Humans:</p>
                  <ul className="space-y-2 text-red-700 dark:text-red-300 text-sm list-none">
                    <li className="flex items-start gap-2"><X className="w-4 h-4 mt-1 flex-shrink-0" />Difficulty breathing or wheezing</li>
                    <li className="flex items-start gap-2"><X className="w-4 h-4 mt-1 flex-shrink-0" />Severe eye irritation that does not resolve after leaving the area</li>
                    <li className="flex items-start gap-2"><X className="w-4 h-4 mt-1 flex-shrink-0" />Persistent coughing or chest tightness</li>
                    <li className="flex items-start gap-2"><X className="w-4 h-4 mt-1 flex-shrink-0" />Nausea or dizziness with no other identifiable cause</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-red-700 dark:text-red-300 mb-2">For Your Cat:</p>
                  <ul className="space-y-2 text-red-700 dark:text-red-300 text-sm list-none">
                    <li className="flex items-start gap-2"><X className="w-4 h-4 mt-1 flex-shrink-0" />Open-mouth breathing or gasping</li>
                    <li className="flex items-start gap-2"><X className="w-4 h-4 mt-1 flex-shrink-0" />Persistent squinting or discharge from eyes</li>
                    <li className="flex items-start gap-2"><X className="w-4 h-4 mt-1 flex-shrink-0" />Chronic sneezing or coughing not explained by illness</li>
                    <li className="flex items-start gap-2"><X className="w-4 h-4 mt-1 flex-shrink-0" />Sudden litter box avoidance alongside the above signs</li>
                  </ul>
                </div>
              </div>
              <p className="text-red-600 dark:text-red-400 text-sm mt-4">
                These symptoms are rare at typical household exposure but warrant prompt attention&mdash;especially for infants, elderly individuals, and cats over 10 years old.
              </p>
            </div>

            {/* FAQ Section */}
            <h2 id="faq" className="text-3xl font-bold mb-6 mt-12 text-gray-900 dark:text-gray-100">Frequently Asked Questions</h2>

            <div className="space-y-4 mb-12">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-start gap-2">
                      <span className="text-[#FF3131] dark:text-[#FF5050] font-black text-lg leading-none mt-0.5">Q</span>
                      {faq.question}
                    </h3>
                    <p
                      className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* CTA 2 */}
            <div className="bg-gradient-to-br from-forest-900 to-forest-800 dark:from-gray-800 dark:to-gray-900 text-white dark:text-gray-100 rounded-2xl p-8 my-10 text-center">
              <h3 className="text-2xl font-bold mb-3">Stop Breathing Ammonia. Start Today.</h3>
              <p className="text-forest-100 dark:text-gray-300 mb-6 max-w-lg mx-auto">
                One tablespoon of Purrify activated carbon granules in your litter box reduces ammonia to undetectable levels within hours. Try a free sample&mdash;you pay only $4.76 shipping.
              </p>
              <Link
                href={localizePath('/products/trial-size', locale)}
                className="inline-flex items-center gap-2 bg-white dark:bg-gray-100 text-forest-900 dark:text-gray-900 font-bold px-8 py-4 rounded-lg hover:bg-forest-50 dark:hover:bg-gray-200 transition-colors text-lg"
              >
                Try a free sample (pay $4.76 shipping)
              </Link>
            </div>

            {/* Related Guides Box */}
            <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="font-heading font-bold text-gray-900 dark:text-gray-100 mb-4 text-lg">Related Guides</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {relatedGuides.map((guide, i) => (
                  <Link key={i} href={guide.href} className="flex items-center gap-2 text-[#FF3131] dark:text-[#FF5050] hover:underline text-sm font-medium">
                    <ChevronRight className="w-4 h-4 flex-shrink-0" />
                    {guide.text}
                  </Link>
                ))}
              </div>
            </div>

          </div>

          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
            <p>Updated March 2026</p>
            <Link href="/learn/" className="mt-4 md:mt-0 px-6 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full transition-colors duration-200">
              &larr; Back to Learn
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
