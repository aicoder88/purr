'use client';

import { Clock, Mail, Phone, MessageCircle, LucideIcon, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  Mail,
  Phone,
  MessageCircle,
};

interface ContactMethodCardProps {
  iconName: string;
  title: string;
  value: string;
  description: string;
  responseTime: string;
  action: string;
  taglineNote?: string;
  contactNowText: string;
  className?: string;
}

export default function ContactMethodCard({
  iconName,
  title,
  value,
  description,
  responseTime,
  action,
  taglineNote,
  contactNowText,
  className,
}: ContactMethodCardProps) {
  const Icon = iconMap[iconName] || Mail;

  return (
    <div className={cn(
      "group relative flex flex-col p-8 rounded-3xl transition-all duration-300",
      "bg-white/70 dark:bg-gray-800/50 backdrop-blur-md",
      "border border-gray-100 dark:border-gray-700/50",
      "hover:shadow-xl hover:shadow-purple-500/5 hover:-translate-y-1",
      "dark:hover:bg-gray-800/80 dark:hover:border-purple-500/20",
      className
    )}>
      {/* Icon */}
      <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-7 h-7" />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">{description}</p>

        <div className="mb-6">
          <p className="text-lg font-semibold text-gray-900 dark:text-white break-words">{value}</p>
        </div>

        {taglineNote && (
          <div className="mb-6 p-3 rounded-xl bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/20">
            <p className="text-xs font-medium text-orange-800 dark:text-orange-200">{taglineNote}</p>
          </div>
        )}

        <div className="flex items-center gap-2 mb-8 text-sm text-gray-500 dark:text-gray-400">
          <Clock className="w-4 h-4" />
          <span>{responseTime}</span>
        </div>
      </div>

      {/* Action */}
      <Button
        variant="outline"
        className="w-full justify-between group-hover:border-purple-200 dark:group-hover:border-purple-800 group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20 dark:border-gray-700 dark:bg-transparent transition-all duration-300"
        onClick={() => {
          window.location.href = action;
        }}
      >
        <span className="font-semibold text-gray-700 dark:text-gray-200 group-hover:text-purple-700 dark:group-hover:text-purple-300">{contactNowText}</span>
        <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
      </Button>
    </div>
  );
}
