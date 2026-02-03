'use client';

import Link from 'next/link';
import Image from 'next/image';
import { RelatedContent } from '@/components/seo/RelatedContent';
import { HubSpokeNav } from '@/components/seo/HubSpokeNav';
import { formatProductPrice } from '../../../src/lib/pricing';
import { Container } from '../../../src/components/ui/container';
import { Card, CardContent } from '../../../src/components/ui/card';
import { Badge } from '../../../src/components/ui/badge';
import {
  AlertTriangle,
  Lightbulb,
  Sparkles,
  Cat,
  Zap,
  Home,
  ChevronRight,
} from 'lucide-react';
import { useFormatter } from 'next-intl';

export default function HowToUseDeodorizerClient() {
  const heroImage = '/optimized/cat-litter-usage-ghibli-828w.webp';
  const format = useFormatter();

  return (
    <main className="min-h-screen bg-[#FFFFF5] dark:bg-gray-900 transition-colors duration-300">
      {/* Breadcrumb Navigation */}
      <section className="py-4 border-b border-[#E0EFC7] dark:border-gray-800">
        <Container>
          <nav aria-label="Breadcrumb" className="flex items-center text-sm">
            <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
              <Home className="w-4 h-4" />
              <span className="sr-only">Home</span>
            </Link>
            <ChevronRight className="w-4 h-4 mx-1 text-gray-400 dark:text-gray-500" />
            <Link href="/learn" className="text-gray-500 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
              Learn
            </Link>
            <ChevronRight className="w-4 h-4 mx-1 text-gray-400 dark:text-gray-500" />
            <span aria-current="page" className="font-medium text-gray-900 dark:text-gray-100">How to Use</span>
          </nav>
        </Container>
      </section>

      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full -z-10 bg-gradient-to-b from-brand-green-light/20 to-transparent dark:from-brand-purple/10 dark:to-transparent" />
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-12">
            <Badge className="mb-4 px-4 py-1.5 bg-brand-green-light text-brand-green font-bold text-sm tracking-wide dark:bg-brand-green/20 border-none">
              EDUCATIONAL GUIDE
            </Badge>
            <h1 className="font-heading text-4xl md:text-6xl font-black text-gray-900 dark:text-gray-50 mb-6 leading-[1.1]">
              Master the Art of <span className="text-brand-purple italic">Freshness</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto font-medium">
              Your complete guide to using activated carbon in your cat&apos;s litter box.
              Transform odor control with just a few simple steps.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="relative bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800">
              <div className="grid md:grid-cols-2">
                <div className="relative h-64 md:h-full min-h-[400px]">
                  <Image
                    src={heroImage}
                    alt="Happy cat in a fresh environment"
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center bg-brand-cream/50 dark:bg-gray-800/50">
                  <div className="inline-flex items-center gap-2 text-brand-green font-bold mb-4">
                    <Zap size={20} className="fill-current" />
                    <span>IMMEDIATE RESULTS</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Quick Start Guide</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-brand-green text-white dark:text-white flex items-center justify-center flex-shrink-0 font-bold">1</div>
                      <p className="text-gray-700 dark:text-gray-200">Sprinkle 1-2 tablespoons evenly over your existing litter.</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-brand-green text-white dark:text-white flex items-center justify-center flex-shrink-0 font-bold">2</div>
                      <p className="text-gray-700 dark:text-gray-200">Mix gently into the top layer of litter, focusing on your cat&apos;s favorite spots.</p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-brand-green text-white dark:text-white flex items-center justify-center flex-shrink-0 font-bold">3</div>
                      <p className="text-gray-700 dark:text-gray-200">Enjoy instant odor control that lasts for weeks.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hub-Spoke Navigation */}
          <div className="max-w-5xl mx-auto mt-12">
            <HubSpokeNav clusterId="product-comparison" currentUrl="/learn/how-to-use-deodorizer" />
          </div>
        </Container>
      </section>

      <section className="py-20 bg-white dark:bg-gray-950">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">The Step-by-Step Method</h2>
            <div className="w-24 h-1.5 bg-brand-purple mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-none shadow-xl bg-gray-50 dark:bg-gray-900/50" id="step-1">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-brand-purple/10 text-brand-purple rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-2xl font-black">01</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Clean the Slate</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  Start with a clean litter box. Remove all waste and clumps. If doing a deep clean, wash the box with mild soap.
                </p>
                <Badge variant="outline" className="text-brand-purple border-brand-purple/20 bg-brand-purple/5">
                  PRO TIP: Fresh litter = Max Impact
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl bg-gray-50 dark:bg-gray-900/50" id="step-2">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-brand-green/10 text-brand-green rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-2xl font-black">02</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Precise Measurement</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  Use 1-2 tablespoons for a standard box. Multi-cat homes may need up to 3 tablespoons.
                </p>
                <div className="flex gap-2">
                  <Badge className="bg-brand-green/20 text-brand-green border-none">1 Cat: 1-2 Tbsp</Badge>
                  <Badge className="bg-brand-green/20 text-brand-green border-none">2+ Cats: 3 Tbsp</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl bg-gray-50 dark:bg-gray-900/50" id="step-3">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-brand-red/10 text-brand-red rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-2xl font-black">03</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Strategic Distribution</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  Sprinkle evenly across the litter surface. Corners and edges where odors concentrate benefit most.
                </p>
                <p className="text-sm font-bold text-brand-red/80 flex items-center gap-1">
                  <Cat size={16} /> Target Where Your Cat Digs Most
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl flex items-center justify-center">
                  <AlertTriangle size={24} />
                </div>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white">Common Mistakes</h2>
              </div>
              <div className="space-y-4">
                {[
                  { title: "Using Too Much", desc: "Excessive application doesn't improve odor control but can create dusty conditions." },
                  { title: "Applying to Dirty Litter", desc: "Always scoop first. Adding additive to soiled litter reduces effectiveness." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-red-50 dark:border-red-900/30">
                    <span className="text-red-500 dark:text-red-400 font-black text-lg">✕</span>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-brand-green-light text-brand-green rounded-xl flex items-center justify-center">
                  <Lightbulb size={24} />
                </div>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white">Pro Mastery Tips</h2>
              </div>
              <div className="space-y-4">
                {[
                  { title: "Know Your Cat's Habits", desc: "Cats dig in the same spots. Apply extra product to those areas of the litter box.", icon: Cat },
                  { title: "The 24h Window", desc: "Expecting guests? Apply the additive the night before for maximum freshness.", icon: Sparkles }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-brand-green-light/50 dark:border-brand-green/30">
                    <item.icon className="text-brand-green" size={24} />
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-brand-purple -z-10" />
        <Container>
          <h2 className="text-4xl md:text-6xl font-black text-white dark:text-white mb-6">Experience True Neutrality</h2>
          <p className="text-xl text-white/80 dark:text-white/80 mb-10 max-w-2xl mx-auto font-medium">
            Join 10,000+ happy Canadians who have reclaimed their homes from litter box odors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products/trial-size"
              className="px-12 py-5 bg-white dark:bg-white text-brand-purple rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl"
            >
              Get Trial Size
            </Link>
          </div>
        </Container>
      </section>

      <div className="bg-white dark:bg-gray-950">
        <RelatedContent currentUrl="/learn/how-to-use-deodorizer" />
      </div>
    </main>
  );
}
