"use client";

import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { WifiOff, RefreshCw, Home, Phone } from 'lucide-react';
import Link from 'next/link';
import { CONTACT_INFO, PHONE_MESSAGING } from '@/lib/constants';

export default function OfflineContent() {
    const handleRetry = () => {
        if (typeof globalThis.window !== 'undefined') {
            window.location.reload();
        }
    };

    return (
        <Container>
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-4">
                    {/* Offline Icon */}
                    <div className="mb-8">
                        <div className="w-24 h-24 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                            <WifiOff className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                        </div>
                    </div>

                    {/* Title and Message */}
                    <h1 className="font-heading text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        You are Offline
                    </h1>

                    <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                        It looks like you&apos;ve lost your internet connection. Please check your connection and try again.
                    </p>

                    {/* Action Buttons */}
                    <div className="space-y-4">
                        <Button
                            onClick={handleRetry}
                            className="w-full bg-[#5B2EFF] dark:bg-[#818CF8] hover:bg-[#5B2EFF]/90 dark:hover:bg-[#818CF8]/90 text-white dark:text-gray-900"
                        >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Try Again
                        </Button>

                        <Link href="/" passHref>
                            <Button variant="outline" className="w-full">
                                <Home className="w-4 h-4 mr-2" />
                                Go to Homepage
                            </Button>
                        </Link>
                    </div>

                    {/* Cached Pages Available */}
                    <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <h3 className="font-heading font-semibold text-blue-900 dark:text-blue-100 mb-3">
                            Available Offline
                        </h3>
                        <div className="space-y-2 text-sm">
                            <Link href="/" className="block text-blue-700 dark:text-blue-300 hover:underline">
                                • Homepage
                            </Link>
                            <Link href="/products/trial-size" className="block text-blue-700 dark:text-blue-300 hover:underline">
                                • Trial Size Product
                            </Link>
                            <Link href="/learn/how-it-works" className="block text-blue-700 dark:text-blue-300 hover:underline">
                                • How It Works
                            </Link>
                            <Link href="/contact" className="block text-blue-700 dark:text-blue-300 hover:underline">
                                • Contact Support
                            </Link>
                        </div>
                    </div>

                    {/* Emergency Contact */}
                    <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex flex-col items-center justify-center space-y-2">
                            <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-2">
                                For immediate assistance, you can also call us
                            </p>
                            <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400">
                                <Phone className="w-4 h-4" />
                                <a href={CONTACT_INFO.phoneHref} className="text-[#5B2EFF] dark:text-[#818CF8] hover:underline font-bold text-sm">
                                    {PHONE_MESSAGING.callout}
                                </a>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 italic">
                                {PHONE_MESSAGING.explanation}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </Container>
    );
}
