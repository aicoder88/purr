import { NextPage } from 'next';
import Link from 'next/link';
import { Container } from '../../src/components/ui/container';
import { Button } from '../../src/components/ui/button';
import { useTranslation } from '../../src/lib/translation-context';
import { NextSeo } from 'next-seo';
import { generateJSONLD, getLocalizedUrl } from '../../src/lib/seo-utils';
import {
  BookOpen,
  ChevronRight,
  Home,
  Search
} from 'lucide-react';
import { useState, useCallback } from 'react';
import { formatProductPrice } from '../../src/lib/pricing';
import { useEnhancedSEO } from '../../src/hooks/useEnhancedSEO';

interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  extendedDefinition?: string;
  relatedTerms?: string[];
  category: 'science' | 'product' | 'usage' | 'comparison';
}

const GlossaryPage: NextPage = () => {
  const { locale } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const trialPrice = formatProductPrice('trial', locale);
  const trialCtaLabel =
    locale === 'fr'
      ? `Essayer sans risque - ${trialPrice} (livraison incluse)`
      : locale === 'zh'
        ? `无风险试用 - ${trialPrice}（含运费）`
        : `Try Risk-Free - ${trialPrice} (shipping included)`;

  const pageTitle = 'Cat Litter & Activated Carbon Glossary - Purrify';
  const pageDescription = 'Learn key terms about activated carbon, cat litter odor control, and pet care science. Definitions of adsorption, ammonia, activated carbon, coconut shell carbon, VOCs, and more.';
  const canonicalUrl = `https://www.purrify.ca/learn/glossary`;

  // Use enhanced SEO hook
  const { nextSeoProps, schema, breadcrumb } = useEnhancedSEO({
    path: '/learn/glossary',
    title: pageTitle,
    description: pageDescription,
    targetKeyword: 'activated carbon glossary',
    schemaType: 'article',
    schemaData: {
      type: 'Article',
      title: pageTitle,
      description: pageDescription,
      author: 'Purrify',
      datePublished: '2024-01-15',
      dateModified: new Date().toISOString().split('T')[0],
    },
  });

  const glossaryTerms: GlossaryTerm[] = [
    {
      id: 'activated-carbon',
      term: 'Activated Carbon',
      definition: 'A highly porous form of carbon processed at high temperatures (800-1000°C) to create millions of microscopic pores. One gram has a surface area of 1,000-2,000 square meters, making it extremely effective at trapping gas molecules through physical adsorption.',
      extendedDefinition: 'Activated carbon is produced from carbon-rich materials like coconut shells, wood, or coal. The activation process uses steam or chemicals to create a vast network of pores in three sizes: micropores (<2nm) for small molecules like ammonia, mesopores (2-50nm) for medium molecules, and macropores (>50nm) for larger compounds. This makes it ideal for water filtration, air purification, and odor control.',
      relatedTerms: ['Adsorption', 'Coconut Shell Carbon', 'Surface Area'],
      category: 'science'
    },
    {
      id: 'adsorption',
      term: 'Adsorption',
      definition: 'The process by which molecules adhere to the surface of a solid material. Unlike absorption (where molecules are taken into a material), adsorption involves molecules sticking to the outer surface through weak intermolecular forces called Van der Waals forces.',
      extendedDefinition: 'In activated carbon, adsorption occurs when odor molecules enter the porous structure and become physically trapped on the carbon surface. This is a physical process - the molecules are held but not chemically changed. The trapped molecules remain bound until the carbon becomes saturated or is disposed of.',
      relatedTerms: ['Activated Carbon', 'Surface Area', 'Van der Waals Forces'],
      category: 'science'
    },
    {
      id: 'ammonia',
      term: 'Ammonia (NH₃)',
      definition: 'A colorless gas with a sharp, pungent odor that is the primary component of cat urine smell. Ammonia forms when bacteria break down urea in cat urine through a process called urease hydrolysis.',
      extendedDefinition: 'Cat urine contains high concentrations of urea due to cats\' protein-rich diets. When urea contacts bacteria in the litter box, it rapidly converts to ammonia gas. Ammonia has a detection threshold of just 5-50 ppm, meaning even small amounts create noticeable odors. Activated carbon is highly effective at capturing ammonia molecules due to its microporous structure.',
      relatedTerms: ['Hydrogen Sulfide', 'VOCs', 'Mercaptans'],
      category: 'science'
    },
    {
      id: 'coconut-shell-carbon',
      term: 'Coconut Shell Activated Carbon',
      definition: 'Premium-grade activated carbon made from coconut shells. It has the highest surface area per gram, most consistent micropore structure, produces minimal dust, and is a renewable, sustainable resource.',
      extendedDefinition: 'Coconut shell carbon is preferred for drinking water filtration, air purification, and medical applications because of its superior properties. The natural structure of coconut shells creates optimal pore sizes (predominantly micropores) for trapping small molecules like ammonia and hydrogen sulfide. It also has higher hardness than wood or coal-based carbons, resulting in less dust and longer service life.',
      relatedTerms: ['Activated Carbon', 'Surface Area', 'Micropores'],
      category: 'science'
    },
    {
      id: 'hydrogen-sulfide',
      term: 'Hydrogen Sulfide (H₂S)',
      definition: 'A colorless gas with a characteristic "rotten egg" smell. In cat litter, it forms from bacterial decomposition of sulfur-containing proteins in cat waste.',
      extendedDefinition: 'Hydrogen sulfide is detectable at extremely low concentrations (0.5 ppb), making it one of the most noticeable odor compounds. It\'s produced when anaerobic bacteria break down organic matter. Activated carbon effectively captures H₂S through both physical adsorption and, in some cases, catalytic oxidation on the carbon surface.',
      relatedTerms: ['Ammonia', 'Mercaptans', 'VOCs'],
      category: 'science'
    },
    {
      id: 'mercaptans',
      term: 'Mercaptans (Thiols)',
      definition: 'Sulfur-containing organic compounds responsible for some of the most potent and unpleasant odors in cat waste. They have extremely low odor thresholds, detectable at parts per billion.',
      extendedDefinition: 'Mercaptans are the same compounds added to natural gas to give it a detectable smell. In cat litter, they form from bacterial breakdown of sulfur-containing amino acids. Common examples include methanethiol (rotting cabbage smell) and ethanethiol. Activated carbon\'s large surface area makes it effective at trapping these molecules despite their low concentrations.',
      relatedTerms: ['Hydrogen Sulfide', 'VOCs', 'Ammonia'],
      category: 'science'
    },
    {
      id: 'vocs',
      term: 'Volatile Organic Compounds (VOCs)',
      definition: 'Organic chemicals that easily evaporate at room temperature. In cat litter, VOCs include various aldehydes, ketones, and amines released from organic waste decomposition.',
      extendedDefinition: 'VOCs contribute to the overall "litter box smell" beyond just ammonia. They\'re produced by bacterial metabolism and chemical breakdown of waste products. Many VOCs have low odor thresholds and can irritate respiratory systems. Activated carbon\'s broad pore size distribution makes it effective against the full spectrum of VOCs found in cat litter.',
      relatedTerms: ['Ammonia', 'Hydrogen Sulfide', 'Adsorption'],
      category: 'science'
    },
    {
      id: 'surface-area',
      term: 'Surface Area',
      definition: 'The total area of the external and internal surfaces of a material. Activated carbon has an extremely high surface area of 1,000-2,000 m²/g due to its porous structure - equivalent to a football field in just one gram.',
      extendedDefinition: 'Surface area is the key factor determining activated carbon\'s effectiveness. More surface area means more sites for odor molecules to adsorb. The "football field per gram" analogy helps visualize this: imagine rolling out all the internal pore surfaces of one gram of carbon - it would cover an entire football field. This massive surface area is why activated carbon outperforms other odor control methods.',
      relatedTerms: ['Activated Carbon', 'Adsorption', 'Micropores'],
      category: 'science'
    },
    {
      id: 'micropores',
      term: 'Micropores',
      definition: 'The smallest pores in activated carbon, less than 2 nanometers in diameter. They provide the majority of surface area and are optimally sized for trapping small odor molecules like ammonia.',
      extendedDefinition: 'Activated carbon contains three pore types: micropores (<2nm), mesopores (2-50nm), and macropores (>50nm). Micropores account for about 95% of the total surface area in coconut shell carbon. Their size is perfectly matched to capture small gas molecules responsible for the worst litter box odors. Higher micropore volume directly correlates with better odor control performance.',
      relatedTerms: ['Activated Carbon', 'Surface Area', 'Coconut Shell Carbon'],
      category: 'science'
    },
    {
      id: 'iodine-number',
      term: 'Iodine Number',
      definition: 'A standard measurement of activated carbon\'s adsorption capacity, expressed in mg/g. Higher iodine numbers indicate greater surface area and better performance. Quality activated carbon typically has an iodine number above 900 mg/g.',
      extendedDefinition: 'The iodine number test measures how much iodine (a small molecule) the carbon can adsorb. It\'s a reliable indicator of micropore volume and overall quality. Premium coconut shell carbon used in water filtration typically ranges from 1000-1200 mg/g. This metric helps compare different activated carbon products objectively.',
      relatedTerms: ['Activated Carbon', 'Micropores', 'Surface Area'],
      category: 'science'
    },
    {
      id: 'clumping-litter',
      term: 'Clumping Litter',
      definition: 'Cat litter, typically made from bentonite clay, that forms solid clumps when wet. This allows easy removal of urine without changing all the litter. Activated carbon additives work well with clumping litters.',
      extendedDefinition: 'Clumping litters contain sodium bentonite, a natural clay that swells and binds when exposed to moisture. While clumping helps contain liquid waste, it doesn\'t address gas-phase odors that escape into the air. Combining clumping litter with activated carbon provides both moisture control and odor elimination.',
      relatedTerms: ['Silica Gel Litter', 'Crystal Litter'],
      category: 'product'
    },
    {
      id: 'silica-gel-litter',
      term: 'Silica Gel Litter (Crystal Litter)',
      definition: 'Cat litter made from silica dioxide crystals that absorb moisture. While good at liquid absorption, silica gel is less effective than activated carbon at capturing gas-phase odor molecules.',
      extendedDefinition: 'Silica gel crystals can absorb up to 40% of their weight in moisture. They work through absorption (taking in liquid) rather than adsorption (trapping gas molecules). This makes them excellent for moisture but limited for ammonia and other volatile odors. Many cat owners combine crystal litter with activated carbon for comprehensive odor control.',
      relatedTerms: ['Clumping Litter', 'Activated Carbon'],
      category: 'product'
    },
    {
      id: 'baking-soda',
      term: 'Baking Soda (Sodium Bicarbonate)',
      definition: 'A common household product sometimes used for litter box odor control. It works through chemical neutralization of acids but has limited effectiveness compared to activated carbon.',
      extendedDefinition: 'Baking soda neutralizes acidic compounds through a chemical reaction, but this only addresses a portion of litter box odors. It doesn\'t capture ammonia (which is basic, not acidic), hydrogen sulfide, or most VOCs. Activated carbon has approximately 3,000 times more surface area and works through physical trapping rather than chemical reaction, making it effective against the full spectrum of odors.',
      relatedTerms: ['Activated Carbon', 'Ammonia', 'Zeolite'],
      category: 'comparison'
    },
    {
      id: 'zeolite',
      term: 'Zeolite',
      definition: 'A natural or synthetic mineral with a porous structure used for odor control and water softening. While effective at ammonia capture through ion exchange, zeolite has less surface area than activated carbon.',
      extendedDefinition: 'Zeolites are aluminosilicate minerals with a crystalline structure containing regular pores. They capture ammonia through ion exchange - swapping sodium or potassium ions for ammonium. While effective for ammonia specifically, zeolites have 2-3 times less surface area than coconut shell carbon and are less effective against organic odors and sulfur compounds.',
      relatedTerms: ['Activated Carbon', 'Baking Soda', 'Ammonia'],
      category: 'comparison'
    },
    {
      id: 'nsf-ansi-61',
      term: 'NSF/ANSI 61 Certification',
      definition: 'An American standard for materials that contact drinking water. Activated carbon meeting this standard is verified to not leach harmful substances and is suitable for potable water applications.',
      extendedDefinition: 'NSF/ANSI 61 certification requires rigorous testing to ensure materials won\'t contaminate drinking water. Products meeting this standard are used in municipal water treatment, home water filters, and food processing. When activated carbon meets NSF/ANSI 61, it indicates high purity and confirms it\'s made from food-grade materials.',
      relatedTerms: ['Food Chemicals Codex', 'AWWA B604'],
      category: 'product'
    },
    {
      id: 'food-chemicals-codex',
      term: 'Food Chemicals Codex (FCC)',
      definition: 'An international standard defining purity and quality specifications for food-grade ingredients. Activated carbon meeting FCC standards is suitable for use in food and beverage processing.',
      extendedDefinition: 'The Food Chemicals Codex is published by the US Pharmacopeia and sets identity, purity, and quality standards for food ingredients worldwide. FCC-grade activated carbon must meet strict limits on heavy metals, ash content, and other impurities. This certification provides assurance that the carbon is suitable for applications where it may contact food or drinking water.',
      relatedTerms: ['NSF/ANSI 61', 'AWWA B604'],
      category: 'product'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Terms', count: glossaryTerms.length },
    { id: 'science', name: 'Science & Chemistry', count: glossaryTerms.filter(t => t.category === 'science').length },
    { id: 'product', name: 'Product Types', count: glossaryTerms.filter(t => t.category === 'product').length },
    { id: 'comparison', name: 'Comparisons', count: glossaryTerms.filter(t => t.category === 'comparison').length }
  ];

  const filteredTerms = glossaryTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleCategoryClick = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
  }, []);

  // DefinedTermSet schema for all glossary terms
  const definedTermSetSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': `${canonicalUrl}#glossary`,
    'name': 'Cat Litter and Activated Carbon Glossary',
    'description': 'Comprehensive glossary of terms related to activated carbon, cat litter odor control, and pet care science.',
    'hasDefinedTerm': glossaryTerms.map(term => ({
      '@type': 'DefinedTerm',
      '@id': `${canonicalUrl}#${term.id}`,
      'name': term.term,
      'description': term.definition,
      'inDefinedTermSet': `${canonicalUrl}#glossary`
    }))
  };

  // Speakable schema for voice search (combined with main schema in @graph)
  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': pageTitle,
    'speakable': {
      '@type': 'SpeakableSpecification',
      'cssSelector': ['.term-definition', '.term-name', '.speakable-content']
    },
    'url': canonicalUrl
  };

  return (
    <>
      <NextSeo {...nextSeoProps} />

      {/* Main Schema from useEnhancedSEO */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={generateJSONLD(schema)}
        />
      )}

      {/* DefinedTermSet Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSetSchema) }}
      />

      {/* Speakable Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />

      <main className="min-h-screen bg-[#FFFFF5] dark:bg-gray-900 transition-colors duration-300">
        {/* Breadcrumb Navigation */}
        <section className="py-4 border-b border-[#E0EFC7] dark:border-gray-800">
          <Container>
            <nav aria-label="Breadcrumb" className="flex items-center text-sm">
              <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
                <Home className="w-4 h-4" />
                <span className="sr-only">Home</span>
              </Link>
              {breadcrumb?.items?.slice(1).map((item, index, arr) => (
                <span key={item.path} className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1 text-gray-400 dark:text-gray-500" />
                  {index === arr.length - 1 ? (
                    <span aria-current="page" className="font-medium text-gray-900 dark:text-gray-100">{item.name}</span>
                  ) : (
                    <Link href={item.path} className="text-gray-500 dark:text-gray-400 hover:text-[#FF3131] dark:hover:text-[#FF5050] transition-colors">
                      {item.name}
                    </Link>
                  )}
                </span>
              ))}
            </nav>
          </Container>
        </section>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-electric-indigo via-electric-indigo-600 to-deep-coral relative overflow-hidden">
          <Container>
            <div className="text-center text-white dark:text-gray-100 max-w-4xl mx-auto">
              <BookOpen className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                Cat Litter & Activated Carbon Glossary
              </h1>
              <p className="text-xl md:text-2xl mb-4 opacity-90 speakable-content">
                Understanding the science behind odor control
              </p>
              <p className="text-lg opacity-75 max-w-2xl mx-auto">
                Learn the key terms and concepts behind activated carbon technology, cat litter science, and effective odor elimination.
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative mt-8">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Search terms..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg text-gray-900 dark:text-gray-50 text-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-white/50 dark:bg-gray-800/50 border-b border-[#E0EFC7] dark:border-gray-700">
          <Container>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-electric-indigo text-white dark:text-gray-100 shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </Container>
        </section>

        {/* Glossary Terms */}
        <section className="py-16">
          <Container>
            <div className="max-w-4xl mx-auto">
              <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
                {filteredTerms.length} term{filteredTerms.length !== 1 ? 's' : ''} found
              </p>

              <div className="space-y-6">
                {filteredTerms.map((term) => (
                  <div
                    key={term.id}
                    id={term.id}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 hover:shadow-xl transition-all duration-300"
                  >
                    <h2 className="term-name speakable-content text-2xl font-heading font-bold text-gray-900 dark:text-gray-100 mb-3">
                      {term.term}
                    </h2>
                    <p className="term-definition speakable-content text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
                      {term.definition}
                    </p>
                    {term.extendedDefinition && (
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 border-l-4 border-electric-indigo/30 pl-4">
                        {term.extendedDefinition}
                      </p>
                    )}
                    {term.relatedTerms && term.relatedTerms.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        <span className="text-sm text-gray-500 dark:text-gray-500">Related:</span>
                        {term.relatedTerms.map((related) => {
                          const relatedTerm = glossaryTerms.find(t => t.term === related);
                          return (
                            <a
                              key={related}
                              href={relatedTerm ? `#${relatedTerm.id}` : '#'}
                              className="text-sm px-2 py-1 bg-electric-indigo/10 dark:bg-electric-indigo/20 text-electric-indigo dark:text-electric-indigo-400 rounded-full hover:bg-electric-indigo/20 dark:hover:bg-electric-indigo/30 transition-colors"
                            >
                              {related}
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredTerms.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="font-heading text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    No terms found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-500">
                    Try adjusting your search terms or category filter
                  </p>
                </div>
              )}
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-electric-indigo via-electric-indigo-600 to-deep-coral relative overflow-hidden">
          <Container>
            <div className="text-center text-white dark:text-gray-100 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                See Activated Carbon in Action
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Now that you understand the science, experience it for yourself with our risk-free trial.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`${locale === 'fr' ? '/fr' : ''}/products/trial-size`}>
                  <Button size="lg" className="bg-white dark:bg-gray-900 text-electric-indigo hover:bg-gray-100 hover:scale-105 dark:hover:bg-gray-700 font-bold transition-all duration-300">
                    {trialCtaLabel}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href={`${locale === 'fr' ? '/fr' : ''}/learn/how-it-works`}>
                  <Button size="lg" variant="outline" className="border-white dark:border-gray-600 text-gray-900 dark:text-gray-50 hover:bg-white hover:scale-105 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-50 transition-all duration-300">
                    Learn How It Works
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
                Continue Learning
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href={`${locale === 'fr' ? '/fr' : ''}/learn/how-it-works`} className="group">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <h3 className="text-xl font-heading font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-electric-indigo transition-colors">
                    How It Works
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Dive deeper into the science of activated carbon and molecular adsorption.
                  </p>
                </div>
              </Link>

              <Link href={`${locale === 'fr' ? '/fr' : ''}/learn/faq`} className="group">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <h3 className="text-xl font-heading font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-electric-indigo transition-colors">
                    FAQ
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Get answers to common questions about activated carbon and Purrify.
                  </p>
                </div>
              </Link>

              <Link href={`${locale === 'fr' ? '/fr' : ''}/learn/safety`} className="group">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-electric-indigo/10 dark:border-electric-indigo/20 hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <h3 className="text-xl font-heading font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-electric-indigo transition-colors">
                    Safety Information
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Learn about certifications, standards, and product safety details.
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

export default GlossaryPage;
