import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Image from 'next/image';
import { RelatedArticles } from '../../src/components/blog/RelatedArticles';
import { useTranslation } from '../../src/lib/translation-context';
import { buildLanguageAlternates, getLocalizedUrl } from '../../src/lib/seo-utils';
import { formatProductPrice } from '../../src/lib/pricing';
import { Container } from '../../src/components/ui/container';
import { Card, CardContent } from '../../src/components/ui/card';
import { Badge } from '../../src/components/ui/badge';
import {
  CheckCircle2,
  Info,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Sparkles,
  MousePointer2,
  Cat,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function HowToUseDeodorizer() {
  const { locale } = useTranslation();
  const pageTitle = 'How to Use Cat Litter Deodorizer Additive - Complete Step-by-Step Guide';
  const pageDescription = 'Learn how to use cat litter deodorizer additive properly. Step-by-step instructions, common mistakes to avoid, and pro tips for maximum odor control effectiveness.';
  const canonicalPath = '/learn/how-to-use-deodorizer';
  const canonicalUrl = getLocalizedUrl(canonicalPath, locale);
  const languageAlternates = buildLanguageAlternates(canonicalPath);

  const heroImage = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=2000&q=90';

  return (
    <>
      <NextSeo
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        languageAlternates={languageAlternates}
        openGraph={{
          type: 'article',
          url: canonicalUrl,
          title: pageTitle,
          description: pageDescription,
          images: [
            {
              url: heroImage,
              width: 1200,
              height: 630,
              alt: 'Step-by-step guide showing how to use cat litter deodorizer additive',
            },
          ],
        }}
      />

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
              Everything you need to know about using cat litter deodorizer like a pro.
              Say goodbye to odors and hello to a pristine home.
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
                      <p className="text-gray-700 dark:text-gray-200">Mix gently into the top layer focusing on high-traffic areas.</p>
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
        </Container>
      </section>

      <section className="py-20 bg-white dark:bg-gray-950">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">The Step-by-Step Method</h2>
            <div className="w-24 h-1.5 bg-brand-purple mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-none shadow-xl bg-gray-50 dark:bg-gray-900/50">
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

            <Card className="border-none shadow-xl bg-gray-50 dark:bg-gray-900/50">
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

            <Card className="border-none shadow-xl bg-gray-50 dark:bg-gray-900/50">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-brand-red/10 text-brand-red rounded-2xl flex items-center justify-center mb-6">
                  <span className="text-2xl font-black">03</span>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Strategic Distribution</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  Sprinkle evenly across the surface. Focus extra attention on corners and edges.
                </p>
                <p className="text-sm font-bold text-brand-red/80 flex items-center gap-1">
                  <MousePointer2 size={16} /> Focus on High-Traffic Zones
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
                  { title: "High-Traffic Target", desc: "Cats are habitual. Apply more product where they prefer to go.", icon: MousePointer2 },
                  { title: "The 24h Window", desc: "If guests are coming, apply the additive the night before.", icon: Sparkles }
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
              Get Trial Size - {formatProductPrice('trial', locale)}
            </Link>
          </div>
        </Container>
      </section>

      <div className="bg-white dark:bg-gray-950">
        <RelatedArticles currentPath="/learn/how-to-use-deodorizer" />
      </div>
    </>
  );
}
