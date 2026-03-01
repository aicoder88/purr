import { cn } from '@/lib/utils';
import { LeadStatus } from '@/generated/client/client';

interface LeadStatusBadgeProps {
  status: LeadStatus;
  className?: string;
}

const statusConfig: Record<LeadStatus, { label: string; className: string }> = {
  NEW: {
    label: 'New',
    className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
  },
  CONTACTED: {
    label: 'Contacted',
    className: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
  },
  SAMPLE_SENT: {
    label: 'Sample Sent',
    className: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
  },
  FOLLOWING_UP: {
    label: 'Following Up',
    className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
  },
  CONVERTED: {
    label: 'Converted',
    className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
  },
  NOT_INTERESTED: {
    label: 'Not Interested',
    className: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
  },
  NO_RESPONSE: {
    label: 'No Response',
    className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
  }
};

export default function LeadStatusBadge({ status, className }: LeadStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}

export { statusConfig };
