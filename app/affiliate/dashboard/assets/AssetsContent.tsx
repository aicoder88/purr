"use client";

import { useState } from 'react';
import Image from 'next/image';
import AffiliateLayout from '@/components/affiliate/AffiliateLayout';
import { useTranslations, useLocale } from 'next-intl';
import {
    Download,
    Image as ImageIcon,
    Palette,
    Copy,
    Check,
    ExternalLink,
    MessageSquare
} from 'lucide-react';

interface BannerAsset {
    id: string;
    name: string;
    size: string;
    dimensions: string;
    url: string;
    previewUrl: string;
}

interface ProductImage {
    id: string;
    name: string;
    description: string;
    url: string;
    previewUrl: string;
}

interface SocialPost {
    id: string;
    platform: 'instagram' | 'facebook' | 'twitter' | 'email';
    title: string;
    content: string;
}

const bannerAssets: BannerAsset[] = [
    {
        id: 'banner-300x250',
        name: 'Medium Rectangle',
        size: '300×250',
        dimensions: '300x250',
        url: '/affiliate-assets/banners/purrify-banner-300x250.svg',
        previewUrl: '/affiliate-assets/banners/purrify-banner-300x250.svg',
    },
    {
        id: 'banner-728x90',
        name: 'Leaderboard',
        size: '728×90',
        dimensions: '728x90',
        url: '/affiliate-assets/banners/purrify-banner-728x90.svg',
        previewUrl: '/affiliate-assets/banners/purrify-banner-728x90.svg',
    },
    {
        id: 'banner-160x600',
        name: 'Wide Skyscraper',
        size: '160×600',
        dimensions: '160x600',
        url: '/affiliate-assets/banners/purrify-banner-160x600.svg',
        previewUrl: '/affiliate-assets/banners/purrify-banner-160x600.svg',
    },
    {
        id: 'banner-1200x628',
        name: 'Social Media',
        size: '1200×628',
        dimensions: '1200x628',
        url: '/affiliate-assets/banners/purrify-banner-1200x628.svg',
        previewUrl: '/affiliate-assets/banners/purrify-banner-1200x628.svg',
    },
];

const productImages: ProductImage[] = [
    {
        id: 'product-50g',
        name: 'Purrify 50g Standard',
        description: 'Product image for single-cat households',
        url: '/optimized/60g-transparent.webp',
        previewUrl: '/optimized/60g-transparent.webp',
    },
    {
        id: 'product-120g',
        name: 'Purrify 120g Family Pack',
        description: 'Product image for multi-cat households',
        url: '/optimized/140g-transparent.webp',
        previewUrl: '/optimized/140g-transparent.webp',
    },
    {
        id: 'product-trial',
        name: 'Purrify Trial Size',
        description: 'Free trial product image',
        url: '/optimized/samplebag.webp',
        previewUrl: '/optimized/samplebag.webp',
    },
    {
        id: 'product-lifestyle',
        name: 'Lifestyle Shot',
        description: 'Cat with Purrify product',
        url: '/optimized/cat-favorite-litter.webp',
        previewUrl: '/optimized/cat-favorite-litter.webp',
    },
];

const socialPosts: SocialPost[] = [
    {
        id: 'instagram-1',
        platform: 'instagram',
        title: 'Product Introduction',
        content: `🐱 Tired of litter box smell?

I discovered Purrify - an activated carbon additive that actually ELIMINATES odors, not just masks them.

✅ Works with any litter
✅ Lasts 7+ days
✅ Non-toxic & pet-friendly
✅ Made in Canada

Use my link for a FREE trial (just pay shipping): [YOUR LINK]

#cats #catsofinstagram #purrify #catlitter #petcare #catmom #catdad`,
    },
    {
        id: 'instagram-2',
        platform: 'instagram',
        title: 'Before/After Story',
        content: `Before: Embarrassed when guests came over 😬
After: "Wait, you have cats?!" 🤯

That's the Purrify difference. Activated carbon technology literally traps ammonia molecules at the source.

Try it FREE: [YOUR LINK]

#cattips #multicat #apartmentliving #petodor #catlover`,
    },
    {
        id: 'facebook-1',
        platform: 'facebook',
        title: 'Detailed Recommendation',
        content: `I have to share this with my fellow cat parents! 🐱

If you're struggling with litter box odor (especially in winter when windows are closed), I found an amazing solution called Purrify.

It's an activated carbon additive that you just sprinkle on top of any litter. Unlike baking soda or scented products that just mask smells, this actually captures and neutralizes ammonia at the molecular level.

A few things I love:
• Works for 7+ days per application
• Completely non-toxic and pet-friendly
• Made in Canada from coconut shell carbon
• Works with ANY litter brand

They offer a free trial - you just pay $4.76 shipping. Honestly worth trying if odor is an issue for you.

Get yours here: [YOUR LINK]`,
    },
    {
        id: 'twitter-1',
        platform: 'twitter',
        title: 'Quick Tweet',
        content: `Cat owners: Purrify changed my life.

Activated carbon additive that actually eliminates litter box smell (not just masks it).

Free trial, just pay shipping: [YOUR LINK]

#cats #catlitter #purrify`,
    },
    {
        id: 'email-1',
        platform: 'email',
        title: 'Newsletter/Email Copy',
        content: `Subject: The litter box smell solution I wish I'd found sooner

Hi [NAME],

I wanted to share something that's made a huge difference in my home.

If you have cats, you know the struggle - that ammonia smell that seems impossible to eliminate, especially in winter when you can't open windows.

I recently discovered Purrify, an activated carbon additive made from coconut shells. It's the same technology used in water and air filters, adapted for cat litter.

Here's why it works so well:
- Activated carbon has millions of micropores that physically trap odor molecules
- Unlike baking soda or fragrances, it doesn't just mask smells - it eliminates them
- One application lasts 7+ days
- It's completely non-toxic and safe for cats

The company offers a free trial where you just pay $4.76 shipping. I figured it was worth trying, and I'm so glad I did.

If litter box odor is an issue for you, give it a shot: [YOUR LINK]

Best,
[YOUR NAME]`,
    },
];

const brandColors = {
    primary: '#9333EA', // Purple-600
    secondary: '#A855F7', // Purple-500
    accent: '#22C55E', // Green-500
    dark: '#1F2937', // Gray-800
    light: '#F9FAFB', // Gray-50
};

function CopyButton({ text, label }: { text: string; label?: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${copied
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50'
                }`}
        >
            {copied ? (
                <>
                    <Check className="w-4 h-4 mr-1" />
                    Copied!
                </>
            ) : (
                <>
                    <Copy className="w-4 h-4 mr-1" />
                    {label || 'Copy'}
                </>
            )}
        </button>
    );
}

function BannerCard({ banner }: { banner: BannerAsset }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="aspect-video bg-gray-100 dark:bg-gray-700 flex items-center justify-center p-4">
                <Image
                    src={banner.previewUrl}
                    alt={banner.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain"
                />
            </div>
            <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                        {banner.name}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {banner.size}
                    </span>
                </div>
                <a
                    href={banner.url}
                    download
                    className="inline-flex items-center px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white dark:text-white text-sm font-medium rounded-lg transition-colors"
                >
                    <Download className="w-4 h-4 mr-2" />
                    Download SVG
                </a>
            </div>
        </div>
    );
}

function ProductImageCard({ product }: { product: ProductImage }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="aspect-square bg-gray-100 dark:bg-gray-700 relative">
                <Image
                    src={product.previewUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                />
            </div>
            <div className="p-4">
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                    {product.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {product.description}
                </p>
                <a
                    href={product.url}
                    download
                    className="inline-flex items-center px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white dark:text-white text-sm font-medium rounded-lg transition-colors"
                >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                </a>
            </div>
        </div>
    );
}

function SocialPostCard({ post }: { post: SocialPost }) {
    const platformIcons = {
        instagram: '📸',
        facebook: '👍',
        twitter: '🐦',
        email: '✉️',
    };

    const platformColors = {
        instagram: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300',
        facebook: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
        twitter: 'bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300',
        email: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${platformColors[post.platform]}`}>
                        {platformIcons[post.platform]} {post.platform.charAt(0).toUpperCase() + post.platform.slice(1)}
                    </span>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                        {post.title}
                    </h3>
                </div>
                <CopyButton text={post.content} label="Copy Text" />
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 max-h-48 overflow-y-auto">
                <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans">
                    {post.content}
                </pre>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Remember to replace [YOUR LINK] with your affiliate link
            </p>
        </div>
    );
}

function ColorSwatch({ name, hex }: { name: string; hex: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(hex);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:shadow-gray-900/30 transition-shadow group"
        >
            <div
                className="w-12 h-12 rounded-lg shadow-inner"
                style={{ backgroundColor: hex }}
            />
            <div className="text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                    {copied ? 'Copied!' : hex}
                </p>
            </div>
        </button>
    );
}

export default function AssetsContent() {
    const t = useTranslations();
    const [activeTab, setActiveTab] = useState<'banners' | 'products' | 'social' | 'brand'>('banners');

    const tabs = [
        { id: 'banners' as const, name: t('affiliateDashboard.assets.banners') || 'Banners', icon: ImageIcon },
        { id: 'products' as const, name: t('affiliateDashboard.assets.productImages') || 'Product Images', icon: ImageIcon },
        { id: 'social' as const, name: t('affiliateDashboard.assets.socialPosts') || 'Social Posts', icon: MessageSquare },
        { id: 'brand' as const, name: t('affiliateDashboard.assets.brandGuide') || 'Brand Guide', icon: Palette },
    ];

    return (
        <AffiliateLayout>
            {/* Header */}
            <div className="mb-8">
                <h1 className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {t('affiliateDashboard.assets.title') || 'Marketing Assets'}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {t('affiliateDashboard.assets.description') || 'Download banners, product images, and copy for your promotions.'}
                </p>
            </div>

            {/* Tabs */}
            <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-8 overflow-x-auto">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                                    ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                                    }`}
                            >
                                <Icon className="w-4 h-4 mr-2" />
                                {tab.name}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'banners' && (
                <div>
                    <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                        <p className="text-sm text-purple-800 dark:text-purple-200">
                            <strong>Tip:</strong> Use these banners on your website, blog, or email newsletters.
                            Each banner includes your affiliate code - just download and use!
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {bannerAssets.map((banner) => (
                            <BannerCard key={banner.id} banner={banner} />
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'products' && (
                <div>
                    <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                        <p className="text-sm text-purple-800 dark:text-purple-200">
                            <strong>Tip:</strong> Use these high-quality product images in your social media posts,
                            blog articles, and promotional materials.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {productImages.map((product) => (
                            <ProductImageCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'social' && (
                <div>
                    <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                        <p className="text-sm text-purple-800 dark:text-purple-200">
                            <strong>Tip:</strong> These pre-written posts are designed to convert.
                            Feel free to personalize them with your own experience!
                        </p>
                    </div>
                    <div className="space-y-6">
                        {socialPosts.map((post) => (
                            <SocialPostCard key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'brand' && (
                <div className="space-y-8">
                    {/* Brand Colors */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                            {t('affiliateDashboard.assets.brandColors') || 'Brand Colors'}
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                            <ColorSwatch name="Primary Purple" hex={brandColors.primary} />
                            <ColorSwatch name="Secondary Purple" hex={brandColors.secondary} />
                            <ColorSwatch name="Accent Green" hex={brandColors.accent} />
                            <ColorSwatch name="Dark" hex={brandColors.dark} />
                            <ColorSwatch name="Light" hex={brandColors.light} />
                        </div>
                    </div>

                    {/* Typography */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                            Typography
                        </h2>
                        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Headings</p>
                                    <p className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-100">
                                        Inter (Font Heading)
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Body Text</p>
                                    <p className="text-base text-gray-700 dark:text-gray-300">
                                        Inter - Clean and readable for all content
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Brand Guidelines */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                            {t('affiliateDashboard.assets.guidelines') || 'Usage Guidelines'}
                        </h2>
                        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                            <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                        ✅ Do&apos;s
                                    </h3>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Use official product images and banners provided here</li>
                                        <li>Describe the product accurately (activated carbon, coconut-based)</li>
                                        <li>Mention the 30-day money-back guarantee</li>
                                        <li>Share your honest experience with the product</li>
                                        <li>Disclose your affiliate relationship where required by law</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                        ❌ Don&apos;ts
                                    </h3>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Don&apos;t make false claims about the product</li>
                                        <li>Don&apos;t modify the Purrify logo or misrepresent the brand</li>
                                        <li>Don&apos;t use the word &quot;safe&quot; - use &quot;non-toxic&quot; or &quot;pet-friendly&quot; instead</li>
                                        <li>Don&apos;t fabricate reviews or statistics</li>
                                        <li>Don&apos;t use spam tactics or misleading advertising</li>
                                        <li>Don&apos;t make medical or health claims</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                        📝 Key Product Facts
                                    </h3>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Made from activated coconut shell carbon</li>
                                        <li>Lasts 7+ days per application</li>
                                        <li>Works with any litter type</li>
                                        <li>Manufactured in Canada</li>
                                        <li>Non-toxic and food-grade materials</li>
                                        <li>Uses molecular adsorption (not absorption) to trap odors</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Logo Download */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                            Logo Files
                        </h2>
                        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex items-center justify-center mb-4">
                                <div className="w-48 h-16 bg-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white dark:text-white text-2xl font-bold">Purrify</span>
                                </div>
                            </div>
                            <div className="flex justify-center space-x-4">
                                <a
                                    href="/affiliate-assets/logo/purrify-logo-dark.svg"
                                    download
                                    className="inline-flex items-center px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    Dark Logo
                                </a>
                                <a
                                    href="/affiliate-assets/logo/purrify-logo-light.svg"
                                    download
                                    className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    Light Logo
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Need Help */}
                    <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
                            Need Custom Assets?
                        </h3>
                        <p className="text-sm text-purple-800 dark:text-purple-200 mb-4">
                            If you need custom banners, specific image sizes, or have questions about brand usage,
                            reach out to our affiliate support team.
                        </p>
                        <a
                            href="mailto:affiliates@purrify.ca"
                            className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white dark:text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Contact Affiliate Support
                        </a>
                    </div>
                </div>
            )}
        </AffiliateLayout>
    );
}
