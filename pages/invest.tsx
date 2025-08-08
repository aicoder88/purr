import { NextSeo } from 'next-seo';
import { Container } from '../src/components/ui/container';
import { Button } from '../src/components/ui/button';
import NextImage from '../components/NextImage';
import { useState } from 'react';
import Link from 'next/link';
import { BarChart, LineChart, PieChart, ProgressRing } from '../src/components/ui/charts';

export default function InvestorRelations() {
  const [activeTab, setActiveTab] = useState('overview');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTab = (direction: 'prev' | 'next') => {
    const tabs = ['overview', 'problem', 'solution', 'traction', 'financials', 'team', 'investment'];
    const currentIndex = tabs.indexOf(activeTab);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
    } else {
      newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
    }
    
    setActiveTab(tabs[newIndex]);
    scrollToTop();
  };

  return (
    <>
      <NextSeo
        title="Investor Relations - Purrify"
        description="Investment opportunity in Purrify, an innovative activated carbon cat litter additive company. Raising CAD $50K @ $1M pre-money valuation."
        canonical="https://purrify.ca/invest"
        openGraph={{
          title: 'Investor Relations - Purrify',
          description: 'Investment opportunity in Purrify, an innovative activated carbon cat litter additive company.',
          url: 'https://purrify.ca/invest',
          siteName: 'Purrify',
          images: [
            {
              url: 'https://purrify.ca/purrify-logo-text.png',
              width: 1200,
              height: 630,
              alt: 'Purrify Logo',
            }
          ],
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-[#FFFFF5] via-[#FFFFFF] to-[#E0EFC7]/30 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-[#FF3131]/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#5B2EFF]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-[#E0EFC7]/30 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        

        {/* Navigation Tabs */}
        <Container>
          <div className="pt-8 mb-4 relative z-10">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-lg shadow-md border border-white/20 dark:border-gray-700/50 p-1">
              <div className="flex flex-wrap justify-center gap-1">
                {[
                  { id: 'overview', label: 'Executive Summary' },
                  { id: 'problem', label: 'Market Opportunity' },
                  { id: 'solution', label: 'Our Solution' },
                  { id: 'traction', label: 'Traction' },
                  { id: 'financials', label: 'Unit Economics' },
                  { id: 'team', label: 'Team' },
                  { id: 'investment', label: 'Investment Terms' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      scrollToTop();
                    }}
                    className={`px-3 py-1.5 text-sm font-medium transition-all duration-300 rounded-lg ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] text-white shadow-lg transform scale-105'
                        : 'text-gray-600 dark:text-gray-300 hover:text-[#333333] dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Container>

        {/* Middle Navigation Buttons */}
        <Container>
          <div className="flex justify-center mb-4 relative z-10">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-lg shadow-md border border-white/20 dark:border-gray-700/50 p-2">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigateTab('prev')}
                  className="flex items-center px-4 py-2 text-sm bg-gradient-to-r from-[#FF3131] to-[#5B2EFF] text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <span className="text-sm mr-1">←</span>
                  Previous
                </button>
                
                <div className="flex space-x-1">
                  {['overview', 'problem', 'solution', 'traction', 'financials', 'team', 'investment'].map((tab, index) => (
                    <div
                      key={tab}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        activeTab === tab ? 'bg-[#FF3131] w-4' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={() => navigateTab('next')}
                  className="flex items-center px-4 py-2 text-sm bg-gradient-to-r from-[#5B2EFF] to-[#FF3131] text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Next
                  <span className="text-sm ml-1">→</span>
                </button>
              </div>
            </div>
          </div>
        </Container>

        {/* Content Sections */}
        <Container>
          <div className="max-w-6xl mx-auto pb-16">
            
            {/* Executive Summary */}
            {activeTab === 'overview' && (
              <section className="space-y-12 relative z-10">
                {/* Hero Section - Only on overview tab */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                  <div className="mb-8">
                    <NextImage
                      src="/optimized/purrify-logo-text.webp"
                      alt="Purrify Logo"
                      width={200}
                      height={80}
                      className="mx-auto mb-6"
                    />
                  </div>
                  
                  <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6 text-[#333333] dark:text-white select-all cursor-text">
                    Revolutionary Odor Solution for 52 Million North American Cat Owners
                  </h1>
                  
                  <p className="text-xl lg:text-2xl text-[#333333] dark:text-gray-300 mb-8 leading-relaxed">
                    Growing pet care innovation company with molecular-level odor elimination technology
                  </p>
                  
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl p-8 mb-12 border border-white/20 dark:border-gray-700/50 relative z-10">
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                      <div className="relative">
                        <div className="text-3xl font-bold text-[#FF3131] mb-2 drop-shadow-sm">CAD $50K</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Current Round</div>
                        <ProgressRing percentage={75} label="Target Progress" color="#FF3131" size={80} className="mt-4" />
                      </div>
                      <div className="relative">
                        <div className="text-3xl font-bold text-[#5B2EFF] mb-2 drop-shadow-sm">$1M</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Pre-Money Valuation</div>
                        <ProgressRing percentage={100} label="Validated" color="#5B2EFF" size={80} className="mt-4" />
                      </div>
                      <div className="relative">
                        <div className="text-3xl font-bold text-[#FF3131] mb-2 drop-shadow-sm">16</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Retail Partners</div>
                        <ProgressRing percentage={68} label="Reorder Rate" color="#2ed573" size={80} className="mt-4" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 dark:border-gray-700/50">
                  <h2 className="text-3xl font-bold text-[#333333] dark:text-white mb-6 drop-shadow-sm">Executive Summary</h2>
                  
                  <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-xl font-semibold text-[#FF3131] mb-4 drop-shadow-sm">The Opportunity</h3>
                      <p className="text-gray-600 dark:text-gray-200 mb-6 leading-relaxed">
                        Purrify addresses the #1 pain point of urban cat owners: persistent litter box odor. Our premium activated carbon additive provides molecular-level odor elimination, creating a new product category in the $160M Canadian pet care market.
                      </p>
                      
                      <h3 className="text-xl font-semibold text-[#5B2EFF] mb-4 drop-shadow-sm">Competitive Advantages</h3>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-200">
                        <li className="flex items-start">
                          <span className="text-[#FF3131] mr-2 font-bold">✓</span>
                          First dedicated carbon additive in Canadian market
                        </li>
                        <li className="flex items-start">
                          <span className="text-[#FF3131] mr-2 font-bold">✓</span>
                          50%+ gross margins with retailer-friendly economics
                        </li>
                        <li className="flex items-start">
                          <span className="text-[#FF3131] mr-2 font-bold">✓</span>
                          Proven traction: 16 Montreal stores, 4 reorders this week
                        </li>
                        <li className="flex items-start">
                          <span className="text-[#FF3131] mr-2 font-bold">✓</span>
                          Superior coconut shell carbon technology
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <PieChart
                        data={[
                          { label: 'Gross Margin', value: 47, color: '#FF3131' },
                          { label: 'Cost of Goods', value: 53, color: '#E0EFC7' }
                        ]}
                        title="Unit Economics Breakdown"
                        className="mb-6"
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl p-4 border border-white/30 dark:border-gray-600/50">
                          <div className="text-2xl font-bold text-[#FF3131] drop-shadow-sm">$3K+</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">Early Revenue</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Zero Paid Ads</div>
                        </div>
                        <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl p-4 border border-white/30 dark:border-gray-600/50">
                          <div className="text-2xl font-bold text-[#5B2EFF] drop-shadow-sm">18M</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">To EBITDA+</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Months</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Growth trajectory visualization */}
                  <LineChart
                    data={[
                      { label: '2024', value: 3000 },
                      { label: '2025', value: 480000 },
                      { label: '2026', value: 2400000 },
                      { label: '2027', value: 8500000 },
                      { label: '2028', value: 24000000 }
                    ]}
                    title="Revenue Growth Projection"
                  />
                </div>
              </section>
            )}

            {/* Market Opportunity */}
            {activeTab === 'problem' && (
              <section className="space-y-8 relative z-10">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 dark:border-gray-700/50">
                  <h2 className="text-3xl font-bold text-[#333333] dark:text-white mb-6 drop-shadow-sm">Market Opportunity</h2>
                  
                  <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-xl font-semibold text-[#FF3131] mb-4 drop-shadow-sm">The Problem</h3>
                      <div className="space-y-4">
                        <div className="bg-white/60 dark:bg-red-900/20 backdrop-blur-sm rounded-xl p-4 border border-[#FF3131]/30 border-l-4 border-l-[#FF3131]">
                          <h4 className="font-semibold mb-2 text-gray-800 dark:text-white">Urban Cat Owners' #1 Complaint</h4>
                          <p className="text-gray-600 dark:text-gray-200">Persistent litter box odor in small apartments with no escape</p>
                        </div>
                        <div className="bg-white/60 dark:bg-red-900/20 backdrop-blur-sm rounded-xl p-4 border border-[#FF3131]/30 border-l-4 border-l-[#FF3131]">
                          <h4 className="font-semibold mb-2 text-gray-800 dark:text-white">Inadequate Solutions</h4>
                          <p className="text-gray-600 dark:text-gray-200">Existing products only mask odors or require constant maintenance</p>
                        </div>
                        <div className="bg-white/60 dark:bg-red-900/20 backdrop-blur-sm rounded-xl p-4 border border-[#FF3131]/30 border-l-4 border-l-[#FF3131]">
                          <h4 className="font-semibold mb-2 text-gray-800 dark:text-white">Multi-Cat Households</h4>
                          <p className="text-gray-600 dark:text-gray-200">Problem multiplies with multiple cats, demanding better solutions</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <BarChart
                        data={[
                          { label: 'Cat Owners (Millions)', value: 52, color: 'bg-gradient-to-r from-[#FF3131] to-[#FF5050]' },
                          { label: 'Market Size ($M CAD)', value: 160, color: 'bg-gradient-to-r from-[#5B2EFF] to-[#3694FF]' },
                          { label: 'Online CAGR (%)', value: 6.2, color: 'bg-gradient-to-r from-[#2ed573] to-[#7bed9f]' }
                        ]}
                        title="Canadian Market Overview"
                        className="mb-6"
                      />
                      
                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-center bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl p-3 border border-white/30 dark:border-gray-600/50">
                          <div className="text-2xl font-bold text-[#FF3131] drop-shadow-sm">52M</div>
                          <div className="text-xs text-gray-600 dark:text-gray-300">Cat Owners</div>
                        </div>
                        <div className="text-center bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl p-3 border border-white/30 dark:border-gray-600/50">
                          <div className="text-2xl font-bold text-[#5B2EFF] drop-shadow-sm">$160M</div>
                          <div className="text-xs text-gray-600 dark:text-gray-300">TAM</div>
                        </div>
                        <div className="text-center bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl p-3 border border-white/30 dark:border-gray-600/50">
                          <div className="text-2xl font-bold text-[#2ed573] drop-shadow-sm">6.2%</div>
                          <div className="text-xs text-gray-600 dark:text-gray-300">CAGR</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-md rounded-xl p-6 border border-white/30 dark:border-gray-600/50">
                    <h3 className="text-xl font-semibold text-[#333333] dark:text-white mb-4 drop-shadow-sm">Market Drivers</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center p-3 bg-white/40 dark:bg-gray-600/40 rounded-lg backdrop-blur-sm">
                          <span className="text-[#FF3131] text-xl mr-3 font-bold">✓</span>
                          <div>
                            <span className="font-medium text-gray-800 dark:text-white">Pet Humanization</span>
                            <p className="text-sm text-gray-600 dark:text-gray-300">76% consider cats family members</p>
                          </div>
                        </div>
                        <div className="flex items-center p-3 bg-white/40 dark:bg-gray-600/40 rounded-lg backdrop-blur-sm">
                          <span className="text-[#5B2EFF] text-xl mr-3 font-bold">✓</span>
                          <div>
                            <span className="font-medium text-gray-800 dark:text-white">Premium Shift</span>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Medium-high price segment dominates (35.2%)</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center p-3 bg-white/40 dark:bg-gray-600/40 rounded-lg backdrop-blur-sm">
                          <span className="text-[#2ed573] text-xl mr-3 font-bold">✓</span>
                          <div>
                            <span className="font-medium text-gray-800 dark:text-white">Sustainability Focus</span>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Eco-products grow 9.63% faster</p>
                          </div>
                        </div>
                        <div className="flex items-center p-3 bg-white/40 dark:bg-gray-600/40 rounded-lg backdrop-blur-sm">
                          <span className="text-[#FF3131] text-xl mr-3 font-bold">✓</span>
                          <div>
                            <span className="font-medium text-gray-800 dark:text-white">Urban Density</span>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Apartment living drives demand for odor solutions</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Solution */}
            {activeTab === 'solution' && (
              <section className="space-y-8 relative z-10">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 dark:border-gray-700/50">
                  <h2 className="text-3xl font-bold text-[#333333] dark:text-white mb-6 drop-shadow-sm">Our Solution</h2>
                  
                  <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-xl font-semibold text-[#FF3131] mb-4">Purrify Activated Carbon Additive</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        Premium coconut shell activated carbon that adsorbs odor molecules at the molecular level. Unlike competitors who mask odors with chemicals, we eliminate them completely through proven scientific principles.
                      </p>
                      
                      <h4 className="text-lg font-semibold text-[#5B2EFF] mb-3">Key Benefits</h4>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <span className="text-[#FF3131] text-xl mr-3">✓</span>
                          <div>
                            <span className="font-medium text-gray-800 dark:text-white">Molecular Odor Elimination</span>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Activated carbon adsorbs odor molecules permanently</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <span className="text-[#FF3131] text-xl mr-3">✓</span>
                          <div>
                            <span className="font-medium text-gray-800 dark:text-white">Universal Compatibility</span>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Works with any litter type - no switching required</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <span className="text-[#FF3131] text-xl mr-3">✓</span>
                          <div>
                            <span className="font-medium text-gray-800 dark:text-white">100% Natural & Safe</span>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Food-grade coconut shell carbon, completely pet-safe</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <span className="text-[#FF3131] text-xl mr-3">✓</span>
                          <div>
                            <span className="font-medium text-gray-800 dark:text-white">Simple Application</span>
                            <p className="text-sm text-gray-600 dark:text-gray-300">Sprinkle, mix, done - immediate results</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <BarChart
                        data={[
                          { label: 'Trial Size (17g)', value: 28, color: 'bg-gradient-to-r from-[#FF3131] to-[#FF5050]' },
                          { label: 'Medium (60g)', value: 47, color: 'bg-gradient-to-r from-[#5B2EFF] to-[#3694FF]' },
                          { label: 'Large (140g)', value: 40, color: 'bg-gradient-to-r from-[#2ed573] to-[#7bed9f]' }
                        ]}
                        title="Product Line Margins (%)"
                        className="mb-6"
                      />
                      
                      <div className="space-y-4">
                        <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl p-4 border border-white/30 dark:border-gray-600/50">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold text-gray-800 dark:text-white">Trial Size (17g)</h4>
                            <span className="text-[#FF3131] font-bold drop-shadow-sm">28% margin</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Perfect impulse buy, proves efficacy fast</p>
                        </div>
                        <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl p-4 border border-white/30 dark:border-gray-600/50">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold text-gray-800 dark:text-white">Medium (60g)</h4>
                            <span className="text-[#5B2EFF] font-bold drop-shadow-sm">47% margin</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Most popular, ideal for single-cat homes</p>
                        </div>
                        <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl p-4 border border-white/30 dark:border-gray-600/50">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold text-gray-800 dark:text-white">Large (140g)</h4>
                            <span className="text-[#2ed573] font-bold drop-shadow-sm">40% margin</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Multi-cat powerhouse, best value</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-[#FF3131]/10 to-[#5B2EFF]/10 dark:from-red-900/20 dark:to-purple-900/20 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-[#333333] dark:text-white mb-4">Competitive Differentiation</h3>
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                      <div>
                        <div className="text-lg font-bold text-[#FF3131] mb-2">Competitors</div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Chemical fragrances that mask odors temporarily</p>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-[#5B2EFF] mb-2">VS</div>
                        <div className="w-8 h-8 mx-auto bg-[#5B2EFF] rounded-full flex items-center justify-center">
                          <span className="text-white text-xl">⚡</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-[#FF3131] mb-2">Purrify</div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Scientific molecular adsorption that eliminates odors permanently</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Traction */}
            {activeTab === 'traction' && (
              <section className="space-y-8 relative z-10">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 dark:border-gray-700/50">
                  <h2 className="text-3xl font-bold text-[#333333] dark:text-white mb-6 drop-shadow-sm">Market Traction</h2>
                  
                  <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <div className="text-center bg-white/60 dark:bg-red-900/20 backdrop-blur-sm rounded-xl p-6 border border-white/30 dark:border-gray-600/50">
                      <ProgressRing percentage={100} label="Stores Onboarded" color="#FF3131" size={60} />
                      <div className="text-4xl font-bold text-[#FF3131] mb-2 drop-shadow-sm mt-4">16</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Montreal Stores</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Onboarded</div>
                    </div>
                    <div className="text-center bg-white/60 dark:bg-purple-900/20 backdrop-blur-sm rounded-xl p-6 border border-white/30 dark:border-gray-600/50">
                      <ProgressRing percentage={25} label="Reorder Rate" color="#5B2EFF" size={60} />
                      <div className="text-4xl font-bold text-[#5B2EFF] mb-2 drop-shadow-sm mt-4">4</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Stores Reordered</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">This Week</div>
                    </div>
                    <div className="text-center bg-white/60 dark:bg-red-900/20 backdrop-blur-sm rounded-xl p-6 border border-white/30 dark:border-gray-600/50">
                      <ProgressRing percentage={85} label="Revenue Growth" color="#2ed573" size={60} />
                      <div className="text-4xl font-bold text-[#2ed573] mb-2 drop-shadow-sm mt-4">$3K+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Early Revenue</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Zero Paid Ads</div>
                    </div>
                    <div className="text-center bg-white/60 dark:bg-purple-900/20 backdrop-blur-sm rounded-xl p-6 border border-white/30 dark:border-gray-600/50">
                      <ProgressRing percentage={68} label="Product Mix" color="#5B2EFF" size={60} />
                      <div className="text-4xl font-bold text-[#5B2EFF] mb-2 drop-shadow-sm mt-4">68%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Choose Medium</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Highest Margin</div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <BarChart
                      data={[
                        { label: 'Stores Onboarded', value: 16, color: 'bg-gradient-to-r from-[#FF3131] to-[#FF5050]' },
                        { label: 'Reorders This Week', value: 4, color: 'bg-gradient-to-r from-[#5B2EFF] to-[#3694FF]' },
                        { label: 'Revenue ($K)', value: 3, color: 'bg-gradient-to-r from-[#2ed573] to-[#7bed9f]' }
                      ]}
                      title="Current Traction Metrics"
                    />
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-[#FF3131] mb-4">Customer Testimonials</h3>
                      <div className="space-y-4">
                        <div className="bg-[#E0EFC7]/20 dark:bg-gray-700/50 rounded-xl p-4 border-l-4 border-[#FF3131]">
                          <p className="italic mb-2 text-gray-700 dark:text-gray-200">"My customers keep asking when you're restocking Purrify. They say it's the first thing that actually works!"</p>
                          <div className="text-sm text-gray-600 dark:text-gray-400">— Chico Pet Store, Montreal</div>
                        </div>
                        <div className="bg-[#E0EFC7]/20 dark:bg-gray-700/50 rounded-xl p-4 border-l-4 border-[#5B2EFF]">
                          <p className="italic mb-2 text-gray-700 dark:text-gray-200">"Finally, a product that eliminates odor instead of just covering it up. My apartment stays fresh for days."</p>
                          <div className="text-sm text-gray-600 dark:text-gray-400">— Verified Customer Review</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-[#5B2EFF] mb-4">Foundation Built</h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <span className="text-[#FF3131] text-xl mr-3">✓</span>
                          <span className="text-gray-700 dark:text-gray-200">Brand & packaging perfected</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-[#FF3131] text-xl mr-3">✓</span>
                          <span className="text-gray-700 dark:text-gray-200">Website & SEO optimized</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-[#FF3131] text-xl mr-3">✓</span>
                          <span className="text-gray-700 dark:text-gray-200">Supply chain tested & proven</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-[#FF3131] text-xl mr-3">✓</span>
                          <span className="text-gray-700 dark:text-gray-200">Customer testimonials flowing in</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-[#FF3131] text-xl mr-3">✓</span>
                          <span className="text-gray-700 dark:text-gray-200">Retailer relationships established</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Unit Economics */}
            {activeTab === 'financials' && (
              <section className="space-y-8 relative z-10">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 dark:border-gray-700/50">
                  <h2 className="text-3xl font-bold text-[#333333] dark:text-white mb-6 drop-shadow-sm">Unit Economics</h2>
                  
                  <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-xl font-semibold text-[#FF3131] mb-4">Medium SKU Breakdown (60g)</h3>
                      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                        <table className="w-full">
                          <tbody>
                            <tr className="bg-gray-50 dark:bg-gray-700">
                              <td className="px-4 py-3 font-medium text-gray-800 dark:text-white">Wholesale Price</td>
                              <td className="px-4 py-3 text-right font-bold text-[#FF3131]">$2.25</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-gray-700 dark:text-gray-200">Raw Materials</td>
                              <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200">$0.60</td>
                            </tr>
                            <tr className="bg-gray-50 dark:bg-gray-700">
                              <td className="px-4 py-3 text-gray-700 dark:text-gray-200">Packaging</td>
                              <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200">$0.14</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-gray-700 dark:text-gray-200">Labor</td>
                              <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200">$0.12</td>
                            </tr>
                            <tr className="bg-gray-50 dark:bg-gray-700">
                              <td className="px-4 py-3 text-gray-700 dark:text-gray-200">Fixed Costs</td>
                              <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200">$0.13</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 text-gray-700 dark:text-gray-200">Marketing & Admin</td>
                              <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-200">$0.20</td>
                            </tr>
                            <tr className="bg-[#FF3131]/10 dark:bg-red-900/20 border-t-2 border-[#FF3131]">
                              <td className="px-4 py-3 font-bold text-gray-800 dark:text-white">GROSS PROFIT</td>
                              <td className="px-4 py-3 text-right font-bold text-[#FF3131]">$1.06 (47%)</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div>
                      <PieChart
                        data={[
                          { label: 'Gross Profit', value: 47, color: '#FF3131' },
                          { label: 'Raw Materials', value: 26.7, color: '#5B2EFF' },
                          { label: 'Packaging', value: 6.2, color: '#2ed573' },
                          { label: 'Labor', value: 5.3, color: '#FF6B47' },
                          { label: 'Fixed Costs', value: 5.8, color: '#3694FF' },
                          { label: 'Marketing & Admin', value: 8.9, color: '#7bed9f' }
                        ]}
                        title="Cost Breakdown (Medium SKU)"
                        className="mb-6"
                      />
                      
                      <h3 className="text-xl font-semibold text-[#5B2EFF] mb-4 drop-shadow-sm">Scale Economics</h3>
                      <div className="space-y-4">
                        <div className="bg-[#5B2EFF]/10 dark:bg-purple-900/20 rounded-xl p-4">
                          <h4 className="font-semibold mb-2 text-gray-800 dark:text-white">Current Scale (1K bags/month)</h4>
                          <div className="text-2xl font-bold text-[#5B2EFF] mb-1">47%</div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Gross Margin</p>
                        </div>
                        <div className="bg-[#FF3131]/10 dark:bg-red-900/20 rounded-xl p-4">
                          <h4 className="font-semibold mb-2 text-gray-800 dark:text-white">Target Scale (100K bags/month)</h4>
                          <div className="text-2xl font-bold text-[#FF3131] mb-1">55%+</div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Gross Margin (Fixed costs drop to $0.05/bag)</p>
                        </div>
                        <div className="bg-[#E0EFC7]/30 dark:bg-gray-700/50 rounded-xl p-4">
                          <h4 className="font-semibold mb-2 text-gray-800 dark:text-white">Cash Efficiency</h4>
                          <div className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
                            <div className="text-gray-600 dark:text-gray-300">• Retailers pay on delivery</div>
                            <div className="text-gray-600 dark:text-gray-300">• Suppliers on COD</div>
                            <div className="text-gray-600 dark:text-gray-300">• Tight working capital cycle</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-[#FF3131]/10 to-[#5B2EFF]/10 dark:from-red-900/20 dark:to-purple-900/20 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-[#333333] dark:text-white mb-4">Growth Projections</h3>
                    <div className="grid md:grid-cols-4 gap-6 text-center">
                      <div>
                        <div className="text-lg font-bold mb-1 text-gray-800 dark:text-white">2025</div>
                        <div className="text-2xl font-bold text-[#FF3131] mb-1">$480K</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Revenue</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold mb-1 text-gray-800 dark:text-white">2026</div>
                        <div className="text-2xl font-bold text-[#5B2EFF] mb-1">$2.4M</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Revenue</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold mb-1 text-gray-800 dark:text-white">2027</div>
                        <div className="text-2xl font-bold text-[#FF3131] mb-1">$8.5M</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Revenue</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold mb-1 text-gray-800 dark:text-white">2028</div>
                        <div className="text-2xl font-bold text-[#5B2EFF] mb-1">$24M</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Target Exit</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Team */}
            {activeTab === 'team' && (
              <section className="space-y-8 relative z-10">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 dark:border-gray-700/50">
                  <h2 className="text-3xl font-bold text-[#333333] dark:text-white mb-6 drop-shadow-sm">Leadership Team</h2>
                  
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-[#FF3131] to-[#FF5050] rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-2xl">D</span>
                      </div>
                      <h3 className="text-xl font-bold text-[#FF3131] mb-2">Drago - CEO</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">The Marketing Genius</p>
                      <div className="text-left space-y-2 text-sm">
                        <div className="flex items-start">
                          <span className="text-[#FF3131] mr-2">•</span>
                          <span className="text-gray-700 dark:text-gray-200">Built manufacturing company from scratch twice</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-[#FF3131] mr-2">•</span>
                          <span className="text-gray-700 dark:text-gray-200">Growth marketer + direct response copywriter</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-[#FF3131] mr-2">•</span>
                          <span className="text-gray-700 dark:text-gray-200">Deep activated-carbon knowledge</span>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-[#FF3131]/10 dark:bg-red-900/20 rounded-lg">
                        <div className="text-xs font-semibold text-[#FF3131]">SUPERPOWER</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Turns marketing into profit machines</div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-[#5B2EFF] to-[#3694FF] rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-2xl">A</span>
                      </div>
                      <h3 className="text-xl font-bold text-[#5B2EFF] mb-2">Anthony - COO</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">The Operations Machine</p>
                      <div className="text-left space-y-2 text-sm">
                        <div className="flex items-start">
                          <span className="text-[#5B2EFF] mr-2">•</span>
                          <span className="text-gray-700 dark:text-gray-200">Supply chain optimization expert</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-[#5B2EFF] mr-2">•</span>
                          <span className="text-gray-700 dark:text-gray-200">Sales & customer relations master</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-[#5B2EFF] mr-2">•</span>
                          <span className="text-gray-700 dark:text-gray-200">Backend systems architect</span>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-[#5B2EFF]/10 dark:bg-purple-900/20 rounded-lg">
                        <div className="text-xs font-semibold text-[#5B2EFF]">SUPERPOWER</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Makes impossible things happen</div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-[#2ed573] to-[#7bed9f] rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-2xl">K</span>
                      </div>
                      <h3 className="text-xl font-bold text-[#2ed573] mb-2">Key Advisor</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">Ex-P&G Brand Manager</p>
                      <div className="text-left space-y-2 text-sm">
                        <div className="flex items-start">
                          <span className="text-[#2ed573] mr-2">•</span>
                          <span className="text-gray-700 dark:text-gray-200">CPG discipline & merchandising</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-[#2ed573] mr-2">•</span>
                          <span className="text-gray-700 dark:text-gray-200">Retail partnership expertise</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-[#2ed573] mr-2">•</span>
                          <span className="text-gray-700 dark:text-gray-200">Scale-up guidance</span>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-[#2ed573]/10 dark:bg-green-900/20 rounded-lg">
                        <div className="text-xs font-semibold text-[#2ed573]">SUPERPOWER</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Knows how to dominate retail</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 bg-[#E0EFC7]/20 dark:bg-gray-700/50 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-[#333333] dark:text-white mb-4">Strategic Roadmap</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-[#FF3131] mb-3">Near Term (2025)</h4>
                        <div className="space-y-2 text-sm">
                          <div className="text-gray-600 dark:text-gray-300">• Quebec → Ontario expansion via rep network</div>
                          <div className="text-gray-600 dark:text-gray-300">• Amazon Canada launch with keyword domination</div>
                          <div className="text-gray-600 dark:text-gray-300">• British Columbia distributor partnerships</div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#5B2EFF] mb-3">Medium Term (2026-2028)</h4>
                        <div className="space-y-2 text-sm">
                          <div className="text-gray-600 dark:text-gray-300">• Amazon US expansion + Chewy onboarding</div>
                          <div className="text-gray-600 dark:text-gray-300">• Major chain discussions and rollout</div>
                          <div className="text-gray-600 dark:text-gray-300">• Strategic acquisition opportunities</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Investment Terms */}
            {activeTab === 'investment' && (
              <section className="space-y-8 relative z-10">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 dark:border-gray-700/50">
                  <h2 className="text-3xl font-bold text-[#333333] dark:text-white mb-6 drop-shadow-sm">Investment Terms</h2>
                  
                  <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    <div>
                      <div className="bg-gradient-to-r from-[#FF3131]/10 to-[#5B2EFF]/10 dark:from-red-900/20 dark:to-purple-900/20 rounded-2xl p-6 mb-6">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-[#FF3131] mb-2">CAD $50K</div>
                          <div className="text-lg text-gray-600 dark:text-gray-400 mb-4">Current Round</div>
                          <div className="text-2xl font-bold text-[#5B2EFF] mb-2">$1M Pre-Money</div>
                          <div className="text-lg text-gray-600 dark:text-gray-400">SAFE Agreement</div>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-[#FF3131] mb-4">Use of Funds</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-[#FF3131]/10 dark:bg-red-900/20 rounded-lg">
                          <span className="text-gray-700 dark:text-gray-200">Marketing & Growth</span>
                          <span className="font-bold">65% ($32.5K)</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-[#5B2EFF]/10 dark:bg-purple-900/20 rounded-lg">
                          <span className="text-gray-700 dark:text-gray-200">Inventory Scale-up</span>
                          <span className="font-bold">20% ($10K)</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-[#E0EFC7]/30 dark:bg-gray-700/50 rounded-lg">
                          <span className="text-gray-700 dark:text-gray-200">Working Capital</span>
                          <span className="font-bold">15% ($7.5K)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <PieChart
                        data={[
                          { label: 'Marketing & Growth', value: 65, color: '#FF3131' },
                          { label: 'Inventory Scale-up', value: 20, color: '#5B2EFF' },
                          { label: 'Working Capital', value: 15, color: '#2ed573' }
                        ]}
                        title="Use of Funds Breakdown"
                        className="mb-6"
                      />
                      
                      <h3 className="text-xl font-semibold text-[#5B2EFF] mb-4 drop-shadow-sm">Investment Highlights</h3>
                      <div className="space-y-4">
                        <div className="bg-[#E0EFC7]/20 dark:bg-gray-700/50 rounded-xl p-4 border-l-4 border-[#FF3131]">
                          <h4 className="font-semibold mb-2">18-Month Runway</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Path to EBITDA positive with efficient cash use</p>
                        </div>
                        <div className="bg-[#E0EFC7]/20 dark:bg-gray-700/50 rounded-xl p-4 border-l-4 border-[#5B2EFF]">
                          <h4 className="font-semibold mb-2">Proven Demand</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">16 stores onboarded, 4 reorders this week</p>
                        </div>
                        <div className="bg-[#E0EFC7]/20 dark:bg-gray-700/50 rounded-xl p-4 border-l-4 border-[#FF3131]">
                          <h4 className="font-semibold mb-2">Experienced Team</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">5+ years in category, proven track record</p>
                        </div>
                        <div className="bg-[#E0EFC7]/20 dark:bg-gray-700/50 rounded-xl p-4 border-l-4 border-[#5B2EFF]">
                          <h4 className="font-semibold mb-2">Multiple Exit Paths</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Strategic acquisition or dividend machine</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-[#FF3131]/10 to-[#5B2EFF]/10 dark:from-red-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-8">
                    <h3 className="text-xl font-semibold text-[#333333] dark:text-white mb-4 text-center">Why Invest Now?</h3>
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                      <div>
                        <div className="text-2xl mb-2">🚀</div>
                        <h4 className="font-semibold mb-2">First Mover Advantage</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">No direct competitors in Canadian market</p>
                      </div>
                      <div>
                        <div className="text-2xl mb-2">📈</div>
                        <h4 className="font-semibold mb-2">Proven Unit Economics</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">47% gross margins scaling to 55%+</p>
                      </div>
                      <div>
                        <div className="text-2xl mb-2">💰</div>
                        <h4 className="font-semibold mb-2">Clear Exit Strategy</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Target valuation: $150M - $300M</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                      Ready to join us in revolutionizing pet care?
                    </p>
                    <div className="space-y-4">
                      <Button
                        onClick={() => window.open('https://calendly.com/copywriting', '_blank')}
                        size="lg"
                        className="bg-gradient-primary text-white font-bold py-6 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Schedule Investor Call
                      </Button>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Or contact us directly: <a href="mailto:hello@purrify.ca" className="text-[#FF3131] hover:underline">hello@purrify.ca</a> • <a href="tel:+12504329352" className="text-[#FF3131] hover:underline">+1 250 432 9352</a>
                      </div>
                      <div className="text-xs text-gray-400 dark:text-gray-500">
                        Incorporated: BC1318076 | All financial projections are forward-looking statements
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

          </div>
        </Container>

      </div>
    </>
  );
}