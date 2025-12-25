'use client'

interface BarChartProps {
  data: { label: string; value: number; color?: string }[];
  title: string;
  className?: string;
}

export function BarChart({ data, title, className = "" }: BarChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className={`bg-white dark:bg-gray-800/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6 border border-white/20 dark:border-gray-700/50 shadow-lg ${className}`}>
      <h3 className="font-heading text-lg font-semibold text-gray-800 dark:text-white dark:text-gray-100 mb-4">{title}</h3>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="relative">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white dark:text-gray-100">{item.value.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${
                  item.color || 'bg-gradient-to-r from-[#FF3131] to-[#FF5050]'
                }`}
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface LineChartProps {
  data: { label: string; value: number }[];
  title: string;
  className?: string;
}

export function LineChart({ data, title, className = "" }: LineChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;
  
  return (
    <div className={`bg-white dark:bg-gray-800/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6 border border-white/20 dark:border-gray-700/50 shadow-lg ${className}`}>
      <h3 className="font-heading text-lg font-semibold text-gray-800 dark:text-white dark:text-gray-100 mb-4">{title}</h3>
      <div className="relative h-48">
        <svg className="w-full h-full" viewBox="0 0 400 180">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF3131" />
              <stop offset="100%" stopColor="#5B2EFF" />
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <line
              key={i}
              x1="0"
              y1={i * 45}
              x2="400"
              y2={i * 45}
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.1"
              className="text-gray-400 dark:text-gray-600"
            />
          ))}
          
          {/* Line path */}
          <path
            d={`M ${data.map((point, index) => 
              `${(index / (data.length - 1)) * 400} ${180 - ((point.value - minValue) / range) * 160}`
            ).join(' L ')}`}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="3"
            className="drop-shadow-sm"
          />
          
          {/* Data points */}
          {data.map((point, index) => (
            <circle
              key={index}
              cx={(index / (data.length - 1)) * 400}
              cy={180 - ((point.value - minValue) / range) * 160}
              r="6"
              fill="url(#lineGradient)"
              className="drop-shadow-md"
            />
          ))}
        </svg>
        
        {/* Labels */}
        <div className="flex justify-between mt-2">
          {data.map((point, index) => (
            <div key={index} className="text-center">
              <div className="text-xs text-gray-600 dark:text-gray-400">{point.label}</div>
              <div className="text-sm font-bold text-gray-900 dark:text-white dark:text-gray-100">
                ${point.value.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface PieChartProps {
  data: { label: string; value: number; color: string }[];
  title: string;
  className?: string;
}

export function PieChart({ data, title, className = "" }: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Calculate cumulative angles for each slice
  const slices = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (percentage / 100) * 360;
    const startAngle = data.slice(0, index).reduce((sum, prevItem) => {
      const prevPercentage = (prevItem.value / total) * 100;
      return sum + (prevPercentage / 100) * 360;
    }, 0);
    return { ...item, angle, startAngle };
  });

  return (
    <div className={`bg-white dark:bg-gray-800/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-6 border border-white/20 dark:border-gray-700/50 shadow-lg ${className}`}>
      <h3 className="font-heading text-lg font-semibold text-gray-800 dark:text-white dark:text-gray-100 mb-4">{title}</h3>
      <div className="flex items-center justify-center space-x-8">
        <div className="relative">
          <svg width="150" height="150" className="transform -rotate-90">
            {slices.map((slice, index) => {
              const x1 = 75 + 60 * Math.cos((slice.startAngle * Math.PI) / 180);
              const y1 = 75 + 60 * Math.sin((slice.startAngle * Math.PI) / 180);
              const x2 = 75 + 60 * Math.cos(((slice.startAngle + slice.angle) * Math.PI) / 180);
              const y2 = 75 + 60 * Math.sin(((slice.startAngle + slice.angle) * Math.PI) / 180);

              const largeArc = slice.angle > 180 ? 1 : 0;
              const pathData = `M 75 75 L ${x1} ${y1} A 60 60 0 ${largeArc} 1 ${x2} ${y2} Z`;

              return (
                <path
                  key={index}
                  d={pathData}
                  fill={slice.color}
                  className="drop-shadow-sm"
                />
              );
            })}
          </svg>
        </div>
        <div className="space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{item.label}</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white dark:text-gray-100">
                {((item.value / total) * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface ProgressRingProps {
  percentage: number;
  label: string;
  color?: string;
  size?: number;
  className?: string;
}

export function ProgressRing({ percentage, label, color = "#FF3131", size = 120, className = "" }: ProgressRingProps) {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
  
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            className="text-gray-200 dark:text-gray-700"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out drop-shadow-md"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-900 dark:text-white dark:text-gray-100">{percentage}%</span>
        </div>
      </div>
      <span className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300 text-center">{label}</span>
    </div>
  );
}