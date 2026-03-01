"use client";

import { useState, useCallback } from 'react';
import OpsLayout from '@/components/admin/ops/OpsLayout';
import { ContentCreator } from '@/components/admin/ops/ContentCreator';
import { RecentSubmissions } from '@/components/admin/ops/RecentSubmissions';
import { Facebook, Linkedin, Twitter, Instagram, FileText } from 'lucide-react';

const PLATFORMS = [
  { name: 'Facebook', icon: Facebook, limit: 500, color: 'bg-blue-500 bg-blue-600' },
  { name: 'LinkedIn', icon: Linkedin, limit: 1300, color: 'bg-blue-700 bg-blue-800' },
  { name: 'Twitter/X', icon: Twitter, limit: 280, color: 'bg-gray-900 bg-gray-700' },
  { name: 'Instagram', icon: Instagram, limit: 2200, color: 'bg-pink-500 bg-pink-600' },
  { name: 'Blog', icon: FileText, limit: 5000, color: 'bg-teal-500 bg-teal-600' }
];

export default function SocialPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handlePostCreated = useCallback(() => {
    // Trigger refresh of submissions list
    setRefreshKey(prev => prev + 1);
  }, []);

  return (
    <OpsLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-gray-900 text-gray-50">
          Social Media Content
        </h1>
        <p className="text-gray-600 text-gray-400 mt-1">
          Create and schedule social media posts across platforms
        </p>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {PLATFORMS.map((platform) => (
          <div
            key={platform.name}
            className="bg-white bg-gray-800 rounded-xl border border-gray-200 border-gray-700 p-4 text-center hover:shadow-md hover:shadow-gray-900/30 transition-shadow"
          >
            <div className={`w-12 h-12 ${platform.color} rounded-lg mx-auto mb-3 flex items-center justify-center`}>
              <platform.icon className="w-6 h-6 text-white text-gray-100" />
            </div>
            <h3 className="font-medium text-gray-900 text-gray-50">{platform.name}</h3>
            <p className="text-sm text-gray-500 text-gray-400">{platform.limit} chars</p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Creator */}
        <ContentCreator 
          onSubmit={async () => {
            handlePostCreated();
          }} 
        />

        {/* Recent Submissions */}
        <RecentSubmissions 
          key={refreshKey}
          onRefresh={handlePostCreated} 
        />
      </div>

      {/* Tips Section */}
      <div className="mt-8 bg-gradient-to-r from-teal-50 to-cyan-50 from-teal-900/20 to-cyan-900/20 rounded-xl border border-teal-200 border-teal-800 p-6">
        <h2 className="text-lg font-semibold text-teal-900 text-teal-100 mb-4">
          Best Practices
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/50 bg-gray-800/50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 text-gray-50 mb-2">
              Keep it Concise
            </h3>
            <p className="text-sm text-gray-600 text-gray-400">
              Twitter has 280 characters. Write short, impactful messages that work across all platforms.
            </p>
          </div>
          <div className="bg-white/50 bg-gray-800/50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 text-gray-50 mb-2">
              Use Hashtags
            </h3>
            <p className="text-sm text-gray-600 text-gray-400">
              Add relevant hashtags like #CatLitter #PetCare #Purrify to increase discoverability.
            </p>
          </div>
          <div className="bg-white/50 bg-gray-800/50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 text-gray-50 mb-2">
              Include CTAs
            </h3>
            <p className="text-sm text-gray-600 text-gray-400">
              End with a call-to-action like &quot;Shop now at purrify.ca&quot; or &quot;Link in bio&quot;.
            </p>
          </div>
        </div>
      </div>
    </OpsLayout>
  );
}
