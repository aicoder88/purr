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
import { useTranslations, useLocale } from 'next-intl';
import { localizePath } from '@/lib/i18n/locale-path';

export default function AmmoniaSciencePageClient() {
  const t = useTranslations();
  const a = useTranslations('ammonia');
  const locale = useLocale() as 'en' | 'fr';

  const faqItems = [
    { question: a('faq.q1'), answer: a('faq.a1') },
    { question: a('faq.q2'), answer: a('faq.a2') },
    { question: a('faq.q3'), answer: a('faq.a3') },
    { question: a('faq.q4'), answer: a('faq.a4') },
    { question: a('faq.q5'), answer: a('faq.a5') },
    { question: a('faq.q6'), answer: a('faq.a6') },
    { question: a('faq.q7'), answer: a('faq.a7') },
    { question: a('faq.q8'), answer: a('faq.a8') },
  ];

  const howToSteps = [
    { number: a('howToUse.step1.number'), title: a('howToUse.step1.title'), description: a('howToUse.step1.description') },
    { number: a('howToUse.step2.number'), title: a('howToUse.step2.title'), description: a('howToUse.step2.description') },
    { number: a('howToUse.step3.number'), title: a('howToUse.step3.title'), description: a('howToUse.step3.description') },
  ];

  const results = [
    { title: a('results.day1.title'), description: a('results.day1.description') },
    { title: a('results.day3.title'), description: a('results.day3.description') },
    { title: a('results.week1.title'), description: a('results.week1.description') },
    { title: a('results.ongoing.title'), description: a('results.ongoing.description') },
  ];

  const problemCards = [
    { title: a('problem.card1.title'), description: a('problem.card1.description') },
    { title: a('problem.card2.title'), description: a('problem.card2.description') },
    { title: a('problem.card3.title'), description: a('problem.card3.description') },
    { title: a('problem.card4.title'), description: a('problem.card4.description') },
  ];

  const comparisonRows = [
    { method: a('comparison.purrify.method'), effectiveness: a('comparison.purrify.effectiveness'), duration: a('comparison.purrify.duration'), safety: a('comparison.purrify.safety') },
    { method: a('comparison.bakingSoda.method'), effectiveness: a('comparison.bakingSoda.effectiveness'), duration: a('comparison.bakingSoda.duration'), safety: a('comparison.bakingSoda.safety') },
    { method: a('comparison.scented.method'), effectiveness: a('comparison.scented.effectiveness'), duration: a('comparison.scented.duration'), safety: a('comparison.scented.safety') },
    { method: a('comparison.airFreshener.method'), effectiveness: a('comparison.airFreshener.effectiveness'), duration: a('comparison.airFreshener.duration'), safety: a('comparison.airFreshener.safety') },
    { method: a('comparison.frequentChanges.method'), effectiveness: a('comparison.frequentChanges.effectiveness'), duration: a('comparison.frequentChanges.duration'), safety: a('comparison.frequentChanges.safety') },
  ];

  return (
    <main className="min-h-screen bg-[#FFFFF5] bg-gray-900 transition-colors duration-300">
      <section className="py-14 border-b border-gray-200 border-gray-800">
        <Container>
          <nav className="text-sm text-gray-600 text-gray-300">
            <ol className="flex items-center gap-2">
              <li>
                <Link href={localizePath('/', locale)} className="hover:text-[#FF3131] hover:text-[#FF5050]">
                  {t('nav.home')}
                </Link>
              </li>
              <li>/</li>
              <li className="font-medium text-gray-900 text-gray-100">{a('breadcrumb')}</li>
            </ol>
          </nav>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 text-gray-50 mb-5">
                {a('hero.headline')}
              </h1>
              <p className="text-lg md:text-xl text-gray-700 text-gray-200 max-w-4xl mx-auto">
                {a('hero.subheadline')}
              </p>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-xl mb-10">
              <Image
                src="/optimized/blog/ammonia-science.webp"
                alt={a('meta.title')}
                width={1200}
                height={675}
                className="w-full h-auto"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 bg-white bg-gray-800">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-gray-900 text-gray-50 mb-4">
              {a('understanding.headline')}
            </h2>
            <p className="text-gray-700 text-gray-200 mb-10">
              {a('understanding.intro')}
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <article className="bg-gray-50 bg-gray-700 rounded-xl p-6">
                <div className="w-11 h-11 bg-blue-100 bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                  <FlaskConical className="w-6 h-6 text-blue-600 text-blue-300" />
                </div>
                <h3 className="font-bold text-gray-900 text-gray-50 mb-2">
                  {a('understanding.chemistry.title')}
                </h3>
                <p className="text-gray-700 text-gray-200 text-sm mb-4">
                  {a('understanding.chemistry.description')}
                </p>
                <p className="font-mono text-xs md:text-sm text-blue-700 text-blue-300 bg-blue-100/80 bg-blue-900/30 rounded-md p-3">
                  {a('understanding.chemistry.formula')}
                </p>
              </article>

              <article className="bg-gray-50 bg-gray-700 rounded-xl p-6">
                <div className="w-11 h-11 bg-amber-100 bg-amber-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Thermometer className="w-6 h-6 text-amber-600 text-amber-300" />
                </div>
                <h3 className="font-bold text-gray-900 text-gray-50 mb-3">
                  {a('understanding.factors.title')}
                </h3>
                <ul className="space-y-2 text-sm text-gray-700 text-gray-200">
                  <li className="flex gap-2">
                    <Thermometer className="w-4 h-4 mt-0.5 text-amber-500 text-amber-300 flex-shrink-0" />
                    <span>{a('understanding.factors.point1')}</span>
                  </li>
                  <li className="flex gap-2">
                    <Droplets className="w-4 h-4 mt-0.5 text-blue-500 text-blue-300 flex-shrink-0" />
                    <span>{a('understanding.factors.point2')}</span>
                  </li>
                  <li className="flex gap-2">
                    <Layers className="w-4 h-4 mt-0.5 text-purple-500 text-purple-300 flex-shrink-0" />
                    <span>{a('understanding.factors.point3')}</span>
                  </li>
                  <li className="flex gap-2">
                    <CircleDot className="w-4 h-4 mt-0.5 text-gray-500 text-gray-300 flex-shrink-0" />
                    <span>{a('understanding.factors.point4')}</span>
                  </li>
                </ul>
              </article>

              <article className="bg-gray-50 bg-gray-700 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 text-gray-50 mb-2">
                  {a('understanding.health.title')}
                </h3>
                <p className="text-gray-700 text-gray-200 text-sm">
                  {a('understanding.health.description')}
                </p>
              </article>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-gray-900 text-gray-50 mb-4">
              {a('problem.headline')}
            </h2>
            <p className="text-gray-700 text-gray-200 mb-10">
              {a('problem.intro')}
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {problemCards.map((card, index) => (
                <article key={`${card.title}-${index}`} className="bg-white bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 border-gray-700">
                  <h3 className="font-bold text-gray-900 text-gray-50 mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-700 text-gray-200">{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 bg-white bg-gray-800">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-gray-900 text-gray-50 mb-4">
              {a('solution.headline')}
            </h2>
            <p className="text-gray-700 text-gray-200 mb-3">
              {a('solution.intro')}
            </p>
            <p className="text-gray-700 text-gray-200 mb-10">
              {a('solution.description')}
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <article className="bg-blue-50 bg-blue-900/20 rounded-xl p-6 border border-blue-100 border-blue-800">
                <h3 className="font-bold text-blue-900 text-blue-200 mb-2">{a('solution.adsorption.title')}</h3>
                <p className="text-sm text-gray-700 text-gray-200">{a('solution.adsorption.description')}</p>
              </article>
              <article className="bg-indigo-50 bg-indigo-900/20 rounded-xl p-6 border border-indigo-100 border-indigo-800">
                <h3 className="font-bold text-indigo-900 text-indigo-200 mb-2">{a('solution.pores.title')}</h3>
                <ul className="space-y-1 text-sm text-gray-700 text-gray-200 mb-3">
                  <li>{a('solution.pores.micro')}</li>
                  <li>{a('solution.pores.meso')}</li>
                  <li>{a('solution.pores.macro')}</li>
                </ul>
                <p className="text-sm text-gray-700 text-gray-200">{a('solution.pores.description')}</p>
              </article>
              <article className="bg-emerald-50 bg-emerald-900/20 rounded-xl p-6 border border-emerald-100 border-emerald-800">
                <h3 className="font-bold text-emerald-900 text-emerald-200 mb-2">{a('solution.surface.title')}</h3>
                <p className="text-3xl font-black text-emerald-600 text-emerald-300 mb-2">{a('solution.surface.stat')}</p>
                <p className="text-sm text-gray-700 text-gray-200 mb-3">{a('solution.surface.comparison')}</p>
                <p className="text-sm text-gray-700 text-gray-200">{a('solution.surface.explanation')}</p>
              </article>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-gray-900 text-gray-50 mb-4">
              {a('howToUse.headline')}
            </h2>
            <p className="text-gray-700 text-gray-200 mb-8">
              {a('howToUse.intro')}
            </p>

            <div className="space-y-4 mb-8">
              {howToSteps.map((step) => (
                <article key={step.number} className="bg-white bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 border-gray-700">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-full bg-[#FF3131] bg-[#FF5050] text-white flex items-center justify-center font-bold">
                      {step.number}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-gray-50 mb-1">{step.title}</h3>
                      <p className="text-sm text-gray-700 text-gray-200">{step.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {a.has('howToUse.proTip.title') && (
              <div className="bg-amber-50 bg-amber-900/20 border-l-4 border-amber-400 border-amber-500 rounded-r-xl p-6">
                <h3 className="font-bold text-amber-900 text-amber-200 mb-2">{a('howToUse.proTip.title')}</h3>
                <p className="text-sm text-gray-700 text-gray-200">{a('howToUse.proTip.description')}</p>
              </div>
            )}
          </div>
        </Container>
      </section>

      <section className="py-14 bg-white bg-gray-800">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-gray-900 text-gray-50 mb-4">
              {a('results.headline')}
            </h2>
            <p className="text-gray-700 text-gray-200 mb-8">
              {a('results.intro')}
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {results.map((result, index) => (
                <article key={`${result.title}-${index}`} className="bg-gray-50 bg-gray-700 rounded-xl p-5">
                  <h3 className="font-bold text-gray-900 text-gray-50 mb-2">{result.title}</h3>
                  <p className="text-sm text-gray-700 text-gray-200">{result.description}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <div className="max-w-5xl mx-auto overflow-x-auto">
            <h2 className="text-3xl font-heading font-bold text-gray-900 text-gray-50 mb-4">
              {a('comparison.headline')}
            </h2>
            <p className="text-gray-700 text-gray-200 mb-8">{a('comparison.intro')}</p>

            <table className="w-full bg-white bg-gray-800 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-100 bg-gray-700 text-left">
                  <th className="p-4 text-gray-900 text-gray-50">{a('comparison.headers.method')}</th>
                  <th className="p-4 text-gray-900 text-gray-50">{a('comparison.headers.effectiveness')}</th>
                  <th className="p-4 text-gray-900 text-gray-50">{a('comparison.headers.duration')}</th>
                  <th className="p-4 text-gray-900 text-gray-50">{a('comparison.headers.safety')}</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr key={`${row.method}-${index}`} className="border-t border-gray-200 border-gray-700">
                    <td className="p-4 text-gray-900 text-gray-50">{row.method}</td>
                    <td className="p-4 text-gray-700 text-gray-200">{row.effectiveness}</td>
                    <td className="p-4 text-gray-700 text-gray-200">{row.duration}</td>
                    <td className="p-4 text-gray-700 text-gray-200">{row.safety}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="text-sm text-gray-600 text-gray-300 mt-4">{a('comparison.note')}</p>
          </div>
        </Container>
      </section>

      <section className="py-14 bg-white bg-gray-800">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-gray-900 text-gray-50 mb-6">
              {a('faq.headline')}
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              {faqItems.map((item, index) => (
                <AccordionItem key={`${item.question}-${index}`} value={`faq-${index}`} className="bg-gray-50 bg-gray-700 rounded-xl px-5 border-0">
                  <AccordionTrigger className="text-left text-gray-900 text-gray-50 hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 text-gray-200 pb-5">
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
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">{a('cta.headline')}</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">{a('cta.subheadline')}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
              <Link href={localizePath('/products/trial-size', locale)} className="inline-flex items-center justify-center bg-white bg-white text-electric-indigo text-electric-indigo font-bold rounded-lg px-6 py-3 hover:bg-gray-100 hover:bg-gray-100 transition-colors">
                {a('cta.secondaryButton')}
              </Link>
              <Link href={localizePath('/products', locale)} className="inline-flex items-center justify-center border-2 border-white font-bold rounded-lg px-6 py-3 hover:bg-white/10 transition-colors">
                {a('cta.button')}
              </Link>
            </div>
            <p className="text-sm opacity-90 flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>{a('cta.benefit2')}</span>
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
