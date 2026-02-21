import { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, Check, X, History } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';
import { toast } from 'sonner';

interface AIGenerationConfig {
  topic: string;
  tone: 'professional' | 'casual' | 'friendly' | 'authoritative';
  length: 'short' | 'medium' | 'long';
  targetAudience: 'beginners' | 'intermediate' | 'experts';
  keywords: string[];
  templateId?: string;
  includeImages: boolean;
  imageCount: number;
}

interface AIPreview {
  title: string;
  content: string;
  excerpt: string;
}

interface AITemplate {
  id: string;
  name: string;
  description: string;
}

interface AIHistoryRecord {
  id: string;
  config: AIGenerationConfig;
  result: AIPreview;
  timestamp: string | Date;
}

interface AIContentGeneratorProps {
  onGenerate: (content: AIPreview) => void;
  onClose: () => void;
}

export default function AIContentGenerator({ onGenerate, onClose }: AIContentGeneratorProps) {
  const [config, setConfig] = useState<AIGenerationConfig>({
    topic: '',
    tone: 'friendly',
    length: 'medium',
    targetAudience: 'beginners',
    keywords: [],
    templateId: undefined,
    includeImages: true,
    imageCount: 2
  });
  const [keywordInput, setKeywordInput] = useState('');
  const [generating, setGenerating] = useState(false);
  const [preview, setPreview] = useState<AIPreview | null>(null);
  const [templates, setTemplates] = useState<AITemplate[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<AIHistoryRecord[]>([]);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const response = await fetch('/api/admin/blog/templates');
      if (response.ok) {
        const data = await response.json();
        setTemplates(data);
      }
    } catch {
      // Silently fail - templates are optional
    }
  };

  const loadHistory = async () => {
    try {
      const response = await fetch('/api/admin/blog/generation-history');
      if (response.ok) {
        const data = await response.json();
        setHistory(data);
      }
    } catch {
      // Silently fail - history is optional
    }
  };

  const handleGenerate = async () => {
    if (!config.topic.trim()) {
      toast.error('Please enter a topic');
      return;
    }

    setGenerating(true);
    try {
      const response = await fetch('/api/admin/blog/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(config)
      });

      if (!response.ok) {
        throw new Error('Failed to generate content');
      }

      const result = await response.json();
      setPreview(result);
      toast.success('Content generated successfully!');
    } catch {
      toast.error('Failed to generate content');
    } finally {
      setGenerating(false);
    }
  };

  const handleRegenerate = async () => {
    setPreview(null);
    await handleGenerate();
  };

  const handleAccept = () => {
    if (preview) {
      onGenerate(preview);
      onClose();
    }
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !config.keywords.includes(keywordInput.trim())) {
      setConfig({
        ...config,
        keywords: [...config.keywords, keywordInput.trim()]
      });
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setConfig({
      ...config,
      keywords: config.keywords.filter(k => k !== keyword)
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <span>AI Content Generator</span>
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setShowHistory(!showHistory);
                if (!showHistory) loadHistory();
              }}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <History className="w-4 h-4" />
              <span>History</span>
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {showHistory ? (
            /* Generation History */
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-lg font-semibold text-gray-900 dark:text-gray-100">Recent Generations</h3>
                <button
                  onClick={() => setShowHistory(false)}
                  className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                >
                  Back to Generator
                </button>
              </div>
              {history.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">No generation history yet</p>
              ) : (
                <div className="space-y-3">
                  {history.map((record) => (
                    <div
                      key={record.id}
                      className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">{record.result.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{record.config.topic}</p>
                          <div className="flex items-center space-x-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                            <span>{record.config.tone} tone</span>
                            <span>•</span>
                            <span>{record.config.length} length</span>
                            <span>•</span>
                            <span>{new Date(record.timestamp).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            onGenerate(record.result);
                            onClose();
                          }}
                          className="ml-4 px-3 py-1.5 text-sm bg-purple-600 text-white dark:text-gray-100 rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600"
                        >
                          Use This
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : !preview ? (
            /* Configuration Form */
            <div className="space-y-6">
              {/* Topic */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Topic *
                </label>
                <input
                  type="text"
                  value={config.topic}
                  onChange={(e) => setConfig({ ...config, topic: e.target.value })}
                  placeholder="e.g., How to Eliminate Cat Litter Odor Naturally"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                />
              </div>

              {/* Tone & Length */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tone
                  </label>
                  <select
                    value={config.tone}
                    onChange={(e) => setConfig({ ...config, tone: e.target.value as AIGenerationConfig['tone'] })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  >
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                    <option value="friendly">Friendly</option>
                    <option value="authoritative">Authoritative</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Length
                  </label>
                  <select
                    value={config.length}
                    onChange={(e) => setConfig({ ...config, length: e.target.value as AIGenerationConfig['length'] })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  >
                    <option value="short">Short (500-800 words)</option>
                    <option value="medium">Medium (1000-1500 words)</option>
                    <option value="long">Long (2000-2500 words)</option>
                  </select>
                </div>
              </div>

              {/* Target Audience */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Target Audience
                </label>
                <select
                  value={config.targetAudience}
                  onChange={(e) => setConfig({ ...config, targetAudience: e.target.value as AIGenerationConfig['targetAudience'] })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                >
                  <option value="beginners">Beginners</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="experts">Experts</option>
                </select>
              </div>

              {/* Content Template */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Content Template (Optional)
                </label>
                <select
                  value={config.templateId || ''}
                  onChange={(e) => setConfig({ ...config, templateId: e.target.value || undefined })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                >
                  <option value="">No template (free-form)</option>
                  {templates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name} - {template.description}
                    </option>
                  ))}
                </select>
              </div>

              {/* Keywords */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Keywords
                </label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                    placeholder="Add keyword..."
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  />
                  <button
                    onClick={addKeyword}
                    className="px-4 py-2 bg-purple-600 text-white dark:text-gray-100 rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {config.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="inline-flex items-center space-x-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm"
                    >
                      <span>{keyword}</span>
                      <button
                        onClick={() => removeKeyword(keyword)}
                        className="text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-100"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Images */}
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.includeImages}
                    onChange={(e) => setConfig({ ...config, includeImages: e.target.checked })}
                    className="rounded border-gray-300 dark:border-gray-600 text-purple-600 dark:text-purple-400 focus:ring-purple-500 dark:focus:ring-purple-400"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Include images</span>
                </label>
                {config.includeImages && (
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={config.imageCount}
                    onChange={(e) => setConfig({ ...config, imageCount: parseInt(e.target.value) })}
                    className="w-20 px-3 py-1 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  />
                )}
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={generating || !config.topic.trim()}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-purple-600 text-white dark:text-gray-100 rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {generating ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Generate Content</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Preview */
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {preview.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{preview.excerpt}</p>
                <div
                  className="prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: preview.content.substring(0, 500) + '...' }}
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleRegenerate}
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>Regenerate</span>
                </button>
                <button
                  onClick={handleAccept}
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-purple-600 text-white dark:text-gray-100 rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors"
                >
                  <Check className="w-5 h-5" />
                  <span>Use This Content</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
