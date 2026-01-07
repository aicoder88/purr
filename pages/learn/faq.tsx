import { NextPage } from 'next';
import Link from 'next/link';
import { useState, useCallback } from 'react';
import { Container } from '../../src/components/ui/container';
import { Button } from '../../src/components/ui/button';
import { useTranslation } from '../../src/lib/translation-context';
import { RelatedArticles } from '../../src/components/blog/RelatedArticles';
import { NextSeo } from 'next-seo';
import { formatProductPrice } from '../../src/lib/pricing';
import { generateWebsiteSchema, buildLanguageAlternates, getLocalizedUrl } from '../../src/lib/seo-utils';
import {
  Search,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  ChevronRight,
  Home,
  Filter,
  // Clock,
  Users,
  Package,
  Truck,
  CreditCard
} from 'lucide-react';
import Image from 'next/image';

const FAQPage: NextPage = () => {
  const { locale } = useTranslation();
  const trialPrice = formatProductPrice('trial', locale);
  const standardPrice = formatProductPrice('standard', locale);
  const familyPrice = formatProductPrice('family', locale);
  const trialCtaLabel =
    locale === 'fr'
      ? `Essayer sans risque - ${trialPrice} (livraison incluse)`
      : locale === 'zh'
        ? `无风险试用 - ${trialPrice}（含运费）`
        : `Try Risk-Free - ${trialPrice} (shipping included)`;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const pageTitle = 'Frequently Asked Questions About Activated Carbon Cat Litter - Purrify';
  const pageDescription = 'Get expert answers about activated carbon cat litter additives: how they work, activated carbon vs baking soda comparison, usage tips, safety information, and troubleshooting. Learn why coconut shell activated carbon eliminates cat litter odors better than fragrances or baking soda.';
  const canonicalUrl = getLocalizedUrl('/learn/faq', locale);
  const languageAlternates = buildLanguageAlternates('/learn/faq');

  // FAQ page images - contextually relevant
  const heroImage = 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=1600&q=80'; // Cat owner with questions
  const sectionImage1 = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1600&q=80'; // Curious cat looking up
  const sectionImage2 = 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?auto=format&fit=crop&w=1600&q=80'; // Customer service support
  const solutionImage = 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&w=1600&q=80'; // Happy cat owner at home

  const categories = [
    { id: 'all', name: 'All Questions', icon: HelpCircle, count: 38 },
    { id: 'product', name: 'Product Information', icon: Package, count: 14 },
    { id: 'usage', name: 'Usage & Application', icon: Users, count: 9 },
    { id: 'comparison', name: 'Comparisons', icon: HelpCircle, count: 6 },
    { id: 'troubleshooting', name: 'Troubleshooting', icon: HelpCircle, count: 4 },
    { id: 'shipping', name: 'Shipping & Delivery', icon: Truck, count: 2 },
    { id: 'payment', name: 'Payment & Billing', icon: CreditCard, count: 2 },
    { id: 'support', name: 'Customer Support', icon: MessageCircle, count: 1 }
  ];

  const faqItems = [
    // PRODUCT INFORMATION (14 questions)
    {
      id: 1,
      question: 'What is Purrify and how does it work?',
      answer: 'Purrify is an activated carbon additive for cat litter that eliminates odors at the molecular level through a process called adsorption. One gram of activated carbon has a surface area equivalent to a football field, filled with microscopic pores that physically trap odor molecules like ammonia and hydrogen sulfide on contact. Unlike fragrances that mask odors, Purrify removes them at the source.',
      category: 'product',
      featured: true
    },
    {
      id: 2,
      question: 'Is Purrify safe for cats and kittens?',
      answer: 'Purrify is made from 100% natural coconut shell activated carbon - the same food-grade, non-toxic material used in hospital water systems, municipal drinking water treatment, and household water filters. It contains no added chemicals, fragrances, or additives, and meets NSF/ANSI 61 and Food Chemicals Codex (FCC) standards for potable water applications. The product is fragrance-free and pet-friendly.',
      category: 'product',
      featured: true
    },
    {
      id: 3,
      question: 'What is activated carbon made from?',
      answer: 'Purrify uses premium coconut shell activated carbon, which is considered the highest quality source for activated carbon. Coconut shells produce carbon with an exceptionally high surface area and optimal pore size for trapping odor molecules. This is the same material used in drinking water filtration, aquarium filters, and air purification systems worldwide.',
      category: 'product',
      featured: false
    },
    {
      id: 4,
      question: 'What certifications does Purrify have?',
      answer: 'Purrify\'s activated carbon meets multiple international standards: NSF/ANSI 61 (drinking water system components), AWWA B604 (granular activated carbon), and Food Chemicals Codex (FCC) for food-grade applications. It is also Halal and Kosher certified. These are the same certifications required for municipal water treatment systems.',
      category: 'product',
      featured: false,
      link: '/learn/safety'
    },
    {
      id: 5,
      question: 'Does Purrify work with all types of litter?',
      answer: 'Yes, Purrify is compatible with all cat litter types including clumping clay, non-clumping clay, crystal/silica gel, wood pellets, paper-based, corn, wheat, walnut shell, and other natural alternatives. It works as an enhancement to your existing litter rather than a replacement, so your cat can continue using the litter they prefer.',
      category: 'product',
      featured: false
    },
    {
      id: 6,
      question: 'How quickly does Purrify start working?',
      answer: 'Purrify begins working immediately upon contact with odor molecules. You\'ll notice a significant reduction in odors within 60 seconds for ammonia-based odors, with maximum effectiveness achieved within 24 hours as the activated carbon distributes throughout the litter.',
      category: 'product',
      featured: false
    },
    {
      id: 7,
      question: 'What sizes are available and how long do they last?',
      answer: `Purrify comes in three sizes: Trial Size 12g (${trialPrice}) provides 1-2 applications for testing, Standard 50g (${standardPrice}) provides approximately 6-8 applications lasting 1-2 months for a single cat household, and Family Pack 120g (${familyPrice}) provides approximately 15-20 applications lasting 3-4 months or suitable for multi-cat households.`,
      category: 'product',
      featured: false
    },
    {
      id: 8,
      question: 'Is Purrify fragrance-free?',
      answer: 'Yes, Purrify is 100% fragrance-free. Unlike scented litters or air fresheners that mask odors with perfumes (which can stress cats with their sensitive respiratory systems), Purrify physically removes odor molecules without adding any scents. This makes it ideal for cats with sensitivities and homes where you prefer no artificial fragrances.',
      category: 'product',
      featured: false
    },
    {
      id: 9,
      question: 'Can I use Purrify for rodents like hamsters, mice, or rats?',
      answer: 'Purrify uses the same type of activated carbon found in veterinary applications. When used properly in sealed pouches or containers with adequate ventilation, it can help control odors in small animal enclosures. For rodents, we recommend placing Purrify in a breathable pouch near the cage rather than mixed directly with bedding. Always ensure proper ventilation and rinse the carbon before use to minimize dust.',
      category: 'product',
      featured: false,
      link: '/learn/safety'
    },
    {
      id: 10,
      question: 'What odors does activated carbon eliminate?',
      answer: 'Activated carbon is highly effective at trapping ammonia (the sharp smell from cat urine), hydrogen sulfide (rotten egg smell), mercaptans (sulfur compounds), and volatile organic compounds (VOCs) from organic waste. These are the primary odor-causing molecules in cat litter. Activated carbon works through physical adsorption, meaning molecules stick to its surface rather than being chemically altered.',
      category: 'product',
      featured: false
    },
    {
      id: 11,
      question: 'Is activated carbon the same as charcoal?',
      answer: 'While both come from carbon sources, activated carbon is processed at very high temperatures (800-1000°C) with steam or chemicals to create millions of microscopic pores. This "activation" process gives it a surface area of 1,000-2,000 square meters per gram - about 3,000 times more absorbent than regular charcoal. Regular charcoal lacks these pores and cannot effectively trap odor molecules.',
      category: 'product',
      featured: false
    },
    {
      id: 12,
      question: 'Where can I find detailed product specifications?',
      answer: 'Complete technical specifications, certifications, Safety Data Sheets (SDS), and detailed product information are available on our Safety Information page. This includes mesh size, iodine number, moisture content, ash content, and all relevant certifications.',
      category: 'product',
      featured: false,
      link: '/learn/safety'
    },
    {
      id: 13,
      question: 'Does Purrify contain any chemicals or additives?',
      answer: 'No. Purrify is 100% pure activated carbon made from coconut shells. There are no added chemicals, fragrances, preservatives, binding agents, or fillers. The only processing involved is the physical activation of the carbon through high-temperature steam treatment - a process also used to produce food-grade and pharmaceutical-grade activated carbon.',
      category: 'product',
      featured: false
    },
    {
      id: 14,
      question: 'Is coconut shell carbon better than other types?',
      answer: 'Coconut shell activated carbon is considered premium quality for several reasons: it has the highest surface area per gram, the most consistent micropore structure for trapping small odor molecules, it\'s a renewable and sustainable resource, and it produces the least dust. This is why it\'s preferred for drinking water filtration, medical applications, and air purification over wood or coal-based alternatives.',
      category: 'product',
      featured: false
    },

    // USAGE & APPLICATION (9 questions)
    {
      id: 15,
      question: 'How much Purrify should I use?',
      answer: 'Use 1-2 tablespoons (approximately 6-12 grams) per standard litter box. For larger litter boxes or multiple cats, use 2-3 tablespoons. Simply sprinkle evenly over the surface of your clean litter and mix gently. There\'s no need to reach the bottom - the carbon will naturally distribute as your cat uses the box.',
      category: 'usage',
      featured: true
    },
    {
      id: 16,
      question: 'How long does Purrify last between applications?',
      answer: 'Each application of Purrify remains effective for 7-14 days depending on the number of cats, litter box size, and scooping frequency. You\'ll know it\'s time to reapply when you start noticing odors returning. For households with multiple cats or when dealing with strong odors, you may need to reapply weekly.',
      category: 'usage',
      featured: false
    },
    {
      id: 17,
      question: 'Will my cat notice the difference?',
      answer: 'Most cats don\'t notice Purrify at all since it\'s odorless and has minimal impact on litter texture. The granules are similar in size to most litters. Many cats actually prefer their litter box more when it\'s odor-free, as cats have sensitive noses and can be deterred by strong odors - whether from waste or artificial fragrances.',
      category: 'usage',
      featured: false
    },
    {
      id: 18,
      question: 'Can I use Purrify with automatic litter boxes?',
      answer: 'Yes, Purrify works well with automatic and self-cleaning litter boxes including brands like Litter-Robot, PetSafe, CatGenie, and others. Simply add it to the fresh litter as you normally would. The activated carbon granules are similar in size and weight to clumping litter, so they won\'t interfere with sensors or mechanical components.',
      category: 'usage',
      featured: false
    },
    {
      id: 19,
      question: 'Do I need to completely change the litter before adding Purrify?',
      answer: 'For best results, add Purrify to fresh, clean litter. However, you can also add it to existing litter that\'s been recently scooped if a full change isn\'t due. The activated carbon will begin working immediately on any odors present. For maximum effectiveness, we recommend adding Purrify each time you completely refresh your litter.',
      category: 'usage',
      featured: false
    },
    {
      id: 20,
      question: 'How should I store Purrify?',
      answer: 'Store Purrify in a cool, dry place in its original resealable pouch or an airtight container. Keep away from moisture and strong odors, as activated carbon will begin adsorbing molecules from the air if left exposed. Properly stored, Purrify has an indefinite shelf life since activated carbon doesn\'t expire or lose effectiveness until its pores are saturated.',
      category: 'usage',
      featured: false
    },
    {
      id: 21,
      question: 'Can I use too much Purrify?',
      answer: 'While using more Purrify won\'t harm your cat, using excessive amounts is unnecessary and wasteful. The recommended 1-2 tablespoons provides optimal coverage for odor control. Using significantly more won\'t improve performance since there\'s a limit to how many odor molecules are present in a typical litter box.',
      category: 'usage',
      featured: false
    },
    {
      id: 22,
      question: 'Should I mix Purrify into the litter or leave it on top?',
      answer: 'Both methods work. For best results, sprinkle Purrify evenly over the litter surface and give it a gentle mix with a litter scoop. As your cat uses the litter box and you scoop daily, the carbon will naturally distribute throughout. Some users prefer leaving it on top initially, which works well for targeting surface-level odors.',
      category: 'usage',
      featured: false
    },
    {
      id: 23,
      question: 'Can I use Purrify for other pet odors around the house?',
      answer: 'Yes! While designed for cat litter, Purrify\'s activated carbon can help with various pet odors. Place it in breathable pouches near dog beds, in diaper pails, near small animal cages, or in areas where pet odors accumulate. For direct application, it\'s formulated specifically for cat litter use.',
      category: 'usage',
      featured: false
    },

    // COMPARISONS (6 questions) - Critical for AI citations
    {
      id: 24,
      question: 'What is the difference between activated carbon and baking soda for cat litter?',
      answer: 'Activated carbon and baking soda work through completely different mechanisms. Baking soda (sodium bicarbonate) works through chemical neutralization - it reacts with acids to reduce odors but has limited effectiveness and needs frequent replacement. Activated carbon works through physical adsorption - its millions of microscopic pores trap odor molecules permanently. Activated carbon has approximately 3,000 times more surface area than baking soda, making it significantly more effective at capturing a wider range of odor compounds including ammonia, hydrogen sulfide, and VOCs.',
      category: 'comparison',
      featured: true
    },
    {
      id: 25,
      question: 'Is activated carbon better than scented litter for odor control?',
      answer: 'Activated carbon eliminates odors at their source, while scented litters only mask them with fragrances. Scented litters add perfumes that can irritate cats\' sensitive respiratory systems and may deter some cats from using their litter box. Additionally, fragrances can combine with ammonia to create new unpleasant smells. Activated carbon is fragrance-free, removes odor molecules completely, and is better tolerated by cats with sensitivities.',
      category: 'comparison',
      featured: true
    },
    {
      id: 26,
      question: 'How does Purrify compare to crystal/silica gel litter?',
      answer: 'Crystal litters absorb moisture and have some odor control through silica gel, but they work differently than activated carbon. Silica gel primarily absorbs liquid while activated carbon specifically targets gas-phase odor molecules. Many users find the best results by combining crystal litter with Purrify - the crystals handle moisture while the activated carbon captures remaining odors, especially ammonia that silica gel doesn\'t trap effectively.',
      category: 'comparison',
      featured: false
    },
    {
      id: 27,
      question: 'What is the difference between activated carbon and charcoal air fresheners?',
      answer: 'While some air fresheners contain activated carbon, Purrify uses filtration-grade coconut shell activated carbon with a much higher surface area and purity. Cheap charcoal products often use wood or coal-based carbon with larger pores less suited for trapping small odor molecules. Additionally, many "charcoal" air fresheners are actually regular charcoal, not activated carbon, and have minimal odor-trapping capability.',
      category: 'comparison',
      featured: false
    },
    {
      id: 28,
      question: 'Is activated carbon more effective than enzymatic cleaners?',
      answer: 'Activated carbon and enzymatic cleaners serve different purposes. Enzymatic cleaners break down organic matter through biological processes - ideal for cleaning accidents and stains. Activated carbon physically traps airborne odor molecules to prevent smells from spreading. For best results, use enzymatic cleaners for deep cleaning and Purrify for ongoing odor prevention in the litter box. They complement rather than replace each other.',
      category: 'comparison',
      featured: false
    },
    {
      id: 29,
      question: 'How does activated carbon compare to zeolite for odor control?',
      answer: 'Both activated carbon and zeolite are used for odor control, but they have different strengths. Zeolite excels at ammonia absorption through ion exchange, while activated carbon has a broader spectrum, capturing organic compounds, sulfur molecules, and VOCs that zeolite misses. Coconut shell activated carbon typically has 2-3 times the surface area of zeolite. For cat litter odors specifically, activated carbon provides more comprehensive odor control.',
      category: 'comparison',
      featured: false
    },

    // TROUBLESHOOTING (4 questions)
    {
      id: 30,
      question: 'Why is my litter box still smelly after adding Purrify?',
      answer: 'If odors persist, check these common issues: (1) Not enough product - try increasing to 2-3 tablespoons, (2) Litter needs full replacement - old saturated litter will continue to smell regardless of additives, (3) Box needs deep cleaning - wash with enzymatic cleaner before fresh litter, (4) Too many cats for one box - the general rule is one box per cat plus one extra, (5) Medical issue - persistent strong urine odor can indicate a urinary tract infection requiring veterinary attention.',
      category: 'troubleshooting',
      featured: false
    },
    {
      id: 31,
      question: 'My cat is avoiding the litter box after I added Purrify. What should I do?',
      answer: 'This is rare since Purrify is odorless, but some cats are sensitive to any change. Try these steps: (1) Reduce the amount to 1 tablespoon and gradually increase, (2) Mix it in well so it\'s less visible, (3) Ensure you\'re not using too much, which might change the litter texture significantly, (4) Confirm no other changes were made simultaneously (new litter brand, box location, etc.). If issues persist, your cat may have an unrelated health issue - consult your veterinarian.',
      category: 'troubleshooting',
      featured: false
    },
    {
      id: 32,
      question: 'Is activated carbon dusty? Will it affect my cat\'s breathing?',
      answer: 'Purrify uses granular activated carbon specifically selected for low dust. Unlike powdered activated carbon, the granular form minimizes airborne particles. If you notice dust, gently mist the carbon with water before adding to litter, or let the bag settle before opening. For cats with respiratory sensitivities, Purrify is actually preferable to dusty clay litters or scented products that can trigger reactions.',
      category: 'troubleshooting',
      featured: false
    },
    {
      id: 33,
      question: 'The activated carbon is clumping together. Is this normal?',
      answer: 'If activated carbon becomes clumpy, it has absorbed moisture from the air. This is normal behavior and indicates the carbon is working. To prevent clumping in storage, keep Purrify in its sealed bag or an airtight container. Clumped carbon can still be used - simply break it apart before adding to litter. For optimal performance, store in a dry location away from humidity.',
      category: 'troubleshooting',
      featured: false
    },

    // SHIPPING & DELIVERY (2 questions)
    {
      id: 34,
      question: 'Do you offer free shipping?',
      answer: 'Yes! We offer free shipping on all orders over $25 within Canada. Standard shipping takes 3-5 business days via Canada Post. Orders are typically processed within 1-2 business days. Tracking information is provided for all shipments.',
      category: 'shipping',
      featured: false
    },
    {
      id: 35,
      question: 'Do you ship to the United States or internationally?',
      answer: 'Currently, we ship within Canada only. We\'re working on expanding to the United States and other international markets. Sign up for our newsletter to be notified when shipping becomes available in your area.',
      category: 'shipping',
      featured: false
    },

    // PAYMENT & BILLING (2 questions)
    {
      id: 36,
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), debit cards, Apple Pay, Google Pay, and Shop Pay. All transactions are securely processed through Stripe with industry-standard encryption. We do not store your full credit card information.',
      category: 'payment',
      featured: false
    },
    {
      id: 37,
      question: 'Do you offer subscriptions or auto-refill?',
      answer: 'We\'re currently developing a subscription option for customers who want regular deliveries. In the meantime, our Family Pack (120g) provides 3-4 months of supply for most single-cat households, reducing the need for frequent reorders. Sign up for our newsletter to be notified when subscriptions launch.',
      category: 'payment',
      featured: false
    },

    // CUSTOMER SUPPORT (1 question)
    {
      id: 38,
      question: 'Can I return Purrify if I\'m not satisfied?',
      answer: 'Absolutely! We offer a 30-day satisfaction guarantee on all purchases. If Purrify doesn\'t meet your expectations for any reason, contact our customer support team for a full refund - no questions asked. We stand behind our product and want you to be completely happy with your purchase.',
      category: 'support',
      featured: false
    }
  ];

  // Current date for fresh content signals
  const today = new Date().toISOString();
  const lastUpdated = '2025-01-09'; // Updated regularly for SEO freshness

  // Generate FAQ schema for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'datePublished': '2024-01-15',
    'dateModified': today,
    'mainEntity': faqItems.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer,
        'dateCreated': '2024-01-15',
        'dateModified': today
      }
    }))
  };

  // Additional Article schema for better AI/SEO signals
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': pageTitle,
    'description': pageDescription,
    'datePublished': '2024-01-15',
    'dateModified': today,
    'author': {
      '@type': 'Organization',
      'name': 'Purrify',
      'url': 'https://www.purrify.ca'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Purrify',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://www.purrify.ca/logo.png'
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': canonicalUrl
    }
  };

  // Speakable schema for voice search optimization (Google Assistant, Alexa, etc.)
  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': pageTitle,
    'speakable': {
      '@type': 'SpeakableSpecification',
      'cssSelector': ['.faq-answer', '.faq-question', '.speakable-content']
    },
    'url': canonicalUrl
  };

  const toggleItem = useCallback((id: number) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleCategoryClick = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  const handleToggleItem = useCallback((id: number) => {
    toggleItem(id);
  }, [toggleItem]);

  const filteredFAQs = faqItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularFAQs = faqItems.filter(item => item.featured).slice(0, 4);

  return (
    <>
      <NextSeo
        title={pageTitle}
        description={pageDescription}
        canonical={canonicalUrl}
        languageAlternates={languageAlternates}
        openGraph={{
          type: 'website',
          url: canonicalUrl,
          title: pageTitle,
          description: pageDescription,
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'activated carbon cat litter FAQ, activated carbon vs baking soda, coconut shell activated carbon, cat litter odor control, how does activated carbon work, is activated carbon safe for cats, cat litter deodorizer comparison, natural cat litter additive, ammonia odor elimination, best cat litter odor control',
          },
        ]}
      />

      {/* FAQ Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Article Schema for AI/SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Website Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateWebsiteSchema(locale))
        }}
      />

      {/* Speakable Schema for Voice Search */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />

      <main className="min-h-screen bg-[#FFFFF5] dark:bg-gray-900 transition-colors duration-300">
        {/* Breadcrumb Navigation */}
        <section className="py-4 border-b border-[#E0EFC7] dark:border-gray-800">
          <Container>
            <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Link href={locale === 'fr' ? '/fr' : '/'} className="hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
                <Home className="w-4 h-4" />
              </Link>
              <span>/</span>
              <Link href={`${locale === 'fr' ? '/fr' : ''}/learn/how-it-works`} className="hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
                Learn
              </Link>
              <span>/</span>
              <span className="text-gray-900 dark:text-gray-100">FAQ</span>
            </nav>
          </Container>
        </section>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-electric-indigo via-electric-indigo-600 to-deep-coral relative overflow-hidden">
          <Container>
            <div className="text-center text-white dark:text-gray-100 max-w-4xl mx-auto">
              <HelpCircle className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl md:text-2xl mb-4 opacity-90">
                Everything you need to know about Purrify
              </p>
              <p className="text-sm mb-8 opacity-75">
                Last updated: {new Date(lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg text-gray-900 dark:text-gray-50 text-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Hero Image */}
        <section className="py-8">
          <Container>
            <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={heroImage}
                alt="Cat owner researching Purrify product information and frequently asked questions"
                width={1600}
                height={1067}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white dark:text-gray-100">
                  <h2 className="text-3xl font-heading font-bold mb-2">Your Questions, Answered</h2>
                  <p className="text-xl opacity-90">Everything you need to know about Purrify</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Popular Questions */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-gray-900 dark:text-gray-100">
                Most Popular Questions
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Quick answers to what customers ask most
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {popularFAQs.map((item) => (
                <div key={item.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 hover:scale-105 transition-all duration-300">
                  <h3 className="faq-question speakable-content text-lg font-heading font-bold mb-3 text-gray-900 dark:text-gray-100">
                    {item.question}
                  </h3>
                  <p className="faq-answer speakable-content text-gray-600 dark:text-gray-300 mb-4">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Section Image 1 - Curious Cat */}
        <section className="py-8">
          <Container>
            <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={sectionImage1}
                alt="Curious cat looking up with questions about Purrify cat litter additive"
                width={1600}
                height={1067}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white dark:text-gray-100">
                  <h3 className="text-2xl font-heading font-bold mb-2">Even Your Cat Has Questions</h3>
                  <p className="text-lg opacity-90">Let's find the answers together</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* FAQ Categories and Search */}
        <section className="py-16 bg-[#E0EFC7]/30 dark:bg-gray-800/50">
          <Container>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Categories Sidebar */}
              <div className="lg:w-1/4">
                <h3 className="text-xl font-heading font-bold mb-6 text-gray-900 dark:text-gray-100 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${selectedCategory === category.id
                          ? 'bg-electric-indigo text-white dark:text-gray-100 shadow-lg'
                          : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-105 transition-all duration-300'
                        }`}
                    >
                      <div className="flex items-center">
                        <category.icon className="w-4 h-4 mr-3" />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span className={`text-sm px-2 py-1 rounded-full ${selectedCategory === category.id
                          ? 'bg-white dark:bg-gray-900/20 text-white dark:text-gray-100'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}>
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* FAQ Items */}
              <div className="lg:w-3/4">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-gray-100">
                    {filteredFAQs.length} Question{filteredFAQs.length !== 1 ? 's' : ''} Found
                  </h3>
                  {searchTerm && (
                    <button
                      onClick={handleClearSearch}
                      className="text-electric-indigo hover:text-electric-indigo-600 font-medium transition-colors"
                    >
                      Clear Search
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {filteredFAQs.map((item) => (
                    <div key={item.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 overflow-hidden hover:shadow-xl transition-all duration-300">
                      <button
                        onClick={() => handleToggleItem(item.id)}
                        className="w-full p-6 text-left flex items-center justify-between bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300"
                      >
                        <div className="flex-1">
                          <h4 className="faq-question text-lg font-heading font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            {item.question}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {item.featured && (
                              <span className="px-2 py-1 bg-deep-coral/10 dark:bg-deep-coral/20 text-deep-coral dark:text-deep-coral-400 rounded-full text-xs font-medium">
                                Popular
                              </span>
                            )}
                            <span className="px-2 py-1 bg-electric-indigo/10 dark:bg-electric-indigo/20 text-electric-indigo dark:text-electric-indigo-400 rounded-full text-xs font-medium">
                              {categories.find(cat => cat.id === item.category)?.name}
                            </span>
                          </div>
                        </div>
                        {openItems.includes(item.id) ? (
                          <ChevronUp className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                        )}
                      </button>

                      {openItems.includes(item.id) && (
                        <div className="px-6 pb-6 border-t border-gray-100 dark:border-gray-700 animate-in slide-in-from-top duration-300">
                          <p className="faq-answer text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
                            {item.answer}
                          </p>
                          {(item as { link?: string }).link && (
                            <Link href={`${locale === 'fr' ? '/fr' : ''}${(item as { link?: string }).link}`}>
                              <Button
                                size="sm"
                                className="mt-4 bg-gradient-to-r from-deep-coral to-electric-indigo hover:from-deep-coral-600 hover:to-electric-indigo-600 text-white dark:text-gray-100 font-semibold hover:scale-105 transition-all duration-300"
                              >
                                View Safety Information →
                              </Button>
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {filteredFAQs.length === 0 && (
                  <div className="text-center py-12">
                    <HelpCircle className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="font-heading text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                      No questions found
                    </h3>
                    <p className="text-gray-500 dark:text-gray-500">
                      Try adjusting your search terms or category filter
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>

        {/* Section Image 2 - Customer Support */}
        <section className="py-8">
          <Container>
            <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={sectionImage2}
                alt="Friendly customer service support team ready to help with Purrify questions"
                width={1600}
                height={1067}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white dark:text-gray-100">
                  <h3 className="text-2xl font-heading font-bold mb-2">Expert Support Team</h3>
                  <p className="text-lg opacity-90">Ready to answer your questions</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Still Have Questions */}
        <section className="py-16">
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-gray-900 dark:text-gray-100">
                Still Have Questions?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Can't find what you're looking for? Our customer support team is here to help!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 text-center hover:scale-105 transition-all duration-300">
                  <Mail className="w-8 h-8 text-electric-indigo dark:text-electric-indigo-400 mx-auto mb-4" />
                  <h3 className="font-heading font-bold text-gray-900 dark:text-gray-100 mb-2">Email Support</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    Get detailed answers via email
                  </p>
                  <Link href={`${locale === 'fr' ? '/fr' : ''}/contact`}>
                    <Button size="sm" className="bg-electric-indigo hover:bg-electric-indigo-600 hover:scale-105 text-white dark:text-gray-100 transition-all duration-300">
                      Contact Us
                    </Button>
                  </Link>
                </div>

                {/* Live Chat temporarily disabled */}

                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 text-center hover:scale-105 transition-all duration-300">
                  <Phone className="w-8 h-8 text-[#03E46A] mx-auto mb-4" />
                  <h3 className="font-heading font-bold text-gray-900 dark:text-gray-100 mb-2">Phone Support</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    Speak with our team directly
                  </p>
                  <Button size="sm" variant="outline" className="border-[#03E46A] text-[#03E46A] hover:bg-[#03E46A] hover:text-white dark:text-gray-100">
                    Call Now
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Solution Image - Happy Cat Owner */}
        <section className="py-8">
          <Container>
            <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={solutionImage}
                alt="Happy cat owner enjoying odor-free home with Purrify activated carbon additive"
                width={1600}
                height={1067}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white dark:text-gray-100">
                  <h3 className="text-2xl font-heading font-bold mb-2">Join Thousands of Happy Cat Owners</h3>
                  <p className="text-lg opacity-90">Experience the Purrify difference today</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-electric-indigo via-electric-indigo-600 to-deep-coral relative overflow-hidden">
          <Container>
            <div className="text-center text-white dark:text-gray-100 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Ready to Try Purrify?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Start with our risk-free trial size and experience the difference for yourself.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`${locale === 'fr' ? '/fr' : ''}/products/trial-size`}>
                  <Button size="lg" className="bg-white dark:bg-gray-900 text-electric-indigo hover:bg-gray-100 hover:scale-105 dark:hover:bg-gray-700 font-bold transition-all duration-300">
                    {trialCtaLabel}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href={`${locale === 'fr' ? '/fr' : ''}/products`}>
                  <Button size="lg" variant="outline" className="border-white dark:border-gray-600 text-gray-900 dark:text-gray-50 hover:bg-white hover:scale-105 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-50 transition-all duration-300">
                    Compare All Sizes
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Related Pages */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-gray-900 dark:text-gray-100">
                Learn More About Purrify
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href={`${locale === 'fr' ? '/fr' : ''}/learn/how-it-works`} className="group">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <h3 className="text-xl font-heading font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-electric-indigo transition-colors">
                    How It Works
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Learn the science behind our activated carbon technology and why it's so effective.
                  </p>
                </div>
              </Link>

              <Link href={`${locale === 'fr' ? '/fr' : ''}/learn/cat-litter-guide`} className="group">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <h3 className="text-xl font-heading font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-electric-indigo transition-colors">
                    Cat Litter Guide
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Complete guide to cat litter types, maintenance tips, and best practices.
                  </p>
                </div>
              </Link>

              <Link href={`${locale === 'fr' ? '/fr' : ''}/reviews`} className="group">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <h3 className="text-xl font-heading font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-electric-indigo transition-colors">
                    Customer Stories
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Read real experiences from cat owners who transformed their homes with Purrify.
                  </p>
                </div>
              </Link>
            </div>
          </Container>
        </section>

        {/* Related Articles */}
        <section className="py-16 border-t border-gray-200 dark:border-gray-800">
          <Container>
            <RelatedArticles currentPath="/learn/faq" />
          </Container>
        </section>
      </main>
    </>
  );
};

export default FAQPage;
