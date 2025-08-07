import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../src/components/ui/card';
import { Button } from '../src/components/ui/button';
import { Badge } from '../src/components/ui/badge';
import { Container } from '../src/components/ui/container';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';

export default function DriverNetworkPresentation() {
  const [activeTab, setActiveTab] = useState('overview');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTab = (direction: 'prev' | 'next') => {
    const tabs = ['overview', 'performance', 'capabilities', 'expansion', 'proposal'];
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

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
        {/* Header Navigation Buttons */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/20">
          <Container>
            <div className="flex justify-between items-center py-6">
              <button
                onClick={() => navigateTab('prev')}
                className="flex items-center px-8 py-4 bg-gradient-to-r from-[#276EF1] to-blue-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-w-[200px]"
              >
                <span className="text-2xl mr-3">←</span>
                Previous
              </button>
              
              <div className="text-center">
                <div className="text-white mb-2">
                  <h1 className="text-2xl font-bold">Driver Network Inc.</h1>
                  <p className="text-sm text-gray-300">Partnership Proposal - Uber Freight</p>
                </div>
                <div className="flex space-x-2">
                  {['overview', 'performance', 'capabilities', 'expansion', 'proposal'].map((tab, index) => (
                    <div
                      key={tab}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        activeTab === tab ? 'bg-[#276EF1] w-6' : 'bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => navigateTab('next')}
                className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-[#276EF1] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-w-[200px]"
              >
                Next
                <span className="text-2xl ml-3">→</span>
              </button>
            </div>
          </Container>
        </div>


        {/* Main Content */}
        <main className="pt-32 pb-32">
          <Container>

            {activeTab === 'overview' && (
              <section className="space-y-12">
                {/* Executive Summary - Only on overview tab */}
                <div className="backdrop-blur-lg bg-gradient-to-r from-black/80 to-gray-900/80 text-white p-12 rounded-3xl mb-8 border border-white/10 shadow-2xl">
                  <div className="text-center mb-8">
                    <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                      Proven Scale. Proven Results.
                    </h2>
                    <p className="text-xl text-gray-200 max-w-4xl mx-auto">
                      Driver Network Inc. delivers customizable logistics solutions with over 1,000 contracted drivers 
                      across 19 major North American markets, providing the scale and reliability Uber Freight requires.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center backdrop-blur-sm bg-white/10 p-6 rounded-2xl border border-white/20">
                        <div className="text-4xl font-bold text-[#276EF1] mb-3 bg-gradient-to-br from-[#276EF1] to-blue-400 bg-clip-text text-transparent">
                          {stat.value}
                        </div>
                        <div className="font-bold mb-2 text-lg">{stat.label}</div>
                        <div className="text-sm text-gray-300">{stat.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Company Evolution Visualization */}
                <div className="backdrop-blur-lg bg-white/20 p-8 rounded-3xl border border-white/30 shadow-2xl">
                  <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-[#276EF1] to-indigo-600 bg-clip-text text-transparent">
                    🚀 Company Evolution Journey
                  </h2>
                  
                  {/* Revenue Growth Chart */}
                  <div className="mb-12">
                    <h3 className="text-2xl font-bold mb-6 text-gray-800">📈 Revenue Growth Timeline</h3>
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
                          <div className="absolute -left-24 w-8 h-8 bg-white rounded-full border-4 border-[#276EF1] shadow-lg flex items-center justify-center text-lg">
                            {phase.icon}
                          </div>
                          <div className={`backdrop-blur-sm bg-gradient-to-r ${phase.color} p-6 rounded-2xl text-white shadow-xl transform hover:scale-105 transition-all duration-300`}>
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h4 className="text-xl font-bold mb-1">{phase.title}</h4>
                                <p className="text-sm opacity-90">{phase.year}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold">{phase.metric}</div>
                                <div className="text-xs opacity-80">{phase.detail}</div>
                              </div>
                            </div>
                            <p className="text-lg font-medium">{phase.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Service Divisions Pie Chart */}
                <div className="backdrop-blur-lg bg-white/20 p-8 rounded-3xl border border-white/30 shadow-2xl">
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
                      <div className="backdrop-blur-sm bg-blue-500/20 p-6 rounded-2xl border border-blue-300/30">
                        <h4 className="text-xl font-bold text-blue-800 mb-2">🚗 Valet & Traffic Management</h4>
                        <p className="text-blue-700">24/7 operations, accounting, traffic control</p>
                        <div className="text-2xl font-bold text-blue-600 mt-2">35% Revenue Share</div>
                      </div>
                      <div className="backdrop-blur-sm bg-green-500/20 p-6 rounded-2xl border border-green-300/30">
                        <h4 className="text-xl font-bold text-green-800 mb-2">🚛 Automotive Transport</h4>
                        <p className="text-green-700">100+ vehicles daily, GPS tracking, full documentation</p>
                        <div className="text-2xl font-bold text-green-600 mt-2">40% Revenue Share</div>
                      </div>
                      <div className="backdrop-blur-sm bg-amber-500/20 p-6 rounded-2xl border border-amber-300/30">
                        <h4 className="text-xl font-bold text-amber-800 mb-2">📦 Courier & Last-Mile</h4>
                        <p className="text-amber-700">Same-day, scheduled, temperature-controlled delivery</p>
                        <div className="text-2xl font-bold text-amber-600 mt-2">25% Revenue Share</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'performance' && (
              <section className="space-y-12">
                {/* Performance Metrics Dashboard */}
                <div className="backdrop-blur-lg bg-white/20 p-8 rounded-3xl border border-white/30 shadow-2xl">
                  <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-[#276EF1] to-indigo-600 bg-clip-text text-transparent">
                    📈 Performance Excellence Metrics
                  </h2>
                  
                  {/* Key Performance Indicators */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    <div className="backdrop-blur-sm bg-green-500/20 p-6 rounded-2xl border border-green-300/30 text-center">
                      <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
                      <div className="text-green-800 font-semibold">On-Time Delivery</div>
                      <div className="text-sm text-green-700 mt-1">🚚 Instacart Partnership</div>
                    </div>
                    <div className="backdrop-blur-sm bg-blue-500/20 p-6 rounded-2xl border border-blue-300/30 text-center">
                      <div className="text-4xl font-bold text-blue-600 mb-2">99.9%</div>
                      <div className="text-blue-800 font-semibold">Damage-Free Rate</div>
                      <div className="text-sm text-blue-700 mt-1">🚗 Automotive Transport</div>
                    </div>
                    <div className="backdrop-blur-sm bg-purple-500/20 p-6 rounded-2xl border border-purple-300/30 text-center">
                      <div className="text-4xl font-bold text-purple-600 mb-2">18+</div>
                      <div className="text-purple-800 font-semibold">Months Zero Incidents</div>
                      <div className="text-sm text-purple-700 mt-1">🏥 Medical Courier</div>
                    </div>
                    <div className="backdrop-blur-sm bg-orange-500/20 p-6 rounded-2xl border border-orange-300/30 text-center">
                      <div className="text-4xl font-bold text-orange-600 mb-2">$50M+</div>
                      <div className="text-orange-800 font-semibold">Value Transported</div>
                      <div className="text-sm text-orange-700 mt-1">💼 High-Value Cargo</div>
                    </div>
                  </div>

                  {/* Performance Comparison Chart */}
                  <div className="h-80 mb-8">
                    <h3 className="text-2xl font-bold mb-6 text-gray-800">🎯 Industry Performance Comparison</h3>
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

                {/* Case Studies Showcase */}
                <div className="space-y-8">
                  {[
                    {
                      title: 'Instacart Market Expansion',
                      icon: '📊',
                      challenge: 'Rapid expansion into 6 new markets within 6-12 months',
                      solution: '150+ trained drivers deployed, seamless platform integration',
                      results: ['100% on-time delivery performance', '30% reduction in logistics costs', 'Zero service interruptions', 'Most ambitious expansion in company history'],
                      gradient: 'from-blue-600 to-cyan-500',
                      chartData: [
                        { month: 'Month 1', drivers: 0, deliveries: 0 },
                        { month: 'Month 3', drivers: 50, deliveries: 1200 },
                        { month: 'Month 6', drivers: 100, deliveries: 3500 },
                        { month: 'Month 12', drivers: 150, deliveries: 6800 }
                      ]
                    },
                    {
                      title: 'Corporate Catering Operations',
                      icon: '🍽️',
                      challenge: 'Managing 25-50 complex multi-pickup corporate routes daily',
                      solution: 'Dedicated route optimization, real-time tracking, 24/7 dispatch',
                      results: ['100% route completion rate', 'Elimination of missed deliveries', 'Improved client satisfaction scores', '60% reduction in management overhead'],
                      gradient: 'from-green-600 to-emerald-500',
                      chartData: [
                        { week: 'Week 1', 'Route Efficiency': 65, 'Customer Satisfaction': 78 },
                        { week: 'Week 4', 'Route Efficiency': 85, 'Customer Satisfaction': 89 },
                        { week: 'Week 8', 'Route Efficiency': 95, 'Customer Satisfaction': 96 },
                        { week: 'Week 12', 'Route Efficiency': 100, 'Customer Satisfaction': 98 }
                      ]
                    },
                    {
                      title: 'SDSRX Medical Courier Services',
                      icon: '🏥',
                      challenge: 'HIPAA-compliant medical delivery with zero tolerance for errors',
                      solution: 'HIPAA-certified training, temperature-controlled transport, chain-of-custody documentation',
                      results: ['18+ months zero security incidents', 'Perfect HIPAA compliance record', '300% service area expansion', '100% client retention'],
                      gradient: 'from-purple-600 to-violet-500',
                      chartData: [
                        { quarter: 'Q1 2022', 'Compliance Score': 95, 'Incidents': 2 },
                        { quarter: 'Q2 2022', 'Compliance Score': 98, 'Incidents': 1 },
                        { quarter: 'Q3 2022', 'Compliance Score': 100, 'Incidents': 0 },
                        { quarter: 'Q4 2023', 'Compliance Score': 100, 'Incidents': 0 }
                      ]
                    }
                  ].map((case_, index) => (
                    <div key={index} className="backdrop-blur-lg bg-white/20 p-8 rounded-3xl border border-white/30 shadow-2xl">
                      <div className={`bg-gradient-to-r ${case_.gradient} p-6 rounded-2xl text-white mb-6`}>
                        <div className="flex items-center mb-4">
                          <span className="text-4xl mr-4">{case_.icon}</span>
                          <h3 className="text-3xl font-bold">{case_.title}</h3>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                          <div className="backdrop-blur-sm bg-red-500/30 p-4 rounded-xl">
                            <h4 className="font-bold text-xl mb-2">⚠️ Challenge</h4>
                            <p className="text-red-100">{case_.challenge}</p>
                          </div>
                          <div className="backdrop-blur-sm bg-blue-500/30 p-4 rounded-xl">
                            <h4 className="font-bold text-xl mb-2">⚙️ Solution</h4>
                            <p className="text-blue-100">{case_.solution}</p>
                          </div>
                          <div className="backdrop-blur-sm bg-green-500/30 p-4 rounded-xl">
                            <h4 className="font-bold text-xl mb-2">✅ Results</h4>
                            <ul className="text-green-100 space-y-1">
                              {case_.results.map((result, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="text-green-300 mr-2">•</span>
                                  <span className="text-sm">{result}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      {/* Individual Case Study Chart */}
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={case_.chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                            <XAxis dataKey={Object.keys(case_.chartData[0])[0]} stroke="#4b5563" />
                            <YAxis stroke="#4b5563" />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                                border: 'none', 
                                borderRadius: '12px',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                              }} 
                            />
                            {Object.keys(case_.chartData[0]).slice(1).map((key, i) => (
                              <Line 
                                key={key} 
                                type="monotone" 
                                dataKey={key} 
                                stroke={i === 0 ? '#276EF1' : '#10B981'} 
                                strokeWidth={3}
                                dot={{ r: 6, fill: i === 0 ? '#276EF1' : '#10B981' }}
                              />
                            ))}
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activeTab === 'capabilities' && (
              <section className="space-y-12">
                {/* Driver Quality Metrics */}
                <div className="backdrop-blur-lg bg-white/20 p-8 rounded-3xl border border-white/30 shadow-2xl">
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
                      <div className="text-center mt-4">
                        <div className="text-4xl font-bold text-[#276EF1]">68%</div>
                        <div className="text-xl font-semibold text-gray-800">Referral-Based Hiring</div>
                        <div className="text-gray-600">Indicates exceptional driver satisfaction</div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="backdrop-blur-sm bg-green-500/20 p-6 rounded-2xl border border-green-300/30">
                        <div className="flex items-center mb-3">
                          <span className="text-3xl mr-3">✅</span>
                          <h4 className="text-xl font-bold text-green-800">Quality Assurance</h4>
                        </div>
                        <ul className="space-y-2 text-green-700">
                          <li>• Customizable background screening per client requirements</li>
                          <li>• Clean motor vehicle records required for all drivers</li>
                          <li>• Comprehensive SOP training for each contract</li>
                        </ul>
                      </div>
                      
                      <div className="backdrop-blur-sm bg-blue-500/20 p-6 rounded-2xl border border-blue-300/30">
                        <div className="flex items-center mb-3">
                          <span className="text-3xl mr-3">🏆</span>
                          <h4 className="text-xl font-bold text-blue-800">Performance Excellence</h4>
                        </div>
                        <ul className="space-y-2 text-blue-700">
                          <li>• Performance incentives and career advancement</li>
                          <li>• Multi-industry flexibility and cross-training</li>
                          <li>• Real-time performance monitoring and feedback</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technology Stack Visualization */}
                <div className="backdrop-blur-lg bg-white/20 p-8 rounded-3xl border border-white/30 shadow-2xl">
                  <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-[#276EF1] to-indigo-600 bg-clip-text text-transparent">
                    📱 Technology Integration Ecosystem
                  </h2>
                  
                  <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {/* Platform Integration */}
                    <div className="backdrop-blur-sm bg-purple-500/20 p-6 rounded-2xl border border-purple-300/30">
                      <h3 className="text-2xl font-bold text-purple-800 mb-6 text-center">🔗 Platform Integration</h3>
                      <div className="space-y-4">
                        {[
                          { name: 'Onfleet', description: 'Route Optimization', status: 'Active' },
                          { name: 'DropCar', description: 'Automotive Management', status: 'Active' },
                          { name: 'Slack', description: 'Real-time Communication', status: 'Active' },
                          { name: 'Custom APIs', description: 'Bespoke Integrations', status: 'Available' }
                        ].map((platform, index) => (
                          <div key={index} className="bg-white/50 p-4 rounded-lg flex justify-between items-center">
                            <div>
                              <div className="font-bold text-purple-900">{platform.name}</div>
                              <div className="text-sm text-purple-700">{platform.description}</div>
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
                      <h3 className="text-2xl font-bold text-teal-800 mb-6 text-center">⚙️ Core Features</h3>
                      <div className="space-y-4">
                        {[
                          { feature: 'API Integration', capability: '99.9% Uptime' },
                          { feature: 'Real-time Tracking', capability: 'GPS + Photo Proof' },
                          { feature: 'Auto Dispatch', capability: 'AI Route Planning' },
                          { feature: 'Analytics', capability: 'Custom Dashboards' }
                        ].map((item, index) => (
                          <div key={index} className="bg-white/50 p-4 rounded-lg">
                            <div className="font-bold text-teal-900 mb-1">• {item.feature}</div>
                            <div className="text-sm text-teal-700">{item.capability}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Integration Benefits */}
                    <div className="backdrop-blur-sm bg-orange-500/20 p-6 rounded-2xl border border-orange-300/30">
                      <h3 className="text-2xl font-bold text-orange-800 mb-6 text-center">📊 Benefits</h3>
                      <div className="space-y-4">
                        {[
                          { metric: 'Efficiency Gain', value: '+35%' },
                          { metric: 'Error Reduction', value: '-85%' },
                          { metric: 'Response Time', value: '<2min' },
                          { metric: 'Client Satisfaction', value: '98%' }
                        ].map((benefit, index) => (
                          <div key={index} className="bg-white/50 p-4 rounded-lg text-center">
                            <div className="text-2xl font-bold text-orange-600">{benefit.value}</div>
                            <div className="text-sm text-orange-800 font-medium">{benefit.metric}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Client Portfolio Showcase */}
                <div className="backdrop-blur-lg bg-white/20 p-8 rounded-3xl border border-white/30 shadow-2xl">
                  <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-[#276EF1] to-indigo-600 bg-clip-text text-transparent">
                    🏢 Strategic Partnership Portfolio
                  </h2>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { 
                        name: 'Instacart', 
                        category: 'E-commerce', 
                        achievement: '100% on-time delivery',
                        markets: 6,
                        gradient: 'from-green-500 to-emerald-400',
                        icon: '🛋'
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
                        <div className="text-center text-white">
                          <div className="text-4xl mb-3">{partner.icon}</div>
                          <h4 className="text-xl font-bold mb-2">{partner.name}</h4>
                          <Badge variant="secondary" className="mb-3 bg-white/30 text-white border-white/50">
                            {partner.category}
                          </Badge>
                          {partner.markets && (
                            <Badge variant="secondary" className="mb-3 ml-2 bg-white/30 text-white border-white/50">
                              {partner.markets} Markets
                            </Badge>
                          )}
                          <p className="text-sm font-medium bg-white/20 p-2 rounded-lg">
                            {partner.achievement}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Client Satisfaction Chart */}
                  <div className="mt-12 h-64">
                    <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">📊 Client Satisfaction Scores</h3>
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

            {activeTab === 'expansion' && (
              <section className="space-y-12">
                {/* Rapid Deployment Dashboard */}
                <div className="backdrop-blur-lg bg-white/20 p-8 rounded-3xl border border-white/30 shadow-2xl">
                  <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-[#276EF1] to-indigo-600 bg-clip-text text-transparent">
                    🚀 Rapid Deployment Engine
                  </h2>
                  
                  <div className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="backdrop-blur-sm bg-green-500/20 p-8 rounded-2xl border border-green-300/30 text-center transform hover:scale-105 transition-all duration-300">
                      <div className="text-6xl font-bold text-green-600 mb-4">7</div>
                      <div className="text-2xl font-bold text-green-800 mb-2">Days</div>
                      <h3 className="text-xl font-semibold mb-3 text-green-900">Market Entry</h3>
                      <p className="text-green-700">20-30 drivers onboarded per new city within one week</p>
                      <div className="mt-4 p-3 bg-green-600/20 rounded-lg">
                        <div className="text-3xl">⏱️</div>
                      </div>
                    </div>
                    
                    <div className="backdrop-blur-sm bg-blue-500/20 p-8 rounded-2xl border border-blue-300/30 text-center transform hover:scale-105 transition-all duration-300">
                      <div className="text-6xl font-bold text-blue-600 mb-4">19+</div>
                      <div className="text-2xl font-bold text-blue-800 mb-2">Markets</div>
                      <h3 className="text-xl font-semibold mb-3 text-blue-900">Active Operations</h3>
                      <p className="text-blue-700">Major North American cities with established networks</p>
                      <div className="mt-4 p-3 bg-blue-600/20 rounded-lg">
                        <div className="text-3xl">🌍</div>
                      </div>
                    </div>
                    
                    <div className="backdrop-blur-sm bg-purple-500/20 p-8 rounded-2xl border border-purple-300/30 text-center transform hover:scale-105 transition-all duration-300">
                      <div className="text-6xl font-bold text-purple-600 mb-4">3</div>
                      <div className="text-2xl font-bold text-purple-800 mb-2">Verticals</div>
                      <h3 className="text-xl font-semibold mb-3 text-purple-900">Industry Coverage</h3>
                      <p className="text-purple-700">Proven scalability across different industry sectors</p>
                      <div className="mt-4 p-3 bg-purple-600/20 rounded-lg">
                        <div className="text-3xl">🎯</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Deployment Timeline */}
                  <div className="h-64 mb-8">
                    <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">📅 Market Deployment Timeline</h3>
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

                {/* Geographic Coverage Map */}
                <div className="backdrop-blur-lg bg-white/20 p-8 rounded-3xl border border-white/30 shadow-2xl">
                  <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-[#276EF1] to-indigo-600 bg-clip-text text-transparent">
                    🗺️ National Coverage Network
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-12">
                    {/* Active Markets */}
                    <div>
                      <h3 className="text-2xl font-bold mb-6 text-gray-800">🎆 Active Metropolitan Areas</h3>
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
                            <div className="font-bold text-blue-900 mb-1">{market.city}</div>
                            <div className="text-2xl font-bold text-blue-600">{market.drivers}</div>
                            <div className="text-sm text-blue-700">Active Drivers</div>
                            <Badge variant="outline" className="mt-2 text-xs">{market.status}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Expansion Strategy */}
                    <div>
                      <h3 className="text-2xl font-bold mb-6 text-gray-800">📊 Strategic Expansion Plan</h3>
                      <div className="space-y-6">
                        <div className="backdrop-blur-sm bg-green-500/20 p-6 rounded-2xl border border-green-300/30">
                          <div className="flex items-center mb-4">
                            <span className="text-3xl mr-3">⚡</span>
                            <h4 className="text-xl font-bold text-green-800">Rapid Scaling</h4>
                          </div>
                          <p className="text-green-700 mb-3">Proven ability to onboard 20-30 drivers per market within 7 days</p>
                          <div className="bg-green-600/20 p-3 rounded-lg">
                            <div className="text-lg font-bold text-green-600">Week 1: Market Entry</div>
                            <div className="text-sm text-green-700">Driver recruitment & training complete</div>
                          </div>
                        </div>
                        
                        <div className="backdrop-blur-sm bg-orange-500/20 p-6 rounded-2xl border border-orange-300/30">
                          <div className="flex items-center mb-4">
                            <span className="text-3xl mr-3">🔄</span>
                            <h4 className="text-xl font-bold text-orange-800">Multi-Service Coverage</h4>
                          </div>
                          <p className="text-orange-700 mb-3">Single drivers can work across multiple service types in same day</p>
                          <div className="bg-orange-600/20 p-3 rounded-lg">
                            <div className="text-lg font-bold text-orange-600">Efficiency Multiplier</div>
                            <div className="text-sm text-orange-700">35% higher utilization rates</div>
                          </div>
                        </div>
                        
                        <div className="backdrop-blur-sm bg-purple-500/20 p-6 rounded-2xl border border-purple-300/30">
                          <div className="flex items-center mb-4">
                            <span className="text-3xl mr-3">🏆</span>
                            <h4 className="text-xl font-bold text-purple-800">Quality Assurance</h4>
                          </div>
                          <p className="text-purple-700 mb-3">Referral-based network ensures consistent service quality</p>
                          <div className="bg-purple-600/20 p-3 rounded-lg">
                            <div className="text-lg font-bold text-purple-600">Quality Score</div>
                            <div className="text-sm text-purple-700">98% customer satisfaction rate</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Market Growth Projection */}
                  <div className="mt-12 h-64">
                    <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">📈 Market Expansion Projection</h3>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={[
                        { month: 'Current', markets: 19, drivers: 1000 },
                        { month: 'Month 3', markets: 25, drivers: 1400 },
                        { month: 'Month 6', markets: 32, drivers: 1900 },
                        { month: 'Month 12', markets: 45, drivers: 2800 },
                        { month: 'Month 18', markets: 60, drivers: 4000 }
                      ]}>
                        <defs>
                          <linearGradient id="marketGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#276EF1" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#276EF1" stopOpacity={0.2}/>
                          </linearGradient>
                          <linearGradient id="driverGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0.2}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                        <XAxis dataKey="month" stroke="#4b5563" />
                        <YAxis stroke="#4b5563" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                            border: 'none', 
                            borderRadius: '12px',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                          }} 
                        />
                        <Area type="monotone" dataKey="markets" stackId="1" stroke="#276EF1" fill="url(#marketGradient)" strokeWidth={3} />
                        <Area type="monotone" dataKey="drivers" stackId="2" stroke="#10B981" fill="url(#driverGradient)" strokeWidth={3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'proposal' && (
              <section className="space-y-12">
                {/* Strategic Partnership Header */}
                <div className="backdrop-blur-lg bg-gradient-to-r from-black/80 to-gray-900/80 text-white p-12 rounded-3xl border border-white/10 shadow-2xl">
                  <div className="text-center mb-8">
                    <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                      🤝 Strategic Partnership Proposal
                    </h2>
                    <p className="text-2xl text-gray-200 max-w-4xl mx-auto">
                      Single-Vendor Solution for Uber Freight's Comprehensive Logistics Network
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="text-center backdrop-blur-sm bg-white/10 p-6 rounded-2xl border border-white/20">
                      <div className="text-4xl mb-3">🎯</div>
                      <div className="text-2xl font-bold text-[#276EF1] mb-2">Single Vendor</div>
                      <div className="text-gray-300">Unified Solution</div>
                    </div>
                    <div className="text-center backdrop-blur-sm bg-white/10 p-6 rounded-2xl border border-white/20">
                      <div className="text-4xl mb-3">🚀</div>
                      <div className="text-2xl font-bold text-[#276EF1] mb-2">Proven Scale</div>
                      <div className="text-gray-300">1,000+ Drivers</div>
                    </div>
                    <div className="text-center backdrop-blur-sm bg-white/10 p-6 rounded-2xl border border-white/20">
                      <div className="text-4xl mb-3">⚙️</div>
                      <div className="text-2xl font-bold text-[#276EF1] mb-2">Tech Ready</div>
                      <div className="text-gray-300">API Integration</div>
                    </div>
                    <div className="text-center backdrop-blur-sm bg-white/10 p-6 rounded-2xl border border-white/20">
                      <div className="text-4xl mb-3">🌍</div>
                      <div className="text-2xl font-bold text-[#276EF1] mb-2">19+ Markets</div>
                      <div className="text-gray-300">National Coverage</div>
                    </div>
                  </div>
                </div>

                {/* Value Proposition Matrix */}
                <div className="backdrop-blur-lg bg-white/20 p-8 rounded-3xl border border-white/30 shadow-2xl">
                  <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-[#276EF1] to-indigo-600 bg-clip-text text-transparent">
                    📊 Competitive Advantage Matrix
                  </h2>
                  
                  {/* Comparison Chart */}
                  <div className="h-80 mb-12">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { capability: 'Market Coverage', 'Driver Network': 19, 'Competitor A': 8, 'Competitor B': 12 },
                        { capability: 'Driver Count', 'Driver Network': 1000, 'Competitor A': 400, 'Competitor B': 650 },
                        { capability: 'Service Types', 'Driver Network': 3, 'Competitor A': 1, 'Competitor B': 2 },
                        { capability: 'Years Experience', 'Driver Network': 12, 'Competitor A': 6, 'Competitor B': 8 },
                        { capability: 'Deployment Speed', 'Driver Network': 7, 'Competitor A': 21, 'Competitor B': 14 }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                        <XAxis dataKey="capability" stroke="#4b5563" />
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
                        <Bar dataKey="Competitor A" fill="#94A3B8" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="Competitor B" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Key Differentiators */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { 
                        title: 'Single-Vendor Simplicity', 
                        desc: 'Multi-service capabilities under one partnership',
                        icon: '🎯',
                        gradient: 'from-blue-500 to-cyan-400'
                      },
                      { 
                        title: 'Proven Scalability', 
                        desc: 'Demonstrated growth across diverse industry verticals',
                        icon: '📈',
                        gradient: 'from-green-500 to-emerald-400'
                      },
                      { 
                        title: 'Technology Integration', 
                        desc: 'Seamless integration with existing Uber systems',
                        icon: '🔗',
                        gradient: 'from-purple-500 to-violet-400'
                      },
                      { 
                        title: 'Geographic Flexibility', 
                        desc: 'Rapid market entry capability with quality assurance',
                        icon: '🌍',
                        gradient: 'from-orange-500 to-red-400'
                      }
                    ].map((diff, index) => (
                      <div key={index} className={`backdrop-blur-sm bg-gradient-to-br ${diff.gradient} p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300`}>
                        <div className="text-white text-center">
                          <div className="text-4xl mb-4">{diff.icon}</div>
                          <h4 className="text-xl font-bold mb-3">{diff.title}</h4>
                          <p className="text-sm opacity-90">{diff.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Integration Options */}
                <div className="backdrop-blur-lg bg-white/20 p-8 rounded-3xl border border-white/30 shadow-2xl">
                  <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-[#276EF1] to-indigo-600 bg-clip-text text-transparent">
                    🔄 Uber Freight Integration Services
                  </h2>
                  
                  <div className="grid md:grid-cols-3 gap-8">
                    {[
                      {
                        title: 'Last-Mile Freight Delivery',
                        description: 'Same-day and scheduled delivery services for Uber Freight customers',
                        features: ['19+ Active Markets', 'Real-time Tracking', '100% On-time Delivery'],
                        icon: '📦',
                        gradient: 'from-blue-500 to-indigo-500'
                      },
                      {
                        title: 'Cross-Docking Support',
                        description: 'Driver support for freight consolidation and distribution centers',
                        features: ['24/7 Operations', 'Multi-dock Coordination', 'Inventory Management'],
                        icon: '🏢',
                        gradient: 'from-green-500 to-teal-500'
                      },
                      {
                        title: 'Specialized Transport',
                        description: 'Temperature-controlled and high-value cargo handling',
                        features: ['HIPAA Compliant', 'Temperature Monitoring', 'High-security Protocols'],
                        icon: '🌡️',
                        gradient: 'from-purple-500 to-pink-500'
                      }
                    ].map((service, index) => (
                      <div key={index} className={`backdrop-blur-sm bg-gradient-to-br ${service.gradient} p-8 rounded-2xl text-white shadow-xl transform hover:scale-105 transition-all duration-300`}>
                        <div className="text-center mb-6">
                          <div className="text-5xl mb-4">{service.icon}</div>
                          <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                          <p className="text-lg opacity-90">{service.description}</p>
                        </div>
                        
                        <div className="space-y-3">
                          {service.features.map((feature, i) => (
                            <div key={i} className="flex items-center bg-white/20 p-3 rounded-lg">
                              <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                              <span className="font-medium">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ROI Projection */}
                <div className="backdrop-blur-lg bg-white/20 p-8 rounded-3xl border border-white/30 shadow-2xl">
                  <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-[#276EF1] to-indigo-600 bg-clip-text text-transparent">
                    📈 Partnership ROI Projection
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={[
                          { quarter: 'Q1', 'Cost Savings': 150, 'Efficiency Gain': 180, 'Revenue Impact': 200 },
                          { quarter: 'Q2', 'Cost Savings': 280, 'Efficiency Gain': 350, 'Revenue Impact': 420 },
                          { quarter: 'Q3', 'Cost Savings': 450, 'Efficiency Gain': 560, 'Revenue Impact': 680 },
                          { quarter: 'Q4', 'Cost Savings': 680, 'Efficiency Gain': 820, 'Revenue Impact': 1000 }
                        ]}>
                          <defs>
                            <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#10B981" stopOpacity={0.2}/>
                            </linearGradient>
                            <linearGradient id="efficiencyGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#276EF1" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#276EF1" stopOpacity={0.2}/>
                            </linearGradient>
                            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.2}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                          <XAxis dataKey="quarter" stroke="#4b5563" />
                          <YAxis stroke="#4b5563" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                              border: 'none', 
                              borderRadius: '12px',
                              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                            }} 
                          />
                          <Area type="monotone" dataKey="Cost Savings" stackId="1" stroke="#10B981" fill="url(#savingsGradient)" strokeWidth={3} />
                          <Area type="monotone" dataKey="Efficiency Gain" stackId="2" stroke="#276EF1" fill="url(#efficiencyGradient)" strokeWidth={3} />
                          <Area type="monotone" dataKey="Revenue Impact" stackId="3" stroke="#F59E0B" fill="url(#revenueGradient)" strokeWidth={3} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="backdrop-blur-sm bg-green-500/20 p-6 rounded-2xl border border-green-300/30">
                        <h4 className="text-2xl font-bold text-green-800 mb-3">💰 Year 1 Projected Savings</h4>
                        <div className="text-4xl font-bold text-green-600 mb-2">$1.5M+</div>
                        <p className="text-green-700">Through operational efficiency and vendor consolidation</p>
                      </div>
                      
                      <div className="backdrop-blur-sm bg-blue-500/20 p-6 rounded-2xl border border-blue-300/30">
                        <h4 className="text-2xl font-bold text-blue-800 mb-3">⚡ Efficiency Improvements</h4>
                        <div className="text-4xl font-bold text-blue-600 mb-2">35%+</div>
                        <p className="text-blue-700">Reduction in logistics coordination overhead</p>
                      </div>
                      
                      <div className="backdrop-blur-sm bg-orange-500/20 p-6 rounded-2xl border border-orange-300/30">
                        <h4 className="text-2xl font-bold text-orange-800 mb-3">📈 Revenue Growth Support</h4>
                        <div className="text-4xl font-bold text-orange-600 mb-2">25%+</div>
                        <p className="text-orange-700">Faster market expansion and service delivery</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact & Next Steps */}
                <div className="backdrop-blur-lg bg-gradient-to-r from-[#276EF1]/90 to-indigo-600/90 text-white p-12 rounded-3xl border border-white/20 shadow-2xl">
                  <h2 className="text-4xl font-bold mb-8 text-center">
                    🚀 Ready to Transform Uber Freight Operations
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="backdrop-blur-sm bg-white/20 p-8 rounded-2xl border border-white/30">
                      <h3 className="text-3xl font-bold mb-6 text-center">📞 Direct Contact</h3>
                      <div className="bg-white text-gray-900 p-6 rounded-xl">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-[#276EF1] mb-2">Nathan Fakhouri</div>
                          <div className="text-lg font-semibold text-gray-700 mb-4">Business Development Director</div>
                          <div className="space-y-3">
                            <div className="flex items-center justify-center">
                              <span className="text-2xl mr-3">📧</span>
                              <span className="font-medium">Nathan@drivernetworkinc.com</span>
                            </div>
                            <div className="flex items-center justify-center">
                              <span className="text-2xl mr-3">📱</span>
                              <span className="font-medium">(224) 415-2520</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="backdrop-blur-sm bg-white/20 p-8 rounded-2xl border border-white/30">
                      <h3 className="text-3xl font-bold mb-6 text-center">🎯 Consultation Includes</h3>
                      <div className="grid gap-4">
                        {[
                          'Operational requirements analysis',
                          'Service customization recommendations', 
                          'Pilot program development',
                          'Integration timeline and milestones',
                          'Transparent pricing structure',
                          'Performance guarantees and SLAs'
                        ].map((item, index) => (
                          <div key={index} className="flex items-center bg-white/20 p-3 rounded-lg">
                            <div className="w-3 h-3 bg-green-400 rounded-full mr-4"></div>
                            <span className="font-medium">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center mt-8">
                    <div className="text-xl font-semibold bg-white/20 p-4 rounded-xl inline-block">
                      ✨ Schedule your strategic consultation today and accelerate Uber Freight's growth trajectory ✨
                    </div>
                  </div>
                </div>
              </section>
            )}
          </Container>
        </main>

        {/* Large Navigation Buttons */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-700">
          <Container>
            <div className="flex justify-between items-center py-6">
              <button
                onClick={() => navigateTab('prev')}
                className="flex items-center px-8 py-4 bg-gradient-to-r from-[#276EF1] to-blue-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-w-[200px]"
              >
                <span className="text-2xl mr-3">←</span>
                Previous
              </button>
              
              <div className="text-center">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Section Navigation</div>
                <div className="flex space-x-2">
                  {['overview', 'performance', 'capabilities', 'expansion', 'proposal'].map((tab, index) => (
                    <div
                      key={tab}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        activeTab === tab ? 'bg-[#276EF1] w-6' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => navigateTab('next')}
                className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-[#276EF1] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-w-[200px]"
              >
                Next
                <span className="text-2xl ml-3">→</span>
              </button>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}