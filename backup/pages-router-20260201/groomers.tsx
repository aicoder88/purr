import { NextSeo } from 'next-seo';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useTranslation } from '../src/lib/translation-context';
import {
  Scissors,
  TrendingUp,
  DollarSign,
  Package,
  Users,
  Award,
  Phone,
  Mail,
  FileText,
  CheckCircle,
  Star,
  Sparkles,
  MessageCircle,
  ShoppingBag,
  ChevronRight,
  Home
} from 'lucide-react';
import { useCallback, useState } from 'react';
import { CONTACT_INFO, PHONE_MESSAGING, SITE_NAME } from '../src/lib/constants';
import { formatProductPrice } from '../src/lib/pricing';
import { useEnhancedSEO } from '../src/hooks/useEnhancedSEO';

export default function GroomersPage() {
  const { t, locale } = useTranslation();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleFormSubmit = useCallback(() => setFormSubmitted(true), []);

  // Get groomers translations with fallbacks
  const groomers = t.groomers || {
    seo: {
      pageTitle: 'For Pet Groomers | Add Purrify to Your Services',
      description: 'Pet groomers: offer more value with Purrify. Easy add-on sale, wholesale pricing, and retail display materials included.',
      openGraphAlt: 'Pet Groomer Partnership',
      keywords: 'pet groomer wholesale, grooming salon products, cat litter additive wholesale, groomer retail partnership'
    },
    hero: {
      badge: 'Groomer Partnership',
      title: 'Offer More Value - Add Purrify to Your Services',
      subtitle: 'New Revenue Stream',
      description: 'Cat owners ask about litter smell during grooming appointments. Now you can recommend and sell a proven solution - additional revenue with every appointment.'
    },
    opportunity: {
      title: 'The Opportunity for Groomers',
      intro: 'Every cat grooming appointment is an opportunity to solve your clients\' #1 complaint.',
      points: {
        clientsAsk: {
          title: 'Clients Already Ask',
          description: 'Cat owners frequently mention litter box odor during appointments. Now you have a solution to recommend.'
        },
        expertPosition: {
          title: 'Position as the Expert',
          description: 'When you recommend Purrify, you become the trusted advisor for all their cat care needs.'
        },
        repeatRevenue: {
          title: 'Repeat Purchase Potential',
          description: 'Purrify is a consumable product. Clients return monthly, creating predictable recurring revenue.'
        },
        easyDemo: {
          title: 'Demonstrable Results',
          description: 'Show clients the difference right in your salon. One demo creates a customer for life.'
        }
      }
    },
    addOnSale: {
      title: 'Easy Add-On Sale',
      description: 'Purrify sells itself during appointments',
      points: [
        'Quick 30-second explanation during grooming',
        'Natural conversation starter about cat care',
        'Clients already trust your recommendations',
        'No pressure sales - product speaks for itself'
      ]
    },
    partnerBenefits: {
      title: 'Partnership Benefits',
      benefits: {
        wholesale: {
          title: 'Wholesale Pricing',
          description: 'Premium margins on every sale. Volume discounts available.'
        },
        display: {
          title: 'Retail Display Materials',
          description: 'Free counter displays, shelf talkers, and promotional materials.'
        },
        training: {
          title: 'Product Training',
          description: 'Quick training on product benefits so you can speak confidently to clients.'
        },
        tracking: {
          title: 'Referral Tracking',
          description: 'Track your sales and commissions with our partner portal.'
        }
      }
    },
    retailPackage: {
      title: 'Your Groomer Retail Package',
      subtitle: 'Everything you need to start selling',
      includes: [
        'Counter display stand',
        'Sample pouches for demos',
        'Branded promotional materials',
        'Product training guide',
        'Marketing support'
      ]
    },
    testimonials: {
      title: 'What Groomers Say',
      items: [
        {
          quote: 'My clients love that I have a solution for their litter smell problems. It\'s an easy conversation during appointments.',
          author: 'Sarah\'s Cat Grooming',
          location: 'Toronto, ON',
          result: '15+ units/month'
        },
        {
          quote: 'Purrify practically sells itself. One demo and clients are hooked. Great additional revenue stream.',
          author: 'Pawfect Grooming Salon',
          location: 'Vancouver, BC',
          result: '25+ units/month'
        }
      ]
    },
    cta: {
      primary: 'Start Retailing Purrify',
      secondary: 'Request Information'
    },
    form: {
      title: 'Partner Inquiry',
      businessName: 'Business Name',
      contactName: 'Contact Name',
      email: 'Email',
      phone: 'Phone',
      location: 'Business Location',
      monthlyClients: 'Average Monthly Cat Clients',
      interest: 'Tell us about your interest in Purrify',
      submit: 'Submit Inquiry',
      success: {
        title: 'Inquiry Received!',
        message: 'Thank you for your interest! Our partner team will contact you within 24-48 hours to discuss next steps.'
      }
    },
    contact: {
      title: 'Questions? Let\'s Talk!',
      description: 'Our groomer partnership team is here to help you add a profitable product to your business.',
      callUs: 'Call Us',
      emailUs: 'Email Us',
      moreInfo: 'Need More Information?',
      requestGuide: 'Request our detailed groomer partnership guide'
    }
  };

  // Product pricing
  const trialPrice = formatProductPrice('trial', locale);
  const standardPrice = formatProductPrice('standard', locale);
  const familyPrice = formatProductPrice('family', locale);

  // Enhanced SEO with organization schema and breadcrumbs
  const { nextSeoProps, schema, breadcrumb } = useEnhancedSEO({
    path: '/groomers',
    title: `${SITE_NAME} - ${groomers.seo.pageTitle}`,
    description: groomers.seo.description,
    targetKeyword: 'pet groomer partnership',
    keywords: groomers.seo.keywords?.split(', ') || [
      'pet groomer wholesale',
      'grooming salon products',
      'cat litter additive wholesale',
      'groomer retail partnership'
    ],
    schemaType: 'organization',
    schemaData: {
      description: 'Premium activated carbon cat litter additive manufacturer offering wholesale partnership programs for pet groomers',
      contactPoint: {
        telephone: CONTACT_INFO.phone,
        type: 'sales',
        email: 'partners@purrify.ca'
      }
    },
  });

  return (
    <>
      <NextSeo {...nextSeoProps} />

      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}

      <main className="min-h-screen bg-white dark:bg-gray-900">
        {/* Breadcrumb Navigation */}
        {breadcrumb && breadcrumb.items.length > 1 && (
          <nav
            aria-label="Breadcrumb"
            className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700"
          >
            <div className="max-w-7xl mx-auto px-4 py-3">
              <ol className="flex items-center space-x-2 text-sm">
                {breadcrumb.items.map((item, index) => {
                  const isLast = index === breadcrumb.items.length - 1;
                  return (
                    <li key={item.path} className="flex items-center">
                      {index > 0 && (
                        <ChevronRight className="h-4 w-4 mx-2 text-gray-400 dark:text-gray-500" />
                      )}
                      {index === 0 ? (
                        <Link
                          href={item.path}
                          className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                        >
                          <Home className="h-4 w-4" />
                          <span className="sr-only">{item.name}</span>
                        </Link>
                      ) : isLast ? (
                        <span
                          className="font-medium text-gray-900 dark:text-gray-100"
                          aria-current="page"
                        >
                          {item.name}
                        </span>
                      ) : (
                        <Link
                          href={item.path}
                          className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                        >
                          {item.name}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
          </nav>
        )}

        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Scissors className="h-4 w-4" />
                {groomers.hero.badge}
              </div>

              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                {groomers.hero.title}
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
                {groomers.hero.description}
              </p>

              {/* Stats */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-8 shadow-sm">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">96%</div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      {locale === 'fr' ? 'Satisfaction Client' : locale === 'zh' ? '客户满意度' : 'Customer Satisfaction'}
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">45%</div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      {locale === 'fr' ? 'Marge Maximale' : locale === 'zh' ? '最高利润率' : 'Maximum Margin'}
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">7+</div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      {locale === 'fr' ? 'Jours de Fraîcheur' : locale === 'zh' ? '天持久清新' : 'Days of Freshness'}
                    </div>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="#partner-form"
                  className="inline-flex items-center justify-center gap-2 bg-purple-600 dark:bg-purple-600 text-white dark:text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-700 dark:hover:bg-purple-500 transition-colors"
                >
                  <ShoppingBag className="h-5 w-5" />
                  {groomers.cta.primary}
                </Link>
                <Link
                  href="#opportunity"
                  className="inline-flex items-center justify-center gap-2 border border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 bg-white dark:bg-gray-800 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                >
                  {locale === 'fr' ? 'En Savoir Plus' : locale === 'zh' ? '了解更多' : 'Learn More'}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Opportunity Section */}
        <section id="opportunity" className="py-16 md:py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {groomers.opportunity.title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {groomers.opportunity.intro}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Clients Already Ask */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-7 w-7 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {groomers.opportunity.points.clientsAsk.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {groomers.opportunity.points.clientsAsk.description}
                </p>
              </div>

              {/* Expert Position */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {groomers.opportunity.points.expertPosition.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {groomers.opportunity.points.expertPosition.description}
                </p>
              </div>

              {/* Repeat Revenue */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-7 w-7 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {groomers.opportunity.points.repeatRevenue.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {groomers.opportunity.points.repeatRevenue.description}
                </p>
              </div>

              {/* Easy Demo */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-7 w-7 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {groomers.opportunity.points.easyDemo.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {groomers.opportunity.points.easyDemo.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Easy Add-On Sale Section */}
        <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  {groomers.addOnSale.title}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  {groomers.addOnSale.description}
                </p>
                <ul className="space-y-4">
                  {groomers.addOnSale.points.map((point: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-8 shadow-lg">
                <div className="text-center">
                  <div className="text-6xl mb-4">
                    <Scissors className="h-16 w-16 mx-auto text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {locale === 'fr' ? 'Conversation Type' : locale === 'zh' ? '典型对话' : 'Sample Conversation'}
                  </h3>
                  <div className="text-left space-y-4 text-sm">
                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                      <p className="text-gray-700 dark:text-gray-300 italic">
                        {locale === 'fr'
                          ? '"Est-ce que votre chat a des problèmes d\'odeur de litière?"'
                          : locale === 'zh'
                          ? '"您家猫咪的猫砂有异味问题吗？"'
                          : '"Does your cat\'s litter box have odor issues?"'}
                      </p>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                      <p className="text-gray-700 dark:text-gray-300 italic">
                        {locale === 'fr'
                          ? '"J\'ai quelque chose qui fonctionne vraiment - c\'est du charbon actif naturel qui élimine les odeurs pendant 7 jours."'
                          : locale === 'zh'
                          ? '"我有个真正有效的产品 - 天然活性炭，能消除7天的异味。"'
                          : '"I have something that actually works - it\'s natural activated carbon that eliminates odors for 7+ days."'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partnership Benefits */}
        <section className="py-16 md:py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {groomers.partnerBenefits.title}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Wholesale Pricing */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center shadow-sm">
                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-7 w-7 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {groomers.partnerBenefits.benefits.wholesale.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {groomers.partnerBenefits.benefits.wholesale.description}
                </p>
              </div>

              {/* Display Materials */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center shadow-sm">
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {groomers.partnerBenefits.benefits.display.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {groomers.partnerBenefits.benefits.display.description}
                </p>
              </div>

              {/* Training */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center shadow-sm">
                <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-7 w-7 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {groomers.partnerBenefits.benefits.training.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {groomers.partnerBenefits.benefits.training.description}
                </p>
              </div>

              {/* Tracking */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center shadow-sm">
                <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-7 w-7 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {groomers.partnerBenefits.benefits.tracking.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {groomers.partnerBenefits.benefits.tracking.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Retail Package Section */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-purple-600 to-blue-600 dark:from-purple-800 dark:to-blue-800">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white dark:text-gray-100 mb-4">
              {groomers.retailPackage.title}
            </h2>
            <p className="text-lg text-purple-100 dark:text-purple-200 mb-8">
              {groomers.retailPackage.subtitle}
            </p>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-xl">
              <ul className="space-y-4 text-left max-w-md mx-auto">
                {groomers.retailPackage.includes.map((item: string, index: number) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link
                  href="#partner-form"
                  className="inline-flex items-center justify-center gap-2 bg-purple-600 dark:bg-purple-600 text-white dark:text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-700 dark:hover:bg-purple-500 transition-colors"
                >
                  {groomers.cta.primary}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {groomers.testimonials.title}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {groomers.testimonials.items.map((testimonial: { author: string; role?: string; quote: string; location?: string; result?: string }, index: number) => (
                <div key={index} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mr-4">
                      <Scissors className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.location}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex text-yellow-400 dark:text-yellow-300">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                      {testimonial.result}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Pricing */}
        <section className="py-16 md:py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {locale === 'fr' ? 'Gamme de Produits' : locale === 'zh' ? '产品系列' : 'Product Line'}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {locale === 'fr'
                  ? 'Prix de détail suggérés - contactez-nous pour les prix de gros'
                  : locale === 'zh'
                  ? '建议零售价 - 联系我们获取批发价格'
                  : 'Suggested retail prices - contact us for wholesale pricing'}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center shadow-sm">
                <h3 className="font-heading text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {locale === 'fr' ? 'Format Essai 12g' : locale === 'zh' ? '试用装 12g' : 'Trial Size 12g'}
                </h3>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">{trialPrice}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {locale === 'fr' ? 'PDSF suggéré' : locale === 'zh' ? '建议零售价' : 'Suggested MSRP'}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {locale === 'fr' ? 'Parfait pour les démos' : locale === 'zh' ? '非常适合演示' : 'Perfect for demos'}
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-300 dark:border-purple-600 rounded-xl p-6 text-center shadow-lg relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-600 dark:bg-purple-500 text-white dark:text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {locale === 'fr' ? 'Plus Populaire' : locale === 'zh' ? '最受欢迎' : 'Most Popular'}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-semibold text-gray-900 dark:text-white mb-2 mt-2">
                  {locale === 'fr' ? 'Format Standard 50g' : locale === 'zh' ? '标准装 50g' : 'Standard Size 50g'}
                </h3>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">{standardPrice}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {locale === 'fr' ? 'PDSF suggéré' : locale === 'zh' ? '建议零售价' : 'Suggested MSRP'}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {locale === 'fr' ? 'Meilleur vendeur' : locale === 'zh' ? '最佳卖家' : 'Best seller'}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center shadow-sm">
                <h3 className="font-heading text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {locale === 'fr' ? 'Grand Format 120g' : locale === 'zh' ? '大容量装 120g' : 'Large Size 120g'}
                </h3>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">{familyPrice}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {locale === 'fr' ? 'PDSF suggéré' : locale === 'zh' ? '建议零售价' : 'Suggested MSRP'}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {locale === 'fr' ? 'Meilleure valeur' : locale === 'zh' ? '最佳价值' : 'Best value'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Partner Inquiry Form */}
        <section id="partner-form" className="py-16 md:py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {groomers.form.title}
              </h2>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-8 shadow-lg">
              {!formSubmitted ? (
                <form className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {groomers.form.businessName} *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {groomers.form.contactName} *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {groomers.form.email} *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {groomers.form.phone} *
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {groomers.form.location} *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {groomers.form.monthlyClients}
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                    >
                      <option value="">
                        {locale === 'fr' ? 'Sélectionner...' : locale === 'zh' ? '请选择...' : 'Select...'}
                      </option>
                      <option value="1-10">1-10</option>
                      <option value="11-25">11-25</option>
                      <option value="26-50">26-50</option>
                      <option value="50+">50+</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {groomers.form.interest}
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="button"
                      onClick={handleFormSubmit}
                      className="w-full bg-purple-600 dark:bg-purple-600 text-white dark:text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-700 dark:hover:bg-purple-500 transition-colors"
                    >
                      {groomers.form.submit}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-12">
                  <CheckCircle className="h-16 w-16 text-green-500 dark:text-green-400 mx-auto mb-4" />
                  <h3 className="font-heading text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {groomers.form.success.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {t.forms?.success?.groomerContact || groomers.form.success.message}
                  </p>
                  <div className="space-y-4">
                    <div className="flex flex-wrap justify-center gap-4">
                      <a
                        href="mailto:partners@purrify.ca"
                        className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:underline"
                      >
                        <Mail className="h-4 w-4" />
                        partners@purrify.ca
                      </a>
                      <a
                        href={CONTACT_INFO.phoneHref}
                        className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:underline"
                      >
                        <Phone className="h-4 w-4" />
                        {PHONE_MESSAGING.callout}
                      </a>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                      {PHONE_MESSAGING.explanation}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Related Programs */}
        <section className="py-12 md:py-16 bg-gray-100 dark:bg-gray-800/50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="font-heading text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {locale === 'fr' ? 'Découvrez Nos Autres Programmes' : locale === 'zh' ? '探索我们的其他计划' : 'Explore Our Other Programs'}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {locale === 'fr' ? 'Programmes de partenariat pour différents types d\'entreprises' : locale === 'zh' ? '为不同类型的企业提供合作伙伴计划' : 'Partnership programs for different business types'}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/shelters"
                className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {locale === 'fr' ? 'Pour Refuges' : locale === 'zh' ? '动物收容所计划' : 'For Shelters'}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {locale === 'fr' ? 'Programme de dons' : locale === 'zh' ? '捐赠计划' : 'Donation program'}
                  </div>
                </div>
              </Link>
              <Link
                href="/retailers"
                className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {locale === 'fr' ? 'Pour Détaillants' : locale === 'zh' ? '零售商计划' : 'For Retailers'}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {locale === 'fr' ? 'Prix de gros' : locale === 'zh' ? '批发定价' : 'Wholesale pricing'}
                  </div>
                </div>
              </Link>
              <Link
                href="/affiliate"
                className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {locale === 'fr' ? 'Programme Affiliation' : locale === 'zh' ? '联盟计划' : 'Affiliate Program'}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {locale === 'fr' ? '30% commission' : locale === 'zh' ? '30% 佣金' : '30% commission'}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-20 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {groomers.contact.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {groomers.contact.description}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center shadow-sm">
                <Phone className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {groomers.contact.callUs}
                </h4>
                <a href={CONTACT_INFO.phoneHref} className="text-purple-600 dark:text-purple-400 hover:underline font-bold">
                  {PHONE_MESSAGING.callout}
                </a>
                <p className="text-xs text-gray-600 dark:text-gray-400 italic mt-3">
                  {PHONE_MESSAGING.explanation}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center shadow-sm">
                <Mail className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {groomers.contact.emailUs}
                </h4>
                <a href="mailto:partners@purrify.ca" className="text-purple-600 dark:text-purple-400 hover:underline">
                  partners@purrify.ca
                </a>
              </div>

              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center shadow-sm">
                <FileText className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {groomers.contact.moreInfo}
                </h4>
                <a href="mailto:partners@purrify.ca" className="text-purple-600 dark:text-purple-400 hover:underline text-sm">
                  {groomers.contact.requestGuide}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 3600, // Revalidate every hour
  };
};
