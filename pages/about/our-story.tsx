import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Container } from '../../src/components/ui/container';
import { Button } from '../../src/components/ui/button';
import { useTranslation } from '../../src/lib/translation-context';
import { 
  Heart, 
  Users, 
  Award, 
  Target,
  Lightbulb,
  Leaf,
  ChevronRight,
  Home,
  MapPin,
  Mail,
  Shield,
  Zap 
} from 'lucide-react';

const OurStoryPage: NextPage = () => {
  // Translation hook available if needed in the future
  const { locale } = useTranslation();

  const milestones = [
    {
      year: "2008",
      title: "The Problem Discovered",
      description: "Our founder, a cat owner with multiple pets, struggled with persistent litter box odors despite trying every product on the market.",
      icon: Lightbulb
    },
    {
      year: "2008-2009",
      title: "Research & Development",
      description: "Partnered with material scientists to develop an activated carbon formula specifically designed for cat litter odor elimination.",
      icon: Target
    },
    {
      year: "2009",
      title: "First Prototype",
      description: "Created the first Purrify prototype and tested it with local cat owners. Results exceeded all expectations with 95% odor reduction.",
      icon: Zap
    },
    {
      year: "2022",
      title: "Product Launch",
      description: "Officially launched Purrify across Canada, helping thousands of cat owners create fresher, cleaner homes.",
      icon: Award
    },
    {
      year: "2023",
      title: "Expansion & Growth",
      description: "Expanded product line with multiple sizes and began international shipping to serve cat owners worldwide.",
      icon: Users
    },
    {
      year: "2024",
      title: "Sustainability Focus",
      description: "Launched eco-friendly packaging and carbon-neutral shipping, reinforcing our commitment to environmental responsibility.",
      icon: Leaf
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Pet-First Philosophy",
      description: "Every decision we make considers the health and happiness of cats and their families first."
    },
    {
      icon: Shield,
      title: "Safety & Quality",
      description: "All products undergo rigorous testing to ensure they're safe for pets, families, and the environment."
    },
    {
      icon: Leaf,
      title: "Environmental Responsibility",
      description: "We're committed to sustainable practices and reducing our environmental footprint at every step."
    },
    {
      icon: Users,
      title: "Customer Success",
      description: "Our success is measured by the satisfaction and improved quality of life of our customers and their pets."
    }
  ];

  const team = [
    {
      name: "Mark Smith",
      role: "Founder & CEO",
      bio: "A lifelong cat lover with a background in environmental science. Mark's personal struggle with litter box odors led to the creation of Purrify.",
      location: "Toronto, ON"
    },
    {
      name: "Dr. Michael Rodriguez",
      role: "Chief Science Officer",
      bio: "Materials scientist with 15+ years experience in activated carbon technology. Leads our product development and quality assurance.",
      location: "Vancouver, BC"
    },
    {
      name: "Anthony Thambiah",
      role: "Head of Customer Experience",
      bio: "Former veterinary technician passionate about improving the lives of pets and their families through better products.",
      location: "Montreal, QC"
    },
    {
      name: "David Kim",
      role: "Operations Director",
      bio: "Supply chain expert ensuring every Purrify order is processed quickly and delivered reliably across Canada and beyond.",
      location: "Calgary, AB"
    }
  ];

  const stats = [
    {
      number: "1,000+",
      label: "Happy Customers",
      description: "Cat owners across Canada and internationally"
    },
    {
      number: "98%",
      label: "Satisfaction Rate",
      description: "Customers who would recommend Purrify"
    },
    {
      number: "10k+",
      label: "Litter Changes Improved",
      description: "Estimated litter box changes made better"
    },
    {
      number: "50T",
      label: "CO2 Offset",
      description: "Through carbon-neutral shipping program"
    }
  ];

  return (
    <>
      <Head>
        <title>Our Story - The Mission Behind Purrify Cat Litter Additive | Purrify</title>
        <meta 
          name="description" 
          content="Learn about Purrify's founding story, mission, and the team dedicated to solving cat litter odor problems. Discover our commitment to pets, families, and the environment." 
        />
        <meta name="keywords" content="Purrify story, company mission, cat litter innovation, pet care, environmental responsibility, Canadian company" />
        <link rel="canonical" href={`https://purrify.com${locale === 'fr' ? '/fr' : ''}/about/our-story`} />
        
        {/* Open Graph */}
        <meta property="og:title" content="Our Story - The Mission Behind Purrify" />
        <meta property="og:description" content="Discover the story behind Purrify and our mission to help cat owners create fresher, cleaner homes." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://purrify.com${locale === 'fr' ? '/fr' : ''}/about/our-story`} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AboutPage",
              "name": "Our Story",
              "description": "The story behind Purrify cat litter additive and our mission to help cat owners create fresher, cleaner homes.",
              "url": `https://purrify.com${locale === 'fr' ? '/fr' : ''}/about/our-story`,
              "mainEntity": {
                "@type": "Organization",
                "name": "Purrify",
                "description": "Canadian company creating innovative cat litter additives for odor elimination",
                "foundingDate": "2019",
                "founders": [
                  {
                    "@type": "Person",
                    "name": "Sarah Chen"
                  }
                ]
              }
            })
          }}
        />
      </Head>

      <main className="min-h-screen bg-[#FFFFF5] dark:bg-gray-900 transition-colors duration-300">
        {/* Breadcrumb Navigation */}
        <section className="py-4 border-b border-[#E0EFC7] dark:border-gray-800">
          <Container>
            <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Link href={locale === 'fr' ? '/fr' : '/'} className="hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
                <Home className="w-4 h-4" />
              </Link>
              <span>/</span>
              <span className="text-gray-900 dark:text-gray-100">About</span>
              <span>/</span>
              <span className="text-gray-900 dark:text-gray-100">Our Story</span>
            </nav>
          </Container>
        </section>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-[#5B2EFF] to-[#FF3131]">
          <Container>
            <div className="text-center text-white max-w-4xl mx-auto">
              <Heart className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Our Story
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Born from a cat owner&apos;s frustration, grown into a mission to help families everywhere
              </p>
              <p className="text-lg opacity-80 max-w-2xl mx-auto">
                What started as one person&apos;s struggle with persistent litter box odors has become a Canadian success story, 
                helping over 50,000 cat owners create fresher, cleaner homes.
              </p>
            </div>
          </Container>
        </section>

        {/* Mission Statement */}
        <section className="py-16">
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                Our Mission
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                To revolutionize the cat ownership experience by creating innovative, safe, and environmentally responsible 
                products that eliminate odors, reduce waste, and strengthen the bond between cats and their families.
              </p>
              <div className="bg-[#E0EFC7]/30 dark:bg-gray-800/50 rounded-xl p-8">
                <p className="text-lg text-gray-700 dark:text-gray-300 italic">
                  &quot;We believe every cat deserves a clean, comfortable environment, and every family deserves to enjoy 
                  their home without compromise. That&apos;s why we&apos;re dedicated to creating products that work better, 
                  last longer, and respect our planet.&quot;
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  — Sarah Chen, Founder & CEO
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
                            <milestone.icon className="w-6 h-6 text-white" />
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
                    <value.icon className="w-8 h-8 text-white" />
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
                    <Users className="w-10 h-10 text-white" />
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
            <div className="text-center text-white max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Join Our Story
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Become part of the Purrify family and experience the difference that passion, 
                innovation, and genuine care can make in your home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`${locale === 'fr' ? '/fr' : ''}/products/trial-size`}>
                  <Button size="lg" className="bg-white text-[#5B2EFF] hover:bg-gray-100 font-bold">
                    Try Purrify Today - $6.99
                    Trial size - Single Use Sample

<ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href={`${locale === 'fr' ? '/fr' : ''}/support/contact`}>
                  <Button size="lg" variant="outline" className="border-white text-gray-900 dark:text-white hover:bg-white hover:text-gray-900 transition-colors">
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
                  <Button className="bg-[#5B2EFF] hover:bg-[#5B2EFF]/90 text-white">
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
      </main>
    </>
  );
};

export default OurStoryPage;
