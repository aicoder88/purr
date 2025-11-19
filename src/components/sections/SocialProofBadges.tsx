import { ExternalLink } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/constants';

interface BadgeLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  color: string;
  hoverColor: string;
}

const badges: BadgeLink[] = [
  {
    name: 'Trustpilot',
    url: SOCIAL_LINKS.trustpilot,
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
      </svg>
    ),
    color: 'text-[#00B67A]',
    hoverColor: 'hover:bg-[#00B67A]/10 dark:hover:bg-[#00B67A]/20',
  },
  {
    name: 'Google Business',
    url: SOCIAL_LINKS.googleBusiness,
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
    color: 'text-[#4285F4]',
    hoverColor: 'hover:bg-[#4285F4]/10 dark:hover:bg-[#4285F4]/20',
  },
  {
    name: 'Crunchbase',
    url: SOCIAL_LINKS.crunchbase,
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.6 0H2.4A2.4 2.4 0 0 0 0 2.4v19.2A2.4 2.4 0 0 0 2.4 24h19.2a2.4 2.4 0 0 0 2.4-2.4V2.4A2.4 2.4 0 0 0 21.6 0zM7.045 14.465A2.11 2.11 0 0 1 4.87 12.3a2.11 2.11 0 0 1 2.175-2.164 2.084 2.084 0 0 1 2.165 2.164 2.084 2.084 0 0 1-2.165 2.165zm9.91 0a2.11 2.11 0 0 1-2.175-2.165 2.11 2.11 0 0 1 2.175-2.164 2.084 2.084 0 0 1 2.165 2.164 2.084 2.084 0 0 1-2.165 2.165z"/>
      </svg>
    ),
    color: 'text-[#0288D1]',
    hoverColor: 'hover:bg-[#0288D1]/10 dark:hover:bg-[#0288D1]/20',
  },
  {
    name: 'Product Hunt',
    url: SOCIAL_LINKS.producthunt,
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.604 8.4h-3.405V12h3.405c.995 0 1.801-.806 1.801-1.8 0-.995-.806-1.8-1.801-1.8zM12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm1.604 14.4h-3.405V18H7.801V6h5.804c2.319 0 4.2 1.88 4.2 4.2 0 2.32-1.881 4.2-4.201 4.2z"/>
      </svg>
    ),
    color: 'text-[#DA552F]',
    hoverColor: 'hover:bg-[#DA552F]/10 dark:hover:bg-[#DA552F]/20',
  },
  {
    name: 'Yelp',
    url: 'https://www.yelp.ca/biz/purrify-montreal',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.16 12.594l-4.995 1.433c-.96.276-1.74-.8-1.176-1.63l2.905-4.308a1.072 1.072 0 0 1 1.596-.206 9.194 9.194 0 0 1 2.364 3.252 1.073 1.073 0 0 1-.686 1.459zm-5.025 3.152l4.942 1.606a1.072 1.072 0 0 1 .636 1.48 9.188 9.188 0 0 1-2.56 3.12 1.073 1.073 0 0 1-1.588-.263l-2.78-4.357c-.496-.778.196-1.754 1.076-1.586h.274zm-4.613-2.82l1.81 4.963a1.073 1.073 0 0 1-.464 1.265l-.073.037a9.21 9.21 0 0 1-3.981.942 1.073 1.073 0 0 1-1.09-1.146l.304-5.261c.063-1.062 1.57-1.478 2.11-.586l1.11 1.728a.074.074 0 0 0 .058.04l.217.017zm-1.032-3.084l-4.775-2.086a1.073 1.073 0 0 1-.562-1.417 9.196 9.196 0 0 1 2.07-3.526 1.073 1.073 0 0 1 1.644.021l3.103 4.025c.638.828-.048 1.97-1.05 1.74l-.43.243zm.136-6.022l1.48 5.07c.24.821-.65 1.525-1.415 1.12L4.912 7.333a1.073 1.073 0 0 1-.41-1.378 9.185 9.185 0 0 1 3.297-3.473 1.073 1.073 0 0 1 1.548.391l.24-.053z"/>
      </svg>
    ),
    color: 'text-[#D32323]',
    hoverColor: 'hover:bg-[#D32323]/10 dark:hover:bg-[#D32323]/20',
  },
  {
    name: 'Wellfound',
    url: SOCIAL_LINKS.wellfound,
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.8a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8zm4.8 12H7.2v-1.2c0-2.21 1.79-4 4-4h1.6c2.21 0 4 1.79 4 4v1.2z"/>
      </svg>
    ),
    color: 'text-[#000000] dark:text-gray-300',
    hoverColor: 'hover:bg-gray-100 dark:hover:bg-gray-800',
  },
];

interface SocialProofBadgesProps {
  variant?: 'full' | 'compact';
  className?: string;
}

export function SocialProofBadges({ variant = 'full', className = '' }: SocialProofBadgesProps) {
  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-3 ${className}`}>
        {badges.map((badge) => (
          <a
            key={badge.name}
            href={badge.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs font-medium ${badge.color} ${badge.hoverColor} transition-colors duration-200`}
            aria-label={`View Purrify on ${badge.name}`}
          >
            {badge.icon}
            <span>{badge.name}</span>
          </a>
        ))}
      </div>
    );
  }

  return (
    <section className={`py-12 bg-gray-50 dark:bg-gray-800/50 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Trusted & Verified
          </p>
          <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-50">
            Find Us On
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {badges.map((badge) => (
            <a
              key={badge.name}
              href={badge.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium ${badge.color} ${badge.hoverColor} transition-all duration-200 hover:shadow-md dark:hover:shadow-lg`}
              aria-label={`View Purrify on ${badge.name}`}
            >
              {badge.icon}
              <span className="text-gray-700 dark:text-gray-300">{badge.name}</span>
              <ExternalLink className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SocialProofBadges;
