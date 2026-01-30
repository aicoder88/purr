'use client';

import { Clock, Mail, Phone, MessageCircle, LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
}: ContactMethodCardProps) {
  const Icon = iconMap[iconName] || Mail;

  return (
    <div className="group relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl hover:shadow-purple-500/20 dark:hover:shadow-purple-500/40 transition-all duration-500 border-2 border-transparent hover:border-purple-300 dark:hover:border-purple-600 transform hover:-translate-y-2">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-orange-500/5 dark:from-purple-500/10 dark:via-pink-500/10 dark:to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

      <div className="relative z-10">
        {/* Icon with animated gradient */}
        <div className="w-24 h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl">
          <Icon className="w-12 h-12 text-white dark:text-gray-100" />
        </div>

        {/* Title */}
        <h3 className="font-heading text-2xl font-black mb-4 text-gray-900 dark:text-white">{title}</h3>

        {/* Value */}
        <div className="mb-6">
          <p className="text-lg font-bold text-purple-600 dark:text-purple-400 mb-2">{value}</p>
          <p className="text-gray-600 dark:text-gray-300 font-medium">{description}</p>
        </div>

        {/* Tagline note for phone */}
        {taglineNote && (
          <div className="bg-gradient-to-r from-orange-100 to-pink-100 dark:from-orange-900/30 dark:to-pink-900/30 p-4 rounded-2xl mb-6 border-2 border-orange-200 dark:border-orange-800">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-medium">{taglineNote}</p>
          </div>
        )}

        {/* Response time badge */}
        <div className="inline-flex items-center justify-center px-5 py-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 rounded-full mb-6 border-2 border-blue-200 dark:border-blue-700 shadow-md">
          <Clock className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
          <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{responseTime}</p>
        </div>

        {/* CTA Button */}
        <Button
          className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white dark:text-gray-100 font-bold shadow-xl transform group-hover:scale-105 transition-all duration-300 text-lg py-6"
          size="lg"
          onClick={() => {
            window.location.href = action;
          }}
        >
          {contactNowText} →
        </Button>
      </div>
    </div>
  );
}
