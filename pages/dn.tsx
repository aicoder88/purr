import { NextSeo } from 'next-seo';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../src/components/ui/card';
import { Button } from '../src/components/ui/button';
import { Badge } from '../src/components/ui/badge';
import { Container } from '../src/components/ui/container';

export default function DriverNetworkPresentation() {
  const [activeTab, setActiveTab] = useState('overview');

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

      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-black text-white py-8">
          <Container>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">Driver Network Inc.</h1>
                <p className="text-xl text-gray-300">Comprehensive Logistics Solutions</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-[#276EF1]">Partnership Proposal</div>
                <div className="text-sm text-gray-300">Uber Freight Division</div>
              </div>
            </div>
          </Container>
        </header>

        {/* Navigation */}
        <nav className="bg-gray-100 py-4 sticky top-0 z-10">
          <Container>
            <div className="flex space-x-6">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'performance', label: 'Performance' },
                { id: 'capabilities', label: 'Capabilities' },
                { id: 'expansion', label: 'Expansion' },
                { id: 'proposal', label: 'Proposal' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 font-semibold transition-colors ${
                    activeTab === tab.id
                      ? 'text-[#276EF1] border-b-2 border-[#276EF1]'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </Container>
        </nav>

        {/* Main Content */}
        <main className="py-12">
          <Container>
            {/* Executive Summary */}
            <section className="mb-16">
              <div className="bg-gradient-to-r from-black to-gray-800 text-white p-8 rounded-lg mb-8">
                <h2 className="text-3xl font-bold mb-4">Proven Scale. Proven Results.</h2>
                <p className="text-xl mb-6">
                  Driver Network Inc. delivers customizable logistics solutions with over 1,000 contracted drivers 
                  across 19 major North American markets, providing the scale and reliability Uber Freight requires.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-[#276EF1] mb-2">{stat.value}</div>
                      <div className="font-semibold mb-1">{stat.label}</div>
                      <div className="text-sm text-gray-300">{stat.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {activeTab === 'overview' && (
              <section className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Company Evolution & Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-bold mb-4 text-[#276EF1]">Growth Timeline</h3>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <Badge variant="outline" className="mr-3 mt-1">2012-2017</Badge>
                            <div>
                              <div className="font-semibold">Valet & Parking Operations</div>
                              <div className="text-gray-600">5 to 50+ locations in Chicagoland</div>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Badge variant="outline" className="mr-3 mt-1">2018</Badge>
                            <div>
                              <div className="font-semibold">Automotive Transport Launch</div>
                              <div className="text-gray-600">+500% revenue growth in Year 1</div>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Badge variant="outline" className="mr-3 mt-1">2019</Badge>
                            <div>
                              <div className="font-semibold">Courier Services Expansion</div>
                              <div className="text-gray-600">Multi-industry logistics platform</div>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Badge variant="outline" className="mr-3 mt-1">2023-Present</Badge>
                            <div>
                              <div className="font-semibold">National Expansion</div>
                              <div className="text-gray-600">19+ major metropolitan areas</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-4 text-[#276EF1]">Core Service Divisions</h3>
                        <div className="space-y-4">
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-bold">Valet & Traffic Management</h4>
                            <p className="text-sm text-gray-600">24/7 operations, accounting, traffic control</p>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-bold">Automotive Transport</h4>
                            <p className="text-sm text-gray-600">100+ vehicles daily, full documentation, GPS tracking</p>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-bold">Courier & Last-Mile</h4>
                            <p className="text-sm text-gray-600">Same-day, scheduled, temperature-controlled delivery</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
            )}

            {activeTab === 'performance' && (
              <section className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Proven Partnership Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      {[
                        {
                          title: 'Instacart Market Expansion',
                          challenge: 'Rapid expansion into 6 new markets within 6-12 months',
                          solution: '150+ trained drivers deployed, seamless platform integration',
                          results: ['100% on-time delivery performance', '30% reduction in logistics costs', 'Zero service interruptions', 'Most ambitious expansion in company history']
                        },
                        {
                          title: 'Corporate Catering Operations',
                          challenge: 'Managing 25-50 complex multi-pickup corporate routes daily',
                          solution: 'Dedicated route optimization, real-time tracking, 24/7 dispatch',
                          results: ['100% route completion rate', 'Elimination of missed deliveries', 'Improved client satisfaction scores', '60% reduction in management overhead']
                        },
                        {
                          title: 'SDSRX Medical Courier Services',
                          challenge: 'HIPAA-compliant medical delivery with zero tolerance for errors',
                          solution: 'HIPAA-certified training, temperature-controlled transport, chain-of-custody documentation',
                          results: ['18+ months zero security incidents', 'Perfect HIPAA compliance record', '300% service area expansion', '100% client retention']
                        }
                      ].map((case_, index) => (
                        <div key={index} className="border-l-4 border-[#276EF1] pl-6 py-4">
                          <h3 className="text-xl font-bold mb-3">{case_.title}</h3>
                          <div className="grid md:grid-cols-3 gap-4">
                            <div>
                              <h4 className="font-semibold text-red-600 mb-2">Challenge</h4>
                              <p className="text-sm text-gray-600">{case_.challenge}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-[#276EF1] mb-2">Solution</h4>
                              <p className="text-sm text-gray-600">{case_.solution}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-green-600 mb-2">Results</h4>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {case_.results.map((result, i) => (
                                  <li key={i}>• {result}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>
            )}

            {activeTab === 'capabilities' && (
              <section className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Driver Quality & Management</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center">
                        <div className="text-3xl font-bold text-[#276EF1] mr-4">68%</div>
                        <div>
                          <div className="font-semibold">Referral-Based Hiring</div>
                          <div className="text-sm text-gray-600">Indicates high driver satisfaction</div>
                        </div>
                      </div>
                      <ul className="space-y-2 text-sm">
                        <li>• Customizable background screening per client requirements</li>
                        <li>• Clean motor vehicle records required for all drivers</li>
                        <li>• Comprehensive SOP training for each contract</li>
                        <li>• Performance incentives and career advancement</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Technology Integration</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Current Platforms</h4>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          <Badge variant="secondary">Onfleet</Badge>
                          <Badge variant="secondary">DropCar</Badge>
                          <Badge variant="secondary">Slack</Badge>
                          <Badge variant="secondary">Custom APIs</Badge>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Key Features</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Third-party API integration</li>
                          <li>• Real-time order tracking and updates</li>
                          <li>• Automated dispatch and route planning</li>
                          <li>• Performance analytics and reporting</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Major Client Partnerships</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {partnerships.map((partner, index) => (
                        <div key={index} className="p-4 border rounded-lg text-center">
                          <h4 className="font-bold text-lg mb-2">{partner.name}</h4>
                          {partner.markets && (
                            <Badge variant="outline" className="mb-2">{partner.markets} Markets</Badge>
                          )}
                          {partner.category && (
                            <Badge variant="outline" className="mb-2">{partner.category}</Badge>
                          )}
                          <p className="text-sm text-[#276EF1] font-medium">{partner.achievement}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>
            )}

            {activeTab === 'expansion' && (
              <section className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Rapid Deployment Capabilities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-8">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-[#276EF1] mb-4">7 Days</div>
                        <h3 className="text-xl font-semibold mb-2">Market Entry</h3>
                        <p className="text-gray-600">20-30 drivers can be onboarded per new city within one week</p>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-[#276EF1] mb-4">19+</div>
                        <h3 className="text-xl font-semibold mb-2">Active Markets</h3>
                        <p className="text-gray-600">Major North American cities with established operations</p>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-[#276EF1] mb-4">Multiple</div>
                        <h3 className="text-xl font-semibold mb-2">Verticals</h3>
                        <p className="text-gray-600">Proven ability to scale across different industry sectors</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Geographic Coverage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold mb-4">Current Network Coverage</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3">Major Metropolitan Areas</h4>
                          <ul className="grid grid-cols-2 gap-2 text-sm">
                            <li>• Chicago</li>
                            <li>• Los Angeles</li>
                            <li>• New York</li>
                            <li>• Miami</li>
                            <li>• Dallas</li>
                            <li>• Phoenix</li>
                            <li>• Philadelphia</li>
                            <li>• Houston</li>
                            <li>• Atlanta</li>
                            <li>• Boston</li>
                            <li>• Seattle</li>
                            <li>• Denver</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3">Expansion Capabilities</h4>
                          <div className="space-y-3">
                            <div className="p-3 bg-white rounded border">
                              <div className="font-medium">Rapid Scaling</div>
                              <div className="text-sm text-gray-600">Proven ability to onboard 20-30 drivers per market within 7 days</div>
                            </div>
                            <div className="p-3 bg-white rounded border">
                              <div className="font-medium">Multi-Service Coverage</div>
                              <div className="text-sm text-gray-600">Single drivers can work across multiple service types in same day</div>
                            </div>
                            <div className="p-3 bg-white rounded border">
                              <div className="font-medium">Quality Assurance</div>
                              <div className="text-sm text-gray-600">Referral-based network ensures consistent service quality</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
            )}

            {activeTab === 'proposal' && (
              <section className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Strategic Partnership Proposal</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-r from-black to-gray-800 text-white p-8 rounded-lg mb-8">
                      <h3 className="text-2xl font-bold mb-4">Single-Vendor Solution for Uber Freight</h3>
                      <p className="text-lg mb-6">
                        Driver Network Inc. offers comprehensive logistics solutions that eliminate the complexity 
                        of managing multiple vendor relationships while providing the scale and reliability 
                        Uber Freight requires for its growing network.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-bold mb-4 text-[#276EF1]">Key Differentiators</h3>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="w-3 h-3 bg-[#276EF1] rounded-full mr-3 mt-2"></div>
                            <div>
                              <div className="font-semibold">Single-vendor simplicity</div>
                              <div className="text-sm text-gray-600">Multi-service capabilities under one partnership</div>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="w-3 h-3 bg-[#276EF1] rounded-full mr-3 mt-2"></div>
                            <div>
                              <div className="font-semibold">Proven scalability</div>
                              <div className="text-sm text-gray-600">Demonstrated growth across diverse industry verticals</div>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="w-3 h-3 bg-[#276EF1] rounded-full mr-3 mt-2"></div>
                            <div>
                              <div className="font-semibold">Technology-agnostic integration</div>
                              <div className="text-sm text-gray-600">Seamless integration with existing Uber systems</div>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="w-3 h-3 bg-[#276EF1] rounded-full mr-3 mt-2"></div>
                            <div>
                              <div className="font-semibold">Geographic flexibility</div>
                              <div className="text-sm text-gray-600">Rapid market entry capability with quality assurance</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-4 text-[#276EF1]">Service Integration Options</h3>
                        <div className="space-y-4">
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-bold">Last-Mile Freight Delivery</h4>
                            <p className="text-sm text-gray-600 mb-2">Same-day and scheduled delivery services for Uber Freight customers</p>
                            <Badge variant="outline">Available in 19+ markets</Badge>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-bold">Cross-Docking Support</h4>
                            <p className="text-sm text-gray-600 mb-2">Driver support for freight consolidation and distribution centers</p>
                            <Badge variant="outline">24/7 operations</Badge>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <h4 className="font-bold">Specialized Transport</h4>
                            <p className="text-sm text-gray-600 mb-2">Temperature-controlled and high-value cargo handling</p>
                            <Badge variant="outline">HIPAA compliant</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Next Steps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-[#276EF1] text-white p-6 rounded-lg mb-6">
                      <h3 className="text-xl font-bold mb-4">Ready to Move Forward</h3>
                      <p className="mb-4">
                        For a comprehensive operational assessment and customized solution proposal 
                        tailored specifically to Uber Freight's requirements, please contact:
                      </p>
                      <div className="bg-white text-black p-4 rounded">
                        <div className="font-bold text-lg">Nathan Fakhouri</div>
                        <div className="text-[#276EF1] font-semibold">Business Development Director</div>
                        <div className="mt-2 space-y-1">
                          <div>📧 Nathan@drivernetworkinc.com</div>
                          <div>📱 (224) 415-2520</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold mb-3">Initial Consultation Includes:</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                            Operational requirements analysis
                          </li>
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                            Service customization recommendations
                          </li>
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                            Pilot program development
                          </li>
                        </ul>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                            Integration timeline and milestones
                          </li>
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                            Transparent pricing structure
                          </li>
                          <li className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                            Performance guarantees and SLAs
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
            )}
          </Container>
        </main>

        {/* Footer */}
        <footer className="bg-black text-white py-8 mt-16">
          <Container>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Driver Network Inc.</h3>
              <p className="text-gray-300 mb-4">Delivering excellence through customizable logistics solutions since 2012</p>
              <div className="text-[#276EF1] font-semibold">
                Ready to scale Uber Freight's delivery network with proven logistics expertise
              </div>
            </div>
          </Container>
        </footer>
      </div>
    </>
  );
}