import { useMemo } from 'react';

interface DataPoint {
  date: string;
  value: number;
}

interface PerformanceChartProps {
  data: DataPoint[];
  color?: string;
  height?: number;
  showLabels?: boolean;
  formatValue?: (value: number) => string;
}

export function PerformanceChart({
  data,
  color = '#9333ea', // purple-600
  height = 200,
  showLabels = true,
  formatValue = (v) => v.toString(),
}: PerformanceChartProps) {
  const chartData = useMemo(() => {
    if (data.length === 0) return { points: '', max: 0, min: 0 };

    const values = data.map((d) => d.value);
    const max = Math.max(...values, 1);
    const min = Math.min(...values, 0);
    const range = max - min || 1;

    const padding = 40;
    const chartWidth = 100; // percentage
    const chartHeight = height - padding;

    const points = data
      .map((d, i) => {
        const x = (i / (data.length - 1 || 1)) * chartWidth;
        const y = chartHeight - ((d.value - min) / range) * chartHeight + padding / 2;
        return `${x},${y}`;
      })
      .join(' ');

    return { points, max, min, range };
  }, [data, height]);

  if (data.length === 0) {
    return (
      <div
        className="flex items-center justify-center bg-gray-50 bg-gray-800 rounded-lg"
        style={{ height }}
      >
        <p className="text-sm text-gray-500 text-gray-400">No data available</p>
      </div>
    );
  }

  return (
    <div className="relative" style={{ height }}>
      {/* Y-axis labels */}
      {showLabels && (
        <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-gray-500 text-gray-400 py-2">
          <span>{formatValue(chartData.max)}</span>
          <span>{formatValue(Math.round((chartData.max + (chartData.min || 0)) / 2))}</span>
          <span>{formatValue(chartData.min || 0)}</span>
        </div>
      )}

      {/* Chart area */}
      <div className={`${showLabels ? 'ml-12' : ''} h-full`}>
        <svg
          className="w-full h-full"
          viewBox={`0 0 100 ${height}`}
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          <line
            x1="0"
            y1={height / 4}
            x2="100"
            y2={height / 4}
            stroke="currentColor"
            strokeOpacity="0.1"
            strokeDasharray="2 2"
            className="text-gray-300 text-gray-600"
          />
          <line
            x1="0"
            y1={height / 2}
            x2="100"
            y2={height / 2}
            stroke="currentColor"
            strokeOpacity="0.1"
            strokeDasharray="2 2"
            className="text-gray-300 text-gray-600"
          />
          <line
            x1="0"
            y1={(height * 3) / 4}
            x2="100"
            y2={(height * 3) / 4}
            stroke="currentColor"
            strokeOpacity="0.1"
            strokeDasharray="2 2"
            className="text-gray-300 text-gray-600"
          />

          {/* Area fill */}
          <polygon
            points={`0,${height} ${chartData.points} 100,${height}`}
            fill={color}
            fillOpacity="0.1"
          />

          {/* Line */}
          <polyline
            points={chartData.points}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />

          {/* Data points */}
          {data.map((d, i) => {
            const x = (i / (data.length - 1 || 1)) * 100;
            const y =
              height -
              20 -
              ((d.value - (chartData.min || 0)) / (chartData.range || 1)) * (height - 40) +
              20;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="3"
                fill={color}
                className="hover:r-4 transition-all"
              />
            );
          })}
        </svg>
      </div>

      {/* X-axis labels */}
      {showLabels && data.length > 0 && (
        <div
          className={`${showLabels ? 'ml-12' : ''} flex justify-between text-xs text-gray-500 text-gray-400 mt-1`}
        >
          <span>{new Date(data[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          {data.length > 2 && (
            <span>
              {new Date(data[Math.floor(data.length / 2)].date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          )}
          <span>
            {new Date(data[data.length - 1].date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </div>
      )}
    </div>
  );
}

export default PerformanceChart;
