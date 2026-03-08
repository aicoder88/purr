import { Instagram, Youtube, Facebook, Linkedin } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/constants';
import { useTranslations } from 'next-intl';

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

const PinterestIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
  </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M18.9 2H22l-6.77 7.73L23.2 22h-6.23l-4.88-7.44L5.58 22H2.47l7.24-8.27L2 2h6.39l4.41 6.73L18.9 2Zm-1.09 18h1.72L7.45 3.9H5.61l12.2 16.1Z" />
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
    name: 'Facebook',
    url: SOCIAL_LINKS.facebook,
    icon: Facebook,
    color: 'hover:text-[#1877F2] dark:hover:text-[#1877F2]',
  },
  {
    name: 'X',
    url: SOCIAL_LINKS.x,
    icon: XIcon,
    color: 'hover:text-[#111111] dark:hover:text-white',
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
  {
    name: 'Pinterest',
    url: SOCIAL_LINKS.pinterest,
    icon: PinterestIcon,
    color: 'hover:text-[#BD081C] dark:hover:text-[#BD081C]',
  },
];

export function SocialFollowCTA({ variant = 'card', className = '' }: SocialFollowCTAProps) {
  const t = useTranslations();

  const headlineText = t('socialFollow.headline') || 'Follow us for more tips';
  const descriptionText = t('socialFollow.description') || 'Join our community for cat care tips and exclusive offers.';

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
