import { Instagram, Twitter, Youtube, Facebook, Linkedin } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/constants';
import { useTranslation } from '@/lib/translation-context';

interface SocialFollowCTAProps {
  variant?: 'inline' | 'card';
  className?: string;
}

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path d="M12.75 2a.75.75 0 0 1 .75.75c0 2.24 1.53 4.12 3.63 4.5.37.07.62.4.62.77v2.02a.75.75 0 0 1-1.03.7 6.3 6.3 0 0 1-2.47-1.4v6.67A4.82 4.82 0 1 1 8 11.5h.75a.75.75 0 0 1 .75.75v2.14a.75.75 0 0 1-1.02.7 1.83 1.83 0 0 0-.73-.15 1.82 1.82 0 1 0 1.82 1.83V3.5a.75.75 0 0 1 .75-.75h2.43Z" />
  </svg>
);

const socialLinks = [
  {
    name: 'Instagram',
    url: SOCIAL_LINKS.instagram,
    icon: Instagram,
    color: 'hover:text-[#E4405F] dark:hover:text-[#E4405F]',
  },
  {
    name: 'X',
    url: SOCIAL_LINKS.x,
    icon: Twitter,
    color: 'hover:text-[#1DA1F2] dark:hover:text-[#1DA1F2]',
  },
  {
    name: 'Facebook',
    url: SOCIAL_LINKS.facebook,
    icon: Facebook,
    color: 'hover:text-[#1877F2] dark:hover:text-[#1877F2]',
  },
  {
    name: 'YouTube',
    url: SOCIAL_LINKS.youtube,
    icon: Youtube,
    color: 'hover:text-[#FF0000] dark:hover:text-[#FF0000]',
  },
  {
    name: 'TikTok',
    url: SOCIAL_LINKS.tiktok,
    icon: TikTokIcon,
    color: 'hover:text-[#000000] dark:hover:text-white',
  },
  {
    name: 'LinkedIn',
    url: SOCIAL_LINKS.linkedin,
    icon: Linkedin,
    color: 'hover:text-[#0A66C2] dark:hover:text-[#0A66C2]',
  },
];

export function SocialFollowCTA({ variant = 'card', className = '' }: SocialFollowCTAProps) {
  const { t } = useTranslation();

  const headlineText = t.socialFollow?.headline || 'Follow us for more tips';
  const descriptionText = t.socialFollow?.description || 'Join our community for cat care tips and exclusive offers.';

  if (variant === 'inline') {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-4 py-4 ${className}`}>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {headlineText}:
        </span>
        <div className="flex items-center gap-3">
          {socialLinks.map((social) => {
            const IconComponent = social.icon;
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-500 dark:text-gray-400 ${social.color} transition-colors duration-200`}
                aria-label={`Follow Purrify on ${social.name}`}
              >
                <IconComponent className="h-5 w-5" />
              </a>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-100 dark:border-purple-800/50 ${className}`}>
      <div className="text-center">
        <h3 className="font-heading text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">
          {headlineText}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {descriptionText}
        </p>
        <div className="flex items-center justify-center gap-4">
          {socialLinks.map((social) => {
            const IconComponent = social.icon;
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-full bg-white dark:bg-gray-800 shadow-sm text-gray-500 dark:text-gray-400 ${social.color} transition-all duration-200 hover:shadow-md`}
                aria-label={`Follow Purrify on ${social.name}`}
              >
                <IconComponent className="h-5 w-5" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SocialFollowCTA;
