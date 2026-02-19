"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import AffiliateLayout from '@/components/affiliate/AffiliateLayout';
import { LinkGenerator } from '@/components/affiliate/LinkGenerator';
import { useTranslations, useLocale } from 'next-intl';
import { Copy, Check, ExternalLink, QrCode } from 'lucide-react';
import Image from 'next/image';

interface LinkTemplate {
    id: string;
    name: string;
    description: string;
    path: string;
    url: string;
}

interface LinksData {
    affiliateCode: string;
    baseUrl: string;
    links: LinkTemplate[];
    utmTemplate: string;
}

function LinkCard({ link }: { link: LinkTemplate }) {
    const [copied, setCopied] = useState(false);

    const copyLink = async () => {
        await navigator.clipboard.writeText(link.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md dark:hover:shadow-gray-900/30 transition-shadow">
            <div className="flex items-start justify-between mb-2">
                <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                        {link.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {link.description}
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        title="Preview link"
                    >
                        <ExternalLink className="w-4 h-4" />
                    </a>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 overflow-hidden">
                    <code className="text-xs text-gray-600 dark:text-gray-400 truncate block">
                        {link.url}
                    </code>
                </div>
                <button
                    onClick={copyLink}
                    className={`flex-shrink-0 px-3 py-2 rounded-lg transition-colors flex items-center space-x-1 ${copied
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                            : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50'
                        }`}
                >
                    {copied ? (
                        <>
                            <Check className="w-4 h-4" />
                            <span className="text-sm">Copied</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-4 h-4" />
                            <span className="text-sm">Copy</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

function QRCodeCard({ affiliateCode, baseUrl }: { affiliateCode: string; baseUrl: string }) {
    const referralLink = `${baseUrl}?ref=${affiliateCode}`;
    // Generate a QR code using a free API
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(referralLink)}`;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-2 mb-4">
                <QrCode className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    QR Code
                </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Share this QR code to direct people to your referral link.
            </p>
            <div className="flex justify-center">
                <div className="bg-white dark:bg-gray-100 p-4 rounded-lg">
                        <Image
                        src={qrCodeUrl}
                        alt="Referral QR Code"
                        width={200}
                        height={200}
                        className="rounded"
                    />
                </div>
            </div>
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                Right-click to save the QR code image
            </p>
        </div>
    );
}

export default function LinksContent() {
    const t = useTranslations();
    const router = useRouter();
    const [data, setData] = useState<LinksData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchLinks = useCallback(async () => {
        try {
            const response = await fetch('/api/affiliate/dashboard/links');
            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    router.push('/affiliate/login');
                    return;
                }
                throw new Error('Failed to fetch links');
            }
            const data = await response.json();
            setData(data);
        } catch (err) {
            console.error('Failed to fetch links:', err);
            setError(t('affiliateDashboard.errors.loadFailed') || 'Failed to load links');
        } finally {
            setIsLoading(false);
        }
    }, [t('affiliateDashboard.errors.loadFailed'), router]);

    useEffect(() => {
        fetchLinks();
    }, [fetchLinks]);

    return (
        <AffiliateLayout>
            {/* Header */}
            <div className="mb-8">
                <h1 className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Referral Links
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Share these links to earn commissions on every sale.
                </p>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-red-700 dark:text-red-300">{error}</p>
                </div>
            )}

            {isLoading ? (
                <div className="space-y-6">
                    {/* Loading skeleton */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-4" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-6" />
                        <div className="space-y-4">
                            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
                            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
                        </div>
                    </div>
                </div>
            ) : data ? (
                <div className="space-y-8">
                    {/* Custom Link Generator */}
                    <LinkGenerator
                        affiliateCode={data.affiliateCode}
                        baseUrl={data.baseUrl}
                    />

                    {/* Pre-made Links */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                            Quick Links
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {data.links.map((link) => (
                                <LinkCard key={link.id} link={link} />
                            ))}
                        </div>
                    </div>

                    {/* QR Code */}
                    <QRCodeCard
                        affiliateCode={data.affiliateCode}
                        baseUrl={data.baseUrl}
                    />

                    {/* Tips Section */}
                    <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3">
                            Tips for Sharing
                        </h3>
                        <ul className="space-y-2 text-sm text-purple-800 dark:text-purple-200">
                            <li className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-purple-600 dark:bg-purple-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                                <span>
                                    Use campaign names to track which content converts best (e.g., &quot;instagram-bio&quot;, &quot;email-newsletter&quot;)
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-purple-600 dark:bg-purple-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                                <span>
                                    Link directly to product pages for higher conversion rates
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-purple-600 dark:bg-purple-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                                <span>
                                    Your referral cookie lasts 90 days, so visitors can return later and you still get credit
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-purple-600 dark:bg-purple-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                                <span>
                                    The QR code is great for printed materials, business cards, or in-person events
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            ) : null}
        </AffiliateLayout>
    );
}
