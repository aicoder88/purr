import { NextPage } from 'next';
import Link from 'next/link';
import { Container } from '../../src/components/ui/container';
import { Button } from '../../src/components/ui/button';
import { useTranslation } from '../../src/lib/translation-context';
import { LocalizedMeta } from '../../src/components/seo/LocalizedMeta';
import { PageLayout } from '../../src/components/layout/PageLayout';
import { Breadcrumbs } from '../../src/components/layout/Breadcrumbs';
import { HeroSection } from '../../src/components/layout/HeroSection';
import { enStoryData } from '../../src/lib/page-data';
import { PRODUCT_PRICES } from '../../src/lib/pricing';
import { 
  Heart, 
  Users, 
  ChevronRight,
  MapPin,
  Mail
} from 'lucide-react';

const OurStoryPage: NextPage = () => {
  const { locale } = useTranslation();
  const { milestones, values, team, stats } = enStoryData;

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
        <Breadcrumbs 
          items={[
            { label: "About" },
            { label: "Our Story" }
          ]} 
        />

        <HeroSection
          icon={Heart}
          title="Our Story"
          subtitle="Born from a cat owner's frustration, grown into a mission to help families everywhere"
          description="What started as one person's struggle with persistent litter box odors has become a Canadian success story, helping hundreds of cat owners create fresher, cleaner homes."
        />

        {/* Mission Statement */}
        <section className="py-16">
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                Our Mission
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                To revolutionize the cat ownership experience by creating innovative, fragrance-free products designed for use around pets that eliminate odors, reduce waste, and strengthen the bond between cats and their families.
              </p>
              <div className="bg-[#E0EFC7]/30 dark:bg-gray-800/50 rounded-xl p-8">
                <p className="text-lg text-gray-700 dark:text-gray-300 italic">
                  &quot;We believe every cat deserves a clean, comfortable environment, and every family deserves to enjoy 
                  their home without compromise. That&apos;s why we&apos;re dedicated to creating products that work better, 
                  last longer, and respect our planet.&quot;
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  — Mark Archer, Founder & CEO
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Company Timeline */}
        <section className="py-16 bg-[#E0EFC7]/30 dark:bg-gray-800/50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Our Journey
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                From problem to solution: the Purrify timeline
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#5B2EFF] hidden lg:block"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`flex flex-col lg:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}>
                    {/* Content */}
                    <div className="lg:w-1/2">
                      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-[#5B2EFF] rounded-full flex items-center justify-center mr-4">
                            <milestone.icon className="w-6 h-6 text-white dark:text-gray-100" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-[#FF3131]">{milestone.year}</div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                              {milestone.title}
                            </h3>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Timeline dot */}
                    <div className="hidden lg:block w-6 h-6 bg-[#FF3131] rounded-full border-4 border-white dark:border-gray-900 z-10"></div>
                    
                    {/* Spacer */}
                    <div className="lg:w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Company Values */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Our Values
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div key={index} className="text-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700">
                  <div className="w-16 h-16 bg-[#5B2EFF] rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-white dark:text-gray-100" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-[#E0EFC7]/30 dark:bg-gray-800/50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                The passionate people behind Purrify&apos;s success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#5B2EFF] to-[#FF3131] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-white dark:text-gray-100" />
                  </div>
                  <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-gray-100">
                    {member.name}
                  </h3>
                  <p className="text-[#5B2EFF] font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {member.bio}
                  </p>
                  <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {member.location}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Our Impact
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                The difference we&apos;ve made together
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700">
                  <div className="text-4xl font-bold text-[#FF3131] mb-2">
                    {stat.number}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    {stat.label}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-[#5B2EFF] to-[#FF3131]">
          <Container>
            <div className="text-center text-white dark:text-gray-100 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Join Our Story
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Become part of the Purrify family and experience the difference that passion, 
                innovation, and genuine care can make in your home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`${locale === 'fr' ? '/fr' : ''}/products/trial-size`}>
                  <Button
                    size="lg"
                    className="flex items-center justify-center gap-3 bg-white text-[#5B2EFF] hover:bg-gray-100 dark:bg-white/90 dark:hover:bg-white dark:text-[#5B2EFF] font-bold shadow-lg"
                  >
                    <span className="flex flex-col leading-tight text-left">
                      <span className="text-base sm:text-lg">{`Try Purrify Today - ${PRODUCT_PRICES.trial.formatted}`}</span>
                      <span className="text-xs sm:text-sm font-semibold text-[#5B2EFF]/80">
                        Trial size • Single Use Sample
                      </span>
                    </span>
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href={`${locale === 'fr' ? '/fr' : ''}/support/contact`}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-gray-900 hover:bg-white hover:text-gray-900 dark:text-white dark:hover:bg-white dark:hover:text-[#5B2EFF] transition-colors"
                  >
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Contact Info */}
        <section className="py-16">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                Connect With Us
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                We love hearing from our customers and fellow cat lovers. 
                Share your story, ask questions, or just say hello!
              </p>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-[#E0EFC7] dark:border-gray-700">
                <div className="flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-[#5B2EFF] mr-3" />
                  <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    hello@purrify.com
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  We typically respond within 24 hours
                </p>
                <Link href={`${locale === 'fr' ? '/fr' : ''}/support/contact`}>
                  <Button className="bg-[#5B2EFF] hover:bg-[#5B2EFF]/90 text-white dark:text-gray-100">
                    Contact Us
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Related Pages */}
        <section className="py-16 bg-[#E0EFC7]/30 dark:bg-gray-800/50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Learn More About Purrify
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href={`${locale === 'fr' ? '/fr' : ''}/learn/how-it-works`} className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] transition-colors">
                    How It Works
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Discover the science and innovation behind our activated carbon technology.
                  </p>
                </div>
              </Link>
              
              <Link href={`${locale === 'fr' ? '/fr' : ''}/customers/testimonials`} className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] transition-colors">
                    Customer Stories
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Read real experiences from cat owners who&apos;ve transformed their homes with Purrify.
                  </p>
                </div>
              </Link>
              
              <Link href={`${locale === 'fr' ? '/fr' : ''}/products/compare`} className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] transition-colors">
                    Find Your Perfect Size
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Compare our product options and find the ideal Purrify size for your household.
                  </p>
                </div>
              </Link>
            </div>
          </Container>
        </section>
      </PageLayout>
    </>
  );
};

export default OurStoryPage;
