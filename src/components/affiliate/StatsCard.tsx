import { ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  change?: number;
  changeLabel?: string;
  format?: 'number' | 'currency' | 'percentage';
  isLoading?: boolean;
  note?: string;
}

export function StatsCard({
  title,
  value,
  icon,
  change,
  changeLabel,
  format = 'number',
  isLoading = false,
  note,
}: StatsCardProps) {
  const formatValue = (val: string | number): string => {
    if (typeof val === 'string') return val;

    switch (format) {
      case 'currency':
        return `$${val.toFixed(2)}`;
      case 'percentage':
        return `${val.toFixed(1)}%`;
      default:
        return val.toLocaleString();
    }
  };

  const getTrendIcon = () => {
    if (change === undefined || change === 0) {
      return <Minus className="w-4 h-4 text-gray-400 text-gray-500" />;
    }
    if (change > 0) {
      return <TrendingUp className="w-4 h-4 text-green-500 text-green-400" />;
    }
    return <TrendingDown className="w-4 h-4 text-red-500 text-red-400" />;
  };

  const getTrendColor = () => {
    if (change === undefined || change === 0) {
      return 'text-gray-500 text-gray-400';
    }
    if (change > 0) {
      return 'text-green-600 text-green-400';
    }
    return 'text-red-600 text-red-400';
  };

  if (isLoading) {
    return (
      <div className="bg-white bg-gray-800 rounded-xl border border-gray-200 border-gray-700 p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 bg-gray-200 bg-gray-700 rounded w-24" />
          <div className="w-10 h-10 bg-gray-200 bg-gray-700 rounded-lg" />
        </div>
        <div className="h-8 bg-gray-200 bg-gray-700 rounded w-32 mb-2" />
        <div className="h-4 bg-gray-200 bg-gray-700 rounded w-20" />
      </div>
    );
  }

  return (
    <div className="bg-white bg-gray-800 rounded-xl border border-gray-200 border-gray-700 p-6 hover:shadow-md hover:shadow-gray-900/30 transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-gray-600 text-gray-400">
          {title}
        </p>
        {icon && (
          <div className="p-2 bg-purple-100 bg-purple-900/30 rounded-lg">
            {icon}
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900 text-gray-100 mb-1">
        {formatValue(value)}
      </p>
      {(change !== undefined || note) && (
        <div className="flex items-center space-x-2">
          {change !== undefined && (
            <>
              {getTrendIcon()}
              <span className={`text-sm font-medium ${getTrendColor()}`}>
                {change > 0 ? '+' : ''}{change}%
              </span>
              {changeLabel && (
                <span className="text-sm text-gray-500 text-gray-400">
                  {changeLabel}
                </span>
              )}
            </>
          )}
          {note && (
            <span className="text-sm text-gray-500 text-gray-400">
              {note}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default StatsCard;
