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

export default function ChartSlide({ content }: any) {
  if (typeof window === 'undefined') return null;
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);
  if (!hasMounted) return null;

  // Prepare data for Chart.js
  const data = {
    labels: content.data.map((d: any) => d.name),
    datasets: [
      {
        data: content.data.map((d: any) => d.value),
        backgroundColor: content.data.map((d: any) => d.fill),
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { color: '#333', font: { size: 16 } },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
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