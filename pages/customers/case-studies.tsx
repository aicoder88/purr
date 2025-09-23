import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Container } from '../../src/components/ui/container';
import { Button } from '../../src/components/ui/button';
import { useTranslation } from '../../src/lib/translation-context';
import { 
  User, 
  Calendar, 
  MapPin, 
  Quote,
  TrendingUp,
  Clock,
  DollarSign,
  Heart,
  ChevronRight,
  Home,
  Star,
  CheckCircle
} from 'lucide-react';

const CaseStudiesPage: NextPage = () => {
  const { locale } = useTranslation();

  const caseStudies = [
    {
      id: 1,
      name: "Sarah & Mittens",
      location: "Toronto, ON",
      cats: 1,
      duration: "6 months",
      challenge: "Strong odors in small apartment",
      solution: "Started with 17g trial size, now uses 60g monthly",
      results: [
        "95% reduction in litter box odors",
        "Extended litter life from 1 week to 3 weeks",
        "Saved $200+ annually on litter costs",
        "No more embarrassment when guests visit"
      ],
      quote: "I was skeptical at first, but Purrify completely transformed my small apartment. The difference was noticeable within hours, and now I can't imagine life without it.",
      image: "/optimized/testimonial-sarah.webp",
      beforeAfter: {
        before: "Daily complaints from neighbors, frequent litter changes, expensive odor sprays",
        after: "Odor-free apartment, 3x longer litter life, happy neighbors"
      },
      productUsed: "60g Regular Size",
      satisfaction: 5
    },
    {
      id: 2,
      name: "Mike's Multi-Cat Household",
      location: "Vancouver, BC",
      cats: 3,
      duration: "1 year",
      challenge: "Managing odors with 3 cats in busy household",
      solution: "Uses 140g large size every 6 weeks",
      results: [
        "Eliminated need for multiple litter boxes",
        "Reduced litter changes from daily to weekly",
        "Family stress levels decreased significantly",
        "Guests comfortable visiting again"
      ],
      quote: "With three cats, our house used to smell terrible despite constant cleaning. Purrify gave us our home back. It's been a game-changer for our entire family.",
      image: "/optimized/testimonial-mike.webp",
      beforeAfter: {
        before: "Multiple litter boxes, daily cleaning, overwhelming odors, social isolation",
        after: "Single litter box, weekly maintenance, odor-free home, active social life"
      },
      productUsed: "140g Large Size",
      satisfaction: 5
    },
    {
      id: 3,
      name: "Emma's Senior Cat Journey",
      location: "Montreal, QC",
      cats: 1,
      duration: "8 months",
      challenge: "Senior cat with health issues causing stronger odors",
      solution: "Regular use of 60g size with veterinary approval",
      results: [
        "Better monitoring of cat's health through cleaner environment",
        "Reduced stress for both cat and owner",
        "Maintained dignity for aging pet",
        "Easier medication administration in clean space"
      ],
      quote: "When my 16-year-old cat developed kidney issues, the odors became overwhelming. Purrify helped us maintain a clean, comfortable environment during his treatment.",
      image: "/optimized/testimonial-emma.webp",
      beforeAfter: {
        before: "Constant odors affecting quality of life, difficult health monitoring",
        after: "Clean environment supporting health management and comfort"
      },
      productUsed: "60g Regular Size",
      satisfaction: 5
    },
    {
      id: 4,
      name: "The Johnson Family",
      location: "Calgary, AB",
      cats: 2,
      duration: "2 years",
      challenge: "Kids' allergies worsened by litter dust and odors",
      solution: "Switched to natural litter + Purrify combination",
      results: [
        "Reduced children's allergy symptoms",
        "Eliminated need for harsh chemical cleaners",
        "Created healthier home environment",
        "Kids can now help with pet care"
      ],
      quote: "Our kids' allergies were getting worse, and we thought we might have to rehome our cats. Purrify let us keep our family together while creating a healthier home.",
      image: "/optimized/testimonial-johnson.webp",
      beforeAfter: {
        before: "Children's allergies, harsh chemicals, potential pet rehoming",
        after: "Healthy environment, natural solutions, happy family with pets"
      },
      productUsed: "60g Regular Size (2 units)",
      satisfaction: 5
    }
  ];

  const metrics = [
    {
      icon: TrendingUp,
      value: "94%",
      label: "Average Odor Reduction",
      description: "Based on customer surveys"
    },
    {
      icon: Clock,
      value: "3.2x",
      label: "Litter Life Extension",
      description: "Typical improvement"
    },
    {
      icon: DollarSign,
      value: "$180",
      label: "Average Annual Savings",
      description: "On litter and cleaning products"
    },
    {
      icon: Heart,
      value: "98%",
      label: "Customer Satisfaction",
      description: "Would recommend to others"
    }
  ];

  return (
    <>
      <Head>
        <title>Customer Case Studies - Real Purrify Success Stories | Purrify</title>
        <meta 
          name="description" 
          content="Read detailed case studies of how Purrify transformed real customers' lives. See before and after results, cost savings, and life improvements." 
        />
        <meta name="keywords" content="Purrify case studies, customer success stories, before after results, cat litter odor solutions, testimonials" />
        <link rel="canonical" href={`https://purrify.ca${locale === 'fr' ? '/fr' : ''}/customers/case-studies`} />
        
        {/* Open Graph */}
        <meta property="og:title" content="Customer Case Studies - Real Purrify Success Stories" />
        <meta property="og:description" content="Discover how Purrify transformed real customers' lives with detailed case studies showing before and after results." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://purrify.ca${locale === 'fr' ? '/fr' : ''}/customers/case-studies`} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "Customer Case Studies - Real Purrify Success Stories",
              "description": "Detailed case studies of how Purrify activated carbon litter additive transformed customers' lives.",
              "author": {
                "@type": "Organization",
                "name": "Purrify"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Purrify",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.purrify.ca/optimized/purrify-logo-text.webp"
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
              <Link href={`${locale === 'fr' ? '/fr' : ''}/customers/testimonials`} className="hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
                Customers
              </Link>
              <span>/</span>
              <span className="text-gray-900 dark:text-gray-100">Case Studies</span>
            </nav>
          </Container>
        </section>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-[#5B2EFF] to-[#FF3131]">
          <Container>
            <div className="text-center text-white dark:text-gray-100 max-w-4xl mx-auto">
              <User className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Real Customer Case Studies
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Detailed success stories showing how Purrify transformed real households
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`${locale === 'fr' ? '/fr' : ''}/products/trial-size`}>
                  <Button size="lg" className="bg-white dark:bg-gray-800 text-[#5B2EFF] hover:bg-gray-100 dark:bg-gray-700 font-bold">
                    Start Your Success Story - $4.99
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Success Metrics */}
        <section className="py-16 bg-[#E0EFC7]/30 dark:bg-gray-800/50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Proven Results Across All Case Studies
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Consistent improvements reported by our customers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <div key={index} className="text-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700">
                  <div className="w-16 h-16 bg-[#5B2EFF] rounded-full flex items-center justify-center mx-auto mb-4">
                    <metric.icon className="w-8 h-8 text-white dark:text-gray-100" />
                  </div>
                  <div className="text-3xl font-bold text-[#FF3131] mb-2">{metric.value}</div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    {metric.label}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {metric.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Case Studies */}
        <section className="py-16">
          <Container>
            <div className="space-y-16">
              {caseStudies.map((study, index) => (
                <div key={study.id} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 items-center`}>
                  {/* Image */}
                  <div className="lg:w-1/3">
                    <div className="bg-gradient-to-br from-[#5B2EFF]/10 to-[#FF3131]/10 rounded-2xl p-8 text-center">
                      <div className="w-24 h-24 bg-[#5B2EFF] rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="w-12 h-12 text-white dark:text-gray-100" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                        {study.name}
                      </h3>
                      <div className="flex items-center justify-center text-gray-600 dark:text-gray-300 mb-2">
                        <MapPin className="w-4 h-4 mr-1" />
                        {study.location}
                      </div>
                      <div className="flex items-center justify-center text-gray-600 dark:text-gray-300 mb-4">
                        <Calendar className="w-4 h-4 mr-1" />
                        Using Purrify for {study.duration}
                      </div>
                      <div className="flex justify-center">
                        {[...Array(study.satisfaction)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 dark:text-yellow-300 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:w-2/3">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-[#E0EFC7] dark:border-gray-700">
                      {/* Challenge & Solution */}
                      <div className="mb-6">
                        <h4 className="text-lg font-bold mb-2 text-red-600 dark:text-red-400">
                          The Challenge:
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {study.challenge}
                        </p>
                        
                        <h4 className="text-lg font-bold mb-2 text-green-600 dark:text-green-400">
                          The Solution:
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          {study.solution}
                        </p>
                      </div>

                      {/* Results */}
                      <div className="mb-6">
                        <h4 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
                          Results Achieved:
                        </h4>
                        <ul className="space-y-2">
                          {study.results.map((result, i) => (
                            <li key={i} className="flex items-center text-gray-600 dark:text-gray-300">
                              <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400 mr-3 flex-shrink-0" />
                              {result}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Quote */}
                      <div className="mb-6 p-4 bg-[#E0EFC7]/30 dark:bg-gray-700/30 rounded-lg relative">
                        <Quote className="w-8 h-8 text-[#5B2EFF] opacity-50 absolute top-2 left-2" />
                        <p className="text-gray-700 dark:text-gray-300 italic pl-8 pt-2">
                          "{study.quote}"
                        </p>
                      </div>

                      {/* Before & After */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500 dark:border-red-400">
                          <h5 className="font-bold text-red-700 dark:text-red-400 mb-2">Before Purrify:</h5>
                          <p className="text-sm text-red-600 dark:text-red-300">{study.beforeAfter.before}</p>
                        </div>
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500 dark:border-green-400">
                          <h5 className="font-bold text-green-700 dark:text-green-400 mb-2">After Purrify:</h5>
                          <p className="text-sm text-green-600 dark:text-green-300">{study.beforeAfter.after}</p>
                        </div>
                      </div>

                      {/* Product Used */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">Product Used:</span>
                          <span className="ml-2 font-semibold text-[#5B2EFF]">{study.productUsed}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-gray-500 dark:text-gray-400">Household:</span>
                          <span className="ml-2 font-semibold text-gray-900 dark:text-gray-100">
                            {study.cats} cat{study.cats > 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
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
                Ready to Write Your Own Success Story?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join 1,000+ satisfied customers who have transformed their homes with Purrify.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`${locale === 'fr' ? '/fr' : ''}/products/trial-size`}>
                  <Button size="lg" className="bg-white dark:bg-gray-800 text-[#5B2EFF] hover:bg-gray-100 dark:bg-gray-700 font-bold">
                    Start Your Trial - $4.99
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href={`${locale === 'fr' ? '/fr' : ''}/products/compare`}>
                  <Button size="lg" variant="outline" className="border-white dark:border-gray-600 text-gray-900 dark:text-white dark:text-gray-100 hover:bg-white dark:bg-gray-800 hover:text-gray-900 dark:text-gray-50 transition-colors">
                    Compare All Sizes
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Share Your Story */}
        <section className="py-16">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                Share Your Purrify Story
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Have you experienced amazing results with Purrify? We'd love to feature your success story and help other cat owners discover the difference.
              </p>
              <Link href={`${locale === 'fr' ? '/fr' : ''}/support/contact`}>
                <Button size="lg" className="bg-[#5B2EFF] hover:bg-[#5B2EFF]/90 text-white dark:text-gray-100">
                  Submit Your Story
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </Container>
        </section>

        {/* Related Pages */}
        <section className="py-16 bg-[#E0EFC7]/30 dark:bg-gray-800/50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                Explore More Customer Experiences
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href={`${locale === 'fr' ? '/fr' : ''}/customers/testimonials`} className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] transition-colors">
                    Customer Testimonials
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Read quick reviews and ratings from verified customers across Canada.
                  </p>
                </div>
              </Link>
              
              <Link href={`${locale === 'fr' ? '/fr' : ''}/learn/how-it-works`} className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] transition-colors">
                    How It Works
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Understand the science behind these amazing results and why Purrify is so effective.
                  </p>
                </div>
              </Link>
              
              <Link href={`${locale === 'fr' ? '/fr' : ''}/support/contact`} className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-[#E0EFC7] dark:border-gray-700 hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-[#5B2EFF] transition-colors">
                    Get Personal Advice
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Contact our team for personalized recommendations based on your specific situation.
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

export default CaseStudiesPage;
