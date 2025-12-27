'use client';

import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDownRight, LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface AnimatedMetricCardProps {
  title: string;
  value: number;
  format?: 'number' | 'currency' | 'percentage';
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  href?: string;
  isLoading?: boolean;
}

function AnimatedNumber({ 
  value, 
  format = 'number' 
}: { 
  value: number; 
  format?: 'number' | 'currency' | 'percentage';
}) {
  const spring = useSpring(0, { stiffness: 100, damping: 30 });
  const display = useTransform(spring, (current) => {
    if (format === 'currency') {
      return new Intl.NumberFormat('en-CA', { 
        style: 'currency', 
        currency: 'CAD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(current);
    }
    if (format === 'percentage') {
      return `${current.toFixed(1)}%`;
    }
    return Math.round(current).toLocaleString();
  });

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
}

function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-3" />
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-2" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20" />
    </div>
  );
}

export function AnimatedMetricCard({
  title,
  value,
  format = 'number',
  change,
  changeLabel,
  icon: Icon,
  href,
  isLoading = false
}: AnimatedMetricCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  const CardContent = (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 cursor-pointer overflow-hidden relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Gradient border on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        style={{
          background: 'linear-gradient(135deg, rgba(26, 188, 156, 0.3), rgba(45, 212, 191, 0.1))',
        }}
        transition={{ duration: 0.2 }}
      />

      <div className="relative z-10">
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {title}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-2">
                <AnimatedNumber value={value} format={format} />
              </p>
              {change !== undefined && (
                <div className="flex items-center mt-2 text-sm">
                  {isPositive && (
                    <>
                      <ArrowUpRight className="w-4 h-4 text-green-500 dark:text-green-400" />
                      <span className="text-green-600 dark:text-green-400 font-medium">
                        +{change}%
                      </span>
                    </>
                  )}
                  {isNegative && (
                    <>
                      <ArrowDownRight className="w-4 h-4 text-red-500 dark:text-red-400" />
                      <span className="text-red-600 dark:text-red-400 font-medium">
                        {change}%
                      </span>
                    </>
                  )}
                  {change === 0 && (
                    <span className="text-gray-500 dark:text-gray-400 font-medium">
                      0%
                    </span>
                  )}
                  {changeLabel && (
                    <span className="text-gray-500 dark:text-gray-400 ml-1">
                      {changeLabel}
                    </span>
                  )}
                </div>
              )}
            </div>
            <motion.div
              className="p-3 bg-teal-50 dark:bg-teal-900/30 rounded-lg"
              animate={{ 
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? 5 : 0
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <Icon className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{CardContent}</Link>;
  }

  return CardContent;
}

export default AnimatedMetricCard;
