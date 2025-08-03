'use client';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartDataPoint {
  name: string;
  value: number;
  fill: string;
}

interface ChartSlideContent {
  title: string;
  chartType: string;
  data: ChartDataPoint[];
}

interface ChartSlideProps {
  content: ChartSlideContent;
}

export default function ChartSlide({ content }: ChartSlideProps) {
  if (typeof window === 'undefined') return null;
  const [hasMounted, setHasMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    setHasMounted(true);
    // Check for dark mode using CSS media query or document class
    const checkDarkMode = () => {
      if (typeof window !== 'undefined') {
        const isDark = document.documentElement.classList.contains('dark') ||
                      window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(isDark);
      }
    };
    
    checkDarkMode();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkDarkMode);
    if (typeof window !== 'undefined') {
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      });
    }
    
    return () => observer.disconnect();
  }, []);
  if (!hasMounted) return null;

  // Runtime validation for content.data
  if (!content?.data || !Array.isArray(content.data) || content.data.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-br from-[#E0EFC7]/30 to-[#FF3131]/10 dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#5B2EFF]">{content?.title || 'Chart'}</h2>
        <div className="flex flex-col items-center justify-center">
          <div className="w-[400px] h-[300px] bg-white dark:bg-gray-900 rounded-xl shadow-lg flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">No chart data available</p>
          </div>
        </div>
      </section>
    );
  }

  // Validate each data point structure
  const validData = content.data.filter((d): d is ChartDataPoint => 
    d && typeof d === 'object' && 
    typeof d.name === 'string' && 
    typeof d.value === 'number' && 
    typeof d.fill === 'string'
  );

  if (validData.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-br from-[#E0EFC7]/30 to-[#FF3131]/10 dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#5B2EFF]">{content.title}</h2>
        <div className="flex flex-col items-center justify-center">
          <div className="w-[400px] h-[300px] bg-white dark:bg-gray-900 rounded-xl shadow-lg flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Invalid chart data format</p>
          </div>
        </div>
      </section>
    );
  }

  // Prepare data for Chart.js
  const data = {
    labels: validData.map((d) => d.name),
    datasets: [
      {
        data: validData.map((d) => d.value),
        backgroundColor: validData.map((d) => d.fill),
        borderWidth: 2,
      },
    ],
  };

  // Dynamic legend color based on theme
  const legendColor = isDarkMode ? '#e5e7eb' : '#333';

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { color: legendColor, font: { size: 16 } },
      },
      tooltip: {
        callbacks: {
          label: function(context: { label: string; parsed: number }) {
            return `${context.label}: ${context.parsed}`;
          },
        },
      },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#E0EFC7]/30 to-[#FF3131]/10 dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800 text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#5B2EFF]">{content.title}</h2>
      <div className="flex flex-col items-center justify-center">
        <div className="w-[400px] h-[300px] bg-white dark:bg-gray-900 rounded-xl shadow-lg flex items-center justify-center">
          <Pie data={data} options={options} />
        </div>
      </div>
    </section>
  );
} 