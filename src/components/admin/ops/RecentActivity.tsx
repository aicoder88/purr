'use client';

import { motion } from 'framer-motion';
import { Users, Store, ShoppingCart, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ActivityItem {
  id: string;
  type: 'lead' | 'retailer' | 'order';
  action: string;
  subject: string;
  timestamp: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
  isLoading?: boolean;
}

function getActivityIcon(type: ActivityItem['type']) {
  switch (type) {
    case 'lead':
      return Users;
    case 'retailer':
      return Store;
    case 'order':
      return ShoppingCart;
    default:
      return Clock;
  }
}

function getActivityColor(type: ActivityItem['type']) {
  switch (type) {
    case 'lead':
      return 'bg-blue-100 bg-blue-900/30 text-blue-600 text-blue-400';
    case 'retailer':
      return 'bg-purple-100 bg-purple-900/30 text-purple-600 text-purple-400';
    case 'order':
      return 'bg-green-100 bg-green-900/30 text-green-600 text-green-400';
    default:
      return 'bg-gray-100 bg-gray-700 text-gray-600 text-gray-400';
  }
}

function ActivitySkeleton() {
  return (
    <div className="animate-pulse flex items-center space-x-3 py-3">
      <div className="w-10 h-10 bg-gray-200 bg-gray-700 rounded-full" />
      <div className="flex-1">
        <div className="h-4 bg-gray-200 bg-gray-700 rounded w-3/4 mb-2" />
        <div className="h-3 bg-gray-200 bg-gray-700 rounded w-1/2" />
      </div>
    </div>
  );
}

export function RecentActivity({ activities, isLoading = false }: RecentActivityProps) {
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white bg-gray-800 rounded-xl border border-gray-200 border-gray-700 p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 text-gray-50 mb-4">
          Recent Activity
        </h2>
        <div className="divide-y divide-gray-100 divide-gray-700">
          {[1, 2, 3, 4, 5].map((i) => (
            <ActivitySkeleton key={i} />
          ))}
        </div>
      </motion.div>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white bg-gray-800 rounded-xl border border-gray-200 border-gray-700 p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 text-gray-50 mb-4">
          Recent Activity
        </h2>
        <div className="text-center py-8 text-gray-500 text-gray-400">
          <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No recent activity</p>
          <p className="text-sm mt-1">Activity will appear here as you work</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white bg-gray-800 rounded-xl border border-gray-200 border-gray-700 p-6"
    >
      <h2 className="text-lg font-semibold text-gray-900 text-gray-50 mb-4">
        Recent Activity
      </h2>
      <div className="divide-y divide-gray-100 divide-gray-700">
        {activities.map((activity, index) => {
          const Icon = getActivityIcon(activity.type);
          const colorClass = getActivityColor(activity.type);
          
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center space-x-3 py-3 hover:bg-gray-50 hover:bg-gray-700/50 -mx-2 px-2 rounded-lg transition-colors"
            >
              <div className={`p-2 rounded-full ${colorClass}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 text-gray-50 truncate">
                  <span className="capitalize font-medium">{activity.type}</span>{' '}
                  <span className="text-gray-600 text-gray-400">{activity.action}:</span>{' '}
                  <span className="font-medium">{activity.subject}</span>
                </p>
                <p className="text-xs text-gray-500 text-gray-400">
                  {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default RecentActivity;
