import { useState } from 'react';
import { Copy, Check, Link as LinkIcon } from 'lucide-react';

interface LinkGeneratorProps {
  affiliateCode: string;
  baseUrl: string;
}

export function LinkGenerator({ affiliateCode, baseUrl }: LinkGeneratorProps) {
  const [customPath, setCustomPath] = useState('');
  const [utmCampaign, setUtmCampaign] = useState('');
  const [copied, setCopied] = useState(false);

  // Build the custom link
  const buildLink = () => {
    let path = customPath.trim();

    // Add leading slash if missing
    if (path && !path.startsWith('/')) {
      path = '/' + path;
    }

    let url = `${baseUrl}${path}?ref=${affiliateCode}`;

    // Add UTM parameters if campaign is set
    if (utmCampaign.trim()) {
      url += `&utm_source=affiliate&utm_medium=referral&utm_campaign=${encodeURIComponent(utmCampaign.trim())}`;
    }

    return url;
  };

  const generatedLink = buildLink();

  const copyLink = async () => {
    await navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white bg-gray-800 rounded-xl border border-gray-200 border-gray-700 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <LinkIcon className="w-5 h-5 text-purple-600 text-purple-400" />
        <h3 className="text-lg font-semibold text-gray-900 text-gray-100">
          Custom Link Generator
        </h3>
      </div>

      <p className="text-sm text-gray-600 text-gray-400 mb-6">
        Create custom referral links for any page on the site.
      </p>

      <div className="space-y-4">
        {/* Custom Path Input */}
        <div>
          <label
            htmlFor="customPath"
            className="block text-sm font-medium text-gray-700 text-gray-300 mb-1"
          >
            Page Path
          </label>
          <div className="flex items-center">
            <span className="inline-flex items-center px-3 py-2 bg-gray-100 bg-gray-700 border border-r-0 border-gray-300 border-gray-600 rounded-l-lg text-gray-500 text-gray-400 text-sm">
              {baseUrl}
            </span>
            <input
              type="text"
              id="customPath"
              value={customPath}
              onChange={(e) => setCustomPath(e.target.value)}
              placeholder="/products/"
              className="flex-1 px-3 py-2 border border-gray-300 border-gray-600 rounded-r-lg bg-white bg-gray-700 text-gray-900 text-gray-100 placeholder-gray-500 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:ring-purple-400 focus:border-transparent"
            />
          </div>
          <p className="mt-1 text-xs text-gray-500 text-gray-400">
            Leave empty for homepage
          </p>
        </div>

        {/* UTM Campaign Input */}
        <div>
          <label
            htmlFor="utmCampaign"
            className="block text-sm font-medium text-gray-700 text-gray-300 mb-1"
          >
            Campaign Name <span className="text-gray-400 text-gray-500 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            id="utmCampaign"
            value={utmCampaign}
            onChange={(e) => setUtmCampaign(e.target.value)}
            placeholder="e.g., instagram-bio, email-newsletter"
            className="w-full px-3 py-2 border border-gray-300 border-gray-600 rounded-lg bg-white bg-gray-700 text-gray-900 text-gray-100 placeholder-gray-500 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:ring-purple-400 focus:border-transparent"
          />
          <p className="mt-1 text-xs text-gray-500 text-gray-400">
            Track different campaigns separately
          </p>
        </div>

        {/* Generated Link */}
        <div>
          <label className="block text-sm font-medium text-gray-700 text-gray-300 mb-1">
            Your Referral Link
          </label>
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-100 bg-gray-700 rounded-lg px-4 py-2 overflow-hidden">
              <code className="text-sm text-gray-700 text-gray-300 break-all">
                {generatedLink}
              </code>
            </div>
            <button
              onClick={copyLink}
              className="flex-shrink-0 px-4 py-2 bg-purple-600 bg-purple-500 hover:bg-purple-700 hover:bg-purple-600 text-white text-gray-100 rounded-lg transition-colors flex items-center space-x-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LinkGenerator;
