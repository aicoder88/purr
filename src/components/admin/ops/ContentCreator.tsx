'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Facebook,
  Linkedin,
  Instagram,
  FileText,
  Link as LinkIcon,
  Send,
  Loader2,
  Check,
  AlertCircle
} from 'lucide-react';

// Platform configurations
const PLATFORMS = {
  facebook: {
    name: 'Facebook',
    icon: Facebook,
    color: 'bg-blue-600',
    hoverColor: 'hover:bg-blue-700',
    charLimit: 500,
    label: 'FB'
  },
  linkedin: {
    name: 'LinkedIn',
    icon: Linkedin,
    color: 'bg-blue-700',
    hoverColor: 'hover:bg-blue-800',
    charLimit: 1300,
    label: 'LI'
  },
  instagram: {
    name: 'Instagram',
    icon: Instagram,
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    hoverColor: 'hover:from-purple-600 hover:to-pink-600',
    charLimit: 2200,
    label: 'IG'
  },
  blog: {
    name: 'Blog',
    icon: FileText,
    color: 'bg-teal-600',
    hoverColor: 'hover:bg-teal-700',
    charLimit: 5000,
    label: 'Blog'
  }
} as const;

type PlatformKey = keyof typeof PLATFORMS;

interface ContentCreatorProps {
  onSubmit?: (content: string, platforms: PlatformKey[]) => Promise<void>;
}

export function ContentCreator({ onSubmit }: ContentCreatorProps) {
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [isExtractingUrl, setIsExtractingUrl] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformKey[]>(['facebook', 'linkedin', 'instagram']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [inputMode, setInputMode] = useState<'text' | 'url'>('text');

  const togglePlatform = (platform: PlatformKey) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleExtractUrl = async () => {
    if (!url) return;
    
    setIsExtractingUrl(true);
    try {
      // Simulate URL extraction - in real implementation, this would call an API
      await new Promise(resolve => setTimeout(resolve, 1500));
      setContent(`Check out this article: ${url}\n\n[Content extracted from URL would go here]`);
      setInputMode('text');
    } catch (error) {
      console.error('Failed to extract URL:', error);
    } finally {
      setIsExtractingUrl(false);
    }
  };

  const handleSubmit = async () => {
    if (!content || selectedPlatforms.length === 0) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      if (onSubmit) {
        await onSubmit(content, selectedPlatforms);
      } else {
        // Default: call the API
        const response = await fetch('/api/admin/ops/social/post', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content, platforms: selectedPlatforms })
        });
        
        if (!response.ok) throw new Error('Failed to create post');
      }
      
      setSubmitStatus('success');
      setTimeout(() => {
        setContent('');
        setSubmitStatus('idle');
      }, 2000);
    } catch (error) {
      console.error('Submit failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate character usage for each selected platform
  const getCharUsage = (platform: PlatformKey) => {
    const limit = PLATFORMS[platform].charLimit;
    const usage = (content.length / limit) * 100;
    return {
      count: content.length,
      limit,
      percentage: Math.min(usage, 100),
      isOver: content.length > limit
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white bg-gray-800 rounded-xl border border-gray-200 border-gray-700 p-6"
    >
      <h2 className="text-lg font-semibold text-gray-900 text-gray-50 mb-4">
        Create Social Post
      </h2>

      {/* Input Mode Toggle */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setInputMode('text')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            inputMode === 'text'
              ? 'bg-teal-100 bg-teal-900/30 text-teal-700 text-teal-300'
              : 'bg-gray-100 bg-gray-700 text-gray-600 text-gray-400 hover:bg-gray-200 hover:bg-gray-600'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Write Content</span>
        </button>
        <button
          onClick={() => setInputMode('url')}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            inputMode === 'url'
              ? 'bg-teal-100 bg-teal-900/30 text-teal-700 text-teal-300'
              : 'bg-gray-100 bg-gray-700 text-gray-600 text-gray-400 hover:bg-gray-200 hover:bg-gray-600'
          }`}
        >
          <LinkIcon className="w-4 h-4" />
          <span>From URL</span>
        </button>
      </div>

      {/* URL Input */}
      <AnimatePresence mode="wait">
        {inputMode === 'url' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4"
          >
            <div className="flex space-x-2">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste a URL to extract content..."
                className="flex-1 px-4 py-2 border border-gray-300 border-gray-600 rounded-lg bg-white bg-gray-700 text-gray-900 text-gray-50 placeholder-gray-500 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <button
                onClick={handleExtractUrl}
                disabled={!url || isExtractingUrl}
                className="px-4 py-2 bg-teal-600 bg-teal-700 hover:bg-teal-700 hover:bg-teal-600 text-white text-gray-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isExtractingUrl ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <LinkIcon className="w-4 h-4" />
                )}
                <span>Extract</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Input */}
      <div className="mb-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What do you want to share?"
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 border-gray-600 rounded-lg bg-white bg-gray-700 text-gray-900 text-gray-50 placeholder-gray-500 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Platform Selection */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 text-gray-300 mb-2">
          Select Platforms
        </p>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(PLATFORMS) as PlatformKey[]).map((key) => {
            const platform = PLATFORMS[key];
            const Icon = platform.icon;
            const isSelected = selectedPlatforms.includes(key);
            const usage = getCharUsage(key);
            
            return (
              <button
                key={key}
                onClick={() => togglePlatform(key)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isSelected
                    ? `${platform.color} text-white text-gray-50 ${platform.hoverColor}`
                    : 'bg-gray-100 bg-gray-700 text-gray-600 text-gray-400 hover:bg-gray-200 hover:bg-gray-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{platform.label}</span>
                {isSelected && content && (
                  <span className={`text-xs ${usage.isOver ? 'text-red-200' : 'opacity-75'}`}>
                    {usage.count}/{usage.limit}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Character Limits */}
      {selectedPlatforms.length > 0 && content && (
        <div className="mb-4 space-y-2">
          {selectedPlatforms.map((key) => {
            const platform = PLATFORMS[key];
            const usage = getCharUsage(key);
            
            return (
              <div key={key} className="flex items-center space-x-3">
                <span className="text-sm text-gray-600 text-gray-400 w-20">
                  {platform.name}
                </span>
                <div className="flex-1 h-2 bg-gray-200 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${usage.percentage}%` }}
                    className={`h-full rounded-full ${
                      usage.isOver
                        ? 'bg-red-500'
                        : usage.percentage > 80
                        ? 'bg-yellow-500'
                        : 'bg-teal-500'
                    }`}
                  />
                </div>
                <span className={`text-sm font-medium ${
                  usage.isOver ? 'text-red-500 text-red-400' : 'text-gray-600 text-gray-400'
                }`}>
                  {usage.percentage.toFixed(0)}%
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Preview Cards */}
      {selectedPlatforms.length > 0 && content && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 text-gray-300 mb-2">
            Preview
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedPlatforms.slice(0, 2).map((key) => {
              const platform = PLATFORMS[key];
              const Icon = platform.icon;
              const usage = getCharUsage(key);
              const truncatedContent = content.slice(0, platform.charLimit);
              
              return (
                <div
                  key={key}
                  className="border border-gray-200 border-gray-700 rounded-lg p-4 bg-gray-50 bg-gray-900"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon className="w-4 h-4 text-gray-600 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 text-gray-300">
                      {platform.name}
                    </span>
                    {usage.isOver && (
                      <span className="text-xs text-red-500 text-red-400">
                        (truncated)
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 text-gray-400 whitespace-pre-wrap break-words">
                    {truncatedContent}
                    {usage.isOver && '...'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!content || selectedPlatforms.length === 0 || isSubmitting}
          className={`flex items-center space-x-2 px-6 py-2.5 rounded-lg text-white text-gray-50 font-medium transition-all ${
            submitStatus === 'success'
              ? 'bg-green-600 hover:bg-green-700'
              : submitStatus === 'error'
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-teal-600 hover:bg-teal-700'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : submitStatus === 'success' ? (
            <Check className="w-5 h-5" />
          ) : submitStatus === 'error' ? (
            <AlertCircle className="w-5 h-5" />
          ) : (
            <Send className="w-5 h-5" />
          )}
          <span>
            {isSubmitting
              ? 'Creating...'
              : submitStatus === 'success'
              ? 'Created!'
              : submitStatus === 'error'
              ? 'Failed'
              : 'Create Post'}
          </span>
        </button>
      </div>
    </motion.div>
  );
}

export default ContentCreator;
