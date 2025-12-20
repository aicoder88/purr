import { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '../../src/components/ui/container';
import { Button } from '../../src/components/ui/button';
import { useTranslation } from '../../src/lib/translation-context';
import { LocalizedMeta } from '../../src/components/seo/LocalizedMeta';
import { PageLayout } from '../../src/components/layout/PageLayout';
import { Breadcrumbs } from '../../src/components/layout/Breadcrumbs';
import { enStoryData } from '../../src/lib/page-data';
import { PRODUCT_PRICES } from '../../src/lib/pricing';
import {
  Heart,
  Users,
  ChevronRight,
  MapPin,
  Quote
} from 'lucide-react';

const OurStoryPage: NextPage = () => {
  const { locale } = useTranslation();
  const { values, team, stats } = enStoryData;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Our Story",
    "description": "The story behind Purrify cat litter additive and our mission to help cat owners create fresher, cleaner homes.",
    "url": `https://www.purrify.ca${locale === 'fr' ? '/fr' : ''}/about/our-story`,
    "mainEntity": {
      "@type": "Organization",
      "name": "Purrify",
      "description": "Canadian company creating innovative cat litter additives for odor elimination",
      "foundingDate": "2019",
      "founders": [
        {
          "@type": "Person",
          "name": "Mark Archer"
        }
      ]
    }
  };

  // Helper to get initials for team members without photos
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <LocalizedMeta
        title="Our Story - The Mission Behind Purrify Cat Litter Additive | Purrify"
        description="Learn about Purrify's founding story, mission, and the team dedicated to solving cat litter odor problems. Discover our commitment to pets, families, and the environment."
        keywords="Purrify story, company mission, cat litter innovation, pet care, environmental responsibility, Canadian company"
        canonicalPath="/about/our-story"
        ogTitle="Our Story - The Mission Behind Purrify"
        ogDescription="Discover the story behind Purrify and our mission to help cat owners create fresher, cleaner homes."
        structuredData={structuredData}
      />

      <PageLayout>
        {/* Custom Hero Section with Background Image */}
        <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/about/hero.png"
              alt="Happy cat in a sunlit living room"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          </div>

          <div className="relative z-10 w-full">
            <Container>
              <div className="max-w-4xl mx-auto text-center text-white dark:text-gray-100">
                <Breadcrumbs
                  items={[
                    { label: "About" },
                    { label: "Our Story" }
                  ]}
                  className="justify-center mb-8 text-white/80 dark:text-gray-200/80"
                />
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight drop-shadow-lg">
                  Our Story
                </h1>
                <p className="text-xl md:text-2xl font-light mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md text-white/90 dark:text-gray-100/90">
                  Born from a cat owner's frustration, grown into a mission to help families everywhere.
                </p>
              </div>
            </Container>
          </div>
        </div>

        {/* Mission Statement Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <Container>
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <div className="lg:w-1/2 relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                  <Image
                    src="/images/about/mission.png"
                    alt="Woman hugging a cat in a clean home"
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-electric-indigo/10 rounded-full blur-2xl -z-10" />
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-deep-coral/10 rounded-full blur-2xl -z-10" />
              </div>

              <div className="lg:w-1/2">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-6 h-6 text-deep-coral" />
                  <span className="text-electric-indigo font-semibold tracking-wider uppercase text-sm">Our Mission</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-gray-900 dark:text-gray-100 leading-tight">
                  Revolutionizing the <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-indigo to-deep-coral">Cat Ownership</span> Experience
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  We're on a mission to create innovative, fragrance-free products designed for use around pets that eliminate odors, reduce waste, and strengthen the bond between cats and their families.
                </p>

                <div className="relative bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border-l-4 border-electric-indigo shadow-sm">
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-electric-indigo/20" />
                  <p className="text-xl text-gray-700 dark:text-gray-200 italic font-medium mb-6 relative z-10">
                    "We believe every cat deserves a clean, comfortable environment, and every family deserves to enjoy their home without compromise."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden relative border-2 border-white shadow-md">
                      <Image
                        src="/images/about/mark-archer.jpg"
                        alt="Mark Archer"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">Mark Archer</p>
                      <p className="text-sm text-electric-indigo">Founder & CEO</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Company Values */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800/50 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-electric-indigo/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-deep-coral/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
          </div>

          <Container className="relative z-10">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-gray-900 dark:text-gray-100">
                Our Core Values
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                The guiding principles that drive every decision we make at Purrify.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <div key={value.title} className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-1">
                  <div className="w-14 h-14 bg-gradient-to-br from-electric-indigo to-electric-indigo-600 rounded-xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-7 h-7 text-white dark:text-gray-100" />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-4 text-gray-900 dark:text-gray-100 group-hover:text-electric-indigo transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <Container>
            <div className="text-center mb-16">
              <span className="text-deep-coral font-semibold tracking-wider uppercase text-sm mb-2 block">The People</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-gray-900 dark:text-gray-100">
                Meet the Team
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Passionate individuals dedicated to making pet ownership better for everyone.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member) => {
                const isMark = member.name === "Mark Archer";
                return (
                  <div key={member.name} className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full">
                    <div className="relative h-64 w-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                      {isMark ? (
                        <Image
                          src="/images/about/mark-archer.jpg"
                          alt={member.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 group-hover:from-electric-indigo/10 group-hover:to-deep-coral/10 transition-colors duration-300">
                          <div className="w-24 h-24 rounded-full bg-white dark:bg-gray-600 flex items-center justify-center shadow-inner mb-4">
                            <span className="text-3xl font-bold text-electric-indigo dark:text-electric-indigo-300">
                              {getInitials(member.name)}
                            </span>
                          </div>
                          <Users className="w-6 h-6 text-gray-400 dark:text-gray-500 absolute bottom-4 right-4 opacity-50" />
                        </div>
                      )}
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="text-xl font-heading font-bold mb-1 text-gray-900 dark:text-gray-100 group-hover:text-electric-indigo transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-deep-coral font-medium text-sm mb-4 uppercase tracking-wide">
                        {member.role}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 flex-grow leading-relaxed">
                        {member.bio}
                      </p>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm pt-4 border-t border-gray-100 dark:border-gray-700">
                        <MapPin className="w-4 h-4 mr-2 text-electric-indigo" />
                        {member.location}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-electric-indigo text-white dark:text-gray-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/pattern-bg.png')] opacity-10 mix-blend-overlay" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 dark:bg-gray-200/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-deep-coral/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />

          <Container className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/20 dark:divide-gray-400/20">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center px-4 py-4 md:py-0">
                  <div className="text-5xl font-heading font-bold text-white dark:text-gray-100 mb-2 drop-shadow-sm">
                    {stat.number}
                  </div>
                  <h3 className="font-heading text-lg font-semibold mb-2 text-white/90 dark:text-gray-100/90 uppercase tracking-wide">
                    {stat.label}
                  </h3>
                  <p className="text-white/70 dark:text-gray-200/70 text-sm max-w-[200px] mx-auto">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-electric-indigo/20 to-deep-coral/20 mix-blend-overlay" />
          </div>

          <Container className="relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-white dark:text-gray-100 leading-tight">
                Ready to Experience the Difference?
              </h2>
              <p className="text-xl text-gray-300 dark:text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
                Join thousands of happy cat owners who have transformed their homes with Purrify.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href={`${locale === 'fr' ? '/fr' : ''}/products/trial-size`}>
                  <Button
                    size="lg"
                    className="h-auto py-4 px-8 flex items-center justify-center gap-4 bg-electric-indigo hover:bg-electric-indigo-600 text-white dark:text-gray-100 font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 rounded-full group"
                  >
                    <div className="flex flex-col items-start text-left">
                      <span className="text-xl font-bold tracking-tight">
                        Try Purrify Today <span className="opacity-90 font-normal ml-1">- {PRODUCT_PRICES.trial.formatted}</span>
                      </span>
                      <span className="text-xs font-medium opacity-90 tracking-wide uppercase">
                        Trial size • Free Shipping Included
                      </span>
                    </div>
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href={`${locale === 'fr' ? '/fr' : ''}/contact`}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-full py-4 px-8 border-2 border-white/20 text-white dark:text-gray-100 hover:bg-white dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 hover:scale-105 transition-all duration-300 rounded-full text-lg font-medium backdrop-blur-sm"
                  >
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </PageLayout>
    </>
  );
};

export default OurStoryPage;
