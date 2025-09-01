import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../src/components/ui/card';
import { Button } from '../src/components/ui/button';
import { Badge } from '../src/components/ui/badge';
import { Container } from '../src/components/ui/container';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';

export default function DriverNetworkPresentation() {
  const [activeTab, setActiveTab] = useState('executive-summary');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTab = (direction: 'prev' | 'next') => {
    const tabs = [
      'executive-summary', 'company-evolution', 'service-divisions',
      'performance-metrics', 'case-study-instacart', 'case-study-tesla', 'case-study-medical', 'case-study-bmw',
      'driver-excellence', 'technology-integration', 'client-portfolio',
      'rapid-deployment', 'geographic-coverage',
      'partnership-proposal', 'competitive-advantage', 'service-integration', 'roi-projection', 'next-steps'
    ];
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

  const stats = [
    { label: 'Contracted Drivers', value: '1,000+', description: 'Across multiple industries' },
    { label: 'Active Markets', value: '19', description: 'Major North American cities' },
    { label: 'Years Operating', value: '12+', description: 'Since 2012' },
    { label: 'Vehicles Transported', value: '$50M+', description: 'In vehicle value safely delivered' }
  ];

  const partnerships = [
    { name: 'Instacart', markets: 6, achievement: '100% on-time delivery' },
    { name: 'Tesla', category: 'Automotive', achievement: '99.9% damage-free record' },
    { name: 'BMW', category: 'Automotive', achievement: 'White-glove service' },
    { name: 'SDSRX Medical', category: 'Healthcare', achievement: '18+ months zero incidents' }
  ];

  return (
    <>
      <NextSeo
        title="Driver Network Inc. - Uber Freight Partnership Proposal"
        description="Comprehensive logistics solutions for Uber's freight delivery network"
        noindex={true}
        nofollow={true}
        additionalMetaTags={[
          {
            name: 'robots',
            content: 'noindex, nofollow, noarchive, nosnippet, noimageindex',
          },
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
        {/* Header Navigation Buttons */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 dark:bg-gray-900/95 backdrop-blur-md border-b border-white/20 dark:border-gray-700/30">
          <Container>
            <div className="flex justify-between items-center py-3">
              <button
                onClick={() => navigateTab('prev')}
                className="flex items-center px-4 py-2 text-sm bg-gradient-to-r from-[#276EF1] to-blue-600 text-white dark:text-gray-50 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 min-w-[120px]"
              >
                <span className="text-sm text-gray-600 dark:text-gray-300 mr-2">←</span>
                Previous
              </button>
              
              <div className="text-center text-gray-800 dark:text-gray-100">
                <div className="text-white dark:text-gray-50 mb-1">
                  <h1 className="text-lg font-bold text-white dark:text-gray-50">Driver Network Inc.</h1>
                  <p className="text-xs text-gray-300 dark:text-gray-300">Partnership Proposal - Uber Freight</p>
                </div>
                <div className="flex space-x-1">
                  {[
                    'executive-summary', 'company-evolution', 'service-divisions',
                    'performance-metrics', 'case-study-instacart', 'case-study-tesla', 'case-study-medical', 'case-study-bmw',
                    'driver-excellence', 'technology-integration', 'client-portfolio',
                    'rapid-deployment', 'geographic-coverage',
                    'partnership-proposal', 'competitive-advantage', 'service-integration', 'roi-projection', 'next-steps'
                  ].map((tab, index) => (
                    <div
                      key={tab}
                      className={`w-1 h-1 rounded-full transition-all duration-300 ${
                        activeTab === tab ? 'bg-[#276EF1] w-3' : 'bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => navigateTab('next')}
                className="flex items-center px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-[#276EF1] text-white dark:text-gray-50 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 min-w-[120px]"
              >
                Next
                <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">→</span>
              </button>
            </div>
          </Container>
        </div>

        {/* Main Content */}
        <main className="pt-20 pb-8">
          <Container>

            {activeTab === 'executive-summary' && (
              <section className="space-y-12">
                <div className="backdrop-blur-lg bg-gradient-to-r from-black/80 to-gray-900/80 dark:from-gray-800/95 dark:to-gray-900/95 text-white dark:text-gray-50 p-12 rounded-3xl mb-8 border border-white/10 dark:border-gray-600/30 shadow-2xl">
                  <div className="text-center text-gray-800 dark:text-gray-100 mb-8">
                    <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                      Proven Scale. Proven Results.
                    </h2>
                    <p className="text-xl text-gray-200 dark:text-gray-200 max-w-4xl mx-auto">
                      Driver Network Inc. delivers customizable logistics solutions with over 1,000 contracted drivers 
                      across 19 major North American markets, providing the scale and reliability Uber Freight requires.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center text-gray-800 dark:text-gray-100 backdrop-blur-sm bg-white dark:bg-gray-800/10 p-6 rounded-2xl border border-white/20 dark:border-gray-600/30">
                        <div className="text-4xl font-bold text-[#276EF1] mb-3 bg-gradient-to-br from-[#276EF1] to-blue-400 bg-clip-text text-transparent">
                          {stat.value}
                        </div>
                        <div className="font-bold mb-2 text-lg text-white dark:text-gray-100">{stat.label}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{stat.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'company-evolution' && (
              <section className="space-y-12">
                <div className="backdrop-blur-lg bg-white/95 dark:bg-gray-800/95 p-8 rounded-3xl border border-white/30 dark:border-gray-600/30 shadow-2xl">
                  <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-[#276EF1] to-indigo-600 bg-clip-text text-transparent">
                    🚀 Company Evolution Journey
                  </h2>
                  
                  {/* Revenue Growth Chart */}
                  <div className="mb-12">
                    <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">📈 Revenue Growth Timeline</h3>
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={[
                          { year: '2012', revenue: 100, drivers: 5, locations: 1 },
                          { year: '2015', revenue: 350, drivers: 25, locations: 15 },
                          { year: '2018', revenue: 2100, drivers: 150, locations: 50 },
                          { year: '2020', revenue: 3800, drivers: 400, locations: 75 },
                          { year: '2023', revenue: 8500, drivers: 1000, locations: 100 }
                        ]}>
                          <defs>
                            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#276EF1" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#276EF1" stopOpacity={0.2}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                          <XAxis dataKey="year" stroke="#4b5563" />
                          <YAxis stroke="#4b5563" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                              border: 'none', 
                              borderRadius: '12px',
                              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                            }} 
                          />
                          <Area type="monotone" dataKey="revenue" stroke="#276EF1" fillOpacity={1} fill="url(#revenueGradient)" strokeWidth={3} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Timeline Visualization */}
                  <div className="relative">
                    <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[#276EF1] to-indigo-600 rounded-full"></div>
                    <div className="space-y-8 ml-20">
                      {[
                        { year: '2012-2017', title: 'Foundation Era', icon: '🏢', desc: 'Valet & Parking Operations', metric: '5→50+', detail: 'locations in Chicagoland', color: 'from-blue-500 to-cyan-500' },
                        { year: '2018', title: 'Expansion Breakthrough', icon: '🚗', desc: 'Automotive Transport Launch', metric: '+500%', detail: 'revenue growth in Year 1', color: 'from-green-500 to-emerald-500' },
                        { year: '2019', title: 'Platform Evolution', icon: '📦', desc: 'Courier Services Launch', metric: 'Multi-Industry', detail: 'logistics platform', color: 'from-purple-500 to-violet-500' },
                        { year: '2023-Present', title: 'National Scale', icon: '🌎', desc: 'Nationwide Expansion', metric: '19+', detail: 'major metropolitan areas', color: 'from-orange-500 to-red-500' }
                      ].map((phase, index) => (
                        <div key={index} className="relative">
                          <div className="absolute -left-24 w-8 h-8 bg-white dark:bg-gray-700 rounded-full border-4 border-[#276EF1] shadow-lg flex items-center justify-center text-lg text-gray-600 dark:text-gray-300">
                            {phase.icon}
                          </div>
                          <div className={`backdrop-blur-sm bg-gradient-to-r ${phase.color} p-6 rounded-2xl text-white dark:text-gray-100 shadow-xl transform hover:scale-105 transition-all duration-300`}>
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h4 className="text-xl text-gray-700 dark:text-gray-200 font-bold mb-1">{phase.title}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300 opacity-90">{phase.year}</p>
                              </div>
                              <div className="text-right text-gray-800 dark:text-gray-100">
                                <div className="text-2xl text-gray-800 dark:text-gray-100 font-bold">{phase.metric}</div>
                                <div className="text-xs text-gray-600 dark:text-gray-300 opacity-80">{phase.detail}</div>
                              </div>
                            </div>
                            <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">{phase.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'service-divisions' && (
              <section className="space-y-12">
                <div className="backdrop-blur-lg bg-white/95 dark:bg-gray-800/95 p-8 rounded-3xl border border-white/30 dark:border-gray-600/30 shadow-2xl">
                  <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-[#276EF1] to-indigo-600 bg-clip-text text-transparent">
                    🎯 Service Division Distribution
                  </h2>
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Valet & Traffic Mgmt', value: 35, color: '#276EF1' },
                              { name: 'Automotive Transport', value: 40, color: '#10B981' },
                              { name: 'Courier & Last-Mile', value: 25, color: '#F59E0B' }
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={120}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {[
                              { name: 'Valet & Traffic Mgmt', value: 35, color: '#276EF1' },
                              { name: 'Automotive Transport', value: 40, color: '#10B981' },
                              { name: 'Courier & Last-Mile', value: 25, color: '#F59E0B' }
                            ].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                              border: 'none', 
                              borderRadius: '12px',
                              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                            }} 
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-4">
                      <div className="backdrop-blur-sm bg-blue-500/20 p-6 rounded-2xl border border-blue-300/30 dark:border-blue-700/30">
                        <h4 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-2">🚗 Valet & Traffic Management</h4>
                        <p className="text-blue-700 dark:text-blue-300">24/7 operations, accounting, traffic control</p>
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-200 mt-2">35% Revenue Share</div>
                      </div>
                      <div className="backdrop-blur-sm bg-green-500/20 p-6 rounded-2xl border border-green-300/30 dark:border-green-700/30">
                        <h4 className="text-xl font-bold text-green-800 dark:text-green-200 mb-2">🚛 Automotive Transport</h4>
                        <p className="text-green-700 dark:text-green-300">100+ vehicles daily, GPS tracking, full documentation</p>
                        <div className="text-2xl font-bold text-green-600 dark:text-green-200 mt-2">40% Revenue Share</div>
                      </div>
                      <div className="backdrop-blur-sm bg-amber-500/20 p-6 rounded-2xl border border-amber-300/30 dark:border-amber-700/30">
                        <h4 className="text-xl font-bold text-amber-800 dark:text-amber-200 mb-2">📦 Courier & Last-Mile</h4>
                        <p className="text-amber-700 dark:text-amber-300">Same-day, scheduled, temperature-controlled delivery</p>
                        <div className="text-2xl font-bold text-amber-600 dark:text-amber-200 mt-2">25% Revenue Share</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Performance Metrics Slide */}
            {activeTab === 'performance-metrics' && (
              <section className="space-y-12">
                <div className="backdrop-blur-lg bg-white/95 dark:bg-gray-800/95 p-8 rounded-3xl border border-white/30 dark:border-gray-600/30 shadow-2xl">
                  <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-[#276EF1] to-indigo-600 bg-clip-text text-transparent">
                    📈 Performance Excellence Metrics
                  </h2>
                  
                  {/* Key Performance Indicators */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    <div className="backdrop-blur-sm bg-green-500/20 p-6 rounded-2xl border border-green-300/30 text-center text-gray-800 dark:text-gray-100">
                      <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">100%</div>
                      <div className="text-green-800 dark:text-green-200 font-semibold">On-Time Delivery</div>
                      <div className="text-sm text-green-700 dark:text-green-300 mt-1">🚚 Instacart Partnership</div>
                    </div>
                    <div className="backdrop-blur-sm bg-blue-500/20 p-6 rounded-2xl border border-blue-300/30 text-center text-gray-800 dark:text-gray-100">
                      <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">99.9%</div>
                      <div className="text-blue-800 dark:text-blue-200 font-semibold">Damage-Free Rate</div>
                      <div className="text-sm text-blue-700 dark:text-blue-300 mt-1">🚗 Automotive Transport</div>
                    </div>
                    <div className="backdrop-blur-sm bg-purple-500/20 p-6 rounded-2xl border border-purple-300/30 text-center text-gray-800 dark:text-gray-100">
                      <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">18+</div>
                      <div className="text-purple-800 dark:text-purple-200 font-semibold">Months Zero Incidents</div>
                      <div className="text-sm text-purple-700 dark:text-purple-300 mt-1">🏥 Medical Courier</div>
                    </div>
                    <div className="backdrop-blur-sm bg-orange-500/20 p-6 rounded-2xl border border-orange-300/30 text-center text-gray-800 dark:text-gray-100">
                      <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">$50M+</div>
                      <div className="text-orange-800 dark:text-orange-200 font-semibold">Value Transported</div>
                      <div className="text-sm text-orange-700 dark:text-orange-300 mt-1">💼 High-Value Cargo</div>
                    </div>
                  </div>

                  {/* Performance Comparison Chart */}
                  <div className="h-80 mb-8">
                    <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">🎯 Industry Performance Comparison</h3>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { metric: 'On-Time Delivery', 'Driver Network': 100, 'Industry Average': 85, 'Top Competitor': 92 },
                        { metric: 'Damage-Free Rate', 'Driver Network': 99.9, 'Industry Average': 94.2, 'Top Competitor': 96.8 },
                        { metric: 'Customer Satisfaction', 'Driver Network': 98, 'Industry Average': 87, 'Top Competitor': 91 },
                        { metric: 'Driver Retention', 'Driver Network': 68, 'Industry Average': 45, 'Top Competitor': 52 }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                        <XAxis dataKey="metric" stroke="#4b5563" />
                        <YAxis stroke="#4b5563" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                            border: 'none', 
                            borderRadius: '12px',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                          }} 
                        />
                        <Bar dataKey="Driver Network" fill="#276EF1" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="Industry Average" fill="#94A3B8" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="Top Competitor" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </section>
            )}

            {/* Case Study: Instacart */}
            {activeTab === 'case-study-instacart' && (
              <section className="space-y-12">
                <div className="backdrop-blur-lg bg-gradient-to-r from-gray-900/95 to-black/95 text-white dark:text-gray-100 p-12 rounded-3xl mb-12 border border-white/10 dark:border-gray-700/30 shadow-2xl">
                  <div className="text-center text-gray-800 dark:text-gray-100 mb-12">
                    <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
                      🏆 SUCCESS STORY: INSTACART
                    </h2>
                    <p className="text-2xl text-gray-700 dark:text-gray-200 max-w-5xl mx-auto">
                      Multi-Market Expansion Success • E-Commerce Logistics Partnership • 6 Metropolitan Areas • $2.3M Annual Contract
                    </p>
                  </div>
                </div>

                <div className="backdrop-blur-lg bg-white/95 dark:bg-gray-800/95 p-10 rounded-3xl border border-white/30 dark:border-gray-600/30 shadow-2xl">
                  {/* Enhanced Header with Client Info */}
                  <div className="bg-gradient-to-r from-green-600 to-emerald-400 p-8 rounded-2xl text-white dark:text-gray-100 mb-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <span className="text-5xl text-gray-900 dark:text-gray-50 mr-6">🛒</span>
                        <div>
                          <h3 className="text-4xl text-gray-900 dark:text-gray-50 font-bold mb-2">Instacart: Multi-Market Expansion Success</h3>
                          <p className="text-xl text-gray-700 dark:text-gray-200 opacity-90 font-medium">E-Commerce Logistics Partnership • 6 Metropolitan Areas • $2.3M Annual Contract</p>
                        </div>
                      </div>
                      <div className="text-right text-gray-800 dark:text-gray-100">
                        <div className="text-lg text-gray-600 dark:text-gray-300 font-bold mb-1">18-month partnership (2022-2024)</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300 opacity-80">Chicago, Milwaukee, Detroit, Indianapolis, Cleveland, Columbus</div>
                      </div>
                    </div>

                    {/* Key Metrics Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      {[
                        { key: 'Daily Deliveries', value: '425 avg' },
                        { key: 'Peak Capacity', value: '1,200/day' },
                        { key: 'Driver Utilization', value: '89%' },
                        { key: 'Cost Per Delivery', value: '$8.40' }
                      ].map(({ key, value }, i) => (
                        <div key={i} className="text-center text-gray-800 dark:text-gray-100 backdrop-blur-sm bg-white/95 dark:bg-gray-800/95 p-3 rounded-lg">
                          <div className="text-2xl text-gray-800 dark:text-gray-100 font-bold">{value}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-300 opacity-80">{key}</div>
                        </div>
                      ))}
                    </div>

                    {/* Challenge/Solution/Results Grid */}
                    <div className="grid lg:grid-cols-3 gap-6">
                      <div className="backdrop-blur-sm bg-red-500/30 p-6 rounded-xl">
                        <h4 className="font-bold text-2xl text-gray-800 dark:text-gray-100 mb-3 flex items-center">
                          <span className="mr-3">⚠️</span>Challenge
                        </h4>
                        <p className="text-red-100 dark:text-red-200 leading-relaxed">Instacart needed to rapidly scale last-mile delivery operations across 6 Midwest markets within 8 months while maintaining their signature delivery speed and reliability. Required 24/7 coverage, peak demand surge capacity (300%+ volume spikes), and seamless integration with their existing dispatch system.</p>
                      </div>
                      <div className="backdrop-blur-sm bg-blue-500/30 p-6 rounded-xl">
                        <h4 className="font-bold text-2xl text-gray-800 dark:text-gray-100 mb-3 flex items-center">
                          <span className="mr-3">⚙️</span>Solution
                        </h4>
                        <p className="text-blue-100 dark:text-blue-200 leading-relaxed">Deployed 180+ rigorously trained drivers with Instacart-certified protocols. Implemented real-time API integration with their dispatch system, established dedicated surge capacity pools, and created market-specific operational centers. Each driver underwent 40-hour training on Instacart standards, customer interaction protocols, and temperature-sensitive delivery requirements.</p>
                      </div>
                      <div className="backdrop-blur-sm bg-green-500/30 p-6 rounded-xl">
                        <h4 className="font-bold text-2xl text-gray-800 dark:text-gray-100 mb-3 flex items-center">
                          <span className="mr-3">🎯</span>Results
                        </h4>
                        <ul className="text-green-100 dark:text-green-200 space-y-2">
                          {[
                            '100% on-time delivery rate across all 6 markets (industry benchmark: 87%)',
                            '$847K annual cost reduction through optimized routing and driver utilization',
                            '45% faster market penetration vs. Instacart\'s historical expansion timeline',
                            'Zero service interruptions during peak holiday seasons (Black Friday, Christmas)',
                            '4.9/5.0 customer satisfaction score (exceeding Instacart corporate average)',
                            '68,000+ successful deliveries in Year 1, 94,000+ in Year 2'
                          ].map((result, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-green-300 dark:text-green-400 mr-2 text-lg">•</span>
                              <span className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced Performance Analytics Chart */}
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl">
                    <h4 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">
                      📊 Performance Analytics & Growth Trajectory
                    </h4>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={[
                          { month: 'Launch', drivers: 0, deliveries: 0, satisfaction: 0 },
                          { month: 'Month 2', drivers: 45, deliveries: 2800, satisfaction: 4.6 },
                          { month: 'Month 6', drivers: 120, deliveries: 8200, satisfaction: 4.8 },
                          { month: 'Month 12', drivers: 180, deliveries: 13500, satisfaction: 4.9 },
                          { month: 'Month 18', drivers: 195, deliveries: 15600, satisfaction: 4.9 }
                        ]}>
                          <defs>
                            <linearGradient id="gradient-instacart" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#276EF1" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#276EF1" stopOpacity={0.1}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                          <XAxis dataKey="month" stroke="#4b5563" fontSize={12} />
                          <YAxis stroke="#4b5563" fontSize={12} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.98)', 
                              border: 'none', 
                              borderRadius: '16px',
                              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                              fontSize: '14px',
                              padding: '12px'
                            }} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="drivers" 
                            stroke="#276EF1" 
                            strokeWidth={4}
                            dot={{ r: 8, fill: '#276EF1', strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 10, fill: '#276EF1' }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="deliveries" 
                            stroke="#10B981" 
                            strokeWidth={4}
                            dot={{ r: 8, fill: '#10B981', strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 10, fill: '#10B981' }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="satisfaction" 
                            stroke="#F59E0B" 
                            strokeWidth={4}
                            dot={{ r: 8, fill: '#F59E0B', strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 10, fill: '#F59E0B' }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Case Study: Tesla */}
            {activeTab === 'case-study-tesla' && (
              <section className="space-y-12">
                <div className="backdrop-blur-lg bg-gradient-to-r from-gray-900/95 to-black/95 text-white dark:text-gray-100 p-12 rounded-3xl mb-12 border border-white/10 dark:border-gray-700/30 shadow-2xl">
                  <div className="text-center text-gray-800 dark:text-gray-100 mb-12">
                    <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
                      🏆 SUCCESS STORY: TESLA
                    </h2>
                    <p className="text-2xl text-gray-700 dark:text-gray-200 max-w-5xl mx-auto">
                      Precision Automotive Transport Excellence • Luxury Vehicle Transport • White-Glove Service • $1.8M Annual Contract
                    </p>
                  </div>
                </div>

                <div className="backdrop-blur-lg bg-white/95 dark:bg-gray-800/95 p-10 rounded-3xl border border-white/30 dark:border-gray-600/30 shadow-2xl">
                  <div className="bg-gradient-to-r from-red-500 to-orange-400 p-8 rounded-2xl text-white dark:text-gray-100 mb-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <span className="text-5xl text-gray-900 dark:text-gray-50 mr-6">⚡</span>
                        <div>
                          <h3 className="text-4xl text-gray-900 dark:text-gray-50 font-bold mb-2">Tesla: Precision Automotive Transport Excellence</h3>
                          <p className="text-xl text-gray-700 dark:text-gray-200 opacity-90 font-medium">Luxury Vehicle Transport • White-Glove Service • $1.8M Annual Contract</p>
                        </div>
                      </div>
                      <div className="text-right text-gray-800 dark:text-gray-100">
                        <div className="text-lg text-gray-600 dark:text-gray-300 font-bold mb-1">3-year exclusive partnership (2021-2024)</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300 opacity-80">Chicago hub serving 8-state distribution network</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      {[
                        { key: 'Vehicles/Month', value: '356 avg' },
                        { key: 'Avg Vehicle Value', value: '$87,000' },
                        { key: 'Damage Rate', value: '0.03%' },
                        { key: 'Insurance Claims', value: '$4,200 total' }
                      ].map(({ key, value }, i) => (
                        <div key={i} className="text-center text-gray-800 dark:text-gray-100 backdrop-blur-sm bg-white/95 dark:bg-gray-800/95 p-3 rounded-lg">
                          <div className="text-2xl text-gray-800 dark:text-gray-100 font-bold">{value}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-300 opacity-80">{key}</div>
                        </div>
                      ))}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                      <div className="backdrop-blur-sm bg-red-500/30 p-6 rounded-xl">
                        <h4 className="font-bold text-2xl text-gray-800 dark:text-gray-100 mb-3 flex items-center">
                          <span className="mr-3">⚠️</span>Challenge
                        </h4>
                        <p className="text-red-100 dark:text-red-200 leading-relaxed">Tesla required zero-damage transport for high-value vehicles ($40K-$150K each) from their Chicago distribution center to 47 dealer locations across the Midwest. Any damage, scratches, or delays would result in massive financial losses and brand reputation damage. Required specialized equipment, insurance, and meticulous documentation.</p>
                      </div>
                      <div className="backdrop-blur-sm bg-blue-500/30 p-6 rounded-xl">
                        <h4 className="font-bold text-2xl text-gray-800 dark:text-gray-100 mb-3 flex items-center">
                          <span className="mr-3">⚙️</span>Solution
                        </h4>
                        <p className="text-blue-100 dark:text-blue-200 leading-relaxed">Recruited and trained 25 elite automotive transport specialists with clean 10-year driving records. Invested in specialized enclosed trailers, GPS tracking systems, and comprehensive photo documentation protocols. Implemented Tesla-specific loading/unloading procedures, battery safety protocols, and real-time damage prevention systems.</p>
                      </div>
                      <div className="backdrop-blur-sm bg-green-500/30 p-6 rounded-xl">
                        <h4 className="font-bold text-2xl text-gray-800 dark:text-gray-100 mb-3 flex items-center">
                          <span className="mr-3">🎯</span>Results
                        </h4>
                        <ul className="text-green-100 dark:text-green-200 space-y-2">
                          {[
                            '99.97% damage-free delivery record (3 minor incidents in 12,000+ transports)',
                            '$2.1M+ in damage prevention vs. industry standard performance',
                            '100% on-schedule delivery performance over 36 months',
                            'Tesla "Preferred Partner" status achieved in Month 8',
                            'Contract renewed for additional 3 years with 40% scope expansion',
                            '12,847 vehicles transported safely with full documentation'
                          ].map((result, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-green-300 dark:text-green-400 mr-2 text-lg">•</span>
                              <span className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl">
                    <h4 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">
                      📊 Performance Analytics & Growth Trajectory
                    </h4>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={[
                          { quarter: 'Q1 2021', vehicles: 850, damageRate: 0.08, satisfaction: 4.7 },
                          { quarter: 'Q3 2021', vehicles: 1050, damageRate: 0.05, satisfaction: 4.8 },
                          { quarter: 'Q1 2022', vehicles: 1180, damageRate: 0.03, satisfaction: 4.9 },
                          { quarter: 'Q4 2023', vehicles: 1285, damageRate: 0.02, satisfaction: 4.9 }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                          <XAxis dataKey="quarter" stroke="#4b5563" fontSize={12} />
                          <YAxis stroke="#4b5563" fontSize={12} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.98)', 
                              border: 'none', 
                              borderRadius: '16px',
                              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                              fontSize: '14px',
                              padding: '12px'
                            }} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="vehicles" 
                            stroke="#276EF1" 
                            strokeWidth={4}
                            dot={{ r: 8, fill: '#276EF1', strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 10, fill: '#276EF1' }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="satisfaction" 
                            stroke="#10B981" 
                            strokeWidth={4}
                            dot={{ r: 8, fill: '#10B981', strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 10, fill: '#10B981' }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Case Study: Medical */}
            {activeTab === 'case-study-medical' && (
              <section className="space-y-12">
                <div className="backdrop-blur-lg bg-gradient-to-r from-gray-900/95 to-black/95 text-white dark:text-gray-100 p-12 rounded-3xl mb-12 border border-white/10 dark:border-gray-700/30 shadow-2xl">
                  <div className="text-center text-gray-800 dark:text-gray-100 mb-12">
                    <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
                      🏆 SUCCESS STORY: SDSRX MEDICAL
                    </h2>
                    <p className="text-2xl text-gray-700 dark:text-gray-200 max-w-5xl mx-auto">
                      Mission-Critical Healthcare Logistics • HIPAA-Compliant Medical Courier • Life-Critical Deliveries • $950K Annual Contract
                    </p>
                  </div>
                </div>

                <div className="backdrop-blur-lg bg-white/95 dark:bg-gray-800/95 p-10 rounded-3xl border border-white/30 dark:border-gray-600/30 shadow-2xl">
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-8 rounded-2xl text-white dark:text-gray-100 mb-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <span className="text-5xl text-gray-900 dark:text-gray-50 mr-6">🏥</span>
                        <div>
                          <h3 className="text-4xl text-gray-900 dark:text-gray-50 font-bold mb-2">SDSRX Medical: Mission-Critical Healthcare Logistics</h3>
                          <p className="text-xl text-gray-700 dark:text-gray-200 opacity-90 font-medium">HIPAA-Compliant Medical Courier • Life-Critical Deliveries • $950K Annual Contract</p>
                        </div>
                      </div>
                      <div className="text-right text-gray-800 dark:text-gray-100">
                        <div className="text-lg text-gray-600 dark:text-gray-300 font-bold mb-1">4-year ongoing partnership (2020-present)</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300 opacity-80">Chicago metro + 6 satellite medical facilities</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      {[
                        { key: 'Daily Deliveries', value: '78 avg' },
                        { key: 'Critical Samples', value: '1,200/month' },
                        { key: 'Temperature Deviation', value: '0.0%' },
                        { key: 'Security Incidents', value: '0' }
                      ].map(({ key, value }, i) => (
                        <div key={i} className="text-center text-gray-800 dark:text-gray-100 backdrop-blur-sm bg-white/95 dark:bg-gray-800/95 p-3 rounded-lg">
                          <div className="text-2xl text-gray-800 dark:text-gray-100 font-bold">{value}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-300 opacity-80">{key}</div>
                        </div>
                      ))}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                      <div className="backdrop-blur-sm bg-red-500/30 p-6 rounded-xl">
                        <h4 className="font-bold text-2xl text-gray-800 dark:text-gray-100 mb-3 flex items-center">
                          <span className="mr-3">⚠️</span>Challenge
                        </h4>
                        <p className="text-red-100 dark:text-red-200 leading-relaxed">SDSRX needed ultra-reliable medical courier services for time-sensitive laboratory samples, temperature-controlled pharmaceuticals, and confidential patient records. Any security breach, temperature deviation, or delivery delay could compromise patient care and result in massive HIPAA violations and litigation.</p>
                      </div>
                      <div className="backdrop-blur-sm bg-blue-500/30 p-6 rounded-xl">
                        <h4 className="font-bold text-2xl text-gray-800 dark:text-gray-100 mb-3 flex items-center">
                          <span className="mr-3">⚙️</span>Solution
                        </h4>
                        <p className="text-blue-100 dark:text-blue-200 leading-relaxed">Implemented military-grade security protocols with HIPAA-certified drivers, real-time temperature monitoring, blockchain-verified chain-of-custody documentation, and redundant delivery systems. All drivers underwent FBI background checks, 80-hour medical courier certification, and quarterly HIPAA compliance audits.</p>
                      </div>
                      <div className="backdrop-blur-sm bg-green-500/30 p-6 rounded-xl">
                        <h4 className="font-bold text-2xl text-gray-800 dark:text-gray-100 mb-3 flex items-center">
                          <span className="mr-3">🎯</span>Results
                        </h4>
                        <ul className="text-green-100 dark:text-green-200 space-y-2">
                          {[
                            '22+ months with ZERO security incidents or HIPAA violations',
                            '100% temperature compliance for pharmaceutical deliveries (±2°F tolerance)',
                            '$380K avoided regulatory penalties through perfect compliance record',
                            '99.8% on-time delivery performance for time-critical specimens',
                            '400% expansion of service area due to proven reliability',
                            'Perfect Joint Commission audit scores for logistics compliance'
                          ].map((result, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-green-300 dark:text-green-400 mr-2 text-lg">•</span>
                              <span className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl">
                    <h4 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">
                      📊 Compliance & Volume Growth
                    </h4>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={[
                          { quarter: 'Q1 2020', compliance: 94, incidents: 3, volume: 850 },
                          { quarter: 'Q3 2020', compliance: 98, incidents: 1, volume: 1200 },
                          { quarter: 'Q1 2021', compliance: 100, incidents: 0, volume: 1650 },
                          { quarter: 'Q4 2023', compliance: 100, incidents: 0, volume: 2100 }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                          <XAxis dataKey="quarter" stroke="#4b5563" fontSize={12} />
                          <YAxis stroke="#4b5563" fontSize={12} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.98)', 
                              border: 'none', 
                              borderRadius: '16px',
                              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                              fontSize: '14px',
                              padding: '12px'
                            }} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="compliance" 
                            stroke="#276EF1" 
                            strokeWidth={4}
                            dot={{ r: 8, fill: '#276EF1', strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 10, fill: '#276EF1' }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="volume" 
                            stroke="#10B981" 
                            strokeWidth={4}
                            dot={{ r: 8, fill: '#10B981', strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 10, fill: '#10B981' }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Case Study: BMW */}
            {activeTab === 'case-study-bmw' && (
              <section className="space-y-12">
                <div className="backdrop-blur-lg bg-gradient-to-r from-gray-900/95 to-black/95 text-white dark:text-gray-100 p-12 rounded-3xl mb-12 border border-white/10 dark:border-gray-700/30 shadow-2xl">
                  <div className="text-center text-gray-800 dark:text-gray-100 mb-12">
                    <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
                      🏆 SUCCESS STORY: BMW GROUP
                    </h2>
                    <p className="text-2xl text-gray-700 dark:text-gray-200 max-w-5xl mx-auto">
                      Premium Automotive Logistics Excellence • Luxury Vehicle Transport • VIP Concierge Service • $1.2M Annual Contract
                    </p>
                  </div>
                </div>

                <div className="backdrop-blur-lg bg-white/95 dark:bg-gray-800/95 p-10 rounded-3xl border border-white/30 dark:border-gray-600/30 shadow-2xl">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-500 p-8 rounded-2xl text-white dark:text-gray-100 mb-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <span className="text-5xl text-gray-900 dark:text-gray-50 mr-6">🏁</span>
                        <div>
                          <h3 className="text-4xl text-gray-900 dark:text-gray-50 font-bold mb-2">BMW Group: Premium Automotive Logistics Excellence</h3>
                          <p className="text-xl text-gray-700 dark:text-gray-200 opacity-90 font-medium">Luxury Vehicle Transport • VIP Concierge Service • $1.2M Annual Contract</p>
                        </div>
                      </div>
                      <div className="text-right text-gray-800 dark:text-gray-100">
                        <div className="text-lg text-gray-600 dark:text-gray-300 font-bold mb-1">5-year strategic partnership (2019-2024)</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300 opacity-80">Illinois, Wisconsin, Indiana dealer network (23 locations)</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      {[
                        { key: 'Monthly Vehicles', value: '260 avg' },
                        { key: 'Avg Vehicle Value', value: '$78K' },
                        { key: 'Customer Rating', value: '4.97/5' },
                        { key: 'Referral Rate', value: '89%' }
                      ].map(({ key, value }, i) => (
                        <div key={i} className="text-center text-gray-800 dark:text-gray-100 backdrop-blur-sm bg-white/95 dark:bg-gray-800/95 p-3 rounded-lg">
                          <div className="text-2xl text-gray-800 dark:text-gray-100 font-bold">{value}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-300 opacity-80">{key}</div>
                        </div>
                      ))}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                      <div className="backdrop-blur-sm bg-red-500/30 p-6 rounded-xl">
                        <h4 className="font-bold text-2xl text-gray-800 dark:text-gray-100 mb-3 flex items-center">
                          <span className="mr-3">⚠️</span>Challenge
                        </h4>
                        <p className="text-red-100 dark:text-red-200 leading-relaxed">BMW required white-glove transport service for their premium and luxury vehicle lineup ($50K-$200K vehicles) with absolute zero tolerance for damage, delays, or customer service issues. Required specialized handling for limited-edition models, customer delivery coordination, and concierge-level service standards.</p>
                      </div>
                      <div className="backdrop-blur-sm bg-blue-500/30 p-6 rounded-xl">
                        <h4 className="font-bold text-2xl text-gray-800 dark:text-gray-100 mb-3 flex items-center">
                          <span className="mr-3">⚙️</span>Solution
                        </h4>
                        <p className="text-blue-100 dark:text-blue-200 leading-relaxed">Created dedicated BMW-certified driver team with luxury automotive expertise. Implemented concierge delivery protocols, specialized transport equipment, and comprehensive customer communication systems. All drivers trained in BMW brand standards, customer interaction, and premium service delivery.</p>
                      </div>
                      <div className="backdrop-blur-sm bg-green-500/30 p-6 rounded-xl">
                        <h4 className="font-bold text-2xl text-gray-800 dark:text-gray-100 mb-3 flex items-center">
                          <span className="mr-3">🎯</span>Results
                        </h4>
                        <ul className="text-green-100 dark:text-green-200 space-y-2">
                          {[
                            '100% damage-free record for premium vehicles over 60 months',
                            '4.97/5.0 average customer satisfaction score',
                            'BMW "Excellence Award" recipient 3 consecutive years',
                            '$1.8M+ damage prevention value vs. industry benchmarks',
                            '89% customer referral rate for delivery service',
                            '15,600+ premium vehicles transported without incident'
                          ].map((result, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-green-300 dark:text-green-400 mr-2 text-lg">•</span>
                              <span className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl">
                    <h4 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">
                      📊 Customer Satisfaction & Volume Growth
                    </h4>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={[
                          { year: '2019', vehicles: 2800, satisfaction: 4.8, referrals: 76 },
                          { year: '2021', vehicles: 3200, satisfaction: 4.9, referrals: 84 },
                          { year: '2023', vehicles: 3650, satisfaction: 4.97, referrals: 89 },
                          { year: '2024', vehicles: 3780, satisfaction: 4.97, referrals: 91 }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                          <XAxis dataKey="year" stroke="#4b5563" fontSize={12} />
                          <YAxis stroke="#4b5563" fontSize={12} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.98)', 
                              border: 'none', 
                              borderRadius: '16px',
                              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                              fontSize: '14px',
                              padding: '12px'
                            }} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="vehicles" 
                            stroke="#276EF1" 
                            strokeWidth={4}
                            dot={{ r: 8, fill: '#276EF1', strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 10, fill: '#276EF1' }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="satisfaction" 
                            stroke="#10B981" 
                            strokeWidth={4}
                            dot={{ r: 8, fill: '#10B981', strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 10, fill: '#10B981' }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="referrals" 
                            stroke="#F59E0B" 
                            strokeWidth={4}
                            dot={{ r: 8, fill: '#F59E0B', strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 10, fill: '#F59E0B' }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Driver Excellence Slide */}
            {activeTab === 'driver-excellence' && (
              <section className="space-y-12">
                <div className="backdrop-blur-lg bg-white/95 dark:bg-gray-800/95 p-8 rounded-3xl border border-white/30 dark:border-gray-600/30 shadow-2xl">
                  <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-[#276EF1] to-indigo-600 bg-clip-text text-transparent">
                    👥 Driver Excellence Program
                  </h2>
                  
                  {/* Driver Satisfaction Donut Chart */}
                  <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Referral Hires', value: 68, color: '#276EF1' },
                              { name: 'Direct Hires', value: 32, color: '#94A3B8' }
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={120}
                            startAngle={90}
                            endAngle={450}
                            dataKey="value"
                          >
                            {[
                              { name: 'Referral Hires', value: 68, color: '#276EF1' },
                              { name: 'Direct Hires', value: 32, color: '#94A3B8' }
                            ].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                              border: 'none', 
                              borderRadius: '12px',
                              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                            }} 
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="text-center text-gray-800 dark:text-gray-100 mt-4">
                        <div className="text-4xl text-gray-900 dark:text-gray-50 font-bold text-[#276EF1]">68%</div>
                        <div className="text-xl font-semibold text-gray-800 dark:text-gray-100">Referral-Based Hiring</div>
                        <div className="text-gray-600 dark:text-gray-400">Indicates exceptional driver satisfaction</div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="backdrop-blur-sm bg-green-500/20 p-6 rounded-2xl border border-green-300/30">
                        <div className="flex items-center mb-3">
                          <span className="text-3xl text-gray-800 dark:text-gray-100 mr-3">✅</span>
                          <h4 className="text-xl font-bold text-green-800 dark:text-green-200">Quality Assurance</h4>
                        </div>
                        <ul className="space-y-2 text-green-700 dark:text-green-300">
                          <li>• Customizable background screening per client requirements</li>
                          <li>• Clean motor vehicle records required for all drivers</li>
                          <li>• Comprehensive SOP training for each contract</li>
                        </ul>
                      </div>
                      
                      <div className="backdrop-blur-sm bg-blue-500/20 p-6 rounded-2xl border border-blue-300/30">
                        <div className="flex items-center mb-3">
                          <span className="text-3xl text-gray-800 dark:text-gray-100 mr-3">🏆</span>
                          <h4 className="text-xl font-bold text-blue-800 dark:text-blue-200">Performance Excellence</h4>
                        </div>
                        <ul className="space-y-2 text-blue-700 dark:text-blue-300">
                          <li>• Performance incentives and career advancement</li>
                          <li>• Multi-industry flexibility and cross-training</li>
                          <li>• Real-time performance monitoring and feedback</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Technology Integration Slide */}
            {activeTab === 'technology-integration' && (
              <section className="space-y-12">
                <div className="backdrop-blur-lg bg-white/95 dark:bg-gray-800/95 p-8 rounded-3xl border border-white/30 dark:border-gray-600/30 shadow-2xl">
                  <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-[#276EF1] to-indigo-600 bg-clip-text text-transparent">
                    📱 Technology Integration Ecosystem
                  </h2>
                  
                  <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {/* Platform Integration */}
                    <div className="backdrop-blur-sm bg-purple-500/20 p-6 rounded-2xl border border-purple-300/30">
                      <h3 className="text-2xl font-bold text-purple-800 dark:text-purple-200 mb-6 text-center">🔗 Platform Integration</h3>
                      <div className="space-y-4">
                        {[
                          { name: 'Onfleet', description: 'Route Optimization', status: 'Active' },
                          { name: 'DropCar', description: 'Automotive Management', status: 'Active' },
                          { name: 'Slack', description: 'Real-time Communication', status: 'Active' },
                          { name: 'Custom APIs', description: 'Bespoke Integrations', status: 'Available' }
                        ].map((platform, index) => (
                          <div key={index} className="bg-white dark:bg-gray-800/50 p-4 rounded-lg flex justify-between items-center">
                            <div>
                              <div className="font-bold text-purple-900 dark:text-purple-100">{platform.name}</div>
                              <div className="text-sm text-purple-700 dark:text-purple-300">{platform.description}</div>
                            </div>
                            <Badge variant={platform.status === 'Active' ? 'default' : 'secondary'}>
                              {platform.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Core Features */}
                    <div className="backdrop-blur-sm bg-teal-500/20 p-6 rounded-2xl border border-teal-300/30">
                      <h3 className="text-2xl font-bold text-teal-800 dark:text-teal-200 mb-6 text-center">⚙️ Core Features</h3>
                      <div className="space-y-4">
                        {[
                          { feature: 'API Integration', capability: '99.9% Uptime' },
                          { feature: 'Real-time Tracking', capability: 'GPS + Photo Proof' },
                          { feature: 'Auto Dispatch', capability: 'AI Route Planning' },
                          { feature: 'Analytics', capability: 'Custom Dashboards' }
                        ].map((item, index) => (
                          <div key={index} className="bg-white dark:bg-gray-800/50 p-4 rounded-lg">
                            <div className="font-bold text-teal-900 dark:text-teal-100 mb-1">• {item.feature}</div>
                            <div className="text-sm text-teal-700 dark:text-teal-300">{item.capability}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Integration Benefits */}
                    <div className="backdrop-blur-sm bg-orange-500/20 p-6 rounded-2xl border border-orange-300/30">
                      <h3 className="text-2xl font-bold text-orange-800 dark:text-orange-200 mb-6 text-center">📊 Benefits</h3>
                      <div className="space-y-4">
                        {[
                          { metric: 'Efficiency Gain', value: '+35%' },
                          { metric: 'Error Reduction', value: '-85%' },
                          { metric: 'Response Time', value: '<2min' },
                          { metric: 'Client Satisfaction', value: '98%' }
                        ].map((benefit, index) => (
                          <div key={index} className="bg-white dark:bg-gray-800/50 p-4 rounded-lg text-center text-gray-800 dark:text-gray-100">
                            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{benefit.value}</div>
                            <div className="text-sm text-orange-800 dark:text-orange-200 font-medium">{benefit.metric}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Client Portfolio Slide */}
            {activeTab === 'client-portfolio' && (
              <section className="space-y-12">
                <div className="backdrop-blur-lg bg-white/95 dark:bg-gray-800/95 p-8 rounded-3xl border border-white/30 dark:border-gray-600/30 shadow-2xl">
                  <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-[#276EF1] to-indigo-600 bg-clip-text text-transparent">
                    🏢 Strategic Partnership Portfolio
                  </h2>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                      { 
                        name: 'Instacart', 
                        category: 'E-commerce', 
                        achievement: '100% on-time delivery',
                        markets: 6,
                        gradient: 'from-green-500 to-emerald-400',
                        icon: '🛒'
                      },
                      { 
                        name: 'Tesla', 
                        category: 'Automotive', 
                        achievement: '99.9% damage-free record',
                        gradient: 'from-red-500 to-pink-400',
                        icon: '⚡'
                      },
                      { 
                        name: 'BMW', 
                        category: 'Automotive', 
                        achievement: 'White-glove service',
                        gradient: 'from-blue-500 to-cyan-400',
                        icon: '🚗'
                      },
                      { 
                        name: 'SDSRX Medical', 
                        category: 'Healthcare', 
                        achievement: '18+ months zero incidents',
                        gradient: 'from-purple-500 to-violet-400',
                        icon: '🏥'
                      }
                    ].map((partner, index) => (
                      <div key={index} className={`backdrop-blur-sm bg-gradient-to-br ${partner.gradient} p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300`}>
                        <div className="text-center text-white dark:text-gray-100">
                          <div className="text-4xl text-gray-900 dark:text-gray-50 mb-3">{partner.icon}</div>
                          <h4 className="text-xl text-gray-700 dark:text-gray-200 font-bold mb-2">{partner.name}</h4>
                          <Badge variant="secondary" className="mb-3 bg-white dark:bg-gray-700/30 text-gray-900 dark:text-gray-100 border-white/50 dark:border-gray-600/50">
                            {partner.category}
                          </Badge>
                          {partner.markets && (
                            <Badge variant="secondary" className="mb-3 ml-2 bg-white dark:bg-gray-700/30 text-gray-900 dark:text-gray-100 border-white/50 dark:border-gray-600/50">
                              {partner.markets} Markets
                            </Badge>
                          )}
                          <p className="text-sm text-gray-600 dark:text-gray-300 font-medium bg-white/95 dark:bg-gray-800/95 p-2 rounded-lg">
                            {partner.achievement}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Client Satisfaction Chart */}
                  <div className="h-64">
                    <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">📊 Client Satisfaction Scores</h3>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { client: 'Instacart', satisfaction: 98 },
                        { client: 'Tesla', satisfaction: 97 },
                        { client: 'BMW', satisfaction: 96 },
                        { client: 'SDSRX', satisfaction: 100 },
                        { client: 'Sharebyte', satisfaction: 95 },
                        { client: 'Thistle', satisfaction: 94 }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                        <XAxis dataKey="client" stroke="#4b5563" />
                        <YAxis domain={[80, 100]} stroke="#4b5563" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                            border: 'none', 
                            borderRadius: '12px',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                          }} 
                        />
                        <Bar dataKey="satisfaction" fill="#276EF1" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </section>
            )}

            {/* Rapid Deployment Slide */}
            {activeTab === 'rapid-deployment' && (
              <section className="space-y-12">
                <div className="backdrop-blur-lg bg-white/95 dark:bg-gray-800/95 p-8 rounded-3xl border border-white/30 dark:border-gray-600/30 shadow-2xl">
                  <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-[#276EF1] to-indigo-600 bg-clip-text text-transparent">
                    🚀 Rapid Deployment Engine
                  </h2>
                  
                  <div className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="backdrop-blur-sm bg-green-500/20 p-8 rounded-2xl border border-green-300/30 text-center text-gray-800 dark:text-gray-100 transform hover:scale-105 transition-all duration-300">
                      <div className="text-6xl font-bold text-green-600 dark:text-green-400 mb-4">7</div>
                      <div className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">Days</div>
                      <h3 className="text-xl font-semibold mb-3 text-green-900 dark:text-green-100">Market Entry</h3>
                      <p className="text-green-700 dark:text-green-300">20-30 drivers onboarded per new city within one week</p>
                      <div className="mt-4 p-3 bg-green-600/20 rounded-lg">
                        <div className="text-3xl text-gray-800 dark:text-gray-100">⏱️</div>
                      </div>
                    </div>
                    
                    <div className="backdrop-blur-sm bg-blue-500/20 p-8 rounded-2xl border border-blue-300/30 text-center text-gray-800 dark:text-gray-100 transform hover:scale-105 transition-all duration-300">
                      <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">19+</div>
                      <div className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-2">Markets</div>
                      <h3 className="text-xl font-semibold mb-3 text-blue-900 dark:text-blue-100">Active Operations</h3>
                      <p className="text-blue-700 dark:text-blue-300">Major North American cities with established networks</p>
                      <div className="mt-4 p-3 bg-blue-600/20 rounded-lg">
                        <div className="text-3xl text-gray-800 dark:text-gray-100">🌍</div>
                      </div>
                    </div>
                    
                    <div className="backdrop-blur-sm bg-purple-500/20 p-8 rounded-2xl border border-purple-300/30 text-center text-gray-800 dark:text-gray-100 transform hover:scale-105 transition-all duration-300">
                      <div className="text-6xl font-bold text-purple-600 dark:text-purple-400 mb-4">3</div>
                      <div className="text-2xl font-bold text-purple-800 dark:text-purple-200 mb-2">Verticals</div>
                      <h3 className="text-xl font-semibold mb-3 text-purple-900 dark:text-purple-100">Industry Coverage</h3>
                      <p className="text-purple-700 dark:text-purple-300">Proven scalability across different industry sectors</p>
                      <div className="mt-4 p-3 bg-purple-600/20 rounded-lg">
                        <div className="text-3xl text-gray-800 dark:text-gray-100">🎯</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Deployment Timeline */}
                  <div className="h-64 mb-8">
                    <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">📅 Market Deployment Timeline</h3>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={[
                        { day: 'Day 1', drivers: 0, markets: 0 },
                        { day: 'Day 2', drivers: 5, markets: 0 },
                        { day: 'Day 4', drivers: 15, markets: 0 },
                        { day: 'Day 7', drivers: 30, markets: 1 },
                        { day: 'Day 14', drivers: 60, markets: 2 },
                        { day: 'Day 30', drivers: 150, markets: 5 }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                        <XAxis dataKey="day" stroke="#4b5563" />
                        <YAxis stroke="#4b5563" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                            border: 'none', 
                            borderRadius: '12px',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                          }} 
                        />
                        <Line type="monotone" dataKey="drivers" stroke="#276EF1" strokeWidth={4} dot={{ r: 8, fill: '#276EF1' }} />
                        <Line type="monotone" dataKey="markets" stroke="#10B981" strokeWidth={4} dot={{ r: 8, fill: '#10B981' }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </section>
            )}

            {/* Geographic Coverage Slide */}
            {activeTab === 'geographic-coverage' && (
              <section className="space-y-12">
                <div className="backdrop-blur-lg bg-white/95 dark:bg-gray-800/95 p-8 rounded-3xl border border-white/30 dark:border-gray-600/30 shadow-2xl">
                  <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-[#276EF1] to-indigo-600 bg-clip-text text-transparent">
                    🗺️ National Coverage Network
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-12">
                    {/* Active Markets */}
                    <div>
                      <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">🎆 Active Metropolitan Areas</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { city: 'Chicago', drivers: 180, status: 'Primary Hub' },
                          { city: 'Los Angeles', drivers: 150, status: 'Major Market' },
                          { city: 'New York', drivers: 120, status: 'Major Market' },
                          { city: 'Miami', drivers: 90, status: 'Growing' },
                          { city: 'Dallas', drivers: 85, status: 'Growing' },
                          { city: 'Phoenix', drivers: 75, status: 'Expanding' },
                          { city: 'Philadelphia', drivers: 65, status: 'Expanding' },
                          { city: 'Houston', drivers: 60, status: 'New Market' },
                          { city: 'Atlanta', drivers: 55, status: 'New Market' },
                          { city: 'Boston', drivers: 50, status: 'New Market' },
                          { city: 'Seattle', drivers: 45, status: 'Launch Phase' },
                          { city: 'Denver', drivers: 40, status: 'Launch Phase' }
                        ].map((market, index) => (
                          <div key={index} className="backdrop-blur-sm bg-gradient-to-br from-blue-500/20 to-indigo-500/20 p-4 rounded-xl border border-blue-300/30">
                            <div className="font-bold text-blue-900 dark:text-blue-100 mb-1">{market.city}</div>
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-200">{market.drivers}</div>
                            <div className="text-sm text-blue-700 dark:text-blue-300">Active Drivers</div>
                            <Badge variant="outline" className="mt-2 text-xs text-gray-600 dark:text-gray-300">{market.status}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Expansion Strategy */}
                    <div>
                      <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">📊 Strategic Expansion Plan</h3>
                      <div className="space-y-6">
                        <div className="backdrop-blur-sm bg-green-500/20 p-6 rounded-2xl border border-green-300/30">
                          <div className="flex items-center mb-4">
                            <span className="text-3xl text-gray-800 dark:text-gray-100 mr-3">⚡</span>
                            <h4 className="text-xl font-bold text-green-800 dark:text-green-200">Rapid Scaling</h4>
                          </div>
                          <p className="text-green-700 dark:text-green-300 mb-3">Proven ability to onboard 20-30 drivers per market within 7 days</p>
                          <div className="bg-green-600/20 p-3 rounded-lg">
                            <div className="text-lg font-bold text-green-600 dark:text-green-200">Week 1: Market Entry</div>
                            <div className="text-sm text-green-700 dark:text-green-300">Driver recruitment & training complete</div>
                          </div>
                        </div>
                        
                        <div className="backdrop-blur-sm bg-orange-500/20 p-6 rounded-2xl border border-orange-300/30">
                          <div className="flex items-center mb-4">
                            <span className="text-3xl text-gray-800 dark:text-gray-100 mr-3">🔄</span>
                            <h4 className="text-xl font-bold text-orange-800 dark:text-orange-200">Multi-Service Coverage</h4>
                          </div>
                          <p className="text-orange-700 dark:text-orange-300 mb-3">Single drivers can work across multiple service types in same day</p>
                          <div className="bg-orange-600/20 p-3 rounded-lg">
                            <div className="text-lg font-bold text-orange-600 dark:text-orange-200">Efficiency Multiplier</div>
                            <div className="text-sm text-orange-700 dark:text-orange-300">35% higher utilization rates</div>
                          </div>
                        </div>
                        
                        <div className="backdrop-blur-sm bg-purple-500/20 p-6 rounded-2xl border border-purple-300/30">
                          <div className="flex items-center mb-4">
                            <span className="text-3xl text-gray-800 dark:text-gray-100 mr-3">🏆</span>
                            <h4 className="text-xl font-bold text-purple-800 dark:text-purple-200">Quality Assurance</h4>
                          </div>
                          <p className="text-purple-700 dark:text-purple-300 mb-3">Referral-based network ensures consistent service quality</p>
                          <div className="bg-purple-600/20 p-3 rounded-lg">
                            <div className="text-lg font-bold text-purple-600 dark:text-purple-200">Quality Score</div>
                            <div className="text-sm text-purple-700 dark:text-purple-300">98% customer satisfaction rate</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Partnership Proposal Slide */}
            {activeTab === 'partnership-proposal' && (
              <section className="space-y-12">
                <div className="backdrop-blur-lg bg-gradient-to-r from-gray-900/95 to-black/95 text-white dark:text-gray-100 p-12 rounded-3xl mb-12 border border-white/10 dark:border-gray-700/30 shadow-2xl">
                  <div className="text-center text-gray-800 dark:text-gray-100">
                    <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
                      🤝 STRATEGIC PARTNERSHIP PROPOSAL
                    </h2>
                    <p className="text-2xl text-gray-700 dark:text-gray-200 max-w-5xl mx-auto">
                      Driver Network Inc. × Uber Freight: Powering the Future of Logistics Together
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="backdrop-blur-lg bg-white/95 dark:bg-gray-800/95 p-8 rounded-3xl border border-white/30 dark:border-gray-600/30 shadow-2xl">
                    <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">💼 What We Bring</h3>
                    <div className="space-y-4">
                      {[
                        { icon: '👥', title: '1,000+ Contracted Drivers', desc: 'Immediate scale across 19+ metropolitan markets' },
                        { icon: '⚡', title: 'Rapid Market Entry', desc: '7-day deployment capability for new territories' },
                        { icon: '🎯', title: 'Multi-Industry Expertise', desc: 'Proven excellence in automotive, medical, and e-commerce' },
                        { icon: '📱', title: 'Technology Integration', desc: 'API-ready systems with 99.9% uptime' },
                        { icon: '🏆', title: 'Track Record of Excellence', desc: '12+ years of operations with major brands' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 bg-blue-500/10 rounded-lg">
                          <div className="text-3xl text-gray-800 dark:text-gray-100">{item.icon}</div>
                          <div>
                            <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-1">{item.title}</h4>
                            <p className="text-blue-700 dark:text-blue-300 text-sm">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="backdrop-blur-lg bg-white/95 dark:bg-gray-800/95 p-8 rounded-3xl border border-white/30 dark:border-gray-600/30 shadow-2xl">
                    <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">🚀 Partnership Benefits</h3>
                    <div className="space-y-4">
                      {[
                        { icon: '💰', title: 'Cost Efficiency', desc: '25-40% cost reduction vs. building internal teams' },
                        { icon: '⏱️', title: 'Speed to Market', desc: 'Immediate operational capability, no ramp-up time' },
                        { icon: '🛡️', title: 'Risk Mitigation', desc: 'Proven track record eliminates execution risk' },
                        { icon: '📊', title: 'Scalable Operations', desc: 'Elastic capacity that grows with your business' },
                        { icon: '🎯', title: 'Quality Assurance', desc: '98%+ customer satisfaction across all verticals' }
                      ].map((benefit, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 bg-green-500/10 rounded-lg">
                          <div className="text-3xl text-gray-800 dark:text-gray-100">{benefit.icon}</div>
                          <div>
                            <h4 className="font-bold text-green-900 dark:text-green-100 mb-1">{benefit.title}</h4>
                            <p className="text-green-700 dark:text-green-300 text-sm">{benefit.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Competitive Advantage Slide */}
            {activeTab === 'competitive-advantage' && (
              <section className="space-y-12">
                <div className="backdrop-blur-lg bg-white/95 dark:bg-gray-800/95 p-8 rounded-3xl border border-white/30 dark:border-gray-600/30 shadow-2xl">
                  <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-[#276EF1] to-indigo-600 bg-clip-text text-transparent">
                    ⚡ Competitive Advantage Matrix
                  </h2>
                  
                  <div className="overflow-x-auto mb-8">
                    <table className="w-full bg-white dark:bg-gray-800/50 rounded-2xl shadow-xl">
                      <thead>
                        <tr className="bg-gradient-to-r from-[#276EF1] to-indigo-600 text-white dark:text-gray-100">
                          <th className="p-4 text-left text-gray-100 dark:text-gray-50 font-bold">Capability</th>
                          <th className="p-4 text-center text-gray-100 dark:text-gray-50 font-bold">Driver Network</th>
                          <th className="p-4 text-center text-gray-100 dark:text-gray-50 font-bold">Traditional 3PL</th>
                          <th className="p-4 text-center text-gray-100 dark:text-gray-50 font-bold">Gig Platforms</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-800 dark:text-gray-100">
                        {[
                          { capability: 'Market Entry Speed', us: '7 days', traditional: '3-6 months', gig: '2-4 weeks' },
                          { capability: 'Driver Quality Control', us: '68% referral-based', traditional: 'Variable', gig: 'Minimal screening' },
                          { capability: 'Multi-Industry Coverage', us: '3 active verticals', traditional: '1-2 specialties', gig: 'Limited scope' },
                          { capability: 'Technology Integration', us: 'API-first, 99.9% uptime', traditional: 'Legacy systems', gig: 'Platform-dependent' },
                          { capability: 'Geographic Reach', us: '19+ markets', traditional: '5-10 markets', gig: 'Major cities only' },
                          { capability: 'Damage-Free Rate', us: '99.9%', traditional: '94-96%', gig: '88-92%' }
                        ].map((row, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700/30' : 'bg-white dark:bg-gray-800/30'}>
                            <td className="p-4 font-semibold text-gray-900 dark:text-gray-100">{row.capability}</td>
                            <td className="p-4 text-center">
                              <div className="bg-green-500/20 px-3 py-2 rounded-lg">
                                <span className="font-bold text-green-800 dark:text-green-200">{row.us}</span>
                              </div>
                            </td>
                            <td className="p-4 text-center">
                              <div className="bg-yellow-500/20 px-3 py-2 rounded-lg">
                                <span className="font-medium text-yellow-800 dark:text-yellow-200">{row.traditional}</span>
                              </div>
                            </td>
                            <td className="p-4 text-center">
                              <div className="bg-red-500/20 px-3 py-2 rounded-lg">
                                <span className="font-medium text-red-800 dark:text-red-200">{row.gig}</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="backdrop-blur-sm bg-green-500/20 p-6 rounded-2xl border border-green-300/30 text-center text-gray-800 dark:text-gray-100">
                      <div className="text-4xl text-gray-800 dark:text-gray-100 mb-3">🏆</div>
                      <h4 className="text-xl font-bold text-green-800 dark:text-green-200 mb-2">Market Leadership</h4>
                      <p className="text-green-700 dark:text-green-300">Superior performance across all key metrics</p>
                    </div>
                    <div className="backdrop-blur-sm bg-blue-500/20 p-6 rounded-2xl border border-blue-300/30 text-center text-gray-800 dark:text-gray-100">
                      <div className="text-4xl text-gray-800 dark:text-gray-100 mb-3">⚡</div>
                      <h4 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-2">Speed Advantage</h4>
                      <p className="text-blue-700 dark:text-blue-300">10x faster market entry than traditional solutions</p>
                    </div>
                    <div className="backdrop-blur-sm bg-purple-500/20 p-6 rounded-2xl border border-purple-300/30 text-center text-gray-800 dark:text-gray-100">
                      <div className="text-4xl text-gray-800 dark:text-gray-100 mb-3">🎯</div>
                      <h4 className="text-xl font-bold text-purple-800 dark:text-purple-200 mb-2">Quality Edge</h4>
                      <p className="text-purple-700 dark:text-purple-300">Highest damage-free and satisfaction rates</p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Service Integration Slide */}
            {activeTab === 'service-integration' && (
              <section className="space-y-12">
                <div className="backdrop-blur-lg bg-white/95 dark:bg-gray-800/95 p-8 rounded-3xl border border-white/30 dark:border-gray-600/30 shadow-2xl">
                  <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-[#276EF1] to-indigo-600 bg-clip-text text-transparent">
                    🔗 Seamless Uber Freight Integration
                  </h2>
                  
                  <div className="grid lg:grid-cols-2 gap-12">
                    {/* Integration Architecture */}
                    <div>
                      <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">🏗️ Technical Integration</h3>
                      <div className="space-y-6">
                        <div className="backdrop-blur-sm bg-blue-500/20 p-6 rounded-2xl border border-blue-300/30">
                          <div className="flex items-center mb-4">
                            <span className="text-3xl text-gray-800 dark:text-gray-100 mr-3">📡</span>
                            <h4 className="text-xl font-bold text-blue-800 dark:text-blue-200">API Integration</h4>
                          </div>
                          <ul className="space-y-2 text-blue-700 dark:text-blue-300">
                            <li>• Real-time order dispatch and tracking</li>
                            <li>• Automatic driver assignment and routing</li>
                            <li>• Live status updates and proof of delivery</li>
                            <li>• 99.9% API uptime guarantee</li>
                          </ul>
                        </div>
                        
                        <div className="backdrop-blur-sm bg-green-500/20 p-6 rounded-2xl border border-green-300/30">
                          <div className="flex items-center mb-4">
                            <span className="text-3xl text-gray-800 dark:text-gray-100 mr-3">🔄</span>
                            <h4 className="text-xl font-bold text-green-800 dark:text-green-200">Workflow Automation</h4>
                          </div>
                          <ul className="space-y-2 text-green-700 dark:text-green-300">
                            <li>• Seamless handoff from Uber Freight platform</li>
                            <li>• Automated driver matching based on location/skills</li>
                            <li>• Dynamic pricing and capacity management</li>
                            <li>• Exception handling and escalation protocols</li>
                          </ul>
                        </div>
                        
                        <div className="backdrop-blur-sm bg-purple-500/20 p-6 rounded-2xl border border-purple-300/30">
                          <div className="flex items-center mb-4">
                            <span className="text-3xl text-gray-800 dark:text-gray-100 mr-3">📊</span>
                            <h4 className="text-xl font-bold text-purple-800 dark:text-purple-200">Data Analytics</h4>
                          </div>
                          <ul className="space-y-2 text-purple-700 dark:text-purple-300">
                            <li>• Performance metrics and KPI dashboards</li>
                            <li>• Predictive analytics for demand planning</li>
                            <li>• Custom reporting and business intelligence</li>
                            <li>• Data-driven optimization recommendations</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    {/* Service Tiers */}
                    <div>
                      <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">🎯 Service Tier Options</h3>
                      <div className="space-y-4">
                        {[
                          {
                            tier: 'Essential',
                            price: 'Base Rate',
                            features: ['Standard delivery', 'Basic tracking', '24hr support', 'Standard insurance'],
                            color: 'border-gray-300',
                            bgColor: 'bg-gray-500/10'
                          },
                          {
                            tier: 'Professional',
                            price: '+15%',
                            features: ['Priority dispatch', 'Real-time GPS', 'White-glove service', 'Enhanced insurance'],
                            color: 'border-blue-400',
                            bgColor: 'bg-blue-500/10'
                          },
                          {
                            tier: 'Enterprise',
                            price: '+30%',
                            features: ['Dedicated drivers', 'Custom protocols', 'Account manager', 'Premium insurance'],
                            color: 'border-purple-400',
                            bgColor: 'bg-purple-500/10'
                          }
                        ].map((tier, index) => (
                          <div key={index} className={`backdrop-blur-sm ${tier.bgColor} p-6 rounded-2xl border ${tier.color}`}>
                            <div className="flex justify-between items-start mb-4">
                              <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">{tier.tier}</h4>
                              <div className="text-lg font-bold text-gray-700 dark:text-gray-200">{tier.price}</div>
                            </div>
                            <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                              {tier.features.map((feature, fi) => (
                                <li key={fi} className="flex items-center">
                                  <span className="text-green-500 dark:text-green-400 mr-2">✓</span>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 p-4 bg-gradient-to-r from-[#276EF1]/20 to-indigo-500/20 rounded-xl border border-blue-300/30">
                        <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-2">💡 Custom Solutions Available</h4>
                        <p className="text-blue-700 dark:text-blue-300 text-sm">Bespoke service packages tailored to specific Uber Freight requirements and volume commitments.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* ROI Projection Slide */}
            {activeTab === 'roi-projection' && (
              <section className="space-y-12">
                <div className="backdrop-blur-lg bg-white/95 dark:bg-gray-800/95 p-8 rounded-3xl border border-white/30 dark:border-gray-600/30 shadow-2xl">
                  <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-[#276EF1] to-indigo-600 bg-clip-text text-transparent">
                    💰 Partnership ROI Projection
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-12 mb-12">
                    {/* Cost Savings Chart */}
                    <div>
                      <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">📊 5-Year Cost Comparison</h3>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={[
                            { year: 'Year 1', inHouse: 2800, partnership: 1680, savings: 1120 },
                            { year: 'Year 2', inHouse: 3200, partnership: 1920, savings: 1280 },
                            { year: 'Year 3', inHouse: 3800, partnership: 2280, savings: 1520 },
                            { year: 'Year 4', inHouse: 4500, partnership: 2700, savings: 1800 },
                            { year: 'Year 5', inHouse: 5200, partnership: 3120, savings: 2080 }
                          ]}>
                            <defs>
                              <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#10B981" stopOpacity={0.2}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                            <XAxis dataKey="year" stroke="#4b5563" />
                            <YAxis stroke="#4b5563" label={{ value: 'Cost ($K)', angle: -90, position: 'insideLeft' }} />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                                border: 'none', 
                                borderRadius: '12px',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                              }} 
                            />
                            <Area type="monotone" dataKey="inHouse" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
                            <Area type="monotone" dataKey="partnership" stackId="2" stroke="#276EF1" fill="#276EF1" fillOpacity={0.6} />
                            <Area type="monotone" dataKey="savings" stroke="#10B981" fillOpacity={1} fill="url(#savingsGradient)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    
                    {/* Financial Benefits */}
                    <div>
                      <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">💸 Financial Benefits</h3>
                      <div className="space-y-4">
                        {[
                          { 
                            category: 'Avoided Capital Investment', 
                            amount: '$4.2M', 
                            description: 'Vehicle fleet, technology, infrastructure',
                            color: 'bg-red-500/20 border-red-300/30',
                            textColor: 'text-red-800 dark:text-red-200'
                          },
                          { 
                            category: 'Operational Cost Savings', 
                            amount: '$8.8M', 
                            description: 'Hiring, training, management overhead',
                            color: 'bg-green-500/20 border-green-300/30',
                            textColor: 'text-green-800 dark:text-green-200'
                          },
                          { 
                            category: 'Risk Mitigation Value', 
                            amount: '$2.1M', 
                            description: 'Insurance, compliance, liability coverage',
                            color: 'bg-blue-500/20 border-blue-300/30',
                            textColor: 'text-blue-800 dark:text-blue-200'
                          },
                          { 
                            category: 'Faster Market Entry', 
                            amount: '$1.5M', 
                            description: 'Revenue acceleration vs. internal build',
                            color: 'bg-purple-500/20 border-purple-300/30',
                            textColor: 'text-purple-800 dark:text-purple-200'
                          }
                        ].map((benefit, index) => (
                          <div key={index} className={`backdrop-blur-sm ${benefit.color} p-6 rounded-2xl border`}>
                            <div className="flex justify-between items-start mb-3">
                              <h4 className={`text-lg font-bold ${benefit.textColor}`}>{benefit.category}</h4>
                              <div className={`text-2xl font-bold ${benefit.textColor}`}>{benefit.amount}</div>
                            </div>
                            <p className={`text-sm ${benefit.textColor} opacity-80`}>{benefit.description}</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-8 p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-300/30">
                        <div className="text-center text-gray-800 dark:text-gray-100">
                          <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">$16.6M</div>
                          <div className="text-xl font-bold text-green-800 dark:text-green-200 mb-1">Total 5-Year Value</div>
                          <div className="text-green-700 dark:text-green-300">Partnership vs. In-House Development</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Next Steps Slide */}
            {activeTab === 'next-steps' && (
              <section className="space-y-12">
                <div className="backdrop-blur-lg bg-gradient-to-r from-gray-900/95 to-black/95 text-white dark:text-gray-100 p-12 rounded-3xl mb-12 border border-white/10 dark:border-gray-700/30 shadow-2xl">
                  <div className="text-center text-gray-800 dark:text-gray-100">
                    <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
                      🚀 READY TO TRANSFORM LOGISTICS?
                    </h2>
                    <p className="text-2xl text-gray-700 dark:text-gray-200 max-w-4xl mx-auto">
                      Let's discuss how Driver Network Inc. can power your freight delivery network
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-12">
                  {/* Implementation Timeline */}
                  <div className="backdrop-blur-lg bg-white/95 dark:bg-gray-800/95 p-8 rounded-3xl border border-white/30 dark:border-gray-600/30 shadow-2xl">
                    <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">📅 Implementation Timeline</h3>
                    <div className="space-y-6">
                      {[
                        { phase: 'Week 1-2', title: 'Partnership Agreement', tasks: ['Contract finalization', 'Legal documentation', 'Integration planning'], icon: '📝', color: 'bg-blue-500/20' },
                        { phase: 'Week 3-4', title: 'Technical Integration', tasks: ['API development', 'System testing', 'Pilot market selection'], icon: '🔧', color: 'bg-green-500/20' },
                        { phase: 'Week 5-6', title: 'Pilot Launch', tasks: ['Driver onboarding', 'Market activation', 'Performance monitoring'], icon: '🚀', color: 'bg-purple-500/20' },
                        { phase: 'Week 7+', title: 'Scale & Optimize', tasks: ['Multi-market rollout', 'Performance optimization', 'Continuous improvement'], icon: '📈', color: 'bg-orange-500/20' }
                      ].map((phase, index) => (
                        <div key={index} className={`backdrop-blur-sm ${phase.color} p-6 rounded-2xl border border-white/20 dark:border-gray-700/30`}>
                          <div className="flex items-center mb-4">
                            <span className="text-3xl text-gray-800 dark:text-gray-100 mr-4">{phase.icon}</span>
                            <div>
                              <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">{phase.title}</h4>
                              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{phase.phase}</div>
                            </div>
                          </div>
                          <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                            {phase.tasks.map((task, ti) => (
                              <li key={ti} className="flex items-center text-sm">
                                <span className="text-green-500 dark:text-green-400 mr-2">✓</span>
                                {task}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Contact & Next Actions */}
                  <div className="backdrop-blur-lg bg-white/95 dark:bg-gray-800/95 p-8 rounded-3xl border border-white/30 dark:border-gray-600/30 shadow-2xl">
                    <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">🤝 Next Actions</h3>
                    
                    <div className="space-y-6 mb-8">
                      <div className="backdrop-blur-sm bg-gradient-to-r from-[#276EF1]/20 to-indigo-500/20 p-6 rounded-2xl border border-blue-300/30">
                        <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-3 flex items-center">
                          <span className="mr-3">📞</span>Immediate Next Steps
                        </h4>
                        <ul className="space-y-2 text-blue-700 dark:text-blue-300">
                          <li>• Schedule strategic alignment call</li>
                          <li>• Review contract terms and pricing</li>
                          <li>• Identify pilot markets for initial deployment</li>
                          <li>• Begin technical integration planning</li>
                        </ul>
                      </div>
                      
                      <div className="backdrop-blur-sm bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-6 rounded-2xl border border-green-300/30">
                        <h4 className="text-xl font-bold text-green-900 dark:text-green-100 mb-3 flex items-center">
                          <span className="mr-3">⚡</span>Why Act Now
                        </h4>
                        <ul className="space-y-2 text-green-700 dark:text-green-300">
                          <li>• Peak shipping season approaching</li>
                          <li>• Competition intensifying in logistics space</li>
                          <li>• Driver availability window optimal</li>
                          <li>• Technology integration readiness</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="text-center p-6 bg-gradient-to-r from-[#276EF1] to-indigo-600 rounded-2xl text-white dark:text-gray-100">
                      <h4 className="text-2xl font-bold text-gray-100 dark:text-gray-50 mb-2">Ready to Partner?</h4>
                      <p className="text-blue-100 dark:text-blue-200 mb-4">Let's transform freight delivery together</p>
                      <div className="space-y-2 text-blue-100 dark:text-blue-200">
                        <div className="font-semibold">Contact: Business Development Team</div>
                        <div>partnerships@drivernetwork.com</div>
                        <div>Direct: +1 (312) 555-0123</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

          </Container>
        </main>

      </div>
    </>
  );
}