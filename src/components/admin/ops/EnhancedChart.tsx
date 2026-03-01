'use client';

import { useState, useRef } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Download, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Purrify color palette (teal-focused)
const COLORS = {
  teal: '#1ABC9C',
  tealDark: '#0d9488',
  tealLight: '#2dd4bf',
  charcoal: '#2B2B2B',
  gray: '#6a6a6a',
  success: '#27AE60',
  warning: '#E67E22',
  error: '#ef4444',
  info: '#3b82f6'
};

const PIE_COLORS = [
  COLORS.teal,
  COLORS.tealDark,
  COLORS.success,
  COLORS.warning,
  COLORS.info,
  COLORS.tealLight
];

export type ChartType = 'line' | 'area' | 'bar' | 'pie';

interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

interface EnhancedChartProps {
  title: string;
  type: ChartType;
  data: ChartDataPoint[];
  dataKeys?: string[];
  xAxisKey?: string;
  height?: number;
  showExport?: boolean;
  showLegend?: boolean;
  onDrillDown?: (data: ChartDataPoint) => void;
}

export function EnhancedChart({
  title,
  type,
  data,
  dataKeys = ['value'],
  xAxisKey = 'name',
  height = 300,
  showExport = true,
  showLegend = true,
  onDrillDown
}: EnhancedChartProps) {
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  const handleExport = async (format: 'png' | 'csv') => {
    setExportMenuOpen(false);

    if (format === 'csv') {
      // Export as CSV
      const headers = [xAxisKey, ...dataKeys].join(',');
      const rows = data.map(item => 
        [item[xAxisKey], ...dataKeys.map(key => item[key])].join(',')
      );
      const csvContent = [headers, ...rows].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }

    if (format === 'png' && chartRef.current) {
      // Export as PNG using html2canvas-style approach
      try {
        const svg = chartRef.current.querySelector('svg');
        if (svg) {
          const svgData = new XMLSerializer().serializeToString(svg);
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const img = new Image();
          img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);
            const pngUrl = canvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = pngUrl;
            a.download = `${title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.png`;
            a.click();
          };
          img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
        }
      } catch (error) {
        console.error('Error exporting chart:', error);
      }
    }
  };

  const handleClick = (dataPoint: ChartDataPoint) => {
    if (onDrillDown) {
      onDrillDown(dataPoint);
    }
  };

  const CustomTooltip = ({ active, payload, label }: { 
    active?: boolean; 
    payload?: Array<{ value: number; name: string; color: string }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white bg-gray-800 border border-gray-200 border-gray-700 rounded-lg shadow-lg p-3">
          <p className="font-medium text-gray-900 text-gray-50 mb-1">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      onClick: (data: { activePayload?: Array<{ payload: ChartDataPoint }> }) => {
        if (data?.activePayload?.[0]?.payload) {
          handleClick(data.activePayload[0].payload);
        }
      }
    };

    switch (type) {
      case 'line':
        return (
          <LineChart data={data} {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="stroke-gray-700" />
            <XAxis 
              dataKey={xAxisKey} 
              stroke="#6b7280" 
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#6b7280" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend />}
            {dataKeys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={PIE_COLORS[index % PIE_COLORS.length]}
                strokeWidth={2}
                dot={{ fill: PIE_COLORS[index % PIE_COLORS.length], strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        );

      case 'area':
        return (
          <AreaChart data={data} {...commonProps}>
            <defs>
              {dataKeys.map((key, index) => (
                <linearGradient key={key} id={`gradient-${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={PIE_COLORS[index % PIE_COLORS.length]} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={PIE_COLORS[index % PIE_COLORS.length]} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="stroke-gray-700" />
            <XAxis 
              dataKey={xAxisKey} 
              stroke="#6b7280" 
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#6b7280" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend />}
            {dataKeys.map((key, index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={PIE_COLORS[index % PIE_COLORS.length]}
                strokeWidth={2}
                fill={`url(#gradient-${key})`}
              />
            ))}
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart data={data} {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="stroke-gray-700" />
            <XAxis 
              dataKey={xAxisKey} 
              stroke="#6b7280" 
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#6b7280" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend />}
            {dataKeys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={PIE_COLORS[index % PIE_COLORS.length]}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        );

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
              onClick={(_, index) => handleClick(data[index])}
            >
              {data.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={PIE_COLORS[index % PIE_COLORS.length]}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend />}
          </PieChart>
        );

      default:
        // Return empty line chart as fallback
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey={xAxisKey} stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
          </LineChart>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white bg-gray-800 rounded-xl border border-gray-200 border-gray-700 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 text-gray-50">{title}</h3>
        
        {showExport && (
          <div className="relative">
            <button
              onClick={() => setExportMenuOpen(!exportMenuOpen)}
              className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-600 text-gray-400 hover:text-gray-900 hover:text-gray-100 hover:bg-gray-100 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            
            <AnimatePresence>
              {exportMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 top-full mt-1 bg-white bg-gray-800 border border-gray-200 border-gray-700 rounded-lg shadow-lg py-1 z-10 min-w-[120px]"
                >
                  <button
                    onClick={() => handleExport('png')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 text-gray-300 hover:bg-gray-100 hover:bg-gray-700"
                  >
                    Export PNG
                  </button>
                  <button
                    onClick={() => handleExport('csv')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 text-gray-300 hover:bg-gray-100 hover:bg-gray-700"
                  >
                    Export CSV
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      <div ref={chartRef} style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export default EnhancedChart;
