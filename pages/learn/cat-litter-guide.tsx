import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Container } from '../../src/components/ui/container';
import { Button } from '../../src/components/ui/button';
import { useTranslation } from '../../src/lib/translation-context';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Droplets, 
  Shield, 
  Heart,
  ChevronRight,
  Home,
  BookOpen,
  Star
} from 'lucide-react';

const CatLitterGuidePage: NextPage = () => {
  // const { t, locale } = useTranslation();

  const litterTypes = [
    {
      name: "Clay Litter",
      pros: ["Affordable", "Good absorption", "Easy to find"],
      cons: ["Dusty", "Heavy", "Not eco-friendly", "Poor odor control"],
      rating: 2
    },
    {
      name: "Clumping Clay",
      pros: ["Forms solid clumps", "Easy scooping", "Better odor control"],
      cons: ["Still dusty", "Heavy", "Can be tracked", "Not biodegradable"],
      rating: 3
    },
    {
      name: "Crystal/Silica",
      pros: ["Excellent absorption", "Low dust", "Long-lasting"],
      cons: ["Expensive", "Sharp crystals", "Not flushable"],
      rating: 3
    },
    {
      name: "Natural/Biodegradable",
      pros: ["Eco-friendly", "Low dust", "Flushable options"],
      cons: ["More expensive", "Variable quality", "May need frequent changes"],
      rating: 4
    },
    {
      name: "Any Litter + Purrify",
      pros: ["Superior odor elimination", "Extends litter life", "Works with any type", "Eco-friendly additive"],
      cons: ["Additional cost (but saves money overall)"],
      rating: 5
    }
  ];

  const maintenanceTips = [
    {
      icon: Clock,
      title: "Daily Scooping",
      description: "Remove solid waste daily to maintain freshness and prevent odor buildup."
    },
    {
      icon: Droplets,
      title: "Weekly Deep Clean",
      description: "Replace all litter weekly and wash the box with mild soap and water."
    },
    {
      icon: Shield,
      title: "Use Purrify",
      description: "Add Purrify activated carbon to eliminate odors and extend litter life by up to 50%."
    },
    {
      icon: Heart,
      title: "Monitor Health",
      description: "Watch for changes in your cat's bathroom habits as they can indicate health issues."
    }
  ];

  const commonProblems = [
    {
      problem: "Strong Odors",
      solution: "Add Purrify activated carbon additive for superior odor elimination",
      link: "/products/trial-size"
    },
    {
      problem: "Litter Tracking",
      solution: "Use a larger litter mat and consider switching to low-tracking litter types",
      link: null
    },
    {
      problem: "Dust Issues",
      solution: "Choose low-dust litters and pour slowly to minimize airborne particles",
      link: null
    },
    {
      problem: "Frequent Changes",
      solution: "Purrify extends litter life by neutralizing odors, reducing waste and costs",
      link: "/learn/how-it-works"
    }
  ];

  return (
    <>
      <Head>
        <title>Complete Cat Litter Guide - Types, Tips & Best Practices | Purrify</title>
        <meta 
          name="description" 
          content="Comprehensive guide to cat litter types, maintenance tips, and solving common problems. Learn how to choose the best litter for your cat and keep it fresh longer." 
        />
        <meta name="keywords" content="cat litter guide, litter types, cat care, odor control, litter maintenance, Purrify" />
        <link rel="canonical" href={`https://purrify.com${locale === 'fr' ? '/fr' : ''}/learn/cat-litter-guide`} />
        
        {/* Open Graph */}
        <meta property="og:title" content="Complete Cat Litter Guide - Types, Tips & Best Practices" />
        <meta property="og:description" content="Everything you need to know about cat litter - from choosing the right type to maintenance tips and problem-solving." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://purrify.com${locale === 'fr' ? '/fr' : ''}/learn/cat-litter-guide`} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "Complete Cat Litter Guide - Types, Tips & Best Practices",
              "description": "Comprehensive guide to cat litter types, maintenance tips, and solving common problems.",
              "author": {
                "@type": "Organization",
                "name": "Purrify"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Purrify",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://purrify.com/optimized/purrify-logo-text.webp"
                }
              },
              "datePublished": "2024-01-01",
              "dateModified": "2024-01-01"
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
              <Link href={locale === 'fr' ? '/fr/learn/how-it-works' : '/learn/how-it-works'} className="hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
                Learn
              </Link>
              <span>/</span>
              <span className="text-gray-900 dark:text-gray-100">Cat Litter Guide</span>
            </nav>
          </Container>
        </section>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-[#5B2EFF] to-[#FF3131]">
          <Container>
            <div className="text-center text-white max-w-4xl mx-auto">
              <BookOpen className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                The Complete Cat Litter Guide
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Everything you need to know about choosing, using, and maintaining cat litter for a happy, healthy home
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`${locale === 'fr' ? '/fr' : ''}/products/trial-size`}>
                  <Button size="lg" className="bg-white text-[#5B2EFF] hover:bg-gray-100 font-bold">
                    Try Purrify - $4.99
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Litter Types Comparison */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Cat Litter Types Compared
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Not all litters are created equal. Here's how different types stack up against each other.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {litterTypes.map((litter, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      {litter.name}
                    </h3>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${i < litter.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">Pros:</h4>
                      <ul className="space-y-1">
                        {litter.pros.map((pro, i) => (
                          <li key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">Cons:</h4>
                      <ul className="space-y-1">
                        {litter.cons.map((con, i) => (
                          <li key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <XCircle className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Maintenance Tips */}
        <section className="py-16 bg-[#E0EFC7]/30 dark:bg-gray-800/50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Essential Maintenance Tips
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Keep your litter box fresh and your cat happy with these proven maintenance practices.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {maintenanceTips.map((tip, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-[#5B2EFF] rounded-full flex items-center justify-center mx-auto mb-4">
                    <tip.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                    {tip.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {tip.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Common Problems & Solutions */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Common Problems & Solutions
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Facing litter box issues? Here are the most common problems and their proven solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {commonProblems.map((item, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700">
                  <h3 className="text-xl font-bold mb-3 text-red-600 dark:text-red-400">
                    Problem: {item.problem}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    <span className="font-semibold text-green-600 dark:text-green-400">Solution:</span> {item.solution}
                  </p>
                  {item.link && (
                    <Link href={`${locale === 'fr' ? '/fr' : ''}${item.link}`}>
                      <Button variant="outline" size="sm">
                        Learn More
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  )}
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
                Ready to Upgrade Your Litter Box Experience?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Try Purrify's activated carbon additive and transform any litter into an odor-eliminating powerhouse.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`${locale === 'fr' ? '/fr' : ''}/products/trial-size`}>
                  <Button size="lg" className="bg-white text-[#5B2EFF] hover:bg-gray-100 font-bold">
                    Start with Trial Size - $4.99
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href={`${locale === 'fr' ? '/fr' : ''}/customers/testimonials`}>
                  <Button size="lg" variant="outline" className="border-white text-gray-900 dark:text-white hover:bg-white hover:text-gray-900 transition-colors">
                    Read Success Stories
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Related Articles */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Related Articles
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href={`${locale === 'fr' ? '/fr' : ''}/learn/how-it-works`} className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] transition-colors">
                    How Purrify Works
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Learn the science behind activated carbon and how it eliminates odors at the molecular level.
                  </p>
                </div>
              </Link>
              
              <Link href={`${locale === 'fr' ? '/fr' : ''}/customers/testimonials`} className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] transition-colors">
                    Customer Success Stories
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Read real experiences from cat owners who transformed their litter boxes with Purrify.
                  </p>
                </div>
              </Link>
              
              <Link href={`${locale === 'fr' ? '/fr' : ''}/support/contact`} className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] transition-colors">
                    Need Help?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Have questions about litter types or Purrify? Our team is here to help you find the perfect solution.
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

export default CatLitterGuidePage;
