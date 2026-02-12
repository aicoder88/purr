'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, CircleDot, Droplets, FlaskConical, Layers, Thermometer } from 'lucide-react';
import { Container } from '@/components/ui/container';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useTranslation } from '@/lib/translation-context';
import { localizePath } from '@/lib/i18n/locale-path';

export default function AmmoniaSciencePageClient() {
  const { t, locale } = useTranslation();
  const ammonia = t.ammonia;

  const faqItems = [
    { question: ammonia.faq.q1, answer: ammonia.faq.a1 },
    { question: ammonia.faq.q2, answer: ammonia.faq.a2 },
    { question: ammonia.faq.q3, answer: ammonia.faq.a3 },
    { question: ammonia.faq.q4, answer: ammonia.faq.a4 },
    { question: ammonia.faq.q5, answer: ammonia.faq.a5 },
    { question: ammonia.faq.q6, answer: ammonia.faq.a6 },
    { question: ammonia.faq.q7, answer: ammonia.faq.a7 },
    { question: ammonia.faq.q8, answer: ammonia.faq.a8 },
  ];

  const howToSteps = [
    ammonia.howToUse.step1,
    ammonia.howToUse.step2,
    ammonia.howToUse.step3,
  ];

  const results = [
    ammonia.results.day1,
    ammonia.results.day3,
    ammonia.results.week1,
    ammonia.results.ongoing,
  ];

  const problemCards = [
    ammonia.problem.card1,
    ammonia.problem.card2,
    ammonia.problem.card3,
    ammonia.problem.card4,
  ];

  const comparisonRows = [
    ammonia.comparison.purrify,
    ammonia.comparison.bakingSoda,
    ammonia.comparison.scented,
    ammonia.comparison.airFreshener,
    ammonia.comparison.frequentChanges,
  ];

  return (
    <main className="min-h-screen bg-[#FFFFF5] dark:bg-gray-900 transition-colors duration-300">
      <section className="py-14 border-b border-gray-200 dark:border-gray-800">
        <Container>
          <nav className="text-sm text-gray-600 dark:text-gray-300">
            <ol className="flex items-center gap-2">
              <li>
                <Link href={localizePath('/', locale)} className="hover:text-[#FF3131] dark:hover:text-[#FF5050]">
                  {t.nav.home}
                </Link>
              </li>
              <li>/</li>
              <li className="font-medium text-gray-900 dark:text-gray-100">{ammonia.breadcrumb}</li>
            </ol>
          </nav>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-gray-50 mb-5">
                {ammonia.hero.headline}
              </h1>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 max-w-4xl mx-auto">
                {ammonia.hero.subheadline}
              </p>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-xl mb-10">
              <Image
                src="/images/ammonia-science.webp"
                alt={ammonia.meta.title}
                width={1200}
                height={675}
                className="w-full h-auto"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 bg-white dark:bg-gray-800">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-gray-50 mb-4">
              {ammonia.understanding.headline}
            </h2>
            <p className="text-gray-700 dark:text-gray-200 mb-10">
              {ammonia.understanding.intro}
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <article className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <div className="w-11 h-11 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                  <FlaskConical className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-gray-50 mb-2">
                  {ammonia.understanding.chemistry.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm mb-4">
                  {ammonia.understanding.chemistry.description}
                </p>
                <p className="font-mono text-xs md:text-sm text-blue-700 dark:text-blue-300 bg-blue-100/80 dark:bg-blue-900/30 rounded-md p-3">
                  {ammonia.understanding.chemistry.formula}
                </p>
              </article>

              <article className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <div className="w-11 h-11 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Thermometer className="w-6 h-6 text-amber-600 dark:text-amber-300" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-gray-50 mb-3">
                  {ammonia.understanding.factors.title}
                </h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
                  <li className="flex gap-2">
                    <Thermometer className="w-4 h-4 mt-0.5 text-amber-500 dark:text-amber-300 flex-shrink-0" />
                    <span>{ammonia.understanding.factors.point1}</span>
                  </li>
                  <li className="flex gap-2">
                    <Droplets className="w-4 h-4 mt-0.5 text-blue-500 dark:text-blue-300 flex-shrink-0" />
                    <span>{ammonia.understanding.factors.point2}</span>
                  </li>
                  <li className="flex gap-2">
                    <Layers className="w-4 h-4 mt-0.5 text-purple-500 dark:text-purple-300 flex-shrink-0" />
                    <span>{ammonia.understanding.factors.point3}</span>
                  </li>
                  <li className="flex gap-2">
                    <CircleDot className="w-4 h-4 mt-0.5 text-gray-500 dark:text-gray-300 flex-shrink-0" />
                    <span>{ammonia.understanding.factors.point4}</span>
                  </li>
                </ul>
              </article>

              <article className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 dark:text-gray-50 mb-2">
                  {ammonia.understanding.health.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-200 text-sm">
                  {ammonia.understanding.health.description}
                </p>
              </article>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-gray-50 mb-4">
              {ammonia.problem.headline}
            </h2>
            <p className="text-gray-700 dark:text-gray-200 mb-10">
              {ammonia.problem.intro}
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {problemCards.map((card, index) => (
                <article key={`${card.title}-${index}`} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                  <h3 className="font-bold text-gray-900 dark:text-gray-50 mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-200">{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 bg-white dark:bg-gray-800">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-gray-50 mb-4">
              {ammonia.solution.headline}
            </h2>
            <p className="text-gray-700 dark:text-gray-200 mb-3">
              {ammonia.solution.intro}
            </p>
            <p className="text-gray-700 dark:text-gray-200 mb-10">
              {ammonia.solution.description}
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <article className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800">
                <h3 className="font-bold text-blue-900 dark:text-blue-200 mb-2">{ammonia.solution.adsorption.title}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-200">{ammonia.solution.adsorption.description}</p>
              </article>
              <article className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 border border-indigo-100 dark:border-indigo-800">
                <h3 className="font-bold text-indigo-900 dark:text-indigo-200 mb-2">{ammonia.solution.pores.title}</h3>
                <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-200 mb-3">
                  <li>{ammonia.solution.pores.micro}</li>
                  <li>{ammonia.solution.pores.meso}</li>
                  <li>{ammonia.solution.pores.macro}</li>
                </ul>
                <p className="text-sm text-gray-700 dark:text-gray-200">{ammonia.solution.pores.description}</p>
              </article>
              <article className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 border border-emerald-100 dark:border-emerald-800">
                <h3 className="font-bold text-emerald-900 dark:text-emerald-200 mb-2">{ammonia.solution.surface.title}</h3>
                <p className="text-3xl font-black text-emerald-600 dark:text-emerald-300 mb-2">{ammonia.solution.surface.stat}</p>
                <p className="text-sm text-gray-700 dark:text-gray-200 mb-3">{ammonia.solution.surface.comparison}</p>
                <p className="text-sm text-gray-700 dark:text-gray-200">{ammonia.solution.surface.explanation}</p>
              </article>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-gray-50 mb-4">
              {ammonia.howToUse.headline}
            </h2>
            <p className="text-gray-700 dark:text-gray-200 mb-8">
              {ammonia.howToUse.intro}
            </p>

            <div className="space-y-4 mb-8">
              {howToSteps.map((step) => (
                <article key={step.number} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-full bg-[#FF3131] text-white flex items-center justify-center font-bold">
                      {step.number}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-gray-50 mb-1">{step.title}</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-200">{step.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {ammonia.howToUse.proTip && (
              <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 dark:border-amber-500 rounded-r-xl p-6">
                <h3 className="font-bold text-amber-900 dark:text-amber-200 mb-2">{ammonia.howToUse.proTip.title}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-200">{ammonia.howToUse.proTip.description}</p>
              </div>
            )}
          </div>
        </Container>
      </section>

      <section className="py-14 bg-white dark:bg-gray-800">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-gray-50 mb-4">
              {ammonia.results.headline}
            </h2>
            <p className="text-gray-700 dark:text-gray-200 mb-8">
              {ammonia.results.intro}
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {results.map((result, index) => (
                <article key={`${result.title}-${index}`} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-5">
                  <h3 className="font-bold text-gray-900 dark:text-gray-50 mb-2">{result.title}</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-200">{result.description}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <div className="max-w-5xl mx-auto overflow-x-auto">
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-gray-50 mb-4">
              {ammonia.comparison.headline}
            </h2>
            <p className="text-gray-700 dark:text-gray-200 mb-8">{ammonia.comparison.intro}</p>

            <table className="w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                  <th className="p-4 text-gray-900 dark:text-gray-50">{ammonia.comparison.headers.method}</th>
                  <th className="p-4 text-gray-900 dark:text-gray-50">{ammonia.comparison.headers.effectiveness}</th>
                  <th className="p-4 text-gray-900 dark:text-gray-50">{ammonia.comparison.headers.duration}</th>
                  <th className="p-4 text-gray-900 dark:text-gray-50">{ammonia.comparison.headers.safety}</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr key={`${row.method}-${index}`} className="border-t border-gray-200 dark:border-gray-700">
                    <td className="p-4 text-gray-900 dark:text-gray-50">{row.method}</td>
                    <td className="p-4 text-gray-700 dark:text-gray-200">{row.effectiveness}</td>
                    <td className="p-4 text-gray-700 dark:text-gray-200">{row.duration}</td>
                    <td className="p-4 text-gray-700 dark:text-gray-200">{row.safety}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="text-sm text-gray-600 dark:text-gray-300 mt-4">{ammonia.comparison.note}</p>
          </div>
        </Container>
      </section>

      <section className="py-14 bg-white dark:bg-gray-800">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-gray-50 mb-6">
              {ammonia.faq.headline}
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              {faqItems.map((item, index) => (
                <AccordionItem key={`${item.question}-${index}`} value={`faq-${index}`} className="bg-gray-50 dark:bg-gray-700 rounded-xl px-5 border-0">
                  <AccordionTrigger className="text-left text-gray-900 dark:text-gray-50 hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 dark:text-gray-200 pb-5">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-electric-indigo to-deep-coral rounded-2xl p-8 md:p-10 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">{ammonia.cta.headline}</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">{ammonia.cta.subheadline}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
              <Link href={localizePath('/products/trial-size', locale)} className="inline-flex items-center justify-center bg-white dark:bg-white text-electric-indigo dark:text-electric-indigo font-bold rounded-lg px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-100 transition-colors">
                {ammonia.cta.secondaryButton}
              </Link>
              <Link href={localizePath('/products', locale)} className="inline-flex items-center justify-center border-2 border-white font-bold rounded-lg px-6 py-3 hover:bg-white/10 transition-colors">
                {ammonia.cta.button}
              </Link>
            </div>
            <p className="text-sm opacity-90 flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>{ammonia.cta.benefit2}</span>
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
