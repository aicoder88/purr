"use client";

import { Container } from '@/components/ui/container';
import { useState, useCallback } from 'react';
import OverviewSection from './components/OverviewSection';
import MarketSection from './components/MarketSection';
import SolutionSection from './components/SolutionSection';
import TractionSection from './components/TractionSection';
import FinancialsSection from './components/FinancialsSection';
import TeamSection from './components/TeamSection';
import InvestmentSection from './components/InvestmentSection';

const TABS = [
  { id: 'overview', label: 'Executive Summary' },
  { id: 'problem', label: 'Market Opportunity' },
  { id: 'solution', label: 'Our Solution' },
  { id: 'traction', label: 'Traction' },
  { id: 'financials', label: 'Unit Economics' },
  { id: 'team', label: 'Team' },
  { id: 'investment', label: 'Investment Terms' }
] as const;

type TabId = typeof TABS[number]['id'];

export default function InvestorContent() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigateTab = useCallback((direction: 'prev' | 'next') => {
    const currentIndex = TABS.findIndex(tab => tab.id === activeTab);
    const newIndex = direction === 'prev'
      ? (currentIndex > 0 ? currentIndex - 1 : TABS.length - 1)
      : (currentIndex < TABS.length - 1 ? currentIndex + 1 : 0);

    setActiveTab(TABS[newIndex].id);
    scrollToTop();
  }, [activeTab, scrollToTop]);

  const handleTabClick = useCallback((tabId: TabId) => {
    setActiveTab(tabId);
    scrollToTop();
  }, [scrollToTop]);

  const renderSection = () => {
    switch (activeTab) {
      case 'overview': return <OverviewSection />;
      case 'problem': return <MarketSection />;
      case 'solution': return <SolutionSection />;
      case 'traction': return <TractionSection />;
      case 'financials': return <FinancialsSection />;
      case 'team': return <TeamSection />;
      case 'investment': return <InvestmentSection />;
      default: return <OverviewSection />;
    }
  };

  return (
    <>
      {/* Navigation Tabs */}
      <Container>
        <div className="pt-8 mb-4 relative z-10">
          <div className="w-fit mx-auto bg-white bg-gray-900/60 backdrop-blur-md rounded-lg shadow-md border border-white/20 border-gray-700/50 p-1">
            <div className="flex flex-wrap justify-center gap-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`px-3 py-1.5 text-sm font-medium transition-all duration-300 rounded-lg ${activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#FF3131] from-[#FF5050] to-[#5B2EFF] to-[#818CF8] text-white shadow-lg transform scale-105'
                    : 'text-gray-600 text-gray-300 hover:text-[#333333] hover:text-white hover:bg-white hover:bg-gray-700/50'
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
          <div className="w-fit mx-auto bg-white bg-gray-900/80 backdrop-blur-md rounded-lg shadow-md border border-white/20 border-gray-700/50 p-2">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigateTab('prev')}
                className="flex items-center px-4 py-2 text-sm bg-gradient-to-r from-[#FF3131] from-[#FF5050] to-[#5B2EFF] to-[#818CF8] text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <span className="text-sm mr-1">←</span>
                Previous
              </button>

              <div className="flex space-x-1">
                {TABS.map((tab) => (
                  <div
                    key={tab.id}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeTab === tab.id ? 'bg-[#FF3131] w-4' : 'bg-gray-300 bg-gray-600'
                      }`}
                  />
                ))}
              </div>

              <button
                onClick={() => navigateTab('next')}
                className="flex items-center px-4 py-2 text-sm bg-gradient-to-r from-[#5B2EFF] from-[#818CF8] to-[#FF3131] to-[#FF5050] text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
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
          {renderSection()}
        </div>
      </Container>
    </>
  );
}
