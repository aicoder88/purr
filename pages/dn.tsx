import { NextSeo } from 'next-seo';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../src/components/ui/card';
import { Button } from '../src/components/ui/button';
import { Badge } from '../src/components/ui/badge';
import { Container } from '../src/components/ui/container';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';

export default function DriverNetworkPresentation() {
  const [activeTab, setActiveTab] = useState('agenda-overview');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [slideTransition, setSlideTransition] = useState('');
  const [presentationStartTime, setPresentationStartTime] = useState<Date | null>(null);
  const [slideTimer, setSlideTimer] = useState(0);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [showSwipeIndicator, setShowSwipeIndicator] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [analytics, setAnalytics] = useState({
    slideViews: {} as { [key: string]: number },
    timeOnSlide: {} as { [key: string]: number },
    navigationActions: 0,
    searchQueries: [] as string[],
    sessionStartTime: new Date(),
    totalPresentationTime: 0,
    keyboardShortcuts: 0,
    touchGestures: 0
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const tabs = useMemo(() => [
    'agenda-overview', 'executive-summary', 'company-evolution', 'service-divisions',
    'performance-metrics', 'case-study-instacart', 'case-study-tesla', 'case-study-medical', 'case-study-bmw',
    'driver-excellence', 'technology-integration', 'client-portfolio',
    'rapid-deployment', 'geographic-coverage',
    'partnership-proposal', 'competitive-advantage', 'service-integration', 'roi-projection', 'next-steps'
  ], []);

  // Analytics tracking functions
  const trackSlideView = useCallback((slideId: string) => {
    setAnalytics(prev => ({
      ...prev,
      slideViews: {
        ...prev.slideViews,
        [slideId]: (prev.slideViews[slideId] || 0) + 1
      }
    }));
  }, []);

  const trackNavigation = useCallback((method: 'keyboard' | 'touch' | 'click') => {
    setAnalytics(prev => ({
      ...prev,
      navigationActions: prev.navigationActions + 1,
      ...(method === 'keyboard' && { keyboardShortcuts: prev.keyboardShortcuts + 1 }),
      ...(method === 'touch' && { touchGestures: prev.touchGestures + 1 })
    }));
  }, []);

  const navigateTab = useCallback((direction: 'prev' | 'next', method: 'keyboard' | 'touch' | 'click' = 'click') => {
    const currentIndex = tabs.indexOf(activeTab);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
    } else {
      newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
    }
    
    // Track analytics
    trackNavigation(method);
    trackSlideView(tabs[newIndex]);
    
    // Add slide transition effect
    setSlideTransition(direction === 'next' ? 'slide-left' : 'slide-right');
    setTimeout(() => setSlideTransition(''), 300);
    
    setActiveTab(tabs[newIndex]);
    scrollToTop();
    
    // Save progress to localStorage
    localStorage.setItem('dn-presentation-slide', tabs[newIndex]);
  }, [activeTab, tabs, trackNavigation, trackSlideView]);

  const goToSlide = useCallback((slideId: string, method: 'keyboard' | 'touch' | 'click' = 'click') => {
    // Track analytics
    trackNavigation(method);
    trackSlideView(slideId);
    
    setSlideTransition('fade');
    setTimeout(() => setSlideTransition(''), 300);
    setActiveTab(slideId);
    scrollToTop();
    localStorage.setItem('dn-presentation-slide', slideId);
  }, [trackNavigation, trackSlideView]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        navigateTab('prev', 'keyboard');
      } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown' || event.key === ' ') {
        event.preventDefault();
        navigateTab('next', 'keyboard');
      } else if (event.key === 'f' || event.key === 'F11') {
        event.preventDefault();
        toggleFullscreen();
      } else if (event.key === 'Escape') {
        setIsFullscreen(false);
        setShowThumbnails(false);
      } else if (event.key === 't' || event.key === 'T') {
        event.preventDefault();
        setShowThumbnails(!showThumbnails);
      } else if (event.key === 'n' || event.key === 'N') {
        event.preventDefault();
        setShowSpeakerNotes(!showSpeakerNotes);
      } else if (event.key === 's' || event.key === 'S') {
        if (!event.ctrlKey && !event.metaKey) {
          event.preventDefault();
          setShowSearch(!showSearch);
        }
      } else if (event.key === 'Home') {
        event.preventDefault();
        goToSlide('agenda-overview', 'keyboard');
      } else if (event.key === 'End') {
        event.preventDefault();
        goToSlide('next-steps', 'keyboard');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigateTab, goToSlide, showThumbnails, showSearch, showSpeakerNotes]);

  // Load saved progress
  useEffect(() => {
    const savedSlide = localStorage.getItem('dn-presentation-slide');
    if (savedSlide && tabs.includes(savedSlide)) {
      setActiveTab(savedSlide);
    }
  }, [tabs]);

  // Mobile detection and swipe indicator
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Show swipe indicator on mobile for first-time users
    if (window.innerWidth <= 768) {
      const hasSeenIndicator = localStorage.getItem('dn-seen-swipe-indicator');
      if (!hasSeenIndicator) {
        setShowSwipeIndicator(true);
        setTimeout(() => {
          setShowSwipeIndicator(false);
          localStorage.setItem('dn-seen-swipe-indicator', 'true');
        }, 3000);
      }
    }
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Timer functionality
  useEffect(() => {
    if (presentationStartTime) {
      const timer = setInterval(() => {
        setSlideTimer(Math.floor((Date.now() - presentationStartTime.getTime()) / 1000));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [presentationStartTime]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen().catch(err => {
        console.error('Error attempting to exit fullscreen:', err);
      });
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const startPresentation = () => {
    setPresentationStartTime(new Date());
    goToSlide('agenda-overview');
    setIsFullscreen(true);
    toggleFullscreen();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const printPresentation = () => {
    // Create a print-friendly version of all slides
    window.print();
  };

  const exportToPDF = async () => {
    setIsExporting(true);
    try {
      // Note: In a real implementation, you would use libraries like jsPDF or Puppeteer
      // For now, we'll simulate the export process
      alert('PDF export functionality would be implemented here using jsPDF or similar library');
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const exportToImages = async () => {
    setIsExporting(true);
    try {
      // Note: In a real implementation, you would use html2canvas or similar
      alert('Image export functionality would be implemented here using html2canvas');
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  // Touch gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      navigateTab('next', 'touch');
    } else if (isRightSwipe) {
      navigateTab('prev', 'touch');
    }
  };

  // Search content mapping for slides
  const slideContent: { [key: string]: string[] } = useMemo(() => ({
    'agenda-overview': ['agenda', 'overview', 'presentation', 'driver network', 'strategic partnership', 'uber freight'],
    'executive-summary': ['proven scale', 'proven results', '1000 drivers', '19 markets', 'logistics solutions'],
    'company-evolution': ['revenue growth', 'evolution', '12 years', 'timeline', 'expansion'],
    'service-divisions': ['automotive transport', 'courier', 'last mile', 'medical logistics'],
    'performance-metrics': ['100% on-time', '99.9% damage-free', 'safety record', 'performance'],
    'case-study-instacart': ['instacart', 'gig economy', 'grocery delivery', 'zero delays'],
    'case-study-tesla': ['tesla', 'automotive', 'electric vehicles', 'premium transport'],
    'case-study-medical': ['medical', 'healthcare', 'zero incidents', 'temperature controlled'],
    'case-study-bmw': ['bmw', 'luxury vehicles', 'white glove service', 'premium'],
    'driver-excellence': ['driver training', 'excellence', 'certification', 'background checks'],
    'technology-integration': ['API integration', 'real-time tracking', 'technology stack'],
    'client-portfolio': ['partnerships', 'enterprise clients', 'portfolio'],
    'rapid-deployment': ['deployment', 'scaling', 'rapid expansion'],
    'geographic-coverage': ['coverage map', 'markets', 'locations', 'geographic'],
    'partnership-proposal': ['partnership', 'proposal', 'strategic alliance', 'mutual benefit'],
    'competitive-advantage': ['competitive', 'advantage', 'differentiators', 'unique value'],
    'service-integration': ['integration', 'workflow', 'seamless', 'API'],
    'roi-projection': ['ROI', 'return on investment', 'financial projections', 'cost savings'],
    'next-steps': ['next steps', 'implementation', 'timeline', 'action plan']
  }), []);

  // Search functionality
  const performSearch = useCallback((query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    const results: string[] = [];
    const lowerQuery = query.toLowerCase();
    
    // Search through slide content
    Object.entries(slideContent).forEach(([slideId, content]) => {
      const hasMatch = content.some(term => 
        term.toLowerCase().includes(lowerQuery) ||
        lowerQuery.includes(term.toLowerCase())
      );
      
      if (hasMatch) {
        results.push(slideId);
      }
    });
    
    // Search through slide names
    const slideNames = {
      'agenda-overview': 'Agenda & Overview',
      'executive-summary': 'Executive Summary',
      'company-evolution': 'Company Evolution',
      'service-divisions': 'Service Divisions',
      'performance-metrics': 'Performance Metrics',
      'case-study-instacart': 'Case Study: Instacart',
      'case-study-tesla': 'Case Study: Tesla',
      'case-study-medical': 'Case Study: Medical',
      'case-study-bmw': 'Case Study: BMW',
      'driver-excellence': 'Driver Excellence',
      'technology-integration': 'Technology Integration',
      'client-portfolio': 'Client Portfolio',
      'rapid-deployment': 'Rapid Deployment',
      'geographic-coverage': 'Geographic Coverage',
      'partnership-proposal': 'Partnership Proposal',
      'competitive-advantage': 'Competitive Advantage',
      'service-integration': 'Service Integration',
      'roi-projection': 'ROI Projection',
      'next-steps': 'Next Steps'
    };
    
    Object.entries(slideNames).forEach(([slideId, name]) => {
      if (name.toLowerCase().includes(lowerQuery) && !results.includes(slideId)) {
        results.push(slideId);
      }
    });
    
    setSearchResults(results);
  }, [slideContent]);

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    performSearch(query);
    
    // Track search query
    if (query.trim() && query.length > 2) {
      setAnalytics(prev => ({
        ...prev,
        searchQueries: [...prev.searchQueries, query.trim()]
      }));
    }
  };

  const trackTimeOnSlide = useCallback((slideId: string, timeSpent: number) => {
    setAnalytics(prev => ({
      ...prev,
      timeOnSlide: {
        ...prev.timeOnSlide,
        [slideId]: (prev.timeOnSlide[slideId] || 0) + timeSpent
      }
    }));
  }, []);

  const generateAnalyticsReport = useCallback(() => {
    const totalViews = Object.values(analytics.slideViews).reduce((sum, views) => sum + views, 0);
    const totalTimeSpent = Object.values(analytics.timeOnSlide).reduce((sum, time) => sum + time, 0);
    const sessionDuration = (new Date().getTime() - analytics.sessionStartTime.getTime()) / 1000;
    
    const report = {
      sessionSummary: {
        sessionDuration: Math.round(sessionDuration),
        totalSlideViews: totalViews,
        totalTimeSpent: Math.round(totalTimeSpent),
        navigationActions: analytics.navigationActions,
        keyboardShortcuts: analytics.keyboardShortcuts,
        touchGestures: analytics.touchGestures,
        searchQueries: analytics.searchQueries.length
      },
      slideAnalytics: Object.entries(analytics.slideViews).map(([slideId, views]) => ({
        slideId,
        views,
        timeSpent: Math.round(analytics.timeOnSlide[slideId] || 0),
        averageTime: Math.round((analytics.timeOnSlide[slideId] || 0) / views)
      })).sort((a, b) => b.views - a.views),
      searchAnalytics: {
        queries: analytics.searchQueries,
        uniqueQueries: [...new Set(analytics.searchQueries)].length
      }
    };
    
    return report;
  }, [analytics]);

  const struggleMetrics = [
    { label: 'Companies that fail', value: '73%', description: 'Within first 2 years of expansion' },
    { label: 'Average build time', value: '18mo', description: 'To establish reliable network' },
    { label: 'Infrastructure cost', value: '$2M+', description: 'Minimum viable network investment' },
    { label: 'Market share lost', value: '45%', description: 'While building internal capabilities' }
  ];

  const partnerships = [
    { name: 'Instacart', markets: 6, achievement: '100% on-time delivery' },
    { name: 'Tesla', category: 'Automotive', achievement: '99.9% damage-free record' },
    { name: 'BMW', category: 'Automotive', achievement: 'White-glove service' },
    { name: 'SDSRX Medical', category: 'Healthcare', achievement: '18+ months zero incidents' }
  ];

  const speakerNotes: { [key: string]: string[] } = {
    'agenda-overview': [
      'Welcome - set professional tone from the start',
      'Agenda shows comprehensive preparation and respect for time',
      'Emphasize this is about strategic partnership, not just vendor relationship',
      'Preview key value propositions that will be detailed in presentation'
    ],
    'executive-summary': [
      'Open with confidence - emphasize our proven track record',
      'Highlight 1,000+ drivers as key differentiator',
      '19 markets shows we understand scale Uber needs',
      'Focus on reliability metrics - this is what matters to Uber'
    ],
    'company-evolution': [
      'Show growth trajectory - we\'ve been building this for 12 years',
      'Revenue growth demonstrates business viability',
      'Driver network expansion shows operational capability',
      'Emphasize organic growth vs acquisition-based expansion'
    ],
    'performance-metrics': [
      'Lead with concrete numbers - 100% on-time delivery',
      'Safety record is crucial for partnership',
      '$50M in value delivered without major incidents',
      'These metrics directly address Uber\'s KPIs'
    ],
    'case-study-instacart': [
      'This is our strongest use case - similar to Uber model',
      'Emphasize gig economy compatibility',
      '6 markets proves we can scale quickly',
      'Zero delays shows operational excellence'
    ],
    'partnership-proposal': [
      'This is the key slide - pause for questions',
      'Emphasize mutual benefit, not just what we need',
      'Strategic fit with Uber\'s growth plans',
      'Ready to start pilot program immediately'
    ],
    'next-steps': [
      'Clear call to action - request pilot program',
      'Specific timeline shows we\'re serious',
      'Leave contact information and follow-up plan',
      'End with confidence in partnership success'
    ]
  };

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

      <div className={`min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 ${isFullscreen ? 'fullscreen-mode' : ''}`}>
        <style jsx>{`
          .slide-container {
            position: relative;
            overflow: hidden;
          }
          
          .slide-transition {
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .slide-left {
            animation: slideLeft 0.3s ease-out;
          }
          
          .slide-right {
            animation: slideRight 0.3s ease-out;
          }
          
          .fade {
            animation: slideFade 0.3s ease-out;
          }
          
          @keyframes slideLeft {
            0% { 
              transform: translateX(100%); 
              opacity: 0;
            }
            100% { 
              transform: translateX(0); 
              opacity: 1;
            }
          }
          
          @keyframes slideRight {
            0% { 
              transform: translateX(-100%); 
              opacity: 0;
            }
            100% { 
              transform: translateX(0); 
              opacity: 1;
            }
          }
          
          @keyframes slideFade {
            0% { 
              opacity: 0; 
              transform: translateY(20px) scale(0.98);
            }
            100% { 
              opacity: 1; 
              transform: translateY(0) scale(1);
            }
          }
          
          .thumbnail-nav {
            transition: transform 0.3s ease-out, opacity 0.3s ease-out;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          
          .thumbnail-item {
            transition: all 0.2s ease;
            cursor: pointer;
          }
          
          .thumbnail-item:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          }
          
          .thumbnail-item.active {
            transform: scale(1.02);
            box-shadow: 0 0 0 2px #276EF1;
          }
          
          .fullscreen-mode {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 9999;
            background: linear-gradient(135deg, rgb(248, 250, 252) 0%, rgb(219, 234, 254) 100%);
          }
          
          .dark .fullscreen-mode {
            background: linear-gradient(135deg, rgb(17, 24, 39) 0%, rgb(31, 41, 55) 100%);
          }
          
          .pulse-indicator {
            animation: pulse 2s infinite;
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          
          .slide-progress {
            animation: progressSlide 0.3s ease-out;
          }
          
          @keyframes progressSlide {
            0% { width: 0%; }
            100% { width: var(--progress-width); }
          }
          
          /* Mobile Responsive Styles */
          @media (max-width: 768px) {
            .thumbnail-nav {
              width: 100vw;
              height: 50vh;
              top: auto;
              bottom: 0;
              left: 0;
              right: 0;
              border-r: none;
              border-top: 1px solid #e5e7eb;
            }
            
            .mobile-thumbnail-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
              gap: 0.5rem;
              max-height: 40vh;
              overflow-y: auto;
            }
            
            .stat-card-mobile {
              padding: 1rem;
            }
            
            .stat-card-mobile .text-4xl {
              font-size: 2rem;
            }
            
            .chart-container-mobile {
              height: 200px !important;
            }
            
            .mobile-header-compact {
              padding: 0.5rem 0;
            }
            
            .mobile-progress-bar {
              height: 2px;
            }
          }
          
          /* Touch-friendly styles */
          @media (max-width: 768px) {
            .touch-button {
              min-height: 44px;
              min-width: 44px;
              padding: 0.75rem;
            }
            
            .swipe-indicator {
              position: fixed;
              bottom: 20px;
              left: 50%;
              transform: translateX(-50%);
              background: rgba(0, 0, 0, 0.7);
              color: white;
              padding: 0.5rem 1rem;
              border-radius: 20px;
              font-size: 0.75rem;
              z-index: 100;
              animation: fadeInOut 3s ease-in-out;
            }
            
            @keyframes fadeInOut {
              0%, 100% { opacity: 0; }
              50% { opacity: 1; }
            }
          }

          /* Print Styles */
          @media print {
            .no-print {
              display: none !important;
            }
            
            .print-slide {
              page-break-after: always;
              width: 100vw;
              height: 100vh;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              padding: 2rem;
            }
            
            .print-slide:last-child {
              page-break-after: avoid;
            }
            
            * {
              -webkit-print-color-adjust: exact;
              color-adjust: exact;
              print-color-adjust: exact;
            }
            
            body {
              background: white !important;
            }
          }
        `}</style>

        {/* Mobile Swipe Indicator */}
        {showSwipeIndicator && isMobile && (
          <div className="swipe-indicator no-print">
            ← Swipe left/right to navigate slides →
          </div>
        )}

        {/* Thumbnail Navigation Sidebar */}
        {showThumbnails && (
          <div className={`fixed z-40 thumbnail-nav bg-white/95 dark:bg-gray-900/95 shadow-xl border-gray-200 dark:border-gray-700 overflow-y-auto no-print ${
            isMobile 
              ? 'left-0 right-0 bottom-0 h-1/2 border-t' 
              : 'left-0 top-16 bottom-0 w-80 border-r'
          }`}>
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                  <span className="mr-2">📋</span>
                  Slide Navigation
                </h3>
                {isMobile && (
                  <button
                    onClick={() => setShowThumbnails(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    ✕
                  </button>
                )}
              </div>
              <div className={isMobile ? "mobile-thumbnail-grid" : "space-y-2"}>
                {tabs.map((tab, index) => {
                  const slideNames = {
                    'agenda-overview': 'Agenda & Overview',
                    'executive-summary': 'Executive Summary',
                    'company-evolution': 'Company Evolution',
                    'service-divisions': 'Service Divisions',
                    'performance-metrics': 'Performance Metrics',
                    'case-study-instacart': 'Case Study: Instacart',
                    'case-study-tesla': 'Case Study: Tesla',
                    'case-study-medical': 'Case Study: Medical',
                    'case-study-bmw': 'Case Study: BMW',
                    'driver-excellence': 'Driver Excellence',
                    'technology-integration': 'Technology Integration',
                    'client-portfolio': 'Client Portfolio',
                    'rapid-deployment': 'Rapid Deployment',
                    'geographic-coverage': 'Geographic Coverage',
                    'partnership-proposal': 'Partnership Proposal',
                    'competitive-advantage': 'Competitive Advantage',
                    'service-integration': 'Service Integration',
                    'roi-projection': 'ROI Projection',
                    'next-steps': 'Next Steps'
                  };
                  
                  return (
                    <div
                      key={tab}
                      onClick={() => goToSlide(tab)}
                      className={`thumbnail-item p-3 rounded-lg border ${
                        activeTab === tab 
                          ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 active' 
                          : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          activeTab === tab 
                            ? 'bg-blue-600 text-white dark:text-white' 
                            : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className={`font-medium text-sm ${
                            activeTab === tab 
                              ? 'text-blue-700 dark:text-blue-300' 
                              : 'text-gray-700 dark:text-gray-200'
                          }`}>
                            {slideNames[tab as keyof typeof slideNames] || tab}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Fullscreen Presentation Controls */}
        {isFullscreen && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-black/80 dark:bg-gray-900/90 backdrop-blur-lg rounded-full px-6 py-3 border border-white/20 dark:border-gray-600/30 no-print">
            <div className="flex items-center space-x-4 text-white dark:text-white dark:text-gray-200">
              <button
                onClick={() => navigateTab('prev')}
                className="p-2 hover:bg-white/20 rounded-full transition-all"
                title="Previous slide"
              >
                ←
              </button>
              
              <div className="text-sm font-medium">
                {tabs.indexOf(activeTab) + 1} / {tabs.length}
              </div>
              
              <button
                onClick={() => navigateTab('next')}
                className="p-2 hover:bg-white/20 rounded-full transition-all"
                title="Next slide"
              >
                →
              </button>
              
              <div className="w-px h-6 bg-white/30"></div>
              
              <button
                onClick={() => setShowThumbnails(!showThumbnails)}
                className={`p-2 rounded-full transition-all ${showThumbnails ? 'bg-blue-500/30' : 'hover:bg-white/20'}`}
                title="Toggle thumbnails"
              >
                ⊞
              </button>
              
              <button
                onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
                className={`p-2 rounded-full transition-all ${showSpeakerNotes ? 'bg-yellow-500/30' : 'hover:bg-white/20'}`}
                title="Toggle speaker notes (N)"
              >
                📝
              </button>
              
              <button
                onClick={() => setShowSearch(!showSearch)}
                className={`p-2 rounded-full transition-all ${showSearch ? 'bg-green-500/30' : 'hover:bg-white/20'}`}
                title="Search slides (S)"
              >
                🔍
              </button>
              
              <button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className={`p-2 rounded-full transition-all ${showAnalytics ? 'bg-purple-500/30' : 'hover:bg-white/20'}`}
                title="View analytics"
              >
                📊
              </button>
              
              <button
                onClick={toggleFullscreen}
                className="p-2 hover:bg-white/20 rounded-full transition-all"
                title="Exit fullscreen (Esc)"
              >
                ⛶
              </button>
            </div>
          </div>
        )}

        {/* Enhanced Header with Presentation Controls */}
        <div className={`fixed top-0 left-0 right-0 z-50 bg-black/90 dark:bg-gray-900/95 backdrop-blur-md border-b border-white/20 dark:border-gray-700/30 no-print ${isFullscreen ? 'hidden' : ''}`}>
          <Container>
            <div className="flex justify-between items-center py-3">
              {/* Left Controls */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#276EF1] rounded-lg flex items-center justify-center">
                    <span className="text-white dark:text-white dark:text-white dark:text-white font-bold text-sm">DN</span>
                  </div>
                  <div className="text-white dark:text-white dark:text-gray-50">
                    <div className="text-sm font-bold">Driver Network Inc.</div>
                    <div className="text-xs text-gray-300 dark:text-gray-400">Partnership Proposal</div>
                  </div>
                </div>
                
                <div className="flex items-center bg-white/10 dark:bg-gray-700/30 rounded-lg p-1">
                  <button
                    onClick={() => navigateTab('prev')}
                    className="p-2 text-white dark:text-white dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-600/50 rounded transition-all"
                    title="Previous slide (←)"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => navigateTab('next')}
                    className="p-2 text-white dark:text-white dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-600/50 rounded transition-all"
                    title="Next slide (→)"
                  >
                    →
                  </button>
                </div>
              </div>
              
              {/* Center - Slide Progress */}
              <div className="flex-1 max-w-lg mx-8">
                <div className="text-center mb-2">
                  <div className="flex items-center justify-center space-x-4 text-sm text-white dark:text-white dark:text-gray-200">
                    <span>Slide {tabs.indexOf(activeTab) + 1} of {tabs.length}</span>
                    {presentationStartTime && (
                      <div className="flex items-center space-x-1">
                        <span>⏱</span>
                        <span>{formatTime(slideTimer)}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-white/20 dark:bg-gray-700/50 rounded-full h-1.5">
                  <div 
                    className="bg-[#276EF1] h-1.5 rounded-full transition-all duration-500 ease-out slide-progress"
                    style={{ 
                      width: `${((tabs.indexOf(activeTab) + 1) / tabs.length) * 100}%`,
                      '--progress-width': `${((tabs.indexOf(activeTab) + 1) / tabs.length) * 100}%`
                    } as React.CSSProperties}
                  />
                </div>
                
                {/* Slide Indicators */}
                <div className="flex justify-center space-x-1 mt-2">
                  {tabs.map((tab, index) => (
                    <button
                      key={tab}
                      onClick={() => goToSlide(tab)}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 hover:scale-150 ${
                        activeTab === tab 
                          ? 'bg-[#276EF1] w-4 pulse-indicator' 
                          : index <= tabs.indexOf(activeTab)
                            ? 'bg-white/60 dark:bg-gray-400' 
                            : 'bg-white/30 dark:bg-gray-600'
                      }`}
                      title={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Right Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowThumbnails(!showThumbnails)}
                  className={`p-2 rounded transition-all ${showThumbnails 
                    ? 'bg-blue-500/20 text-blue-300' 
                    : 'text-white dark:text-white dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-600/50'}`}
                  title="Toggle thumbnails (T)"
                >
                  ⊞
                </button>
                
                <button
                  onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
                  className={`p-2 rounded transition-all ${showSpeakerNotes 
                    ? 'bg-yellow-500/20 text-yellow-300' 
                    : 'text-white dark:text-white dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-600/50'}`}
                  title="Toggle speaker notes (N)"
                >
                  📝
                </button>
                
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className={`p-2 rounded transition-all ${showSearch 
                    ? 'bg-green-500/20 text-green-300' 
                    : 'text-white dark:text-white dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-600/50'}`}
                  title="Search slides (S)"
                >
                  🔍
                </button>
                
                <button
                  onClick={() => setShowAnalytics(!showAnalytics)}
                  className={`p-2 rounded transition-all ${showAnalytics 
                    ? 'bg-purple-500/20 text-purple-300' 
                    : 'text-white dark:text-white dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-600/50'}`}
                  title="View analytics"
                >
                  📊
                </button>
                
                <button
                  onClick={toggleFullscreen}
                  className={`p-2 rounded transition-all ${isFullscreen 
                    ? 'bg-green-500/20 text-green-300' 
                    : 'text-white dark:text-white dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-600/50'}`}
                  title="Toggle fullscreen (F11)"
                >
                  ⛶
                </button>
                
                <div className="relative group">
                  <button
                    className="px-3 py-1.5 text-xs bg-gray-600 dark:bg-gray-700 text-white dark:text-white rounded-lg font-semibold hover:bg-gray-700 dark:hover:bg-gray-600 transition-all flex items-center"
                    title="Export options"
                  >
                    {isExporting ? '⏳' : '📤'} Export
                  </button>
                  <div className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="p-1">
                      <button
                        onClick={printPresentation}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center"
                        disabled={isExporting}
                      >
                        🖨️ Print
                      </button>
                      <button
                        onClick={exportToPDF}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center"
                        disabled={isExporting}
                      >
                        📄 PDF
                      </button>
                      <button
                        onClick={exportToImages}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center"
                        disabled={isExporting}
                      >
                        🖼️ Images
                      </button>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={startPresentation}
                  className="px-3 py-1.5 text-xs bg-gradient-to-r from-[#276EF1] to-blue-600 text-white dark:text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                  title="Start presentation"
                >
                  ▶ Start
                </button>
              </div>
            </div>
          </Container>
        </div>

        {/* Search Panel */}
        {showSearch && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-xl min-w-96 max-w-2xl no-print">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                  <span className="mr-2">🔍</span>
                  Search Slides
                </h3>
                <button
                  onClick={() => setShowSearch(false)}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search slides by content, keywords, or slide names..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  autoFocus
                />
              </div>
              
              {searchQuery && (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}:
                      </div>
                      {searchResults.map((slideId) => {
                        const slideNames = {
                          'agenda-overview': 'Agenda & Overview',
                          'executive-summary': 'Executive Summary',
                          'company-evolution': 'Company Evolution',
                          'service-divisions': 'Service Divisions',
                          'performance-metrics': 'Performance Metrics',
                          'case-study-instacart': 'Case Study: Instacart',
                          'case-study-tesla': 'Case Study: Tesla',
                          'case-study-medical': 'Case Study: Medical',
                          'case-study-bmw': 'Case Study: BMW',
                          'driver-excellence': 'Driver Excellence',
                          'technology-integration': 'Technology Integration',
                          'client-portfolio': 'Client Portfolio',
                          'rapid-deployment': 'Rapid Deployment',
                          'geographic-coverage': 'Geographic Coverage',
                          'partnership-proposal': 'Partnership Proposal',
                          'competitive-advantage': 'Competitive Advantage',
                          'service-integration': 'Service Integration',
                          'roi-projection': 'ROI Projection',
                          'next-steps': 'Next Steps'
                        };
                        
                        return (
                          <div
                            key={slideId}
                            onClick={() => {
                              goToSlide(slideId);
                              setShowSearch(false);
                            }}
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                                activeTab === slideId 
                                  ? 'bg-blue-600 text-white dark:text-white' 
                                  : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                              }`}>
                                {tabs.indexOf(slideId) + 1}
                              </div>
                              <div>
                                <div className="font-medium text-gray-900 dark:text-gray-100">
                                  {slideNames[slideId as keyof typeof slideNames] || slideId}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {slideContent[slideId]?.slice(0, 3).join(', ') || 'No keywords'}
                                </div>
                              </div>
                            </div>
                            {activeTab === slideId && (
                              <span className="text-blue-600 dark:text-blue-400 text-sm">Current</span>
                            )}
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <div className="text-4xl mb-2">🔍</div>
                      <div>No slides found matching "{searchQuery}"</div>
                      <div className="text-sm mt-1">Try searching for keywords like "performance", "instacart", or "partnership"</div>
                    </div>
                  )}
                </div>
              )}
              
              {!searchQuery && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <div className="text-4xl mb-2">🔍</div>
                  <div>Start typing to search through all slides</div>
                  <div className="text-sm mt-1">Search by keywords, slide names, or content topics</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Speaker Notes Panel */}
        {showSpeakerNotes && (
          <div className="fixed bottom-0 left-0 right-0 z-30 bg-yellow-50 dark:bg-yellow-900/20 border-t border-yellow-200 dark:border-yellow-700 max-h-40 overflow-y-auto no-print">
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-yellow-800 dark:text-yellow-200 flex items-center">
                  <span className="mr-2">📝</span>
                  Speaker Notes - Slide {tabs.indexOf(activeTab) + 1}
                </h3>
                <button
                  onClick={() => setShowSpeakerNotes(false)}
                  className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-200 transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-1">
                {(speakerNotes[activeTab] || ['No speaker notes for this slide']).map((note, index) => (
                  <div key={index} className="flex items-start space-x-2 text-sm text-yellow-800 dark:text-yellow-200">
                    <span className="w-4 h-4 rounded-full bg-yellow-200 dark:bg-yellow-700 flex items-center justify-center text-xs font-bold mt-0.5">
                      {index + 1}
                    </span>
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Content with Slide Transitions */}
        <main 
          className={`${isFullscreen ? 'pt-8 pb-16' : 'pt-20 pb-8'} ${showSpeakerNotes && !isMobile ? 'pb-48' : showSpeakerNotes ? 'pb-32' : ''} ${showThumbnails && isMobile ? 'pb-64' : ''} slide-container ${slideTransition} ${showThumbnails && !isFullscreen && !isMobile ? 'ml-80' : ''} transition-all duration-300`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Container>

            {activeTab === 'agenda-overview' && (
              <section className="min-h-screen flex flex-col justify-center space-y-24">
                {/* Hero Section */}
                <div className="text-center space-y-8">
                  <div className="space-y-6">
                    <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white dark:text-gray-50 rounded-full font-semibold text-lg">
                      Strategic Partnership Opportunity
                    </div>
                    <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent leading-tight">
                      The Last Mile
                      <br />
                      <span className="text-blue-600 dark:text-blue-400">Solved</span>
                    </h1>
                    <p className="text-3xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto font-light leading-relaxed">
                      How Driver Network Inc. delivers what others promise
                      <br />
                      <strong className="text-gray-900 dark:text-gray-100">1,000+ drivers. 19 markets. Zero excuses.</strong>
                    </p>
                  </div>
                  
                  {/* Visual Impact Stats */}
                  <div className="flex justify-center items-center space-x-16 mt-16">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-2">100%</div>
                      <div className="text-xl text-gray-600 dark:text-gray-300">On-time delivery</div>
                    </div>
                    <div className="text-center">
                      <div className="text-6xl font-bold text-green-600 dark:text-green-400 mb-2">$50M+</div>
                      <div className="text-xl text-gray-600 dark:text-gray-300">Value delivered</div>
                    </div>
                    <div className="text-center">
                      <div className="text-6xl font-bold text-purple-600 dark:text-purple-400 mb-2">0</div>
                      <div className="text-xl text-gray-600 dark:text-gray-300">Major incidents</div>
                    </div>
                  </div>
                </div>
                
                {/* Problem Preview */}
                <div className="backdrop-blur-lg bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 p-16 rounded-3xl border border-red-200/50 dark:border-red-700/50 shadow-2xl">
                  <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-red-800 dark:text-red-200 mb-6">
                      The $2.8 Trillion Problem
                    </h2>
                    <p className="text-xl text-red-600 dark:text-red-300 max-w-3xl mx-auto">
                      Every day, freight companies lose millions because they can't deliver what customers expect
                    </p>
                  </div>
                  
                  {/* Cost of Inaction Visualization */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center p-8 bg-white/80 dark:bg-gray-800/80 rounded-2xl border border-red-200 dark:border-red-700">
                      <div className="text-5xl font-bold text-red-600 dark:text-red-400 mb-4">73%</div>
                      <div className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">Fail Within 2 Years</div>
                      <div className="text-red-600 dark:text-red-300">Companies attempting to build logistics networks</div>
                    </div>
                    
                    <div className="text-center p-8 bg-white/80 dark:bg-gray-800/80 rounded-2xl border border-red-200 dark:border-red-700">
                      <div className="text-5xl font-bold text-red-600 dark:text-red-400 mb-4">18mo</div>
                      <div className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">Average Build Time</div>
                      <div className="text-red-600 dark:text-red-300">While competitors capture market share</div>
                    </div>
                    
                    <div className="text-center p-8 bg-white/80 dark:bg-gray-800/80 rounded-2xl border border-red-200 dark:border-red-700">
                      <div className="text-5xl font-bold text-red-600 dark:text-red-400 mb-4">$2M+</div>
                      <div className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">Minimum Investment</div>
                      <div className="text-red-600 dark:text-red-300">Before seeing any meaningful results</div>
                    </div>
                  </div>
                  
                  
                  {/* Call to Action */}
                  <div className="text-center mt-16 pt-8 border-t border-red-200 dark:border-red-700">
                    <p className="text-2xl font-bold text-red-800 dark:text-red-200 mb-6">
                      But there's a different path...
                    </p>
                    <p className="text-lg text-red-600 dark:text-red-300 mb-8">
                      One that doesn't require years of building, millions in investment, or prayers that it works
                    </p>
                    
                    <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white dark:text-gray-50 px-8 py-4 rounded-full font-semibold text-xl">
                      <span>See the solution</span>
                      <span className="text-2xl">→</span>
                    </div>
                  </div>
                </div>
                
                {/* Navigation Hint */}
                <div className="text-center space-y-4">
                  <p className="text-gray-500 dark:text-gray-400">Navigate with keyboard arrows, space, or swipe</p>
                  <div className="flex justify-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'executive-summary' && (
              <section className="min-h-screen flex flex-col justify-center space-y-20">
                {/* Problem Statement Hero */}
                <div className="text-center space-y-12">
                  <div className="space-y-6">
                    <div className="inline-block px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-700 dark:to-orange-700 text-white dark:text-gray-50 rounded-full font-semibold text-lg">
                      The Brutal Reality
                    </div>
                    <h1 className="text-7xl md:text-8xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                      Everyone Wants
                      <br />
                      <span className="text-red-600 dark:text-red-400">Everything</span>
                      <br />
                      <span className="text-gray-600 dark:text-gray-400 text-5xl">Yesterday</span>
                    </h1>
                    <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto font-light leading-relaxed">
                      Customers demand same-day delivery, zero damage, perfect tracking, 
                      and prices that make no economic sense
                      <br />
                      <strong className="text-red-600 dark:text-red-400">Welcome to modern logistics</strong>
                    </p>
                  </div>
                  
                  {/* Interactive Pain Point Calculator */}
                  <div className="bg-white dark:bg-gray-800 p-12 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
                      Calculate Your Reality Check
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                      <div className="space-y-4">
                        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">Customer Expectations</div>
                        <div className="text-6xl font-bold text-blue-600 dark:text-blue-400">↑ 400%</div>
                        <div className="text-gray-600 dark:text-gray-300">Since 2020</div>
                      </div>
                      <div className="space-y-4">
                        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">Infrastructure Costs</div>
                        <div className="text-6xl font-bold text-red-600 dark:text-red-400">↑ 250%</div>
                        <div className="text-gray-600 dark:text-gray-300">Same period</div>
                      </div>
                      <div className="space-y-4">
                        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">Your Profit Margin</div>
                        <div className="text-6xl font-bold text-orange-600 dark:text-orange-400">↓ 60%</div>
                        <div className="text-gray-600 dark:text-gray-300">If you're lucky</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* The Math Doesn't Work */}
                <div className="backdrop-blur-lg bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 p-16 rounded-3xl border border-red-200/50 dark:border-red-700/50 shadow-2xl">
                  <div className="text-center mb-12">
                    <h2 className="text-5xl font-bold text-red-800 dark:text-red-200 mb-6">
                      The Math Doesn't Work
                    </h2>
                    <p className="text-xl text-red-600 dark:text-red-300 max-w-3xl mx-auto">
                      Here's what happens when companies try to solve this themselves
                    </p>
                  </div>
                  
                  {/* Failure Metrics with Visual Impact */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                      { 
                        label: 'Companies That Fail', 
                        value: '73%', 
                        description: 'Within first 2 years of expansion',
                        icon: '💀',
                        color: 'red'
                      },
                      { 
                        label: 'Average Build Time', 
                        value: '18mo', 
                        description: 'To establish reliable network',
                        icon: '⏱️',
                        color: 'orange'
                      },
                      { 
                        label: 'Infrastructure Cost', 
                        value: '$2M+', 
                        description: 'Minimum viable network investment',
                        icon: '💸',
                        color: 'yellow'
                      },
                      { 
                        label: 'Market Share Lost', 
                        value: '45%', 
                        description: 'While building internal capabilities',
                        icon: '📉',
                        color: 'red'
                      }
                    ].map((metric, index) => (
                      <div 
                        key={index} 
                        className="group text-center bg-white/90 dark:bg-gray-800/90 p-8 rounded-2xl border border-red-200 dark:border-red-700 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                      >
                        <div className="text-6xl mb-4">{metric.icon}</div>
                        <div className="text-4xl font-bold text-red-600 dark:text-red-400 mb-3">
                          {metric.value}
                        </div>
                        <div className="font-bold mb-2 text-lg text-gray-800 dark:text-gray-200">{metric.label}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{metric.description}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* The Bottom Line */}
                  <div className="text-center mt-16 pt-12 border-t border-red-200 dark:border-red-700">
                    <h3 className="text-4xl font-bold text-red-800 dark:text-red-200 mb-6">
                      The Bottom Line
                    </h3>
                    <p className="text-2xl text-red-600 dark:text-red-300 max-w-4xl mx-auto font-light leading-relaxed">
                      Building a logistics network from scratch is like 
                      <strong className="font-bold"> reinventing the wheel </strong>
                      while your competitors are driving Formula 1 cars
                    </p>
                    
                    <div className="mt-12 inline-flex items-center space-x-4 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-700 text-white dark:text-gray-50 px-8 py-4 rounded-full font-semibold text-xl">
                      <span>But what if there was another way?</span>
                      <span className="text-2xl">🤔</span>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'company-evolution' && (
              <section className="min-h-screen flex flex-col justify-center space-y-20">
                {/* Solution Hero */}
                <div className="text-center space-y-12">
                  <div className="space-y-6">
                    <div className="inline-block px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-700 text-white dark:text-gray-50 rounded-full font-semibold text-lg">
                      The Solution Already Exists
                    </div>
                    <h1 className="text-7xl md:text-8xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                      We Built
                      <br />
                      <span className="text-green-600 dark:text-green-400">What You Need</span>
                      <br />
                      <span className="text-gray-600 dark:text-gray-400 text-5xl">12 Years Ago</span>
                    </h1>
                    <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto font-light leading-relaxed">
                      While others struggle to build logistics networks, we perfected one
                      <br />
                      <strong className="text-green-600 dark:text-green-400">1,000+ drivers. 19 markets. Battle-tested and ready.</strong>
                    </p>
                  </div>
                </div>
                
                {/* Interactive Growth Visualization */}
                <div className="bg-white dark:bg-gray-800 p-16 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
                  <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                      Growth That Compounds
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                      12 years of relentless execution, not promises
                    </p>
                  </div>
                  
                  {/* Growth Metrics Visual */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    <div className="text-center space-y-4">
                      <div className="text-8xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                        85x
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">Revenue Growth</div>
                      <div className="text-gray-600 dark:text-gray-300">From $100K to $8.5M annually</div>
                    </div>
                    
                    <div className="text-center space-y-4">
                      <div className="text-8xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                        200x
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">Driver Network</div>
                      <div className="text-gray-600 dark:text-gray-300">From 5 to 1,000+ drivers</div>
                    </div>
                    
                    <div className="text-center space-y-4">
                      <div className="text-8xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 dark:from-purple-400 dark:to-violet-400 bg-clip-text text-transparent">
                        19
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">Major Markets</div>
                      <div className="text-gray-600 dark:text-gray-300">Coast-to-coast coverage</div>
                    </div>
                  </div>
                  
                  {/* Visual Growth Chart */}
                  <div className="h-80 w-full mb-12">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={[
                        { year: '2012', revenue: 100, drivers: 5, markets: 1 },
                        { year: '2015', revenue: 350, drivers: 25, markets: 3 },
                        { year: '2018', revenue: 2100, drivers: 150, markets: 8 },
                        { year: '2020', revenue: 3800, drivers: 400, markets: 12 },
                        { year: '2024', revenue: 8500, drivers: 1000, markets: 19 }
                      ]}>
                        <defs>
                          <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-600" />
                        <XAxis dataKey="year" stroke="#6b7280" className="dark:stroke-gray-400" />
                        <YAxis stroke="#6b7280" className="dark:stroke-gray-400" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                            border: 'none', 
                            borderRadius: '12px',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                            backdropFilter: 'blur(10px)',
                            padding: '16px 20px'
                          }}
                          labelStyle={{ color: '#1f2937', fontWeight: 'bold', marginBottom: '8px', fontSize: '16px' }}
                          formatter={(value: number, name: string) => {
                            if (name === 'revenue') return [`$${value}K`, 'Annual Revenue'];
                            if (name === 'drivers') return [value, 'Active Drivers'];
                            if (name === 'markets') return [value, 'Major Markets'];
                            return [value, name];
                          }}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="#10B981" fillOpacity={1} fill="url(#growthGradient)" strokeWidth={4} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {/* Key Insight */}
                  <div className="text-center p-8 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-700">
                    <h3 className="text-3xl font-bold text-green-800 dark:text-green-200 mb-4">
                      The Insight That Changes Everything
                    </h3>
                    <p className="text-xl text-green-600 dark:text-green-300 max-w-3xl mx-auto">
                      Every company building from scratch makes the same mistakes we made 12 years ago. 
                      <strong className="font-bold"> You don't have to. </strong>
                      Our infrastructure, expertise, and network are available today.
                    </p>
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
                              backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                              border: 'none', 
                              borderRadius: '12px',
                              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                              backdropFilter: 'blur(10px)',
                              padding: '12px 16px'
                            }}
                            labelStyle={{ color: '#1f2937', fontWeight: 'bold', marginBottom: '8px' }}
                            formatter={(value: number, name: string) => {
                              if (name === 'revenue') return [`$${value}K`, 'Revenue'];
                              if (name === 'drivers') return [value, 'Drivers'];
                              if (name === 'locations') return [value, 'Locations'];
                              if (name === 'onTime') return [`${value}%`, 'On-Time Delivery'];
                              if (name === 'satisfaction') return [`${value}%`, 'Customer Satisfaction'];
                              if (name === 'safety') return [`${value}%`, 'Safety Score'];
                              return [value, name];
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
              <section className="min-h-screen flex flex-col justify-center space-y-20">
                {/* Proof Hero */}
                <div className="text-center space-y-12">
                  <div className="space-y-6">
                    <div className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 text-white dark:text-gray-50 rounded-full font-semibold text-lg">
                      Battle-Tested Results
                    </div>
                    <h1 className="text-7xl md:text-8xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                      Numbers
                      <br />
                      <span className="text-indigo-600 dark:text-indigo-400">Don't Lie</span>
                    </h1>
                    <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto font-light leading-relaxed">
                      When Fortune 500 companies trust us with their most critical deliveries,
                      <br />
                      <strong className="text-indigo-600 dark:text-indigo-400">the proof is in the performance</strong>
                    </p>
                  </div>
                </div>
                
                {/* Social Proof Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 text-center hover:shadow-3xl hover:-translate-y-2 transition-all duration-300">
                    <div className="text-7xl font-bold text-green-600 dark:text-green-400 mb-4">100%</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Perfect Delivery</div>
                    <div className="text-gray-600 dark:text-gray-300 mb-4">6 Markets, 18 Months</div>
                    <div className="inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full">
                      <span className="text-3xl">🥕</span>
                      <span className="text-green-800 dark:text-green-200 font-semibold">Instacart</span>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 text-center hover:shadow-3xl hover:-translate-y-2 transition-all duration-300">
                    <div className="text-7xl font-bold text-blue-600 dark:text-blue-400 mb-4">99.9%</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Damage-Free</div>
                    <div className="text-gray-600 dark:text-gray-300 mb-4">$2.5M+ Vehicles</div>
                    <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full">
                      <span className="text-3xl">⚡</span>
                      <span className="text-blue-800 dark:text-blue-200 font-semibold">Tesla</span>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 text-center hover:shadow-3xl hover:-translate-y-2 transition-all duration-300">
                    <div className="text-7xl font-bold text-purple-600 dark:text-purple-400 mb-4">24mo</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Zero Incidents</div>
                    <div className="text-gray-600 dark:text-gray-300 mb-4">Critical Medical</div>
                    <div className="inline-flex items-center space-x-2 bg-purple-100 dark:bg-purple-900/30 px-4 py-2 rounded-full">
                      <span className="text-3xl">🏥</span>
                      <span className="text-purple-800 dark:text-purple-200 font-semibold">SDSRX</span>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 text-center hover:shadow-3xl hover:-translate-y-2 transition-all duration-300">
                    <div className="text-7xl font-bold text-orange-600 dark:text-orange-400 mb-4">$50M+</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Value Delivered</div>
                    <div className="text-gray-600 dark:text-gray-300 mb-4">Premium Cargo</div>
                    <div className="inline-flex items-center space-x-2 bg-orange-100 dark:bg-orange-900/30 px-4 py-2 rounded-full">
                      <span className="text-3xl">🚗</span>
                      <span className="text-orange-800 dark:text-orange-200 font-semibold">BMW</span>
                    </div>
                  </div>
                </div>
                
                {/* Interactive Performance Calculator */}
                <div className="bg-white dark:bg-gray-800 p-16 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
                  <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                      What This Means for You
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                      Calculate your risk reduction with our proven performance
                    </p>
                  </div>
                  
                  {/* Risk vs Reward Comparison */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="space-y-6">
                      <h3 className="text-3xl font-bold text-red-600 dark:text-red-400 text-center mb-8">Build Internal Network</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                          <span className="text-red-800 dark:text-red-200 font-semibold">Time to Market</span>
                          <span className="text-red-600 dark:text-red-400 font-bold">18+ months</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                          <span className="text-red-800 dark:text-red-200 font-semibold">Success Rate</span>
                          <span className="text-red-600 dark:text-red-400 font-bold">27%</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                          <span className="text-red-800 dark:text-red-200 font-semibold">Investment Required</span>
                          <span className="text-red-600 dark:text-red-400 font-bold">$2M+</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                          <span className="text-red-800 dark:text-red-200 font-semibold">Reliability Risk</span>
                          <span className="text-red-600 dark:text-red-400 font-bold">HIGH</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <h3 className="text-3xl font-bold text-green-600 dark:text-green-400 text-center mb-8">Partner with Us</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <span className="text-green-800 dark:text-green-200 font-semibold">Time to Market</span>
                          <span className="text-green-600 dark:text-green-400 font-bold">30 days</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <span className="text-green-800 dark:text-green-200 font-semibold">Success Rate</span>
                          <span className="text-green-600 dark:text-green-400 font-bold">100%</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <span className="text-green-800 dark:text-green-200 font-semibold">Investment Required</span>
                          <span className="text-green-600 dark:text-green-400 font-bold">$0</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <span className="text-green-800 dark:text-green-200 font-semibold">Reliability Risk</span>
                          <span className="text-green-600 dark:text-green-400 font-bold">NONE</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Call to Action */}
                  <div className="text-center mt-16 pt-12 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                      The Choice Is Clear
                    </h3>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                      Why gamble with an 18-month build when you can leverage 12 years of proven infrastructure?
                    </p>
                    
                    <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 text-white dark:text-gray-50 px-10 py-6 rounded-full font-semibold text-2xl">
                      <span>Let's talk partnership</span>
                      <span className="text-3xl">🤝</span>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Case Study: Instacart */}
            {activeTab === 'case-study-instacart' && (
              <section className="space-y-12">
                <div className="backdrop-blur-lg bg-gradient-to-r from-green-800/90 to-emerald-900/90 dark:from-green-800/95 dark:to-emerald-900/95 text-white dark:text-gray-100 p-12 rounded-3xl mb-12 border border-green-300/30 dark:border-green-600/30 shadow-2xl">
                  <div className="text-center mb-12">
                    <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-green-200 to-emerald-200 bg-clip-text text-transparent">
                      🚀 THE SOLUTION IN ACTION
                    </h2>
                    <p className="text-2xl text-green-100 dark:text-green-200 max-w-5xl mx-auto font-medium">
                      When Instacart faced the same struggle, they didn't build. They partnered. 
                      <br/><span className="text-green-200 dark:text-green-300">In 30 days, not 30 months.</span>
                    </p>
                  </div>
                </div>

                <div className="backdrop-blur-lg bg-white/95 dark:bg-gray-800/95 p-10 rounded-3xl border border-white/30 dark:border-gray-600/30 shadow-2xl">
                  {/* The Solution Story */}
                  <div className="bg-gradient-to-r from-emerald-600 to-green-700 dark:from-emerald-700 dark:to-green-800 p-8 rounded-2xl text-white dark:text-gray-50 mb-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <span className="text-5xl text-white dark:text-gray-50 mr-6">⚡</span>
                        <div>
                          <h3 className="text-4xl text-white dark:text-gray-50 font-bold mb-2">The Day Everything Changed</h3>
                          <p className="text-xl text-white dark:text-white opacity-90 font-medium">E-Commerce Logistics Partnership • 6 Metropolitan Areas • $2.3M Annual Contract</p>
                        </div>
                      </div>
                      <div className="text-right text-white dark:text-white">
                        <div className="text-lg text-white dark:text-white font-bold mb-1">18-month partnership (2022-2024)</div>
                        <div className="text-sm text-white dark:text-white opacity-80">Chicago, Milwaukee, Detroit, Indianapolis, Cleveland, Columbus</div>
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
                      <div className="backdrop-blur-sm bg-[#43B02A]/20 p-6 rounded-xl">
                        <h4 className="font-bold text-2xl text-gray-800 dark:text-gray-100 mb-3 flex items-center">
                          <span className="mr-3">🎯</span>Results
                        </h4>
                        <ul className="text-gray-800 dark:text-gray-200 space-y-2">
                          {[
                            '100% on-time delivery rate across all 6 markets (industry benchmark: 87%)',
                            '$847K annual cost reduction through optimized routing and driver utilization',
                            '45% faster market penetration vs. Instacart\'s historical expansion timeline',
                            'Zero service interruptions during peak holiday seasons (Black Friday, Christmas)',
                            '4.9/5.0 customer satisfaction score (exceeding Instacart corporate average)',
                            '68,000+ successful deliveries in Year 1, 94,000+ in Year 2'
                          ].map((result, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-[#43B02A] dark:text-[#43B02A] mr-2 text-lg">•</span>
                              <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{result}</span>
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
                              <stop offset="5%" stopColor="#43B02A" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#43B02A" stopOpacity={0.1}/>
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
                
                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-8 mt-12 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => navigateTab('prev')}
                    className="flex items-center space-x-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white dark:text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <span>←</span>
                    <span>Previous</span>
                  </button>
                  
                  <div className="text-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Slide {tabs.indexOf(activeTab) + 1} of {tabs.length}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace(/-/g, ' ')}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => navigateTab('next')}
                    className="flex items-center space-x-2 px-6 py-3 bg-[#276EF1] hover:bg-[#1E5DD6] dark:bg-[#276EF1] dark:hover:bg-[#1E5DD6] text-white dark:text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <span>Next</span>
                    <span>→</span>
                  </button>
                </div>
              </section>
            )}

            {/* Case Study: Tesla */}
            {activeTab === 'case-study-tesla' && (
              <section className="space-y-12">
                <div className="backdrop-blur-lg bg-gradient-to-r from-gray-900/95 to-black/95 text-white dark:text-white dark:text-gray-100 p-12 rounded-3xl mb-12 border border-white/10 dark:border-gray-700/30 shadow-2xl">
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
                  <div className="bg-gradient-to-r from-[#E31937] to-[#CC1530] p-8 rounded-2xl text-white dark:text-white mb-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <span className="text-5xl text-white dark:text-white mr-6">⚡</span>
                        <div>
                          <h3 className="text-4xl text-white dark:text-white font-bold mb-2">Tesla: Precision Automotive Transport Excellence</h3>
                          <p className="text-xl text-white dark:text-white opacity-90 font-medium">Luxury Vehicle Transport • White-Glove Service • $1.8M Annual Contract</p>
                        </div>
                      </div>
                      <div className="text-right text-white dark:text-white">
                        <div className="text-lg text-white dark:text-white font-bold mb-1">3-year exclusive partnership (2021-2024)</div>
                        <div className="text-sm text-white dark:text-white opacity-80">Chicago hub serving 8-state distribution network</div>
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
                      <div className="backdrop-blur-sm bg-[#E31937]/20 p-6 rounded-xl">
                        <h4 className="font-bold text-2xl text-gray-800 dark:text-gray-100 mb-3 flex items-center">
                          <span className="mr-3">🎯</span>Results
                        </h4>
                        <ul className="text-gray-800 dark:text-gray-200 space-y-2">
                          {[
                            '99.97% damage-free delivery record (3 minor incidents in 12,000+ transports)',
                            '$2.1M+ in damage prevention vs. industry standard performance',
                            '100% on-schedule delivery performance over 36 months',
                            'Tesla "Preferred Partner" status achieved in Month 8',
                            'Contract renewed for additional 3 years with 40% scope expansion',
                            '12,847 vehicles transported safely with full documentation'
                          ].map((result, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-[#E31937] dark:text-[#E31937] mr-2 text-lg">•</span>
                              <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{result}</span>
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
                
                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-8 mt-12 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => navigateTab('prev')}
                    className="flex items-center space-x-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white dark:text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <span>←</span>
                    <span>Previous</span>
                  </button>
                  
                  <div className="text-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Slide {tabs.indexOf(activeTab) + 1} of {tabs.length}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace(/-/g, ' ')}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => navigateTab('next')}
                    className="flex items-center space-x-2 px-6 py-3 bg-[#276EF1] hover:bg-[#1E5DD6] dark:bg-[#276EF1] dark:hover:bg-[#1E5DD6] text-white dark:text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <span>Next</span>
                    <span>→</span>
                  </button>
                </div>
              </section>
            )}

            {/* Case Study: Medical */}
            {activeTab === 'case-study-medical' && (
              <section className="space-y-12">
                <div className="backdrop-blur-lg bg-gradient-to-r from-gray-900/95 to-black/95 text-white dark:text-white dark:text-gray-100 p-12 rounded-3xl mb-12 border border-white/10 dark:border-gray-700/30 shadow-2xl">
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
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-8 rounded-2xl text-white dark:text-white dark:text-gray-100 mb-8">
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
                <div className="backdrop-blur-lg bg-gradient-to-r from-gray-900/95 to-black/95 text-white dark:text-white dark:text-gray-100 p-12 rounded-3xl mb-12 border border-white/10 dark:border-gray-700/30 shadow-2xl">
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
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-500 p-8 rounded-2xl text-white dark:text-white dark:text-gray-100 mb-8">
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
                        <div className="text-center text-white dark:text-white dark:text-gray-100">
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
                <div className="backdrop-blur-lg bg-gradient-to-r from-gray-900/95 to-black/95 text-white dark:text-white dark:text-gray-100 p-12 rounded-3xl mb-12 border border-white/10 dark:border-gray-700/30 shadow-2xl">
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
                        <tr className="bg-gradient-to-r from-[#276EF1] to-indigo-600 text-white dark:text-white dark:text-gray-100">
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
                <div className="backdrop-blur-lg bg-gradient-to-r from-gray-900/95 to-black/95 text-white dark:text-white dark:text-gray-100 p-12 rounded-3xl mb-12 border border-white/10 dark:border-gray-700/30 shadow-2xl">
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
                    
                    <div className="text-center p-6 bg-gradient-to-r from-[#276EF1] to-indigo-600 rounded-2xl text-white dark:text-white dark:text-gray-100">
                      <h4 className="text-2xl font-bold text-gray-100 dark:text-gray-50 mb-2">Ready to Partner?</h4>
                      <p className="text-blue-100 dark:text-blue-200 mb-4">Let's transform freight delivery together</p>
                      <div className="space-y-2 text-blue-100 dark:text-blue-200">
                        <div className="font-semibold">Contact: Driver Network Inc.</div>
                        <div>info@driversnet.io</div>
                        <div>Web: driversnet.io</div>
                        <div>Serving: United States</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-8 mt-12 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => navigateTab('prev')}
                    className="flex items-center space-x-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white dark:text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <span>←</span>
                    <span>Previous</span>
                  </button>
                  
                  <div className="text-center">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Slide {tabs.indexOf(activeTab) + 1} of {tabs.length}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      End of Presentation
                    </div>
                  </div>
                  
                  <button
                    onClick={() => goToSlide('agenda-overview')}
                    className="flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white dark:text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <span>🔄</span>
                    <span>Restart</span>
                  </button>
                </div>
              </section>
            )}

          </Container>
        </main>

      </div>
    </>
  );
}